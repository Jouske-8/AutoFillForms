const jsonTextarea = document.getElementById('jsonData');
const fillBtn = document.getElementById('fillBtn');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

chrome.storage.local.get('formData', (data) => {
    if (data.formData) {
        jsonTextarea.value = JSON.stringify(data.formData, null, 2);
    }
});

saveBtn.addEventListener('click', () => {
    try {
        const jsonData = JSON.parse(jsonTextarea.value);
        chrome.storage.local.set({ formData: jsonData }, () => {
            status.textContent = 'JSON saved!';
            setTimeout(() => status.textContent = '', 2000);
        });
    } catch (e) {
        status.textContent = 'Invalid JSON!';
        setTimeout(() => status.textContent = '', 2000);
    }
});

fillBtn.addEventListener('click', async () => {
    chrome.storage.local.get('formData', async (data) => {
        if (data.formData) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: fillForm,
                args: [data.formData]
            });
        } else {
            status.textContent = 'No JSON data found!';
            setTimeout(() => status.textContent = '', 2000);
        }
    });
});

function fillForm(formData) {
    const labels = document.querySelectorAll('div[role="listitem"]');
    labels.forEach(label => {
        const question = label.querySelector('div[role="heading"]');
        if (!question) return;

        const questionText = question.innerText.trim();
        const value = formData[questionText];

        if (value === undefined) return;

        // --- Text and textarea ---
        const input = label.querySelector('input[type="text"], textarea');
        if (input) {
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }

        // --- Multiple Choice (radio buttons) ---
        const radios = label.querySelectorAll('[role="radio"]');
        if (radios.length > 0) {
            radios.forEach(radio => {
                const optionText = radio.getAttribute("data-value") || radio.innerText.trim();
                if (optionText === value) {
                    radio.click();
                }
            });
            return;
        }

        // --- Checkboxes (multi-select) ---
        // const checkboxes = label.querySelectorAll('[role="checkbox"]');
        // if (checkboxes.length > 0) {
        //     const values = Array.isArray(value) ? value : [value];
        //     checkboxes.forEach(box => {
        //         const optionText = box.getAttribute("data-value") || box.innerText.trim();
        //         if (values.includes(optionText)) {
        //             if (box.getAttribute("aria-checked") !== "true") {
        //                 box.click();
        //             }
        //         } else {
        //             if (box.getAttribute("aria-checked") === "true") {
        //                 box.click();
        //             }
        //         }
        //     });
        //     return;
        // }

        // --- Dropdown (select menu) ---
        // const dropdown = label.querySelector('[role="listbox"]');
        // if (dropdown) {
        //     dropdown.click(); // open
        //     const observer = new MutationObserver(() => {
        //         const options = document.querySelectorAll('div[role="option"]');
        //         options.forEach(opt => {
        //             const optText = opt.innerText.trim();
        //             if (optText === value) {
        //                 opt.click();
        //                 observer.disconnect();
        //             }
        //         });
        //     });
        //     observer.observe(document.body, { childList: true, subtree: true });
        // }
    });
}
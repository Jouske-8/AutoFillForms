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
        if (question) {
            const questionText = question.innerText.trim();
            const value = formData[questionText];
            if (value !== undefined) {
                const input = label.querySelector('input, textarea');
                if (input) {
                    input.value = value;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        }
    });
}
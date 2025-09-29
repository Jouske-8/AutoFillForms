document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("kvContainer");
    const addRowBtn = document.getElementById("addRowBtn");
    const saveBtn = document.getElementById("saveBtn");
    const fillBtn = document.getElementById("fillBtn");
    const status = document.getElementById("status");

    // Function to create a key-value row
    function createRow(key = "", value = "") {
        const row = document.createElement("div");
        row.className = "kvRow";

        const keyInput = document.createElement("input");
        keyInput.type = "text";
        keyInput.placeholder = "Key";
        keyInput.value = key;

        const valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Value";
        valueInput.value = value;

        row.appendChild(keyInput);
        row.appendChild(valueInput);

        container.appendChild(row);
    }

    // Convert rows to JSON
    function getJsonData() {
        const rows = container.querySelectorAll(".kvRow");
        const data = {};
        rows.forEach(row => {
            const inputs = row.querySelectorAll("input");
            const key = inputs[0].value.trim();
            const value = inputs[1].value.trim();
            if (key) data[key] = value;
        });
        return data;
    }

    // Load saved JSON from chrome.storage
    chrome.storage.local.get("formData", (data) => {
        if (data.formData) {
            Object.entries(data.formData).forEach(([key, value]) => {
                createRow(key, value);
            });
        } else {
            createRow(); // start with one empty row
        }
    });

    // Add new row
    addRowBtn.addEventListener("click", () => {
        createRow();
    });

    // Save JSON to chrome.storage
    saveBtn.addEventListener("click", () => {
        const data = getJsonData();
        chrome.storage.local.set({ formData: data }, () => {
            status.textContent = "JSON saved!";
            setTimeout(() => status.textContent = "", 2000);
        });
    });

    // Autofill form in active tab
    fillBtn.addEventListener("click", async () => {
        chrome.storage.local.get("formData", async (data) => {
            if (data.formData) {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: fillForm,
                    args: [data.formData]
                });
            } else {
                status.textContent = "No JSON data found!";
                setTimeout(() => status.textContent = "", 2000);
            }
        });
    });

    // This runs inside the page to fill the form
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
                        const isSelected = radio.getAttribute("aria-checked") === "true";
                        if (!isSelected) {
                            radio.click();
                        }
                    }
                });
                return;
            }
        });
    }
});

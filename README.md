# AutoFillForms

**AutoFillForms** is a lightweight Chrome extension that allows you to autofill Google Forms using a customizable key–value pair editor. With this extension, you can save time by automatically filling fields in forms with pre-defined values.

## ✨ Features

* Autofill Google Forms fields based on saved key–value pairs.
* Dynamic UI for adding/editing key–value rows (no need to write raw JSON).
* Supports:

  * ✅ Text inputs & textareas
  * ✅ Multiple Choice (radio buttons, with safe selection that won’t deselect already chosen options)

  <!-- - ✅ Checkboxes (multi-select)   -->

  <!-- - ✅ Dropdowns (select menus)   -->
* Data is stored locally via Chrome Storage.
* Only fills the form when you click the **“Autofill Form”** button.
* Lightweight and easy to use.
* Works across multiple Google Forms without modification.

## 🚀 How It Works

1. Open a Google Form.
2. Click the **AutoFillForms** extension icon.
3. Enter your key–value pairs in the popup (one row = one mapping).

   * **Key** = the exact question text from the form.
   * **Value** = the answer you want filled in.
4. Click **Save JSON** to store the data locally.
5. Click **Autofill Form** to populate the fields automatically.

## 📄 Example Key–Value Pairs

| Key     | Value                                       |
| ------- | ------------------------------------------- |
| Name    | John Doe                                    |
| Email   | [john@example.com](mailto:john@example.com) |
| Phone   | 1234567890                                  |
| Gender  | Male                                        |
| Country | India                                       |

This will be saved internally as:

```json
{
  "Name": "John Doe",
  "Email": "john@example.com",
  "Phone": "1234567890",
  "Gender": "Male",
  "Country": "India"
}
```

## Mapping

* **Text / Textarea** → String
* **Multiple Choice (Radio)** → String (one option)

<!-- - **Checkboxes** → Array of strings (multiple options) -->  

<!-- - **Dropdown** → String (one option) -->  

## ⚙️ Installation

1. Download the repository as a ZIP file and extract it.
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the extracted folder.

## 📝 Notes

* Works best with clearly matching question text and key names.
* Ideal for repetitive form submissions, QA/testing, and saving time on surveys.
* Extension does **not** auto-submit forms — you stay in control.
* Your data is stored locally in Chrome; it does not leave your browser.

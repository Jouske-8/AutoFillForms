# AutoFillForms

**AutoFillForms** is a lightweight Chrome extension that allows you to autofill Google Forms using a customizable JSON key-value pair. With this extension, you can save time by automatically filling fields in forms with pre-defined values.  

## ✨ Features
- Autofill Google Forms fields based on a JSON configuration.
- Supports:
  - ✅ Text inputs & textareas  
  - ✅ Multiple Choice (radio buttons)  
  - ✅ Checkboxes (multi-select)  
  - ✅ Dropdowns (select menus)  
- Editable JSON data directly from the popup.
- Only fills the form when you click the **“Autofill Form”** button.
- Lightweight and easy to use.
- Works across multiple Google Forms without modification.

## 🚀 How It Works
1. Open a Google Form.
2. Click the **AutoFillForms** extension icon.
3. Edit your JSON key-value pairs in the popup if needed.
4. Click **Autofill Form** to populate the fields automatically.

## 📄 JSON Format Example
```json
{
  "Name": "John Doe",
  "Email": "john@example.com",
  "Phone": "1234567890",
  "Gender": "Male",
  "Languages Known": ["Python", "C++", "JavaScript"],
  "Country": "India"
}
```

## Mapping

- Text / Textarea → String

- Multiple Choice (Radio) → String (one option)

- Checkboxes → Array of strings (multiple options)

- Dropdown → String (one option)

## ⚙️ Installation

1. Download the repository as a ZIP file and extract it.

2. Open ```chrome://extensions/``` in Chrome.

3. Enable Developer mode (top-right).

4. Click Load unpacked and select the extracted folder.

## 📝 Notes

- Works best with clearly matching question text and JSON keys.

- Ideal for repetitive form submissions, QA/testing, and saving time on surveys.

- Extension does not auto-submit forms — you remain in control.

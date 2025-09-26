# AutoFillForms

**AutoFillForms** is a lightweight Chrome extension that allows you to autofill Google Forms using a customizable JSON key-value pair. With this extension, you can save time by automatically filling text-based fields in forms with pre-defined values.  

## Features
- Autofill Google Forms fields based on a JSON configuration.
- Editable JSON data directly from the popup.
- Only fills the form when you click the **“Autofill Form”** button.
- Lightweight and easy to use.
- Supports multiple Google Forms without modifying the extension.

## How It Works
1. Open a Google Form.
2. Click the AutoFillForms extension icon.
3. Edit your JSON key-value pairs if needed.
4. Click **Autofill Form** to populate the fields automatically.

## JSON Format Example
```json
{
  "Name": "John Doe",
  "Email": "john@example.com",
  "Phone": "1234567890"
}
```

## Installation

1. Download the repository as a ZIP file and extract it.

2. Open chrome://extensions/ in Chrome.

3. Enable Developer mode.

4. Click Load unpacked and select the extracted folder.

## Notes

- Currently supports text input and textarea fields.

- Ideal for repetitive form submissions and testing purposes.

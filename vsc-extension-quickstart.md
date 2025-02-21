# Welcome to Focus Timer - Your VS Code Productivity Assistant ⏳  

## What's in the folder?  

* This folder contains all necessary files for the **Focus Timer** extension.  
* `package.json` - The manifest file where the extension is declared, including its commands.  
  * The **Focus Timer** command appears in the command palette, allowing you to set a focus session easily.  
* `extension.js` - The core implementation file where the timer functionality is handled.  
  * The `activate` function registers commands and starts the countdown timer.  

---

## Get Started Quickly 🚀  

1. Press `F5` to open a new VS Code window with the **Focus Timer** extension loaded.  
2. Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).  
3. Type **"Focus Timer"** and select a focus duration.  
4. The timer will start and appear in the **status bar**.  
5. Once time is up, a **break reminder** will pop up in a webview.  

---

## How to Make Changes?  

* Modify `extension.js` to enhance timer functionality.  
* Restart the extension from the **debug toolbar** after making changes.  
* Reload VS Code (`Ctrl+R` or `Cmd+R` on Mac) to apply updates.  

---

## Explore More Features  

* Open `node_modules/@types/vscode/index.d.ts` to explore the full VS Code API.  
* Learn how to customize VS Code extensions with [official docs](https://code.visualstudio.com/api).  

---

## Want to Contribute?  

* **Enhancements & Fixes** - Fork this project and submit PRs.  
* **Report Issues** - Use the GitHub [Issue Tracker](https://github.com/your-repo/issues).  
* **Future Improvements** - Custom focus sessions, break time tracking, and more!  

---

## Publish Your Extension  

Want to publish your own VS Code extension? Follow these guides:  

- **[Publishing an Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)**  
- **[Continuous Integration for Extensions](https://code.visualstudio.com/api/working-with-extensions/continuous-integration)**  

---

**Enjoy your focused coding sessions! 🎯**  

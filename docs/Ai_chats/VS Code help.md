# Keep files **permanently open** in the VS Code editor 

To keep files **permanently open** in the VS Code editor (instead of replacing the current one), you’ll want to disable **preview mode**. Here's how to do that:

### 🛠️ Option 1: Disable Preview Mode Globally
1. Open **Settings** (`Ctrl+,` or `Cmd+,` on macOS).
2. Search for: `workbench.editor.enablePreview`
3. Uncheck **"Workbench › Editor: Enable Preview"**

This ensures that files opened from the Explorer or elsewhere will always stay open in a new tab.

---

### 🖱️ Option 2: Open Files Permanently (One-by-One)
If you don’t want to change the global setting:
- **Double-click** the file in the Explorer instead of single-clicking.
- Or, once the file is open in preview mode (italic tab title), **double-click the tab** to pin it.

---

### 📌 Bonus Tip: Pin Tabs
You can also **right-click** a tab and choose **"Keep Open"** or **"Pin"** to prevent it from being replaced.

Let me know if you want to customize tab behavior further—like auto-closing unused tabs or grouping by folder.

# xx

T193R-W00D5: Good morning. Before we start refactoring my project for TypeScript, please explain the difference between using the standard PowerShell terminal in VS Code and using the PowerShell Exension terminal in VS Code.

GitHub Copilot: Good morning! Great question about the different PowerShell environments in VS Code. This is an important distinction that can affect your development experience.

## **Standard PowerShell Terminal vs PowerShell Extension Terminal**

### **Standard PowerShell Terminal**
This is VS Code's built-in integrated terminal running PowerShell:

**Characteristics:**
- Uses your system's default PowerShell installation
- Basic PowerShell functionality
- Standard VS Code terminal integration
- Limited PowerShell-specific features

**How to access:**
- `Terminal → New Terminal` (if PowerShell is your default shell)
- `Ctrl + Shift + `` ` (backtick)
- Terminal dropdown → Select PowerShell

### **PowerShell Extension Terminal**
This is an enhanced terminal provided by the Microsoft PowerShell Extension:

**Enhanced Features:**
- **IntelliSense** for PowerShell commands and variables
- **Syntax highlighting** in the terminal
- **Code completion** for cmdlets, parameters, and variables
- **Integrated PowerShell ISE-like experience**
- **Better debugging support** for PowerShell scripts
- **PSReadLine enhancements** (better command history, tab completion)
- **Module and function discovery**

**How to access:**
- Install the "PowerShell" extension by Microsoft
- `Ctrl + Shift + P` → "PowerShell: Create New Integrated Console"
- Or click "PowerShell Extension Terminal" in the terminal dropdown

## **Key Differences in Practice**

### **Command Completion:**

**Standard Terminal:**
```powershell
Get-Ch[TAB] # Basic tab completion
```

**Extension Terminal:**
```powershell
Get-Ch[TAB] # Shows dropdown with:
# Get-ChildItem
# Get-Checkpoint
# Get-ChocolateyInstall
# etc.
```

### **Variable IntelliSense:**

**Standard Terminal:**
```powershell
$myVar = "test"
$my[TAB] # May or may not work
```

**Extension Terminal:**
```powershell
$myVariable = "test"
$my[TAB] # Shows $myVariable in dropdown with type info
```

### **Error Highlighting:**

**Standard Terminal:**
- Basic error output
- No syntax highlighting

**Extension Terminal:**
- Colored syntax highlighting
- Better error formatting
- Clickable stack traces

## **For Your TypeScript Migration**

**I recommend using the PowerShell Extension terminal because:**

1. **Better npm/Node.js integration** with IntelliSense
2. **Enhanced Git command completion**
3. **Improved error messages** when running build tools
4. **Better debugging** if we need to run PowerShell scripts
5. **Superior file path completion** for your project files

## **Quick Setup Check**

**To verify you have the PowerShell Extension:**
1. Go to Extensions (`Ctrl + Shift + X`)
2. Search for "PowerShell"
3. Look for "PowerShell" by Microsoft (should have millions of downloads)
4. Install if not already installed

**To create an Extension terminal:**
1. `Ctrl + Shift + P`
2. Type "PowerShell: Create New Integrated Console"
3. This opens the enhanced terminal

## **Which Should You Use for TypeScript Work?**

**For our TypeScript migration, either will work, but the PowerShell Extension terminal offers:**
- Better completion for `npm` commands
- Enhanced `npx` command suggestions
- Improved file path completion when editing configs
- Better integration with VS Code's workspace

**Bottom line:** If you have the PowerShell Extension installed, use that terminal for the best experience. If not, the standard terminal will work fine for our TypeScript migration tasks! 🚀

Ready to start the TypeScript refactoring? We'll be running commands like `npm install typescript`, `npx tsc --init`, and editing config files - all of which benefit from the enhanced terminal experience!

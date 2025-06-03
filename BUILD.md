# Build Instructions for Oomotion VSCode Extension

This file describes how to set up, build, and test the Oomotion extension in a development environment.

## Prerequisites
- Node.js (v14 or newer recommended)
- npm (comes with Node.js)
- Visual Studio Code

## Setup
1. **Install dependencies:**
   ```bash
   npm install
   npm run compile
   npm run watch
   ```

2. **Regenerate `package.json` from package.ts (if you change keybindings or actions in code):**
   ```bash
   npm run packgen
   ```
   > Note: If you see `Cannot find module 'vscode'`, see troubleshooting below.

## Testing in VS Code
1. Open the project folder in VS Code.
2. Press `F5` to launch the Extension Development Host. This will open a new VS Code window with only the Oomotion extension enabled (other extensions are disabled for isolation).

## Additional Notes
- For more information, see the `README.md` for usage and keymap details.

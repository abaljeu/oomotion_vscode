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

3. **Regenerate `package.json` (if you change keybindings or actions in code):**
   ```bash
   npm run packgen
   ```
   > Note: If you see `Cannot find module 'vscode'`, see troubleshooting below.

## Testing in VS Code
1. Open the project folder in VS Code.
2. Press `F5` to launch the Extension Development Host. This will open a new VS Code window with only the Oomotion extension enabled (other extensions are disabled for isolation).

## Troubleshooting
- If you see `Cannot find module 'vscode'` when running `npm run packgen`, ensure that `src/package.ts` does not import from files that depend on the `vscode` module. See comments in `src/package.ts` for details.
- If F5 prompts you to select a build task, choose `npm: watch`.
- If you want to reset the generated `package.json`, you can restore from `package-orig.json`.

## Additional Notes
- The generated `package.json` includes a `_generatedBy` field to indicate it is auto-generated.
- For more information, see the `README.md` for usage and keymap details.

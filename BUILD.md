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
2. **Regenerating package.json` (if you change keybindings or actions in code):

   `npm run packgen` should work, but some dependencies of package.ts on vscode are causing trouble.  The code should be restructured to eliminate this issue.

   - You may see `Cannot find module 'vscode'` when running `npm run packgen`, because `src/package.ts` imports from files that depend on the `vscode` module. 
   
   - To bypass the problem use VSCode F5 to build/run.
   - If F5 prompts you to select a build task, choose `npm: watch`.
   - This will run the packgen with vscode available.

## Testing in VS Code

1. Open the project folder in VS Code.
2. Press `F5` to launch the Extension Development Host. This will open a new VS Code window with only the Oomotion extension enabled (other extensions are disabled for isolation).

## Additional Notes

- The generated `package.json` includes a `_generatedBy` field to indicate it is auto-generated.
- For more information, see the `README.md` for usage and keymap details.

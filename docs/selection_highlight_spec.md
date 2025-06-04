# Specification: Prospective Selection Highlighting in ooMotion

## 1. Introduction

This document outlines the plan to integrate the `createCssBoxDecoration` functionality into ooMotion to provide visual feedback during selection and movement operations. The goal is to highlight the text range *before* a movement command is fully applied and the *prospective* text range *after* the movement, when in "select" mode. This will give users a clear indication of how their selection will change.

## 2. Affected Components and Intent of Changes

The following files and modules are anticipated to require modifications:

### 2.1. `src/editor/cssBoxDecoration.ts`

- **Function:** `createCssBoxDecoration`
- **Intent:**
  - [x] This function will be the core mechanism for drawing the borders.
  - [ ] We might need to adapt it or create a wrapper to allow for different styling (e.g., colors or border styles) to differentiate between the "current/before" selection and the "prospective/after" selection.
  - [ ] Ensure robust disposal of these specific decorations to avoid visual clutter.

### 2.2. `src/actions/move.ts` (and potentially individual movement actions)

- **Functions:** Functions handling movement commands (e.g., `moveLeft`, `moveRight`, or their equivalents for different modes like char, word, line, tree-sitter).
- **Intent:**
  - **When in "select" mode:**
    1. [ ] **Before actual movement:**
        - [ ] Capture the current selection range(s). This is the "before" state.
        - [ ] Potentially, immediately draw a decoration for this "before" state if it\'s not already the primary selection highlight.
    2. [ ] **Calculate prospective movement:**
        - [ ] Determine the selection range(s) that *would* result if the movement command were applied. This is the "after" state.
        - [ ] This calculation must happen *without* actually moving the cursor or changing the primary selection yet.
    3. [ ] **Apply Decorations:**
        - [ ] Use `createCssBoxDecoration` to draw a distinct border around the "prospective/after" selection range(s).
        - [ ] The "before" range might already be highlighted by the standard selection, or we might need a separate, subtle decoration for it.
    4. [ ] **On command confirmation/execution (e.g., if the movement is part of a sequence or upon releasing a modifier):**
        - [ ] Clear the "prospective/after" decoration.
        - [ ] The actual selection will then be updated by existing mechanisms, which will have its own standard highlighting.

### 2.3. `src/actions/select.ts` (or equivalent selection management)

- **Functions:** Functions managing the "select" mode state and selection updates.
- **Intent:**
  - [ ] **Entering "select" mode:** Initialize any state needed for the prospective highlighting.
  - [ ] **Exiting "select" mode:** Ensure all "before" and "prospective/after" decorations are cleared.
  - [ ] **During selection changes (while in "select" mode):** This is where the primary logic from `move.ts` will be triggered. After each motion that modifies the selection, the "before" (previous selection) and "after" (new prospective selection) should be determined and decorated.

### 2.4. `src/editor/editordata.ts` (or global state management)

- **Intent:**
  - [ ] May need to store references to the "before" and "prospective/after" decoration types or their instances for easy access and disposal.
  - [ ] Store the current editor, selection, and movement mode to inform the decoration logic.

### 2.5. `src/extension.ts` (or command registration module)

- **Intent:**
  - [ ] Ensure that movement commands, when in "select" mode, trigger the new decoration logic. This might involve wrapping existing command handlers or modifying how they are registered/executed.

## 3. Decoration Scheme

- [ ] **"Before" Selection:** This is the selection range *prior* to the prospective move.
  - [ ] If the standard editor selection highlight is sufficient and clear, we might not need a separate "before" decoration.
  - [ ] Alternatively, a subtle, distinct border (e.g., light grey, dashed) could be used.
- [ ] **"Prospective/After" Selection:** This is the selection range that *will* be selected if the move is confirmed.
  - [ ] This should have a clear, distinct border (e.g., a different color like green or a slightly thicker/different style border than the "before" or standard selection).
- [ ] **Clearing Decorations:** Decorations for "before" and "prospective/after" ranges must be cleared:
  - [ ] When the movement is finalized and the actual selection changes.
  - [ ] When exiting "select" mode.
  - [ ] Before applying new prospective decorations for a subsequent movement.

## 4. Workflow Example (User presses `h` to move left in select mode)

1. [ ] User is in "select" mode. Current selection is `(line 5, char 10) -> (line 5, char 15)`.
2. [ ] User presses `h`.
3. [ ] **`move.ts` / `select.ts` logic triggers:**
  a. [ ] "Before" range is `(line 5, char 10) -> (line 5, char 15)`. (This is already the editor\'s main selection).
  b. [ ] Calculate prospective move: If current mode is `char`, the new end position would be `(line 5, char 14)`.
  c. [ ] "Prospective/After" range is `(line 5, char 10) -> (line 5, char 14)`.
  d. [ ] Call `createCssBoxDecoration` to draw a special border (e.g., green) around `(line 5, char 10) -> (line 5, char 14)`.
4. [ ] If the user confirms or the action completes:
  a. [ ] Clear the green "prospective/after" decoration.
  b. [ ] The editor\'s selection updates to `(line 5, char 10) -> (line 5, char 14)` and is highlighted normally.

## 5. Open Questions & Considerations

- [ ] **Performance:** Frequent creation and disposal of decorations, especially with complex modes like tree-sitter, could impact performance. Throttling or debouncing might be necessary.
- [ ] **Multiple Cursors/Selections:** How will this behave with multiple cursors? The logic should ideally apply to each cursor\'s selection independently.
- [ ] **Styling Customization:** Should the colors/styles for these decorations be user-configurable?
- [ ] **Interaction with Existing Selection Highlight:** How to ensure these new borders are visually distinct from and compatible with the default VS Code selection highlighting.
- [ ] **Complexity of "Prospective" Calculation:** For some modes (e.g., tree-sitter), calculating the prospective range without actually performing the move might require careful implementation to accurately predict the outcome.

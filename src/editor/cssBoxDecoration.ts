import * as vscode from 'vscode';

// Track all active decorations to ensure proper cleanup
const activeBoxDecorations: vscode.TextEditorDecorationType[] = [];

/**
 * Creates a decoration type with specified border styles and common properties
 * @param borderStyle CSS border style specification
 * @returns TextEditorDecorationType configured with the specified border style
 */
function createBorderDecoration(borderStyle: string): vscode.TextEditorDecorationType {
    return vscode.window.createTextEditorDecorationType({
        border: '1px solid',
        borderColor: 'blue',
        borderStyle: borderStyle
        });
}

/**
 * Creates a visual box decoration around a specified text range using CSS borders
 * @param editor The active text editor
 * @param start Start position of the box
 * @param end End position of the box
 */
export function createCssBoxDecoration(
    editor: vscode.TextEditor, 
    start: vscode.Position, 
    end: vscode.Position
): vscode.TextEditorDecorationType {
    // Normalize positions to ensure start comes before end
    if (start.line > end.line || (start.line === end.line && start.character > end.character)) {
        const temp = start;
        start = end;
        end = temp;
    }

    // Create ranges for the different parts of the decoration
    const firstLineRange = new vscode.Range(start, new vscode.Position(start.line, Number.MAX_SAFE_INTEGER));
    const lastLineRange = new vscode.Range(new vscode.Position(end.line, 0), end);

    // For middle lines (if any)
    const middleLineRanges: vscode.Range[] = [];
    for (let i = start.line + 1; i < end.line; i++) {
        middleLineRanges.push(new vscode.Range(
            new vscode.Position(i, 0),
            new vscode.Position(i, Number.MAX_SAFE_INTEGER)
        ));
    }

    // Adjust decorations for single-line or sub-line selections
    const exactRange = new vscode.Range(start, end);

    // Create decorations for different parts of the box
    const decorations = {
        left: createBorderDecoration('solid none none solid'),      // left border only
        right: createBorderDecoration('none solid none none'),     // right border only
        topBottom: createBorderDecoration('solid none solid none') // top and bottom borders
    };

    // Apply decorations
    if (start.line === end.line) {
        // Single-line or sub-line selection
        editor.setDecorations(decorations.left, [exactRange]);
        editor.setDecorations(decorations.right, [exactRange]);
        editor.setDecorations(decorations.topBottom, [exactRange]);
    } else {
        // Multi-line selection
        editor.setDecorations(decorations.left, [firstLineRange]);
        editor.setDecorations(decorations.right, [lastLineRange]);
        editor.setDecorations(decorations.topBottom, [firstLineRange, ...middleLineRanges, lastLineRange]);
    }

    // Add all created decorations to the global tracking array
    activeBoxDecorations.push(decorations.left);
    activeBoxDecorations.push(decorations.right);
    activeBoxDecorations.push(decorations.topBottom);

    // Return the left decoration as a representative (all will be disposed by activeBoxDecorations)
    return decorations.left;
}

/**
 * Test function with hardcoded positions for CSS box decoration
 * @param editor Active text editor
 */
export function testCssBoxDecoration(editor: vscode.TextEditor): vscode.TextEditorDecorationType {
    // Clean up all previous decorations using our centralized function
    disposeAllDecorations();

    // Define the selection to use for decoration
    const selection = !editor.selection.isEmpty
        ? { start: editor.selection.start, end: editor.selection.end } // Use current selection
        : { start: new vscode.Position(5, 4), end: new vscode.Position(10, 20) }; // Fallback to default
    
    // Apply the box decoration
    const decoration = createCssBoxDecoration(editor, selection.start, selection.end);
    
    return decoration;
}

/**
 * Disposes all active box decorations
 */
function disposeAllDecorations(): void {
    // Make a copy of the array to avoid issues during iteration
    const decorations = [...activeBoxDecorations];
    
    // Clear the tracking array
    activeBoxDecorations.length = 0;
    
    // Dispose each decoration
    decorations.forEach(decoration => {
        try {
            decoration.dispose();
        } catch (e) {
            // Ignore errors if decoration was already disposed
        }
    });
}

/**
 * Public function to clean up all box decorations
 * Can be called from other modules to ensure all decorations are removed
 */
export function cleanupAllBoxDecorations(): void {
    disposeAllDecorations();
}

/**
 * Adds decoration handlers to maintain CSS box decorations as document changes
 * @param editor The active editor
 * @param decoration The decoration type to maintain
 * @param start Starting position
 * @param end Ending position
 */
export function maintainCssBoxDecoration(
    editor: vscode.TextEditor,
    decoration: vscode.TextEditorDecorationType,
    start: vscode.Position,
    end: vscode.Position
): vscode.Disposable {
    // Create a disposable to clean up event handlers
    const disposable = vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document === editor.document) {
            // Recreate the decoration with possibly updated positions
            createCssBoxDecoration(editor, start, end);
        }
    });
    
    return disposable;
}

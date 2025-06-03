import * as vscode from 'vscode';

/**
 * Creates a decoration type with specified border styles and common properties
 * @param borderStyle CSS border style specification
 * @returns TextEditorDecorationType configured with the specified border style
 */
function createBorderDecoration(borderStyle: string): vscode.TextEditorDecorationType {
    return vscode.window.createTextEditorDecorationType({
        border: '1px solid',
        borderColor: 'red',
        borderStyle: borderStyle,
        borderRadius: '3px',
        backgroundColor: 'rgba(255, 0, 0, 0.05)'
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
    
    // Single line case - all borders in one decoration
    if (start.line === end.line) {
        const decoration = createBorderDecoration('solid');
        editor.setDecorations(decoration, [new vscode.Range(start, end)]);
        return decoration;
    }
    
    // Create ranges for the different parts of multi-line selection
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

    // Create decorations for different parts of the box
    const decorations = {
        top: createBorderDecoration('solid none solid solid'),     // top, right, bottom, left
        middle: createBorderDecoration('none solid none solid'),   // top, right, bottom, left
        bottom: createBorderDecoration('none solid solid solid')   // top, right, bottom, left
    };

    // Apply decorations
    editor.setDecorations(decorations.top, [firstLineRange]);
    editor.setDecorations(decorations.middle, middleLineRanges);
    editor.setDecorations(decorations.bottom, [lastLineRange]);

    // Return the top decoration as a representative (all will need to be disposed)
    return decorations.top;
}

/**
 * Test function with hardcoded positions for CSS box decoration
 * @param editor Active text editor
 */
export function testCssBoxDecoration(editor: vscode.TextEditor): vscode.TextEditorDecorationType {
    // Define the selection to use for decoration
    const selection = !editor.selection.isEmpty
        ? { start: editor.selection.start, end: editor.selection.end } // Use current selection
        : { start: new vscode.Position(5, 4), end: new vscode.Position(10, 20) }; // Fallback to default
    
    // Apply the box decoration
    return createCssBoxDecoration(editor, selection.start, selection.end);
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

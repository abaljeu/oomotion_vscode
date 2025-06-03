import * as vscode from 'vscode';

/**
 * Creates a visual box decoration around a specified text range using CSS borders
 * @param editor The active text editor
 * @param start Start position of the box
 * @param end End position of the box
 */
export function createBoxDecoration(
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
    
    // Create the decoration type with CSS border styling
    const boxDecoration = vscode.window.createTextEditorDecorationType({
        border: '1px solid red',
        borderRadius: '2px',
        backgroundColor: 'rgba(255, 0, 0, 0.05)',
        overviewRulerColor: 'red',
        overviewRulerLane: vscode.OverviewRulerLane.Right
    });

    // Create a single decoration range from start to end
    const range = new vscode.Range(start, end);
    const decorations = [{ range }];
      // Apply the decoration to the editor
    editor.setDecorations(boxDecoration, decorations);
    
    return boxDecoration;
}

/**
 * Test function with hardcoded positions for box decoration
 * @param editor Active text editor
 */
export function testBoxDecoration(editor: vscode.TextEditor): vscode.TextEditorDecorationType {
    // Define the selection to use for decoration
    const selection = !editor.selection.isEmpty
        ? { start: editor.selection.start, end: editor.selection.end } // Use current selection
        : { start: new vscode.Position(5, 4), end: new vscode.Position(10, 20) }; // Fallback to default
    
    // Apply the box decoration
    return createBoxDecoration(editor, selection.start, selection.end);
}

/**
 * Adds decoration handlers to maintain decorations as document changes
 * @param editor The active editor
 * @param decoration The decoration type to maintain
 * @param start Starting position
 * @param end Ending position
 */
export function maintainBoxDecoration(
    editor: vscode.TextEditor,
    decoration: vscode.TextEditorDecorationType,
    start: vscode.Position,
    end: vscode.Position
): vscode.Disposable {
    // Create a disposable to clean up event handlers
    const disposable = vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document === editor.document) {
            // Recreate the decoration with possibly updated positions
            createBoxDecoration(editor, start, end);
        }
    });
    
    return disposable;
}

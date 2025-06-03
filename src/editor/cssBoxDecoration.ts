import * as vscode from 'vscode';

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
    
    // Create ranges for the different borders
    const firstLineRange = new vscode.Range(start, new vscode.Position(start.line, Number.MAX_SAFE_INTEGER));
    const lastLineRange = new vscode.Range(new vscode.Position(end.line, 0), end);
    
    // For middle lines (if any)
    const middleLineRanges: vscode.Range[] = [];
    for (let i = start.line + 1; i < end.line; i++) {
        middleLineRanges.push(new vscode.Range(
            new vscode.Position(i, 0),
            new vscode.Position(i, Number.MAX_SAFE_INTEGER)
        ));
    }    // Single line case - all borders in one decoration
    if (start.line === end.line) {
        const singleLineDecoration = vscode.window.createTextEditorDecorationType({
            border: '1px solid',
            borderColor: 'red',
            borderStyle: 'solid',
            borderRadius: '3px',
            backgroundColor: 'rgba(255, 0, 0, 0.05)'
        });
        
        editor.setDecorations(singleLineDecoration, [new vscode.Range(start, end)]);
        return singleLineDecoration;
    }// Multi-line case - we need different decorations for different parts
    const topBorderDecoration = vscode.window.createTextEditorDecorationType({
        border: '1px solid',
        borderColor: 'red',
        borderStyle: 'solid none solid solid', // top, right, bottom, left
        backgroundColor: 'rgba(255, 0, 0, 0.05)'
    });

    const middleBorderDecoration = vscode.window.createTextEditorDecorationType({
        border: '1px solid',
        borderColor: 'red',
        borderStyle: 'none solid none solid', // top, right, bottom, left
        backgroundColor: 'rgba(255, 0, 0, 0.05)'
    });

    const bottomBorderDecoration = vscode.window.createTextEditorDecorationType({
        border: '1px solid',
        borderColor: 'red',
        borderStyle: 'none solid solid solid', // top, right, bottom, left
        backgroundColor: 'rgba(255, 0, 0, 0.05)'
    });

    // Apply decorations
    editor.setDecorations(topBorderDecoration, [firstLineRange]);
    editor.setDecorations(middleBorderDecoration, middleLineRanges);
    editor.setDecorations(bottomBorderDecoration, [lastLineRange]);

    // Return the top decoration as a representative (all will need to be disposed)
    return topBorderDecoration;
}

/**
 * Test function with hardcoded positions for CSS box decoration
 * @param editor Active text editor
 */
export function testCssBoxDecoration(editor: vscode.TextEditor): vscode.TextEditorDecorationType {
    // Use either the current selection or hardcoded positions
    if (!editor.selection.isEmpty) {
        // Use the current selection as the box boundaries
        return createCssBoxDecoration(editor, editor.selection.start, editor.selection.end);
    } else {
        // Create a decoration box from line 5, column 4 to line 10, column 20 (fallback)
        const start = new vscode.Position(5, 4);
        const end = new vscode.Position(10, 20);
        return createCssBoxDecoration(editor, start, end);
    }
}

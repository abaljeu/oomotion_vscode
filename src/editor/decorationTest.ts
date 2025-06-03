import * as vscode from 'vscode';

/**
 * Creates a visual box decoration around a specified text range
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
    }    // Create the decoration type with styling
    const boxDecoration = vscode.window.createTextEditorDecorationType({
        borderRadius: '2px',
        backgroundColor: 'rgba(255, 0, 0, 0.05)',
        overviewRulerColor: 'red',
        overviewRulerLane: vscode.OverviewRulerLane.Right
    });

    // Array to hold all decoration ranges
    const decorations: vscode.DecorationOptions[] = [];

    // Handle single line case
    if (start.line === end.line) {
        const range = new vscode.Range(start, end);
        decorations.push({ range });
        editor.setDecorations(boxDecoration, decorations);
        return boxDecoration;
    }

    // Calculate max column for consistent visuals
    let maxColumn = 0;
    for (let i = start.line; i <= end.line; i++) {
        const lineLength = editor.document.lineAt(i).text.length;
        maxColumn = Math.max(maxColumn, lineLength);
    }

    // Create top border (start line)
    const startLineEndPos = new vscode.Position(
        start.line, 
        Math.max(editor.document.lineAt(start.line).text.length, maxColumn)
    );
    const topRange = new vscode.Range(start, startLineEndPos);
      decorations.push({ 
        range: topRange,
        renderOptions: {
            before: {
                contentText: '┌',
                color: '#ff0000',
            },
            after: {
                contentText: '┐',
                color: '#ff0000',
            }
        }
    });

    // Middle lines with vertical borders
    for (let i = start.line + 1; i < end.line; i++) {
        const lineLength = editor.document.lineAt(i).text.length;
        const lineStart = new vscode.Position(i, 0);
        const lineEnd = new vscode.Position(i, lineLength);
        const middleRange = new vscode.Range(lineStart, lineEnd);
        
        decorations.push({
            range: middleRange,
            renderOptions: {
                before: {
                    contentText: '│',
                    color: '#ff0000',
                },
                after: {
                    contentText: '│',
                    color: '#ff0000',
                }
            }
        });
    }

    // Create bottom border (end line)
    const endLineStartPos = new vscode.Position(end.line, 0);
    const bottomRange = new vscode.Range(endLineStartPos, end);
      decorations.push({ 
        range: bottomRange,
        renderOptions: {
            before: {
                contentText: '└',
                color: '#ff0000',
            },
            after: {
                contentText: '┘',
                color: '#ff0000',
            }
        }
    });

    // Apply all decorations
    editor.setDecorations(boxDecoration, decorations);
    
    return boxDecoration;
}

/**
 * Test function with hardcoded positions for box decoration
 * @param editor Active text editor
 */
export function testBoxDecoration(editor: vscode.TextEditor): vscode.TextEditorDecorationType {
    // Use either the current selection or hardcoded positions
    if (!editor.selection.isEmpty) {
        // Use the current selection as the box boundaries
        return createBoxDecoration(editor, editor.selection.start, editor.selection.end);
    } else {
        // Create a decoration box from line 5, column 4 to line 10, column 20 (fallback)
        const start = new vscode.Position(5, 4);
        const end = new vscode.Position(10, 20);
        return createBoxDecoration(editor, start, end);
    }
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

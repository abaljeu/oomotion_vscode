import { TextEditor, TextEditorEdit } from "vscode";
import { ActionKey } from "./types";
import { SimpleAction, SimpleActionMixin } from "./action";
import * as editorData from "../editor/editordata";
import * as vscode from "vscode";
import * as lodash from 'lodash';
import { testCssBoxDecoration } from "../editor/cssBoxDecoration";

/**
 * Action to test the CSS box decoration feature
 */
class CssBoxDecorationTestAction implements SimpleAction {
    name: string;
    title: string;
    key: ActionKey[];
    willBeRecord: boolean = false;
    canGoBack: boolean = false;
    state: editorData.StateName[] = ['NORMAL', 'SELECT'];
    when = undefined;
    private activeDecorations: vscode.TextEditorDecorationType[] = [];

    constructor(key: ActionKey[]) {
        this.name = "testCssBoxDecoration";
        this.title = "Test CSS Box Decoration";
        this.key = key;
    }
    
    async callback(data: editorData.EditorData, state: editorData.State): Promise<void> {
        // Clean up previous decorations to avoid cluttering the editor
        this.activeDecorations.forEach(decoration => {
            decoration.dispose();
        });
        this.activeDecorations = [];
        
        // Apply the test CSS box decoration and store it for cleanup
        const decoration = testCssBoxDecoration(data.editor.editor);
        this.activeDecorations.push(decoration);
        
        // Get the positions to provide a meaningful message
        const selection = data.editor.editor.selection;
        
        if (!selection.isEmpty) {
            vscode.window.showInformationMessage(
                `CSS Box decoration applied to selection from Line ${selection.start.line + 1}:${selection.start.character + 1} to Line ${selection.end.line + 1}:${selection.end.character + 1}`
            );
        } else {
            vscode.window.showInformationMessage("CSS Box decoration applied with hardcoded positions (lines 5-10)");
        }
    }
}

// Create a mixin of the action
const cssBoxDecorationTestAction = SimpleActionMixin(CssBoxDecorationTestAction);

// Export the CSS decoration test actions
export const cssBoxDecorationTestActions = [
    new cssBoxDecorationTestAction(['c']), // 'c' key to trigger the CSS-based test
];

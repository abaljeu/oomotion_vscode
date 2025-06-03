import { TextEditor, TextEditorEdit } from "vscode";
import { ActionKey } from "./types";
import { SimpleAction, SimpleActionMixin } from "./action";
import * as editorData from "../editor/editordata";
import * as vscode from "vscode";
import * as lodash from 'lodash';
import { testBoxDecoration } from "../editor/decorationTest";

/**
 * Action to test the box decoration feature
 */
class BoxDecorationTestAction implements SimpleAction {
    name: string;
    title: string;
    key: ActionKey[];
    willBeRecord: boolean = false;
    canGoBack: boolean = false;
    state: editorData.StateName[] = ['NORMAL', 'SELECT'];
    when = undefined;
    private activeDecorations: vscode.TextEditorDecorationType[] = [];

    constructor(key: ActionKey[]) {
        this.name = "testBoxDecoration";
        this.title = "Test Box Decoration";
        this.key = key;
    }    async callback(data: editorData.EditorData, state: editorData.State): Promise<void> {
        // Clean up previous decorations to avoid cluttering the editor
        this.activeDecorations.forEach(decoration => {
            decoration.dispose();
        });
        this.activeDecorations = [];
        
        // Apply the test box decoration and store it for cleanup
        const decoration = testBoxDecoration(data.editor.editor);
        this.activeDecorations.push(decoration);
        
        // Get the positions to provide a meaningful message
        const selection = data.editor.editor.selection;
        
        if (!selection.isEmpty) {
            vscode.window.showInformationMessage(
                `Box decoration applied to selection from Line ${selection.start.line + 1}:${selection.start.character + 1} to Line ${selection.end.line + 1}:${selection.end.character + 1}`
            );
        } else {
            vscode.window.showInformationMessage("Box decoration applied with hardcoded positions (lines 5-10)");
        }
    }
}

// Create a mixin of the action
const boxDecorationTestAction = SimpleActionMixin(BoxDecorationTestAction);

// Export the decoration test actions
export const decorationTestActions = [
    new boxDecorationTestAction(['b']), // 'b' key to trigger the test
];

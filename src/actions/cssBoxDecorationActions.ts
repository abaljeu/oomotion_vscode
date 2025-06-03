import { TextEditor, TextEditorEdit } from "vscode";
import { ActionKey } from "./types";
import { SimpleAction, SimpleActionMixin } from "./action";
import * as editorData from "../editor/editordata";
import * as vscode from "vscode";
import * as lodash from 'lodash';
import { testCssBoxDecoration, cleanupAllBoxDecorations } from "../editor/cssBoxDecoration";

/**
 * Action to test the CSS box decoration feature
 */
class CssBoxDecorationTestAction implements SimpleAction {
    name: string;
    title: string;
    key: ActionKey[];
    willBeRecord: boolean = false;
    canGoBack: boolean = false;
    state: undefined = undefined;  // Allow the action in any state
    when = undefined;
    private activeDecorations: vscode.TextEditorDecorationType[] = [];

    constructor(key: ActionKey[]) {
        this.name = "testCssBoxDecoration";
        this.title = "Test CSS Box Decoration";
        this.key = key;
    }    async callback(data: editorData.EditorData, state: editorData.State): Promise<void> {
        // Clean up all box decorations using the centralized cleanup function
        cleanupAllBoxDecorations();
        this.activeDecorations = [];
        
        // Apply the test CSS box decoration
        const decoration = testCssBoxDecoration(data.editor.editor);
        // We don't need to track this decoration separately anymore since it's tracked in cssBoxDecoration.ts
        
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
    new cssBoxDecorationTestAction(['alt+b']), // 'alt+b' key to trigger the CSS-based test
];

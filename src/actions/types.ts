// Types shared across action modules
// This file contains type definitions that need to be imported by multiple action modules
// to avoid circular dependencies.

import { StateName } from "../editor/editordata";

export type ActionKey = string | [string, string] | { key: string, mac: string };

/**
 * ActionSpec contains the data-only properties of an action.
 * This is VS Code-independent and can be used in scripts like package.ts
 * that don't have access to the VS Code API.
 */
export interface ActionSpec {
    name: string,
    title: string,
    state?: StateName[],
    key?: ActionKey[],
    when?: string,
    willBeRecord: boolean,
    canGoBack: boolean
}

/**
 * Utility function to extract ActionSpec from an Action object.
 * This is useful for scripts that need to work with action data
 * without importing VS Code-dependent types.
 */
export function toActionSpec(action: ActionSpec): ActionSpec {
    return {
        name: action.name,
        title: action.title,
        state: action.state,
        key: action.key,
        when: action.when,
        willBeRecord: action.willBeRecord,
        canGoBack: action.canGoBack
    };
}

// Central collection of all actions
// This file imports from all action modules to create the master action list

import { Action } from './action';
import { modeActions } from './mode';
import { moveActions } from './move';
import { findActions } from './find';
import { insertActions } from './insert';
import { undoActions } from './undo';
import { yankActions } from "./yank";
import { repeatActions } from "./history";
import { selectActions } from "./select";
import { evalActions } from './eval';
import { miscActions } from './misc';
import { easymotionActions } from "./easymotion";
import { modifiersActions } from "./modifiers";
import { decorationTestActions } from "./decorationTestActions";
import { cssBoxDecorationTestActions } from "./cssBoxDecorationActions";

export const actionList: Action[] = Array.prototype.concat(
    modeActions, 
    moveActions, 
    findActions, 
    insertActions, 
    undoActions, 
    yankActions, 
    repeatActions, 
    selectActions,    evalActions, 
    miscActions, 
    easymotionActions, 
    modifiersActions,
    decorationTestActions,
    cssBoxDecorationTestActions
);

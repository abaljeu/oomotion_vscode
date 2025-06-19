## OOmotion Commands
Objects modes are the foundation of calculating operations.  First one of the object scopes defined below are selected.  With that, 
the program analyzes the structure of the document or source code relative to the cursor and selection and identifies objects in the text that match the scope.  Some of these are given visual indicators 
### Categories
Modes - Edit / Select / ooSelect
Objects - char/word/line/tree/regex
Motions - hljk bn s f oO
Cursors - Add Subtract Next
Actions - copy/paste/delete/swap/change

| a-append | b-back               | c-change         | d-delete          | *e-*              | f-forward char       | g - goto                     | h- left                       | i- insert                            | j- down     |
| -------- | -------------------- | ---------------- | ----------------- | ----------------- | -------------------- | ---------------------------- | ----------------------------- | ------------------------------------ | ----------- |
| k - up   | l - right            | *m -*            | n - next          | o - out<br>O - in | p - paste            | *q*                          | *r*                           | s-search                             | t-tree      |
| u- undo  | *v*                  | w-word           | x- line           | y-yank            | *z*                  | ^ -char                      | % - swap cursor to front/back | `shift+space` - **sel mode**         | /           |
| `comma`  | . - repeat last edit | < - bigger scope | > - smaller scope | ; - **oomode**    | TAB - next selection | SHIFT+direction - add cursor | **-** remove selection/cursor | ALT+direction - swap with direction. | `backslash` |

### Objects
| OBJECTS (Scales)                                                   | Definition                                                                                                                                   | Alt Versions                                                                                 |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| CHAR ^                                                             | One character                                                                                                                                |                                                                                              |
| WORD w                                                             | A word, a lexical unit in the current language, which typically means letters, numbers, underscore.  Punctuation and whitespace is excluded. | small: CamelCase subwords, or underscore-separated subwords<br>big: include things like .->? |
| LINE x                                                             | All text of a line.                                                                                                                          | small: exclude the space at the beginning/end of a line.                                     |
| PARA p                                                             | All text between two blank lines.                                                                                                            |                                                                                              |
|                                                                    |                                                                                                                                              |                                                                                              |
| TREE t                                                             | Use syntax parsing to establish a parse tree of the document. Choose a level of the tree (starting with a leaf nearest the cursor).          |                                                                                              |
| BIGGER/smaller scope </ > <br>( or , and .)  see also move/in out. | With Tree mode, set the tree level one up or one down from current.<br>Char/smallword/word/bigword/smallline/Line/Para are also a scope set. |                                                                                              |
| SEARCH s`regex` `<Enter>`                                          | Matches whatever is in the regex.  In object mode will highlight the nearest match.                                                          |                                                                                              |
| FIND f `char`                                                      | Matches the given letter                                                                                                                     |                                                                                              |
|                                                                    |                                                                                                                                              |                                                                                              |
|                                                                    |                                                                                                                                              |                                                                                              |
Using fore/aft outlines, we show what will happen if we move foreward/backward by the current scope.

### Modes 

| MODE                    |                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| oo MODE ;               | - cursor(s) moves to next scope object, anchor  moves to matching end                                 |
| EXTEND MODE ` ~, Esc`   | Activate mode.  - cursor moves to next scope object; anchor stays.                                    |
| SWAP (alt+direction)    | - next scope object(s) and current selection(s) swap places                                           |
| MULTI (shift+direction) | - new selection added at next scope object.  becomes primary.  (OR, if moving to away from outermost) |

### Directions

|           | Always relative to the cursor position.  If multi-select, each selection has a cursor at the same relative position, though one of these is primary.                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UP j      | Move cursor to up one line and adjust position to match whatever the current object scope dictates.                                                                                                             |
| DOWN k    | Ditto but down                                                                                                                                                                                                  |
| LEFT h    | Move cursor to left, to previous scope object.  Same position relative to that object as currently.  But, if currently in the middle of a scope object, move to the start of that object.                       |
| RIGHT *l* | Move to right, to next                                                                                                                                                                                          |
| PREV b    | Same as h, unless we have a reason for left and previous to be different                                                                                                                                        |
| NEXT n    | Same as *l*                                                                                                                                                                                                     |
| Out       | **Out** expands selection left and right to the object scope.  Like `h%l` with a modifier to expand scope.  In Object mode, if we have a full scope, would select the previous and next in lieu of the current. |
| In        | **In** reduces selection by moving left in and right in also.  (Most common case, drop the parentheses from a tree scope)                                                                                       |
### Actions
| ACTIONS       |                                                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| DELETE d      |                                                                                                                                                                                                                                            |
| CHANGE c      |                                                                                                                                                                                                                                            |
| APPEND a      |                                                                                                                                                                                                                                            |
| INSERT i      | unselect, set cursor to front of selection, switch to edit mode                                                                                                                                                                            |
| INSERT`shift+space` | if nothing selected and `shift+space` is pressed, insert that character and switch to insert mode.  REASON: `shift+space` in insert mode will change to SELECT mode, so double shift+space will be effectively don't switch modes and draw a single `shift+space`. |
| UNSEL `-`.    | unselect the primary selection.  advance cursor to next selection and set as primary.                                                                                                                                                      |
| TAB           | switch primary selection to the next selection.                                                                                                                                                                                            |


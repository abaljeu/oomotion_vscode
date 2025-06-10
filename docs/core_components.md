# Core Components

## 1. EditorData and EditorManager

The `EditorData` class is the central component that maintains the state of each editor, including:
- The current editing state (NORMAL, INSERT, SELECT)
- The active selection mode
- References to VSCode's editor interface

```mermaid
classDiagram
    class EditorData {
        -State _state
        -SelectionMode _mode
        -EditorManager editor
        -StatusBarItem statusbar
        +getMode()
        +setState()
        +updateDecoration()
        +updateStatusBar()
    }
    
    class EditorManager {
        -TextEditor editor
        -SelectedObjGroup objcache
        +getSelections()
        +setSelections()
        +getTextObjects()
        +changeSelection()
    }
    
    EditorData --> EditorManager
```

The `EditorDataManager` maintains a mapping of editor instances to their corresponding `EditorData` objects.

## 2. Mode System

The mode system defines different ways to select and navigate text objects:

```mermaid
classDiagram
    class SelectionMode {
        <<interface>>
        +String name
        +TextEditorDecorationType decorationtype
        +selectionsToObjects()
    }
    
    class CharMode {
        +selectionsToObjects()
    }
    
    class WordMode {
        +selectionsToObjects()
    }
    
    class LineMode {
        +selectionsToObjects()
    }
    
    class TreeSitterMode {
        +selectionsToObjects()
    }
    
    SelectionMode <|-- CharMode
    SelectionMode <|-- WordMode
    SelectionMode <|-- LineMode
    SelectionMode <|-- TreeSitterMode
```

Each mode implements the `SelectionMode` interface and provides its own way to convert VSCode selections to text objects.

## 3. Action System

The action system processes user input and maps it to operations on the selected text objects:

```mermaid
graph TD
    A[User Input] --> B[Action Registry]
    B --> C{Action Type}
    C -->|Movement| D[Move Object]
    C -->|Edit| E[Edit Object]
    C -->|Mode Change| F[Change Mode]
    C -->|State Change| G[Change State]
```

Actions are registered centrally in `actionList.ts` and are grouped by functionality (movement, find, insert, undo, etc.).

## 4. Tree-Sitter Integration

OOMotion leverages Tree-sitter for syntax-aware text manipulation through its TreeSitterMode:

```mermaid
graph TD
    A[Document] --> B[Tree-Sitter Parser]
    B --> C[Syntax Tree]
    C --> D[Node Navigation]
    D --> E[Text Object Selection]
```

Tree-sitter provides syntax trees that allow the extension to select semantically meaningful units of code.

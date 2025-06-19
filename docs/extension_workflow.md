# Extension Workflow

The OOMotion extension follows a specific workflow from activation to user interaction:

```mermaid
sequenceDiagram
    participant User
    participant VSC as VSCode
    participant Ext as OOMotion Extension
    participant Editor as EditorData
    participant Mode as SelectionMode
    
    User->>VSC: Open editor
    VSC->>Ext: activate()
    Ext->>Ext: Register commands
    Ext->>Ext: Setup event handlers
    
    User->>VSC: Press key
    VSC->>Ext: Execute command
    Ext->>Editor: Process action
    Editor->>Mode: Get text objects
    Mode-->>Editor: Return selected objects
    Editor->>Editor: Apply changes
    Editor-->>VSC: Update UI
    VSC-->>User: Visual feedback
```

## Activation Flow

1. When VSCode starts, the `activate()` function in `extension.ts` runs
2. Commands are registered via the `registerAction()` function
3. Event handlers are set up for editor changes, selection changes, and document edits
4. The extension initializes with the editor in NORMAL mode

## Command Execution Flow

1. User presses a key mapped to an OOMotion command
2. VSCode calls the registered command handler
3. The handler retrieves the EditorData for the active editor
4. The appropriate action is executed based on the current state and mode
5. Selection and decorations are updated to provide visual feedback

## Key Event Processing

```mermaid
flowchart TD
    A[Key Press] --> B{Has Command?}
    B -->|Yes| C[Execute Command]
    B -->|No| D{State is INSERT?}
    D -->|Yes| E[Insert Character]
    D -->|No| F[Look for Key Sequence]
```

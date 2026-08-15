---
sidebar_position: 7
title: Modules
---

# Modules

A `.plain` file is one **module**: an optional YAML frontmatter between `---` markers, followed by specification sections marked with `***section name***` headers. The frontmatter, when present, must be the first thing in the file.

## Module Kinds

There are three kinds of modules:

- A **root module** lives at the repository root and carries behavior: it contains `***functional specs***`. To be renderable, a root module needs at least one functional spec plus the implementation reqs to build it — its own or from an `import`ed module (implementation reqs are not inherited through `requires`). A frontmatter-only file is a valid scaffold, but it cannot be rendered until a functional spec is added.
- A **requires module** is a root module that is used by another root module via the `requires` directive.
- An **import module** provides shared content that other modules pull in via `import`: it contains only `***definitions***`, `***implementation reqs***`, and/or `***test reqs***` — never `***functional specs***` and never a `requires` directive.

## YAML Frontmatter

The frontmatter is enclosed between `---` markers and can contain:

```yaml
---
description: "Optional description of this specification"
import:
  - module-name-1
  - module-name-2
requires:
  - dependency-module-1
  - dependency-module-2
exported_concepts:
  - :SharedConcept:
required_concepts:
  - :RequiredConcept:
---
```

| Field | Purpose |
|---|---|
| `description` | One-line summary of the module; recommended on every module |
| `import` | Pull definitions, implementation reqs, and test reqs from import modules |
| `requires` | Attach the module to the build chain of another root module |
| `exported_concepts` | Declare which of this module's concepts are visible to modules that `require` it |
| `required_concepts` | Declare concepts an import module expects the importing module to define |

### `import` Section

The `import:` section is used to include definitions, implementation requirements, and test requirements from other modules or templates. Imported modules should **not** contain functional specifications - they only provide reusable definitions and constraints.

**Example:**
```yaml
import:
  - typescript-react-app-template
```

Common use cases:
- Importing language-specific templates (e.g., `python-console-app-template`)
- Importing shared concept definitions
- Importing implementation and testing conventions

### `requires` Section

The `requires:` section specifies dependencies on other modules that must be built before this specification. Unlike `import:`, required modules can contain functional specifications and represent complete software modules.

**Example:**
```yaml
requires:
  - authentication-module
  - database-layer
```

Use `requires:` when your specification depends on functionality implemented in other modules that need to be generated first.

### `exported_concepts` Section

The `exported_concepts:` section declares which concepts from the current module are made available to other modules.

This is useful because concepts in ***plain must be defined before they are used. By exporting concepts, one module can provide shared concept definitions to the next module without introducing a separate third file just to hold shared definitions.

**Example:**
```yaml
requires:
  - authentication-module
  - database-layer
exported_concepts:
  - :PasswordManagerModule:
```

Use `exported_concepts:` when:
- A module defines concepts that other modules must reference
- You want to pass those concepts across module boundaries
- You want to avoid creating an extra shared-only module for concept definitions

### `required_concepts` Section

The `required_concepts:` section declares concepts that an import module references but does not define. It creates a contract: any module importing this file must define these concepts in its own `***definitions***` section — if it doesn't, the specification is invalid.

`required_concepts:` is used exclusively on import modules. The import module can reference the required concepts in its definitions, implementation reqs, or test reqs, but it must **not** define them itself — the whole point is that the importing module provides the definitions.

**Example:**
```plain
---
description: Import module that requires AppName and AppConfig to be defined by the importer
required_concepts:
  - :AppName:
  - :AppConfig:
---

***definitions***

- :MainFile: is the entry point for :AppName:.

***implementation reqs***

- :MainFile: should load :AppConfig: on startup.
```

In this example, `:AppName:` and `:AppConfig:` are referenced but not defined — every module that imports this import module must define both concepts in its own `***definitions***` section.

Use `required_concepts:` when:
- An import module references concepts that vary per project or per importing module
- You want the importing module to supply project-specific definitions for shared requirements

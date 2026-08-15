---
sidebar_position: 8
title: Extended syntax
---

# Extended Syntax

## YAML Frontmatter

The frontmatter is enclosed between `---` markers and can contain the `description`, `import`, `requires`, `exported_concepts`, and `required_concepts` fields.

```yaml
---
description: "Optional description of this specification"
import:
  - module-name-1
---
```

See [Modules](./modules#yaml-frontmatter) for details on the frontmatter fields and module kinds.

## Comments

Lines starting with `>` are ignored when rendering software code.

```plain
> This is an example of a comment in ***plain
```

## Liquid Templates

***plain specifications are processed with [Liquid](https://shopify.github.io/liquid/), an open-source template language created by Shopify, so the full Liquid syntax is available in your specifications.

Note that templates are expanded textually before the specification is interpreted — unlike `import`, which includes another module semantically (see [Modules](./modules)).

## Linked Resources

Specifications can reference external files for detailed UI specifications or other documentation.

Here's an example of a linked resource (see Task manager example application for the full specification).

```
- :User: should be able to add :Task:. The details of the user interface
  are provided in the file [task_modal_specification.yaml](task_modal_specification.yaml).
```

If you include a link using the markdown syntax, the linked resource will be passed along with the ***plain specification to the renderer.

**Important Notes:**
- Only links to files in the same folder (and its subfolders) as the ***plain specification are supported. Links to external resources are not supported.
- File paths are resolved relative to the location of the ***plain specification file.
- All types are supported, except binary files.

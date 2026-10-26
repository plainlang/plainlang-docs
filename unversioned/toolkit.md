---
title: Toolkit
description: The open-source stack that gives coding agents everything they need for regenerative software.
sidebar_position: 30
---

# Toolkit

| | What it does |
| --- | --- |
| [plain-forge](https://github.com/plainlang/plain-forge) | The authoring toolkit. Turns conversations with a coding agent into complete `.plain` specs, and keeps those specs accurate as the software evolves. |
| [pyro](https://github.com/plainlang/pyro) | The renderer, packaged as an agent skill. Lets the coding agent regenerate the implementation and its conformance tests from the specs on its own. |

## How they fit together

1. **Capture.** You describe what you want. plain-forge interviews you and writes the specification in ∗∗∗plain.
2. **Render.** pyro reads the specs, resolves module dependencies, and generates implementation code together with conformance tests that check the code against the specs.
3. **Evolve.** When requirements change, you change the specification. plain-forge keeps it consistent, pyro regenerates the software. Bugs are traced back to the spec and fixed there, not in the generated code.

Both tools are MIT licensed and developed in the open at [github.com/plainlang](https://github.com/plainlang).

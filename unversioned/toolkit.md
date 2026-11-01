---
title: Toolkit
description: The open-source stack that gives coding agents everything they need for regenerative software.
sidebar_position: 30
---

# Toolkit

| | What it does |
| --- | --- |
| [plain&#8209;forge](https://github.com/plainlang/plain-forge) | If you write your specifications together with a coding agent, [plain-forge](https://github.com/plainlang/plain-forge) installs the skills and rules the agent needs to produce ∗∗∗plain specs and to keep them accurate as the software evolves. |
| [pyro](https://github.com/plainlang/pyro) | The renderer, packaged as an agent skill. Lets the coding agent regenerate the implementation and its conformance tests from the specs on its own. |
| [plyn](https://marketplace.visualstudio.com/items?itemName=Codeplain.plyn) | If you're using Visual Studio Code or Cursor IDE, we also recommend installing ∗∗∗plain language extension. |


## How they fit together

1. **Capture.** You describe what you want. plain-forge interviews you and writes the specification in ∗∗∗plain.
2. **Regenerate.** pyro reads the specs, resolves module dependencies, and generates implementation code together with conformance tests that check the code against the specs.
3. **Evolve.** When requirements change, you change the specification. plain-forge keeps it consistent, pyro regenerates the software. Bugs are traced back to the spec and fixed there, not in the generated code.

Both tools are MIT licensed and developed in the open at [github.com/plainlang](https://github.com/plainlang).

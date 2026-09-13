---
sidebar_position: 1
title: Getting Started
---

# Getting Started

Welcome to the ∗∗∗plain documentation!

## What is ∗∗∗plain?

∗∗∗plain is a specification language designed for writing software requirements in a clear, structured format so that the specifications can become the source of truth for the software's functionality.

You can write ∗∗∗plain specifications in any editor or IDE of your choice. ∗∗∗plain files are textual files that can be committed to your code repository and reviewed through pull requests or any other review process that you already have in place for code.

This documentation will help you understand:

- [∗∗∗plain](./language-guide/) - specification language for capturing durable information about software
- [toolkit](./toolkit) - the open-source tools that coding agents use to write and render ∗∗∗plain specifications

## Toolkit

- **plain-forge** - If you write your specifications together with a coding agent, [plain-forge](https://github.com/plainlang/plain-forge) installs the skills and rules the agent needs to produce ∗∗∗plain specs and to keep them accurate as the software evolves.

- **renderer** - To render working software from ∗∗∗plain specifications you need a renderer. [pyro](https://github.com/plainlang/pyro) is an open-source renderer packaged as an agent skill, so that a coding agent can render the software on its own.

If you're using Visual Studio Code or Cursor IDE, we also recommend installing [∗∗∗plain language extension](https://marketplace.visualstudio.com/items?itemName=Codeplain.plyn).

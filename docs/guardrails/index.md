---
title: guardrails
description: The guardrails ∗∗∗plain puts on natural language, and what each one constrains.
---

A guardrail is a rule that limits what a specification can say, so that what it does say is precise enough to regenerate software from and testable enough to trust. Each guardrail is meant to be enforced: either the renderer rejects a specification that breaks it, or the generated tests check that the implementation honors it.

∗∗∗plain specifications are written in natural language inside these guardrails. This section describes each of them.

## The guardrails

- [Basic syntax](./basic-syntax) - a `.plain` file has fixed sections, and each kind of knowledge belongs in exactly one of them
- [Definitions](./definitions) - every concept is defined before it is used, and every concept name is unique
- [Implementation reqs](./implementation-reqs) - decisions about how the software is built are stated as constraints the agent must follow
- [Test reqs](./test-reqs) - how conformance tests are built and run is stated, not what the tests check
- [Functional specs](./functional-specs) - each one describes a single behavior and is small enough to regenerate reliably
- [Test scenarios](./test-scenarios) - every functionality carries its own test scenarios, and the renderer generates exactly those tests
- [Modules](./modules) - a specification can be split into several `.plain` files that are rendered together, and each kind of module may contain only certain sections

## Supporting pages

- [Extended syntax](./extended-syntax) - frontmatter, comments, Liquid templates, and linked resources
- [Best practices](./best-practices) - how to write specifications that stay within the guardrails
- [Glossary](./glossary)

## Additional resources

- [Standard Template Library](https://github.com/Codeplain-ai/codeplain/tree/main/standard_template_library)
- [Example specifications](https://github.com/Codeplain-ai/plainlang-examples)
- [plain-forge](https://github.com/plainlang/plain-forge) - toolkit for writing and maintaining ∗∗∗plain specifications inside a coding agent
- [pyro](https://github.com/plainlang/pyro) - open-source renderer that regenerates working, tested code from ∗∗∗plain specifications

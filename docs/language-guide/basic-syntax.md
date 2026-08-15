---
sidebar_position: 1
title: Basic Syntax
---

# Basic Syntax

## About ***plain programming language

***plain is a specification language designed for writing software requirements in a clear, structured format.

Here's an example of a "hello, world" program in ***plain.

```plain
***implementation reqs***

- :Implementation: should be in Python.

***functional specs***

- Display "hello, world"
```

## `.plain` File Structure

A `.plain` file is one [module](./modules). It consists of an optional [YAML frontmatter section](./modules#yaml-frontmatter) followed by several standardized sections marked with `***section name***` headers.

There are four types of specification sections:

- `***definitions***`
- `***implementation reqs***`
- `***test reqs***`
- `***functional specs***`

Each section appears at most once per file, and all sections are optional — which ones are allowed depends on the [module kind](./modules#module-kinds). To be renderable, a module needs at least one functional spec plus the implementation reqs to build it — its own or imported from another module.

Write sections in the canonical order given above. Definitions come first because every concept must be defined before it is referenced. Functional specs come last because they are rendered incrementally and their nested acceptance tests close the file.

Functional specs must reside in leaf sections while other specifications can be placed also in non-leaf sections. Specifications in non-leaf sections apply not just to the section itself but to all of its subsections.

### Section Ownership

Each kind of fact is read **only from its owning section** — a requirement placed in the wrong section is silently ignored, not flagged. Before writing any requirement, place it by content:

| Content | Owning section |
|---|---|
| Concepts (`:CamelCaseToken:`) | `***definitions***` |
| HOW the software is built — tech stack, architecture, coding standards — and everything about `:UnitTests:` | `***implementation reqs***` |
| Everything about `:ConformanceTests:` — framework, run command, mocking and network policy | `***test reqs***` |
| WHAT the software does — observable, language-agnostic behavior | `***functional specs***` |
| End-to-end workflow verification of one functional spec | nested `***acceptance tests***` |

## Definitions

The `***definitions***` specification is a list of definitions of new concepts.

Here's an example of a simple definition.

```plain
- :App: implements a task manager application.
```

In this case, the concept name is `:App:`. Concepts are important for refering to definitions in the rest of the specification.

See [Definitions](./definitions) for more information.

## Implementation Reqs

The `***implementation reqs***` specification is a list of instructions that steer software code implementation and provide details of execution environment.

Here's an example of a simple instruction specifying only that the ***plain specification should be rendered to Python software code.

```plain
- :Implementation: should be in Python.
```

The instructions should be provided in natural language. There are no restrictions on the form or the complexity of the instruction except that they need to be given as a markdown list.

See [Implementation Reqs](./implementation-reqs) for more information.

## Test Reqs

The `***test reqs***` specification is a list of instructions that steer implementation of conformance tests and provide details of testing environment.

**Conformance tests** is the generated code used to verify that the functional spec is implemented according to the specification.

Here's an example specification of test reqs.

```plain
- :ConformanceTests: of :App: should be implemented in Python using Unittest framework.
```

See [Test Reqs](./test-reqs) for more information.

## Functional Specs

The `***functional specs***` specification provides a description of functionality that should be rendered to software code. The descriptions should be provided in natural language as a markdown list.

Here's an example of a simple description of the functionality of the "hello, world" application.

```plain
- Display "hello, world"
```

See [Functional Specs](./functional-specs) for more information.

## Acceptance Tests

Acceptance tests can be used to further refine the functional spec and especially to incorporate constraints on the implementation.

Acceptance tests are specified with a keyword `***acceptance tests***` as a subsection within `***functional specs***` section. Each acceptance tests must be an item in a list. Note that `***acceptance tests***` is never a top-level section — it appears only nested under a single functional spec.

Here's an example of a "Hello, World" application with one acceptance test.

```plain
***functional specs***

- Display "hello, world"

  ***acceptance tests***

  - :App: shouldn't show logging output in the console output (neither in stdout nor stderr).
```

See [Acceptance Tests](./acceptance-tests) for more information.

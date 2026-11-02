---
sidebar_position: 1
title: Basic Syntax
---

# Basic Syntax

## About ∗∗∗plain

∗∗∗plain is a set of guardrails on the natural language used to describe durable system knowledge of software systems.

Here's an example of a "hello, world" program in ∗∗∗plain.

```plain
***implementation reqs***

- :Implementation: should be in Python.

***functional specs***

# display-hello-world
The text "hello, world" is displayed.
```

## `.plain` File Structure

A `.plain` file is either a specification file or a test plain file. A specification file is one [module](./modules): an optional [YAML frontmatter section](./modules#yaml-frontmatter) followed by several standardized sections marked with `***section name***` headers. A [test plain file](./test-scenarios) holds the test scenarios of one functionality.

There are four types of specification sections:

- `***definitions***`
- `***implementation reqs***`
- `***test reqs***`
- `***functional specs***`

Each section appears at most once per file, and all sections are optional — which ones are allowed depends on the [module kind](./modules#module-kinds). To be renderable, a module needs at least one functional spec plus the implementation reqs to build it — its own or imported from another module.

Write sections in the canonical order given above. Definitions come first because every concept must be defined before it is referenced. Functional specs come last because they are rendered incrementally.


### Section Ownership

Each kind of fact is read **only from its owning section** — a requirement placed in the wrong section is silently ignored, not flagged. Before writing any requirement, place it by content:

| Content | Owning section |
|---|---|
| Concepts (`:CamelCaseToken:`) | `***definitions***` |
| HOW the software is built — tech stack, architecture, coding standards — and everything about `:UnitTests:` | `***implementation reqs***` |
| Everything about `:ConformanceTests:` — framework, run command, mocking and network policy | `***test reqs***` |
| WHAT the software does — observable, language-agnostic behavior | `***functional specs***` |
| Test scenarios of one functionality, conformance and acceptance | its [test plain file](./test-scenarios) |

## Definitions

The `***definitions***` specification is a list of definitions of new concepts.

Here's an example of a simple definition.

```plain
- :App: implements a task manager application.
```

In this case, the concept name is `:App:`. Concepts are important for referring to definitions in the rest of the specification.

See [Definitions](./definitions) for more information.

## Implementation Reqs

The `***implementation reqs***` specification is a list of instructions that steer software code implementation and provide details of execution environment.

Here's an example of a simple instruction specifying only that the ∗∗∗plain specification should be rendered to Python software code.

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

The `***functional specs***` specification provides a description of functionality that should be rendered to software code. Each functionality starts with a `# func-id` heading, followed by its description in natural language.

Here's an example of a simple description of the functionality of the "hello, world" application.

```plain
# display-hello-world
The text "hello, world" is displayed.
```

See [Functional Specs](./functional-specs) for more information.

## Test Scenarios

Test scenarios never go in the `.plain` file that holds the functional specs. A test plain file holds the scenarios of one functionality: the `***conformance tests***` section should include core tests of the functionality, while the `***acceptance tests***` section should include edge cases and other learnings from production use of software.

Here's the test plain file of the "hello, world" application.

```plain
---
module: hello_world
func_id: display-hello-world
---

***conformance tests***

# prints-hello-world
Running the application prints "hello, world".
  - The application exits with status code 0.

***acceptance tests***

# no-logging-output
Running the application prints nothing to the console but the line "hello, world", neither on stdout nor on stderr.
```

See [Test Scenarios](./test-scenarios) for more information.

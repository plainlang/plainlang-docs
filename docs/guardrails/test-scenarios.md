---
sidebar_position: 6
title: Test Scenarios
---

# Test Scenarios

The test scenarios of one functionality live in a **test plain file** of their own. The renderer generates the conformance tests and the acceptance tests from these scenarios and from nothing else. It never invents a test. A functionality is considered regenerated only when all of its test scenarios pass.

**Key Points:**
- One test plain file holds the scenarios of one functionality
- `***conformance tests***` holds the core tests of the functionality, `***acceptance tests***` the edge cases
- Each scenario is a `# scenario-id` heading followed by free text
- The renderer generates one test per scenario and labels that test with the scenario-id
- Scenarios describe observable behavior. They never name a function, a class or a file of the implementation.

## The Test Plain File

A test plain file is a `.plain` file with a [YAML frontmatter](./modules#yaml-frontmatter) and two sections, in this order: `***conformance tests***`, then `***acceptance tests***`. Both sections are required. Both may be empty.

The frontmatter has exactly two fields. Together they bind the file to one functionality:

| Field | Purpose |
|---|---|
| `module` | Name of the module that holds the functionality — the `.plain` file name without `.plain` |
| `func_id` | The [func-id](./functional-specs#func-ids) of the functionality |

A test plain file has none of the sections of a specification file: no `***definitions***`, no `***implementation reqs***`, no `***test reqs***` and no `***functional specs***`.

By convention a test plain file lives at `tests/<module>/<func-id>.plain`, with `tests/` next to the specification file. The location and the file name are convention only — the renderer binds a test plain file by its frontmatter, not by its path. It reads test plain files from the folders named by the `tests-folder` key of `config.yaml`, and from `tests` next to the specification file when that key is not set.

## Syntax

```plain
---
module: module-name
func_id: func-id
---

***conformance tests***

# scenario-id
What is done and what result is expected.

***acceptance tests***

# another-scenario-id
What is done and what result is expected.
```

A scenario-id follows the same syntax as a func-id: lowercase letters, digits and hyphens. It must be unique among the scenarios of the same functionality. The generated test carries the scenario-id in its name, so a failing test leads back to the scenario that it implements.

A scenario can reference every concept visible to its module. It defines no concepts of its own.

## Conformance Scenarios

The `***conformance tests***` section holds the core tests of the functionality: the checks that it is properly implemented. They cover the main path, with valid parameters, the expected caller and the data present.

## Acceptance Scenarios

The `***acceptance tests***` section holds the edge cases of the functionality — invalid parameters, wrong or missing authentication, missing data — and what is learned from running the software in production. An acceptance scenario is rendered after the conformance tests of its functionality pass.

A scenario may use functionalities rendered before the one it is bound to, for its setup or as the steps of a longer path. Such a scenario belongs to the last functionality it exercises. The kind of check decides the section, not the number of functionalities the scenario touches.

## Empty Sections

A test plain file does not have to hold a scenario. The minimal valid file is the frontmatter and the two section markers.

```plain
---
module: hello_world
func_id: display-hello-world
---

***conformance tests***
> add conformance test scenarios here

***acceptance tests***
```

The renderer generates no conformance tests for such a functionality and runs none, and it warns. The comment `> add conformance test scenarios here` marks the work that is still to do.

## Example

A functionality in `hello_world.plain`:

```plain
***functional specs***

# display-hello-world
The text "hello, world" is displayed.
```

and its test plain file `tests/hello_world/display-hello-world.plain`:

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

# runs-fast
Running the application completes in under 1 second.
```

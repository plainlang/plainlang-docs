---
sidebar_position: 11
title: Migrating from 0.3
---

# Migrating from 0.3

∗∗∗plain 0.4 changes how a functionality is named and where its tests are written. There is no backward compatibility: a 0.3 specification is an error for a 0.4 renderer. Use your favorite coding agent to transform old ∗∗∗plain files to the 0.4 format. The steps below convert one module.

The [0.3 documentation](/docs/0.3/) stays available.

## What Changed

| 0.3 | 0.4 |
|---|---|
| A functional spec is a `- ` bullet, named by its position (`2.3`) | A functional spec is a `# func-id` heading, named by its func-id |
| Acceptance tests are a nested `***acceptance tests***` subsection | Scenarios live in a [test plain file](./test-scenarios), one per functionality |
| The renderer invents the conformance tests | The renderer implements the scenarios of the test plain file, and nothing else |
| `--render-range` and `--render-from` take positions | They take func-ids |

## Steps

1. **Give every functional spec a func-id.** Replace the `- ` bullet with a `# func-id` heading, and put the text of the bullet on the line below it. A func-id is lowercase letters, digits and hyphens, and must be unique in the module. Keep the order of the functionalities: it is the render order.

2. **Indent the clarification bullets.** The bullets that clarify a functional spec stay under it, indented by two spaces.

3. **Delete the nested `***acceptance tests***` subsections.** Keep their text — step 5 needs it.

4. **Create a test plain file per functionality** at `tests/<module>/<func-id>.plain`. The frontmatter has the two fields `module` and `func_id`. Both sections are required, and both may be empty. By convention an empty conformance section carries the comment `> add conformance test scenarios here`.

5. **Move the old acceptance tests into the new file**, by the kind of check each one makes. A core test of the functionality goes under `***conformance tests***`. An edge case — invalid parameters, wrong or missing authentication, missing data — goes under `***acceptance tests***`. Give each scenario a `# scenario-id` heading.

6. **Add `tests-folder: tests` to `config.yaml`.** The renderer then reads the test plain files from `tests/`.

7. **Run `plain-healthcheck`.** It reports a functionality without a test plain file, a test plain file bound to a functionality that does not exist, and a duplicate func-id or scenario-id.

8. **Write the missing conformance scenarios.** In 0.3 the renderer invented the conformance tests, so most functionalities have none written down. A functionality with an empty test plain file is rendered, but no conformance test is generated or run for it. The `add-test-scenarios` skill of plain-forge writes the scenarios together with you.

## Before and After

A functional spec in 0.3:

```plain
***functional specs***

- :User: should be able to add :Task:. Only valid :Task: items can be added.

  ***acceptance tests***

  - :App: should add a :Task: named "Buy milk" to :TaskList:.
  - :App: shouldn't add a :Task: with an empty name.
```

The same functionality in 0.4:

```plain
***functional specs***

# add-task
A :User: can add a :Task:. Only valid :Task: items are added.
```

and its test plain file `tests/task-manager/add-task.plain`:

```plain
---
module: task-manager
func_id: add-task
---

***conformance tests***

# add-task-with-name
A :User: adds a :Task: named "Buy milk".
  - The :Task: appears in :TaskList: with the name "Buy milk".

***acceptance tests***

# add-task-without-name
A :User: adds a :Task: with an empty name.
  - The :Task: is not added and :TaskList: is unchanged.
```

## Renders in Progress

A render of a 0.3 specification cannot be resumed. The render state names each functionality by its position, and 0.4 names it by its func-id. Start the converted module from the first functionality.

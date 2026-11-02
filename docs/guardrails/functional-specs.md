---
sidebar_position: 5
title: Functional Specs
---

# Functional Specs

The `***functional specs***` section describes what are the functionalities of the software. Each `# func-id` heading represents a functionality that will be implemented.

**Key Points:**
- Each functionality starts with a `# func-id` heading, followed by free text that describes the behavior
- Use defined concepts (`:ConceptName:`) to maintain consistency
- Keep functional specs clear and testable
- Functional specs can reference external specification files
- Functional specs are rendered incrementally one by one. Consequently earlier functional specs cannot reference later functional specs.
- Each functional spec must be [limited in complexity](#complexity-limit)
- The test scenarios of a functionality live in its [test plain file](./test-scenarios), never in this section

## Func-ids

A func-id is the name of one functionality. It consists of lowercase letters, digits and hyphens, and it must be unique in the module. It does not have to describe the functionality. Where the module is needed, write the func-id as `<module>:<func-id>`.

A func-id is an identity, not a label. A functionality keeps its func-id for as long as it exists, even when its text changes.

## Syntax

```plain
***functional specs***

# func-id
Statement of what the software does, using the concepts defined above.
  - A detail that clarifies the statement.

# another-func-id
Another statement.
```

The first line of the body states the behavior. The lines below it add the detail that makes the statement unambiguous. No body line starts with `# ` or with `***`.

## Complexity Limit

Each functional spec must be limited in complexity. For example, for the functional spec

```plain
# task-manager
:App: is a task manager application.
```

the renderer of ***plain source to software code should respond with

```
Functional spec too complex!
```

In such case you need to break down the functionality into smaller, less-complex functional specs.

Here's an example how to do such a break down in the case of a task manager application.

```plain
# entry-point
:App: has an entry point.

# show-task-list
The :TaskList: is displayed.

# add-task
A :User: can add a :Task:. Only valid :Task: items are added.

# delete-task
A :User: can delete a :Task:.

# edit-task
A :User: can edit a :Task:.

# complete-task
A :User: can mark a :Task: as completed.
```

## Example

```plain
***functional specs***

# add-task
A :User: can add a :Task:. Only valid :Task: items are added.

# delete-task
A :User: can delete a :Task:.

# edit-task
A :User: can edit a :Task:.

# complete-task
A :User: can mark a :Task: as completed.

# show-task-list
The :TaskList: is displayed.
```

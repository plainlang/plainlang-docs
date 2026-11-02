---
sidebar_position: 9
title: Best Practices
---

# Best Practices

1. **Start with Imports**: Import relevant templates before defining your own concepts
2. **Define Before Use**: Always define concepts in `***definitions***` before using them
3. **Be Specific**: Write clear, testable requirements in functional specs
4. **Write Test Scenarios**: Give every functionality a test plain file with at least one conformance scenario
5. **Leverage Templates**: Use the standard template library for common patterns
6. **Keep It Simple**: ∗∗∗plain specifications should be readable by both humans and AI
7. **Reference Concepts Consistently**: Use [concept notation](./definitions/concept-notation) to disambiguate key concepts

## Complete Example

Here's `task-manager.plain`, the specification of a task manager application.

```plain
---
description: "Task Manager Application"
import:
  - python-console-app-template
---

***definitions***

- :User: is the user of :App:

- :Task: describes an activity that needs to be done by :User:. :Task: has:
  - Name - a short description (minimum 3 characters, required)
  - Notes - additional details (optional)
  - Due Date - completion deadline (optional)

- :TaskList: is a list of :Task: items.
  - Initially :TaskList: should be empty.

***implementation reqs***

- :MainExecutableFile: of :App: should be called "taskmgr.py".

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

Every functionality carries its own test plain file. Here's `tests/task-manager/add-task.plain`, the scenarios of `add-task`.

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

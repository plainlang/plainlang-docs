---
title: regenerative software
description: What regenerative software is, why it matters now that code is cheap to produce, and how ∗∗∗plain fits into it.
sidebar_position: 10
---

# regenerative software

Regenerative software is software whose code is treated as a disposable artifact. Its implementation can be regenerated from durable system knowledge as requirements and understanding evolve.

That knowledge consists of the specifications that state what the software must do, the tests that any implementation must pass, the architecture decision records (ADRs) that define how the system is shaped, and anything else that is required so that the code can be safely deleted and regenerated at any time.

The term comes from Chad Fowler's essay series [The Phoenix Architecture](https://chadfowler.com/regenerative-software/), started in December 2025. Fowler describes regenerative systems as “systems designed to burn and be reborn, continuously, without losing their identity.”


## Why regenerate code instead of maintaining it 

As our understanding improves, software should be able to grow with it. Yet changes to existing code have to accommodate earlier decisions, including misunderstandings. Regeneration lets us rebuild around what we know now, so the software’s structure can evolve along with our understanding.

Making this a routine practice was previously too expensive. Coding agents change the economics: when implementations are cheap to generate, we can afford to replace them as our understanding improves. That makes it practical to design software whose parts are expected to be regenerated.

For this to work, what we learn must survive when the code is replaced. The system’s intent, its interfaces and its expected behavior need to be clearly recorded. Tests and evaluations check whether each new implementation meets those expectations. As we learn, we improve both the instructions for rebuilding and the checks for correctness.

This requires clear boundaries so individual parts can be replaced safely. Fowler calls the principle [“durability through disposability”](https://chadfowler.com/regenerative-software/3majnyfydzs2y/): a system lasts because its implementations can be renewed. Its knowledge keeps growing, while its code can be rebuilt to reflect that knowledge.


## How ∗∗∗plain fits 

## Further reading

- [The Phoenix Architecture](https://chadfowler.com/regenerative-software/), Chad Fowler’s essay series on regenerative software
- [Regenerative Software](https://www.oreilly.com/library/view/regenerative-software/0642572383954/), Chad Fowler's book, O'Reilly, forthcoming
- [Code should be regenerated, not maintained](https://thenewstack.io/codeplain-spec-driven-regenerative-code/), The New Stack article on Codeplain

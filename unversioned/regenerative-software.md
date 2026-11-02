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

Regeneration only works if the durable system knowledge is written down precisely enough to regenerate from and clearly enough to test against. Natural language on its own is neither. ∗∗∗plain puts guardrails on it: every concept must be defined before it is used, every functional spec must be small enough to regenerate reliably, and every decision about how the software is built must be stated as a constraint the agent has to follow. The guardrails work in both directions. They limit what a specification can say, and the specification in turn limits what the coding agent can produce.

Each kind of durable knowledge has its place in a `.plain` file:

| Durable knowledge | In ∗∗∗plain |
| --- | --- |
| What the software must do | [Functional specs](/docs/guardrails/functional-specs), built on [definitions](/docs/guardrails/definitions) that fix the meaning of every concept they use |
| Tests any implementation must pass | [Test scenarios](/docs/guardrails/test-scenarios) written by the author, one file per functionality, and the conformance tests generated from them under the rules in [test reqs](/docs/guardrails/test-reqs) |
| Decisions about how the system is shaped | [Implementation reqs](/docs/guardrails/implementation-reqs), which play the role of architecture decision records |

The [toolkit](/toolkit) runs the loop. plain-forge captures requirements from a conversation with a coding agent and keeps the specification accurate as the software evolves. pyro regenerates the implementation and its conformance tests from the specification, so a change in understanding becomes a change to the spec, never a patch to generated code.

## Further reading

- [The Phoenix Architecture](https://chadfowler.com/regenerative-software/), Chad Fowler’s essay series on regenerative software
- [Regenerative Software](https://www.oreilly.com/library/view/regenerative-software/0642572383954/), Chad Fowler's book, O'Reilly, forthcoming
- [Code should be regenerated, not maintained](https://thenewstack.io/codeplain-spec-driven-regenerative-code/), The New Stack article on Codeplain

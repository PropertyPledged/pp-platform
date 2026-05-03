---
name: One component per file
description: User prefers each React component in its own file, no matter how small
type: feedback
---

Each React component must live in its own dedicated file, even if it's tiny (e.g. a single div wrapper, an icon button, a small label). Never co-locate multiple component definitions in one file.

**Why:** User explicitly stated this as a housekeeping preference.

**How to apply:** When creating or refactoring components, always split into individual files. If a component is very small, create a file for it anyway.

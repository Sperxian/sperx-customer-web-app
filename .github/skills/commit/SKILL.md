---
name: commit
description: "Create a Git commit using this repository's ticket-prefixed commit message convention. Use when the user asks to commit changes or invokes /commit."
user-invocable: true
---

# Commit Changes

Create a commit for the intended changes using the repository's commit message convention.

## Commit message format

Use a ticket key, a colon, and a concise sentence-case summary:

`SPX-70: Cap wallet top-up amounts`

- Use the ticket key from the current branch name when available (for example, `feature/SPX-70_wallet-work`).
- If no ticket key is available from the branch or user context, ask the user for one rather than inventing or omitting it.
- Keep the summary concise, sentence case, and without trailing punctuation.
- Do not add a scope in parentheses or use a Conventional Commits type prefix.

## Procedure

1. Inspect `git status` and the staged and unstaged diffs. Do not include unrelated changes.
2. Confirm the intended changes are ready to commit; run relevant validation when needed.
3. Determine the ticket key and write the subject in the required format.
4. Stage only the intended files and create the commit. Do not amend an existing commit unless the user explicitly asks.
5. Do NOT include the required `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>` trailer in the commit message.
6. Report the resulting commit hash and subject.

## Context

`/image` currently stores prompt, references, results, elapsed time, and `running` as page-level state. The Start button is disabled while `running` is true, so any in-flight batch prevents a new draft from starting another generation.

## Goals / Non-Goals

**Goals:**

- Let users create a new workbench task and start generation while an older task is still running.
- Keep each task's form snapshot, result slots, elapsed time, and saved log isolated.
- Preserve the existing count-based parallel slot behavior inside one task.

**Non-Goals:**

- No backend API changes.
- No persisted draft/task list beyond the existing generated-history log.
- No cancellation or queue management in this change.

## Decisions

- Use a small task object in `page.tsx` for editable state: prompt, references, results, running, startedAt, elapsedMs, and previewLog.
  - Rationale: the feature only affects the image workbench page, so a local state shape keeps the change surgical.
  - Alternative considered: a global Zustand store. That would make sense for cross-page task management, but this request is page-local.
- Keep a list of task objects plus an active task id.
  - Rationale: in-flight tasks must remain addressable after the user clicks "新建".
  - Alternative considered: leave only the current task and store in-flight promises in refs. That would not provide a clear place to display completed results for prior tasks.
- Save logs from the immutable request snapshot instead of reading current form state at completion.
  - Rationale: users may switch tasks or edit the current draft while older requests are still running.

## Risks / Trade-offs

- Multiple simultaneous image requests may hit provider rate limits -> existing per-slot error handling will show failures on the affected task.
- More task cards can increase page state size -> only active session state is kept in memory, while completed durable history still uses the existing log store.

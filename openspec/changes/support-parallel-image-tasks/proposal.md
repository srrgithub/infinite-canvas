## Why

The image workbench currently uses one page-level running flag, so a long generation locks the Start button even after the user creates a new workspace draft. Users need to start another image task while an earlier task is still running.

## What Changes

- Replace the image workbench's page-level generation lock with task-scoped running state.
- Let "新建" create a fresh draft that can start generation while previous tasks continue.
- Keep each task's prompt, references, results, elapsed time, and completion log isolated.
- Preserve the existing per-task multi-image generation behavior from the count setting.

## Capabilities

### New Capabilities

- `image-workbench-tasks`: Defines image workbench task isolation and parallel generation behavior.

### Modified Capabilities

- None.

## Impact

- Affects `web/src/app/(user)/image/page.tsx`.
- No API, database, or dependency changes.

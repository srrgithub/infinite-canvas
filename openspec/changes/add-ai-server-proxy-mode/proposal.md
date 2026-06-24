## Why

Some OpenAI-compatible providers do not send browser CORS headers for `/v1/models` or generation endpoints, so direct browser requests fail before the app can read the response. Users need an optional same-origin server proxy path for trusted deployments where the app server may relay AI API requests.

## What Changes

- Add an optional server proxy mode for AI model channels.
- Route model listing and AI generation requests through a Next.js API endpoint when proxy mode is enabled.
- Keep direct browser requests as the default behavior for existing channels.
- Validate proxied target URLs so the app does not become an arbitrary open proxy.

## Capabilities

### New Capabilities
- `ai-server-proxy-mode`: Optional per-channel server proxying for AI provider requests that are blocked by browser CORS.

### Modified Capabilities

## Impact

- Affects AI channel configuration in `web/src/stores/use-config-store.ts`.
- Affects model fetching and AI request helpers under `web/src/services/api/`.
- Adds a Next.js route under `web/src/app/api/`.
- Updates configuration UI in `web/src/components/layout/app-config-modal.tsx`.

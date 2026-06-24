## Context

AI requests are currently sent directly from the browser to the configured provider base URL. This keeps API keys in the browser as documented, but it fails for providers that do not allow browser CORS on `/v1/models` or generation endpoints.

The app already has a small same-origin proxy pattern for WebDAV. AI proxying needs a narrower route that understands AI requests, keeps streaming responses intact, and avoids becoming an arbitrary open relay.

## Goals / Non-Goals

**Goals:**
- Add an explicit per-channel proxy mode for trusted deployments.
- Proxy model listing, streaming responses, image generation, audio generation, and video task requests when enabled.
- Preserve direct browser requests as the default path.
- Keep provider-specific request payloads unchanged.

**Non-Goals:**
- Do not make server proxying mandatory.
- Do not store API keys on the server.
- Do not add provider-specific model aliases or fake model lists.
- Do not solve provider authentication or quota errors.

## Decisions

- Add a `proxyMode` field to each model channel.
  - Rationale: CORS behavior is provider/deployment-specific, so users can enable proxying only where needed.
  - Alternative considered: a global proxy switch. This is simpler but too broad for multi-channel setups.

- Add one Next.js route for AI proxy requests.
  - Rationale: Existing image/audio/video helpers can share one same-origin relay without adding provider-specific backend endpoints.
  - Alternative considered: separate `/api/ai-models`, `/api/ai-images`, etc. This duplicates relay logic and still needs shared streaming behavior.

- Use the proxy only after the client has built the exact provider URL.
  - Rationale: Existing `buildApiUrl`, Gemini URL building, and Ark Plan normalization stay the source of truth.
  - Alternative considered: have the server rebuild URLs from base URL and path. That spreads provider URL rules across client and server.

- Forward only request headers needed for AI APIs and response headers needed by callers.
  - Rationale: Keeps the proxy small and avoids leaking browser-specific headers upstream.

## Risks / Trade-offs

- API keys pass through the app server when proxy mode is enabled -> Make proxy mode explicit and document that it is for trusted deployments.
- The proxy could be abused as an open proxy -> Require valid `http:`/`https:` targets and keep the route scoped to app callers rather than accepting arbitrary browser navigation.
- Streaming responses may be buffered by some hosting platforms -> Return the upstream body directly and preserve content type where available.

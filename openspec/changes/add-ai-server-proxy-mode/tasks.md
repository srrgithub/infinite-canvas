## 1. Channel Configuration

- [x] 1.1 Add a per-channel AI proxy mode field with direct mode as the default.
- [x] 1.2 Persist and normalize proxy mode for existing and new model channels.

## 2. Proxy Route

- [x] 2.1 Add a same-origin Next.js AI proxy route that validates HTTP(S) targets.
- [x] 2.2 Relay request bodies, AI headers, status, response headers, and streaming bodies.

## 3. AI Request Integration

- [x] 3.1 Route model listing through the proxy when a channel uses server proxy mode.
- [x] 3.2 Route OpenAI/Gemini image, text, audio, and video requests through the proxy when the resolved channel uses server proxy mode.

## 4. UI and Documentation

- [x] 4.1 Add a channel-level control in the config modal for server proxy mode.
- [x] 4.2 Update user-facing docs/progress notes for the new proxy mode.

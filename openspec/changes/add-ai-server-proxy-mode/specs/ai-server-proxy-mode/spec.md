## ADDED Requirements

### Requirement: Channel proxy mode
The system SHALL allow each AI model channel to opt into server proxy mode while keeping direct browser requests as the default mode.

#### Scenario: New channel defaults to direct requests
- **WHEN** a model channel is created without an explicit proxy mode
- **THEN** the channel uses direct browser requests

#### Scenario: User enables proxy mode for a channel
- **WHEN** a user enables server proxy mode for a configured model channel
- **THEN** AI requests for models selected from that channel are sent to the app's same-origin proxy

### Requirement: Proxied model listing
The system SHALL fetch model lists through the same-origin server proxy when the channel uses server proxy mode.

#### Scenario: Provider blocks browser CORS for models
- **WHEN** a proxied channel fetches `/models` from a provider that does not allow browser CORS
- **THEN** the browser requests the local proxy and receives the model list from the provider response

### Requirement: Proxied AI generation requests
The system SHALL send AI generation and task requests through the same-origin server proxy when the resolved model channel uses server proxy mode.

#### Scenario: Streaming text request uses proxy mode
- **WHEN** a text request is made with a model from a proxied channel
- **THEN** the request is relayed through the local proxy and streaming response chunks remain readable by the client

#### Scenario: Media generation request uses proxy mode
- **WHEN** an image, audio, or video request is made with a model from a proxied channel
- **THEN** the request is relayed through the local proxy with the original request body and provider authorization header

### Requirement: Proxy target validation
The system SHALL reject AI proxy requests whose target URL is missing, invalid, or not an HTTP(S) URL.

#### Scenario: Invalid proxy target
- **WHEN** the browser sends an AI proxy request with an invalid target URL
- **THEN** the server returns a client error without contacting the target

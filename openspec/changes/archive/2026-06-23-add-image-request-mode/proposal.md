## Why

当前生图请求只走同步调用，遇到支持流式图片生成的 OpenAI 兼容渠道时，用户无法选择更适合该渠道的请求方式。生图配置又分散在全局偏好、生图工作台和无限画布节点中，需要统一提供请求方式选项，避免不同入口行为不一致。

## What Changes

- 新增默认生图请求方式配置，支持“流式请求”和“同步请求”，默认使用流式请求。
- 生图工作台新增请求方式下拉，默认沿用总配置，也可单独覆盖为同步或流式。
- 无限画布生成配置节点和普通节点生图参数弹窗新增请求方式下拉，默认沿用总配置，也可单独覆盖。
- 图片生成 API 保留原同步请求路径；选择流式时使用 SSE 请求并解析最终图片结果。
- 生成记录和画布图片元数据保存实际使用的请求方式，便于预览和重试沿用。

## Capabilities

### New Capabilities

- `image-request-mode`: 用户可以在全局、生图工作台和无限画布生图入口选择同步或流式生图请求方式。

### Modified Capabilities

- 无

## Impact

- 受影响代码：
  - `web/src/stores/use-config-store.ts`
  - `web/src/services/api/image.ts`
  - `web/src/app/(user)/image/page.tsx`
  - `web/src/app/(user)/canvas/`
  - `web/src/components/image-settings-panel.tsx`
  - `web/src/components/layout/app-config-modal.tsx`
- 数据存储：
  - 浏览器本地持久化的 AI 配置新增 `imageRequestMode`，旧配置缺省时按流式请求处理。
  - 生图工作台日志和画布图片 metadata 可保存实际请求方式。
- API：
  - OpenAI 兼容图片生成/编辑接口在流式模式下携带 `stream: true` 并按 `text/event-stream` 读取。
  - Gemini 生图仍沿用现有调用格式，不额外开启图片流式。
- 文档：
  - `docs/content/docs/progress/pending-test.mdx` 增加待人工验证项。
  - 初始化并新增本 OpenSpec 变更记录。

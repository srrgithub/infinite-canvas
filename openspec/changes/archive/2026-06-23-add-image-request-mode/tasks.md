## 1. 配置与 UI

- [x] 1.1 在 `web/src/stores/use-config-store.ts` 增加生图请求方式类型、默认值、选项和解析函数。
- [x] 1.2 在 `web/src/components/layout/app-config-modal.tsx` 的模型设置中增加默认生图请求方式下拉。
- [x] 1.3 在 `web/src/app/(user)/image/page.tsx` 增加工作台请求方式下拉，并在生成 snapshot 与日志中保存实际方式。
- [x] 1.4 在 `web/src/app/(user)/canvas/` 相关配置节点和普通节点生图参数弹窗中增加请求方式下拉。

## 2. 请求链路

- [x] 2.1 在 `web/src/services/api/image.ts` 保留同步请求路径。
- [x] 2.2 在 `web/src/services/api/image.ts` 增加流式图片请求路径，支持 SSE 读取并解析最终图片结果。
- [x] 2.3 在画布生成配置和重试逻辑中解析并保存实际请求方式。

## 3. 文档与验证

- [x] 3.1 更新 `docs/content/docs/progress/pending-test.mdx`，记录本次待人工验证能力。
- [x] 3.2 运行 `git diff --check`。
- [x] 3.3 安装 web 依赖并运行 `npm run build`。
- [x] 3.4 运行 `tsc --noEmit` 并记录项目既有类型错误。

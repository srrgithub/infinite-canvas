import type { AiConfig } from "@/stores/use-config-store";

type ProxyConfig = Pick<AiConfig, "proxyMode">;

export function aiRequestUrl(config: ProxyConfig, target: string) {
    return config.proxyMode === "nextjs" ? "/api/ai-proxy" : target;
}

export function aiRequestHeaders(config: ProxyConfig, target: string, headers: HeadersInit) {
    const result = new Headers(headers);
    if (config.proxyMode === "nextjs") result.set("x-ai-proxy-target", target);
    const record: Record<string, string> = {};
    result.forEach((value, key) => {
        record[key] = value;
    });
    return record;
}

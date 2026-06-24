import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AI_PROXY_TIMEOUT_MS = 600000;

export async function GET(request: NextRequest) {
    return proxyAiRequest(request);
}

export async function POST(request: NextRequest) {
    return proxyAiRequest(request);
}

async function proxyAiRequest(request: NextRequest) {
    const target = request.headers.get("x-ai-proxy-target") || "";
    if (!target) return new Response("Missing x-ai-proxy-target", { status: 400 });

    let url: URL;
    try {
        url = new URL(target);
    } catch {
        return new Response("Invalid x-ai-proxy-target", { status: 400 });
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") return new Response("Unsupported AI proxy target", { status: 400 });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), AI_PROXY_TIMEOUT_MS);
    try {
        const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
        const response = await fetch(url, {
            method: request.method,
            headers: proxyHeaders(request),
            body: body?.byteLength ? body : undefined,
            signal: controller.signal,
        });
        return new Response(request.method === "HEAD" ? null : response.body, {
            status: response.status,
            headers: responseHeaders(response.headers),
        });
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return new Response("AI proxy timeout", { status: 504 });
        return new Response(error instanceof Error ? error.message : "AI proxy error", { status: 502 });
    } finally {
        clearTimeout(timer);
    }
}

function proxyHeaders(request: NextRequest) {
    const headers = new Headers();
    copyHeader(request, headers, "authorization", "Authorization");
    copyHeader(request, headers, "content-type", "Content-Type");
    copyHeader(request, headers, "accept", "Accept");
    copyHeader(request, headers, "x-goog-api-key", "x-goog-api-key");
    return headers;
}

function copyHeader(request: NextRequest, headers: Headers, from: string, to: string) {
    const value = request.headers.get(from);
    if (value) headers.set(to, value);
}

function responseHeaders(headers: Headers) {
    const result = new Headers();
    ["content-type", "cache-control", "content-disposition"].forEach((key) => {
        const value = headers.get(key);
        if (value) result.set(key, value);
    });
    return result;
}

import { API_BASE } from "./site";

/*
 * Client for the external API server (triyanshi-technologies-server on Vercel).
 * Errors are thrown as `Error` with a user-facing message, so forms can show
 * `error.message` as is.
 */
const REQUEST_TIMEOUT_MS = 20_000;

export type FormPayload = Record<string, string>;

function withTimeout(signal?: AbortSignal) {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  return signal ? AbortSignal.any([signal, timeout]) : timeout;
}

async function request<T>(path: string, init: RequestInit, fallbackError: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API_BASE + path, init);
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw err;
  }
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data.error || fallbackError);
  return data;
}

export function postJson<T = unknown>(path: string, payload: unknown) {
  return request<T>(
    path,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: withTimeout(),
    },
    "Something went wrong. Please try again.",
  );
}

/** No timeout here: PageSpeed runs can take well over 20s. Pass `signal` to cancel. */
export function getJson<T = unknown>(path: string, signal?: AbortSignal) {
  return request<T>(path, { signal }, "Request failed. Please try again.");
}

/** Contact page form → POST /api/contact. */
export const submitContact = (data: FormPayload) => postJson("/api/contact", data);

/** Tool lead forms → POST /api/leads, tagged with the tool that captured them. */
export const submitLead = (data: FormPayload, source: string) => postJson("/api/leads", { ...data, source });

/** PageSpeed Insights proxy (site speed grader). */
export function getPageSpeed<T = unknown>(url: string, strategy: "mobile" | "desktop", signal?: AbortSignal) {
  const qs = new URLSearchParams({ url, strategy });
  return getJson<T>(`/api/pagespeed?${qs}`, signal);
}

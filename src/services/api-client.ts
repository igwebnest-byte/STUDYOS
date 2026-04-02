export async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<TResponse, TBody>(url: string, body: TBody): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json()) as TResponse;

  if (!response.ok) {
    throw new Error((payload as { message?: string }).message ?? `POST ${url} failed`);
  }

  return payload;
}

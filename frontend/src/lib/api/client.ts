import { ApiError } from '$lib/types/index.js';

const BASE_URL = 'http://localhost:8000';

export async function apiFetch<T>(method: string, path: string, body?: unknown): Promise<T> {
	const headers: Record<string, string> = {};
	let requestBody: string | undefined;

	if (body !== undefined) {
		headers['Content-Type'] = 'application/json';
		requestBody = JSON.stringify(body);
	}

	let response: Response;
	try {
		response = await fetch(`${BASE_URL}${path}`, {
			method,
			headers,
			body: requestBody
		});
	} catch (err) {
		throw new ApiError(0, err instanceof Error ? err.message : 'Network failure');
	}

	if (!response.ok) {
		let message = response.statusText;
		try {
			const data = await response.json();
			if (typeof data?.detail === 'string') {
				message = data.detail;
			}
		} catch {
			// ignore parse errors; use statusText
		}
		throw new ApiError(response.status, message);
	}

	return response.json() as Promise<T>;
}

export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {

  const response = await fetch(input, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    // Normalisation des erreurs
    const error = {
      message: data.message || "Une erreur est survenue",
      fieldErrors: data.errors,
      status: response.status,
    };

    throw error;
  }

  return data.data ?? data;		// tolère des retours de type { success, data } ou autre. 
}

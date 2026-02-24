import type { ApiError, ApiResponse } from "../types/global.types";


/**
  Son rôle :
  - gérer response.ok
  - normaliser les erreurs backend
  - retourner directement data
  - simplifier l’usage côté services
 */
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

  let data: any = null;

  // 🔹 On tente de lire le body SI possible
  try {
    data = await response.json();
  } catch {
    // body vide ou non-JSON → OK
  }

  // 🔥 Erreur HTTP
  if (!response.ok) {
    const error: ApiError = {
      message:
        data?.message ||
        response.statusText ||
        "Une erreur est survenue",
      fieldErrors: data?.errors,
      status: response.status,
    };

    throw error;
  }

  // 🔹 Succès
  return data?.data ?? data;
}





export async function apiFetchFull<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<ApiResponse<T>> {

  const response = await fetch(input, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    const error: ApiError = {
      message:
        data?.message ||
        response.statusText ||
        "Une erreur est survenue",
      fieldErrors: data?.errors,
      status: response.status,
    };

    throw error;
  }

  return data; // 👈 on retourne TOUT
}




/*

Que renvoie fetch() exactement ?
const response = await fetch(...)


👉 response est un objet Response du standard Fetch.

Il contient toujours (sauf erreur réseau) :

response.ok → true | false

response.status → 200, 400, 500, ...

response.statusText → "OK", "Bad Request", ...

un body lisible UNE seule fois

⚠️ fetch ne rejette PAS la promesse pour un 400 ou 500

Une requête HTTP en erreur est quand même une requête réussie du point de vue réseau

2️⃣ Pourquoi on fait await response.json() AVANT le if (!response.ok) ?

👉 Parce que le backend met des infos précieuses dans le body, même quand le status ≠ 2xx.

Exemple backend (400) :
{
  "success": false,
  "message": "Validation échouée",
  "errors": {
    "name": "Nom invalide",
    "type": "Type obligatoire"
  }
}


Si tu fais :

if (!response.ok) {
  throw ...
}


➡️ tu perds totalement :

message

errors

tout ce que ton backend a soigneusement construit

👉 Le status ne suffit pas pour un frontend admin.

3️⃣ Point clé que tu as mal interprété (normal 😄)

❌ "si !response.ok alors data n'existe pas"

❌ Faux
✅ data existe TOUJOURS si response.json() réussit

Ce qui peut arriver :
Cas	response.ok	response.json()
200 + JSON	true	OK
400 + JSON	false	OK
500 + JSON	false	OK
204 No Content	true	❌ erreur
HTML (reverse proxy, crash)	false	❌ erreur

Donc :

const data = await response.json(); // OK même si status = 400


Pourquoi on ne teste PAS data.success dans apiFetch

Excellente intuition 👏
Mais on a volontairement décidé ceci :

🔥 La source de vérité = HTTP status

Pas le champ success

Pourquoi ?

success est une convention app

HTTP status est une convention universelle

fetch sait déjà gérer response.ok

Donc on dit :

if (!response.ok) → erreur


et on ignore success côté frontend bas niveau

👉 Le frontend ne dépend pas de ta structure métier

*/
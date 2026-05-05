import { apiFetch } from "../../../lib/apiFetch";
import type { ListParams, ListResult } from "../../../types/list.types";
import type { Admin, Ticket, TicketDetailsResponse, TicketListResponse } from "../types/support";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/support`;


export const getTickets = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<TicketListResponse> => {

  const queryObject: Record<string, string> = {
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10),
  };
    
  if (params.search) queryObject.search = params.search;
  if (params.sortKey) queryObject.sortKey = params.sortKey;
  if (params.sortDirection) queryObject.sortDirection = params.sortDirection;

  // 🔥 Ici on injecte les filtres dynamiques
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryObject[key] = String(value);
      }
    });
  }

  const query = new URLSearchParams(queryObject);

  return apiFetch<TicketListResponse>(
    `${BASE_URL}/?${query.toString()}`,
    {
      method: "GET",
    }
  );
}

export const getTicketsList = async (
  params: ListParams
): Promise<ListResult<Ticket>> => {

  const res = await getTickets(params);

  return {
    items: res.items,
    pagination: {
      page: res.pagination.page,
      limit: res.pagination.limit,
      totalItems: res.pagination.totalItems,
      totalPages: res.pagination.totalPages,
    }
  }
}


export const getTicketDetails = async (id: string): Promise<TicketDetailsResponse> => {
  return apiFetch<TicketDetailsResponse>(`${BASE_URL}/${id}`)
}

export const sendMessage = async ({
  ticketId,
  content,
  isInternal,
}: {
  ticketId: string
  content: string
  isInternal?: boolean
}) => {
  return apiFetch(`${BASE_URL}/${ticketId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content, isInternal }),
  })
}


export const updateTicket = async ({
  ticketId,
  updates,
}: {
  ticketId: string
  updates: {
    status?: string
    assignedTo?: string | null
  }
}) => {
  return apiFetch(`${BASE_URL}/${ticketId}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  })
}


export const getAdmins = async (): Promise<Admin[]> => {

  return apiFetch<Admin[]>(`${BASE_URL}/admins`)
}




// fonction de simulation
export const simulateUserReply = async ({
  ticketId,
  userId,
  content,
}: {
  ticketId: string
  userId: string
  content?: string
}) => {
  return apiFetch(`${BASE_URL}/${ticketId}/simulate-reply`, {
    method: "POST",
    body: JSON.stringify({ userId, content }),
  })
}



export const simulateTicket = async (data: {
  userId: string
  content?: string
  category?: string
}) => {

  console.log("simulateTickets :", data.userId)
  return apiFetch(`${BASE_URL}/simulate`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

import type { UserCard } from "../../../types/admin";
import type { PaginationMeta } from "../../../types/global.types";

export interface Ticket {
  _id: string;

  createdBy: UserCard;

  category: string;
  status: "open" | "pending" | "resolved" | "closed";

  assignedTo?: {
    id: string;
    firstname: string;
    lastname: string;
  } | null;

  context: {
    entityType: string;
    entityId: string;
  }

  lastMessagePreview: string;
  lastMessageAt: string;
  lastMessageBy: string;

  participants: string[];

  unreadByAdmin: boolean;
  firstResponseAt: string;
  createdAt: string;
}


export interface TicketListResponse {
  items: Ticket[];
  pagination: PaginationMeta;
}


export interface Message {
  _id: string

  ticketId: string

  sender: {
    type: "user" | "producer" | "admin"
    id: string
  }

  content: string
  isInternal?: boolean

  attachments: []

  createdAt: string
}


export interface TicketDetailsResponse {
  ticket: Ticket
  messages: Message[]
}


export interface Admin {
  _id: string;
  firstname: string;
  lastname: string;
  clerkUUID: string;
}
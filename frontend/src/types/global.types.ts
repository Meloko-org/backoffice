/* Reponse API */
export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;


export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export type ApiWarning = {
  code: string;
  message: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  warnings?: ApiWarning[];
}

export type ApiError = {
  message: string;
  fieldErrors?: Record<string, string>;
  status?: number;
};


/* pagination */
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}
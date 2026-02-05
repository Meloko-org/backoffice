export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;


export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiError = {
  message: string;
  fieldErrors?: Record<string, string>;
  status?: number;
};

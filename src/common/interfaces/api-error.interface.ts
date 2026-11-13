export interface ApiErrorData {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  method?: string;
}

export interface ApiError {
  response?: {
    data?: ApiErrorData;
    status?: number;
    statusText?: string;
  };
  message?: string;
}

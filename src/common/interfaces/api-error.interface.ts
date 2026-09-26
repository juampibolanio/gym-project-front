export interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
      error?: string;
      statusCode?: number;
    };
  };
}

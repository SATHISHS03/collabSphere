export interface MetaData {
  timestamp: number;
  requestId?: string;
}
export interface SuccessBody<T> {
  success: true;
  statusCode: number;
  message: string;
  meta: MetaData;
  data: T;
  tokens?: any;
}
export interface ErrorDetail {
  field?: string;
  message: string;
  code?: string;
}
export interface ErrorBody {
  success: false;
  statusCode: number;
  errorCode: string;
  message: string;
  meta: MetaData;
  details: ErrorDetail[];
}

export const SuccessResponse = <T>(
  statusCode: number,
  message: string,
  data: T,
  tokens?: any
): SuccessBody<T> => ({
  success: true,
  statusCode,
  message,
  meta: { timestamp: Date.now() },
  data : data,
  tokens: tokens ?? null,
});

export const ErrorResponse = (
  statusCode: number,
  errorCode: string,
  message: string,
  details: ErrorDetail[] = []
): ErrorBody => ({
  success: false,
  statusCode,
  errorCode,
  message,
  meta: { timestamp: Date.now() },
  details,
});

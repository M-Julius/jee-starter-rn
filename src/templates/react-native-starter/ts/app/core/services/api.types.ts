export type ApiError<T> = Error & {
  statusCode?: number;
  data?: T
};

export type Message = {
  value: string,
  property: string,
  constraint: Constraint[]
};

export type MetaData = {
  message: string,
  response_code: string
}

export type BaseResponse<T> = {
  metadata?: MetaData,
  data?: T,
};

export type Constraint = {
  code?: string,
  message?: string,
};

export type Pagination<T> = {
  total_item: number,
  limit: number,
  current_page: number,
  items: Array<T>
};

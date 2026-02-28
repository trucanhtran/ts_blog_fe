// import lib
import { api } from "@/lib/axios";
import type { AxiosRequestConfig } from "axios";

/** GET request. Usage: const posts = await apiGet<Post[]>('/posts', { params: { _limit: 5 } }); */
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const { data } = await api.get<T>(url, config);
  return data;
};

/** POST request. Usage: const created = await apiPost<Post>('/posts', body); */
export const apiPost = async <T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { data } = await api.post<T>(url, body, config);
  return data;
};

/** PUT request. Usage: const updated = await apiPut<Post>('/posts/1', body); */
export const apiPut = async <T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { data } = await api.put<T>(url, body, config);
  return data;
};

/** DELETE request. Usage: await apiDelete('/posts/1'); */
export const apiDelete = async <T = void>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const { data } = await api.delete<T>(url, config);
  return data;
};

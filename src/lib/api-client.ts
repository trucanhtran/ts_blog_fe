"use client";

import {
  AuthenticationApi,
  Configuration,
  DefaultApi,
  type AuthResponse,
  type User,
} from "@ts-blog/api-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const TOKEN_STORAGE_KEY = "ts_blog_api_token";
const USER_STORAGE_KEY = "ts_blog_api_user";

const DEV_USER = {
  email: "local-user@today-story.test",
  name: "Local User",
  password: "password123",
  password_confirmation: "password123",
};

interface ApiSession {
  token?: string;
  user: User;
}

const createConfiguration = (token?: string) =>
  new Configuration({
    basePath: API_BASE_URL,
    baseOptions: token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : undefined,
  });

export const createPostsApi = (token?: string) => new DefaultApi(createConfiguration(token));

const createAuthApi = () => new AuthenticationApi(createConfiguration());

const readStoredSession = (): ApiSession | null => {
  if (typeof window === "undefined") return null;

  const userJson = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;

  try {
    const user = JSON.parse(userJson) as User;
    return {
      token: window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? undefined,
      user,
    };
  } catch {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    return null;
  }
};

const readAuthorizationHeader = (headers: unknown) => {
  if (!headers || typeof headers !== "object") return undefined;

  const maybeHeaders = headers as {
    authorization?: unknown;
    Authorization?: unknown;
    get?: (name: string) => unknown;
  };
  const value =
    maybeHeaders.authorization ?? maybeHeaders.Authorization ?? maybeHeaders.get?.("authorization");

  return typeof value === "string" ? value : undefined;
};

const persistSession = (response: { data: AuthResponse; headers: unknown }) => {
  const user = response.data.user;
  if (!user?.id) {
    throw new Error("Authentication response did not include a user id.");
  }

  const token = readAuthorizationHeader(response.headers);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  return { token, user };
};

export const ensureApiSession = async (): Promise<ApiSession> => {
  const stored = readStoredSession();
  if (stored?.user.id) return stored;

  const authApi = createAuthApi();

  try {
    const loginResponse = await authApi.apiV1LoginPost({
      user: {
        email: DEV_USER.email,
        password: DEV_USER.password,
      },
    });
    return persistSession(loginResponse);
  } catch {
    const signupResponse = await authApi.apiV1SignupPost({
      user: DEV_USER,
    });
    return persistSession(signupResponse);
  }
};

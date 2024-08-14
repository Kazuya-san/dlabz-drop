"use server";

import { getAccessToken, GetAccessTokenResult } from "@auth0/nextjs-auth0";

export const customFetch = async (
  url: string,
  method: string,
  body?: any,
  headers?: Record<string, string | boolean | any>
) => {
  try {
    const startTime = new Date().getTime();
    let token: GetAccessTokenResult | null = null;
    const {
      auth,
      cacheOptions = {},
      ...restHeaders
    } = (headers ?? {
      auth: false,
    }) as Record<string, string | boolean>;
    if (auth) {
      token = await getAccessToken();
      const endTime = new Date().getTime();
      console.log(endTime - startTime, "diff in getting token");
    }
    const res = await fetch(url, {
      method,
      ...(Object.keys(cacheOptions).length > 0 && cacheOptions),
      headers: {
        ...(token && { Authorization: `Bearer ${token?.accessToken}` }),
        "Content-Type": "application/json",
        ...restHeaders,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`HTTP error! Status: ${res.status} - ${error}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error with fetch request to ${url}:`, error);
    throw error;
  }
};

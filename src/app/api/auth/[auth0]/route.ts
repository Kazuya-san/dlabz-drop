import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

// A custom handler to get query parameters from the request URL
export const GET = async (req: NextRequest, res: NextResponse) => {
  // Parse the URL to get query parameters
  const url = new URL(
    req.url as string,
    `http://${(req as unknown as NextApiRequest).headers.host}`
  );
  const connection = url.searchParams.get("connection");
  // Handle authentication with dynamic connection parameter
  return handleAuth({
    login: handleLogin({
      authorizationParams: { connection: connection || "google-oauth2" },
    }),
  })(req, res);
};

// export const GET = handleAuth();

import { createCloudflareKVSessionStorage, redirect } from "remix";

export const ACCESS_TOKEN = "access-token";
export const REFRESH_TOKEN = "refresh-token";

const { getSession, commitSession, destroySession } =
  createCloudflareKVSessionStorage({
    cookie: {
      name: "__wr_session",

      // all of these are optional
      expires: new Date(Date.now() + 60 * 60 * 24 * 30),
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secrets: [TOKEN_SECRET],
      secure: true,
    },
    kv: WR,
  });

export { getSession, commitSession, destroySession };

export async function requireUserSession(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  console.log(session.data);

  if (Object.entries(session.data).length === 0) {
    throw redirect("/login", 302);
  }
  return session.get(ACCESS_TOKEN);
}

export const CLIENT_ID =
  "837754270874-v3bq6l2kmkh6b3fm3n6i5o1ppcoa1kcn.apps.googleusercontent.com";

export const REDIRECT_URI = (host: string) => `${host}/auth/google/callback`;

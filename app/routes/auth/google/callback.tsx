import { LoaderFunction, redirect } from "remix";
import {
  REDIRECT_URI,
  CLIENT_ID,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  commitSession,
  getSession,
} from "~/sessions";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
};

function getTokenUrl(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  return (
    "https://accounts.google.com/o/oauth2/token?" +
    `code=${code}&` +
    `client_id=${CLIENT_ID}&` +
    `client_secret=${CLIENT_SECRET}&` +
    `redirect_uri=${REDIRECT_URI(url.origin)}&` +
    `include_granted_scopes=true&` +
    "grant_type=authorization_code"
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const tokenUrl = getTokenUrl(request);

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data: TokenResponse = await res.json();
  const session = await getSession(request.headers.get("cookie"));
  session.set(ACCESS_TOKEN, data.access_token);
  session.set(REFRESH_TOKEN, data.refresh_token);
  const cookie = await commitSession(session);
  console.log(cookie);

  return redirect("/", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};

export default function () {
  return <>Callback</>;
}

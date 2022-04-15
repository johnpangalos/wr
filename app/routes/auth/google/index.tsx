import { redirect, LoaderFunction } from "remix";
import { REDIRECT_URI, CLIENT_ID } from "~/sessions";

export const loader: LoaderFunction = ({ request }) => {
  return redirect(
    "https://accounts.google.com/o/oauth2/v2/auth?" +
      "scope=https%3A//www.googleapis.com/auth/userinfo.email&" +
      "access_type=offline&" +
      "include_granted_scopes=true&" +
      "response_type=code&" +
      // "state=state_parameter_passthrough_value&" +
      `redirect_uri=${REDIRECT_URI(new URL(request.url).origin)}&` +
      `client_id=${CLIENT_ID}`
  );
};

export default function Index() {
  return <></>;
}

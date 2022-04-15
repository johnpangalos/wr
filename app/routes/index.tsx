import { LoaderFunction } from "remix";
import { requireUserSession } from "~/sessions";
export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);
  return null;
};

export default function Index() {
  return <div className="text-3xl text-red-500">Hello world!</div>;
}

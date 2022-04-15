import { Link } from "remix";

export default function Login(): JSX.Element {
  return (
    <>
      <Link to="/auth/google">Google</Link>
    </>
  );
}

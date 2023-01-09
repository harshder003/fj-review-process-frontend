import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="text-center text-white p-4 bg-navy min-h-screen flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl font-bold text-gold">Oops!</h1>
      <p className="text-xl font-bold text-white mt-4">Something went wrong.</p>
      <p className="text-xl font-bold text-white mt-4">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

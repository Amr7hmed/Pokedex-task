import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-gray-800">404</h2>
      <p className="mt-2 text-sm text-gray-600">
        The page you are looking for does not exist.
      </p>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back to Pokédex
      </button>
    </section>
  );
};

export default NotFoundPage;

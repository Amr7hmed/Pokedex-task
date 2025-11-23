import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isPagination = location.pathname === "/";
  const isLoadMore = location.pathname === "/load-more";

  return (
    <header className="border-b border-transparent bg-transparent pt-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h1 className="text-xl font-semibold text-gray-900">Pokédex</h1>
          </div>
          <p className="text-xs text-gray-500">
            Discover and explore Pokémon with page controls.
          </p>
        </div>

        <div className="mt-4 inline-flex rounded-full bg-white/70 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              isPagination
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Page Controls
          </button>
          <button
            type="button"
            onClick={() => navigate("/load-more")}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              isLoadMore
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Infinite Scroll
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

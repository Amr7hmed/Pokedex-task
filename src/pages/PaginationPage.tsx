import PokemonGrid from "@/components/pokemon/PokemonGrid";
import PaginationControls from "@/components/pokemon/PaginationControls";
import LoadingSpinner from "@/components/pokemon/LoadingSpinner";
import { usePokemonsPagination } from "@/hooks/usePokemonsPagination";
import ErrorMessage from "@/components/pokemon/ErrorMessage";

const PaginationPage = () => {
  const {
    pokemons,
    page,
    totalPages,
    totalCount,
    isLoading,
    error,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    retry,
  } = usePokemonsPagination({ limit: 20 });

  return (
    <section className="mt-6">
      <header className="mb-6 text-center">
        {totalCount > 0 && (
          <p className="text-xs text-gray-500">
            {`Page ${page} of ${totalPages} (${pokemons.length} Pokémon shown, total ${totalCount})`}
          </p>
        )}
      </header>

      {isLoading && <LoadingSpinner />}

      {error && !isLoading && (
        <div className="mx-auto max-w-md">
          <ErrorMessage message={error} onRetry={retry} />
        </div>
      )}

      {!isLoading && !error && (
        <>
          <PokemonGrid pokemons={pokemons} />
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
            onNext={goToNextPage}
            onPrevious={goToPreviousPage}
          />
        </>
      )}
    </section>
  );
};

export default PaginationPage;

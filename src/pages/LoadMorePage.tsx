import { useState } from "react";
import PokemonGrid from "@/components/pokemon/PokemonGrid";
import LoadingSpinner from "@/components/pokemon/LoadingSpinner";
import ErrorMessage from "@/components/pokemon/ErrorMessage";
import { usePokemonsLoadMore } from "@/hooks/usePokemonsLoadMore";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const LoadMorePage = () => {
  const {
    pokemons,
    totalCount,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    retry,
  } = usePokemonsLoadMore({ initialLimit: 20 });
  const [tempLoading, setTempLoading] = useState(false);

  const delayedLoadMore = () => {
    if (!hasMore) return;
    setTempLoading(true);

    setTimeout(() => {
      loadMore();
      setTempLoading(false);
    }, 1200);
  };

  useInfiniteScroll(delayedLoadMore, hasMore);

  return (
    <section>
      <header className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Pokédex</h2>
        <p className="text-sm text-gray-600">
          Discover and explore Pokémon with infinite scrolling.
        </p>

        {totalCount > 0 && (
          <p className="mt-1 text-xs text-gray-500">
            Loaded {pokemons.length} of {totalCount} Pokémon
          </p>
        )}
      </header>

      {isLoading && <LoadingSpinner />}

      {error && !isLoading && (
        <ErrorMessage message={error} onRetry={retry} />
      )}

      {!isLoading && !error && (
        <>
          <PokemonGrid pokemons={pokemons} />

          {(tempLoading || isLoadingMore) && (
            <div className="flex justify-center py-6">
              <LoadingSpinner />
            </div>
          )}

          {!hasMore && (
            <p className="mt-6 text-center text-xs text-gray-500">
              No more Pokémon to load.
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default LoadMorePage;

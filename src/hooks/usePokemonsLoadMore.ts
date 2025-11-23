import { useEffect, useState } from "react";
import { getPokemons } from "@/api/api";
import type { PokemonListItem, PokemonListResponse } from "@/types/pokemon";

type UsePokemonsLoadMoreParams = {
  initialLimit?: number;
};

export const usePokemonsLoadMore = ({
  initialLimit = 20,
}: UsePokemonsLoadMoreParams = {}) => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [limit] = useState(initialLimit);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = totalCount === 0 || pokemons.length < totalCount;

  const fetchData = async (currentOffset: number, append: boolean) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const response = await getPokemons(limit, currentOffset, { limit, offset: currentOffset });
      const data = response.data as PokemonListResponse;

      setTotalCount(data.count);

      setPokemons((prev) => {
        if (!append) return data.results;

        const existingNames = new Set(prev.map((p) => p.name));
        const newOnes = data.results.filter((p) => !existingNames.has(p.name));
        return [...prev, ...newOnes];
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon. Please try again.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(0, false);
  }, []);

  const loadMore = () => {
    if (!hasMore) return;
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchData(newOffset, true);
  };

  const retry = () => {
    fetchData(offset, offset > 0);
  };

  return {
    pokemons,
    totalCount,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    retry,
  };
};

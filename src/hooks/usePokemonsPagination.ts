
import { useEffect, useState } from "react";
import { getPokemons } from "@/api/api";
import type { PokemonListItem, PokemonListResponse } from "@/types/pokemon";

type UsePokemonsPaginationParams = {
  initialPage?: number;
  limit?: number;
};

export const usePokemonsPagination = ({
  initialPage = 1,
  limit = 20,
}: UsePokemonsPaginationParams = {}) => {
  const [page, setPage] = useState(initialPage);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;

  const fetchData = async (currentPage: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const offset = (currentPage - 1) * limit;

      const response = await getPokemons(limit, offset, { limit, offset });
      const data = response.data as PokemonListResponse;

      setPokemons(data.results);
      setTotalCount(data.count);
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page, limit]);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || (totalPages && newPage > totalPages)) return;
    setPage(newPage);
  };

  const goToNextPage = () => {
    if (!totalPages || page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const retry = () => {
    fetchData(page);
  };

  return {
    pokemons,
    page,
    totalPages,
    totalCount,
    limit,
    isLoading,
    error,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    retry,
  };
};

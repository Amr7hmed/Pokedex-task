import { useEffect, useState } from "react";
import type { PokemonDetails } from "@/types/pokemon";
import { getPokemonById } from "@/api/api";

export const usePokemonDetails = (id?: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (pokemonId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPokemonById(pokemonId);
      const data = response.data as PokemonDetails;
      setPokemon(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const retry = () => {
    if (id) {
      fetchData(id);
    }
  };

  return {
    pokemon,
    isLoading,
    error,
    retry,
  };
};

import axios from "axios";
import type {
  PokemonListResponse,
  PokemonDetails,
} from "@/types/pokemon";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getPokemons = (
  _limit: any,
  _currentOffset: number,
  params: { limit?: number; offset?: number }
) => {
  const { limit: paramsLimit, offset } = params || {};
  return axios.get<PokemonListResponse>(`${API_BASE_URL}/pokemon`, {
    params: { limit: paramsLimit, offset },
  });
};

export const getPokemonById = (idOrName: string | number) => {
  return axios.get<PokemonDetails>(`${API_BASE_URL}/pokemon/${idOrName}`);
};


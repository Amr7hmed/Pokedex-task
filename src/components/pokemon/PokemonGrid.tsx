import type { PokemonListItem } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";

type PokemonGridProps = {
  pokemons: PokemonListItem[];
};


const PokemonGrid = ({ pokemons }: PokemonGridProps) => {
  if (!pokemons.length) {
    return (
      <p className="py-6 text-center text-sm text-gray-500">
        No Pokémon found.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};


export default PokemonGrid;

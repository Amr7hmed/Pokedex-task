import type { PokemonListItem } from "@/types/pokemon";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type PokemonCardProps = {
  pokemon: PokemonListItem;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigate = useNavigate();

  const id = useMemo(() => {
    const parts = pokemon.url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }, [pokemon.url]);

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-full flex-col items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex flex-1 items-center justify-center">
        <img
          src={spriteUrl}
          alt={pokemon.name}
          className="h-24 w-24 object-contain"
          loading="lazy"
        />
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold capitalize text-gray-800">
          {pokemon.name}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          #{id.toString().padStart(3, "0")}
        </p>
      </div>
    </button>
  );

};

export default PokemonCard;

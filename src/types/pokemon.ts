export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonAbility = {
  ability: { name: string };
  is_hidden: boolean;
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;

  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];

  sprites: {
    front_default: string;
    other?: {
      ["official-artwork"]?: {
        front_default: string | null;
      };
    };
  };
};
export type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrevious: () => void;
};
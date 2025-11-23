import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/pokemon/LoadingSpinner";
import ErrorMessage from "@/components/pokemon/ErrorMessage";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";

const PokemonDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, isLoading, error, retry } = usePokemonDetails(id);

  const handleBack = () => navigate(-1);

  if (!id) {
    return (
      <div className="py-8">
        <ErrorMessage message="No Pokémon ID provided." onRetry={handleBack} />
      </div>
    );
  }

  return (
    <section className="py-4 flex justify-center">
      <div className="w-full max-w-3xl">

        <button
          type="button"
          onClick={handleBack}
          className="mb-4 rounded border border-gray-300 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          ← Back to List
        </button>

        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <ErrorMessage message={error} onRetry={retry} />}

        {!isLoading && !error && pokemon && (
          <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
            <div className="p-6 text-center text-white bg-gradient-to-r from-pink-500 to-purple-600">
              <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
              <p className="text-sm opacity-90">
                #{pokemon.id.toString().padStart(3, "0")}
              </p>
            </div>

            <div className="flex justify-center -mt-5">
              <img
                src={
                  pokemon.sprites.other?.["official-artwork"]?.front_default ??
                  pokemon.sprites.front_default ??
                  undefined
                }
                alt={pokemon.name}
                className="h-40 w-40 object-contain drop-shadow-lg"
              />
            </div>

            {/* Types */}
            <div className="flex justify-center mt-4 gap-3">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold capitalize text-red-700"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 px-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase">Height</p>
                <p className="mt-1 font-bold text-gray-700">{pokemon.height / 10} m</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase">Weight</p>
                <p className="mt-1 font-bold text-gray-700">{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div className="px-6 mt-6">
              <h3 className="font-bold text-gray-800 mb-2">Base Stats</h3>

              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="mb-3">
                  <div className="flex justify-between text-xs font-semibold text-gray-600">
                    <span className="capitalize">{s.stat.name}</span>
                    <span>{s.base_stat}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{ width: `${(s.base_stat / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 mt-6">
              <h3 className="font-bold text-gray-800 mb-2">Abilities</h3>
              {pokemon.abilities.map((a) => (
                <p key={a.ability.name} className="capitalize text-sm text-gray-700">
                  {a.ability.name}{" "}
                  {a.is_hidden && (
                    <span className="text-xs text-gray-500">(Hidden)</span>
                  )}
                </p>
              ))}
            </div>
            <div className="px-6 mt-6 pb-6">
              <h3 className="font-bold text-gray-800">Base Experience</h3>
              <p className="text-purple-600 font-bold text-lg">
                {pokemon.base_experience} XP
              </p>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default PokemonDetailsPage;

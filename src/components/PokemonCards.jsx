/* eslint-disable react/prop-types */

//pokemonData => a object(a specific object for each pokemon containing their infoos);
const PokemonCards = ({ pokemonData }) => {
    return (
        <li className="pokemon-card">
            <figure>
                <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} className="pokemon-image" />
            </figure>
            <h1 className="pokemon-name">{pokemonData.name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {
                        //curType is an array containing types of the pokemon
                        //in this array we have types(an object) which have name(key) and its value;
                        pokemonData.types.map((curType) => curType.type.name).join(", ")
                    }
                </p>
            </div>

            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span>Height: <span>{pokemonData.height}</span></span>
                </p>
                <p className="pokemon-info">
                    <span>Weight: <span>{pokemonData.weight}</span></span>
                </p>
                <p className="pokemon-info">
                    <span>Speed: <span>{pokemonData.stats[5].base_stat}</span></span>
                </p>
            </div>
        </li>
    )
}

export default PokemonCards;

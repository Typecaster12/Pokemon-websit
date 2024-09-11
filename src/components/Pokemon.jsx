import { useState } from 'react';
import { useEffect } from 'react';
import './index.css';
import PokemonCards from './PokemonCards';


const Pokemon = () => {
    //have the final array of objects(of pokemons);
    const [pokemon, setPokemon] = useState([]);
    //to handle loading state;
    const [loading, setLoading] = useState(true);
    //to handle error state;
    const [error, setError] = useState(null);
    //to handle search section;
    const [search, setSearch] = useState("");

    const API = 'https://pokeapi.co/api/v2/pokemon?limit=400';

    //fetch function;
    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            //here after fetching the API we get an array(named result) which contains another url for every pokemon;
            //so we have to fetch all these url in order to get the results;
            const getTheMainData = data.results.map(async (mainURL) => {
                const res = await fetch(mainURL.url);
                const data = await res.json();

                //now we have objects containing details of all the(right now 24 as per limit we set) pokemons;
                return data;
            });

            //the getTheMainData give us 24 promises;
            //now we have to handle the promises to get the value;
            //we handle/get the value from promises using PROMIS APIS;

            //i want datas from promises [if they all getfullfilled]*
            //so we use use;
            const dataFromPromises = await Promise.all(getTheMainData);
            //return an array of objects and the objects have our final datas;
            setPokemon(dataFromPromises);
            console.log(dataFromPromises);
            //loading must be false if we get the data;
            setLoading(false);

        } catch (error) {
            console.log(error);
            //if any error; it will passed into the error state;
            setError(error);
            //while any error on loading state will be true;
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, []);


    //search functionality;
    //so we this function returns the true value(value that is searched);
    //currentPokemon is the objects of pokemon;
    const searchData = pokemon.filter((currentPokemon) =>
        //so from here we get the cards which we searched for;
        currentPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

//if in the loading(time to get the data);
if (loading) {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

//if error; then show the error message(which error occured);
if (error) {
    return (
        <div>
            <h1>{error.message}</h1>
        </div>
    )
}

return (
    <>
        <section className="container">
            <header>
                <h1>Lets Catch Pokemon!</h1>
            </header>

            {/* search bar */}
            <div className="pokemon-search">
                <input type="text" value={search} placeholder='search pokemon' onChange={(event) => setSearch(event.target.value)} />
            </div>
            {/* cards */}
            <div>
                <ul className='cards'>
                    {searchData.map((value) => {
                        return (
                            // already have id's in the api's data 
                            <PokemonCards key={value.id} pokemonData={value} />
                        )
                    })}
                </ul>
            </div>
        </section>
    </>
)
}

export default Pokemon;

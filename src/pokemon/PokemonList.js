import React, { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import PokemonCard from "./PokemonCard";

function PokemonList(){
    const [data, setData] = useState({ pokemons: [], nextUrl:"", previousUrl: ""});
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState("bulbasaur");

    useEffect(() => {
        async function fetchPokemons() {
            setIsLoading(true);
            const data = await apiGet(url);
            setData({
                pokemons: data.results,
                nextUrl: data.next,
                previousUrl: data.previous
            });
            setIsLoading(false);
        };
        fetchPokemons();
    }, [url]);

    function handleNavigationClick(url){
        if(!url) return;
        setUrl(url);
    }
    return (
        <div>
            <div className="container text.center my-3">
                <button type="button" className="btn btn-primary me-1" onClick={() => handleNavigationClick(data.previousUrl)}>Previous</button>
                <button type="button" className="btn btn-primary" onClick={()=> handleNavigationClick(data.nextUrl)}>Next</button>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {isLoading ? (
                            <div className="text-center my-3">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Načítám...</span>
                                </div>
                            </div>
                        ) : (
                            <ul>
                                {data.pokemons.map((pokemon) => (
                                    <li key={pokemon.name} onClick={() => setSelectedPokemon(pokemon.name)} style={{cursor: "pointer"}} className="link-primary">
                                        {pokemon.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {selectedPokemon && (
                        <div className="col">
                            <PokemonCard pokemonName={selectedPokemon} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PokemonList


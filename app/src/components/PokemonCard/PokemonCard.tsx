import { FormEvent, useEffect, useState } from "react"
import './PokemonCard.css'

interface Pokemon {
    id: number,
    type: string,
    name: string,
    img: string,
    abilities: string[],
    moves: string[]
}

const PokemonCard = () => {
    const [pokemon, setPokemon] = useState<Pokemon>({
        id: 0,
        type: '',
        name: '',
        img: '',
        abilities: [],
        moves: []
    })

    const [pokemonName, setPokemonName] = useState({
        name: ''
    })

    const [poke, setPoke] = useState('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setPoke(pokemonName.name)
    }

    useEffect(() => {
        if (poke !== '') {
            const getPokemon = async () => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
                const data = await response.json()
                console.log(data)
                setPokemon({
                    id: data.id,
                    type: data.types[0].type.name,
                    name: data.name,
                    img: data.sprites.front_shiny,
                    abilities: [data.abilities[0].ability.name, data.abilities[1].ability.name],
                    moves: [data.moves[0].move.name, data.moves[1].move.name]
                })
            }
            getPokemon()
        }
    }, [poke])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='input-form'>
                        <div>
                            <label htmlFor="search">Enter Pokemon: </label>
                            <input
                                id='search'
                                placeholder='Enter Pokemon Here!'
                                onChange={(event) => {
                                    setPokemonName({ name: event.target.value })
                                }}
                            />
                        </div>
                        <button
                            className='btn btn-primary rounded-pill d-block mx-auto'
                            id='search-btn'
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <div className="card mx-auto" id="poke-card" style={{ width: '18rem' }}>
                    <img src={pokemon.img} className="card-img-top" alt='Enter Pokemon to see Card!'/>
                    <div className="card-body">
                        <h5 className="card-title text-capitalize" id="poke-title">{pokemon.name}</h5>
                    </div>
                    <ul className="list-group list-group-flush text-capitalize">
                        <li className="list-group-item" id="list-item">Type: {pokemon.type}</li>
                        <li className="list-group-item" id="list-item">Move #1: {pokemon.moves[0]}</li>
                        <li className="list-group-item" id="list-item">Move #2: {pokemon.moves[1]}</li>
                        <li className="list-group-item" id="list-item">Ability #1: {pokemon.abilities[0]}</li>
                        <li className="list-group-item" id="list-item">Ability #2: {pokemon.abilities[1]}</li>
                    </ul>
                    <div className="card-body">
                        <button className='btn btn-primary rounded-pill' id="catch-btn">Catch</button>
                        <button className='btn btn-info rounded-pill'>Add to Pokedex</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PokemonCard
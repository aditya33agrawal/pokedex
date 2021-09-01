import React from 'react'
import Layout from './Components/Layout'
import Link from 'next/link'
import fetch from 'node-fetch';

export default function pokemon({pokeman}) {

    // console.log(pokeman);

    return (
        <Layout title={pokeman.name}>
            <h1 className="text-4xl mb-2 text-center capitalize">
                {pokeman.name}
            </h1>
            <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
            <p> <span className="font-bold mr-2">Height:</span> {pokeman.height}</p>
            <p> <span className="font-bold mr-2">Weight:</span> {pokeman.weight}</p>
            <p> <span className="font-bold mr-2">Base Experience:</span> {pokeman.base_experience}</p>

            <h2 className="text-2xl mt-6 mb-2 ">Types: </h2>
            {pokeman.types.map((type, index) => (
                <p key={index} className="capitalize">{type.type.name}</p> 
            ))}
            
            <h2 className="text-2xl mt-6 mb-2 ">Abilities: </h2>
            {pokeman.abilities.map((abilities, index) => (
                <p key={index} className="capitalize">{abilities.ability.name}</p> 
            ))}
            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl">HOME</a>
                </Link>
            </p>
        </Layout>
    )
}

// export async function getStaticPaths({ query }) {
export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedIndex = ('00' + (id)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokeman.image = image;
        return {
            props: { pokeman },
        };

    } catch (err) {
     console.error(err);
    }
}


import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';

interface IPokemonProps {
  pokemon: {
    image: string;
    name: string;
    types: string[];
    weight: string;
    height: string;
  };
}

const pokemon = ({ pokemon }: IPokemonProps): JSX.Element => {
  console.log(pokemon.types);

  return (
    <Layout title={pokemon.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">{pokemon.name}</h1>
      <img className="mx-auto" src={pokemon.image} alt={pokemon.name} />
      <p>
        <span className="font-bold mr-2">Peso:</span> {pokemon.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Altura:</span> {pokemon.height}
      </p>

      <h2 className="text-2xl mt-6 mb-2">Tipos</h2>
      {pokemon.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await res.json();
  const paddedId = ('00' + id).slice(-3);

  pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;

  return {
    props: { pokemon },
  };
};

export default pokemon;

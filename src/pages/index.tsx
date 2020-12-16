import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

interface IPokemonProps {
  name: string;
  image: string;
}

interface Pokemons {
  pokemons: IPokemonProps[];
}

const Home = ({ pokemons }: Pokemons): JSX.Element => {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>

      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-20 h-20 mr-3"
                />
                <span className="mr-2 font-bold">{index + 1}</span>
                {pokemon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Pokemons> = async (context) => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const { results } = await data.json();

  const pokemons = results.map((result: {}, index: string) => {
    const paddeIndex = ('00' + (index + 1)).slice(-3);

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddeIndex}.png`;
    return {
      ...result,
      image,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;

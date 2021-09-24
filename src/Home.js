import { useQuery, gql } from "@apollo/client";
import { Link } from "@reach/router";

const QUERY = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        id
        name
        image
      }
    }
  }
`;

const variables = {
  limit: 151,
  offset: 0,
};

function Home() {
  const { loading, error, data } = useQuery(QUERY, { variables });

  if (loading) return "loading...";
  if (error) console.log(error);

  return (
    <div>
      {data.pokemons.results.map((pokemon) => (
        <div key={pokemon.name}>
          <Link to={"/pokemon/" + pokemon.name}>{pokemon.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;

import { useQuery, gql } from "@apollo/client";
import Card from "./Components/Card";

import "./Home.css";

const QUERY = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        name
        artwork
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
    <main>
      <div>
        <h1>Pokedex</h1>
      </div>
      <div className="card-container">
        {data.pokemons.results.map((pokemon) => (
          <Card key={pokemon.name} {...pokemon} />
        ))}
      </div>
    </main>
  );
}

export default Home;

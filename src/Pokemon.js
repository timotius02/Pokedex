import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      name
      id
      sprites {
        front_default
      }
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
        }
      }
    }
  }
`;

function Pokemon({ name }) {
  const { loading, error, data } = useQuery(QUERY, { variables: { name } });

  if (loading) return "loading...";
  if (error) console.log(error);

  let { id, sprites, moves } = data.pokemon;

  const types = data.pokemon.types.reduce(
    (prev, curr) => [...prev, curr.type.name],
    []
  );

  return (
    <div>
      <h3>{name}</h3>
      <p>{types.join(", ")}</p>
      <img src={sprites.front_default} alt={name} />
    </div>
  );
}

export default Pokemon;

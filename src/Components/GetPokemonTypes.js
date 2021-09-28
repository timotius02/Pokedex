import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_TYPE } from "../queries";
import { Context } from "../store";

export function GetPokemonTypes({ children, name, ...props }) {
  const { loading, error, data } = useQuery(GET_TYPE, { variables: { name } });
  const [, dispatch] = useContext(Context);

  if (error) {
    dispatch({ type: "SET_ERROR", payload: error });
  }

  let types = [];
  if (!loading && !error) {
    types = data.pokemon.types.reduce(
      (prev, curr) => [...prev, curr.type.name],
      []
    );
  }

  return children({
    ...props,
    loading,
    error,
    types,
  });
}

export default GetPokemonTypes;

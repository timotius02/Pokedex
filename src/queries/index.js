import { gql } from "@apollo/client";

export const GET_ALL_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_POKEMON = gql`
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
      abilities {
        ability {
          name
        }
        is_hidden
      }
      species {
        name
      }
      message
      weight
      height
      stats {
        stat {
          name
        }
        base_stat
      }
    }
  }
`;

export const GET_TYPE = gql`
  query getType($name: String!) {
    pokemon(name: $name) {
      name
      id
      types {
        type {
          name
        }
      }
    }
  }
`;

export const GET_MOVE = gql`
  query Move($name: String!) {
    move(move: $name) {
      message
      status
      response
      params
    }
  }
`;

const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function TypePills({ types }) {
  return (
    <div>
      {types.map((type) => (
        <inline-block key={type}>
          <span
            style={{
              backgroundColor: colors[type],
              fontVariant: "small-caps",
              color: "#f8f8f8",
              borderRadius: 15,
              padding: "0 12px 5px 12px",
              marginRight: "5px",
            }}
          >
            {type}
          </span>
        </inline-block>
      ))}
    </div>
  );
}
export default TypePills;

import "./Card.css";
import { Link } from "@reach/router";

const Card = ({ name, artwork }) => {
  return (
    <Link to={"/pokemon/" + name}>
      <div className="card">
        <h3>{name}</h3>
        <div style={{ display: "flex" }}>
          <div className="types">TYPE</div>
          <div className="artwork">
            <img src={artwork} alt={name} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

import "../styles/cards.css";

export default function DestinationCard({ name, desc, img }) {
  return (
    <div className="card">
      <img src={img} alt={name} />
      <div className="card-content">
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}
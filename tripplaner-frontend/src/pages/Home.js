import DestinationCard from "../components/DestinationCard";
import Hero from "../components/Hero";

export default function Home() {

  const destinations = [
    {
      name: "Ooty",
      desc: "Queen of Hill Stations with rolling hills and tea gardens.",
      img: "https://media.istockphoto.com/id/537064629/photo/tea-plantations-around-the-emerald-lake-in-ooty.jpg?s=612x612&w=0&k=20&c=yEjt_jKZXxSFTvD97YmFUEXWdhVfuu4-7LAkgheVPBE="
    },
    {
      name: "Kodaikanal",
      desc: "The Princess of Hill Stations featuring dense forests.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5oaW5ud7IWeLAIkZUzKbXwEEXmb7UdmVKTg&s"
    },
    {
      name: "Coimbatore",
      desc: "The Manchester of South India with vibrant culture.",
      img: "https://images.unsplash.com/photo-1620173834206-c029bf322dba?auto=format&fit=crop&w=600"
    },
    {
      name: "Chennai",
      desc: "A coastal metropolis rich in history and traditional arts.",
      img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600"
    },
    {
      name: "Madurai",
      desc: "An ancient city known for its magnificent temples.",
      img: "https://images.unsplash.com/photo-1616843413587-9e3a37f7bbd8?auto=format&fit=crop&w=600"
    },
    {
      name: "Goa",
      desc: "Famous for beaches, nightlife, and Portuguese heritage.",
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600"
    }
  ];

  return (
  <div>

    <Hero />

    <div className="cards-container">
      {destinations.map((d, index) => (
        <DestinationCard
          key={index}
          name={d.name}
          desc={d.desc}
          img={d.img}
        />
      ))}
    </div>

  </div>
);
}
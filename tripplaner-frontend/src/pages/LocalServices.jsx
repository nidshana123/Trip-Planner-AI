import React, { useState, useRef } from "react";
import axios from "axios";
import "./LocalServices.css";

function LocalServices() {

const [hotelLocation,setHotelLocation]=useState("")
const [hospitalLocation,setHospitalLocation]=useState("")
const [guideLocation,setGuideLocation]=useState("")

const [hotels,setHotels]=useState([])
const [hospitals,setHospitals]=useState([])
const [guides,setGuides]=useState([])

const [selectedCard,setSelectedCard]=useState(null)

const hotelRef = useRef()
const hospitalRef = useRef()
const guideRef = useRef()

const searchHotels = async()=>{
const res = await axios.get(`http://localhost:8080/services/search?location=${hotelLocation}&category=hotel`)
setHotels(res.data)
}

const searchHospitals = async()=>{
const res = await axios.get(`http://localhost:8080/services/search?location=${hospitalLocation}&category=hospital`)
setHospitals(res.data)
}

const searchGuides = async()=>{
const res = await axios.get(`http://localhost:8080/services/search?location=${guideLocation}&category=guide`)
setGuides(res.data)
}

const scrollLeft=(ref)=>{
ref.current.scrollBy({left:-300,behavior:'smooth'})
}

const scrollRight=(ref)=>{
ref.current.scrollBy({left:300,behavior:'smooth'})
}

const Card = ({item}) =>(
<div className="card" onClick={()=>setSelectedCard(item)}>
<img src={item.image} alt={item.name}/>
<div className="card-content">
<h3>{item.name}</h3>
<p className="rating">⭐ {item.rating}</p>
<p>{item.location}</p>
</div>
</div>
)

return(

<div className="services-container">

<h1 className="title">Local Services</h1>

{/* HOTELS */}

<div className="section">

<h2>Hotels</h2>

<div className="search-bar">
<input
placeholder="Enter location (Goa)"
value={hotelLocation}
onChange={(e)=>setHotelLocation(e.target.value)}
/>

<button onClick={searchHotels}>Search</button>
</div>

<div className="slider-container">

<button className="scroll-btn left" onClick={()=>scrollLeft(hotelRef)}>‹</button>

<div className="card-slider" ref={hotelRef}>
{hotels.map((hotel,index)=>(
<Card key={index} item={hotel}/>
))}
</div>

<button className="scroll-btn right" onClick={()=>scrollRight(hotelRef)}>›</button>

</div>

</div>


{/* HOSPITALS */}

<div className="section">

<h2>Hospitals</h2>

<div className="search-bar">
<input
placeholder="Enter location"
value={hospitalLocation}
onChange={(e)=>setHospitalLocation(e.target.value)}
/>

<button onClick={searchHospitals}>Search</button>
</div>

<div className="slider-container">

<button className="scroll-btn left" onClick={()=>scrollLeft(hospitalRef)}>‹</button>

<div className="card-slider" ref={hospitalRef}>
{hospitals.map((hospital,index)=>(
<Card key={index} item={hospital}/>
))}
</div>

<button className="scroll-btn right" onClick={()=>scrollRight(hospitalRef)}>›</button>

</div>

</div>


{/* GUIDES */}

<div className="section">

<h2>Travel Guides</h2>

<div className="search-bar">
<input
placeholder="Enter location"
value={guideLocation}
onChange={(e)=>setGuideLocation(e.target.value)}
/>

<button onClick={searchGuides}>Search</button>
</div>

<div className="slider-container">

<button className="scroll-btn left" onClick={()=>scrollLeft(guideRef)}>‹</button>

<div className="card-slider" ref={guideRef}>
{guides.map((guide,index)=>(
<Card key={index} item={guide}/>
))}
</div>

<button className="scroll-btn right" onClick={()=>scrollRight(guideRef)}>›</button>

</div>

</div>


{/* POPUP MODAL */}

{selectedCard && (

<div className="modal-overlay" onClick={()=>setSelectedCard(null)}>

<div className="modal-card" onClick={(e)=>e.stopPropagation()}>

<img src={selectedCard.image}/>

<h2>{selectedCard.name}</h2>

<p>{selectedCard.description}</p>

<p className="rating">⭐ {selectedCard.rating}</p>

<p><b>Location:</b> {selectedCard.location}</p>

<p><b>Open Days:</b> {selectedCard.openDays}</p>

<p><b>Time:</b> {selectedCard.openTime} - {selectedCard.closeTime}</p>

<button className="close-btn" onClick={()=>setSelectedCard(null)}>
Close
</button>

</div>

</div>

)}

</div>

)

}

export default LocalServices
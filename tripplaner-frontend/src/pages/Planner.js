import { useState } from "react";
import "../styles/planner.css";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function Planner() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Tell me your destination, number of days, budget, and travel type."
    }
  ]);
  const [input, setInput] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const navigate = useNavigate();
  const downloadItinerary = () => {

    if (!itinerary) return;

    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("TripPlanner AI - Travel Itinerary", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let y = 40;

    // Day Title
    doc.text(itinerary.day, 20, y);
    y += 10;

    // Plan items
    itinerary.plan.forEach(item => {
      const lines = doc.splitTextToSize(item, 170);
      doc.text(lines, 20, y);
      y += lines.length * 8;
    });

    y += 10;

    // Travel Tips
    doc.setFont("helvetica", "bold");
    doc.text("Travel Tips:", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    const tips = doc.splitTextToSize(itinerary.tips, 170);
    doc.text(tips, 20, y);

    // Save PDF
    doc.save("TripPlanner-Itinerary.pdf");
  };

  const formatAIResponse = (text) => {
    if (!text) return [];

    const lines = text
      .replace(/\\n/g, "\n")
      .replace(/\s*(\*\*.*?\*\*)\s*/g, "\n$1\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const merged = [];
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i] === "-" && i + 1 < lines.length) {
        merged.push(`- ${lines[i + 1]}`);
        i += 1;
      } else {
        merged.push(lines[i]);
      }
    }

    return merged;
  };

  const renderBoldMarkdown = (line) => {
    const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);

    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };
  const extractLocations = (planLines) => {

    const places = [];

    planLines.forEach(line => {

      // ignore time lines
      if (
        line.match(/\d{1,2}:\d{2}\s?(AM|PM)/i) ||
        line.includes("Day")
      ) return;

      // capture lines starting with Visit / Explore / Enjoy / Relax
      const match = line.match(
        /(Visit|Explore|Enjoy|Relax|Take|Have fun at)\s(.+?)(\.|$)/i
      );

      if (match && match[2]) {
        places.push(match[2].trim());
      }
    });

    return places;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch("http://localhost:8080/planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input
        })
      });
      // const data = await response.json();
      const data = await response.json();

      console.log("Locations from backend:", data.locations);


      // 🔥 Use structured response
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.itinerary_text
        }
      ]);

      // setItinerary({
      //   text: data.itinerary_text,
      //   locations: data.locations
      // });
      // setItinerary({
      //   day: "Generated Trip Plan",
      //   plan: data.itinerary_text
      //     ? data.itinerary_text.split("\n")
      //     : [],
      //   tips: "Follow local safety guidelines and check weather before travel.",
      //   locations: data.locations || []
      // });
      const formatted = data.itinerary_text
        .replace(/Day\s*\d+/g, "\n$&")                // new line before Day
        .replace(/(\d{1,2}:\d{2}\s?(AM|PM))/g, "\n$1") // new line before time
        .replace(/-\s/g, "\n- ")                      // new line before bullets
        .trim();

      setItinerary({
        day: "Generated Trip Plan",
        plan: formatted.split("\n"),
        tips: "Follow local safety guidelines and check weather before travel.",
        locations: data.locations || []
      });
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Unable to connect to planner service." }
      ]);
    }

    setInput("");
  };

  return (
    <div className="planner-container">
      <div className="chat-section">
        <div className="chat-header">AI Travel Planner</div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "user-msg" : "bot-msg"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Coimbatore, 3 days, family trip, 10k budget"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <div className="itinerary-section">
        <h2>Trip Plan</h2>

        {itinerary ? (
          <>
            <div className="itinerary-card">
              <h3>{itinerary.day}</h3>
              <ul>
                {itinerary.plan.map((item, i) => (
                  <li key={i}>{renderBoldMarkdown(item)}</li>
                ))}
              </ul>
            </div>

            <div className="extra-info">
              <h4>Travel Tips</h4>
              <p>{itinerary.tips}</p>
            </div>

            {/* <div className="planner-actions">
              <button>Download</button>
              <button>View Map</button>
            </div>
             */}
            <div className="planner-actions">
              <button onClick={downloadItinerary}>
                📄 Download
              </button>

              {/* <button>
              🗺 View Map
            </button> */}
              {/* <button
  onClick={() => {
    const places = extractLocations(itinerary.plan);

    navigate("/map", {
      state: { locations: places }
    });
  }}
>
  🗺 View Map
</button> */}
              {/* <button
  onClick={() => {

    const places = extractLocations(itinerary.plan);

    // store temporarily
    sessionStorage.setItem(
      "tripLocations",
      JSON.stringify(places)
    );

    navigate("/map");
  }}
>
  🗺 View Map
</button> */}
              <button
                onClick={() => {

                  console.log("Saving to sessionStorage:", itinerary.locations);
                  sessionStorage.setItem(
                    "tripLocations",
                    JSON.stringify(itinerary.locations || [])
                  );

                  navigate("/map");
                }}
              >
                🗺 View Map
              </button>
            </div>
          </>
        ) : (
          <p>Your itinerary will appear here after planning.</p>
        )}
      </div>
    </div>
  );
}

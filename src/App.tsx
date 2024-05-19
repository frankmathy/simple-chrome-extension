import { useState } from "react";
import "./App.css";

function App() {
  const [colour, setColour] = useState("$#ffffff");

  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [colour],
      func: (colour) => {
        document.body.style.backgroundColor = colour;
      },
    });
  };

  return (
    <>
      <h1>My Extension</h1>
      <div className="card">
        <p>
          <input
            type="color"
            onChange={(e) => {
              setColour(e.currentTarget.value);
            }}
            value={colour}
          />
        </p>
        <p>Selected Colour: ${colour}</p>
        <button onClick={onclick}>Change Background</button>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addNote, filterNotes } from "./redux/notes/notesSlice";

function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [text, setText] = useState("");
  const [object, setObject] = useState({});
  const [color, setColor] = useState("");
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    if(search !== '' && notes.length > 0){
      dispatch(filterNotes(search))
    }
  }, [search])
  
  
  const handleClick = (e) => {
    e.preventDefault();
    setObject({ color, text });
    setText("");
  };

  useEffect(() => {
    if (object.text !== "" && color !== "") {
      dispatch(addNote(object));
    }
  }, [object]);

  useEffect(() => {
    if (checked === true) {
      setColor("gray");
    } else if (checked2 === true) {
      setColor("green");
    } else if (checked3 === true) {
      setColor("pink");
    } else if (checked4 === true) {
      setColor("blue");
    } else {
      setColor("");
    }
  }, [checked, checked2, checked3, checked4]);

  return (
    <div className="App">
      <h1>NotesApp</h1>
      <input
        type="text"
        className="search"
        placeholder="search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <textarea
        cols="90"
        rows="20"
        placeholder="Enter your note here"
        className="textArea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="content">
        <div className="colors">
          <Checkbox
            color="default"
            value={checked}
            checked={checked}
            onChange={() => {
              setChecked((prev) => !prev);
            }}
          />
          <Checkbox
            color="success"
            value={checked2}
            checked={checked2}
            onChange={() => {
              setChecked2((prev) => !prev);
            }}
          />
          <Checkbox
            color="secondary"
            value={checked3}
            checked={checked3}
            onChange={() => {
              setChecked3((prev) => !prev);
            }}
          />
          <Checkbox
            sx={{
              color: "pink[800]",
              "&.Mui-checked": {
                color: "pink[600]",
              },
            }}
            value={checked4}
            checked={checked4}
            onChange={() => {
              setChecked4((prev) => !prev);
            }}
          />
        </div>
        <button className="addBtn" onClick={(e) => handleClick(e)}>
          ADD
        </button>
      </div>
      <div className="card">
        {notes?.map((item, i) => (
          <div
            key={i}
            className="cardItem"
            style={{ backgroundColor: `${item.color}` }}
          >
            <h1>{item.text}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { Container } from "react-bootstrap";
import "./App.css";
import FormSection from "./FormSection";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("noteData")) || [];
    setNotes(stored);
  }, []);

  const addNote = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("noteData", JSON.stringify(updatedNotes));
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("noteData", JSON.stringify(updatedNotes));
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <SearchBar notes={notes} deleteNote={deleteNote} />
      <FormSection addNote={addNote} />
    </Container>
  );
}

export default App;

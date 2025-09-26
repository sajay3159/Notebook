import { useState } from "react";
import {
  ListGroup,
  Button,
  Container,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";

function SearchBar({ notes, deleteNote }) {
  const [query, setQuery] = useState("");

  const filteredNotes =
    notes &&
    notes.filter(
      (note) =>
        note.name.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
    );

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar expand="lg" className="py-3 bg-light">
        <Container fluid>
          <Navbar.Brand href="#">NoteBook</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Link</Nav.Link>
            </Nav>
            <Form
              className="d-flex"
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              <Form.Control
                type="search"
                placeholder="Search notes"
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={handleSearch}
              />
              <Button variant="outline-success" disabled>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        {/* Show counts */}
        <p>
          <strong>Total Notes:</strong> {notes.length}
          {query && (
            <>
              {" | "}
              <strong>Showing:</strong> {filteredNotes.length} of {notes.length}
            </>
          )}
        </p>

        <ListGroup>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, idx) => (
              <ListGroup.Item
                key={idx}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5 className="mb-1">{note.name}</h5>
                  <small className="text-muted">{note.description}</small>
                </div>

                <div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteNote(idx)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p>No notes found</p>
          )}
        </ListGroup>
      </Container>
    </>
  );
}

export default SearchBar;

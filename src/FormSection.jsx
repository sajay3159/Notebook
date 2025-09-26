import { Container, Form, Button, Card, Toast } from "react-bootstrap";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

function FormSection({ addNote }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [touched, setTouched] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validationSchema.isValid(formData);

    if (isValid) {
      addNote(formData);
      setFormData({ name: "", description: "" });
      setTouched({});
      setShowSuccessToast(true);
    } else {
      setShowErrorToast(true); // show error toast
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card
        className="bg-light text-dark mt-4"
        style={{ width: "60vh", minHeight: "50vh" }}
      >
        <Container className="mt-4 d-flex justify-content-center">
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <h2 className="text-center">Create New Note</h2>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Note Title"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !formData.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Note Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Note Description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && !formData.description}
                />
              </Form.Group>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </Card>

      {/* Success Toast */}
      <Toast
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        delay={3000}
        autohide
        bg="success"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <Toast.Body className="text-white">
          ✅ Note saved successfully!
        </Toast.Body>
      </Toast>

      {/* Error Toast */}
      <Toast
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        delay={3000}
        autohide
        bg="danger"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <Toast.Body className="text-white">
          ❌ Please fill all required fields!
        </Toast.Body>
      </Toast>
    </Container>
  );
}

export default FormSection;

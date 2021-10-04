import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LoginPage({ onJoin = () => {} }) {

  const [name, setName] = useState("");

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="VideoCallName">
            <Form.Label>Hello!</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              pattern="[^' ']+"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => onJoin(name)}
          >
            Join
          </Button>
        </Col>
      </Row>
    </div>
  );
}

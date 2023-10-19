import React from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

const CustomerInterface = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2>Customer Interface</h2>
              <Form>
                <Form.Group controlId="tableNumber">
                  <Form.Label>Table Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter table number" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerInterface;

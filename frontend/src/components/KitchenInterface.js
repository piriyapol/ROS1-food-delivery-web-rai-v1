import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const KitchenInterface = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2>Kitchen Interface</h2>
              <Button
                variant="primary"
                onClick={() => {
                  /* Serve an order */
                }}
              >
                Serve Next Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default KitchenInterface;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap"; // Import React-Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "bootstrap/dist/js/bootstrap.bundle.min";  //import bootstrap js
import CustomerPage from "./pages/CustomerPage";
import KitchenPage from "./pages/KitchenPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ROS1 Food Delivery</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/customer">
              Customer
            </Nav.Link>
            <Nav.Link as={Link} to="/kitchen">
              Kitchen
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

const MainPage = () => {
  return (
    <div>
      <h1 className="text-center">Welcome to ROS1 Food Delivery</h1>
      <p className="text-center">Choose your role to get started.</p>
      <Row className="mt-4">
        <Col xs={4}>
          <Button as={Link} to="/customer" variant="primary" size="lg" block>
            Customer
          </Button>
        </Col>
        <Col xs={4}>
          <Button as={Link} to="/kitchen" variant="primary" size="lg" block>
            Kitchen
          </Button>
        </Col>
        <Col xs={4}>
          <Button as={Link} to="/admin" variant="primary" size="lg" block>
            Admin
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default App;

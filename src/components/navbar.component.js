import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <Link to="/" className="navbar-brand">
          ExerciseTracker
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/" className="nav-link">
                Exercises
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/create-exercise" className="nav-link">
                Create Exercise
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/create-user" className="nav-link">
                Create User
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;

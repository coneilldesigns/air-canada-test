import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import logo from '../assets/logo.jpg';
import { Router, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    // Set the state directly. Use props if necessary.
    this.state = {
      isCartOpen: props.isCartOpen,
      shopName: props.shopName,
      isOpen: false,
      collections: props.collections
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    return(
      <header>
        <Navbar expand="md">
          <NavbarBrand tag={Link} to={'/'}><img src={logo} alt={this.props.shopName} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle}><FontAwesomeIcon icon={faBars} /></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Shop
                </DropdownToggle>
                <DropdownMenu left="true">
                  <DropdownItem tag={Link} to={'/'}>
                    Home
                  </DropdownItem>
                  <DropdownItem tag={Link} to={'/'}>
                    Other Page
                  </DropdownItem>
                  <DropdownItem tag={Link} to={'/'}>
                    Another Page
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Collections
                </DropdownToggle>
                <DropdownMenu left="true">
                  <DropdownItem tag={Link} to={'/'}>
                    Collection 1
                  </DropdownItem>
                  <DropdownItem tag={Link} to={'/'}>
                    Collection 2
                  </DropdownItem>
                  <DropdownItem tag={Link} to={'/'}>
                    Collection 3
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <div className="form-inline">
              <Nav className="mr-auto">
                <NavItem>
                  <NavLink href="/components/"><FontAwesomeIcon icon={faUser} /></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap"><FontAwesomeIcon icon={faHeart} /></NavLink>
                </NavItem>
                {!this.props.isCartOpen &&
                  <NavItem>
                    <NavLink onClick={this.props.changeCartOpenStateToTrue} href="#"><FontAwesomeIcon icon={faShoppingCart} /></NavLink>
                  </NavItem>
                }
              </Nav>

            </div>
          </Collapse>
        </Navbar>

      </header>
    );
  }

}

export default Header;

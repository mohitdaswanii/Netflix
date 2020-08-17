import React, { useState, useEffect } from "react";
import "../styles/netflixNav.css";
import { NavLink } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import { NavItem, NavLink } from "reactstrap";
const NetflixNav = () => {
  const [show, handleShow] = useState();
  const [searchBar, setSearchBar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleSearchClick = () => {
    setSearchBar(!searchBar);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      // window.removeEventListener("scroll")
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix logo"
      />
      <div style={{ display: "flex", marginLeft: "130px" }}>
        <p>
          <NavLink className="navlinkStyle" to="/">
            Home
          </NavLink>
        </p>
        <p>
          <NavLink className="navlinkStyle" to="/movies">
            Movies
          </NavLink>
        </p>
        <p>
          <NavLink className="navlinkStyle" to="/">
            My List
          </NavLink>
        </p>
        <p>
          <NavLink className="navlinkStyle" to="/">
            Latest
          </NavLink>
        </p>
      </div>
      <div style={{display:"flex"}}>
          <InputGroup>
            <input
              style={{ height: "41px" }}
              placeholder="Enter Movie Name..."
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                {" "}
                <img
                  className="search"
                  style={{ height: "30px", width: "30px" }}
                  src="https://www.iconsdb.com/icons/preview/white/search-3-xxl.png"
                  alt="searchIcon"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Dropdown isOpen={dropdownOpen}style={{marginLeft:"10px" }} toggle={toggle}>
            <DropdownToggle style={{background:"black"}} caret></DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem header>Account</DropdownItem> */}
              <DropdownItem >Account</DropdownItem>
              <DropdownItem>Sign out of Netflix</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <input type="text" placeholder="Enter MovieName" />

          <button onClick={handleSearchClick}>
            {/* {searchBar ? ( */}

          {/* ) : null} */}
          {/* </button> */}
        </div>
    </div>
  );
};

export default NetflixNav;
import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

function Header() {
  // const link1 = "";
  

  // Creation fonction menu Burger
  let isBurgerOpen = false;
  function burgerToggle() {
    const nav = document.querySelector(".header__nav");
    console.log(nav);
    nav.classList.toggle("active");
    isBurgerOpen = !isBurgerOpen;
  }
  // Fin fonction menu Burger

  return (
    <>
      <div className="header">
        <nav className="header__nav">
          <ul onClick={burgerToggle}>
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/page2">Page2</NavLink>
            </li>
            <li>
              <NavLink to="/page3">Page3</NavLink>
            </li>
            <li>
              <NavLink to="/page4">Page4</NavLink>
            </li>
            <span>
              <a href="" arget="_blank" rel="noopener noreferrer">
                <img
                  src=""
                  alt=""
                />
              </a>
            
            </span>
          </ul>
          <div className="header__burgerMenu" onClick={burgerToggle}></div>
        </nav>
      </div>
    </>
  );
}

export default Header;

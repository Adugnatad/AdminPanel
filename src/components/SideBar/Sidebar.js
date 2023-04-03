import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { SidebarDataUser } from "./SidebarDataUser";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { useAPI } from "../../Context/APIContext";

const Nav = styled.div`
  // max-width: 100px;
  position: fixed;
  z-index: 30;
`;

const NavIcon = styled.div`
  font-size: 1.5rem;
`;

const SidebarNav = styled.nav`
  background: #24244e;
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  // position: fixed;
  top: 0;
  margin-left: ${({ sidebar }) => (sidebar ? "0" : "-500px")};
  transition: 350ms;
  z-index: 1;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  const { userType, NavBarUser } = useAPI();
  return (
    <div className="sideBarDiv">
      <IconContext.Provider value={{ color: "#24244e" }}>
        <Nav>
          <NavIcon onClick={showSidebar}>
            <FaIcons.FaBars />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose
                style={{ color: "#fff" }}
                onClick={showSidebar}
              />
            </NavIcon>
            {userType === "admin"
              ? SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })
              : SidebarDataUser.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;

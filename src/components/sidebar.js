import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
    let a= sessionStorage.getItem("FirstName");
  return (   
    <Menu>
      <a className="menu-item" href="/">
        DashBoard
      </a>
      <hr/>

      <a className="menu-item" href={'/ChatApp/'+ sessionStorage.getItem("FirstName")}>
      Online Chat
      </a>

      <hr/>

      <a className="menu-item" href={'/VideoChat/'+ sessionStorage.getItem("FirstName")}>
      Video Chat
      </a>
      <hr/>
      <a className="menu-item" href={'/Home/'+ sessionStorage.getItem("UserId") +''}>
      Consultant List
      </a>
      <hr/>
      <a className="menu-item" href="/Help">
        Help
      </a>
      <hr/>
      <a className="menu-item" href="/node">
        Node
      </a>
      <hr/>
    </Menu>
  );
};
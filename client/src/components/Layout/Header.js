import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    messageApi.success("Logged Out Successfully!");
    setTimeout(() => {
    navigate("/login");
  }, 500);
  };

  return (
    <>
      {contextHolder}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Expense Tracker
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {" "}
                <p className="nav-link d-flex align-items-center"><UserOutlined className="me-2" />  {loginUser && loginUser.name}</p>

              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

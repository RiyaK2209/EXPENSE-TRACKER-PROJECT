import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/LoginPage.css";
import signinImage from '../images/signin-image.jpg'

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/login`, values); //de structuring using {data}
      setLoading(false);
      messageApi.success("login success!");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
       setTimeout(() => {
      navigate("/");
    }, 500);
    } catch (error) {
      setLoading(false);
      messageApi.error("Something went wrong!");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {contextHolder}
     <div className="main">
  <section className="sign-in">
    <div className="container">
      <div className="signin-content">
        <div className="signin-image">
          <figure>
            <img src={signinImage} alt="sign in illustration" />
          </figure>
          <Link to="/register" className="signup-image-link">
            Not A User? Click Here to Register
          </Link>
        </div>
        <div className="signin-form">
          <h2 className="form-title">Login</h2>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please fill out this field" }]}>
              <Input type="email"  />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please fill out this field" }]}>
              <Input type="password" />
            </Form.Item>
            <div className="form-group form-button">
              <button type="submit" className="form-submit">Login</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</div>

    </>
  );
};

export default Login;

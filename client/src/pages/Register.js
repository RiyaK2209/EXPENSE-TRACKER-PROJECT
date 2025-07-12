import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css"
import signupImage from '../images/signup-image.jpg'

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      console.log("API success");
      messageApi.success("Registration Successful!");
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 500);
      // navigate("/login");
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
      <div className="register-page">
        {loading && <Spinner />}
        <div className="container-register">
          <div className="register-image">
             <img src={signupImage} alt="register" />
          </div>
          <Form
            layout="vertical"
            onFinish={submitHandler}
            className="register-form"
          >
            <h1>Register</h1>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <Link to="/login">Already Registered? Click Here to Login</Link>
              <button className="btn btn-primary">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;

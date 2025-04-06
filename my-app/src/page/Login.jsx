import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const body = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "https://nt-devconnector.onrender.com/api/auth",
        body
      );

      const token = res.data?.token;

      if (token) {
        toast.success("Login muvaffaqiyatli!");
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(body));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError("Ro‘yxatdan o‘tishda token olinmadi.");
      }
    } catch (err) {
      console.error("Ro‘yxatdan o‘tishda xato:", err?.response?.data);
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        "Ro‘yxatdan o‘tishda xatolik yuz berdi.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-[36px] font-[600] mb-[43px]">
        Welcome, Log into you account
      </h1>
      <div className="w-[512px] bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-[16px] h-[58px] pb-[14px] font-[500] w-[242px] ml-[101px]">
          It is our great pleasure to have you on board
        </h2>
        <div className="">
          <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 40 }}
            // style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <div className="flex items-center flex-col gap-[40px]">
              <Form.Item
                name="email"
                className="w-[242px]"
                layout="vertical"
                rules={[
                  { required: true, message: "Emailni kiriting!" },
                  { type: "email", message: "Email noto‘g‘ri formatda!" },
                ]}
              >
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Login"
                  className="h-[42px] w-[242px]"
                />
              </Form.Item>
              <Form.Item
                name="password"
                className="w-[242px]"
                rules={[{ required: true, message: "Parolni kiriting!" }]}
              >
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="h-[42px] w-[242px]"
                />
              </Form.Item>
            </div>
            <Form.Item
              className=""
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox className="w-[170px]">Yodingizda saqlansin</Checkbox>
            </Form.Item>
            {error && <div style={{ color: "red" }}>{error}</div>}{" "}
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
                className="!h-[42px] !text-[14px] !font-[600] w-[242px]"
              >
                {isSubmitting ? "Yuborilmoqda..." : "Login"}
              </Button>
            </Form.Item>
            <Link to={"/register"}>Sign up</Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

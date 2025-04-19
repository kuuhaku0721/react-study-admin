import { Card, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("用户输入", values);
    await axios
      .post("http:192.168.31.120:8080/persona/login", {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        if (response.data.code === 200) {
          // message.success("登录成功");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
    message.success("登录成功");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img
          className="login-logo"
          src="https://img.moegirl.org.cn/common/0/01/QuickSand1.png"
          alt=""
        />
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "需要输入用户名",
              },
              {
                message: "需要输入正确的格式",
              },
            ]}
          >
            <Input
              className="ant-input"
              size="large"
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "需要输入密码",
              },
            ]}
          >
            <Input
              className="ant-input"
              size="large"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="ant-btn"
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("用户输入", values);
    // await dispatch(fetchLogin(values));
    // TODO 需要验证登录请求就在这写个axios.post("", {username: values.username, password: values.password}).then().catch()
    navigate("/");
    message.success("登录成功");
  };

  // TODO 样式没有改，之后再说，旧的登录逻辑不管了，最后一块删

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
            <Input size="large" placeholder="请输入用户名" />
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
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

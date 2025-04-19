import { Breadcrumb, Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ModifyUser = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const data = location.state;
  const userId = data ? data.id : -1;
  const type = data ? data.type : null;
  const username = data ? data.username : null;
  const sex = data ? data.sex : null;
  const phone = data ? data.phone : null;

  const onFinish = async (formValue) => {
    console.log(formValue);
    // 修改用户
    if (type === "modify") {
      await axios
        .post("http://192.168.31.120:8080/persona/study/user/updateUser", {
          id: userId,
          username: formValue.username,
          password: formValue.password,
          sex: formValue.sex,
          phone: formValue.phone,
        })
        .then((response) => {
          console.log(response);
          message.success("用户信息提交成功");
        })
        .catch((err) => {
          console.log(err);
          message.error("服务器莫得反应");
        });
      return;
    }
    // 添加用户
    await axios
      .post("http://192.168.31.120:8080/persona/study/user/addUser", {
        username: formValue.username,
        password: formValue.password,
        sex: formValue.sex,
        phone: formValue.phone,
      })
      .then((response) => {
        console.log(response);
        message.success("用户信息提交成功");
      })
      .catch((err) => {
        console.log(err);
        message.error("服务器莫得反应");
      });
  };

  return (
    <div>
      <Card title={<Breadcrumb items={[{ title: "修改用户" }]} />}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 4 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              placeholder="请输入用户名"
              style={{ width: 400 }}
              defaultValue={username}
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input.Password
              placeholder="请输入初始密码"
              style={{ width: 400 }}
            />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "请输入性别" }]}
          >
            <Input
              placeholder="请输入性别"
              style={{ width: 400 }}
              defaultValue={sex}
            />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号" }]}
          >
            <Input
              placeholder="请输入手机号"
              style={{ width: 400 }}
              defaultValue={phone}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ left: 177 }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {type === "modify" ? "修改用户信息" : "添加用户信息"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ModifyUser;

import { Breadcrumb, Button, Card, Form, Input } from "antd";
import { useLocation } from "react-router-dom";

const ModifyUser = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const data = location.state;
  const type = data ? data.type : null;
  const username = data ? data.username : null;
  const sex = data ? data.sex : null;
  const phone = data ? data.phone : null;

  const onFinish = (formValue) => {
    console.log(formValue);
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

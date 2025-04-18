import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();

  const onEditActionClick = (data) => {
    console.log(data);
    navigate("/ModifyUser", {
      state: {
        ...data,
        type: "modify",
      },
    });
  };

  const onDeleteConfirm = (data) => {
    console.log("将要删除的: ", data);
  };

  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      width: 120,
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 220,
    },
    {
      title: "手机号",
      dataIndex: "phone",
      width: 200,
    },
    {
      title: "创建时间",
      dataIndex: "create_date",
    },
    {
      title: "更新时间",
      dataIndex: "update_date",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEditActionClick(data)}
            />
            <Popconfirm
              title="删除"
              description="确认要删除吗?"
              onConfirm={() => onDeleteConfirm(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // TODO 异步从服务器获取的
  const data = [
    {
      id: 1,
      username: "kuuhaku",
      password: "123456",
      sex: "武装直升机",
      phone: "12321321321321",
      create_date: new Date(Date.now()).toLocaleString(),
      update_date: new Date(Date.now()).toLocaleString(),
    },
    {
      id: 2,
      username: "kuuhaku",
      password: "123456",
      sex: "武装直升机",
      phone: "12321321321321",
      create_date: new Date(Date.now()).toLocaleString(),
      update_date: new Date(Date.now()).toLocaleString(),
    },
    {
      id: 3,
      username: "kuuhaku",
      password: "123456",
      sex: "武装直升机",
      phone: "12321321321321",
      create_date: new Date(Date.now()).toLocaleString(),
      update_date: new Date(Date.now()).toLocaleString(),
    },
    {
      id: 4,
      username: "kuuhaku",
      password: "123456",
      sex: "武装直升机",
      phone: "12321321321321",
      create_date: new Date(Date.now()).toLocaleString(),
      update_date: new Date(Date.now()).toLocaleString(),
    },
    {
      id: 5,
      username: "kuuhaku",
      password: "123456",
      sex: "武装直升机",
      phone: "12321321321321",
      create_date: new Date(Date.now()).toLocaleString(),
      update_date: new Date(Date.now()).toLocaleString(),
    },
  ];

  return (
    <div>
      <Card title={`用户信息`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default UserList;

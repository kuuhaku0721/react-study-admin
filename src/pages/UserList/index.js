import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([
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
  ]);

  const fetchUsers = async () => {
    await axios
      .get("http://192.168.31.120:8080/gurei/study/user/getAllUser")
      .then((response) => {
        const data = response.data.data;
        setData(
          data.map((item) => {
            return {
              ...item,
              // TODO 时间另外写个工具函数生成一下
              create_date: new Date(Date.now()).toLocaleString(),
              update_date: new Date(Date.now()).toLocaleString(),
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [data]);

  const onEditActionClick = (data) => {
    console.log(data);
    navigate("/ModifyUser", {
      state: {
        ...data,
        type: "modify",
      },
    });
  };

  const onDeleteConfirm = async (data) => {
    // 删除的正确逻辑是：缓存中已经存在了当前的data数组，根据id值先从缓存的data数组中删掉，然后传给后端删除
    // 后端删除完毕后不需要再次请求获取，除非用户重新进入当前页面，节省一次get请求
    console.log("将要删除的: ", data);
    await axios
      .post("http://192.168.31.120:8080/persona/study/user/deleteUser", {
        id: data.id,
      })
      .then((response) => {
        console.log(response);
        message.success("删除用户成功");
      })
      .catch((err) => {
        console.log(err);
        message.error("出现未知错误");
      });
    fetchUsers();
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

  return (
    <div>
      <Card title={`用户信息`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default UserList;

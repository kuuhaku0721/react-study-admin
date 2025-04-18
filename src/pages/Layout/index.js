import { Layout as AntdLayout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider } = AntdLayout;

const items = [
  {
    key: "k1",
    label: "用户管理",
    icon: <HomeOutlined />,
    children: [
      { key: "/UserList", label: "查看用户" },
      { key: "/ModifyUser", label: "添加用户" },
    ],
  },
  {
    key: "k2",
    label: "题目管理",
    icon: <DiffOutlined />,
    children: [
      { key: "/QuestionList", label: "查看题目" },
      { key: "/ModifyQuestion", label: "添加题目" },
    ],
  },
  {
    key: "k3",
    label: "统计数据",
    icon: <AppstoreOutlined />,
    children: [{ key: "/home", label: "查看数据图" }],
  },
  {
    key: "k4",
    label: "通知管理",
    icon: <EditOutlined />,
    children: [
      { key: "/MessageList", label: "查看通知" },
      { key: "/ModifyMessage", label: "发布通知" },
    ],
  },
];

// TODO 样式也暂时不管

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;

  const onMenuClick = (route) => {
    console.log("点击了菜单项", route);
    const path = route.key;
    navigate(path);
  };

  const onConfirm = () => {
    console.log("用户退出");
    navigate("/login");
  };

  return (
    <AntdLayout>
      <Header>
        <div className="user-info">
          <span className="user-name">写store中的用户名</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <AntdLayout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={selectedKey}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={onMenuClick}
          />
        </Sider>
        <AntdLayout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;

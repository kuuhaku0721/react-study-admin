import { Card, Table } from "antd";
import { useSelector } from "react-redux";

const MessageList = () => {
  const columns = [
    {
      title: "日期",
      dataIndex: "date",
      width: 120,
    },
    {
      title: "时间",
      dataIndex: "time",
      width: 120,
    },
    {
      title: "通知内容",
      dataIndex: "message",
    },
  ];
  const data = useSelector((state) => state.notifications);

  return (
    <div>
      <Card title={`推送通知`}>
        <Table rowKey="message" columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default MessageList;

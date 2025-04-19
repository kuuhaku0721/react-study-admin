import {
  Button,
  Card,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const QuestionList = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedYear, setSelectedYear] = useState(1970);
  const [inputStr, setInputStr] = useState();
  const [data, setData] = useState([
    {
      id: 1,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 2,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 3,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 4,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 5,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 6,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 7,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 8,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
    {
      id: 9,
      category: 1,
      year: 2014,
      title: "武装直升机",
      correct: "132131d5s4a56d4s5a6f4d53sa1vc53dsa41v53fdav15d3fsa4v5d",
    },
  ]);

  const fetchAllQuestions = async () => {
    await axios
      .get("http://192.168.31.120:8080/gurei/study/getAllQuestions")
      .then((response) => {
        const data = response.data.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        message.error("出问题了，看一下控制台吧");
      });
  };

  useEffect(() => {
    fetchAllQuestions();
  }, [data]);

  const onEditActionClick = (data) => {
    console.log(data);
    navigate("/ModifyQuestion", {
      state: {
        ...data,
        type: "modify",
      },
    });
  };

  const onDeleteConfirm = async (data) => {
    // 正确逻辑同用户页
    console.log("将要删除的: ", data);
    await axios
      .post("http://192.168.31.120:8080/persona/study/deleteQuestion", {
        id: data.id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchAllQuestions();
  };

  const columns = [
    {
      title: "题目id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "年份",
      dataIndex: "year",
      width: 70,
    },
    {
      title: "类型",
      dataIndex: "category",
      width: 100,
    },
    {
      title: "题目",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "答案解析",
      dataIndex: "correct",
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

  const handleSelect = async () => {
    if (inputStr) {
      message.info("检测到有输入内容，优先以输入内容为准进行查找");
      await axios
        .post("http://192.168.31.120:8080/persona/study/search", {
          text: inputStr,
        })
        .then((response) => {
          const data = response.data.data;
          setData([data]);
        })
        .catch((err) => {
          console.log(err);
          message.error("出问题了，看一下控制台吧");
        });
      return;
    }

    if (selectedCategory <= 0 || selectedYear < 2000) {
      message.error("类型和年份必须同时存在");
    }
    console.log("选择的内容: ", selectedCategory, selectedYear);
    await axios
      .get(
        `http://192.168.31.120:8080/gurei/study/exercise/${selectedCategory}/${selectedYear}`
      )
      .then((response) => {
        const data = response.data.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        message.error("出问题了，看一下控制台吧");
      });
  };

  return (
    <div>
      <Card title={"查找题目"}>
        <Select
          placeholder="选择想要筛选的类型"
          style={{ width: 180, margin: 10 }}
          onChange={(value) => setSelectedCategory(value)}
          options={[
            { value: 1, label: "数据结构" },
            { value: 2, label: "计算机组成原理" },
            { value: 3, label: "操作系统" },
            { value: 4, label: "计算机网络" },
          ]}
        />
        <Select
          placeholder="选择想要筛选的年份"
          style={{ width: 180, margin: 10 }}
          onChange={(value) => setSelectedYear(value)}
          options={[
            { value: 2014, label: "2014" },
            { value: 2015, label: "2015" },
            { value: 2016, label: "2016" },
            { value: 2017, label: "2017" },
            { value: 2018, label: "2018" },
            { value: 2019, label: "2019" },
          ]}
        />
        <div>
          <Input
            placeholder="请输入想要查找的题目"
            style={{ width: 380, margin: 10 }}
            onChange={(value) => setInputStr(value)}
          />
        </div>
        <div>
          <Button
            style={{ width: 120, margin: 10 }}
            size="middle"
            type="primary"
            onClick={handleSelect}
          >
            点击查找
          </Button>
        </div>
      </Card>
      <Card title={`用户信息`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default QuestionList;

import { Breadcrumb, Button, Card, Form, Input, message, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;

const ModifyQuestion = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const data = location.state;
  const type = data ? data.type : null;
  const id = data ? data.id : null;
  const title = data ? data.title : null;
  const correct = data ? data.correct : null;

  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedYear, setSelectedYear] = useState(1970);
  const [inputTitle, setInputTitle] = useState();
  const [inputCorrect, setInputCorrect] = useState();

  const onFinish = async (formValue) => {
    console.log(formValue);
    console.log("两个Select: ", selectedCategory, selectedYear);
    console.log("输入的两段文字: ", inputTitle, inputCorrect);
    if (type === "modify") {
      await axios
        .post("http://192.168.31.120:8080/persona/study/updateQuestion", {
          id: id,
          category: selectedCategory,
          year: selectedYear,
          title: inputTitle,
          correct: inputCorrect,
        })
        .then((response) => {
          message.success("修改题目成功");
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          message.error("服务器莫得反应");
        });
      return;
    }
    await axios
      .post("http://192.168.31.120:8080/persona/study/addQuestion", {
        category: selectedCategory,
        year: selectedYear,
        title: inputTitle,
        correct: inputCorrect,
      })
      .then((response) => {
        console.log(response);
        message.success("添加题目成功");
      })
      .catch((err) => {
        console.log(err);
        message.error("服务器莫得反应");
      });
  };

  return (
    <div>
      <Card title={<Breadcrumb items={[{ title: "修改题目" }]} />}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 4 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="题目id" name="id">
            <Input style={{ width: 400 }} defaultValue={id} disabled />
          </Form.Item>
          <Form.Item
            label="类别"
            name="category"
            rules={[{ required: true, message: "请选择类别" }]}
          >
            <Select
              placeholder="选择题目类别"
              style={{ width: 180, margin: 10 }}
              onChange={(value) => setSelectedCategory(value)}
              options={[
                { value: 1, label: "数据结构" },
                { value: 2, label: "计算机组成原理" },
                { value: 3, label: "操作系统" },
                { value: 4, label: "计算机网络" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="年份"
            name="year"
            rules={[{ required: true, message: "请选择年份" }]}
          >
            <Select
              placeholder="选择年份"
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
          </Form.Item>
          <Form.Item
            label="题目"
            name="title"
            rules={[{ required: true, message: "请输入题目内容" }]}
          >
            <TextArea
              showCount
              maxLength={100}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="输入题目"
              style={{ height: 200, width: 400, resize: "none" }}
              defaultValue={title}
            />
          </Form.Item>
          <Form.Item
            label="答案"
            name="correct"
            rules={[{ required: true, message: "请输入答案" }]}
          >
            <TextArea
              showCount
              maxLength={100}
              onChange={(e) => setInputCorrect(e.target.value)}
              placeholder="输入答案"
              style={{ height: 200, width: 400, resize: "none" }}
              defaultValue={correct}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ left: 177 }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {type === "modify" ? "修改题目" : "添加题目"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ModifyQuestion;

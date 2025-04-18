import { Button, Card, DatePicker, Input, message, TimePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../../store/modules/notificationStore";

const ModifyMessage = () => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("hello world");
  const [dateStamp, setDateStamp] = useState();
  const [dateStr, setDateStr] = useState();
  const [timeStr, setTimeStr] = useState();
  const [timeStamp, setTimeStamp] = useState();

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };
  const disabledTime = (_, type) => {
    if (type === "start") {
      return {
        disabledHours: () => {
          const currentHour = dayjs().hour();
          return Array.from({ length: currentHour }, (_, i) => i);
        },
        disabledMinutes: (selectedHour) => {
          if (selectedHour === dayjs().hour()) {
            const currentMinute = dayjs().minute();
            return Array.from({ length: currentMinute }, (_, i) => i);
          }
          return [];
        },
        disabledSeconds: (selectedHour, selectedMinute) => {
          if (
            selectedHour === dayjs().hour() &&
            selectedMinute === dayjs().minute()
          ) {
            const currentSecond = dayjs().second();
            return Array.from({ length: currentSecond }, (_, i) => i);
          }
          return [];
        },
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  };

  const handleSendClick = () => {
    console.log(dateStamp, dateStr, timeStamp, timeStr, msg);
    message.success(`将于${dateStr} ${timeStr}发送通知至所有客户端`);
    dispatch(
      addNotification({
        date: dateStr,
        time: timeStr,
        message: msg,
      })
    );
  };

  return (
    <div>
      <Card title="发送通知">
        <div>
          <text style={{ margin: 10, padding: 10 }}>选择日期:</text>
          <DatePicker
            disabledDate={disabledDate}
            style={{ margin: 10 }}
            onChange={(date, dateString) => {
              setDateStamp(date);
              setDateStr(dateString);
            }}
          />
        </div>
        <div>
          <text style={{ margin: 10, padding: 10 }}>选择时间:</text>
          <TimePicker
            disabledTime={disabledTime}
            style={{ margin: 10 }}
            onChange={(time, timeString) => {
              setTimeStamp(time);
              setTimeStr(timeString);
            }}
          />
        </div>
        <div>
          <Input
            style={{ width: 400, margin: 10, left: 10 }}
            placeholder="请输入通知内容"
            onChange={(e) => {
              console.log(e.target.value);
              setMsg(e.target.value);
            }}
          />
        </div>
        <div>
          <Button
            style={{ margin: 10, padding: 10, left: 10 }}
            size="middle"
            type="primary"
            onClick={handleSendClick}
          >
            发送通知
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ModifyMessage;

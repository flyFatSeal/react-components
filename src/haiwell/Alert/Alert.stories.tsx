import React from "react";
import "./style/index";
import { HaiwellAlert, HaiwellAlertProps } from "./index";
import { MockAlertDataBuilder } from "./MockAlertService";
import { env } from "./data/env";

const fields: alert2.client.DisplayFields[] = [
  "index",
  "alertTime",
  "confirmTime",
  "message",
  // "recoveryTime",
  "type",
  "value",
  "variableName",
];

const width: alert2.client.FieldWidth = {
  index: 4,
  alertTime: 10,
  value: 8,
  message: 20,
  type: 12,
  variableName: 15,
  confirmTime: 10,
  recoveryTime: 10,
};

let lineWidth = 0;
for (let field of fields) {
  lineWidth += 1 + width[field];
}

const theme: alert2.client.Theme = {
  borderWidth: "1px",
  wordWrap: false,
  paddingColor: "#CCC",
  padding: "3px",
  navColor: "#aaa",
  navFocusBg: "#ccc",
  navBorder: "#ddd",
  navFontSize: "16px",
  titleBg: "lightblue",
  titleColor: "blue",
  titleFontSize: "16px",
  titleBoderColor: "gray",
  msgBg: "#ccc",
  msgFontSize: "14px",
  msgAlert: "red",
  msgRecovery: "green",
  msgConfirmed: "cyan",
  msgNormal: "black",
  border: "1px solid #000",
  lineWidth: lineWidth + "em",
};

const lang: alert2.client.UiLang = {
  index: "序号",
  alertTime: "报警时间",
  value: "当前值",
  message: "报警消息",
  type: "报警类型",
  variableName: "变量名",
  confirmTime: "确认时间",
  recoveryTime: "恢复时间",
  realtime: "实时报警",
  history: "历史报警",
  confirmed: "已确认报警",
  unconfirm: "未确认报警",
  alert: "报警",
  recovery: "恢复",
};

const conf: alert2.client.Configuration = {
  width,
  theme,
  fields,
  tabs: ["realtime", "history", "confirmed", "unconfirm"],
  pageSize: 10,
};

const mockBuilder = new MockAlertDataBuilder();

export const DefaultTable: FC<HaiwellAlertProps> = () => {
  return (
    <HaiwellAlert
      {...{
        service: mockBuilder,
        conf,
        env,
      }}
    />
  )
}

export default { title: "Haiwell/Alert", component: HaiwellAlert };
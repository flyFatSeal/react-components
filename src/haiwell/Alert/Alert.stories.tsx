import React from "react";
import "./style/index";
import type {
  AlertFieldWidth,
  AlertLang,
  AlertTheme,
  AlertDisplayFields,
  AlertConfiguration,
} from "./types";
import { HaiwellAlert, HaiwellAlertProps } from "./index";
import { MockAlertService } from "./MockAlertService";

const fields: AlertDisplayFields[] = [
  "index",
  "alertTime",
  "confirmTime",
  "message",
  "recoveryTime",
  "type",
  "value",
  "variableName",
];

const width: AlertFieldWidth = {
  index: 4,
  uid: 0,
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

const theme: AlertTheme = {
  navColor: "#aaa",
  navFocusBg: "#ccc",
  navBorder: "#ddd",
  navFontSize: "16px",
  titleBg: "lightblue",
  titleBgActive: "gold",
  titleColor: "blue",
  titleFontSize: "16px",
  titleBoderColor: "gray",
  msgBg: "#ccc",
  msgFontSize: "14px",
  msgAlert: "red",
  msgRecovery: "green",
  msgConfirmed: "cyan",
  border: "1px solid #000",
  lineWidth: lineWidth + "em",
};

const lang: AlertLang = {
  index: "序号",
  uid: "uid",
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
};
const conf: AlertConfiguration = {
  width,
  theme,
  fields,
  tabs: ["realtime", "history", "confirmed", "unconfirm"],
};

export const DefaultTable: FC<HaiwellAlertProps> = () => {
  return (
    <HaiwellAlert
      {...{
        service: new MockAlertService(),
        lang,
        conf,
      }}
    />
  )
}

export default { title: "Haiwell/Alert", component: HaiwellAlert };
import React from "react";

export const prefixCls = "haiwell";

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

export const default_conf: alert2.client.Configuration = {
    width,
    theme,
    fields,
    tabs: ["realtime", "history", "confirmed", "unconfirm"],
    pageSize: 10,
};

export const ConfContext = React.createContext<alert2.client.Configuration>(default_conf);

export interface AlertAction {
    beep(): void;
    /** 确认报警，如果不传 uid 则会确认所有 */
    confirm(alert?: alert2.client.DataWithIndex): void;
    /**
     * 设置页码
     * @param page 从 0 开始
     */
    setPage(page: number): void;
    /**
     * 设置当前激活的标签页
     * @param tab 激活的标签页
     */
    setTab(tab: alert2.client.Tabs): void;
    /**
     * 显示页码输入框
     * @param callback 回调
     */
    inputPage(): void;
    /**
     * 输入日期
     * @param id 需要附加日历的元素的 id
     * @param cb 回调
     */
    inputDate(): void;
}

export const default_action: AlertAction = {
    beep: () => { console.log("beep"); },
    confirm: (alert) => { console.log("confirm:", alert); },
    setPage: (page) => { console.log("set page: ", page); },
    setTab: (tab) => { console.log("set tab:", tab); },
    inputDate: () => { console.log("input date."); },
    inputPage: () => { console.log("input page."); },
};


export const ActionContext = React.createContext(default_action);
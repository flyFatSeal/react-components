import { changeLang, handleSocket } from "./handleSocket";

export const MAX_PAGE_SIZE = 20;

const socket: alert2.ISocket = {
    on: console.log.bind(console),
    emit: console.log.bind(console),
};

const getLang = () => { return { id: 0, name: "zh" } };
const inputNumber = (): void => { };
const inputDate = (): void => { };

const getVariableName = (id: number) => {
    console.warn("mock getVariableName: " + id);
    return "mock-variable-" + id;
}

const sysLangChange = () => {
    console.log("request lang");
};

const beep = () => {
    console.log("bee");
}

export const defaultUiLang: alert2.client.UiLang = {
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

export const env: alert2.Env = {
    socket,
    getLang,
    inputNumber,
    inputDate,
    getVariableName,
    sysLangChange,
    beep,
    ophis: null,
};

let inited = false;
export function setup(e: alert2.Env): void {
    if (inited) {
        return;
    }
    inited = true;
    env.socket = e.socket;
    env.getLang = e.getLang;
    env.inputNumber = e.inputNumber;
    env.inputDate = e.inputDate;
    env.sysLangChange = e.sysLangChange;
    env.getVariableName = e.getVariableName;
    env.beep = e.beep;
    env.ophis = e.ophis;


    const lang = env.getLang();
    env.socket.on("alert2", handleSocket);
    env.socket.emit("alert2", { type: "req.lang", data: { langID: lang.id, name: lang.name } });
    env.socket.emit("alert2", { type: "req.latest" });
    env.sysLangChange(changeLang);
}
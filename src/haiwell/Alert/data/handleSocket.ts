import { DataService } from "./DataService";
import { defaultUiLang, env, MAX_PAGE_SIZE } from "./env";

const REALTIME: Record<number, alert2.client.ServerData> = Object.create(null);
const UILang: Record<number, { [k: string]: string } | undefined | number> = Object.create(null);
const DataLang: alert2.client.DataAllLang = Object.create(null)

export const ALERT_LIST_MAP: Record<alert2.client.Tabs, alert2.client.ServerData[]> = {
    history: [],
    realtime: [],
    unconfirm: [],
    confirmed: [],
};

function convertServerData(i: alert2.common.AlertData): alert2.client.ServerData | undefined {
    const uid = parseInt(i.uid as any);
    if (isNaN(uid)) {
        console.log("invalid alert data:", i);
        return undefined;
    }
    return {
        uid: i.uid,
        value: i.value,
        message: i.langKey,
        type: i.type,
        variableID: i.variableID,
        variableName: env.getVariableName(i.variableID),
        alertTime: i.time,
        confirmTime: i.confirmTime,
        dbpath: i.dbpath,
    }
}

export function convertServerDataList(list: alert2.common.AlertData[]): alert2.client.ServerData[] {
    const arr = [];
    for (let i = 0, l = list.length; i < l; i++) {
        const a = convertServerData(list[i]);
        if (a !== undefined) {
            arr.push(a);
        }
    }
    return arr;
}

export function buildRealTimeList(): alert2.client.ServerData[] {
    const list = []
    for (let k in REALTIME) {
        if (Object.prototype.hasOwnProperty.call(REALTIME, k)) {
            list.push(REALTIME[k]);
        }
    }
    list.sort((a, b) => {
        var ta = new Date(a.alertTime).getTime();
        var tb = new Date(b.alertTime).getTime();
        return ta - tb;
    });
    return list;
}

function onRealTime(data: alert2.common.RealtimeResponse) {
    const alert = convertServerData(data.alert);
    if (alert === undefined) {
        return;
    }
    ALERT_LIST_MAP.history.push(alert);
    if (alert.type === "alert") {
        REALTIME[alert.variableID] = alert;
    } else {
        delete REALTIME[alert.variableID];
    }

    if (alert.confirmTime === "") {
        ALERT_LIST_MAP.unconfirm.push(alert);
    } else {
        ALERT_LIST_MAP.confirmed.push(alert);
    }

    if (ALERT_LIST_MAP.history.length > MAX_PAGE_SIZE) {
        ALERT_LIST_MAP.history.shift();
    }
    if (ALERT_LIST_MAP.unconfirm.length > MAX_PAGE_SIZE) {
        ALERT_LIST_MAP.unconfirm.shift();
    }
    if (ALERT_LIST_MAP.confirmed.length > MAX_PAGE_SIZE) {
        ALERT_LIST_MAP.confirmed.shift();
    }

    ALERT_LIST_MAP.realtime = buildRealTimeList();
    DataService.update();
}

function onLang(data: alert2.common.LanguageResponse) {
    UILang[data.langID] = data.ui;
    DataLang[data.langID] = data.data;
    if (data.langID === env.getLang().id) {
        DataService.update();
    }
}

function onLatest(data: alert2.common.LatestResponse) {
    for (let k in data.realtime) {
        if (Object.prototype.hasOwnProperty.call(data.realtime, k)) {
            const a = data.realtime[k];
            const v = convertServerData(a);
            if (v !== undefined) {
                REALTIME[a.variableID] = v;
            }
        }
    }
    ALERT_LIST_MAP.realtime = buildRealTimeList();
    ALERT_LIST_MAP.history = convertServerDataList(data.history);
    ALERT_LIST_MAP.confirmed = convertServerDataList(data.confirmed);
    ALERT_LIST_MAP.unconfirm = convertServerDataList(data.unconfirm);
    DataService.update();
}

function onQuery(data: alert2.common.QueryResponse) {
    const alerts: alert2.client.ServerData[] = [];
    for (let a of data.alerts) {
        const alert = convertServerData(a);
        if (alert !== undefined) {
            alerts.push(alert);
        }
    }
    if (data.timeStart === undefined && data.timeEnd === undefined && data.offset === 0 && data.limit === MAX_PAGE_SIZE) {
        ALERT_LIST_MAP[data.tab] = alerts;
        DataService.update(data.tab);
    } else {
        DataService.onQuery(data.tab, alerts, data.offset, data.limit, data.timeStart, data.timeEnd);
    }
}

export function handleSocket(evt: alert2.common.Response) {
    switch (evt.type) {
        case "res.error":
            if (evt.data.tips !== undefined) {
                env.toast(evt.data.tips);
            }
            return console.error("alert2 error, message: %s, stack: %s", evt.data.message, evt.data.stack);
        case "res.realtime": return onRealTime(evt.data);
        case "res.lang": return onLang(evt.data);
        case "res.latest": return onLatest(evt.data);
        case "res.query": return onQuery(evt.data);
        default: return console.log(evt);
    }
};

export function getRealTime(): alert2.client.ServerData[] {
    const list = [];
    for (let k in REALTIME) {
        if (Object.prototype.hasOwnProperty.call(REALTIME, k)) {
            list.push(REALTIME[k]);
        }
    }
    return list;
}

export function getUiLang(): Record<string, string> {
    const langID = env.getLang().id;
    let lang = UILang[langID];
    if (lang === undefined || typeof lang === "number") {
        return defaultUiLang;
    }
    return lang;
}

export function getDataLang(): alert2.client.DataAllVarLang {
    const langID = env.getLang().id;
    const lang = DataLang[langID];
    if (lang === undefined) {
        return Object.create(null);
    }
    return lang;
}

export function query(tab: alert2.common.DataType, offset: number, limit: number, timeStart?: number, timeEnd?: number) {
    env.socket.emit("alert2", { type: "req.query", data: { tab, limit, offset, timeEnd, timeStart } });
}

/**
 * 更新语言
 */
export function changeLang() {
    const info = env.getLang();
    const lang = UILang[info.id];
    if (typeof lang === "number" && Date.now() - lang < 5000) {
        return;
    }
    if (lang === undefined) {
        UILang[info.id] = Date.now();
        return env.socket.emit("alert2", { type: "req.lang", data: { langID: info.id, name: info.name } });
    }
    DataService.update();
}
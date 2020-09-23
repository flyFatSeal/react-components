import { AlertDataWithIndex, AlertService, AlertTableData, AlertTabs } from "./types";

function ranText(prefix: string = "", len: number = 9): string {
    let str = prefix;
    for (let i = 0; i < len; i++) {
        str += String.fromCharCode(Math.floor(Math.random() * 26) | ranOption(0x41, 0x61));
    }
    return str;
}

function ranOption<T1, T2>(v: T1, v2: T2): T1 | T2 {
    return Math.random() >= 0.5 ? v : v2;
}

function ranDate(latest: number = Date.now()): Date {
    return new Date(Math.floor(Math.random() * latest))
}

let DATA_INDEX = 0;
let UID = 0;

function ranData(): AlertDataWithIndex {
    return {
        index: ++DATA_INDEX,
        uid: ++UID,
        alertTime: ranDate().toLocaleString(),
        value: ranText("value:"),
        message: ranText("message:", 12),
        type: ranText("type:", 6),
        variableName: ranText("name:", 8),
        confirmTime: ranOption("", ranDate().toLocaleString()),
        recoveryTime: ranOption("", ranDate().toLocaleString(),),
    };
}

export class MockAlertService implements AlertService {
    private readonly pageSize = 10;

    private _tab: AlertTabs = "realtime";

    private historyPage = 0;
    private unconfirmPage = 0;
    private confirmPage = 0;

    private latest: AlertDataWithIndex[];

    constructor() {
        this.latest = [];
        this.ranLatest(1000);
    }

    private ranLatest(timeout: number): void {
        setTimeout(() => {
            this.latest.push(ranData());
            if (this.latest.length > 10) {
                this.latest.shift();
            }
            this.ranLatest(timeout);
            this.emitUpdate(this.latest);
        }, timeout);
    }

    onUpdate?: (d: AlertTableData) => void;

    readonly confirm = (alert?: AlertDataWithIndex) => {
        if (alert === undefined) {
            const date = new Date().toLocaleString();
            this.latest.forEach(l => l.confirmTime = date);
            this.emitUpdate(this.latest);
            return;
        }
        let mod = false;
        this.latest.forEach(l => {
            if (l.uid === alert.uid) {
                l.confirmTime = new Date().toLocaleString();
                mod = true;
            }
        });
        if (mod) {
            this.emitUpdate(this.latest);
        }
    };

    private emitUpdate(data: AlertDataWithIndex[]): void {
        if (this.onUpdate === undefined) return;
        const list = [];
        for (let i = 0; i < this.pageSize; i++) {
            list[i] = data[i];
        }
        const tab = this._tab;
        let page = 0;
        switch (tab) {
            case "confirmed": page = this.confirmPage; break;
            case "unconfirm": page = this.unconfirmPage; break;
            case "history": page = this.historyPage; break;
        }
        this.onUpdate({ page, tab, list, });
    }

    readonly query = (tab: AlertTabs, page: number, pageSize: number): void => {
        console.log("query type: %s, page: %d, pageSize: %d", tab, page, pageSize);
    }

    setPage(p: number): void {
        console.log("set page: %d", p);
        if (p < 0) return;
        switch (this._tab) {
            case "history":
                this.historyPage = p;
                break;
            case "unconfirm":
                this.unconfirmPage = p;
                break;
            case "confirmed":
                this.confirmPage = p;
                break;

        }
        this.emitUpdate(this.latest);
    }

    setTab(tab: AlertTabs): void {
        console.log("set tab: ", tab);
        if (tab === this._tab) return;
        this._tab = tab;
        this.emitUpdate(this.latest);
    }

    inputPage(cb: (page: number | undefined) => void): void {
        const inp = window.prompt("请输入页码：");
        if (inp === null) {
            return cb(undefined);
        }
        const page = parseInt(inp);
        if (isNaN(page) || !Number.isInteger(page)) {
            return cb(undefined);
        }
        return cb(page - 1);
    }

    inputDate(id: string, cb: (datetime: string) => void): void {
    }
}



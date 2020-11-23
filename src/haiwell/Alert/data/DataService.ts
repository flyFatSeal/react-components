import { env } from "./env";
import { ALERT_LIST_MAP, getDataLang, getUiLang, query } from "./handleSocket";

const ALL_SERVICE: DataService[] = [];

export class DataService implements alert2.client.Service {
    /** 数据有更新 */
    onUpdate?: (data: alert2.client.TableData) => void
    private _page: number = 0;
    private _tab: alert2.client.Tabs;
    private _alerts: alert2.client.ServerData[] = [];
    private _timeStart?: number;
    private _timeEnd?: number;
    private _lastRender: number;
    private _timer: number;
    readonly pageSize: number;
    /** 
     * 翻页锁，防止疯狂翻页，当此锁时间大于当前时间时无法翻页
     */
    private _pageLock: number;

    constructor(tab: alert2.client.Tabs = "realtime", pageSize: number = 10) {
        this._tab = tab;
        this._timer = window.setTimeout(() => { }, 0);
        this._lastRender = 0;
        this.pageSize = pageSize;
        this._alerts = ALERT_LIST_MAP.realtime;
        this._pageLock = 0;
        ALL_SERVICE.push(this);
    }

    getData(): alert2.client.TableData {
        this._lastRender = Date.now();
        return {
            tab: this._tab,
            page: this._page,
            alerts: this._alerts,
            confirm: this.confirm,
            setPage: this.setPage,
            setTab: this.setTab,
            inputDate: this.inputDate,
            inputPage: this.inputPage,
            uiLang: getUiLang(),
            dataLang: getDataLang(),
            beep: this.beep,
        };
    }

    readonly confirm = (alert?: alert2.client.DataWithIndex) => {
        if (alert !== undefined) {
            env.socket.emit("alert2", { type: "req.confirm", data: { uid: alert.uid, dbpath: alert.dbpath, ophis: env.ophis } });
        } else {
            env.socket.emit("alert2", { type: "req.confirm", data: { uid: "all", ophis: env.ophis } });
        }
    };

    /**
     * 设置页码
     * @param page page
     */
    readonly setPage = (page: number) => {
        if (page === this._page) {
            return;
        }
        if (page < 0) {
            return;
        }
        if (this._pageLock > Date.now()) {
            return;
        }
        this._page = page;
        if (this._timeStart === undefined && this._page === 0) {
            this._alerts = ALERT_LIST_MAP[this._tab]
            this.update();
        } else {
            this._pageLock = Date.now() + 1000;
            this.query();
        }
    };

    /**
     * 设置当前激活的标签页
     * @param tab 激活的标签页
     */
    readonly setTab = (tab: alert2.client.Tabs) => {
        if (tab === this._tab) {
            return;
        }
        this._page = 0;
        this._tab = tab;
        this._timeStart = undefined;
        this._timeEnd = undefined;
        if (this._tab === "realtime" || this._timeStart === undefined) {
            this._alerts = ALERT_LIST_MAP[tab]
            this.update();
        } else {
            this.query();
        }
    }

    /**
     * 显示页码输入框
     * @param callback 回调
     */
    readonly inputPage = () => {
        env.inputNumber(this._page, (page?: number) => {
            if (page === undefined) return;
            this.setPage(page);
        });
    };

    /**
     * 输入日期
     * @param id 需要附加日历的元素的 id
     * @param cb 回调
     */
    readonly inputDate = () => {
        let options = undefined;
        if (this._timeStart !== undefined && this._timeEnd !== undefined) {
            options = { s: this._timeStart, e: this._timeEnd };
        } else {
            options = { s: Date.now(), e: Date.now() };
        }
        env.inputDate(options, (range) => {
            if (range === undefined) return;
            if (range.s === this._timeStart && range.e === this._timeEnd) {
                return;
            }
            this._timeStart = range.s;
            this._timeEnd = range.e;
            this.query();
        });
    };

    private query(): void {
        this._alerts = [];
        this.update();
        const offset = this._page * this.pageSize;
        const limit = this.pageSize;
        switch (this._tab) {
            case "realtime": return console.warn("unexception tab: realtime");
            case "history": return query("history", offset, limit, this._timeStart, this._timeEnd);
            case "confirmed": return query("confirmed", offset, limit, this._timeStart, this._timeEnd);
            case "unconfirm": return query("unconfirm", offset, limit, this._timeStart, this._timeEnd);
            default: return console.warn("201019150256, unexception tab:", this._tab);
        }
    }

    private update(): void {
        if (this.onUpdate === undefined) return;
        if (Date.now() - this._lastRender > 3000) {
            window.clearTimeout(this._timer);
            this.onUpdate(this.getData());
        } else {
            window.clearTimeout(this._timer);
            this._timer = window.setTimeout(() => {
                if (this.onUpdate === undefined) return;
                this.onUpdate(this.getData());
            }, 100);
        }
    }

    /**
     * 更新数据，区别于 onQuery 此方法只更新当前页码为 0 的选项卡
     * @param tab 需要更新的选项卡，如果不传则更新所有选项卡
     */
    static update(tab?: alert2.client.Tabs): void {
        if (tab === undefined) {
            for (let s of ALL_SERVICE) {
                if ((s._timeStart === undefined && s._page === 0) || s._tab === "realtime") {
                    s._alerts = ALERT_LIST_MAP[s._tab];
                    s.update();
                }
            }
        } else {
            for (let s of ALL_SERVICE) {
                if ((s._timeStart !== undefined || s._tab !== tab) && s._tab !== "realtime") {
                    continue;
                }
                if (s._page === 0) {
                    s._alerts = ALERT_LIST_MAP[s._tab];
                    s.update();
                }
            }
        }
    }

    /**
     * 更新查询结果， 区别于 update 此方法用于更新不在第 0 页的选项卡
     * @param tab       需要更新的选项卡
     * @param alerts    报警数据
     * @param offset    数据偏移
     * @param limit     数据长度
     * @param startTime 查询的起始时间
     * @param endTime   查询的结束时间
     */
    static onQuery(tab: alert2.client.Tabs, alerts: alert2.client.ServerData[], offset: number, limit: number, startTime?: number, endTime?: number): void {
        for (let s of ALL_SERVICE) {
            if (s._tab !== tab) {
                continue;
            }
            const so = s._page * s.pageSize;
            const sl = s.pageSize;
            if (so === offset && sl === limit && s._timeStart === startTime && s._timeEnd === endTime) {
                s._alerts = alerts;
                s._pageLock = 0;
                s.update();
            }
        }
    }

    private readonly beep = () => {
        env.beep();
    }
}

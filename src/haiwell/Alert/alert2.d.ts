declare namespace alert2 {
    export interface Env {
        socket: ISocket;
        getLang(): { id: number; name: string };
        inputNumber(defaultValue: number, callback: (page: number | undefined) => void): void;
        inputDate(defaultValue: { s: number; e: number }, cb: (timerange: { s: number; e: number } | undefined) => void): void;
        getVariableName(variableID: number): string;
        sysLangChange(fn: (this: undefined) => void): void;
        beep(): void;
    }

    export interface ISocket {
        on(type: "alert2", callback: (evt: common.Response) => void): void;
        emit(type: "alert2", evt: common.Request): void;
    }

    export namespace client {

        /** 报警数据 服务端 */
        export interface ServerData {
            /** 报警消息唯一 id */
            uid: number;
            /** 当前值 */
            value: string;
            /** 报警消息 */
            message: string;
            /** 报警类型 */
            type: "alert" | "recovery";
            /** 变量 id */
            variableID: number;
            /** 变量名 */
            variableName: string;
            /** 报警时间 */
            alertTime: string;
            /** 确认时间 */
            confirmTime: string;
            /** 恢复时间 - 禁用 */
            recoveryTime?: unknown;
            /** 数据库路径 */
            dbpath?: string;
        }

        /** 带索引的报警数据 */
        export interface DataWithIndex extends ServerData {
            /** 表格索引 */
            index: number;
        }

        /** 报警显示字段 */
        export type DisplayFields = Exclude<keyof DataWithIndex, "uid" | "variableID" | "dbpath">;
        /** 报警字段宽度 */
        export type FieldWidth = Record<DisplayFields, number>;
        /** 报警标签页 */
        export type Tabs = "realtime" | "history" | "confirmed" | "unconfirm";
        /** 报警多语言 */
        export type UiLang = Record<DisplayFields | Tabs | "alert" | "recovery", string>;
        /** 单个变量 -> 单个值信息的多语言 */
        export type DataFieldLang = Record<string, string | undefined>;
        /** 所有变量 -> 单个变量的所有多语言 */
        export type DataAllVarLang = Record<number, DataFieldLang | undefined>;
        /** 语言 id -> 单个语言的所有变量 */
        export type DataAllLang = Record<number, DataAllVarLang | undefined>;

        /** 报警消息颜色 */
        export interface Theme {
            /** 标签文本颜色 */
            navColor: string;
            /** 标签高亮背景 */
            navFocusBg: string;
            /** 标签外框颜色 */
            navBorder: string;
            /** 标签字体大小 */
            navFontSize: string;
            /** 表头背景 */
            titleBg: string;
            /** 表头文本色 */
            titleColor: string;
            /** 表头字号 */
            titleFontSize: string;
            /** 表头边框颜色 */
            titleBoderColor: string;
            /** 消息背景色 */
            msgBg: string;
            /** 消息字号 */
            msgFontSize: string;
            /** 报警中的颜色 */
            msgAlert: string;
            /** 已恢复的颜色 */
            msgRecovery: string;
            /** 未确认报警的颜色 */
            msgConfirmed: string;
            /** 边框样式 */
            border: string;
            /** 行宽 */
            lineWidth: string;
            /** 是否换行 */
            wordWrap: boolean;
            /** 边框颜色 */
            paddingColor: string;
            /** 边框宽 */
            padding: string;
        }

        /** 报警配置 */
        export interface Configuration {
            /** 主题配置 */
            theme: Theme;
            /** 宽度配置 */
            width: FieldWidth;
            /** 要显示的字段 */
            fields: DisplayFields[];
            /** 需要显示的标签 */
            tabs: Tabs[];
            pageSize: number;
        }

        export interface TableData {
            /** 当前标签页 */
            tab: Tabs;
            /** 当前页码 */
            page: number;
            /** 当前需要显示的数据 */
            alerts: ServerData[];
            /** ui 多语言 */
            uiLang: Record<string, string>;
            /** 报警信息多语言 */
            dataLang: DataAllVarLang;
            /** 确认报警，如果不传 uid 则会确认所有 */
            confirm(alert?: DataWithIndex): void;
            /**
             * 设置页码
             * @param page page
             */
            setPage(page: number): void;
            /**
             * 设置当前激活的标签页
             * @param tab 激活的标签页
             */
            setTab(tab: Tabs): void;
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

            /** beep */
            beep(): void;
        }

        /** 报警数据服务 */
        export interface Service {
            /** 数据有更新 */
            onUpdate?: (data: TableData) => void;
            /** 主动获取数据 */
            getData(): TableData;
        }

        /** 报警属性 */
        export interface AlertProps {
            /** 报警配置 */
            conf: Configuration;
            /** env */
            env: Env;
        }
        /** 渲染报警 */
        export const renderAlert: (container: HTMLElement, props: client.AlertProps) => void;
    }

    /** 前后端通用的内容 */
    export namespace common {
        /** 报警数据类型 */
        export type DataType = "realtime" | "history" | "confirmed" | "unconfirm";
        /** 报警数据 */
        export interface AlertData {
            /** 唯一 id */
            uid: number;
            /** 变量 id */
            variableID: number;
            /** 语言 */
            langKey: string;
            /** 恢复|报警 */
            type: "recovery" | "alert";
            /** 恢复/报警 时间 */
            time: string;
            /** 当前值 */
            value: string;
            /** 确认时间 */
            confirmTime: string;
            /** 数据库路径 */
            dbpath?: string;
        }

        export interface ErrorResponse {
            /** 错误消息 */
            message: string;
            /** 错误堆栈 */
            stack?: string;
            /** 需要弹出提示信息 */
            tips?: string;
        }

        /** 获取实时数据的请求 */
        export interface LatestResponse {
            /** 实时报警表 */
            realtime: Record<number, AlertData>;
            /** 历史报警表 */
            history: AlertData[];
            /** 未确认报警表 */
            unconfirm: AlertData[];
            /** 已确认报警表 */
            confirmed: AlertData[];
        }

        /** 获取语言请求 */
        export interface LanguageRequest {
            /** 语言 id */
            langID: number;
            name: string;
        }

        /** 获取语言响应 */
        export interface LanguageResponse extends LanguageRequest {
            /** 界面语言 */
            ui: Record<string, string>;
            /** 变量语言 */
            data: Record<number, { [k: string]: string }>;
        }

        /** 查询请求 */
        interface QueryRequest {
            /** 查询类型 */
            tab: DataType;
            /** 查询开始 */
            offset: number;
            /** 查询数量 */
            limit: number;
            /** 起始时间 */
            timeStart?: number;
            /** 结束时间 */
            timeEnd?: number;
        }

        /**  查询响应 */
        export interface QueryResponse extends QueryRequest {
            /** 查询结果 */
            alerts: AlertData[];
        }

        /**  确认报警 */
        export interface ConfirmRequest {
            /** 如果此字段为 "all" 则确认所有，否则确认指定 id */
            uid: "all" | number;
            /** 如果些字段有值则去相应的表进行查询 */
            dbpath?: string;
        }

        /** 实时报警的响应 */
        export interface RealtimeResponse {
            /** 单条实时报警 */
            alert: AlertData;
        }

        type Pair<N, D> = D extends undefined ? { type: N } : { type: N; data: D };

        type Request =
            | Pair<"req.lang", LanguageRequest>
            | Pair<"req.latest", undefined>
            | Pair<"req.query", QueryRequest>
            | Pair<"req.confirm", ConfirmRequest>;

        export type Response =
            | Pair<"res.error", ErrorResponse>
            | Pair<"res.lang", LanguageResponse>
            | Pair<"res.latest", LatestResponse>
            | Pair<"res.realtime", RealtimeResponse>
            | Pair<"res.query", QueryResponse>;
    }
}

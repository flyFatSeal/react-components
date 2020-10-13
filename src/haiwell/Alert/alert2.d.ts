declare namespace alert2 {

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
            /** 变量名 */
            variableName: string;
            /** 报警时间 */
            alertTime: string;
            /** 确认时间 */
            confirmTime: string;
            /** 恢复时间 */
            recoveryTime: string;
        }

        /** 带索引的报警数据 */
        export interface DataWithIndex extends ServerData {
            index: number;
        }

        /** 报警显示字段 */
        export type DisplayFields = keyof DataWithIndex;
        /** 报警字段宽度 */
        export type FieldWidth = Record<DisplayFields, number>;
        /** 报警标签页 */
        export type Tabs = "realtime" | "history" | "confirmed" | "unconfirm";
        /** 报警多语言 */
        export type Lang = Record<DisplayFields | Tabs, string>;
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
            inputPage(callback: (page: number | undefined) => void): void;

            /**
             * 输入日期
             * @param id 需要附加日历的元素的 id
             * @param cb 回调
             */
            inputDate(cb: (timerange: { s: number, e: number } | null) => void): void;
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
            /** 报警多语言 */
            lang: Lang;
            /** 报警配置 */
            conf: Configuration;
            /** 数据服务 */
            service: Service;
        }
        /** 渲染报警 */
        export const renderAlert: (container: HTMLElement, props: client.AlertProps) => void;
    }

    /** 前后端通用的内容 */
    export namespace common {

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
            /** 服务器更新时间 */
            serverTime: number;
        }

        export type Request = QueryHistory | Confirm | ConfirmAll | GetLang | GetRealTimeMap;

        /**
         * 报警数据类型
         */
        export type DataType = "realtime" | "history" | "confirmed" | "unconfirm";

        interface QueryOption {
            offset: number;
            limit: number;
            timeStart?: string;
            timeEnd?: string;
        }

        export interface QueryHistory extends QueryOption {
            type: "query.history";
        }

        export interface QueryUnconfirm extends QueryOption {
            type: "query.unconfirm";
        }

        export interface Confirm {
            type: "do.confirm";
            uid: number;
            dbPath?: string;
        }

        export interface ConfirmAll {
            type: "do.confirm.all";
        }

        export interface GetLang {
            type: "get.lang";
            langID: number;
        }

        export interface GetRealTimeMap {
            type: "get.realtime.all";
        }

        export type Response = ResLang | RealTimeMap | RealTime;

        export interface ResLang {
            type: "res.lang";
            data: { [k: string]: string };
        }

        export interface RealTimeMap {
            type: "res.realtime.all";
            data: { [k: number]: AlertData };
        }

        export interface RealTime {
            type: "res.realtime";
            data: AlertData;
        }
    }
}

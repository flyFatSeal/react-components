/**
 * 报警数据唯一 id
 */
export interface AlertData {
    /**
     * 报警消息唯一 id
     */
    uid: number;
    /**
     * 报警时间
     */
    alertTime: string;
    /**
     * 当前值
     */
    value: string;
    /**
     * 报警消息
     */
    message: string;
    /**
     * 报警类型
     */
    type: string;
    /**
     * 变量名
     */
    variableName: string;
    /**
     * 确认时间
     */
    confirmTime: string;
    /**
     * 恢复时间
     */
    recoveryTime: string
}

/**
 * 带索引的报警数据
 */
export interface AlertDataWithIndex extends AlertData {
    index: number;
}

/**
 * 报警显示字段
 */
export type AlertDisplayFields = keyof AlertDataWithIndex;

/**
 * 报警字段宽度
 */
export type AlertFieldWidth = Record<AlertDisplayFields, number>;

/**
 * 报警多语言
 */
export type AlertLang = Record<AlertDisplayFields | AlertTabs, string>;

/**
 * 报警标签页
 */
export type AlertTabs = "realtime" | "history" | "confirmed" | "unconfirm";

/**
 * 报警消息颜色
 */
export interface AlertTheme {
    /**
     * 标签文本颜色
     */
    navColor: string;
    /**
     * 标签高亮背景
     */
    navFocusBg: string;
    /**
     * 标签外框颜色
     */
    navBorder: string;
    /**
     * 标签字体大小
     */
    navFontSize: string;
    /**
     * 表头背景
     */
    titleBg: string;
    /** 
     * 标签选中颜色
     */
    titleBgActive: string;
    /**
     * 表头文本色
     */
    titleColor: string;
    /**
     * 表头字号
     */
    titleFontSize: string;
    /**
     * 表头边框颜色
     */
    titleBoderColor: string;

    /**
     * 消息背景色
     */
    msgBg: string;
    /**
     * 消息字号
     */
    msgFontSize: string;

    /** 
     * 报警中的颜色 
     */
    msgAlert: string;
    /** 
     * 已恢复的颜色 
     */
    msgRecovery: string;
    /** 
     * 未确认报警的颜色 
     */
    msgConfirmed: string;
    /**
     * 边框样式
     */
    border: string;
    /**
     * 行宽
     */
    lineWidth: string;
}

/**
 * 报警配置
 */
export interface AlertConfiguration {
    /** 主题配置 */
    theme: AlertTheme;
    /** 宽度配置 */
    width: AlertFieldWidth;
    /** 要显示的字段 */
    fields: AlertDisplayFields[];
    /** 需要显示的标签 */
    tabs: AlertTabs[];
}

export interface AlertService {
    updateLatest?: (latest: AlertDataWithIndex[]) => void;
    readonly confirm: (uid: number) => void;
}

import "./style/index";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Alert } from "./Alert";
import {
    AlertLang,
    AlertService,
    AlertConfiguration,
    AlertTableData
} from "./types";

/**
 * 报警属性
 */
export interface HaiwellAlertProps {
    /** 报警服务 */
    service: AlertService;
    /** 报警多语言 */
    lang: AlertLang;
    /** 报警配置 */
    conf: AlertConfiguration;
}

/**
 * 报警图元
 */
export const HaiwellAlert: FC<HaiwellAlertProps> = ({
    service,
    lang,
    conf,
}) => {
    const [data, setData] = useState<AlertTableData>({
        tab: "realtime",
        page: 1,
        list: new Array(10),
    });
    useEffect(() => {
        service.onUpdate = setData;
    }, [service]);
    return (
        <Alert
            {...{
                lang,
                conf,
                service,
                data,
            }}
        ></Alert>
    );
};

/**
 * 渲染报警图元
 * @param container 容器
 * @param props     属性
 */
export const renderAlert = (container: HTMLElement, props: HaiwellAlertProps) => {
    ReactDOM.render(<HaiwellAlert {...props} />, container)
}

export default renderAlert;
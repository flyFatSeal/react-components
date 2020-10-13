import "./style/index";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Alert } from "./Alert";

console.log("alert2 v1");

/**
 * 报警属性
 */
export type HaiwellAlertProps = alert2.client.AlertProps;

/**
 * 报警图元
 */
export const HaiwellAlert: FC<HaiwellAlertProps> = ({
    service,
    lang,
    conf,
}) => {
    const [data, setData] = useState<alert2.client.TableData>(service.getData());
    service.onUpdate = setData;
    return (
        <Alert
            {...{
                lang,
                conf,
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
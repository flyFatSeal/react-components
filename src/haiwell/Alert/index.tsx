import "./style/index";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Alert } from "./Alert";
import { setup } from "./data/env";
import { DataService } from "./data/DataService";

console.log("alert2 v1");

/**
 * 报警属性
 */
export interface HaiwellAlertProps extends alert2.client.AlertProps {
    service: alert2.client.Service;
}

/**
 * 报警图元
 */
export const HaiwellAlert: FC<HaiwellAlertProps> = ({
    conf,
    service,
}) => {
    const [data, setData] = useState<alert2.client.TableData>(service.getData());
    console.log("geted data", data);
    service.onUpdate = setData;
    return (
        <Alert
            {...{
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
export const renderAlert = (container: HTMLElement, props: alert2.client.AlertProps) => {
    setup(props.env);
    const service = new DataService();
    ReactDOM.render(<HaiwellAlert {...props} service={service} />, container)
}

export default renderAlert;
import "./style/index";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Alert } from "./Alert";
import { setup } from "./data/env";
import { DataService } from "./data/DataService";
import { ActionContext, AlertAction, ConfContext } from "./data/contexts";

console.log("alert2 v1");

/**
 * 报警属性
 */
export interface HaiwellAlertProps extends alert2.client.AlertProps {
    service: DataService,
    env: alert2.Env;
}

/**
 * 报警图元
 */
export const HaiwellAlert: FC<HaiwellAlertProps> = ({
    conf,
    service,
    env,
}) => {
    const actions: AlertAction = {
        beep: env.beep,
        confirm: service.confirm,
        setPage: service.setPage,
        setTab:service.setTab,
        inputDate:service.inputDate,
        inputPage:service.inputPage,
    };

    return (
        <ConfContext.Provider value={conf}>
            <ActionContext.Provider value={actions}>
                <Alert service={service} />
            </ActionContext.Provider>
        </ConfContext.Provider>
    );
};

/**
 * 渲染报警图元
 * @param container 容器
 * @param props     属性
 */
export const renderAlert = (container: HTMLElement, props: alert2.client.AlertProps) => {
    setup(props.env);
    const service = new DataService(props.conf.tabs[0]);
    ReactDOM.render(<HaiwellAlert {...props} service={service} env={props.env} />, container)
}

export default renderAlert;
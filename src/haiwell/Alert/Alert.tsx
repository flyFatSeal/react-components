import React from "react";
import { AlertNavBar, AlertNavBarProps } from "./AlertNavBar";
import { AlertTable, AlertTableProps } from "./AlertTable";

export interface AlertProps extends AlertNavBarProps, AlertTableProps { }

export const Alert: FC<AlertProps> = ({
  prefixCls = "haiwell",
  conf,
  ...common
}) => {
  const realtimeOnly = conf.tabs.length === 1 && conf.tabs[0] === "realtime";

  return (
    <div className={`${prefixCls}-alert`} style={{ backgroundColor: conf.theme.paddingColor, padding: conf.theme.padding }}>
      {!realtimeOnly && <AlertNavBar {...{ prefixCls, conf, ...common }} />}
      <AlertTable {...{ prefixCls, conf, ...common }}></AlertTable>
    </div>
  );
};

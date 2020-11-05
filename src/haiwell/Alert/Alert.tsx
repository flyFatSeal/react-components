import React from "react";
import { AlertNavBar, AlertNavBarProps } from "./AlertNavBar";
import { AlertTable, AlertTableProps } from "./AlertTable";

export interface AlertProps extends AlertNavBarProps, AlertTableProps { }

export const Alert: FC<AlertProps> = ({
  prefixCls = "haiwell",
  realtimeOnly,
  conf,
  ...common
}) => {
  return (
    <div className={`${prefixCls}-alert`} style={{ backgroundColor: conf.theme.paddingColor, padding: conf.theme.padding }}>
      {!realtimeOnly && <AlertNavBar {...{ prefixCls, conf, ...common }} />}
      <AlertTable {...{ prefixCls, conf, realtimeOnly, ...common }}></AlertTable>
    </div>
  );
};

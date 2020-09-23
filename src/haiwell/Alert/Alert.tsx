import React from "react";
import { AlertNavBar, AlertNavBarProps } from "./AlertNavBar";
import { AlertTable, AlertTableProps } from "./AlertTable";

export interface AlertProps extends AlertNavBarProps, AlertTableProps { }

export const Alert: FC<AlertProps> = ({
  prefixCls = "haiwell",
  conf,
  ...common
}) => {
  return (
    <div className={`${prefixCls}-alert`} style={{ border: conf.theme.border }}>
      <AlertNavBar {...{ prefixCls, conf, ...common }} />
      <AlertTable {...{ prefixCls, conf, ...common }}></AlertTable>
    </div>
  );
};

import React from "react";
import { AlertNavBar, AlertNavBarProps } from "./AlertNavBar";
import { AlertTable, AlertTableProps } from "./AlertTable";
import { ConfContext, prefixCls } from "./data/contexts";

export interface AlertProps {
  service: alert2.client.Service;
}

export const Alert: FC<AlertProps> = ({
  service,
}) => {
  const conf = React.useContext(ConfContext);
  const [data, setData] = React.useState<alert2.client.TableData>(service.getData());
  service.onUpdate = setData;

  const realtimeOnly = conf.tabs.length === 1 && conf.tabs[0] === "realtime";
  return (
    <div className={`${prefixCls}-alert`} style={{ backgroundColor: conf.theme.paddingColor, padding: conf.theme.padding }}>
      {!realtimeOnly && <AlertNavBar data={data} />}
      <AlertTable data={data} realtimeOnly={realtimeOnly}></AlertTable>
    </div>
  );
};

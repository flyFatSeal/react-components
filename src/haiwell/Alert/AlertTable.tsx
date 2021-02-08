import React from "react";
import { BaseComponentProps } from "../../types";
import { AlertMessage } from "./AlertMessage";
import { AlertTitle } from "./AlertTitle";
import { ConfContext } from "./data/contexts";
export interface AlertTableProps extends BaseComponentProps {
  data: alert2.client.TableData;
  /** 是否只有实时模式 */
  realtimeOnly: boolean;
}

let unid = 0;

/**
 * 报警内容的表格
 */
export const AlertTable: FC<AlertTableProps> = ({
  data,
  realtimeOnly,
}) => {
  const conf = React.useContext(ConfContext);
  let pageSize = conf.pageSize || 10;
  if (data.tab === "realtime") {
    pageSize = Math.max(pageSize, data.alerts.length);
  }
  let idx = data.page * pageSize;
  const alerts: (alert2.client.DataWithIndex | undefined)[] = [];
  const maxIdx = data.alerts.length - 1;
  for (var i = 0; i < pageSize; i++) {
    const alert = data.alerts[maxIdx - i] as undefined | Partial<alert2.client.DataWithIndex>;
    if (alert !== undefined) {
      alert.index = ++idx;
    }
    alerts[i] = alert as alert2.client.DataWithIndex | undefined;
  }
  const style: React.CSSProperties = {
    border: conf.theme.border,
    fontSize: conf.theme.navFontSize,
  };
  if (!conf.theme.wordWrap) {
    style.whiteSpace = "nowrap";
    style.wordBreak = "break-all";
  }

  if (realtimeOnly) {
    style.height = "100%";
  }
  return (
    <div
      className="table"
      style={style}
    >
      <AlertTitle {...{ conf, data }}></AlertTitle>
      {alerts.map((alert, idx) => {
        let key: string | number = idx;
        if (alert === undefined || isNaN(alert.uid)) {
          key = "em" + idx;
          return (<AlertMessage key={"em" + idx} {...{ data }}></AlertMessage>);
        }
        key = idx + ":" + alert.uid;
        return (<AlertMessage key={key} {...{ data, alert }}></AlertMessage>);
      })}
    </div>
  );
};

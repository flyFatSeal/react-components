import React from "react";
import { BaseComponentProps } from "../../types";
import { AlertMessage } from "./AlertMessage";
import { AlertTitle } from "./AlertTitle";
export interface AlertTableProps extends BaseComponentProps {
  lang: alert2.client.Lang;
  data: alert2.client.TableData;
  conf: alert2.client.Configuration;
}

/**
 * 报警内容的表格
 */
export const AlertTable: FC<AlertTableProps> = ({
  lang,
  data,
  conf,
}) => {
  let pageSize = conf.pageSize || 10;
  if (data.tab === "realtime") {
    pageSize = Math.max(pageSize, data.alerts.length);
  }
  let idx = data.page * pageSize;
  const alerts: (alert2.client.DataWithIndex | undefined)[] = [];
  for (var i = 0; i < pageSize; i++) {
    const alert = data.alerts[i] as undefined | Partial<alert2.client.DataWithIndex>;
    if (alert !== undefined) {
      alert.index = ++idx;
    }
    alerts[i] = alert as alert2.client.DataWithIndex | undefined;
  }
  return (
    <div
      className="table"
      style={
        conf.theme.wordWrap ? {
          border: conf.theme.border,
          fontSize: conf.theme.navFontSize,
        } :
          {
            wordBreak: "break-all",
            whiteSpace: "nowrap",
            border: conf.theme.border,
            fontSize: conf.theme.navFontSize,
          }
      }
    >
      <AlertTitle {...{ conf, lang }}></AlertTitle>
      {alerts.map((item, idx) => {
        return (
          <AlertMessage
            key={idx}
            {...{
              data,
              conf,
            }}
            alert={item as alert2.client.DataWithIndex}
          ></AlertMessage>
        );
      })}
    </div>
  );
};

import React from "react";
import { ActionContext, ConfContext } from "./data/contexts";

/**
 * 报警消息属性
 */
export interface AlertMessageProps {
  data: alert2.client.TableData;
  /**
   * 报警消息
   */
  alert?: alert2.client.DataWithIndex;
}

export const AlertMessage: FC<AlertMessageProps> = ({
  data,
  alert,
}) => {
  const conf = React.useContext(ConfContext);
  const action = React.useContext(ActionContext);
  let color = conf.theme.msgNormal;
  if (data.tab === "realtime" && alert !== undefined) {
    color = alert.type === "recovery"
      ? conf.theme.msgRecovery     // 已恢复
      : alert.confirmTime === ""
        ? conf.theme.msgAlert      // 报警中
        : conf.theme.msgConfirmed; // 已确认
  }

  return (
    <div
      title={alert === undefined ? "undefined" : typeof alert.uid === "number" ? alert.uid.toString() : ""}
      className="line lively"
      style={{
        color,
        borderTop: conf.theme.border,
        minWidth: conf.theme.lineWidth,
        backgroundColor: conf.theme.msgBg,
        fontSize: conf.theme.titleFontSize,
      }}
      onClick={() => {
        if (
          alert !== undefined &&
          alert.uid !== undefined &&
          alert.uid >= 0 &&
          alert.confirmTime === ""
        ) {
          action.beep();
          action.confirm(alert);
        }
      }}
    >
      {conf.fields.map((field, idx) => {
        const width = conf.width[field] + "em";
        const borderLeft = idx === 0 ? "" : conf.theme.border;
        let text = "";
        if (alert !== undefined) {
          if (field === "recoveryTime") {
          } else if (field === "message") {
            text = alert[field];
            const lang = data.dataLang[alert.variableID];
            text = lang === undefined ? text : (lang[text] || text);
          } else if (field === "type") {
            text = data.uiLang[alert.type === "alert" ? "alert" : "recovery"] || text;
          } else {
            text = alert[field].toString();
          }
        }
        return (
          <span key={idx} className="cell" style={{ width, borderLeft }}>
            <span style={{ fontSize: conf.theme.msgFontSize }}>
              {text}
            </span>
          </span>
        );
      })}
    </div>
  );
};

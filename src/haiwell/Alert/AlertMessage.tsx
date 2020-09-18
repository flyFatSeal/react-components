import React from "react";
import { BaseComponentProps } from "../../types";
import type {
  AlertDataWithIndex,
  AlertConfiguration,
  AlertService,
} from "./types";

/**
 * 报警消息属性
 */
export interface AlertMessageProps {
  service: AlertService;
  /**
   * 报警消息
   */
  data?: AlertDataWithIndex;
  conf: AlertConfiguration;
}

const defaultData: AlertDataWithIndex = {
  index: 1,
  uid: 0,
  alertTime: " ",
  value: " ",
  message: " ",
  type: " ",
  variableName: " ",
  confirmTime: " ",
  recoveryTime: " ",
};

export const AlertMessage: FC<AlertMessageProps> = ({
  service,
  conf,
  data,
}) => {
  const color =
    data === undefined
      ? conf.theme.msgRecovery
      : data.recoveryTime !== ""
      ? conf.theme.msgRecovery //  已恢复
      : data.confirmTime !== ""
      ? conf.theme.msgConfirmed // 已确认
      : conf.theme.msgAlert; //    报警中
  return (
    <div
      className="line lively"
      style={{
        color,
        borderTop: conf.theme.border,
        width: conf.theme.lineWidth,
        backgroundColor: conf.theme.msgBg,
        fontSize: conf.theme.titleFontSize,
      }}
      onClick={() => {
        if (
          data !== undefined &&
          data.uid !== undefined &&
          data.confirmTime === ""
        ) {
          service.confirm(data.uid);
        }
      }}
    >
      {conf.fields.map((field, idx) => {
        const width = conf.width[field] + "em";
        const borderLeft = idx === 0 ? "" : conf.theme.border;
        return (
          <span key={idx} className="cell" style={{ width, borderLeft }}>
            <span style={{ fontSize: conf.theme.msgFontSize }}>
              {data === undefined ? "" : data[field]}
            </span>
          </span>
        );
      })}
    </div>
  );
};

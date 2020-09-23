import React from "react";
import { BaseComponentProps } from "../../types";
import { AlertMessage } from "./AlertMessage";
import { AlertTitle } from "./AlertTitle";
import type {
  AlertDataWithIndex,
  AlertLang,
  AlertConfiguration,
  AlertService,
  AlertTableData,
} from "./types";

export interface AlertTableProps extends BaseComponentProps {
  service: AlertService;
  lang: AlertLang;
  data: AlertTableData;
  conf: AlertConfiguration;
}

/**
 * 报警内容的表格
 */
export const AlertTable: FC<AlertTableProps> = ({
  service,
  lang,
  data,
  conf,
}) => {
  return (
    <div
      className="table"
      style={{
        border: conf.theme.border,
        fontSize: conf.theme.navFontSize,
      }}
    >
      <AlertTitle {...{ conf, lang }}></AlertTitle>
      {data.list.map((item, idx) => {
        return (
          <AlertMessage
            key={idx}
            {...{
              service,
              conf,
            }}
            data={item as AlertDataWithIndex}
          ></AlertMessage>
        );
      })}
    </div>
  );
};

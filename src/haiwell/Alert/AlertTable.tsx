import React from "react";
import { BaseComponentProps } from "../../types";
import { AlertMessage } from "./AlertMessage";
import { AlertTitle } from "./AlertTitle";
import type {
  AlertData,
  AlertDataWithIndex,
  AlertLang,
  AlertConfiguration,
  AlertService,
} from "./types";

export interface AlertTableProps extends BaseComponentProps {
  service: AlertService;
  lang: AlertLang;
  list: AlertData[];
  conf: AlertConfiguration;
}

/**
 * 报警内容的表格
 */
export const AlertTable: FC<AlertTableProps> = ({
  service,
  lang,
  list,
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
      {list.map((data, idx) => {
        return (
          <AlertMessage
            key={idx}
            {...{
              service,
              conf,
            }}
            data={data as AlertDataWithIndex}
          ></AlertMessage>
        );
      })}
    </div>
  );
};

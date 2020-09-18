import React, { useState, useEffect } from "react";
import { Alert, AlertProps } from "./Alert";
import {
  AlertDataWithIndex,
  AlertLang,
  AlertService,
  AlertConfiguration,
} from "./types";

export interface HaiwellAlertProps {
  /** 目标图元 id */
  targetID: string;
  /** 报警服务 */
  service: AlertService;
  lang: AlertLang;
  conf: AlertConfiguration;
}

export const HaiwellAlert: FC<HaiwellAlertProps> = ({
  service,
  lang,
  conf,
}) => {
  const [active, setActive] = useState<AlertProps["active"]>("realtime");
  const [list, setList] = useState<AlertDataWithIndex[]>(new Array(10));
  const page = 1;
  const pageSize = 10;
  useEffect(() => {
    service.updateLatest = (latest) => {
      setList(latest);
    };
  }, [service]);
  return (
    <Alert
      {...{
        setActive,
        active,
        lang,
        page,
        pageSize,
        list,
        conf,
        service,
      }}
    ></Alert>
  );
};

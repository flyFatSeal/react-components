import calender from "./style/calender.png";
import React from "react";
import { CheckSquareOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import type { BaseComponentProps } from "../../types";
import type {
  AlertConfiguration,
  AlertLang,
  AlertService,
  AlertTableData,
} from "./types";

export interface AlertNavBarProps extends BaseComponentProps {
  data: AlertTableData;
  service: AlertService;
  conf: AlertConfiguration;
  lang: AlertLang;
}

const Page: FC<{ data: AlertTableData; service: AlertService }> = ({ data, service, }) => {
  return <span className="page" onClick={() => {
    service.inputPage((page) => {
      if (page !== undefined) {
        service.setPage(page);
      }
    });
  }}>{data.page + 1}</span>;
};

const History: FC<AlertNavBarProps> = ({ data, service }) => {
  return (
    <div>
      <span className="icon" style={{ backgroundImage: `url(${calender})` }} >
      </span>
      <span className="icon" onClick={() => { service.setPage(data.page - 1); }} >
        <LeftCircleOutlined />
      </span>
      <Page {...{ data, service }} />
      <span className="icon" onClick={() => { service.setPage(data.page + 1); }} >
        <RightCircleOutlined />
      </span>
    </div>
  );
};
const Confirmed: FC<AlertNavBarProps> = ({ data, service }) => {
  return (
    <div>
      <span className="icon" onClick={() => service.setPage(data.page - 1)}>
        <LeftCircleOutlined />
      </span>
      <Page {...{ data, service }} />
      <span className="icon" onClick={() => service.setPage(data.page + 1)}>
        <RightCircleOutlined />
      </span>
    </div>
  );
};
const Unconfirm: FC<AlertNavBarProps> = ({ data, service }) => {
  return (
    <div>
      <span className="icon" onClick={() => service.confirm()}>
        <CheckSquareOutlined />
      </span>
      <span className="icon" onClick={() => service.setPage(data.page - 1)}>
        <LeftCircleOutlined />
      </span>
      <Page {...{ data, service }} />
      <span className="icon" onClick={() => service.setPage(data.page + 1)}>
        <RightCircleOutlined />
      </span>
    </div>
  );
};

export const AlertNavBar: FC<AlertNavBarProps> = ({
  data,
  service,
  conf,
  lang,
  ...rest
}) => {
  const fontSize = conf.theme.titleFontSize;
  const color = conf.theme.titleColor;
  const borderColor = conf.theme.titleBoderColor;
  const border = `1px solid ${borderColor}`;
  return (
    <div className="nav" style={{ fontSize }}>
      <div>
        {conf.tabs.map((tab, idx) => {
          const backgroundColor =
            data.tab === tab ? conf.theme.titleBgActive : conf.theme.titleBg;
          return (
            <span
              key={idx}
              className="tab"
              style={{
                backgroundColor,
                color,
                border,
                borderBottom: "none",
              }}
              onClick={() => service.setTab(tab)}
            >
              {lang[tab]}
            </span>
          );
        })}
      </div>
      <>
        {data.tab === "history" && (
          <History {...{ data, service, lang, conf, ...rest }}></History>
        )}
        {data.tab === "confirmed" && (
          <Confirmed
            {...{ data, service, lang, conf, ...rest }}
          ></Confirmed>
        )}
        {data.tab === "unconfirm" && (
          <Unconfirm
            {...{ data, service, lang, conf, ...rest }}
          ></Unconfirm>
        )}
      </>
    </div>
  );
};

import calender from "./style/calender.png";
import React from "react";
import CheckSquareOutlined from "@ant-design/icons/CheckSquareOutlined";
import LeftCircleOutlined from "@ant-design/icons/LeftCircleOutlined";
import RightCircleOutlined from "@ant-design/icons/RightCircleOutlined";
import type { BaseComponentProps } from "../../types";

export interface AlertNavBarProps extends BaseComponentProps {
  data: alert2.client.TableData;
  conf: alert2.client.Configuration;
  lang: alert2.client.Lang;
}

const Page: FC<{ data: alert2.client.TableData }> = ({ data }) => {
  return <span className="page" onClick={() => {
    data.inputPage((page) => {
      if (page !== undefined) {
        data.setPage(page);
      }
    });
  }}>{data.page + 1}</span>;
};

const History: FC<AlertNavBarProps> = ({ data }) => {
  return (
    <div className="icons">
      <span className="icon" style={{ backgroundImage: `url(${calender})` }}
        onClick={() => {
          data.inputDate((ndate) => {
            console.log("date:", ndate);
          })
        }}
      >
      </span>
      <span className="icon" onClick={() => { data.setPage(data.page - 1); }} >
        <LeftCircleOutlined />
      </span>
      <Page {...{ data }} />
      <span className="icon" onClick={() => { data.setPage(data.page + 1); }} >
        <RightCircleOutlined />
      </span>
    </div>
  );
};
const Confirmed: FC<AlertNavBarProps> = ({ data }) => {
  return (
    <div className="icons">
      <span className="icon" onClick={() => data.setPage(data.page - 1)}>
        <LeftCircleOutlined />
      </span>
      <Page {...{ data }} />
      <span className="icon" onClick={() => data.setPage(data.page + 1)}>
        <RightCircleOutlined />
      </span>
    </div>
  );
};
const Unconfirm: FC<AlertNavBarProps> = ({ data }) => {
  return (
    <div className="icons">
      <span className="icon" onClick={() => data.confirm()}>
        <CheckSquareOutlined />
      </span>
      <span className="icon" onClick={() => data.setPage(data.page - 1)}>
        <LeftCircleOutlined />
      </span>
      <Page {...{ data }} />
      <span className="icon" onClick={() => data.setPage(data.page + 1)}>
        <RightCircleOutlined />
      </span>
    </div>
  );
};

export const AlertNavBar: FC<AlertNavBarProps> = ({
  data,
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
      <div className="tabs">
        {conf.tabs.map((tab, idx) => {
          const backgroundColor = data.tab === tab ? conf.theme.navFocusBg : "";
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
              onClick={() => data.setTab(tab)}
            >
              {lang[tab]}
            </span>
          );
        })}
      </div>
      <>
        {data.tab === "history" && (
          <History {...{ data, lang, conf, ...rest }}></History>
        )}
        {data.tab === "confirmed" && (
          <Confirmed
            {...{ data, lang, conf, ...rest }}
          ></Confirmed>
        )}
        {data.tab === "unconfirm" && (
          <Unconfirm
            {...{ data, lang, conf, ...rest }}
          ></Unconfirm>
        )}
      </>
    </div>
  );
};

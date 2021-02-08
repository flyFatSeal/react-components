import calender from "./style/calender.png";
import React from "react";
import CheckSquareOutlined from "@ant-design/icons/CheckSquareOutlined";
import LeftCircleOutlined from "@ant-design/icons/LeftCircleOutlined";
import RightCircleOutlined from "@ant-design/icons/RightCircleOutlined";
import type { BaseComponentProps } from "../../types";
import { ActionContext, ConfContext } from "./data/contexts";

export interface AlertNavBarProps extends BaseComponentProps {
  data: alert2.client.TableData;
}

const Page: FC<{ data: alert2.client.TableData }> = ({ data }) => {
  const action = React.useContext(ActionContext);
  return <span className="page" onClick={() => {
    action.beep();
    action.inputPage();
  }}>{data.page + 1}</span>;
};

const History: FC<AlertNavBarProps> = ({ data }) => {
  const action = React.useContext(ActionContext);
  return (
    <div className="icons">
      <span className="icon" style={{ padding: 0, backgroundImage: `url(${calender})` }}
        onClick={() => {
          action.beep();
          action.inputDate();
        }}
      />
      <span className="icon" onClick={() => {
        action.beep();
        action.setPage(data.page - 1);
      }} >
        <LeftCircleOutlined />
      </span>
      <Page {...{ data }} />
      <span className="icon" onClick={() => {
        action.beep();
        action.setPage(data.page + 1);
      }} >
        <RightCircleOutlined />
      </span>
    </div>
  );
};
const Confirmed: FC<AlertNavBarProps> = ({ data }) => {
  const action = React.useContext(ActionContext);
  return (
    <div className="icons">
      <span className="icon" style={{ padding: 0, backgroundImage: `url(${calender})` }}
        onClick={() => {
          action.beep();
          action.inputDate();
        }}
      />
      <span className="icon" onClick={() => {
        action.beep();
        action.setPage(data.page - 1);
      }}>
        <LeftCircleOutlined />
      </span>
      <Page {...{ data }} />
      <span className="icon" onClick={() => {
        action.beep();
        action.setPage(data.page + 1);
      }}>
        <RightCircleOutlined />
      </span>
    </div>
  );
};
const Unconfirm: FC<AlertNavBarProps> = ({ data }) => {
  const action = React.useContext(ActionContext);
  return (
    <div className="icons">
      <span className="icon" style={{ padding: 0, backgroundImage: `url(${calender})` }}
        onClick={() => {
          action.beep();
          action.inputDate();
        }}
      />
      <span className="icon" onClick={() => {
        action.beep();
        action.confirm();
      }}>
        <CheckSquareOutlined />
      </span>
      <span className="icon" onClick={() => {
        action.beep();
        action.setPage(data.page - 1);
      }}>
        <LeftCircleOutlined />
      </span>
      <Page {...{ data }} />
      <span className="icon" onClick={() => {
        action.beep();
        action.setPage(data.page + 1);
      }}>
        <RightCircleOutlined />
      </span>
    </div>
  );
};

export const AlertNavBar: FC<AlertNavBarProps> = ({ data }) => {
  const conf = React.useContext(ConfContext);
  const action = React.useContext(ActionContext);
  const fontSize = conf.theme.navFontSize;
  const color = conf.theme.navColor;
  const border = conf.theme.navBorder;
  return (
    <div className="nav" style={{ fontSize }}>
      <div className="tabs">
        {conf.tabs.map((tab, idx) => {
          const backgroundColor = data.tab === tab ? conf.theme.navFocusBg : "";
          return (
            <span key={idx} className="tab" style={{ backgroundColor, color, border, }} onClick={() => {
              action.beep();
              action.setTab(tab)
            }} >
              {data.uiLang[tab]}
            </span>
          );
        })}
      </div>
      <>
        {data.tab === "history" && (<History data={data} />)}
        {data.tab === "confirmed" && (<Confirmed data={data} />)}
        {data.tab === "unconfirm" && (<Unconfirm data={data} />)}
      </>
    </div>
  );
};

import React from "react";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import type { BaseComponentProps } from "../../types";
import type { AlertConfiguration, AlertLang } from "./types";

export interface AlertNavBarProps extends BaseComponentProps {
  active: "realtime" | "confirmed" | "history" | "unconfirm";
  page: number;
  conf: AlertConfiguration;
  lang: AlertLang;
  setActive: React.Dispatch<React.SetStateAction<AlertNavBarProps["active"]>>;
}

const RealTime: FC<AlertNavBarProps> = ({ page }) => {
  return <> </>;
};
const History: FC<AlertNavBarProps> = ({ active, page }) => {
  return (
    <div>
      <span className="icon">
        <LeftCircleOutlined></LeftCircleOutlined>
      </span>
      <span>{page}</span>
      <span className="icon">
        <RightCircleOutlined></RightCircleOutlined>
      </span>
    </div>
  );
};
const Confirmed: FC<AlertNavBarProps> = ({ page }) => {
  return (
    <div>
      <span className="icon">
        <LeftCircleOutlined></LeftCircleOutlined>
      </span>
      <span>{page}</span>
      <span className="icon">
        <RightCircleOutlined></RightCircleOutlined>
      </span>
    </div>
  );
};
const Unconfirm: FC<AlertNavBarProps> = ({ page }) => {
  return (
    <div>
      <span className="icon">
        <LeftCircleOutlined></LeftCircleOutlined>
      </span>
      <span>{page}</span>
      <span className="icon">
        <RightCircleOutlined></RightCircleOutlined>
      </span>
    </div>
  );
};

export const AlertNavBar: FC<AlertNavBarProps> = ({
  active,
  setActive,
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
            active === tab ? conf.theme.titleBgActive : conf.theme.titleBg;
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
              onClick={() => setActive(tab)}
            >
              {lang[tab]}
            </span>
          );
        })}
      </div>
      <>
        {active === "history" && (
          <History {...{ active, setActive, lang, conf, ...rest }}></History>
        )}
        {active === "confirmed" && (
          <Confirmed
            {...{ active, setActive, lang, conf, ...rest }}
          ></Confirmed>
        )}
        {active === "unconfirm" && (
          <Unconfirm
            {...{ active, setActive, lang, conf, ...rest }}
          ></Unconfirm>
        )}
      </>
    </div>
  );
};

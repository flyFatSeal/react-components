import React from "react";

/**
 * 报警标题栏属性
 */
export interface AlertTitleProps {
  lang: alert2.client.Lang;
  conf: alert2.client.Configuration;
}

/**
 * 报警标题栏
 */
export const AlertTitle: FC<AlertTitleProps> = ({ lang, conf }) => {
  return (
    <div
      className="line"
      style={{
        backgroundColor: conf.theme.titleBg,
        color: conf.theme.titleColor,
        minWidth: conf.theme.lineWidth,
        fontSize: conf.theme.titleFontSize,
      }}
    >
      {conf.fields.map((field, idx) => {
        const borderLeft = idx === 0 ? "" : conf.theme.border;
        return (
          <span
            key={idx}
            className="cell"
            style={{
              width: conf.width[field] + "em",
              borderLeft,
              fontWeight: 700,
            }}
          >
            <span style={{ fontSize: conf.theme.titleFontSize }}>
              {lang[field]}
            </span>
          </span>
        );
      })}
    </div>
  );
};

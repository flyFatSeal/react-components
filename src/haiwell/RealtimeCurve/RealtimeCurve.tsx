import React, {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {Line} from 'react-chartjs-2'

interface curveInfoProps {
  color: string
  curveShow: boolean
  fullName: string
  id: string
  maxValue: number
  memo: string // 这个是变量标记
  minValue: number
  name: string
}

interface annotationProps {
  drawTime: 'beforeDatasetsDraw' | 'afterDatasetsDraw'
  type: 'line' | 'box'
  mode: 'horizontal' | 'vertical'
  scaleID: string
  value: number
  borderColor: string
  borderWidth: number
}

interface RealTimeConfigProps {
  referLinePosition: number
  referLineTitle: string
  showReferLine: Boolean
  realTimeBtnCfg: ('startOrStop' | 'cls' | 'scale' | 'move' | 'deputyGrid')[]
  referLineColor: string
  referLineTitleBgColor: string
  referLineTitleFontColor: string
  toolBarHeight: number
  curveName: 'name' | 'fullName' | 'memo'
  backGroundColor: string
  yAxesMax: number
  yAxesMin: number
  showPoint: Boolean
  curveLineWidth: number
  mainLineColor: string
  percentType: 'varValue' | 'value' // varValue是百分比模式下的 每条曲线模式 value是百分比模式下的数值模式
  showType: 'type2' | 'type1' // type2是数值模式，type1是百分比模式
  subLineColor: '#AAAAAA'
  textColor: string
  timeDur: number //时间间隔
  title: string
  variables: curveInfoProps[]
  xLattice: number
  xSubLattice: number // y轴副格
  xTitle: string
  yLattice: number
  ySubLattice: number
  yTitle: string
}

interface RealtimeCurveProps {
  rootDiv: HTMLDivElement
  config: RealTimeConfigProps
}

interface messageProps {
  eleId: string
  data: {[key: string]: {id: string; time: number; value: number}}
}

const RealtimeCurve: React.FC<RealtimeCurveProps> = (props) => {
  const {config, subLineColor, title, yTitle, rootDiv} = props

  /** 监听后端返回的曲线数据*/
  useEffect(() => {
    //单个数据点推送到数据集中
    window.hai.onMessage('getRTData', function (datas: messageProps) {}, false)
  }, [rootDiv.id, subLineColor])

  return (
    <Fragment>
      <Line />
    </Fragment>
  )
}

const initDatasets = (
  curvesInfo: RealTimeConfigProps['variables'],
  labelField: RealTimeConfigProps['curveName'],
  lineWidth: number,
  showPoint: Boolean
) => {
  return curvesInfo.map((curve) => {
    return {
      curveArrayId: curve.id,
      label: curve[labelField],
      backgroundColor: curve.color,
      borderColor: curve.color,
      fill: false,
      data: [],
      curveShow: curve.curveShow,
      borderWidth: lineWidth || 2,
      pointBorderWidth: [],
      pointRadius: [],
      spanGaps: true,
    }
  })
}
const initReferLine = (
  showReferLine: Boolean,
  yAxisMax: number,
  mainLineColor: string,
  referLineColor: string,
  referLinePosition: number,
  referLineTitle: string,
  referLineTitleBgColor: string,
  referLineTitleFontColor: string
) => {
  // 因为chart.js 2.7.2版本 在非整数等分y轴时 会丢失y轴最高点的横线，这里手动画了一条（topLine）。
  // 例如 min:3 max:53 时
  let referLines: unknown[] = [
    {
      drawTime: 'afterDatasetsDraw',
      id: 'topLine',
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: yAxisMax,
      borderColor: mainLineColor,
      borderWidth: 1,
    },
  ]
  if (showReferLine) {
    referLines.push({
      drawTime: 'afterDatasetsDraw',
      id: 'HWGuidesEnable',
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: referLinePosition,
      borderColor: referLineColor,
      borderWidth: 3,
      label: {
        backgroundColor: referLineTitleBgColor,
        content: referLineTitle,
        fontColor: referLineTitleFontColor,
        enabled: true,
      },
    })
  }
  return referLines
}
const getSafeStepSize = (max: number, min: number, lattice: number) => {}
/**
  获取需要绘制的副格信息
 */
const getSubLine = (
  max: number,
  min: number,
  stepSize: number,
  lattice: number,
  color: string
) => {
  let sublines: annotationProps[] = []
  let space = stepSize / lattice
  let count = 0
  if (max > min && space > 0) {
    for (let i = max; i <= min; i += space) {
      if (count === lattice) count = 0
      if (count !== 0)
        sublines.push({
          drawTime: 'beforeDatasetsDraw',
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: i,
          borderColor: color,
          borderWidth: 1,
        })
      count++
    }
  }
  return sublines
}

const initAllConfig = (
  config: RealTimeConfigProps,
  onRefreshFn: () => void
) => {
  const max = config.yAxesMax || 100
  const min = config.yAxesMin || 0
  const stepSize = (config.yAxesMax - config.yAxesMin) / config.yLattice
  let finialConifg = {
    yAxes: [
      {
        scaleLabel: {
          labelString: config.yTitle,
          fontColor: config.textColor,
        },
        ticks: {
          max,
          min,
          stepSize,
        },
        gridLines: {
          color: 'rgba(0, 0, 0, 0.8)',
        },
      },
    ],
    xAxes: [
      {
        type: 'realtime',
        time: {
          tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
          displayFormats: {
            millisecond: 'HH:mm:ss',
            second: 'HH:mm:ss',
            minute: 'HH:mm:ss',
            hour: 'HH:mm:ss',
            day: 'HH:mm:ss',
            week: 'HH:mm:ss',
            month: 'HH:mm:ss',
            quarter: 'HH:mm:ss',
            year: 'HH:mm:ss',
          },
        },
        scaleLabel: {
          labelString: config.xTitle,
          fontColor: config.textColor,
        },
        ticks: {
          source: 'data',
        },
        gridLines: {
          color: [],
        },
      },
    ],
    title: {
      text: config.title,
      fontColor: config.textColor,
    },
    annotation: {
      annotations: getSubLine(
        max,
        min,
        stepSize,
        config.yLattice,
        config.subLineColor
      ),
    },
    plugins: {
      streaming: {
        duration: config.timeDur * 1000,
        refresh: (config.timeDur * 1000) / config.xLattice,
        onRefresh: onRefreshFn,
      },
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      enabled: true,
      position: 'nearest',
      callbacks: {},
    },
    elements: {
      line: {
        tension: 0, // disables bezier curves
      },
    },
    animation: {
      duration: 0, // general animation time
    },
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0,
    legend: {
      display: false,
    },
  }
  return finialConifg
}

export default RealtimeCurve

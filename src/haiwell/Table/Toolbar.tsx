import React, {FC, forwardRef, useRef} from 'react'

import Icon, {SearchOutlined} from '@ant-design/icons'

import Xlxs from './images/excel.svg'
import csv from './images/csv.svg'
import print from './images/print.svg'

// import {ReactComponent as Xlxs} from './images/excel.svg'
// import {ReactComponent as csv} from './images/csv.svg'
// import {ReactComponent as print} from './images/print.svg'

import {TableProps} from './Table'
// @ts-ignore
import jeDate from 'jeDate'

interface ToolbarProps {
  prefixCls: string
  exportXlxsFn: () => void
  exportCsvFn: () => void
  printFn: () => void
  queryDataFn: (Query: {[key: string]: string}) => void
  queryCondition: TableProps['Querys']
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>((props, ref) => {
  const {
    exportXlxsFn,
    exportCsvFn,
    printFn,
    queryCondition,
    queryDataFn,
  } = props
  const inputIds = useRef<{[key: string]: string}>({})
  console.info('toolbar render')
  return (
    <div className="report_toolBar" ref={ref}>
      <Icon
        // @ts-ignore
        // 因为ant icon component属性需要的是 React.ComponentClass<CustomIconComponentProps | React.SVGProps<SVGSVGElement>
        // 而svg是string类型 强行转换ts也会报错 暂时忽略ts检查
        component={Xlxs}
        className="report_button"
        onClick={exportXlxsFn}
      />
      <Icon
        // @ts-ignore
        component={csv}
        className="report_button"
        onClick={exportCsvFn}
      />
      <Icon
        // @ts-ignore
        component={print}
        className="report_button"
        onClick={printFn}
      />
      <QueryPickers querys={queryCondition} inputIdsRef={inputIds} />
      <div
        style={{
          marginLeft: '9px',
        }}
        onClick={() => {
          const Querys = {} as any
          Object.keys(inputIds.current).forEach((queryName) => {
            let inputDom = document.querySelector(
              `#${inputIds.current[queryName]}`
            ) as HTMLInputElement
            Querys[queryName] = inputDom ? inputDom.value : ''
          })
          queryDataFn(Querys)
        }}
        className="report_button report_query"
      >
        <SearchOutlined />
      </div>
    </div>
  )
})

/** 创建timePicker*/
/**
  这一块单独抽象出来，因为为了兼容以前的写法，不得不还是调用之前的库，后续如果重写需要优先考虑换掉该依赖。
 */
const Pickers: FC<{
  querys: TableProps['Querys']
  inputIdsRef: React.MutableRefObject<{
    [key: string]: string
  }>
}> = (props) => {
  const {querys, inputIdsRef} = props

  return querys ? (
    <>
      {querys.map((query) => {
        const randomId = 'input' + Math.floor(Math.random() * 1000)
        inputIdsRef.current[query.QueryName] = randomId
        return CreatePicker(query, randomId)
      })}
    </>
  ) : null
}

const QueryPickers = React.memo(Pickers, () => true)

const CreatePicker = (
  query: {
    QueryName: string
    QueryType: string
    Value: string
  },
  id: string
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputDom = (
    <div id="jeitem" key={Math.random()}>
      <label id="jelabel">{query.QueryName}</label>
      <input
        ref={inputRef}
        id={id}
        className="reportQueryInput"
        value={query.Value}
      />
    </div>
  )

  setTimeout(() => {
    /** 调用jeDate*/
    const splitValue = query.Value.split(' ')
    if (query.QueryType === '0') {
      let yearMonthDay = splitValue[0].split('/')
      jeDate(`#${id}`, {
        isinitVal: true,
        initDate: [{YYYY: yearMonthDay[0], MM: yearMonthDay[1]}, false],
        format: 'YYYY/MM ',
        zIndex: 3000,
      })
    } else if (query.QueryType === '1') {
      let yearMonthDay = splitValue[0].split('/')
      jeDate(`#${id}`, {
        isinitVal: true,
        initDate: [
          {YYYY: yearMonthDay[0], MM: yearMonthDay[1], DD: yearMonthDay[2]},
          false,
        ],
        format: 'YYYY/MM/DD',
        zIndex: 3000,
      })
    } else if (query.QueryType === '2') {
      let yearMonthDay = splitValue[0].split('/')
      let hourMinSec = splitValue[1].split(':')
      jeDate(`#${id}`, {
        isinitVal: true,

        zIndex: 3000,
        initDate: [
          {
            YYYY: yearMonthDay[0],
            MM: yearMonthDay[1],
            DD: yearMonthDay[2],
            hh: hourMinSec[0],
            mm: hourMinSec[1],
            ss: hourMinSec[2],
          },
          false,
        ],
        format: 'YYYY/MM/DD hh:mm:ss',
      })
    } else {
      inputRef.current!.value = query.Value
      inputRef.current!.setAttribute('readonly', 'true')
      inputRef.current!.addEventListener(
        'click',
        function () {
          window.Common.Bee()
          let originValut = inputRef.current!.value
          // @ts-ignore
          Window.PopKeyboard('t9', function (data) {
            if (data === 'undefined' || data === undefined || data === '')
              return originValut
            else {
              inputRef.current!.value = data
            }
            return data
          })
        },
        false
      )
    }
  }, 0)

  return inputDom
}

export default Toolbar

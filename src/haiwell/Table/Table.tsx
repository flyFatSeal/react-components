import React, {
  FC,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import {HotTable} from '@handsontable/react'

import {useLocalContext} from '../until/locale'
import {useEffect} from 'react'
import {Emitter} from '../until/emitter'
import Toolbar from './Toolbar'
import {ConfigContext} from '../../components/config-provider/context'

/** 单元格属性*/
export interface CellProps {
  class: string
  width: number
  colSpan: number
  rowSpan: number
  value: {image: string} | string
}

export interface TableProps {
  Querys?: {QueryName: string; QueryType: string; Value: string}[]
  colLength: number
  colWidthConfig: {width: string}[]
  css: string
  data: CellProps[][]
  trConfig: {height: string}[]
}

export interface HaiwellTableProps {
  rootDiv: HTMLDivElement
  options: TableProps
  scoket: Emitter
}

interface socketOptionsProps {
  type: string
  symId: string
  data: TableProps
}

const Table: FC<HaiwellTableProps> = (props) => {
  const {colLength, data, trConfig, colWidthConfig, css} = props.options
  const {rootDiv, scoket} = props
  const [tableData, setTableData] = useState<Array<CellProps[]>>(
    transformData(data, colLength)
  )

  // 是否统一表格行高（当查询到大量数据时）
  const [shouldResizRowHeight, setShouldResizeRowHeight] = useState(false)
  // 使用ref储存一个当前tabledata的副本值 因为HotTable自身能够修改单元格的值 此时如果要执行导出xlxs操作需要同步被修改的值到现有值中并传递给后端
  // 但是如果同步到useState中会又重新渲染一遍表格 导致性能损失 因此使用一个ref用来同步 被修改后的报表值
  const storeTableData = useRef(tableData)
  const hotInstanceRef = useRef<Handsontable>()
  const toolbarRef = useRef<HTMLDivElement>(null)
  // 获取默认样式名 和size 全局context
  const {getPrefixCls} = useContext(ConfigContext)

  addGlobalCss(css)
  /** 拿到实例化后的报表实例，并进行一些样式添加操作*/
  const hotRef = useCallback((node) => {
    if (node !== null) {
      const hotInstance = node.hotInstance as Handsontable
      /** 获取表格实例*/
      hotInstanceRef.current = hotInstance
      hotInstance.addHook('afterCreateRow', (index: number) => {
        storeTableData.current.splice(index, 0, addRow(storeTableData.current))
      })
      hotInstance.addHook(
        'afterChange',
        (changes: Array<readonly [number, number, string, string]>) => {
          // 表格单元格变化时同步到本地缓存中
          if (!changes || changes.length > 1) return
          for (let changedCell of changes) {
            let storeCell =
              storeTableData.current[changedCell[0]][changedCell[1]]
            if (
              changedCell[3] &&
              changedCell[3].includes('<div style="width:100%;height:100%">')
            ) {
              // 图片变化 -- 只有一种可能图片被清空 或者改成字符串
              let imageFile = changedCell[3].match(/(?<=images\/).*?(?=')/g)![0]
              storeCell.value = {image: imageFile}
            } else storeCell.value = changedCell[3]
          }
        }
      )
      hotInstance.addHook('afterRemoveRow', (index: number) => {
        storeTableData.current.splice(index, 1)
      })
    }
  }, [])
  /** 添加行操作同步到本地缓存中*/
  const addRow = (table: CellProps[][]) => {
    let len = table[0].length
    return new Array(len).fill(
      JSON.parse(
        JSON.stringify({
          class: '',
          colSpan: 1,
          rowSpan: 1,
          value: '',
          width: 40,
        })
      )
    )
  }

  const Locale = useLocalContext('Table')

  const hotSetting = useMemo<Handsontable.DefaultSettings>(
    () =>
      getHotSetting(
        Locale,
        rootDiv,
        colWidthConfig,
        trConfig,
        tableData,
        shouldResizRowHeight
      ),
    [Locale, rootDiv, colWidthConfig, trConfig, tableData, shouldResizRowHeight]
  )
  // table 前缀
  const prefixCls = getPrefixCls('table')

  /** 导出文件*/
  const exportEmit = (type: 'csv' | 'xlxs') => {
    return () => {
      scoket.emit('table-export', {
        data: storeTableData.current,
        css,
        type,
        name: props.rootDiv.id,
      })
    }
  }
  /** 打印 这个函数完全是为了兼容以前的功能设定，最好后续去掉*/
  const printFn = () => {
    // 将报表拉伸到全局
    // 添加打印时的样式
    rootDiv.classList.add('report_print_center')
    // 隐藏工具栏
    toolbarRef.current!.style.display = 'none'
    const [beforeWidth, beforeHeight, beforeTop] = [
      rootDiv.style.width,
      rootDiv.style.height,
      rootDiv.style.top,
    ]
    // 为了能打印出多页的情况，必须要将body和外部容器的高度和表格的总高度一致。
    const resetHeight =
      hotSetting.height! > (tableData.length + 7) * 30
        ? (hotSetting.height as number) + 100
        : (tableData.length + 7) * 30
    rootDiv.style.width = '100%'
    rootDiv.style.height = `${resetHeight}px`
    rootDiv.style.top = '0'
    document.body.style.minHeight = `${resetHeight}px`

    let scaleCount = 770 / (hotSetting.width as number)

    hotInstanceRef.current?.updateSettings(
      {
        width: 770,
        height: resetHeight,
        colWidths: (hotSetting.colWidths as number[]).map(
          (colWidth) => colWidth * scaleCount
        ),
      },
      false
    )

    hotInstanceRef.current?.render()

    // 兼容eletron 6.0.2 window.print 不能运行的bug https://github.com/electron/electron/issues/14705
    if (window.navigator.appVersion.includes('Electron')) {
      // eslint-disable-next-line no-eval
      const electronre = eval('require')('electron')
      var ipc = electronre.ipcRenderer
      ipc.send('print')
    } else {
      window.print()
    }
    rootDiv.style.height = beforeHeight
    rootDiv.style.width = beforeWidth
    rootDiv.style.top = beforeTop
    hotInstanceRef.current?.updateSettings(hotSetting, false)
    rootDiv.classList.remove('report_print_center')
    toolbarRef.current!.style.display = 'flex'
    document.body.style.minHeight = '100px'
  }
  /** 查询数据*/
  const queryData = (Query: {[key: string]: string}) => {
    const payload = {
      symId: props.rootDiv.id,
      type: 'getReactReport',
      opinfo: null,
      data: {
        Query,
        myReport: props.rootDiv.getAttribute('myReport-id'),
      },
    }
    scoket.emit('qianduan', payload)
  }

  /** 监听报表数据更换*/
  useEffect(() => {
    scoket.on('returnReport', (options: socketOptionsProps) => {
      if (options.symId !== rootDiv.id) return
      const {data, colLength} = options.data
      if (data.length > tableData.length) {
        setShouldResizeRowHeight(true)
      }
      setTableData(transformData(data, colLength))
    })
  }, [rootDiv.id, scoket, tableData.length])

  return (
    <Fragment>
      <Toolbar
        ref={toolbarRef}
        prefixCls={prefixCls}
        exportXlxsFn={exportEmit('xlxs')}
        exportCsvFn={exportEmit('csv')}
        printFn={printFn}
        queryDataFn={queryData}
        queryCondition={props.options.Querys}
      />

      <HotTable ref={hotRef} settings={hotSetting} />
    </Fragment>
  )
}

const transformData = (data: Array<CellProps[]>, colLength: number) => {
  let recordData = new Array(data.length).fill(null).map((item) => {
    let row = new Array(colLength).fill(0)
    return row
  })
  return data.map((item, index) => {
    let row = new Array(colLength).fill(null).map(function singleObj(single) {
      return {
        class: '',
        colSpan: 1,
        rowSpan: 1,
        value: '',
        width: 40,
      } as CellProps
    })
    if (item.length) {
      let startIndex = 0
      for (let i = 0; i < item.length; i++) {
        //给该行的每一列赋值
        let realStartIndex = findNextZeroIndex(startIndex, recordData[index])

        row[realStartIndex] = item[i]
        //把对应recordData坐标的值设置为1
        for (
          let rowIndex = index;
          rowIndex < item[i].rowSpan + index;
          rowIndex++
        ) {
          for (
            let colIndex = realStartIndex;
            colIndex < realStartIndex + item[i].colSpan;
            colIndex++
          ) {
            recordData[rowIndex][colIndex] = 1
          }
        }
        startIndex = realStartIndex + item[i].colSpan
      }
    }
    return row
  })
}
const findNextZeroIndex = (start = 0, array: number[]) => {
  let index = array.slice(start).findIndex((element) => element === 0) + start
  return index >= 0 ? index : start
}
/** 获取报表初始设置*/
const getHotSetting = (
  Locale: {[key: string]: string},
  root: HTMLDivElement,
  colsWidth: TableProps['colWidthConfig'],
  rowsHeight: TableProps['trConfig'],
  tableData: CellProps[][],
  shouldResizRowHeight: boolean
) => {
  /** 因为handstontable v6不支持自适应父容器 因此需要手动获取父容器的高宽度 并且根据组态上的设置 拉伸各列的宽度进行比例适配*/
  const width = root.offsetWidth
  const height = root.offsetHeight - 20

  const sumWidth = colsWidth.slice(1).reduce(function (acc, cur) {
    return acc + Number(cur.width)
  }, 0)

  const sumHeight = rowsHeight.reduce(function (acc, cur) {
    return acc + Number(cur.height)
  }, 0)

  //表格高宽对应的缩小比例
  const widthScale = (width - 50 - 40) / sumWidth
  const heightScale = height / sumHeight
  // 计算出各行各列对应的实际高宽度
  const rowHeights = !shouldResizRowHeight
    ? rowsHeight.map((item) => Number(item.height) * heightScale)
    : []
  const colWidths = colsWidth
    .slice(1)
    .map((item) => Number(item.width) * widthScale)

  // 设置每列能够以html的形式渲染 这样才能插入图片到表格中
  const columns = new Array(colsWidth.length - 1).fill({
    renderer: 'html',
  })
  return {
    colHeaders: true,
    rowHeaders: true,
    manualRowMove: true,
    manualColumnMove: true,
    manualRowResize: true,
    manualColumnResize: true,
    columnSorting: true,
    search: true,
    rowHeights,
    colWidths,
    width,
    height,
    columns,
    mergeCells: getMergeCells(tableData),
    data: tableData.map((row) =>
      row.map((col) => {
        let value = col.value
        typeof value === 'object' &&
          value &&
          value.image &&
          (value = `<div style="width:100%;height:100%"><img height="100%" width="100%" src='../images/${value.image}'></div>`)
        return value
      })
    ),
    cells: function (row: number | undefined, col: number | undefined) {
      return {
        className: `${tableData[row!][col!].class} controlTd`,
      }
    },
    contextMenu: {
      callback: () => {},
      items: {
        row_above: {
          name: Locale.rowAbove,
        },
        row_below: {
          name: Locale.rowBelow,
        },
        remove_row: {
          name: Locale.removeRow,
        },
        undo: {
          name: Locale.undo,
        },
        redo: {
          name: Locale.redo,
        },
        make_read_only: {
          name: Locale.makeReadOnly,
        },
        alignment: {
          name: Locale.alignment,
          submenu: {
            items: [
              {
                key: 'alignment:left',
                name: Locale.alignmentLeft,
                callback: alignment('htLeft'),
              },
              {
                key: 'alignment:right',
                name: Locale.alignmentRight,
                callback: alignment('htRight'),
              },
              {
                key: 'alignment:center',
                name: Locale.alignmentCenter,
                callback: alignment('htCenter'),
              },
              {
                key: 'alignment:top',
                name: Locale.alignmentTop,
                callback: alignment('htTop'),
              },
              {
                key: 'alignment:middle',
                name: Locale.alignmentMiddle,
                callback: alignment('htMiddle'),
              },
              {
                key: 'alignment:bottom',
                name: Locale.alignmentBottom,
                callback: alignment('htBottom'),
              },
            ],
          },
        },
        cut: {
          name: Locale.cut,
        },
        freezeCol: {
          name: Locale.freezeCol,

          callback: function (
            this: Handsontable,
            key: string,
            options: Handsontable.contextMenu.Options[]
          ) {
            let [startRow, startCol, endRow, endCol] = [
              options[0].start.row,
              options[0].start.col,
              options[0].end.row,
              options[0].end.col,
            ]
            this.updateSettings(
              {
                fixedColumnsLeft: startCol + 1,
              },
              false
            )

            this.render()
          },
        },
        freezeRow: {
          name: Locale.freezeRow,

          callback: function (
            this: Handsontable,
            key: string,
            options: Handsontable.contextMenu.Options[]
          ) {
            let [startRow] = [options[0].start.row]
            this.updateSettings(
              {
                fixedRowsTop: startRow + 1,
              },
              false
            )

            this.render()
          },
        },
        unfreeze: {
          name: Locale.unfreeze,
          callback: function (
            this: Handsontable,
            key: string,
            options: Handsontable.contextMenu.Options[]
          ) {
            this.updateSettings(
              {
                fixedRowsTop: 0,
                fixedColumnsLeft: 0,
              },
              false
            )
            this.render()
          },
        },
      },
    },
  }
}

const alignment = (position: string) => {
  return function (
    this: Handsontable,
    key: string,
    options: Handsontable.contextMenu.Options[]
  ) {
    let [startRow, startCol, endRow, endCol] = [
      options[0].start.row,
      options[0].start.col,
      options[0].end.row,
      options[0].end.col,
    ]
    for (let i = startRow; i <= endRow; i++)
      for (let j = startCol; j <= endCol; j++) {
        var cellMeta = this.getCellMeta(i, j)
        var replaceMeta = (cellMeta.className as string).replace(
          /ht(Top|Middle|Bottom)/g,
          ''
        )
        this.setCellMeta(i, j, 'className', replaceMeta + ` ${position}`)
      }
    this.render()
  }
}
/** 初始化各单元格之间的合并*/
const getMergeCells = (tableData: CellProps[][]) => {
  let data = tableData
  let mergeCells: any = []
  let [dataCol, dataRow] = [data[0].length, data.length]
  for (let row = 0; row < dataRow; row++) {
    for (let col = 0; col < dataCol; col++) {
      if (
        Number(data[row][col].rowSpan) > 1 ||
        Number(data[row][col].colSpan > 1)
      )
        mergeCells.push({
          row,
          col,
          rowspan: Number(data[row][col].rowSpan),
          colspan: Number(data[row][col].colSpan),
        })
    }
  }
  return mergeCells
}
/** 将组态配置好的样式添加到全局*/
const addGlobalCss = (cssRule: string) => {
  let style = document.createElement('style')
  style.innerText =
    cssRule + '.htCore td.customClass {color: #f8f8ff;background: #1E90FF;}'
  document.getElementsByTagName('head')[0].appendChild(style)
}

export default Table

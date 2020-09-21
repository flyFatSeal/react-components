import React, {FC, Fragment, useCallback, useMemo, useState} from 'react'

import {HotTable} from '@handsontable/react'
import 'handsontable/dist/handsontable.full.css'
import {useLocalContext} from '../until/locale'
import {useEffect} from 'react'
import {Emitter} from '../until/emitter'
import Toolbar from './Toolbar'

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
  addGlobalCss(css)
  /** 拿到实例化后的报表实例，并进行一些样式添加操作*/
  const hotRef = useCallback(
    (node) => {
      if (node !== null) {
        initCellsClassAndMergeCell(node.hotInstance, tableData)
      }
    },
    [tableData]
  )

  const Locale = useLocalContext('Table')

  const hotSetting = useMemo<Handsontable.DefaultSettings>(
    () => getHotSetting(Locale, rootDiv, colWidthConfig, trConfig),
    [Locale, colWidthConfig, rootDiv, trConfig]
  )

  /** 监听报表数据更换*/
  useEffect(() => {
    scoket.on('qianduan', (options: socketOptionsProps) => {
      if (options.type !== 'returnReport' || options.symId !== rootDiv.id)
        return
      const {data, colLength} = options.data
      setTableData(transformData(data, colLength))
    })
  }, [rootDiv.id, scoket])

  return (
    <Fragment>
      <Toolbar />
      <HotTable
        ref={hotRef}
        data={tableData.map((row) => row.map((col) => col.value))}
        settings={hotSetting}
      />
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
  rowsHeight: TableProps['trConfig']
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
  const rowHeight = rowsHeight.map((item) => Number(item.height) * heightScale)
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
    rowHeight,
    colWidths,
    width,
    height,
    columns,
    contextMenu: {
      callback: () => {},
      items: {
        row_above: {
          name: Locale.rowAbove,
        },
        row_below: {
          name: Locale.rowBelow,
        },
        col_left: {
          name: Locale.colLeft,
        },
        col_right: {
          name: Locale.colRight,
        },
        remove_row: {
          name: Locale.removeRow,
        },
        remove_col: {
          name: Locale.removeCol,
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
        mergeCells: {
          name: Locale.mergeCells,
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
            let [startRow, startCol, endRow, endCol] = [
              options[0].start.row,
              options[0].start.col,
              options[0].end.row,
              options[0].end.col,
            ]
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
/** 初始化各单元格的classname以及单元格之间的合并和图片处理*/
const initCellsClassAndMergeCell = (
  hot: Handsontable,
  tableData: CellProps[][]
) => {
  hot.addHookOnce('afterRender', function () {
    let data = tableData
    let mergeCells: any = []
    let [dataCol, dataRow] = [data[0].length, data.length]
    for (let row = 0; row < dataRow; row++) {
      for (let col = 0; col < dataCol; col++) {
        hot.setCellMeta(
          row,
          col,
          'className',
          `${data[row][col].class} controlTd`
        )
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

        const cellValue = data[row][col].value

        if (
          cellValue &&
          typeof cellValue === 'object' &&
          cellValue.hasOwnProperty('image')
        ) {
          setTimeout(() => {
            hot.setDataAtCell(
              row,
              col,
              `<div style="width:100%;height:100%"><img height="100%" width="100%" src='../images/${cellValue.image}'></div>`
            )
          })
        }
      }
    }

    setTimeout(() => {
      hot.updateSettings(
        {
          mergeCells,
        },
        false
      )
      hot.render()
    })
  })
}
/** 将组态配置好的样式添加到全局*/
const addGlobalCss = (cssRule: string) => {
  let style = document.createElement('style')
  style.innerText =
    cssRule + '.htCore td.customClass {color: #f8f8ff;background: #1E90FF;}'
  document.getElementsByTagName('head')[0].appendChild(style)
}

export default Table

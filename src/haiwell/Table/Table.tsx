import React, {FC, useState} from 'react'

import {HotTable} from '@handsontable/react'
import 'handsontable/dist/handsontable.full.css'

/** 单元格属性*/
export interface CellProps {
  class: string
  width: number
  colSpan: number
  rowSpan: number
  value: string | {image: string}
}

export interface TableProps {
  data: Array<CellProps[]>
  colWidthConfig: number
}

const Table: FC<TableProps> = (props) => {
  const {colWidthConfig, data} = props
  const [tableData, setTableData] = useState<Array<CellProps[]>>(
    transformData(data, colWidthConfig)
  )

  const hotSetting = {
    colHeaders: true,
    rowHeaders: true,
    contextMenu: {
      items: {
        row_above: {
          name: 'Insert row above this one (custom name)',
        },
        row_below: {},
        clear_custom: {
          callback: function (key: string, options: any) {},
          name: 'Clear all cells (custom)',
        },
      },
    },
  }

  return (
    <HotTable
      data={tableData.map((row) => row.map((col) => col.value))}
      settings={hotSetting as Handsontable.DefaultSettings}
      width={600}
      height={300}
      stretchH="all"
    />
  )
}

function transformData(data: Array<CellProps[]>, colLength: number) {
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
function findNextZeroIndex(start = 0, array: number[]) {
  let index = array.slice(start).findIndex((element) => element === 0) + start
  return index >= 0 ? index : start
}

export default Table

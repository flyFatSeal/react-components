import {HaiwellTableProps} from './Table'
import Table from './Table'
import ReactDOM from 'react-dom'
import React from 'react'
import './style/index'

export default function HaiwellTable(
  root: HaiwellTableProps['rootDiv'],
  reportData: HaiwellTableProps['options']
) {
  ReactDOM.render(
    <Table rootDiv={root} options={reportData} scoket={window.socket} />,
    root
  )
}

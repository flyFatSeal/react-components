import React from 'react'
import {muckQuery, testData} from './muck'
import {HaiwellTableProps} from './Table'
import Table from './Table'
import 'handsontable/dist/handsontable.full.css'
import mitt from '../until/emitter'
import './style/index'

let events = new Map()
let inst = mitt(events)

setTimeout(() => {
  inst.emit('returnReport', muckQuery)
}, 5000)

export const defaultTable = () => {
  const root = document.createElement('div')
  root.id = 'HWReportBrowser_1_1-sh'
  document.body.appendChild(root)
  root.style.width = '500px'
  root.style.height = '400px'

  const options: HaiwellTableProps['options'] = testData as HaiwellTableProps['options']
  return <Table rootDiv={root} options={options} scoket={inst} />
}

export default {title: 'Haiwell/Table', component: Table}

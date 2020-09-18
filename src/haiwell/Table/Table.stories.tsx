import React from 'react'
import {storiesOf} from '@storybook/react'
import {testData} from './muck'
import {HaiwellTableProps} from './Table'
import Table from './Table'

import mitt from '../until/emitter'

let events = new Map()
let inst = mitt(events)

setInterval(() => {
  inst.emit('qianduan', {
    symId: 'HWReportBrowser_1_1-sh',
    type: 'returnReport',
    data: {
      tableConfig: {
        border: 1,
        width: '916',
        cellspacing: '0',
        style: 'border-collapse: collapse;',
      },
      css:
        '  .s0a51eef2e-ef86-4379-b81d-b426f5b93192{color:#000000; text-align:left; vertical-align:middle; border-left:0px; border-right:0px; border-top:0px; border-bottom:0px; }  .s1a51eef2e-ef86-4379-b81d-b426f5b93192{color:#000000; text-align:center; vertical-align:middle; border-left:0px; border-right:0px; border-top:0px; border-bottom:0px; }  .s2a51eef2e-ef86-4379-b81d-b426f5b93192{color:#000000;background:#99cc00; text-align:left; vertical-align:middle; border-left:0px; border-right:0px; border-top:0px; border-bottom:0px; }  .f0a51eef2e-ef86-4379-b81d-b426f5b93192{font-family: 宋体; font-size: 9pt;}  .f1a51eef2e-ef86-4379-b81d-b426f5b93192{font-family: 宋体; font-size: 9pt;}  .f2a51eef2e-ef86-4379-b81d-b426f5b93192{font-family: 宋体; font-size: 14pt;font-weight: 700;}  .f3a51eef2e-ef86-4379-b81d-b426f5b93192{font-family: 宋体; font-size: 9pt;font-weight: 700;}  .f4a51eef2e-ef86-4379-b81d-b426f5b93192{font-family: 宋体; font-size: 9pt;font-style: italic;}',
      trConfig: [
        {height: '30'},
        {height: '30'},
        {height: '30'},
        {height: '30'},
        {height: '30'},
        {height: '30'},
        {height: '30'},
        {height: '30'},
        {height: '30'},
      ],
      colWidthConfig: [
        {width: '40'},
        {width: '84'},
        {width: '222'},
        {width: '141'},
        {width: '137'},
        {width: '139'},
        {width: '153'},
      ],
      colLength: 6,
      data: [
        [
          {
            class:
              's1a51eef2e-ef86-4379-b81d-b426f5b93192 f2a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 6,
            rowSpan: 1,
            value: '数据组记录报表',
          },
        ],
        [
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f4a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '起始日期:',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f3a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 2,
            rowSpan: 1,
            value: '2020/09/18 11:28:09',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 137,
            colSpan: 1,
            rowSpan: 1,
            value: '终止日期：',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 139,
            colSpan: 1,
            rowSpan: 1,
            value: '2020/09/18 11:28:17',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
        [
          {
            class:
              's2a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '时间列',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 1,
            rowSpan: 1,
            value: '$Second',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 141,
            colSpan: 1,
            rowSpan: 1,
            value: '$Week',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 137,
            colSpan: 2,
            rowSpan: 2,
            value: {image: '7aa40fd5f9c554e5a9c3e34fd4af072f'},
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
        [
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '2020-09-18 11:28:16',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 1,
            rowSpan: 1,
            value: '16',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 141,
            colSpan: 1,
            rowSpan: 1,
            value: '5',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
        [
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '求和:',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 1,
            rowSpan: 1,
            value: 16,
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 141,
            colSpan: 1,
            rowSpan: 1,
            value: 5,
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 137,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 139,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
        [
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '最大值',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 1,
            rowSpan: 1,
            value: 16,
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 141,
            colSpan: 1,
            rowSpan: 1,
            value: 5,
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 137,
            colSpan: 2,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
        [
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '平均值:',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 1,
            rowSpan: 1,
            value: 16,
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 141,
            colSpan: 1,
            rowSpan: 1,
            value: 5,
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 137,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 139,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
        [
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 141,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 137,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 139,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f0a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
        [
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 84,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 222,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 141,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 137,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f1a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 139,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
          {
            class:
              's0a51eef2e-ef86-4379-b81d-b426f5b93192 f0a51eef2e-ef86-4379-b81d-b426f5b93192',
            width: 153,
            colSpan: 1,
            rowSpan: 1,
            value: '',
          },
        ],
      ],
      Querys: [
        {QueryName: '起始日期', QueryType: '2', Value: '2020/09/18 11:28:09'},
        {QueryName: '终止日期', QueryType: '2', Value: '2020/09/18 11:28:17'},
      ],
      Query: {起始日期: '2020/09/18 11:28:09', 终止日期: '2020/09/18 11:28:17'},
      DataSources: {
        HistoryG: [
          {
            DataSourceName: '1',
            DataSourceExpression:
              ' time >= {Query.起始日期}   and  time <= {Query.终止日期} ',
            NotUseInterval: 'false',
            Interval: {Hour: '0', Minute: '0', Second: '1'},
            HistoryNames: {variable: ['12', '23']},
            ColIndexs: {colIndex: ['Col1', 'Col0']},
          },
        ],
      },
      sqlData: {HistoryG: {'1': [{'12': '16', '23': '5', time: 1600399696}]}},
    },
  })
}, 10000)

const defaultTable = () => {
  const root = document.createElement('div')
  root.id = 'HWReportBrowser_1_1-sh'
  document.body.appendChild(root)
  root.style.width = '500px'
  root.style.height = '400px'

  const options: HaiwellTableProps['options'] = testData as HaiwellTableProps['options']
  return <Table rootDiv={root} options={options} scoket={inst}></Table>
}

storiesOf('Table Component', module).add('Table', defaultTable)

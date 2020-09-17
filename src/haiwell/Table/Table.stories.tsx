import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {testData} from './muck'
import {CellProps, HaiwellTableProps} from './Table'
import Table from './Table'

const defaultTable = () => {
  const root = document.createElement('div')
  document.body.appendChild(root)
  root.style.width = '500px'
  root.style.height = '400px'

  const options: HaiwellTableProps['options'] = {
    data: testData.data as CellProps[][],
    colLength: 6,
    colWidthConfig: [
      {width: '40'},
      {width: '97'},
      {width: '148'},
      {width: '129'},
      {width: '137'},
      {width: '139'},
      {width: '153'},
    ],
    trConfig: [
      {height: '30'},
      {height: '30'},
      {height: '30'},
      {height: '30'},
      {height: '30'},
      {height: '30'},
      {height: '30'},
      {height: '30'},
    ],
    css:
      '.s05f911749-db6f-4e1c-857c-2aa033023b53{color:#000000; text-align:left; vertical-align:middle; border-left:0px; border-right:0px; border-top:0px; border-bottom:0px; }  .s15f911749-db6f-4e1c-857c-2aa033023b53{color:#000000; text-align:center; vertical-align:middle; border-left:0px; border-right:0px; border-top:0px; border-bottom:0px; }  .f05f911749-db6f-4e1c-857c-2aa033023b53{font-family: 宋体; font-size: 9pt;}  .f15f911749-db6f-4e1c-857c-2aa033023b53{font-family: 宋体; font-size: 9pt;}  .f25f911749-db6f-4e1c-857c-2aa033023b53{font-family: 宋体; font-size: 14pt;font-weight: 700;}',
  }
  return <Table rootDiv={root} options={options}></Table>
}

storiesOf('Table Component', module).add('Table', defaultTable)

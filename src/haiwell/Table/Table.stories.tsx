import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {testData} from './muck'
import {CellProps} from './Table'
import Table from './Table'

const defaultTable = () => {
  return (
    <div style={{width: '400px', height: '500px'}}>
      <Table
        data={testData.data as Array<CellProps[]>}
        colWidthConfig={testData.colWidthConfig.length - 1}
      ></Table>
    </div>
  )
}

storiesOf('Table Component', module).add('Table', defaultTable)

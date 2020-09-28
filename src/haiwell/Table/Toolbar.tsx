import React, {FC, useCallback, useContext, useMemo, useState} from 'react'

import Icon, {PrinterOutlined, SearchOutlined} from '@ant-design/icons'

import {ReactComponent as xlxs} from './images/excel.svg'
import {ReactComponent as csv} from './images/csv.svg'
import {ReactComponent as print} from './images/print.svg'

interface ToolbarProps {
  prefixCls: string
  exportXlxsFn: () => void
  exportCsvFn: () => void
  printFn: () => void
}

const Toolbar: FC<ToolbarProps> = (props) => {
  const {prefixCls, exportXlxsFn, exportCsvFn, printFn} = props

  return (
    <div className="report_toolBar">
      <Icon
        component={xlxs}
        className={`${prefixCls}-icon`}
        onClick={exportXlxsFn}
      />
      <Icon
        component={csv}
        className={`${prefixCls}-icon`}
        onClick={exportCsvFn}
      />
      <Icon
        component={print}
        className={`${prefixCls}-icon`}
        onClick={printFn}
      />
    </div>
  )
}

export default Toolbar

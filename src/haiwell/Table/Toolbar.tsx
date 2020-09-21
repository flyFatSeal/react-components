import React, {FC, useCallback, useMemo, useState} from 'react'

import Icon, {PrinterOutlined, SearchOutlined} from '@ant-design/icons'

import {ReactComponent as xlxs} from './images/excel.svg'
import {ReactComponent as csv} from './images/csv.svg'

interface ToolbarProps {}

const Toolbar: FC<ToolbarProps> = (props) => {
  return (
    <div className="report_toolBar">
      <Icon component={xlxs} />
      <Icon component={csv} />
    </div>
  )
}

export default Toolbar

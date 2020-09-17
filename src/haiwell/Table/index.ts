import {HaiwellTableProps, TableProps} from './Table'
import Table from './Table'
import ReactDOM from 'react-dom'

const HaiWellTable = (props: HaiwellTableProps) => {
  const TableInstan = Table({...props})
  ReactDOM.render(TableInstan!, props.rootDiv)
}

export default HaiWellTable

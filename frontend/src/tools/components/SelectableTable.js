import React, { useCallback } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import uniqid from 'uniqid'

const CustomTableCell = ({ value, props }) => (
  <TableCell align="right" {...props}>{value}</TableCell>
)

const CustomTableCells = ({ columns, data, props }) => columns.map(
  (column) => (
    <TableCell key={uniqid()} align="right" {...props}>{data[column.field]}</TableCell>
  )
)

const CustomListItems = ({ columns, listData, handleSelect }) => listData.map(
  (
    data
  ) => {
    const handleClick = useCallback(
      () => handleSelect(data),
      [ handleSelect ]
    )

    return (
      <TableRow key={uniqid()} className="groupList__item" onClick={handleClick}>
        <CustomTableCells columns={columns} data={data}/>
      </TableRow>
    )
  }
)

const CustomTableBody = ({ columns, listData, handleSelect }) => (
  <TableBody>
    <CustomListItems columns={columns} listData={listData} handleSelect={handleSelect}/>
  </TableBody>
)

const CustomTableColumns = ({ columns }) => columns.map((column) => (
  <CustomTableCell key={uniqid()} value={column.title}/>
))

const CustomTableHead = ({ columns }) => (
  <TableHead>
    <TableRow>
      <CustomTableColumns columns={columns}/>
      {/* <TableCell align="right">isActive</TableCell> */}
    </TableRow>
  </TableHead>
)

const CustomTable = ({ columns, listData, handleSelect }) => {

  return (
    <Table>
      <CustomTableHead columns={columns}/>
      <CustomTableBody columns={columns} listData={listData} handleSelect={handleSelect}/>
    </Table>

  )
}

export default CustomTable

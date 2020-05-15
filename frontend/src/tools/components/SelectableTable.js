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

const CustomTableCells = ({ fields, data, props }) => fields.map(
  (field) => (
    <TableCell key={uniqid()} align="right" {...props}>{data[field]}</TableCell>
  )
)

const CustomListItems = ({ fields, listData, handleSelect }) => listData.map(
  (
    data
  ) => {
    const handleClick = useCallback(
      () => handleSelect(data),
      [ handleSelect ]
    )

    return (
      <TableRow key={uniqid()} className="groupList__item" onClick={handleClick}>
        {/* <CustomTableCell value={_id}/>
        <CustomTableCell value={name}/>
        <CustomTableCell value={code}/> */}
        <CustomTableCells fields={fields} data={data}/>
      </TableRow>
    )
  }
)

const CustomTableBody = ({ fields, listData, handleSelect }) => (
  <TableBody>
    <CustomListItems fields={fields} listData={listData} handleSelect={handleSelect}/>
  </TableBody>
)

const CustomTableColumns = ({ columns }) => columns.map((column) => (
  <CustomTableCell key={uniqid()} value={column}/>
))

const CustomTableHead = ({ columns }) => (
  <TableHead>
    <TableRow>
      <CustomTableColumns columns={columns}/>
      {/* <TableCell align="right">isActive</TableCell> */}
    </TableRow>
  </TableHead>
)

const CustomTable = ({ columns, fields, listData, handleSelect }) => {

  return (
    <Table>
      <CustomTableHead columns={columns}/>
      <CustomTableBody fields={fields} listData={listData} handleSelect={handleSelect}/>
    </Table>

  )
}

export default CustomTable

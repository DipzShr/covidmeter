import React, {useState} from 'react';
import { CaretDownOutlined, CaretUpOutlined, } from '@ant-design/icons';
import './index.scss';

const renderData = (data, key) => {
  return (
    <div key={key} className="table-data">
      {data}
    </div>)
}

const sort = (str1, str2) => {
  str1 = String(str1).toLowerCase()
  str2 = String(str2).toLowerCase()
  if (str1 < str2) {
    return -1
  } else if (str2 < str1) {
    return 1
  }
  return 0
}

const DataTable = (props) => {
  const [sortBy, setSortBy] = useState({name: props.sortDefault, asc: true})
  const sortedData = () => {
    const data =  props.data.sort((data1, data2) => sort(data1[sortBy.name], data2[sortBy.name]))
    if (sortBy.asc) {
      return data
    } else {
      return data.reverse()
    }
  }
  
  const handleHeaderClick = (header) => {
    if (!header.sortable) { return }
    const lookupKey = header.lookupKey
    if (sortBy.name === lookupKey) {
      const sortOrder = !sortBy.asc
      setSortBy({name: lookupKey, asc: sortOrder})
    } else {
      setSortBy({name: lookupKey, asc: true})
    }
  }

  const renderSortIcon = (lookupKey) => {
    if (sortBy.name === lookupKey) {
      if (sortBy.asc) {
        return (<CaretUpOutlined />)
      } else {
        return (<CaretDownOutlined />)
      }
    }
  }

  const renderHeader = (header) => {
    return (
      <div key={header.lookupKey} className="header-title" onClick={() => handleHeaderClick(header)}>
        {header.title}
        { renderSortIcon(header.lookupKey) }
      </div>)
  }

  const renderRowData = (rowData) => {
    return (<div key={rowData.country} className="table-row">
      { props.headers.map(header => renderData(rowData[header.lookupKey], header.lookupKey)) }
    </div>)
  }

  return (
    <div className="table">
      <div className="header">
        { props.headers.map(header => renderHeader(header)) }
      </div>
      <div className="body">
        { sortedData().map(rowData => renderRowData(rowData))}
      </div>
    </div>)
}

export default DataTable

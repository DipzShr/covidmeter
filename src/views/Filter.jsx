import React, {useState} from 'react';
import covidService from '../services/covid';
import DataTable from '../components/DataTable';

const tableHeaders = [
  {
    title: 'Country',
    sortable: true,
    lookupKey: 'country',
  },
  {
    title: 'Recovered',
    sortable: true,
    lookupKey: 'recovered',
  },
  {
    title: 'Confirmed',
    sortable: true,
    lookupKey: 'confirmed',
  },
  {
    title: 'Deaths',
    sortable: true,
    lookupKey: 'deaths',
  }
]

const Filter = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');

  const handleDateChange = (event) => {
    const date = event.target.value
    setDate(date)
    if (date) {
      covidService.fetchDateFilteredData(date)
        .then(response => {
          setData(response)
        })
    }
  }

  const renderDataTable = () => {
    if (date) {
      return (<DataTable headers={tableHeaders} data={data} sortDefault='country'/>)
    }
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
        <input type='date' onChange={handleDateChange}/>
      </div>
      { renderDataTable() }
    </div>)
}

export default Filter

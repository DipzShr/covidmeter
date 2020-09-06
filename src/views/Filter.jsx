import React, {useState} from 'react';
import { connect } from 'react-redux';
import covidService from '../services/covid';
import DataTable from '../components/DataTable';
import dateDataActions from '../store/actions/dateData';

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

const Filter = (props) => {

  const handleDateChange = (event) => {
    const date = event.target.value
    props.dispatch(dateDataActions.changeDate(date))
    if (date) {
      covidService.fetchDateFilteredData(date)
        .then(response => {
          props.dispatch(dateDataActions.store(response))
        })
    }
  }

  const renderDataTable = () => {
    if (props.date) {
      return (<DataTable headers={tableHeaders} data={props.data} sortDefault='country'/>)
    }
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
        <input type='date' onChange={handleDateChange} value={props.date}/>
      </div>
      { renderDataTable() }
    </div>)
}

const mapStateToProps = (state) => ({
  date: state.dateData.date,
  data: state.dateData.data,
})

export default connect(mapStateToProps)(Filter)

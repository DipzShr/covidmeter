import React, {useState, useEffect} from 'react';
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

const Home = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    covidService.fetchCountryData()
      .then(response => {
        setData(response)
        setFetchingData(false)
      })
  }, [])

  if (fetchingData) {
    return (
      <div>Loading...</div>)
  }

  return (<DataTable headers={tableHeaders} data={data} sortDefault='country'/>)
}

export default Home

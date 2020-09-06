import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import covidService from '../services/covid';
import countryDataActions from '../store/actions/countryData';
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

const Home = (props) => {
  const [fetchingData, setFetchingData] = useState(false);

  const fetchCountryData = () => {
    setFetchingData(true)
    covidService.fetchCountryData()
      .then(response => {
        setFetchingData(false)
        props.dispatch(countryDataActions.store(response))
      })
  }

  useEffect(() => {
    if (props.data.length === 0) {
      fetchCountryData()
    }
  }, [])

  if (fetchingData) {
    return (
      <div>Loading...</div>)
  }

  return (
    <div>
      <div style={styles.refreshButtonContainer}>
        <span style={styles.refreshButton} onClick={fetchCountryData}>
          Refresh Data
        </span>
      </div>
      <DataTable headers={tableHeaders} data={props.data} sortDefault='country'/>
    </div>)
}

const styles = {
  refreshButtonContainer: {
    textDecoration: 'underline',
    padding: "10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  refreshButton: {
    cursor: 'pointer',
  }
}

const mapStateToProps = (state) => ({
  data: state.countryData,
})

export default connect(mapStateToProps)(Home)

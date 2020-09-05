import React, {useState, useEffect} from 'react';
import Layout from '../components/Layouts/CustomLayout';
import Home from './Home';
import Filter from './Filter';
import covidService from '../services/covid';

const ScreenMapper = {
  Home: Home,
  Filter: Filter
}

const MainView = () => {
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [activeOption, setActiveOption] = useState('Home');
  const [totalData, setTotalData] = useState({
    recovered: '',
    confirmed: '',
    deaths: ''})

  const CurrentScreen = ScreenMapper[activeOption]

  useEffect(() => {
    covidService.fetchTotalCount()
      .then(response =>{
        setTotalData(response)
      })
  }, [])

  return (
    <Layout
      totalData={totalData}
      sidebarOpened={sidebarOpened}
      onMenuClick={() => setSidebarOpened(!sidebarOpened)}
      onMenuOptionClick={(optionName) => setActiveOption(optionName)}
      activeOption={activeOption}
    >
      <CurrentScreen />
    </Layout>)
}

export default MainView;

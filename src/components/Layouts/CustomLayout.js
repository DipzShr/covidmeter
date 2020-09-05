import React from 'react';
import './custom_layout.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, FilterOutlined, } from '@ant-design/icons';

const options = ['Home', 'Filter']

const optionIconMapper = {
  Home: HomeOutlined,
  Filter: FilterOutlined,
}

const headerTitleMapper = {
  recovered: 'Recovered',
  confirmed: 'Confirmed',
  deaths: 'Deaths',
}

const CustomLayout = (props) => {
  const setActiveOptionClass = (optionName)  => {
    if (optionName === props.activeOption) {
      return 'active'
    }
    return ''
  }

  const renderOption = (option) => {
    const Icon = optionIconMapper[option]
    const optionName = (props.sidebarOpened && (<div> {option} </div>))
    return (
      <div
        key={option}
        className={`menu-option ${setActiveOptionClass(option)}`}
        onClick={() => props.onMenuOptionClick(option)}
      >
        <Icon />
        {optionName}
      </div>)
  }

  const openStateClassName = () => {
    if (props.sidebarOpened) {
      return 'open'
    }
    return ''
  }

  const sidebarOpenStateClass = () => {
    if (props.sidebarOpened) {
      return ''
    }
    return 'expanded'
  }

  const hamburgerIcon = () => {
    if (props.sidebarOpened) {
      return <MenuFoldOutlined />
    }
    return <MenuUnfoldOutlined />
  }

  const renderTotalData = (key) => {
    return (
      <div key={key} className="header-data">
        <span className="data-title">{`${headerTitleMapper[key]}: `}</span>
        <span className="data-value">{props.totalData[key]}</span>
      </div>)
  }

  return(
    <div className="container">
      <div className={`sidebar ${openStateClassName()}`}>
        <div className="menu-icon" onClick={props.onMenuClick}>
          { hamburgerIcon() }
        </div>
        <div className="menu-options">
          { options.map(option => renderOption(option))}
        </div>
      </div>
      <div className={`content ${sidebarOpenStateClass()}`}>
        <div className="header">
          { Object.keys(props.totalData).map(key => renderTotalData(key)) }
        </div>
        { props.children }
      </div>
    </div>)
}

export default CustomLayout

import React from 'react';
import './DropdownMenu.css'

const DropdownMenu = (props) => {

  const changeRate= (event) => {
    props.passCurrency(event.target.value);
  }  

  return (
    <div>
      <select className="form-select form-select-sm my-3" id="form-select-custom" onChange={changeRate}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="CNY">CNY</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
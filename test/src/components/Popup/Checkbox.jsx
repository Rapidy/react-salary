import React, { useEffect, useState } from 'react';

export default function Checkbox(props) {
  const [yearPostfix, setYearPostfix] = useState('ый');

  function checkYearPostfix() {
    if (props.year === 2 || props.year === 6 || props.year === 7) {
      setYearPostfix('ой');
    } else if (props.year === 3) {
      setYearPostfix('ий');
    }
  }

  useEffect(() => {
    checkYearPostfix();
  });

  return (
    <li className='popup-overlay-box-list__item'>
      <input
        className='popup-overlay-box-list__item__checkbox'
        type='checkbox'
        id={props.year}
        value={props.children}
      />
      <label className='popup-overlay-box-list__item__label' htmlFor={props.year}>
        {props.children.toLocaleString('ru-Ru')} рублей{' '}
        <span>в {`${props.year}-${yearPostfix}`} год</span>
      </label>
    </li>
  );
}

import React, { useState } from 'react';
import './popup.sass';

import timesIcon from '../../img/times.svg';
import Button from '../Button/Button';
import Checkbox from './Checkbox';

export default function Popup(props) {
  const [toggleCalculate, setToggleCalculate] = useState(false);
  const [salary, setSalary] = useState();
  const [list, setList] = useState([]);

  function onCalculate() {
    setToggleCalculate((prev) => !prev);
    checkTax(salary * 12 * 0.13);
  }

  function onChangeSalary(e) {
    setSalary(e.target.value);
  }

  function checkTax(deduction) {
    let sum = deduction;
    const max = 260000;

    setList([]);
    setList((prev) => [...prev, deduction]);

    while (sum < max) {
      sum += deduction;
      setList((prev) => [...prev, deduction]);
      if (sum + deduction > max) break;
    }

    setList((prev) => [...prev, max - sum]);
  }

  return (
    <div className='popup'>
      <div className='popup-overlay'>
        <div className='popup-overlay-box'>
          <button onClick={props.onClose} className='popup-overlay-box__close'>
            <img src={timesIcon} alt='Кнопка закрытия окна' />
          </button>

          <h1 className='popup-overlay-box__title'>Налоговый вычет</h1>
          <p className='popup-overlay-box__descr'>
            Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового
            вычета составляет не более 13% от своего официального годового дохода.
          </p>

          <label className='popup-overlay-box__label' htmlFor='salary'>
            Ваша зарплата в месяц
          </label>
          <input
            className='popup-overlay-box__input'
            onChange={onChangeSalary}
            type='number'
            id='salary'
            placeholder='Введите данные'
            value={salary}
          />
          <button onClick={onCalculate} className='popup-overlay-box__calculate'>
            Рассчитать
          </button>

          <ul className='popup-overlay-box-list'>
            <h2 className='popup-overlay-box-list__title'>
              Итого можете внести в качестве досрочных:
            </h2>
            {list.length &&
              list.map((item, i) => (
                <Checkbox key={i} year={++i}>
                  {item}
                </Checkbox>
              ))}
          </ul>

          <div className='popup-overlay-box-choice'>
            <span className='popup-overlay-box-choice__title'>Что уменьшаем?</span>

            <input
              className='popup-overlay-box-choice__input'
              type='radio'
              id='payment'
              name='choice'
            />
            <label className='popup-overlay-box-choice__label' htmlFor='payment'>
              Платёж
            </label>

            <input
              className='popup-overlay-box-choice__input'
              type='radio'
              id='period'
              name='choice'
            />
            <label className='popup-overlay-box-choice__label' htmlFor='period'>
              Срок
            </label>
          </div>

          <Button red>Добавить</Button>
        </div>
      </div>
    </div>
  );
}

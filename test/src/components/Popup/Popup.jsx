import React, { useEffect, useRef, useState } from 'react';
import './popup.sass';

import timesIcon from '../../img/times.svg';
import Button from '../Button/Button';
import Checkbox from './Checkbox';
import classNames from 'classnames';

export default function Popup(props) {
  const [isShowedCalculate, setShowCalculate] = useState(false);
  const [salary, setSalary] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [list, setList] = useState([]);

  function onCalculate() {
    const salaryFormated = salary.replace(/[^\d]/g, '');

    if (salaryFormated >= 12500) {
      setShowCalculate(true);
      checkTax(Math.round(salaryFormated * 12 * 0.13));

      setError(false);
      setErrorMessage('');
    } else if (salaryFormated < 12500 && salary !== '') {
      setError(true);
      setErrorMessage('Вы ввели зарплату меньше 12 500');
    } else {
      setError(true);
      setErrorMessage('Поле обязательно для заполнения');
    }
  }

  function onClickAdd() {
    if (!error) {
      props.onClose();
    }
  }

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.setSelectionRange(
      inputRef.current.value.length - 2,
      inputRef.current.value.length - 2,
    );
  }, [salary]);

  function onChangeSalary(e) {
    const moneyFormated = e.target.value.replace(/[^\d]/g, '');
    setSalary(
      (+moneyFormated).toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      }),
    );
  }

  function checkTax(deduction) {
    let sum = deduction;
    const max = 260000;

    setList([]);

    if (deduction >= max) {
      setList([max]);
    } else {
      setList((prev) => [...prev, deduction]);
    }

    while (sum <= max) {
      if (sum + deduction > max) {
        const leftover = max - sum;
        setList((prev) => [...prev, leftover]);
        break;
      } else {
        sum += deduction;
        setList((prev) => [...prev, deduction]);
      }
    }
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
            ref={inputRef}
            className={classNames('popup-overlay-box__input', {
              invalid: error,
            })}
            onChange={onChangeSalary}
            type='text'
            id='salary'
            placeholder='Введите данные'
            value={salary}
            required
          />

          {error && <span className='popup-overlay-box__error'>{errorMessage}</span>}

          <button onClick={onCalculate} className='popup-overlay-box__calculate'>
            Рассчитать
          </button>

          {isShowedCalculate && (
            <>
              <h2 className='popup-overlay-box__deductionTitle'>
                Итого можете внести в качестве досрочных:
              </h2>

              <ul className='popup-overlay-box-list'>
                {list.length &&
                  list.map((item, i) => (
                    <Checkbox key={`${i}_${item}`} year={++i}>
                      {item}
                    </Checkbox>
                  ))}
              </ul>
            </>
          )}

          <div className='popup-overlay-box-choice'>
            <span className='popup-overlay-box-choice__title'>Что уменьшаем?</span>

            <div className='popup-overlay-box-choice-buttons'>
              <input
                className='popup-overlay-box-choice-buttons__input'
                type='radio'
                id='payment'
                name='choice'
              />
              <label
                className='popup-overlay-box-choice-buttons__label'
                htmlFor='payment'>
                Платёж
              </label>
              <input
                className='popup-overlay-box-choice-buttons__input'
                type='radio'
                id='period'
                name='choice'
              />
              <label className='popup-overlay-box-choice-buttons__label' htmlFor='period'>
                Срок
              </label>
            </div>
          </div>

          <Button onClick={onClickAdd} red>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
}

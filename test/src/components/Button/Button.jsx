import React from 'react';
import './button.sass';
import classNames from 'classnames';

export default function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={classNames('btn', {
        'btn--empty': props.empty && !props.disabled,
        'btn--red': props.red && !props.disabled,
      })}>
      {props.children}
    </button>
  );
}

import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const formatSpots = (num) => {
    let result = '';
    if (num === 0) {
      result = 'no spots remaining';
    } else if (num === 1) {
      result = '1 spot remaining';
    } else {
      result = num + ' spots remaining';
    }
    return result;
  };

  const dayClass = classNames('day', {
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

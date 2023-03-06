import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  // Render specific styling for selected day
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });

  // Format spots according to the number (0, 1, or more)
  const formatSpots = () =>
    !props.spots
      ? 'no spots remaining'
      : props.spots === 1
      ? '1 spot remaining'
      : `${props.spots} spots remaining`;

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}

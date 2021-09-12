import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';

const isInRange = (startDate, endDate, compare) =>
  (isAfter(compare, startDate) || isSameDay(startDate, compare)) &&
  (isBefore(compare, endDate) || isSameDay(endDate, compare));

export default isInRange;

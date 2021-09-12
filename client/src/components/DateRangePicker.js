import { useState } from 'react';
import { Form, Input } from 'reactstrap';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

function DateRangePicker({ onDatesChanges, onClear }) {
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
  });
  const [allDate, setDatesSet] = useState(false);
  const { startDate, endDate } = formData;

  const handleDatesChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseISO(value) });
    const otherDate = name === 'startDate' ? endDate : startDate;
    if (otherDate !== null) {
      setDatesSet(true);
      return onDatesChanges({ startDate, endDate });
    }
  };

  const reset = (e) => {
    setFormData({ startDate: null, endDate: null });
    setDatesSet(false);
    if (onClear) return onClear();
  };

  return (
    <>
      {allDate ? (
        <div className=" border-bottom">
          <span>
            {format(startDate, 'dd/MM/yyyy')}-{format(endDate, 'dd/MM/yyyy')}
          </span>
          <i class="fas fa-times ml-2" onClick={reset}></i>
        </div>
      ) : (
        <Form inline onSubmit={onDatesChanges}>
          <Input
            type="date"
            name="startDate"
            onChange={handleDatesChanges}
            placeholder="dd/mm/yyyy"
          />
          <Input
            type="date"
            name="endDate"
            onChange={handleDatesChanges}
            placeholder="dd-mm-yyyy"
          />
        </Form>
      )}
    </>
  );
}

export default DateRangePicker;

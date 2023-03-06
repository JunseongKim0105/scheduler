export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.payload.day };
    case SET_APPLICATION_DATA:
      return { ...state, ...action.payload };
    case SET_INTERVIEW: {
      // Update state based on Web Socket response data
      const appointment = {
        ...state.appointments[action.payload.id],
        interview: { ...action.payload.interview } || null
      };
      const appointments = {
        ...state.appointments,
        [action.payload.id]: appointment
      };

      // METHOD 1:
      // const isEdit = state.appointments[action.payload.id].interview?.interviewer && action.payload.interview ? true : false;
      // const newDays = state.days.map((day) => day.appointments.includes(action.payload.id) && !isEdit ? { ...day, spots: action.payload.interview ? day.spots - 1 : day.spots + 1 } : day);

      // METHOD 2: Calculate spots for a specific day
      const calculatedSpots = (appts) => {
        return appts.reduce((count, val) => appointments[val].interview?.interviewer ? count : count + 1, 0);
      };
      const newDays = state.days.map((day) => day.appointments.includes(action.payload.id) ? { ...day, spots: calculatedSpots(day.appointments) } : day);

      return { ...state, appointments, days: newDays };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type`
      );
  }
}
export function getAppointmentsForDay(state, name) {
  const appt = state.days.find((day) => day.name === name);
  const apptsDetails = appt
    ? appt.appointments.map((day) => state.appointments[day])
    : [];

  return apptsDetails;
}

export function getInterviewersForDay(state, name) {
  const appt = state.days.find((day) => day.name === name);
  const apptsDetails = appt
    ? appt.interviewers.map((day) => state.interviewers[day])
    : [];

  return apptsDetails;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const result = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };

  return result;
}

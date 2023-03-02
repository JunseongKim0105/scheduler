export function getAppointmentsForDay(state, day) {
  let result = [];
  const filteredDay = state.days.filter((listDay) => listDay.name === day);
  if (filteredDay[0]) {
    const listOfAppointments = filteredDay[0].appointments;
    for (let appointment of listOfAppointments) {
      if (state.appointments[appointment]) {
        result.push(state.appointments[appointment]);
      }
    }
  }
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const id = interview.interviewer;
    const interviewer = state.interviewers[id];
    return { ...interview, interviewer };
  }
}

export function getInterviewersForDay(state, day) {
  let result = [];
  const filterDay = state.days.filter((eachDay) => eachDay.name === day);
  if (!filterDay || state.days.length === 0) {
    return result;
  }
  if (filterDay[0]) {
    const listOfInterviewers = filterDay[0].interviewers;
    for (let interviewer of listOfInterviewers) {
      if (state.interviewers[interviewer]) {
        result.push(state.interviewers[interviewer]);
      }
    }
  } else {
    return result;
  }
  return result;
}

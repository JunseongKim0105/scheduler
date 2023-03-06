import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer, {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from '../reducers/application';

const url = process.env.REACT_APP_WEBSOCKET_URL || 'wss://example.com';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`);
  };

  const setDay = (day) => dispatch({ type: SET_DAY, payload: { day } });

  // Get initial data and set up web socket
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        payload: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });

    const exampleSocket = new WebSocket(url, 'protocolOne');
    exampleSocket.onopen = (event) => {
      exampleSocket.send('ping');
    };
    exampleSocket.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      if (updatedData.type === SET_INTERVIEW) {
        dispatch({
          type: SET_INTERVIEW,
          payload: { id: updatedData.id, interview: updatedData.interview },
        });
      }
    };

    return () => {
      exampleSocket.close();
    };
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;

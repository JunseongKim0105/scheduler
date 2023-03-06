import React, { useEffect } from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import { useVisualMode } from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRMATION = 'CONFIRMATION';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Modify state when receive a different props.interview from Web Socket
  useEffect(() => {
    props.interview?.interviewer ? transition(SHOW) : transition(EMPTY);
  }, [props.interview]);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // Transition to confirmation before actually deleting from database
  function confirmation() {
    transition(CONFIRMATION);
  }

  function deleteAppointment() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      {props.time && <Header time={props.time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
          onEdit={() => transition(CREATE)}
          onDelete={confirmation}
        />
      )}
      {mode === CREATE && (
        <Form
          student={props.interview?.student}
          interviewer={props.interview?.interviewer?.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRMATION && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save the appointment!" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment!" onClose={back} />
      )}
    </article>
  );
};

export default Appointment;

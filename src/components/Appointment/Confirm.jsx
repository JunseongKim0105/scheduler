import Button from 'components/Button';
import React from 'react';

const Confirm = (props) => {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>
          Cancel
        </Button>
        <Button onClick={props.onConfirm} danger data-testid="confirm">
          Confirm
        </Button>
      </section>
    </main>
  );
};

export default Confirm;

import { createAction } from 'redux-actions';
import { HANDLE_CHANGE, HANDLE_SUBMIT } from './constants';
import db, { today } from '../../db';

const ref = db.ref(today);

export const handleChange = createAction(HANDLE_CHANGE, (name, value) => ({
  name,
  value,
}));

export const handleSubmit = () => (dispatch, getState) => {
  const order = {
    date: today,
    memberId: getState().auth.user.id,
    memberName: getState().auth.user.name,
    order: getState().form.order,
    timestamp: Date.now(),
  };

  ref.child('orders')
    .push()
    .set(order);
  
  return dispatch({
    type: HANDLE_SUBMIT,
  });
};

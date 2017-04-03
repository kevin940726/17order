import store from '../store';
import { List } from 'immutable';

const createBinding = ({
  list,
  onceValue,
  onChildAdded,
  onChildRemoved,
  onChildChanged,
  isLoading,
}) => ({
  bind(ref) {
    ref.off();

    ref.limitToLast(1)
      .once('value')
      .then(() => {
        store.dispatch({
          type: onceValue,
        });
      });

    ref.on('child_added', (snapshot) => {
      store.dispatch({
        type: onChildAdded,
        payload: {
          ...snapshot.val(),
          key: snapshot.key,
        },
      });
    });

    ref.on('child_removed', (snapshot) => {
      store.dispatch({
        type: onChildRemoved,
        payload: snapshot.key,
      });
    });

    ref.on('child_changed', (snapshot) => {
      store.dispatch({
        type: onChildChanged,
        payload: {
          ...snapshot.val(),
          key: snapshot.key,
        },
      });
    });
  },

  getReducer() {
    return {
      [onceValue]: state => ({
        ...state,
        [isLoading]: false,
      }),

      [onChildAdded]: (state, action) => ({
        ...state,
        [list]: state[list].unshift(action.payload),
      }),

      [onChildRemoved]: (state, action) => ({
        ...state,
        [list]: state[list].delete(
          state[list].findIndex(item => item.key === action.payload)
        ),
      }),

      [onChildChanged]: (state, action) => ({
        ...state,
        [list]: state[list].set(
          state[list].findIndex(item => item.key === action.payload.key),
          action.payload
        ),
      }),
    };
  },

  getInitialState() {
    return {
      [list]: List(),
      [isLoading]: true,
    };
  },
});

export default createBinding;

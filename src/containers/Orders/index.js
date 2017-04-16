import { connect } from 'react-redux';
import Orders from './component';
import { removeAction, changeView } from './actions';
import { editOrder } from '../Form/actions';
import { ORDERS_LIST, IS_LOADING } from './constants';
import { currentMenuSelector } from '../CurrentMenu/selectors';

const mapStateToProps = state => ({
  orders: state.orders[ORDERS_LIST],
  isLoading: state.orders[IS_LOADING],
  uid: state.auth.user && state.auth.user.id,
  type: currentMenuSelector(state).type,
  view: state.orders.view,
});

const mapDispatchToProps = dispatch => ({
  editOrder(key) {
    return (e) => {
      e.preventDefault();

      dispatch(editOrder(key));
    };
  },

  removeOrder(key) {
    return (e) => {
      e.preventDefault();

      dispatch(removeAction(key));
    };
  },

  changeView(view) {
    return () => {
      dispatch(changeView(view));
    };
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

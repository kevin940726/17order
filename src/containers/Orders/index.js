import { connect } from 'react-redux';
import Orders from './component';
import { removeAction } from './actions';
import { editOrder } from '../Form/actions';
import { ORDERS_LIST, IS_LOADING } from './constants';
import { currentMenuSelector } from '../CurrentMenu/selectors';

const mapStateToProps = state => ({
  orders: state.orders[ORDERS_LIST],
  isLoading: state.orders[IS_LOADING],
  uid: state.auth.user && state.auth.user.id,
  type: currentMenuSelector(state).type,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

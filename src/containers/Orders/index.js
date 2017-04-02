import { connect } from 'react-redux';
import Orders from './component';
import { getOrders, removeAction } from './actions';
import { editOrder } from '../Form/actions';

const mapStateToProps = state => ({
  orders: state.orders.orders,
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getOrders() {
    dispatch(getOrders());
  },

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

import { connect } from 'react-redux';
import Orders from './component';
import { getOrders } from './actions';

const mapStateToProps = state => ({
  orders: state.orders.orders,
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getOrders() {
    dispatch(getOrders());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

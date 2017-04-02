import React, { Component, PropTypes } from 'react';
import TimeAgo from '../../components/TimeAgo';

const Header = () => (
  <tr>
    <th>Date</th>
    <th>Member</th>
    <th>Order</th>
    <th>Timeago</th>
  </tr>
);

class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
  };

  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const { orders, isLoading } = this.props;

    return (
      <table className="table">
        <thead>
          <Header />
        </thead>
        <tfoot>
          <Header />
        </tfoot>
        <tbody>
          {isLoading ? (
            <tr><td>{'Loading...'}</td></tr>
          ) : (
            orders.map((order, i) => (
              <tr key={i}>
                <td>{order.date}</td>
                <td>{order.memberName}</td>
                <td>{order.order}</td>
                <td>
                  <TimeAgo date={order.timestamp} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

export default Orders;

import React from 'react';
import styled from 'styled-components';
import TimeAgo from '../../components/TimeAgo';

const Header = () => (
  <tr>
    <th>Date</th>
    <th>Member</th>
    <th>Order</th>
    <th>Last Update</th>
    <th></th>
  </tr>
);

const Tr = styled.tr`
  td:last-child {
    opacity: 0;
  }

  &:hover td:last-child {
    opacity: 1;
  }
`;

const Orders = ({ orders, isLoading, removeOrder, editOrder, uid }) => (
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
        orders.map(order => (
          <Tr key={order.key}>
            <td>{order.date}</td>
            <td>{order.memberName}</td>
            <td>{order.order}</td>
            <td>
              <TimeAgo date={order.timestamp} />
            </td>
            {uid === order.memberId ? (
              <td>
                <a onClick={editOrder(order.key)}>
                  <span className="icon">
                    <i className="fa fa-pencil"></i>
                  </span>
                </a>
                <a onClick={removeOrder(order.key)}>
                  <span className="icon">
                    <i className="fa fa-times"></i>
                  </span>
                </a>
              </td>
            ): (<td />)}
          </Tr>
        ))
      )}
    </tbody>
  </table>
);

export default Orders;

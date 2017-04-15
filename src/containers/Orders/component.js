import React from 'react';
import styled from 'styled-components';
import TimeAgo from '../../components/TimeAgo';
import { sizeDict, sugarDict, iceDict } from '../../utils/dicts';

const getFields = type => [
  { label: 'Date', getValue: order => order.date },
  { label: 'Member', getValue: order => order.memberName },
  { label: 'Order', getValue: order => order.order },
  ...(type === 'beverages' ? [
    { label: 'Size', getValue: order => sizeDict.get(order.size) },
    { label: 'Sugar', getValue: order => sugarDict.get(order.sugar) },
    { label: 'Ice/Hot', getValue: order => iceDict.get(order.ice) },
  ]: []),
  { label: 'Last Update', getValue: order => (<TimeAgo date={order.timestamp} />) },
];

const Header = ({ type }) => (
  <tr>
    {getFields(type).map(field => (
      <th key={field.label}>{field.label}</th>
    ))}
    <th />
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

const Orders = ({ orders, isLoading, removeOrder, editOrder, uid, type }) => (
  <table className="table">
    <thead>
      <Header type={type} />
    </thead>
    <tbody>
      {isLoading ? (
        <tr><td>{'Loading...'}</td></tr>
      ) : (
        orders.map(order => (
          <Tr key={order.key}>
            {getFields(type).map(field => (
              <td key={field.label}>{field.getValue(order)}</td>
            ))}
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
    {orders.size >= 5 && (
      <tfoot>
        <Header type={type} />
      </tfoot>
    )}
  </table>
);

export default Orders;

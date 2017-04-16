import React from 'react';
import TimeAgo from '../../../components/TimeAgo';
import { sizeDict, sugarDict, iceDict } from '../../../utils/dicts';
import Tr from './Tr';

const getFields = type => [
  { label: 'Order', getValue: order => order.order },
  { label: 'Member', getValue: order => order.memberName },
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
      <th
        className={field.label === 'Last Update' && 'is-hidden-mobile'}
        key={field.label}
      >
        {field.label}
      </th>
    ))}
    <th />
  </tr>
);

const ListView = ({ orders, editOrder, removeOrder, type, uid, isLoading }) => (
  <table className="table is-striped">
    <thead>
      <Header type={type} />
    </thead>
    <tbody>
      {isLoading && (
        <tr><td>{'Loading...'}</td></tr>
      )}
      {orders.map(order => (
        <Tr key={order.key}>
          {getFields(type).map(field => (
            <td 
              className={field.label === 'Last Update' && 'is-hidden-mobile'}
              key={field.label}
            >
              {field.getValue(order)}
            </td>
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
      ))}
    </tbody>
    {orders.size > 5 && (
      <tfoot>
        <Header type={type} />
      </tfoot>
    )}
  </table>
);

export default ListView;

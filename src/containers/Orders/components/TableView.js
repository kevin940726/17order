import React from 'react';
import { sizeDict, sugarDict, iceDict } from '../../../utils/dicts';

const getFields = type => [
  {
    label: 'Order',
    value: 'order',
    getComponent: (order, index, rows) => (
      index === 0 && (<td key="order" rowSpan={rows.size}>{order.order}</td>) 
    ),
  },
  ...(type === 'beverages' ? [
    {
      label: 'Size',
      value: 'size',
      getComponent: order => (<td key="size">{sizeDict.get(order.size)}</td>),
    },
    {
      label: 'Sugar',
      value: 'sugar',
      getComponent: order => (<td key="sugar">{sugarDict.get(order.sugar)}</td>),
    },
    {
      label: 'Ice/Hot',
      value: 'ice',
      getComponent: order => (<td key="ice">{iceDict.get(order.ice)}</td>),
    },
  ]: []),
  {
    label: 'Amount',
    getComponent: order => (<td key="amount">{order.amount}</td>),
  },
];

const groupOrders = (orders, groupers) => {
  if (!groupers.length) {
    return {
      ...orders.first(),
      // calculate the amount of the same order
      amount: orders.size,
    };
  }

  return orders.groupBy(order => order[groupers[0]])
    .map((group, value) => groupOrders(group, groupers.slice(1)))
    .toList()
};

const Header = ({ type }) => (
  <tr>
    {getFields(type).map(field => (
      <th key={field.label}>{field.label}</th>
    ))}
  </tr>
);

const TableView = ({ orders, type, isLoading }) => (
  <table className="table is-striped">
    <thead>
      <Header type={type} />
    </thead>
    <tbody>
      {isLoading && (
        <tr><td>{'Loading...'}</td></tr>
      )}
      {groupOrders(
        orders,
        getFields(type)
          .map(field => field.value)
          .slice(0, -1)
      )
        .map(group => (
          group
            .flatten()
            .map((order, index, rows) => (
              <tr key={order.key}>
                {getFields(type).map(field => field.getComponent(order, index, rows))}
              </tr>
            ))
        ))
      }
    </tbody>
    {orders.size > 5 && (
      <tfoot>
        <Header type={type} />
      </tfoot>
    )}
  </table>
);

export default TableView;

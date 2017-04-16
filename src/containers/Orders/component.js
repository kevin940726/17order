import React from 'react';
import ListView from './components/ListView';
import TableView from './components/TableView';

const Orders = ({ orders, isLoading, removeOrder, editOrder, uid, type, view, changeView }) => {
  const View = view === 'table' ? TableView : ListView;

  return (
    <div>
      <div className="tabs">
        <ul>
          <li className={view === 'list' && 'is-active'}>
            <a onClick={changeView('list')}>List</a>
          </li>
          <li className={view === 'table' && 'is-active'}>
            <a onClick={changeView('table')}>Table</a>
          </li>
        </ul>
      </div>

      <View
        orders={orders}
        editOrder={editOrder}
        removeOrder={removeOrder}
        type={type}
        uid={uid}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Orders;

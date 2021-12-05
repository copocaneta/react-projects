import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Create a order Context

const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // we need to stick state in here
  const [order, setOrder] = useState([])
  return <OrderContext.Provider value={[order, setOrder]}>
    {children}
  </OrderContext.Provider>
}

OrderProvider.propTypes = {
  children: PropTypes.object,
}

export default OrderContext;
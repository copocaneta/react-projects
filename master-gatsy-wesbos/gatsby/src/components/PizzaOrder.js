import React from 'react';
import PropTypes from 'prop-types';
import MenuItemStyles from '../styles/MenuItemStyles';
import Img from 'gatsby-image'
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder}) {

  return <>

  <p>Order</p>
  <p>You have {order.length} item{order.length > 1 ? 's' : ''} in your order.</p>
  {order.map((singleOrder, index) => {
    const pizza = pizzas.find(pizza => pizza.id === singleOrder.id);
    return (
      <MenuItemStyles key={`${singleOrder.id}-${index}`}>
        <Img fluid={pizza.image.asset.fluid}></Img>
        <h2>{pizza.name}</h2>
        <p>
          {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
          <button type="button"
           className="remove"
           title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
           onClick={() => removeFromOrder(index)}
           >
             &times;
          </button>
        </p>
      </MenuItemStyles>
    )
  })}

  </>

}

PizzaOrder.propTypes = {
  order: PropTypes.array,
  pizzas: PropTypes.array,
  removeFromOrder: PropTypes.func
}
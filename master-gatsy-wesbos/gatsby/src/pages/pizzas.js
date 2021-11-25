import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({data, pageContext}) {
  // console.log(data.pizzas);
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <ToppingsFilter activeTopping={pageContext.topping}/>
      <PizzaList pizzas={pizzas}/>
    </>
  );
}

export const query = graphql`
  # Query for topping with 'in'
  # query PizzaQuery($topping: [String]) {
  # Query for topping with regex
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(filter: {
      toppings: {
        elemMatch: {
          name: {
            # Using 'in'
            # in: $topping
            # Using regex:
            regex: $toppingRegex
          }
        }
      }
    }) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200){
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;


PizzasPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.string
}
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    /* &.active {
      background: var(--yellow);
    } */
    &[aria-current="page"] {
      background: var(--yellow);
    }
  }
`

function countPizzasInToppings(pizzas) {
  // Return the pizzas with counts
  const counts = pizzas.map(pizza => pizza.toppings)
  .flat()
  .reduce((acc, topping) => {
    // check if this is an existin topping
    const existingTopping = acc[topping.id];
    if(existingTopping) {
      // if it is then increment it by 1
      existingTopping.count += 1;
    } else {
      // otherwise create a new entry in our accumulator
      acc[topping.id] = {
        id: topping.id,
        name: topping.name,
        count: 1
      }
    }
    return acc;
  }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  )
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  // Get a list of all the pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  console.clear();
  // console.log({toppings, pizzas})
  // Count how many pizzas are in each Toppping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts)
  // Loop over the list of toppings and display topping and the count of pizzas in that topping
  // Link it up
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map(topping => (
        <Link to={`/topping/${topping.name}`} key={topping.id} className={topping.name === activeTopping ? 'active' : '' }>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
      {/* <p>Toppings</p> */}
    </ToppingsStyles>
  )
}

ToppingsFilter.propTypes = {
  activeTopping: PropTypes.string,
}
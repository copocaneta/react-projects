import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

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

export default function ToppingsFilter() {
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
    <div>
      <p>Toppings</p>
    </div>
  )
}
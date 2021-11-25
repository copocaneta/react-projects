import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const PizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach(pizza => {
    // console.log('Creating a page for ', pizza.name);
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: PizzaTemplate,
      context: {
        slug: pizza.slug.current,
      }
    })
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // console.log(`Turning the Toppings into pages!!`)
  // 1. Get the Template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  // 2. Query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that topping
  data.toppings.nodes.forEach(topping => {
    // console.log(`Creating page for topping ${topping.name}`);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for topping
        toppingRegex: `/${topping.name}/i`,
      }
    })
  })
  // 4. Pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // 1. Fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  console.log(beers);
  // 2. Loop over each one
  for (const beer of beers) {
    // I was not getting the beers rating for some reason, then I went to the course's slack
    // channel and found out this is an issue with the Beers API.
    // To fix the issue where no beer ratings are not being generated, please add this:
    if (!beer.rating.average) return;
    // Everything else is ok:
    // create a node for each beer
    // we need to create this metadata about our node:
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json', //
        contentDigest: createContentDigest(beer),
      }
    };
    // now we need take our actions
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta
    })

  }


}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API!
  await Promise.all([
    fetchBeersAndTurnIntoNodes(params)
  ]);
}

export async function createPages (params) {
  // Create pages dynamically
  // Wait for all Promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params)
  ])
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}

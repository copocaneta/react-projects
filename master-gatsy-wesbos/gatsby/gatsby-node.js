import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';
import { parsePath } from 'gatsby';

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
  // console.log(beers);
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

async function turnSliceMastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)
  // TODO: 2. Turn each slicemaster into their own page (TODO)
  data.slicemasters.nodes.forEach(slicemaster => (
    actions.createPage({
      component: path.resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        slug: slicemaster.slug.current,
        name: slicemaster.name,
      }
    })
  ));
  // 3. Figure out how many pages there are based on how many slicemasters there are and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(`There are ${data.slicemasters.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page.`);
  // 4. Loop from 1 to n (pages that we have)
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i+1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    })
  })
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
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params)
  ])
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}

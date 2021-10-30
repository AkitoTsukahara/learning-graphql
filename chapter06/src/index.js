import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'
import { request } from 'graphql-request'

const cache = new InMemoryCache()
persistCache({
    cache,
    storage: localStorage
})

if (localStorage['apollo-cache-persist']) {
  let cacheData = JSON.parse(localStorage['apollo-cache-persist'])
  cache.restore(cacheData)
}

const client = new ApolloClient({ 
  uri: 'http://localhost:4000/graphql'
  // cache,
  // uri: 'http://localhost:4000/graphql', 
  // request: operation => {
  //     operation.setContext(context => ({
  //         headers: {
  //             ...context.headers,
  //             authorization: localStorage.getItem('token')
  //         }
  //     }))
  // }
})

const query = gql`
{
  totalUsers
  totalPhotos
}
`
client.query({query})
  .then(({ data }) => console.log('data', data))
  .catch(console.error)

let url = 'http://localhost:4000/graphql'
let mutation = `
  mutation populate($count: Int!) {
    addFakeUsers(count:$count) {
      name
    }
  }
`

let variables = { count: 3 }

request(url, mutation, variables)
  .then(console.log)
  .catch(console.error)




ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

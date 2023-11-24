import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import List from './List'

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false
    }),
    uri: "http://localhost:4000/graphql"
  })
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>
          User List:
        </h1>
        <List />
      </div>
    </ApolloProvider>
  )
}

export default App

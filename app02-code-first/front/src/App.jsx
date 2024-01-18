import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/Header";
import Home from "./components/Home";
import Project from "./components/Project";
import NotFound from "./components/NotFound";

const client = new ApolloClient({
  uri: process.env.VITE_API_URI,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects/:id' element={<Project />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App

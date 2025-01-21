import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PokemonTable from './pages/PokemonTable';
import DetailsPage from './pages/DetailsPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<PokemonTable />} />
        <Route path="/pokemons/:pokemonId" element={<DetailsPage />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;
import React, { useState } from 'react';
import { Card, Pagination, Spin, Tag } from 'antd';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PokemonTable.css';

const fetchPokemonList = async (offset, limit) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  return Promise.all(
    res.data.results.map(async (pokemon, index) => {
      const detailRes = await axios.get(pokemon.url);
      return {
        id: offset + index + 1,
        name: detailRes.data.name,
        image: detailRes.data.sprites.other['official-artwork'].front_default,
        types: detailRes.data.types.map((typeInfo) => typeInfo.type.name),
        url: `/pokemons/${offset + index + 1}`,
      };
    })
  );
};

const PokemonTable = () => {
  const [currentPage, setCurrentPage] = useState(1); // Manage page state dynamically
  const pageSize = 12;

  // Fetch data based on the page offset
  const { data: pokemonList = [], isLoading, isFetching } = useQuery(
    ['pokemonList', (currentPage - 1) * pageSize], // Fetch data based on current page
    () => fetchPokemonList((currentPage - 1) * pageSize, pageSize),
    {
      staleTime: 600000,
      refetchOnWindowFocus: false,
    }
  );

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page when pagination changes
  };

  if (isLoading || isFetching) {
    return <Spin tip="Loading Pokémon data..." className="loading-spinner" />;
  }

  return (
    <div className="pokemon-container">
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.id}
            hoverable
            cover={
              <img
                alt={pokemon.name}
                src={pokemon.image}
                className="pokemon-image"
              />
            }
            className="pokemon-card"
          >
            <Card.Meta
              title={
                <Link to={pokemon.url} className="pokemon-link">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Link>
              }
              description={
                <div>
                  <strong>Type:</strong>{' '}
                  {pokemon.types.map((type) => (
                    <Tag color="geekblue" key={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Tag>
                  ))}
                </div>
              }
            />
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={1118} 
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default PokemonTable;





// import React, { useState, useEffect } from 'react';
// import { Card, Pagination, Spin, Tag } from 'antd';
// import { useQuery, useQueryClient } from 'react-query';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './PokemonTable.css';

// const fetchPokemonList = async (offset, limit) => {
//   const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
//   return Promise.all(
//     res.data.results.map(async (pokemon, index) => {
//       const detailRes = await axios.get(pokemon.url);
//       return {
//         id: offset + index + 1,
//         name: detailRes.data.name,
//         image: detailRes.data.sprites.other['official-artwork'].front_default,
//         types: detailRes.data.types.map((typeInfo) => typeInfo.type.name),
//         url: `/pokemons/${offset + index + 1}`,
//       };
//     })
//   );
// };

// const PokemonTable = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 12;

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const nextOffset = currentPage * pageSize;
//     queryClient.prefetchQuery(['pokemonList', nextOffset], () =>
//       fetchPokemonList(nextOffset, pageSize)
//     );
//   }, [currentPage, pageSize, queryClient]);

//   const { data: pokemonList = [], isLoading } = useQuery(
//     ['pokemonList', (currentPage - 1) * pageSize],
//     () => fetchPokemonList((currentPage - 1) * pageSize, pageSize),
//     {
//       staleTime: 600000,
//       refetchOnWindowFocus: false,
//     }
//   );

//   const handlePageChange = (page) => setCurrentPage(page);

//   if (isLoading) {
//     return <Spin tip="Loading Pokémon data..." className="loading-spinner" />;
//   }

//   return (
//     <div className="pokemon-container">
//       <div className="pokemon-grid">
//         {pokemonList.map((pokemon) => (
//           <Card
//             key={pokemon.id}
//             hoverable
//             cover={
//               <img
//                 alt={pokemon.name}
//                 src={pokemon.image}
//                 className="pokemon-image"
//               />
//             }
//             className="pokemon-card"
//           >
//             <Card.Meta
//               title={
//                 <Link to={pokemon.url} className="pokemon-link">
//                   {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
//                 </Link>
//               }
//               description={
//                 <div>
//                   <strong>Type:</strong>{' '}
//                   {pokemon.types.map((type) => (
//                     <Tag color="geekblue" key={type}>
//                       {type.charAt(0).toUpperCase() + type.slice(1)}
//                     </Tag>
//                   ))}
//                 </div>
//               }
//             />
//           </Card>
//         ))}
//       </div>
//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={1118}
//         onChange={handlePageChange}
//         style={{ marginTop: '20px', textAlign: 'center' }}
//       />
//     </div>
//   );
// };

// export default PokemonTable;




// import React from 'react';
// import { Table} from 'antd';
// import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import axios from 'axios';

// const fetchPokemonList = async () => {
//   const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
//   return res.data.results.map((pokemon, index) => ({
//     key: index + 1,
//     name: pokemon.name,
//     url: pokemon.url,
//   }));
// };

// const PokemonTable = () => {
//   const { data: pokemonList = [], isLoading } = useQuery('pokemonList', fetchPokemonList, {
//     staleTime: 600000, 
//     refetchOnWindowFocus: false, 
//   });

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'key',
//       key: 'key',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (name, record) => <Link to={`/pokemons/${record.key}`}>{name}</Link>,
//     },
//   ];

//   return (
//     <div style={{
//       padding: '20px',
//       backgroundColor: '#e6f7ff', 
//       borderRadius: '10px', 
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
//     }}>
//       <center>
//       <h1>Pokemon List</h1>
//       </center>
//       <Table
//         dataSource={pokemonList}
//         columns={columns}
//         loading={isLoading}
//         pagination={{ pageSize: 10 }}
//         style={{
//           backgroundColor: '#f0f0f0', 
//           borderRadius: '10px', 
//           padding: '10px', 
//           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
//         }}
//       />
//     </div>
//   );
// };

// export default PokemonTable;
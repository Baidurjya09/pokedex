import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useQuery } from 'react-query';
import { fetchPokemonDetails } from '../api/pokemonApi';

const DetailsPage = () => {
  const { pokemonId } = useParams();
  const { data, isLoading, isError } = useQuery(['pokemonDetails', pokemonId], () =>
    fetchPokemonDetails(pokemonId)
  );

  if (isLoading) {
    return <Spin tip="Loading Pokémon details..." />;
  }

  if (isError) {
    return <Alert message="Error fetching Pokémon details" type="error" />;
  }

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card
        title={data.name.charAt(0).toUpperCase() + data.name.slice(1)}
        bordered={false}
        style={{ width: 400 }}
        cover={
          <img
            alt={data.name}
            src={data.sprites.other['official-artwork'].front_default} 
            style={{ width: '100%', height: 'auto' }} 
          />
        }
      >
        <p>
          <b>Height:</b> {data.height}
        </p>
        <p>
          <b>Weight:</b> {data.weight}
        </p>
        <p>
          <b>Base Experience:</b> {data.base_experience}
        </p>
        <p>
          <b>Abilities:</b>{' '}
          {data.abilities.map((ability) => ability.ability.name).join(', ')}
        </p>
      </Card>
    </div>
  );
};

export default DetailsPage;

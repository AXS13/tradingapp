import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(12);
  const globalStats = data?.data?.stats;

  if(isFetching) return 'Loading...';

  return (
    <>
      <Title level={2} className='heading'>Statistiques Globales</Title>
      <Row>
        <Col span={12}><Statistic title='Nombre de Cryptomonnaies' value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Nombre d'Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title='Capitalisation Boursière Totale (USD)' value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title='Volume Total (24h / USD)' value={millify(globalStats.total24hVolume)} /></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 12 des Cryptomonnaies</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Afficher plus</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Les dernières infos</Title>
        <Title level={3} className='show-more'><Link to='/news'>Afficher plus</Link></Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage
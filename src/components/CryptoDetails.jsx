import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
 
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;
  
  if(isFetching) return 'Loading...';

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
 
  const stats = [
    { title: 'Prix en USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rang', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Symbole', value: cryptoDetails?.symbol, icon: <ThunderboltOutlined /> },
    { title: 'Cap. Boursière', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'Plus Haut Point', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Nombre de Marchés', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: "Nombre d'Exchanges", value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Quantité Approuvée', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Quantité Totale', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Quantité en Circulation', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          { cryptoDetails?.name } ({ cryptoDetails?.symbol })
        </Title>
        <p>
          Analysez les statistiques, la capitalisation boursière, les courbes et plus encore...
        </p>
      </Col>
      <Select defaultValue='7d' className='select-timeperiod' placeholder="Sélectionnez l'unité de temps" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Statistiques | {cryptoDetails?.name}
            </Title>
            <p>
              Un condensé montrant les statistiques de {cryptoDetails?.name}
            </p>
          </Col>
          {stats.map(({icon, title, value}) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Statistiques des Marchés | {cryptoDetails?.name}
            </Title>
            <p>
              Un condensé montrant les statistiques des Marchés de {cryptoDetails?.name}
            </p>
          </Col>
          {genericStats.map(({icon, title, value}) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails?.name} ?
          </Title>
          {HTMLReactParser(cryptoDetails?.description)}
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails;


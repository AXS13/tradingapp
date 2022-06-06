import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Chart from 'chart.js/auto';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Filler, TimeScale } from 'chart.js';
import "chartjs-adapter-moment"; 
ChartJS.register( LinearScale, TimeScale, PointElement, Filler, LineElement, Tooltip );

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: 'Prix en USD',
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: '#032677',
        borderColor: '#BDBABA',
      },
    ],
  };

  const options = {
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        },
      },
    },
  };



  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Fluctuation: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Prix actuel de {coinName} : {currentPrice} $</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News, Calculs } from './components';
import './App.css';

const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className='main'>
            <Layout>
                <div className='routes'>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route exact path='/exchanges' element={<Exchanges />} />
                        <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />} />
                        <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
                        <Route exact path='/news' element={<News />} />
                        <Route exact path='/calculs' element={<Calculs />} />
                    </Routes>
                </div>
            </Layout>
        
            <div className='footer'>
                <Typography.Title level={5} style={{ color: '#032677', textAlign: 'center' }}>
                    Trading Companion <br />
                </Typography.Title>
                <Space>
                    <Link to='/'>Accueil</Link>
                    <Link to='/exchanges'>Outils</Link>
                    <Link to='/news'>Actualités</Link>
                </Space>
            </div>
        </div>
    </div>
  )
}

export default App
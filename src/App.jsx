import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import CampaignScreen from './pages/CampaignScreen';
import CallsScreen from './pages/CallsScreen';
import { Layout } from 'antd';
import MenuList from './components/MenuList';
import Logo from './components/Logo';


const { Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  className="sidebar">
          <Logo />
          <MenuList />
        </Sider>
        <Layout className="bg-black border-8 border-black min-h-screen" style={{ marginLeft: 10 }}>
        <Content className="p-4">
        <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/campaign" element={<CampaignScreen />} />
              <Route path="/calls" element={<CallsScreen />} />

              
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

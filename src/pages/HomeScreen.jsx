// src/screens/HomeScreen.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Logo from '../components/Logo';
import MenuList from '../components/MenuList';
const {Header,Sider} = Layout;
import axios from '../../api'

function HomeScreen() {
  return (
    <div >Home Screen</div>
  );
}

export default HomeScreen;

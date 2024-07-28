import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined ,MutedOutlined, LockOutlined, BorderOutlined, SettingOutlined, SoundOutlined, PhoneOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function MenuList() {

  const handleHomeClick = () => {
    console.log("Campaign clicked");
  };


  const handleCampaignClick = () => {
    console.log("Campaign clicked");
  };

  const handleMenuClick = ({ key }) => {
    console.log(`${key} clicked`);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <Menu theme="dark" mode="inline" className="custom-menu">
        <Menu.Item key="home" icon={<HomeOutlined />} className="menu-item">
          <Link to="/" className="menu-text">HOME</Link>
        </Menu.Item>
        <Menu.Item key="campaign" icon={<MutedOutlined />} className="menu-item">
          <Link to="/campaign" className="menu-text">CAMPAIGN</Link>
        </Menu.Item>
        <Menu.Item key="apikey" icon={<LockOutlined />} className="menu-item">
          <Link to="/apikey" className="menu-text">API KEY</Link>
        </Menu.Item>
        <Menu.Item key="phone" icon={<PhoneOutlined />} className="menu-item">
          <Link to="/calls" className="menu-text">CALLS</Link>
        </Menu.Item>
        <Menu.Item key="playground" icon={<BorderOutlined />} className="menu-item">
          <Link to="/playground" className="menu-text">PLAYGROUND</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />} className="menu-item">
          <Link to="/settings" className="menu-text">SETTINGS</Link>
        </Menu.Item>
      </Menu>
    </div>
);
}


export default MenuList

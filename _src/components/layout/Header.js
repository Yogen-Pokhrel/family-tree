import React, { useState } from 'react'
import { Menu } from 'antd';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => {
    const [current,setCurrent] = useState('home');

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
      };

  return (
    <header>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/" >Tree View</Link>
        </Menu.Item>
      </Menu>
    </header>
  )
}

export default Header
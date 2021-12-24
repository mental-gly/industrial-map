import React from "react";
import 'antd/dist/antd.css';
import Mdata
 from "./mdata";
 
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {HashRouter as Router,Route,Routes,Link} from 'react-router-dom'
import Demo from "./map";
import Login from "./login";

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const mykey1 = '40ee46a7e920aea22e5e1df91a1b96aa';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: 2,
    };
  }
  

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}onSelect ={(item)=>{
              this.setState({
                selected: item.key,
              })
          }}>

            <Menu.Item key="1">修改数据</Menu.Item>
            <Menu.Item key="2">企业</Menu.Item>
            <Menu.Item key="3">技术中心</Menu.Item>
            <Menu.Item key="4">产业基地</Menu.Item>
          </Menu>
        </Header>
        
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          
          
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
           
            {(this.state.selected=='1') && <Mdata />}
            {(this.state.selected=='2') && <Demo en_type="企业"/>}
            {(this.state.selected=='3') && <Demo en_type="技术中心"/>}
            {(this.state.selected=='4') && <Demo en_type="产业基地"/>}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Industrial Map  ©2021 Created by G9</Footer>
      </Layout>
    );
  }
}

export default Nav;
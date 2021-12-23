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
        chosen_province: null,
        chosen_material: null,
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
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          
          
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
           
            {(this.state.selected=='1') && <Mdata />}
            {(this.state.selected=='2') && <Demo />}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default Nav;
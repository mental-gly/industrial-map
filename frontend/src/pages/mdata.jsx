
import { Input,Radio,Button,Layout,Form,Select,Breadcrumb} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Menter from './menter';
import Mmat from './mmat';



const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Mdata extends React.Component{
    formRef = React.createRef();

    constructor(props){
        super(props)
        this.state = {
           
        };

    }
   
 
    
    
    render(){
        
        
            return (
                <Layout >
                    <div >
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>修改数据</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={11}>
                            企业
                            <Menter/>
                        </Col>
                        <Col span={11}>
                            材料
                            <Mmat/>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                
                </Layout>
            )

        
        
    }
}


export default Mdata;

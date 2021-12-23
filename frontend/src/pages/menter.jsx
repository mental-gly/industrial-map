
import { Input,Radio,Button,Layout,Form,Select,Breadcrumb} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col } from 'antd';


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

class Menter extends React.Component{
    formRef = React.createRef();

    constructor(props){
        super(props)
        this.state = {
            type : "",
            en_name:'',
            province:'',
            city:'',
            amount:'',
            en_type:'',
            longitude:'',
            latitude:'',
            check:-1,//保留属性，修改成功或者失败
            isrequired:true,
        };

        this.onSubmit= this.onSubmit.bind(this);
        
    }
    onReset = () => {
        console.log("reset");
        
        this.formRef.current.resetFields();
        this.setState({type : ''});
        this.setState({table: ''});
        this.setState({en_name:''});
        this.setState({province:''});
        this.setState({city:''});
        this.setState({amount:''});
        this.setState({en_type:''});
        this.setState({longitude:''});
        this.setState({latitude:''});

        this.setState({isrequired:true});
        
    };
    
    
    
    onSubmit = () =>{
        if(this.state.en_name.length==0){
            alert("请输入公司名称");
                  return ;
        }
        if(this.state.type=="insert"){
             if(this.state.amount.length==0||this.state.en_type.length==0){
                alert("请输入完整数据");
                return ;
             }
             
            if(this.state.province.length==0||this.state.city.length==0){
                alert("请输入完整的省市信息");
                return;
            }
            if(this.state.longitude.length==0||this.state.latitude.length==0){
                alert("请输入完整的经纬度");
                return;
            }
        }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/mdata',
            data: {
                
                
                "type":this.state.type,
                "table":'enterprise',
                
                "en_name":this.state.en_name,
                "province":this.state.province,
                "city":this.state.city,
                "amount":this.state.amount,
                "en_type":this.state.en_type,
                "longitude":this.state.longitude,
                "latitude":this.state.latitude    
            }
            }).then((data =>{
                    console.log(data);
                    if(data.data == "1")
                    {
                        alert("修改成功");
                        this.onReset();
                    }
                    else 
                    {
                        alert("修改失败，请检查数据");
                        
                    }
            }
                )).catch(function (error) {
            console.log(error);
            });
    }
    
    
    
    formRef = React.createRef();
    
    render(){
        
        
            return (
                <Layout >
                    
                    
                        <Form
                        name="basic"
                        labelCol={{
                            span: 3,
                        }}
                        wrapperCol={{
                            span: 10,
                        }}
                        
                        ref={this.formRef}
                        initialValues={{datatype: 1}}
                        requiredMark={this.state.requiredMark}
                    >
                    <Form.Item
                        label="修改类型"
                        name="type"
                        rules={[
                        {
                            required: true,
                            message: 'Please choose type!',
                        },
                        ]}
                    >
                        <Radio.Group name="datatype" >
                        <Radio value={1} onClick = {(item)=>{this.setState({type : "insert"},()=>this.setState({isrequired: true},()=>{console.log(this.state.type)}))}}>增加</Radio>
                        <Radio value={2} onClick = {(item)=>{this.setState({type : "delete"},()=>this.setState({isrequired: false},()=>{console.log(this.state.type)}))}}>删除</Radio>
                        <Radio value={3} onClick = {(item)=>{this.setState({type : "update"},()=>this.setState({isrequired: false},()=>{console.log(this.state.type)}))}}>修改</Radio>
                        </Radio.Group>
                        
                    </Form.Item>

                    <Form.Item
                        label="公司名称"
                        name="en_name"
                        
                        rules={[
                        {  
                            required: true,
                            message: 'Please input!',
                        },
                        ]}
                    >
                        <Input placeholder="input maname" onChange={(item) => this.setState({en_name:item.target.value},()=>{console.log(this.state.en_name)})}/>
                    </Form.Item>

                    <Form.Item
                        label="省份"
                        name="province"
                        rules={[
                        {
                            required: this.state.isrequired,
                            message: 'Please input!',
                        },
                        ]}
                    >
                        <Input placeholder="input sth" onChange={(item) => this.setState({province:item.target.value},()=>{console.log(this.state.maintro)})}/>
                    </Form.Item>

                    <Form.Item
                        label="城市"
                        name="city"
                        rules={[
                        {
                            required: this.state.isrequired,
                            message: 'Please input!',
                        },
                        ]}
                    >
                        <Input placeholder="input sth" onChange={(item) => this.setState({city:item.target.value},()=>{console.log(this.state.city)})}/>
                    </Form.Item>
                    <Form.Item
                        label="产量"
                        name="amount"
                        rules={[
                        {
                            required: this.state.isrequired,
                            message: 'Please input!',
                        },
                        ]}
                    >
                        <Input placeholder="input sth" onChange={(item) => this.setState({amount:item.target.value},()=>{console.log(this.state.amount)})}/>
                    </Form.Item>

                    <Form.Item
                        label="企业类型"
                        name="en_type"
                        rules={[
                        {
                            required: this.state.isrequired,
                            message: 'Please input!',
                        },
                        ]}
                    >
                        <Input placeholder="input sth" onChange={(item) => this.setState({en_type:item.target.value},()=>{console.log(this.state.en_type)})}/>
                    </Form.Item>

                    <Form.Item
                        label="经度"
                        name="longitude"
                        rules={[
                        {
                            required: this.state.isrequired,
                            message: 'Please input!',
                        },
                        ]}
                    >
                        <Input placeholder="input sth" onChange={(item) => this.setState({longitude:item.target.value},()=>{console.log(this.state.longitude)})}/>
                    </Form.Item>

                    <Form.Item
                        label="纬度"
                        name="latitude"
                        rules={[
                        {
                            required: this.state.isrequired,
                            message: 'Please input!',
                        },
                        ]}
                    >
                        <Input placeholder="input sth" onChange={(item) => this.setState({latitude:item.target.value},()=>{console.log(this.state.latitude)})}/>
                    </Form.Item>


                    <Form.Item {...tailLayout}
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                        Submit
                        </Button>
                        
                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button>
                        <Button htmlType="button" onClick={(item)=>{console.log(this.state)}}>
                            print
                        </Button>
                    </Form.Item>
                        </Form>
                
                </Layout>
            )

        
        
    }
}


export default Menter;

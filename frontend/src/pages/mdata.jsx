
import { Input,Radio,Button,Layout,Form,Select} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';




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
            mtype : -1,
            maintro: '',
            maname:'',
            check:-1,//保留属性，修改成功或者失败
            isrequired:true,
    
        };

        this.onSubmit= this.onSubmit.bind(this);
    }
    onReset = () => {
        console.log("reset");
        
        this.formRef.current.resetFields();
        this.setState({mtype : -1});
        this.setState({maintro: ''});
        this.setState({maname:''});
        this.setState({isrequired:true});
        
    };
    
    
    onSubmit = () =>{
        if(this.state.mtype==1){
            if(this.state.maintro.length==0){
                alert("请输入完整数据");
                return ;
            }
        }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/mdata',
            data: {
                
                
                "mtype":this.state.mtype,
                "maintro": this.state.maintro,
                "maname":this.state.maname,
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
                <Layout>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    ref={this.formRef}
                    initialValues={{datatype: 1}}
                    requiredMark={this.state.requiredMark}
                >
                <Form.Item
                    label="请选择修改类型"
                    name="mtype"
                    rules={[
                    {
                        required: true,
                        message: 'Please choose type!',
                    },
                    ]}
                >
                    
                            <Radio.Group name="datatype" >
                            <Radio value={1} onClick = {(item)=>{this.setState({mtype : 1},()=>this.setState({isrequired: true},()=>{console.log(this.state.mtype)}))}}>增加</Radio>
                            <Radio value={2} onClick = {(item)=>{this.setState({mtype : 2},()=>this.setState({isrequired: false},()=>{console.log(this.state.mtype)}))}}>删除</Radio>
                            <Radio value={3} onClick = {(item)=>{this.setState({mtype : 3},()=>this.setState({isrequired: false},()=>{console.log(this.state.mtype)}))}}>修改</Radio>
                            </Radio.Group>
                    
                </Form.Item>

                <Form.Item
                    label="材料名称"
                    name="ma_name"
                    
                    rules={[
                    {  
                        required: this.state.isrequired,
                        message: 'Please input your ma_name!',
                    },
                    ]}
                >
                    <Input placeholder="input maname" onChange={(item) => this.setState({maname:item.target.value},()=>{console.log(this.state.maname)})}/>
                </Form.Item>

                <Form.Item
                    label="材料简介"
                    name="ma_intro"
                    rules={[
                    {
                        required: this.state.isrequired,
                        message: 'Please input your ma_intro!',
                    },
                    ]}
                >
                    <Input placeholder="input sth" onChange={(item) => this.setState({maintro:item.target.value},()=>{console.log(this.state.maintro)})}/>
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


export default Mdata;

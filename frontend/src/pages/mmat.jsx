
import { Input,Radio,Button,Layout,Form,Select,Breadcrumb} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col } from 'antd';




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

class Mmat extends React.Component{
    formRef = React.createRef();

    constructor(props){
        super(props)
        this.state = { 
            ma_type:'',
            check:-1,//保留属性，修改成功或者失败
            ma_name:'',
            introduction:'',
            isrequired:true,
        };

        this.onSubmit_ma= this.onSubmit_ma.bind(this);
    }
    
    onReset_ma = () => {
        console.log("reset_ma");
        
        this.formRef.current.resetFields();
        this.setState({mtype : ''});
        this.setState({ma_name: ''});
        this.setState({introduction:''});
        
        this.setState({isrequired:true});
        
    };
    
    
    onSubmit_ma = () =>{
        if(this.state.ma_name.length==0){
            alert("请输入材料名称");
                  return ;
        }
        if(this.state.ma_type=="insert"){
             if(this.state.introduction.length==0){
                alert("请输入材料简介");
                return ;
             }
             
            
        }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/mdata',
            data: {
                
                
                "type":this.state.ma_type,
                "table":'material',
                "ma_name":this.state.ma_name,
                "introduction":this.state.introduction

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
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 15,
                            }}
                            
                            ref={this.formRef}
                            initialValues={{datatype: 1}}
                            requiredMark={this.state.requiredMark}
                        >
                        <Form.Item
                            label="修改类型"
                            name="ma_type"
                            rules={[
                            {
                                required: true,
                                message: 'Please choose type!',
                            },
                            ]}
                        >
                            <Radio.Group name="datatype" >
                            <Radio value={1} onClick = {(item)=>{this.setState({ma_type : "insert"},()=>this.setState({isrequired: true},()=>{console.log(this.state.ma_type)}))}}>增加</Radio>
                            <Radio value={2} onClick = {(item)=>{this.setState({ma_type : "delete"},()=>this.setState({isrequired: false},()=>{console.log(this.state.ma_type)}))}}>删除</Radio>
                            <Radio value={3} onClick = {(item)=>{this.setState({ma_type : "update"},()=>this.setState({isrequired: false},()=>{console.log(this.state.ma_type)}))}}>修改</Radio>
                            </Radio.Group>
                            
                        </Form.Item>

                        <Form.Item
                            label="材料名称"
                            name="ma_name"
                            
                            rules={[
                            {  
                                required: true,
                                message: 'Please input!',
                            },
                            ]}
                        >
                            <Input placeholder="input maname" onChange={(item) => this.setState({ma_name:item.target.value},()=>{console.log(this.state.ma_name)})}/>
                        </Form.Item>

                        <Form.Item
                            label="材料简介"
                            name="introduction"
                            
                            rules={[
                            {  
                                required: this.state.isrequired,
                                message: 'Please input!',
                            },
                            ]}
                        >
                            <Input placeholder="input maname" onChange={(item) => this.setState({introduction:item.target.value},()=>{console.log(this.state.introduction)})}/>
                        </Form.Item>

                        <Form.Item {...tailLayout}
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={this.onSubmit_ma}>
                            Submit
                            </Button>
                            
                            <Button htmlType="button" onClick={this.onReset_ma}>
                                Reset
                            </Button>
                            {/* <Button htmlType="button" onClick={(item)=>{console.log(this.state)}}>
                                print
                            </Button> */}
                        </Form.Item>
                        </Form>
                    
                
                </Layout>
            )

        
        
    }
}


export default Mmat;

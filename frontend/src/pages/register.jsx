import React from 'react'
import { UserOutlined, LockOutlined, GlobalOutlined} from '@ant-design/icons';
import { Input,Radio,Button,Layout,Form, Card, Space,Divider} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.min.css';
// import pic from "../images/G1.jpg";
import Login from './login';
import Success from './success-login';
import Fail from './fail-login';
import { Navigate } from 'react-router-dom';

const { TextArea } = Input;
const submitHandler = item => {
  console.log(item);
};
var sectionStyle = {
    width: "1536px",
    height: "745px",
  // makesure here is String确保这里是一个字符串，以下是es6写法
    // backgroundImage: `url(${pic})` 
};

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            email : '',
            repassword:'',
            current : 'Register',
            check : -1
        };
    }
    
    nameChange(item){
        this.setState({
            user:item.target.value,
        },()=>{console.log(this.state.user)})
    }
    
    pwChange(item){
        this.setState({
            pwd:'',
        },()=>{console.log(this.state.pwd)})
    }

    checkLogin(item){
        let tmp;
        tmp = this.state.repassword
        console.log("asdad" + tmp)
        let value = this.state.email;
        console.log("email:" + value)
        if(tmp !== this.state.pwd)
        {
            console.log("sb")
            alert("两次输入密码不一致")
        }
        else if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value))) {
            alert('请输入正确的Email');
        }
        else if(this.state.user == '')
        {
            alert('请输入用户名');
        }
        else if(this.state.pwd == '')
        {
            alert('请输入密码');
        }
        else if(this.state.email == '')
        {
            alert('请输入邮件');
        }
        else
        {
            console.log("username:" + this.state.user + " userpwd:" + this.state.pwd + " email:" + this.state.email)
            this.setState({repassword:item.target.value},()=>{})
            this.setState({email:item.target.value},()=>{})
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/register',
                data: {
                    "user_name":this.state.user,
                    "user_pwd":this.state.pwd,
                    "user_mail":this.state.email
                }
                }).then(data => {
                    console.log(data);
                    if(data.data == 1)
                    {
                        this.setState({check : 1,})
                    }
                    if(data.data == 0)
                    {
                        this.setState({check : 0,})
                    }
                }).catch(function (error) {
                console.log(error);
                });
        }
    }

    ChangeStatus(item){
        this.setState({
            current:'Login'
        },()=>{console.log(this.state.current)})
    }

    render(){
        const item = Radio.RadioItem
        if(this.state.check === 1)
        {
            return(    
                <Navigate to="/success-login"/>
            )     
        }
        else if(this.state.check === 0)
        {
            return(
                <Navigate to="/fail-login"/>
            )
        }
        else 
        if(this.state.current === 'Login')
        {
            return (
            <Navigate to="/login"/>
            )
        }
        else 
        if(this.state.current === 'Register')
        {
            return (
                <Form 
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    style={sectionStyle}
                    action="/receive" method="post" onSubmit={submitHandler}>
                    <div style={{height : 200}}></div>
                    <div style={{display : "flex", flexDirection : "row", justifyContent : "center"}}>
                    <Card style={{width : 500, backgroundColor : '#FCFBF7', border :1}}>
                        <h1 style={{display : "flex", flexDirection : "row", justifyContent : "center", fontWeight : 'bold'}} >Register</h1>
                        <Divider plain></Divider>
                        <Form.Item
                            label="输入昵称" name="username" 
                            style={{display : "flex", flexDirection : "row", justifyContent : "center"}}
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            }, 
                        ]}>
                            <Input 
                                    allowClear
                                    maxLength={20}
                                    placeholder="Enter your name" 
                                    onChange = {(item) => this.nameChange(item)}
                                    prefix={<UserOutlined />}
                                    />
                        </Form.Item>
                        <Form.Item 
                            style={{display : "flex", flexDirection : "row", justifyContent : "center"}}
                            label="输入密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                        ]}>
                            <Input.Password maxLength={20} prefix={<LockOutlined />} placeholder="Enter your password" onChange={(item) => this.setState({pwd:item.target.value},()=>{console.log(this.state.pwd)})}/>
                        </Form.Item>
                        <Form.Item 
                            style={{display : "flex", flexDirection : "row", justifyContent : "center"}}
                            label="确认密码"
                            name="repassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                        ]}>
                            <Input.Password maxLength={20} prefix={<LockOutlined />} placeholder="Check your password" onChange={(item)=>this.setState({repassword:item.target.value},()=>{console.log(this.state.pwd)})}/>
                        </Form.Item>
                        <Form.Item
                            style={{display : "flex", flexDirection : "row", justifyContent : "center"}}
                            label="输入邮箱"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                        ]}>
                            <Input prefix={<GlobalOutlined />}placeholder="Enter your email" allowClear onChange={(item)=>{this.setState({email : item.target.value},()=>{console.log(this.state.pwd)})}} />
                        </Form.Item>
                        <Form.Item >
                            <Space size='small' style={{display : "flex", flexDirection : "row", justifyContent : "center"}}>
                                <Button type = "primary" onClick={(item)=>this.checkLogin(item)}>注册</Button>
                                <Button type="default" onClick={(item)=>this.ChangeStatus(item)}>返回</Button>
                            </Space>
                        </Form.Item>  
                        </Card>  
                    </div>
                </Form>
            )  
        }
    }
}

export default Register

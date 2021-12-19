import React from 'react';
import { Input,Radio,Button,Layout,Form,Typography,Row,Col, Space, Card, Carousel, Divider} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import Register from './register';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import pic from "../images/G1.jpg";
import { Navigate } from 'react-router-dom';


const { TextArea } = Input;
const onChange = item => {
  console.log(item);
};
const styles = {
    focus: {
      width: '20px',
      opacity: 1
    },
};
const { Text, Link } = Typography;
var sectionStyle = {
    width: "1536px",
    height: "745px",
  // makesure here is String确保这里是一个字符串，以下是es6写法
    // backgroundImage: `url(${pic})` 
  };

class Login extends React.Component{
    
    state = {
        current : 'Login',
        identity : 2,
        check : -1
    }
    /*
    constructor(props){
        this.register = this.register.bind(this);
        this.state = {
            current : 'Login',
            identity : 2,
        };
    }
    */
    register(){
        console.log(this.props);
        this.props.history.push('/register')
    }
    nameChange(item){
        this.setState({
            user:item.target.value,
        },()=>{console.log(this.state.user)})
    }
    checkLogin(item){
        console.log("username:" + this.state.user + " user pwd:" + this.state.pwd)
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/login',
            data: {
                "user_name":this.state.user,
                "user_pwd":this.state.pwd,
            }
            }).then(data => {
                console.log(data);
                if(data.data.code == 1)
                {
                    this.setState({check : 1})
                }
                else
                {
                    this.setState({check : 0})
                }
            }).catch(function (error) {
            console.log(error);
            });
    }
    ChangeStatus(item){
        this.setState({
            current:'Register'
        },()=>{console.log(this.state.current)})
    }
    render(){
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
        else if(this.state.current === 'Register')
        {
            return (
            <Navigate to="/register"/>
            )
        }
        else if(this.state.current === 'Login')
        {
            return (
                <Form name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    style={sectionStyle}> 
                    <div style={{height : 200}}></div>
                    <div style={{display : "flex", flexDirection : "row", justifyContent : "center"}}>
                    <Card style={{width : 500, backgroundColor : '#FCFBF7', border :1}}>
                        <h1 style={{display : "flex", flexDirection : "row", justifyContent : "center", fontWeight : 'bolder'}} >Login</h1>
                        <Divider></Divider>
                        <Form.Item label="输入昵称" name="username" 
                             style={{display : "flex", flexDirection : "row", justifyContent : "center"}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                }, 
                                ]}>
                                    <Input 
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
                                    ]}
                                >
                                <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" onChange={(item) => this.setState({pwd:item.target.value},()=>{console.log(this.state.pwd)})}/>
                        </Form.Item>
                        <br/>
                        <Form.Item>
                            <Space size='small' style={{display : "flex", flexDirection : "row", justifyContent :"center"}}>
                                <Button type="primary" onClick={(item)=>this.checkLogin(item)} >登录</Button>
                                <Button type="default" onClick={(item)=>this.ChangeStatus(item)}>注册</Button>
                            </Space>
                        </Form.Item> 
                    </Card>  
                    </div>       
                </Form>
            )
        }
        
    }
}


export default Login;

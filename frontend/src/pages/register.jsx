import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Input,Radio,Button,Layout,Form, message} from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const submitHandler = item => {
  console.log(item);
};

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            identity : 2,
            email : '',
            repassword:''
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
        else
        {
            console.log("username:" + this.state.user + " userpwd:" + this.state.pwd + " user type:" + this.state.identity + " email:" + this.state.email)
            this.setState({repassword:item.target.value},()=>{})
            this.setState({email:item.target.value},()=>{})
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/register',
                data: {
                    "user_name":this.state.user,
                    "user_pwd":this.state.pwd,
                    "user_type":this.state.identity,
                    "user_mail":this.state.email
                }
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                console.log(error);
                });
        }
    }

    render(){
        const item = Radio.RadioItem
        let a
        return (
                <form action="/receive" method="post" onSubmit={submitHandler}>
                        <label>用户名</label>
                        <Input placeholder="Enter your username" onChange = {(item) => this.nameChange(item)}/>
                        <br />
                        <Form.Item label="密码" name="password">
                        <Input.Password placeholder="Enter your password" onChange={(item) => this.setState({pwd:item.target.value},()=>{console.log(this.state.pwd)})}/>
                        </Form.Item>
                        <Form.Item label="确认密码" name="pw2">
                        <Input.Password placeholder="Check your password" onChange={(item)=>this.setState({repassword:item.target.value},()=>{console.log(this.state.pwd)})}/>
                        </Form.Item>
                    <div>
                        <label>请选择你的身份</label>
                        <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1} onClick = {(item)=>{this.setState({identity : 1},()=>{console.log(this.state.identity)})}}>管理员</Radio>
                        <Radio value={2} onClick = {(item)=>{this.setState({identity : 2},()=>{console.log(this.state.identity)})}}>游客</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        <label>电子邮箱</label>
                        <Input placeholder="Enter your email" allowClear onChange={(item)=>{this.setState({email : item.target.value},()=>{console.log(this.state.pwd)})}} />
                    </div>
                    <Button type = "submit" onClick={(item)=>this.checkLogin(item)}>注册</Button>
                </form>
        )
    }
}

export default Register

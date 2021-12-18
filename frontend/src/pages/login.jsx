import React from 'react';
import { Input,Radio,Button,Layout,Form,Carousel,Result} from 'antd';
import axios from 'axios';
import { ReactDOM, render } from 'react-dom';
import Fail from './fail-login';
import Success from './success-login';

const { TextArea } = Input;
const onChange = item => {
  console.log(item);
};
const styles = {
    focus: {
      width: '20px',
      opacity: 1
    },
  }

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
class Login extends React.Component{
    /*
    state = {
        current : 'Login',
        identity : 2,
    }
    */
    constructor(props){
        super(props)
        this.state = {
            current : 'Login',
            identity : 2,
            check: -1,
        };

        this.checkLogin = this.checkLogin.bind(this);
    }
    
    nameChange(item){
        this.setState({
            user:item.target.value,
        },()=>{console.log(this.state.user)})
    }
    checkLogin = () =>{
        console.log("username:" + this.state.user + " user pwd:" + this.state.pwd)
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/',
            data: {
                "user_name":this.state.user,
                "user_pwd":this.state.pwd,
            }
            }).then((data =>{
                    console.log(data);
                    if(data.data == "1")
                    {
                        this.setState({check: 1,})
                    }
                    else
                    {
                        this.setState({check: 0,})
                    }
            }
                )).catch(function (error) {
            console.log(error);
            });
    }
    render(){
        if(this.state.check == 1){
            return(
                <Success/>
            ) 
            
        }
        else if(this.state.check == 0)
        {
            return(
                <Fail/>
            ) 
        }
        else
        {
            return (
                <Layout>
                    <form class="mui-input-group">
                            <label>用户名</label>
                            <Input 
                                placeholder="Enter your name" 
                                onChange = {(item) => this.nameChange(item)}
                                addonBefore={<span className='iconfont icon-User' style={this.state.user === 0 ? styles.focus : {}}/>}
                                />
                            <br />
                            <label >密码框</label>
                            <Input.Password placeholder="Enter your password" onChange={(item) => this.setState({pwd:item.target.value},()=>{console.log(this.state.pwd)})}/>
                        <br />
                        <Button type = "submit" onClick={()=>this.checkLogin()}>登录</Button>
                    </form>
                    
                </Layout>
            )

        }
        
    }
}


export default Login;

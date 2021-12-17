import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route,Routes,Link} from 'react-router-dom'

import { Input,Radio,Button,Layout,Form,Carousel,Result} from 'antd';


class Fail extends React.Component {
    render() {
        return (
            <Result
                status="error"
                title="Submission failed!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                <Button type="primary" key="console">
                    <Link to='/login'>Return Login</Link>
                </Button>,
                <Button key="buy">
                    <Link to='/register'>Go Register</Link>
                </Button>,
                ]}
            />
        );
    }
}

export default Fail;
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route,Routes,Link} from 'react-router-dom'

import { Input,Radio,Button,Layout,Form,Carousel,Result} from 'antd';


class Success extends React.Component {
    render() {
        return (
            <Result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button type="primary" key="console">
                <Link to='/imap'>Go to Home Page</Link>
              </Button>,
             
            ]}
          />
        );
    }
}

export default Success
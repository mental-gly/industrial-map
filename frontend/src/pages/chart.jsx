
import { List, Divider} from 'antd';
import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import PieChart from '@ant-design/plots/es/components/pie';

var data = [
    // {
    //   type: '分类一',
    //   value: 27,
    // },
    // {
    //   type: '分类二',
    //   value: 25,
    // },
    // {
    //   type: '分类三',
    //   value: 18,
    // },
    // {
    //   type: '分类四',
    //   value: 15,
    // },
    // {
    //   type: '分类五',
    //   value: 10,
    // },
    // {
    //   type: '其他',
    //   value: 5,
    // },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    
  };


class Chart extends React.Component {
  constructor(props) {
    super(props)
   
    this.state = {
      chosen_mat:null,
      ListData:this.props.en_list,
      Piedata:this.props.mat_list
    }

    this.onReadyColumn = this.onReadyColumn.bind(this);
  }

  componentWillReceiveProps(nextProps:any){
    this.setState({
        ListData: nextProps.en_list,
        Piedata:nextProps.mat_list
        
    })
  }

  onReadyColumn = (plot) => {
    plot.on('element:click', (...args) => {
      
      console.log(args[0].data.data.type);
      this.props.onReceiveMat(args[0].data.data.type);
    });
  };
  
  //  listData = this.state.ListData;
  
  render(){
    console.log("this.state.Piedata");
    console.log(this.state.Piedata);
    
    while(data.length>0){
      data.pop();
    }
    for(let i=0; i < this.state.Piedata.length;i++){
      data.push({
        "type":this.state.Piedata[i].type,
        "value":this.state.Piedata[i].value
      })
    }
    // data=this.state.Piedata;
    console.log("data");
    console.log(data);
      return (
          <div>

          
        <Pie 
          {...
          config}
         onReady={this.onReadyColumn}/>
        <Divider orientation="left" >企业列表</Divider>
        <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={this.state.ListData}
                footer={
                <div>
                    
                </div>
                }
                renderItem={item => (
                <List.Item
                    key={item[1]}   
                >
                    <List.Item.Meta 
                    title={<a href={item.href}>{item[1]}</a>}
                    />
                    {item[2]}{" "}{item[3]}
                </List.Item>
                )}
            /> 
        </div>
        );
  }
  
};

export default Chart;
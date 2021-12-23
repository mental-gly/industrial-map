
import { List, Divider} from 'antd';
import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import PieChart from '@ant-design/plots/es/components/pie';

const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
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
const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}
const onReadyColumn = (plot) => {
  plot.on('element:click', (...args) => {
    
    console.log(args[0].data.data.type);
    
  });
};
class Chart extends React.Component {
  
  render(){
      return (
          <div>

          
        <Pie {...config} onReady={onReadyColumn}/>
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
                dataSource={listData}
                footer={
                <div>
                    <b>ant design</b> footer part
                </div>
                }
                renderItem={item => (
                <List.Item
                    key={item.title}   
                >
                    <List.Item.Meta 
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            /> 
        </div>
        );
  }
  
};

export default Chart;
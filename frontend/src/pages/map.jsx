import ReactDOM from 'react-dom';
import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation,Marker,Polygon} from '@uiw/react-amap';
import {LabelsData,ProData,districts, AdData} from './china-pp';
import { Layout, Menu, Breadcrumb } from 'antd';
import { List, Divider, Row, Col} from 'antd';
import { Pie } from '@ant-design/charts';
import Chart from './chart'

const AMap = window.AMap

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chosen_mat:"",
      chosen_pro:"",
      en_list:[],
      mat_list:[]
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handlerReceiveMat = ()=>{
    return (Mat)=>{
        this.setState({chosen_mat:Mat});
        console.log(this.state.chosen_mat);
        axios({
          url:'http://127.0.0.1:5000/imap',
          data:{
              "en_type":this.props.en_type,
              "chosen_province":this.state.chosen_pro,
              "chosen_material":this.state.chosen_mat
          },
          method:'POST'
          }).then(
              res => {
                console.log("with mat")
                console.log(res)
                this.setState({en_list:res.data.enterprise_info})
                this.setState({mat_list:res.data.Material})
              }
          ).catch(
              err => console.error(err)
        )
    }
  }

  getData(){ //请求数据函数
    axios({
      url:'http://127.0.0.1:5000/imap',
      data:{
          "en_type":this.props.en_type,
          "chosen_province":this.state.chosen_pro,
          "chosen_material":this.state.chosen_mat
      },
      method:'POST'
      }).then(
          res => {
            console.log("fisrtly")
            console.log(res)
            console.log(res.data.enterprise_info)
            this.setState({en_list:res.data.enterprise_info})
            this.setState({mat_list:res.data.data})
            
          }
      ).catch(
          err => console.error(err)
    )
  }


  // 组建挂载之后执行
  componentDidMount = () => {
      this.getData();
      
      
      var th = this;
      var SOC = 'CHN';
      var color = ['#ffffb2','#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'];
      var provinceData = [];
      var cityData = [];
      var nationStroke = 'rgba(20, 20, 120, 0.6)';
      var nationFill = 'rgba(20, 120, 230, 0.3)';
      var str = "";
      var mat = this.state.chosen_mat;

      var districtSearch = new AMap.DistrictSearch({
        level: "country",
        subdistrict: 2, //  显示下级行政区级数
      });
  
      districtSearch.search("中国", function (status, result) {
        provinceData = result.districtList[0].districtList;
      });
  
      
      var disCountry = new AMap.DistrictLayer.Country({
          zIndex:10,
          SOC:'CHN',
          depth:1,
          styles:{
            "province-stroke": 'rgba(20, 20, 120, 0.6)',
            'fill': nationFill
          }
      })


      var disProvince = new AMap.DistrictLayer.Province({
          zIndex: 12,
          depth:1,
          styles: {
                'city-stroke': 'rgba(20, 20, 120, 0.6)',
                'fill': '#ffffb2'
              }
      });
      
      // 颜色辅助方法
      var colors = {};
      var getColorByAdcode = function (adcode) {
          var gb = Math.random() * 4;
          colors[adcode] = color[gb];

          return colors[adcode];
      };

      var map = new AMap.Map("container",{
              zooms: [4, 10],
              center:[104.262814,25],
              zoom: 4,
              isHotspot:false,
              defaultCursor:'pointer',
              layers:[
                disCountry,
                  
              ],
              viewMode:'3D',
      })


      
      map.addControl(new AMap.Scale());
      map.addControl(new AMap.ToolBar({liteStyle:true}));
      
      map.on('complete',function(){
          var country_layer = new AMap.LabelsLayer({
              // 开启标注避让，默认为开启，v1.4.15 新增属性
              collision: true,
              // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
              animation: true,
          });
          var province_layer = new AMap.LabelsLayer({
            // 开启标注避让，默认为开启，v1.4.15 新增属性
            collision: true,
            // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
            animation: true,
          });


          for (var i = 0; i < LabelsData.length; i++) {
              var labelsMarker = new AMap.LabelMarker(LabelsData[i]);
              country_layer.add(labelsMarker);
          }
          map.add(country_layer);

          for (var i = 0; i < th.state.en_list.length; i++) {
              var marker = new AMap.Marker({
                position: [th.state.en_list[i][6],th.state.en_list[i][7]]
              });
              map.add(marker);
          }

      })
    
        map.on('mousemove', function (ev) {
            var px = ev.pixel;
            // 拾取所在位置的行政区
            var props = disCountry.getDistrictByContainerPos(px);
    
            if (props) {
                var ad = props.adcode;
                if(ad){
                    // 重置行政区样式
                    disCountry.setStyles({
                        
                        'fill': function (props) {
                            return props.adcode == ad ? "#5470c6" : nationFill;
                        }
                    });
                    
                }
                
    
                
            }
        });


        var handlerData = ()=>{
          axios({
            url:'http://127.0.0.1:5000/imap',
            data:{
                "en_type":th.props.en_type,
                "chosen_province":th.state.chosen_pro,
                "chosen_material":th.state.chosen_mat
            },
            method:'POST'
            }).then(
                res => {
                  console.log("only map")
                  console.log(res)
                  th.setState({en_list:res.data.enterprise_info})
                  th.setState({mat_list:res.data.Material})
                }
            ).catch(
                err => console.error(err)
          )
          
        }

        map.on('click',function(e){
            // console.log("11111")
            // //regeoCode(e);
            // console.log("222222")
            var px = e.pixel;
            var props = disCountry.getDistrictByContainerPos(px);
            if (props) {
                var ad = props.adcode;
                console.log(ad);
                
                if(ad){
                    // 重置行政区样式
                    disProvince.setAdcode(ad);
                    map.addLayer(disProvince);
                    for(let i = 0; i < districts.length; i++)
                    {
                        if(ad == AdData[i])
                        {
                            str = ProData[i];
                            th.setState({chosen_pro:str});
                            break;
                        }
                    }
                }
            }
            
            map.setZoom(6); //设置地图层级
            map.setCenter(e.lnglat,false); //设置地图中心点

            handlerData();
        })
  }

  

  // 组建将要卸载的时候执行
  componentWillUnmount(){
    
  }

  render(){
    console.log("inmap");
    console.log(this.state.en_list);
    return(
      <div>
          <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              {(this.props.en_type == "企业")&& <Breadcrumb.Item>企业</Breadcrumb.Item>}
              {(this.props.en_type == "技术中心")&& <Breadcrumb.Item>技术中心</Breadcrumb.Item>}
              {(this.props.en_type == "产业基地")&& <Breadcrumb.Item>产业基地</Breadcrumb.Item>}
            </Breadcrumb>
          </div>
          <div>
        <Row>
          <Col span={13}>
            
          <div id="container" style={{ width:"100%", height:"100%" }}/>

          </Col>
          <Col span={2}>

          </Col>
          <Col span={8}>
            
            <Chart onReceiveMat={this.handlerReceiveMat()} en_list={this.state.en_list} mat_list={this.state.mat_list}/>

          </Col>
        </Row>
        </div>

      </div>
      
      
      
    )
  }
}    
  
export default Demo;






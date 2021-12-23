import ReactDOM from 'react-dom';
import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation,Marker,Polygon} from '@uiw/react-amap';
import {LabelsData,ProData,districts} from './china-pp';
import { Layout, Menu, Breadcrumb } from 'antd';
import { List, Divider, Row, Col} from 'antd';
import { Pie } from '@ant-design/charts';
import Chart from './chart'

const AMap = window.AMap

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rmap: null,
      
      lnglat: null
    }
  }
  // 组建挂载之后执行
  componentDidMount = () => {
      var SOC = 'CHN'
      var color = ['#ffffb2','#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'];
      var provinceData = [];
      var cityData = [];
      var nationStroke = 'rgba(20, 20, 120, 0.6)';
      var nationFill = 'rgba(20, 120, 230, 0.3)';

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
              center:[104.262814,17],
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
      })

      AMap.plugin(["AMap.Geocoder"],function(){
        var geocoder = new AMap.Geocoder({
          //city: "010", //城市设为北京，默认：“全国”
          //radius: 1000 //范围，默认：500
        });
        var marker = new AMap.Marker();;
        function regeoCode(e) {
            
            var lnglat  = e.lnglat;
            map.add(marker);
            marker.setPosition(lnglat);
            
            geocoder.getAddress(lnglat, function(status, result) {
                if (status === 'complete'&&result.regeocode) {
                    var address = result.regeocode.formattedAddress;
                    for(let i = 0; i < districts.length; i++)
                    {
                        if(String(address).indexOf(ProData[i])!=-1)
                        {
                            var str = ProData[i];
                            break;
                        }

                    }
                    
                    console.log(str);
                    axios({
                      url:'http://127.0.0.1:5000/imap',
                      data:{
                          "en_type":str
                      },
                      method:'POST'
                      }).then(
                          res => {
                            console.log(res)
                            
                
                            }
                      ).catch(
                          err => console.error(err)
                    )
                    
                }else{
                    console.log('根据经纬度查询地址失败')
                }
                
                
            });
            
        }
    
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


        map.on('click',function(e){
            regeoCode(e);
            var px = e.pixel;
            var props = disCountry.getDistrictByContainerPos(px);
            if (props) {
                var ad = props.adcode;
                if(ad){
                    // 重置行政区样式
                    disProvince.setAdcode(ad);
                    
                    
                    
                    map.addLayer(disProvince);
                    
                }
            }
            
            map.setZoom(6); //设置地图层级
            map.setCenter(e.lnglat,false); //设置地图中心点


        //全国地图：鼠标移动  高亮省  鼠标点击  为市覆盖不同颜色   
        //省级地图：鼠标移动  高亮市    
        })
       
      })
      
      
  }
  // 组建将要卸载的时候执行
  componentWillUnmount(){
    // 释放地图
    this.rmap && this.rmap.destory();
  }

  render(){
    return(
      <div>
          <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>企业</Breadcrumb.Item>
              <Breadcrumb.Item>技术中心</Breadcrumb.Item>
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
            <Chart/>

          </Col>
        </Row>
        </div>

      </div>
      
      
      
    )
  }
}    
  
export default Demo;






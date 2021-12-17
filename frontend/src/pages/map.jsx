import ReactDOM from 'react-dom';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation,Marker,Polygon} from '@uiw/react-amap';
import LabelsData from './china-pp';

const AMap = window.AMap

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rmap: null,
      chosen_province: null,
      chosen_material: null,
      lnglat: null
    }
  }
  // 组建挂载之后执行
  componentDidMount() {
      var SOC = 'CHN'
      var colors = {};
      
      var GDPSpeed = {
          '520000':10,//贵州
          '540000':10,//西藏
          '530000':8.5,//云南 
          '500000':8.5,//重庆
          '360000':8.5,//江西
          '340000':8.0,//安徽
          '510000':7.5,//四川
          '350000':8.5,//福建
          '430000':8.0,//湖南
          '420000':7.5, //湖北
          '410000':7.5,//河南
          '330000':7.0,//浙江
          '640000':7.5,//宁夏
          '650000':7.0,//新疆
          '440000':7.0,//广东
          '370000':7.0,//山东
          '450000':7.3,//广西
          '630000':7.0,//青海
          '320000':7.0,//江苏
          '140000':6.5,//山西
          '460000':7,// 海南
          '310000':6.5,//上海
          '110000':6.5, // 北京
          '130000':6.5, // 河北
          '230000':6, // 黑龙江
          '220000':6,// 吉林
          '210000':6.5, //辽宁
          '150000':6.5,//内蒙古
          '120000':5,// 天津
          '620000':6,// 甘肃
          '610000':8.5,// 甘肃
          '710000':2.64, //台湾
          '810000':3.0, //香港
          '820000':4.7 //澳门

      }

      var getColorByDGP = function(adcode){
          if(!colors[adcode]){
              var gdp = GDPSpeed[adcode];
              if(!gdp){
                  colors[adcode] = 'rgb(227,227,227)'
              }else{   
                  var r = 3;
                  var g = 140;
                  var b = 230;
                  var a = gdp/10;
                  colors[adcode] = 'rgba('+ r +','+ g +','+b+','+a+')';
              }
          }
          return colors[adcode]
      }
      var disCountry = new AMap.DistrictLayer.Country({
          zIndex:10,
          SOC:'CHN',
          depth:1,
          styles:{
              'nation-stroke':'#ff0000',
              'coastline-stroke':'#0088ff',
              'province-stroke':'grey',
              'fill':function(props){
                return getColorByDGP(props.adcode_pro)
              }
          }
      })

      var disProvince = new AMap.DistrictLayer.Province({
          zIndex: 12,
          styles: {
              'fill': function (properties) {
                  // properties为可用于做样式映射的字段，包含
                  // NAME_CHN:中文名称
                  // adcode_pro
                  // adcode_cit
                  // adcode
                  var adcode = properties.adcode;
                  return getColorByDGP(adcode);
              },
              'city-stroke': 'blue', // 中国地级市边界
          }
    });
      
      var map = new AMap.Map("container",{
              zooms: [4, 10],
              center:[104.262814,38.421951],
              zoom: 4,
              isHotspot:false,
              defaultCursor:'pointer',
              layers:[
                  disCountry
              ],
              viewMode:'3D',
      })
      map.addControl(new AMap.Scale());
      map.addControl(new AMap.ToolBar({liteStyle:true}));
      
      map.on('complete',function(){
        
          var layer = new AMap.LabelsLayer({
              // 开启标注避让，默认为开启，v1.4.15 新增属性
              collision: false,
              // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
              animation: true,
          });
          //eslint-disable-next-line
          for (var i = 0; i < LabelsData.length; i++) {
            //eslint-disable-next-line
              var labelsMarker = new AMap.LabelMarker(LabelsData[i]);
              layer.add(labelsMarker);
          }
          map.add(layer);
      })

      //显示地图层级与中心点信息
      function logMapinfo(){
        var zoom = map.getZoom(); //获取当前地图级别
        var center = map.getCenter(); //获取当前地图中心位置

        document.querySelector("#map-zoom").innerText = zoom;
        document.querySelector("#map-center").innerText = center.toString();
      };
      
      //绑定地图移动与缩放事件
      map.on('moveend', logMapinfo);
      map.on('zoomend', logMapinfo);

      

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
                    
                    if(String(address).indexOf("省")!=-1)
                    {
                      var str = address.split("省")[0] + "省";
                    }
                    else if(String(address).indexOf("自治区")!=-1){
                      var str = address.split("区")[0] + "区";
                    }
                    else if(String(address).indexOf("行政区")!=-1){
                      var str = address.split("区")[0] + "区";
                    }
                    else if(String(address).indexOf("市")!=-1){
                      var str = address.split("市")[0] + "市";
                    }
                    else{
                      var str = address;
                    }
                    console.log(str);
                    axios({
                      url:'http://127.0.0.1:5000/',
                      data:{
                          "chosen_province":str
                      },
                      method:'POST'
                      }).then(
                          res => {console.log(res)
                          document.getElementById('lnglat').value = res.data}
                      ).catch(
                          err => console.error(err)
                    )
                    
                }else{
                    console.log('根据经纬度查询地址失败')
                }
                
            });
            
        }
        
        map.on('click',function(e){
            regeoCode(e);


        

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
        <div id="container" style={{ width:"750px", height:"600px" }}/>
        
        <div class="info">
          <h4>获取地图级别与中心点坐标</h4>
          <p>当前级别：<span id="map-zoom">4</span></p>
          <p>当前中心点：<span id="map-center">104.262814,38.421951</span></p>
        
        </div>

      </div>
      
      
    )
  }
}    
  
export default Demo;






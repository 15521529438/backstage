import React from 'react';
import { Select, Icon } from 'antd';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/axis';
const { Option } = Select;


const provinceData = ['地铁1号线', '地铁2号线', '地铁3号线'];
const workingpointData = ['梧桐山', '笔架山', '莲花山'];
class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // this.onChange = this.onChange.bind(this);
    }

    createEcharts = (id,type) => {
      var myChart = echarts.init(document.getElementById(id));
        // 绘制图表
        if (type==='pie') {
            let pieOption = {
                title: {
                    text: '施工单位',
                    x: 'center',
                    y: 'center',
                    textStyle : {
                        color : '#333',
                        fontFamily : '微软雅黑',
                        fontSize : 14
                    }
                },
                tooltip: {
                    show:false,
                    enterable:false,
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['90%', '100%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'}
                        ]
                    }
                ]
        }
            myChart.setOption(pieOption);
        } else {
            let lineOption = {
                    title: {
                         show:false,    
                           text: "对数轴示例",
                           x: "center"
                       },
                       tooltip: {
                           trigger: "item",
                           formatter: "{a} <br/>{b} : {c}"
                       },
                       legend: {
                           x: '65%',
                           y: 0,
                           data: ["第三方", "施工单位"]
                       },
                      grid:{
                        width: '75%',
                        borderColor:'rgba(0,0,0,0)'
                      },
                       xAxis: [
                           {
                               type: "category",
                               name: "",
                               boundaryGap: false,
                               splitLine: {show: false},
                                axisTick: {
                                     lineStyle: {
                                        width:1,
                                        color: '#e5e5e5'
                                     }
                                 },
                                 axisLine: {
                                      lineStyle: {
                                          width:0
                                      }
                                  },
                                data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
                           }
                       ],
                       yAxis: [
                           {
                               type: "log",
                               name: "测值（mm）",
                               splitLine: {show: true},
                                axisTick: {
                                     lineStyle: {
                                        width:0
                                     }
                                },
                                axisLine: {
                                  lineStyle: {
                                      width:0
                                  }
                              }
                            }
                       ],
                       calculable: true,
                       series: [
                           {
                               name: "第三方",
                               type: "line",
                               smooth: true,
                               symbolSize: 0,
                               data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]

                           },
                           {
                               name: "施工单位",
                               type: "line",
                               smooth: true,
                                symbolSize: 0,
                               data: [1, 2, 4, 8, 16, 32, 64, 128, 256]

                           }
                       ]
            }
            myChart.setOption(lineOption);
        }
    }

    componentDidMount() {
        this.createEcharts('main', 'pie');
        this.createEcharts('main1', 'pie');
        this.createEcharts('main2', 'line');
        this.createEcharts('main3', 'line');
    }

    render() {
          const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
          const workingpointOptions = workingpointData.map(workingpoint => <Option key={workingpoint}>{workingpoint}</Option>);
            return (
                <div>
                    <main className="content_workingpoint">
                      <section className="content_itemcollect_top">
                              <p>风险源监测</p>
                              <div className="content_workingpoint_top">
                                <p>项目：</p>
                                <Select defaultValue={provinceData[0]} style={{ width: 210 }} onChange={this.handleProvinceChange}>
                                    {provinceOptions}
                                </Select>
                                <p>工点：</p>
                                <Select defaultValue={workingpointData[0]} style={{ width: 210 }} onChange={this.handleWorkingpointChange}>
                                    {workingpointOptions}
                                </Select>
                              </div>
                      </section>

                      <section className="monitor_top">
                        <div className="monitor_top_left" style={{width: '80%',height: '609px',backgroundColor: '#ffffff',border: 'solid 0.019rem #d0daf3'}}></div>
                        <div className="monitor_top_right">
                            <div className="monitor_top_right_one">
                                <h2>风险源列表</h2>
                                <ul>
                                    <li className="waring">莲塘保障性住房<Icon type="warning" /></li>
                                    <li className="waring">合正锦园小区人行天桥<Icon type="warning" /></li>
                                    <li className="waring">蕙兰雅居5栋<Icon type="warning" /></li>
                                    <li>蕙兰雅居2栋<Icon type="warning" /></li>
                                    <li>合正锦园南区4栋<Icon type="warning" /></li>
                                </ul>
                            </div>
                            <div className="monitor_top_right_one monitor_top_right_two">
                                <h2>相关预警分布点</h2>
                                <div id="main" style={{ width: '32%', height: '32%'}}></div>
                                <div id="main1" style={{ width: '32%', height: '32%'}}></div>
                            </div>
                        </div>
                      </section>
                     <section className="monitor_bottom">
                        
                        <div id="main2" style={{ width: '47%', height: '290px'}}></div>
                        <div id="main3" style={{ width: '47%', height: '290px'}}></div>
                    </section>
                  </main>
                </div>
            );
    }
}
export default Monitor;
import React from 'react';
import { Select } from 'antd';
// import commit from '../js/commit'
// import ReactDOM from 'react-dom';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
const { Option, OptGroup } = Select;


const provinceData = ['地铁1号线', '地铁2号线', '地铁3号线'];
const workingpointData = ['梧桐山', '笔架山', '莲花山'];
class Workingpoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '1282',
                subtext: '施工监测',
                x: 'center',
                y: 'center',
                itemGap: 3.5,
                textStyle : {
                    color : '#2a78f6',
                    fontFamily : '微软雅黑',
                    fontSize : 36,
                    fontWeight : 'bolder'
                },
                subtextStyle: {
                  color : '#2a78f6',
                  fontFamily : '微软雅黑',
                  fontSize : 14
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['60%', '66%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'}
                    ]
                }
            ]
        });
    }

    render() {
          const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
          const workingpointOptions = workingpointData.map(workingpoint => <Option key={workingpoint}>{workingpoint}</Option>);
            return (
                <div>
                    <main className="content_workingpoint">
                      <section className="content_itemcollect_top">
                              <p>工点总览</p>
                              <div className="content_workingpoint_top">
                                <p>项目名称：</p>
                                <Select defaultValue={provinceData[0]} style={{ width: 210 }} onChange={this.handleProvinceChange}>
                                    {provinceOptions}
                                </Select>
                                <p>工点：</p>
                                <Select defaultValue={workingpointData[0]} style={{ width: 210 }} onChange={this.handleWorkingpointChange}>
                                    {workingpointOptions}
                                </Select>
                              </div>
                      </section>

                      <section>
                        <div style={{width: '100%',height: '10.667rem',backgroundColor: '#ffffff',border: 'solid 0.019rem #d0daf3'}}></div>
                      </section>
                     <section className="content_workingpoint_bottom">
                        <div className="header_mark">
                              <p>施工监测</p>
                              <div id="main" style={{ width: 300, height: 300, margin: '0 auto' }}></div>
                              
                        </div>
                        <div className="header_mark">
                            <p>第三方监测</p>
                        </div>
                        <div className="header_mark">
                            <p>风险源报警列表</p>
                        </div>
                        <div className="header_mark">
                            <p>工点总览</p>

                        </div>
                      </section>
                  </main>
                </div>
            );
    }
}
export default Workingpoint;
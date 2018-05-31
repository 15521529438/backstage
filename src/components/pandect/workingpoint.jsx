import React from 'react';
import { Select, Table } from 'antd';
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
const { Column, ColumnGroup } = Table;


const data = [{
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  firstName: 'Joe',
  lastName: 'Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];
const provinceData = ['地铁1号线', '地铁2号线', '地铁3号线'];
const workingpointData = ['梧桐山', '笔架山', '莲花山'];
class Workingpoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // this.onChange = this.onChange.bind(this);
    }

    createEcharts = (id) => {
      var myChart = echarts.init(document.getElementById(id));
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

    componentDidMount() {
        this.createEcharts('main');
        this.createEcharts('main1');
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
                        <div>
                              <div className="header_mark">
                                <p>施工监测 <time>2018年5月21日</time></p>
                              </div>
                              <div id="main" style={{ width: 300, height: 300, margin: '0 auto' }}></div>
                                <ul className="content_workingpoint_bottom_mark">
                                    <li className="content_workingpoint_bottom_mark_red">
                                        <em>143</em>
                                        <span>红色报警</span>
                                    </li>
                                    <li className="content_workingpoint_bottom_mark_orange">
                                        <em>23</em>
                                        <span>橙色报警</span>
                                    </li>
                                    <li className="content_workingpoint_bottom_mark_yellow">
                                        <em>8</em>
                                        <span>黄色报警</span>
                                    </li>
                                </ul>
                        </div>
                        <div>
                            <div className="header_mark">
                              <p>第三方监测 <time>2018年5月21日</time></p>
                            </div>
                            <div id="main1" style={{ width: 300, height: 300, margin: '0 auto' }}></div>
                            <ul className="content_workingpoint_bottom_mark">
                                    <li className="content_workingpoint_bottom_mark_red">
                                        <em>143</em>
                                        <span>红色报警</span>
                                    </li>
                                    <li className="content_workingpoint_bottom_mark_orange">
                                        <em>23</em>
                                        <span>橙色报警</span>
                                    </li>
                                    <li className="content_workingpoint_bottom_mark_yellow">
                                        <em>8</em>
                                        <span>黄色报警</span>
                                    </li>
                                </ul>
                        </div>
                        <div>
                            <div className="header_mark">
                              <p>风险源报警列表</p>
                            </div>
                            <ul className="content_workingpoint_risk">
                              <li>
                                <span>1. 新时代大厦</span>
                                <time>2018年5月12日</time>
                              </li>
                              <li>
                                <span>1. 新时代大厦</span>
                                <time>2018年5月12日</time>
                              </li>
                               <li>
                                <span>1. 新时代大厦</span>
                                <time>2018年5月12日</time>
                              </li>
                               <li>
                                <span>1. 新时代大厦</span>
                                <time>2018年5月12日</time>
                              </li>
                               <li>
                                <span>1. 新时代大厦</span>
                                <time>2018年5月12日</time>
                              </li>
                            </ul>
                        </div>
                        <div>
                            <Table dataSource={data}>
                               <Column
                                  title="First Name"
                                  dataIndex="firstName"
                                  key="firstName"
                                  width="200"
                                />
                                <Column
                                  title="Last Name"
                                  dataIndex="lastName"
                                  key="lastName"
                                />
                              <Column
                                title="Age"
                                dataIndex="age"
                                key="age"
                              />
                              <Column
                                title="Address"
                                dataIndex="address"
                                key="address"
                              />
                            </Table>
                        </div>
                      </section>
                  </main>
                </div>
            );
    }
}
export default Workingpoint;
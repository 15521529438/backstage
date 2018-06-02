import React from 'react';
//import Tabcontent from '../project/tabcontent'
 //<Tabcontent onRef={this.onRef}></Tabcontent>
import { Tabs, Input, Button, Icon, Select } from 'antd';
import '../project/project.css'
import './risk.css'
const TabPane = Tabs.TabPane;
const { Option } = Select;

const provinceData = ['地铁1号线', '地铁2号线', '地铁3号线'];
const workingpointData = ['梧桐山', '笔架山', '莲花山'];
class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        // this.onChange = this.onChange.bind(this);
    }

    nRef = (ref) => {
        this.child = ref
    }  //主要的数据连接方式

    componentWillMount() {
    }

    callback = (key) => {
        console.log(key);
    }

    render() {
         const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
          const workingpointOptions = workingpointData.map(workingpoint => <Option key={workingpoint}>{workingpoint}</Option>);
            return (
                <div>
                   <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="建（构）筑物" key="1">
                            <div className="message configuration">
                                <span>项目：</span>
                                <Select defaultValue={provinceData[0]} style={{ width: 210 }} onChange={this.handleProvinceChange}>
                                    {provinceOptions}
                                </Select>
                                <span>工点：</span>
                                <Select defaultValue={workingpointData[0]} style={{ width: 210 }} onChange={this.handleWorkingpointChange}>
                                    {workingpointOptions}
                                </Select>
                                <Button type="primary">查询</Button>
                                <Button className="configuration_button">新增</Button>
                            </div>
                            <p className="configuration_filter"><Icon type="filter" />筛选条件</p>
                            <div className="message configuration">
                                <span>筑物名称：</span>
                                <Input placeholder="Basic usage" />
                                 <span>所属项目：</span>
                                <Input placeholder="Basic usage" />
                                <span>工点信息：</span>
                                 <Select defaultValue={provinceData[0]} style={{ width: 210 }} onChange={this.handleProvinceChange}>
                                    {provinceOptions}
                                </Select>
                                 <span>位置：</span>
                                 <Select defaultValue={workingpointData[0]} style={{ width: 210 }} onChange={this.handleWorkingpointChange}>
                                    {workingpointOptions}
                                </Select>
                                <span>配置状态：</span>
                                 <Select defaultValue={workingpointData[0]} style={{ width: 210 }} onChange={this.handleWorkingpointChange}>
                                    {workingpointOptions}
                                </Select>
                                <Button type="primary">搜索</Button>
                                <Button className="configuration_button">更多筛选</Button>
                                <Button className="configuration_button configuration_end_button">下载模板</Button>
                            </div>


                        </TabPane>
                        <TabPane tab="管线" key="2">管线</TabPane>
                  </Tabs>
                </div>
            );
    }
}
export default Configuration;
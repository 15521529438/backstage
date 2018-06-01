import React, { Component } from 'react';
import { Table, Select, Icon, Divider, Button, Input, DatePicker, Tabs } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './riskSourceConfig.css';

const { Option, OptGroup } = Select;
const { Column, ColumnGroup } = Table;
const TabPane = Tabs.TabPane;

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        buildName: `建（构）筑物名称 ${i}`,
        project: `所属项目 ${i}`,
        location: `位置信息 ${i}`,
        riskLevel: `风险等级地调 ${i}`,
        safe: `房屋安全隐患排查 ${i}`,
        status: `配置状态 ${i}`,
    });
}

export default class RiskSourceConfig extends Component {
    state = {
        subWayLines: ['地铁1号线', '地铁2号线', '地铁3号线'],
        workingpointData: ['梧桐山', '笔架山', '莲花山'],
        pointInfor: ['工点信息1', '工点信息2', '工点信息3'],
        configStatus: ['已配置', '未配置'],
        advancedParams: {}, // 高级搜索条件
        baseQueryParams:{ // 基础搜索条件
            pageNum: 1,
            pageSize: 10,
        },
        list: [...data],
    }

    componentWillMount(){

    }
    // 基础搜索查询
    baseQueryList = () => {
        const { baseQueryParams } = this.state;
        console.log('基础搜索参数为:', baseQueryParams)
    }

    // 组合查询参数
    onChangeBaseQueryParams = (val, fileName) => {
        const { baseQueryParams } = this.state;
        this.setState({
            baseQueryParams: {...baseQueryParams, [fileName]: val}
        })
    }

    // 新增
    addNews = () => {
        console.log('新增')
    }

    // 导入
    onImport = () => {
        console.log('Excel导入')
    }

    // 下载模板
    onDownLoadDefault = () => {
        console.log('下载模板')
    }

    // 切换tab
    changeTabContent = val => {
        if(val === '1'){
            console.log('当前为:建（构）筑物')
        }else{
            console.log('当前为:管线')
        }
    }

    // 删除选中
    deleteChoosed = () => {
        console.log('删除选中')
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: '6%',
            editable: true,
        },
        {
            title: '建（构）筑物名称',
            dataIndex: 'buildName',
            width: '20%',
            editable: true,
        },
        {
            title: '所属项目',
            dataIndex: 'project',
            width: '15%',
            editable: true,
        },
        {
            title: '位置信息',
            dataIndex: 'location',
            width: '15%',
            editable: true,
        },

        {
            title: '风险等级地调',
            dataIndex: 'riskLevel',
            width: '15%',
            editable: true,
        },
        {
            title: '房屋安全隐患排查',
            dataIndex: 'safe',
            width: '15%',
            editable: true,
        },
        {
            title: '配置状态',
            dataIndex: 'status',
            width: '15%',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: '8%',
            render: (text, record) => {
                return(
                    <div>
                        <Button shape="circle" icon="delete" style={{background: 'rgba(0,0,0,0)'}}/>
                    </div>
                )
            },
        },
    ];

    render(){
        const { subWayLines, workingpointData, pointInfor, configStatus, list } = this.state;
        return(
            <div className="riskSourceConfigContent">

                <Tabs
                    defaultActiveKey="1"
                    className="riskSourceTabContent"
                    onChange={this.changeTabContent}
                >
                    <TabPane tab={<span className="tabTitle">建（构）筑物</span>} key="1">
                        <div className="baseQueryContent">
                            <div className="formContent">
                                <div className="formItem" style={{width: '30%'}}>
                                    <span style={{width: '25%'}}>项目：</span>
                                    <Select
                                        defaultValue={subWayLines[0]}
                                        style={{ width: '75%', marginRight: 0 }}
                                        onChange={val => this.onChangeBaseQueryParams(val, 'line')}
                                    >
                                        {
                                            subWayLines.map(line => <Option key={line}>{line}</Option>)
                                        }
                                    </Select>
                                </div>
                                <div className="formItem" style={{width: '30%'}}>
                                    <span style={{width: '25%'}}>工点：</span>
                                    <Select
                                        defaultValue={workingpointData[0]}
                                        style={{ width: '75%', marginRight: 0 }}
                                        onChange={val => this.onChangeBaseQueryParams(val, 'point')}
                                    >
                                        {
                                            workingpointData.map(item => <Option key={item}>{item}</Option>)
                                        }
                                    </Select>
                                </div>
                                <div className="formItem" style={{width: '30%'}}>
                                    <Button
                                        style={{marginLeft: 10}}
                                        className="baseHandleBtn"
                                        type="primary"
                                        onClick={this.baseQueryList}>查询
                                    </Button>
                                    <Button style={{border: '1px solid #e0e5f6'}} className="baseHandleBtn" onClick={this.addNews}>新增</Button>
                                </div>
                            </div>
                        </div>
                        <div className="advancedQueryContent">
                            <p className="advancedTitle"><Icon className="filteIcon" type="filter" />筛选条件</p>
                            <div className="formContent">
                                <div className="formItem" style={{width: '19%'}}>
                                    <span style={{width: '45%'}}>筑物名称：</span>
                                    <Input style={{width: '50%'}} placeholder="输入筑物名称"/>
                                </div>
                                <div className="formItem" style={{width: '19%'}}>
                                    <span style={{width: '45%'}}>所属项目：</span>
                                    <Input style={{width: '50%'}} placeholder="输入所属项目"/>
                                </div>
                                <div className="formItem" style={{width: '19%'}}>
                                    <span style={{width: '45%'}}>工点信息：</span>
                                    <Select
                                        defaultValue=''
                                        style={{ width: '50%', marginRight: 0 }}
                                        onChange={val => this.onChangeBaseQueryParams(val, 'mark')}
                                    >
                                        <Option value="">不限</Option>
                                        {
                                            pointInfor.map(item=> {
                                                return(<Option value={item} key={item}>{item}</Option>);
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="formItem" style={{width: '19%'}}>
                                    <span style={{width: '45%'}}>配置状态：</span>
                                    <Select
                                        defaultValue=''
                                        style={{ width: '50%', marginRight: 0 }}
                                        onChange={val => this.onChangeBaseQueryParams(val, 'mark')}
                                    >
                                        <Option value="">不限</Option>
                                        {
                                            configStatus.map(item=>{
                                                return(<Option value={item} key={item}>{item}</Option>);
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="formItem" style={{width: '24%'}}>
                                    <Button
                                        style={{marginLeft: 10}}
                                        className="baseHandleBtn"
                                        type="primary"
                                        onClick={this.advancedQueryList}>搜索
                                    </Button>
                                    <Button
                                        style={{border: '1px solid #e0e5f6'}}
                                        className="baseHandleBtn"
                                        onClick={this.onMoreFilter}
                                    >更多筛选
                                    </Button>
                                    <Button
                                        style={{border: '1px solid #e0e5f6'}}
                                        className="baseHandleBtn"
                                        onClick={this.onDownLoadDefault}
                                    >下载模板
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="listContent">
                            <Table
                                bordered
                                dataSource={list}
                                columns={this.columns}
                                rowClassName="editable-row"
                            />
                            <div className="footerHeadle">
                                <Button
                                    style={{marginLeft: 10}}
                                    className="baseHandleBtn"
                                    type="primary"
                                    onClick={this.deleteChoosed}>删除选中
                                </Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={<span className="tabTitle">管线</span>} key="2">
                        管线管线管线管线管线
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}
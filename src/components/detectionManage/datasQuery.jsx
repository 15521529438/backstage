import React, { Component } from 'react';
import { Table, Select, Button, Radio } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './datasQuery.css';

const { Option } = Select;
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
// const TabPane = Tabs.TabPane;

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        pointNumber: i.toString(),
        type: `类型 ${i}`,
        deepAndDirection: `方向/深度 ${i}`,
        warningLevel: `预警等级 ${i}`,
    });
}

export default class DatasQuery extends Component {
    state = {
        subWayLines: ['地铁1号线', '地铁2号线', '地铁3号线'],
        projectCategory: ['梧桐山', '笔架山', '莲花山'],
        detectionTypes: ['第三方检测', '第三方检测', '第三方检测'],
        warningLevels: ['一级', '二级', '三级'],
        baseQueryParams:{ // 基础搜索条件
            pageNum: 1,
            pageSize: 10,
        },
        list: [...data],
        checkTypes: {
            table: '表模式',
            chart: '图模式',
        },
        currentCheckType: 'chart', // 当前查看模式
        checkDateRange: 1, // 查看时间范围
        checkChart: {
            checkChartDatas: 1, // 查看图表数据
            checkChartType: 1, // 查看图型
        },

    }

    componentWillMount(){

    }
    // 基础搜索查询
    baseQueryList = () => {
        const { baseQueryParams } = this.state;
        console.log('搜索参数为:', baseQueryParams)
    }

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

    // 选择查看模式
    changeCheckType = e => {
        const val = e.target.value;
        this.setState({
            currentCheckType: val,
        })
        console.log('选择适用：', val)
    }

    // 选择时间范围
    onChangeCheckDateRange = e => {
        const val = e.target.value;
        this.setState({
            checkDateRange: val && Number(val),
        })
        console.log('选择查看时间范围: ', val)
    }

    // 设置数据源和图表类型
    chooseChartInfo = (e, fileName) => {
        const { checkChart } = this.state;
        const val = e.target.value;
        this.setState({
            checkChart: {...checkChart, [fileName]: val}
        })
    }

    // 导出数据
    exportDatas = () => {
        console.log('导出数据')
    }

    columns = [
        {
            title: '监测类型',
            dataIndex: 'type',
        },
        {
            title: '测点（孔）号',
            dataIndex: 'pointNumber',
        },
        {
            title: '方向/深度',
            dataIndex: 'deepAndDirection',
        },
        {
            title: '预警等级',
            dataIndex: 'warningLevel',
        },
    ];

    // 生成内容区域
    renderCheckContent = () => {
        const { currentCheckType, checkChart, list } = this.state;
        if(currentCheckType === 'table'){
            return(
                <div className="checkTableType">
                    <Table
                        bordered
                        dataSource={list}
                        columns={this.columns}
                        rowClassName="editable-row"
                    />
                </div>
            );
        }else{
            return(
                <div className="checkLineType">
                    <div className="checkLineTypeHeader">
                        <div className="chooseChartDatas">
                            <span>数据来源：</span>
                            <RadioGroup
                                onChange={val => this.chooseChartInfo(val, 'checkChartDatas')}
                                value={checkChart.checkChartDatas}
                            >
                                <Radio value={1}>第三方监测</Radio>
                                <Radio value={2}>施工监测</Radio>
                            </RadioGroup>
                        </div>
                        <div className="chooseChartType">
                            <span>图类型：</span>
                            <RadioGroup
                                onChange={val => this.chooseChartInfo(val, 'checkChartDatas')}
                                value={checkChart.checkChartDatas}
                            >
                                <Radio value={1}>测量值时间序列曲线</Radio>
                                <Radio value={2}>测斜曲线</Radio>
                            </RadioGroup>
                        </div>
                        <div className="handleContent">
                            <Button
                                style={{marginLeft: 10}}
                                type="primary"
                                onClick={this.exportDatas}>导出数据
                            </Button>
                        </div>
                    </div>
                    <div>
                        图表
                    </div>
                </div>
            );
        }
    }

    render(){
        const {
            subWayLines, projectCategory,
            detectionTypes, warningLevels,
            checkTypes, currentCheckType,
            checkDateRange,
        } = this.state;
        console.log('currentCheckType', currentCheckType)
        return(
            <div className="detectionPointConfigContent">
                <PageHeader title="数据查询"/>
                <div className="baseQueryContent">
                    <div className="formContent">
                        <div className="formItem" style={{width: '20%'}}>
                            <span style={{width: '40%'}}>项目名称：</span>
                            <Select
                                defaultValue={subWayLines[0]}
                                style={{ width: '60%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'chart')}
                            >
                                {
                                    subWayLines.map(line => <Option key={line}>{line}</Option>)
                                }
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '20%'}}>
                            <span style={{width: '40%'}}>项目类别：</span>
                            <Select
                                defaultValue={projectCategory[0]}
                                style={{ width: '60%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'point')}
                            >
                                <Option value="">必填</Option>
                                {
                                    projectCategory.map(item => <Option key={item}>{item}</Option>)
                                }
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '20%'}}>
                            <span style={{width: '40%'}}>测点类型：</span>
                            <Select
                                defaultValue={detectionTypes[0]}
                                style={{ width: '60%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'type')}
                            >
                                <Option value="">全部</Option>
                                {
                                    detectionTypes.map(item => <Option key={item}>{item}</Option>)
                                }
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '20%'}}>
                            <span style={{width: '40%'}}>预警等级：</span>
                            <Select
                                defaultValue={warningLevels[0]}
                                style={{ width: '60%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'type')}
                            >
                                <Option value="">全部</Option>
                                {
                                    warningLevels.map(item => <Option key={item}>{item}</Option>)
                                }
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '20%'}}>
                            <Button
                                style={{marginLeft: 10}}
                                className="baseHandleBtn"
                                type="primary"
                                onClick={this.baseQueryList}>查询
                            </Button>
                            <Button
                                style={{border: '1px solid #e0e5f6'}}
                                className="baseHandleBtn"
                                onClick={this.addNews}
                            >新增
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="detectionDatasContent">
                    <div className="chooseCheckTypeContent">
                        <ButtonGroup
                            onClick={this.changeCheckType}
                        >
                            {
                                Object.keys(checkTypes).map(item=>{
                                    const isCheck = item === currentCheckType;
                                    return(
                                        <Button
                                            key={item}
                                            type={isCheck?"primary":""}
                                            style={isCheck?
                                                {padding: '0 30px'}:{border: '1px solid #2a78f6', padding: '0 30px'}
                                            }
                                            value={item}
                                        >{checkTypes[item]}
                                        </Button>
                                    );
                                })
                            }
                        </ButtonGroup>
                        <div className="chooseDateRange">
                            <span>时间范围：</span>
                            <RadioGroup onChange={this.onChangeCheckDateRange} value={checkDateRange}>
                                <Radio value={1}>最近一日</Radio>
                                <Radio value={2}>最近一周</Radio>
                                <Radio value={3}>最近一月</Radio>
                                <Radio value={4}>自定义</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    {
                        this.renderCheckContent()
                    }
                </div>
            </div>
        );
    }
}
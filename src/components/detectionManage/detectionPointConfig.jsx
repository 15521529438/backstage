import React, { Component } from 'react';
import { Table, Select, Icon, Button, Input } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './detectionPointConfig.css';

const { Option } = Select;

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        number: i.toString(),
        detectionContent: `监测内容 ${i}`,
        detectionObject: `检测对象 ${i}`,
        type: `检测类型 ${i}`,
        deep: 32,
        direction: 32,
        status: `${i/2===0?'已标记':'未标记'}`,
    });
}

export default class DetectionPointConfig extends Component {
    state = {
        subWayLines: ['地铁1号线', '地铁2号线', '地铁3号线'],
        workingpointData: ['梧桐山', '笔架山', '莲花山'],
        detectionTypes: ['第三方检测', '第三方检测', '第三方检测'],
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

    // 高级筛选
    advancedQueryList = () => {
        const { advancedParams, baseQueryParams } = this.state;
        const { pageNum, pageSize } = baseQueryParams;
        console.log('高级搜索参数为:', {...advancedParams, pageNum, pageSize})
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

    // 导入
    onImport = () => {
        console.log('导入')
    }

    // 更多筛选
    onMoreFilter = () => {
        console.log('更多筛选')
    }

    // 下载模板
    onDownLoadDefault = () => {
        console.log('下载模板')
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: '6%',
            editable: true,
        },
        {
            title: '监测内容',
            dataIndex: 'detectionContent',
            width: '15%',
            editable: true,
        },
        {
            title: '监测对象',
            dataIndex: 'detectionObject',
            width: '15%',
            editable: true,
        },
        {
            title: '测点类型',
            dataIndex: 'type',
            width: '10%',
            editable: true,
        },
        {
            title: '测点号',
            dataIndex: 'number',
            width: '10%',
            editable: true,
        },
        {
            title: '监测深度（M）',
            dataIndex: 'deep',
            width: '10%',
            editable: true,
        },
        {
            title: '水平位移方向（X/Y）',
            dataIndex: 'direction',
            width: '10%',
            editable: true,
        },
        {
            title: '标记状态',
            dataIndex: 'status',
            width: '10%',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: '15%',
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
        const { subWayLines, workingpointData, detectionTypes, list } = this.state;
        return(
            <div className="detectionPointConfigContent">
                <PageHeader title="测点列表"/>
                <div className="baseQueryContent">
                    <div className="formContent">
                        <div className="formItem" style={{width: '25%'}}>
                            <span style={{width: '40%'}}>项目名称：</span>
                            <Select
                                defaultValue={subWayLines[0]}
                                style={{ width: '60%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'line')}
                            >
                                {
                                    subWayLines.map(line => <Option key={line}>{line}</Option>)
                                }
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '25%'}}>
                            <span style={{width: '40%'}}>工点：</span>
                            <Select
                                defaultValue={workingpointData[0]}
                                style={{ width: '60%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'point')}
                            >
                                {
                                    workingpointData.map(item => <Option key={item}>{item}</Option>)
                                }
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '25%'}}>
                            <span style={{width: '40%'}}>监测类型：</span>
                            <Select
                                defaultValue={detectionTypes[0]}
                                style={{ width: '60%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'type')}
                            >
                                {
                                    detectionTypes.map(item => <Option key={item}>{item}</Option>)
                                }
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '25%'}}>
                            <Button
                                style={{marginLeft: 10}}
                                className="baseHandleBtn"
                                type="primary"
                                onClick={this.baseQueryList}>查询
                            </Button>
                            <Button style={{border: '1px solid #e0e5f6'}} className="baseHandleBtn" onClick={this.addNews}>新增</Button>
                            <Button style={{border: '1px solid #e0e5f6'}} className="baseHandleBtn" onClick={this.onImport}>导入</Button>
                        </div>
                    </div>
                </div>
                <div className="advancedQueryContent">
                    <p className="advancedTitle"><Icon className="filteIcon" type="filter" />筛选条件</p>
                    <div className="formContent">
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '48%'}}>监测内容：</span>
                            <Input style={{width: '50%'}} placeholder="输入检测内容"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '48%'}}>监测对象：</span>
                            <Input style={{width: '50%'}} placeholder="输入监测对象"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '48%'}}>测点类型：</span>
                            <Input style={{width: '50%'}} placeholder="输入监测类型"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '48%'}}>测点号：</span>
                            <Input style={{width: '50%'}} placeholder="输入监测类型"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '48%'}}>标记状态：</span>
                            <Select
                                defaultValue='1'
                                style={{ width: '50%', marginRight: 0 }}
                                onChange={val => this.onChangeBaseQueryParams(val, 'mark')}
                            >
                                <Option value="1">已标记</Option>
                                <Option value="2">未标记</Option>
                            </Select>
                        </div>
                        <div className="formItem" style={{width: '25%'}}>
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
                <div className="detectionPointList">
                    <Table
                        bordered
                        dataSource={list}
                        columns={this.columns}
                        rowClassName="editable-row"
                    />
                </div>
            </div>
        );
    }
}
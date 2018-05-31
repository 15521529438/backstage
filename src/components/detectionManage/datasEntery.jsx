import React, { Component } from 'react';
import { Table, Select, Icon, Divider, Button, Input, DatePicker } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './datasEntery.css';

const { Option, OptGroup } = Select;
const { Column, ColumnGroup } = Table;

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        detectionContent: `监测点号 ${i}`,
        currentValue: `本次测值 ${i}`,
        deep: `监测深度（M） ${i}`,
        initValue: 32,
    });
}

export default class DatasEntery extends Component {
    state = {
        workingpointData: ['梧桐山', '笔架山', '莲花山'],
        detectionTypes: ['第三方检测', '第三方检测', '第三方检测'],
        baseQueryParams:{ // 基础搜索条件
            pageNum: 1,
            pageSize: 10,
        },
        list: [...data],
    }

    componentWillMount(){

    }
    // 基础搜索查询
    queryList = () => {
        const { baseQueryParams } = this.state;
        console.log('搜索参数为:', baseQueryParams)
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

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: '6%',
            editable: true,
        },
        {
            title: '监测点号',
            dataIndex: 'detectionContent',
            width: '15%',
            editable: true,
        },
        {
            title: '监测深度（M）',
            dataIndex: 'deep',
            width: '15%',
            editable: true,
        },
        {
            title: '水平位移方向（X/Y）',
            dataIndex: 'direction',
            width: '15%',
            editable: true,
        },

        {
            title: '初始值',
            dataIndex: 'initValue',
            width: '15%',
            editable: true,
        },
        {
            title: '本次测值',
            dataIndex: 'currentValue',
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
        const { workingpointData, detectionTypes, list } = this.state;
        return(
            <div className="detectionPointConfigContent">
                <PageHeader title="数据录入"/>
                <div className="baseQueryContent">
                    <div className="formContent">
                        <div className="formItem" style={{width: '20%'}}>
                            <span style={{width: '25%'}}>工点：</span>
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
                        <div className="formItem" style={{width: '20%'}}>
                            <span style={{width: '35%'}}>监测类型：</span>
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
                            <span style={{width: '35%'}}>监测时间：</span>
                            <DatePicker
                                style={{ width: '65%', marginRight: 0 }}
                                placeholder="检测时间"
                                onChange={(date, dateString) => this.onChangeBaseQueryParams(dateString, 'time')}
                            />
                        </div>
                        <div className="formItem" style={{width: '35%'}}>
                            <Button
                                style={{marginLeft: 10}}
                                className="baseHandleBtn"
                                type="primary"
                                onClick={this.queryList}>查询
                            </Button>
                            <Button
                                style={{marginLeft: 10}}
                                className="baseHandleBtn"
                                type="primary"
                                onClick={this.addNews}>新增
                            </Button>
                            <Button
                                style={{border: '1px solid #e0e5f6'}}
                                className="baseHandleBtn"
                                onClick={this.onImport}>Excel导入
                            </Button>
                            <Button
                                style={{border: '1px solid #e0e5f6'}}
                                className="baseHandleBtn"
                                onClick={this.onDownLoadDefault}>模板下载
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
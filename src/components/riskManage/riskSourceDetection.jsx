import React, { Component } from 'react';
import { Table, Select, Icon, Divider, Button, Input, DatePicker } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './riskSourceConfig.css';

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

export default class RiskSourceDetection extends Component {
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

    // 删除选中
    deleteChoosed = () => {
        console.log('删除选中')
    }

    // 保存
    saveCurrent = () => {
        console.log('保存')
    }

    // 返回
    goBack = () => {
        console.log('返回')
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
                    <div className="footerHeadle">
                        <Button
                            style={{marginLeft: 10}}
                            className="baseHandleBtn"
                            type="primary"
                            onClick={this.deleteChoosed}>删除选中
                        </Button>
                        <Button
                            style={{border: '1px solid #2a78f6', color: '#2a78f6'}}
                            className="baseHandleBtn"
                            onClick={this.saveCurrent}>保存
                        </Button>
                        <Button
                            style={{border: '1px solid #2a78f6', color: '#2a78f6'}}
                            className="baseHandleBtn"
                            onClick={this.goBack}>返回
                        </Button>
                    </div>
                    <div className="descContent">
                        <div className="main_content">
                            <span>说明：</span>
                            <p>1.若初始值输入为空，则使用该测点上次录入的初始值。</p>
                            <p>2.若本次测值输入为空，则只进行前期累计变化量计算。</p>
                            <p>3.力的单位为KN,其他数值单位为mm。</p>
                            <p>4.当测点类型为支护桩（墙顶部水平位移时，水平位移方向（X/Y）必填；
                                当测点类型为支护桩(墙）水平位移时，测斜深度m必填测点类型为其他时，
                                水平位移方向（X/Y）和测斜深度m两项均无。</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
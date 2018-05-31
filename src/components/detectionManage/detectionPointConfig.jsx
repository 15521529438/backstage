import React, { Component } from 'react';
import { Select, Table, Icon, Divider, Button, Input } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './detectionPointConfig.css';

const { Option, OptGroup } = Select;
const { Column, ColumnGroup } = Table;

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

    render(){
        const { subWayLines, workingpointData, detectionTypes } = this.state;
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
                            <span style={{width: '40%'}}>监测内容：</span>
                            <Input placeholder="输入检测内容"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '40%'}}>监测对象：</span>
                            <Input placeholder="输入监测对象"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '40%'}}>测点类型：</span>
                            <Input placeholder="输入监测类型"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '40%'}}>测点号：</span>
                            <Input placeholder="输入监测类型"/>
                        </div>
                        <div className="formItem" style={{width: '15%'}}>
                            <span style={{width: '40%'}}>标记状态：</span>
                            <Select
                                defaultValue='1'
                                style={{ width: '60%', marginRight: 0 }}
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
            </div>
        );
    }
}
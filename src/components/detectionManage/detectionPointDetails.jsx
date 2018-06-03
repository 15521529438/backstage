import React, { Component } from 'react';
import { Input, Button } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './detectionPointDetails.css';

const { TextArea } = Input;

export default class DetectionPointDetails extends Component {
    state = {
        details: {
            project: '',
            point: '',
            detectionWay: '',
            detectionDetails: '',
            detectionObject: '',
            detectionType: '',
            moveX: '',
            unit: '',
            initValue: '',
            warningValue: '',
            checkValue: '',
            changeWarningValue: '',
            changeSpeedValue: '',
            checkPointLongitude: '',
            checkPointLatitude: '',
            equipmentName: '',
            equipmentNumber: '',
            startDeep: '',
            endDeep: '',
            remark: '',
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        const { match:{params={}} } = nextProps;
        const { id } = params;
        this.setState({
            id,
            isCheckDetails: id>0,
        }, () => {
            this.queryDetails();
        })
    }
    // 查询详情
    queryDetails = () => {
        const { id } = this.state;
        if(id<=0) return // 新增
        console.log('查看详情')
    }
    // 确定
    save = () => {
        console.log('确定')
    }

    // 返回
    goBack = () => {
        this.props.history.push(`/detectionPointConfig`);
    }

    render(){
        const { isCheckDetails, details } = this.state;
        const {
            project='',
            point='',
            detectionWay='',
            detectionDetails='',
            detectionObject='',
            detectionType='',
            moveX='',
            unit='',
            initValue='',
            warningValue='',
            checkValue='',
            changeWarningValue='',
            changeSpeedValue='',
            checkPointLongitude='',
            checkPointLatitude='',
            equipmentName='',
            equipmentNumber='',
            startDeep='',
            endDeep='',
            remark='',
        } = details
        return(
            <div className="detectionPointDetails">
                <PageHeader title={`测点${isCheckDetails?'详情':'新增'}`}/>
                <div className="formContent">
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>项目：</span>
                        <Input
                            value={project}
                            style={{width: '80%'}}
                            placeHolder="输入项目"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>工点：</span>
                        <Input
                            value={point}
                            style={{width: '80%'}}
                            placeHolder="输入工点"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>监测方：</span>
                        <Input
                            value={detectionWay}
                            style={{width: '80%'}}
                            placeHolder="输入监测方"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>监测内容：</span>
                        <Input
                            value={detectionDetails}
                            style={{width: '80%'}}
                            placeHolder="输入监测内容"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>监测对象：</span>
                        <Input
                            value={detectionObject}
                            style={{width: '80%'}}
                            placeHolder="输入监测对象"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>测点类型：</span>
                        <Input
                            value={detectionType}
                            style={{width: '80%'}}
                            placeHolder="输入测点类型"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>水平方向位移：</span>
                        <Input
                            value={moveX}
                            style={{width: '80%'}}
                            placeHolder="输入水平方向位移"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>单位：</span>
                        <Input
                            value={unit}
                            style={{width: '80%'}}
                            placeHolder="输入单位"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>初始值：</span>
                        <Input
                            value={initValue}
                            style={{width: '80%'}}
                            placeHolder="输入初始值"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>预警值：</span>
                        <Input
                            value={warningValue}
                            style={{width: '80%'}}
                            placeHolder="输入预警值"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>允许值：</span>
                        <Input
                            value={checkValue}
                            style={{width: '80%'}}
                            placeHolder="输入允许值"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>变化速率预警值：</span>
                        <Input
                            value={changeWarningValue}
                            style={{width: '80%'}}
                            placeHolder="输入变化速率预警值"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>变化速率允许值：</span>
                        <Input
                            value={changeSpeedValue}
                            style={{width: '80%'}}
                            placeHolder="输入变化速率允许值"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>测点坐标经度：</span>
                        <Input
                            value={checkPointLongitude}
                            style={{width: '80%'}}
                            placeHolder="输入测点坐标经度"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>测点坐标纬度：</span>
                        <Input
                            value={checkPointLatitude}
                            style={{width: '80%'}}
                            placeHolder="输入测点坐标纬度"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>设备名称：</span>
                        <Input
                            value={equipmentName}
                            style={{width: '80%'}}
                            placeHolder="输入设备名称"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%'}}>设备型号：</span>
                        <Input
                            value={equipmentNumber}
                            style={{width: '80%'}}
                            placeHolder="输入设备型号"
                        />
                    </div>
                    <div className="formItem" style={{width: '33.3333%'}}>
                        <span style={{width: '40%'}}>起始深度：</span>
                        <Input
                            value={startDeep}
                            style={{width: '50%'}}
                            placeHolder="输入起始深度"
                        />
                    </div>
                    <div className="formItem" style={{width: '33.3333%'}}>
                        <span style={{width: '40%'}}>结束深度：</span>
                        <Input
                            value={endDeep}
                            style={{width: '50%'}}
                            placeHolder="输入结束深度"
                        />
                    </div>
                    <div className="formItem" style={{width: '33.3333%'}}>
                        <span style={{width: '40%'}}>结束深度：</span>
                        <Input
                            value={endDeep}
                            style={{width: '50%'}}
                            placeHolder="输入结束深度"
                        />
                    </div>
                    <div className="formItem" style={{width: '100%'}}>
                        <span style={{width: '20%', float: 'left'}}>备注：</span>
                        <TextArea
                            value={remark}
                            style={{width: '80%'}}
                            minRows="2"
                            maxRows="6"
                            placeHolder="备注信息"
                        />
                    </div>
                </div>
                <div className="currentHandle">
                    {
                        isCheckDetails?(<div className="handleBox"><Button
                            className="handleBtn"
                            type="primary"
                            onClick={this.goBack}>返回
                        </Button></div>):(
                            <div className="handleBox">
                                <Button
                                    className="handleBtn"
                                    type="primary"
                                    onClick={this.save}>确定
                                </Button>
                                <Button
                                    className="handleBtn"
                                    style={{border: '1px solid #e0e5f6'}}
                                    onClick={this.goBack}>取消
                                </Button>
                            </div>)
                    }
                </div>
            </div>
        );
    }
}
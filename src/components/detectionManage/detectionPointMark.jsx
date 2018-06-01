import React, { Component } from 'react';
import { Checkbox } from 'antd';
import PageHeader from '../commonComponents/PageHeader/index';
import './detectionPointMark.css';

const inforList = [
    {
        id: 1,
        cavityNum: 'tylsjg657',
        isMark: true,
    },
    {
        id: 2,
        cavityNum: 'tylsjg657',
        isMark: false,
    },
    {
        id: 3,
        cavityNum: 'tylsjg657',
        isMark: false,
    },
    {
        id: 4,
        cavityNum: 'tylsjg657',
        isMark: true,
    },
]
export default class DetectionPointMark extends Component {
    state = {
        list: inforList,
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        const { match:{params={}} } = nextProps;
        const { id } = params;
        this.setState({
            id,
        }, () => {
            this.queryDetails();
        })
    }

    // 查询获取
    queryDetails = () => {
        console.log('查询获取')
    }
    // 确定
    save = () => {
        console.log('确定')
    }

    // 返回
    goBack = () => {
        console.log('返回')
    }



    // checkbox
    onChangeBox = (e, id) => {
        const { list=[] } = this.state;
        const newList = [...list];
        const curOpt = newList.filter(item=>item.id === id)[0]||{};
        curOpt.isMark = e.target.checked;
        this.setState({
            list: newList,
        })
    }

    render(){
        const { list } = this.state;
        return(
            <div className="detectionPointMarkContent">
                <PageHeader title="测点标记"/>
                <div className="markContent">
                    <div className="markInfor">
                        <span className="title">测点信息</span>
                        <div className="baseInfor">
                            <p><span>测点孔号：</span>TY6524</p>
                            <p><span>检测内容：</span>支护结构</p>
                            <p><span>测点坐标经度：</span></p>
                            <p><span>测点坐标纬度：</span></p>
                        </div>
                        <span className="title">测点列表</span>
                        <div className="otherInfor">
                            <div className="tableList">
                                <span>测点孔号</span>
                                <span>是否标记</span>
                            </div>
                            {
                                list.map(item => {
                                    return(
                                        <div key={item.id} className="tableList">
                                            <span>{item.cavityNum}</span>
                                            <span><Checkbox
                                                checked={item.isMark}
                                                onChange={e=>this.onChangeBox(e, item.id)}
                                            /></span>
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </div>
                    <div className="markLeft">&nbsp;</div>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import PageHeader from '../../commonComponents/PageHeader/index';


export default class DetectionPointConfig extends Component {
    render(){
        return(
            <div className="detectionPointConfigContent">
                <PageHeader title="测点列表"/>
                <div className="baseQueryContent">
                    <div>
                        <p>项目名称：</p>
                    </div>
                </div>
            </div>
        );
    }
}
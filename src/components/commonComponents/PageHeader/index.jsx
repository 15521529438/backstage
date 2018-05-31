import React, { Component } from 'react';
import './index.css';


export default class PageHeader extends Component {
    render(){
        const { title='' } = this.props;
        return(
            <div className="pageHeaderContent">
                <div><i className="titleLine">&nbsp;</i><span className="pageTitle">{title}</span></div>
            </div>
        );
    }
}
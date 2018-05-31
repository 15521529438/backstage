import React, { Component } from 'react';
import './index.css';


export default class PageHeader extends Component {
    render(){
        const { title='' } = this.props;
        return(
            <div className="pageHeaderContent">
                <div><i className="titleLine"></i><span className="pageTitle">{title}</span></div>
            </div>
        );
    }
}
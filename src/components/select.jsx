import React from 'react';
import { DatePicker, Button, Input } from 'antd';
import Tabcontent from './tabcontent'
import Drop from './dropdown';
import commit from '../js/commit'
const { RangePicker } = DatePicker;
const Search = Input.Search;
// import ReactDOM from 'react-dom';

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        index:i,
        name: `name ${i}`,
        user: `user ${i}`,
        section: `section ${i}`,
        time: `时间${i}`,
        gift: `礼物${i}`
    });
}
for (let i = 46; i < 50; i++) {
    data.push({
        key: i,
        index:i,
        name: `张三 ${i}`,
        user: `user ${i}`,
        section: `section ${i}`,
        time: `时间${i}`,
        gift: `礼物${i}`
    });
}

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'key',
                width: '12%'
            }, {
                title: '姓名',
                dataIndex: 'name',
                width: '12%'
            }, {
                title: '帐号',
                dataIndex: 'account',
                width: '12%'
            }, {
                title: '部门',
                dataIndex: 'department',
                width: '12%'
            }, {
                title: '生日日期',
                dataIndex: 'brithday',
                width: '12%'
            }, {
                title: '礼品名称',
                dataIndex: 'giftName',
                width: '30%'
            }],
            data: []
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        var self = this;
        let ticket = commit.getUrlParam('ticket');
        self.setState({ticket})
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getPersonSystemGift?ticket=' + ticket,
            {
                "startDate": "",
                "endDate": "",
                "name": "",
                "page": 1,
                "size": 500
            },
            function (response) {
                let data = response.data && response.data.data.list
                data.forEach(function (currentValue, index) {
                    currentValue.key = index + 1
                });
                self.child.setState({data: data})
            },
            '获取已选择系统礼物用户数据失败')
    }

    onRef = (ref) => {
        this.child = ref
    }

    search(searchName) {
        // if(!searchName) {
        //     this.setState({searchName:''})
        //     return false;
        // }
        let dataStringArray = this.state.dateString?this.state.dateString:['',''];
        const self = this;
        searchName = searchName===''?'':searchName;
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getPersonSystemGift?ticket=' + this.state.ticket,
            {
                "startDate": dataStringArray[0],
                "endDate": dataStringArray[1],
                "name": searchName,
                "page": 1,
                "size": 500
            },
            function (response) {
                let data = response.data && response.data.data.list
                data.forEach(function (currentValue, index) {
                    currentValue.key = index + 1
                });
                self.setState({searchName})
                self.child.setState({data: data})
            },
            '获取已选择系统礼物用户数据失败')
    }

    // query() {
    //     if(!this.state.dateString) return false;
    //     let searchName = this.state.searchName?this.state.searchName:'';
    //     const self = this;
    //     commit.DELETEDATA(
    //         'http://10.0.40.130/brithdayblessDev/rest/getPersonSystemGift?ticket=' + this.state.ticket,
    //         {
    //             "startDate": this.state.dateString[0],
    //             "endDate": this.state.dateString[1],
    //             "name": searchName,
    //             "page": 1,
    //             "size": 10
    //         },
    //         function (response) {
    //             let data = response.data && response.data.data.list
    //             data.forEach(function (currentValue, index) {
    //                 currentValue.key = index + 1
    //             });
    //             self.child.setState({data: data})
    //         },
    //         '获取已选择系统礼物用户数据失败')
    // }

    onChange(data,dateString) {
        this.setState({dateString});
    }

    weekData() {
        const startDate = commit.obtainDate();
        let data = new Date().getTime() - 7 * 24 * 3600 * 1000;
        const endDate = commit.obtainDate(data);
        // let searchName = this.state.searchName?this.state.searchName:'';
        const self = this;
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getPersonSystemGift?ticket=' + this.state.ticket,
            {
                "startDate": endDate,
                "endDate": startDate,
                // "name": searchName,
                "name": '',
                "page": 1,
                "size": 500
            },
            function (response) {
                let data = response.data && response.data.data.list
                data.forEach(function (currentValue, index) {
                    currentValue.key = index + 1
                });
                self.child.setState({data: data})
            },
            '获取已选择系统礼物用户数据失败')
    }

    export() {
        let dateString = this.state.dateString ? this.state.dateString : ['',''];
        //window.location.href=`http://10.0.40.130/brithdaybless/rest/exportSystemGift?ticket=${this.state.ticket}&page=1&size=500&startDate=${dateString[0]}&endDate=${dateString[1]}`
        window.location.href='http://10.0.40.130/brithdaybless/rest/exportSystemGift?ticket=' +
            this.state.ticket + '&page=1&size=500&startDate=' +
            dateString[0] +'&endDate=' +
            dateString[1];
    }

    render() {
        // if (this.state.data && this.state.data.length > 0) {
            return (
                <div>
                    <div className="layout-header">
                        <section className="layout-header-section" style={{padding: '15px 0 6px'}}>
                            <h5>礼品选择明细</h5>
                            <Button onClick={this.export.bind(this)}>导出</Button>
                        </section>
                    </div>
                    <div style={{margin: '20px 0 10px',textAlign:'right'}} className="table-top">
                        <Drop />
                        {/*<p>近一周</p>*/}
                        <Button onClick={this.weekData.bind(this)}>近一周</Button>
                        <time className="table-time">
                            <p style={{color: '#282a2d'}}>日期范围</p>
                            <RangePicker onChange={this.onChange} placeholder={['起始日期', '结束日期']} allowClear='false'/>
                            {/*<Button onClick={this.query.bind(this)}>查询</Button>*/}
                        </time>
                        <section className="table-search">
                            <Search
                                placeholder="请输入员工姓名"
                                onSearch={this.search.bind(this)}
                                enterButton
                            />
                        </section>
                    </div>
                    <Tabcontent columns={this.state.columns} data={this.state.data} handle={false}
                                onRef={this.onRef}></Tabcontent>
                </div>
            );
        // } else {
        //     return (
        //         <div>暂无数据！</div>
        //     )
        // }
    }
}
export default Select;
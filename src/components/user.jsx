import React from 'react';
import { Button, Input, Upload, message, Popconfirm } from 'antd';
import Tabcontent from './tabcontent'
import Drop from './dropdown';
import commit from '../js/commit'
import '../css/user.css';
const Search = Input.Search;
// import ReactDOM from 'react-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns : [{
                title: '序号',
                dataIndex: 'key'
            }, {
                title: '姓名',
                dataIndex: 'name'
            }, {
                title: '帐号',
                dataIndex: 'account'
            },{
                title: '部门',
                dataIndex: 'department'
            },{
                title: '生日日期',
                dataIndex: 'brithday'
            }],
            addStatus: false,
            addText: [{
                a:''
            },{
                b:''
            },{
                c:''
            },{
                d:''
            }],
            data: []
        };
        this.queryUser = this.queryUser.bind(this);
    }

    onRef = (ref) => {
        this.child = ref
    }

    componentWillMount() {
        let ticket = commit.getUrlParam('ticket');
        this.setState({ticket});
        this.queryUser(ticket, this, true);
    }

    queryUser(ticket, self, childer) {
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getPerson?ticket='+ ticket,
            {
                "name":"",
                "page":1,
                "size":500
            },
            function (response) {
                let data = response.data&&response.data.data.list
                data.forEach(function(currentValue, index){
                    currentValue.key = index+1
                });
                childer?self.child.setState({data: data}):self.setState({data: data});
                // self.setState({data: data})
            },
            '查询用户信息失败')
    }

    rubbishData(r) {
        let key = r.key;
        let that = this.child;
        let self = this;
        const dataSource = [...that.state.data];
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/deletePerson?ticket='+ self.state.ticket,
            {"accounts": r.account},
            function (response) {
                if (response.data && response.data.success) {
                    that.setState({data: dataSource.filter(item => item.key !== key)});
                    self.queryUser(self.state.ticket, self, true)
                }
            },
            '删除用户数据失败')
    }

    deleteData() {
        const children = this.child;
        let selectedKeys = children.state.selectedKeys;
        let accountString = ''
        let self = this;
        let selectedRowKeys = children.state.selectedRowKeys
        if(!selectedRowKeys || selectedRowKeys.length===0){
            message.error('至少选择一条数据删除!');
            return false;
        };
        for(let i=0,j=selectedKeys.length;i<j;i++) {
            accountString += selectedKeys[i].account + (i===j-1?'':',');
        }
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/deletePerson?ticket='+ this.state.ticket,
            { "accounts": accountString},
            function (response) {
                if (response.data&&response.data.success){
                    commit.deleteData(self)
                    self.queryUser(self.state.ticket, self, true);
                    children.setState({selectedRowKeys: []});
                }
            },
            '删除用户数据失败')
    }

    search(v) {
        v===''? this.queryUser(this.state.ticket, this, true):commit.search(this,v);
    }

    addStatus() {
        this.setState({addStatus: !this.state.addStatus})
    }

    addData() {
        let addText = this.state.addText;
        let inputs = document.querySelectorAll('.layout-aside-input input');
        // for(let i=0;i<4;i++){
        //     inputs[i].value = ''
        // }
        let child = this.child;
        const self = this;
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/addPerson?ticket='+ this.state.ticket,
            {
                "name": addText[0].a,
                "account": addText[1].b,
                "brithday": addText[3].d,
                "department":addText[2].c
            },
            function (response) {
                console.log('response', response.data.success)
                // message.success(`导入成功！`);
                let status = response.data&&response.data.success
                if (!status) {
                    message.error(response.data.error);
                    return false;
                }
                child.handleAdd(addText[0].a,addText[1].b,addText[2].c,addText[3].d);
                self.setState({addStatus: !self.state.addStatus});
                self.queryUser(self.state.ticket, self, true);
                self.child.setState({selectedRowKeys: []});
                for(let i=0;i<4;i++){
                    inputs[i].value = ''
                };
            },
            '新增用户数据接口')
    }

    saveData(value) {
        console.log('value',value)
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/updatePerson?ticket='+ this.state.ticket,
            {
                "name": value.name,
                "account": value.account,
                "brithday": value.brithday,
                "department":value.department
            },
            function (response) {
                console.log('response', response)
            },
            '修改用户数据接口')
    }

    inputChange(x,event) {
        let tests = this.state.addText
        switch(x) {
            case 'a':
                tests[0].a = event.target.value
                break;
            case 'b':
                tests[1].b = event.target.value
                break;
            case 'c':
                tests[2].c = event.target.value
                break;
            case 'd':
                tests[3].d = event.target.value
                break;
            default:
                break;
        }
        this.setState({addText: tests})
    }

    render() {
        let addStyle = this.state.addStatus ? {display:'block'} : {display:'none'};
        let self = this;
        const props = {
            name: 'file',
            action: 'http://10.0.40.130/brithdaybless/rest/importExcel?ticket=' + this.state.ticket,
            headers: {
                // authorization: 'authorization-text',
                ContentType: 'application/x-www-form-urlencoded'
            },
            onChange(info) {
                let antList = document.querySelector('.ant-upload-list');
                antList.style.display = 'block';
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`导入成功！`);
                    antList.style.display = 'none';
                    self.queryUser(self.state.ticket, self, true);
                } else if (info.file.status === 'error') {
                    message.error(`导入失败！`);
                }
            },
        };
        // if (this.state.data&&this.state.data.length>0) {
            return (
                <div>
                    <div className="layout-header">
                        <section className="layout-header-section">
                            <h5>用户管理</h5>
                            <Upload className="layout-header-import" {...props}><Button>导入</Button></Upload>
                            <Popconfirm title={'确认删除?'} onConfirm={this.deleteData.bind(this)} okText="确认" cancelText="取消">
                                <Button>删除</Button>
                            </Popconfirm>
                            <Button onClick={this.addStatus.bind(this)}>新增</Button>
                        </section>
                    </div>
                    <div style={{margin: '20px 0 10px'}} className="table-top">
                        <Drop />
                        <section className="table-search">
                            <Search
                                placeholder="请输入员工姓名"
                                onSearch={this.search.bind(this)}
                                enterButton
                            />
                        </section>
                    </div>
                    <Tabcontent columns={this.state.columns} data={this.state.data} handle={true} amend={true}
                                onRef={this.onRef} rubbishData={this.rubbishData.bind(this)} saveData={this.saveData.bind(this)}></Tabcontent>
                    <aside className="layout-aside" style={addStyle}>
                        <section>
                            <article className="layout-aside-article">
                                <h4>新增</h4>
                                <Button shape="circle" icon="close" style={{background: 'rgba(0,0,0,0)'}}
                                        onClick={this.addStatus.bind(this)}/>
                            </article>
                            <div className="layout-aside-input">
                                <Input placeholder="张三" addonBefore={<span>姓名 <span style={{color:'red'}}>*</span></span>}
                                       onChange={this.inputChange.bind(this, 'a')}/>
                                <Input placeholder="zhangsan" addonBefore={<span>帐号 <span style={{color:'red'}}>*</span></span>}
                                       onChange={this.inputChange.bind(this, 'b')}/>
                                <Input placeholder="阵地中心" addonBefore={<span>部门</span>}
                                       onChange={this.inputChange.bind(this, 'c')}/>
                                <Input placeholder="2017-04-12 必须格式！" addonBefore={<span>生日日期 <span style={{color:'red'}}>*</span></span>}
                                       onChange={this.inputChange.bind(this, 'd')}/>
                            </div>
                            <footer className="layout-aside-footer">
                                <button onClick={this.addData.bind(this)}>确认</button>
                                <button onClick={this.addStatus.bind(this)}>取消</button>
                            </footer>
                        </section>
                    </aside>
                </div>
            );
        // }else{
        //     return (
        //         <div>暂无数据！</div>
        //     )
        // }
    }
}

export default User;
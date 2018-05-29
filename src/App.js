import React, { Component } from 'react';
import { HashRouter, Route} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Select from './components/select'
import Banner from './components/banner'
import Company from './components/company'
import Giftdivision from './components/giftdivision'
import Thanks from './components/thanks'
import User from './components/user'
import commit from './js/commit'
import './App.css';

import logo from './img/logo.png'
import protrait from './img/protrait.png'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar: protrait
        };
        this.goTo = this.goTo.bind(this);
    }

    componentWillMount() {
        let ticket = commit.getUrlParam('ticket');
        let pathName = this.props.location.pathname;
        const self= this;
        commit.GETDATA(
            'http://10.0.40.130/brithdaybless/rest/nowPersonInfo?ticket=' + ticket, {},
            function (response) {
                if (response.data&&response.data.data){
                    self.setState({
                        ticket,
                        data:response.data.data,
                        avatar:response.data.data.photoUrl
                    });
                };
            },
            '获取当前登入用户信息失败')
        let defaultKeys;
        let sub;
        switch(pathName) {
            case '/banner':
                defaultKeys = '1';
                break;
            case '/select':
                defaultKeys = '2';
                break;
            case '/user':
                defaultKeys = '3';
                break;
            case '/company':
                defaultKeys = '4';
                sub = 'sub1';
                break;
            case '/giftdivision':
                defaultKeys = '5';
                sub = 'sub1';
                break;
            case '/thanks':
                defaultKeys = '6';
                sub = 'sub1';
                break;
            default:
                defaultKeys = '1';
                break;
        }
        this.setState({defaultKeys, sub})
        // this.setState({ticket})
    }

    goTo(param){
        // let self = this;
        switch (param.key) {
            case '1' :
                this.props.history.push("/banner?ticket="+this.state.ticket);
                break;
            case '2' :
                this.props.history.push("/select?ticket="+this.state.ticket);
                break;
            case '3' :
                this.props.history.push("/user?ticket="+this.state.ticket);
                break;
            case '4' :
                this.props.history.push("/company?ticket="+this.state.ticket);
                break;
            case '5' :
                this.props.history.push("/giftdivision?ticket="+this.state.ticket);
                break;
            case '6' :
                this.props.history.push("/thanks?ticket="+this.state.ticket);
                break;
            default :
                break;
        }
    }
    render() {
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        // console.log('ticket',ticket)
        // if (this.state.ticket) {
        // <p><img src={ this.state.avatar } alt="" className="hgroupAvatar"/>{this.state.data.username}</p>   113行的
        if (true) {    
            return (
                <Layout>
                    <Header className="header">
                        <hgroup className="logo">
                            <img src={ logo } alt=""/>
                            <p>生日祝福</p>
                        </hgroup>
                        <hgroup className="headerExit">
                             
                            <p>退出</p>
                        </hgroup>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                theme="dark"
                                defaultSelectedKeys={[this.state.defaultKeys]}
                                defaultOpenKeys={[this.state.sub]}
                                style={{ height: '100%', borderRight: 0 }}
                                onClick={this.goTo}
                            >
                                <Menu.Item key="1" className="menu-first">
                                    <Icon type="bars" />
                                    Banner管理
                                </Menu.Item>
                                <SubMenu key="sub1" title={<span><Icon type="gift" /><span>礼品/礼物管理</span></span>}>
                                    <Menu.Item key="4">公司礼品</Menu.Item>
                                    <Menu.Item key="5">礼物专区</Menu.Item>
                                    <Menu.Item key="6">答谢专区</Menu.Item>
                                </SubMenu>
                                <Menu.Item key="2">
                                    <Icon type="profile" />
                                    礼品选择明细
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="user" />
                                    用户管理
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '24px', position: 'relative' }}>
                            <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
                                <HashRouter>
                                    <div>
                                        <Route path = '/banner' component = {Banner} />
                                        <Route path = '/select' component = {Select} />
                                        <Route path = '/company' component = {Company} />
                                        <Route path = '/giftdivision' component = {Giftdivision} />
                                        <Route path = '/thanks' component = {Thanks} />
                                        <Route path = '/user' component = {User} />
                                    </div>
                                </HashRouter>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }else{
            return (
                <div style={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%,-50%)'}}>暂无权限！</div>
            )
        }
    }
}

export default App;

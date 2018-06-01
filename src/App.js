import React, { Component } from 'react';
import { HashRouter, Route} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Itemcollect from './components/pandect/itemcollect'
import Workingpoint from './components/pandect/workingpoint'
import Projectmessage from './components/project/projectmessage'
import Projectprogress from './components/project/projectprogress'
import Projectdocument from './components/project/projectdocument'
import DetectionPointConfig from './components/detectionManage/detectionPointConfig';
import DetectionPointMark from './components/detectionManage/detectionPointMark';
import DetectionPointDetails from './components/detectionManage/detectionPointDetails';
import DatasEntery from './components/detectionManage/datasEntery';
import DatasQuery from './components/detectionManage/datasQuery';
import RiskSourceConfig from './components/riskManage/riskSourceConfig';
import RiskSourceDetection from './components/riskManage/riskSourceDetection';
// import commit from './js/commit'
import './App.css';
import protrait from './img/protrait.png'
import menus from './menus';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar: protrait
        };
        this.goTo = this.goTo.bind(this);
    }

    componentWillMount() {
        let pathName = this.props.location.pathname;
        let defaultKeys;
        let sub;
        switch(pathName) {
            case '/banner':
                defaultKeys = '1';
                sub = 'sub1';
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
                sub = 'sub1';
                break;
        }
        this.setState({defaultKeys, sub})
        // this.setState({ticket})
    }

    goTo(param={}){
        const { item={} } = param;
        if(item.props && item.props.routePath){
            const routePath = item.props.routePath;
            this.props.history.push(`${routePath}`);
        }
    }

    // 生成菜单
    createSideFirstMenus = (menus=[]) => {
        if(!menus) return;
        return menus.map(item => {
            const { key, name, icon, isMenuFirst, children=[], routePath="" } =item;
            const menuTitle = <span><Icon type={icon} /><span>{name}</span></span>
            return(
                <SubMenu key={key} title={menuTitle} className={isMenuFirst?"menu-first":""}>
                    {
                        children.map(secItem => {
                            const secPath = `${routePath}/${secItem.routePath}`;
                            return(
                                <Menu.Item key={secItem.key} routePath={secPath}>{secItem.name}</Menu.Item>
                            );
                        })
                    }
                </SubMenu>
            );
        })
    }

    render() {
        // console.log('ticket',ticket)
        if (true) {
            return (
                <Layout>
                    <Header className="header">
                        <hgroup className="logo">
                            <p>深圳市地铁施工监测管理与预警系统</p>
                        </hgroup>
                        <hgroup className="headerExit">

                            <p>退出</p>
                        </hgroup>
                    </Header>
                    <Layout>
                        <Sider style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                theme="dark"
                                defaultSelectedKeys={[this.state.defaultKeys]}
                                defaultOpenKeys={[this.state.sub]}
                                style={{ height: '100%', borderRight: 0 }}
                                onClick={this.goTo}
                            >
                            {
                                this.createSideFirstMenus(menus)
                            }
                                 {/*<SubMenu key="sub1" title={<span><Icon type="gift" /><span>信息总览</span></span>} className="menu-first">
                                    <Menu.Item key="1" routePath="/banner">数据驾驶舱</Menu.Item>
                                    <Menu.Item key="2" routePath="/itemcollect">项目总览 </Menu.Item>
                                    <Menu.Item key="3" routePath="/workingpoint">工点总览</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="gift" /><span>工程配置</span></span>}>
                                    <Menu.Item key="4" routePath="/company">信息项目配置</Menu.Item>
                                    <Menu.Item key="5" routePath="/giftdivision">工程进度管理</Menu.Item>
                                    <Menu.Item key="6" routePath="/thanks">工程文档管理</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="gift" /><span>检测管理</span></span>}>
                                    <Menu.Item key="7" routePath="/itemcollect">测点配置</Menu.Item>
                                    <Menu.Item key="8" routePath="/itemcollect">数据录入</Menu.Item>
                                    <Menu.Item key="9" routePath="/itemcollect">数据查询</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" title={<span><Icon type="gift" /><span>风险源管理</span></span>}>
                                    <Menu.Item key="10" routePath="/itemcollect">测点配置</Menu.Item>
                                    <Menu.Item key="11" routePath="/itemcollect">数据录入</Menu.Item>
                                    <Menu.Item key="12" routePath="/itemcollect">数据查询</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub5" title={<span><Icon type="gift" /><span>预警分级处理</span></span>}>
                                    <Menu.Item key="13" routePath="/itemcollect">预警推送</Menu.Item>
                                    <Menu.Item key="14" routePath="/itemcollect">数据录入</Menu.Item>
                                    <Menu.Item key="15" routePath="/itemcollect">数据查询</Menu.Item>
                                </SubMenu>*/}
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '24px', position: 'relative',paddingRight: 0 }}>
                            <Content style={{ background: '#fff', margin: 0 }}>
                                <HashRouter>
                                    <div>
                                        <Route path = '/itemcollect' component = {Itemcollect} />
                                        <Route path = '/workingpoint' component = {Workingpoint} />
                                        <Route path = '/detectionPointConfig' component = {DetectionPointConfig} />
                                        <Route path = '/detectionPointMark/:id' component = {DetectionPointMark} />
                                        <Route path = '/detectionPointDetails/:id' component = {DetectionPointDetails} />
                                        <Route path = '/datasEntery' component = {DatasEntery} />
                                        <Route path = '/datasQuery' component = {DatasQuery} />
                                        <Route path = '/riskSourceConfig' component = {RiskSourceConfig} />
                                        <Route path = '/riskSourceDetection' component = {RiskSourceDetection} />
                                        <Route path = '/projectmessage' component = {Projectmessage} />
                                        <Route path = '/projectprogress' component = {Projectprogress} />
                                        <Route path = '/projectdocument' component = {Projectdocument} />
                                        
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

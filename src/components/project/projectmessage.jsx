import React from 'react';
// import commit from '../js/commit.js'
// import ReactDOM from 'react-dom';
import Tabcontent from '../project/tabcontent'
import { Tabs, Input, Button  } from 'antd';
import './project.css'
const TabPane = Tabs.TabPane;

class Projectmessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        // this.onChange = this.onChange.bind(this);
    }

    nRef = (ref) => {
        this.child = ref
    }  //主要的数据连接方式

    componentWillMount() {
    }

    callback = (key) => {
        console.log(key);
    }

    render() {
            return (
                <div>
                   <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="标段" key="1">
                            <div className="message">
                                <span>项目名称：</span>
                                <Input placeholder="Basic usage" />
                                <span>项目类别：</span>
                                <Input placeholder="Basic usage" />
                                <span>项目区域：</span>
                                <Input placeholder="Basic usage" />
                                <span>工程状态：</span>
                                <Input className="message_input_last" placeholder="Basic usage" />
                                <Button type="primary">查询</Button>
                                <Button className="message_button_last">新增</Button>
                            </div>
                            <Tabcontent onRef={this.onRef}></Tabcontent>
                        </TabPane>
                        <TabPane tab="工点" key="2">工点</TabPane>
                        <TabPane tab="人员" key="3">人员</TabPane>
                        <TabPane tab="单位" key="4">单位</TabPane>
                  </Tabs>
                </div>
            );
    }
}
export default Projectmessage;
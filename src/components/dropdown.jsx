import React from 'react';
import { Menu, Dropdown, Icon, message, Button } from 'antd';

class Drop extends React.Component {
    render() {
        const onClick = function ({ key }) {
            message.info(`Click on item ${key}`);
        };

        const menu = (
            <Menu onClick={onClick}>
                <Menu.Item key="1">阵地中心</Menu.Item>
                <Menu.Item key="2">拓展业务中心</Menu.Item>
                <Menu.Item key="3">能力平台</Menu.Item>
                <Menu.Item key="4">运维平台</Menu.Item>
                <Menu.Item key="5">产品孵化中心</Menu.Item>
            </Menu>
        );
        return (
            <div style={{visibility:'hidden'}}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button>
                        全部 <Icon type="down" />
                    </Button>
                    {/*<a className="ant-dropdown-link" href="">*/}
                        {/*全部<Icon type="down" />*/}
                    {/*</a>*/}
                </Dropdown>
            </div>
        );
    }
}

export default Drop;
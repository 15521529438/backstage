import React from 'react';
import Tabcontent from '../project/tabcontent'

import { Button, Select } from 'antd';
import './project.css'
const { Option } = Select;

const provinceData = ['地铁1号线', '地铁2号线', '地铁3号线'];
class Projectdocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondCity: provinceData[0]
        }
        // this.onChange = this.onChange.bind(this);
    }

    onRef = (ref) => {
        this.child = ref
    }  //主要的数据连接方式

    componentWillMount() {
    }


    render() {
        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
            return (
                <div>
                    <section className="content_itemcollect_top">
                        <p>检测方案</p>
                    </section>
                    <div className="message doc">
                        <span>所属工程：</span>
                        <Select defaultValue={provinceData[0]} style={{ width: 373 }} onChange={this.handleProvinceChange}>
                            {provinceOptions}
                        </Select>
                        <Button type="primary">查询</Button>
                        <Button className="message_button_last">新增</Button>
                    </div>
                    <Tabcontent onRef={this.onRef}></Tabcontent>
                </div>
            );
    }
}
export default Projectdocument;
import React from 'react';
import Tabcontent from '../project/tabcontent'

import { Button, Select, DatePicker } from 'antd';
import '../project/project.css';
import './earlyWarning.css'
const { Option } = Select;

const provinceData = ['地铁1号线', '地铁2号线', '地铁3号线'];
class Waringpush extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondCity: provinceData[0]
        }
        // this.onChange = this.onChange.bind(this);
    }

    nRef = (ref) => {
        this.child = ref
    }  //主要的数据连接方式

    componentWillMount() {
    }


    onChange = (date, dateString) =>{
        console.log(date, dateString);
    }

    render() {
        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
            return (
                <div>
                    <section className="content_itemcollect_top">
                        <p>预警推送</p>
                    </section>
                    <div className="message progress waringPush">
                        <span>预警等级：</span>
                        <Select defaultValue={provinceData[0]} style={{ width: 264 }} onChange={this.handleProvinceChange}>
                            {provinceOptions}
                        </Select>
                        <span>更新时间：</span>
                        <DatePicker onChange={this.onChange} style={{width:'264px'}}/>
                        <Button type="primary">查询</Button>
                        <Button className="message_button_last">新增</Button>
                    </div>
                    <Tabcontent onRef={this.onRef}></Tabcontent>
                </div>
            );
    }
}
export default Waringpush;
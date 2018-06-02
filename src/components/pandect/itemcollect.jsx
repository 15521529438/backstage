import React from 'react';
import { Select, Table, Divider, Icon   } from 'antd';

// import Tabcontent from './tabcontent'
// import Drop from './dropdown';
// import commit from '../js/commit.js'
// const { RangePicker } = DatePicker;
// const Search = Input.Search;
// import ReactDOM from 'react-dom';
const { Option } = Select;


const provinceData = ['地铁1号线', '地铁2号线', '地铁3号线'];
const columns = [{
  title: '序号',
  dataIndex: 'age',
  key: 'age',
  width: 68,
},{
  title: '工点名称',
  dataIndex: 'name',
  key: 'name',
  width: 169,
},{
  title: '施工项目',
  dataIndex: 'street',
  key: 'street',
  width: 169,
},{
  title: '施工进度',
  dataIndex: 'number',
  key: 'number',
  width: 97,
}, {
      title: '第三方监测',
      children: [{
        title: '监测单位',
        dataIndex: 'building',
        key: 'building',
        width: 221,
      }, {
        title: '报警数量.',
        dataIndex: 'number',
        key: 'number',
        width: 95 ,
      }, {
        title: '超控数量',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }],
    },  {
      title: '施工监测',
      children: [{
        title: '监测单位',
        dataIndex: 'building',
        key: 'building',
        width: 220,
      }, {
        title: '报警数量',
        dataIndex: 'number',
        key: 'number',
        width: 95,
      }, {
        title: '超控数量',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }],
    },{
      title: '查看更多',
      dataIndex: 'name',
      key: 'name',
      width: 295,
      render: (text, record) => (
        <span>
          <a>Action</a>
          <Divider type="vertical" />
          <a>Delete</a>
          <Divider type="vertical" />
          <a className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    // gender: 'M',
  });
}

class Itemcollect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondCity: provinceData[0]
        }
        // this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
    }

    handleChange = (value) => {
        this.setState({
          secondCity: value,
        });
    }

    onChange(data,dateString) {
        this.setState({dateString});
    }


    render() {
        // if (this.state.data && this.state.data.length > 0) {
            const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
            return (
                <div>
                    <main className="content_itemcollect">
                        <section className="content_itemcollect_top">
                                <p>项目总览</p>
                        </section>
                        <section className="content_itemcollect_top_main">
                                <div>
                                      <p>项目名称：</p>
                                      <Select defaultValue={provinceData[0]} style={{ width: 210 }} onChange={this.handleProvinceChange}>
                                          {provinceOptions}
                                      </Select>
                                      <p>预计工期：</p>
                                      <time>2017年12月20日</time>
                                </div>
                                <div className="content_itemcollect_top_main_des">
                                    <p>工程说明：</p>
                                    <span>8号线一期工程由2号线三期工程莲塘站后折返线接出，终至盐田路站，线路全长12.36km，全线采用地下敷设方式，共设站6个（其中换乘站1座，盐田路站与8号线二期工程盐田路站换乘），最大站间距4.357km（梧桐山南至沙头角），最小站间距
1.158km（海山至盐田港西），平均站间距2.082km，于盐田港西站东侧及深外高中站西侧分别引出一股出入线，采用八字线接轨方案与望基湖停车场衔接，新建莲塘主变电所。</span>
                                </div>
                                 <div className="content_itemcollect_top_main_map">
                                    <p>工程说明：</p>
                                    <div></div>
                                </div>
                        </section>
                        <section className="content_itemcollect_bottom">
                             <div className="content_itemcollect_top">
                                <p>站点介绍</p>
                            </div>
                             <Table
                                columns={columns}
                                dataSource={data}
                                bordered
                                size="middle"
                                scroll={{ x: '130%', y: 240 }}
                              />
                        </section>
                        <aside></aside>
                        <address></address>
                    </main>
                </div>
            );
    }
}
export default Itemcollect;
import React from 'react';
import '../css/tabcontent.css';
import { Table, Input, Popconfirm, Button } from 'antd';
// import Drop from './dropdown';
// const { RangePicker } = DatePicker;
// const Search = Input.Search;

const EditableCell = ({ editable, value, onChange, column }) => (
    <div>
        {editable&&column!=='key'&&column!=='img'&&column!=='photoUrl'&&column!=='account'
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

class Tabcontent extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        let col = [];
        let cols = props.columns;
        let amend = props.amend;
        for (let i=0,j=cols.length;i<j;i++) {
            col.push({
                key: i,
                title: cols[i].title,
                dataIndex: cols[i].dataIndex,
                width: cols[i].width,
                render: (text, record) => self.renderColumns(text, record, cols[i].dataIndex)
            })
        }
        if (props.handle) {
            col.push({
                    title: '操作',
                    dataIndex: 'handle',
                    render: (text, record) => {
                        const { editable } = record;
                        return (
                            <div className="editable-row-operations">
                                {
                                    editable ?
                                        <span>
                                         <Popconfirm title="确认修改?" okText="确认" cancelText="取消" onConfirm={() => self.save(record,record.key)}>
                                            <a>保存</a>
                                          </Popconfirm>
                                  {/*<a onClick={() => self.save(record,record.key)}>保存</a>*/}
                                  {/*<Popconfirm title="确认修改?" okText="确认" cancelText="取消" onConfirm={() => self.cancel(record.key)}>*/}
                                    <a onClick={() => self.cancel(record.key)}>取消</a>
                                  {/*</Popconfirm>*/}
                                  <Popconfirm title="确认删除?" okText="确认" cancelText="取消" onConfirm={() => self.onDelete(record)}>
                                    <Button shape="circle" icon="delete" style={{background:'rgba(0,0,0,0)'}} />
                                  </Popconfirm>
                                </span>
                                        :
                                        <span>
                                     {amend?<Button onClick={() => self.edit(record.key)} shape="circle" icon="form" style={{background:'rgba(0,0,0,0)'}} />:''}
                                     <Popconfirm title="确认删除?" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                                         <Button shape="circle" icon="delete" style={{background:'rgba(0,0,0,0)'}} />
                                    </Popconfirm>
                                </span>
                                }
                            </div>
                        );
                    },
                }
            )
        }
        this.columns = col
        this.state = { data: this.props.data,cacheDatas:[] };
        this.cacheData = this.props.data.map(item => ({ ...item }));
        // this.cacheData = data.map(item => ({ ...item }));
    }

    componentWillMount() {
        // console.log('table')
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                column={column}
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }

    handleAdd = (a,b,c,d) => {
        const { data } = this.state;
        let addObj = {
            key: data[data.length-1].key+1,
            // index: data[data.length-1].index+1,
            name: a,
            account: b,
            department: c,
            brithday: d
        }
        this.setState({
            data: [...data, addObj]
            // count: count + 1,
        });

    }

    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    save(value,key) {
        console.log('key',key)
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.saveData(value);
        }
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }

    onSelectChange = (selectedRowKeys,e) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys,e);
        this.setState({ selectedRowKeys , selectedKeys: e});
    }

    onDelete = (r) => {
        // console.log('this.props',this.props);
        // this.setState({selectedKeys: r.account});
        // this.props.deleteData();
        // let key = r.key;
        // const dataSource = [...this.state.data];
        // this.setState({ data: dataSource.filter(item => item.key !== key), selectedKeys: r.account});
        this.props.rubbishData(r);
    }


    onSearch = (value) => {
        // const { searchText } = this.state;
        // const reg = new RegExp(searchText, 'gi');
        if (!value) return false;
        let state = this.state;
        let oldData;
        if(state.data.length>state.cacheDatas.length) {
            oldData = state.data;
        } else {
            oldData = state.cacheDatas?state.cacheDatas:state.data;
        }
        const reg = new RegExp(value, 'gi');
        this.setState({
            // filterDropdownVisible: false,
            // filtered: !!value,
            // data: this.state.data.map((record) => {
            cacheDatas: oldData,
            data: oldData.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
            //         name: (
            //             <span>
            //   {record.name.split(reg).map((text, i) => (
            //       i > 0 ? [<span key={'span_'+record.key}>{match[0]}</span>, text] : text
            //   ))}
            // </span>
                    name: record.name
                };
            }).filter(record => !!record),
        });
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // return <Table bordered dataSource={this.props.data} columns={this.columns} />;
        return <Table bordered rowSelection={rowSelection} dataSource={this.state.data} columns={this.columns} />;
    }
}
export default Tabcontent;

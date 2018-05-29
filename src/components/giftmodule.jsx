import React from 'react';
import '../css/banner.css';
import Tabcontent from './tabcontent'
import commit from '../js/commit'
import { Button, Input, Upload, Icon, Modal, message, Spin, Popconfirm } from 'antd';
const { TextArea } = Input;

class Gifmodule extends React.Component {
    constructor(props) {
        super(props);
        let type = this.props.type;
        let column;
        switch(type) {
            case 1:
                column = [{
                    title: '序号',
                    dataIndex: 'key'
                }, {
                    title: '礼品名称',
                    dataIndex: 'name'
                }, {
                    title: '礼品图片',
                    dataIndex: 'photoUrl'
                }, {
                    title: '礼品描述',
                    dataIndex: 'describe',
                    width: '30%'
                }]
                break;
            case 2:
                column = [{
                    title: '序号',
                    dataIndex: 'key'
                }, {
                    title: '礼品名称',
                    dataIndex: 'name'
                }, {
                    title: '礼品图片',
                    dataIndex: 'photoUrl'
                }, {
                    title: '祝福语',
                    dataIndex: 'blessing',
                    width: '30%'
                }]
                break;
            case 3:
                column = [{
                    title: '序号',
                    dataIndex: 'key'
                }, {
                    title: '礼品名称',
                    dataIndex: 'name'
                }, {
                    title: '礼品图片',
                    dataIndex: 'photoUrl'
                }, {
                    title: '答谢语',
                    dataIndex: 'thanks',
                    width: '30%'
                }]
                break;
            default:
                break;
        }
        this.state = {
            // columns : [{
            //     title: '序号',
            //     dataIndex: 'key'
            // },
            //     //     {
            //     //     title: '公司',
            //     //     dataIndex: 'company'
            //     // },
            //     {
            //         title: '礼品名称',
            //         dataIndex: 'name'
            //     },{
            //         title: '礼品图片',
            //         dataIndex: 'photoUrl'
            //     },{
            //         title: '礼品描述',
            //         dataIndex: 'describe',
            //         width: '30%'
            //     }],
            columns :column,
            data:[],
            addStatus: false,
            loadStatus: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            addText: [{
                a:''
            },{
                b:''
            }],
            submitStatus:true
        }
    }

    onRef = (ref) => {
        this.child = ref
    }

    componentWillMount() {
        var self = this;
        let ticket = commit.getUrlParam('ticket');
        self.setState({ticket, type:self.props.type})
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getGiftInfo?ticket=' + ticket,
            {
                "type":self.props.type,
                "page":1,
                "size":500
            },
            function (response) {
                console.log('response',response)
                let data = response.data && response.data.data.list
                data.forEach(function (currentValue, index) {
                    currentValue.key = index + 1;
                    currentValue.photoUrl = <img src={currentValue.photoUrl} alt="" style={{width: '62px', height: '54px'}} />;
                });
                self.child.setState({data: data})
            },
            '获取公司生日礼物失败')
    }

    addStatus() {
        this.setState({addStatus: !this.state.addStatus,loadStatus: false})
    }

    inputChange(x,event) {
        let tests = this.state.addText
        switch(x) {
            case 'a':
                tests[0].a = event.target.value
                break;
            case 'b':
                tests[1].b = event.target.value;
                break;
            default:
                break;
        }
        this.setState({addText: tests})
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
        console.log('handleChange',fileList)
    }

    handleUpload = () => {
        const { fileList, ticket, addText, type, submitStatus } = this.state;
        let self = this;
        let parames;
        let childDates = self.child.state.data;
        if(type===2&&childDates&&childDates.length>=6) {
            message.error('最多添加6张！');
            return false;
        }
        if(fileList.length===0 || addText[0].a==='' || addText[1].b===''){
            message.error('必填项请填写完整！');
            return false;
        }
        if(!submitStatus){
            message.error('请勿多次提交同一请求！');
            return false;
        }
        self.setState({loadStatus:true,submitStatus:false});
        switch(type) {
            case 1:
                parames = {
                    "type":type,
                    "image": fileList[0].thumbUrl,
                    "describe": addText[1].b,
                    "thanks": '',
                    "blessing": '',
                    "name": addText[0].a,
                    "imageName": fileList[0].name
                }
                break;
            case 2:
                parames = {
                    "type":type,
                    "image": fileList[0].thumbUrl,
                    "describe": '',
                    "thanks": '',
                    "blessing": addText[1].b,
                    "name": addText[0].a,
                    "imageName": fileList[0].name
                }
                break;
            case 3:
                parames = {
                    "type":type,
                    "image": fileList[0].thumbUrl,
                    "describe": '',
                    "thanks": addText[1].b,
                    "blessing": '',
                    "name": addText[0].a,
                    "imageName": fileList[0].name
                }
                break;
            default:
                break;
        }
        let layoutText = document.querySelectorAll('.layout-aside-input-text');
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/saveGift?ticket='+ ticket, parames,
            function (response) {
                let status = response.data&&response.data.success;
                if (!status) {
                    message.error("保存失败！");
                    self.setState({submitStatus:true});
                    return false;
                }else{
                    self.queryBanner(ticket, self, true);
                    self.setState({
                        addStatus: !self.state.addStatus,
                        fileList: '',
                        loadStatus:false,
                        submitStatus:true,
                        addText:[{
                            a:''
                        },{
                            b:''
                        }]
                    });
                    self.child.setState({selectedRowKeys: []});
                    layoutText.forEach(function (currentValue) {
                        currentValue.value = '';
                    })
                    message.success("保存成功！");
                }
            },
            '新增礼物接口失败')
    };

    queryBanner=(ticket, self, childer)=> {
        let type = this.state.type;
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getGiftInfo?ticket=' + ticket, {
                "type":type,
                "page":1,
                "size":500
            },
            function (response) {
                let data = response.data && response.data.data.list
                data.forEach(function (currentValue, index) {
                    currentValue.key = index + 1;
                    currentValue.photoUrl = <img src={currentValue.photoUrl} alt="" style={{width: '62px', height: '54px'}} />;
                });
                childer ? self.child.setState({data: data}) : self.setState({data: data});
            },
            '获取生日礼物失败')
    };

    deleteData = () => {
        const children = this.child;
        let selectedKeys = children.state.selectedKeys;
        let id = ''
        let self = this;
        let selectedRowKeys = children.state.selectedRowKeys
        if(!selectedRowKeys || selectedRowKeys.length===0){
            message.error('至少选择一条数据删除!');
            return false;
        };
        for(let i=0,j=selectedKeys.length;i<j;i++) {
            id += selectedKeys[i].id + (i===j-1?'':',');
        }
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/deleteGifts?ticket='+ this.state.ticket,
            { "giftId": id},
            function (response) {
                if (response.data&&response.data.success){
                    commit.deleteData(self)
                    self.queryBanner(self.state.ticket, self, true)
                    children.setState({selectedRowKeys: []});
                }
            },
            '删除banner失败')
    };

    rubbishData(r) {
        console.log('r',r)
        let key = r.key;
        let that = this.child;
        let self = this;
        const dataSource = [...that.state.data];
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/deleteGifts?ticket='+ self.state.ticket,
            {"giftId": r.id},
            function (response) {
                if (response.data && response.data.success) {
                    that.setState({data: dataSource.filter(item => item.key !== key)});
                    self.queryBanner(self.state.ticket, self, true)
                }
            },
            '删除礼物失败')
    }

    saveData(value) {
        console.log('value',value)
        let type = this.state.type;
        // let target = value[key-1];
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/updateGift?ticket='+ this.state.ticket,
            {
                "type":type, //类型 1：系统礼物 2：祝福 3：答谢
                "image": value.photoUrl.props.src,//base64编码
                "describe": value.describe,//礼物描述
                "thanks": value.thanks,//答谢语 type=3 必须填写
                "blessing": value.blessing,//祝福语  type=2 必须填写
                "name": value.name //礼物名称
            },
            function (response) {
                console.log('response', response)
            },
            '修改礼物失败')
    }

    render() {
        let addStyle = this.state.addStatus ? {display:'block'} : {display:'none'}
        let loadStyle = this.state.loadStatus ? {display:'block'} : {display:'none'}
        const { previewVisible, previewImage, fileList, ticket, type } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let url = "http://10.0.40.130/brithdaybless/rest/saveGift?ticket="+ticket;
        const props = {
            action: url,
            listType: 'picture-card',
            fileList: this.state.fileList,
            onPreview: this.handlePreview,
            onChange: this.handleChange
        };
        let inputText;
        switch(type) {
            case 1:
                inputText = '礼品描述';
                break;
            case 2:
                inputText = '祝福语';
                break;
            case 3:
                inputText = '答谢语';
                break;
            default:
                break;
        }

        return (
            <div>
                <div  className="layout-header">
                    <section className="layout-header-section">
                        <h5>公司礼品</h5>
                        <Popconfirm title={'确认删除?'} onConfirm={this.deleteData} okText="确认" cancelText="取消">
                            <Button>删除</Button>
                        </Popconfirm>
                        <Button onClick={this.addStatus.bind(this)}>新增</Button>
                    </section>
                </div>
                <Tabcontent columns = {this.state.columns} data = {this.state.data} handle={true} rubbishData={this.rubbishData.bind(this)} saveData={this.saveData.bind(this)} onRef={this.onRef}></Tabcontent>
                <aside className="layout-aside" style={addStyle}>
                    <section style={{height:'469px'}}>
                        <article className="layout-aside-article">
                            <h4>新增</h4>
                            <Button shape="circle" icon="close" style={{background:'rgba(0,0,0,0)'}} onClick={this.addStatus.bind(this)} />
                        </article>
                        <div className="layout-aside-input">
                            <Input placeholder="Basic usage" className="layout-aside-input-text" addonBefore={<span>礼品名称 <span style={{color:'red'}}>*</span></span>} onChange={this.inputChange.bind(this,'a')} />
                            <div className="clearfix layout-aside-input-addImg">
                                <span className='layout-aside-input__span'>图片 <span style={{color:'red'}}>*</span></span>
                                <Upload {...props}>
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                            <div className='textInput'>
                                <span>{inputText} <em style={{color:'red'}}>*</em></span>
                                <TextArea placeholder={inputText} maxLength="20" className="layout-aside-input-text" onChange={this.inputChange.bind(this,'b')} />
                            </div>
                        </div>
                        <footer className="layout-aside-footer">
                            <button onClick={this.handleUpload}>确认</button>
                            <button onClick={this.addStatus.bind(this)}>取消</button>
                        </footer>
                    </section>
                </aside>
                <Spin size="large" className="layout-spin" style={loadStyle} />
            </div>
        );
    }
}

export default Gifmodule;
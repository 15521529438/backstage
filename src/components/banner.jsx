import React from 'react';
import { Button, Input, Upload, Icon, Modal, message, Spin, Popconfirm } from 'antd';
// import axios from 'axios';
// import reqwest from 'reqwest';
import '../css/banner.css';
import '../css/user.css'
import Tabcontent from './tabcontent'
import commit from '../js/commit'

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns : [{
                title: '排序',
                dataIndex: 'key',
                width: '15%'
            }, {
                title: 'Banner名称',
                dataIndex: 'name',
                width: '40%'
            }, {
                title: 'Banner图片',
                dataIndex: 'picture',
                width: '25%'
            }],
            data: [],
            addStatus: false,
            loadStatus: false,
            previewVisible: false,
            previewImage: '',
            // fileList: [{
            //     uid: -1,
            //     name: 'xxx.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }],
            fileList: [],
            addText: [{
                a:''
            },{
                b:''
            }],
            submitStatus: true
        }
    }

    onRef = (ref) => {
        this.child = ref
    }

    componentWillMount() {
        var self = this;
        let ticket = commit.getUrlParam('ticket');
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getBanner?ticket='+ ticket, {},
            function (response) {
                let data = response.data && response.data.data
                self.setState({ticket});
                if(!data) return false;
                data.forEach(function (currentValue, index) {
                    currentValue.key = index + 1;
                    // currentValue.picture = <Button icon='eye-o' style={{background:'rgba(0,0,0,0)'}} className='showImg'>点击查看</Button>;
                    currentValue.picture = <img src={currentValue.imageUrl} alt="" style={{width: '124px', height: '54px'}} />;
                });
                self.child.setState({data: data});
            },
            '获取已选择系统礼物用户数据失败')
    }

    componentDidUpdate () {
    }

    // deleteData() {
    //     let selectedRowKeys = this.child.state.selectedRowKeys;
    //     console.log('selectedRowKeys',selectedRowKeys);
    //     commit.deleteData(this);
    // }

    addStatus() {
        this.setState({addStatus: !this.state.addStatus,loadStatus: false});
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
            default:
                break;
        }
        this.setState({addText: tests})
    }

    handleImg = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
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
        const { fileList, ticket, addText, addStatus, submitStatus } = this.state;
        let self = this;
        let layoutNumber = document.querySelectorAll('.layout-aside-input-number');
        if(fileList.length===0 || addText[0].a==='' || addText[1].b===''){
            message.error('必填项请填写完整！');
            return false;
        }
        if(!submitStatus){
            message.error('请勿多次提交同一请求！');
            return false;
        }
        self.setState({loadStatus:true,submitStatus:false});
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/saveBanner?ticket='+ ticket, {
                // image: fileList[0].thumbUrl.substring(23),
                image: fileList[0].thumbUrl,
                weight: addText[1].b,
                // imageName: fileList[0].name,
                name: addText[0].a
            },
            function (response) {
                let status = response.data&&response.data.success;
                if (!status) {
                    message.error('保存失败！');
                    self.setState({submitStatus:true});
                    return false;
                }else{
                    self.queryBanner(ticket, self, true);
                    self.setState({
                        addStatus: !addStatus,
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
                    layoutNumber.forEach(function (currentValue) {
                        currentValue.value = ''
                    })
                    message.success('保存成功！');
                }
            },
            '新增banner失败')
    };

    queryBanner=(ticket, self, childer)=> {
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/getBanner?ticket=' + ticket, {},
            function (response) {
                let data = response.data && response.data.data
                data.forEach(function (currentValue, index) {
                    currentValue.key = index + 1;
                    currentValue.picture = <img src={currentValue.imageUrl} alt="" style={{width: '124px', height: '54px'}} />;
                    //currentValue.picture = <Button icon='eye-o' style={{background:'rgba(0,0,0,0)'}} className='showImg'>点击查看</Button>;
                });
                childer ? self.child.setState({data: data}) : self.setState({data: data});
            },
            '获取banner接口失败')
    };

    deleteData = () => {
        const children = this.child;
        let selectedKeys = children.state.selectedKeys;
        let childData = children.state.data;
        let selectedRowKeys = children.state.selectedRowKeys
        if(!selectedRowKeys || selectedRowKeys.length===0){
            message.error('至少选择一条数据删除!');
            return false;
        };
        if(childData.length-selectedKeys.length<=0) {
            message.error('banner至少留一项！');
        }else{
            let id = ''
            let self = this;
            for(let i=0,j=selectedKeys.length;i<j;i++) {
                id += selectedKeys[i].id + (i===j-1?'':',');
            }
            commit.DELETEDATA(
                'http://10.0.40.130/brithdaybless/rest/deleteBanner?ticket='+ this.state.ticket,
                { "bannerIds": id},
                function (response) {
                    if (response.data&&response.data.success){
                        commit.deleteData(self);
                        self.queryBanner(self.state.ticket, self, true);
                        children.setState({selectedRowKeys: []});
                    }
                },
                '删除banner失败')
        }
    };

    rubbishData(r) {
        let key = r.key;
        let that = this.child;
        let self = this;
        const dataSource = [...that.state.data];
        if(dataSource.length===1) {
            message.error('banner至少留一项！');
        }else{
            commit.DELETEDATA(
                'http://10.0.40.130/brithdaybless/rest/deleteBanner?ticket='+ self.state.ticket,
                {"bannerIds": r.id},
                function (response) {
                    if (response.data && response.data.success) {
                        that.setState({data: dataSource.filter(item => item.key !== key)});
                        self.queryBanner(self.state.ticket, self, true)
                    }
                },
                '删除banner失败')
        }
    }

    saveData(value) {
        commit.DELETEDATA(
            'http://10.0.40.130/brithdaybless/rest/updateBanner?ticket='+ this.state.ticket,
            {
                "weight":1,
                "name":value.name,
                "imageName":value.name,
                "image":value.image,
                "bannerId":value.id
            },
            function (response) {
                console.log('response', response)
            },
            '更新banner失败')
    }

    render() {
        let addStyle = this.state.addStatus ? {display:'block'} : {display:'none'};
        let loadStyle = this.state.loadStatus ? {display:'block'} : {display:'none'};
        const { previewVisible, previewImage, fileList, ticket } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let url = "http://10.0.40.130/brithdaybless/rest/saveBanner?ticket="+ticket;
        const props = {
            action: url,
            listType: 'picture-card',
            fileList: this.state.fileList,
            onPreview: this.handlePreview,
            onChange: this.handleChange
        };
            return (
            <div>
                <div  className="layout-header">
                    <section className="layout-header-section">
                        <h5>Banner管理</h5>
                        {/*<Button onClick={this.deleteData}>删除</Button>*/}
                        <Popconfirm title={'确认删除?'} onConfirm={this.deleteData} okText="确认" cancelText="取消">
                            <Button>删除</Button>
                        </Popconfirm>
                        <Button onClick={this.addStatus.bind(this)}>新增</Button>
                    </section>
                </div>
                <Tabcontent columns = {this.state.columns} data = {this.state.data} handle = {true} rubbishData={this.rubbishData.bind(this)} saveData={this.saveData.bind(this)} onRef={this.onRef}></Tabcontent>
                <aside className="layout-aside" style={addStyle}>
                    <section>
                        <article className="layout-aside-article">
                            <h4>新增</h4>
                            <Button shape="circle" icon="close" style={{background:'rgba(0,0,0,0)'}} onClick={this.addStatus.bind(this)} />
                        </article>
                        <div className="layout-aside-input">
                            <Input placeholder="Banner名称" className="layout-aside-input-number" addonBefore={<span>Banner名称 <span style={{color:'red'}}>*</span></span>} onChange={this.inputChange.bind(this,'a')} />
                            <div className="clearfix layout-aside-input-addImg">
                                <span className='layout-aside-input__span'>图片 <span style={{color:'red'}}>*</span></span>
                                <Upload {...props}>
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                            <Input placeholder="数字" className="layout-aside-input-number" type="number" addonBefore={<span>排序 <span style={{color:'red'}}>*</span></span>} onChange={this.inputChange.bind(this,'b')}  />
                            <span className="layout-aside-input-span">注：排序采用权重排序，数字越大权重越大，显示越靠前</span>
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

export default Banner;
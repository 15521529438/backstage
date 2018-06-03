import React from 'react';

class ControlerDatas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {}

    componentDidMount(){
        const winHeight = window.innerHeight;
        this.eleHeight = winHeight - 112;
    }

    onChange(data, dateString) {
        this.setState({dateString});
    }


    render() {
        return (
            <div id="conentIframe" style={{height: this.eleHeight}}>
                <iframe
                    style={{width: '100%', height: '100%'}}
                    src="http://120.78.187.94:8080/szdt/a/homePage.html"
                    frameborder="0"
                ></iframe>
            </div>
        );
    }
}
export default ControlerDatas;
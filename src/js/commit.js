/**
 * Created by Administrator on 2018/4/9.
 */
import axios from 'axios';
let commit = (function () {
    let utils = {
        deleteData (t) {
            // let child = this.child
            let child = t.child
            let deleteData = child.state.selectedRowKeys
            if (!deleteData) return false
            let dataSource = [...child.state.data];
            for (let i=0,j=deleteData.length;i<j;i++) {
                dataSource = dataSource.filter(item => item.key !== deleteData[i])
            }
            child.setState({ data: dataSource });
        },
        search (t) {
            // let child = t.child
            // child.onSearch(v)
            return function (v) {
                t.child.onSearch(v)
            }
        },
        getUrlParam (k) {
            let getUrlParam;
            let regExp = new RegExp('([?]|&)' + k + '=([^&]*)(&|$)')
            let result = window.location.href.match(regExp)
            if (result) {
                return decodeURIComponent(result[2])
            } else {
                return null
            }
        },
        DELETEDATA(url,params,content,failure) {
            axios.post(url,params).then(content).catch(function (error) {console.log(failure, error)});
        },
        GETDATA(url,params,content,failure) {
            axios.get(url,params).then(content).catch(function (error) {console.log(failure, error)});
        },
        obtainDate (time) {
            let date;
            time ? date = new Date(time) : date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            // let hours = date.getHours();
            // let minu = date.getMinutes();
            // let second = date.getSeconds();

            let arr = [month, day];
            let newArr = [];
            arr.forEach(item => {
                item = item < 10 ? "0" + item : item;
                newArr.push(item)
            })
            let endDate = year + '-' + newArr[0] + '-' + newArr[1];
            return endDate;
        }
    }
    return utils;
})()
export default commit;
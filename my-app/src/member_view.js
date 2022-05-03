import React, { Component, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { ensemble_json_data } from './global_definer.js'


class DisplayBox extends Component {
    displayChange(event) {
        this.props.updateDisplay(event.target.value);  // 下拉框选中的值
    }

    render() {
        return (
            <div>
                <div className="drifting_line" style={{ top: '5%', left: '40%', width: '10%', height: '10%' }}>Display: </div>
                <select id="display_selector" onChange={(event) => this.displayChange(event)} className="drifting_line" style={{ top: '5%', left: '50%', width: '15%', height: '10%' }}>
                    <option key={'option1'} value='rendering'>rendering</option>
                    <option key={'option2'} value='radar'>radar</option>
                </select>
            </div>
        )
    }
}

class SortByBox extends Component {
    sortByChange(event) {
        // console.log(event);
        this.props.updateSortIndex(event.target.selectedIndex);  // 下拉框选中的索引
    }

    render() {
        return (
            <div>
                <div className="drifting_line" style={{ top: '5%', left: '70%', width: '10%', height: '10%' }}>Sort by: </div>
                <select id="sort_by_selector" onChange={(event) => this.sortByChange(event)} className="drifting_line" style={{ top: '5%', left: '80%', width: '15%', height: '10%' }}>
                    <option key={'option0'} value='member_id'>member_id</option>
                    {
                        this.props.constrain_list.map((item, index) => {
                            return (
                                <option key={'option' + index} value={item}>{item}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}

class RadarChart extends Component {
    render() {
        console.log(this.props);

        return (
            <div></div>
        )
    }
}

class Test extends Component {

    render() {
        console.log("******************")
        return (
            <div  ></div>
        )
    }
}

class MemberPic extends Component {

    // renderRadar(item, is_valid) {
    //     // console.log(item, is_valid)
    //     return (
    //         <RadarChart key={'rd' + item['name']} object={item} is_valid={is_valid} />

    //     )
    // }
    renderRadar(item, is_valid) {

        return (
            <Test key={item['name']} />
        )
    }

    // 判断是否满足 cur op constrain_value
    judgeAnswer(cur, operator, constrain_value) {
        cur = parseFloat(cur);
        constrain_value = parseFloat(constrain_value);
        switch (operator) {
            case ">":
                return cur > constrain_value;
            case "<":
                return cur < constrain_value;
            case ">=":
                return cur >= constrain_value;
            case "<=":
                return cur <= constrain_value;
            case "=":
                return cur === constrain_value;
            default:
                return false;
        }
    }

    getRadarDataList(dataset_name, constrain, operator, constrain_value, t_index, radar_json) {
        var data_list = [];
        let valid_data = [];  // 满足约束的
        let raw_data = [];
        let members_data = ensemble_json_data[dataset_name][constrain];

        let members_num = Object.keys(members_data).length;

        for (let i = 1; i <= members_num; i++) {
            let name = "member" + String(i);
            // 如果满足条件
            let cur = members_data[name][t_index];
            raw_data.push([name, cur]);  // 把 name 和 cur 放进去，用于排序

            // console.log(cur, operator, constrain_value);
            if (this.judgeAnswer(cur, operator, constrain_value)) {
                valid_data.push(name);
            }
            // 根据 current_sort_index 排序
            raw_data.sort(function (a, b) {  // [name, cur] ，其中 cur 小的排前面
                return a[1] - b[1];
            })
        }
        // 此时图的顺序就是 raw_data的第一维度
        // 把所有的数据装入到 data_list = [] 中
        raw_data.forEach(function (item) {
            data_list.push({
                "name": item[0],
                "data": radar_json[item[0]],
            });
        })

        return [data_list, valid_data];
    }



    render() {
        // console.log(this.props);
        // 约束计算相关变量
        let current_sort_index = this.props.current_sort_index;  // 排序索引
        let sort_constrain = this.props.sort_constrain;
        let sort_constrain_value = this.props.sort_constrain_value;
        let sort_operator = this.props.sort_operator;
        let dataset_name = this.props.dataset_name;

        console.log(current_sort_index, sort_constrain, sort_operator, sort_constrain_value)


        let t_index = this.props.selected_xAxis_index;  // 选择的时间索引
        if (t_index === undefined) t_index = 0;

        let display_way = this.props.display_way;  // 显示方式


        // 如果 display_way 是 'rendering'，那就从 './resources/sample/MemberRendering/t' + t_index + '/' 下读数据
        // 如果 display_way 是 'radar'，那就从 './resources/sample/MemberRadar/memberViewSample_t' + t_index + '.json' 读数据

        let data_list = [];  // 待会要显示的数据
        let valid_data = [];  // 满足约束的名称


        var _this = this;  // 存储组件的 this，后面在回调函数中还要调用


        if (display_way === 'rendering') {
            // return (
            //     <div style={{ width: "100%", height: "100%", backgroundColor: 'red' }}>
            //         11111111
            //     </div>
            // )
        }
        else if (display_way === 'radar') {
            let radar_json_path = 'MemberRadar/memberViewSample_t' + t_index + '.json';
            // return (
            //     <div style={{ width: "100%", height: "100%", backgroundColor: 'aqua' }}>
            //         2222222
            //     </div>
            // )
            fetch(radar_json_path, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (radar_json) {
                    // 获取到了radar_json
                    // if (current_sort_index !== 0) {  // 如果不是按 member_id 排序
                    //     [data_list, valid_data] = _this.getRadarDataList(dataset_name, constrain, operator, constrain_value, t_index, radar_json)
                    // }
                    // else {  // 不用排序

                    // }


                    // console.log(item, is_valid);
                    // return (
                    //     <div style={{ width: "100%", height: "100%", backgroundColor: 'red' }}>
                    //         {
                    //             data_list.map((item, index) => {
                    //                 let is_valid = false;
                    //                 if (valid_data.indexOf(item['name']) !== -1) {  // 如果当前member是符合约束的，加个框框
                    //                     is_valid = true;
                    //                 }
                    //                 return _this.renderRadar(item, is_valid);
                    //             })
                    //         }
                    //     </div>
                    // )



                });
            return (
                <div style={{ width: "100%", height: "100%", backgroundColor: 'red' }}>
                    11111111
                </div>
            )
        }



    }
}

export { DisplayBox, SortByBox, MemberPic, RadarChart }
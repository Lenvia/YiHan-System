import React, { Component, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { ensemble_json_data } from './global_definer.js'
import { data } from 'jquery';


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

class RadarChartBox extends Component {
    render() {
        // console.log(this.props);
        let index = this.props.index;

        let margin_left = 7.5;
        let gap_left = 5;
        let left_bias;

        if (index % 3 === 0)
            left_bias = margin_left;
        else if (index % 3 === 1)
            left_bias = margin_left + 25 + gap_left;  // 25 是组件宽度
        else left_bias = margin_left + 2 * (25 + gap_left);


        let margin_top = 10;
        let gap_top = 5;
        let top_bias;
        top_bias = margin_top + Math.floor(index / 3) * (gap_top + 30);

        // console.log(index, left_bias, top_bias);

        return (
            <div className='member_block'
                style={{
                    left: String(left_bias) + '%',
                    top: String(top_bias) + '%',

                }}>{this.props.object["name"]}</div>
        )
    }
}

class RenderingPicture extends Component {
    render() {
        // console.log(this.props);
        return (
            <div></div>
        )
    }
}


class MemberPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            data_list: [],
            valid_members: [],
        };
    }


    renderRadar(item, is_valid, index) {
        // console.log(item, is_valid)
        return (
            <RadarChartBox key={'rdc' + item['name']} object={item} is_valid={is_valid} index={index} />

        )
    }

    renderRendering(item, is_valid, index) {
        // console.log(item, is_valid)
        return (
            <RenderingPicture key={'rdp' + item['name']} object={item} is_valid={is_valid} index={index} />

        )
    }


    componentDidUpdate(props) {  // props 是之前的参数，this.props是刚传来的参数

        // 如果状态没有改变，就不修改
        if (props.current_sort_index === this.props.current_sort_index
            && props.display_way === this.props.display_way
            && props.selected_xAxis_index === this.props.selected_xAxis_index
            && props.dataset_name === this.props.dataset_name
            && props.current_constrain_index === this.props.current_constrain_index
        )
            return;

        this.setState({  // 先禁止渲染
            isLoad: false,
        })

        // 约束计算相关变量
        let constrain = this.props.constrain;
        let constrain_value = this.props.constrain_value;
        let operator = this.props.operator;

        // sort相关变量，只需约束名就行了
        let current_sort_index = this.props.current_sort_index;  // 排序索引
        let sort_constrain = this.props.sort_constrain;
        let dataset_name = this.props.dataset_name;
        let member_num = this.props.member_num;


        let t_index = this.props.selected_xAxis_index;  // 选择的时间索引

        let display_way = this.props.display_way;  // 显示方式

        if (t_index === undefined)
            t_index = 0;
        if (current_sort_index === 0)
            sort_constrain = 'member_id';


        // 无论何种显示方式，无论怎么排序，符合约束的member是固定的
        var valid_members = this.getValidList(
            dataset_name,
            member_num,
            constrain,
            operator,
            constrain_value,
            t_index);

        if (display_way === 'radar') {
            let radar_json_path = dataset_name + '/MemberRadar/memberViewSample_t' + t_index + '.json';

            var _this = this;

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
                    // console.log(radar_json)
                    // console.log(sort_constrain);


                    var data_list = _this.getSortedRadarDataList(
                        dataset_name,
                        member_num,
                        current_sort_index,
                        sort_constrain,
                        t_index,
                        radar_json);


                    _this.setState({
                        isLoad: true,
                        display_way: display_way,
                        data_list: data_list,
                        valid_members: valid_members,
                    })
                })
        }
        else if (display_way === 'rendering') {

            var data_list = this.getSortedRenderingDataList(
                dataset_name,
                member_num,
                current_sort_index,
                sort_constrain,
                t_index)

            this.setState({
                isLoad: true,
                display_way: display_way,
                data_list: data_list,
                valid_members: valid_members,
            })
        }

    }


    // componentDidMount() 方法在组件挂载后（插入 DOM 树中）立即调用。
    // 第一次挂载
    componentDidMount() {

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

    // 根据 ensemble 下拉框的约束，得到合法的member，等会用黑线框起来
    getValidList(dataset_name, member_num, constrain, operator, constrain_value, t_index) {
        let valid_members = [];  // 满足约束的
        let members_data = ensemble_json_data[dataset_name][constrain];

        for (let i = 1; i <= member_num; i++) {
            let name = "member" + String(i);
            // 如果满足条件
            let cur = members_data[name][t_index];

            // console.log(cur, operator, constrain_value);
            if (this.judgeAnswer(cur, operator, constrain_value)) {
                valid_members.push(name);
            }
        }
        return valid_members;
    }

    getSortedRadarDataList(dataset_name, member_num, current_sort_index, sort_constrain, t_index, radar_json) {
        var data_list = [];
        if (current_sort_index === 0) {  // 根据member_id sort
            for (let i = 1; i <= member_num; i++) {
                let name = "member" + String(i);

                data_list.push({
                    "name": name,
                    "data": radar_json[name],
                })

            }
            return data_list;
        }


        let raw_data = [];
        let members_data = ensemble_json_data[dataset_name][sort_constrain];

        for (let i = 1; i <= member_num; i++) {
            let name = "member" + String(i);
            let cur = members_data[name][t_index];
            raw_data.push([name, cur]);  // 把 name 和 cur 放进去，用于排序
        }


        // 根据 current_sort_constrain 排序
        raw_data.sort(function (a, b) {  // [name, cur]，比较 cur1 和 cur2的大小
            return a[1] - b[1];
        })
        // 此时图的顺序就是 raw_data的第一维度
        // 把所有的数据装入到 data_list = [] 中
        raw_data.forEach(function (item) {
            data_list.push({
                "name": item[0],
                "data": radar_json[item[0]],
            });
        })

        return data_list;
    }

    getSortedRenderingDataList(dataset_name, member_num, current_sort_index, sort_constrain, t_index) {
        var data_list = [];
        if (current_sort_index === 0) {  // 根据member_id sort


            for (let i = 1; i <= member_num; i++) {
                let name = "member" + String(i);
                let path = dataset_name + '/MemberRendering/t' + t_index + '/m' + String(i) + '.png';

                data_list.push({
                    "name": name,
                    "path": path,
                })

            }
            return data_list;
        }


        let raw_data = [];
        let members_data = ensemble_json_data[dataset_name][sort_constrain];

        for (let i = 1; i <= member_num; i++) {
            let name = "member" + String(i);
            let cur = members_data[name][t_index];
            raw_data.push([name, cur]);  // 把 name 和 cur 放进去，用于排序
        }


        // 根据 current_sort_constrain 排序
        raw_data.sort(function (a, b) {  // [name, cur]，比较 cur1 和 cur2的大小
            return a[1] - b[1];
        })
        // 此时图的顺序就是 raw_data的第一维度
        // 把所有的数据装入到 data_list = [] 中
        raw_data.forEach(function (item) {
            let name = item[0];
            let i = name.slice(6, name.length)  // 序号

            let path = dataset_name + '/MemberRendering/t' + t_index + '/m' + String(i) + '.png';
            data_list.push({
                "name": item[0],
                "path": path,
            });
        })

        return data_list;
    }





    render() {
        if (this.state.isLoad) {
            console.log(this.state.data_list)
            console.log(this.state.valid_members)
            if (this.state.display_way === 'rendering') {
                return (
                    <div className='member_window' style={{ backgroundColor: 'gold' }}>
                        {
                            this.state.data_list.map((item, index) => {
                                let is_valid = false;
                                if (this.state.valid_members.indexOf(item['name']) !== -1) {  // 如果当前member是符合约束的，加个框框
                                    is_valid = true;
                                }
                                return this.renderRendering(item, is_valid, index);
                            })
                        }
                    </div>

                )
            }
            else if (this.state.display_way === 'radar') {
                return (
                    <div className='member_window' style={{ backgroundColor: 'blue' }}>

                        {
                            this.state.data_list.map((item, index) => {
                                let is_valid = false;
                                if (this.state.valid_members.indexOf(item['name']) !== -1) {  // 如果当前member是符合约束的，加个框框
                                    is_valid = true;
                                }
                                return this.renderRadar(item, is_valid, index);
                            })
                        }

                    </div>

                )
            }
            else {
                return (

                    <div style={{ width: "100%", height: "100%", backgroundColor: 'aqua' }}>
                        22222
                    </div>

                )
            }

        }
        else {
            return (
                <div style={{ width: "100%", height: "100%", backgroundColor: 'aqua' }}>
                    22222
                </div>
            )
        }


        // if (display_way === 'rendering') {

        // }
        // else if (display_way === 'radar') {

        // }



    }
}

export { DisplayBox, SortByBox, MemberPic, RadarChartBox }
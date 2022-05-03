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

class MemberPic extends Component {

    renderRadar(i) {

    }

    render() {

        let t_index = this.props.selected_xAxis_index;  // 选择的时间索引
        if (t_index === undefined) t_index = 0;

        let display_way = this.props.display_way;  // 显示方式
        let current_sort_index = this.props.current_sort_index;  // 排序索引

        // 如果 display_way 是 'rendering'，那就从 './resources/sample/MemberRendering/t' + t_index + '/' 下读数据
        // 如果 display_way 是 'radar'，那就从 './resources/sample/MemberRadar/memberViewSample_t' + t_index + '.json' 读数据

        let data_list = [];  // 待会要显示的数据
        if (display_way === 'rendering') {

        }
        else if (display_way === 'radar') {
            let radar_json_path = 'MemberRadar/memberViewSample_t' + t_index + '.json';
            console.log(radar_json_path,);

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
                    // 根据排序
                    // 把所有的数据装入到 data_list = [] 中
                });
        }
        else {
            return;
        }


        return (
            <div style={{ overflow: 'auto' }}>

            </div>
        )
    }
}

export { DisplayBox, SortByBox, MemberPic }
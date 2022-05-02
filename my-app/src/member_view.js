import React, { Component } from 'react';
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
    render() {
        console.log(this.props);
        return (
            <div>

            </div>
        )
    }
}

export { DisplayBox, SortByBox, MemberPic }
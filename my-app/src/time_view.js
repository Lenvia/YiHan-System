import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';

class TimePic extends Component {
    render() {

        let dataset_name = this.props.dataset_name;
        let t_index = this.props.selected_xAxis_index;  // 选择的时间索引
        let member_id = this.props.selected_member_id;  // 选择的member_id

        console.log(dataset_name, t_index, member_id);
        if (member_id !== undefined) {
            return (
                <div >
                </div>
            )
        }
        return (
            <div>
            </div>
        )
    }
}

export { TimePic }
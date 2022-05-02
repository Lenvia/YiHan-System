import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import { ensemble_json_data } from './global_definer.js'
import { time } from 'echarts';


// 注：这个 ConstrainBox 的大小是相对于整个容器
class ConstrainBox extends Component {
    constrainChange(event) {
        let str = event.target.value;
        // console.log(str);
        this.props.updateEnsembleChart(str);
    }

    render() {
        return (
            <div>
                <div className="drifting_line" style={{ top: '5%', left: '60%', width: '10%', height: '10%' }}>Value: </div>
                <select id="constrain_selector" onChange={(event) => this.constrainChange(event)} className="drifting_line" style={{ top: '5%', left: '70%', width: '15%', height: '10%' }}>
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


class EnsembleEchart extends Component {
    componentWillReceiveProps(props) {
        this.forceUpdate();
    }

    setOption(dataset_name, current_constrain) {

        let members_data = ensemble_json_data[dataset_name][current_constrain];
        var series_data = []

        let members_num = Object.keys(members_data).length;
        let time_num = members_data["member1"].length;

        for (let i = 1; i <= members_num; i++) {
            let name = "member" + String(i);
            series_data.push({
                name: name,
                type: "line",
                data: members_data[name],
            })
        }

        let xAxis_data = Array.from(Array(time_num).keys());

        let option = {
            title: {
                text: "",
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis_data,
            },
            yAxis: {
                type: 'value',
                // axisLabel: {
                //     formatter: '{value} °C'
                // }
            },
            series: series_data,
        };

        return option;
    }



    render() {
        let current_constrain = this.props.current_constrain;
        let constrain_list = this.props.constrain_list;
        let dataset_name = this.props.dataset_name;

        let option;
        if (constrain_list.length === 0) {  // 还没有设置约束
            option = {
                title: {
                    text: "",
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [1, 2, 3, 4, 5, 6, 7],
                },
                yAxis: {
                    type: 'value',
                },
                series: []
            }
        }
        else {
            if (current_constrain === undefined) current_constrain = constrain_list[0];
            option = this.setOption(dataset_name, current_constrain);
        }

        // console.log(option);
        return (
            <div>
                <ReactECharts option={option} />
            </div>
        )
    }
}

export { EnsembleEchart, ConstrainBox };
import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import { ensemble_json_data } from './global_definer.js'
import { time } from 'echarts';


// 注：这个 ConstrainBox 的大小是相对于整个容器
class ConstrainBox extends Component {
    constrainChange(event) {
        // let str = event.target.value;

        this.props.updateEnsembleChart(event.target.selectedIndex);
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

    setOption(dataset_name, current_constrain, current_constrain_value) {

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
                smooth: true,
                symbolSize: 1.5, // 设置节点大小
                lineStyle: {
                    width: 1.5,
                    opacity: 0.7,
                },
                markLine: {
                    symbol: ['none', 'none'],
                    label: { show: false },
                    data: [{ yAxis: parseFloat(current_constrain_value) }]
                },

            })
        }

        let xAxis_data = Array.from({ length: time_num }).map((v, k) => k + 1)

        let option = {
            title: {
            },
            grid: {
                top: '15%',
                left: '8%',
                right: '8%',
                bootom: '5%',
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

            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    filterMode: 'filter',
                    // start: xAxis_data[0],
                    // end: xAxis_data[xAxis_data.length - 1],
                    xAxisIndex: 0,
                    orient: "horizontal",
                    height: 20,
                },
                {
                    type: 'inside',
                    realtime: true,

                    xAxisIndex: 0,
                    zoomOnMouseWheel: true,
                    moveOnMouseMove: true,
                }
            ],
            series: series_data,
        };

        return option;
    }



    render() {
        let current_constrain_index = this.props.current_constrain_index;

        let constrain_list = this.props.constrain_list;
        let constrain_values = this.props.constrain_values;
        let dataset_name = this.props.dataset_name;

        let current_constrain;
        let current_constrain_value;

        let option;
        if (constrain_list.length === 0) {  // 还没有设置约束
            option = {
                title: {
                    text: "",
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value',
                },
                series: []
            }
        }
        else {  // 约束已经设置
            if (current_constrain_index === undefined) {  // 默认情况
                current_constrain_index = 0;

            }
            current_constrain = constrain_list[current_constrain_index];
            current_constrain_value = constrain_values[current_constrain_index];
            current_constrain_value = parseFloat(current_constrain_value);

            option = this.setOption(dataset_name, current_constrain, current_constrain_value);
        }



        console.log(option);
        return (
            <div style={{ width: '100%', height: '100%', }}>
                <ReactECharts option={option}
                    style={{
                        positoin: 'absolute',
                        top: '5%',
                        width: '100%',
                        height: '100%',
                    }} />
            </div>
        )
    }
}

export { EnsembleEchart, ConstrainBox };
import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import { ensemble_json_data } from './global_definer.js'


// 注：这个 ConstrainBox 的大小是相对于整个容器
class ConstrainBox extends Component {
    constrainChange(event) {

        this.props.updateEnsembleChart(event.target.selectedIndex);  // 下拉框选中的值
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

class Bar extends Component {

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

    setBarOption(dataset_name, constrain, operator, constrain_value, selected_xAxis_index) {
        let members_data = ensemble_json_data[dataset_name][constrain];
        let xAxis_data = [];
        let yAxis_data = [];
        let members_num = Object.keys(members_data).length;

        for (let i = 1; i <= members_num; i++) {
            let name = "member" + String(i);
            // 如果满足条件
            let cur = members_data[name][selected_xAxis_index];
            if (this.judgeAnswer(cur, operator, constrain_value)) {
                xAxis_data.push('m' + String(i));
                yAxis_data.push(cur);
            }
        }

        let option = {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                top: '10%',
                left: '15%',
                right: '10%',
                bootom: '0',
            },
            xAxis: {
                type: 'category',
                data: xAxis_data,
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: yAxis_data,
                    type: 'bar'
                }
            ]
        };


        return option;
    }

    render() {

        let constrain = this.props.constrain;
        let constrain_value = this.props.constrain_value;
        let dataset_name = this.props.dataset_name;
        let operator = this.props.operator;
        let selected_xAxis_index = this.props.selected_xAxis_index;

        if (constrain === undefined || constrain_value === undefined || operator === undefined || selected_xAxis_index === undefined) {
            return (
                <div id="bar_chart" style={{ display: 'none' }}>
                    <ReactECharts option={{}}
                        style={{
                            positoin: 'absolute',
                            width: '0',
                            height: '0',
                        }} />
                </div>
            )
        }
        else {
            let option = this.setBarOption(dataset_name, constrain, operator, constrain_value, selected_xAxis_index)
            console.log(option);
            return (
                <div id="bar_chart" >
                    <ReactECharts option={option}
                        style={{
                            positoin: 'absolute',
                            width: '100%',
                            height: '140%',
                        }} />
                </div>
            )
        }
    }
}


class EnsembleEchart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_xAxis_index: undefined,
            select_flag: false,

        }
    }


    componentWillReceiveProps(props) {
        if (!this.state.select_flag) {
            this.setState({
                selected_xAxis_index: undefined,
            })
        }

        this.setState({
            select_flag: false,
        })

        this.forceUpdate();
    }

    setOption(dataset_name, current_constrain, current_constrain_value, selected_xAxis_index) {
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
                    data: [
                        {
                            yAxis: parseFloat(current_constrain_value),
                            lineStyle: {
                                color: 'rgb(255,0,0)',
                                width: 2,
                                type: 'solid',
                            }
                        }
                    ],

                },

            })
        }
        if (selected_xAxis_index !== undefined) {
            series_data[0]["markLine"]["data"].push({
                xAxis: selected_xAxis_index,
                lineStyle: {
                    color: 'rgb(0,0,255)',
                    width: 2,
                    type: 'dash',
                }
            });
        }

        let xAxis_data = Array.from({ length: time_num }).map((v, k) => k + 1)

        let option = {
            title: {
            },
            tooltip: {
                // show: false,
                trigger: 'axis',
                confine: true,
                textStyle: {
                    fontSize: '12',
                    extraCssText: 'white-space: normal; word-break: break-all;'
                },
                formatter: function (obj_array) {
                    // if (obj_array instanceof Array) {
                    //     let str = '';
                    //     str += obj_array[0].axisValue + '<br/>';

                    //     obj_array.forEach((obj, index) => {
                    //         str += '<span style=\"display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + obj.color + ';\"></span>'
                    //         str += obj.seriesName + ':&nbsp&nbsp' + obj.value;
                    //         if (index % 2 !== 0)
                    //             str += '<br/>';
                    //         else {
                    //             str += '&nbsp&nbsp&nbsp&nbsp&nbsp';
                    //         }

                    //     });
                    //     return str;
                    // }
                    return "";
                }

            },
            grid: {
                top: '5%',
                left: '8%',
                right: '8%',
                bootom: '8%',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis_data,
                triggerEvent: true,
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

    onclick = {
        'click': this.clickAxis.bind(this)
    }

    clickAxis(e) {  // 点击坐标轴x
        let x_index = e.dataIndex;  // 注意是索引，而不是第几天
        this.setState({
            selected_xAxis_index: x_index,
        }, () => {
            this.forceUpdate();
        });

        this.setState({ select_flag: true, }, () => {
            this.props.updateSelectedEnsembleXAxisIndex(x_index);
        })


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
            option = {}
        }
        else {  // 约束已经设置
            if (current_constrain_index === undefined) {  // 默认情况
                current_constrain_index = 0;
            }
            current_constrain = constrain_list[current_constrain_index];
            current_constrain_value = constrain_values[current_constrain_index];
            current_constrain_value = parseFloat(current_constrain_value);

            option = this.setOption(dataset_name, current_constrain, current_constrain_value, this.state.selected_xAxis_index);
        }

        // console.log(option);

        return (
            <div style={{ width: '100%', height: '100%', }}>
                <ReactECharts option={option}
                    onEvents={this.onclick}
                    style={{
                        positoin: 'absolute',
                        top: '5%',
                        width: '100%',
                        height: '95%',
                    }} />
            </div>
        )
    }
}

export { EnsembleEchart, ConstrainBox, Bar };
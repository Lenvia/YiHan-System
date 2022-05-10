import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import $ from 'jquery';
import { format } from 'echarts';



class DetailChartBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            detail_data_list1: [],
            detail_data_list2: []
        };
    }


    getDetailJsonPath(dataset_name) {
        return dataset_name + '/DetailSample.json'
    }

    componentDidUpdate(props) {  // props 是之前的参数，this.props是刚传来的参数
        if (props.dataset_name === this.props.dataset_name
            && props.selected_member_id === this.props.selected_member_id
        )
            return;

        // 到这里说明，要么数据集变了，要么member 变了

        this.setState({
            detail_ready: false,
            dataset_name: this.props.dataset_name,
            selected_member_id: this.props.selected_member_id,
        })

        let detail_json_path = this.getDetailJsonPath(this.props.dataset_name)

        // 还没有选择id！不要显示
        if (this.props.selected_member_id === undefined) return;

        var _this = this;

        fetch(detail_json_path, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (detail_json) {
                let member_data = detail_json[_this.props.selected_member_id];
                let keys = Object.keys(member_data);

                let xAxis_data = Array.from({ length: _this.props.time_range[1] }).map((v, k) => k)
                let option1 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        top: '20%',
                        left: '15%',
                        right: '10%',
                        bootom: '0',
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis_data,
                        name: 'time',  // x轴名称
                        nameLocation: 'middle',  // x坐标轴名称的位置
                        nameGap: 20,
                    },
                    yAxis: {
                        type: 'value',
                        name: keys[0],  // y轴名称
                        nameLocation: 'end',  // y坐标轴名称的位置

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
                            bottom: '10%',
                        },
                        {
                            type: 'inside',
                            realtime: true,

                            xAxisIndex: 0,
                            zoomOnMouseWheel: true,
                            moveOnMouseMove: true,
                        }],
                    series: [
                        {
                            // 在这里不给data
                            data: member_data[keys[0]],
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: 'rgb(89,130,184)'
                                }
                            }
                        }
                    ]
                };

                let option2 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        top: '20%',
                        left: '15%',
                        right: '10%',
                        bootom: '0',
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis_data,
                        name: 'time',  // x轴名称
                        nameLocation: 'middle',  // x坐标轴名称的位置
                        nameGap: 20,
                    },
                    yAxis: {
                        type: 'value',
                        name: keys[1],  // y轴名称
                        nameLocation: 'end',  // y坐标轴名称的位置

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
                            bottom: '10%',
                        },
                        {
                            type: 'inside',
                            realtime: true,

                            xAxisIndex: 0,
                            zoomOnMouseWheel: true,
                            moveOnMouseMove: true,
                        }],
                    series: [
                        {
                            // 在这里不给data
                            data: member_data[keys[1]],
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: 'rgb(89,130,184)'
                                }
                            }
                        }
                    ]
                };

                _this.setState({
                    isLoad: true,
                    option1: option1,
                    option2: option2,
                })
            })

    }

    render() {
        if (this.state.isLoad) {
            return (
                <div id="detail_box">
                    <div className='detail_chart' style={{ top: '5%' }}>
                        <ReactECharts option={this.state.option1}
                            style={{
                                positoin: 'absolute',
                                top: '5%',
                                width: '100%',
                                height: '95%',
                            }}
                        />
                    </div>
                    <div className='detail_chart' style={{ top: '50%' }}>
                        <ReactECharts option={this.state.option2}
                            style={{
                                positoin: 'absolute',
                                top: '5%',
                                width: '100%',
                                height: '95%',
                            }}
                        />
                    </div>
                </div>
            )

        }

        return (
            <div id="detail_box"></div>
        )

    }
}

// 注：在这里更新 t_index 并不会更改全局！！！
class TimePic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset_name: undefined,
            selected_member_id: undefined,
            current_t_index: undefined,
            current_img_src: undefined,
            pic_ready: false,
        }
    }

    getImageSrc(dataset_name, selected_member_id, selected_xAxis_index) {
        return dataset_name + '/OneMemberTimeSample/' + selected_member_id + '/t' + selected_xAxis_index + '.png';
    }

    componentDidUpdate(props) {  // props 是之前的参数，this.props是刚传来的参数
        // 只限制这两个条件！只要数据集和member没变，就不更新
        // t_index 只会影响初始化，不能作为改不改变的标准
        if (props.dataset_name === this.props.dataset_name
            && props.selected_member_id === this.props.selected_member_id
        )
            return;

        // 还没有选择id！不要显示
        if (this.props.selected_member_id === undefined) return;

        // 到这里说明，要么数据集变了，要么member 变了
        // member 变了 必须 触发 current_t_index 更改！

        console.log("update state")
        this.setState({
            pic_ready: false,
            dataset_name: this.props.dataset_name,
            selected_member_id: this.props.selected_member_id,
            current_t_index: this.props.selected_xAxis_index,
        })


        this.setState({
            current_img_src: this.getImageSrc(this.props.dataset_name, this.props.selected_member_id, this.props.selected_xAxis_index),
            pic_ready: true,
        })

    }

    handleChange(event) {
        let new_t_index = event.target.value;
        let current_img_src = this.state.dataset_name + '/OneMemberTimeSample/' + this.state.selected_member_id + '/t' + new_t_index + '.png';

        this.setState({
            current_t_index: new_t_index,
            current_img_src: current_img_src,
            pic_ready: true,
        });
    }



    handleClick(event) {
        let _this = this;
        const timer = ms => new Promise(res => setTimeout(res, ms))
        async function load() { // We need to wrap the loop into an async function for this to work
            for (let i = _this.state.current_t_index; i < _this.props.time_range[1]; i++) {

                if (_this.state.playing_flag === false) { // 如果中途检测到终止信号，那么立刻停止
                    console.log("检测到终止操作")
                    return;
                }

                let current_img_src = _this.state.dataset_name + '/OneMemberTimeSample/' + _this.state.selected_member_id + '/t' + i + '.png';

                _this.setState({
                    current_t_index: i,
                    current_img_src: current_img_src,
                    pic_ready: true,
                })
                // console.log(i);
                await timer(1000);
            }

        }


        let playing_flag = this.state.playing_flag;
        // 如果原先未播放
        if (playing_flag === undefined || playing_flag === false) {
            $("#pic_player").css(
                'background-image', 'url(' + require("./resources/icons/pause.png") + ')'
            )
            this.setState({
                playing_flag: true,
            }, () => {
                console.log("开始播放");
                load();
            })


        }
        else {  // 原先正在播放，那么现在是终止，并返回
            $("#pic_player").css(
                'background-image', 'url(' + require("./resources/icons/play.png") + ')'
            )
            this.setState({
                playing_flag: false,
            }, () => {
                console.log("终止播放")
            })


            return;
        }









    }

    render() {

        let time_range = this.props.time_range;

        if (this.state.pic_ready) {

            return (
                <div id="time_pic">
                    <div id="pic_box" >
                        <img src={this.state.current_img_src} style={{ maxWidth: '100%' }} alt="" />
                    </div>

                    <div id="pic_player" onClick={this.handleClick.bind(this)}></div>
                    <input id="pic_time_range" type="range"
                        value={this.state.current_t_index} min={time_range[0]} max={time_range[1] - 1}
                        step="1"
                        onChange={this.handleChange.bind(this)}
                    />
                    <div id="pic_time_label" style={{ whiteSpace: 'pre' }}>{this.state.selected_member_id}           time: {this.state.current_t_index}</div>
                </div>
            )
        }
        else {
            return (
                <div >
                    NOT READY
                </div>
            )
        }

    }
}

export { TimePic, DetailChartBox }

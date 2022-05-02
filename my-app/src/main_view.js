import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';


// 注：这个 ConstrainBox 的大小是相对于整个容器
class ConstrainBox extends Component {
    render() {
        return (
            <div>
                <div className="drifting_line" style={{ top: '5%', left: '60%', width: '10%', height: '10%' }}>Value: </div>
                <select id="constrain_selector" className="drifting_line" style={{ top: '5%', left: '70%', width: '15%', height: '10%' }}>
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
    // 返回配置对象
    option = {
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '30%']
        },
        visualMap: {
            type: 'piecewise',
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: []
        },
        series: [
            {
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                    color: '#5470C6',
                    width: 5
                },
                markLine: {
                    symbol: ['none', 'none'],
                    label: { show: false },
                    data: [{ xAxis: 1 }]
                },
                areaStyle: {},
                data: [
                    ['2019-10-10', 200],
                    ['2019-10-11', 560],
                    ['2019-10-12', 750],
                    ['2019-10-13', 580],
                    ['2019-10-14', 250],
                    ['2019-10-15', 300],
                    ['2019-10-16', 450],
                    ['2019-10-17', 300],
                    ['2019-10-18', 100]
                ]
            }
        ]
    };

    render() {
        return (
            <div>
                <ReactECharts option={this.option} />
            </div>
        )
    }
}

export { EnsembleEchart, ConstrainBox };
import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import $ from 'jquery';



// 注：在这里更新 t_inde 并不会更改全局！！！
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

    render() {

        let time_range = this.props.time_range;

        if (this.state.pic_ready) {

            return (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#FFF5EE' }}>
                    <div id="pic_box" >
                        <img src={this.state.current_img_src} style={{ maxWidth: '98%' }} alt="" />
                    </div>

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

export { TimePic }
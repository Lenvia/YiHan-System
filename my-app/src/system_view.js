import React from 'react';
import { json_data, case_unrelated_data } from "./global_definer.js"
import $ from 'jquery';


// Simulation Description View 中的每一行
class DatasetIntroLine extends React.Component {
    render() {
        return (
            <div className="dataset_intro_line" style={{ top: this.props.value['top'] }}>
                <div className="dataset_intro_key">{this.props.value['k']}</div>
                <div className="dataset_intro_value">{this.props.value['v']}</div>
            </div>
        )
    }
}

// Simulation Description View 数据集介绍
class DatasetIntro extends React.Component {

    renderDatasetIntroLine(k, v, top) {
        return <DatasetIntroLine
            value={{ 'k': k, 'v': v, 'top': top }}
        />
    }

    datasetChange(event) {
        // dataset = json_data["simulation"][event.target.selectedIndex];
        this.props.updateDataset(event.target.selectedIndex);
        // console.log(dataset)

    }

    render() {
        return (
            <div id="dataset_intro" style={{ width: '100%', height: '100%' }}>
                <div className="dataset_intro_line">
                    <div className="dataset_intro_key">Dataset Name: </div>
                    <select className="dataset_intro_value" onChange={(event) => this.datasetChange(event)}>
                        {
                            json_data["simulation"].map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item["name"]}>{item["name"]}</option>
                                )
                            })
                        }
                    </select>
                </div>
                {this.renderDatasetIntroLine("Member Number: ", this.props.dataset_info["member_number"], '20%')}
                {this.renderDatasetIntroLine("Location Range: ", String(this.props.dataset_info["location_range"]), '40%')}
                {this.renderDatasetIntroLine("Time Range: ", String(this.props.dataset_info["time_range"]), '60%')}
                {this.renderDatasetIntroLine("Object Name: ", this.props.dataset_info["Object_name"], '80%')}
            </div>
        );
    }
}

// Region Selection View 图片面板
class RegionBg extends React.Component {

    render() {
        let bg = require("./resources/sample/" + this.props.back_img_src);
        return (
            <div id="region_background"
                style={{
                    backgroundImage: "url(" + bg + ")",
                    // backgroundImage: 'url(require(./resources/sample/bg1.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    backgroundSize: '100% 100%'
                }}>
            </div>
        )
    }
}

// Region Selection View 参数面板
class RegionPara extends React.Component {

    render() {
        return (
            <div id="region_para">

                <div id="xrange_label" className="region_para_line" style={{ top: '8%', width: '15%', fontWeight: 'bold' }}>x:</div>
                <div id="xrange" className="region_para_line" style={{ top: '8%', left: '20%' }}>
                    <form >
                        <div className="form-row">
                            <div className={("col")}>
                                <input type="text" id="xrange_left" className={("form-control", "custom_form-control")} style={{ top: '0', left: '0%' }} placeholder="" />
                            </div>
                            <p style={{ position: 'absolute', top: '0', left: '35%' }} >-</p>
                            <div className={("col")}>
                                <input type="text" id="xrange_right" className={("form-control", "custom_form-control")} style={{ top: '0', left: '45%' }} placeholder="" />
                            </div>
                        </div>
                    </form>
                </div>

                <div id="yrange_label" className="region_para_line" style={{ top: '38%', width: '15%', fontWeight: 'bold' }}>y:</div>
                <div id="yrange" className="region_para_line" style={{ top: '38%', left: '20%' }}>
                    <form >
                        <div className="form-row">
                            <div className={("col")} style={{ left: '0%' }}>
                                <input type="text" id="yrange_left" className={("form-control", "custom_form-control")} style={{ top: '0', left: '0%' }} placeholder="" />
                            </div>
                            <p style={{ position: 'absolute', top: '0', left: '35%' }} >-</p>
                            <div className={("col")} style={{ left: '0%' }}>
                                <input type="text" id="yange_right" className={("form-control", "custom_form-control")} style={{ top: '0', left: '45%' }} placeholder="" />
                            </div>
                        </div>
                    </form>
                </div>

                <div id="layer_label" className="region_para_line" style={{ top: '70%', width: '20%', fontWeight: 'bold' }}>layer:</div>
                <div id="layer_box" className="region_para_line" style={{ top: '70%', left: '25%', width: '25%' }}>
                    <select>
                        {
                            this.props.layer.map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-success" type="submit" style={{ position: 'absolute', top: '68%', left: '60%', width: '25%' }}>Apply</button>
            </div>
        )
    }
}

// Region Selection View
class Region extends React.Component {
    render() {
        return (
            <div id="region" style={{ weight: '100%', height: '100%' }}>
                <RegionBg back_img_src={this.props.dataset_info['back_img_src']} />
                <RegionPara layer={this.props.dataset_info['layer']} />
            </div>
        )
    }
}

class DriftingExp extends React.Component {
    render() {
        // console.log(this.props.config["readOnly"])
        if (this.props.config["readOnly"] === true)
            return (
                <div>
                    <label key={"label" + this.props.config["index"]} className="drifting_line"
                        style={{
                            visibility: this.props.config["visibility"],
                            top: String(this.props.config["roof"] + 4 * this.props.config["gap"] + this.props.config["index"] * 10) + '%',
                            width: '60%',
                            fontWeight: 'bold'
                        }}>{this.props.config["exp"]}</label>
                    <input id={"input" + this.props.config["index"]} key={"input" + this.props.config["index"]} value={this.props.config["value"]} className="drifting_line" readOnly={true}
                        style={{
                            visibility: this.props.config["visibility"],
                            position: 'absolute',
                            left: '70%',
                            top: String(this.props.config["roof"] + 4 * this.props.config["gap"] + this.props.config["index"] * 10) + '%',
                            width: '20%',
                            fontSize: '12px',
                            // backgroundColor: 'red'
                        }}
                    />
                </div>
            )
        else return (
            <div>
                <label key={"label" + this.props.config["index"]} className="drifting_line"
                    style={{
                        visibility: this.props.config["visibility"],
                        top: String(this.props.config["roof"] + 4 * this.props.config["gap"] + this.props.config["index"] * 10) + '%',
                        width: '60%',
                        fontWeight: 'bold'
                    }}>{this.props.config["exp"]}</label>
                <input id={"input" + this.props.config["index"]} key={"input" + this.props.config["index"]} className="drifting_line"
                    style={{
                        visibility: this.props.config["visibility"],
                        position: 'absolute',
                        left: '70%',
                        top: String(this.props.config["roof"] + 4 * this.props.config["gap"] + this.props.config["index"] * 10) + '%',
                        width: '20%',
                        fontSize: '12px',
                        // backgroundColor: 'red'
                    }}
                // onChange={(e) => { $(e.target.id).val(e.target.value) }}
                />
            </div>
        )
    }
}

// Object Drifting Setting
class Drifting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_option: this.props.dataset_info["Objects"][0],
            locked_list: ['null'],
            locked_input: [0],
        }
    }

    makeExp(attr, sta, op) {
        return sta + "(" + attr + ")" + op;
    }

    // 渲染 exp label
    renderDriftingExp(i, roof, gap) {
        let vis, readOnly;
        readOnly = true;  // 默认都是只读，只有当前的可写

        if (i < this.state.locked_list.length) {
            vis = 'visable';
            if (i === this.state.locked_list.length - 1) {
                readOnly = false
            }
        }

        else
            vis = 'hidden';

        let config = {
            'visibility': vis,
            'roof': roof,
            'index': i,
            "gap": gap,
            "exp": this.state.locked_list[i],
            "value": this.state.locked_input[i],
            "readOnly": readOnly
        };

        // console.log(config);

        return <DriftingExp
            config={config}
        />
    }

    //props发生变化时触发
    componentWillReceiveProps(props) {
        this.setState({
            cur_option: this.props.dataset_info["Objects"][0],
            locked_list: ['null'],
            locked_input: [undefined],
        })
        // 其它下拉框归零
        $("#objects_selector").prop('selectedIndex', 0);
        $("#attribute_selector").prop('selectedIndex', 0);
    }

    // 响应
    objectChange(event) {
        this.setState({
            cur_option: event.target.value,
        })
        this.forceUpdate()
    }

    lockButtonClick(para) {

        // TODO 检查数字有没有写
        // 添加策略：替换当前 lock_list 和 lock_input 末尾的值，再append（同时判断是否越界）
        let attr = $("#attribute_selector").val();
        let sta = $("#statistic_selector").val();
        let op = $("#operator_selector").val();
        let inputId = para.state.locked_list.length - 1;
        let value = $("#input" + inputId).val();

        console.log(attr, sta, op, value);
    }

    render() {
        let roof = 5;  // 最顶部的top
        let gap = 12;  // 两行间距
        // console.log(this.state.locked_list)
        return (
            <div id="drifting_setting" style={{ width: '100%', height: '100%' }}>
                <div className="drifting_line" style={{ top: String(roof) + '%', fontWeight: 'bold' }}>Object: </div>
                <div className="drifting_line" style={{ top: String(roof) + '%', left: '35%', width: '40%' }}>
                    <select id="objects_selector" onChange={(event) => this.objectChange(event)} >
                        {
                            this.props.dataset_info["Objects"].map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>


                <div className="drifting_line" style={{ top: String(roof + gap) + '%', fontWeight: 'bold' }}>Attribute: </div>
                <div className="drifting_line" style={{ top: String(roof + gap) + '%', left: '35%', width: '40%' }}>
                    <select id="attribute_selector">
                        {
                            this.props.dataset_info["Attribute"][this.state.cur_option].map((item, index) => {
                                return (
                                    <option key={'aOption' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="drifting_line" style={{ top: String(roof + 2 * gap) + '%', fontWeight: 'bold' }}>Statistic: </div>
                <div className="drifting_line" style={{ top: String(roof + 2 * gap) + '%', left: '35%', width: '40%' }}>
                    <select id="statistic_selector">
                        {
                            case_unrelated_data["statistic"].map((item, index) => {
                                return (
                                    <option key={'sOption' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>


                <div className="drifting_line" style={{ top: String(roof + 3 * gap) + '%', fontWeight: 'bold' }}>Operator: </div>
                <div className="drifting_line" style={{ top: String(roof + 3 * gap) + '%', left: '35%', width: '40%' }}>
                    <select id="operator_selector">
                        {
                            case_unrelated_data["operator"].map((item, index) => {
                                return (
                                    <option key={'oOption' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>

                {
                    this.state.locked_list.map((item, index) => {
                        return this.renderDriftingExp(index, roof, gap)
                    })
                }

                <div id="drifting_button_container">
                    <button id="lock_button" onClick={(e) => this.lockButtonClick(this)} type="button" className="btn btn-primary">Lock</button>
                    <button id="apply_button" type="button" className="btn btn-success">Apply</button>
                </div>
            </div>
        )

    }
}



export { DatasetIntro, Region, Drifting }
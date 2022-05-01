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


// Object Drifting Setting
class Drifting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locked_list: []
        }
    }

    objectChange(event) {
        this.forceUpdate()
    }

    lockButtonClick(event) {
        // TODO 检查数字有没有写
        // locked_list 放进去
    }

    render() {
        let curOption = $('#objects_selector option:selected').val();
        if (curOption === undefined) {  // 刚加载数据集时
            curOption = this.props.dataset_info["Objects"][0];
        }
        // 中途更换了数据集，将selector归位
        if (this.props.dataset_info["Attribute"][curOption] === undefined) {
            $('#objects_selector').val(this.props.dataset_info["Objects"][0]);
            curOption = this.props.dataset_info["Objects"][0];
        }
        // console.log(curOption)

        return (
            <div id="drifting_setting" style={{ width: '100%', height: '100%' }}>
                <div className="drifting_line" style={{ top: '5%', fontWeight: 'bold' }}>Object: </div>
                <div className="drifting_line" style={{ top: '5%', left: '35%', width: '40%' }}>
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


                <div className="drifting_line" style={{ top: '20%', fontWeight: 'bold' }}>Attribute: </div>
                <div className="drifting_line" style={{ top: '20%', left: '35%', width: '40%' }}>
                    <select>
                        {
                            this.props.dataset_info["Attribute"][curOption].map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="drifting_line" style={{ top: '35%', fontWeight: 'bold' }}>Statistic: </div>
                <div className="drifting_line" style={{ top: '35%', left: '35%', width: '40%' }}>
                    <select>
                        {
                            case_unrelated_data["statistic"].map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>


                <div className="drifting_line" style={{ top: '50%', fontWeight: 'bold' }}>Operator: </div>
                <div className="drifting_line" style={{ top: '50%', left: '35%', width: '40%' }}>
                    <select>
                        {
                            case_unrelated_data["operator"].map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>


            </div>
        )

    }
}



export { DatasetIntro, Region, Drifting }
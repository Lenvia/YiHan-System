

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
    constructor(props) {
        super(props);
        this.state = {
            dataset_info: dataset
        }
    }

    renderDatasetIntroLine(k, v, top) {
        return <DatasetIntroLine
            value={{ 'k': k, 'v': v, 'top': top }}
        />
    }

    datasetChange(event) {
        this.state.dataset_info = json_data["simulation"][event.target.selectedIndex];
        this.forceUpdate();
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
                {this.renderDatasetIntroLine("Member Number: ", this.state.dataset_info["member_number"], '20%')}
                {this.renderDatasetIntroLine("Location Range: ", String(this.state.dataset_info["location_range"]), '40%')}
                {this.renderDatasetIntroLine("Time Range: ", String(this.state.dataset_info["time_range"]), '60%')}
                {this.renderDatasetIntroLine("Object Name: ", this.state.dataset_info["Object_name"], '80%')}
            </div>
        );
    }
}

// Region Selection View 图片面板
class RegionBg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            back_img_src: dataset["back_img_src"]
        }

    }

    render() {
        return (
            <div id="region_background"
                style={{
                    backgroundImage: "url(" + this.state.back_img_src + ")",
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
    constructor(props) {
        super(props);
        this.state = {
            layers: dataset['layer']
        }
    }

    render() {
        return (
            <div id="region_para">

                <div id="xrange_label" className="region_para_line" style={{ top: '8%', width: '15%', fontWeight: 'bold' }}>x:</div>
                <div id="xrange" className="region_para_line" style={{ top: '8%', left: '20%' }}>
                    <form >
                        <div className="form-row">
                            <div className={("col")}>
                                <input type="text" id="xrange_left" className={("form-control", "custom_form-control")} placeholder="" />
                            </div>
                            <p>-</p>
                            <div className={("col")}>
                                <input type="text" id="xrange_right" className={("form-control", "custom_form-control")} placeholder="" />
                            </div>
                        </div>
                    </form>
                </div>

                <div id="yrange_label" className="region_para_line" style={{ top: '38%', width: '15%', fontWeight: 'bold' }}>y:</div>
                <div id="yrange" className="region_para_line" style={{ top: '38%', left: '20%' }}>
                    <form >
                        <div className="form-row">
                            <div className={("col")} style={{ left: '0%' }}>
                                <input type="text" id="yrange_left" className={("form-control", "custom_form-control")} placeholder="" />
                            </div>
                            <p>-</p>
                            <div className={("col")} style={{ left: '0%' }}>
                                <input type="text" id="yange_right" className={("form-control", "custom_form-control")} placeholder="" />
                            </div>
                        </div>
                    </form>
                </div>

                <div id="layer_label" className="region_para_line" style={{ top: '70%', width: '20%', fontWeight: 'bold' }}>layer:</div>
                <div id="layer_box" className="region_para_line" style={{ top: '70%', left: '25%', width: '25%' }}>
                    <select>
                        {
                            this.state.layers.map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-primary" type="submit" style={{ position: 'absolute', top: '68%', left: '60%', width: '25%' }}>Apply</button>
            </div>
        )
    }
}

// Region Selection View
class Region extends React.Component {
    render() {
        return (
            <div id="region" style={{ weight: '100%', height: '100%' }}>
                <RegionBg />
                <RegionPara />
            </div>

        )
    }
}


// Object Drifting Setting
class Drifting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object_list: dataset["Objects"],
            curObject: dataset["Objects"][0],
            attribute_list: dataset["Attribute"]
        }
    }

    objectChange(event) {
        this.setState({
            curObject: event.target.value,
        });
    }

    render() {
        return (
            <div id="drifting_setting" style={{ width: '100%', height: '100%' }}>
                <div className="drifting_line" style={{ top: '8%', fontWeight: 'bold' }}>Object: </div>
                <div className="drifting_line" style={{ top: '8%', left: '35%', width: '40%' }}>
                    <select onChange={(event) => this.objectChange(event)} >
                        {
                            this.state.object_list.map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>


                <div className="drifting_line" style={{ top: '28%', fontWeight: 'bold' }}>Attribute: </div>
                <div className="drifting_line" style={{ top: '28%', left: '35%', width: '40%' }}>
                    <select>
                        {
                            this.state.attribute_list[this.state.curObject].map((item, index) => {
                                return (
                                    <option key={'option' + index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="drifting_line" style={{ top: '48%', fontWeight: 'bold' }}>Statistic: </div>
                <div className="drifting_line" style={{ top: '48%', left: '35%', width: '40%' }}>
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


                <div className="drifting_line" style={{ top: '68%', fontWeight: 'bold' }}>Operator: </div>
                <div className="drifting_line" style={{ top: '68%', left: '35%', width: '40%' }}>
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


ReactDOM.render(
    <DatasetIntro />,
    document.getElementById('description_container')
);


ReactDOM.render(
    <Region />,
    document.getElementById('region_container')
);


ReactDOM.render(
    <Drifting />,
    document.getElementById('setting_container')
);


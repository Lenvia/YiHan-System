var back_img_src = dataset_info["back_img_src"];

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
    render() {
        return (
            <div id="dataset_intro" style={{ width: '100%', height: '100%' }}>
                {this.renderDatasetIntroLine("Dataset Name: ", dataset_info["name"], '0')}
                {this.renderDatasetIntroLine("Member Number: ", dataset_info["member_number"], '20%')}
                {this.renderDatasetIntroLine("Location Range: ", String(dataset_info["location_range"]), '40%')}
                {this.renderDatasetIntroLine("Time Range: ", String(dataset_info["time_range"]), '60%')}
                {this.renderDatasetIntroLine("Object Name: ", dataset_info["Object_name"], '80%')}
            </div>
        );
    }
}

// Region Selection View 图片面板
class RegionBg extends React.Component {
    render() {
        return (
            <div id="region_background"
                style={{
                    backgroundImage: "url(" + back_img_src + ")",
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
            layers: dataset_info['layer']
        }
    }

    render() {
        return (
            <div id="region_para">

                <div id="xrange_label" className="region_para_line" style={{ top: '8%', width: '15%' }}>x:</div>
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

                <div id="yrange_label" className="region_para_line" style={{ top: '38%', width: '15%' }}>y:</div>
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

                <div id="layer_label" className="region_para_line" style={{ top: '70%', width: '20%' }}>layer:</div>
                <div id="layer_box" className="region_para_line" style={{ top: '70%', left: '25%', width: '25%' }}>
                    <select>
                        {
                            this.state.layers.map((item, index) => {
                                return (
                                    <option value={item}>{index}</option>
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




ReactDOM.render(
    <DatasetIntro />,
    document.getElementById('description_container')
);


ReactDOM.render(
    <Region />,
    document.getElementById('region_container')
);


var back_img_src = dataset_info["back_img_src"];


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

class DatasetIntro extends React.Component {
    renderDatasetIntroLine(k, v, top) {
        return <DatasetIntroLine
            value={{ 'k': k, 'v_text': v, 'top': top }}
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

class RegionPara extends React.Component {
    render() {
        return (
            <div id="region_para">
                <div id="xrange" className="range_line" style={{ top: '8%' }}></div>
                <div id="yrange" className="range_line" style={{ top: '38%' }}></div>
                <div id="layer_box" className="range_line" style={{ top: '70%' }}></div>
            </div>
        )
    }
}

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


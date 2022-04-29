

// let attr_arr = dataset_info["Attributes"]["attr"]
var back_img_src = dataset_info["back_img_src"];
class DatasetIntro extends React.Component {
    render() {
        return (
            <div id="dataset_intro" style={{ weight: '100%', height: '100%' }}>
                <div className="dataset_intro_line" id="dataset_name" style={{ top: '0' }}>
                    <div className="dataset_intro_key">Dataset Name: </div>
                    <div className="dataset_intro_value">{dataset_info["name"]}</div>
                </div>
                <div className="dataset_intro_line" id="member_number" style={{ top: '20%' }}>
                    <div className="dataset_intro_key">Member Number: </div>
                    <div className="dataset_intro_value">{dataset_info["member_number"]}</div>
                </div>
                <div className="dataset_intro_line" id="location_range" style={{ top: '40%' }}>
                    <div className="dataset_intro_key">Location Range: </div>
                    <div className="dataset_intro_value">{String(dataset_info["location_range"])}</div>
                </div>
                <div className="dataset_intro_line" id="time_range" style={{ top: '60%' }}>
                    <div className="dataset_intro_key">Time Range: </div>
                    <div className="dataset_intro_value">{String(dataset_info["time_range"])}</div>
                </div>
                <div className="dataset_intro_line" id="object_name" style={{ top: '80%' }}>
                    <div className="dataset_intro_key">Object Name: </div>
                    <div className="dataset_intro_value">{dataset_info["Object_name"]}</div>
                </div>
            </div>
        );
    }
}

class RegionBg extends React.Component {
    render() {
        return (
            <div id="region_background"
                style={{
                    weight: '100%', height: '60%',

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
            <div style={{ weight: '100%', height: '40%', backgroundColor: 'red' }}>

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


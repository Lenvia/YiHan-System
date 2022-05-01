import React from 'react';
import ReactDOM from 'react-dom/client';
// import LineMarkerEcharts from './main_view.js'

import { json_data } from "./global_definer.js"
import { DatasetIntro, Region, Drifting } from "./system_view.js"

import 'bootstrap';  //  引入 Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';  //  引入 Bootstrap 的 css
import 'bootstrap/dist/js/bootstrap.min.js'

// import { base, buttons, formsNr, forms, gridsNr, grids, menus, tables } from 'pure-css'

import "./main.css"
import "./react_componet.css"

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset_info: json_data["simulation"][0],
            update_flag: true,  // 为了在外部强制刷新，只能改变state
        }
    }

    updateDataset(selectedIndex) {
        this.setState({
            dataset_info: json_data["simulation"][selectedIndex]
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div id="container">
                <div id="system_container">
                    <div className="custom_view" id="left_view">
                        <div id="system_name_container">
                            <p className="text-left font-weight-bold" id="system_name">EOPVis</p>
                        </div>


                        <div className="title_container system_view_title_container" id="description_name_container">
                            <p className="text-left font-weight-bold" id="description_name">Simulation Description View</p>
                        </div>

                        <div id="description_container">
                            <DatasetIntro dataset_info={this.state.dataset_info} updateDataset={this.updateDataset.bind(this)} />
                        </div>


                        <div className="title_container system_view_title_container" id="region_name_container">
                            <p className="text-left font-weight-bold" id="region_name">Region Selection View</p>
                        </div>

                        <div id="region_container">
                            <Region dataset_info={this.state.dataset_info} />
                        </div>


                        <div className="title_container system_view_title_container" id="setting_name_container">
                            <p className="text-left font-weight-bold" id="setting_name">Object Drifting Setting</p>
                        </div>

                        <div id="setting_container">
                            <Drifting dataset_info={this.state.dataset_info} />
                        </div>



                        <div id="apply_button_container">
                            <button id="apply_button" type="button" className="btn btn-success">Apply</button>
                        </div>
                    </div>
                </div>

                <div id="main_container">
                    <div className="custom_view" id="line_view">
                        <div className="title_container main_view_titile_container" id="ensemble_statistic_name_container">
                            <p className="text-left font-weight-bold" id="ensemble_statistic_name">Ensemble Statistic View</p>
                        </div>

                        <div id="ensemble_chart_container">

                        </div>

                    </div>
                    <div className="custom_view" id="bar_view"></div>
                </div>

                <div id="analysis_container">
                    <div className="custom_view" id="action_view"></div>
                    <div className="custom_view" id="info_view"></div>
                </div>,
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Container />,
);

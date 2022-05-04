import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap';  //  引入 Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';  //  引入 Bootstrap 的 css
import 'bootstrap/dist/js/bootstrap.min.js'


import { para_json_data } from "./global_definer.js"
import { DatasetIntro, Region, Drifting } from "./system_view.js"
import { EnsembleEchart, ConstrainBox, Bar } from "./ensemble_view.js"
import { DisplayBox, SortByBox, MemberPic } from "./member_view.js"
import { TimePic } from './time_view.js';

import "./main.css"
import "./react_componet.css"


class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset_info: para_json_data["simulation"][0],

            // 左下角约束框的信息
            constrain_list: [],
            constrain_values: [],
            operator_list: [],

            // 约束下拉框的选择索引
            current_constrain_index: 0,

            // ensemble 图中选择的 xIndex（即 t_index）
            selected_xAxis_index: undefined,

            // Member View 中 下拉框 Display 名字
            display_way: 'rendering',
            // sort by 索引
            current_sort_index: 0,

            // 在 member view 中选择的 member id
            selected_member_id: undefined,
        }
    }

    updateDataset(selectedIndex) {
        this.setState({
            dataset_info: para_json_data["simulation"][selectedIndex],
        });

    }

    updateConstrain(constrain_list, constrain_values, operator_list) {
        this.setState({
            constrain_list: constrain_list,
            constrain_values: constrain_values,
            operator_list: operator_list,
        });

    }

    updateEnsembleChart(selectedIndex) {
        this.setState({
            // current_constrain: current_constrain,
            current_constrain_index: selectedIndex,
        });
    }

    updateSelectedEnsembleXAxisIndex(selected_xAxis_index) {
        this.setState({
            selected_xAxis_index: selected_xAxis_index,
        }, () => {
            // console.log(this.state.selected_xAxis_index);
        })
    }

    updateDisplay(display_way) {
        this.setState({
            display_way: display_way,
        }, () => {
            // console.log(this.state.display_way);
        })
    }

    updateSortIndex(current_sort_index) {
        this.setState({
            current_sort_index: current_sort_index,
        }, () => {
            // console.log(this.state.current_sort_index);
        })
    }

    updateSelectedMemberId(selected_member_id) {
        this.setState({
            selected_member_id: selected_member_id,
        }, () => {
            // console.log(this.state.selected_member_id);
        })
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
                            <Drifting dataset_info={this.state.dataset_info} updateConstrain={this.updateConstrain.bind(this)} />
                        </div>



                    </div>
                </div>

                <div id="main_container">
                    <div className="custom_view" id="up_main_view">
                        <div className="title_container main_view_titile_container" id="ensemble_statistic_name_container">
                            <p className="text-left font-weight-bold" id="ensemble_statistic_name">Ensemble Statistic View</p>

                            <ConstrainBox constrain_list={this.state.constrain_list}
                                updateEnsembleChart={this.updateEnsembleChart.bind(this)} />
                        </div>

                        <div id="ensemble_chart_container">
                            <EnsembleEchart
                                current_constrain_index={this.state.current_constrain_index}
                                constrain_list={this.state.constrain_list}
                                constrain_values={this.state.constrain_values}
                                dataset_name={this.state.dataset_info["name"]}
                                member_num={this.state.dataset_info["member_number"]}

                                selected_xAxis_index={this.state.selected_xAxis_index}

                                updateSelectedEnsembleXAxisIndex={this.updateSelectedEnsembleXAxisIndex.bind(this)}

                            />
                        </div>

                        <div>
                            <Bar
                                dataset_name={this.state.dataset_info["name"]}
                                member_num={this.state.dataset_info["member_number"]}
                                constrain={this.state.constrain_list[this.state.current_constrain_index]}
                                constrain_value={this.state.constrain_values[this.state.current_constrain_index]}
                                operator={this.state.operator_list[this.state.current_constrain_index]}
                                selected_xAxis_index={this.state.selected_xAxis_index}

                            />
                        </div>

                    </div>
                    <div className="custom_view" id="down_main_view">
                        <div className="title_container main_view_titile_container" id="member_view_name_container">
                            <p className="text-left font-weight-bold" id="member_view_name">Member View</p>
                            <DisplayBox updateDisplay={this.updateDisplay.bind(this)} />
                            <SortByBox
                                constrain_list={this.state.constrain_list}
                                updateSortIndex={this.updateSortIndex.bind(this)}
                            />
                        </div>
                        <div id="member_pic_container">
                            {
                                // 注：这里传入的是 sort的约束，sort的下拉框比constrain 要多一项
                                // 所以 如果sortBy 选择 index = 0时，sort_constrain, sort_constrain_value, sort_operator 都是空的
                            }
                            <MemberPic
                                dataset_name={this.state.dataset_info["name"]}
                                member_num={this.state.dataset_info["member_number"]}

                                current_sort_index={this.state.current_sort_index}
                                sort_constrain={this.state.constrain_list[this.state.current_sort_index - 1]}
                                sort_constrain_value={this.state.constrain_values[this.state.current_sort_index - 1]}
                                sort_operator={this.state.operator_list[this.state.current_sort_index - 1]}

                                current_constrain_index={this.state.current_constrain_index}
                                constrain={this.state.constrain_list[this.state.current_constrain_index]}
                                constrain_value={this.state.constrain_values[this.state.current_constrain_index]}
                                operator={this.state.operator_list[this.state.current_constrain_index]}

                                selected_xAxis_index={this.state.selected_xAxis_index}

                                display_way={this.state.display_way}

                                updateSelectedMemberId={this.updateSelectedMemberId.bind(this)}
                            />
                        </div>
                    </div>
                </div>

                <div id="analysis_container">
                    <div className="custom_view" id="time_view">
                        <div className="title_container main_view_titile_container" id="time_view_name_container">
                            <p className="text-left font-weight-bold" id="time_view_name">Time View</p>

                        </div>
                        <div id="time_pic_container">
                            <TimePic
                                dataset_name={this.state.dataset_info["name"]}
                                selected_xAxis_index={this.state.selected_xAxis_index}
                                selected_member_id={this.state.selected_member_id}
                            />
                        </div>

                    </div>
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

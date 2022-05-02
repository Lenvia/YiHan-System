

import data1 from './resources/sample/paramSample.json';
import data2 from './resources/sample/ensembleStatisticViewSample.json';


var para_json_data = JSON.parse(JSON.stringify(data1));
var ensemble_json_data = JSON.parse(JSON.stringify(data2));

// console.log(ensemble_json_data)


// var dataset;  // 某一个数据集的信息
var case_unrelated_data;  // json 文件中与数据无关的信息

case_unrelated_data = {
    "statistic": para_json_data["statistic"],
    "operator": para_json_data["operator"]
}


export { para_json_data, case_unrelated_data, ensemble_json_data }
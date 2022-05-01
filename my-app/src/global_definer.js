

import data from './resources/sample/paramSample.json';

const loadData = () => JSON.parse(JSON.stringify(data));
var json_data = loadData()

// var dataset;  // 某一个数据集的信息
var case_unrelated_data;  // json 文件中与数据无关的信息

case_unrelated_data = {
    "statistic": json_data["statistic"],
    "operator": json_data["operator"]
}


export { json_data, case_unrelated_data }
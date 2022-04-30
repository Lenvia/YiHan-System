var json_data;
var dataset;  // 某一个数据集的信息
var case_unrelated_data;  // json 文件中与数据无关的信息

var json_path = "./resources/paramSample.json"


$.ajax({
    url: json_path,// json文件位置
    type: "GET",// 请求方式为get
    dataType: "json", // 返回数据格式为json
    async: false,  // 异步设置为否
    success: function (res) {  // 请求成功完成后要执行的方法
        json_data = res;
    }
})

dataset = json_data["simulation"][0]
case_unrelated_data = {
    "statistic": json_data["statistic"],
    "operator": json_data["operator"]
}

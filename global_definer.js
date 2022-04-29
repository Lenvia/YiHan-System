var dataset_info;  // 数据集的信息
var dataset_info_path = "./resources/redSea-1.json"

$.ajax({
    url: dataset_info_path,// json文件位置
    type: "GET",// 请求方式为get
    dataType: "json", // 返回数据格式为json
    async: false,  // 异步设置为否
    success: function (res) {  // 请求成功完成后要执行的方法
        var json_data = res;
        dataset_info = json_data
    }
})
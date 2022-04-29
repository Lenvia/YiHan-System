var dataset_info;  // 数据集的信息


var dataset_info_path = "./resources/paramSample.json"


$.ajax({
    url: dataset_info_path,// json文件位置
    type: "GET",// 请求方式为get
    dataType: "json", // 返回数据格式为json
    async: false,  // 异步设置为否
    success: function (res) {  // 请求成功完成后要执行的方法
        var json_data = res;
        dataset_info = json_data
        console.log(dataset_info)
    }
})

dataset_info = dataset_info["simulation"][0]
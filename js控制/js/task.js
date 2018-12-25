
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2018-12-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

var aqiSourceData = {
    "北苑": randomBuildData(500),
    "西苑": randomBuildData(300),
    "南苑": randomBuildData(200),
    "学苑": randomBuildData(100),
    "三好坞": randomBuildData(300),
    "半亩园": randomBuildData(500),
    "西北": randomBuildData(100),
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCanteen: "北苑",
    nowGraTime: "day"
}

function calLeft(i) {
    var len
    if (i == 0) len = 12;
    else {
        len = (i * 2 - 1) * 6.5 + 18;
    }
    return len;
}

function randomColor() {
    var a = Math.random() * 13 - 1;
    return colors[parseInt(a)];
}

/**
 * 渲染图表
 */
function renderChart() {
    let canteen = aqiSourceData[pageState.nowSelectCanteen];
    var n = Object.getOwnPropertyNames(canteen).length;
    var chartWrap = document.getElementById("aqi-chart-wrap");
    chartWrap.innerHTML = "";
    chartWrap.innerHTML += "<div class='title'>" + pageState.nowSelectCanteen + "食堂9-11月日人流量报告</div>"
    for (let i = 0; i < n; i++) {
        chartWrap.innerHTML += "<div class='aqi-bar day' style = 'left:" + calLeft(i) + "px;background:" + randomColor() + ";height:" + canteen[Object.getOwnPropertyNames(canteen)[i]] + "px;width: 6px'></div>"
    }
}

/**
 * select发生变化时的处理函数
 */
function canteenSelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    pageState['nowSelectCanteen'] = this.options[this.selectedIndex].text;
    renderChart();
}


/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCanteenSelector() {
    // 读取aqiSourceData中的城市，然后设置id为canteen-select的下拉列表中的选项
    // 给select设置事件，当选项发生变化时调用函数canteenSelectChange
    var sel = document.getElementById("canteen-select");
    sel.addEventListener("change",canteenSelectChange);
}

/**
 * 初始化函数
 */
function init() {
    initCanteenSelector();
}
renderChart();
init();
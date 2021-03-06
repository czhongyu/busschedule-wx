var timeTable = require("timetable.js").data;
var location = require("location.js").data;
var translate = require("translate.js").data;

const formatTime = date => {
  var hour = date.getHours()
  var minute = date.getMinutes()
  // var second = date.getSeconds()
  return [hour, minute].map(formatNumber).join(':')
}

// const formatDate = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   return [year, month, day].map(formatNumber).join('')
// }

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDayofweek() {
  let show_day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  let date = new Date();
  let day = date.getDay();
  let week = show_day[day];
  return week;
}

function compare(s1, s2) {
  for (let i = 0; i < 5; i++) {
    if (s1[i] > s2[i]){
      return 1
    } else if (s1[i] < s2[i]) {
      return 0
    }
  }

  return 0
}

function update_next(timeList) {
  let time = formatTime(new Date());
  let departTime = "无";
  let destinTime = "无";

  if (timeList == undefined) {
    return {
      departTime: departTime,
      destinTime: destinTime
    }
  }
  if (!timeList.hasOwnProperty("length")) {
    return {
      departTime: departTime,
      destinTime: destinTime
    }
  }

  for (let i = 0; i < timeList.length; i++) {
    if (timeList[i]["left"] != "" && compare(timeList[i]["left"], time)) {
      departTime = timeList[i]["left"];
      break;
    }
  }
  for (let i = 0; i < timeList.length; i++) {
    if (timeList[i]["right"] != "" && compare(timeList[i]["right"], time)) {
      destinTime = timeList[i]["right"];
      break;
    }
  }

  return {
    departTime: departTime,
    destinTime: destinTime
  }
}

function place2number (place) {
  let f = {
    "邯郸": 0,
    "江湾": 1,
    "枫林": 2,
    "张江": 3
  };

  return f[place];
}

function setDepart(multiIndex, multiArray, destination) {
  switch (multiIndex[1]) {
    case 0:
      multiArray[2] = ['江湾', '枫林', '张江'];
      if (destination == '江湾') { multiIndex[2] = 0; }
      else if (destination == '枫林') { multiIndex[2] = 1; }
      else { multiIndex[2] = 2; }
      break;
    case 1:
      multiArray[2] = ['邯郸', '张江'];
      if (destination == '邯郸') { multiIndex[2] = 0; }
      else { multiIndex[2] = 1; }
      break;
    case 2:
      multiArray[2] = ['邯郸', '张江'];
      if (destination == '邯郸') { multiIndex[2] = 0; }
      else { multiIndex[2] = 1; }
      break;
    case 3:
      multiArray[2] = ['邯郸', '江湾', '枫林'];
      if (destination == '邯郸') { multiIndex[2] = 0; }
      else if (destination == '江湾') { multiIndex[2] = 1; }
      else { multiIndex[2] = 2; }
      break;
  }
  
  return {
    multiIndex: multiIndex,
    multiArray: multiArray
  }
}

module.exports = {
  formatTime: formatTime,
  // formatDate: formatDate,
  getDayofweek: getDayofweek,
  // compare: compare,
  update_next: update_next,
  place2number: place2number,
  setDepart: setDepart
}
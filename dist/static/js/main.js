function getNewData (num, state) {
  var form = new FormData();
  form.append("fid", "557");
  form.append("state", state);
  form.append("lastItem", "0");
  $('.tab-box .tab-bar-item').removeClass('active')
  setTimeout(function () {
    $('.tab-box .tab-bar-item')[num].classList.add('active')
  }, 0);
  var settings = {
    // "url": "http://liuyan.people.com.cn/threads/queryThreadsList",
    // "method": "POST",
    "url": "http://cunchu.site/mock/queryThreadsList",
    "method": "GET",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    // "data": form
  };

  $.ajax(settings).done(function (response) {
    response = JSON.parse(response)
    if (response.result && response.result == 'success') {
      var dataList = response.responseData
      var newHtml = ''
      for (let index = 0; index < dataList.length; index++) {
        const element = dataList[index];
        if (element.traceInfo == '已办理') {
          newHtml += '<li><a target="_blank" href="http://liuyan.people.com.cn/threads/content?tid=' + element.tid + '">[' + element.traceInfo + ']' + element.subject + '</a><div class="time">' + timestampToTime(element.threadsCheckTime) + '</li>'
        } else {
          newHtml += '<li><a target="_blank" href="http://liuyan.people.com.cn/threads/content?tid=' + element.tid + '">' + element.subject + '</a><div class="time">' + timestampToTime(element.threadsCheckTime) + '</li>'
        }
        
        console.log(element)
      }
      
      $('.tab-box .tab-conn')[0].innerHTML = newHtml
    }
  });
}

function timestampToTime(timestamp) {
  var  date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
}


$(function() {
  getNewData(0, 2)
})
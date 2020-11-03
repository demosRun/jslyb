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


// $(function() {
//   getNewData(0, 2)
// })


function tabIt(tabBox, connBox) {
  this.tabBox = tabBox.children
  this.connBox = connBox.children
  // 默认选中第一项
  this.showIndex(0)
  for (var index = 0; index < this.tabBox.length; index++) {
    var element = this.tabBox[index];
    var _this = this
    element.setAttribute('tabind', index)
    element.addEventListener('click', function () {
      var activeIndex = parseInt(this.getAttribute('tabind'))
      // console.log(this, _this)
      _this.showIndex(activeIndex)
    })
  }
}

tabIt.prototype.showIndex = function (activeIndex) {
  console.log(activeIndex)
  for (var index = 0; index < this.connBox.length; index++) {
    var element = this.connBox[index];
    if (activeIndex == index) {
      element.style.display = 'block'
    } else {
      element.style.display = 'none'
    }
  }
  for (var index = 0; index < this.tabBox.length; index++) {
    var element = this.tabBox[index];
    if (activeIndex == index) {
      element.classList.add('active')
    } else {
      element.classList.remove('active')
    }
  }
}

// 第二页
new tabIt(document.querySelector('.paihang .tab-box'), document.querySelector('.paihang .conn-box'))

// function fanKui(currentNum) {
// 	var currentNum = (currentNum-1)*10;
// 	var beginNum = currentNum;
// 	var endNum = currentNum+9;
// 	//console.log(currentNum,beginNum,endNum);
// 	$.ajax({
// 		type: "get",
// 		//url: "http://leaders.people.com.cn/liuyan_data/threads/feedback.jsonp",
// 		url: "http://messageboard.peopletech.cn/feedback.jsonp",
// 		cache: false,
// 		dataType: "jsonp",
// 		jsonp: "callback",
// 		jsonpCallback: "IndexFeedback",
// 		success: function(data) {
// 			//console.log(data);
// 			var html='';
// 			$.each(data,function(i,n){
// 				if(i>=beginNum && i<=endNum){
// 				html += '<li><h3><span><em class="blue">'+ data[i].nickName +'</em>对&nbsp;&nbsp;&nbsp;&nbsp;<em class="red"><a href="http://liuyan.people.com.cn/list.php?fid='+ data[i].fid +'" target="_blank">'+ data[i].forumName +'</a></em>&nbsp;&nbsp;&nbsp;&nbsp;有话说</span><i class="grey1">'+ data[i].datelineShow +'</i></h3><p class="grey1">'+ data[i].summary +'<span><a href="http://liuyan.people.com.cn/thread.php?tid='+ data[i].tid +'" target="_blank">［查看全文］</a></span></p></li>'
// 				}
// 			});
// 			$("#fankui").html(html);
// 		},
// 		error: function(XMLHttpRequest, textStatus, errorThrown) {
// 			console.log(XMLHttpRequest.status);
// 			console.log(XMLHttpRequest.readyState);
// 			console.log(textStatus);
// 		}
// 	});
// }
// fanKui(1);
// $('.page_n2').pagination({
// 	coping:true,
// 	jump:true,
// 	pageCount:10,
// 	homePage:'首页',
// 	endPage:'末页',
// 	prevContent:'上页',
// 	nextContent:'下页',
// 	callback:function(api){
// 		//$('#logBox').append('<p>*当前页码为：'+api.getCurrent()+'</p>');
// 		//$('#logBox').append('<p>*当前总页数：'+api.getTotalPage()+'</p>');
// 		fanKui(api.getCurrent());
// 		//console.log(api.getCurrent())
// 	}
// });
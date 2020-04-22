
(function() {
    function deleteElement(index) {
      $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/api/delete",
        async: false,  
        data: {index: index}, 
        dataType: "json",
        success: function(res){
        },
        error: function (res) {
        }
      });
    }
	function closeBtn(element) {
		  var span = document.createElement("span");
		  var txt = document.createTextNode("\u00D7"); 
		  span.className = "close";
		  span.appendChild(txt);
		  span.onclick = function(){
			var div = this.parentElement;
			deleteElement(div.getAttribute("index"));
			div.style.display = "none";
		  }
		  element.appendChild(span);
	}	
    function updateElement(index, new_name){
      $.ajax({
        type:"POST",
        url:"http://localhost:3000/api/update",
        async:false,
        data:{id:index, task:new_name},
        dataType:"json",
        success:function(res){

        },
        error:function(res){
          alert('已存在相同任务名');
        }
      });
    }
    function newElement() {
      var inputValue = document.getElementById("myInput").value;
      if (inputValue == '') {
        alert("请先输入一个具体任务。");
      }
      else {
        var flag;
        var li = document.createElement("li");
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/add",
            async: false,  
            data: {task: inputValue}, 
            dataType: "json",	
            success: function(res){
              flag = true;
              document.getElementById("myInput").value = "";
            },
            error: function (res) {
              alert("请输入不同的任务名");
              flag = false;
            }
        });
        if (flag ===true){
          $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/getAll",
            async: false,  
            dataType: "json",	
            success: function(res){
              todoList = res;
            },
            error: function (res) {
            }
          });
          for (var i=0;i<todoList.length;++i){
            if (todoList[i].task === inputValue){
              new_id = todoList[i].id;
            }
          }
          li.setAttribute("index", new_id);
          closeBtn(li);
          document.getElementById("myUL").appendChild(li);
        }
      }
    }
	 function ifModify() {
      var list = document.querySelector('ul');
      list.onclick = function(ev) {
        if (ev.target.tagName === 'LI') {
          var txt = prompt("请输入修改内容");
          while (txt===""){
            txt = prompt("请重新输入");
          }
          ev.target.innerHTML = txt;
          updateElement(ev.target.getAttribute("index"), txt);
          closeBtn(ev.target);
        }
      }
    }
    function getAllTask() {
      var todoList = [];
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/getAll",
        async: false, 
        dataType: "json",	
        success: function(res){
          todoList = res;
        },
        error: function (res) {
        }
      });
      for(var i=0; i<todoList.length; i++){
        var li = document.createElement("li");
        var t = document.createTextNode(todoList[i].task);
        li.appendChild(t);
        li.setAttribute('index',todoList[i].id);
        closeBtn(li);
        document.getElementById("myUL").appendChild(li);
      }
      document.getElementById("myInput").value = ""; 
    }
    function init() {
      var inp = document.getElementsByTagName("input")[0];
      inp.onblur = function(){
        this.placeholder = "input here";
        this.style.backgroundColor = "";
      }
      var addButton = document.getElementById("addButton");
      getAllTask();
      ifModify();

      addButton.onclick = function() {
        newElement();
      }

      document.onkeydown = function(event) {
        if(event.keyCode == 13) {
          newElement();
        }
      }
    }
    init();
  })();
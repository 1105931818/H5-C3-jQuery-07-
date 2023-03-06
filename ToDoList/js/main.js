$(function(){
    load();
    const data = getData();
    $("#title_input").on("keydown",function(event){
        if(event.keyCode === 13){
            if($(this).val() == ""){
                return false;
            }else{
                data.push({title:$(this).val() ,done:false});
                saveDate(data);
                load();
                /* const newli = $("<li class='doing_item'></li>");
                newli.html("<input type='checkbox'>" + $(this).val() + "<a href='javascript:void(0)'>X</a>");
                $(".doing_link").prepend(newli); */
                $(this).val("");
            }
        }
    });
  



/* ==========================删除本地数据========================================================================================================================================= */
    $(".doing_link,.over_link").on("click","a",function(){
        const index = $(this).attr("index");
        data.splice(index,1);
        saveDate(data);
        load();
    });




/* ==========================完成事件切换========================================================================================================================================= */
    $(".doing_link,.over_link").on("click","input",function(){
        const index = $(this).siblings("a").attr("index");
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();
    });




/* ==========================读取本地数据========================================================================================================================================= */
    function getData(){
        const data = localStorage.getItem("todolist");
        if(data !== null){
            return JSON.parse(data);    //字符串数据格式转换为数组对象格式
        }else{
            return [];
        }
    }




/* ==========================保存本地数据========================================================================================================================================= */
    function saveDate(data){
        data = JSON.stringify(data);    //数组对象格式转换为字符串数据格式
        localStorage.setItem("todolist",data);
    }




/* ==========================数据加载页面========================================================================================================================================= */
    function load(){
        const data = getData();
        $(".doing_link,.over_link").empty();       //有重复显示，清空列表再显示
        var doingcont = 0;
        var overcont = 0;
        $.each(data,function(i,n){
            if(n.done){
                const newli = $("<li class='over_item'></li>");
                newli.html("<input type='checkbox' checked='checked'>" + n.title + "<a href='javascript:void(0)'  index='"+ i +"'>X</a>");
                $(".over_link").prepend(newli);
                overcont++;
            }else{
                const newli = $("<li class='doing_item'></li>");
                newli.html("<input type='checkbox'>" + n.title + "<a href='javascript:void(0)'  index='"+ i +"'>X</a>");
                $(".doing_link").prepend(newli);
                doingcont++;
            }
            
        });
        $("#doingcont").text(doingcont);
        $("#overcont").text(overcont);
    
    }




})
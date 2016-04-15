var deleteLog = false;

$(document).ready(function () {
    $('#pagepiling').pagepiling({
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        sectionsColor: ['#0a7fe9', '#4b5d78', '#28c18d', '#4b5d78', '#28c18d'],
        scrollingSpeed: 500,
        navigation: {
            'textColor': '#fff',
            'bulletsColor': '#fff',
            'position': 'right',
            'tooltips': ['1', '2', '3', '4', '5']
        },
        onLeave: function (index, nextIndex, direction) {
            if (deleteLog) {
                $('#callbacksDiv').html('111111111111111');
            }
            $('#callbacksDiv').append('<p>onLeave - index:' + index + ' nextIndex:' + nextIndex + ' direction:' + direction + '</p>')
        },

        //页面读取后执行
        afterRender: function () {
            $(".active").addClass("currentpage");
        },
        afterLoad: function (anchorLink, index) {

            //$('#callbacksDiv').append('<p>afterLoad - anchorLink:' + anchorLink + " index:" + index + '</p>');
            $(".active").siblings().removeClass("currentpage");
            $(".active").addClass("currentpage");

            var page_number = $(".pp-section").length;

            //判断最后一个向下滚动才显示footer

            //ie chrome
            document.onmousewheel=mousewheel;
            if(document.addEventListener){
                //火狐
                document.addEventListener('DOMMouseScroll',mousewheel,false);
            }

            function mousewheel(ev){
                var oEvent=ev||event;
                //alert(oEvent.detail)
                //处理上下的兼容性问题
                var dir=true;
                if(oEvent.wheelDelta){
                    dir=oEvent.wheelDelta>0?false:true;
                }else{
                    dir=oEvent.detail<0?false:true;
                }

                var foot_show= $("#section5").hasClass("footshow"),
                    foot_hide= $("#section5").hasClass("foothide");



                if(dir && index == page_number){ //最后一个下滚动
                    $("#section5").addClass("footshow").removeClass("foothide");

                }else if(!dir && index == page_number && foot_show){ //最后一个上滚动
                    $("#section5").removeClass("footshow").addClass("foothide");
                    $.fn.pagepiling.moveTo(page_number);
                }


                // addEventLisrener 绑定的时间需要通过event对象下面的的 preventDefaul
                if(oEvent.preventDefault){
                    oEvent.preventDefault();
                }
                return false;//阻止默认行为(阻止的是 obj.on时间名称=fn 所触发的默认行为)

            }

            //点击其他footer隐藏
            $("#pp-nav li a").click(function(){
                 if(index != page_number){
                     $("#section5").removeClass("footshow").addClass("foothide");
                 }
            })


            deleteLog = true;
        }
    });

});




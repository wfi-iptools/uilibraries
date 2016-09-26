/**
 * Created by ic019263 on 4/15/2015.
 */
(function () {
    var subMenuSelectorNav = "#subNav";
    var subMenuSelectorChild = "#mainNav li";
    var selectView = "#view";
    $("#admin").on('click', function () {
        $("#navContainer").css('display', 'block');
        //$(subMenuSelectorNav).load("application/views/app/templates/adminTemplate.html");
        $(subMenuSelectorChild).addClass('subMenuClass');
        $(subMenuSelectorChild).not(this).removeClass('subMenuClass');
        //window.localStorage.setItem('curMenu', 'globalGrants');
    });
    $("#modify").on('click', function () {
        $("#navContainer").css('display', 'block');
        //$(subMenuSelectorNav).load("application/views/app/templates/modifyTemplate.html");
        $(subMenuSelectorChild).addClass('subMenuClass');
        $(subMenuSelectorChild).not(this).removeClass('subMenuClass');
        //$("#navContainer").toggleClass('hide');
        //window.localStorage.setItem('curMenu', 'modifyPark');
    });

    $(selectView).on('click', function () {
        $("#navContainer").css('display', 'block');
        //$(subMenuSelectorNav).load("application/views/app/templates/viewTemplate.html");
        $(subMenuSelectorChild).addClass('subMenuClass');
        $(subMenuSelectorChild).not(this).removeClass('subMenuClass');
        //$("#navContainer").toggleClass('hide');
        //window.localStorage.setItem('curMenu', 'viewFilter');
    });

    //$('button').on('click',function() {
    //    console.log("button cliked");
    //    //$(this).addClass('active').siblings().removeClass('active');
    //});

    $(document).delegate(".btn", "click", function (e) {
        $(this).addClass('active');
        $(".btn").not(this).removeClass('active');
    });

    $(selectView).trigger("click");
    //selector for sub menu
    //var subMenuSelector="#mainNav li";
    //$(subMenuSelector).on("click",function(e){
    //    $(this).addClass('subMenuClass');
    //    $(subMenuSelector).not(this).removeClass('subMenuClass');
    //});


})();
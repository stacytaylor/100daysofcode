$(document).on("scroll", function () {


    var pixels = $document.scrollTop()

    $("div.box-1").css("top", pixels)

})
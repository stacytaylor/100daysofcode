$(document).on("scroll", function () {

    let scrollTop = $(document).scrollTop()
    let scrollBottom = scrollTop + $(window).height()

    let pageBottom = $(document).height()

    let diff = pageBottom - scrollBottom

    let opacity = 1 - diff / 300

    $("div.fade-bg").css("opacity", opacity)
})  
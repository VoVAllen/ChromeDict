/**
 * Created by Zeng on 2015/11/8.
 */
document.addEventListener('DOMContentLoaded', function () {
    $("#switcher").addClass('active');
    $("#switcher").text('ON');
    var page
    if ($('.word.easy') !== null) {
        $("#status").text("Easy");
        $("#switcher").removeClass('active');
        $("#switcher").text('OFF');
    }
    if ($('.word.hard') !== null) {
        $("#status").text("Hard");
        $("#switcher").removeClass('active');
        $("#switcher").text('OFF');
    }
});
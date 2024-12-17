// var navbar_nav = document.querySelector(".navbar-nav");
// navbar_nav.addEventListener('click',function (e) {
//   if(e.target.tagName=='A'){
//    let element= e.target;
//    element.classList.add('active')
//   }
// });
// $('body').scrollspy({ target: '#navbar-example', offset: 50 });
$("#scroll-spy-target a").click(function(e) {
    e.preventDefault();

    var pageRef = $(this).attr("href");

    if(pageRef[0] != '#') {
        window.location.href = pageRef;
    } else {
        var pageRefPosition = $(pageRef).offset().top ;

        $("html,body").animate({
            scrollTop:pageRefPosition
        },400);
    }
}); 

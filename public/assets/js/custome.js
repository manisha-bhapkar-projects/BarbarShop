$(window).ready(function () {
  var toggle = $(".button-menu-mobile");

  var wrapper = $("#wrapper");
  // document
  //   .getElementsByClassName("button-menu-mobile")
  //   .addEventListener("click", function () {
  
  //     document.getElementById("wrapper").removeClass("enlarged");
  //   });

  toggle.click(function (event) {
    if(wrapper.hasClass("enlarged")){
        wrapper.removeClass("enlarged");
    }else{
        wrapper.addClass("enlarged");
    }
  
    // $(".navbarfixed li a").removeClass("active"); //Remove any "active" class
    // $("a", this).addClass("active"); //Add "active" class to selected tab //
  });
});

$(document).ready(function() {
  setTimeout(function() {
    $(".info-holder").addClass("active");
  }, 100);

  $(".dropdown.dropdown-click").click(function(e) {
    $(this)
      .find(".dropdown-list")
      .fadeToggle(200);
  });

  $(document).click("body", function(e) {
    if (
      $(e.target).closest(".dropdown-list").length === 0 &&
      $(e.target).closest(".dropdown").length === 0
    ) {
      $(".dropdown-list").fadeOut(300);
    }
  });
  $(".dropdown-list a").click(function(e) {
    e.preventDefault();
    $(this)
      .closest(".dropdown")
      .find(".dropdown-append-value")
      .val($(this).text())
      .addClass("has-value");
  });

  //change background of header on scroll
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > 50) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  });

  //material style input
  $(".material-style input").focusout(function(e) {
    if (e.target.value.length > 0) {
      $(this).addClass("has-value");
    } else {
      $(this).removeClass("has-value");
    }
  });

  //expanding login side on click
  if ($(window).innerWidth() > 1024) {
    $("#signin .side").click(function(params) {
      $(this).attr("data-active", "true");
      $(this)
        .siblings()
        .attr("data-active", "false");
    });
    $(document).on(
      "click",
      "#signin .page-holder.signin-active .signup",
      function(params) {
        $(".page-holder").removeClass("signin-active");
      }
    );
  }

  //toggle menu responsive mode
  $(".menu-toggle").click(function() {
    $(this).toggleClass("is-active");
    $(".menu").fadeToggle(300);
  });
});

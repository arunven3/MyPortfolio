(function($) {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const close = document.getElementById("menu-close");


  toggle.addEventListener("click", function(e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  });

  close.addEventListener("click", function(e) {
    menu.classList.remove("open");
  });

  // Close menu after click on smaller screens
  $(window).on("resize", function() {
    if ($(window).width() < 846) {
      $(".main-menu a").on("click", function() {
        menu.classList.remove("open");
      });
    }
  });

  $(".main-menu li:first").addClass("active");

  var showSection = function showSection(section, isAnimate) {
    var direction = section.replace(/#/, ""),
      reqSection = $(".section").filter(
        '[data-section="' + direction + '"]'
      ),
      reqSectionPos = reqSection.offset().top - 0;

    if (isAnimate) {
      $("body, html").animate(
        {
          scrollTop: reqSectionPos
        },
        800
      );
    } else {
      $("body, html").scrollTop(reqSectionPos);
    }
  };

  var checkSection = function checkSection() {
    $(".section").each(function () {
      var $this = $(this),
        topEdge = $this.offset().top - 80,
        bottomEdge = topEdge + $this.height(),
        wScroll = $(window).scrollTop();
      if (topEdge < wScroll && bottomEdge > wScroll) {
        var currentId = $this.data("section"),
          reqLink = $("a").filter("[href*=\\#" + currentId + "]");
        reqLink
          .closest("li")
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
    });
  };

  $(".main-nav").on("click", "a", function (e) {
    e.preventDefault();
    showSection($(this).attr("href"), true);
  });

  $(window).scroll(function () {
    checkSection();
  });
})(jQuery);

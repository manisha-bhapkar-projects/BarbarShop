!(function (o) {
  "use strict";
  var t = function () {
    (this.$body = o("body")),
      (this.$wrapper = o("#wrapper")),
      (this.$leftMenuButton = o(".button-menu-mobile")),
      (this.$menuItem = o(".has_sub > a"));
  };
  (t.prototype.intSlimscrollmenu = function () {
    o(".slimscrollleft").slimscroll({
      height: "auto",
      position: "right",
      size: "7px",
      color: "#9ea5ab",
    });
  }),
    (t.prototype.initSlimscroll = function () {
      o(".slimscroll").slimscroll({
        height: "auto",
        position: "right",
        size: "5px",
        color: "#9ea5ab",
        touchScrollStep: 50,
      });
    }),
    (t.prototype.initLeftMenuCollapse = function () {
      var i = this;
      this.$leftMenuButton.on("click", function (t) {
        t.preventDefault(),
          i.$body.toggleClass("fixed-left-void"),
          i.$wrapper.toggleClass("enlarged");
      });
    }),
    (t.prototype.initComponents = function () {
      o('[data-toggle="tooltip"]').tooltip(),
        o('[data-toggle="popover"]').popover();
    }),
    (t.prototype.initMenu = function () {
      var e = this;
      function n() {
        var t = o(document).height();
        t > o(".body-content").height() && o(".body-content").height(t);
      }
      e.$menuItem.on("click", function () {
        var t = o(this).parent(),
          i = t.find("> ul");
        return (
          e.$body.hasClass("sidebar-collapsed") ||
            (i.is(":visible")
              ? i.slideUp(300, function () {
                  t.removeClass("nav-active"),
                    o(".body-content").css({ height: "" }),
                    n();
                })
              : (o(".has_sub").each(function () {
                  var t = o(this);
                  t.hasClass("nav-active") &&
                    t.find("> ul").slideUp(300, function () {
                      t.removeClass("nav-active");
                    });
                }),
                t.addClass("nav-active"),
                i.slideDown(300, function () {
                  n();
                }))),
          !1
        );
      });
    }),
    (t.prototype.activateMenuItem = function () {
      o("#sidebar-menu a").each(function () {
        this.href == window.location.href &&
          (o(this).addClass("active"),
          o(this).parent().addClass("active"),
          o(this).parent().parent().prev().addClass("active"),
          o(this).parent().parent().parent().addClass("active"),
          o(this).parent().parent().prev().click());
      });
    }),
    (t.prototype.Preloader = function () {
      o(window).on("load", function () {
        o("#status").fadeOut(),
          o("#preloader").delay(350).fadeOut("slow"),
          o("body").delay(350).css({ overflow: "visible" });
      });
    }),
    (t.prototype.init = function () {
      this.intSlimscrollmenu(),
        this.initSlimscroll(),
        this.initLeftMenuCollapse(),
        this.initComponents(),
        this.initMenu(),
        this.activateMenuItem(),
        this.Preloader();
    }),
    (o.MainApp = new t()),
    (o.MainApp.Constructor = t);
})(window.jQuery),
  (function (t) {
    "use strict";
    window.jQuery.MainApp.init();
  })();
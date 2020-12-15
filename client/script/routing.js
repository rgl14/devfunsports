(function (window) {
  {
    var unknown = "-";
    // screen
    var screenSize = "";
    if (screen.width) {
      width = screen.width ? screen.width : "";
      height = screen.height ? screen.height : "";
      screenSize += "" + width + " x " + height;
    }
    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = "" + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    // Opera
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf("OPR")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 4);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
      browser = "Microsoft Edge";
      version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browser = "Safari";
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf("Trident/") != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(nAgt.indexOf("rv:") + 3);
    }
    // Other browsers
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);
    majorVersion = parseInt("" + version, 10);
    if (isNaN(majorVersion)) {
      version = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
    // cookie
    var cookieEnabled = navigator.cookieEnabled ? true : false;
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled =
        document.cookie.indexOf("testcookie") != -1 ? true : false;
    }
    // system
    var os = unknown;
    var clientStrings = [
      {
        s: "Windows 10",
        r: /(Windows 10.0|Windows NT 10.0)/,
      },
      {
        s: "Windows 8.1",
        r: /(Windows 8.1|Windows NT 6.3)/,
      },
      {
        s: "Windows 8",
        r: /(Windows 8|Windows NT 6.2)/,
      },
      {
        s: "Windows 7",
        r: /(Windows 7|Windows NT 6.1)/,
      },
      {
        s: "Windows Vista",
        r: /Windows NT 6.0/,
      },
      {
        s: "Windows Server 2003",
        r: /Windows NT 5.2/,
      },
      {
        s: "Windows XP",
        r: /(Windows NT 5.1|Windows XP)/,
      },
      {
        s: "Windows 2000",
        r: /(Windows NT 5.0|Windows 2000)/,
      },
      {
        s: "Windows ME",
        r: /(Win 9x 4.90|Windows ME)/,
      },
      {
        s: "Windows 98",
        r: /(Windows 98|Win98)/,
      },
      {
        s: "Windows 95",
        r: /(Windows 95|Win95|Windows_95)/,
      },
      {
        s: "Windows NT 4.0",
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
      },
      {
        s: "Windows CE",
        r: /Windows CE/,
      },
      {
        s: "Windows 3.11",
        r: /Win16/,
      },
      {
        s: "Android",
        r: /Android/,
      },
      {
        s: "Open BSD",
        r: /OpenBSD/,
      },
      {
        s: "Sun OS",
        r: /SunOS/,
      },
      {
        s: "Linux",
        r: /(Linux|X11)/,
      },
      {
        s: "iOS",
        r: /(iPhone|iPad|iPod)/,
      },
      {
        s: "Mac OS X",
        r: /Mac OS X/,
      },
      {
        s: "Mac OS",
        r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
      },
      {
        s: "QNX",
        r: /QNX/,
      },
      {
        s: "UNIX",
        r: /UNIX/,
      },
      {
        s: "BeOS",
        r: /BeOS/,
      },
      {
        s: "OS/2",
        r: /OS\/2/,
      },
      {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }
    var osVersion = unknown;
    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = "Windows";
    }
    switch (os) {
      case "Mac OS X":
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;
      case "Android":
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;
      case "iOS":
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion =
          osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
        break;
    }
    // flash (you'll need to include swfobject)
    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
    var flashVersion = "no check";
    if (typeof swfobject != "undefined") {
      var fv = swfobject.getFlashPlayerVersion();
      if (fv.major > 0) {
        flashVersion = fv.major + "." + fv.minor + " r" + fv.release;
      } else {
        flashVersion = unknown;
      }
    }
  }
  window.jscd = {
    screen: screenSize,
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    mobile: mobile,
    os: os,
    osVersion: osVersion,
    cookies: cookieEnabled,
    flashVersion: flashVersion,
  };
})(this);
$(document).ready(function () {
  // Preventing Right Click On Browser Or Inpect Element
  $(this).bind("contextmenu", function (e) {
    e.preventDefault();
  });
  $(document).keydown(function (event) {
    if (event.keyCode == 123) {
      // Prevent F12
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      // Prevent Ctrl+Shift+I
      return false;
    }
  });
});
function preventBack() { window.history.forward(); }  
function checktoken() {
  return $.cookie("authtoken");
}
  setTimeout("preventBack()", 0);  
  window.onunload = function () { null }; 
var authtoken = $.cookie("authtoken");
if (!authtoken) {
  window.location.href = "login.html";
}
var appType = $.cookie("appType");
if (!appType) {
  window.location.href = "login.html";
}
var ApiUrl = "http://www.funsports.win/Client/Client.svc";
// var ApiUrl = "http://159.8.246.2/Client/Client.svc";
var fancyHubAddress = "http://159.8.244.61:21111";
var currency = "INR";
if (appType == 2) {
  ApiUrl = "http://www.funsports.win/ClientU/Client.svc";
  fancyHubAddress = "http://159.8.244.61:22111";
  currency = "USD";
} else if (appType == 3) {
  ApiUrl = "http://www.funsports.win/ClientH/Client.svc";
  fancyHubAddress = "http://159.8.244.61:23111";
  currency = "HKD";
}
// let Hostname = window.location.hostname;
// if (Hostname.indexOf('usd') > -1) {
//     ApiUrl = "http://" +Hostname + "/Client/Client.svc";
// } else if (Hostname.indexOf('hkd') > -1) {
//     ApiUrl = "http://" + Hostname + "/Client/Client.svc";
// }

console.log(authtoken);
var app = angular.module("myApp", ["ngRoute", "ngCookies"]);
app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        // controller: 'homeController',
        templateUrl: "home.html",
        data: {
          title: "Home",
        },
      })
      .when("/termsconditions", {
        controller: "terms_condition_Controller",
        templateUrl: "termsconditions.html",
        data: {
          title: "Termsconditions",
        },
      })
      .when("/inplay", {
        controller: "inplayController",
        templateUrl: "inplay.html",
        data: {
          title: "Inplay",
        },
      })
      .when("/today", {
        controller: "todayController",
        templateUrl: "today.html",
        data: {
          title: "Today",
        },
      })
      .when("/tomorrow", {
        controller: "tomorrowController",
        templateUrl: "tomorrow.html",
        data: {
          title: "Tomorrow",
        },
      })
      .when("/multiMarkets", {
        controller: "multiMarketController",
        templateUrl: "multiMarkets.html",
        data: {
          title: "MultiMarkets",
        },
      })
      .when("/Cricket", {
        controller: "cricketController",
        templateUrl: "cricket.html",
        data: {
          title: "Cricket",
        },
      })
      .when("/Soccer", {
        controller: "soccerController",
        templateUrl: "soccer.html",
        data: {
          title: "Soccer",
        },
      })
      .when("/Tennis", {
        controller: "tennisController",
        templateUrl: "tennis.html",
        data: {
          title: "Tennis",
        },
      })
      .when("/Live TeenPatti", {
        controller: "teenpattiController",
        templateUrl: "teenpatti.html",
        data: {
          title: "teenpatti",
        },
      })
      .when("/full-market", {
        controller: "fullmarketController",
        templateUrl: "full-market.html",
        data: {
          title: "Fullmarket",
        },
      })
      .when("/full-market/:marketId/:matchId/:bfId", {
        controller: "fullmarketController",
        templateUrl: "full-market.html",
        data: {
          title: "Fullmarket",
        },
      })
      .when("/full-market/:sportid/:tourid/:matchId/:marketId/:bfId", {
        controller: "fullmarketController",
        templateUrl: "full-market.html",
        data: {
          title: "Fullmarket",
        },
      })
      .when("/full-market/:marketId/:matchId/:bfId/:dataMode", {
        controller: "fullmarketController",
        templateUrl: "full-market.html",
        data: {
          title: "Fullmarket",
        },
      })
      .when("/full-market/:marketId/:matchId/:bfId/:sportName/:dataMode", {
        controller: "fullmarketController",
        templateUrl: "full-market.html",
        data: {
          title: "Fullmarket",
        },
      })
      .when(
        "/full-market/:marketId/:matchId/:bfId/:sportName/:mbfId/:dataMode",
        {
          controller: "fullmarketController",
          templateUrl: "full-market.html",
          data: {
            title: "Fullmarket",
          },
        }
      )
      .when("/horseracing", {
        controller: "comingsoon",
        templateUrl: "comingsoon.html",
        data: {
          title: "ComingSoon",
        },
      })
      .when("/fixedodds", {
        controller: "comingsoon",
        templateUrl: "comingsoon.html",
        data: {
          title: "ComingSoon",
        },
      })
      .when("/livecasino", {
        controller: "comingsoon",
        templateUrl: "comingsoon.html",
        data: {
          title: "ComingSoon",
        },
      })
      .when("/virtualracing", {
        controller: "comingsoon",
        templateUrl: "comingsoon.html",
        data: {
          title: "ComingSoon",
        },
      })
      .when("/esport", {
        controller: "comingsoon",
        templateUrl: "comingsoon.html",

        data: {
          title: "ComingSoon",
        },
      });
    // .otherwise({
    //  redirectTo: '/'
    // });
  },
]);
app.run(function ($rootScope, $location, $interval) {
  $rootScope.$on("$locationChangeStart", function () {
    if ($location.path().split("/").indexOf("full-market") > -1) {
      $(".matched-wrap").css("height", "calc(100% - 30px)");
      $rootScope.showLiveTv = true;
      $rootScope.liveTvContent = true;
    } else {
      // $('.slip-wrap.live_tv').addClass("close")
      $(".matched-wrap").css("height", "calc(100% - 30px)");
      $("#showLiveTvPro").empty();
      $rootScope.showLiveTv = false;
      $rootScope.liveTvContent = false;
    }
  });

  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if (authtoken != undefined || authtoken != null) {
      history.pushState(null, null, location.href);
      window.addEventListener("popstate", function (event) {
        history.pushState(null, null, location.href);
      });
    }
  });
});
app.filter("removeSpace", function () {
  return function (str) {
    var txt = "";
    txt = str.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
    return txt;
  };
});
app.filter("decimalNumber", function () {
  return function (value) {
    // if (value==null) {
    //     return
    // }
    return value == null || value == "" || parseFloat(value) > 19.5
      ? value
      : parseFloat(value) > 9.5
      ? parseFloat(value).toFixed(1)
      : parseFloat(value).toFixed(2);
  };
});
app.directive("numbersOnly", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9]/g, "");
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      }
      ngModelCtrl.$parsers.push(fromUser);
    },
  };
});
app.directive("toggleClass", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      element.bind("click", function (e) {
        // e.stopPropagation();
        // console.log(element)
        if (element.parents(".game-wrap,.slip-wrap").hasClass("close")) {
          element.parents(".game-wrap,.slip-wrap").removeClass("close");
          // element.addClass(attrs.toggleClass);
        } else {
          // element.removeClass("glyphicon glyphicon-ok");
          element.parents(".game-wrap,.slip-wrap").addClass("close");
        }
        if (element.id == "livetv") {
          if (element.parents(".slip-wrap.live_tv").hasClass("close")) {
            $(".matched-wrap").css("height", "calc(100% - 30px)");
          } else {
            $(".matched-wrap").css("height", "calc(100% - 285px)");
          }
        }
      });
    },
  };
});
app.directive("accordionToggle", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      element.bind("click", function (e) {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    },
  };
});
var currTime;
app.controller("homeController", function (
  $location,
  $scope,
  $http,
  $timeout,
  $routeParams,
  $interval,
  $cookieStore,
  $rootScope
) {
  $rootScope.authcookie = authtoken;
  $rootScope.currency = currency;

  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!"]').hasClass("select")) {
    $('a[href="#!"]').addClass("select");
    $rootScope.inplaydiv = false;
    $rootScope.mainfooter = false;
  }

  // authtoken = $.cookie('authtoken');
  $scope.pathList = [];
  $scope.Inplaymenu = function () {
    $rootScope.inplaydiv = true;
    $rootScope.mainfooter = true;
  };
  $(document).keydown(function (event) {
    if (event.keyCode == 123) {
      // Prevent F12
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      // Prevent Ctrl+Shift+I
      return false;
    }
  });
  $("#loading_page").css("display", "grid");
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
    $rootScope.title = current.$$route.data.title;
  });
  // document.onkeydown = function(e) {
  //     e = e || window.event;
  //     var key = e.which || e.keyCode;
  //     if (key === 13) {
  //         $scope.login();
  //     }
  // }
  $scope.CloseLoginPopUp = function () {
    $("#loginBox").css("display", "none");
  };
  $("#authenticateImage").on("click", function () {
    $("#authenticateImage").attr("src", "captcha.php");
  });
  $("#loginBoxAuthenticateImage").on("click", function () {
    $("#loginBoxAuthenticateImage").attr("src", "captcha.php");
  });
  // $scope.loginCalls = true;
  // $scope.showLoginDetails = true;
  // $scope.login = function() {
  //     if ($scope.username == undefined || $scope.username == "") {
  //         toastr.error('Username can not be blank!')
  //         return false
  //     }
  //     if ($scope.password == undefined || $scope.password == "") {
  //         toastr.error('Password can not be blank!')
  //         return false
  //     }
  //     if ($scope.captcha == "" || $scope.captcha == undefined) {
  //         toastr.error('Captcha is mandatory');
  //         return false
  //     }
  //     $scope.result = '';
  //     $scope.loginData = {
  //         "context": context,
  //         "username": $scope.username,
  //         "pwd": $scope.password
  //     }
  //     console.log(JSON.stringify($scope.loginData))
  //     if ($scope.captcha != null && $scope.captcha != "") {
  //         $.ajax({
  //             url: 'captchaValidate.php',
  //             method: 'POST',
  //             data: {
  //                 vercode: $scope.captcha
  //             },
  //             success: function(response) {
  //                 if (response != "Successful") {
  //                     $scope.$apply(function() {
  //                         toastr.error("Invalid validation code !")
  //                     })
  //                     $('#authenticateImage').attr('src', 'captcha.php');
  //                     return false;
  //                 } else {
  //                     if ($scope.loginCalls == false) {
  //                         return false
  //                     }
  //                     $scope.loginCalls = false;
  //                     $http({
  //                         url: ApiUrl + '/Login',
  //                         method: 'POST',
  //                         data: JSON.stringify($scope.loginData),
  //                     }).then(function success(response) {
  //                         if (response.data.description.status == "Success") {
  //                             toastr.success(response.data.description.result);
  //                             $.cookie('authtoken', response.data.response.AuthToken);
  //                             window.location.href = "login.html";
  //                             localStorage.clear();
  //                             $scope.showLoginDetails = false;
  //                         } else {
  //                             toastr.error(response.data.description.result)
  //                             $('#authenticateImage').attr('src', 'captcha.php');
  //                             $scope.showLoginDetails = false;
  //                         }
  //                         $scope.loginCalls = true;
  //                     }, function error(error) {
  //                         $scope.loginCalls = true;
  //                         $scope.showLoginDetails = true;
  //                     })
  //                 }
  //             }
  //         });
  //     }
  // }

  // $scope.loginboxCalls = true;
  // $scope.loginbox = function() {
  //     if ($scope.username == undefined || $scope.username == "") {
  //         toastr.error('Username can not be blank!')
  //         return false
  //     }
  //     if ($scope.password == undefined || $scope.password == "") {
  //         toastr.error('Password can not be blank!')
  //         return false
  //     }
  //     if ($scope.Popcaptcha == "" || $scope.Popcaptcha == undefined) {
  //         toastr.error('Captcha is mandatory');
  //         return false
  //     }
  //     $scope.result = '';
  //     $scope.loginData = {
  //         "context": context,
  //         "username": $scope.username,
  //         "pwd": $scope.password
  //     }
  //     console.log(JSON.stringify($scope.loginData))
  //     if ($scope.Popcaptcha != null && $scope.Popcaptcha != "") {
  //         $.ajax({
  //             url: 'captchaValidate.php',
  //             method: 'POST',
  //             data: {
  //                 vercode: $scope.Popcaptcha
  //             },
  //             success: function(response) {
  //                 if (response != "Successful") {
  //                     $scope.$apply(function() {
  //                         toastr.error("Invalid validation code !")
  //                     })
  //                     $('#loginBoxAuthenticateImage').attr('src', 'captcha.php');
  //                     return false;
  //                 } else {
  //                     if ($scope.loginboxCalls == false) {
  //                         return false
  //                     }
  //                     $scope.loginboxCalls = false;
  //                     $http({
  //                         url: ApiUrl + '/Login',
  //                         method: 'POST',
  //                         data: JSON.stringify($scope.loginData),
  //                     }).then(function success(response) {
  //                         if (response.data.description.status == "Success") {
  //                             toastr.success(response.data.description.result);
  //                             $.cookie('authtoken', response.data.response.AuthToken);
  //                             window.location.href = "login.html";
  //                             localStorage.clear();
  //                             $("#loginBox").css("display", "none")
  //                             $scope.showLoginDetails = false;
  //                         } else {
  //                             toastr.error(response.data.description.result)
  //                             $('#loginBoxAuthenticateImage').attr('src', 'captcha.php');
  //                             $("#loginBox").css("display", "block");
  //                             $scope.showLoginDetails = false;
  //                         }
  //                         $scope.loginboxCalls = true;
  //                     }, function error(error) {
  //                         $scope.loginboxCalls = true;
  //                         $scope.showLoginDetails = true;
  //                         $("#loginBox").css("display", "none")
  //                     })
  //                 }
  //             }
  //         });
  //     }
  // }
  $(document).ready(function () {
    // $("#eventType").on('click',function(){
    //    $(".slip-wrap").toggleClass("close");
    // })
    if ($("#betslip_open").hasClass("close") == true) {
      $(".matched-wrap").css("height", "calc(100% - 31px)");
    } else {
      $(".matched-wrap").css("height", "calc(100% - 325px)");
    }
  });

  $rootScope.betslippanelcss = function (flag) {
    if (flag == 1) {
      if ($("#betslip_open").hasClass("close") == true) {
        $(".matched-wrap").css("height", "calc(100% - 31px)");
      } else {
        $(".matched-wrap").css("height", "calc(100% - 325px)");
      }
    } else if (flag == 2) {
      $("#betslip_open").addClass("close");
      if ($("#betslip_open").hasClass("close") == true) {
        $(".matched-wrap").css("height", "calc(100% - 31px)");
      }
    } else {
      if ($("#betslip_open").hasClass("close") == true) {
        $(".matched-wrap").css("height", "calc(100% - 31px)");
      } else {
        $(".matched-wrap").css("height", "calc(100% - 325px)");
      }
    }
  };
  $rootScope.betslippanelcss();

  $scope.showSportList = true;
  $scope.show_close = true;
  $scope.show_backnav = false;
  $rootScope.SportsList = function () {
    $scope.show_backnav = false;
    $scope.isLastElement = true;
    $rootScope.inplaydiv = false;
    $("#loadingTree").css("display", "block");
    $scope.pathList = [];
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Navigation/SportsList",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.showSportList = true;
          $scope.showTournamentList = false;
          $scope.showEventList = false;
          $scope.showMarketList = false;
          $scope.sport = response.data.data;
          $("#loadingTree").css("display", "none");
          if ($cookieStore.get("tNc") != "true") {
            // $scope.TermsNConditions();
          }
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.showSportList = true;
      $scope.showTournamentList = false;
      $scope.showEventList = false;
      $scope.showMarketList = false;
      if ($scope.sprtdata != undefined) {
        $scope.sport = [
          { id: "4", name: "Cricket", img: "Cricket" },
          { id: "1", name: "Soccer", img: "Soccer" },
          { id: "2", name: "Tennis", img: "Tennis" },
        ];
      }
      $("#loadingTree").css("display", "none");
    }
  };
  $rootScope.SportsList();
  $rootScope.changepath = function (name) {
    $location.path(`/${name}`);
  };
  $rootScope.TournamentList = function (id, name) {
    // console.log('tour'+name+'--'+id+'')
    if (
      $rootScope.sportsData == undefined ||
      $rootScope.sportsData[id] == undefined
    ) {
      return false;
    }
    if ($scope.show_backnav) {
      $scope.show_backnav = false;
    } else {
      $scope.show_backnav = true;
    }
    $scope.isLastElement = false;
    $rootScope.inplaydiv = false;
    // $('#loadingTree').css('display', 'block');
    $scope.level = 1;
    $scope.sprtid = id;
    $scope.tourname = name;
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Navigation/TournamentList?id=" + $scope.sprtid,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response);
          $scope.showSportList = false;
          $scope.showTournamentList = true;
          $scope.showEventList = false;
          $scope.showMarketList = false;
          $scope.tournament = response.data.data;
          // $('#loadingTree').css('display', 'none');
          $scope.pathList.splice(0, 1);
          $scope.pathList.splice(0, 1);
          $scope.pathList.splice(0, 1);
          $scope.pathList.push({
            name: name,
            id: id,
            level: $scope.level,
          });
          // console.log($scope.pathList)
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      if ($rootScope.sportsData != undefined) {
        $scope.showSportList = false;
        $scope.showTournamentList = true;
        $scope.showEventList = false;
        $scope.showMarketList = false;
        $scope.tournament = $rootScope.tournamentlistwise(
          $rootScope.sportsData[id]
        );
        // console.log($rootScope.sportsData[id])
        // $('#loadingTree').css('display', 'none');
        $scope.pathList.splice(0, 1);
        $scope.pathList.splice(0, 1);
        $scope.pathList.splice(0, 1);
        $scope.pathList.push({
          name: name,
          id: id,
          level: $scope.level,
        });
      }
    }
  };
  $rootScope.eventList = function (id, name, sprtID) {
    // console.log('--->>', id)
    // $('#loadingTree').css('display', 'block');
    $scope.level = 2;
    $scope.ename = name;
    $scope.tourid = id;
    if (sprtID != undefined) {
      $scope.sprtid = sprtID;
    }
    if ($rootScope.fType == 1) {
      $http({
        url:
          ApiUrl +
          "/Navigation/MatchList?id=" +
          $scope.sprtid +
          "&tourid=" +
          $scope.tourid,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.showSportList = false;
          $scope.showTournamentList = false;
          $scope.showEventList = true;
          $scope.showMarketList = false;
          $scope.Event = response.data.data;
          // $('#loadingTree').css('display', 'none');
          $scope.pathList.splice(1, 1);
          $scope.pathList.splice(1, 1);
          $scope.pathList.push({
            name: name,
            id: id,
            level: $scope.level,
          });
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      if ($rootScope.sportsData != undefined) {
        $scope.showSportList = false;
        $scope.showTournamentList = false;
        $scope.showEventList = true;
        $scope.showMarketList = false;
        $scope.Event = $rootScope.matchlistwise(
          $rootScope.sportsData[$scope.sprtid].tournaments[$scope.tourid]
        );
        // $('#loadingTree').css('display', 'none');
        $scope.pathList.splice(1, 1);
        $scope.pathList.splice(1, 1);
        $scope.pathList.push({
          name: name,
          id: id,
          level: $scope.level,
        });
      }
    }
  };
  $rootScope.MarketList = function (id, name) {
    // $('#loadingTree').css('display', 'block');
    $scope.level = 3;
    $scope.matchid = id;
    $scope.mname = name;
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Navigation/MarketList?mtid=" + $scope.matchid,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.showSportList = false;
          $scope.showTournamentList = false;
          $scope.showEventList = false;
          $scope.showMarketList = true;
          // console.log(response);
          // $scope.pathList.push('Sport')
          $scope.Market = response.data.data;
          // $('#loadingTree').css('display', 'none');
          // console.log($scope.Market)
          //  console.log($scope.sport);
          // $scope.marketname = event.target.text
          // $scope.pathList.push({
          //     "market": $scope.marketname,
          //     "id": $scope.marketid
          // })
          $scope.pathList.splice(2, 1);
          $scope.pathList.push({
            name: name,
            id: id,
            level: $scope.level,
          });
          // $scope.pathList.push($scope.marketname)
          // console.log($scope.pathList)
          // console.log($scope.pathList, "tourn")
          // $scope.pathList=[];
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      if ($rootScope.sportsData != undefined) {
        $scope.showSportList = false;
        $scope.showTournamentList = false;
        $scope.showEventList = false;
        $scope.showMarketList = true;
        $scope.Market = $rootScope.marketlistwise(
          $rootScope.sportsData[$scope.sprtid].tournaments[$scope.tourid]
            .matches[$scope.matchid],
          $scope.matchid,
          $scope.tourid,
          $scope.sprtid
        );
        // $('#loadingTree').css('display', 'none');
        $scope.pathList.splice(2, 1);
        $scope.pathList.push({
          name: name,
          id: id,
          level: $scope.level,
        });
      }
    }
  };

  $scope.back = function () {
    var last = $scope.pathList[$scope.pathList.length - 1];
    // angular.forEach($scope.pathList, function (item, index) {
    //   console.log(item);
    //   if (item.level == 3) {
    //     $scope.showEventList = true;
    //   }
    // });
    if (last.level == 3) {
      $scope.showMarketList = false;
      $scope.showEventList = true;
      $scope.pathList.splice(2, 1);
    } else if (last.level == 2) {
      $scope.showEventList = false;
      $scope.showTournamentList = true;
      $scope.pathList.splice(1, 1);
    } else if (last.level == 1) {
      $scope.isLastElement = true;
      $scope.showSportList = true;
      $scope.showTournamentList = false;
      $scope.pathList.splice(0, 1);
    }
    console.log($scope.pathList, last, "pathList");
  };
  $scope.isInplay = true;
  $scope.eventsList = [];
  $scope.shoNoEvents = false;
  $scope.oldHighlightlist = [];
  $scope.Highlightlist = [];
  $scope.Highlights = function (id, index) {
    $("#loading_page").css("display", "grid");
    $scope.s_id = id;
    if ($scope.s_id == "4") {
      $scope.s_name = "Cricket";
    } else if ($scope.s_id == "1") {
      $scope.s_name = "Soccer";
    } else if ($scope.s_id == "2") {
      $scope.s_name = "Tennis";
    }
    $scope.isInplay = false;
    // $('.HLTab').removeClass('select')
    // $('#highlightTab' + index).addClass('select')
    $scope.inplayListData = [];
    $scope.datacount = [];
    $scope.oldHighlightlist = [];
    $scope.Highlightlist = [];
    // console.log($scope.datacount)
    $scope.matchHighlight();
    // $scope.lotusHighlights(id)
  };
  $scope.matchHighlightinter = false;
  $scope.matchHighlight = function () {
    $(".btn-lay").removeClass("spark");
    $(".btn-back").removeClass("spark");
    $("#loading").css("display", "block");
    if ($scope.s_id == undefined) {
      return false;
    }
    if ($scope.matchHighlightinter == false) {
      $scope.matchHighlightinter = true;
    }
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/Highlights?sid=" + $scope.s_id,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.matchHighlightinter = false;
          // console.log(response);
          if (response.data.data.length < 1) {
            $scope.shoNoEvents = true;
          } else {
            $scope.shoNoEvents = false;
          }
          $scope.Highlightlist = response.data.data;
          // console.log($scope.Highlightlist)
          $("#loading_page").css("display", "none");
          if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
            $scope.oldHighlightlist = $scope.Highlightlist;
          }
          angular.forEach($scope.Highlightlist, function (item, index) {
            if (item.matchName == $scope.oldHighlightlist[index].matchName) {
              if (
                item.runner1Back != $scope.oldHighlightlist[index].runner1Back
              ) {
                $("#hback1_" + index).addClass("spark");
              }
              if (
                item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay
              ) {
                $("#hlay1_" + index).addClass("spark");
              }
              if (
                item.runner2Back != $scope.oldHighlightlist[index].runner2Back
              ) {
                $("#hback2_" + index).addClass("spark");
              }
              if (
                item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay
              ) {
                $("#hlay2_" + index).addClass("spark");
              }
              if (
                item.runner3Back != $scope.oldHighlightlist[index].runner3Back
              ) {
                $("#hback3_" + index).addClass("spark");
              }
              if (
                item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay
              ) {
                $("#hlay3_" + index).addClass("spark");
              }
            }
            if (item.bfId == $scope.oldHighlightlist[index].bfId) {
              // console.log(item.bfId)
            }
            if (item.marketId == $scope.oldHighlightlist[index].marketId) {
              // console.log(item.marketId)
            }
            if (item.mtBfId == $scope.oldHighlightlist[index].mtBfId) {
              // console.log(item.mtBfId)
            }
          });
          $scope.oldHighlightlist = $scope.Highlightlist;
        },
        function myError(error) {
          $scope.matchHighlightinter = false;
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.Highlightlist = $rootScope.highlightwisedata($scope.s_id);
      $scope.matchHighlightinter = false;
      // console.log($scope.Highlightlist);
      // if ($scope.Highlightlist.length < 1) {
      //     $scope.shoNoEvents = true;
      // } else {
      //     $scope.shoNoEvents = false;
      // }
      $("#loading").css("display", "none");
      if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
        $scope.oldHighlightlist = $scope.Highlightlist;
      }
      angular.forEach($scope.Highlightlist, function (item, index) {
        if (item.matchName == $scope.oldHighlightlist[index].matchName) {
          if (item.runner1Back != $scope.oldHighlightlist[index].runner1Back) {
            $("#hback1_" + index).addClass("spark");
          }
          if (item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay) {
            $("#hlay1_" + index).addClass("spark");
          }
          if (item.runner2Back != $scope.oldHighlightlist[index].runner2Back) {
            $("#hback2_" + index).addClass("spark");
          }
          if (item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay) {
            $("#hlay2_" + index).addClass("spark");
          }
          if (item.runner3Back != $scope.oldHighlightlist[index].runner3Back) {
            $("#hback3_" + index).addClass("spark");
          }
          if (item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay) {
            $("#hlay3_" + index).addClass("spark");
          }
        }
        if (item.bfId == $scope.oldHighlightlist[index].bfId) {
          // console.log(item.bfId)
        }
        if (item.marketId == $scope.oldHighlightlist[index].marketId) {
          // console.log(item.marketId)
        }
        if (item.mtBfId == $scope.oldHighlightlist[index].mtBfId) {
          // console.log(item.mtBfId)
        }
      });
      $scope.oldHighlightlist = $scope.Highlightlist;
    }
  };
  var highlightTimer;
  //  = $interval(function() {
  //     // $scope.matchHighlight();
  // }, 5000);
  $scope.$on("$routeChangeStart", function (scope, next, current) {
    if (next.$$route.controller != "homeController") {
      $interval.cancel(highlightTimer); // clear interval here
    }
    if (next.$$route.controller == undefined) {
      highlightTimer = $interval(function () {
        $scope.matchHighlight();
      }, 1000);
    }
  });
  $scope.GetUserData = function () {
    $http({
      url: ApiUrl + "/Data/GetUserData",
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        $scope.clientData = response;
        $scope.news = response.news;
        $rootScope.curTime = response.curTime;
        $scope.sport = [
          { id: "4", name: "Cricket", img: "Cricket" },
          { id: "1", name: "Soccer", img: "Soccer" },
          { id: "2", name: "Tennis", img: "Tennis" },
        ];
        // $rootScope.sportsData=$scope.homeSignalrFormat(response.data.sportsData);
        $scope.homesportdata = response.data.sportsData;
        $rootScope.fancyBook = response.data._fancyBook;
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  var clientsignalrcount = 0;
  $scope.connectHomeSignalr = function (HubAddress) {
    $scope.homeHubAddress = HubAddress;

    //Getting the connection object
    $scope.homeconnection = $.hubConnection($scope.homeHubAddress);
    //Creating Proxy
    $scope.homeproxy = $scope.homeconnection.createHubProxy("DataHub");
    //Starting connection
    $scope.homeconnection
      .start()
      .done(function (myHomeHubConnection) {
        var hubConState = myHomeHubConnection.state;
        console.log("Home Connection Established= " + hubConState);
      })
      .fail(function (myHomeHubConnection) {
        var hubConState = myHomeHubConnection.state;
        console.log("Could not connect Home = " + hubConState);
      });
    $scope.homeconnection.stateChanged(function (change) {
      //console.log(change.newState)
      if (change.newState != 1 && $scope.homeHubAddress != null) {
        $scope.homeconnection.start().done(function (myHomeHubConnection) {
          var hubConState = myHomeHubConnection.state;
          console.log("Home ReConnection Established = " + hubConState);
        });
      }
      if (change.newState == 1 && $scope.homeHubAddress != null) {
        $scope.homeproxy.invoke("UnSubscribeData", authtoken);
        $scope.subscribehomesignalr();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.homeproxy.on("BroadcastSubscribedData", function (home) {
      // console.log(home)
      $scope.$apply(function () {
        $scope.clientData = home;
        $scope.news = home.news;
        $rootScope.curTime = home.curTime;
        $scope.sport = [
          { id: "4", name: "Cricket", img: "Cricket" },
          { id: "1", name: "Soccer", img: "Soccer" },
          { id: "2", name: "Tennis", img: "Tennis" },
        ];
        $scope.sprtdata = home.sportsData;
        $rootScope.sportsData = $scope.homeSignalrFormat(home.sportsData);
        $scope.homesportdata = home.sportsData;
        $rootScope.fancyBook = home._fancyBook;
        if (clientsignalrcount == 0) {
          if ($location.path().split("/").indexOf("full-market") > -1) {
            $rootScope.$emit("callMktData", {});
            $rootScope.$emit("calLfancyData", {});
            // $rootScope.$emit("calLHubAddress", {})
          }
          if ($location.path().split("/").indexOf("multiMarkets") > -1) {
            $rootScope.$emit("MultiMarkets", {});
            $rootScope.$emit("callMultiMarketExp", {});
          }
          $scope.AllmatchSearch();
        }
        clientsignalrcount++;
      });
    });
  };
  $scope.subscribehomesignalr = function () {
    //Invoking SubscribeMarket method defined in hub
    if (authtoken == undefined) {
      authtoken = "1937-789-123";
    }
    $scope.homeproxy.invoke("SubscribeData", authtoken);
  };
  $scope.unSubscribesubscribehomesignalr = function () {
    //Invoking UnsubscribeMarket method defined in hub
    if ($rootScope.fType == 2) {
      $scope.homeHubAddress = null;
      $scope.homeproxy.invoke("UnSubscribeData", authtoken);
      $scope.homeconnection.stop();
    }
  };
  $scope.homeSignalrFormat = function (sportsData) {
    var sportDataFormat = {};
    angular.forEach(sportsData, function (item, index) {
      var tourDataFormat = {};
      angular.forEach(item.tournaments, function (item2, index2) {
        var matchesDataFormat = {};
        angular.forEach(item2.matches, function (item3, index3) {
          var marketsDataFormat = {};
          angular.forEach(item3.markets, function (item4, index4) {
            marketsDataFormat[item4.id] = item4;
          });
          // matchesDataFormat['bfId']=item2.bfId;
          // matchesDataFormat['id']=item2.id;
          // matchesDataFormat['name']=item2.name;
          matchesDataFormat[item3.id] = item3;
        });
        // tourDataFormat['id']=item.id;
        // tourDataFormat['name']=item.name;
        tourDataFormat[item2.bfId] = {
          bfId: item2.bfId,
          id: item2.id,
          name: item2.name,
          matches: matchesDataFormat,
        };
        // tourDataFormat[item2.bfId]['bfId']=item.bfId;
        // tourDataFormat[item2.bfId]['id']=item.id;
        // tourDataFormat[item2.bfId]['name']=item.name;
        // tourDataFormat[item2.bfId]=matchesDataFormat;
        // tourDataFormat[item2.bfId]=item2;
      });
      // tourDataFormat[item2.bfId]=item2;
      sportDataFormat[item.bfId] = {
        bfId: item.bfId,
        id: item.id,
        name: item.name,
        tournaments: tourDataFormat,
      };
      // sportDataFormat[item.bfId]=tourDataFormat;
    });
    return sportDataFormat;
  };
  $rootScope.sportlistwise = function (sportsData) {
    var sportslistdata = [];
    angular.forEach(sportsData, function (item, index) {
      if (item.bfId != "2000") {
        var data = {};
        data["id"] = item.bfId;
        data["name"] = item.name;
        data["img"] = item.name;
        data["ids"] = item.id;

        sportslistdata.push(data);
      }
      if (item.bfId == "2000" && $rootScope.isTennpatti == 1) {
        var data = {};
        data["id"] = item.bfId;
        data["name"] = item.name;
        data["img"] = item.name;
        data["ids"] = item.id;
        sportslistdata.push(data);
      }
    });
    return sportslistdata;
  };
  $rootScope.tournamentlistwise = function (tourlistdata) {
    var tournamentdata = [];
    angular.forEach(tourlistdata.tournaments, function (item, index) {
      var data = {};
      data["id"] = item.bfId;
      data["name"] = item.name;
      tournamentdata.push(data);
    });
    return tournamentdata;
  };
  $rootScope.matchlistwise = function (tourlistdata) {
    var matchdata = [];
    angular.forEach(tourlistdata.matches, function (item, index) {
      var data = {};
      data["bfId"] = item.bfId;
      data["id"] = item.id;
      data["name"] = item.name;
      data["startDate"] = item.startDate;
      matchdata.push(data);
    });
    return matchdata;
  };
  $rootScope.marketlistwise = function (matchlistdata, mtid, tourid, sprtId) {
    var marketdata = [];
    angular.forEach(matchlistdata.markets, function (item, index) {
      var data = {};
      data["bfId"] = item.bfId;
      data["id"] = item.id;
      data["SportId"] = sprtId;
      data["name"] = item.name;
      data["isMulti"] = item.isMulti;
      data["mtId"] = mtid;
      data["isBettingAllow"] = item.isBettingAllow;
      data["TourId"] = tourid;
      data["inPlay"] = matchlistdata.inPlay;
      marketdata.push(data);
    });
    return marketdata;
  };
  $rootScope.highlightwisedata = function (sprtid) {
    var highlightdata = [];
    $scope.multimarket = JSON.parse(localStorage.getItem("Multimarkets"));
    angular.forEach($scope.homesportdata, function (item, index) {
      if (item.bfId == sprtid) {
        angular.forEach(item.tournaments, function (item1, index1) {
          angular.forEach(item1.matches, function (item2, index2) {
            angular.forEach(item2.markets, function (item3, index3) {
              if (item3.name == "Match Odds") {
                item3.runnerData["bfId"] = item3.bfId;
                item3.runnerData["inPlay"] = item2.inPlay;
                item3.runnerData["isBettingAllow"] = item3.isBettingAllow;
                item3.runnerData["isMulti"] = item3.isMulti;
                item3.runnerData["marketId"] = item3.id;
                item3.runnerData["matchDate"] = item2.startDate;
                item3.runnerData["matchId"] = item2.id;
                item3.runnerData["matchName"] = item2.name;
                item3.runnerData["sportName"] = item.name;
                item3.runnerData["status"] = item2.status;
                item3.runnerData["mtBfId"] = item2.bfId;
                item3.runnerData["TourbfId"] = item1.bfId;
                item3.runnerData["SportbfId"] = item.bfId;
                item3.runnerData["hasFancy"] = item2.hasFancy;
                angular.forEach($scope.multimarket, function (item4) {
                  if (item3.id == item4) {
                    item3.runnerData["isMulti"] = 1;
                  }
                });
                highlightdata.push(item3.runnerData);
              }
            });
          });
        });
      }
    });
    return highlightdata;
  };
  $scope.Searchwisedata = function () {
    var highlightdata = [];
    angular.forEach($scope.homesportdata, function (item, index) {
      angular.forEach(item.tournaments, function (item1, index1) {
        angular.forEach(item1.matches, function (item2, index2) {
          angular.forEach(item2.markets, function (item3, index3) {
            if (item3.name == "Match Odds") {
              item3.runnerData["bfId"] = item3.bfId;
              item3.runnerData["inPlay"] = item2.inPlay;
              item3.runnerData["isBettingAllow"] = item3.isBettingAllow;
              item3.runnerData["isMulti"] = item3.isMulti;
              item3.runnerData["marketId"] = item3.id;
              item3.runnerData["matchDate"] = item2.startDate;
              item3.runnerData["matchId"] = item2.id;
              item3.runnerData["matchName"] = item2.name;
              item3.runnerData["sportName"] = item.name;
              item3.runnerData["status"] = item2.status;
              item3.runnerData["mtBfId"] = item2.bfId;
              item3.runnerData["TourbfId"] = item1.bfId;
              item3.runnerData["SportbfId"] = item.bfId;
              item3.runnerData["hasFancy"] = item2.hasFancy;
              highlightdata.push(item3.runnerData);
            }
          });
        });
      });
    });
    return highlightdata;
  };
  $rootScope.inplaylistwise = function (sportdata, inplaytype) {
    var inplaydata = [];
    $scope.multimarket = JSON.parse(localStorage.getItem("Multimarkets"));
    angular.forEach(sportdata, function (item, index) {
      var data = {};
      var highlightdata = [];
      angular.forEach(item.tournaments, function (item1, index1) {
        angular.forEach(item1.matches, function (item2, index2) {
          // if (item2.inPlay==1 && inplaytype==0) {
          angular.forEach(item2.markets, function (item3, index3) {
            if (item3.name == "Match Odds") {
              item3.runnerData["bfId"] = item3.bfId;
              item3.runnerData["inPlay"] = item2.inPlay;
              item3.runnerData["isBettingAllow"] = item3.isBettingAllow;
              item3.runnerData["isMulti"] = item3.isMulti;
              item3.runnerData["marketId"] = item3.id;
              item3.runnerData["matchDate"] = item2.startDate;
              item3.runnerData["matchId"] = item2.id;
              item3.runnerData["matchName"] = item2.name;
              item3.runnerData["sportName"] = item.name;
              item3.runnerData["status"] = item2.status;
              item3.runnerData["mtBfId"] = item2.bfId;
              item3.runnerData["TourbfId"] = item1.bfId;
              item3.runnerData["Tourname"] = item1.name;
              item3.runnerData["SportbfId"] = item.bfId;
              item3.runnerData["hasFancy"] = item2.hasFancy;
              angular.forEach($scope.multimarket, function (item4) {
                if (item3.id == item4) {
                  item3.runnerData["isMulti"] = 1;
                }
              });
              if (item2.inPlay == 1 && inplaytype == 0) {
                highlightdata.push(item3.runnerData);
              } else if (
                item2.inPlay != 1 &&
                inplaytype == 1 &&
                $rootScope.getDateTime(
                  item2.startDate,
                  $rootScope.curTime,
                  1
                ) == 0 &&
                inplaytype == 1
              ) {
                highlightdata.push(item3.runnerData);
              } else if (
                item2.inPlay != 1 &&
                inplaytype == 2 &&
                $rootScope.getDateTime(
                  item2.startDate,
                  $rootScope.curTime,
                  1
                ) == 1 &&
                inplaytype == 2
              ) {
                highlightdata.push(item3.runnerData);
              }
            }
          });
          // }
        });
      });
      data["name"] = item.name;
      data["inplayData"] = highlightdata;
      data["id"] = 0;
      inplaydata.push(data);
    });
    return inplaydata;
  };
  $rootScope.getAllBetsWise = function (mtid, avgOdds) {
    var data = {
      matchedData: [],
      unMatchedData: [],
    };
    if (mtid == 0 && avgOdds == 0) {
      var matchData = [];
      angular.forEach($scope.clientData._userMatchedBets, function (
        item,
        index
      ) {
        angular.forEach(item, function (item1, index1) {
          matchData.push(item1);
        });
      });
      if ($scope.clientData._userTpBets != null) {
        angular.forEach($scope.clientData._userTpBets, function (item, index) {
          angular.forEach(item, function (item1, index1) {
            matchData.push(item1);
          });
        });
      }
      data.matchedData = matchData;
      var unmatchData = [];
      angular.forEach($scope.clientData._userUnMatchedBets, function (
        item,
        index
      ) {
        angular.forEach(item, function (item1, index1) {
          unmatchData.push(item1);
        });
      });
      data.unMatchedData = unmatchData;
    } else if (mtid == 0 && avgOdds == 1) {
      var matchData = [];
      angular.forEach($scope.clientData._userAvgmatchedBets, function (
        item,
        index
      ) {
        angular.forEach(item, function (item1, index1) {
          matchData.push(item1);
        });
      });
      if ($scope.clientData._userTpBets != null) {
        angular.forEach($scope.clientData._userTpBets, function (item, index) {
          angular.forEach(item, function (item1, index1) {
            matchData.push(item1);
          });
        });
      }
      data.matchedData = matchData;
      var unmatchData = [];
      angular.forEach($scope.clientData._userUnMatchedBets, function (
        item,
        index
      ) {
        angular.forEach(item, function (item1, index1) {
          unmatchData.push(item1);
        });
      });
      data.unMatchedData = unmatchData;
    } else if (mtid != 0 && avgOdds == 0) {
      var matchData = [];
      if ($scope.clientData._userMatchedBets != null) {
        angular.forEach($scope.clientData._userMatchedBets[mtid], function (
          item1,
          index1
        ) {
          matchData.push(item1);
        });
      }
      if ($scope.clientData._userTpBets != null) {
        angular.forEach(
          $scope.clientData._userTpBets[$rootScope.gameid],
          function (item, index) {
            matchData.push(item);
          }
        );
      }
      data.matchedData = matchData;
      var unmatchData = [];
      if ($scope.clientData._userUnMatchedBets != null) {
        angular.forEach($scope.clientData._userUnMatchedBets[mtid], function (
          item1,
          index1
        ) {
          unmatchData.push(item1);
        });
      }
      data.unMatchedData = unmatchData;
    } else if (mtid != 0 && avgOdds == 1) {
      var matchData = [];
      if ($scope.clientData._userAvgmatchedBets != null) {
        angular.forEach($scope.clientData._userAvgmatchedBets[mtid], function (
          item1,
          index1
        ) {
          // console.log(item1)
          matchData.push(item1);
        });
      }
      if ($scope.clientData._userTpBets != null) {
        angular.forEach(
          $scope.clientData._userTpBets[$rootScope.gameid],
          function (item, index) {
            matchData.push(item);
          }
        );
      }
      data.matchedData = matchData;
      var unmatchData = [];
      if ($scope.clientData._userUnMatchedBets != null) {
        angular.forEach($scope.clientData._userUnMatchedBets[mtid], function (
          item1,
          index1
        ) {
          unmatchData.push(item1);
        });
      }
      data.unMatchedData = unmatchData;
    }
    return data;
  };
  $rootScope.selectMenuMatch = 0;
  $scope.selectedMatch = function (select) {
    $rootScope.selectMenuMatch = select;
  };
  $scope.betsmatchidwise = function () {
    $scope.StoreMatches = [];
    if ($rootScope.sportsData != undefined) {
      angular.forEach($rootScope.sportsData, function (item1, index1) {
        angular.forEach(item1.tournaments, function (item2, index2) {
          angular.forEach(item2.matches, function (item3, index3) {
            angular.forEach($scope.clientData._userMatchedBets, function (
              item,
              index
            ) {
              if (index == item3.id) {
                $scope.StoreMatches.push({
                  matchId: item3.id,
                  matchName: item3.name + " - Match Odds",
                });
              }
            });
          });
        });
      });
    }
    $scope.StoreMatches.splice(0, 0, {
      matchId: 0,
      matchName: "Select Match",
    });
    // console.log($scope.StoreMatches);
  };
  $scope.orderByDate = function (timeg) {
    var matchDateTime;
    if (timeg.matchDate == undefined) {
      return (matchDateTime = new Date(
        $scope.matchDateDigit(timeg.startDate).replace(/ /g, "T")
      ));
    } else {
      return (matchDateTime = new Date(
        $scope.matchDateDigit(timeg.matchDate).replace(/ /g, "T")
      ));
    }
  };
  $scope.checkDateTime = function (matchDate, currentDate) {
    if (matchDate == undefined || currentDate == undefined) {
      return false;
    }
    var matchDateTime = new Date(
      $scope.matchDateDigit(matchDate).replace(/ /g, "T")
    );
    currentDate = currentDate.replace(/ /g, "T");
    var currentDate = new Date(currentDate);
    var dateTime = matchDateTime.getTime() - currentDate.getTime();
    var day = parseInt(dateTime / (1000 * 3600 * 24));
    var hrs = parseInt(dateTime / (1000 * 3600)) - day * 24;
    var minutes = parseInt(dateTime / (1000 * 60)) - (day * 24 * 60 + hrs * 60);
    if (day <= 0 && hrs <= 0 && minutes <= 60) {
      return false;
    } else {
      return false;
    }
  };
  $rootScope.getDateTime = function (matchDate, currentDate, state) {
    var matchDateTime = $scope
      .matchDateDigit(matchDate)
      .split("-")[2]
      .split(" ")[0];
    var currentDateTime = currentDate.split("-")[2].split(" ")[0];
    var day = parseInt(matchDateTime) - parseInt(currentDateTime);
    if (day == 0 && state != 1) {
      return $scope.matchDateDigit(matchDate).replace(/ /g, "T").split("T")[1];
    } else if (day == 1 && state != 1) {
      return (
        "Tomorrow " +
        $scope.matchDateDigit(matchDate).replace(/ /g, "T").split("T")[1]
      );
    } else if (state != 1) {
      return $scope.matchDateDigit(matchDate);
    } else if (state == 1) {
      return day;
    }
  };
  $scope.matchDateDigit = function (date) {
    var splitdate = date.split("-");
    var splitdate2 = splitdate[2].split(" ");
    if (splitdate[1] == "Jan") {
      date = splitdate2[0] + "-01-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Feb") {
      date = splitdate2[0] + "-02-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Mar") {
      date = splitdate2[0] + "-03-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Apr") {
      date = splitdate2[0] + "-04-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "May") {
      date = splitdate2[0] + "-05-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Jun") {
      date = splitdate2[0] + "-06-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Jul") {
      date = splitdate2[0] + "-07-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Aug") {
      date = splitdate2[0] + "-08-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Sept") {
      date = splitdate2[0] + "-09-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Oct") {
      date = splitdate2[0] + "-10-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Nov") {
      date = splitdate2[0] + "-11-" + splitdate[0] + " " + splitdate2[1];
    } else if (splitdate[1] == "Dec") {
      date = splitdate2[0] + "-12-" + splitdate[0] + " " + splitdate2[1];
    } else {
      date =
        splitdate2[0] +
        "-" +
        splitdate[1] +
        "-" +
        splitdate[0] +
        " " +
        splitdate2[1];
    }
    return date;
  };
  $scope.userDescription = function () {
    $http({
      url: ApiUrl + "/Data/UserDescription",
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          $scope.lastLogin = response.data.data.lastLogin;
          $scope.name = response.data.data.name;
          $scope.uName = response.data.data.uName;
          $rootScope.fType = response.data.data.fType;
          $rootScope.isTennpatti = response.data.data.isTennpatti;
          $scope.homeHubAddress = response.data.data.add;
          if ($rootScope.fType == 2) {
            $scope.connectHomeSignalr(response.data.data.add);
          } else {
            $rootScope.SportsList();
            $scope.GetSettings();
            // $scope.getStakeSettings();
            $scope.GetBets();
          }
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.Fund = function (val) {
    if (val == undefined) {
      $("#accountCredit").css("display", "none");
      $("#menuRefreshIcon").css("display", "block");
    }
    $http({
      url: ApiUrl + "/Data/FundExpo",
      method: "GET",
      headers: {
        Token: checktoken(),
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        // $scope.fundsdataList = response.data.data;
        $scope.availBal = response.data.data.availBal;
        $scope.exposure = response.data.data.exposure;
        $("#menuRefreshIcon").css("display", "none");
        $("#accountCredit").css("display", "block");
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };

  var fundsinterval;
  fundsinterval = $interval(function () {
    $scope.Fund("1");
  }, 15000);

  if ($rootScope.authcookie == undefined) {
    $interval.cancel(fundsinterval);
  }
  $scope.stakeListdata = {
    stake1: 100,
    stake2: 500,
    stake3: 1000,
    stake4: 2000,
    stake5: 5000,
    stake6: 10000,
    stake7: 15000,
    stake8: 20000,
    stake9: 25000,
    stake10: 50000,
  };

  $scope.GetSettings = function () {
    $http({
      url: ApiUrl + "/Settings/GetSettings",
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        if (response.data.description.status == "Success") {
          if (response.data.betStake.stake1 == 0) {
            $scope.storebetStakeSettings();
          } else {
            $scope.stakeList = {
              stake1: response.data.betStake.stake1,
              stake2: response.data.betStake.stake2,
              stake3: response.data.betStake.stake3,
              stake4: response.data.betStake.stake4,
              stake5: response.data.betStake.stake5,
              stake6: response.data.betStake.stake6,
              stake7: response.data.betStake.stake7,
              stake8: response.data.betStake.stake8,
              stake9: response.data.betStake.stake9,
              stake10: response.data.betStake.stake10,
            };
          }
        }
        $scope.stake1 = response.data.betStake.stake1;
        $scope.stake2 = response.data.betStake.stake2;
        $scope.stake3 = response.data.betStake.stake3;
        $scope.stake4 = response.data.betStake.stake4;
        $scope.stake5 = response.data.betStake.stake5;
        $scope.stake6 = response.data.betStake.stake6;
        $scope.stake7 = response.data.betStake.stake7;
        $scope.stake8 = response.data.betStake.stake8;
        $scope.stake9 = response.data.betStake.stake9;
        $scope.stake10 = response.data.betStake.stake10;
        $scope.default_stake = response.data.defaultStake;
        $rootScope.isOddsHighlights = response.data.isOddsHighlights;
        if ($scope.default_stake == 0) {
          $scope.default_stake = "";
        }
        if ($rootScope.isOddsHighlights == 1) {
          $scope.oddsval = true;
        } else {
          $scope.oddsval = false;
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };

  $scope.storebetStakeSettings = function () {
    // console.log('edit stake function called')

    var finalData = JSON.stringify($scope.stakeListdata);
    $http({
      method: "POST",
      url: ApiUrl + "/Settings/SaveBetStakeSetting",
      headers: {
        Token: authtoken,
      },
      data: finalData,
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.result == "Bet stake settings saved successfully") {
          $scope.GetSettings();
          // toastr.success(response.data.result);
        } else {
          toastr.error(response.data.result);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
    // console.log(newStakeList)
  };

  $scope.registerCasino = function () {
    $scope.registerData = {
      request: {
        type: "registration",
        username: $scope.uName,
        currencyid: "INR",
        firstname: $scope.uName,
        lastname: "Casino",
        mode: "1",
      },
    };
    $http({
      url: "http://www.mintcasino.in/Jazztech/APIIntegration.svc/Login",
      method: "POST",
      data: JSON.stringify($scope.registerData),
    }).then(
      function success(response) {
        console.log(response);
        $scope.casinoToken = response.data.response.token;
        $scope.langu = "en";
        console.log($location.absUrl());
        $scope.hrefCasino =
          "https://mintexch.jaaztech.com/signin/viewer/walletGameLogin.jsp?token=" +
          $scope.casinoToken +
          "&lang=" +
          $scope.langu +
          "&lobby=true&reloadURL=" +
          $location.absUrl();
        console.log($scope.hrefCasino);
        window.open($scope.hrefCasino);
      },
      function error(error) {
        console.log(error);
      }
    );
  };
  $scope.logout = function () {
    if ($scope.pending_logout == true) return false;
    $scope.pending_logout = true;
    $http({
      method: "POST",
      url: ApiUrl + "/Logout",
      headers: {
        "Content-Type": "application/json",
        Token: authtoken,
      },
    }).then(
      function success(response) {
        $scope.pending_logout = false;
        //console.log(response)
        if (response.data.status == "Success") {
          // $scope.unSubscribeHome();
          $.removeCookie("authtoken");
          $scope.unSubscribesubscribehomesignalr();
          toastr.success(response.data.result);
          window.location.href = "login.html";
          // $timeout(function() {
          //     window.location.href = 'login.html'
          // }, 500);
        }
        // $scope.balanceexpo = false
        // $scope.logindetail = true
      },
      function error(response) {
        $scope.pending_logout = false;
        if (response.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.Callfunctions = function () {
    // if ($rootScope.authcookie == "") {
    //     $scope.logout();
    // }
    // else if ($rootScope.authcookie == undefined || $rootScope.authcookie == "" || $rootScope.authcookie == null) {
    //     $scope.add = "http://167.86.74.159:5133";
    //     $scope.connectHomeSignalr($scope.add);
    //     $rootScope.fType = 2;
    //     $scope.stakeList = $scope.stakeListdata;
    // }
    // else {
    $rootScope.inplaydiv = false;
    $rootScope.mainfooter = false;
    $scope.userDescription();
    $scope.GetUserData();
    $scope.GetSettings();
    $scope.Fund();
    $scope.getOneClickStake();
    // }
  };
  $scope.AllmatchSearchtinter = false;
  $scope.AllmatchSearch = function () {
    if ($scope.AllmatchSearchtinter == false) {
      $scope.AllmatchSearchtinter = true;
    }
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/Highlights",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.AllmatchSearchtinter = false;
          $scope.Allmatches = response.data.data;
          // console.log($scope.Allmatches);
        },
        function myError(error) {
          $scope.AllmatchSearchtinter = false;
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.Allmatches = $scope.Searchwisedata();
    }
  };
  $scope.AllmatchSearch();
  $scope.SearchItem = function (searchvalue) {
    // console.log(searchvalue)
    if (searchvalue == "") {
      $("#searchList").css("display", "none");
    } else {
      $("#searchList").css("display", "block");
    }
  };
  $scope.matchclick = function () {
    $("#searchList").css("display", "none");
    $scope.Searchevent = "";
  };
  // var highlistpm = function(sid) {
  //  console.log('11111111111')
  //      return new Promise(function(res, rej) {
  //          if ($scope.pending_highlistpm == true) return false
  //          $scope.pending_highlistpm = true
  //          $http({
  //              method: "GET",
  //              url: ApiUrl + "/Data/Highlights?sid=" + sid,
  //              headers: {
  //                  "Content-Type": "application/json",
  //                  "Token": authtoken
  //              }
  //          }).then(function success(response) {
  //              $scope.pending_highlistpm = false
  //              res(response)
  //          }, function error(response) {
  //              $scope.pending_highlistpm = false
  //              if (response.status == 401) {
  //                  $.removeCookie("authtoken");
  //                  window.location.href = 'login.html'
  //              }
  //          })
  //      })
  //  }
  // $scope.oldHighlightlist = []
  // $scope.Highlightlist = []
  // $scope.Highlights = function(id, index) {
  //     $('#loading_page').css('display','grid');
  //     $scope.s_id = id
  //     if ($scope.s_id=='4') {
  //      $scope.s_name="Cricket"
  //     }
  //     else if ($scope.s_id=='1') {
  //      $scope.s_name="Soccer"
  //     }
  //     else if ($scope.s_id=='2') {
  //      $scope.s_name="Tennis"
  //     }
  //     $scope.isInplay = false
  //     $('.HLTab').removeClass('select')
  //     $('#highlightTab' + index).addClass('select')
  //     $scope.inplayListData = []
  //     $scope.datacount = []
  //     $scope.oldHighlightlist = []
  //     $scope.Highlightlist = []
  //     // console.log($scope.datacount)
  //     $scope.matchHighlight()
  // }
  // $scope.matchHighlight = function() {
  //     $('.btn-lay').removeClass('blink')
  //     $('.btn-back').removeClass('blink')
  //     if ($scope.s_id == undefined) {
  //         return false
  //     }
  //     $http({
  //             url: ApiUrl + "/Data/Highlights?sid=" + $scope.s_id,
  //             method: "GET",
  //             headers: {
  //                 Token: authtoken
  //             }
  //         })
  //         .then(function mySuccess(response) {
  //             // console.log(response);
  //             if (response.data.data.length < 1) {
  //                 $scope.shoNoEvents = true;
  //             } else {
  //                 $scope.shoNoEvents = false;
  //             }
  //             $scope.Highlightlist = response.data.data;
  //             $('#loading_page').css('display','none');
  //             if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
  //                 $scope.oldHighlightlist = $scope.Highlightlist
  //             }
  //             angular.forEach($scope.Highlightlist, function(item, index) {
  //                 if (item.matchName == $scope.oldHighlightlist[index].matchName) {
  //                     if (item.runner1Back != $scope.oldHighlightlist[index].runner1Back) {
  //                         $('#hback1_' + index).addClass('blink');
  //                     }
  //                     if (item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay) {
  //                         $('#hlay1_' + index).addClass('blink');
  //                     }
  //                     if (item.runner2Back != $scope.oldHighlightlist[index].runner2Back) {
  //                         $('#hback2_' + index).addClass('blink');
  //                     }
  //                     if (item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay) {
  //                         $('#hlay2_' + index).addClass('blink');
  //                     }
  //                     if (item.runner3Back != $scope.oldHighlightlist[index].runner3Back) {
  //                         $('#hback3_' + index).addClass('blink');
  //                     }
  //                     if (item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay) {
  //                         $('#hlay3_' + index).addClass('blink');
  //                     }
  //                 }
  //             })
  //             $scope.oldHighlightlist = $scope.Highlightlist
  //         }, function myError(error) {
  //          if (error.status==401) {
  // $.removeCookie("authtoken");
  // window.location.href="login.html"
  // }
  //         });
  // }
  var highlightTimer;
  $scope.lotusHighlights = function (ID) {
    // var bsHeight = $('.footer').offset().top - $('.rightPanelContent').offset().top;
    // $('.rightPanelContent').css('max-height', bsHeight + 'px');
    // var routesid = $routeParams.rsid;
    // if (sid != routesid) {
    //     $scope.Highlights();
    // }
    // var routesid = $routeParams.sid
    // if (routesid != null) {
    //     sid = routesid
    // }
    // if ($scope.pending_Highlights == true)
    //     return false
    // $scope.pending_Highlights = true
    // if (sid == undefined) {
    //     return false;
    // }
    // if (routesid == 4) $scope.CurentSportSelected = 'Cricket';
    // if (routesid == 1) $scope.CurentSportSelected = 'Soccer';
    // if (routesid == 2) $scope.CurentSportSelected = 'Tennis';
    $http({
      method: "GET",
      url: "https://www.lotusbook.com/api/exchange/odds/eventType/" + ID,
    }).then(
      function success(response) {
        // $('#loader').css('display', 'none');
        // $scope.pending_Highlights = false
        $scope.lhighlightData = $scope.highlightsIdWiseData(
          response.data.result
        );
        // if (oldHighlightdata.length != $scope.Highlightdata.length) {
        //     oldHighlightdata = $scope.Highlightdata;
        // }
        if ($rootScope.fType == 1) {
          $(".lay").removeClass("spark");
          $(".back").removeClass("spark");
          angular.forEach($scope.Highlightdata, function (item, index) {
            if ($scope.CurentSportSelected != item.sportName) {
              $scope.Highlightdata = null;
              $scope.Highlights();
              return false;
            }
            var newdata = $scope.lhighlightData[item.bfId];
            // console.log(newdata)
            if (newdata != undefined) {
              item.status = newdata.status;
              if (newdata.inPlay) {
                item.inPlay = 1;
              } else {
                item.inPlay = 0;
              }
              if (newdata.runners[0].back.length != 0) {
                if (item.runner1Back != newdata.runners[0].back[0].price) {
                  $("#hback1_" + index).addClass("spark");
                }
                item.runner1Back = newdata.runners[0].back[0].price;
              } else {
                item.runner1Back = null;
              }
              if (newdata.runners[0].lay.length != 0) {
                if (item.runner1Lay != newdata.runners[0].lay[0].price) {
                  $("#hlay1_" + index).addClass("spark");
                }
                item.runner1Lay = newdata.runners[0].lay[0].price;
              } else {
                item.runner1Lay = null;
              }
              if (newdata.runners[1].back.length != 0) {
                if (item.runner2Back != newdata.runners[1].back[0].price) {
                  $("#hback2_" + index).addClass("spark");
                }
                item.runner2Back = newdata.runners[1].back[0].price;
              } else {
                item.runner2Back = null;
              }
              if (newdata.runners[1].lay.length != 0) {
                if (item.runner2Lay != newdata.runners[1].lay[0].price) {
                  $("#hlay2_" + index).addClass("spark");
                }
                item.runner2Lay = newdata.runners[1].lay[0].price;
              } else {
                item.runner2Lay = null;
              }
              if (item.runner3Name != null) {
                if (newdata.runners[2].back.length != 0) {
                  if (item.runner3Back != newdata.runners[2].back[0].price) {
                    $("#hback3_" + index).addClass("spark");
                  }
                  item.runner3Back = newdata.runners[2].back[0].price;
                } else {
                  item.runner3Back = null;
                }
                if (newdata.runners[2].lay.length != 0) {
                  if (item.runner3Lay != newdata.runners[2].lay[0].price) {
                    $("#hlay3_" + index).addClass("spark");
                  }
                  item.runner3Lay = newdata.runners[2].lay[0].price;
                } else {
                  item.runner3Lay = null;
                }
              }
            }
          });
          var defaultoldHighlightdata = $scope.Highlightdata;
          oldHighlightdata = defaultoldHighlightdata;
        }
        // $scope.showLoading = false
      },
      function error(response) {
        // $scope.pending_Highlights = false
        if (response.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.highlightsIdWiseData = function (highlights) {
    var newhighlights = {};
    angular.forEach(highlights, function (item, key) {
      newhighlights[item.id] = item;
    });
    return newhighlights;
    // console.log($scope.markets)
  };
  $scope.highlightTimer;
  $scope.lotushighlightTimer;
  $scope.highlightsInterval = function () {
    $scope.Highlights();
    if ($rootScope.fType == 1) {
      $scope.highIntervalVal = 300000;
    } else if ($rootScope.fType == 2) {
      $scope.highIntervalVal = 1000;
    }
    if ($scope.highlightTimer) {
      $interval.cancel($scope.highlightTimer);
    }
    $scope.highlightTimer = $interval(function () {
      $scope.Highlights();
    }, $scope.highIntervalVal);
    if ($scope.lotushighlightTimer) {
      $interval.cancel($scope.lotushighlightTimer);
    }
    $scope.lotushighlightTimer = $interval(function () {
      $scope.lotusHighlights();
    }, 1000);
  };
  $scope.backBetSlipDataArray = [];
  $scope.layBetSlipDataArray = [];
  $scope.backBetSlipList = [];
  $scope.layBetSlipList = [];
  $scope.backBetSlipData = [];
  $scope.layBetSlipData = [];
  $scope.yesBetSlipList = [];
  $scope.noBetSlipList = [];
  $scope.yesBetSlipData = [];
  $scope.noBetSlipData = [];
  $scope.backBookBetSlipList = [];
  $scope.layBookBetSlipList = [];
  $scope.backBookBetSlipData = [];
  $scope.layBookBetSlipData = [];
  // $scope.currRunnerIndex;
  // $scope.active = false;
  $scope.betSlip = function (
    bfId,
    betType,
    betSlipIndex,
    runnerName,
    matchName,
    odds,
    mktid,
    mtid,
    isInplay,
    fancyRate,
    fancyId,
    sportId,
    matchBfId
  ) {
    // console.log(bfId,betType, betSlipIndex, runnerName, matchName, odds, mktid, mtid,isInplay, fancyRate, fancyId,sportId,matchBfId)
    if (localStorage.getItem("oneclick") != "true") {
      $("#betslip_open").removeClass("close");
    }
    $rootScope.betslippanelcss(1);
    if ($scope.pending_oneClickPlaceMOBet == true) {
      return false;
    }
    if (betType == "back" || betType == "lay") {
      $scope.removeAllBetSlip("remove");
    } else {
      $scope.removeAllBetSlip();
    }
    // $scope.currRunnerIndex = runnerIndex;
    if (isInplay == "false") {
      isInplay = 0;
    } else if (isInplay == "true") {
      isInplay = 1;
    }
    $scope.oneClicked = localStorage.getItem("oneclick");
    $scope.betType = betType;
    $scope.runnerName = runnerName;
    $scope.matchName = matchName;
    $scope.odds = odds;
    $scope.mktId = mktid;
    $scope.mtid = mtid;
    $scope.fancyRate = fancyRate;
    $scope.fancyId = fancyId;
    if ($scope.default_stake == undefined) {
      $scope.default_stake = "";
    }
    $scope.stake = $scope.default_stake;
    if ($scope.stake != "" || $scope.stake != 0) {
      if ($scope.betType == "back" || $scope.betType == "lay") {
        $scope.profit = (
          (parseFloat($scope.odds) - 1) *
          parseFloat($scope.stake)
        ).toFixed();
      } else if ($scope.betType == "yes" || $scope.betType == "no") {
        $scope.profit = (
          (parseFloat($scope.fancyRate) * parseFloat($scope.stake)) /
          100
        ).toFixed(2);
      } else if (
        ($scope.betType == "backBook" || $scope.betType == "layBook") &&
        matchBfId == 1
      ) {
        $scope.profit = (
          (parseFloat($scope.odds) / 100) *
          parseFloat($scope.stake)
        ).toFixed(2);
      } else if (
        ($scope.betType == "backBook" || $scope.betType == "layBook") &&
        matchBfId == 2
      ) {
        $scope.profit = (
          (parseFloat($scope.odds) - 1) *
          parseFloat($scope.stake)
        ).toFixed(2);
      }
    } else {
      $scope.profit = "0.00";
    }
    // console.log($scope.backBetSlipList)
    // console.log($scope.layBetSlipList)
    if (betType == "back" || betType == "yes" || betType == "backBook") {
      var backMatcheData = {
        matchname: matchName,
        isInplay: isInplay,
        bfId: bfId,
        booktype: matchBfId,
        marketId: $scope.mktId,
        matchId: $scope.mtid,
        backBetSlipData: [],
        yesBetSlipData: [],
        backBookBetSlipData: [],
      };
      // console.log(backMatcheData);
      $scope.backBetSlipDataArray.push(backMatcheData);
      $scope.backBetSlipDataArray = $scope.removeDuplicates(
        $scope.backBetSlipDataArray
      );
      // console.log($scope.backBetSlipDataArray)
    } else if (betType == "lay" || betType == "no" || betType == "layBook") {
      var layMatcheData = {
        matchname: matchName,
        isInplay: isInplay,
        bfId: bfId,
        booktype: matchBfId,
        marketId: $scope.mktId,
        matchId: $scope.mtid,
        layBetSlipData: [],
        noBetSlipData: [],
        layBookBetSlipData: [],
      };
      // console.log(layMatcheData);
      $scope.layBetSlipDataArray.push(layMatcheData);
      $scope.layBetSlipDataArray = $scope.removeDuplicates(
        $scope.layBetSlipDataArray
      );
      // console.log($scope.layBetSlipDataArray)
    }
    if (
      $scope.oneClicked == "true" &&
      ($scope.betType == "back" || $scope.betType == "lay")
    ) {
      $("#betslip_open").addClass("close");
      $("#processingImg_OneClickBet").css("display", "block");
      var oneClickMOData = {
        backlay: betType,
        sportId: sportId,
        matchBfId: matchBfId,
        bfId: bfId,
        marketId: $scope.mktId,
        matchId: $scope.mtid,
        runnerName: runnerName,
        matchName: matchName,
        odds: odds,
        stake: $scope.oneClickStake[$scope.selected_Stake_btn],
        // profit: $scope.profit
      };
      // console.log(oneClickMOData);
      $scope.oneClickPlaceMOBet(oneClickMOData);
      return false;
    }
    if (
      $scope.oneClicked == "true" &&
      ($scope.betType == "yes" || $scope.betType == "no")
    ) {
      $("#betslip_open").addClass("close");
      $("#processingImg_OneClickBet").css("display", "block");
      var oneClickMOData = {
        matchName: matchName,
        matchBfId: matchBfId,
        mktBfId: bfId,
        marketId: $scope.mktId,
        matchId: $scope.mtid,
        fancyId: fancyId,
        rate: fancyRate,
        runnerName: runnerName,
        score: odds,
        stake: $scope.oneClickStake[$scope.selected_Stake_btn],
        yesno: betType,
      };
      // console.log(oneClickMOData);
      $scope.oneClickPlaceFancyBet(oneClickMOData, betSlipIndex);
      return false;
    }
    if ($scope.betType == "back") {
      var backBetSlipExist = $scope.backBetSlipList.indexOf(betSlipIndex);
      if (backBetSlipExist == -1) {
        var betSlipData = {
          backlay: betType,
          sportId: sportId,
          matchBfId: matchBfId,
          bfId: bfId,
          marketId: $scope.mktId,
          matchId: $scope.mtid,
          runnerName: runnerName,
          matchName: matchName,
          odds: odds,
          stake: $scope.stake,
          profit: $scope.profit,
        };
        // console.log(betSlipData);
        $scope.backBetSlipList.push(betSlipIndex);
        $scope.calcExposure(mktid, betSlipData);
        $.each($scope.backBetSlipDataArray, function (index, value) {
          if (value.matchname == matchName) {
            $scope.backBetSlipDataArray[index].backBetSlipData.push(
              betSlipData
            );
            // console.log($scope.backBetSlipDataArray)
          }
        });
      }
      // $scope.backBetSlipVisible = true;
    } else if ($scope.betType == "lay") {
      var layBetSlipExist = $scope.layBetSlipList.indexOf(betSlipIndex);
      if (layBetSlipExist == -1) {
        var betSlipData = {
          backlay: betType,
          sportId: sportId,
          matchBfId: matchBfId,
          bfId: bfId,
          marketId: $scope.mktId,
          matchId: $scope.mtid,
          runnerName: runnerName,
          matchName: matchName,
          odds: odds,
          stake: $scope.stake,
          profit: $scope.profit,
        };
        // console.log(betSlipData);
        $scope.layBetSlipList.push(betSlipIndex);
        $scope.calcExposure(mktid, betSlipData);
        $.each($scope.layBetSlipDataArray, function (index, value) {
          if (value.matchname == matchName) {
            $scope.layBetSlipDataArray[index].layBetSlipData.push(betSlipData);
            console.log($scope.layBetSlipDataArray);
          }
        });
      }
    } else if ($scope.betType == "yes") {
      var yesBetSlipExist = $scope.yesBetSlipList.indexOf(betSlipIndex);
      if (yesBetSlipExist == -1) {
        var betSlipData = {
          matchName: matchName,
          matchBfId: matchBfId,
          mktBfId: bfId,
          marketId: $scope.mktId,
          matchId: $scope.mtid,
          fancyId: fancyId,
          rate: fancyRate,
          runnerName: runnerName,
          score: odds,
          stake: $scope.stake,
          yesno: betType,
          profit: $scope.profit,
        };
        $scope.yesBetSlipList.push(betSlipIndex);
        $.each($scope.backBetSlipDataArray, function (index, value) {
          if (value.matchname == matchName) {
            $scope.backBetSlipDataArray[index].yesBetSlipData.push(betSlipData);
            console.log($scope.backBetSlipDataArray);
          }
        });
      }
    } else if ($scope.betType == "no") {
      var noBetSlipExist = $scope.noBetSlipList.indexOf(betSlipIndex);
      if (noBetSlipExist == -1) {
        betSlipData = {
          matchName: matchName,
          matchBfId: matchBfId,
          mktBfId: bfId,
          marketId: $scope.mktId,
          matchId: $scope.mtid,
          fancyId: fancyId,
          rate: fancyRate,
          runnerName: runnerName,
          score: odds,
          stake: $scope.stake,
          yesno: betType,
          profit: $scope.profit,
        };
        $scope.noBetSlipList.push(betSlipIndex);
        $.each($scope.layBetSlipDataArray, function (index, value) {
          if (value.matchname == matchName) {
            $scope.layBetSlipDataArray[index].noBetSlipData.push(betSlipData);
            // console.log($scope.layBetSlipDataArray)
          }
        });
      }
    } else if ($scope.betType == "backBook") {
      var backBookBetSlipExist = $scope.backBookBetSlipList.indexOf(
        betSlipIndex
      );
      if (backBookBetSlipExist == -1) {
        var betBookSlipData = {
          matchName: matchName,
          backlay: betType,
          bookId: $scope.mktId,
          eventId: $scope.mtid,
          mktname: bfId,
          // info:",
          odds: odds,
          runnerId: fancyId,
          runnerName: runnerName,
          // source:",
          stake: $scope.stake,
          profit: $scope.profit,
        };
        $scope.backBookBetSlipList.push(betSlipIndex);
        $.each($scope.backBetSlipDataArray, function (index, value) {
          if (value.matchname == matchName) {
            $scope.backBetSlipDataArray[index].backBookBetSlipData.push(
              betBookSlipData
            );
            console.log($scope.backBetSlipDataArray);
          }
        });
      }
    } else if ($scope.betType == "layBook") {
      var layBookBetSlipExist = $scope.layBookBetSlipList.indexOf(betSlipIndex);
      if (layBookBetSlipExist == -1) {
        var betBookSlipData = {
          matchName: matchName,
          backlay: betType,
          bookId: $scope.mktId,
          eventId: $scope.mtid,
          mktname: bfId,
          // info:",
          odds: odds,
          runnerId: fancyId,
          runnerName: runnerName,
          // source:",
          stake: $scope.stake,
          profit: $scope.profit,
        };
        $scope.layBookBetSlipList.push(betSlipIndex);
        $.each($scope.layBetSlipDataArray, function (index, value) {
          if (value.matchname == matchName) {
            $scope.layBetSlipDataArray[index].layBookBetSlipData.push(
              betBookSlipData
            );
            console.log($scope.layBetSlipDataArray);
          }
        });
      }
    }
    $scope.calculateLiability();
  };

  $scope.backTeenSlipDataArray = [];
  $rootScope.cards = [];
  $scope.openTeenbetSlip = function (
    event,
    backlay,
    odds,
    runnerName,
    runnerId,
    gameId,
    gameType,
    matchName,
    sportId,
    runnerindex,
    card
  ) {
    if ($scope.oneClicked != "true") {
      $("#betslip_open").removeClass("close");
    }

    if (backlay == "back" || backlay == "lay") {
      $scope.removeAllBetSlip("remove");
    } else {
      $scope.removeAllBetSlip();
    }

    if ($scope.placeTPData) {
      if ($scope.placeTPData.backlay != backlay) {
        $scope.removeAllBetSlip();
      }
    }

    // console.log(backlay, odds, runnerName, runnerId, gameId, gameType);
    $scope.placeTPData = {
      backlay: backlay,
      gameType: gameType,
      odds: odds,
      runnerName: runnerName,
      runnerId: runnerId,
      stake: 0,
      profit: 0,
      gameId: gameId,
      matchname: matchName,
    };
    if (card) {
      if ($rootScope.cards.length < 3) {
        let indexcheck = $rootScope.cards.indexOf(card);
        if (indexcheck == -1) {
          $rootScope.cards.push(card);
        }
      }
    }

    if ($rootScope.cards.length != 0) {
      $scope.placeTPData["cards"] = $rootScope.cards;
      $scope.placeTPData.runnerName =
        $scope.placeTPData.runnerName +
        " " +
        $scope.placeTPData.cards.toString().replace(/,/g, "");
    }
    $scope.backTeenSlipDataArray.push($scope.placeTPData);
    $scope.backTeenSlipDataArray = $scope.removeDuplicates(
      $scope.backTeenSlipDataArray
    );
    // console.log($scope.placeTPData,'Teenpatti placeBet Data');
    // console.log($scope.backTeenSlipDataArray,'backTeenSlipDataArra ');
  };

  $scope.selected3cardj = function (card, backlay) {
    let selected = false;
    if (!$scope.placeTPData) {
      return selected;
    }
    if (!$scope.placeTPData.cards) {
      return selected;
    }

    if ($scope.placeTPData.backlay === backlay) {
      // card = card.toString();
      let indexcheck = $scope.placeTPData.cards.indexOf(card);
      if (indexcheck > -1) {
        return (selected = true);
      }
    }
  };

  $rootScope.fancystake = [500, 1000, 2000, 5000, 10000, 20000];
  $scope.fancybetSlip = function (
    betType,
    betSlipIndex,
    runnerName,
    matchName,
    odds,
    mktid,
    mtid,
    isInplay,
    fancyRate,
    fancyId,
    sportId,
    matchBfId,
    bfId
  ) {
    // console.log(betType, betSlipIndex, runnerName, matchName, odds, mktid, mtid,isInplay, fancyRate, fancyId,sportId,matchBfId);
    $scope.Odds = parseInt(odds).toFixed(0);
    $scope.fancyRate = parseInt(fancyRate).toFixed(0);
    // console.log($scope.Odds,$scope.fancyRate);
    $scope.oneClicked = localStorage.getItem("oneclick");
    $("#fancyBetMarketList .lay-1").removeClass("select");
    $("#fancyBetMarketList .back-1").removeClass("select");
    $("#fancyBetMarketList .fancy-quick-tr").css("display", "none");
    $("#inputStake_NO_" + fancyId + "").val("");
    $("#inputStake_YES_" + fancyId + "").val("");
    $("#placeBet_YES_" + fancyId + "").addClass("disable");
    $("#placeBet_NO_" + fancyId + "").addClass("disable");
    $("#after .to-win").css("display", "inline");
    if ($scope.oneClicked == null) {
      if (betType == "no") {
        $("#lay_" + fancyId + "").addClass("select");
        $("#fancyBetBoard_" + fancyId + "_lay").css("display", "table-row");
      } else {
        $("#back_" + fancyId + "").addClass("select");
        $("#fancyBetBoard_" + fancyId + "_back").css("display", "table-row");
      }
    } else {
      $scope.oneclickbetdata = {
        fancyId: fancyId,
        info:
          "os:" +
          jscd.os +
          ", os_version:" +
          jscd.osVersion +
          ", browser:" +
          jscd.browser +
          ", browser_version:" +
          jscd.browserMajorVersion,
        matchBfId: matchBfId,
        matchId: mtid,
        rate: $scope.fancyRate,
        runnerName: runnerName,
        score: $scope.Odds,
        source: "web",
        stake: $scope.oneClickStake[$scope.selected_Stake_btn],
        yesno: betType,
        mktBfId: bfId,
        marketId: mktid,
      };
      $scope.OneclickFancyBet($scope.oneclickbetdata);
    }
  };
  $rootScope.removefancybetslip = function (betslipid, betstype) {
    if (betstype == "no") {
      $("#fancyBetBoard_" + betslipid + "_lay").css("display", "none");
      $("#fancyBetMarketList .lay-1").removeClass("select");
    } else {
      $("#fancyBetMarketList .back-1").removeClass("select");
      $("#fancyBetBoard_" + betslipid + "_back").css("display", "none");
    }
    if (betstype == "") {
      $("#fancyBetMessage_" + betslipid).css("display", "none");
      // $("#fancyBetMarketList .back-1").removeClass("select");
      //    $("#fancyBetBoard_"+betslipid+"_back").css("display","none");
      //    $("#fancyBetMarketList .lay-1").removeClass("select");
      //    $("#fancyBetBoard_"+betslipid+"_lay").css("display","none");
    }
  };
  $rootScope.removeRunningfancybetslip = function (betslipid) {
    if ($("#lay_" + betslipid + "").hasClass("select")) {
      $("#lay_" + betslipid + "").removeClass("select");
    }
    if ($("#back_" + betslipid + "").hasClass("select")) {
      $("#back_" + betslipid + "").removeClass("select");
    }
    $("#fancyBetBoard_" + betslipid + "_lay").css("display", "none");
    $("#fancyBetBoard_" + betslipid + "_back").css("display", "none");
    $("#fancyBetMessage_" + betslipid).css("display", "none");
  };
  $rootScope.progressdata = {
    progress: 0,
  };
  $rootScope.remainsecs = 3;
  $scope.progress = function () {
    if ($rootScope.progressdata.progress < 100) {
      $timeout(function () {
        $rootScope.progressdata.progress += 2;
        $scope.progress();
      }, 100);
    } else {
      $rootScope.progressdata.progress = 0;
    }
  };
  $scope.remainseconds = function () {
    if ($rootScope.remainsecs >= 0) {
      $timeout(function () {
        $rootScope.remainsecs -= 1;
        $scope.remainseconds();
      }, 1000);
    } else {
      $rootScope.remainsecs = 3;
    }
  };
  $scope.selectStake = function (stake, fancyId, selectiontype) {
    if (selectiontype == "no") {
      $("#inputStake_NO_" + fancyId + "").val(stake);
      $("#placeBet_NO_" + fancyId + "").removeClass("disable");
    } else {
      $("#inputStake_YES_" + fancyId + "").val(stake);
      $("#placeBet_YES_" + fancyId + "").removeClass("disable");
    }
  };
  $scope.FancyStakechange = function (stake, fancyId) {
    // console.log(stake)
    if (stake == null || stake == undefined) {
      $("#placeBet_YES_" + fancyId + "").addClass("disable");
    } else {
      $("#placeBet_YES_" + fancyId + "").removeClass("disable");
    }
    if (stake == null || stake == undefined) {
      $("#placeBet_NO_" + fancyId + "").addClass("disable");
    } else {
      $("#placeBet_NO_" + fancyId + "").removeClass("disable");
    }
  };
  $scope.placeFancyBet = function (
    betType,
    betSlipIndex,
    runnerName,
    matchName,
    odds,
    mktid,
    mtid,
    isInplay,
    fancyRate,
    fancyId,
    sportId,
    matchBfId,
    bfId
  ) {
    // console.log(betType, betSlipIndex, runnerName, matchName, odds, mktid, mtid,isInplay, fancyRate, fancyId,sportId,matchBfId,bfId);
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      $("#loginBox").css("display", "block");
      return false;
    }
    $scope.Odds = parseInt(odds).toFixed(0);
    $scope.fancyRate = parseInt(fancyRate).toFixed(0);
    var stake;
    if (betType == "no") {
      stake = $("#inputStake_NO_" + fancyId + "").val();
      $("#placeBet_NO_" + fancyId + "").attr("disabled");
    } else {
      stake = $("#inputStake_YES_" + fancyId + "").val();
      $("#placeBet_YES_" + fancyId + "").attr("disabled");
    }
    $scope.betdata = {
      fancyId: fancyId,
      info:
        "os:" +
        jscd.os +
        ", os_version:" +
        jscd.osVersion +
        ", browser:" +
        jscd.browser +
        ", browser_version:" +
        jscd.browserMajorVersion,
      matchBfId: matchBfId,
      matchId: mtid,
      rate: $scope.fancyRate,
      runnerName: runnerName,
      score: $scope.Odds,
      source: "web",
      stake: stake,
      yesno: betType,
      mktBfId: bfId,
      marketId: mktid,
    };
    $scope.removefancybetslip(fancyId, betType);
    $("#fancyBetBar_" + fancyId + "").css("display", "table-row");
    $scope.progress();
    $scope.remainseconds();
    $timeout(function () {
      $http({
        url: ApiUrl + "/Bets/PlaceFancyBet",
        method: "POST",
        headers: {
          Token: authtoken,
        },
        data: $scope.betdata,
      }).then(
        function mySuccess(response) {
          if (
            response.data.status == "Success" &&
            response.data.result == "Bet placed successfully!!"
          ) {
            $scope.Fund();
            $rootScope.getFancyExposure(fancyId, runnerName);
            $("#fancyBetBar_" + fancyId + "").css("display", "none");
            $("#betslip_open").addClass("close");
            $("#header_" + fancyId).text(response.data.result);
            $(
              "#fancyBetMessage_" + fancyId + " .quick_bet-message"
            ).removeClass("error");
            $("#fancyBetMessage_" + fancyId + " .quick_bet-message").addClass(
              "success"
            );
            $("#fancyBetMessage_" + fancyId + "").css("display", "table-row");
            $("#placeBet_YES_" + fancyId + "").removeAttr("disabled");
            $("#placeBet_NO_" + fancyId + "").removeAttr("disabled");
          } else {
            $("#header_" + fancyId).text(response.data.result);
            $("#fancyBetBar_" + fancyId + "").css("display", "none");
            $(
              "#fancyBetMessage_" + fancyId + " .quick_bet-message"
            ).removeClass("success");
            $("#fancyBetMessage_" + fancyId + " .quick_bet-message").addClass(
              "error"
            );
            $("#fancyBetMessage_" + fancyId + "").css("display", "table-row");
            $("#placeBet_YES_" + fancyId + "").removeAttr("disabled");
            $("#placeBet_NO_" + fancyId + "").removeAttr("disabled");
          }
          $rootScope.betslippanelcss();
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
          if (error.status == 400) {
            toastr.error("Unable to Place Bet!");
          }
        }
      );
    }, 1000);
  };
  $scope.showinfobet = false;
  $scope.showinfobetfunc = function (sbetinfo) {
    if (sbetinfo) {
      $("#Matchedbets .matched").css("display", "block");
    } else {
      $("#Matchedbets .matched").css("display", "none");
    }
  };
  $scope.showinfobet = false;
  $scope.consolidatefunc = function (consoli) {
    if (consoli) {
      $("#Matchedbets .consolidated").css("display", "block");
    } else {
      $("#Matchedbets .consolidated").css("display", "none");
    }
  };
  $scope.OneclickFancyBet = function (betdata) {
    $("#fancyBetBar_" + betdata.fancyId + "").css("display", "table-row");
    // $scope.progress();
    // $scope.remainseconds();
    $timeout(function () {
      $http({
        url: ApiUrl + "/Bets/PlaceFancyBet",
        method: "POST",
        headers: {
          Token: authtoken,
        },
        data: betdata,
      }).then(
        function mySuccess(response) {
          if (
            response.data.status == "Success" &&
            response.data.result == "Bet placed successfully!!"
          ) {
            $scope.Fund();
            $rootScope.getFancyExposure(betdata.fancyId, betdata.runnerName);
            $("#fancyBetBar_" + betdata.fancyId + "").css("display", "none");
            $("#betslip_open").addClass("close");
            $("#header_" + betdata.fancyId).text(response.data.result);
            $(
              "#fancyBetMessage_" + betdata.fancyId + " .quick_bet-message"
            ).removeClass("error");
            $(
              "#fancyBetMessage_" + betdata.fancyId + " .quick_bet-message"
            ).addClass("success");
            $("#fancyBetMessage_" + betdata.fancyId + "").css(
              "display",
              "table-row"
            );
          } else {
            $("#fancyBetBar_" + betdata.fancyId + "").css("display", "none");
            $("#header_" + betdata.fancyId).text(response.data.result);
            $(
              "#fancyBetMessage_" + betdata.fancyId + " .quick_bet-message"
            ).removeClass("success");
            $(
              "#fancyBetMessage_" + betdata.fancyId + " .quick_bet-message"
            ).addClass("error");
            $("#fancyBetMessage_" + betdata.fancyId + "").css(
              "display",
              "table-row"
            );
          }
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    }, 1000);
  };

  $scope.myMarkets = function () {
    $("#myMarketModal").css("display", "block");
    $http({
      url: ApiUrl + "/Bets/MyMarket",
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        $scope.MyMarketData = response.data.data;
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.myMarketClose = function () {
    $("#myMarketModal").css("display", "none");
  };
  $scope.multimarketIds = [];
  $rootScope.addMultiMkt = function (marketid) {
    let mktID = parseInt(marketid);
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      $("#loginBox").css("display", "block");
      return false;
    }
    if ($scope.multimarketIds.indexOf(mktID) == -1) {
      $scope.multimarketIds.push(mktID);
    }
    localStorage.setItem("Multimarkets", JSON.stringify($scope.multimarketIds));
    toastr.success("Added to Multimarkets!");
  };
  $rootScope.removeMultiMkt = function (marketid) {
    let mktID = parseInt(marketid);
    $scope.multimarkets = JSON.parse(localStorage.getItem("Multimarkets"));
    $scope.multimarketIds = $scope.multimarkets;
    if ($scope.multimarketIds.indexOf(mktID) > -1) {
      $scope.multimarketIds.splice($scope.multimarkets.indexOf(mktID), 1);
    }
    localStorage.setItem("Multimarkets", JSON.stringify($scope.multimarketIds));
    if ($location.path().split("/").indexOf("multiMarkets") > -1) {
      $rootScope.unsubscribesinglemultimkt(mktID);
      $rootScope.getMultiMarkets();
    }
    toastr.success("Removed From Multimarkets!");
  };
  $scope.ismulticheck = function () {
    $scope.multimarkets = JSON.parse(localStorage.getItem("Multimarkets"));
    if ($scope.multimarkets != null) {
      if ($scope.multimarkets.indexOf(parseInt($routeParams.marketId)) > -1) {
        $rootScope.ismultimkt = true;
      } else {
        $rootScope.ismultimkt = false;
      }
    } else {
      $rootScope.ismultimkt = false;
    }
  };
  $interval(function () {
    $scope.ismulticheck();
  }, 1000);
  $scope.oneClickStake = [100, 200, 300, 500];
  $scope.changeStakeVal = function (val, index) {
    // console.log(val,index)
    $scope.oneClickStake[index] = val;
    // console.log($scope.oneClickStake)
  };
  $scope.showOneClickEdit = function () {
    $("#oneClickBetStakeBox").css("display", "none");
    $("#editOneClickBetStakeBox").css("display", "block");
    // $scope.editStake=true
    // $scope.editStake=true
  };
  $scope.selected_Stake_btn = 0;
  $scope.selectStakeButton = function (index) {
    $scope.selected_Stake_btn = index;
  };
  $scope.getOneClickStake = function () {
    $http({
      url: ApiUrl + "/Settings/GetOneClickStake",
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          if (response.data.data != null) {
            $scope.oneClickStake[0] = response.data.data.stake1;
            $scope.oneClickStake[1] = response.data.data.stake2;
            $scope.oneClickStake[2] = response.data.data.stake3;
            $scope.oneClickStake[3] = response.data.data.stake4;
          }
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.saveOneClickStake = function () {
    if (
      $scope.oneClickStake[0] == "" ||
      $scope.oneClickStake[1] == "" ||
      $scope.oneClickStake[2] == "" ||
      $scope.oneClickStake[3] == ""
    ) {
      toastr.error("Please Enter stake value!");
      return false;
    }
    var OneClickStakeData = {
      stake1: $scope.oneClickStake[0],
      stake2: $scope.oneClickStake[1],
      stake3: $scope.oneClickStake[2],
      stake4: $scope.oneClickStake[3],
    };
    $http({
      url: ApiUrl + "/Settings/SaveOneClickStake",
      method: "POST",
      data: JSON.stringify(OneClickStakeData),
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          toastr.success(response.data.result);
          $scope.getOneClickStake();
          $("#oneClickBetStakeBox").css("display", "block");
          $("#editOneClickBetStakeBox").css("display", "none");
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.cancelSetting = function () {
    if ($scope.show_close == false) {
      toastr.error("Please Click On 'OK' First Then Click On 'SAVE' Button");
      return false;
    } else {
      $("#login-content").css("display", "none");
    }
  };
  $scope.SaveSetting = function () {
    if ($scope.show_close == false) {
      toastr.error("Please Click On 'OK' First Then Click On 'SAVE' Button");
      return false;
    }
    if ($scope.oddsval == true) {
      $scope.oddsvalchk = 1;
    } else {
      $scope.oddsvalchk = 0;
    }
    if ($scope.default_stake == "") {
      $scope.default_stake = 0;
    }
    $http({
      url:
        ApiUrl +
        "/Settings/SaveSetting?s=" +
        $scope.default_stake +
        "&o=" +
        $scope.oddsvalchk,
      method: "POST",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        if (response.data.result == "Bet stake settings saved successfully") {
          $scope.GetSettings();
          toastr.success(response.data.result);
          $("#login-content").css("display", "none");
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.removeDuplicates = function (json_all) {
    var arr = [],
      collection = [];
    $.each(json_all, function (index, value) {
      if ($.inArray(value.matchname, arr) == -1) {
        arr.push(value.matchname);
        collection.push(value);
      }
    });
    return collection;
  };
  $scope.oneClickPlaceMOBet = function (betData) {
    $("#loading_place_bet").css("display", "block");
    $("#betslip_open").removeClass("close");
    betData["source"] = "web";
    betData["info"] =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    $scope.removeAllBetSlip();
    // console.log(betData)
    $http({
      method: "POST",
      url: ApiUrl + "/Bets/PlaceMOBet",
      headers: {
        Token: authtoken,
      },
      data: betData,
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $("#processingImg_OneClickBet").css("display", "none");
          $("#loading_place_bet").css("display", "none");
          $("#betslip_open").addClass("close");
          $scope.Fund();
          $rootScope.ExposureBook(betData.marketId);
          toastr.success(response.data.result);
        } else {
          toastr.error(response.data.result);
          $("#processingImg_OneClickBet").css("display", "none");
          $("#loading_place_bet").css("display", "none");
          $("#betslip_open").addClass("close");
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };

  $scope.oneClickPlaceFancyBet = function (betData) {
    $("#loading_place_bet").css("display", "block");
    $("#betslip_open").removeClass("close");
    betData["source"] = "web";
    betData["info"] =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    $scope.removeAllBetSlip();
    // console.log(betData)
    $http({
      method: "POST",
      url: ApiUrl + "/Bets/PlaceFancyBet",
      headers: {
        Token: authtoken,
      },
      data: betData,
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $rootScope.$emit("callFancyExp", {});
          $("#processingImg_OneClickBet").css("display", "none");
          $("#loading_place_bet").css("display", "none");
          $("#betslip_open").addClass("close");
          $scope.Fund();
          toastr.success(response.data.result);
        } else {
          toastr.error(response.data.result);
          $("#processingImg_OneClickBet").css("display", "none");
          $("#loading_place_bet").css("display", "none");
          $("#betslip_open").addClass("close");
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.clearStake = function (bet) {
    // console.log(bet)
    bet.stake = "";
    bet.profit = "0.00";
    $scope.calculateLiability();
    // if( type == "back"){
    // }
    // $('#backStake'+index).val("")
  };
  $scope.onKeyUp = function (value, backlay, index, parentIndex, id) {
    if (backlay == "back") {
      $scope.backBetSlipDataArray[parentIndex].backBetSlipData[
        index
      ].odds = value;
      var stake =
        $scope.backBetSlipDataArray[parentIndex].backBetSlipData[index].stake;
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat(value) - 1) * parseFloat(stake);
      $scope.backBetSlipDataArray[parentIndex].backBetSlipData[
        index
      ].profit = pnl.toFixed(2);
    } else if (backlay == "lay") {
      $scope.layBetSlipDataArray[parentIndex].layBetSlipData[
        index
      ].odds = value;
      var stake =
        $scope.layBetSlipDataArray[parentIndex].layBetSlipData[index].stake;
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat(value) - 1) * parseFloat(stake);
      $scope.layBetSlipDataArray[parentIndex].layBetSlipData[
        index
      ].profit = pnl.toFixed(2);
    }
    if (backlay == "BACK") {
      // $("#oddsBackUM_"+id+"").val(value);
      var stake = $("#inputStakeBackUM_" + id + "").val();
      if (stake == "") {
        stake = 0;
      }
      if (parseFloat($("#oddsBackUM_" + id + "").val()) <= 1.01) {
        $("#oddsBackUM_" + id + "").val(1.01);
      }
      var pnl =
        (parseFloat($("#oddsBackUM_" + id + "").val()) - 1) * parseFloat(stake);
      $("#profitLiabilityBackUM_" + id + "").text(pnl.toFixed(2));
    } else if (backlay == "LAY") {
      // $("#oddsLayUM_"+id+"").val(value);
      var stake = $("#inputStakeLayUM_" + id + "").val();
      if (stake == "") {
        stake = 0;
      }
      if (parseFloat($("#oddsLayUM_" + id + "").val()) <= 1.01) {
        $("#oddsLayUM_" + id + "").val(1.01);
      }
      var pnl =
        (parseFloat($("#oddsLayUM_" + id + "").val(value)) - 1) *
        parseFloat(stake);
      $("#profitLiabilityLayUM_" + id + "").text(pnl.toFixed(2));
    }
  };
  $scope.incrementOdd = function (val, backlay, index, parentIndex) {
    $scope.currentOdds = parseFloat(val);
    $scope.diff = $scope.oddsDiffCalculate($scope.currentOdds);
    $scope.newOdds = $scope.currentOdds + $scope.diff;
    $scope.newOdds = $scope.newOdds.toFixed(2);
    if (backlay == "back" || backlay == "BACK") {
      $scope.backBetSlipDataArray[parentIndex].backBetSlipData[index].odds =
        $scope.newOdds;
      var stake =
        $scope.backBetSlipDataArray[parentIndex].backBetSlipData[index].stake;
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      // if (isNaN(pnl)) {
      //  pnl='0.00';
      // }
      $scope.backBetSlipDataArray[parentIndex].backBetSlipData[
        index
      ].profit = pnl.toFixed(2);
      // console.log($scope.backBetSlipDataArray)
    } else if (backlay == "lay" || backlay == "LAY") {
      $scope.layBetSlipDataArray[parentIndex].layBetSlipData[index].odds =
        $scope.newOdds;
      var stake =
        $scope.layBetSlipDataArray[parentIndex].layBetSlipData[index].stake;
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      $scope.layBetSlipDataArray[parentIndex].layBetSlipData[
        index
      ].profit = pnl.toFixed(2);
      // console.log($scope.layBetSlipDataArray)
    }
    $scope.calcExposure($scope.ExpoMktid, $scope.bets);
  };
  $scope.incrementoddUM = function (odds, backlay, index, prestake, preodds) {
    if (backlay == "BACK") {
      $scope.currentOdds = $("#oddsBackUM_" + index + "").val();
    } else {
      $scope.currentOdds = $("#oddsLayUM_" + index + "").val();
    }
    $scope.diff = $scope.oddsDiffCalculate($scope.currentOdds);
    $scope.newOdds = parseFloat($scope.currentOdds) + $scope.diff;
    $scope.newOdds = $scope.newOdds.toFixed(2);
    if (backlay == "BACK") {
      $("#oddsBackUM_" + index + "").val($scope.newOdds);
      var stake = $("#inputStakeBackUM_" + index + "").val();
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      $("#profitLiabilityBackUM_" + index + "").text(pnl.toFixed(2));
    }
    if (backlay == "LAY") {
      $("#oddsLayUM_" + index + "").val($scope.newOdds);
      var stake = $("#inputStakeLayUM_" + index + "").val();
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      $("#profitLiabilityLayUM_" + index + "").text(pnl.toFixed(2));
    }
  };
  $scope.decrementOdd = function (val, backlay, index, parentIndex) {
    // var currentOdds=parseFloat($(this).val())
    // console.log(val)
    // console.log(backlay)
    // console.log(index)
    // console.log(parentIndex)
    if (val <= 1.01) {
      $scope.backBet.odds = 1.01;
      $scope.layBet.odds = 1.01;
    }
    $scope.currentOdds = parseFloat(val);
    $scope.diff = $scope.oddsDiffCalculate($scope.currentOdds);
    $scope.newOdds = $scope.currentOdds - $scope.diff;
    $scope.newOdds = $scope.newOdds.toFixed(2);
    if (backlay == "back") {
      $scope.backBetSlipDataArray[parentIndex].backBetSlipData[index].odds =
        $scope.newOdds;
      var stake =
        $scope.backBetSlipDataArray[parentIndex].backBetSlipData[index].stake;
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      // if (isNaN(pnl)) {
      //  pnl='0.00';
      // }
      $scope.backBetSlipDataArray[parentIndex].backBetSlipData[
        index
      ].profit = pnl.toFixed(2);
      // console.log($scope.backBetSlipDataArray)
    } else if (backlay == "lay") {
      $scope.layBetSlipDataArray[parentIndex].layBetSlipData[index].odds =
        $scope.newOdds;
      var stake =
        $scope.layBetSlipDataArray[parentIndex].layBetSlipData[index].stake;
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      // if (isNaN(pnl)) {
      //  pnl='0.00';
      // }
      $scope.layBetSlipDataArray[parentIndex].layBetSlipData[
        index
      ].profit = pnl.toFixed(2);
      // console.log($scope.layBetSlipDataArray)
    }
    $scope.calcExposure($scope.ExpoMktid, $scope.bets);
  };
  $scope.decrementOddUM = function (odds, backlay, index, prestake, preodds) {
    if (backlay == "BACK") {
      $scope.currentOdds = $("#oddsBackUM_" + index + "").val();
    } else {
      $scope.currentOdds = $("#oddsLayUM_" + index + "").val();
    }
    $scope.diff = $scope.oddsDiffCalculate($scope.currentOdds);
    $scope.newOdds = parseFloat($scope.currentOdds) - $scope.diff;
    $scope.newOdds = $scope.newOdds.toFixed(2);
    if (backlay == "BACK") {
      if (parseFloat($scope.newOdds) <= 1.01) {
        $("#oddsBackUM_" + index + "").val(1.01);
      } else {
        $("#oddsBackUM_" + index + "").val($scope.newOdds);
      }
      var stake = $("#inputStakeBackUM_" + index + "").val();
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      $("#profitLiabilityBackUM_" + index + "").text(pnl.toFixed(2));
    }
    if (backlay == "LAY") {
      if (parseFloat($scope.newOdds) <= 1.01) {
        $("#oddsLayUM_" + index + "").val(1.01);
      } else {
        $("#oddsLayUM_" + index + "").val($scope.newOdds);
      }
      var stake = $("#inputStakeLayUM_" + index + "").val();
      if (stake == "") {
        stake = 0;
      }
      var pnl = (parseFloat($scope.newOdds) - 1) * parseFloat(stake);
      $("#profitLiabilityLayUM_" + index + "").text(pnl.toFixed(2));
    }
  };
  $scope.oddsDiffCalculate = function (currentOdds) {
    var diff;
    if (currentOdds < 2) {
      diff = 0.01;
    } else if (currentOdds < 3) {
      diff = 0.02;
    } else if (currentOdds < 4) {
      diff = 0.05;
    } else if (currentOdds < 6) {
      diff = 0.1;
    } else if (currentOdds < 10) {
      diff = 0.2;
    } else if (currentOdds < 20) {
      diff = 0.5;
    } else if (currentOdds < 30) {
      diff = 1.0;
    } else {
      diff = 2.0;
    }
    return diff;
  };
  $scope.cancelAllUnMatchbet = function () {
    $("#unMatchTicketList").css("display", "block");
    $("#unMatchFullBtn").css("display", "block");
    $("#editUnMatchedList").css("display", "none");
  };
  $scope.editAllUMBets = function () {
    angular.forEach($scope.unMatchedData, function (item) {
      $("#oddsBackUM_" + item.id + "").val(item.odds);
      $("#inputStakeBackUM_" + item.id + "").val(item.stake);
      $("#oddsLayUM_" + item.id + "").val(item.odds);
      $("#inputStakeLayUM_" + item.id + "").val(item.stake);
      var pnl = (parseFloat(item.odds) - 1) * parseFloat(item.stake);
      $("#profitLiabilityBackUM_" + item.id + "").text(pnl.toFixed(2));
      $("#profitLiabilityLayUM_" + item.id + "").text(pnl.toFixed(2));
    });
    $("#unMatchTicketList").css("display", "none");
    $("#unMatchFullBtn").css("display", "none");
    $("#editUnMatchedList").css("display", "block");
  };
  $scope.resetUMbet = function (index, id, backlay, odds, stake) {
    if (backlay == "BACK") {
      $("#oddsBackUM_" + id + "").val(odds);
      $("#inputStakeBackUM_" + id + "").val(stake);
      var pnl = (parseFloat(odds) - 1) * parseFloat(stake);
      $("#profitLiabilityBackUM_" + id + "").text(pnl.toFixed(2));
    } else {
      $("#oddsLayUM_" + id + "").val(odds);
      $("#inputStakeLayUM_" + id + "").val(stake);
      var pnl = (parseFloat(odds) - 1) * parseFloat(stake);
      $("#profitLiabilityLayUM_" + id + "").text(pnl.toFixed(2));
    }
    // $("#unMatchTicketList").css('display','block');
    // $("#unMatchFullBtn").css('display','block');
    // $("#editUnMatchedList").css('display','none');
  };
  $scope.EditMOBet = function (index, id, backlay) {
    if (backlay == "BACK") {
      $scope.OddsUM = $("#oddsBackUM_" + id + "").val();
      $scope.StakeUM = $("#inputStakeBackUM_" + id + "").val();
    } else {
      $scope.OddsUM = $("#oddsLayUM_" + id + "").val();
      $scope.StakeUM = $("#inputStakeLayUM_" + id + "").val();
    }
    $scope.source = "web";
    $scope.info =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    $scope.betData = {
      betId: id,
      info: $scope.info,
      odds: $scope.OddsUM,
      source: $scope.source,
      stake: $scope.StakeUM,
    };
    $http({
      method: "POST",
      url: ApiUrl + "/Bets/EditMOBet",
      headers: {
        Token: authtoken,
      },
      data: $scope.betData,
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $scope.Fund();
          toastr.success(response.data.result);
          $("#processingImg_OneClickBet").css("display", "none");
          $("#unMatchTicketList").css("display", "block");
          $("#unMatchFullBtn").css("display", "block");
          $("#editUnMatchedList").css("display", "none");
        } else {
          toastr.error(response.data.result);
          $("#processingImg_OneClickBet").css("display", "none");
          $("#unMatchTicketList").css("display", "block");
          $("#unMatchFullBtn").css("display", "block");
          $("#editUnMatchedList").css("display", "none");
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.closeBetSlip = function (index, type, parentIndex) {
    // console.log(index, type)
    if (type == "back") {
      $scope.backBetSlipList.splice(index, 1);
      $scope.backBetSlipDataArray[parentIndex].backBetSlipData.splice(index, 1);
      if ($scope.ExpoMktid != undefined) {
        $scope.bets.stake = 0;
        $scope.bets.profit = 0;
      }
      $scope.calcExposure($scope.ExpoMktid, $scope.bets, "remove");
    } else if (type == "lay") {
      $scope.layBetSlipList.splice(index, 1);
      $scope.layBetSlipDataArray[parentIndex].layBetSlipData.splice(index, 1);
      if ($scope.ExpoMktid != undefined) {
        $scope.bets.stake = 0;
        $scope.bets.profit = 0;
      }
      $scope.calcExposure($scope.ExpoMktid, $scope.bets, "remove");
    }
    if (type == "backBook") {
      $scope.backBookBetSlipList.splice(index, 1);
      $scope.backBetSlipDataArray[parentIndex].backBookBetSlipData.splice(
        index,
        1
      );
    } else if (type == "layBook") {
      $scope.layBookBetSlipList.splice(index, 1);
      $scope.layBetSlipDataArray[parentIndex].layBookBetSlipData.splice(
        index,
        1
      );
    }
    if (type == "yes") {
      $scope.yesBetSlipList.splice(index, 1);
      $scope.backBetSlipDataArray[parentIndex].yesBetSlipData.splice(index, 1);
    } else if (type == "no") {
      $scope.noBetSlipList.splice(index, 1);
      $scope.layBetSlipDataArray[parentIndex].noBetSlipData.splice(index, 1);
    }
    if (type == "back" || type == "yes" || type == "backBook") {
      if (
        $scope.backBetSlipDataArray[parentIndex].backBetSlipData.length == 0 &&
        $scope.backBetSlipDataArray[parentIndex].yesBetSlipData.length == 0 &&
        $scope.backBetSlipDataArray[parentIndex].backBookBetSlipData.length == 0
      ) {
        // console.log($scope.backBetSlipDataArray.length)
        $scope.backBetSlipDataArray.splice(parentIndex, 1);
      }
    } else if (type == "Teenback") {
      $scope.backTeenSlipDataArray.splice(index, 1);
      $rootScope.cards = [];
      $scope.placeTPData = null;
    } else {
      if (
        $scope.layBetSlipDataArray[parentIndex].layBetSlipData.length == 0 &&
        $scope.layBetSlipDataArray[parentIndex].noBetSlipData.length == 0 &&
        $scope.layBetSlipDataArray[parentIndex].layBookBetSlipData.length == 0
      ) {
        // console.log($scope.backBetSlipDataArray.length)
        $scope.layBetSlipDataArray.splice(parentIndex, 1);
      }
    }
    $scope.calculateLiability();
  };
  $scope.liabilities = "0.00";
  $scope.calculateLiability = function () {
    $scope.liabilities = 0.0;
    $scope.liabilityBack = 0.0;
    $scope.liabilityBackBook = 0.0;
    $scope.liabilityYes = 0.0;
    $scope.liabilityLay = 0.0;
    $scope.liabilityLayBook = 0.0;
    $scope.liabilityNo = 0.0;
    $scope.stake = 0;
    angular.forEach($scope.backBetSlipDataArray, function (item) {
      angular.forEach(item.backBetSlipData, function (item) {
        $scope.stake = item.stake;
        if ($scope.stake == "") {
          $scope.stake = 0;
        }
        $scope.liabilityBack = (
          parseFloat($scope.liabilityBack) + parseFloat($scope.stake)
        ).toFixed(2);
      });
      angular.forEach(item.yesBetSlipData, function (item) {
        $scope.stake = item.stake;
        if ($scope.stake == "") {
          $scope.stake = 0;
        }
        $scope.liabilityYes = (
          parseFloat($scope.liabilityYes) + parseFloat($scope.stake)
        ).toFixed(2);
      });
      angular.forEach(item.backBookBetSlipData, function (item) {
        $scope.stake = item.stake;
        if ($scope.stake == "") {
          $scope.stake = 0;
        }
        $scope.liabilityBackBook = (
          parseFloat($scope.liabilityBackBook) + parseFloat($scope.stake)
        ).toFixed(2);
      });
    });
    angular.forEach($scope.layBetSlipDataArray, function (item) {
      angular.forEach(item.layBetSlipData, function (item) {
        $scope.stake = item.stake;
        if ($scope.stake == "") {
          $scope.stake = 0;
        }
        $scope.liabilityLay = (
          parseFloat($scope.liabilityLay) + parseFloat($scope.stake)
        ).toFixed(2);
      });
      angular.forEach(item.noBetSlipData, function (item) {
        $scope.stake = item.stake;
        if ($scope.stake == "") {
          $scope.stake = 0;
        }
        $scope.liabilityNo = (
          parseFloat($scope.liabilityNo) + parseFloat($scope.stake)
        ).toFixed(2);
      });
      angular.forEach(item.layBookBetSlipData, function (item) {
        $scope.stake = item.stake;
        if ($scope.stake == "") {
          $scope.stake = 0;
        }
        $scope.liabilityLayBook = (
          parseFloat($scope.liabilityLayBook) + parseFloat($scope.stake)
        ).toFixed(2);
      });
    });
    if ($scope.liabilityBack == "") {
      $scope.liabilityBack = 0.0;
    }
    if ($scope.liabilityYes == "") {
      $scope.liabilityYes = 0.0;
    }
    if ($scope.liabilityLay == "") {
      $scope.liabilityLay = 0.0;
    }
    if ($scope.liabilityNo == "") {
      $scope.liabilityNo = 0.0;
    }
    if ($scope.liabilityBackBook == "") {
      $scope.liabilityBackBook = 0.0;
    }
    if ($scope.liabilityLayBook == "") {
      $scope.liabilityLayBook = 0.0;
    }
    $scope.liabilities = (
      parseFloat($scope.liabilities) +
      (parseFloat($scope.liabilityBack) +
        parseFloat($scope.liabilityYes) +
        parseFloat($scope.liabilityBackBook) +
        parseFloat($scope.liabilityLay) +
        parseFloat($scope.liabilityNo) +
        parseFloat($scope.liabilityLayBook))
    ).toFixed(2);
    // console.log('$scope.liabilities '+$scope.liabilities)
  };
  $scope.ComfirmBetchkbx = false;
  $scope.Checkconfirmbet = function (check) {
    $scope.ComfirmBetchkbx = check;
  };
  $scope.Editbets = function () {
    $("#Confirm-Betslip").css("display", "none");
    $("#Bet_Slips").css("display", "block");
  };

  $scope.placedButton = false;
  $scope.placeBet = function (check) {
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      $("#loginBox").css("display", "block");
      return false;
    }
    if (check) {
      if ($scope.ComfirmBetchkbx) {
        $("#Confirm-Betslip").css("display", "block");
        $("#Bet_Slips").css("display", "none");
        return false;
      }
    }

    $("#loading_place_bet").css("display", "block");
    $scope.placedButton = true;
    if ($scope.backBetSlipDataArray.length >= 1) {
      angular.forEach($scope.backBetSlipDataArray, function (item, key) {
        if (item.backBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');
          angular.forEach(item.backBetSlipData, function (item2) {
            placeBetFunc(item2, key);
          });
        }
        if (item.yesBetSlipData.length >= 1) {
          // $('.spinner-text').html('Placing bet please wait...');
          angular.forEach(item.yesBetSlipData, function (item2) {
            placeBetFancy(item2, key);
          });
        }
        if (item.backBookBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');
          angular.forEach(item.backBookBetSlipData, function (item2) {
            placeBookBetFunc(item2, key);
          });
        }
      });
    }
    if ($scope.layBetSlipDataArray.length >= 1) {
      angular.forEach($scope.layBetSlipDataArray, function (item, key) {
        if (item.layBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');
          angular.forEach(item.layBetSlipData, function (item2) {
            placeBetFunc(item2, key);
          });
        }
        if (item.noBetSlipData.length >= 1) {
          // $('.spinner-text').html('Placing bet please wait...');
          angular.forEach(item.noBetSlipData, function (item2) {
            // console.log(item2)
            if (parseInt(item2.rate) == 0 || parseInt(item2.score) == 0) {
              // $interval.cancel($scope.stopTime);
              return false;
            }
            placeBetFancy(item2, key);
          });
        }
        if (item.layBookBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');
          angular.forEach(item.layBookBetSlipData, function (item2) {
            placeBookBetFunc(item2, key);
          });
        }
      });
    }
    if ($scope.backTeenSlipDataArray.length >= 1) {
      angular.forEach($scope.backTeenSlipDataArray, function (item, key) {
        if (item.cards) {
          if (item.cards.length < 3) {
            toastr.error("Please Select Atleast 3 Cards");
            $("#loading_place_bet").css("display", "none");
          } else {
            placeTpBet(item, key);
          }
        } else {
          placeTpBet(item, key);
        }
      });
    }
  };

  function placeBetFunc(betData, index) {
    // $('.loading').css('display','block');
    betData["source"] = "web";
    betData["info"] =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    // console.log(betData)
    if (betData.backlay == "back") {
      var i = $scope.backBetSlipDataArray[index].backBetSlipData.indexOf(
        betData
      );
      var slipIndex = $scope.backBetSlipList.indexOf(
        betData.runnerName + i + "back"
      );
      if (i != -1) {
        $scope.backBetSlipDataArray[index].backBetSlipData.splice(i, 1);
        $scope.backBetSlipList.splice(slipIndex, 1);
      }
      if (
        $scope.backBetSlipDataArray[index].backBetSlipData.length == 0 &&
        $scope.backBetSlipDataArray[index].backBookBetSlipData.length == 0 &&
        $scope.backBetSlipDataArray[index].yesBetSlipData.length == 0
      ) {
        $scope.backBetSlipDataArray.splice(index, 1);
      }
    } else {
      var i = $scope.layBetSlipDataArray[index].layBetSlipData.indexOf(betData);
      var slipIndex = $scope.layBetSlipList.indexOf(
        betData.runnerName + i + "lay"
      );
      if (i != -1) {
        $scope.layBetSlipDataArray[index].layBetSlipData.splice(i, 1);
        $scope.layBetSlipList.splice(slipIndex, 1);
      }
      if (
        $scope.layBetSlipDataArray[index].layBetSlipData.length == 0 &&
        $scope.layBetSlipDataArray[index].layBookBetSlipData.length == 0 &&
        $scope.layBetSlipDataArray[index].noBetSlipData.length == 0
      ) {
        $scope.layBetSlipDataArray.splice(index, 1);
      }
    }
    $("#placebet_btn").removeClass("disable");
    $("#placebet_btn").addClass("disable");
    $("#placebet_btn").prop("disabled", true);
    $http({
      method: "POST",
      url: ApiUrl + "/Bets/PlaceMOBet",
      headers: {
        Token: authtoken,
      },
      data: betData,
    }).then(
      function mySuccess(response) {
        $scope.placedButton = false;
        if (response.data.status == "Success") {
          // $rootScope.$emit("callExp", {})
          // if($location.path()=== "/multi-market"){
          //     $rootScope.$emit("callMultiMarketExp", {})
          // }
          toastr.success(response.data.result);
          $("#loading_place_bet").css("display", "none");
          $("#betslip_open").addClass("close");
          $scope.Fund();
          $("#placebet_btn").removeClass("disable");
          $("#placebet_btn").prop("disabled", false);
          $scope.removeAllBetSlip();
          $("#Confirm-Betslip").css("display", "none");
          $("#Bet_Slips").css("display", "block");
          // $scope.getMultiExposureBook()
          $rootScope.ExposureBook(betData.marketId);
        } else {
          $scope.removeAllBetSlip();
          $("#loading_place_bet").css("display", "none");
          $("#placebet_btn").removeClass("disable");
          $("#placebet_btn").prop("disabled", false);
          $("#Confirm-Betslip").css("display", "none");
          $("#Bet_Slips").css("display", "block");
          toastr.error(response.data.result);
        }
        $rootScope.betslippanelcss();
      },
      function myError(error) {
        $("#placebet_btn").removeClass("disable");
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  }

  function placeTpBet(betData, index) {
    betData["source"] = "web";

    betData["info"] =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    $http({
      method: "POST",
      url: ApiUrl + "/Bets/PlaceTpBet",
      headers: {
        Token: authtoken,
      },
      data: betData,
    }).then(
      function mySuccess(response) {
        $scope.placedButton = false;
        if (response.data.status == "Success") {
          // $rootScope.$emit("callExp", {})

          // if($location.path()=== "/multi-market"){
          //     $rootScope.$emit("callMultiMarketExp", {})
          // }

          toastr.success(response.data.result);
          $("#loading_place_bet").css("display", "none");
          $("#betslip_open").addClass("close");
          $scope.Fund();
          $("#placebet_btn").removeClass("disable");
          $("#placebet_btn").prop("disabled", false);
          $scope.removeAllBetSlip();
          $("#Confirm-Betslip").css("display", "none");
          $("#Bet_Slips").css("display", "block");
          // $scope.getMultiExposureBook()
          if (
            betData.gameType == 1 ||
            betData.gameType == 2 ||
            betData.gameType == 6
          ) {
            $rootScope.ExposureBookTeenPatti(betData.gameId);
          }
          if (betData.gameType == 5) {
            $rootScope.ExposureBookLucky7(betData.gameId);
          }
          if (betData.gameType == 7) {
            $rootScope.AndarBaharExposureBook(betData.gameId);
          }
        } else {
          $scope.removeAllBetSlip();
          $("#loading_place_bet").css("display", "none");
          $("#placebet_btn").removeClass("disable");
          $("#placebet_btn").prop("disabled", false);
          $("#Confirm-Betslip").css("display", "none");
          $("#Bet_Slips").css("display", "block");

          toastr.error(response.data.result);
        }
        $rootScope.betslippanelcss();
      },
      function myError(error) {
        $("#placebet_btn").removeClass("disable");
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  }

  function placeBetFancy(betData, index) {
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      $("#loginBox").css("display", "block");
      return false;
    }
    $("#loading_place_bet").css("display", "block");
    $("#betslip_open").removeClass("close");
    betData["source"] = "web";
    betData["info"] =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    $http({
      method: "POST",
      url: ApiUrl + "/Bets/PlaceFancyBet",
      headers: {
        Token: authtoken,
      },
      data: betData,
    }).then(
      function mySuccess(response) {
        $scope.placedButton = false;
        if (
          response.data.status == "Success" &&
          response.data.result == "Bet placed successfully!!"
        ) {
          $rootScope.$emit("callFancyExp", {});
          if (betData.yesno == "yes") {
            // console.log(betData)
            var i = $scope.backBetSlipDataArray[index].yesBetSlipData.indexOf(
              betData
            );
            var slipIndex = $scope.yesBetSlipList.indexOf(
              betData.runnerName + i + "yes"
            );
            if (i != -1) {
              $scope.backBetSlipDataArray[index].yesBetSlipData.splice(i, 1);
              $scope.yesBetSlipList.splice(slipIndex, 1);
            }
            if (
              $scope.backBetSlipDataArray[index].backBetSlipData.length == 0 &&
              $scope.backBetSlipDataArray[index].backBookBetSlipData.length ==
                0 &&
              $scope.backBetSlipDataArray[index].yesBetSlipData.length == 0
            ) {
              $scope.backBetSlipDataArray.splice(index, 1);
            }
          } else {
            var i = $scope.layBetSlipDataArray[index].noBetSlipData.indexOf(
              betData
            );
            var slipIndex = $scope.noBetSlipList.indexOf(
              betData.runnerName + i + "no"
            );
            if (i != -1) {
              $scope.layBetSlipDataArray[index].noBetSlipData.splice(i, 1);
              $scope.noBetSlipList.splice(slipIndex, 1);
            }
            if (
              $scope.layBetSlipDataArray[index].layBetSlipData.length == 0 &&
              $scope.layBetSlipDataArray[index].layBookBetSlipData.length ==
                0 &&
              $scope.layBetSlipDataArray[index].noBetSlipData.length == 0
            ) {
              $scope.layBetSlipDataArray.splice(index, 1);
            }
          }
          toastr.success(response.data.result);
          $("#loading_place_bet").css("display", "none");
          $scope.Fund();
          $("#betslip_open").addClass("close");
        } else {
          $("#loading_place_bet").css("display", "none");
          toastr.error(response.data.result);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  }

  function placeBookBetFunc(betData, index) {
    // $('.loading').css('display','block');
    betData["source"] = "web";
    betData["info"] =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    if (betData.backlay == "backBook") {
      var i = $scope.backBetSlipDataArray[index].backBookBetSlipData.indexOf(
        betData
      );
      var slipIndex = $scope.backBookBetSlipList.indexOf(
        betData.runnerName + i + "backBook"
      );
      if (i != -1) {
        $scope.backBetSlipDataArray[index].backBookBetSlipData.splice(i, 1);
        $scope.backBookBetSlipList.splice(slipIndex, 1);
      }
      if (
        $scope.backBetSlipDataArray[index].backBetSlipData.length == 0 &&
        $scope.backBetSlipDataArray[index].backBookBetSlipData.length == 0 &&
        $scope.backBetSlipDataArray[index].yesBetSlipData.length == 0
      ) {
        $scope.backBetSlipDataArray.splice(index, 1);
      }
    } else {
      var i = $scope.layBetSlipDataArray[index].layBookBetSlipData.indexOf(
        betData
      );
      var slipIndex = $scope.layBookBetSlipList.indexOf(
        betData.runnerName + i + "layBook"
      );
      if (i != -1) {
        $scope.layBetSlipDataArray[index].layBookBetSlipData.splice(i, 1);
        $scope.layBookBetSlipList.splice(slipIndex, 1);
      }
      if (
        $scope.layBetSlipDataArray[index].layBetSlipData.length == 0 &&
        $scope.layBetSlipDataArray[index].layBookBetSlipData.length == 0 &&
        $scope.layBetSlipDataArray[index].noBetSlipData.length == 0
      ) {
        $scope.layBetSlipDataArray.splice(index, 1);
      }
    }
    if (betData.backlay == "backBook") {
      betData.backlay = "back";
    } else {
      betData.backlay = "lay";
    }
    // console.log(betData)
    $("#placebet_btn").removeClass("disable");
    $("#placebet_btn").addClass("disable");
    $("#placebet_btn").prop("disabled", true);
    $timeout(function () {
      $http({
        method: "POST",
        url: ApiUrl + "/Bets/PlaceBMBet",
        headers: {
          Token: authtoken,
        },
        data: betData,
      }).then(
        function mySuccess(response) {
          $scope.placedButton = false;
          if (
            response.data.status == "Success" &&
            response.data.result == "Bet placed successfully!!"
          ) {
            // $rootScope.$emit("callBMExp", {})
            $rootScope.getBMExposureBook(betData.bookId);
            if (betData.backlay == "back") {
              betData.backlay = "backBook";
            } else {
              betData.backlay = "layBook";
            }
            toastr.success(response.data.result);
            $("#loading_place_bet").css("display", "none");
            $("#placebet_btn").prop("disabled", false);
            $("#placebet_btn").removeClass("disable");
            $("#Confirm-Betslip").css("display", "none");
            $("#Bet_Slips").css("display", "block");
            $scope.Fund();
            $("#betslip_open").addClass("close");
          } else {
            $("#loading_place_bet").css("display", "none");
            $("#placebet_btn").prop("disabled", false);
            $("#placebet_btn").removeClass("disable");
            $("#Confirm-Betslip").css("display", "none");
            $("#Bet_Slips").css("display", "block");
            toastr.error(response.data.result);
          }
          $rootScope.betslippanelcss();
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    }, 3000);
  }
  $rootScope.ExposureBook = function (mktid) {
    // $scope.BookDataList=[]
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }
    $scope.Value = [];
    if ($routeParams.marketId == undefined) {
      $scope.mktid = mktid;
    } else {
      $scope.mktid = $routeParams.marketId;
    }
    $http({
      url: ApiUrl + "/Bets/ExposureBook?mktid=" + $scope.mktid,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.BookDataList = response.data.data;
        // console.log($scope.BookDataList)
        // localStorage.setItem('exposureData',JSON.stringify($scope.BookDataList))
        angular.forEach($scope.BookDataList, function (item, index) {
          var exprunner = item.Key;
          var mktexposure = parseFloat(item.Value).toFixed(2);
          var runName = exprunner
            .replace(/[^a-z0-9\s]/gi, "")
            .replace(/[_\s]/g, "_");
          if (mktexposure == 0) {
            mktexposure = "";
          }
          // if (item.Value > 0) {
          //     $('#exposure_' + runName).text(mktexposure).css('color', 'green');
          // } else {
          //     $('#exposure_' + runName).text(mktexposure).css('color', 'red');
          // }
          if (item.Value > 0) {
            $("#exposure_" + runName).removeClass("lose");
            $("#exposure_" + runName)
              .text(mktexposure)
              .addClass("win");
          } else {
            $("#exposure_" + runName).removeClass("win");
            $("#exposure_" + runName)
              .text(mktexposure)
              .addClass("lose");
          }
        });
        localStorage.setItem(
          "Exposure_" + mktid,
          JSON.stringify(response.data.data)
        );
        //$scope.Value1=$scope.Value[0];
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };

  $scope.pending_TPExposureBook = false;
  $rootScope.ExposureBookTeenPatti = function (gameId) {
    if ($scope.pending_TPExposureBook == true) return false;
    $scope.pending_TPExposureBook = true;
    $rootScope.gameid = gameId;
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }

    $http({
      url:
        ApiUrl +
        "/Bets/" +
        ($rootScope.Teentype == 6
          ? "ThreeCardJExposureBook"
          : "T20ExposureBook") +
        "?gameid=" +
        $rootScope.gameid,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.TeenDataList = response.data.data;
        // console.log($scope.TeenDataList);
        $scope.pending_TPExposureBook = false;
        angular.forEach($scope.TeenDataList, function (item, index) {
          var runname = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );
          var BMExposure = parseFloat(item.Value).toFixed(2);
          if (parseFloat(BMExposure) == 0) {
            BMExposure = 0;
          }
          if (parseFloat(item.Value) > 0) {
            $("#Tp_" + gameId + runname)
              .text(BMExposure)
              .css("color", "green");
          } else {
            $("#Tp_" + gameId + runname)
              .text(BMExposure)
              .css("color", "red");
          }
        });
      },
      function myError(error) {
        $scope.pending_TPExposureBook = false;
        if (error.status == 401) {
          $.removeCookie("authtoken");
          // window.location.href = 'login.html'
        }
      }
    );
  };

  $scope.pending_ExposureBookLucky7 = false;
  $rootScope.ExposureBookLucky7 = function (gameId) {
    if (gameId == 0) {
      return false;
    }
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }
    if ($scope.pending_ExposureBookLucky7 == true) return false;
    $scope.pending_ExposureBookLucky7 = true;
    $rootScope.gameid = gameId;

    $http({
      url: ApiUrl + "/Bets/Lucky7ExposureBook?gameid=" + $rootScope.gameid,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        $scope.TeenDataList = response.data.data;
        // console.log($scope.TeenDataList);
        $scope.pending_ExposureBookLucky7 = false;
        angular.forEach($scope.TeenDataList, function (item, index) {
          var runname = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );
          var TP7Exposure = parseFloat(item.Value).toFixed(2);
          if (parseFloat(TP7Exposure) == 0) {
            TP7Exposure = 0.0;
          }
          if (parseFloat(item.Value) > 0) {
            $("#Tp_" + gameId + runname)
              .text(TP7Exposure)
              .css("color", "green");
          } else {
            $("#Tp_" + gameId + runname)
              .text(TP7Exposure)
              .css("color", "red");
          }
        });
      },
      function myError(error) {
        $scope.pending_ExposureBookLucky7 = false;
        if (error.status == 401) {
          $.removeCookie("authtoken");
          // window.location.href = 'login.html'
        }
      }
    );
  };

  $scope.pending_AndarBaharExposureBook = false;
  $rootScope.AndarBaharExposureBook = function (gameId) {
    if (gameId == 0) {
      return false;
    }
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }
    if ($scope.pending_AndarBaharExposureBook == true) return false;
    $scope.pending_AndarBaharExposureBook = true;
    $rootScope.gameid = gameId;

    $http({
      url: ApiUrl + "/Bets/AndarBaharExposureBook?gameid=" + $rootScope.gameid,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        $scope.TeenDataList = response.data.data;
        // console.log($scope.TeenDataList);
        $scope.pending_AndarBaharExposureBook = false;
        angular.forEach($scope.TeenDataList, function (item, index) {
          var runname = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );
          var TP7Exposure = parseFloat(item.Value).toFixed(2);
          if (parseFloat(TP7Exposure) == 0) {
            TP7Exposure = 0.0;
          }
          if (parseFloat(item.Value) > 0) {
            $("#Tp_" + gameId + runname)
              .text(TP7Exposure)
              .css("color", "green");
          } else {
            $("#Tp_" + gameId + runname)
              .text(TP7Exposure)
              .css("color", "red");
          }
        });
      },
      function myError(error) {
        $scope.pending_AndarBaharExposureBook = false;
        if (error.status == 401) {
          $.removeCookie("authtoken");
          // window.location.href = 'login.html'
        }
      }
    );
  };

  $rootScope.getBMExposureBook = function (Bookid) {
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }
    if ($routeParams.marketId != undefined) {
      var MktId = $routeParams.marketId;
    } else {
      return false;
    }
    if (Bookid == undefined) {
      return false;
    }
    $http({
      method: "GET",
      url: ApiUrl + "/Bets/BMExposureBook?mktid=" + MktId + "&bid=" + Bookid,
      headers: {
        Token: authtoken,
      },
    }).then(
      function Success(response) {
        $scope.BMexBook = response.data.data;
        angular.forEach($scope.BMexBook, function (item, index) {
          var runname = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );
          var BMExposure = item.Value;
          if (BMExposure == 0) {
            BMExposure = "";
          }
          if (item.Value > 0) {
            $("#bm_" + Bookid + runname)
              .text(BMExposure)
              .css("color", "green");
          } else {
            $("#bm_" + Bookid + runname)
              .text(BMExposure)
              .css("color", "red");
          }
        });
      },
      function error(err) {
        if (err.status == 401) {
          $.removeCookie("auth-token");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.removeAllBetSlip = function (remove) {
    $scope.backBetSlipDataArray = [];
    $scope.layBetSlipDataArray = [];
    $scope.backTeenSlipDataArray = [];
    $scope.backBetSlipList = [];
    $scope.layBetSlipList = [];
    $scope.yesBetSlipList = [];
    $scope.noBetSlipList = [];
    $scope.backBookBetSlipList = [];
    $scope.layBookBetSlipList = [];
    $scope.finalStakeValue = null;
    $scope.calculateLiability();
    $scope.liabilities = "0.00";

    if (!remove) {
      $rootScope.cards = [];
      $scope.placeTPData = null;
    }
    if ($scope.ExpoMktid != undefined) {
      $scope.bets.stake = 0;
      $scope.bets.profit = 0;
      $scope.calcExposure($scope.ExpoMktid, $scope.bets, "remove");
    }
    if (remove == undefined) {
      // console.log($scope.ExpoMktid)
      if ($scope.ExpoMktid != undefined) {
        $scope.bets.stake = 0;
        $scope.bets.profit = 0;
      }
      $scope.calcExposure($scope.ExpoMktid, $scope.bets, "remove");
    }
  };
  $scope.cancelBet = function (id, index) {
    // $('#fancyBook').modal();
    $http({
      method: "POST",
      url: ApiUrl + "/Bets/CancelBet?id=" + id,
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        if (
          response.data.status == "Success" &&
          response.data.result == "Bet cancelled successfully!!"
        ) {
          if (index != -1) {
            $scope.unMatchedData.splice(index, 1);
          }
          toastr.success(response.data.result);
        } else {
          toastr.error(response.data.result);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.calcExposure = function (mktid, bets, remove) {
    if (mktid == undefined) {
      return false;
    }
    $scope.exposureBook = JSON.parse(localStorage.getItem("Exposure_" + mktid));
    if ($scope.exposureBook == null) {
      return false;
    }
    $scope.ExpoMktid = mktid;
    $scope.bets = bets;
    if (remove == "remove") {
      $scope.exposureBook.forEach(function (value, item) {
        //console.log("value - ",value,"item -",item)
        var runnername = value.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#exposureAfter_" + runnername + "").css("display", "none");
        $("#exposureAfter_" + runnername + "").text(
          parseFloat(value.Value).toFixed(2)
        );
        if ($("#exposureAfter_" + runnername + "").hasClass("to-lose"))
          $("#exposureAfter_" + runnername + "").removeClass("to-lose");
        if ($("#exposureAfter_" + runnername + "").hasClass("to-win"))
          $("#exposureAfter_" + runnername + "").removeClass("to-win");
        if (value.Value >= 0)
          $("#exposureAfter_" + runnername + "").addClass("to-win");
        else $("#exposureAfter_" + runnername + "").addClass("to-lose");
      });
    } else {
      angular.forEach($scope.exposureBook, function (item, index) {
        $scope.newValue = 0;
        if ($scope.bets.backlay == "back") {
          if (item.Key == $scope.bets.runnerName) {
            $scope.newValue =
              parseFloat(item.Value) + parseFloat($scope.bets.profit);
            item.Value = $scope.newValue;
          } else {
            if ($scope.bets.stake == "") {
              var betStake = 0;
            } else {
              betStake = $scope.bets.stake;
            }
            $scope.newValue = parseFloat(item.Value) - parseFloat(betStake);
            item.Value = $scope.newValue;
          }
        } else {
          if (item.Key == $scope.bets.runnerName) {
            $scope.newValue =
              parseFloat(item.Value) - parseFloat($scope.bets.profit);
            item.Value = $scope.newValue;
          } else {
            if ($scope.bets.stake == "") {
              var betStake = 0;
            } else {
              betStake = $scope.bets.stake;
            }
            $scope.newValue = parseFloat(item.Value) + parseFloat(betStake);
            item.Value = $scope.newValue;
          }
        }
      });
      // localStorage.setItem('NewExposure_'+mktid,JSON.stringify($scope.exposureBook))
      $scope.exposureBook.forEach(function (value, item) {
        //console.log("value - ",value,"item -",item)
        var runnername = value.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#exposureAfter_" + runnername + "").css("display", "inline");
        $("#exposureAfter_" + runnername + "").text(
          parseFloat(value.Value).toFixed(2)
        );
        if ($("#exposureAfter_" + runnername + "").hasClass("to-lose"))
          $("#exposureAfter_" + runnername + "").removeClass("to-lose");
        if ($("#exposureAfter_" + runnername + "").hasClass("to-win"))
          $("#exposureAfter_" + runnername + "").removeClass("to-win");
        if (value.Value >= 0)
          $("#exposureAfter_" + runnername + "").addClass("to-win");
        else $("#exposureAfter_" + runnername + "").addClass("to-lose");
      });
    }
    // $timeout.cancel(myBetSlipTimeout);
    // myBetSlipTimeout = $timeout(function() {
    //     $scope.removeAllBetSlip()
    // }, 10000);
  };
  $scope.onCancel = function () {
    $scope.active = true;
  };

  $scope.getStakeSettings = function () {
    $scope.active = false;
    $scope.stakeList = [];
    $http({
      method: "GET",
      url: ApiUrl + "/Settings/GetBetStakeSetting",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          if (response.data.data.stake1 == 0) {
            $scope.stakeList = $scope.stakeListdata;
          } else {
            // $scope.stakeList = response.data.data
            $scope.stake1 = response.data.data.stake1;
            $scope.stake2 = response.data.data.stake2;
            $scope.stake3 = response.data.data.stake3;
            $scope.stake4 = response.data.data.stake4;
            $scope.stake5 = response.data.data.stake5;
            $scope.stake6 = response.data.data.stake6;
            $scope.stake7 = response.data.data.stake7;
            $scope.stake8 = response.data.data.stake8;
            $scope.stake9 = response.data.data.stake9;
            $scope.stake10 = response.data.data.stake10;
          }
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.showEditDiv = function () {
    $scope.show_close = false;
  };
  $scope.editStakeSettings = function () {
    // console.log('edit stake function called')
    var newStakeList = {
      stake1: $("#stake1").val(),
      stake2: $("#stake2").val(),
      stake3: $("#stake3").val(),
      stake4: $("#stake4").val(),
      stake5: $("#stake5").val(),
      stake6: $("#stake6").val(),
      stake7: $("#stake7").val(),
      stake8: $("#stake8").val(),
      stake9: $("#stake9").val(),
      stake10: $("#stake10").val(),
    };
    var finalData = JSON.stringify(newStakeList);
    $http({
      method: "POST",
      url: ApiUrl + "/Settings/SaveBetStakeSetting",
      headers: {
        Token: authtoken,
      },
      data: finalData,
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.result == "Bet stake settings saved successfully") {
          $scope.show_close = !$scope.show_close;
          $scope.getStakeSettings();
          $scope.GetSettings();
          toastr.success(response.data.result);
        } else {
          toastr.error(response.data.result);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
    // console.log(newStakeList)
  };
  $scope.stakeValue = function (stake, bet, booktype) {
    // console.log(stake)
    if (
      bet.backlay == "back" ||
      bet.backlay == "lay" ||
      bet.backlay == "BACK"
    ) {
      var getStake = bet.stake;
      if (getStake == "") {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      bet.stake = totalStake;
      var pnl = (parseFloat(bet.odds) - 1) * parseFloat(totalStake);
      bet.profit = pnl.toFixed(2);
      $scope.calculateLiability();
      $scope.calcExposure($scope.ExpoMktid, $scope.bets);
    }
    if (
      (bet.backlay == "backBook" || bet.backlay == "layBook") &&
      booktype == 1
    ) {
      var getStake = bet.stake;
      if (getStake == "") {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      bet.stake = totalStake;
      var pnl = (parseFloat(bet.odds) / 100) * parseFloat(totalStake);
      bet.profit = pnl.toFixed(2);
      $scope.calculateLiability();
    } else if (
      (bet.backlay == "backBook" || bet.backlay == "layBook") &&
      booktype == 2
    ) {
      var getStake = bet.stake;
      if (getStake == "") {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      bet.stake = totalStake;
      var pnl = (parseFloat(bet.odds) - 1) * parseFloat(totalStake);
      bet.profit = pnl.toFixed(2);
      $scope.calculateLiability();
    }
    if (bet.yesno == "yes" || bet.yesno == "no") {
      var getStake = bet.stake;
      if (getStake == "") {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      bet.stake = totalStake;
      var pnl = (parseFloat(bet.rate) * parseFloat(totalStake)) / 100;
      bet.profit = pnl.toFixed(2);
      $scope.calculateLiability();
    }
  };
  $scope.stakeValueUM = function (stake, index, backLay, prestake, preodds) {
    if (backLay == "BACK") {
      var getStake = $("#inputStakeBackUM_" + index + "").val();
      if (getStake == "") {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      $("#inputStakeBackUM_" + index + "").val(totalStake);
      var pnl =
        (parseFloat($("#oddsBackUM_" + index + "").val()) - 1) *
        parseFloat(totalStake);
      $("#profitLiabilityBackUM_" + index + "").text(pnl.toFixed(2));
    }
    if (backLay == "LAY") {
      var getStake = $("#inputStakeLayUM_" + index + "").val();
      if (getStake == "") {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      $("#inputStakeLayUM_" + index + "").val(totalStake);
      var pnl =
        (parseFloat($("#oddsLayUM_" + index + "").val()) - 1) *
        parseFloat(totalStake);
      $("#profitLiabilityLayUM_" + index + "").text(pnl.toFixed(2));
    }
  };
  $scope.updateStake = function (bet, booktype) {
    console.log(booktype);
    if (bet.stake == "") {
      bet.stake = 0.0;
    }
    if (bet.backlay == "back" || bet.backlay == "lay") {
      var odds = bet.odds;
      var pnl = (parseFloat(odds) - 1) * parseFloat(bet.stake);
      bet.profit = pnl.toFixed(2);
      $scope.calcExposure($scope.ExpoMktid, $scope.bets);
    }
    if (bet.backLay == "BACK" || bet.backLay == "LAY") {
      var odds = bet.odds;
      var pnl = (parseFloat(odds) - 1) * parseFloat(bet.stake);
      bet.profit = pnl.toFixed(2);
      $("#profitLiabilityBackUM_" + bet.id + "").text(pnl.toFixed(2));
      $("#profitLiabilityLayUM_" + bet.id + "").text(pnl.toFixed(2));
    }
    if (
      (bet.backlay == "backBook" || bet.backlay == "layBook") &&
      booktype == 1
    ) {
      var odds = bet.odds;
      var pnl = (parseFloat(odds) / 100) * parseFloat(bet.stake);
      bet.profit = pnl.toFixed(2);
    } else {
      var odds = bet.odds;
      var pnl = (parseFloat(odds) - 1) * parseFloat(bet.stake);
      bet.profit = pnl.toFixed(2);
    }
    if (bet.yesno == "yes" || bet.yesno == "no") {
      var rate = bet.rate;
      var pnl = (parseFloat(rate) * parseFloat(bet.stake)) / 100;
      bet.profit = pnl.toFixed(2);
    }
    $scope.calculateLiability();
  };
  $scope.stakeFocus = function (bet, index) {
    // $('.col-stake_list').css("display", "none");
    if (bet.matchId != undefined) {
      var betmatchId = bet.matchId;
    } else {
      betmatchId = bet.eventId;
    }
    if (bet.backlay != undefined) {
      var betbacklay = bet.backlay;
    } else {
      betbacklay = bet.yesno;
    }
    $("#stake_" + betbacklay + "_" + betmatchId + "_" + index).css(
      "display",
      "block"
    );
  };
  // $scope.stakeBlur = function(bet,index) {
  //     $('#stake_'+bet.backlay+'_'+bet.matchId+'_'+index).css("display","none");
  // }
  $scope.Settv = function (marketId, matchId) {
    var data = {
      marketId: marketId,
      matchId: matchId,
    };
    var tvlist = JSON.stringify(data);
    localStorage.setItem("tvlist", tvlist);
  };
  // $scope.selectMenuMatch = "0"
  // $scope.StoreMatches = []
  // $scope.StoreMatchesIDs = []
  $scope.matchedData = [];
  $scope.unMatchedData = [];
  // $scope.backMatchedData = []
  // $scope.backUnMatchedData = []
  // $scope.layMatchedData = []
  // $scope.layUnMatchedData = []
  $scope.backMatchedBet = true;
  $scope.backUnmatchedBet = true;
  $scope.layMatchedBet = true;
  $scope.layUnmatchedBet = true;
  $scope.avgBets = 0;
  $scope.GetBets = function () {
    $scope.foundMatchId = "0";
    if ($routeParams.matchId != undefined) {
      $scope.foundMatchId = $routeParams.matchId;
    } else {
      $scope.foundMatchId = $rootScope.selectMenuMatch;
    }
    // console.log($rootScope.selectMenuMatch);
    // if ($routeParams.matchId != undefined) {
    //     $scope.foundMatchId = parseInt($routeParams.matchId);
    //     $scope.mtid = $scope.foundMatchId
    //     var foundIndex = $scope.StoreMatchesIDs.indexOf($scope.foundMatchId)
    //     if (foundIndex == -1) {
    //         var match = {
    //             matchId: $scope.foundMatchId,
    //             matchName: $rootScope.fullMarketmatchName
    //         }
    //         $scope.StoreMatchesIDs.push($scope.foundMatchId)
    //         $scope.StoreMatches.push(match)
    //     }
    // }
    $scope.mtid = $scope.foundMatchId;
    if ($("#average").prop("checked") == true) {
      $scope.avgBets = 1;
    } else {
      $scope.avgBets = 0;
    }
    if ($rootScope.fType == 1) {
      $http({
        method: "GET",
        url:
          ApiUrl +
          "/Bets/GetAllBets?avg=" +
          $scope.avgBets +
          "&mtid=" +
          $scope.mtid,
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response)
          $scope.matchedData = response.data.matchedData;
          $scope.ticker = response.data.ticker;
          localStorage.setItem("ticker", $scope.ticker);
          $scope.unMatchedData = response.data.unMatchedData;
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
      // console.log($scope.StoreMatches)
    } else {
      if ($rootScope.sportsData != undefined) {
        $scope.allbetdata = $rootScope.getAllBetsWise(
          $scope.mtid,
          $scope.avgBets
        );
        $scope.unMatchedData = $scope.allbetdata.unMatchedData;
        $scope.matchedData = $scope.allbetdata.matchedData;
        $scope.betsmatchidwise();
      }
    }
  };
  var allbetsTimer = $interval(function () {
    $scope.GetBets();
  }, 2000);
  //  $scope.$on('$destroy',function(){
  //     $interval.cancel(allbetsTimer);
  // })
  $scope.GetFancyBook = function (fancyName, fancyId, matchId) {
    window.open(
      "fancybooktable.html?mtid=" +
        matchId +
        "&fid=" +
        fancyId +
        "&fname=" +
        fancyName,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=700,height=500"
    );
  };
  $scope.ModalClose = function () {
    $("#fancyBook").css("display", "none");
  };
});

app.controller("inplayController", function (
  $scope,
  $http,
  $cookieStore,
  $interval,
  $rootScope
) {
  // console.log($('a[href="#!inplay"]').hasClass('select'))
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!inplay"]').hasClass("select")) {
    $('a[href="#!inplay"]').addClass("select");
    $rootScope.inplaydiv = true;
    $rootScope.mainfooter = true;
  }
  $scope.active = false;
  var favoriteCookie = $cookieStore.get("Userdata");
  // console.log(favoriteCookie)
  $scope.oldInplayListData = [];
  $scope.inplayListData = [];
  $("#loading_page").css("display", "grid");
  $scope.inplay_interval = false;
  $scope.inplay = function () {
    $(".btn-lay").removeClass("spark");
    $(".btn-back").removeClass("spark");
    if ($scope.inplay_interval == false) {
      $scope.inplay_interval = true;
    }
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/Inplay",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.inplay_interval = false;
          // console.log(response.data.data);
          $scope.inplayListData = response.data.data;
          $scope.dataCount = $scope.inplayListData.length;
          $("#loading_page").css("display", "none");
          if ($scope.oldInplayListData.length != $scope.inplayListData.length) {
            $scope.oldInplayListData = $scope.inplayListData;
          }
          angular.forEach($scope.inplayListData, function (item, index) {
            if (item.name == $scope.oldInplayListData[index].name) {
              // console.log(item.name)
              $scope.oldInplayData = $scope.oldInplayListData[index].inplayData;
              angular.forEach(item.inplayData, function (item2, index2) {
                if (item2.matchName == $scope.oldInplayData[index2].matchName) {
                  // console.log(item2.matchName)
                  if (
                    item2.runner1Back !=
                    $scope.oldInplayData[index2].runner1Back
                  ) {
                    $("#back1_" + index2).addClass("spark");
                  }
                  if (
                    item2.runner1Lay != $scope.oldInplayData[index2].runner1Lay
                  ) {
                    $("#lay1_" + index2).addClass("spark");
                  }
                  if (
                    item2.runner2Back !=
                    $scope.oldInplayData[index2].runner2Back
                  ) {
                    $("#back2_" + index2).addClass("spark");
                  }
                  if (
                    item2.runner2Lay != $scope.oldInplayData[index2].runner2Lay
                  ) {
                    $("#lay2_" + index2).addClass("spark");
                  }
                  if (
                    item2.runner3Back !=
                    $scope.oldInplayData[index2].runner3Back
                  ) {
                    $("#back3_" + index2).addClass("spark");
                  }
                  if (
                    item2.runner3Lay != $scope.oldInplayData[index2].runner3Lay
                  ) {
                    $("#lay3_" + index2).addClass("spark");
                  }
                }
              });
            }
          });
          $scope.oldInplayListData = $scope.inplayListData;
        },
        function myError(error) {
          $scope.inplay_interval = false;
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.inplay_interval = false;
      // console.log(response.data.data);
      $scope.inplayListData = $rootScope
        .inplaylistwise($rootScope.sportsData, 0)
        .reverse();
      // console.log($scope.inplayListData);
      $scope.dataCount = $scope.inplayListData.length;
      $("#loading_page").css("display", "none");
      if ($scope.oldInplayListData.length != $scope.inplayListData.length) {
        $scope.oldInplayListData = $scope.inplayListData;
      }
      angular.forEach($scope.inplayListData, function (item, index) {
        if (item.name == $scope.oldInplayListData[index].name) {
          // console.log(item.name)
          $scope.oldInplayData = $scope.oldInplayListData[index].inplayData;
          angular.forEach(item.inplayData, function (item2, index2) {
            if (item2.matchName == $scope.oldInplayData[index2].matchName) {
              // console.log(item2.matchName)
              if (
                item2.runner1Back != $scope.oldInplayData[index2].runner1Back
              ) {
                $("#back1_" + index2).addClass("spark");
              }
              if (item2.runner1Lay != $scope.oldInplayData[index2].runner1Lay) {
                $("#lay1_" + index2).addClass("spark");
              }
              if (
                item2.runner2Back != $scope.oldInplayData[index2].runner2Back
              ) {
                $("#back2_" + index2).addClass("spark");
              }
              if (item2.runner2Lay != $scope.oldInplayData[index2].runner2Lay) {
                $("#lay2_" + index2).addClass("spark");
              }
              if (
                item2.runner3Back != $scope.oldInplayData[index2].runner3Back
              ) {
                $("#back3_" + index2).addClass("spark");
              }
              if (item2.runner3Lay != $scope.oldInplayData[index2].runner3Lay) {
                $("#lay3_" + index2).addClass("spark");
              }
            }
          });
        }
      });
      $scope.oldInplayListData = $scope.inplayListData;
    }
  };
  var inpayTimer = $interval(function () {
    $scope.inplay();
  }, 5000);
  $scope.$on("$destroy", function () {
    $interval.cancel(inpayTimer);
  });
});
app.controller("todayController", function (
  $scope,
  $http,
  $cookieStore,
  $rootScope,
  $interval
) {
  // var favoriteCookie = $cookieStore.get('Userdata');
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!inplay"]').hasClass("select")) {
    $('a[href="#!inplay"]').addClass("select");
    $rootScope.inplaydiv = true;
    $rootScope.mainfooter = true;
  }
  $("#loading_page").css("display", "grid");
  // $scope.sportNameFilter=[]
  $scope.filteredSports = ["Cricket", "Soccer", "Tennis"];
  $scope.getsportNameFilter = ["Cricket", "Soccer", "Tennis"];
  $scope.sportNameFilter = ["Cricket", "Soccer", "Tennis"];
  $scope.todevent = [];
  $scope.selectedAll = true;
  $scope.existSport = function (item) {
    return $scope.sportNameFilter.indexOf(item) > -1;
  };
  $scope.toggleSportSelection = function (item) {
    var idx = $scope.sportNameFilter.indexOf(item);
    if (idx > -1) {
      $scope.sportNameFilter.splice(idx, 1);
    } else {
      $scope.sportNameFilter.push(item);
    }
  };
  $scope.checkAll = function () {
    if (!$scope.selectedAll) {
      $scope.sportNameFilter = [];
    } else {
      angular.forEach($scope.getsportNameFilter, function (item) {
        idx = $scope.sportNameFilter.indexOf(item);
        if (idx >= 0) {
          return true;
        } else {
          $scope.sportNameFilter.push(item);
        }
      });
    }
  };
  $scope.upcomingevents = function () {
    $scope.todevent = [];
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/UpcomingEvents?t=1",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response);
          $scope.todevent_data = response.data.data;
          console.log($scope.todevent_data);
          $("#loading_page").css("display", "none");
          if ($scope.todevent_data.length == 0) {
            $scope.filteredSports = $scope.sportNameFilter;
            console.log($scope.filteredSports);
          }
          angular.forEach($scope.todevent_data, function (item, index) {
            $scope.filteredSports = $scope.sportNameFilter;
            console.log($scope.filteredSports);
            var indexFound = $scope.sportNameFilter.indexOf(item.sportName);
            if (indexFound != -1) {
              $scope.todevent.push(item);
            }
          });
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      if ($rootScope.sportsData != undefined) {
        $scope.todevent_data = $rootScope
          .inplaylistwise($rootScope.sportsData, 1)
          .reverse();
        // console.log($scope.todevent_data,"today")
      }
    }
  };
});
app.controller("tomorrowController", function (
  $scope,
  $http,
  $cookieStore,
  $rootScope
) {
  // var favoriteCookie = $cookieStore.get('Userdata');
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!inplay"]').hasClass("select")) {
    $('a[href="#!inplay"]').addClass("select");
    $rootScope.inplaydiv = true;
    $rootScope.mainfooter = true;
  }
  $("#loading_page").css("display", "grid");
  $scope.filteredSports = ["Cricket", "Soccer", "Tennis"];
  $scope.getsportNameFilter = ["Cricket", "Soccer", "Tennis"];
  $scope.sportNameFilter = ["Cricket", "Soccer", "Tennis"];
  $scope.tomevent = [];
  $scope.selectedAll = true;
  $scope.existSport = function (item) {
    return $scope.sportNameFilter.indexOf(item) > -1;
  };
  $scope.toggleSportSelection = function (item) {
    var idx = $scope.sportNameFilter.indexOf(item);
    if (idx > -1) {
      $scope.sportNameFilter.splice(idx, 1);
    } else {
      $scope.sportNameFilter.push(item);
    }
  };
  $scope.checkAll = function () {
    if (!$scope.selectedAll) {
      $scope.sportNameFilter = [];
    } else {
      angular.forEach($scope.getsportNameFilter, function (item) {
        idx = $scope.sportNameFilter.indexOf(item);
        if (idx >= 0) {
          return true;
        } else {
          $scope.sportNameFilter.push(item);
        }
      });
    }
  };
  $scope.upcomingeventstom = function () {
    $scope.tomevent = [];
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/UpcomingEvents?t=2",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response);
          $scope.tomevent_data = response.data.data;
          $("#loading_page").css("display", "none");
          if ($scope.tomevent_data.length == 0) {
            $scope.filteredSports = $scope.sportNameFilter;
          }
          angular.forEach($scope.tomevent_data, function (item, index) {
            $scope.filteredSports = $scope.sportNameFilter;
            var indexFound = $scope.sportNameFilter.indexOf(item.sportName);
            if (indexFound != -1) {
              $scope.tomevent.push(item);
            }
          });
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      if ($rootScope.sportsData != undefined) {
        $scope.tomevent_data = $rootScope
          .inplaylistwise($rootScope.sportsData, 2)
          .reverse();
        // console.log($scope.tomevent_data,"tomorrow")
      }
    }
  };
});
app.controller("multiMarketController", function (
  $scope,
  $http,
  $cookieStore,
  $interval,
  $rootScope
) {
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!multiMarkets"]').hasClass("select")) {
    $('a[href="#!multiMarkets"]').addClass("select");
    $rootScope.SportsList();
    $rootScope.inplaydiv = false;
    $rootScope.mainfooter = true;
  }
  // var authtoken = $cookieStore.get('authtoken');
  $scope.multimarket_data = [];
  $scope.oldMultimarket_data = [];
  $("#loading_page").css("display", "grid");
  $scope.getMultiExposureBook = function (marketId) {
    $scope.mktid = marketId;
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }
    $http({
      url: ApiUrl + "/Bets/ExposureBook?mktid=" + $scope.mktid,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        $scope.getBookDataList = response.data.data;
        angular.forEach($scope.getBookDataList, function (item, index) {
          $scope.exprunner = item.Key;
          var runName = $scope.exprunner
            .replace(/[^a-z0-9\s]/gi, "")
            .replace(/[_\s]/g, "_");
          if (item.Value > 0) {
            $("#exposure_" + runName).removeClass("lose");
            $("#exposure_" + runName)
              .text("  " + parseFloat(item.Value).toFixed(2))
              .addClass("win");
          } else {
            $("#exposure_" + runName).removeClass("win");
            $("#exposure_" + runName)
              .text(parseFloat(item.Value).toFixed(2))
              .addClass("lose");
          }
        });
        localStorage.setItem(
          "Exposure_" + $scope.mktid,
          JSON.stringify(response.data.data)
        );
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.getMultiMarketsExposure = function () {
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/MultiMarkets",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.multimarket = response.data.data;
          console.log($scope.multimarket_data);
          // $scope.multibfID= multimarket_data.[0].bfId;
          // console.log($scope.multibfID)
          $("#loading_page").css("display", "none");
          angular.forEach($scope.multimarket, function (item, index) {
            $scope.multibfID = item.bfId;
            // console.log($scope.multibfID)
            $scope.matchBfId = item.matchBfId;
            // console.log($scope.matchBfId)
            $scope.sportId = item.sportId;
            // console.log($scope.sportId)
            $scope.getMultiExposureBook(item.mktId);
          });
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.MarketIds = JSON.parse(localStorage.getItem("Multimarkets"));
      angular.forEach($scope.MarketIds, function (item, index) {
        $rootScope.ExposureBook(item);
      });
    }
  };
  $scope.getMultiMarketsExposure();
  $rootScope.$on("callMultiMarketExp", function () {
    $scope.getMultiMarketsExposure();
  });
  $scope.refreshMultiMarkets = function () {
    $("#loading_page").css("display", "grid");
    $rootScope.getMultiMarkets();
  };
  $scope.marketIdWiseData = function (markets) {
    var newMarkets = {};
    angular.forEach(markets, function (item, key) {
      if ($rootScope.fType == 1) {
        newMarkets[item.bfId] = item;
      } else {
        var runnerarray = [];
        angular.forEach(item.runnerData1, function (item, key) {
          if (item.Key != undefined) {
            runnerarray.push(item.Value);
          } else {
            runnerarray.push(item);
          }
        });
        item.runnerData1 = runnerarray;
        item.runnerData = item.runnerData1;
        // item['marketName'] = item.name;
        item["mktStatus"] = item.status;
        // item['mktId'] = item.id;
        // item['mtBfId']=item.bfId;
        newMarkets[item.bfId] = item;
      }
    });
    return newMarkets;
    // console.log($scope.markets)
  };
  $scope.hubAddress = "";
  $scope.HubAddress = function (mktId) {
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }
    $http({
      url: ApiUrl + "/Data/HubAddress?id=" + mktId,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.hubAddress = response.data.hubAddress;
        $scope.fancyHubAddress = response.data.fancyHubAddress;
        if ($scope.hubAddress) {
          $scope.connectSignalr($scope.hubAddress);
        }
        // $scope.connectFancySignalr($scope.fancyHubAddress);
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.marketDepth = function (eventid, selection, mktid) {
    window.open(
      "marketDepth.html?eventId=" +
        eventid +
        "&selectionId=" +
        selection +
        "&marketId=" +
        mktid,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1000,height=700"
    );
  };
  $rootScope.getMultiMarkets = function () {
    $(".back-1").removeClass("spark");
    $(".back-2").removeClass("spark");
    $(".back-3").removeClass("spark");
    $(".lay-1").removeClass("spark");
    $(".lay-2").removeClass("spark");
    $(".lay-3").removeClass("spark");
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/MultiMarkets",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          // $scope.multimarket_data=response.data.data;
          $scope.markets = $scope.marketIdWiseData(response.data.data);
          $("#loading_page").css("display", "none");
          if ($scope.oldMultimarket_data.length != $scope.markets.length) {
            $scope.oldMultimarket_data = $scope.markets;
          }
          angular.forEach($scope.markets, function (item, index) {
            if (item.matchName == $scope.oldMultimarket_data[index].matchName) {
              // console.log(item.matchName)
              $scope.oldRunnerData =
                $scope.oldMultimarket_data[index].runnerData;
              angular.forEach(item.runnerData, function (item2, index2) {
                if (item2.back1 != $scope.oldRunnerData[index2].back1) {
                  $("#back_1" + index).addClass("spark");
                }
                if (item2.back2 != $scope.oldRunnerData[index2].back2) {
                  $("#back_2" + index).addClass("spark");
                }
                if (item2.back3 != $scope.oldRunnerData[index2].back3) {
                  $("#back_3" + index).addClass("spark");
                }
                if (item2.lay1 != $scope.oldRunnerData[index2].lay1) {
                  $("#lay_1" + index).addClass("spark");
                }
                if (item2.lay2 != $scope.oldRunnerData[index2].lay2) {
                  $("#lay_2" + index).addClass("spark");
                }
                if (item2.lay3 != $scope.oldRunnerData[index2].lay3) {
                  $("#lay_3" + index).addClass("spark");
                }
              });
            }
          });
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      if ($rootScope.sportsData != undefined) {
        $scope.MarketIds = JSON.parse(localStorage.getItem("Multimarkets"));
        $scope.marketodds = [];
        $scope.marketIdBf = {};
        angular.forEach($scope.MarketIds, function (Main) {
          angular.forEach($rootScope.sportsData, function (index) {
            angular.forEach(index.tournaments, function (index1) {
              angular.forEach(index1.matches, function (index2) {
                angular.forEach(index2.markets, function (index3) {
                  if (index3.id == Main) {
                    var data = {};
                    data["bfId"] = index3.bfId;
                    data["dataMode"] = index2.dataMode;
                    data["isInplay"] = index2.inPlay;
                    data["isMulti"] = index3.isMulti;
                    data["matchBfId"] = index2.bfId;
                    data["matchDate"] = index2.startDate;
                    data["matchId"] = index2.id;
                    data["matchName"] = index2.name;
                    data["matchStatus"] = index2.status.trim();
                    data["mktId"] = index3.id;
                    data["mktName"] = index3.name;
                    data["runnerData"] = index3.runnerData;
                    data["runnerData1"] = index3.runnerData1;
                    data["sportId"] = index.bfId;
                    data["TourId"] = index1.bfId;
                    data["isBettingAllow"] = index3.isBettingAllow;
                    data["sportName"] = index.name;
                    $scope.marketodds.push(data);
                    $scope.marketIdBf[index3.id] = index3.bfId;
                  }
                });
              });
            });
          });
        });
        // console.log($scope.marketodds);
        // console.log($scope.marketIdBf);
        $scope.markets = $scope.marketIdWiseData($scope.marketodds);
        angular.forEach($scope.markets, function (item) {
          if (item.dataMode == 1) {
            $scope.HubAddress(item.mktId);
          }
        });
      }
    }
  };
  $rootScope.getMultiMarkets();
  // var multiMarketTimer = $interval(function() {
  //     $rootScope.getMultiMarkets();
  // }, 10000);
  // $scope.$on('$destroy', function() {
  //     $interval.cancel(multiMarketTimer);
  // })
  $rootScope.$on("MultiMarkets", function () {
    $rootScope.getMultiMarkets();
  });
  $scope.proxy = null;
  $scope.volMulti = 1;
  $scope.connectSignalr = function (hubAddress) {
    //Getting the connection object
    $scope.hubAddress = hubAddress;
    $scope.connection = $.hubConnection($scope.hubAddress);
    //Creating Proxy
    $scope.proxy = $scope.connection.createHubProxy("RunnersHub");
    //Starting connection
    $scope.connection
      .start()
      .done(function (connection) {
        console.log("matchodds Connected " + connection.state);
      })
      .fail(function (connection) {
        console.log("matchodds not connected " + connection.message);
      });
    $scope.connection.stateChanged(function (fancyState) {
      console.log(fancyState);
      if (fancyState.newState != 1 && $scope.hubAddress != null) {
        $scope.connection
          .start()
          .done(function (connection) {
            console.log("matchodds Reconnected " + connection.state);
          })
          .fail(function (connection) {
            console.log("matchodds not Reconnected " + connection.message);
          });
      }
      if (fancyState.newState == 1 && $scope.hubAddress != null) {
        $scope.subscribeMarket();
      }
    });
    $scope.proxy.on("BroadcastSubscribedData", function (runner) {
      $(".lay1").removeClass("spark");
      $(".lay2").removeClass("spark");
      $(".back2").removeClass("spark");
      $(".back1").removeClass("spark");
      // console.log(runner)
      $scope.runner = runner;
      $scope.totalMatchedCount = $scope.runner.totalMatched;
      $scope.matchStatus = $scope.runner.Status;
      $scope.runner.backSize1 =
        $scope.runner.backSize1 != null
          ? $scope.runner.backSize1 * $scope.volMulti
          : $scope.runner.backSize1;
      $scope.runner.backSize2 =
        $scope.runner.backSize2 != null
          ? $scope.runner.backSize2 * $scope.volMulti
          : $scope.runner.backSize2;
      $scope.runner.backSize3 =
        $scope.runner.backSize3 != null
          ? $scope.runner.backSize3 * $scope.volMulti
          : $scope.runner.backSize3;
      $scope.runner.laySize1 =
        $scope.runner.laySize1 != null
          ? $scope.runner.laySize1 * $scope.volMulti
          : $scope.runner.laySize1;
      $scope.runner.laySize2 =
        $scope.runner.laySize2 != null
          ? $scope.runner.laySize2 * $scope.volMulti
          : $scope.runner.laySize2;
      $scope.runner.laySize3 =
        $scope.runner.laySize3 != null
          ? $scope.runner.laySize3 * $scope.volMulti
          : $scope.runner.laySize3;
      if ($scope.markets[$scope.runner.marketid] == undefined) {
        $scope.proxy.invoke("UnsubscribeMarket", $scope.runner.marketid);
        return false;
      }
      $scope.markets[$scope.runner.marketid].mktStatus = $scope.runner.Status;
      $scope.MktRunnerData = $scope.markets[$scope.runner.marketid].runnerData;
      // console.log($scope.MktRunnerData)
      $scope.noSpaceMarketid = $scope.runner.marketid
        .replace(/[^a-z0-9\s]/gi, "")
        .replace(/[_\s]/g, "_");
      for (var i in $scope.MktRunnerData) {
        if (
          $scope.MktRunnerData[i].runnerName == runner.runner ||
          $scope.MktRunnerData[i].runner == runner.runner
        ) {
          $scope.oldrunnerData = $scope.MktRunnerData[i];
          $scope.markets[$scope.runner.marketid].runnerData[i] = $scope.runner;
          $scope.markets[$scope.runner.marketid].runnerData[i]["runnerName"] =
            $scope.runner.runner;
          $scope.markets[$scope.runner.marketid].runnerData[i]["status"] =
            $scope.runner.runnerStatus;
          // console.log($scope.oldrunnerData.backSize1,$scope.runner.backSize1)
          if (
            $scope.oldrunnerData.backSize1 != $scope.runner.backSize1 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "back1").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.backSize2 != $scope.runner.backSize2 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "back2").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.backSize3 != $scope.runner.backSize3 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "back3").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.laySize1 != $scope.runner.laySize1 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "lay1").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.laySize2 != $scope.runner.laySize2 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "lay2").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.laySize3 != $scope.runner.laySize3 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "lay3").addClass(
              "spark"
            );
          }
        }
      }
      $scope.$apply();
    });
  };
  $scope.subscribeMarket = function () {
    //Invoking SubscribeMarket method defined in hub
    angular.forEach($scope.markets, function (item) {
      if (item.dataMode == 1) {
        $scope.proxy.invoke("SubscribeMarket", item.bfId);
      }
    });
  };
  $scope.unsubscribemultimatket = function () {
    angular.forEach($scope.markets, function (item, index) {
      if (item.dataMode == 1) {
        $scope.proxy.invoke("UnsubscribeMarket", item.bfId);
      }
      if ($scope.marketodds.length == index) {
        $scope.hubAddress = null;
        $scope.connection.stop();
        // console.log("Connection stopped");
      }
    });
  };
  $rootScope.unsubscribesinglemultimkt = function (mktId) {
    $scope.proxy.invoke("UnsubscribeMarket", $scope.marketIdBf[mktId]);
    $scope.hubAddress = null;
    $scope.connection.stop();
    // console.log("Unsubscribed" +$scope.marketIdBf[mktId]);
  };
  $scope.fancyProxy = null;
  $scope.connectFancySignalr = function () {
    //Getting the connection object
    $scope.fancyHubAddress = fancyHubAddress;
    $scope.fancyConnection = $.hubConnection($scope.fancyHubAddress);
    //Creating Proxy
    $scope.fancyProxy = $scope.fancyConnection.createHubProxy("FancyHub");
    //Starting connection
    $scope.fancyConnection
      .start()
      .done(function (fancyConnection) {
        console.log("Fancy Connected " + fancyConnection.state);
      })
      .fail(function (fancyConnection) {
        console.log("Fancy not connected " + fancyConnection.message);
      });
    $scope.fancyConnection.stateChanged(function (fancyState) {
      // console.log(fancyState)
      if (fancyState.newState != 1 && $scope.fancyHubAddress != null) {
        $scope.fancyConnection
          .start()
          .done(function (fancyConnection) {
            console.log("Fancy Reconnected " + fancyConnection.state);
          })
          .fail(function (fancyConnection) {
            console.log("Fancy not Reconnected " + fancyConnection.message);
          });
      }
      if (fancyState.newState == 1 && $scope.fancyHubAddress != null) {
        $scope.subscribeFancyMarket();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.fancyProxy.on("BroadcastSubscribedData", function (fancy) {
      // console.log(fancy)
      $scope.$apply(function () {
        // if ($rootScope.sportsData!=undefined) {
        //     $scope.runnerData = $rootScope.sportsData[$scope.sportId].tournaments[$scope.tourID].matches[$scope.matchid];
        //     $scope.runnerData['matchName'] = $scope.runnerData.name;
        //     $scope.runnerData['matchDate'] = $scope.runnerData.startDate;
        //     if ($scope.runnerData.markets.length!=$scope.OldMarkets.length) {
        //         $scope.markets = $scope.marketIdWiseData($scope.runnerData.markets);
        //         $scope.OldMarkets=$scope.runnerData.markets;
        //     }
        // }
        currTime = fancy.curTime;
        $scope.currentMktTime = fancy.curTime;
        $scope.bookmakingData = fancy.bookRates;
        $scope.bookId = $scope.bookmakingData.id;
        $scope.NewfancyData = fancy.data;
        angular.forEach(fancy.data, function (value, index) {
          // console.log($scope.Sessionfeeds[value.name])
          if (value.isAuto == 1 && $scope.Sessionfeeds != undefined) {
            var sessionValue = $scope.Sessionfeeds[value.name];
            if (sessionValue != undefined) {
              if (
                sessionValue.maxLiabilityPerBet > 0 &&
                sessionValue.maxLiabilityPerMarket > 0 &&
                sessionValue.isBettable == true
              ) {
                if (sessionValue.runners[0].lay.length != 0) {
                  value.noScore = sessionValue.runners[0].lay[0].line;
                  value.noRate = sessionValue.runners[0].lay[0].price;
                } else {
                  value.noScore = 0;
                  value.noRate = 0;
                }
                if (sessionValue.runners[0].back.length != 0) {
                  value.yesScore = sessionValue.runners[0].back[0].line;
                  value.yesRate = sessionValue.runners[0].back[0].price;
                } else {
                  value.yesScore = 0;
                  value.yesRate = 0;
                }
                value.ballStatus = sessionValue.statusLabel;
              } else {
                value.noScore = 0;
                value.noRate = 0;
                value.yesScore = 0;
                value.yesRate = 0;
                value.ballStatus = sessionValue.statusLabel;
              }
            }
          }
        });
        $scope.fancyData = $scope.NewfancyData;
        angular.forEach($scope.fancyData, function (value1, index1) {
          if (value1.ballStatus != "") {
            $rootScope.removeRunningfancybetslip(value1.id);
          }
        });
      });
    });
  };
  $scope.subscribeFancyMarket = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.fancyProxy.invoke("SubscribeFancy", $scope.matchid);
  };
  $scope.unSubscribeFancyMarket = function () {
    //Invoking UnsubscribeMarket method defined in hub
    $scope.fancyProxy.invoke("UnsubscribeFancy", $scope.matchid);
    $scope.fancyHubAddress = null;
    $scope.fancyConnection.stop();
  };
  $scope.$on("$destroy", function () {
    $scope.unsubscribemultimatket();

    // $scope.unSubscribeFancyMarket();
  });
  $scope.pending_SessionData = false;
  $scope.SessionData = function (sportId, matchBfId) {
    $(".lay1").removeClass("spark");
    $(".lay2").removeClass("spark");
    $(".back2").removeClass("spark");
    $(".back1").removeClass("spark");
    if (matchBfId != null && matchBfId != undefined && sportId != undefined) {
      // if ($scope.pending_SessionData == true) return false
      // $scope.pending_SessionData = true
      $http({
        // method: "GET",
        // // url: "https://www.lotusbook.com/api/exchange/odds/event/" + $scope.$scope.sportId + "/" + $scope.matchBfId,
        // url: "https://www.lotusbook.com/api/exchange/odds/sma-event/LIOD/" + sportId + "/" + matchBfId,
        // headers: {
        //     "Content-Type": "application/json",
        // }
        method: "POST",
        url: "http://dak19.com/api/matchOdds.php",
        data: {
          sportId: sportId,
          matchBfId: matchBfId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then(
        function success(response) {
          // $scope.pending_SessionData = false
          //console.log(response, "SessionData")
          $scope.Sessionfeeds = $scope.sessionIdWiseData(response.data.result);
          // console.log($scope.Sessionfeeds)
          if ($scope.markets != undefined) {
            angular.forEach($scope.Sessionfeeds, function (value, index) {
              if ($scope.markets[value.id] != undefined) {
                $scope.markets[value.id].mktStatus = value.status;
                $scope.matchStatus = value.status;
                $scope.noSpaceMarketid = value.id
                  .replace(/[^a-z0-9\s]/gi, "")
                  .replace(/[_\s]/g, "_");
                angular.forEach(value.runners, function (item3, index) {
                  angular.forEach(
                    $scope.markets[value.id].runnerData,
                    function (item2) {
                      if (item2.runnerName == item3.name) {
                        // console.log(item3.back[0])
                        if (item3.back[0] != undefined) {
                          item3.back[0].size =
                            parseFloat(item3.back[0].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.back1 != item3.back[0].price ||
                            item2.backSize1 != item3.back[0].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "back1"
                            ).addClass("spark");
                          }
                          item2.back1 = item3.back[0].price;
                          item2.backSize1 = item3.back[0].size;
                        } else {
                          item2.back1 = null;
                          item2.backSize1 = null;
                        }
                        if (item3.back[1] != undefined) {
                          item3.back[1].size =
                            parseFloat(item3.back[1].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.back2 != item3.back[1].price ||
                            item2.backSize2 != item3.back[1].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "back2"
                            ).addClass("spark");
                          }
                          item2.back2 = item3.back[1].price;
                          item2.backSize2 = item3.back[1].size;
                        } else {
                          item2.back2 = null;
                          item2.backSize2 = null;
                        }
                        if (item3.back[2] != undefined) {
                          item3.back[2].size =
                            parseFloat(item3.back[2].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.back3 != item3.back[2].price ||
                            item2.backSize3 != item3.back[2].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "back3"
                            ).addClass("spark");
                          }
                          item2.back3 = item3.back[2].price;
                          item2.backSize3 = item3.back[2].size;
                        } else {
                          item2.back3 = null;
                          item2.backSize3 = null;
                        }
                        if (item3.lay[0] != undefined) {
                          item3.lay[0].size =
                            parseFloat(item3.lay[0].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.lay1 != item3.lay[0].price ||
                            item2.laySize1 != item3.lay[0].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "lay1"
                            ).addClass("spark");
                          }
                          item2.lay1 = item3.lay[0].price;
                          item2.laySize1 = item3.lay[0].size;
                        } else {
                          item2.lay1 = null;
                          item2.laySize1 = null;
                        }
                        if (item3.lay[1] != undefined) {
                          item3.lay[1].size =
                            parseFloat(item3.lay[1].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.lay2 != item3.lay[1].price ||
                            item2.laySize2 != item3.lay[1].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "lay2"
                            ).addClass("spark");
                          }
                          item2.lay2 = item3.lay[1].price;
                          item2.laySize2 = item3.lay[1].size;
                        } else {
                          item2.lay2 = null;
                          item2.laySize2 = null;
                        }
                        if (item3.lay[2] != undefined) {
                          item3.lay[2].size =
                            parseFloat(item3.lay[2].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.lay3 != item3.lay[2].price ||
                            item2.laySize3 != item3.lay[2].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "lay3"
                            ).addClass("spark");
                          }
                          item2.lay3 = item3.lay[2].price;
                          item2.laySize3 = item3.lay[2].size;
                        } else {
                          item2.lay3 = null;
                          item2.laySize3 = null;
                        }
                      }
                    }
                  );
                });
              }
            });
          }
        },
        function error(response) {
          // $scope.pending_SessionData = false
          if (response.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    }
  };
  $scope.sessionIdWiseData = function (sessions) {
    var newMarkets = {};
    angular.forEach(sessions, function (item, key) {
      newMarkets[item.name] = item;
    });
    return newMarkets;
    // console.log($scope.markets)
  };
  if ($rootScope.authcookie != undefined || $rootScope.authcookie != null) {
    //         var sessionstatus = $interval(function() {
    //     angular.forEach($scope.markets, function(items) {
    //         if (items.dataMode==2) {
    //             $scope.SessionData(items.sportId,items.matchBfId);
    //         }
    //     })
    // }, 1000);
  }
  // var highlightTimer
  // $scope.$on('$routeChangeStart', function() {
  //     $interval.cancel(sessionstatus);
  // })
});
app.controller("cricketController", function (
  $scope,
  $http,
  $cookieStore,
  $interval,
  $rootScope
) {
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!Cricket"]').hasClass("select")) {
    $('a[href="#!Cricket"]').addClass("select");
    $rootScope.inplaydiv = false;
    $rootScope.mainfooter = false;
    $rootScope.TournamentList("4", "Cricket");
  }
  // var favoriteCookie = $cookieStore.get('Userdata');
  $("#loading_page").css("display", "grid");
  $scope.Highlightlist = [];
  $scope.oldHighlightlist = [];
  $scope.showcricketinter = false;
  $scope.showcricket = function () {
    $(".btn-lay").removeClass("spark");
    $(".btn-back").removeClass("spark");
    if ($scope.showcricketinter == false) {
      $scope.showcricketinter = true;
    }
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/Highlights?sid=" + 4,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.showcricketinter = false;
          // console.log(response);
          // $scope.cricket = response.data.data;
          if (response.data.data.length < 1) {
            $scope.shoNoEvents = true;
          } else {
            $scope.shoNoEvents = false;
          }
          $scope.Highlightlist = response.data.data;
          // console.log($scope.Highlightlist)
          $("#loading_page").css("display", "none");
          if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
            $scope.oldHighlightlist = $scope.Highlightlist;
          }
          angular.forEach($scope.Highlightlist, function (item, index) {
            if (item.matchName == $scope.oldHighlightlist[index].matchName) {
              if (
                item.runner1Back != $scope.oldHighlightlist[index].runner1Back
              ) {
                $("#hback1_" + index).addClass("spark");
              }
              if (
                item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay
              ) {
                $("#hlay1_" + index).addClass("spark");
              }
              if (
                item.runner2Back != $scope.oldHighlightlist[index].runner2Back
              ) {
                $("#hback2_" + index).addClass("spark");
              }
              if (
                item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay
              ) {
                $("#hlay2_" + index).addClass("spark");
              }
              if (
                item.runner3Back != $scope.oldHighlightlist[index].runner3Back
              ) {
                $("#hback3_" + index).addClass("spark");
              }
              if (
                item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay
              ) {
                $("#hlay3_" + index).addClass("spark");
              }
              if (item.bfId == $scope.oldHighlightlist[index].bfId) {
                // console.log(item.bfId)
              }
              if (item.marketId == $scope.oldHighlightlist[index].marketId) {
                // console.log(item.marketId)
              }
              if (item.mtBfId == $scope.oldHighlightlist[index].mtBfId) {
                // console.log(item.mtBfId)
              }
            }
          });
          $scope.oldHighlightlist = $scope.Highlightlist;
          // console.log($scope.cricket)
        },
        function myError(error) {
          $scope.showcricketinter = false;
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.showcricketinter = false;
      // console.log(response);
      // $scope.cricket = response.data.data;
      // if (response.data.data.length < 1) {
      //     $scope.shoNoEvents = true;
      // } else {
      //     $scope.shoNoEvents = false;
      // }
      $scope.Highlightlist = $rootScope.highlightwisedata(4);
      // console.log($scope.Highlightlist)
      if ($scope.Highlightlist < 1) {
        $scope.shoNoEvents = true;
      } else {
        $scope.shoNoEvents = false;
      }
      $("#loading_page").css("display", "none");
      if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
        $scope.oldHighlightlist = $scope.Highlightlist;
        $("#tabMenu li a").removeClass("select");
        if (!$('a[href="#!Cricket"]').hasClass("select")) {
          $('a[href="#!Cricket"]').addClass("select");
          $rootScope.inplaydiv = false;
          $rootScope.mainfooter = false;
          $rootScope.TournamentList("4", "Cricket");
        }
      }
      angular.forEach($scope.Highlightlist, function (item, index) {
        if (item.matchName == $scope.oldHighlightlist[index].matchName) {
          if (item.runner1Back != $scope.oldHighlightlist[index].runner1Back) {
            $("#hback1_" + index).addClass("spark");
          }
          if (item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay) {
            $("#hlay1_" + index).addClass("spark");
          }
          if (item.runner2Back != $scope.oldHighlightlist[index].runner2Back) {
            $("#hback2_" + index).addClass("spark");
          }
          if (item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay) {
            $("#hlay2_" + index).addClass("spark");
          }
          if (item.runner3Back != $scope.oldHighlightlist[index].runner3Back) {
            $("#hback3_" + index).addClass("spark");
          }
          if (item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay) {
            $("#hlay3_" + index).addClass("spark");
          }
          if (item.bfId == $scope.oldHighlightlist[index].bfId) {
            // console.log(item.bfId)
          }
          if (item.marketId == $scope.oldHighlightlist[index].marketId) {
            // console.log(item.marketId)
          }
          if (item.mtBfId == $scope.oldHighlightlist[index].mtBfId) {
            // console.log(item.mtBfId)
          }
        }
      });
      $scope.oldHighlightlist = $scope.Highlightlist;
    }
  };
  var highlightTimer = $interval(function () {
    $scope.showcricket();
  }, 1000);
  $scope.$on("$destroy", function () {
    $interval.cancel(highlightTimer);
  });
});
app.controller("soccerController", function (
  $scope,
  $http,
  $cookieStore,
  $interval,
  $rootScope
) {
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!Soccer"]').hasClass("select")) {
    $('a[href="#!Soccer"]').addClass("select");
    $rootScope.inplaydiv = false;
    $rootScope.mainfooter = false;
    $rootScope.TournamentList("1", "Soccer");
  }
  $("#loading_page").css("display", "grid");
  $scope.Highlightlist = [];
  $scope.oldHighlightlist = [];
  $scope.showsoccerinter = false;
  $scope.showsoccer = function () {
    $(".btn-lay").removeClass("spark");
    $(".btn-back").removeClass("spark");
    if ($scope.showsoccerinter == false) {
      $scope.showsoccerinter = true;
    }
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/Highlights?sid=" + 1,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $("#loading_page").css("display", "none");
          $scope.showsoccerinter = false;
          // console.log(response);
          // $scope.cricket = response.data.data;
          if (response.data.data.length < 1) {
            $scope.shoNoEvents = true;
          } else {
            $scope.shoNoEvents = false;
          }
          $scope.Highlightlist = response.data.data;
          if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
            $scope.oldHighlightlist = $scope.Highlightlist;
          }
          angular.forEach($scope.Highlightlist, function (item, index) {
            if (item.matchName == $scope.oldHighlightlist[index].matchName) {
              if (
                item.runner1Back != $scope.oldHighlightlist[index].runner1Back
              ) {
                $("#hback1_" + index).addClass("spark");
              }
              if (
                item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay
              ) {
                $("#hlay1_" + index).addClass("spark");
              }
              if (
                item.runner2Back != $scope.oldHighlightlist[index].runner2Back
              ) {
                $("#hback2_" + index).addClass("spark");
              }
              if (
                item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay
              ) {
                $("#hlay2_" + index).addClass("spark");
              }
              if (
                item.runner3Back != $scope.oldHighlightlist[index].runner3Back
              ) {
                $("#hback3_" + index).addClass("spark");
              }
              if (
                item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay
              ) {
                $("#hlay3_" + index).addClass("spark");
              }
              if (item.bfId == $scope.oldHighlightlist[index].bfId) {
                // console.log(item.bfId)
              }
              if (item.marketId == $scope.oldHighlightlist[index].marketId) {
                // console.log(item.marketId)
              }
              if (item.mtBfId == $scope.oldHighlightlist[index].mtBfId) {
                // console.log(item.mtBfId)
              }
            }
          });
          $scope.oldHighlightlist = $scope.Highlightlist;
          // console.log($scope.cricket)
        },
        function myError(error) {
          $scope.showsoccerinter = false;
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $("#loading_page").css("display", "none");
      $scope.showsoccerinter = false;
      // console.log(response);
      // $scope.cricket = response.data.data;
      $scope.Highlightlist = $rootScope.highlightwisedata(1);
      if ($scope.Highlightlist.length < 1) {
        $scope.shoNoEvents = true;
      } else {
        $scope.shoNoEvents = false;
      }
      if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
        $scope.oldHighlightlist = $scope.Highlightlist;
        $("#tabMenu li a").removeClass("select");
        if (!$('a[href="#!Soccer"]').hasClass("select")) {
          $('a[href="#!Soccer"]').addClass("select");
          $rootScope.inplaydiv = false;
          $rootScope.mainfooter = false;
          $rootScope.TournamentList("1", "Soccer");
        }
      }
      angular.forEach($scope.Highlightlist, function (item, index) {
        if (item.matchName == $scope.oldHighlightlist[index].matchName) {
          if (item.runner1Back != $scope.oldHighlightlist[index].runner1Back) {
            $("#hback1_" + index).addClass("spark");
          }
          if (item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay) {
            $("#hlay1_" + index).addClass("spark");
          }
          if (item.runner2Back != $scope.oldHighlightlist[index].runner2Back) {
            $("#hback2_" + index).addClass("spark");
          }
          if (item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay) {
            $("#hlay2_" + index).addClass("spark");
          }
          if (item.runner3Back != $scope.oldHighlightlist[index].runner3Back) {
            $("#hback3_" + index).addClass("spark");
          }
          if (item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay) {
            $("#hlay3_" + index).addClass("spark");
          }
          if (item.bfId == $scope.oldHighlightlist[index].bfId) {
            // console.log(item.bfId)
          }
          if (item.marketId == $scope.oldHighlightlist[index].marketId) {
            // console.log(item.marketId)
          }
          if (item.mtBfId == $scope.oldHighlightlist[index].mtBfId) {
            // console.log(item.mtBfId)
          }
        }
      });
      $scope.oldHighlightlist = $scope.Highlightlist;
    }
  };
  var highlightTimer = $interval(function () {
    $scope.showsoccer();
  }, 1000);
  $scope.$on("$destroy", function () {
    $interval.cancel(highlightTimer);
  });
});
app.controller("tennisController", function (
  $scope,
  $http,
  $cookieStore,
  $interval,
  $rootScope
) {
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!Tennis"]').hasClass("select")) {
    $('a[href="#!Tennis"]').addClass("select");
    $rootScope.inplaydiv = false;
    $rootScope.mainfooter = false;
    $rootScope.TournamentList("2", "Tennis");
  }
  $scope.Highlightlist = [];
  $scope.oldHighlightlist = [];
  $("#loading_page").css("display", "grid");
  $scope.showtennisinter = false;
  $scope.showtennis = function () {
    $(".btn-lay").removeClass("spark");
    $(".btn-back").removeClass("spark");
    if ($scope.showtennisinter == false) {
      $scope.showtennisinter = true;
    }
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/Highlights?sid=2",
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.showtennisinter = false;
          // console.log(response);
          // $scope.cricket = response.data.data;
          if (response.data.data.length < 1) {
            $scope.shoNoEvents = true;
          } else {
            $scope.shoNoEvents = false;
          }
          $scope.Highlightlist = response.data.data;
          $("#loading_page").css("display", "none");
          if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
            $scope.oldHighlightlist = $scope.Highlightlist;
          }
          angular.forEach($scope.Highlightlist, function (item, index) {
            if (item.matchName == $scope.oldHighlightlist[index].matchName) {
              if (
                item.runner1Back != $scope.oldHighlightlist[index].runner1Back
              ) {
                $("#hback1_" + index).addClass("spark");
              }
              if (
                item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay
              ) {
                $("#hlay1_" + index).addClass("spark");
              }
              if (
                item.runner2Back != $scope.oldHighlightlist[index].runner2Back
              ) {
                $("#hback2_" + index).addClass("spark");
              }
              if (
                item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay
              ) {
                $("#hlay2_" + index).addClass("spark");
              }
              if (
                item.runner3Back != $scope.oldHighlightlist[index].runner3Back
              ) {
                $("#hback3_" + index).addClass("spark");
              }
              if (
                item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay
              ) {
                $("#hlay3_" + index).addClass("spark");
              }
            }
          });
          $scope.oldHighlightlist = $scope.Highlightlist;
          // console.log($scope.cricket)
        },
        function myError(error) {
          $scope.showtennisinter = false;
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.showtennisinter = false;
      // console.log(response);
      // $scope.cricket = response.data.data;
      $scope.Highlightlist = $rootScope.highlightwisedata(2);
      if ($scope.Highlightlist.length < 1) {
        $scope.shoNoEvents = true;
      } else {
        $scope.shoNoEvents = false;
      }
      $("#loading_page").css("display", "none");
      if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
        $scope.oldHighlightlist = $scope.Highlightlist;
        $("#tabMenu li a").removeClass("select");
        if (!$('a[href="#!Tennis"]').hasClass("select")) {
          $('a[href="#!Tennis"]').addClass("select");
          $rootScope.inplaydiv = false;
          $rootScope.mainfooter = false;
          $rootScope.TournamentList("2", "Tennis");
        }
      }
      angular.forEach($scope.Highlightlist, function (item, index) {
        if (item.matchName == $scope.oldHighlightlist[index].matchName) {
          if (item.runner1Back != $scope.oldHighlightlist[index].runner1Back) {
            $("#hback1_" + index).addClass("spark");
          }
          if (item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay) {
            $("#hlay1_" + index).addClass("spark");
          }
          if (item.runner2Back != $scope.oldHighlightlist[index].runner2Back) {
            $("#hback2_" + index).addClass("spark");
          }
          if (item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay) {
            $("#hlay2_" + index).addClass("spark");
          }
          if (item.runner3Back != $scope.oldHighlightlist[index].runner3Back) {
            $("#hback3_" + index).addClass("spark");
          }
          if (item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay) {
            $("#hlay3_" + index).addClass("spark");
          }
        }
      });
      $scope.oldHighlightlist = $scope.Highlightlist;
    }
  };
  var highlightTimer = $interval(function () {
    $scope.showtennis();
  }, 1000);
  $scope.$on("$destroy", function () {
    $interval.cancel(highlightTimer);
  });
});
app.controller("teenpattiController", function (
  $scope,
  $http,
  $cookieStore,
  $interval,
  $rootScope
) {
  $rootScope.betslippanelcss();
  $("#tabMenu li a").removeClass("select");
  if (!$('a[href="#!Live Teenpatti"]').hasClass("select")) {
    $('a[href="#!Live Teenpatti"]').addClass("select");
    $rootScope.inplaydiv = false;
    $rootScope.mainfooter = false;
    $rootScope.TournamentList("2000", "Live Teenpatti");
  }

  $scope.Highlightlist = [];
  $scope.oldHighlightlist = [];
  $("#loading_page").css("display", "grid");

  $scope.showtennisinter = false;
  $scope.showtennis = function () {
    $(".btn-lay").removeClass("spark");
    $(".btn-back").removeClass("spark");
    if ($scope.showtennisinter == false) {
      $scope.showtennisinter = true;
    }
    if ($rootScope.fType == 1) {
      $http({
        url: "http://bsf555.com/Client/BSFClient.svc/Data/Highlights?sid=2",

        method: "GET",

        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          $scope.showtennisinter = false;
          // console.log(response);
          // $scope.cricket = response.data.data;
          if (response.data.data.length < 1) {
            $scope.shoNoEvents = true;
          } else {
            $scope.shoNoEvents = false;
          }
          $scope.Highlightlist = response.data.data;

          $("#loading_page").css("display", "none");

          if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
            $scope.oldHighlightlist = $scope.Highlightlist;
          }

          angular.forEach($scope.Highlightlist, function (item, index) {
            if (item.matchName == $scope.oldHighlightlist[index].matchName) {
              if (
                item.runner1Back != $scope.oldHighlightlist[index].runner1Back
              ) {
                $("#hback1_" + index).addClass("spark");
              }
              if (
                item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay
              ) {
                $("#hlay1_" + index).addClass("spark");
              }
              if (
                item.runner2Back != $scope.oldHighlightlist[index].runner2Back
              ) {
                $("#hback2_" + index).addClass("spark");
              }
              if (
                item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay
              ) {
                $("#hlay2_" + index).addClass("spark");
              }
              if (
                item.runner3Back != $scope.oldHighlightlist[index].runner3Back
              ) {
                $("#hback3_" + index).addClass("spark");
              }
              if (
                item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay
              ) {
                $("#hlay3_" + index).addClass("spark");
              }
            }
          });
          $scope.oldHighlightlist = $scope.Highlightlist;

          // console.log($scope.cricket)
        },
        function myError(error) {
          $scope.showtennisinter = false;
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      $scope.showtennisinter = false;
      // console.log(response);
      // $scope.cricket = response.data.data;

      $scope.Highlightlist = $rootScope.highlightwisedata(2000);
      if ($scope.Highlightlist.length < 1) {
        $scope.shoNoEvents = true;
      } else {
        $scope.shoNoEvents = false;
      }

      $("#loading_page").css("display", "none");

      if ($scope.oldHighlightlist.length != $scope.Highlightlist.length) {
        $scope.oldHighlightlist = $scope.Highlightlist;
        $("#tabMenu li a").removeClass("select");
        if (!$('a[href="#!Live Teenpatti"]').hasClass("select")) {
          $('a[href="#!Live Teenpatti"]').addClass("select");
          $rootScope.inplaydiv = false;
          $rootScope.mainfooter = false;
          $rootScope.TournamentList("2000", "Live Teenpatti");
        }
      }

      angular.forEach($scope.Highlightlist, function (item, index) {
        if (item.matchName == $scope.oldHighlightlist[index].matchName) {
          if (item.runner1Back != $scope.oldHighlightlist[index].runner1Back) {
            $("#hback1_" + index).addClass("spark");
          }
          if (item.runner1Lay != $scope.oldHighlightlist[index].runner1Lay) {
            $("#hlay1_" + index).addClass("spark");
          }
          if (item.runner2Back != $scope.oldHighlightlist[index].runner2Back) {
            $("#hback2_" + index).addClass("spark");
          }
          if (item.runner2Lay != $scope.oldHighlightlist[index].runner2Lay) {
            $("#hlay2_" + index).addClass("spark");
          }
          if (item.runner3Back != $scope.oldHighlightlist[index].runner3Back) {
            $("#hback3_" + index).addClass("spark");
          }
          if (item.runner3Lay != $scope.oldHighlightlist[index].runner3Lay) {
            $("#hlay3_" + index).addClass("spark");
          }
        }
      });
      $scope.oldHighlightlist = $scope.Highlightlist;
    }
  };

  var highlightTimer = $interval(function () {
    $scope.showtennis();
  }, 1000);

  $scope.$on("$destroy", function () {
    $interval.cancel(highlightTimer);
  });
});
app.controller("fullmarketController", function (
  $scope,
  $http,
  $cookieStore,
  $window,
  $routeParams,
  $rootScope,
  $interval,
  $location
) {
  $rootScope.betslippanelcss();
  $(document).ready(function () {
    // $("#eventType").on('click',function(){
    //    $(".slip-wrap").toggleClass("close");
    // })
    if ($("#betslip_open").hasClass("close") == true) {
      $(".matched-wrap").css("height", "calc(100% - 31px)");
    } else {
      $(".matched-wrap").css("height", "calc(100% - 325px)");
    }
  });
  $rootScope.mainfooter = true;
  // $rootScope.selectMenuMatch = parseInt($routeParams.matchId);
  $rootScope.selectMenuMatch = 0;
  $("#loading_page").css("display", "grid");
  // $scope.dataMode=$routeParams.dataMode;
  $scope.mktId = $routeParams.marketId;
  $scope.matchid = $routeParams.matchId;
  $scope.bfId = $routeParams.bfId;
  $rootScope.routbfid = $routeParams.bfId;
  var mktbfId = $routeParams.bfId;
  $scope.sportId = $routeParams.sportid;
  $scope.tourID = $routeParams.tourid;
  // $scope.BookDataList = []
  $scope.fancyDataList = [];
  $scope.runeerdataList = [];
  $scope.marketWiseData = function (markets) {
    var newMarkets = {};
    angular.forEach(markets, function (item, key) {
      if ($rootScope.fType == 1) {
        newMarkets[item.bfId] = item;
      } else {
        var runnerarray = [];
        angular.forEach(item.runnerData1, function (item, key) {
          if (item.Key != undefined) {
            runnerarray.push(item.Value);
          } else {
            runnerarray.push(item);
          }
        });
        item.runnerData1 = runnerarray;
        item.runnerData = item.runnerData1;
        item["marketName"] = item.name;
        item["mktStatus"] = item.status.trim("");
        item["mktId"] = item.id;
        // item['mtBfId']=item.bfId;
        newMarkets[item.bfId] = item;
      }
    });
    return newMarkets;
    // console.log($scope.markets)
  };
  $scope.hubAddress = "";
  var matchOddtimer;
  $scope.HubAddress = function () {
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      return false;
    }
    $http({
      url: ApiUrl + "/Data/HubAddress?id=" + $scope.mktId,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.hubAddress = response.data.hubAddress;
        $scope.fancyHubAddress = response.data.fancyHubAddress;
        if ($scope.hubAddress && $scope.dataMode == 1) {
          $scope.connectSignalr($scope.hubAddress);
        }
        if ($scope.fancyHubAddress != null && $scope.hasFancy == 1) {
          $scope.connectFancySignalr($scope.fancyHubAddress);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $rootScope.$on("calLHubAddress", function () {
    $scope.HubAddress();
  });
  $scope.marketSessionHubAddress = null;
  $scope.marketSessionSignalr = function () {
    //Getting the connection object
    $scope.marketSessionHubAddress = "http://178.238.236.221:12580";
    $scope.marketSessionConnection = $.hubConnection(
      "http://178.238.236.221:12580"
    );
    //Creating Proxy
    $scope.marketSessionProxy = $scope.marketSessionConnection.createHubProxy(
      "DataHub"
    );
    //Starting connection
    $scope.marketSessionConnection
      .start()
      .done(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        console.log("Market Session Connection Established= " + hubConState);
        // $scope.subscribeMarket();
      })
      .fail(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        // console.log("Could not connect= " + hubConState);
      });
    $scope.marketSessionConnection.stateChanged(function (change) {
      // console.log(change.newState)
      if (change.newState != 1 && $scope.marketSessionHubAddress != null) {
        $scope.marketSessionConnection.start().done(function (myHubConnection) {
          var hubConState = myHubConnection.state;
          console.log(
            "Market Session ReConnection Established = " + hubConState
          );
        });
      }
      if (change.newState == 1 && $scope.marketSessionHubAddress != null) {
        $scope.subscribeMarketSession();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.marketSessionProxy.on("BroadcastSubscribedData", function (data) {
      // console.log(data);
      $scope.DiaSessionfeeds = $scope.sessionIdWiseData(data.LambiData, "d");
    });
  };
  $scope.subscribeMarketSession = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.marketSessionProxy.invoke("SubscribeMatch", $scope.bfId);
  };
  $scope.unSubscribeMarketSession = function () {
    //Invoking UnsubscribeMarket method defined in hub
    if ($scope.marketSessionHubAddress != null) {
      $scope.marketSessionProxy.invoke("UnSubscribeMatch", $scope.bfId);
      $scope.marketSessionHubAddress = null;
      $scope.marketSessionConnection.stop();
    }
  };
  $scope.MatchScoreHubAddress = null;
  $scope.MatchScoreSignalr = function () {
    //Getting the connection object
    $scope.MatchScoreHubAddress = "http://178.238.236.221:13582";
    $scope.MatchScoreConnection = $.hubConnection(
      "http://178.238.236.221:13582"
    );
    //Creating Proxy
    $scope.MatchScoreProxy = $scope.MatchScoreConnection.createHubProxy(
      "ScoreHub"
    );
    //Starting connection
    $scope.MatchScoreConnection.start()
      .done(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        console.log("Match Score Connection Established= " + hubConState);
        // $scope.subscribeMarket();
      })
      .fail(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        // console.log("Could not connect= " + hubConState);
      });
    $scope.MatchScoreConnection.stateChanged(function (change) {
      // console.log(change.newState)
      if (change.newState != 1 && $scope.MatchScoreHubAddress != null) {
        $scope.MatchScoreConnection.start().done(function (myHubConnection) {
          var hubConState = myHubConnection.state;
          console.log("Match Score ReConnection Established = " + hubConState);
        });
      }
      if (change.newState == 1 && $scope.MatchScoreHubAddress != null) {
        $scope.subscribeMatchScore();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.MatchScoreProxy.on("BroadcastSubscribedData", function (data) {
      // console.log(data);
      // data=JSON.parse(data);
      $scope.SessionData(data.fancy);
      // $scope.getmatchstatus(data.result);
    });
  };
  // $scope.mbfId="29175469";
  $scope.subscribeMatchScore = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.MatchScoreProxy.invoke("SubscribeMatch", $scope.matchBfId);
  };
  $scope.unSubscribeMatchScore = function () {
    //Invoking UnsubscribeMarket method defined in hub
    if (
      $scope.MatchScoreHubAddress != null &&
      $scope.Sessionfeeds != undefined
    ) {
      $scope.MatchScoreProxy.invoke("UnSubscribeMatch", $scope.matchBfId);
      $scope.MatchScoreHubAddress = null;
      $scope.MatchScoreConnection.stop();
    }
  };

  $scope.scoreId = 0;
  $scope.GetScoreId = function () {
    $http({
      method: "GET",
      url:
        "http://173.249.21.26/SkyImporter/MatchImporter.svc/GetScoreId?eventid=" +
        $scope.matchBfId,
      headers: {
        Token: "without",
      },
    }).then(
      function mySuccess(data) {
        $scope.scoreId = data.data.scoreId;
        if ($scope.scoreId != 0) {
          $scope.get_event();
        }
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };

  $scope.get_event = function () {
    if (!$scope.scoreId) {
      return;
    }

    $http({
      url:
        "https://lmt.fn.sportradar.com/common/en/Etc:UTC/cricket/get_event/" +
        $scope.scoreId,
      method: "GET",
    }).then(function success(data) {
      $scope.sportEvent = data.data.doc[0].data.sportEvent;
      $scope.get_scorecard();
    });
  };

  $scope.get_scorecard = function () {
    if ($scope.scoreId == 0) {
      return;
    }

    $http({
      url:
        "https://lmt.fn.sportradar.com/common/en/Etc:UTC/cricket/get_scorecard/" +
        $scope.scoreId,
      method: "GET",
    }).then(function success(data) {
      $scope.scorecard = data.data.doc[0].data.score;
      if ($scope.scorecard) {
        $scope.scorecard.ballByBallSummaries.reverse();
        // $scope.scorecard.innings[$scope.scorecard.currentInningsNumber - 1].bowlers

        $scope.fours = 0;
        $scope.sixes = 0;
        $scope.extrasSummary = 0;
        angular.forEach(
          $scope.scorecard.innings[$scope.scorecard.currentInningsNumber - 1]
            .bowlers,
          function (item, index) {
            $scope.fours = $scope.fours + item.fours;
            $scope.sixes = $scope.sixes + item.sixes;
          }
        );
        $scope.extrasSummary =
          $scope.scorecard.innings[$scope.scorecard.currentInningsNumber - 1]
            .extrasSummary.byes +
          $scope.scorecard.innings[$scope.scorecard.currentInningsNumber - 1]
            .extrasSummary.legByes +
          $scope.scorecard.innings[$scope.scorecard.currentInningsNumber - 1]
            .extrasSummary.noBalls +
          $scope.scorecard.innings[$scope.scorecard.currentInningsNumber - 1]
            .extrasSummary.penalties +
          $scope.scorecard.innings[$scope.scorecard.currentInningsNumber - 1]
            .extrasSummary.wides;
      }
    });
  };

  var stscoreInterval = $interval(function () {
    $scope.get_scorecard();
  }, 1000);

  var clock;
  $(function () {
    clock = new FlipClock($(".clock"), 99, {
      clockFace: "Counter",
    });
  });

  $scope.pending_GetRecentGameResult = true;
  $scope.GetRecentGameResult = function (gametype) {
    if ($scope.pending_GetRecentGameResult == false) {
      return false;
    }
    $scope.pending_GetRecentGameResult = false;
    $http({
      url: ApiUrl + "/Reports/GetRecentGameResult?gametype=" + gametype,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        $scope.resultsdata = response.data.data;
        $scope.pending_GetRecentGameResult = true;
      },
      function myError(error) {
        $scope.pending_GetRecentGameResult = true;
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };

  var Lastgammeresulttimer;
  $scope.LastgameResult = function (gametype) {
    Lastgammeresulttimer = setInterval(function () {
      $scope.GetRecentGameResult(gametype);
    }, 10000);
  };

  $scope.andar_bahar = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  $scope.TeenPattiHubAddress = null;
  $rootScope.Teentype = null;
  $scope.teenPattiData = null;
  $scope.TeenPattiSignalr = function (teenBfId) {
    //Getting the connection object
    if (teenBfId == "1.150000000") {
      $scope.TeenPattiHubAddress = "http://45.76.155.250:11001";
      $rootScope.Teentype = 1;
      $scope.LastgameResult($rootScope.Teentype);
    } else if (teenBfId == "1.1010001") {
      $scope.TeenPattiHubAddress = "http://45.76.155.250:11002";
      $rootScope.Teentype = 2;
    } else if (teenBfId == "1.5002") {
      $scope.TeenPattiHubAddress = "http://45.76.155.250:11003";
      $rootScope.Teentype = 3;
    } else if (teenBfId == "1.5003") {
      $scope.TeenPattiHubAddress = "http://45.76.155.250:11004";
      $rootScope.Teentype = 4;
    } else if (teenBfId == "1.1020012") {
      $scope.TeenPattiHubAddress = "http://45.76.155.250:11005";
      $rootScope.Teentype = 5;
      $scope.LastgameResult($rootScope.Teentype);
    } else if (teenBfId == "1.10123112") {
      $scope.TeenPattiHubAddress = "http://45.76.155.250:11006";
      $rootScope.Teentype = 6;
      $scope.LastgameResult($rootScope.Teentype);
    } else if (teenBfId == "1.10120012") {
      $scope.TeenPattiHubAddress = "http://45.76.155.250:11007";
      $rootScope.Teentype = 7;
      $scope.LastgameResult($rootScope.Teentype);
    }

    $scope.TeenPattiConnection = $.hubConnection($scope.TeenPattiHubAddress);
    //Creating Proxy
    $scope.TeenPattiProxy = $scope.TeenPattiConnection.createHubProxy(
      "FancyHub"
    );
    //Starting connection
    $scope.TeenPattiConnection.start()
      .done(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        console.log("TeenPatti Connection Established= " + hubConState);
        // $scope.subscribeMarket();
      })
      .fail(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        // console.log("Could not connect= " + hubConState);
      });
    $scope.TeenPattiConnection.stateChanged(function (change) {
      // console.log(change.newState)
      if (
        change.newState != 1 &&
        $scope.TeenPattiHubAddress != null &&
        $scope.TeenPattiHubAddress != ""
      ) {
        $scope.TeenPattiConnection.start().done(function (myHubConnection) {
          var hubConState = myHubConnection.state;
          console.log("TeenPatti ReConnection Established = " + hubConState);
        });
      }
      if (
        change.newState == 1 &&
        $scope.TeenPattiHubAddress != null &&
        $scope.TeenPattiHubAddress != ""
      ) {
        $scope.subscribeTeenPatti();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.TeenPattiProxy.on("BroadcastSubscribedData", function (data) {
      //  $scope.$apply(function () {
      //  $scope.teenPattiData = data.data;
      //  console.log($scope.teenPattiData);
      //  if (data.data.t1 != undefined) {
      //    if (data.data.t1.length != 0) {
      //      $scope.teenSetting = data.data.t1[0];

      //      if($scope.teenSetting.cards){
      //        $scope.openCards = $scope.teenSetting.cards.split(',');
      //      }
      //      $scope.double = $scope.teenSetting.autotime.split("")[1];
      //      $scope.teenSetting["NextTime"] = JSON.stringify(
      //        parseInt($scope.teenSetting.autotime) + 1
      //      );
      //      console.log($scope.teenPattiData);
      //      clock.setValue($scope.teenSetting.autotime);
      //    }
      //  } else {
      //    if (data.data.bf.length != 0) {
      //      if ($scope.teenPattiData.bf[0].lastime) {
      //        clock.setValue($scope.teenPattiData.bf[0].lastime);
      //        }
      //    }
      //  }
      // });

      $scope.teenPattiData = data.data;
      console.log($scope.teenPattiData);
      $scope.$apply(function () {
        if ($rootScope.Teentype == 1) {
          $scope.tpData = data.data.t1[0];
          $scope.tpMarket = data.data.t2;
          $scope.teenSetting = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
          if (!$rootScope.gameid) {
            setTimeout(function () {
              $rootScope.ExposureBookTeenPatti($scope.tpData.mid);
            }, 500);
          }
          if ($rootScope.gameid != $scope.tpData.mid) {
            setTimeout(function () {
              $rootScope.ExposureBookTeenPatti($scope.tpData.mid);
            }, 500);
          }
        }
        if ($rootScope.Teentype == 2) {
          $scope.tpMarket = data.data.bf;
          if ($scope.tpMarket[0].lastime) {
            clock.setValue($scope.tpMarket[0].lastime);
          }

          if (!$rootScope.gameid) {
            setTimeout(function () {
              $rootScope.ExposureBookTeenPatti($scope.tpMarket[0].marketId);
            }, 500);
          }
          if ($rootScope.gameid != $scope.tpMarket[0].marketId) {
            setTimeout(function () {
              $rootScope.ExposureBookTeenPatti($scope.tpMarket[0].marketId);
            }, 500);
          }
        }
        if ($rootScope.Teentype == 3) {
          $scope.tpData = data.data.t1[0];
          $scope.tpMarket = data.data.t2;
          $scope.teenSetting = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
        }
        if ($rootScope.Teentype == 4) {
          $scope.tpData = data.data.t1[0];
          $scope.tpMarket = data.data.t2;
          $scope.openCards = $scope.tpData.cards.split(",");
          $scope.teenSetting = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
        }
        if ($rootScope.Teentype == 5) {
          // console.log(data.data);
          $scope.tpData = data.data.t1[0];
          $scope.tpMarket = data.data.t2;
          // $scope.openCards = $scope.tpData.cards.split(',');
          // $scope.teenSetting = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
          if (!$rootScope.gameid) {
            setTimeout(function () {
              $rootScope.ExposureBookLucky7($scope.tpData.mid);
            }, 500);
          }
          if ($rootScope.gameid != $scope.tpData.mid) {
            setTimeout(function () {
              $rootScope.ExposureBookLucky7($scope.tpData.mid);
            }, 500);
          }
        }
        if ($rootScope.Teentype == 6) {
          // console.log(data.data);
          $scope.tpData = data.data.t1[0];
          $scope.tpMarket = data.data.t2;
          $scope.teenSetting = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
          if (!$rootScope.gameid) {
            setTimeout(function () {
              $rootScope.ExposureBookTeenPatti($scope.tpData.mid);
            }, 500);
          }
          if ($rootScope.gameid != $scope.tpData.mid) {
            setTimeout(function () {
              $rootScope.ExposureBookTeenPatti($scope.tpData.mid);
            }, 500);
          }
        }
        if ($rootScope.Teentype == 7) {
          // console.log(data.data);
          $scope.AndarValues = [];
          $scope.BaharValues = [];
          $scope.Aallcards = [];
          $scope.Ballcards = [];
          $scope.Aresults = [];
          $scope.Bresults = [];

          $scope.tpData = data.data.t1[0];
          $scope.tpMarket = data.data.t2;
          if (data.data.t3[0].aall != "") {
            $scope.Aallcards = data.data.t3[0].aall.split(",");
          }
          if (data.data.t3[0].ball != "") {
            $scope.Ballcards = data.data.t3[0].ball.split(",");
          }
          if (data.data.t3[0].ar != "") {
            $scope.Aresults = data.data.t3[0].ar.split(",");
          }
          if (data.data.t3[0].br != "") {
            $scope.Bresults = data.data.t3[0].br.split(",");
          }
          angular.forEach($scope.tpMarket, function (item, index) {
            var andarbaharnat = item.nation.split(" ");

            if (andarbaharnat[0] == "Ander") {
              $scope.AndarValues.push(item);
            }
            if (andarbaharnat[0] == "Bahar") {
              $scope.BaharValues.push(item);
            }
          });
          clock.setValue($scope.tpData.autotime);
          if (!$rootScope.gameid) {
            setTimeout(function () {
              $rootScope.AndarBaharExposureBook($scope.tpData.mid);
            }, 500);
          }
          if ($rootScope.gameid != $scope.tpData.mid) {
            setTimeout(function () {
              $rootScope.AndarBaharExposureBook($scope.tpData.mid);
            }, 500);
          }
        }
      });
    });
  };

  $scope.subscribeTeenPatti = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.TeenPattiProxy.invoke("SubscribeFancy", $rootScope.Teentype);
  };
  $scope.unSubscribeTeenPatti = function () {
    //Invoking UnsubscribeMarket method defined in hub
    if ($rootScope.Teentype != undefined) {
      $scope.TeenPattiProxy.invoke("UnsubscribeFancy", $rootScope.Teentype);
      $scope.TeenPattiHubAddress = "";
      $scope.TeenPattiConnection.stop();
    }
  };

  $scope.getCardSymbolImg = function (cardName) {
    if (cardName == "1") {
      return "";
    }
    let char = "";
    let type = "";
    let className = "";
    let value = "";
    if (cardName.length == 4) {
      char = cardName.substring(0, 2);
      type = cardName.slice(2);
    } else {
      char = cardName.charAt(0);
      type = cardName.slice(1);
    }
    switch (type) {
      case "HH":
        type = "}";
        className = "card-black1";
        break;
      case "DD":
        type = "{";
        className = "card-red1";
        break;
      case "CC":
        type = "]";
        className = "card-black1";
        break;
      case "SS":
        type = "[";
        className = "card-red1";
        break;
    }

    value = char + '<span class="' + className + '">' + type + "</span>";

    return value;
  };

  $rootScope.MktData = function () {
    $scope.mtid = $routeParams.matchId;
    $scope.mktid = $routeParams.marketId;
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/AllMktData?mtid=" + $scope.mtid,
        // url: ApiUrl + "/Data/MktData?mtid=" + $scope.mtid + "&mktid=" + $scope.mktid,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response);
          $scope.linemarketArray = [];
          $scope.runnerData = response.data.data;
          $scope.matchName = response.data.data.matchName;
          $rootScope.fullMarketmatchName = response.data.data.matchName;
          $scope.markets = $scope.marketWiseData(response.data.data.mktData);
          // console.log($scope.markets);
          angular.forEach($scope.markets, function (item) {
            if (item.bfId != $routeParams.bfId) {
              $scope.linemarketArray.push(item);
            }
          });
          $rootScope.MarketList($scope.mtid, $scope.matchName);
          // console.log($scope.linemarketArray);
          $scope.matchDate = response.data.data.matchDate;
          $scope.betDelay = response.data.limits.betDelay;
          $scope.maxiStake = response.data.limits.maxStake;
          $scope.minStake = response.data.limits.minStake;
          $scope.maxProfit = response.data.limits.maxProfit;
          $scope.isInplayfull = response.data.data.isInplay;
          $scope.currentSportId = response.data.data.sportId.trim();
          $scope.currentEventId = response.data.data.mtBfId;
          $scope.dataMode = response.data.data.dataMode;
          $scope.sportId = response.data.data.sportId.trim();
          $scope.matchBfId = response.data.data.mtBfId;
          $("#loading_page").css("display", "none");
          if (response.data.liveTvConfig.channelIp != null) {
            // $('#showLiveTvPro').empty()
            var channelIp = response.data.liveTvConfig.channelIp.trim();
            var channelNo = response.data.liveTvConfig.channelNo;
            var hdmi = response.data.liveTvConfig.hdmi.trim().toUpperCase();
            var program = response.data.liveTvConfig.program.trim();
            if ($("#hasTv").attr("id") == undefined) {
              $("#showLiveTvPro").append(
                '<div id="hasTv" style="padding-left:0px;padding-top:4px;text-align:center"> <u1 id="' +
                  program +
                  '"></u1> <script type="text/javascript"> if ( "MediaSource" in window && "WebSocket" in window ){RunPlayer( \'' +
                  program +
                  "', 370, 250, '" +
                  channelIp +
                  "', \"5119\", false, '" +
                  hdmi +
                  '\', "", true, true, 0.01, "", false ); } else {document.getElementById(' +
                  program +
                  ').innerHTML = "Websockets are not supported in your browser."; } </script> </div>'
              );
            }
            // console.log($('#showLiveTvPro').children('div').length)
          }
          angular.forEach($scope.markets, function (item) {
            if ($scope.hubAddress == "" && $scope.fancyHubAddress == "") {
              angular.forEach(item.runnerData, function (item2) {
                item2.back1 = null;
                item2.back2 = null;
                item2.back3 = null;
                item2.backSize1 = null;
                item2.backSize2 = null;
                item2.backSize3 = null;
                item2.lay1 = null;
                item2.lay2 = null;
                item2.lay3 = null;
                item2.laySize1 = null;
                item2.laySize2 = null;
                item2.laySize3 = null;
              });
            }
            $rootScope.ExposureBook(item.mktId);
          });
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      if ($rootScope.sportsData != undefined) {
        $("#tabMenu li a").removeClass("select");
        if ($routeParams.sportid == "4") {
          if (!$('a[href="#!Cricket"]').hasClass("select")) {
            $('a[href="#!Cricket"]').addClass("select");
            $rootScope.TournamentList("4", "Cricket");
          }
        } else if ($routeParams.sportid == "1") {
          if (!$('a[href="#!Soccer"]').hasClass("select")) {
            $('a[href="#!Soccer"]').addClass("select");
            $rootScope.TournamentList("1", "Soccer");
          }
        } else if ($routeParams.sportid == "2") {
          if (!$('a[href="#!Tennis"]').hasClass("select")) {
            $('a[href="#!Tennis"]').addClass("select");
            $rootScope.TournamentList("2", "Tennis");
          }
        }
        $scope.linemarketArray = [];
        $scope.marketdata =
          $rootScope.sportsData[$scope.sportId].tournaments[
            $scope.tourID
          ].matches[$scope.matchid];
        $rootScope.eventList(
          $rootScope.sportsData[$scope.sportId].tournaments[$scope.tourID].bfId,
          $rootScope.sportsData[$scope.sportId].tournaments[$scope.tourID].name,
          $scope.sportId
        );
        $rootScope.MarketList($scope.mtid, $scope.marketdata.name);
        // console.log($scope.mtid,$rootScope.sportsData[$scope.sportId].tournaments[$scope.tourID].matches[$scope.matchid].name)
        $scope.marketdata["matchName"] = $scope.marketdata.name;
        $scope.marketdata["matchDate"] = $scope.marketdata.startDate;
        $scope.markets = $scope.marketWiseData($scope.marketdata.markets);
        angular.forEach($scope.markets, function (item, ind) {
          if (item.bfId != $routeParams.bfId) {
            $scope.linemarketArray.push(item);
          }
        });
        console.log($scope.linemarketArray);
        $scope.dataMode = $scope.marketdata.dataMode;
        if ($scope.dataMode == 1 && $scope.sportId != "2000") {
          $scope.HubAddress();
        }
        if ($scope.sportId == "2000") {
          // $scope.marketSessionSignalr();
          // $scope.MatchScoreSignalr();
          $scope.TeenPattiSignalr($scope.bfId);
        }

        $scope.matchBfId = $scope.marketdata.bfId;
        $rootScope.MatchBfID = $scope.marketdata.bfId;
        $rootScope.fullMarketmatchName = $scope.marketdata.name;
        $scope.matchbookRates = $scope.marketdata.bookRates;
        $scope.commentary = $scope.marketdata.commentary;
        $scope.inPlay = $scope.marketdata.inPlay;
        $scope.hasFancy = $scope.marketdata.hasFancy;
        $scope.matchName = $scope.marketdata.name;
        $scope.settings = $scope.marketdata.settings;
        if ($scope.settings != null) {
          $scope.matchDate = $scope.settings.matchDate;
          $scope.betDelay = $scope.settings.betDelay;
          $scope.minStake = $scope.settings.minStake;
          $scope.maxiStake = $scope.settings.maxStake;
        }
        if ($scope.inPlay == 1) {
          // $scope.runnerData.isInplay = 'true';
          $scope.isInplayfull = "true";
        } else {
          // $scope.runnerData.isInplay = 'false';
          $scope.isInplayfull = "false";
        }
        if ($scope.settings != null && $scope.settings != 0) {
          $scope.volMulti = $scope.settings.volMulti;
        } else {
          $scope.volMulti = 10;
        }
        $scope.matchDate = $scope.marketdata.startDate;
        $scope.status = $scope.marketdata.status;
        $scope.tvConfig = $scope.marketdata.tvConfig;
        $scope.matchfancyData = $scope.marketdata.fancyData;
        $scope.GetScoreId();
        angular.forEach($scope.markets, function (item) {
          if ($scope.hubAddress == "" && $scope.fancyHubAddress == "") {
            angular.forEach(item.runnerData, function (item2) {
              item2.back1 = null;
              item2.back2 = null;
              item2.back3 = null;
              item2.backSize1 = null;
              item2.backSize2 = null;
              item2.backSize3 = null;
              item2.lay1 = null;
              item2.lay2 = null;
              item2.lay3 = null;
              item2.laySize1 = null;
              item2.laySize2 = null;
              item2.laySize3 = null;
            });
          }
          $rootScope.ExposureBook(item.mktId);
        });
      }
    }
  };
  $rootScope.MktData();
  var MktDatastatus = $interval(function () {
    // $rootScope.MktData();
  }, 50000);
  // var highlightTimer
  $scope.$on("$routeChangeStart", function () {
    $interval.cancel(MktDatastatus);
    if (Lastgammeresulttimer) {
      clearInterval(Lastgammeresulttimer);
    }
  });
  $rootScope.$on("callMktData", function () {
    $rootScope.MktData();
  });
  $rootScope.FancyData = function () {
    $scope.mtid = $routeParams.matchId;
    if ($rootScope.fType == 1) {
      $http({
        url: ApiUrl + "/Data/FancyData?mtid=" + $scope.mtid,
        method: "GET",
        headers: {
          Token: authtoken,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response);
          $scope.fancyData = response.data.data;
          $scope.bookmakingData = response.data.bookmakingData;
          if ($scope.bookmakingData.length != 0) {
            $rootScope.getBMExposureBook();
          }
          $scope.top = 0;
          for (var i = 0; i < $scope.fancyData.length; i++) {
            $rootScope.getFancyExposure(
              $scope.fancyData[i].id,
              $scope.fancyData[i].name
            );
          }
        },
        function myError(error) {
          if (error.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    } else {
      // if (true) {}
      $scope.fancyData = $scope.matchfancyData;
      $scope.bookmakingData = $scope.matchbookRates;
      // console.log($rootScope.fancyBook)
      // $scope.getBMExposureBook();
      $scope.top = 0;
      angular.forEach($rootScope.fancyBook, function (item, index) {
        angular.forEach($scope.fancyData, function (fancy) {
          if (index == fancy.name) {
            var fancyName = index
              .replace(/[^a-z0-9\s]/gi, "")
              .replace(/[_\s]/g, "_");
            if (item == 0) {
              item = 0;
              $("#fancyBetBookBtn_" + fancy.id + "").css("display", "block");
            } else {
              if (item > 0) {
                $("#fexp_" + fancy.id + fancyName)
                  .text("" + item.toFixed(2) + "")
                  .css("color", "green");
                $("#fancyBetBookBtn_" + fancy.id).css("display", "block");
              } else {
                $("#fexp_" + fancy.id + fancyName)
                  .text("" + item.toFixed(2) + "")
                  .css("color", "red");
                $("#fancyBetBookBtn_" + fancy.id).css("display", "block");
              }
            }
          }
        });
      });
      angular.forEach($scope.bookmakingData, function (Bmdata) {
        $rootScope.getBMExposureBook(Bmdata.id);
      });
    }
  };
  $rootScope.FancyData();
  $scope.fancyEposure = function () {
    if ($scope.matchfancyData != undefined) {
      angular.forEach($rootScope.fancyBook, function (item, index) {
        angular.forEach($scope.matchfancyData, function (fancy) {
          if (index == fancy.name) {
            var fancyName = index
              .replace(/[^a-z0-9\s]/gi, "")
              .replace(/[_\s]/g, "_");
            if (item == 0) {
              item = 0;
              $("#fancyBetBookBtn_" + fancy.id + "").css("display", "block");
            } else {
              if (item > 0) {
                $("#fexp_" + fancy.id + fancyName)
                  .text("" + item.toFixed(2) + "")
                  .css("color", "green");
                $("#fancyBetBookBtn_" + fancy.id).css("display", "block");
              } else {
                $("#fexp_" + fancy.id + fancyName)
                  .text("" + item.toFixed(2) + "")
                  .css("color", "red");
                $("#fancyBetBookBtn_" + fancy.id).css("display", "block");
              }
            }
          }
        });
      });
    }
  };
  $rootScope.livestreaming = function () {
    localStorage.setItem("Tvconfig", "");
    if ($rootScope.authcookie == undefined || $rootScope.authcookie == null) {
      $("#loginBox").css("display", "block");
    } else {
      if ($location.path().split("/").indexOf("full-market") > -1) {
        localStorage.setItem("Tvconfig", JSON.stringify($scope.tvConfig));
        window.open(
          "tv.html?mtid=" +
            $routeParams.matchId +
            "&mktid=" +
            $routeParams.marketId +
            "&mtbfid=" +
            $scope.matchBfId,
          "_blank",
          "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=500,height=300"
        );
      }
    }
  };
  var fancyEpo = $interval(function () {
    $scope.fancyEposure();
  }, 1000);
  $scope.$on("$routeChangeStart", function () {
    $interval.cancel(fancyEpo);
    $scope.unSubscribeTeenPatti();
  });
  $rootScope.$on("calLfancyData", function () {
    $rootScope.FancyData();
  });
  $rootScope.getFancyExposure = function (id, name) {
    $scope.mtid = $routeParams.matchId;
    $http({
      url: ApiUrl + "/Bets/GetFancyExposure?mtid=" + $scope.mtid + "&fid=" + id,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        var getFancyExposureData = response.data.data;
        // console.log($scope.getFancyExposureData)
        var fancyName = name
          .replace(/[^a-z0-9\s]/gi, "")
          .replace(/[_\s]/g, "_");
        // console.log('#fexp_'+id+fancyName)
        if (getFancyExposureData == 0) {
          getFancyExposureData = 0;
          $("#fancyBetBookBtn_" + id + "").css("display", "block");
        } else {
          if (response.data.data > 0) {
            $("#fexp_" + id + fancyName)
              .text("" + getFancyExposureData.toFixed(2) + "")
              .css("color", "green");
            $("#fancyBetBookBtn_" + id + "").css("display", "block");
          } else {
            $("#fexp_" + id + fancyName)
              .text("" + getFancyExposureData.toFixed(2) + "")
              .css("color", "red");
            $("#fancyBetBookBtn_" + id + "").css("display", "block");
          }
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.proxy = null;
  // $scope.volMulti = 1;
  $scope.connectSignalr = function (hubAddress) {
    $scope.hubAddress = hubAddress;
    //Getting the connection object
    $scope.connection = $.hubConnection($scope.hubAddress);
    //Creating Proxy
    $scope.proxy = $scope.connection.createHubProxy("RunnersHub");
    //Starting connection
    $scope.connection
      .start()
      .done(function (connection) {
        console.log("matchodds Connected " + connection.state);
      })
      .fail(function (connection) {
        console.log("matchodds not connected " + connection.message);
      });
    $scope.connection.stateChanged(function (matchoddstate) {
      // console.log(fancyState)
      if (matchoddstate.newState != 1 && $scope.hubAddress != null) {
        $scope.connection
          .start()
          .done(function (connection) {
            console.log("matchodds Reconnected " + connection.state);
          })
          .fail(function (connection) {
            console.log("matchodds not Reconnected " + connection.message);
          });
      }
      if (matchoddstate.newState == 1 && $scope.hubAddress != null) {
        $scope.subscribeMarket();
      }
    });
    $scope.proxy.on("BroadcastSubscribedData", function (runner) {
      $(".lay1").removeClass("spark");
      $(".lay2").removeClass("spark");
      $(".back2").removeClass("spark");
      $(".back1").removeClass("spark");
      // console.log(runner)
      $scope.runner = runner;
      $scope.totalMatchedCount = $scope.runner.totalMatched;
      $scope.matchStatus = $scope.runner.Status;
      $scope.runner.backSize1 =
        $scope.runner.backSize1 != null
          ? $scope.runner.backSize1 * $scope.volMulti
          : $scope.runner.backSize1;
      $scope.runner.backSize2 =
        $scope.runner.backSize2 != null
          ? $scope.runner.backSize2 * $scope.volMulti
          : $scope.runner.backSize2;
      $scope.runner.backSize3 =
        $scope.runner.backSize3 != null
          ? $scope.runner.backSize3 * $scope.volMulti
          : $scope.runner.backSize3;
      $scope.runner.laySize1 =
        $scope.runner.laySize1 != null
          ? $scope.runner.laySize1 * $scope.volMulti
          : $scope.runner.laySize1;
      $scope.runner.laySize2 =
        $scope.runner.laySize2 != null
          ? $scope.runner.laySize2 * $scope.volMulti
          : $scope.runner.laySize2;
      $scope.runner.laySize3 =
        $scope.runner.laySize3 != null
          ? $scope.runner.laySize3 * $scope.volMulti
          : $scope.runner.laySize3;
      if ($scope.markets[$scope.runner.marketid] == undefined) {
        $scope.proxy.invoke("UnsubscribeMarket", $scope.runner.marketid);
        return false;
      }
      $scope.markets[$scope.runner.marketid].mktStatus = $scope.runner.Status;
      $scope.MktRunnerData = $scope.markets[$scope.runner.marketid].runnerData;
      // console.log($scope.MktRunnerData)
      $scope.noSpaceMarketid = $scope.runner.marketid
        .replace(/[^a-z0-9\s]/gi, "")
        .replace(/[_\s]/g, "_");
      for (var i in $scope.MktRunnerData) {
        if (
          $scope.MktRunnerData[i].runnerName == runner.runner ||
          $scope.MktRunnerData[i].runner == runner.runner
        ) {
          $scope.oldrunnerData = $scope.MktRunnerData[i];
          $scope.markets[$scope.runner.marketid].runnerData[i] = $scope.runner;
          $scope.markets[$scope.runner.marketid].runnerData[i]["runnerName"] =
            $scope.runner.runner;
          $scope.markets[$scope.runner.marketid].runnerData[i]["status"] =
            $scope.runner.runnerStatus;
          // console.log($scope.oldrunnerData.backSize1,$scope.runner.backSize1)
          if (
            $scope.oldrunnerData.backSize1 != $scope.runner.backSize1 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "back1").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.backSize2 != $scope.runner.backSize2 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "back2").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.backSize3 != $scope.runner.backSize3 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "back3").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.laySize1 != $scope.runner.laySize1 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "lay1").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.laySize2 != $scope.runner.laySize2 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "lay2").addClass(
              "spark"
            );
          }
          if (
            $scope.oldrunnerData.laySize3 != $scope.runner.laySize3 &&
            $rootScope.isOddsHighlights == 1
          ) {
            $("#" + $scope.noSpaceMarketid + " #runner" + i + "lay3").addClass(
              "spark"
            );
          }
        }
      }
      $scope.$apply();
    });
  };
  $scope.subscribeMarket = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.proxy.invoke("SubscribeMarket", $scope.bfId);
  };
  $scope.UnsubscribeMOMarket = function () {
    //Invoking Unsubscribe method defined in hub
    if ($scope.dataMode == 1) {
      $scope.proxy.invoke("UnsubscribeMarket", $scope.bfId);
      $scope.hubAddress = null;
      $scope.connection.stop();
    }
    // $scope.unSubscribeMarketSession();
  };
  //     $scope.SessionData = function(response) {
  //     //console.log(response, "SessionData")
  //     $scope.Sessionfeeds = $scope.sessionIdWiseData(response);
  //     // console.log($scope.Sessionfeeds)
  //     if ($scope.markets != undefined && $scope.dataMode == 2) {
  //         angular.forEach($scope.Sessionfeeds, function(value, index) {
  //             if ($scope.markets[value.id] != undefined) {
  //                 $scope.markets[value.id].mktStatus = value.status;
  //                 // $scope.matchStatus = value.status;
  //                 $scope.noSpaceMarketid = value.id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
  //                 angular.forEach(value.runners, function(item3, index) {
  //                     angular.forEach($scope.markets[value.id].runnerData, function(item2, index2) {
  //                         if (item2.runnerName == item3.name) {
  //                             // console.log(item3.back[0])
  //                             if (item3.back[0] != undefined) {
  //                                 item3.back[0].size = parseFloat(item3.back[0].size) * parseFloat($scope.volMulti);
  //                                 if (item2.back1 != item3.back[0].price || item2.backSize1 != item3.back[0].size) {
  //                                     $('#' + $scope.noSpaceMarketid + ' #runner' + index + 'back1').addClass('blink');
  //                                 }
  //                                 item2.back1 = item3.back[0].price;
  //                                 item2.backSize1 = item3.back[0].size;
  //                             } else {
  //                                 item2.back1 = null;
  //                                 item2.backSize1 = null;
  //                             }
  //                             if (item3.back[1] != undefined) {
  //                                 item3.back[1].size = parseFloat(item3.back[1].size) * parseFloat($scope.volMulti);
  //                                 if (item2.back2 != item3.back[1].price || item2.backSize2 != item3.back[1].size) {
  //                                     $('#' + $scope.noSpaceMarketid + ' #runner' + index + 'back2').addClass('blink');
  //                                 }
  //                                 item2.back2 = item3.back[1].price;
  //                                 item2.backSize2 = item3.back[1].size;
  //                             } else {
  //                                 item2.back2 = null;
  //                                 item2.backSize2 = null;
  //                             }
  //                             if (item3.back[2] != undefined) {
  //                                 item3.back[2].size = parseFloat(item3.back[2].size) * parseFloat($scope.volMulti);
  //                                 if (item2.back3 != item3.back[2].price || item2.backSize3 != item3.back[2].size) {
  //                                     $('#' + $scope.noSpaceMarketid + ' #runner' + index + 'back3').addClass('blink');
  //                                 }
  //                                 item2.back3 = item3.back[2].price;
  //                                 item2.backSize3 = item3.back[2].size;
  //                             } else {
  //                                 item2.back3 = null;
  //                                 item2.backSize3 = null;
  //                             }
  //                             if (item3.lay[0] != undefined) {
  //                                 item3.lay[0].size = parseFloat(item3.lay[0].size) * parseFloat($scope.volMulti);
  //                                 if (item2.lay1 != item3.lay[0].price || item2.laySize1 != item3.lay[0].size) {
  //                                     $('#' + $scope.noSpaceMarketid + ' #runner' + index + 'lay1').addClass('blink');
  //                                 }
  //                                 item2.lay1 = item3.lay[0].price;
  //                                 item2.laySize1 = item3.lay[0].size;
  //                             } else {
  //                                 item2.lay1 = null;
  //                                 item2.laySize1 = null;
  //                             }
  //                             if (item3.lay[1] != undefined) {
  //                                 item3.lay[1].size = parseFloat(item3.lay[1].size) * parseFloat($scope.volMulti);
  //                                 if (item2.lay2 != item3.lay[1].price || item2.laySize2 != item3.lay[1].size) {
  //                                     $('#' + $scope.noSpaceMarketid + ' #runner' + index + 'lay2').addClass('blink');
  //                                 }
  //                                 item2.lay2 = item3.lay[1].price;
  //                                 item2.laySize2 = item3.lay[1].size;
  //                             } else {
  //                                 item2.lay2 = null;
  //                                 item2.laySize2 = null;
  //                             }
  //                             if (item3.lay[2] != undefined) {
  //                                 item3.lay[2].size = parseFloat(item3.lay[2].size) * parseFloat($scope.volMulti);
  //                                 if (item2.lay3 != item3.lay[2].price || item2.laySize3 != item3.lay[2].size) {
  //                                     $('#' + $scope.noSpaceMarketid + ' #runner' + index + 'lay3').addClass('blink');
  //                                 }
  //                                 item2.lay3 = item3.lay[2].price;
  //                                 item2.laySize3 = item3.lay[2].size;
  //                             } else {
  //                                 item2.lay3 = null;
  //                                 item2.laySize3 = null;
  //                             }
  //                         }
  //                     });
  //                 });
  //             }
  //         })
  //     }
  // }
  $scope.SessionData = function (sportId, matchBfId) {
    $(".lay1").removeClass("spark");
    $(".lay2").removeClass("spark");
    $(".back2").removeClass("spark");
    $(".back1").removeClass("spark");
    if (matchBfId != null && matchBfId != undefined && sportId != undefined) {
      // if ($scope.pending_SessionData == true) return false
      // $scope.pending_SessionData = true
      $http({
        // method: "GET",
        // // url: "https://www.lotusbook.com/api/exchange/odds/event/" + $scope.$scope.sportId + "/" + $scope.matchBfId,
        // url: "https://www.lotusbook.com/api/exchange/odds/sma-event/LIOD/" + sportId + "/" + matchBfId,
        // headers: {
        //     "Content-Type": "application/json",
        // }
        method: "POST",
        url: "http://dak19.com/api/matchOdds.php",
        data: {
          sportId: sportId,
          matchBfId: matchBfId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then(
        function success(response) {
          // $scope.pending_SessionData = false
          //console.log(response, "SessionData")
          $scope.Sessionfeeds = $scope.sessionIdWiseData(response.data.result);
          // console.log($scope.Sessionfeeds)
          if ($scope.markets != undefined) {
            angular.forEach($scope.Sessionfeeds, function (value, index) {
              if ($scope.markets[value.id] != undefined) {
                $scope.markets[value.id].mktStatus = value.status;
                $scope.matchStatus = value.status;
                $scope.noSpaceMarketid = value.id
                  .replace(/[^a-z0-9\s]/gi, "")
                  .replace(/[_\s]/g, "_");
                angular.forEach(value.runners, function (item3, index) {
                  angular.forEach(
                    $scope.markets[value.id].runnerData,
                    function (item2) {
                      if (item2.runnerName == item3.name) {
                        // console.log(item3.back[0])
                        if (item3.back[0] != undefined) {
                          item3.back[0].size =
                            parseFloat(item3.back[0].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.back1 != item3.back[0].price ||
                            item2.backSize1 != item3.back[0].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "back1"
                            ).addClass("spark");
                          }
                          item2.back1 = item3.back[0].price;
                          item2.backSize1 = item3.back[0].size;
                        } else {
                          item2.back1 = null;
                          item2.backSize1 = null;
                        }
                        if (item3.back[1] != undefined) {
                          item3.back[1].size =
                            parseFloat(item3.back[1].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.back2 != item3.back[1].price ||
                            item2.backSize2 != item3.back[1].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "back2"
                            ).addClass("spark");
                          }
                          item2.back2 = item3.back[1].price;
                          item2.backSize2 = item3.back[1].size;
                        } else {
                          item2.back2 = null;
                          item2.backSize2 = null;
                        }
                        if (item3.back[2] != undefined) {
                          item3.back[2].size =
                            parseFloat(item3.back[2].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.back3 != item3.back[2].price ||
                            item2.backSize3 != item3.back[2].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "back3"
                            ).addClass("spark");
                          }
                          item2.back3 = item3.back[2].price;
                          item2.backSize3 = item3.back[2].size;
                        } else {
                          item2.back3 = null;
                          item2.backSize3 = null;
                        }
                        if (item3.lay[0] != undefined) {
                          item3.lay[0].size =
                            parseFloat(item3.lay[0].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.lay1 != item3.lay[0].price ||
                            item2.laySize1 != item3.lay[0].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "lay1"
                            ).addClass("spark");
                          }
                          item2.lay1 = item3.lay[0].price;
                          item2.laySize1 = item3.lay[0].size;
                        } else {
                          item2.lay1 = null;
                          item2.laySize1 = null;
                        }
                        if (item3.lay[1] != undefined) {
                          item3.lay[1].size =
                            parseFloat(item3.lay[1].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.lay2 != item3.lay[1].price ||
                            item2.laySize2 != item3.lay[1].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "lay2"
                            ).addClass("spark");
                          }
                          item2.lay2 = item3.lay[1].price;
                          item2.laySize2 = item3.lay[1].size;
                        } else {
                          item2.lay2 = null;
                          item2.laySize2 = null;
                        }
                        if (item3.lay[2] != undefined) {
                          item3.lay[2].size =
                            parseFloat(item3.lay[2].size) *
                            parseFloat($scope.volMulti);
                          if (
                            item2.lay3 != item3.lay[2].price ||
                            item2.laySize3 != item3.lay[2].size
                          ) {
                            $(
                              "#" +
                                $scope.noSpaceMarketid +
                                " #runner" +
                                index +
                                "lay3"
                            ).addClass("spark");
                          }
                          item2.lay3 = item3.lay[2].price;
                          item2.laySize3 = item3.lay[2].size;
                        } else {
                          item2.lay3 = null;
                          item2.laySize3 = null;
                        }
                      }
                    }
                  );
                });
              }
            });
          }
        },
        function error(response) {
          // $scope.pending_SessionData = false
          if (response.status == 401) {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }
        }
      );
    }
  };
  // $scope.sessionIdWiseData = function(sessions) {
  //     var newMarkets = {};
  //         angular.forEach(sessions, function(item, key) {
  //             var fancyname=item.name.trim();
  //             newMarkets[fancyname] = item;
  //         })
  //     return newMarkets;
  //     // console.log($scope.markets)
  // }
  $scope.sessionIdWiseData = function (sessions, state) {
    var newMarkets = {};
    if (state == "d") {
      angular.forEach(sessions, function (item, key) {
        newMarkets[item.nation] = item;
      });
    } else {
      angular.forEach(sessions, function (item, key) {
        newMarkets[item.name] = item;
      });
    }
    return newMarkets;
    // console.log($scope.markets)
  };
  if ($rootScope.authcookie != undefined || $rootScope.authcookie != null) {
    var sessionstatus = $interval(function () {
      // $scope.SessionData();
    }, 500);
  }
  // var highlightTimer
  $scope.$on("$routeChangeStart", function () {
    $interval.cancel(sessionstatus);
  });
  $scope.marketDepth = function (eventid, selection, mktid) {
    window.open(
      "marketDepth.html?eventId=" +
        eventid +
        "&selectionId=" +
        selection +
        "&marketId=" +
        mktid,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1000,height=700"
    );
  };
  $scope.fancyProxy = null;
  $scope.connectFancySignalr = function () {
    //Getting the connection object
    $scope.fancyHubAddress = fancyHubAddress;
    $scope.fancyConnection = $.hubConnection($scope.fancyHubAddress);
    //Creating Proxy
    $scope.fancyProxy = $scope.fancyConnection.createHubProxy("FancyHub");
    //Starting connection
    $scope.fancyConnection
      .start()
      .done(function (myFancyHubConnection) {
        var hubConState = myFancyHubConnection.state;
        console.log("Connection Established Fancy= " + hubConState);
      })
      .fail(function (myFancyHubConnection) {
        var hubConState = myFancyHubConnection.state;
        console.log("Could not connect Fancy= " + hubConState);
      });
    $scope.fancyConnection.stateChanged(function (change) {
      // console.log(change.newState)
      if (change.newState != 1 && $scope.fancyHubAddress != "") {
        $scope.fancyConnection.start().done(function (myFancyHubConnection) {
          var hubConState = myFancyHubConnection.state;
          console.log("ReConnection Established Fancy= " + hubConState);
        });
      }
      if (change.newState == 1 && $scope.fancyHubAddress != "") {
        $scope.subscribeFancyMarket();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.fancyProxy.on("BroadcastSubscribedData", function (fancy) {
      // console.log(fancy)
      $scope.$apply(function () {
        // if ($rootScope.sportsData!=undefined) {
        //     $scope.runnerData = $rootScope.sportsData[$scope.sportId].tournaments[$scope.tourID].matches[$scope.matchid];
        //     $scope.runnerData['matchName'] = $scope.runnerData.name;
        //     $scope.runnerData['matchDate'] = $scope.runnerData.startDate;
        //     if ($scope.runnerData.markets.length!=$scope.OldMarkets.length) {
        //         $scope.markets = $scope.marketIdWiseData($scope.runnerData.markets);
        //         $scope.OldMarkets=$scope.runnerData.markets;
        //     }
        // }
        currTime = fancy.curTime;
        $scope.currentMktTime = fancy.curTime;
        $scope.bookmakingData = fancy.bookRates;
        // $scope.bookId=$scope.bookmakingData.id;
        $scope.NewfancyData = fancy.data;
        angular.forEach(fancy.data, function (value, index) {
          // console.log($scope.Sessionfeeds[value.name])
          if (value.isAuto == 1 && $scope.Sessionfeeds != undefined) {
            var sessionValue = $scope.Sessionfeeds[value.name];
            if (sessionValue != undefined) {
              if (
                parseInt(sessionValue.maxLiabilityPerBet) > 0 &&
                parseInt(sessionValue.maxLiabilityPerMarket) > 0 &&
                sessionValue.isBettable == "true"
              ) {
                if (sessionValue.runners[0].lay.length != 0) {
                  value.noScore = sessionValue.runners[0].lay[0].line;
                  value.noRate = sessionValue.runners[0].lay[0].price;
                } else {
                  value.noScore = 0;
                  value.noRate = 0;
                }
                if (sessionValue.runners[0].back.length != 0) {
                  value.yesScore = sessionValue.runners[0].back[0].line;
                  value.yesRate = sessionValue.runners[0].back[0].price;
                } else {
                  value.yesScore = 0;
                  value.yesRate = 0;
                }
                value.ballStatus = sessionValue.statusLabel;
              } else {
                value.noScore = 0;
                value.noRate = 0;
                value.yesScore = 0;
                value.yesRate = 0;
                value.ballStatus = sessionValue.statusLabel;
              }
            }
          }
          if (value.isAuto == 1 && $scope.DiaSessionfeeds != undefined) {
            var sessionValue = $scope.DiaSessionfeeds[value.name];
            if (sessionValue != undefined) {
              if (
                parseInt(sessionValue.maxbet) > 0 &&
                parseInt(sessionValue.minBet) > 0
              ) {
                value.noScore = sessionValue.l1;
                value.noRate = sessionValue.ls1;
                value.yesScore = sessionValue.b1;
                value.yesRate = sessionValue.bs1;
                value.ballStatus = sessionValue.gameStatus;
              } else {
                value.noScore = 0;
                value.noRate = 0;
                value.yesScore = 0;
                value.yesRate = 0;
                value.ballStatus = sessionValue.gameStatus;
              }
            }
          }
        });
        $scope.fancyData = $scope.NewfancyData;
        angular.forEach($scope.fancyData, function (value1, index1) {
          if (value1.ballStatus != "") {
            $rootScope.removeRunningfancybetslip(value1.id);
          }
        });
      });
    });
  };
  $scope.subscribeFancyMarket = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.fancyProxy.invoke("SubscribeFancy", $scope.matchid);
  };
  $scope.unSubscribeFancyMarket = function () {
    //Invoking UnsubscribeMarket method defined in hub
    if ($rootScope.authcookie != undefined && $scope.hasFancy == 1) {
      $scope.fancyProxy.invoke("UnsubscribeFancy", $scope.matchid);
      $scope.fancyHubAddress = "";
      $scope.fancyConnection.stop();
    }
  };
  $scope.$on("$destroy", function () {
    $scope.UnsubscribeMOMarket();
    $scope.unSubscribeFancyMarket();
    $scope.unSubscribeTeenPatti();
    // $scope.unSubscribeMatchScore();
  });
  $scope.getScore = function () {
    // https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=29134308
    if ($scope.matchBfId != undefined) {
      if ($scope.sportId == 1) {
        $scope.scoreUrl =
          "https://ips.betfair.com/inplayservice/v1/eventTimelines?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=de&eventIds=" +
          $scope.matchBfId;
      } else {
        $scope.scoreUrl =
          "https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=" +
          $scope.matchBfId;
      }
      $http({
        url: $scope.scoreUrl,
        method: "GET",
      }).then(function success(data) {
        $scope.fullScore = data.data[0];
        // console.log($scope.fullScore,"scoreboard")
      });
    }
  };
  var marketSessionInterval = $interval(function () {
    // if ($rootScope.token!=undefined && $rootScope.token!="") {
    //  $scope.getMarketSession();
    // }
    $scope.getScore();
    // $scope.getMatchSettings();
  }, 1000);

  $scope.$on("$routeChangeStart", function () {
    $interval.cancel(marketSessionInterval);
    $interval.cancel(stscoreInterval);
  });
  $scope.getfancyTopCss = function (index, fancyNote) {
    if (index >= 1) {
      if (fancyNote != "") {
        $scope.top = parseInt($scope.top) + 67;
        $scope.top1 = $scope.top;
        return {
          top: $scope.top1 + "px",
        };
      } else {
        $scope.top = parseInt($scope.top) + 57;
        $scope.top1 = $scope.top;
        return {
          top: $scope.top1 + "px",
        };
      }
    } else {
      $scope.top = 0;
      return {
        top: "0px",
      };
    }
  };
  $scope.getBMTopCss = function (index) {
    if (index >= 1) {
      $scope.top = parseInt($scope.top) + 41;
      $scope.top1 = $scope.top;
      return {
        top: $scope.top1 + "px",
        cursor: "not-allowed",
      };
    } else {
      $scope.top = 0;
      return {
        top: "0px",
        cursor: "not-allowed",
      };
    }
  };
  $scope.getTeenTopCss = function (index) {
    if (index >= 1) {
      $scope.top = parseInt($scope.top) + 41;
      $scope.top1 = $scope.top;
      return {
        top: $scope.top1 + "px",
        cursor: "not-allowed",
      };
    } else {
      $scope.top = 2;
      return {
        top: "2px",
        cursor: "not-allowed",
      };
    }
  };

  $scope.getTeenTopCssTest = function (index) {
    if (index >= 1) {
      $scope.top = parseInt($scope.top) + 41;
      $scope.top1 = $scope.top;
      return {
        top: $scope.top1 + "px",
        cursor: "not-allowed",
      };
    } else {
      $scope.top = 26;
      return {
        top: "26px",
        cursor: "not-allowed",
      };
    }
  };
  // $rootScope.$on("callBMExp", function() {
  //     $rootScope.getBMExposureBook
  // });
  $scope.fancyruleopen = function () {
    $("#fancyBetRulesWrap").css("display", "block");
  };
  $scope.fancyruleclose = function () {
    $("#fancyBetRulesWrap").css("display", "none");
  };
});
app.controller("comingsoon", function ($rootScope) {
  $rootScope.betslippanelcss();
  $rootScope.mainfooter = true;
});

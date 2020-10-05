if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  var context = "Mobile";
} else {
  context = "Web";
}

var token;
function preventBack() { window.history.forward(); }  
  setTimeout("preventBack()", 0);  
  window.onunload = function () { null }; 
var ApiUrl = "http://159.8.246.2/Client/Client.svc";
var fancyHubAddress = "http://159.8.246.2:21111/";
var currency = "INR";

// let Hostname = window.location.hostname;
// if (Hostname.indexOf('usd') > -1) {
//     ApiUrl = "http://" +Hostname + "/Client/Client.svc";
// } else if (Hostname.indexOf('hkd') > -1) {
//     ApiUrl = "http://" + Hostname + "/Client/Client.svc";
// }

var app = angular.module("sportApp", ["ngCookies", "ngRoute", "ngSanitize"]);

app.config(function ($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  $routeProvider
    .when("/", {
      // controller:'homeController',
      templateUrl: "view/home.html",
    })
    .when("/inplay", {
      controller: "inplayController",
      templateUrl: "view/inplay.html",
    })
    .when("/sports", {
      controller: "sportsController",
      templateUrl: "view/sports.html",
    })
    .when("/multiMarket", {
      controller: "multiMarketController",
      templateUrl: "view/multimarket.html",
    })
    .when("/fullmarket/:sportId/:mtBfId/:matchId/:marketId/:bfId", {
      controller: "fullmarketController",
      templateUrl: "view/fullmarket.html",
    })
    .when("/fullmarket/:sportId/:mtBfId/:matchId/:marketId/:bfId/:tourId", {
      controller: "fullmarketController",
      templateUrl: "view/fullmarket.html",
    })
    .when("/account", {
      controller: "accountController",
      templateUrl: "view/account.html",
    })
    .when("/tp_market/:sportId/:mtBfId/:matchId/:marketId/:bfId/:tourId", {
      controller: "tpmarketController",
      templateUrl: "view/tp_market.html",
    })
    .when("/profile", {
      controller: "profileController",
      templateUrl: "accnt_view/profile.html",
    })
    .when("/bal_overview", {
      controller: "bal_overviewController",
      templateUrl: "accnt_view/bal_overview.html",
    })
    .when("/statement", {
      controller: "statementController",
      templateUrl: "accnt_view/statement.html",
    })
    // .when('/CasinoReport', {
    //      controller: 'CasinoReportController',
    //      templateUrl: 'accnt_view/CasinoReport.html'
    //   })
    .when("/casinoreport", {
      controller: "casinoreport",
      templateUrl: "accnt_view/casinoreport.html",
    })
    .when("/current_bets", {
      controller: "current_betsController",
      templateUrl: "accnt_view/current_bets.html",
    })
    .when("/bet_history", {
      controller: "bet_historyController",
      templateUrl: "accnt_view/bet_history.html",
    })
    .when("/pnl", {
      controller: "profitLossController",
      templateUrl: "accnt_view/pnl.html",
    })
    .when("/activity_log", {
      controller: "activity_logController",
      templateUrl: "accnt_view/activity_log.html",
    });

  // $locationProvider.html5Mode(true)
  //check browser support
  if (window.history && window.history.pushState) {
    //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
    // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
    // if you don't wish to set base URL then use this
    // $locationProvider.html5Mode({
    //  enabled:true,
    //  requireBase:false
    // })
  }
});

app.directive("disableRightClick", function () {
  return {
    restrict: "A",
    link: function (scope, element, attr) {
      element.bind("contextmenu", function (e) {
        e.preventDefault();
      });
    },
  };
});

app.run(function ($rootScope, $location, $interval) {
  var lastDigestRun = Date.now();
  var idleCheck = $interval(function () {
    var now = Date.now();
    if (now - lastDigestRun > 30 * 60 * 1000) {
      // logout
      // console.log('log outttttt....')
      if ($rootScope.token != undefined && $rootScope.token != "") {
        // $rootScope.clearCookies();
      }
    }
  }, 60 * 1000);

  $rootScope.$on("$routeChangeStart", function (evt) {
    lastDigestRun = Date.now();
  });
  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if (authtoken != undefined || authtoken != null) {
      history.pushState(null, null, null);

      window.addEventListener("popstate", function (event) {
        history.pushState(null, null, null);
      });
    }
  });
});

app.run(function ($rootScope, $document) {
  var d = new Date();
  var n = d.getTime(); //n in ms

  $rootScope.idleEndTime = n + 30 * 60 * 1000; //set end time to 30 min from now
  $document
    .find("body")
    .on(
      "mousemove keydown DOMMouseScroll mousewheel mousedown touchstart",
      checkAndResetIdle
    ); //monitor events

  function checkAndResetIdle() {
    //user did something
    var d = new Date();
    var n = d.getTime(); //n in ms

    if (n > $rootScope.idleEndTime) {
      $document
        .find("body")
        .off(
          "mousemove keydown DOMMouseScroll mousewheel mousedown touchstart"
        ); //un-monitor events

      //$location.search('IntendedURL',$location.absUrl()).path('/login'); //terminate by sending to login page
      // document.location.href = 'login.html';
      if ($rootScope.token != undefined && $rootScope.token != "") {
        // $rootScope.clearCookies();
      }
      // alert('Session ended due to inactivity');
    } else {
      $rootScope.idleEndTime = n + 30 * 60 * 1000; //reset end time
    }
  }
});

// app.run(function($rootScope,$document){
//    var d = new Date();
//    var n = d.getTime();  //n in ms

//     // $rootScope.idleEndTime = n+(20*60*1000); //set end time to 20 min from now
//     $rootScope.idleEndTime = n+(1*60*1000); //set end time to 20 min from now

//     $document.find('body').on('mousemove keydown DOMMouseScroll mousewheel mousedown touchstart', checkAndResetIdle); //monitor events

//     function checkAndResetIdle() //user did something
//     {
//       var d = new Date();
//       var n = d.getTime();  //n in ms

//         if (n>$rootScope.idleEndTime)
//         {
//             $document.find('body').off('mousemove keydown DOMMouseScroll mousewheel mousedown touchstart'); //un-monitor events

//             //$location.search('IntendedURL',$location.absUrl()).path('/login'); //terminate by sending to login page
//             document.location.href = 'login.html';
//             // alert('Session ended due to inactivity');
//         }
//         else
//         {
//             $rootScope.idleEndTime = n+(1*60*1000); //reset end time

//         }
//     }
// });

app.filter("removeSpace", function () {
  return function (str) {
    var txt = "";
    txt = str.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
    return txt;
  };
});

app.filter("oddDecimal", function () {
  return function (value) {
    if (value == "" || value == null) {
      return "";
    } else {
      return parseFloat(value) > 19.5
        ? parseFloat(value).toFixed(0)
        : parseFloat(value) > 9.5
        ? parseFloat(value).toFixed(1)
        : parseFloat(value).toFixed(2);
    }
  };
});

app.filter("volume", function ($filter) {
  return function (input, limit) {
    if (!input) return;
    var num = parseInt(input);
    if (num > 500000) {
      input = 500000;
      return input;
    }

    return $filter("limitTo")(input, limit) + "";
  };
});

app.filter("capitalize", function ($filter) {
  return function (input) {
    input = input.toLowerCase();
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});

app.directive("numbersOnly", function () {
  return {
    link: function (scope, ele) {
      ele.bind("keypress", function (e) {
        var newVal =
          $(this).val() +
          (e.charCode !== 0 ? String.fromCharCode(e.charCode) : "");
        if (!/^\d{1,9}(\.$|\.\d{1,2}$|$)/.test(newVal)) {
          e.preventDefault();
        }
      });
    },
  };
});

app.factory("NavigationServices", function ($http, $q) {
  return {
    getUserData: function () {
      return $http({
        url: ApiUrl + "/Data/GetUserData",
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    sportsList: function () {
      return $http({
        url: ApiUrl + "/Navigation/SportsList",
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    tournamentList: function (tourId) {
      return $http({
        url: ApiUrl + "/Navigation/TournamentList?id=" + tourId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    matchList: function (sportId, tourId) {
      return $http({
        url:
          ApiUrl + "/Navigation/MatchList?id=" + sportId + "&tourid=" + tourId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    marketList: function (matchId) {
      return $http({
        url: ApiUrl + "/Navigation/MarketList?mtid=" + matchId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    highlights: function (sportId) {
      return $http({
        url: ApiUrl + "/Data/Highlights?sid=" + sportId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    allSportsEvents: function () {
      return $http({
        url: ApiUrl + "/Data/Highlights",
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    inplay: function () {
      return $http({
        url: ApiUrl + "/Data/Inplay",
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    upComingEvents: function (t) {
      return $http({
        url: ApiUrl + "/Data/UpcomingEvents?t=" + t,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    addMultiMkt: function (marketId) {
      return $http({
        url: ApiUrl + "/Data/AddMultiMkt?id=" + marketId,
        method: "POST",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    removeMultiMkt: function (marketId) {
      return $http({
        url: ApiUrl + "/Data/RemoveMultiMkt?id=" + marketId,
        method: "POST",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    multiMarkets: function () {
      return $http({
        url: ApiUrl + "/Data/MultiMarkets",
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    allMarket: function (matchId) {
      return $http({
        url: ApiUrl + "/Data/AllMarket?id=" + matchId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    marketData: function (matchId, mktId) {
      return $http({
        url: ApiUrl + "/Data/MktData?mtid=" + matchId + "&mktid=" + mktId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    fancyData: function (matchId) {
      return $http({
        url: ApiUrl + "/Data/FancyData?mtid=" + matchId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    hubAddress: function (marketId) {
      return $http({
        url: ApiUrl + "/Data/HubAddress?id=" + marketId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    placeMOBet: function (MOData) {
      return $http({
        url: ApiUrl + "/Bets/PlaceMOBet",
        method: "POST",
        data: MOData,
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    placeBMBet: function (BMData) {
      return $http({
        url: ApiUrl + "/Bets/PlaceBMBet",
        method: "POST",
        data: BMData,
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    placeFancyBet: function (fancyData) {
      return $http({
        url: ApiUrl + "/Bets/PlaceFancyBet",
        method: "POST",
        data: fancyData,
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    PlaceTpBet: function (TPData) {
      return $http({
        url: ApiUrl + "/Bets/PlaceTpBet",
        method: "POST",
        data: TPData,
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    exposureBook: function (marketId) {
      return $http({
        url: ApiUrl + "/Bets/ExposureBook?mktid=" + marketId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    BMExposureBook: function (marketId, bookId) {
      return $http({
        url:
          ApiUrl + "/Bets/BMExposureBook?mktid=" + marketId + "&bid=" + bookId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    fancyExposure: function (matchId, fancyId) {
      return $http({
        url:
          ApiUrl + "/Bets/GetFancyExposure?mtid=" + matchId + "&fid=" + fancyId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    fancyBook: function (matchId, fancyId) {
      return $http({
        url: ApiUrl + "/Bets/Fancybook?mtid=" + matchId + "&fid=" + fancyId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    T20ExposureBook: function (gameid) {
      return $http({
        url: ApiUrl + "/Bets/T20ExposureBook?gameid=" + gameid,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    ThreeCardJExposureBook: function (gameid) {
      return $http({
        url: ApiUrl + "/Bets/ThreeCardJExposureBook?gameid=" + gameid,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    Lucky7ExposureBook: function (gameid) {
      return $http({
        url: ApiUrl + "/Bets/Lucky7ExposureBook?gameid=" + gameid,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    AndarBaharExposureBook: function (gameid) {
      return $http({
        url: ApiUrl + "/Bets/AndarBaharExposureBook?gameid=" + gameid,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    GetRecentGameResult: function (gametype) {
      return $http({
        url: ApiUrl + "/Reports/GetRecentGameResult?gametype=" + gametype,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    getAllBets: function (avg, matchId) {
      return $http({
        url: ApiUrl + "/Bets/GetAllBets?avg=" + avg + "&mtid=" + matchId,
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    editMOBet: function (eMOBet) {
      return $http({
        url: ApiUrl + "/Bets/EditMOBet",
        method: "POST",
        data: eMOBet,
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    cancelBet: function (betId) {
      return $http({
        url: ApiUrl + "/Bets/CancelBet?id=" + betId,
        method: "POST",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    userDescription: function () {
      return $http({
        url: ApiUrl + "/Data/UserDescription",
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    logout: function () {
      return $http({
        url: ApiUrl + "/Logout",
        method: "POST",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    getOneClickStake: function () {
      return $http({
        url: ApiUrl + "/Settings/GetOneClickStake",
        method: "GET",
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
    saveOneClickStake: function () {
      return $http({
        url: ApiUrl + "/Settings/SaveOneClickStake",
        method: "POST",
        data: TPData,
        headers: {
          Token: token,
        },
      }).then(
        function success(data) {
          return data;
        },
        function error(err) {
          return $q.reject(err);
        }
      );
    },
  };
});

app.controller("homeController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout,
  $window,
  NavigationServices,
  $routeParams,
  $location,
  $interval
) {
  $rootScope.token = $cookies.get("cramp");
  $rootScope.appType = $cookies.get("appType");
  if (!$rootScope.appType) {
    $window.location.href = "login.html";
    return;
  }
  $rootScope.currency = currency;

  if ($rootScope.appType == 2) {
    ApiUrl = "http://159.8.246.2/Client/Client.svc";
    fancyHubAddress = "http://159.8.244.61:22111";
    $rootScope.currency = "USD";
  } else if ($rootScope.appType == 3) {
    ApiUrl = "http://159.8.246.2/Client/Client.svc";
    fancyHubAddress = "http://159.8.244.61:21111";
    $rootScope.currency = "HKD";
  }

  // console.log($rootScope.token);
  $rootScope.clearCookies = function () {
    // $cookies.remove('rememberMe');
    if ($scope.clientHubAddress != null) {
      $scope.unSubscribeHome();
    }
    $cookies.remove("cramp");
    $window.location.href = "login.html";
  };
  if ($rootScope.token == undefined || $rootScope.token == "") {
    // $scope.connectClientSignalr("http://173.212.223.243:9440","1937-789-123");
    $rootScope.clearCookies();
  } else {
    $rootScope.token = JSON.parse($rootScope.token);
    token = $rootScope.token;
    // $scope.getUserDescription();
  }

  $rootScope.info =
    "os:" +
    jscd.os +
    ", os_version:" +
    jscd.osVersion +
    ", browser:" +
    jscd.browser +
    ", browser_version:" +
    jscd.browserMajorVersion;

  // $rootScope.fType=2;

  $scope.userDescriptionCalls = true;
  $scope.getUserDescription = function () {
    if ($scope.userDescriptionCalls == false) {
      return false;
    }
    $scope.userDescriptionCalls = false;

    $("#loading").css("display", "flex");
    NavigationServices.userDescription().then(
      function success(data) {
        $scope.userData = data.data.data;
        $rootScope.fType = $scope.userData.fType;
        $rootScope.isTennpatti = $scope.userData.isTennpatti;
        if ($scope.userData.add != null && $rootScope.fType == 2) {
          $scope.connectClientSignalr($scope.userData.add, $rootScope.token);
          $scope.GetUserData();
          $("#loading").css("display", "flex");
        } else if ($rootScope.fType == 1) {
        }
        // $('#loading').css('display','none');
      },
      function error(err) {
        $scope.userDescriptionCalls = true;
        // $('#loading').css('display','none');
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  // $scope.getUserDescription();

  $scope.sportsListCalls = true;
  $scope.getSportsList = function () {
    if ($scope.sportsListCalls == false) {
      return false;
    }
    $scope.sportsListCalls = false;
    // $('#loading').css('display','flex');

    if ($rootScope.fType == 1) {
      NavigationServices.sportsList().then(
        function success(data) {
          $scope.sportsListCalls = true;

          $scope.sportsData = data.data.data;

          angular.forEach($scope.sportsData, function (item, index) {
            if (index == 0 && $scope.selectedSport == undefined) {
              $scope.getHighlights(item);
            }
          });
        },
        function error(err) {
          $scope.sportsListCalls = true;
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.sportsListCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.sportsData = [
          { id: "4", name: "Cricket", img: "Cricket" },
          { id: "1", name: "Soccer", img: "Soccer" },
          { id: "2", name: "Tennis", img: "Tennis" },
        ];

        angular.forEach($scope.sportsData, function (item, index) {
          if (index == 0 && $scope.selectedSport == undefined) {
            $scope.getHighlights(item);
          }
        });
      }
    }
  };
  // $scope.getSportsList();

  $scope.getSportNameId = function (sportIdName) {
    if (sportIdName == "Cricket") {
      return 4;
    } else if (sportIdName == "Soccer") {
      return 1;
    } else if (sportIdName == "Tennis") {
      return 2;
    } else if (sportIdName == "Live Teenpatti") {
      return 2000;
    } else if (sportIdName == "Kabaddi") {
      return 20;
    } else if (sportIdName == "4") {
      return "Cricket";
    } else if (sportIdName == "1") {
      return "Soccer";
    } else if (sportIdName == "2") {
      return "Tennis";
    } else if (sportIdName == "2000") {
      return "Live Teenpatti";
    } else if (sportIdName == "20") {
      return "Kabaddi";
    }
  };

  $scope.highlightsCalls = true;
  $scope.getHighlights = function (item) {
    if ($scope.highlightsCalls == false) {
      return false;
    }
    $scope.highlightsCalls = false;

    $("#loading").css("display", "flex");
    $scope.selectedSport = item;
    if ($rootScope.fType == 1) {
      NavigationServices.highlights($scope.selectedSport.id).then(
        function success(data) {
          $scope.highlightsCalls = true;
          $rootScope.curTime = data.data.curTime;
          $scope.highlightsData = data.data.data;
          $("#loading").css("display", "none");
        },
        function error(err) {
          $scope.highlightsCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $("#loading").css("display", "none");
      $scope.highlightsCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.highlightsData = $rootScope.highlightsWise(
          $rootScope.SportsDatas[$scope.selectedSport.id]
        );
      }
    }
  };
  // $scope.getHighlights();

  var highlightInterval;
  $scope.$on("$routeChangeStart", function (scope, next, current) {
    // console.log(next.$$route.controller)
    if (next.$$route.controller != undefined) {
      $interval.cancel(highlightInterval);
    } else {
      $interval.cancel(highlightInterval);
      highlightInterval = $interval(function () {
        if ($rootScope.fType == 2 && $scope.selectedSport != undefined) {
          $scope.getHighlights($scope.selectedSport);
          $scope.getSportsList();
          // console.log($scope.selectedSport)
        }
      }, 2000);
    }
  });

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

  // $rootScope.multiMarketsArray=[];

  $scope.addMultiMarketCalls = true;
  $scope.addMultiMarket = function (high) {
    if ($rootScope.token == undefined || $rootScope.token == "") {
      $window.location.href = "login.html";
      return false;
    }
    if ($scope.addMultiMarketCalls == false) {
      return false;
    }
    $scope.addMultiMarketCalls = false;

    if (high.marketId == undefined) {
      if (high.mktId != undefined) {
        $scope.addMarketId = high.mktId;
      } else {
        $scope.addMarketId = high;
      }
    } else {
      $scope.addMarketId = high.marketId;
    }
    if ($rootScope.fType == 1) {
      NavigationServices.addMultiMkt($scope.addMarketId).then(
        function success(data) {
          if (data.data.status == "Success") {
            high.isMulti = 1;
          }
          $scope.addMultiMarketCalls = true;
        },
        function error(err) {
          $scope.addMultiMarketCalls = true;
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $rootScope.multiMarketsArray = localStorage.getItem("multiMarketArray");
      if ($rootScope.multiMarketsArray == null) {
        $rootScope.multiMarketsArray = [];
      } else {
        $rootScope.multiMarketsArray = JSON.parse($rootScope.multiMarketsArray);
      }
      // console.log($rootScope.multiMarketsArray)
      var checkMulti = $rootScope.multiMarketsArray.indexOf($scope.addMarketId);
      if (checkMulti == -1) {
        $rootScope.multiMarketsArray.push($scope.addMarketId);
        high.isMulti = 1;
      }
      $scope.addMultiMarketCalls = true;
      localStorage.setItem(
        "multiMarketArray",
        JSON.stringify($rootScope.multiMarketsArray)
      );
    }
  };
  $scope.removeMultiMarketCalls = true;
  $scope.removeMultiMarket = function (high, index, isFancy) {
    if ($scope.addMultiMarketCalls == false) {
      return false;
    }
    $scope.removeMultiMarketCalls = false;
    if (high.marketId == undefined) {
      if (high.mktId != undefined) {
        $scope.addMarketId = high.mktId;
      } else {
        $scope.addMarketId = high;
      }
    } else {
      $scope.addMarketId = high.marketId;
    }
    if ($rootScope.fType == 1) {
      NavigationServices.removeMultiMkt($scope.addMarketId).then(
        function success(data) {
          if (data.data.status == "Success") {
            high.isMulti = 0;
            if (index != undefined) {
              $rootScope.multiMarketData.splice(index, 1);
              $rootScope.marketBfIdArray.splice(index, 1);
              // $rootScope.fancyBfIdArray.splice(index,1);
            }
          }
          $scope.removeMultiMarketCalls = true;
        },
        function error(err) {
          $scope.removeMultiMarketCalls = true;
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $rootScope.multiMarketsArray = localStorage.getItem("multiMarketArray");
      if ($rootScope.multiMarketsArray == null) {
        $rootScope.multiMarketsArray = [];
      } else {
        $rootScope.multiMarketsArray = JSON.parse($rootScope.multiMarketsArray);
      }
      // console.log($rootScope.multiMarketsArray)
      var checkMulti = $rootScope.multiMarketsArray.indexOf($scope.addMarketId);
      if (checkMulti > -1) {
        $rootScope.multiMarketsArray.splice(checkMulti, 1);
        high.isMulti = 0;
        if (index != undefined) {
          if (isFancy == 1) {
            $rootScope.multiFancyData.splice(index, 1);
            $rootScope.fancyBfIdArray.splice(index, 1);
          } else {
            $rootScope.multiMarketData.splice(index, 1);
            $rootScope.marketBfIdArray.splice(index, 1);
          }
        }
      }
      high.isMulti = 0;
      $scope.removeMultiMarketCalls = true;
      localStorage.setItem(
        "multiMarketArray",
        JSON.stringify($rootScope.multiMarketsArray)
      );
    }
  };

  $scope.isMultiAdded = function (high) {
    if (high == undefined) {
      return false;
    }

    if (high.isMulti == undefined) {
      $rootScope.multiMarketsArray = localStorage.getItem("multiMarketArray");
      if ($rootScope.multiMarketsArray == null) {
        $rootScope.multiMarketsArray = [];
      } else {
        $rootScope.multiMarketsArray = JSON.parse($rootScope.multiMarketsArray);
      }
      $scope.addMatchBfId = high;
      var checkMulti = $rootScope.multiMarketsArray.indexOf(
        $scope.addMatchBfId
      );
      if (checkMulti > -1) {
        return false;
      } else {
        return true;
      }
      // console.log($rootScope.multiMarketsArray);
    } else {
      if (high.isMulti == 1) {
        return false;
      } else {
        if (high.marketId == undefined) {
          $scope.addMarketId = high.mktId;
        } else {
          $scope.addMarketId = high.marketId;
        }
        $rootScope.multiMarketsArray = localStorage.getItem("multiMarketArray");
        if ($rootScope.multiMarketsArray == null) {
          $rootScope.multiMarketsArray = [];
        } else {
          $rootScope.multiMarketsArray = JSON.parse(
            $rootScope.multiMarketsArray
          );
        }
        // console.log($rootScope.multiMarketsArray)
        var checkMulti = $rootScope.multiMarketsArray.indexOf(
          $scope.addMarketId
        );
        if (checkMulti > -1) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  $scope.getAllEventsCalls = true;
  $scope.getAllEvents = function () {
    if ($scope.getAllEventsCalls == false) {
      return false;
    }
    $scope.getAllEventsCalls = false;

    if ($rootScope.fType == 1) {
      NavigationServices.allSportsEvents().then(
        function success(data) {
          $scope.getAllEventsCalls = true;
          $scope.allEventsData = data.data.data;
          $scope.searchClear();
        },
        function error(err) {
          $scope.getAllEventsCalls = true;
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.getAllEventsCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        // console.log($rootScope.SportsDatas)
        $scope.allEventsData = $rootScope.searchWiseMatch(
          $rootScope.SportsDatas
        );
        // console.log($scope.allEventsData)
        // $scope.searchClear();
      }
    }
  };

  $scope.searchEvent = function () {
    $scope.searchEventList = [];
    $scope.searchInput = $scope.searchInput.toLowerCase();

    angular.forEach($scope.allEventsData, function (item) {
      // console.log(item)
      if (
        item.matchName.toLowerCase().indexOf($scope.searchInput) != -1 &&
        $scope.searchInput.length >= 3
      ) {
        // console.log($scope.allEventsData)
        $scope.searchEventList.push(item);
        // console.log($scope.searchEventList)
      }
    });
  };

  $scope.openSearchWrap = function () {
    $("#searchWrap").css("display", "block");
    $(".search-input").focus();
    $scope.searchInput = "";
    $scope.getAllEvents();
  };

  $scope.searchClear = function () {
    $scope.searchInput = "";
    $scope.searchEvent();
  };
  $scope.addExpand = function () {
    $("#searchWrap #searchPop").addClass("expand");
  };
  $scope.removeExpand = function () {
    $("#searchWrap #searchPop").removeClass("expand");
  };

  var fundsinterval;
  fundsinterval = $interval(function () {
    $scope.refreshFunds();
  }, 15000);

  if ($rootScope.token == undefined) {
    $interval.cancel(fundsinterval);
  }

  $scope.refreshFundsCalls = true;
  $scope.refreshFunds = function () {
    if ($scope.refreshFundsCalls == false) {
      return false;
    }
    $scope.refreshFundsCalls = false;

    $http({
      url: ApiUrl + "/Data/FundExpo",
      method: "GET",
      headers: {
        Token: $rootScope.token,
      },
    }).then(
      function success(data) {
        $scope.refreshFundsCalls = true;

        $scope.fundsData = data.data.data;
      },
      function error(err) {
        $scope.refreshFundsCalls = true;
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $rootScope.confirmBet = 1;
  $rootScope.settingsData = {
    betStake: {
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
    },
    defaultStake: 100,
    isOddsHighlights: 1,
  };

  $scope.getSettingsCalls = true;
  $scope.getSettings = function () {
    if ($scope.getSettingsCalls == false) {
      return false;
    }
    $scope.getSettingsCalls = false;

    $http({
      url: ApiUrl + "/Settings/GetSettings",
      method: "GET",
      headers: {
        Token: $rootScope.token,
      },
    }).then(
      function success(data) {
        $scope.getSettingsCalls = true;

        $rootScope.settingsData = data.data;

        if (
          $rootScope.settingsData.betStake.stake1 == 0 &&
          $rootScope.settingsData.betStake.stake2 == 0 &&
          $rootScope.settingsData.betStake.stake3 == 0 &&
          $rootScope.settingsData.betStake.stake4 == 0
        ) {
          // $rootScope.settingsData.betStake.stake1 = 1000;
          // $rootScope.settingsData.betStake.stake2 = 2000;
          // $rootScope.settingsData.betStake.stake3 = 5000;
          // $rootScope.settingsData.betStake.stake4 = 10000;
          // $rootScope.settingsData.betStake.stake5 = 25000;
          // $rootScope.settingsData.betStake.stake6 = 50000;
          // $rootScope.settingsData.betStake.stake7 = 100000;
          // $rootScope.settingsData.betStake.stake8 = 200000;
          // $rootScope.settingsData.betStake.stake9=500000;
          // $rootScope.settingsData.betStake.stake10=1000000;
          $scope.storebetStakeSettings();

          $rootScope.settingsData.isOddsHighlights = 1;
        }

        if ($rootScope.settingsData.defaultStake == 0) {
          $rootScope.settingsData.defaultStake = "";
        }
      },
      function error(err) {
        $scope.getSettingsCalls = true;
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

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
  $scope.storebetStakeSettings = function () {
    var finalData = JSON.stringify($scope.stakeListdata);
    $http({
      method: "POST",
      url: ApiUrl + "/Settings/SaveBetStakeSetting",
      headers: {
        Token: $rootScope.token,
      },
      data: finalData,
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.result == "Bet stake settings saved successfully") {
          $scope.getSettings();
          // toastr.success(response.data.result);
        } else {
          toastr.error(response.data.result);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
    // console.log(newStakeList)
  };

  $scope.saveBetStakeSetting = function () {
    $scope.saveStakeData = {
      stake1: $rootScope.settingsData.betStake.stake1,
      // "stake10":$rootScope.settingsData.betStake.stake10,
      stake2: $rootScope.settingsData.betStake.stake2,
      stake3: $rootScope.settingsData.betStake.stake3,
      stake4: $rootScope.settingsData.betStake.stake4,
      stake5: $rootScope.settingsData.betStake.stake5,
      stake6: $rootScope.settingsData.betStake.stake6,
      // "stake7":$rootScope.settingsData.betStake.stake7,
      // "stake8":$rootScope.settingsData.betStake.stake8,
      // "stake9":$rootScope.settingsData.betStake.stake9
    };

    $http({
      url: ApiUrl + "/Settings/SaveBetStakeSetting",
      method: "POST",
      data: JSON.stringify($scope.saveStakeData),
      headers: {
        Token: $rootScope.token,
      },
    }).then(
      function success(data) {},
      function error(err) {
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.saveSetting = function () {
    if (!$scope.editSaveStake) {
      return false;
    }

    if (
      $rootScope.settingsData.defaultStake == null ||
      $rootScope.settingsData.defaultStake == ""
    ) {
      $rootScope.settingsData.defaultStake = 0;
    }

    $http({
      url:
        ApiUrl +
        "/Settings/SaveSetting?s=" +
        $rootScope.settingsData.defaultStake +
        "&o=" +
        $rootScope.settingsData.isOddsHighlights,
      method: "POST",
      headers: {
        Token: $rootScope.token,
      },
    }).then(
      function success(data) {
        $scope.closeOverlayInfo("settingDiv");
        toastr.success(data.data.result);
      },
      function error(err) {
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.editSaveStake = true;
  $scope.editStake = function () {
    $scope.editSaveStake = !$scope.editSaveStake;
  };
  $scope.saveStake = function () {
    $scope.editSaveStake = !$scope.editSaveStake;
    $scope.saveBetStakeSetting();
  };

  $scope.toggleSwitch = function () {
    if ($rootScope.settingsData.isOddsHighlights == 0) {
      $rootScope.settingsData.isOddsHighlights = 1;
    } else {
      $rootScope.settingsData.isOddsHighlights = 0;
    }
  };
  $scope.toggleconfirmBet = function () {
    if ($rootScope.confirmBet == 0) {
      $rootScope.confirmBet = 1;
    } else {
      $rootScope.confirmBet = 0;
    }
  };

  $rootScope.oneClickStake = [100, 200, 300, 500];
  $scope.changeStakeVal = function (val, index) {
    // console.log(val,index)
    $rootScope.oneClickStake[index] = val;
    // console.log($scope.oneClickStake)
  };

  $rootScope.selected_Stake_btn = 0;
  $scope.selectStakeButton = function (index) {
    $rootScope.selected_Stake_btn = index;
  };

  $scope.editoneSaveStake = true;
  $scope.editOneStake = function () {
    $scope.editoneSaveStake = !$scope.editoneSaveStake;
  };

  $scope.saveOneStake = function () {
    $scope.editoneSaveStake = !$scope.editoneSaveStake;
    $scope.saveOneClickStake();
  };

  if (localStorage.getItem("oneclick") == undefined) {
    $rootScope.oneClicked = false;
    localStorage.setItem("oneclick", false);
  } else {
    $rootScope.oneClicked = localStorage.getItem("oneclick");
  }

  $scope.toggleOneClick = function () {
    if (localStorage.getItem("oneclick") == "true") {
      localStorage.setItem("oneclick", false);
      $rootScope.oneClicked = false;
    } else if (localStorage.getItem("oneclick") == "false") {
      localStorage.setItem("oneclick", true);
      $rootScope.oneClicked = true;
    }
  };

  // $scope.toggleOneClick();

  $scope.getOneClickStake = function () {
    $http({
      url: ApiUrl + "/Settings/GetOneClickStake",
      method: "GET",
      headers: {
        Token: $rootScope.token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          if (response.data.data != null) {
            $rootScope.oneClickStake[0] = response.data.data.stake1;
            $rootScope.oneClickStake[1] = response.data.data.stake2;
            $rootScope.oneClickStake[2] = response.data.data.stake3;
            $rootScope.oneClickStake[3] = response.data.data.stake4;
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
      $rootScope.oneClickStake[0] == "" ||
      $rootScope.oneClickStake[1] == "" ||
      $rootScope.oneClickStake[2] == "" ||
      $rootScope.oneClickStake[3] == ""
    ) {
      return false;
    }
    var OneClickStakeData = {
      stake1: $rootScope.oneClickStake[0],
      stake2: $rootScope.oneClickStake[1],
      stake3: $rootScope.oneClickStake[2],
      stake4: $rootScope.oneClickStake[3],
    };
    $http({
      url: ApiUrl + "/Settings/SaveOneClickStake",
      method: "POST",
      data: JSON.stringify(OneClickStakeData),
      headers: {
        Token: $rootScope.token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $scope.getOneClickStake();
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

  $scope.openCloseTv = true;
  $scope.openTv = function () {
    if ($scope.openCloseTv && $rootScope.liveTvConfig != undefined) {
      // if ($rootScope.liveTvConfig.channelIp==null) {
      //  return false;
      // }
      // $scope.openCloseTv=!$scope.openCloseTv;
      // var channelIp = $rootScope.liveTvConfig.channelIp.trim()
      //       var channelNo = $rootScope.liveTvConfig.channelNo
      //       var hdmi = $rootScope.liveTvConfig.hdmi.trim()
      //       var program = "p1"
      //       $('#liveTvContent').html('<div id="hasTv" style="padding-left:0px;padding-top:4px;text-align:center"> <u1 id="' + program + '"></u1> <script type="text/javascript"> if ( "MediaSource" in window && "WebSocket" in window ){RunPlayer( \'' + program + '\', "100%", 200, \'' + channelIp + '\', "443", true, \'' + hdmi + '\', "", true, true, 0.01, "", false ); } else {document.getElementById(' + program + ').innerHTML = "Websockets are not supported in your browser."; } </script> </div>');

      var width = window.innerWidth;
      var height = Math.ceil(width / 1.778);

      $rootScope.loader = true;

      setTimeout(function () {
        $rootScope.loader = false;
      }, 5000);

      var matchid = $routeParams.mtBfId;

      $scope.openCloseTv = !$scope.openCloseTv;

      $("#liveTvContent").append(
        '<iframe id="mobilePlayer" allowfullscreen="true" frameborder="0" scrolling="no" style="overflow: hidden; width: ' +
          width +
          "px; height: " +
          height +
          'px;" src="http://tv.allexch.com/index.html?token=696363a6-035b-450c-8ec6-312e779732ac&mtid=' +
          matchid +
          '" height="' +
          height +
          '"></iframe>'
      );
    } else if (
      $scope.openCloseTv &&
      $rootScope.liveTvConfig == undefined &&
      $routeParams.mtBfId != null
    ) {
      var width = window.innerWidth;
      var height = Math.ceil(width / 1.778);

      // if($routeParams.sportId==2){
      //  height=200;
      // }
      $rootScope.loader = true;

      setTimeout(function () {
        $rootScope.loader = false;
      }, 5000);

      var matchid = $routeParams.mtBfId;

      $scope.openCloseTv = !$scope.openCloseTv;

      $("#liveTvContent").append(
        '<iframe id="mobilePlayer" allowfullscreen="true" frameborder="0" scrolling="no" style="overflow: hidden; width: ' +
          width +
          "px; height: " +
          height +
          'px;" src="https://videoplayer.betfair.com/GetPlayer.do?tr=266&eID=' +
          matchid +
          "&contentType=viz&contentOnly=true&statsToggle=show&width=" +
          width +
          "&height=" +
          height +
          '" height="' +
          height +
          '"></iframe>'
      );
    }
    // else if (!$scope.openCloseTv && $rootScope.liveTvConfig!=undefined) {
    //  $('#liveTvContent').html("");

    //  $scope.openCloseTv=!$scope.openCloseTv;
    // }
    else if (!$scope.openCloseTv) {
      $("#liveTvContent").html("");

      $scope.openCloseTv = !$scope.openCloseTv;
    }
  };

  $scope.openBetsLeftSide = function () {
    $("#openBetsLeftSide").css("display", "block");
    $("#openBetsLeftSide #openBetSlide").addClass("left-in");
    $timeout(function () {
      $("#openBetsLeftSide #openBetSlide").removeClass("left-in");
    }, 200);
  };
  $scope.openSettingRightSide = function () {
    $("#settingDiv").css("display", "flex");
    $("#settingDiv #settingSlide").addClass("right-in");
    $timeout(function () {
      $("#settingDiv #settingSlide").removeClass("right-in");
    }, 200);
  };
  $scope.showOverlayInfo = function (id) {
    $("#" + id).css("display", "flex");
  };
  $scope.closeOverlayInfo = function (id) {
    if (id == "settingDiv") {
      if (!$scope.editSaveStake) {
        return false;
      }
    }
    $("#" + id).css("display", "none");
    $scope.fancyBookData = null;
  };

  $scope.openCloseFancyInfo = function (fancy) {
    $scope.fancyInfo = fancy;
  };

  // $rootScope.$on("$routeChangeStart", function (event, next, current) {
  //  console.log(current)
  //     // if (next && next.$$route && next.$$route.secure) {

  //     // }
  // });
  $rootScope.selectedTab = "home";
  $scope.selectTab = function (select) {
    $rootScope.selectedTab = select;
  };

  $scope.showBetInfo = false;
  $scope.betInfo = function () {
    $scope.showBetInfo = !$scope.showBetInfo;
  };

  $scope.isAvg = false;
  $scope.betAvg = function () {
    $scope.isAvg = !$scope.isAvg;
    $scope.getAllBets($scope.selectedMatchBets);
  };

  var allBetsInterval = $interval(function () {
    if ($scope.selectedMatchBets == undefined) {
      $scope.selectedMatchBets = 0;
    }
    $scope.getAllBets($scope.selectedMatchBets);
    // console.log('get all bet')
  }, 1000);

  $scope.getAllBetsCalls = true;
  $scope.getAllBets = function (match) {
    if ($scope.getAllBetsCalls == false) {
      return false;
    }
    $scope.getAllBetsCalls = false;

    $scope.selectedMatchBets = match;

    if (match == undefined) {
      $scope.matchedDataLength = 0;
      $scope.matchedData = [];
      $scope.unMatchedDataLength = 0;
      $scope.unMatchedData = [];
      if ($routeParams.matchId == undefined) {
        $scope.getMatchId = 0;
      } else {
        $scope.getMatchId = $routeParams.matchId;
        angular.forEach($scope.matchArrayData, function (item) {
          if ($scope.getMatchId == item.matchId) {
            $scope.selectedMatchBets = item;
          }
        });
      }
    } else if (match == 0) {
      $scope.getMatchId = match;
      $scope.matchedDataLength = 0;
      $scope.matchedData = [];
      $scope.unMatchedDataLength = 0;
      $scope.unMatchedData = [];
      $scope.selectedMatchBets = undefined;
    } else {
      $scope.getMatchId = match.matchId;
    }
    if ($scope.isAvg) {
      $scope.avg = 1;
    } else {
      $scope.avg = 0;
    }

    if ($rootScope.fType == 1) {
      NavigationServices.getAllBets($scope.avg, $scope.getMatchId).then(
        function success(data) {
          $scope.getAllBetsCalls = true;

          if ($scope.getMatchId != 0) {
            $scope.matchedDataLength = data.data.matchedData.length;
            $scope.matchedData = $scope.getMatchBetArray(data.data.matchedData);
            $scope.unMatchedDataLength = data.data.unMatchedData.length;
            $scope.unMatchedData = $scope.getMatchBetArray(
              data.data.unMatchedData
            );
            // console.log($scope.matchedData);
            // console.log($scope.unMatchedData);
            if ($scope.matchedDataLength >= 1) {
              if ($scope.selectedMatchBets == undefined) {
                $scope.selectedMatchBets = {
                  matchName: data.data.matchedData[0].matchName,
                  matchId: data.data.matchedData[0].matchId,
                };
              }
            }
            if ($scope.unMatchedDataLength >= 1) {
              if ($scope.selectedMatchBets == undefined) {
                $scope.selectedMatchBets = {
                  matchName: data.data.unMatchedData[0].matchName,
                  matchId: data.data.unMatchedData[0].matchId,
                };
              }
            }

            if (
              $scope.unMatchedDataLength != 0 &&
              allBetsInterval.$$state.status != 0
            ) {
              allBetsInterval = $interval(function () {
                $scope.getAllBets($scope.selectedMatchBets);
              }, 3000);
            }
            if ($scope.unMatchedDataLength == 0) {
              $interval.cancel(allBetsInterval);
            }
          }

          if ($scope.getMatchId == 0) {
            $scope.matchedDataLength = 0;
            $scope.matchedData = [];
            $scope.unMatchedDataLength = 0;
            $scope.unMatchedData = [];
            $scope.matchArrayData = $scope.getMatchArray(
              data.data.matchedData,
              data.data.unMatchedData
            );
            // console.log($scope.matchArrayData);
            $interval.cancel(allBetsInterval);
          }
        },
        function error(err) {
          $scope.getAllBetsCalls = true;
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.getAllBetsCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        var getBetsDatas = $rootScope.getAllBetsWise(
          $scope.getMatchId,
          $scope.avg
        );
        if ($scope.getMatchId != 0) {
          $scope.matchedDataLength = getBetsDatas.matchedData.length;
          $scope.matchedData = $scope.getMatchBetArray(
            getBetsDatas.matchedData
          );
          $scope.unMatchedDataLength = getBetsDatas.unMatchedData.length;
          $scope.unMatchedData = $scope.getMatchBetArray(
            getBetsDatas.unMatchedData
          );
          // console.log($scope.matchedData);
          // console.log($scope.unMatchedData);
          if ($scope.matchedDataLength >= 1) {
            if ($scope.selectedMatchBets == undefined) {
              $scope.selectedMatchBets = {
                matchName: getBetsDatas.matchedData[0].matchName,
                matchId: getBetsDatas.matchedData[0].matchId,
              };
            }
          }
          if ($scope.unMatchedDataLength >= 1) {
            if ($scope.selectedMatchBets == undefined) {
              $scope.selectedMatchBets = {
                matchName: getBetsDatas.unMatchedData[0].matchName,
                matchId: getBetsDatas.unMatchedData[0].matchId,
              };
            }
          }

          // if ($scope.unMatchedDataLength != 0 && allBetsInterval.$$state.status != 0) {
          //                 allBetsInterval = $interval(function() {
          //                     $scope.getAllBets($scope.selectedMatchBets);
          //                 }, 3000)
          //             }
          //             if ($scope.unMatchedDataLength == 0) {
          //                 $interval.cancel(allBetsInterval);
          //             }
        }

        if ($scope.getMatchId == 0) {
          $scope.matchedDataLength = 0;
          $scope.matchedData = [];
          $scope.unMatchedDataLength = 0;
          $scope.unMatchedData = [];
          $scope.matchArrayData = $scope.getMatchArray(
            getBetsDatas.matchedData,
            getBetsDatas.unMatchedData
          );
          // console.log($scope.matchArrayData);
          // $interval.cancel(allBetsInterval);
        }
      }
    }
  };

  $scope.getMatchArray = function (matchedData, unMatchedData) {
    var matchArray = [];
    var matchArrayCheck = [];

    angular.forEach(matchedData, function (item) {
      if (matchArray.length == 0) {
        matchArray.push({
          matchName: item.matchName,
          matchId: item.matchId,
        });
        matchArrayCheck.push(item.matchId);
      } else {
        if (matchArrayCheck.indexOf(item.matchId) == -1) {
          matchArray.push({
            matchName: item.matchName,
            matchId: item.matchId,
          });
          matchArrayCheck.push(item.matchId);
        }
      }
    });

    angular.forEach(unMatchedData, function (item) {
      if (matchArray.length == 0) {
        matchArray.push({
          matchName: item.matchName,
          matchId: item.matchId,
        });
        matchArrayCheck.push(item.matchId);
      } else {
        if (matchArrayCheck.indexOf(item.matchId) == -1) {
          matchArray.push({
            matchName: item.matchName,
            matchId: item.matchId,
          });
          matchArrayCheck.push(item.matchId);
        }
      }
    });

    return matchArray;
  };

  $scope.getMatchBetArray = function (matchedData) {
    var back = [];
    var lay = [];
    var yes = [];
    var no = [];
    var marketBets = {
      back: back,
      lay: lay,
    };
    var sessionBets = {
      yes: yes,
      no: no,
    };

    var matchBetWiseArray = {
      marketBet: marketBets,
      sessionBets: sessionBets,
    };

    angular.forEach(matchedData, function (item) {
      if (item.isFancy != 1) {
        if (item.backLay == "BACK") {
          matchBetWiseArray.marketBet.back.push(item);
        } else {
          matchBetWiseArray.marketBet.lay.push(item);
        }
      } else {
        if (item.backLay == "YES") {
          matchBetWiseArray.sessionBets.yes.push(item);
        } else {
          matchBetWiseArray.sessionBets.no.push(item);
        }
      }
    });

    return matchBetWiseArray;
  };

  $scope.editBtn = function (bet) {
    $scope.selectedBet = angular.copy(bet);
  };

  $scope.editMOBetCalls = true;
  $scope.editMOBet = function (eMOData) {
    $("#loading").css("display", "flex");

    if ($scope.editMOBetCalls == false) {
      return false;
    }
    $scope.editMOBetCalls = false;

    $scope.eMoBet = {
      betId: eMOData.id,
      odds: eMOData.odds,
      stake: eMOData.stake,
    };
    $scope.eMoBet["source"] = context;
    $scope.eMoBet["info"] =
      "os:" +
      jscd.os +
      ", os_version:" +
      jscd.osVersion +
      ", browser:" +
      jscd.browser +
      ", browser_version:" +
      jscd.browserMajorVersion;
    $scope.selectedBet = null;
    console.log($scope.eMoBe);
    NavigationServices.editMOBet($scope.eMoBet).then(
      function success(data) {
        console.log(data);
        $scope.displayMsg(data.data, 1);
        $scope.refreshFunds();
        $scope.placeMarketData = null;
        $("#loading").css("display", "none");
        $scope.editMOBetCalls = true;
        // $('.back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3').removeClass('select');

        if (data.data.status == "Success") {
          $rootScope.getExposureBook(eMOData.marketId, "1");
        }
        // else{
        //  $rootScope.getExposureBook(MOData.marketId);
        // }
      },
      function error(err) {
        $scope.editMOBetCalls = true;
        $("#loading").css("display", "none");

        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.cancelAll = function () {
    angular.forEach($scope.unMatchedData.marketBet.back, function (item) {
      $scope.cancelBet(item.id);
    });
    angular.forEach($scope.unMatchedData.marketBet.lay, function (item) {
      $scope.cancelBet(item.id);
    });
  };

  // $scope.cancelBetCalls=true;
  $scope.cancelBet = function (betId) {
    // if ($scope.cancelBetCalls==false) {
    //  return false;
    // }
    // $scope.cancelBetCalls=false;
    $("#loading").css("display", "flex");

    NavigationServices.cancelBet(betId).then(
      function success(data) {
        console.log(data);

        $scope.betMsgResult = data.data;
        $scope.removeMsg();
        // $scope.displayMsg(data.data);
        $("#loading").css("display", "none");
        // $scope.cancelBetCalls=true;

        if (data.data.status == "Success") {
          $scope.getAllBets();
          $scope.refreshFunds();
          // $rootScope.getExposureBook(MOData.marketId);
        } else {
          // $rootScope.getExposureBook(MOData.marketId);
        }
      },
      function error(err) {
        // $scope.cancelBetCalls=true;
        $("#loading").css("display", "none");

        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.placeMOBetCalls = true;
  $scope.placeMOBet = function (MOData) {
    $scope.confirmPlaceMarketData = null;
    $("#loading").css("display", "flex");

    if ($scope.placeMOBetCalls == false) {
      return false;
    }
    $scope.placeMOBetCalls = false;
    NavigationServices.placeMOBet(MOData).then(
      function success(data) {
        console.log(data);
        $scope.cancelBetslip();
        $scope.displayMsg(data.data);
        $scope.placeMarketData = null;
        $("#loading").css("display", "none");
        $scope.placeMOBetCalls = true;
        $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");

        if (
          data.data.status == "Success" &&
          data.data.result.indexOf("unmatched") > -1
        ) {
          $rootScope.getExposureBook(MOData.marketId);
          $scope.refreshFunds();
        } else {
          $rootScope.getExposureBook(MOData.marketId, "1");
          $scope.refreshFunds();
        }
      },
      function error(err) {
        $scope.placeMOBetCalls = true;
        $("#loading").css("display", "none");

        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.placeBMBetCalls = true;
  $scope.placeBMBet = function (BMData) {
    if ($rootScope.token == undefined || $rootScope.token == "") {
      $window.location.href = "login.html";
      return false;
    }
    $("#loading").css("display", "flex");

    if ($scope.placeBMBetCalls == false) {
      return false;
    }
    $scope.placeBMBetCalls = false;
    $timeout(function () {
      NavigationServices.placeBMBet(BMData).then(
        function success(data) {
          // console.log(data);
          $scope.cancelBetslip();
          $scope.displayMsg(data.data);
          $scope.placeBookData = null;
          $("#loading").css("display", "none");
          $scope.placeBMBetCalls = true;
          $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass(
            "select"
          );

          if (data.data.status == "Success") {
            $rootScope.getBMExposureBook(BMData.marketId, BMData.bookId, "1");
            $scope.refreshFunds();
          } else {
            // $rootScope.getBMExposureBook(BMData.marketId,BMData.bookId);
          }
        },
        function error(err) {
          $scope.placeBMBetCalls = true;
          $("#loading").css("display", "none");

          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    }, 3000);
  };

  $scope.placeFancyBetCalls = true;
  $scope.placeFancyBet = function (fancyData) {
    if ($rootScope.token == undefined || $rootScope.token == "") {
      $window.location.href = "login.html";
      return false;
    }

    $("#loading").css("display", "flex");
    if ($scope.placeFancyBetCalls == false) {
      return false;
    }
    $scope.placeFancyBetCalls = false;
    $timeout(function () {
      fancyData.rate = parseInt(fancyData.rate);
      fancyData.score = parseInt(fancyData.score);
      NavigationServices.placeFancyBet(fancyData).then(
        function success(data) {
          console.log(data);
          $scope.cancelBetslip();
          $scope.displayMsg(data.data);
          $scope.placeFancyData = null;
          $("#loading").css("display", "none");
          $scope.placeFancyBetCalls = true;
          $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass(
            "select"
          );

          if (data.data.status == "Success") {
            $rootScope.getFancyExpoBook(fancyData.matchId, fancyData.fancyId);
            $scope.refreshFunds();
          } else {
            // $rootScope.getFancyExpoBook(fancyData.matchId,fancyData.fancyId);
          }
        },
        function error(err) {
          $scope.placeFancyBetCalls = true;
          $("#loading").css("display", "none");

          $scope.errorMsg = {
            status: "Error",
            result: "Unable to place bet..",
          };
          $scope.displayMsg($scope.errorMsg);

          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    }, 1000);
  };

  $scope.placeTPBetCalls = true;
  $scope.placeTPBet = function (TPData) {
    if (TPData.cards) {
      if (TPData.cards.length < 3) {
        $scope.errorMsg = {
          status: "Error",
          result: "Please Select Atleast 3 Cards..",
        };
        $scope.displayMsg($scope.errorMsg);
        return false;
      }
    }

    if ($rootScope.token == undefined || $rootScope.token == "") {
      $window.location.href = "login.html";
      return false;
    }

    $("#loading").css("display", "flex");
    if ($scope.placeTPBetCalls == false) {
      return false;
    }
    $scope.placeTPBetCalls = false;
    $timeout(function () {
      NavigationServices.PlaceTpBet(TPData).then(
        function success(data) {
          console.log(data);
          $scope.cancelBetslip(false);
          $scope.cancelTPBetslip(TPData.gameId);
          $scope.displayMsg(data.data);
          $scope.placeTPData = null;
          $("#loading").css("display", "none");
          $scope.placeTPBetCalls = true;
          $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass(
            "select"
          );

          if (data.data.status == "Success") {
            if (TPData.gameType == 1 || TPData.gametype == 2) {
              $rootScope.getTPExposureBook(TPData.gameId, "1");
            }
            if (TPData.gameType == 5) {
              $rootScope.getLucky7ExposureBook(TPData.gameId, "1");
            }
            if (TPData.gameType == 6) {
              $rootScope.getThreeCardJExposureBook(TPData.gameId, "1");
            }
            if (TPData.gameType == 7) {
              $rootScope.getAndarBaharExposureBook(TPData.gameId, "1");
            }

            $scope.refreshFunds();
          } else {
            if (TPData.gameType == 1 || TPData.gametype == 2) {
              $rootScope.getTPExposureBook(TPData.gameId);
            }
            if (TPData.gameType == 5) {
              $rootScope.getLucky7ExposureBook(TPData.gameId);
            }
            if (TPData.gameType == 6) {
              $rootScope.getThreeCardJExposureBook(TPData.gameId);
            }
            if (TPData.gameType == 7) {
              $rootScope.getAndarBaharExposureBook(TPData.gameId);
            }
          }
        },
        function error(err) {
          $scope.placeTPBetCalls = true;
          $("#loading").css("display", "none");

          $scope.errorMsg = {
            status: "Error",
            result: "Unable to place bet..",
          };
          $scope.displayMsg($scope.errorMsg);

          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    }, 3000);
  };

  $rootScope.getExposureBook = function (marketId, state) {
    if (state != undefined) {
      NavigationServices.exposureBook(marketId).then(
        function success(data) {
          // console.log(data)
          $scope.mktExposure = data.data.data;
          angular.forEach($scope.mktExposure, function (item, index) {
            var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
              /[_\s]/g,
              "_"
            );
            $("#withoutBetMktExp_" + marketId + "_" + runnerName).removeClass(
              "win"
            );
            $("#withoutBetMktExp_" + marketId + "_" + runnerName).removeClass(
              "lose"
            );
            if (item.Value >= 0) {
              $("#withoutBetMktExp_" + marketId + "_" + runnerName)
                .text(item.Value)
                .addClass("win");
            } else if (item.Value <= 0) {
              $("#withoutBetMktExp_" + marketId + "_" + runnerName)
                .text("(" + item.Value + ")")
                .addClass("lose");
            }
          });
          localStorage.setItem(
            "MktExpo_" + marketId,
            JSON.stringify(data.data.data)
          );
        },
        function error(err) {
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.mktExpoBook = JSON.parse(
        localStorage.getItem("MktExpo_" + marketId)
      );

      if ($scope.mktExpoBook == null) {
        $rootScope.getExposureBook(marketId, "1");
      }

      angular.forEach($scope.mktExpoBook, function (item, index) {
        var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#withoutBetMktExp_" + marketId + "_" + runnerName).removeClass(
          "win"
        );
        $("#withoutBetMktExp_" + marketId + "_" + runnerName).removeClass(
          "lose"
        );
        if (item.Value >= 0) {
          $("#withoutBetMktExp_" + marketId + "_" + runnerName)
            .text(item.Value)
            .addClass("win");
        } else if (item.Value <= 0) {
          $("#withoutBetMktExp_" + marketId + "_" + runnerName)
            .text("(" + item.Value + ")")
            .addClass("lose");
        }
      });
    }
  };

  $rootScope.getBMExposureBook = function (marketId, bookId, state) {
    if (state != undefined) {
      NavigationServices.BMExposureBook(marketId, bookId).then(
        function success(data) {
          angular.forEach(data.data.data, function (item, index) {
            var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
              /[_\s]/g,
              "_"
            );
            $("#withoutBetBMExp_" + bookId + "_" + runnerName).removeClass(
              "win"
            );
            $("#withoutBetBMExp_" + bookId + "_" + runnerName).removeClass(
              "lose"
            );
            if (item.Value >= 0) {
              $("#withoutBetBMExp_" + bookId + "_" + runnerName)
                .text(item.Value)
                .addClass("win");
            } else {
              $("#withoutBetBMExp_" + bookId + "_" + runnerName)
                .text("(" + item.Value + ")")
                .addClass("lose");
            }
          });
          localStorage.setItem(
            "BMExpo_" + bookId,
            JSON.stringify(data.data.data)
          );
        },
        function error(err) {
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.BmExpoBook = JSON.parse(localStorage.getItem("BMExpo_" + bookId));

      if ($scope.BmExpoBook == null) {
        $rootScope.getBMExposureBook(marketId, bookId, "1");
      }

      angular.forEach($scope.BmExpoBook, function (item, index) {
        var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#withoutBetBMExp_" + bookId + "_" + runnerName).removeClass("win");
        $("#withoutBetBMExp_" + bookId + "_" + runnerName).removeClass("lose");
        if (item.Value >= 0) {
          $("#withoutBetBMExp_" + bookId + "_" + runnerName)
            .text(item.Value)
            .addClass("win");
        } else if (item.Value <= 0) {
          $("#withoutBetBMExp_" + bookId + "_" + runnerName)
            .text("(" + item.Value + ")")
            .addClass("lose");
        }
      });
    }
  };

  $rootScope.getFancyExpoBook = function (matchId, fancyId, bookData) {
    // console.log(bookData)

    if (bookData != undefined) {
      if (bookData == "-") {
        bookData = 0;
      }
      if (bookData > 0) {
        $("#fancyBetBookBtn_" + fancyId).css("display", "block");
        $("#beforeFancyExpo_" + fancyId).addClass("win");
        $("#beforeFancyExpo_" + fancyId + " span")
          .text(bookData)
          .addClass("green");
      } else if (bookData < 0) {
        $("#fancyBetBookBtn_" + fancyId).css("display", "block");
        $("#beforeFancyExpo_" + fancyId).addClass("lose");
        $("#beforeFancyExpo_" + fancyId + " span")
          .text("(" + bookData + ")")
          .addClass("red");
      }
      localStorage.setItem("FancyExpo_" + fancyId, bookData);
    } else {
      NavigationServices.fancyExposure(matchId, fancyId).then(
        function success(data) {
          if (data.data.data >= 0) {
            $("#fancyBetBookBtn_" + fancyId).css("display", "block");
            $("#beforeFancyExpo_" + fancyId).addClass("win");
            $("#beforeFancyExpo_" + fancyId + " span")
              .text(data.data.data)
              .addClass("green");
          } else {
            $("#fancyBetBookBtn_" + fancyId).css("display", "block");
            $("#beforeFancyExpo_" + fancyId).addClass("lose");
            $("#beforeFancyExpo_" + fancyId + " span")
              .text("(" + data.data.data + ")")
              .addClass("red");
          }
          localStorage.setItem("FancyExpo_" + fancyId, data.data.data);
        },
        function error(err) {
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    }
  };

  $rootScope.getTPExposureBook = function (gameId, state) {
    if (gameId == 0) {
      return false;
    }
    if (state != undefined) {
      NavigationServices.T20ExposureBook(gameId).then(
        function success(data) {
          // console.log(data)
          $scope.tpExposure = data.data.data;
          angular.forEach($scope.tpExposure, function (item, index) {
            var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
              /[_\s]/g,
              "_"
            );
            $("#withoutBetMktExp_" + gameId + "_" + runnerName).removeClass(
              "win"
            );
            $("#withoutBetMktExp_" + gameId + "_" + runnerName).removeClass(
              "lose"
            );
            if (item.Value >= 0) {
              $("#withoutBetMktExp_" + gameId + "_" + runnerName)
                .text(item.Value)
                .addClass("win");
            } else if (item.Value <= 0) {
              $("#withoutBetMktExp_" + gameId + "_" + runnerName)
                .text("(" + item.Value + ")")
                .addClass("lose");
            }
          });
          localStorage.setItem(
            "TPExpo_" + gameId,
            JSON.stringify(data.data.data)
          );
        },
        function error(err) {
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.tpExposure = JSON.parse(localStorage.getItem("TPExpo_" + gameId));

      if ($scope.tpExposure == null) {
        $rootScope.getTPExposureBook(gameId, "1");
      }

      angular.forEach($scope.tpExposure, function (item, index) {
        var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#withoutBetMktExp_" + gameId + "_" + runnerName).removeClass("win");
        $("#withoutBetMktExp_" + gameId + "_" + runnerName).removeClass("lose");
        if (item.Value >= 0) {
          $("#withoutBetMktExp_" + gameId + "_" + runnerName)
            .text(item.Value)
            .addClass("win");
        } else if (item.Value <= 0) {
          $("#withoutBetMktExp_" + gameId + "_" + runnerName)
            .text("(" + item.Value + ")")
            .addClass("lose");
        }
      });
    }
  };

  $rootScope.getThreeCardJExposureBook = function (gameId, state) {
    if (gameId == 0) {
      return false;
    }
    if (state != undefined) {
      NavigationServices.ThreeCardJExposureBook(gameId).then(
        function success(data) {
          // console.log(data)
          $scope.tpExposure = data.data.data;
          angular.forEach($scope.tpExposure, function (item, index) {
            var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
              /[_\s]/g,
              "_"
            );
            $("#Tp_" + gameId + "_" + runnerName).removeClass("win");
            $("#Tp_" + gameId + "_" + runnerName).removeClass("lose");
            if (item.Value >= 0) {
              $("#Tp_" + gameId + "_" + runnerName)
                .text(item.Value)
                .addClass("win");
            } else if (item.Value <= 0) {
              $("#Tp_" + gameId + "_" + runnerName)
                .text("(" + item.Value + ")")
                .addClass("lose");
            }
          });
          localStorage.setItem(
            "TPExpo3CRD_" + gameId,
            JSON.stringify(data.data.data)
          );
        },
        function error(err) {
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.tpExposure = JSON.parse(
        localStorage.getItem("TPExpo3CRD_" + gameId)
      );

      if ($scope.tpExposure == null) {
        $rootScope.getThreeCardJExposureBook(gameId, "1");
      }

      angular.forEach($scope.tpExposure, function (item, index) {
        var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#Tp_" + gameId + "_" + runnerName).removeClass("win");
        $("#Tp_" + gameId + "_" + runnerName).removeClass("lose");
        if (item.Value >= 0) {
          $("#Tp_" + gameId + "_" + runnerName)
            .text(item.Value)
            .addClass("win");
        } else if (item.Value <= 0) {
          $("#Tp_" + gameId + "_" + runnerName)
            .text("(" + item.Value + ")")
            .addClass("lose");
        }
      });
    }
  };

  $rootScope.getLucky7ExposureBook = function (gameId, state) {
    if (gameId == 0) {
      return false;
    }
    if (state != undefined) {
      NavigationServices.Lucky7ExposureBook(gameId).then(
        function success(data) {
          // console.log(data)
          $scope.tpExposure = data.data.data;
          angular.forEach($scope.tpExposure, function (item, index) {
            var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
              /[_\s]/g,
              "_"
            );
            $("#Tp_" + gameId + "_" + runnerName).removeClass("win");
            $("#Tp_" + gameId + "_" + runnerName).removeClass("lose");
            if (item.Value >= 0) {
              $("#Tp_" + gameId + "_" + runnerName)
                .text(item.Value)
                .addClass("win");
            } else if (item.Value <= 0) {
              $("#Tp_" + gameId + "_" + runnerName)
                .text("(" + item.Value + ")")
                .addClass("lose");
            }
          });
          localStorage.setItem(
            "TPExpoLucky7_" + gameId,
            JSON.stringify(data.data.data)
          );
        },
        function error(err) {
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.tpExposure = JSON.parse(
        localStorage.getItem("TPExpoLucky7_" + gameId)
      );

      if ($scope.tpExposure == null) {
        $rootScope.getLucky7ExposureBook(gameId, "1");
      }

      angular.forEach($scope.tpExposure, function (item, index) {
        var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#Tp_" + gameId + "_" + runnerName).removeClass("win");
        $("#Tp_" + gameId + "_" + runnerName).removeClass("lose");
        if (item.Value >= 0) {
          $("#Tp_" + gameId + "_" + runnerName)
            .text(item.Value)
            .addClass("win");
        } else if (item.Value <= 0) {
          $("#Tp_" + gameId + "_" + runnerName)
            .text("(" + item.Value + ")")
            .addClass("lose");
        }
      });
    }
  };

  $rootScope.getAndarBaharExposureBook = function (gameId, state) {
    if (gameId == 0) {
      return false;
    }
    if (state != undefined) {
      NavigationServices.AndarBaharExposureBook(gameId).then(
        function success(data) {
          // console.log(data)
          $scope.tpExposure = data.data.data;
          angular.forEach($scope.tpExposure, function (item, index) {
            var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
              /[_\s]/g,
              "_"
            );
            $("#Tp_" + gameId + "_" + runnerName).removeClass("win");
            $("#Tp_" + gameId + "_" + runnerName).removeClass("lose");
            if (item.Value >= 0) {
              $("#Tp_" + gameId + "_" + runnerName)
                .text(item.Value)
                .addClass("win");
            } else if (item.Value <= 0) {
              $("#Tp_" + gameId + "_" + runnerName)
                .text("(" + item.Value + ")")
                .addClass("lose");
            }
          });
          localStorage.setItem(
            "TPExpoAB_" + gameId,
            JSON.stringify(data.data.data)
          );
        },
        function error(err) {
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.tpExposure = JSON.parse(
        localStorage.getItem("TPExpoAB_" + gameId)
      );

      if ($scope.tpExposure == null) {
        $rootScope.getAndarBaharExposureBook(gameId, "1");
      }

      angular.forEach($scope.tpExposure, function (item, index) {
        var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
          /[_\s]/g,
          "_"
        );
        $("#Tp_" + gameId + "_" + runnerName).removeClass("win");
        $("#Tp_" + gameId + "_" + runnerName).removeClass("lose");
        if (item.Value >= 0) {
          $("#Tp_" + gameId + "_" + runnerName)
            .text(item.Value)
            .addClass("win");
        } else if (item.Value <= 0) {
          $("#Tp_" + gameId + "_" + runnerName)
            .text("(" + item.Value + ")")
            .addClass("lose");
        }
      });
    }
  };

  $scope.fancyBookData = null;
  $scope.getFancyBookCalls = true;
  $rootScope.getFancyBook = function (matchId, fancyId, fancyName) {
    $scope.fancyName = fancyName;
    if ($scope.getFancyBookCalls == false) {
      return false;
    }
    $scope.getFancyBookCalls = false;
    NavigationServices.fancyBook(matchId, fancyId).then(
      function success(data) {
        $("#fancyBetBookLeftSide #sideWrap").addClass("left-in");

        $timeout(function () {
          $("#fancyBetBookLeftSide #sideWrap").removeClass("left-in");
        }, 200);

        $scope.fancyBookData = $scope.combinedFancyBook(data.data.data);
        $scope.getFancyBookCalls = true;
      },
      function error(err) {
        $scope.getFancyBookCalls = true;
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.reverse = true;
  $scope.combinedFancyBook = function (data) {
    var parentFancyData = [];
    var middleData = [];
    var matchValue = "";
    var lastKeyValue = "";
    var fistKeyValue;
    var i = 0;
    $.each(data, function (key, value) {
      if (key == 0) {
        matchValue = value.Value;
      }
      if (matchValue != value.Value) {
        parentFancyData.push({
          Key: value.Key - 1,
          Value: matchValue,
        });
        fistKeyValue = value.Key;
      }
      matchValue = value.Value;
      lastKeyValue = value.Key;
    });
    parentFancyData.push({
      Key: fistKeyValue,
      Value: matchValue,
    });

    parentFancyData.forEach((item, index) => {
      if (index > 0) {
        $.each(data, function (key, value) {
          if (
            item.Key > value.Key &&
            parentFancyData[index - 1].Key < value.Key
          ) {
            parentFancyData.push({
              Key: value.Key,
              Value: value.Value,
            });
          }
        });
      }
    });
    console.log(parentFancyData, middleData);
    return parentFancyData;
  };

  $scope.msgResult = null;
  $scope.displayMsg = function (dataMsg, state) {
    if (state == 1) {
      $scope.betMsgResult = dataMsg;
    } else {
      $scope.msgResult = dataMsg;
    }

    // if ($scope.msgResult.result.indexOf('unmatched')!=-1) {

    // }
    // else{
    // }

    $scope.removeMsg();
  };

  $scope.removeMsg = function (state) {
    if (state == 1) {
      $scope.msgResult = null;
      $scope.betMsgResult = null;
    } else {
      $timeout(function () {
        $scope.msgResult = null;
        $scope.betMsgResult = null;
      }, 5000);
    }
  };

  $scope.openMarketBetslip = function (
    event,
    backLay,
    odds,
    runnerName,
    sportId,
    mtBfId,
    matchId,
    marketId,
    bfId
  ) {
    console.log(
      backLay,
      odds,
      runnerName,
      sportId,
      mtBfId,
      matchId,
      marketId,
      bfId
    );
    $scope.cancelBetslip();
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    var element = angular.element(event.currentTarget);
    element.addClass("select");

    if (localStorage.getItem("oneclick") == "true") {
      var oneClickMOData = {
        backlay: backLay,
        info: $rootScope.info,
        marketId: marketId,
        matchId: matchId,
        odds: odds,
        runnerName: runnerName,
        source: context,
        stake: $rootScope.oneClickStake[$rootScope.selected_Stake_btn],
        profit: 0,
        bfId: bfId,
        matchBfId: mtBfId,
        sportId: sportId,
      };
      oneClickMOData["profit"] = $scope.calcAllProfit(oneClickMOData);
      $scope.confirmBetPop(oneClickMOData);
    } else {
      $scope.placeMarketData = {
        backlay: backLay,
        info: $rootScope.info,
        marketId: marketId,
        matchId: matchId,
        odds: odds,
        runnerName: runnerName,
        source: context,
        stake: $rootScope.settingsData.defaultStake,
        profit: 0,
        bfId: bfId,
        matchBfId: mtBfId,
        sportId: sportId,
      };
      $scope.placeMarketData.profit = $scope.calcAllProfit(
        $scope.placeMarketData
      );
      console.log($scope.placeMarketData);
      $scope.calcExposure($scope.placeMarketData);
    }
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

  $scope.openFancyBetSlip = function (
    event,
    yesNo,
    score,
    rate,
    fancyName,
    fancyId,
    matchId,
    bfId,
    marketId
  ) {
    console.log(yesNo, score, rate, fancyName, fancyId, matchId);
    $scope.cancelBetslip();
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    var element = angular.element(event.currentTarget);
    element.addClass("select");

    if (localStorage.getItem("oneclick") == "true") {
      var oneClickMOData = {
        fancyId: fancyId,
        info: $rootScope.info,
        matchId: matchId,
        mktBfId: bfId,
        rate: rate,
        runnerName: fancyName,
        score: score,
        source: context,
        stake: $rootScope.oneClickStake[$rootScope.selected_Stake_btn],
        profit: 0,
        yesno: yesNo,
        marketId: marketId,
      };
      oneClickMOData["profit"] = $scope.calcAllProfit(oneClickMOData);
      $scope.placeFancyBet(oneClickMOData);
    } else {
      $scope.placeFancyData = {
        fancyId: fancyId,
        info: $rootScope.info,
        matchId: matchId,
        mktBfId: bfId,
        rate: rate,
        runnerName: fancyName,
        score: score,
        source: context,
        stake: $rootScope.settingsData.defaultStake,
        profit: 0,
        yesno: yesNo,
        marketId: marketId,
      };

      $scope.placeFancyData.profit = $scope.calcAllProfit(
        $scope.placeFancyData
      );
      console.log($scope.placeFancyData);

      $scope.calcExposure($scope.placeFancyData);
    }
  };

  $scope.openBookBetSlip = function (
    event,
    backLay,
    odds,
    runnerName,
    runnerId,
    bookId,
    bookName,
    bookType,
    matchId,
    marketId
  ) {
    console.log(backLay, odds, runnerName, runnerId, bookId, bookName, matchId);
    $scope.cancelBetslip();
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    var element = angular.element(event.currentTarget);
    element.addClass("select");

    $scope.placeBookData = {
      backlay: backLay,
      bookId: bookId,
      bookType: bookType,
      eventId: matchId,
      marketId: marketId,
      info: $rootScope.info,
      odds: odds,
      runnerId: runnerId,
      runnerName: runnerName,
      source: context,
      stake: $rootScope.settingsData.defaultStake,
      mktname: bookName,
    };

    $scope.placeBookData.profit = $scope.calcAllProfit($scope.placeBookData);
    console.log($scope.placeBookData);

    $scope.calcExposure($scope.placeBookData);
  };

  $rootScope.cards = [];
  $scope.openTpBetSlip = function (
    event,
    backlay,
    odds,
    runnerName,
    runnerId,
    gameId,
    gameType,
    runnerIndex,
    card
  ) {
    // console.log(event, backlay, odds, runnerName, runnerId, gameId, gameType, runnerIndex, card);
    $scope.cancelBetslip();
    $scope.cancelTPBetslip(gameId);
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    var element = angular.element(event.currentTarget);
    element.addClass("select");

    $scope.placeTPData = {
      backlay: backlay,
      gameType: gameType,
      info: $rootScope.info,
      odds: odds,
      runnerName: runnerName,
      runnerId: runnerId,
      source: context,
      stake: $rootScope.settingsData.defaultStake,
      profit: 0,
      gameId: gameId,
    };

    $scope.placeTPData.profit = $scope.calcAllProfit($scope.placeTPData);
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
    // console.log($scope.placeTPData);

    $scope.calcExposure($scope.placeTPData);
    $("#betBoard_" + gameId + "_" + runnerIndex).css("display", "block");
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

  $scope.confirmPlaceMarketData = null;
  $scope.confirmBetPop = function (placeMarketData) {
    if ($rootScope.token == undefined || $rootScope.token == "") {
      $window.location.href = "login.html";
      return false;
    }

    if ($rootScope.confirmBet == 0) {
      $scope.placeMOBet(placeMarketData);
      return false;
    }
    $scope.confirmPlaceMarketData = placeMarketData;
    console.log($scope.confirmPlaceMarketData);
  };
  $scope.cancelBetPop = function () {
    $scope.confirmPlaceMarketData = null;
  };

  $scope.cancelBetslip = function (remove) {
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    if ($scope.placeMarketData != null) {
      $scope.calcExposure($scope.placeMarketData, "remove");
    }
    if ($scope.placeFancyData != null) {
      $scope.calcExposure($scope.placeFancyData, "remove");
    }
    if ($scope.placeBookData != null) {
      $scope.calcExposure($scope.placeBookData, "remove");
    }
    if ($scope.placeTPData != null) {
      $scope.calcExposure($scope.placeTPData, "remove");
    }
    if (remove == false) {
      $rootScope.cards = [];
    }
    $scope.placeMarketData = null;
    $scope.placeFancyData = null;
    $scope.placeBookData = null;
    $scope.placeTPData = null;
    $scope.selectedBet = null;
  };

  $scope.cancelTPBetslip = function (gameId, remove) {
    if ($scope.placeTPData != null) {
      $scope.calcExposure($scope.placeTPData, "remove");
    }
    $("#betBoard_" + gameId + "_1").css("display", "none");
    $("#betBoard_" + gameId + "_0").css("display", "none");
    if (remove == false) {
      $rootScope.cards = [];
    }
    $scope.placeTPData = null;
  };

  $scope.calcAllProfit = function (placeData) {
    var pnl;
    if (
      (placeData.backlay == "Back" || placeData.backlay == "Lay") &&
      placeData.bookId == undefined
    ) {
      if (placeData.stake != "" && placeData.odds != "") {
        return (pnl = (
          (parseFloat(placeData.odds) - 1) *
          parseFloat(placeData.stake)
        ).toFixed(2));
      } else {
        return (pnl = 0);
      }
    }
    if (
      (placeData.backlay == "Back" || placeData.backlay == "Lay") &&
      placeData.bookId != undefined
    ) {
      if (placeData.bookType == 1) {
        if (placeData.stake != "" && placeData.odds != "") {
          return (pnl = (
            (parseFloat(placeData.odds) * parseFloat(placeData.stake)) /
            100
          ).toFixed(2));
        } else {
          return (pnl = 0);
        }
      } else {
        if (placeData.stake != "" && placeData.odds != "") {
          return (pnl = (
            (parseFloat(placeData.odds) - 1) *
            parseFloat(placeData.stake)
          ).toFixed(2));
        } else {
          return (pnl = 0);
        }
      }
    } else if (placeData.yesno == "Yes" || placeData.yesno == "No") {
      if (
        placeData.stake != "" &&
        placeData.rate != "" &&
        placeData.yesno == "Yes"
      ) {
        return (pnl = (
          (parseFloat(placeData.rate) * parseFloat(placeData.stake)) /
          100
        ).toFixed(2));
        // return pnl=placeData.stake;
      } else if (
        placeData.stake != "" &&
        placeData.rate != "" &&
        placeData.yesno == "No"
      ) {
        return (pnl = (
          (parseFloat(placeData.rate) * parseFloat(placeData.stake)) /
          100
        ).toFixed(2));
      } else {
        return (pnl = 0);
      }
    }
  };

  $scope.oddsDown = function (placeMarketData) {
    if (placeMarketData.odds == "") {
      return false;
    }
    var odds = parseFloat(placeMarketData.odds);
    if (odds <= 1.01) {
      placeMarketData.odds = 1.01;
    } else {
      placeMarketData.odds = $scope.oddsInput(
        odds - $scope.oddsDiffCalculate(odds)
      );
    }

    placeMarketData.profit = $scope.calcAllProfit(placeMarketData);
    $scope.calcExposure(placeMarketData);
  };
  $scope.oddsUp = function (placeMarketData) {
    if (placeMarketData.odds == "") {
      placeMarketData.odds = 1.01;
    }
    var odds = parseFloat(placeMarketData.odds);
    if (odds >= 1000) {
      placeMarketData.odds = 1000;
    } else {
      placeMarketData.odds = $scope.oddsInput(
        odds + $scope.oddsDiffCalculate(odds)
      );
    }

    placeMarketData.profit = $scope.calcAllProfit(placeMarketData);
    $scope.calcExposure(placeMarketData);
  };

  $scope.oddsInput = function (value) {
    return parseFloat(value) > 19.5
      ? parseFloat(value).toFixed(0)
      : parseFloat(value) > 9.5
      ? parseFloat(value).toFixed(1)
      : parseFloat(value).toFixed(2);
  };

  $scope.stakeDown = function (placeData) {
    if (placeData.stake == "") {
      return false;
    }
    var stake = parseInt(placeData.stake);
    if (stake < 1) {
      placeData.stake = "";
    } else {
      placeData.stake = stake - $scope.stakeDiffCal(stake);
    }

    placeData.profit = $scope.calcAllProfit(placeData);
    $scope.calcExposure(placeData);
  };
  $scope.stakeUp = function (placeData) {
    if (placeData.stake == "") {
      placeData.stake = 1;
    }
    var stake = parseInt(placeData.stake);
    if (stake >= 100000000) {
      placeData.stake = 100000000;
    } else {
      placeData.stake = stake + $scope.stakeDiffCal(stake);
    }

    placeData.profit = $scope.calcAllProfit(placeData);
    $scope.calcExposure(placeData);
  };

  $scope.stakeChange = function (buttonStake, placeData) {
    if (placeData.stake == "") {
      placeData.stake = 0;
    }
    var stake = parseInt(placeData.stake);
    if (stake >= 100000000) {
      placeData.stake = 100000000;
    } else {
      placeData.stake = stake + buttonStake;
    }

    placeData.profit = $scope.calcAllProfit(placeData);
    $scope.calcExposure(placeData);
  };

  $scope.oddsTyping = false;
  $scope.stakeTyping = true;

  $scope.typingSign = function (type, placeData) {
    if (type == "odds") {
      // $scope.oddsTyping=!$scope.oddsTyping;
      $scope.oddsTyping = true;
      $scope.stakeTyping = !$scope.oddsTyping;
      placeData.odds = "";
    } else {
      // $scope.stakeTyping=!$scope.stakeTyping;
      $scope.oddsTyping = false;
      $scope.stakeTyping = !$scope.oddsTyping;
      placeData.stake = "";
    }
    placeData.profit = $scope.calcAllProfit(placeData);
    $scope.calcExposure(placeData);
  };

  $scope.buttonInput = function (input, placeData) {
    if ($scope.stakeTyping) {
      if (input == ".") {
        return false;
      }
      if (parseInt(placeData.stake) >= 100000000) {
        placeData.stake = 100000000;
      } else {
        placeData.stake = placeData.stake + input;
      }
    } else if ($scope.oddsTyping) {
      // placeData.odds=placeData.odds+input;
      var odds = parseFloat(placeData.odds);
      if (odds >= 1000) {
        placeData.odds = 1000;
      } else {
        if (placeData.odds.indexOf(".") != -1 && input == ".") {
          return false;
        } else if (placeData.odds.indexOf(".") != -1) {
          var number = placeData.odds.split(".");
          if (number[1].length > 1) {
            return false;
          }
        }
        placeData.odds = placeData.odds + input;
      }
    }

    placeData.profit = $scope.calcAllProfit(placeData);
    $scope.calcExposure(placeData);
  };

  $scope.buttonDelete = function (placeData) {
    if ($scope.stakeTyping) {
      if (placeData.stake != "") {
        placeData.stake = placeData.stake.toString().slice(0, -1);
      }
    } else if ($scope.oddsTyping) {
      placeData.odds = placeData.odds.toString().slice(0, -1);
    }

    placeData.profit = $scope.calcAllProfit(placeData);
    $scope.calcExposure(placeData);
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

  $scope.stakeDiffCal = function (currentStake) {
    var diff;
    if (currentStake < 25) {
      diff = 1;
    } else if (currentStake < 100) {
      diff = 10;
    } else if (currentStake < 200) {
      diff = 20;
    } else if (currentStake < 500) {
      diff = 50;
    } else if (currentStake < 1000) {
      diff = 100;
    } else if (currentStake < 2000) {
      diff = 250;
    } else if (currentStake < 5000) {
      diff = 500;
    } else if (currentStake < 10000) {
      diff = 1000;
    } else {
      diff = 1500;
    }
    return diff;
  };

  $scope.calcExposure = function (placeData, remove) {
    if (
      (placeData.backlay == "Back" || placeData.backlay == "Lay") &&
      placeData.bookId == undefined
    ) {
      $scope.mktExpoBook = JSON.parse(
        localStorage.getItem("MktExpo_" + placeData.marketId)
      );
      if ($scope.mktExpoBook == null) {
        return false;
      }

      if (remove == "remove") {
        angular.forEach($scope.mktExpoBook, function (item, index) {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );

          // if (item.Value > 0) {
          $("#withBetMktExp_" + placeData.marketId + "_" + runnerName)
            .text("")
            .removeClass("to-win");
          // } else {
          $("#withBetMktExp_" + placeData.marketId + "_" + runnerName)
            .text("")
            .removeClass("to-lose");
          // }
        });
      } else {
        angular.forEach($scope.mktExpoBook, function (item, index) {
          $scope.newValue = 0;

          if (placeData.backlay == "Back") {
            if (item.Key == placeData.runnerName) {
              $scope.newValue =
                parseFloat(item.Value) + parseFloat(placeData.profit);
              item.Value = $scope.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                var betStake = 0;
              } else {
                betStake = placeData.stake;
              }
              $scope.newValue = parseFloat(item.Value) - parseFloat(betStake);
              item.Value = $scope.newValue.toFixed(2);
            }
          } else {
            if (item.Key == placeData.runnerName) {
              $scope.newValue =
                parseFloat(item.Value) - parseFloat(placeData.profit);
              item.Value = $scope.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                var betStake = 0;
              } else {
                betStake = placeData.stake;
              }
              $scope.newValue = parseFloat(item.Value) + parseFloat(betStake);
              item.Value = $scope.newValue.toFixed(2);
            }
          }
        });

        angular.forEach($scope.mktExpoBook, function (item, index) {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );
          $(
            "#withBetMktExp_" + placeData.marketId + "_" + runnerName
          ).removeClass("to-win");
          $(
            "#withBetMktExp_" + placeData.marketId + "_" + runnerName
          ).removeClass("to-lose");

          if (item.Value > 0) {
            $("#withBetMktExp_" + placeData.marketId + "_" + runnerName)
              .text(item.Value)
              .addClass("to-win");
          } else {
            $("#withBetMktExp_" + placeData.marketId + "_" + runnerName)
              .text("(" + item.Value + ")")
              .addClass("to-lose");
          }
        });
      }
    }
    if (
      (placeData.backlay == "Back" || placeData.backlay == "Lay") &&
      placeData.bookId != undefined
    ) {
      $scope.BMExpoBook = JSON.parse(
        localStorage.getItem("BMExpo_" + placeData.bookId)
      );
      if ($scope.BMExpoBook == null) {
        return false;
      }

      if (remove == "remove") {
        angular.forEach($scope.BMExpoBook, function (item, index) {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );

          // if (item.Value > 0) {
          $("#withBetBMExp_" + placeData.bookId + "_" + runnerName)
            .text("")
            .removeClass("to-win");
          // } else {
          $("#withBetBMExp_" + placeData.bookId + "_" + runnerName)
            .text("")
            .removeClass("to-lose");
          // }
        });
      } else {
        angular.forEach($scope.BMExpoBook, function (item, index) {
          $scope.newValue = 0;

          if (placeData.backlay == "Back") {
            if (item.Key == placeData.runnerName) {
              $scope.newValue =
                parseFloat(item.Value) + parseFloat(placeData.profit);
              item.Value = $scope.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                var betStake = 0;
              } else {
                betStake = placeData.stake;
              }
              $scope.newValue = parseFloat(item.Value) - parseFloat(betStake);
              item.Value = $scope.newValue.toFixed(2);
            }
          } else {
            if (item.Key == placeData.runnerName) {
              $scope.newValue =
                parseFloat(item.Value) - parseFloat(placeData.profit);
              item.Value = $scope.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                var betStake = 0;
              } else {
                betStake = placeData.stake;
              }
              $scope.newValue = parseFloat(item.Value) + parseFloat(betStake);
              item.Value = $scope.newValue.toFixed(2);
            }
          }
        });

        angular.forEach($scope.BMExpoBook, function (item, index) {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(
            /[_\s]/g,
            "_"
          );
          if (item.Value > 0) {
            $("#withBetBMExp_" + placeData.bookId + "_" + runnerName)
              .text(item.Value)
              .addClass("to-win");
          } else {
            $("#withBetBMExp_" + placeData.bookId + "_" + runnerName)
              .text("(" + item.Value + ")")
              .addClass("to-lose");
          }
        });
      }
    } else if (placeData.yesno == "Yes" || placeData.yesno == "No") {
      // $scope.fancyExpoBook = JSON.parse(localStorage.getItem('FancyExpo_' + placeData.fancyId));
      // // console.log($scope.fancyExpoBook)
      //    if ($scope.fancyExpoBook == null) {
      //        return false;
      //    }
      //    if (remove=='remove') {
      //      // if ($scope.fancyExpoBook > 0) {
      //        $('#afterFancyExpo_'+ placeData.fancyId).removeClass('to-win');
      //         $('#afterFancyExpo_'+ placeData.fancyId+' span').text("").removeClass('green');
      //     // } else if($scope.fancyExpoBook<0) {
      //        $('#afterFancyExpo_'+ placeData.fancyId).removeClass('to-lose');
      //         $('#afterFancyExpo_'+ placeData.fancyId+' span').text("").removeClass('red');
      //     // }
      //    }
      //    else{
      //      var fancyExpoCalcYes=0;
      //      var fancyExpoCalcNo=0;
      //      if (placeData.yesno=="Yes") {
      //        angular.forEach($scope.matchedData.sessionBets.yes,function(item){
      //          if (item.marketName==placeData.runnerName) {
      //            // fancyExpoCalcYes=(fancyExpoCalcYes+(parseFloat(item.stake)));
      //            fancyExpoCalcYes=(fancyExpoCalcYes+((parseFloat(item.odds)*parseFloat(item.stake))/100));
      //          }
      //        })
      //        console.log(fancyExpoCalcYes)
      //        angular.forEach($scope.matchedData.sessionBets.no,function(item){
      //          if (item.marketName==placeData.runnerName) {
      //            fancyExpoCalcNo=(fancyExpoCalcNo+((parseFloat(item.odds)*parseFloat(item.stake))/100));
      //          }
      //        })
      //        console.log(fancyExpoCalcNo)
      //        // $scope.fancyExpoBook=((parseFloat(fancyExpoCalcYes)-parseFloat(fancyExpoCalcNo))).toFixed(2);
      //        // console.log($scope.fancyExpoBook)
      //      // $scope.fancyExpoBook=parseFloat($scope.fancyExpoBook)+(parseFloat(placeData.stake)*(1));
      //      }
      //      else{
      //        angular.forEach($scope.matchedData.sessionBets.yes,function(item){
      //          if (item.marketName==placeData.runnerName) {
      //            // fancyExpoCalcYes=(fancyExpoCalcYes+(parseFloat(item.stake)));
      //            fancyExpoCalcYes=(fancyExpoCalcYes+((parseFloat(item.odds)*parseFloat(item.stake))/100));
      //          }
      //        })
      //        console.log(fancyExpoCalcYes)
      //        angular.forEach($scope.matchedData.sessionBets.no,function(item){
      //          if (item.marketName==placeData.runnerName) {
      //            fancyExpoCalcNo=(fancyExpoCalcNo+((parseFloat(item.odds)*parseFloat(item.stake))/100));
      //          }
      //        })
      //        console.log(fancyExpoCalcNo)
      //        // console.log($scope.fancyExpoBook)
      //        // $scope.fancyExpoBook=((parseFloat(fancyExpoCalcYes)-parseFloat(fancyExpoCalcNo))).toFixed(2);
      //        // $scope.fancyExpoBook=parseFloat($scope.fancyExpoBook)+(parseFloat(placeData.profit)*(1));
      //      }
      //      $scope.fancyExpoBook=((parseFloat(fancyExpoCalcYes)-parseFloat(fancyExpoCalcNo))).toFixed(2);
      //      console.log($scope.fancyExpoBook)
      //      if ($scope.fancyExpoBook > 0) {
      //        $('#afterFancyExpo_'+ placeData.fancyId).addClass('to-win');
      //         $('#afterFancyExpo_'+ placeData.fancyId+' span').text($scope.fancyExpoBook).addClass('green');
      //     } else if($scope.fancyExpoBook<0) {
      //        $('#afterFancyExpo_'+ placeData.fancyId).addClass('to-lose');
      //         $('#afterFancyExpo_'+ placeData.fancyId+' span').text('('+$scope.fancyExpoBook+')').addClass('red');
      //     }
      //    }
    }
  };

  $scope.GetUserData = function () {
    NavigationServices.getUserData().then(
      function success(clientData) {
        $rootScope.clientData = clientData.data;
        $rootScope.curTime = clientData.data.curTime;
        $rootScope.newsTicker = clientData.data.news;
        $rootScope.SportsDatas = $scope.clientDataFormat(
          clientData.data.sportsData
        );
        // console.log($rootScope.SportsDatas)
        // $rootScope._fancyBook=clientData._fancyBook;
        $scope.getSportsList();
        $scope.getAllBets(0);
        // if ($location.path().split('/').indexOf('multiMarket')>-1) {
        //  $rootScope.$emit('multiMktEvent',{});
        // }
        if (
          $location.path().split("/").indexOf("fullmarket") > -1 ||
          $location.path().split("/").indexOf("tp_market") > -1
        ) {
          $rootScope.$emit("allMktEvent", {});
        }
        if ($location.path().split("/").indexOf("inplay") > -1) {
          $rootScope.$emit("inplayEvent", {});
        }
        if ($location.path().split("/").indexOf("sports") > -1) {
          $rootScope.$emit("sportsEvent", {});
        }
        $("#loading").css("display", "none");
      },
      function error(err) {
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $rootScope.clientCount = 0;

  $scope.clientHubAddress = null;
  $scope.connectClientSignalr = function (address, token) {
    $("#loading").css("display", "flex");
    $scope.clientHubAddress = address;
    //Getting the connection object
    $scope.subscribeToken = token;

    $scope.clientConnection = $.hubConnection($scope.clientHubAddress);
    // $scope.fancyConnection = $.hubConnection(FancyHubAddress);
    //Creating Proxy
    $scope.clientProxy = $scope.clientConnection.createHubProxy("DataHub");
    //Starting connection
    $scope.clientConnection
      .start()
      .done(function (myFancyHubConnection) {
        var hubConState = myFancyHubConnection.state;
        console.log("Client Connection Established= " + hubConState);
      })
      .fail(function (myFancyHubConnection) {
        var hubConState = myFancyHubConnection.state;
        console.log("Could not connect Client = " + hubConState);
      });
    $scope.clientConnection.stateChanged(function (change) {
      //console.log(change.newState)
      if (change.newState != 1 && $scope.clientHubAddress != null) {
        $scope.clientConnection.start().done(function (myHomeHubConnection) {
          var hubConState = myHomeHubConnection.state;
          console.log("Client ReConnection Established = " + hubConState);
        });
      }
      if (change.newState == 1 && $scope.clientHubAddress != null) {
        $scope.subscribeHome();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.clientProxy.on("BroadcastSubscribedData", function (clientData) {
      console.log(clientData);

      $scope.$apply(function () {
        $rootScope.clientData = $scope._userTpBetsWise(clientData);
        $rootScope.curTime = clientData.curTime;
        $rootScope.newsTicker = clientData.news;
        $rootScope.SportsDatas = $scope.clientDataFormat(clientData.sportsData);
        // console.log($rootScope.SportsDatas)
        $rootScope._fancyBook = clientData._fancyBook;

        if ($rootScope.clientCount == 0) {
          $scope.getSportsList();
          $scope.getAllBets(0);
          if ($location.path().split("/").indexOf("multiMarket") > -1) {
            $rootScope.$emit("multiMktEvent", {});
          }
          if (
            $location.path().split("/").indexOf("fullmarket") > -1 ||
            $location.path().split("/").indexOf("tp_market") > -1
          ) {
            $rootScope.$emit("allMktEvent", {});
          }
          if ($location.path().split("/").indexOf("inplay") > -1) {
            $rootScope.$emit("inplayEvent", {});
          }
          if ($location.path().split("/").indexOf("sports") > -1) {
            $rootScope.$emit("sportsEvent", {});
          }
          $("#loading").css("display", "none");

          $rootScope.clientCount++;
        }
      });
    });
  };
  // $scope.connectClientSignalr();
  $scope.subscribeHome = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.clientProxy.invoke("SubscribeData", $scope.subscribeToken);
    // $('#loading').css('display','flex');
  };
  $scope.unSubscribeHome = function () {
    //Invoking UnsubscribeMarket method defined in hub
    $scope.clientHubAddress = null;
    $scope.clientProxy.invoke("UnSubscribeData", $scope.subscribeToken);
    $scope.clientConnection.stop();
  };

  $scope._userTpBetsWise = function (clientData) {
    angular.forEach(clientData._userTpBets, function (item, index) {
      angular.forEach(item, function (item1, index1) {
        if (item1.gameType == 1) {
          item1.matchName = "20-20 teenpatti";
          item1.matchId = 13229;
          item1.isFancy = 0;
        }
        item1.backLay = item1.backLay.toUpperCase();
      });
      if (!clientData._userTpBets[item[0].matchId]) {
        clientData._userTpBets[item[0].matchId] = clientData._userTpBets[index];
      } else {
        clientData._userTpBets[item[0].matchId] = clientData._userTpBets[
          item[0].matchId
        ].concat(clientData._userTpBets[index]);
      }
      delete clientData._userTpBets[index];
    });

    return clientData;
  };

  $scope.clientDataFormat = function (sportsData) {
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
          matchesDataFormat[item3.id] = item3;
        });
        tourDataFormat[item2.bfId] = {
          bfId: item2.bfId,
          id: item2.id,
          name: item2.name,
          matches: matchesDataFormat,
        };
      });
      sportDataFormat[item.bfId] = {
        bfId: item.bfId,
        id: item.id,
        name: item.name,
        tournaments: tourDataFormat,
      };
    });
    return sportDataFormat;
  };

  $rootScope.searchWiseMatch = function (sportsData) {
    var matchesData = [];
    if (sportsData == undefined) {
      return matchesData;
    }
    angular.forEach(sportsData, function (item, index) {
      angular.forEach(item.tournaments, function (item2, index2) {
        // console.log(item2)
        angular.forEach(item2.matches, function (item3, index3) {
          angular.forEach(item3.markets, function (item4, index4) {
            if (item4.name == "Match Odds") {
              item4.runnerData["bfId"] = item4.bfId;
              item4.runnerData["inPlay"] = item3.inPlay;
              item4.runnerData["dataMode"] = item3.dataMode;
              item4.runnerData["isBettingAllow"] = item4.isBettingAllow;
              item4.runnerData["isMulti"] = item4.isMulti;
              item4.runnerData["marketId"] = item4.id;
              item4.runnerData["matchDate"] = item3.startDate;
              item4.runnerData["matchId"] = item3.id;
              item4.runnerData["matchName"] = item3.name;
              item4.runnerData["sportName"] = item.name;
              item4.runnerData["sportId"] = item.bfId;
              item4.runnerData["status"] = item3.status;
              item4.runnerData["tourId"] = item2.bfId;
              item4.runnerData["mtBfId"] = item3.bfId;
              item4.runnerData["sportID"] = item.bfId;
              item4.runnerData["sptId"] = item.bfId;
              matchesData.push(item4.runnerData);
            }
          });
        });
      });
    });
    // console.log(matchesData)

    return matchesData;
  };

  $rootScope.highlightsWise = function (sportsList) {
    var highlightData = [];
    if (sportsList == undefined) {
      return highlightData;
    }
    angular.forEach(sportsList.tournaments, function (item, index) {
      angular.forEach(item.matches, function (item2, index2) {
        angular.forEach(item2.markets, function (item3, index3) {
          if (item3.name == "Match Odds") {
            item3.runnerData["bfId"] = item3.bfId;
            item3.runnerData["hasFancy"] = item2.hasFancy;
            item3.runnerData["inPlay"] = item2.inPlay;
            item3.runnerData["isBettingAllow"] = item3.isBettingAllow;
            item3.runnerData["isMulti"] = item3.isMulti;
            item3.runnerData["marketId"] = item3.id;
            item3.runnerData["matchDate"] = item2.startDate;
            item3.runnerData["matchId"] = item2.id;
            item3.runnerData["matchName"] = item2.name;
            item3.runnerData["sportName"] = item.name;
            item3.runnerData["sportId"] = item.bfId;
            item3.runnerData["status"] = item2.status;
            item3.runnerData["tourId"] = item.bfId;
            item3.runnerData["mtBfId"] = item2.bfId;
            item3.runnerData["sportID"] = item.bfId;
            item3.runnerData["sport"] = item.name;

            highlightData.push(item3.runnerData);
          }
        });
      });
    });
    return highlightData;
  };

  $rootScope.inplayWiseMatch = function (sportsList, state) {
    var sportWiseData = [];

    angular.forEach(sportsList, function (item, index) {
      if ($rootScope.isTennpatti != 1 && item.bfId == "2000") {
        return;
      }
      var inplayData = [];
      var matchesData = {
        inplayData: [],
        name: item.name,
      };
      angular.forEach(item.tournaments, function (item2, index2) {
        angular.forEach(item2.matches, function (item3, index3) {
          angular.forEach(item3.markets, function (item4, index4) {
            if (item4.name == "Match Odds") {
              item4.runnerData["bfId"] = item4.bfId;
              item4.runnerData["hasFancy"] = item3.hasFancy;
              item4.runnerData["inPlay"] = item3.inPlay;
              item4.runnerData["isBettingAllow"] = item4.isBettingAllow;
              item4.runnerData["isMulti"] = item4.isMulti;
              item4.runnerData["marketId"] = item4.id;
              item4.runnerData["matchDate"] = item3.startDate;
              item4.runnerData["matchId"] = item3.id;
              item4.runnerData["matchName"] = item3.name;
              item4.runnerData["sportName"] = item.name;
              item4.runnerData["sportId"] = item.bfId;
              item4.runnerData["status"] = item3.status;
              item4.runnerData["tourId"] = item2.bfId;
              item4.runnerData["mtBfId"] = item3.bfId;
              item4.runnerData["sportID"] = item.bfId;
              item4.runnerData["sport"] = item.name;

              if (item3.inPlay == 1 && state == 0) {
                inplayData.push(item4.runnerData);
              } else {
                if (
                  item3.inPlay != 1 &&
                  $rootScope.getDateTime(
                    item3.startDate,
                    $rootScope.curTime,
                    1
                  ) == 0 &&
                  state == 1
                ) {
                  inplayData.push(item4.runnerData);
                } else if (
                  item3.inPlay != 1 &&
                  $rootScope.getDateTime(
                    item3.startDate,
                    $rootScope.curTime,
                    1
                  ) == 1 &&
                  state == 2
                ) {
                  inplayData.push(item4.runnerData);
                }
              }
            }
          });
        });
      });
      if (inplayData.length != 0) {
        matchesData.inplayData = inplayData;
        sportWiseData.push(matchesData);
      }
    });
    return sportWiseData;
  };

  $rootScope.sportWise = function (sportsList) {
    var sportData = [];
    angular.forEach(sportsList, function (item, index) {
      var data = {};
      data["id"] = item.bfId;
      data["name"] = item.name;
      data["ids"] = item.id;
      sportData.push(data);
      // if ($rootScope.isTennpatti == 1 && item.bfId == "2000") {
      //     sportData.push(data);
      // } else if (item.bfId != "2000") {
      //     sportData.push(data);
      // }
    });

    sportData.sort(function (a, b) {
      return a.ids - b.ids;
    });
    if (sportData.length >= 3) {
      [sportData[0], sportData[1], sportData[2], sportData[3]] = [
        sportData[2],
        sportData[0],
        sportData[1],
        sportData[3],
      ];
    }
    console.log(sportData);
    return sportData;
  };

  $rootScope.tournamentWise = function (sportsTourList) {
    var tourData = [];
    if (sportsTourList == undefined) {
      return tourData;
    }
    angular.forEach(sportsTourList.tournaments, function (item, index) {
      var data = {};
      data["id"] = item.bfId;
      data["name"] = item.name;
      tourData.push(data);
    });
    return tourData;
  };

  $rootScope.matchtWise = function (tourMatchList) {
    var matchData = [];
    if (tourMatchList == undefined) {
      return matchData;
    }
    angular.forEach(tourMatchList.matches, function (item, index) {
      var data = {};
      data["bfId"] = item.bfId;
      data["id"] = item.id;
      data["startDate"] = item.startDate;
      data["name"] = item.name;
      matchData.push(data);
    });
    return matchData;
  };

  $rootScope.marketWise = function (matchMarketList) {
    var marketData = [];
    if (matchMarketList == undefined) {
      return marketData;
    }
    angular.forEach(matchMarketList.markets, function (item, index) {
      var data = {};
      data["bfId"] = item.bfId;
      data["id"] = item.id;
      data["name"] = item.name;
      marketData.push(data);
    });
    return marketData;
  };

  $rootScope.allMarketWise = function (matchAllMarketList) {
    var allMarketData = [];
    if (matchAllMarketList == undefined) {
      return allMarketData;
    }
    angular.forEach(matchAllMarketList.markets, function (item, index) {
      var data = {};
      data["bfId"] = item.bfId;
      data["marketId"] = item.id;
      data["marketName"] = item.name;
      allMarketData.push(data);
    });
    return allMarketData;
  };

  $rootScope.mktWise = function (matchMarket, bfId) {
    var mktData = {};
    if (matchMarket == undefined) {
      return mktData;
    }
    angular.forEach(matchMarket.markets, function (item, index) {
      if (item.bfId == bfId) {
        mktData["bfId"] = item.bfId;
        mktData["dataMode"] = matchMarket.dataMode;
        mktData["isInplay"] = matchMarket.inPlay == 0 ? "false" : "true";
        mktData["isMulti"] = item.isMulti;
        mktData["matchBfId"] = matchMarket.bfId;
        mktData["matchDate"] = matchMarket.startDate;
        mktData["matchId"] = matchMarket.id;
        mktData["matchName"] = matchMarket.name;
        mktData["matchStatus"] = matchMarket.status;
        mktData["mktId"] = item.id;
        mktData["mktName"] = item.name;
        item.runnerData1 = $rootScope.runnerWise(item.runnerData1);
        mktData["runnerData"] = item.runnerData1;
      }
    });
    return mktData;
  };

  $rootScope.runnerWise = function (runnerData1) {
    var runnerarray = [];
    angular.forEach(runnerData1, function (item, key) {
      if (item.Key != undefined) {
        runnerarray.push(item.Value);
      } else {
        runnerarray.push(item);
      }
    });
    return runnerarray;
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
      angular.forEach($scope.clientData._userTpBets, function (item, index) {
        angular.forEach(item, function (item1, index1) {
          matchData.push(item1);
        });
      });
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
        angular.forEach($scope.clientData._userTpBets[mtid], function (
          item1,
          index1
        ) {
          matchData.push(item1);
        });
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

  $rootScope.multiMarketsWise = function (sportsData) {
    var multiMarketData = {
      marketData: [],
      fancyData: [],
    };
    var fancyData = [];
    var marketData = [];

    angular.forEach(sportsData, function (item, index) {
      angular.forEach(item.tournaments, function (item2, index2) {
        // console.log(item2)
        angular.forEach(item2.matches, function (item3, index3) {
          // console.log($scope.isMultiAdded(item3.bfId))

          angular.forEach(item3.markets, function (item4, index4) {
            item4["mktId"] = item4.id;
            var mktData = {};
            var fData = {};

            if (
              $scope.isMultiAdded(item3.bfId) == false &&
              item4.name == "Match Odds"
            ) {
              fData["bfId"] = item4.bfId;
              fData["dataMode"] = item3.dataMode;
              fData["isInplay"] = item3.inPlay == 0 ? "false" : "true";
              fData["isMulti"] = item4.isMulti;
              fData["matchBfId"] = item3.bfId;
              fData["matchDate"] = item3.startDate;
              fData["matchId"] = item3.id;
              fData["matchName"] = item3.name;
              fData["tourId"] = item2.bfId;
              fData["matchStatus"] = item3.status;
              fData["mktId"] = item4.id;
              fData["mktName"] = item4.name;
              fData["sportName"] = item.name;
              fData["sportId"] = item.bfId;
              fData["hasFancy"] = item3.hasFancy;
              fData["fancyData"] = item3.fancyData;
              fancyData.push(fData);
            }

            if ($scope.isMultiAdded(item4) == false) {
              mktData["bfId"] = item4.bfId;
              mktData["dataMode"] = item3.dataMode;
              mktData["isInplay"] = item3.inPlay == 0 ? "false" : "true";
              mktData["isMulti"] = item4.isMulti;
              mktData["matchBfId"] = item3.bfId;
              mktData["matchDate"] = item3.startDate;
              mktData["matchId"] = item3.id;
              mktData["matchName"] = item3.name;
              mktData["tourId"] = item2.bfId;
              mktData["matchStatus"] = item3.status;
              mktData["mktId"] = item4.id;
              mktData["mktName"] = item4.name;
              mktData["sportName"] = item.name;
              mktData["sportId"] = item.bfId;
              item4.runnerData1 = $rootScope.runnerWise(item4.runnerData1);
              mktData["runnerData"] = item4.runnerData1;
              marketData.push(mktData);
            }
          });
        });
      });
    });
    multiMarketData.fancyData = fancyData;
    multiMarketData.marketData = marketData;

    return multiMarketData;
  };

  $scope.openMarketDepth = function (getMarketData) {
    console.log(getMarketData);

    $scope.getMarketDataDepth = getMarketData;
    $scope.MktDepthCount = 0;
    angular.forEach($scope.getMarketDataDepth.runnerData, function (
      item,
      index
    ) {
      if ($scope.MktDepthCount == 0) {
        // $scope.selectedRunner=item;
        $scope.queryMarketDepth(item);
        $scope.MktDepthCount++;
      }
    });
  };

  $scope.showHideMenuList = false;
  $scope.showMenuList = function () {
    $scope.showHideMenuList = !$scope.showHideMenuList;
  };

  $scope.selectedChart = 1;
  $scope.queryMarketDepth = function (item) {
    // console.log(item)
    $scope.selectedRunner = item;
    $scope.showHideMenuList = false;
    $scope.inverseAxis($scope.selectedChart);

    $scope.marketDepthUrl = "http://dak19.com/api/queryMarketDepth.php";

    $http({
      url: $scope.marketDepthUrl,
      dataType: "json",
      method: "POST",
      data: {
        marketId: $scope.getMarketDataDepth.bfId,
        selectionId: $scope.selectedRunner.selectionId,
      },
      // data: ({marketId: "1.155172463",selectionId:"448"}),
    }).then(function success(data) {
      // console.log(data.data)
      $scope.marketDepthData = data.data;
      // console.log($scope.marketDepthData)

      angular.forEach($scope.marketDepthData.ex.availableToBack, function (
        item
      ) {
        item.backLay = "back";
      });
      angular.forEach($scope.marketDepthData.ex.availableToLay, function (
        item
      ) {
        item.backLay = "lay";
      });
      $scope.backlayReport = $scope.marketDepthData.ex.availableToBack
        .concat($scope.marketDepthData.ex.availableToLay)
        .concat($scope.marketDepthData.ex.tradedVolume);

      $scope.backlayReport.sort(function (a, b) {
        return a.price - b.price;
      });
      // console.log($scope.backlayReport)

      $("#marketDepth").css("display", "flex");

      $timeout(function () {
        $(document).ready(function () {
          var outerContent = $("#reportArticle");
          var innerContent = $("#reportArticle .trade");

          outerContent.scrollLeft(
            (innerContent.width() - outerContent.width()) / 2
          );
        });
      }, 200);
    });
  };

  $scope.inverseAxis = function (axis) {
    $scope.selectedChart = axis;

    var bfId = $scope.getMarketDataDepth.bfId.split(".")[1];
    if (axis == 1) {
      $scope.chartImg =
        "https://sportsiteexweb.betfair.com/betting/LoadRunnerInfoChartAction.do?marketId=" +
        bfId +
        "&selectionId=" +
        $scope.selectedRunner.selectionId;
    } else {
      $scope.chartImg =
        "https://sportsiteexweb.betfair.com/betting/LoadRunnerInfoChartAction.do?marketId=" +
        bfId +
        "&selectionId=" +
        $scope.selectedRunner.selectionId +
        "&logarithmic=true";
    }
  };

  // if ($rootScope.token == undefined || $rootScope.token == "") {
  //     $scope.connectClientSignalr("http://167.86.74.159:5133", "1937-789-123");
  //     $("#loading").css("display", "flex");

  //     // $rootScope.clearCookies();
  // } else {
  $scope.getUserDescription();
  $scope.getAllBets();
  $scope.getSettings();
  $scope.refreshFunds();
  $scope.getOneClickStake();
  // }

  $scope.registerCasino = function () {
    $scope.registerData = {
      request: {
        type: "registration",
        username: $scope.userData.uName,
        currencyid: "INR",
        firstname: $scope.userData.uName,
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
});

app.controller("inplayController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout,
  $window,
  NavigationServices,
  $interval
) {
  $rootScope.selectedTab = "inplay";

  $("#loading").css("display", "flex");
  $scope.inplayListCalls = true;
  $scope.getInplayList = function () {
    if ($scope.inplayListCalls == false) {
      return false;
    }
    $scope.inplayListCalls = false;
    // $('#loading').css('display','flex');
    if ($rootScope.fType == 1) {
      NavigationServices.inplay().then(
        function success(data) {
          $scope.inplayListCalls = true;
          $rootScope.curTime = data.data.curTime;
          $scope.inplayUpComData = data.data.data;

          angular.forEach($scope.inplayUpComData, function (item, index) {
            angular.forEach(item.inplayData, function (item, index) {
              item.inPlay = 1;
            });
          });
          $("#loading").css("display", "none");
        },
        function error(err) {
          $scope.inplayListCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      // $('#loading').css('display','none');
      $scope.inplayListCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.inplayUpComData = $rootScope
          .inplayWiseMatch($rootScope.SportsDatas, 0)
          .reverse();
        $("#loading").css("display", "none");
      }
    }
  };
  $scope.getInplayList();

  var inplayEvent = $rootScope.$on("inplayEvent", function (event, data) {
    $scope.getInplayList();
    $rootScope.clientCount++;
  });
  $scope.$on("$destroy", inplayEvent);

  $scope.upComingEventsCalls = true;
  $scope.getupComingEvents = function (type) {
    if ($scope.upComingEventsCalls == false) {
      return false;
    }
    $scope.upComingEventsCalls = false;
    $("#loading").css("display", "flex");
    if ($rootScope.fType == 1) {
      NavigationServices.upComingEvents(type).then(
        function success(data) {
          $scope.upComingEventsCalls = true;
          // $rootScope.curTime=data.data.curTime;
          $scope.inplayUpComData = $scope
            .inplayDataWise(data.data.data)
            .reverse();
          console.log($scope.inplayDataWise(data.data.data));
          $("#loading").css("display", "none");
        },
        function error(err) {
          $scope.upComingEventsCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $("#loading").css("display", "none");
      $scope.upComingEventsCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.inplayUpComData = $rootScope
          .inplayWiseMatch($rootScope.SportsDatas, type)
          .reverse();
        console.log($scope.inplayUpComData);
      }
    }
  };

  $scope.inplayDataWise = function (upData) {
    var inplayDatas = [];

    var inplaySportArray = [];
    angular.forEach(upData, function (item, index) {
      if (inplayDatas.length == 0) {
        var inplayData = [];

        item.matchDate = item.date;
        item.matchId = item.eventId;
        item.matchName = item.eventName;
        item.inPlay = 0;

        var data = {
          id: item.id,
          name: item.sportName,
          inplayData: inplayData,
        };
        data.inplayData.push(item);

        inplayDatas.push(data);
        inplaySportArray.push(item.sportName);
      } else {
        if (inplaySportArray.indexOf(item.sportName) != -1) {
          item.matchDate = item.date;
          item.matchId = item.eventId;
          item.matchName = item.eventName;
          item.inPlay = 0;
          angular.forEach(inplayDatas, function (item2, index2) {
            if (item2.name == item.sportName) {
              item2.inplayData.push(item);
            }
          });
        } else {
          var inplayData = [];

          item.matchDate = item.date;
          item.matchId = item.eventId;
          item.matchName = item.eventName;
          item.inPlay = 0;

          var data = {
            id: item.id,
            name: item.sportName,
            inplayData: inplayData,
          };
          data.inplayData.push(item);
          inplayDatas.push(data);
          inplaySportArray.push(item.sportName);
        }
      }
      // console.log(inplayDatas)
    });
    return inplayDatas;
  };

  $scope.inplayTab = "inplay";
  $scope.changeTab = function (tab) {
    $scope.inplayTab = tab;
    if ($scope.inplayTab == "inplay") {
      $scope.getInplayList();
    } else if ($scope.inplayTab == "today") {
      $scope.getupComingEvents(1);
    } else if ($scope.inplayTab == "tomorrow") {
      $scope.getupComingEvents(2);
    }
  };

  var inplayInterval = $interval(function () {
    if ($rootScope.fType == 2 && $scope.inplayTab == "inplay") {
      $scope.getInplayList();
      // console.log($scope.inplayTab)
      // $scope.getupComingEvents();
    }
  }, 2000);

  $scope.$on("$destroy", function () {
    $interval.cancel(inplayInterval);
  });
});
app.controller("sportsController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout,
  $window,
  NavigationServices
) {
  $rootScope.selectedTab = "sports";

  $scope.sportsListCalls = true;
  $scope.getSportsList = function () {
    if ($scope.sportsListCalls == false) {
      return false;
    }
    $scope.sportsListCalls = false;
    $("#loading").css("display", "flex");

    if ($rootScope.fType == 1) {
      NavigationServices.sportsList().then(
        function success(data) {
          $scope.sportsListCalls = true;

          $scope.sportsData = data.data.data;
          $("#loading").css("display", "none");
        },
        function error(err) {
          $scope.sportsListCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      // $('#loading').css('display','none');
      $scope.sportsListCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.sportsData = [
          { id: "4", name: "Cricket", img: "Cricket" },
          { id: "1", name: "Soccer", img: "Soccer" },
          { id: "2", name: "Tennis", img: "Tennis" },
        ];
        $("#loading").css("display", "none");
      }
    }
  };
  $scope.getSportsList();

  var sportsEvent = $rootScope.$on("sportsEvent", function (event, data) {
    $scope.getSportsList();
    $rootScope.clientCount++;
  });
  $scope.$on("$destroy", sportsEvent);

  $scope.tournamentListCalls = true;
  $scope.getTournamentList = function (sport) {
    if ($scope.tournamentListCalls == false) {
      return false;
    }
    $scope.tournamentListCalls = false;
    $("#loading").css("display", "flex");
    $scope.selectedSports = sport;
    if ($rootScope.fType == 1) {
      NavigationServices.tournamentList($scope.selectedSports.id).then(
        function success(data) {
          $scope.tournamentListCalls = true;
          $scope.tournamentData = data.data.data;
          $("#loading").css("display", "none");
        },
        function error(err) {
          $scope.tournamentListCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $("#loading").css("display", "none");
      $scope.tournamentListCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.tournamentData = $rootScope.tournamentWise(
          $rootScope.SportsDatas[$scope.selectedSports.id]
        );
      }
    }
  };

  $scope.matchListCalls = true;
  $scope.getMatchList = function (tournament) {
    if ($scope.matchListCalls == false) {
      return false;
    }
    $scope.matchListCalls = false;
    $("#loading").css("display", "flex");
    $scope.selectedTournament = tournament;
    if ($rootScope.fType == 1) {
      NavigationServices.matchList(
        $scope.selectedSports.id,
        $scope.selectedTournament.id
      ).then(
        function success(data) {
          $scope.matchListCalls = true;
          $scope.matchData = data.data.data;
          $("#loading").css("display", "none");
        },
        function error(err) {
          $scope.matchListCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $("#loading").css("display", "none");
      $scope.matchListCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.matchData = $rootScope.matchtWise(
          $rootScope.SportsDatas[$scope.selectedSports.id].tournaments[
            $scope.selectedTournament.id
          ]
        );
      }
    }
  };
  $scope.marketListCalls = true;
  $scope.getMarketList = function (match) {
    if ($scope.marketListCalls == false) {
      return false;
    }
    $scope.marketListCalls = false;
    $("#loading").css("display", "flex");
    $scope.selectedMatch = match;
    if ($rootScope.fType == 1) {
      NavigationServices.marketList($scope.selectedMatch.id).then(
        function success(data) {
          $scope.marketListCalls = true;
          $scope.marketData = data.data.data;
          $("#loading").css("display", "none");
        },
        function error(err) {
          $scope.marketListCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $("#loading").css("display", "none");
      $scope.marketListCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.marketData = $rootScope.marketWise(
          $rootScope.SportsDatas[$scope.selectedSports.id].tournaments[
            $scope.selectedTournament.id
          ].matches[$scope.selectedMatch.id]
        );
      }
    }
  };

  $scope.back = function (item) {
    if (item == undefined) {
      if ($scope.selectedMatch != undefined) {
        $scope.selectedMatch = undefined;
        $scope.marketData = [];
      } else {
        if ($scope.selectedTournament != undefined) {
          $scope.selectedTournament = undefined;
          $scope.matchData = [];
        } else {
          if ($scope.selectedSports != undefined) {
            $scope.selectedSports = undefined;
            $scope.tournamentData = [];
          }
        }
      }
    } else {
      if (item == "selectedMatch") {
        $scope.selectedMatch = undefined;
        $scope.marketData = [];
      } else if (item == "selectedTournament") {
        $scope.selectedTournament = undefined;
        $scope.matchData = [];
        $scope.selectedMatch = undefined;
        $scope.marketData = [];
      } else if (item == "selectedSports") {
        $scope.selectedSports = undefined;
        $scope.tournamentData = [];
        $scope.selectedTournament = undefined;
        $scope.matchData = [];
        $scope.selectedMatch = undefined;
        $scope.marketData = [];
      }
    }
  };
});

app.controller("fullmarketController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout,
  $window,
  NavigationServices,
  $routeParams,
  $interval
) {
  $rootScope.selectedTab = "sports";

  $scope.sportId = $routeParams.sportId;
  $scope.mtBfId = $routeParams.mtBfId;
  $scope.matchId = $routeParams.matchId;
  $scope.marketId = $routeParams.marketId;
  $scope.bfId = $routeParams.bfId;
  $scope.tourId = $routeParams.tourId;

  $scope.marketCalls = true;
  $scope.getMarket = function () {
    if ($scope.marketCalls == false) {
      return false;
    }
    $scope.marketCalls = false;
    // $('#loading').css('display','flex');
    if ($rootScope.fType == 1) {
      NavigationServices.marketData($scope.matchId, $scope.marketId).then(
        function success(data) {
          $scope.marketCalls = true;

          $rootScope.curTime = data.data.curTime;
          if (!$scope.hubAddCall) {
            $scope.getMarketData = data.data.data;
          }
          $scope.getMarketData.marketId = $scope.marketId;
          $rootScope.matchName = $scope.getMarketData.matchName;
          $rootScope.liveTvConfig = data.data.liveTvConfig;
          // $('#loading').css('display','none');
          if (!$scope.hubAddCall) {
            $scope.getHubAddress();
          }
          $scope.getFancy();
          $timeout(function () {
            $rootScope.getExposureBook($scope.marketId);
          }, 1000);
        },
        function error(err) {
          $scope.marketCalls = true;
          // $('#loading').css('display','none');
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.marketCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.getMarketDatas =
          $rootScope.SportsDatas[$scope.sportId].tournaments[
            $scope.tourId
          ].matches[$scope.matchId];
        if (!$scope.hubAddCall) {
          $scope.getMarketData = $rootScope.mktWise(
            $scope.getMarketDatas,
            $scope.bfId
          );
        }
        $rootScope.matchName = $scope.getMarketData.matchName;
        $rootScope.liveTvConfig = $scope.getMarketDatas.tvConfig;

        if ($rootScope.token != undefined && $rootScope.token != "") {
          if (!$scope.hubAddCall) {
            $scope.getHubAddress();
            // angular.forEach($scope.getMarketData.runnerData, function(item) {
            //                       item.back1 = null;
            //                       item.back2 = null;
            //                       item.back3 = null;
            //                       item.backSize1 = null;
            //                       item.backSize2 = null;
            //                       item.backSize3 = null;
            //                       item.lay1 = null;
            //                       item.lay2 = null;
            //                       item.lay3 = null;
            //                       item.laySize1 = null;
            //                       item.laySize2 = null;
            //                       item.laySize3 = null;
            //                   })
          }
          if ($scope.sportId == 4) {
            // $scope.diamondFeeds();
            // $scope.MatchScoreSignalr();
          }

          $timeout(function () {
            $rootScope.getExposureBook($scope.marketId, "1");
          }, 300);
        } else {
          $scope.demoMktExpo = [];
          angular.forEach($scope.getMarketData.runnerData, function (
            item,
            index
          ) {
            $scope.demoMktExpo.push({
              Key: item.runnerName,
              Value: "0",
            });
          });
          localStorage.setItem(
            "MktExpo_" + $scope.marketId,
            JSON.stringify($scope.demoMktExpo)
          );
        }
        if (!$scope.hubAddCall) {
          $scope.getFancy();
        }
      }
    }
  };
  // $scope.getMarket();

  $scope.getMatchSettings = function () {
    if (
      $rootScope.SportsDatas != undefined &&
      $scope.getMarketData != undefined
    ) {
      $scope.getMarketDatas =
        $rootScope.SportsDatas[$scope.sportId].tournaments[
          $scope.tourId
        ].matches[$scope.matchId];
      if ($scope.getMarketDatas.dataMode != $scope.getMarketData.dataMode) {
        if ($scope.getMarketDatas.dataMode == 1) {
          $scope.getMarketData.dataMode = $scope.getMarketDatas.dataMode;
          $scope.getHubAddress();
        } else {
          $scope.marketUnsubscribe();
          $scope.getMarketData.dataMode = $scope.getMarketDatas.dataMode;
        }
      }
      if ($scope.getMarketDatas.inPlay == 1) {
        $scope.getMarketData.isInplay = "true";
      } else {
        $scope.getMarketData.isInplay = "false";
      }
      if ($scope.getMarketDatas.settings != null) {
        if (
          $scope.getMarketDatas.settings.volMulti != null &&
          $scope.getMarketDatas.settings.volMulti != 0
        ) {
          $scope.volMulti = $scope.getMarketDatas.settings.volMulti;
        } else {
          $scope.volMulti = 10;
        }
        $scope.getMarketData.matchDate =
          $scope.getMarketDatas.settings.matchDate;
        $scope.getMarketData.maxStake = $scope.getMarketDatas.settings.maxStake;
        $scope.getMarketData.minStake = $scope.getMarketDatas.settings.minStake;
      }

      if (
        $scope.fancyHubAddress == null &&
        $scope.getMarketDatas.hasFancy == 1 &&
        $rootScope.token != undefined &&
        $rootScope.token != ""
      ) {
        $scope.getHubAddress();
      }
    }
  };

  $scope.getFancyData = [];
  $scope.fancyCalls = true;
  $scope.getFancy = function () {
    if ($scope.fancyCalls == false) {
      return false;
    }
    $scope.fancyCalls = false;
    if ($rootScope.fType == 1) {
      NavigationServices.fancyData($scope.matchId).then(
        function success(data) {
          $scope.fancyCalls = true;

          $scope.bookMakingData = data.data.bookmakingData;

          $scope.getFancyData = data.data.data;

          if ($scope.bookMakingData.name != null) {
            $rootScope.getBMExposureBook(
              $scope.marketId,
              $scope.bookMakingData.id
            );
          }

          $timeout(function () {
            angular.forEach(data.data.data, function (item) {
              // console.log(item)
              $rootScope.getFancyExpoBook($scope.matchId, item.id, item.book);
            });
          }, 1000);
        },
        function error(err) {
          $scope.fancyCalls = true;
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.fancyCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.getMarketDatas =
          $rootScope.SportsDatas[$scope.sportId].tournaments[
            $scope.tourId
          ].matches[$scope.matchId];

        $scope.bookMakingData = $scope.getMarketDatas.bookRates;

        $scope.getFancyData = $scope.getMarketDatas.fancyData;

        if ($rootScope.token != undefined && $rootScope.token != "") {
          $timeout(function () {
            angular.forEach($scope.getMarketDatas.fancyData, function (item) {
              $scope.fBook = $rootScope._fancyBook[item.name];
              if ($scope.fBook == undefined) {
                $scope.fBook = 0;
                $rootScope.getFancyExpoBook(
                  $scope.matchId,
                  item.id,
                  $scope.fBook
                );
              } else {
                $rootScope.getFancyExpoBook(
                  $scope.matchId,
                  item.id,
                  $scope.fBook
                );
              }
              // console.log(item)
            });

            if ($scope.bookMakingData != null) {
              if ($scope.bookMakingData.length != 0) {
                angular.forEach($scope.bookMakingData, function (item) {
                  $rootScope.getBMExposureBook($scope.marketId, item.id);
                });
              }
            }
          }, 300);
        } else {
          $timeout(function () {
            if ($scope.bookMakingData.length != 0) {
              angular.forEach($scope.bookMakingData, function (item) {
                $scope.demoBmExpo = [];
                angular.forEach(item.runnerData, function (item, index) {
                  $scope.demoBmExpo.push({
                    Key: item.name,
                    Value: "0",
                  });
                });
                localStorage.setItem(
                  "BMExpo_" + item.id,
                  JSON.stringify($scope.demoBmExpo)
                );
              });
            }
          }, 300);
        }
      }
    }
  };

  $scope.hubAddCall = false;
  $scope.hubAddressCalls = true;
  $scope.getHubAddress = function () {
    if ($scope.hubAddressCalls == false) {
      return false;
    }
    $scope.hubAddressCalls = false;
    $("#loading").css("display", "flex");

    NavigationServices.hubAddress($scope.marketId).then(
      function success(data) {
        $scope.hubAddressCalls = true;
        $scope.hubAddCall = true;
        if (
          data.data.hubAddress &&
          $scope.marketHubAddress == null &&
          $scope.getMarketData.dataMode == 1
        ) {
          $scope.connectMarketSignalr(data.data.hubAddress);
        }
        if (
          data.data.fancyHubAddress != null &&
          $scope.fancyHubAddress == null &&
          $scope.getMarketDatas.hasFancy == 1
        ) {
          $scope.connectFancySignalr(data.data.fancyHubAddress);
        }
        $("#loading").css("display", "none");
      },
      function error(err) {
        $scope.hubAddressCalls = true;
        $("#loading").css("display", "none");
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.volMulti = 1;

  $scope.marketHubAddress = null;
  $scope.connectMarketSignalr = function (hubAddress) {
    $scope.marketHubAddress = hubAddress;

    // Getting the connection object
    $scope.marketConnection = $.hubConnection($scope.marketHubAddress);
    //Creating Proxy
    $scope.marketProxy = $scope.marketConnection.createHubProxy("RunnersHub");
    //Starting connection
    $scope.marketConnection
      .start()
      .done(function (marketConnection) {
        console.log("Market Connected" + marketConnection.state);
      })
      .fail(function (marketConnection) {
        console.log("Market not connected" + marketConnection.message);
      });

    $scope.marketConnection.stateChanged(function (marketState) {
      console.log(marketState);
      if (marketState.newState != 1 && $scope.marketHubAddress != null) {
        //Starting Reconnection
        $scope.marketConnection
          .start()
          .done(function (marketConnection) {
            console.log("Market ReConnected" + marketConnection.state);
          })
          .fail(function (marketConnection) {
            console.log("Market not Reconnected" + marketConnection.message);
          });
      }
      if (marketState.newState == 1 && $scope.marketHubAddress != null) {
        $scope.marketSubscribe();
      }
    });

    $scope.marketProxy.on("BroadcastSubscribedData", function (runner) {
      // console.log(runner)

      $scope.$apply(function () {
        $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("spark");

        runner.backSize1 =
          runner.backSize1 != null
            ? runner.backSize1 * $scope.volMulti
            : runner.backSize1;
        runner.backSize2 =
          runner.backSize2 != null
            ? runner.backSize2 * $scope.volMulti
            : runner.backSize2;
        runner.backSize3 =
          runner.backSize3 != null
            ? runner.backSize3 * $scope.volMulti
            : runner.backSize3;
        runner.laySize1 =
          runner.laySize1 != null
            ? runner.laySize1 * $scope.volMulti
            : runner.laySize1;
        runner.laySize2 =
          runner.laySize2 != null
            ? runner.laySize2 * $scope.volMulti
            : runner.laySize2;
        runner.laySize3 =
          runner.laySize3 != null
            ? runner.laySize3 * $scope.volMulti
            : runner.laySize3;

        if (runner.marketid == $scope.bfId) {
          $scope.totalMatched = runner.totalMatched;
          $scope.getMarketData.matchStatus = runner.Status;
          // console.log($scope.getMarketData.runnerData)
          angular.forEach($scope.getMarketData.runnerData, function (
            item,
            index
          ) {
            if (item.runnerName == runner.runner) {
              // item=runner;
              // item.runnerName=runner.runner;
              $scope.getMarketData.runnerData[index] = runner;
              $scope.getMarketData.runnerData[index].runnerName = runner.runner;
              $scope.getMarketData.runnerData[index].selectionId =
                runner.selectionid;

              if ($rootScope.settingsData.isOddsHighlights == 1) {
                var txt = runner.runner
                  .replace(/[^a-z0-9\s]/gi, "")
                  .replace(/[_\s]/g, "_");

                if (
                  item.back1 != runner.back1 ||
                  item.backSize1 != runner.backSize1
                ) {
                  $(
                    "#selection_" + $scope.marketId + "_" + txt + " .back-1"
                  ).addClass("spark");
                }
                if (
                  item.back2 != runner.back2 ||
                  item.backSize2 != runner.backSize2
                ) {
                  $(
                    "#selection_" + $scope.marketId + "_" + txt + " .back-2"
                  ).addClass("spark");
                }
                if (
                  item.back3 != runner.back3 ||
                  item.backSize3 != runner.backSize3
                ) {
                  $(
                    "#selection_" + $scope.marketId + "_" + txt + " .back-3"
                  ).addClass("spark");
                }

                if (
                  item.lay1 != runner.lay1 ||
                  item.laySize1 != runner.laySize1
                ) {
                  $(
                    "#selection_" + $scope.marketId + "_" + txt + " .lay-1"
                  ).addClass("spark");
                }
                if (
                  item.lay2 != runner.lay2 ||
                  item.laySize2 != runner.laySize2
                ) {
                  $(
                    "#selection_" + $scope.marketId + "_" + txt + " .lay-2"
                  ).addClass("spark");
                }
                if (
                  item.lay3 != runner.lay3 ||
                  item.laySize3 != runner.laySize3
                ) {
                  $(
                    "#selection_" + $scope.marketId + "_" + txt + " .lay-3"
                  ).addClass("spark");
                }
              }
            }
          });
        }
      });
    });
  };

  $scope.marketSubscribe = function () {
    $scope.marketProxy.invoke("SubscribeMarket", $scope.bfId);
  };
  $scope.marketUnsubscribe = function () {
    if ($scope.getMarketData.dataMode == 1) {
      $scope.marketProxy.invoke("UnsubscribeMarket", $scope.bfId);
      $scope.marketHubAddress = null;
      $scope.marketConnection.stop();
    }
  };

  $scope.fancyHubAddress = null;
  $scope.connectFancySignalr = function () {
    $scope.fancyHubAddress = fancyHubAddress;
    $scope.fancyConnection = $.hubConnection($scope.fancyHubAddress);
    $scope.fancyProxy = $scope.fancyConnection.createHubProxy("FancyHub");

    $scope.fancyConnection
      .start()
      .done(function (fancyConnection) {
        console.log("Fancy Connected " + fancyConnection.state);
      })
      .fail(function (fancyConnection) {
        console.log("Fancy not connected " + fancyConnection.message);
      });

    $scope.fancyConnection.stateChanged(function (fancyState) {
      console.log(fancyState);
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
        $scope.fancySubscribe();
      }
    });

    $scope.fancyProxy.on("BroadcastSubscribedData", function (fancy) {
      // console.log(fancy);

      $scope.$apply(function () {
        if ($rootScope.SportsDatas != undefined) {
          $scope.getMarketDatas =
            $rootScope.SportsDatas[$scope.sportId].tournaments[
              $scope.tourId
            ].matches[$scope.matchId];
          if ($scope.getMarketDatas.inPlay == 1) {
            $scope.getMarketData.isInplay = "true";
          } else {
            $scope.getMarketData.isInplay = "false";
          }
          if (
            $scope.getMarketDatas.settings.volMulti != null &&
            $scope.getMarketDatas.settings.volMulti != 0
          ) {
            $scope.volMulti = $scope.getMarketDatas.settings.volMulti;
          } else {
            $scope.volMulti = 10;
          }
          $scope.getMarketData.matchDate =
            $scope.getMarketDatas.settings.matchDate;
        }

        $rootScope.curTime = fancy.curTime;

        $scope.bookMakingData = fancy.bookRates;

        if ($scope.bookMakingData.length != 0) {
          angular.forEach($scope.bookMakingData, function (item) {
            $rootScope.getBMExposureBook($scope.marketId, item.id);
          });
        }

        angular.forEach(fancy.data, function (value, index) {
          $scope.fBook = $rootScope._fancyBook[value.name];
          if ($scope.fBook == undefined) {
            $scope.fBook = 0;
            $rootScope.getFancyExpoBook($scope.matchId, value.id, $scope.fBook);
          } else {
            $rootScope.getFancyExpoBook($scope.matchId, value.id, $scope.fBook);
          }
          if (value.isAuto == 1 && $scope.marketSessionData != undefined) {
            var sessionValue = $scope.marketSessionData[value.name];
            if (sessionValue != undefined) {
              if (
                parseInt(sessionValue.maxLiabilityPerBet) > 0 &&
                parseInt(sessionValue.maxLiabilityPerMarket) > 0 &&
                JSON.parse(sessionValue.isBettable) == true
              ) {
                if (sessionValue.runners[0].lay.length != 0) {
                  value.noScore = sessionValue.runners[0].lay[0].line;
                  value.noRate = sessionValue.runners[0].lay[0].price;
                } else {
                  value.noScore = "";
                  value.noRate = "";
                }
                if (sessionValue.runners[0].back.length != 0) {
                  value.yesScore = sessionValue.runners[0].back[0].line;
                  value.yesRate = sessionValue.runners[0].back[0].price;
                } else {
                  value.yesScore = "";
                  value.yesRate = "";
                }
                value.ballStatus = sessionValue.statusLabel;
              } else {
                value.noScore = "";
                value.noRate = "";
                value.yesScore = "";
                value.yesRate = "";
                value.ballStatus = sessionValue.statusLabel;
              }
            }
          }
          // if (value.isAuto == 1 && $scope.DiaSessionfeeds != undefined) {
          //     var sessionValue = $scope.DiaSessionfeeds[value.name];
          //     if (sessionValue != undefined) {
          //         if (parseInt(sessionValue.maxbet) > 0 && parseInt(sessionValue.minBet) > 0) {
          //             value.noScore = sessionValue.l1;
          //             value.noRate = sessionValue.ls1;
          //             value.yesScore = sessionValue.b1;
          //             value.yesRate = sessionValue.bs1;
          //             value.ballStatus = sessionValue.gameStatus;
          //         } else {
          //             value.noScore = 0;
          //             value.noRate = 0;
          //             value.yesScore = 0;
          //             value.yesRate = 0;
          //             value.ballStatus = sessionValue.gameStatus;
          //         }
          //     }
          // }
        });
        $scope.getFancyData = fancy.data;
      });
    });
  };

  $scope.fancySubscribe = function () {
    $scope.fancyProxy.invoke("SubscribeFancy", $scope.matchId);
  };
  $scope.fancyUnsubscribe = function () {
    if ($scope.getMarketDatas.hasFancy == 1) {
      $scope.fancyProxy.invoke("UnsubscribeFancy", $scope.matchId);
      $scope.fancyHubAddress = null;
      $scope.fancyConnection.stop();
    }
  };

  $scope.MatchScoreHubAddress = null;
  $scope.MatchScoreSignalr = function () {
    //Getting the connection object
    $scope.MatchScoreHubAddress = "http://178.238.236.221:13582";
    $scope.MatchScoreConnection = $.hubConnection($scope.MatchScoreHubAddress);
    //Creating Proxy
    $scope.MatchScoreProxy = $scope.MatchScoreConnection.createHubProxy(
      "ScoreHub"
    );
    //Starting connection
    $scope.MatchScoreConnection.start()
      .done(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        console.log("Match Score Connection Established= " + hubConState);
      })
      .fail(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        console.log("Match Score Could not connect= " + hubConState);
      });
    $scope.MatchScoreConnection.stateChanged(function (change) {
      // console.log(change.newState)
      $scope.marketSessionData = undefined;
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
      console.log(data);
      $scope.getMarketSession(data.fancy);
    });
  };

  $scope.subscribeMatchScore = function () {
    //Invoking SubscribeMarket method defined in hub
    $scope.MatchScoreProxy.invoke("SubscribeMatch", $scope.mtBfId);
  };

  $scope.unSubscribeMatchScore = function () {
    //Invoking UnsubscribeMarket method defined in hub
    if ($scope.MatchScoreHubAddress != null) {
      $scope.MatchScoreProxy.invoke("UnSubscribeMatch", $scope.mtBfId);
      $scope.MatchScoreHubAddress = null;
      $scope.MatchScoreConnection.stop();
    }
  };

  //SIGNALR CALLS LOTUSSESSIONS
  $scope.getMarketSession = function (data) {
    if (data == null) {
      return false;
    }
    $scope.checkMarketSessionDataLength = data.length;
    $scope.marketSessionData = $scope.marketSessionNameWise(data);

    if (
      $scope.getMarketData != undefined &&
      $scope.checkMarketSessionDataLength != 0
    ) {
      if (
        $scope.getMarketData.dataMode == 2 ||
        $scope.marketHubAddress == null
      ) {
        $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("spark");

        $scope.newMarket =
          $scope.marketSessionData[$scope.getMarketData.mktName];
        // console.log($scope.newMarket)

        $scope.totalMatched = $scope.newMarket.matched;
        $scope.getMarketData.matchStatus = $scope.newMarket.status;

        angular.forEach($scope.newMarket.runners, function (item) {
          angular.forEach($scope.getMarketData.runnerData, function (
            item2,
            index
          ) {
            if (item2.runnerName == item.name) {
              var txt = item2.runnerName
                .replace(/[^a-z0-9\s]/gi, "")
                .replace(/[_\s]/g, "_");
              if (item.back[0] != undefined) {
                item.back[0].size =
                  parseFloat(item.back[0].size) * parseFloat($scope.volMulti);
                if (
                  item2.back1 != item.back[0].price ||
                  item2.backSize1 != item.back[0].size
                ) {
                  if ($rootScope.settingsData.isOddsHighlights == 1) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .back-1"
                    ).addClass("spark");
                  }
                }
                item2.back1 = item.back[0].price;
                item2.backSize1 = item.back[0].size;
              } else {
                item2.back1 = null;
                item2.backSize1 = null;
              }
              if (item.back[1] != undefined) {
                item.back[1].size =
                  parseFloat(item.back[1].size) * parseFloat($scope.volMulti);
                if (
                  item2.back2 != item.back[1].price ||
                  item2.backSize2 != item.back[1].size
                ) {
                  if ($rootScope.settingsData.isOddsHighlights == 1) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .back-2"
                    ).addClass("spark");
                  }
                }
                item2.back2 = item.back[1].price;
                item2.backSize2 = item.back[1].size;
              } else {
                item2.back2 = null;
                item2.backSize2 = null;
              }
              if (item.back[2] != undefined) {
                item.back[2].size =
                  parseFloat(item.back[2].size) * parseFloat($scope.volMulti);
                if (
                  item2.back3 != item.back[2].price ||
                  item2.backSize3 != item.back[2].size
                ) {
                  if ($rootScope.settingsData.isOddsHighlights == 1) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .back-3"
                    ).addClass("spark");
                  }
                }
                item2.back3 = item.back[2].price;
                item2.backSize3 = item.back[2].size;
              } else {
                item2.back3 = null;
                item2.backSize3 = null;
              }
              if (item.lay[0] != undefined) {
                item.lay[0].size =
                  parseFloat(item.lay[0].size) * parseFloat($scope.volMulti);
                if (
                  item2.lay1 != item.lay[0].price ||
                  item2.laySize1 != item.lay[0].size
                ) {
                  if ($rootScope.settingsData.isOddsHighlights == 1) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .lay-1"
                    ).addClass("spark");
                  }
                }
                item2.lay1 = item.lay[0].price;
                item2.laySize1 = item.lay[0].size;
              } else {
                item2.lay1 = null;
                item2.laySize1 = null;
              }
              if (item.lay[1] != undefined) {
                // item.lay[1].size = parseFloat(item.lay[1].size) * parseFloat($scope.volMulti);
                if (
                  item2.lay2 != item.lay[1].price ||
                  item2.laySize2 != item.lay[1].size
                ) {
                  if ($rootScope.settingsData.isOddsHighlights == 1) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .lay-2"
                    ).addClass("spark");
                  }
                }
                item2.lay2 = item.lay[1].price;
                item2.laySize2 = item.lay[1].size;
              } else {
                item2.lay2 = null;
                item2.laySize2 = null;
              }
              if (item.lay[2] != undefined) {
                item.lay[2].size =
                  parseFloat(item.lay[2].size) * parseFloat($scope.volMulti);
                if (
                  item2.lay3 != item.lay[2].price ||
                  item2.laySize3 != item.lay[2].size
                ) {
                  if ($rootScope.settingsData.isOddsHighlights == 1) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .lay-3"
                    ).addClass("spark");
                  }
                }
                item2.lay3 = item.lay[2].price;
                item2.laySize3 = item.lay[2].size;
              } else {
                item2.lay3 = null;
                item2.laySize3 = null;
              }
            }
          });
        });
      }
    }
  };

  //API CALLS LOTUSSESSIONS
  // $scope.getMarketSession=function(){
  //  $http({
  //            url: "https://www.lotusbook.com/api/exchange/odds/sma-event/LIOD/" + $scope.sportId + "/" + $scope.mtBfId,
  //            method: "GET"
  //        }).then(function success(data) {

  //          $scope.checkMarketSessionDataLength=data.data.result.length;
  //          $scope.marketSessionData=$scope.marketSessionNameWise(data.data.result);

  //          if ($scope.getMarketData!=undefined && $scope.checkMarketSessionDataLength!=0) {

  //      if ($scope.getMarketData.dataMode==2 || $scope.marketHubAddress==null) {
  //              $('.back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3').removeClass('spark');

  //              $scope.newMarket=$scope.marketSessionData[$scope.getMarketData.mktName];
  //              // console.log($scope.newMarket)

  //        $scope.totalMatched=$scope.newMarket.matched;
  //        $scope.getMarketData.matchStatus=$scope.newMarket.status;

  //        angular.forEach($scope.newMarket.runners, function(item) {
  //                        angular.forEach($scope.getMarketData.runnerData, function(item2,index) {
  //                            if (item2.runnerName == item.name) {
  //                              var txt = item2.runnerName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
  //                                if (item.back[0] != undefined) {
  //                                    item.back[0].size = parseFloat(item.back[0].size) * parseFloat($scope.volMulti);
  //                                    if (item2.back1 != item.back[0].price || item2.backSize1 != item.back[0].size) {
  //                                        if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                            $('#selection_'+$scope.marketId+'_'+txt+' .back-1').addClass('spark');
  //                                        }
  //                                    }
  //                                    item2.back1 = item.back[0].price;
  //                                    item2.backSize1 = item.back[0].size;
  //                                } else {
  //                                    item2.back1 = null;
  //                                    item2.backSize1 = null;
  //                                }
  //                                if (item.back[1] != undefined) {
  //                                    item.back[1].size = parseFloat(item.back[1].size) * parseFloat($scope.volMulti);
  //                                    if (item2.back2 != item.back[1].price || item2.backSize2 != item.back[1].size) {
  //                                        if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                            $('#selection_'+$scope.marketId+'_'+txt+' .back-2').addClass('spark');
  //                                        }
  //                                    }
  //                                    item2.back2 = item.back[1].price;
  //                                    item2.backSize2 = item.back[1].size;
  //                                } else {
  //                                    item2.back2 = null;
  //                                    item2.backSize2 = null;
  //                                }
  //                                if (item.back[2] != undefined) {
  //                                    item.back[2].size = parseFloat(item.back[2].size) * parseFloat($scope.volMulti);
  //                                    if (item2.back3 != item.back[2].price || item2.backSize3 != item.back[2].size) {
  //                                        if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                            $('#selection_'+$scope.marketId+'_'+txt+' .back-3').addClass('spark');
  //                                        }
  //                                    }
  //                                    item2.back3 = item.back[2].price;
  //                                    item2.backSize3 = item.back[2].size;
  //                                } else {
  //                                    item2.back3 = null;
  //                                    item2.backSize3 = null;
  //                                }
  //                                if (item.lay[0] != undefined) {
  //                                    item.lay[0].size = parseFloat(item.lay[0].size) * parseFloat($scope.volMulti);
  //                                    if (item2.lay1 != item.lay[0].price || item2.laySize1 != item.lay[0].size) {
  //                                        if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                            $('#selection_'+$scope.marketId+'_'+txt+' .lay-1').addClass('spark');
  //                                        }
  //                                    }
  //                                    item2.lay1 = item.lay[0].price;
  //                                    item2.laySize1 = item.lay[0].size;
  //                                } else {
  //                                    item2.lay1 = null;
  //                                    item2.laySize1 = null;
  //                                }
  //                                if (item.lay[1] != undefined) {
  //                                    // item.lay[1].size = parseFloat(item.lay[1].size) * parseFloat($scope.volMulti);
  //                                    if (item2.lay2 != item.lay[1].price || item2.laySize2 != item.lay[1].size) {
  //                                        if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                            $('#selection_'+$scope.marketId+'_'+txt+' .lay-2').addClass('spark');
  //                                        }
  //                                    }
  //                                    item2.lay2 = item.lay[1].price;
  //                                    item2.laySize2 = item.lay[1].size;
  //                                } else {
  //                                    item2.lay2 = null;
  //                                    item2.laySize2 = null;
  //                                }
  //                                if (item.lay[2] != undefined) {
  //                                    item.lay[2].size = parseFloat(item.lay[2].size) * parseFloat($scope.volMulti);
  //                                    if (item2.lay3 != item.lay[2].price || item2.laySize3 != item.lay[2].size) {
  //                                        if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                            $('#selection_'+$scope.marketId+'_'+txt+' .lay-3').addClass('spark');
  //                                        }
  //                                    }
  //                                    item2.lay3 = item.lay[2].price;
  //                                    item2.laySize3 = item.lay[2].size;
  //                                } else {
  //                                    item2.lay3 = null;
  //                                    item2.laySize3 = null;
  //                                }
  //                            }

  //                        });

  //                    });
  //      }
  //          }

  //        },function error(err){

  //        })
  // }

  $scope.marketSessionNameWise = function (sessions) {
    var newMarkets = {};
    angular.forEach(sessions, function (item, key) {
      newMarkets[item.name.trim()] = item;
    });
    return newMarkets;
  };

  $scope.getScore = function () {
    // https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=29134308
    if ($scope.sportId == 1) {
      $scope.scoreUrl =
        "https://ips.betfair.com/inplayservice/v1/eventTimelines?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=de&eventIds=" +
        $scope.mtBfId;
    } else {
      $scope.scoreUrl =
        "https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=" +
        $scope.mtBfId;
    }
    $http({
      url: $scope.scoreUrl,
      method: "GET",
    }).then(function success(data) {
      if (data.data.length != 0) {
        $scope.fullScore = data.data[0];
      }
      // console.log($scope.fullScore)
    });
  };

  $scope.scoreRun = function () {
    var displayRun = "";
    if ($scope.fullScore.stateOfBall != undefined) {
      if ($scope.fullScore.stateOfBall.appealTypeName == "Not Out") {
        if ($scope.fullScore.stateOfBall.dismissalTypeName == "Not Out") {
          if ($scope.fullScore.stateOfBall.bye != "0") {
            return (displayRun =
              $scope.fullScore.stateOfBall.bye + " Run (Bye)");
          }
          if ($scope.fullScore.stateOfBall.legBye != "0") {
            return (displayRun =
              $scope.fullScore.stateOfBall.legBye + " Run (Leg Bye)");
          }
          if ($scope.fullScore.stateOfBall.wide != "0") {
            return (displayRun =
              $scope.fullScore.stateOfBall.wide + " Run (Wide)");
          }
          if ($scope.fullScore.stateOfBall.noBall != "0") {
            return (displayRun =
              $scope.fullScore.stateOfBall.batsmanRuns + " Run (No Ball)");
          }
          if ($scope.fullScore.stateOfBall.batsmanRuns == "0") {
            return (displayRun = "No Run");
          } else if ($scope.fullScore.stateOfBall.batsmanRuns == "1") {
            return (displayRun =
              $scope.fullScore.stateOfBall.batsmanRuns + " Run");
          } else if (parseInt($scope.fullScore.stateOfBall.batsmanRuns) > 1) {
            return (displayRun =
              $scope.fullScore.stateOfBall.batsmanRuns + " Runs");
          }
          // if ($scope.fullScore.stateOfBall.batsmanRuns=="0" && $scope.fullScore.stateOfBall.legBye=="0") {
          //  displayRun="No Run";
          // }
          // else if ($scope.fullScore.stateOfBall.batsmanRuns!="0" && $scope.fullScore.stateOfBall.legBye=="0") {
          //  displayRun=$scope.fullScore.stateOfBall.batsmanRuns+" Runs";
          // }
          // else if ($scope.fullScore.stateOfBall.batsmanRuns=="0" && $scope.fullScore.stateOfBall.legBye!="0") {
          //  displayRun=$scope.fullScore.stateOfBall.legBye+" Runs (Leg Bye)";
          // }
        } else {
          return (displayRun =
            "WICKET (" + $scope.fullScore.stateOfBall.dismissalTypeName + ")");
        }
      } else {
        if ($scope.fullScore.stateOfBall.outcomeId == "0") {
          return (displayRun =
            "Appeal : " + $scope.fullScore.stateOfBall.appealTypeName);
        } else {
          return (displayRun = "WICKET (Not Out)");
        }
      }
    }

    // return displayRun;
  };

  var marketSessionInterval = $interval(function () {
    if ($rootScope.token != undefined && $rootScope.token != "") {
      // $scope.getMarketSession();
    } else {
      $scope.getMarket();
      $scope.getFancy();
    }
    // $scope.getScore();
    $scope.getMatchSettings();
  }, 500);

  var scoreInterval = $interval(function () {
    if ($scope.scoreId == 0) {
      $scope.getScore();
    }
  }, 1500);

  $scope.$on("$destroy", function () {
    $interval.cancel(marketSessionInterval);
    $interval.cancel(scoreInterval);

    if ($rootScope.token != undefined && $rootScope.token != "") {
      $scope.marketUnsubscribe();
      $scope.fancyUnsubscribe();
      // $scope.unSubscribeMatchScore();
    }
  });

  $scope.getCardTeam = function (card, team) {
    if (card == "Goal" && team == "home") {
      return "ball-soccer team-a";
    } else if (card == "YellowCard" && team == "home") {
      return "card-yellow team-a";
    } else if (card == "Goal" && team == "away") {
      return "ball-soccer team-b";
    } else if (card == "YellowCard" && team == "away") {
      return "card-yellow team-b";
    }
    // else if (card=="SecondHalfKickOff") {
    //  return 'ball-soccer team-a';
    // }
    else if (card <= 10) {
      return 1;
    } else if (card <= 20) {
      return 2;
    } else if (card <= 30) {
      return 3;
    } else if (card <= 40) {
      return 4;
    } else if (card <= 50) {
      return 5;
    } else if (card <= 60) {
      return 6;
    } else if (card <= 70) {
      return 7;
    } else if (card <= 80) {
      return 8;
    } else if (card <= 90) {
      return 9;
    } else if (card <= 100) {
      return 10;
    }
  };

  $scope.allMarketCalls = true;
  $scope.getAllMarket = function () {
    if ($scope.allMarketCalls == false) {
      return false;
    }
    $scope.allMarketCalls = false;
    $("#loading").css("display", "flex");

    if ($rootScope.fType == 1) {
      NavigationServices.allMarket($scope.matchId).then(
        function success(data) {
          $scope.allMarketCalls = true;

          $scope.allMarketData = data.data.data;
          $("#loading").css("display", "none");
          $scope.getMarket();
        },
        function error(err) {
          $scope.allMarketCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      // $('#loading').css('display','none');
      $scope.allMarketCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.allMarketData = $rootScope.allMarketWise(
          $rootScope.SportsDatas[$scope.sportId].tournaments[$scope.tourId]
            .matches[$scope.matchId]
        );
        $scope.getMarket();
        $("#loading").css("display", "none");
      }
    }
  };
  $scope.getAllMarket();

  $scope.scorediv = false;
  $scope.scoredivtoggle = function () {
    if (!$scope.scorediv) {
      $scope.scorediv = true;
    } else {
      $scope.scorediv = false;
    }
  };

  var callAllMktEvent = $rootScope.$on("allMktEvent", function (event, data) {
    $scope.getAllMarket();
    $rootScope.clientCount++;
  });
  $scope.$on("$destroy", callAllMktEvent);

  var stscoreInterval = $interval(function () {
    $scope.get_scorecard();
    $scope.scoreDateTime();
  }, 1000);

  $scope.$on("$destroy", function () {
    $interval.cancel(stscoreInterval);
  });

  $scope.scoreId = 0;
  $scope.GetScoreId = function () {
    $http({
      method: "GET",
      url:
        "http://173.249.21.26/SkyImporter/MatchImporter.svc/GetScoreId?eventid=" +
        $scope.mtBfId,
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

  $scope.GetScoreId();

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

  $scope.scoreTab = "Pitch";
  $scope.selectedScoreTab = function (tab) {
    $scope.scoreTab = tab;
  };

  $scope.inningTab = 0;
  $scope.selctedInning = function (tab) {
    $scope.inningTab = tab;
  };

  $scope.getBallClass = function (ball) {
    if (ball == "w") {
      return "srm-wicket";
    } else if (ball == 0) {
      return "srm-dot";
    } else if (ball > 0 && ball < 4) {
      return "srm-normal";
    } else if (ball > 3 && ball < 7) {
      return "srm-bound";
    } else {
      return "srm-normal";
    }
  };

  $scope.getInning = function (teamName) {
    let indexPos = -1;
    if ($scope.scorecard) {
      angular.forEach($scope.scorecard.innings, function (item, index) {
        if (item.teamName == teamName) {
          indexPos = index;
        }
      });
    }
    return indexPos;
  };

  $scope.StrikeRate = function (batsmen) {
    if (batsmen.runs == 0 || batsmen.balls == 0) {
      return 0.0;
    }
    return ((batsmen.runs / batsmen.balls) * 100).toFixed(2);
  };

  $scope.economy = function (bowlers) {
    if (bowlers.runs == 0 || bowlers.overs == 0) {
      return 0.0;
    }
    return (bowlers.runs / bowlers.overs).toFixed(2);
  };

  $scope.scoreDateTime = function () {
    let matchDate = $scope.getMarketData.matchDate;
    let currentDate = $rootScope.curTime;

    if (matchDate == undefined || currentDate == undefined) {
      return false;
    }
    var matchDateTime = new Date(
      $scope.matchDateDigit(matchDate).replace(/ /g, "T")
    );
    currentDate = currentDate.replace(/ /g, "T");
    currentDate = new Date(currentDate);
    var dateTime = matchDateTime.getTime() - currentDate.getTime();
    $scope.day = parseInt(dateTime / (1000 * 3600 * 24));
    $scope.hrs = parseInt(dateTime / (1000 * 3600)) - $scope.day * 24;
    $scope.minutes =
      parseInt(dateTime / (1000 * 60)) -
      ($scope.day * 24 * 60 + $scope.hrs * 60);
    $scope.seconds =
      parseInt(dateTime / 1000) -
      ($scope.day * 24 * 3600 + $scope.hrs * 3600 + $scope.minutes * 60);
  };
});

app.controller("multiMarketController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout,
  $window,
  NavigationServices,
  $routeParams,
  $interval,
  $location
) {
  $rootScope.selectedTab = "multiMarket";

  $scope.multiMarketsCalls = true;
  $scope.getMultiMarkets = function () {
    if ($rootScope.token == undefined || $rootScope.token == "") {
      return false;
    }
    if ($scope.multiMarketsCalls == false) {
      return false;
    }
    $scope.multiMarketsCalls = false;

    $rootScope.marketBfIdArray = [];
    $rootScope.fancyBfIdArray = [];

    $("#loading").css("display", "flex");
    if ($rootScope.fType == 1) {
      NavigationServices.multiMarkets().then(
        function success(data) {
          $scope.multiMarketsCalls = true;
          $rootScope.curTime = data.data.curTime;
          $rootScope.multiMarketData = data.data.data;
          $("#loading").css("display", "none");

          $timeout(function () {
            angular.forEach($rootScope.multiMarketData, function (item) {
              $rootScope.getExposureBook(item.mktId);
              $rootScope.marketBfIdArray.push(item.bfId);
              if ($scope.marketHubAddress == null && item.dataMode == 1) {
                $scope.getHubAddress(item.mktId);
              }
            });
          }, 300);
        },
        function error(err) {
          $scope.multiMarketsCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $("#loading").css("display", "none");
      $scope.multiMarketsCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $rootScope.multiMarketDatas = $rootScope.multiMarketsWise(
          $rootScope.SportsDatas
        );
        $rootScope.multiMarketData = $rootScope.multiMarketDatas.marketData;
        $rootScope.multiFancyData = $rootScope.multiMarketDatas.fancyData;

        $timeout(function () {
          // if ($rootScope.multiFancyData.length!=0) {
          //  $scope.MatchSessionSignalr();
          // }
          angular.forEach($rootScope.multiMarketData, function (item) {
            // angular.forEach(item.runnerData, function(item2) {
            //                       item2.back1 = null;
            //                       item2.back2 = null;
            //                       item2.back3 = null;
            //                       item2.backSize1 = null;
            //                       item2.backSize2 = null;
            //                       item2.backSize3 = null;
            //                       item2.lay1 = null;
            //                       item2.lay2 = null;
            //                       item2.lay3 = null;
            //                       item2.laySize1 = null;
            //                       item2.laySize2 = null;
            //                       item2.laySize3 = null;
            //                   })
            $rootScope.getExposureBook(item.mktId);
            $rootScope.marketBfIdArray.push(item.bfId);
            if ($scope.marketHubAddress == null && item.dataMode == 1) {
              $scope.getHubAddress(item.mktId);
            }
          });
          angular.forEach($rootScope.multiFancyData, function (item) {
            $rootScope.fancyBfIdArray.push(item.matchId);

            if (item.sportName == "Cricket" && $scope.fancyHubAddres == null) {
              $scope.getHubAddress(item.mktId);
            }
            angular.forEach(item.fancyData, function (item) {
              $scope.fBook = $rootScope._fancyBook[item.name];
              if ($scope.fBook == undefined) {
                $scope.fBook = 0;
                $rootScope.getFancyExpoBook(
                  item.matchId,
                  item.id,
                  $scope.fBook
                );
              } else {
                $rootScope.getFancyExpoBook(
                  item.matchId,
                  item.id,
                  $scope.fBook
                );
              }
            });
          });
        }, 300);
      }
    }
  };

  $scope.getMultiMarkets();

  var callMultiMktEvent = $rootScope.$on("multiMktEvent", function (
    event,
    data
  ) {
    $scope.getMultiMarkets();
    $rootScope.clientCount++;
  });
  $scope.$on("$destroy", callMultiMktEvent);

  $scope.hubAddressCalls = true;
  $scope.getHubAddress = function (marketId) {
    if ($scope.hubAddressCalls == false) {
      return false;
    }
    $scope.hubAddressCalls = false;
    NavigationServices.hubAddress(marketId).then(
      function success(data) {
        $scope.hubAddressCalls = true;

        if (data.data.hubAddress && $rootScope.multiMarketData.length != 0) {
          $scope.connectMarketSignalr(data.data.hubAddress);
        }
        if (
          data.data.fancyHubAddress != null &&
          $rootScope.multiFancyData.length != 0
        ) {
          $scope.connectFancySignalr(data.data.fancyHubAddress);
        }
        $("#loading").css("display", "none");
      },
      function error(err) {
        $scope.hubAddressCalls = true;
        $("#loading").css("display", "none");
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.volMulti = 1;

  $scope.marketHubAddress = null;
  $scope.connectMarketSignalr = function (hubAddress) {
    $scope.marketHubAddress = hubAddress;

    // Getting the connection object
    $scope.marketConnection = $.hubConnection($scope.marketHubAddress);
    //Creating Proxy
    $scope.marketProxy = $scope.marketConnection.createHubProxy("RunnersHub");
    //Starting connection
    $scope.marketConnection
      .start()
      .done(function (marketConnection) {
        console.log("Market Connected" + marketConnection.state);
      })
      .fail(function (marketConnection) {
        console.log("Market not connected" + marketConnection.message);
      });

    $scope.marketConnection.stateChanged(function (marketState) {
      console.log(marketState);
      if (marketState.newState != 1 && $scope.marketHubAddress != null) {
        //Starting Reconnection
        $scope.marketConnection
          .start()
          .done(function (marketConnection) {
            console.log("Market ReConnected" + marketConnection.state);
          })
          .fail(function (marketConnection) {
            console.log("Market not Reconnected" + marketConnection.message);
          });
      }
      if (marketState.newState == 1 && $scope.marketHubAddress != null) {
        $scope.marketSubscribe();
      }
    });

    $scope.marketProxy.on("BroadcastSubscribedData", function (runner) {
      // console.log(runner)
      if ($location.path().split("/").indexOf("multiMarket") == -1) {
        $scope.marketProxy.invoke("UnsubscribeMarket", runner.marketid);
        $scope.marketHubAddress = null;
        $scope.marketConnection.stop();
      }

      $scope.$apply(function () {
        $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("spark");

        runner.backSize1 =
          runner.backSize1 != null
            ? runner.backSize1 * $scope.volMulti
            : runner.backSize1;
        runner.backSize2 =
          runner.backSize2 != null
            ? runner.backSize2 * $scope.volMulti
            : runner.backSize2;
        runner.backSize3 =
          runner.backSize3 != null
            ? runner.backSize3 * $scope.volMulti
            : runner.backSize3;
        runner.laySize1 =
          runner.laySize1 != null
            ? runner.laySize1 * $scope.volMulti
            : runner.laySize1;
        runner.laySize2 =
          runner.laySize2 != null
            ? runner.laySize2 * $scope.volMulti
            : runner.laySize2;
        runner.laySize3 =
          runner.laySize3 != null
            ? runner.laySize3 * $scope.volMulti
            : runner.laySize3;

        var marketIndex = $rootScope.marketBfIdArray.indexOf(runner.marketid);
        if (marketIndex != -1) {
          $rootScope.multiMarketData[marketIndex].matchStatus = runner.Status;
          // console.log($scope.getMarketData.runnerData)
          $scope.marketId = $rootScope.multiMarketData[marketIndex].mktId;
          angular.forEach(
            $rootScope.multiMarketData[marketIndex].runnerData,
            function (item, index) {
              if (item.runnerName == runner.runner) {
                // item=runner;
                // item.runnerName=runner.runner;
                $rootScope.multiMarketData[marketIndex].runnerData[
                  index
                ] = runner;
                $rootScope.multiMarketData[marketIndex].runnerData[
                  index
                ].runnerName = runner.runner;

                if ($rootScope.settingsData.isOddsHighlights == 1) {
                  var txt = runner.runner
                    .replace(/[^a-z0-9\s]/gi, "")
                    .replace(/[_\s]/g, "_");

                  if (
                    item.back1 != runner.back1 ||
                    item.backSize1 != runner.backSize1
                  ) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .back-1"
                    ).addClass("spark");
                  }
                  if (
                    item.back2 != runner.back2 ||
                    item.backSize2 != runner.backSize2
                  ) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .back-2"
                    ).addClass("spark");
                  }
                  if (
                    item.back3 != runner.back3 ||
                    item.backSize3 != runner.backSize3
                  ) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .back-3"
                    ).addClass("spark");
                  }

                  if (
                    item.lay1 != runner.lay1 ||
                    item.laySize1 != runner.laySize1
                  ) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .lay-1"
                    ).addClass("spark");
                  }
                  if (
                    item.lay2 != runner.lay2 ||
                    item.laySize2 != runner.laySize2
                  ) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .lay-2"
                    ).addClass("spark");
                  }
                  if (
                    item.lay3 != runner.lay3 ||
                    item.laySize3 != runner.laySize3
                  ) {
                    $(
                      "#selection_" + $scope.marketId + "_" + txt + " .lay-3"
                    ).addClass("spark");
                  }
                }
              }
            }
          );
        } else {
          $scope.marketProxy.invoke("UnsubscribeMarket", runner.marketid);
        }
      });
    });
  };

  $scope.marketSubscribe = function () {
    angular.forEach($rootScope.multiMarketData, function (item) {
      if (item.dataMode == 1) {
        $scope.marketProxy.invoke("SubscribeMarket", item.bfId);
      }
    });
  };
  $scope.marketUnsubscribe = function () {
    angular.forEach($rootScope.multiMarketData, function (item, index) {
      if (item.dataMode == 1) {
        $scope.marketProxy.invoke("UnsubscribeMarket", item.bfId);
      }
      if ($rootScope.multiMarketData.length == index + 1) {
        $scope.marketHubAddress = null;
        $scope.marketConnection.stop();
      }
    });
  };

  $scope.fancyHubAddress = null;
  $scope.connectFancySignalr = function () {
    $scope.fancyHubAddress = fancyHubAddress;
    $scope.fancyConnection = $.hubConnection($scope.fancyHubAddress);
    $scope.fancyProxy = $scope.fancyConnection.createHubProxy("FancyHub");

    $scope.fancyConnection
      .start()
      .done(function (fancyConnection) {
        console.log("Fancy Connected " + fancyConnection.state);
      })
      .fail(function (fancyConnection) {
        console.log("Fancy not connected " + fancyConnection.message);
      });

    $scope.fancyConnection.stateChanged(function (fancyState) {
      console.log(fancyState);
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
        $scope.fancySubscribe();
      }
    });

    $scope.fancyProxy.on("BroadcastSubscribedData", function (fancy) {
      // console.log(fancy);

      if ($location.path().split("/").indexOf("multiMarket") == -1) {
        $scope.fancyHubAddress = null;
        $scope.fancyConnection.stop();
      }

      $scope.$apply(function () {
        var fancyIndex = $rootScope.fancyBfIdArray.indexOf(fancy.matchId);
        // console.log(fancyIndex)

        if (fancyIndex > -1) {
          // if (fancy.data.length!=$rootScope.multiFancyData[fancyIndex].fancyData.length) {
          $rootScope.multiFancyData[fancyIndex].fancyData = fancy.data;
          // }
        } else {
          $scope.fancyProxy.invoke("UnsubscribeFancy", fancy.matchId);
        }
      });
    });
  };

  $scope.fancySubscribe = function () {
    angular.forEach($rootScope.multiFancyData, function (item) {
      if (item.hasFancy == 1) {
        $scope.fancyProxy.invoke("SubscribeFancy", item.matchId);
      }
    });
  };
  $scope.fancyUnsubscribe = function () {
    angular.forEach($rootScope.multiFancyData, function (item, index) {
      if (item.hasFancy == 1) {
        $scope.fancyProxy.invoke("UnsubscribeFancy", item.matchId);
      }
      if ($rootScope.multiFancyData.length == index + 1) {
        $scope.fancyHubAddress = null;
        $scope.fancyConnection.stop();
      }
    });
  };

  $scope.MatchScoreHubAddress = null;
  $scope.MatchSessionSignalr = function () {
    //Getting the connection object
    $scope.MatchScoreHubAddress = "http://178.238.236.221:13580";
    $scope.MatchScoreConnection = $.hubConnection(
      "http://178.238.236.221:13580"
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
      })
      .fail(function (myHubConnection) {
        var hubConState = myHubConnection.state;
        console.log("Match Score Could not connect= " + hubConState);
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
        $scope.subscribeMatchSession();
      }
    });
    //Publishing an event when server pushes a subscibed market
    $scope.MatchScoreProxy.on("BroadcastSubscribedData", function (data) {
      console.log(data);
      if (data.fancy.length >= 1) {
        var fancyIndex = $rootScope.multiFancyData.findIndex(function (item) {
          return item.matchBfId == data.fancy[0].groupById;
        });
        $scope.getMultiMarketSession(data.fancy, fancyIndex);
      } else {
      }
    });
  };

  $scope.subscribeMatchSession = function () {
    //Invoking SubscribeMarket method defined in hub
    angular.forEach($rootScope.multiFancyData, function (item) {
      if (item.hasFancy == 1) {
        $scope.MatchScoreProxy.invoke("SubscribeMatch", item.matchBfId);
      }
    });
  };

  $scope.unSubscribMatchSession = function () {
    //Invoking UnsubscribeMarket method defined in hub
    if ($scope.MatchScoreHubAddress != null) {
      angular.forEach($rootScope.multiFancyData, function (item) {
        if (item.hasFancy == 1) {
          $scope.MatchScoreProxy.invoke("UnSubscribeMatch", item.matchBfId);
        }
      });
      $scope.MatchScoreHubAddress = null;
      $scope.MatchScoreConnection.stop();
    }
  };

  //SIGNALR CALLS LOTUSSESSIONS
  $scope.getMultiMarketSession = function (data, fancyIndex) {
    $scope.checkMarketSessionDataLength = data.length;
    $scope.marketSessionData = $scope.marketSessionNameWise(data);

    if ($rootScope.multiFancyData[fancyIndex] != undefined) {
      angular.forEach(
        $rootScope.multiFancyData[fancyIndex].fancyData,
        function (value, index) {
          if (value.isAuto == 1 && $scope.marketSessionData != undefined) {
            var sessionValue = $scope.marketSessionData[value.name];
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
                  value.noScore = "";
                  value.noRate = "";
                }
                if (sessionValue.runners[0].back.length != 0) {
                  value.yesScore = sessionValue.runners[0].back[0].line;
                  value.yesRate = sessionValue.runners[0].back[0].price;
                } else {
                  value.yesScore = "";
                  value.yesRate = "";
                }
                value.ballStatus = sessionValue.statusLabel;
              } else {
                value.noScore = "";
                value.noRate = "";
                value.yesScore = "";
                value.yesRate = "";
                value.ballStatus = sessionValue.statusLabel;
              }
            }
          }
        }
      );
    }
  };

  // $scope.getMultiMarketByBfId = function(sportId,bfId,index) {

  //        $http({
  //            url: "https://www.lotusbook.com/api/exchange/odds/event/" + sportId+"/"+bfId,
  //            method: "GET",
  //        }).then(function success(response) {

  //    $('.back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3').removeClass('spark');

  //            response.data.result.forEach(function(item3) {

  //      $rootScope.multiMarketData[index].matchStatus=item3.status;
  //      $scope.marketId=$rootScope.multiMarketData[index].mktId;
  //      angular.forEach(item3.runners, function(item) {
  //                    angular.forEach($rootScope.multiMarketData[index].runnerData, function(item2,index) {
  //                        if (item2.runnerName == item.name) {
  //                          var txt = item2.runnerName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
  //                            if (item.back[0] != undefined) {
  //                                item.back[0].size = parseFloat(item.back[0].size) * parseFloat($scope.volMulti);
  //                                if (item2.back1 != item.back[0].price || item2.backSize1 != item.back[0].size) {
  //                                    if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                        $('#selection_'+$scope.marketId+'_'+txt+' .back-1').addClass('spark');
  //                                    }
  //                                }
  //                                item2.back1 = item.back[0].price;
  //                                item2.backSize1 = item.back[0].size;
  //                            } else {
  //                                item2.back1 = null;
  //                                item2.backSize1 = null;
  //                            }
  //                            if (item.back[1] != undefined) {
  //                                item.back[1].size = parseFloat(item.back[1].size) * parseFloat($scope.volMulti);
  //                                if (item2.back2 != item.back[1].price || item2.backSize2 != item.back[1].size) {
  //                                    if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                        $('#selection_'+$scope.marketId+'_'+txt+' .back-2').addClass('spark');
  //                                    }
  //                                }
  //                                item2.back2 = item.back[1].price;
  //                                item2.backSize2 = item.back[1].size;
  //                            } else {
  //                                item2.back2 = null;
  //                                item2.backSize2 = null;
  //                            }
  //                            if (item.back[2] != undefined) {
  //                                item.back[2].size = parseFloat(item.back[2].size) * parseFloat($scope.volMulti);
  //                                if (item2.back3 != item.back[2].price || item2.backSize3 != item.back[2].size) {
  //                                    if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                        $('#selection_'+$scope.marketId+'_'+txt+' .back-3').addClass('spark');
  //                                    }
  //                                }
  //                                item2.back3 = item.back[2].price;
  //                                item2.backSize3 = item.back[2].size;
  //                            } else {
  //                                item2.back3 = null;
  //                                item2.backSize3 = null;
  //                            }
  //                            if (item.lay[0] != undefined) {
  //                                item.lay[0].size = parseFloat(item.lay[0].size) * parseFloat($scope.volMulti);
  //                                if (item2.lay1 != item.lay[0].price || item2.laySize1 != item.lay[0].size) {
  //                                    if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                        $('#selection_'+$scope.marketId+'_'+txt+' .lay-1').addClass('spark');
  //                                    }
  //                                }
  //                                item2.lay1 = item.lay[0].price;
  //                                item2.laySize1 = item.lay[0].size;
  //                            } else {
  //                                item2.lay1 = null;
  //                                item2.laySize1 = null;
  //                            }
  //                            if (item.lay[1] != undefined) {
  //                                // item.lay[1].size = parseFloat(item.lay[1].size) * parseFloat($scope.volMulti);
  //                                if (item2.lay2 != item.lay[1].price || item2.laySize2 != item.lay[1].size) {
  //                                    if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                        $('#selection_'+$scope.marketId+'_'+txt+' .lay-2').addClass('spark');
  //                                    }
  //                                }
  //                                item2.lay2 = item.lay[1].price;
  //                                item2.laySize2 = item.lay[1].size;
  //                            } else {
  //                                item2.lay2 = null;
  //                                item2.laySize2 = null;
  //                            }
  //                            if (item.lay[2] != undefined) {
  //                                item.lay[2].size = parseFloat(item.lay[2].size) * parseFloat($scope.volMulti);
  //                                if (item2.lay3 != item.lay[2].price || item2.laySize3 != item.lay[2].size) {
  //                                    if ($rootScope.settingsData.isOddsHighlights==1) {
  //                                        $('#selection_'+$scope.marketId+'_'+txt+' .lay-3').addClass('spark');
  //                                    }
  //                                }
  //                                item2.lay3 = item.lay[2].price;
  //                                item2.laySize3 = item.lay[2].size;
  //                            } else {
  //                                item2.lay3 = null;
  //                                item2.laySize3 = null;
  //                            }
  //                        }

  //                    });

  //                });
  //            })
  //        }, function error(response) {
  //        })
  //    }

  //    $scope.getMultiMarketSession=function(sportId,mtBfId,fancyIndex){
  //  $http({
  //            url: "https://www.lotusbook.com/api/exchange/odds/sma-event/LIOD/" + sportId + "/" + mtBfId,
  //            method: "GET"
  //        }).then(function success(data) {

  //          $scope.checkMarketSessionDataLength=data.data.result.length;
  //          $scope.marketSessionData=$scope.marketSessionNameWise(data.data.result);

  //          if ($rootScope.multiFancyData[fancyIndex]!=undefined) {
  //            angular.forEach($rootScope.multiFancyData[fancyIndex].fancyData, function(value, index) {
  //                 if (value.isAuto == 1 && $scope.marketSessionData != undefined) {
  //                     var sessionValue = $scope.marketSessionData[value.name];
  //                     if (sessionValue != undefined) {
  //                         if (sessionValue.maxLiabilityPerBet > 0 && sessionValue.maxLiabilityPerMarket > 0 && sessionValue.isBettable == true) {
  //                             if (sessionValue.runners[0].lay.length != 0) {
  //                                 value.noScore = sessionValue.runners[0].lay[0].line;
  //                                 value.noRate = sessionValue.runners[0].lay[0].price;
  //                             } else {
  //                                 value.noScore = "";
  //                                 value.noRate = "";
  //                             }
  //                             if (sessionValue.runners[0].back.length != 0) {
  //                                 value.yesScore = sessionValue.runners[0].back[0].line;
  //                                 value.yesRate = sessionValue.runners[0].back[0].price;
  //                             } else {
  //                                 value.yesScore = "";
  //                                 value.yesRate = "";
  //                             }
  //                             value.ballStatus = sessionValue.statusLabel;
  //                         } else {
  //                             value.noScore = "";
  //                             value.noRate = "";
  //                             value.yesScore = "";
  //                             value.yesRate = "";
  //                             value.ballStatus = sessionValue.statusLabel;
  //                         }
  //                     }
  //                 }
  //      })
  //          }

  //        },function error(err){

  //        })
  // }

  $scope.marketSessionNameWise = function (sessions) {
    var newMarkets = {};
    angular.forEach(sessions, function (item, key) {
      newMarkets[item.name] = item;
    });
    return newMarkets;
  };

  //    var marketInterval = $interval(function() {
  //        angular.forEach($rootScope.multiMarketData,function(item,index){
  //    if (item.dataMode==2) {
  //      $scope.getMultiMarketByBfId(item.sportId,item.bfId,index);
  //    }
  //  })
  //  angular.forEach($rootScope.multiFancyData,function(item,index){
  //    if (item.fancyData.length!=0) {
  //      $scope.getMultiMarketSession(item.sportId,item.matchBfId,index);
  //    }
  //  })
  //    }, 1000);

  $scope.$on("$destroy", function () {
    // $interval.cancel(marketInterval);

    $scope.marketUnsubscribe();
    $scope.fancyUnsubscribe();
    // $scope.unSubscribMatchSession();
  });
});

app.controller("tpmarketController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout,
  $window,
  NavigationServices,
  $routeParams,
  $interval
) {
  $rootScope.selectedTab = "sports";

  $scope.sportId = $routeParams.sportId;
  $scope.mtBfId = $routeParams.mtBfId;
  $scope.matchId = $routeParams.matchId;
  $scope.marketId = $routeParams.marketId;
  $scope.bfId = $routeParams.bfId;
  $scope.tourId = $routeParams.tourId;

  var clock;
  $(function () {
    clock = new FlipClock($(".clock"), 99, {
      clockFace: "Counter",
    });
  });

  $scope.pending_GetRecentGameResult = true;
  $scope.GetRecentGameResult = function () {
    if ($scope.pending_GetRecentGameResult == false) {
      return false;
    }
    $scope.pending_GetRecentGameResult = false;
    NavigationServices.GetRecentGameResult($scope.subscriptionId).then(
      function success(data) {
        // console.log(data);
        $scope.resultsdata = data.data.data;
        $scope.pending_GetRecentGameResult = true;
      },
      function error(err) {
        $scope.pending_GetRecentGameResult = true;
        if (err.status == 401) {
          $rootScope.clearCookies();
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

  $scope.owlCarousel = function () {
    $("#andar_div,#bahar_div").owlCarousel({
      loop: false,
      margin: 10,
      responsiveClass: false,
      slideBy: 5,
      dots: false,
      responsive: {
        0: {
          items: 5,
          nav: true,
        },
        600: {
          items: 5,
          nav: true,
        },
        1000: {
          items: 14,
          nav: true,
          loop: false,
        },
      },
    });
  };

  $scope.marketCalls = true;
  $scope.getMarket = function () {
    if ($scope.marketCalls == false) {
      return false;
    }
    $scope.marketCalls = false;
    // $('#loading').css('display','flex');
    if ($rootScope.fType == 1) {
      NavigationServices.marketData($scope.matchId, $scope.marketId).then(
        function success(data) {
          $scope.marketCalls = true;

          $rootScope.curTime = data.data.curTime;
          if (!$scope.hubAddCall) {
            $scope.getMarketData = data.data.data;
          }
          $scope.getMarketData.marketId = $scope.marketId;
          $rootScope.matchName = $scope.getMarketData.matchName;
        },
        function error(err) {
          $scope.marketCalls = true;
          // $('#loading').css('display','none');
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      $scope.marketCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.getMarketDatas =
          $rootScope.SportsDatas[$scope.sportId].tournaments[
            $scope.tourId
          ].matches[$scope.matchId];
        if (!$scope.hubAddCall) {
          $scope.getMarketData = $rootScope.mktWise(
            $scope.getMarketDatas,
            $scope.bfId
          );
        }

        $rootScope.matchName = $scope.getMarketData.matchName;

        if ($rootScope.token != undefined && $rootScope.token != "") {
          if ($scope.getMarketDatas.bfId == "5000") {
            $scope.connectTPSignalr("http://45.76.155.250:11001/");
            $scope.subscriptionId = 1;
            $scope.LastgameResult($scope.subscriptionId);
          }
          if ($scope.getMarketDatas.bfId == "5001") {
            $scope.connectTPSignalr("http://45.76.155.250:11002/");
            $scope.subscriptionId = 2;
            $scope.LastgameResult($scope.subscriptionId);
          }
          if ($scope.getMarketDatas.bfId == "5002") {
            $scope.connectTPSignalr("http://45.76.155.250:11003/");
            $scope.subscriptionId = 3;
          }
          if ($scope.getMarketDatas.bfId == "5010") {
            $scope.connectTPSignalr("http://45.76.155.250:11004/");
            $scope.subscriptionId = 4;
          }
          if ($scope.getMarketDatas.bfId == "5003") {
            $scope.connectTPSignalr("http://45.76.155.250:11005/");
            $scope.subscriptionId = 5;
            $scope.LastgameResult($scope.subscriptionId);
          }
          if ($scope.getMarketDatas.bfId == "5004") {
            $scope.connectTPSignalr("http://45.76.155.250:11006/");
            $scope.subscriptionId = 6;
            $scope.LastgameResult($scope.subscriptionId);
            setTimeout(() => {
              $scope.owlCarousel();
            }, 100);
          }
          if ($scope.getMarketDatas.bfId == "5005") {
            $scope.connectTPSignalr("http://45.76.155.250:11007/");
            $scope.subscriptionId = 7;
            $scope.LastgameResult($scope.subscriptionId);
          }
        }
      }
    }
  };
  // $scope.getMarket();

  $scope.TPHubAddress = null;
  $scope.connectTPSignalr = function (hubAddress) {
    $scope.TPHubAddress = hubAddress;
    $scope.TPConnection = $.hubConnection($scope.TPHubAddress);
    $scope.TPProxy = $scope.TPConnection.createHubProxy("FancyHub");

    $scope.TPConnection.start()
      .done(function (TPConnection) {
        console.log("TP Connected " + TPConnection.state);
      })
      .fail(function (TPConnection) {
        console.log("TP not connected " + TPConnection.message);
      });

    $scope.TPConnection.stateChanged(function (TPState) {
      console.log(TPState);
      if (TPState.newState != 1 && $scope.TPHubAddress != null) {
        $scope.TPConnection.start()
          .done(function (TPConnection) {
            console.log("TP Reconnected " + TPConnection.state);
          })
          .fail(function (TPConnection) {
            console.log("TP not Reconnected " + TPConnection.message);
          });
      }
      if (TPState.newState == 1 && $scope.TPHubAddress != null) {
        $scope.TPSubscribe();
      }
    });

    $scope.TPProxy.on("BroadcastSubscribedData", function (data) {
      // console.log(data);

      $scope.$apply(function () {
        if ($scope.subscriptionId == 1) {
          $scope.tpData = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
          $scope.tpMarket = data.data.t2;
          $rootScope.getTPExposureBook($scope.tpData.mid);
        }
        if ($scope.subscriptionId == 2) {
          $scope.tpMarket = data.data.bf;
          if ($scope.tpMarket[0].lastime) {
            clock.setValue($scope.tpMarket[0].lastime);
          }
          $rootScope.getTPExposureBook($scope.tpMarket[0].marketId);
        }
        if ($scope.subscriptionId == 3) {
          $scope.tpData = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
          $scope.tpMarket = data.data.t2;
        }
        if ($scope.subscriptionId == 4) {
          $scope.tpData = data.data.t1[0];
          $scope.openCards = $scope.tpData.cards.split(",");
          // console.log($scope.openCards);
          clock.setValue($scope.tpData.autotime);
          $scope.tpMarket = data.data.t2;
        }
        if ($scope.subscriptionId == 5) {
          $scope.tpData = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
          $scope.tpMarket = data.data.t2;
          $rootScope.getLucky7ExposureBook($scope.tpData.mid);
        }

        if ($scope.subscriptionId == 6) {
          $scope.tpData = data.data.t1[0];
          clock.setValue($scope.tpData.autotime);
          $scope.tpMarket = data.data.t2;
          $rootScope.getThreeCardJExposureBook($scope.tpData.mid);
        }

        if ($scope.subscriptionId == 7) {
          $scope.tpData = data.data.t1[0];
          $scope.tpMarket = data.data.t2;
          $scope.AndarValues = [];
          $scope.BaharValues = [];
          $scope.Aallcards = [];
          $scope.Ballcards = [];
          $scope.Aresults = [];
          $scope.Bresults = [];

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
          $rootScope.getAndarBaharExposureBook($scope.tpData.mid);
        }
      });
    });
  };

  $scope.TPSubscribe = function () {
    $scope.TPProxy.invoke("SubscribeFancy", $scope.subscriptionId);
  };
  $scope.TPUnsubscribe = function () {
    if ($scope.TPHubAddress) {
      $scope.TPProxy.invoke("UnsubscribeFancy", $scope.subscriptionId);
      $scope.TPHubAddress = null;
      $scope.TPConnection.stop();
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

  $scope.$on("$destroy", function () {
    if ($rootScope.token != undefined && $rootScope.token != "") {
      $scope.TPUnsubscribe();
    }
    if (Lastgammeresulttimer) {
      clearInterval(Lastgammeresulttimer);
    }
  });

  $scope.allMarketCalls = true;
  $scope.getAllMarket = function () {
    if ($scope.allMarketCalls == false) {
      return false;
    }
    $scope.allMarketCalls = false;
    $("#loading").css("display", "flex");

    if ($rootScope.fType == 1) {
      NavigationServices.allMarket($scope.matchId).then(
        function success(data) {
          $scope.allMarketCalls = true;

          $scope.allMarketData = data.data.data;
          $("#loading").css("display", "none");
          $scope.getMarket();
        },
        function error(err) {
          $scope.allMarketCalls = true;
          $("#loading").css("display", "none");
          if (err.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    } else {
      // $('#loading').css('display','none');
      $scope.allMarketCalls = true;
      if ($rootScope.SportsDatas != undefined) {
        $scope.allMarketData = $rootScope.allMarketWise(
          $rootScope.SportsDatas[$scope.sportId].tournaments[$scope.tourId]
            .matches[$scope.matchId]
        );
        $scope.getMarket();
        $("#loading").css("display", "none");
      }
    }
  };
  $scope.getAllMarket();

  var callAllMktEvent = $rootScope.$on("allMktEvent", function (event, data) {
    $scope.getAllMarket();
    $rootScope.clientCount++;
  });
  $scope.$on("$destroy", callAllMktEvent);
});

app.controller("accountController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout,
  $window,
  NavigationServices,
  $routeParams,
  $interval
) {
  $rootScope.selectedTab = "account";

  $scope.logoutCalls = true;
  $scope.logout = function () {
    if ($scope.logoutCalls == false) {
      return false;
    }
    $scope.logoutCalls = false;

    $("#loading").css("display", "flex");
    NavigationServices.logout().then(
      function success(data) {
        $rootScope.clearCookies();
      },
      function error(err) {
        $scope.logoutCalls = true;
        $("#loading").css("display", "none");
        if (err.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
});

app.controller("profileController", function (
  $scope,
  $http,
  $cookies,
  $window,
  $routeParams,
  $rootScope,
  $location,
  $timeout
) {
  $rootScope.token = $cookies.get("cramp");
  // console.log($rootScope.token);
  $rootScope.appType = $cookies.get("appType");
  if (!$rootScope.appType) {
    $window.location.href = "login.html";
    return;
  }
  $rootScope.currency = currency;

  if ($rootScope.appType == 2) {
    ApiUrl = "http://www.funsports.win/ClientU/Client.svc";
    $rootScope.currency = "USD";
  } else if ($rootScope.appType == 3) {
    ApiUrl = "http://www.funsports.win/ClientH/Client.svc";
    $rootScope.currency = "HKD";
  }

  $rootScope.clearCookies = function () {
    // $cookies.remove('rememberMe');
    $cookies.remove("cramp");
    $window.location.href = "login.html";
  };
  if ($rootScope.token == undefined || $rootScope.token == "") {
    $window.location.href = "login.html";
  } else {
    $rootScope.token = JSON.parse($rootScope.token);
    authtoken = $rootScope.token;
  }

  $rootScope.openClose = false;
  $scope.opencloseMenu = function (state) {
    if (state == 1) {
      $rootScope.openClose = false;
    } else {
      $rootScope.openClose = !$rootScope.openClose;
    }
  };
  $scope.userDescription = function () {
    $http({
      url: ApiUrl + "/Data/UserDescription",
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          // $scope.lastLogin=response.data.data.lastLogin
          $scope.user = response.data.data;
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.userDescription();

  $scope.fundsCalls = true;
  $scope.Fund = function () {
    if ($scope.fundsCalls == false) {
      return false;
    }
    $scope.fundsCalls = false;
    $http({
      url: ApiUrl + "/Data/FundExpo",
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.availBal = response.data.data.availBal;
        $scope.exposure = response.data.data.exposure;
        $scope.fundsCalls = true;
      },
      function myError(error) {
        if (error.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.Fund();
  $rootScope.changePassView = false;
  $rootScope.openChangePass = function () {
    $rootScope.changePassView = !$rootScope.changePassView;
  };

  $rootScope.result = null;

  $scope.ChangePwd = function () {
    if ($scope.password == undefined || $scope.password == "") {
      return false;
    }
    if ($scope.newPassword == undefined || $scope.newPassword == "") {
      return false;
    }
    if ($scope.password != $scope.newPassword) {
      return false;
    }
    if ($scope.oldPassword == undefined || $scope.oldPassword == "") {
      return false;
    }
    $scope.changePassData = {
      changeBy: $scope.user.name,
      context: context,
      newPwd: $scope.password,
      oldPwd: $scope.oldPassword,
    };
    // console.log(JSON.stringify($scope.changePassData))
    $http({
      url: ApiUrl + "/ChangePwd",
      method: "POST",
      data: JSON.stringify($scope.changePassData),
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $rootScope.result = response.data;
          $rootScope.changePassView = false;
        } else {
          $rootScope.result = response.data;
        }

        $timeout(function () {
          $rootScope.result = null;
        }, 5000);
      },
      function myError(error) {
        if (error.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };

  $scope.closeMsg = function () {
    $rootScope.result = null;
  };
  $rootScope.selectMenu = "profile";
  $scope.selectedMenu = function (menu) {
    $rootScope.selectMenu = menu;
  };
});
app.controller("statementController", function (
  $scope,
  $http,
  $cookies,
  $window,
  $routeParams,
  $rootScope
) {
  $rootScope.selectMenu = "statement";
  var days = 30; // Days you want to subtract
  var date = new Date();
  var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  $scope.date = last;
  $scope.fromdate =
    $scope.date.getFullYear() +
    "-" +
    ($scope.date.getMonth() + 1) +
    "-" +
    $scope.date.getDate() +
    " 00:00:00";
  $scope.todate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " 23:59:00";
  $("#startDate").val($scope.fromdate);
  $("#endDate").val($scope.todate);
  // $scope.loading=true
  $scope.statementType = "0";
  $scope.statement = function () {
    $("#loading").css("display", "inline-grid");
    // $scope.loading=true
    $scope.fromdate = $("#startDate").val();
    $scope.todate = $("#endDate").val();
    $http({
      url: ApiUrl + "/Reports/GetLedger",
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.accountdataList = response.data.data;
        $scope.loading = false;
        $("#loading").css("display", "none");
      },
      function myError(response) {
        // console.log(response);
        if (response.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.statement();
});
app.controller("CasinoReportController", function (
  $scope,
  $http,
  $cookies,
  $window,
  $rootScope
) {
  $rootScope.selectMenu = "Casino_Report";

  $scope.CasinoReport = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
    $("#loading").css("display", "inline-grid");

    $http({
      url: ApiUrl + "/Reports/CasinoReport",

      method: "GET",

      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.CasinoReportData = response.data.data;
        $scope.loading = false;
        $("#loading").css("display", "none");
      },
      function myError(response) {
        // console.log(response);
        if (response.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.CasinoReport();
});
app.controller("casinoreport", function (
  $scope,
  $http,
  $location,
  $timeout,
  $routeParams,
  $rootScope
) {
  $rootScope.selectMenu = "casino";
  var days = 1;
  var date = new Date();
  var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  $scope.date = last;
  $scope.fromdate =
    $scope.date.getFullYear() +
    "-" +
    ($scope.date.getMonth() + 1) +
    "-" +
    $scope.date.getDate() +
    " 00:00:00";
  $scope.todate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " 23:59:00";
  $scope.pnlPeriod = "1";
  $("#startDate").val($scope.fromdate);
  $("#endDate").val($scope.todate);
  $scope.pending_GetCaisnoResults = false;
  $scope.GetCaisnoResults = function () {
    $scope.AccountStatementdata = null;
    if (Date.parse($scope.fromdate) >= Date.parse($scope.todate)) {
      toastr.error("'To' date must be greater than 'From' date.");
      return false;
    }
    $scope.From_date = $("#startDate").val();
    $scope.To_date = $("#endDate").val();
    if ($scope.pending_GetCaisnoResults == true) return false;
    $scope.pending_GetCaisnoResults = true;
    $("#loading").css("display", "inline-grid");
    $http({
      method: "GET",
      url:
        ApiUrl +
        "/Reports/GetCaisnoResults?from=" +
        $scope.fromdate +
        "&to=" +
        $scope.todate +
        "&gtype=" +
        $scope.pnlPeriod,
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    }).then(
      function success(response) {
        $scope.pending_GetCaisnoResults = false;
        $scope.Teenpattidata = response.data.data;
        $("#loading").css("display", "none");
      },
      function error(response) {
        $("#loading").css("display", "none");
        $scope.pending_GetCaisnoResults = false;
        if (response.status == 401) {
          $cookieStore.remove("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.GetCaisnoResults();
});

app.controller("bal_overviewController", function (
  $scope,
  $http,
  $cookies,
  $rootScope
) {
  $rootScope.selectMenu = "bal_overview";
  $scope.Fund = function () {
    $http({
      url: ApiUrl + "/Data/FundExpo",
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.availBal = response.data.data.availBal;
        $scope.exposure = response.data.data.exposure;
      },
      function myError(error) {
        if (error.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.Fund();
});
app.controller("current_betsController", function (
  $scope,
  $http,
  $cookies,
  $rootScope,
  $timeout
) {
  $rootScope.selectMenu = "current_bets";
  $scope.getCurrentBetsCalls = true;
  $scope.betStatus = "All";
  $scope.getCurrentBets = function () {
    $("#loading").css("display", "inline-grid");
    $scope.selectedAll = false;
    if ($scope.getCurrentBetsCalls == false) {
      return false;
    }
    $scope.getCurrentBetsCalls = false;

    $http({
      url: ApiUrl + "/Reports/GetCurrentBets",
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.matchedbetsList = response.data.matchedbets;
        $scope.unMatchedbetsList = response.data.unMatchedbets;
        $scope.getCurrentBetsCalls = true;
        // $scope.loading=false
        $("#loading").css("display", "none");
      },
      function myError(response) {
        $scope.getCurrentBetsCalls = true;
        $("#loading").css("display", "none");

        if (response.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.getCurrentBets();

  $scope.betDetails = function (betId) {
    if ($("#bet_" + betId).css("display") == "none") {
      $("#bet_" + betId).css("display", "table-row");
      $("#" + betId).removeAttr("class", "expand-close");
      $("#" + betId).attr("class", "expand-open");
    } else {
      $("#bet_" + betId).css("display", "none");
      $("#" + betId).removeAttr("class", "expand-open");
      $("#" + betId).attr("class", "expand-close");
    }
  };
  $scope.selectedUnmatchedList = [];
  $scope.existUnmatched = function (item) {
    // console.log($scope.selectedTickerList.indexOf(item))
    return $scope.selectedUnmatchedList.indexOf(item) > -1;
  };
  $scope.toggleUnmatchedSelection = function (item) {
    console.log(item);
    var idx = $scope.selectedUnmatchedList.indexOf(item);
    // console.log(idx)
    if (idx > -1) {
      $scope.selectedUnmatchedList.splice(idx, 1);
    } else {
      $scope.selectedUnmatchedList.push(item);
    }
    console.log($scope.selectedUnmatchedList);
  };

  $scope.allUnmatchedSelected = function (selectedAll) {
    $scope.selectedAll = !selectedAll;
    if (!$scope.selectedAll) {
      $scope.selectedUnmatchedList = [];
    } else {
      angular.forEach($scope.unMatchedbetsList, function (item) {
        // console.log(item.id);
        idx = $scope.selectedUnmatchedList.indexOf(item);
        if (idx >= 0) {
          return true;
        } else {
          $scope.selectedUnmatchedList.push(item);
        }
      });
    }
    console.log($scope.selectedUnmatchedList);
  };
  $scope.cancelBet = function () {
    if ($scope.selectedUnmatchedList.length == 0) {
      $rootScope.result = {
        result: "Please select checkbox!!",
        status: "Error",
      };
      $timeout(function () {
        $rootScope.result = null;
      }, 5000);

      return false;
    }
    angular.forEach($scope.selectedUnmatchedList, function (item, index) {
      $http({
        url: ApiUrl + "/Bets/CancelBet?id=" + item.betId,
        method: "POST",
        headers: {
          Token: token,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response);
          $rootScope.result = response.data;
          $timeout(function () {
            $rootScope.result = null;
          }, 5000);
          if (response.data.status == "Success") {
            $scope.selectedUnmatchedList = [];
            $scope.getCurrentBets();
            $scope.selectedAll = false;
          }
        },
        function myError(response) {
          if (response.status == 401) {
            $rootScope.clearCookies();
          }
        }
      );
    });
  };
});
app.controller("bet_historyController", function (
  $scope,
  $http,
  $cookies,
  $rootScope
) {
  $rootScope.selectMenu = "current_bets";
  $("#startDate").datetimepicker({
    format: "Y-m-d H:i:s",
  });
  $("#endDate").datetimepicker({
    format: "Y-m-d H:i:s",
  });
  $scope.betStatus = "4";
  var days = 7; // Days you want to subtract
  var date = new Date();
  var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  $scope.date = last;
  $scope.fromdate =
    $scope.date.getFullYear() +
    "-" +
    ($scope.date.getMonth() + 1) +
    "-" +
    $scope.date.getDate() +
    " 00:00:00";
  $scope.todate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " 23:59:00";
  $("#startDate").val($scope.fromdate);
  $("#endDate").val($scope.todate);
  $scope.getBetHistoryDate = function (value) {
    if (value == "today") {
      $scope.date = new Date();
      $scope.fromdate =
        $scope.date.getFullYear() +
        "-" +
        ($scope.date.getMonth() + 1) +
        "-" +
        $scope.date.getDate() +
        " 00:00:00";
      $scope.todate =
        $scope.date.getFullYear() +
        "-" +
        ($scope.date.getMonth() + 1) +
        "-" +
        $scope.date.getDate() +
        " 23:59:00";
      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
    } else if (value == "yesterday") {
      var days = 1; // Days you want to subtract
      var date = new Date();
      var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
      $scope.date = last;
      $scope.fromdate =
        $scope.date.getFullYear() +
        "-" +
        ($scope.date.getMonth() + 1) +
        "-" +
        $scope.date.getDate() +
        " 00:00:00";
      $scope.todate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " 23:59:00";
      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
    }
    $scope.getBetHistory();
  };
  $scope.getBetHistory = function () {
    $scope.fromdate = $("#startDate").val();
    $scope.todate = $("#endDate").val();
    $("#loading").css("display", "inline-grid");
    $http({
      url:
        ApiUrl +
        "/Reports/GetBetHistory?from=" +
        $scope.fromdate +
        "&to=" +
        $scope.todate +
        "&f=" +
        $scope.betStatus,
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.getBetHistoryList = response.data.data;
        $("#loading").css("display", "none");
      },
      function myError(response) {
        if (response.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.getBetHistory();
  $scope.betDetails = function (betId) {
    if ($("#bet_" + betId).css("display") == "none") {
      $("#bet_" + betId).css("display", "table-row");
      $("#" + betId).removeAttr("class", "expand-close");
      $("#" + betId).attr("class", "expand-open");
    } else {
      $("#bet_" + betId).css("display", "none");
      $("#" + betId).removeAttr("class", "expand-open");
      $("#" + betId).attr("class", "expand-close");
    }
  };
});
app.controller("profitLossController", function (
  $scope,
  $http,
  $cookies,
  $rootScope
) {
  $rootScope.selectMenu = "current_bets";
  $scope.userDescription = function () {
    $http({
      url: ApiUrl + "/Data/UserDescription",
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          $scope.lastLogin = response.data.data.lastLogin;
          $scope.name = response.data.data.name;
        }
      },
      function myError(error) {
        if (error.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.userDescription();
  var days = 7; // Days you want to subtract
  var date = new Date();
  var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  $scope.date = last;
  $scope.fromdate =
    $scope.date.getFullYear() +
    "-" +
    ($scope.date.getMonth() + 1) +
    "-" +
    $scope.date.getDate() +
    " 00:00:00";
  $scope.todate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " 23:59:00";
  $("#startDate").val($scope.fromdate);
  $("#endDate").val($scope.todate);
  $scope.getProfitLossDate = function (value) {
    if (value == "today") {
      $scope.date = new Date();
      $scope.fromdate =
        $scope.date.getFullYear() +
        "-" +
        ($scope.date.getMonth() + 1) +
        "-" +
        $scope.date.getDate() +
        " 00:00:00";
      $scope.todate =
        $scope.date.getFullYear() +
        "-" +
        ($scope.date.getMonth() + 1) +
        "-" +
        $scope.date.getDate() +
        " 23:59:00";
      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
    } else if (value == "yesterday") {
      var days = 1; // Days you want to subtract
      var date = new Date();
      var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
      $scope.date = last;
      $scope.fromdate =
        $scope.date.getFullYear() +
        "-" +
        ($scope.date.getMonth() + 1) +
        "-" +
        $scope.date.getDate() +
        " 00:00:00";
      $scope.todate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " 23:59:00";
      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
    }
    $scope.getProfitLoss();
  };
  $scope.getProfitLoss = function () {
    $scope.fromdate = $("#startDate").val();
    $scope.todate = $("#endDate").val();
    $("#loading").css("display", "inline-grid");
    $http({
      url:
        ApiUrl +
        "/Reports/GetProfitLoss?from=" +
        $scope.fromdate +
        "&to=" +
        $scope.todate,
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.getProfitLossList = response.data.data;
        $scope.total = response.data.total;
        $("#loading").css("display", "none");
      },
      function myError(response) {
        $("#loading").css("display", "none");
        if (response.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.getProfitLoss();
  $scope.betDetails = function (index) {
    if ($("#pnl_" + index).css("display") == "none") {
      $("#pnl_" + index).css("display", "table-row");
      $("#pl_" + index).removeClass("expand-close");
      $("#pl_" + index).addClass("expand-open");
    } else {
      $("#pnl_" + index).css("display", "none");
      $("#pl_" + index).removeClass("expand-open");
      $("#pl_" + index).addClass("expand-close");
    }
  };
});
app.controller("activity_logController", function (
  $scope,
  $http,
  $cookies,
  $rootScope
) {
  $rootScope.selectMenu = "activity_log";
  $scope.loading = true;
  $scope.getActivityLog = function () {
    $("#loading").css("display", "inline-grid");
    $scope.loading = true;
    $http({
      url: ApiUrl + "/Reports/ActivityLog",
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.ActivityDataList = response.data.data;
        $scope.loading = false;
        $("#loading").css("display", "none");
      },
      function myError(response) {
        // console.log(response);
        $scope.loading = false;
        $("#loading").css("display", "none");
        if (response.status == 401) {
          $rootScope.clearCookies();
        }
      }
    );
  };
  $scope.getActivityLog();
});

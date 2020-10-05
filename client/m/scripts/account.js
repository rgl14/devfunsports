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
var ApiUrl = "http://159.8.246.2/Client/Client.svc";
var currency = "INR";
function preventBack() { window.history.forward(); }  
  setTimeout("preventBack()", 0);  
  window.onunload = function () { null }; 
// let Hostname = window.location.hostname;
// if (Hostname.indexOf('usd') > -1) {
//     ApiUrl = "http://" +Hostname + "/Client/Client.svc";
// } else if (Hostname.indexOf('hkd') > -1) {
//     ApiUrl = "http://" + Hostname + "/Client/Client.svc";
// }
var app = angular.module("accountApp", ["ngCookies", "ngRoute"]);
app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        controller: "profileController",
        templateUrl: "accnt_view/profile.html",
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
  },
]);

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
    ApiUrl = "http://159.8.246.2/Client/Client.svc";
    $rootScope.currency = "USD";
  } else if ($rootScope.appType == 3) {
    ApiUrl = "http://159.8.246.2/Client/Client.svc";
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
        Token: authtoken,
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
        Token: authtoken,
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
  $scope.openChangePass = function () {
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
        Token: authtoken,
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
        Token: authtoken,
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
        Token: authtoken,
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
        Token: authtoken,
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
        Token: authtoken,
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
        Token: authtoken,
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
          Token: authtoken,
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
        Token: authtoken,
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
        Token: authtoken,
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
        Token: authtoken,
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
        Token: authtoken,
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

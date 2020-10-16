// var authtoken = $.cookie('authtoken');
var app = angular.module("accountApp", ["ngRoute", "ngCookies"]);
app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider

      .when("/", {
        // controller: 'homeAccountController',
        templateUrl: "homeAccount.html",
        data: {
          title: "AccountInfo",
        },
      })
      .when("/homeAccount", {
        controller: "homeAccountController",
        templateUrl: "homeAccount.html",
        data: {
          title: "AccountInfo",
        },
      })
      .when("/balance_Overview", {
        controller: "balance_OverviewController",
        templateUrl: "balance_Overview.html",
        data: {
          title: "Balance_Overview",
        },
      })

      .when("/accountStatement", {
        controller: "accountStatementController",
        templateUrl: "accountStatement.html",
        data: {
          title: "AccountStatement",
        },
      })

      .when("/casinoreport", {
        controller: "casinoreport",
        templateUrl: "casinoreport.html",
        data: {
          title: "casinoreport",
        },
      })

      // .when('/CasinoReport', {
      //      controller: 'CasinoReportController',
      //      templateUrl: 'CasinoReport.html',
      //      data: {
      //            title: 'AccountStatement'
      //         }
      //   })

      .when("/mybets", {
        controller: "myBetsController",
        templateUrl: "mybets.html",
        data: {
          title: "Mybets",
        },
      })
      .when("/betsHistory", {
        controller: "betsHistoryController",
        templateUrl: "betsHistory.html",
        data: {
          title: "BetsHistory",
        },
      })
      .when("/profitLoss", {
        controller: "profitLossController",
        templateUrl: "profitLoss.html",
        data: {
          title: "ProfitLoss",
        },
      })

      .when("/loghistory", {
        controller: "loginHistoryController",
        templateUrl: "activitylog.html",
        data: {
          title: "Activitylog",
        },
      });
    // .when('/changePassword',{
    //     controller:'changePasswordController',
    //     templateUrl:'changePassword.html'
    // })
  },
]);

function preventBack() {
  window.history.forward();
}
setTimeout("preventBack()", 0);
window.onunload = function () {
  null;
};

var authtoken = $.cookie("authtoken");
if (!authtoken) {
  window.location.href = "login.html";
}
var appType = $.cookie("appType");
if (!appType) {
  window.location.href = "login.html";
}
var ApiUrl = "http://159.8.246.2/Client/Client.svc";
var currency = "INR";

if (appType == 2) {
  ApiUrl = "http://159.8.246.2/Client/Client.svc";
  currency = "USD";
} else if (appType == 3) {
  ApiUrl = "http://159.8.246.2/Client/Client.svc";
  currency = "HKD";
}

app.controller("homeAccountController", function (
  $scope,
  $http,
  $cookieStore,
  $window,
  $routeParams,
  $rootScope,
  $interval
) {
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
    $rootScope.title = current.$$route.data.title;
  });

  $rootScope.currency = currency;
  $scope.userDescription = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
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
          $scope.name = response.data.data.name;
          $scope.uName = response.data.data.uName;
        }
      },
      function myError(error) {
        if (error.status == 401) {
          // $.removeCookie("authtoken");
          window.location.href = "login.html";
        }
      }
    );
  };
  $scope.userDescription();

  $scope.Fund = function (val) {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
    if (val == undefined) {
      $("#accountCredit").css("display", "none");
      $("#menuRefreshIcon").css("display", "block");
    }

    $http({
      url: ApiUrl + "/Data/FundExpo",

      method: "GET",

      headers: {
        Token: authtoken,
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
          // $.removeCookie("auth-token");
          window.location.href = "login.html";
        }
      }
    );
  };

  $scope.Fund();
  var fundsinterval;
  fundsinterval = $interval(function () {
    $scope.Fund("1");
  }, 15000);

  if (authtoken == undefined) {
    $interval.cancel(fundsinterval);
  }
  $scope.Openpopup = function () {
    $("#changePasswordModal").css("display", "block");
  };
  $scope.Closepopup = function () {
    $("#changePasswordModal").css("display", "none");
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
          //   $scope.unSubscribesubscribehomesignalr();
          // $.toast({
          //   heading: "success",
          //   text: response.data.result,
          //   position: "bottom-right",
          //   showHideTransition: "slide",
          //   icon: "success",
          // });
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

  $scope.ChangePwd = function () {
    if (
      $scope.NewPassword == "" ||
      $scope.NewPassword == null ||
      $scope.NewPassword == undefined
    ) {
      // $.toast({
      //   heading: "Error",
      //   text: "NewPassword can not be blank!",
      //   position: "bottom-right",
      //   showHideTransition: "slide",
      //   icon: "error",
      // });
      toastr.error("NewPassword can not be blank!");
      return false;
    }
    if (
      $scope.ConfirmPassword == "" ||
      $scope.ConfirmPassword == null ||
      $scope.ConfirmPassword == undefined
    ) {
      // $.toast({
      //   heading: "Error",
      //   text: "ConfirmPassword can not be blank!",
      //   position: "bottom-right",
      //   showHideTransition: "slide",
      //   icon: "error",
      // });
      toastr.error("ConfirmPassword can not be blank!");
      return false;
    }
    if ($scope.NewPassword != $scope.ConfirmPassword) {
      // $.toast({
      //   heading: "Error",
      //   text: "Password Dosn't match",
      //   position: "bottom-right",
      //   showHideTransition: "slide",
      //   icon: "error",
      // });
      toastr.error("Password Dosn't match");
      return false;
    }
    if (
      $scope.YourPassword == "" ||
      $scope.YourPassword == null ||
      $scope.YourPassword == undefined
    ) {
      // $.toast({
      //   heading: "Error",
      //   text: "Old Password can not be blank!",
      //   position: "bottom-right",
      //   showHideTransition: "slide",
      //   icon: "error",
      // });
      toastr.error("Old Password can not be blank!");
      return false;
    }
    $scope.data = {
      changeBy: $scope.uName,
      context: "web",
      newPwd: $scope.NewPassword,
      oldPwd: $scope.YourPassword,
    };

    $http({
      url: ApiUrl + "/ChangePwd",

      method: "POST",
      data: $scope.data,
      headers: {
        "Content-Type": "application/json",
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        if (response.data.status == "Success") {
          $("#changePasswordModal").css("display", "none");
          toastr.success(response.data.result);
          setTimeout(() => {
            $.removeCookie("authtoken");
            window.location.href = "login.html";
          }, 2000);
        } else {
          toastr.error(response.data.result);
          $("#changePasswordModal").css("display", "block");
        }
      },
      function myError(error) {
        if (error.status == 401) {
          // $.removeCookie("auth-token");
          window.location.href = "login.html";
        }
      }
    );
  };
});
app.controller("accountStatementController", function (
  $scope,
  $http,
  $cookieStore,
  $window,
  $routeParams
) {
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

  // $scope.loading=true
  $scope.statementType = "0";
  $scope.AccountStatement = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
    $("#loading").css("display", "inline-grid");
    // $scope.loading=true

    $scope.From_date = $("#startDate").val();
    $scope.To_date = $("#endDate").val();

    $http({
      url: ApiUrl + "/Reports/AccountStatement?from="+$scope.From_date+"&to="+$scope.To_date+"&filter="+$scope.statementType,
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
        // if (response.status==401) {
        //              $window.location.href = 'login.html';
        //          }
      }
    );
  };
  $scope.AccountStatement();
});

app.controller("CasinoReportController", function (
  $scope,
  $http,
  $cookieStore,
  $window,
  $routeParams
) {
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
        // console.log(response);
        $scope.CasinoReportData = response.data.data;
        $scope.loading = false;
        $("#loading").css("display", "none");
      },
      function myError(response) {
        // console.log(response);
        if (response.status == 401) {
          $window.location.href = "login.html";
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

app.controller("balance_OverviewController", function (
  $scope,
  $http,
  $cookieStore
) {
  $scope.Fund = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
    $http({
      url: ApiUrl + "/Data/FundExpo",

      method: "GET",

      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        // $scope.fundsdataList = response.data.data;
        $scope.availBal = response.data.data.availBal;
        $scope.exposure = response.data.data.exposure;
      },
      function myError(error) {
        if (error.status == 401) {
          // $.removeCookie("auth-token");
          window.location.href = "login.html";
        }
      }
    );
  };

  $scope.Fund();
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

  // $scope.loading=true
  $scope.statementType = "1";
  $scope.AccountStatement = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
    $("#loading").css("display", "inline-grid");

    $http({
      url: ApiUrl + "/Reports/AccountStatement?from="+$scope.fromdate+"&to="+$scope.todate+"&filter="+$scope.statementType,
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
        $("#loading").css("display", "none");
        // console.log(response);
        // if (response.status==401) {
        //              $window.location.href = 'login.html';
        //}
      }
    );
  };
  $scope.AccountStatement();
});

app.controller("myBetsController", function ($scope, $http, $cookieStore) {
  // var favoriteCookie = $cookieStore.get('Userdata');
  // $scope.loading=true

  $scope.betStatus = "All";

  $scope.getCurrentBets = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
    $("#loading").css("display", "inline-grid");
    // $scope.loading=true
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

        // $scope.loading=false
        $("#loading").css("display", "none");
      },
      function myError(response) {
        // console.log(response);
        // if (response.status==401) {
        //              $window.location.href = 'login.html';
        //          }
      }
    );
  };
  $scope.getCurrentBets();

  // $scope.betDetails=function(betId){
  //     if ($('#bet_'+betId).css('display')=='none') {
  //         $('#bet_'+betId).css('display','table-row')
  //     }
  //     else{
  //         $('#bet_'+betId).css('display','none')
  //     }
  // }

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
    // console.log(selectedAll)
    $scope.selectedAll = selectedAll;

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
      $.toast({
        heading: "Error",
        text: "Please select checkbox",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
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
          if (response.data.status == "Success") {
            $.toast({
              heading: "Success",
              text: response.data.result,
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "success",
            });
            $scope.selectedUnmatchedList = [];
            $scope.getCurrentBets();
            $scope.selectedAll = false;
          } else {
            $.toast({
              heading: "Error",
              text: response.data.result,
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "error",
            });
          }
        },
        function myError(response) {
          if (response.status == 401) {
            $window.location.href = "login.html";
          }
        }
      );
    });
  };
});
app.controller("betsHistoryController", function ($scope, $http, $cookieStore) {
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

  //  $scope.date = new Date();
  //  $scope.fromdate=$scope.date.getFullYear()+"-"+($scope.date.getMonth()+1)+"-"+$scope.date.getDate();
  //  $scope.todate=$scope.date.getFullYear()+"-"+($scope.date.getMonth()+1)+"-"+$scope.date.getDate();

  //  $scope.startTime="00:00:00";
  //  $scope.endTime=$scope.date.getHours()+":"+$scope.date.getMinutes()+":"+$scope.date.getSeconds();

  // $('#startDate').val($scope.fromdate);
  // $('#endDate').val($scope.todate);
  // $('#startTime').val($scope.startTime)
  // $('#endTime').val($scope.endTime)

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

      // $scope.startTime="00:00:00";
      // $scope.endTime=$scope.date.getHours()+":"+$scope.date.getMinutes()+":"+$scope.date.getSeconds();

      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
      // $('#startTime').val($scope.startTime)
      // $('#endTime').val($scope.endTime)
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

      // $scope.startTime="00:00:00";
      // $scope.endTime=$scope.date.getHours()+":"+$scope.date.getMinutes()+":"+$scope.date.getSeconds();

      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
      // $('#startTime').val($scope.startTime)
      // $('#endTime').val($scope.endTime)
    }

    $scope.getBetHistory();
  };

  $scope.getBetHistory = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
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
          $window.location.href = "login.html";
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
app.controller("profitLossController", function ($scope, $http, $cookieStore) {
  $scope.userDescription = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
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
        }
      },
      function myError(error) {
        if (error.status == 401) {
          //$.removeCookie("auth-token");
          window.location.href = "login.html";
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

  //  $scope.date = new Date();
  //  $scope.fromdate=$scope.date.getFullYear()+"-"+($scope.date.getMonth()+1)+"-"+$scope.date.getDate();
  //  $scope.todate=$scope.date.getFullYear()+"-"+($scope.date.getMonth()+1)+"-"+$scope.date.getDate();

  //  $scope.currentDate=$scope.date.getFullYear()+"-"+($scope.date.getMonth()+1)+"-"+$scope.date.getDate()+" "+$scope.date.getHours()+":"+$scope.date.getMinutes();

  //  $scope.startTime="00:00:00";
  //  $scope.endTime=$scope.date.getHours()+":"+$scope.date.getMinutes();

  // $('#startDate').val($scope.fromdate);
  // $('#endDate').val($scope.todate);
  // $('#startTime').val($scope.startTime)
  // $('#endTime').val($scope.endTime)

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

      // $scope.startTime="00:00:00";
      // $scope.endTime=$scope.date.getHours()+":"+$scope.date.getMinutes()+":"+$scope.date.getSeconds();

      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
      // $('#startTime').val($scope.startTime)
      // $('#endTime').val($scope.endTime)
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

      // $scope.startTime="00:00:00";
      // $scope.endTime=$scope.date.getHours()+":"+$scope.date.getMinutes()+":"+$scope.date.getSeconds();

      $("#startDate").val($scope.fromdate);
      $("#endDate").val($scope.todate);
      // $('#startTime').val($scope.startTime)
      // $('#endTime').val($scope.endTime)
    }

    $scope.getProfitLoss();
  };

  $scope.getProfitLoss = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
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
        if (response.status == 401) {
          $window.location.href = "login.html";
        }
      }
    );
  };
  $scope.getProfitLoss();

  $scope.betDetails = function (index) {
    if ($("#pnl_" + index).css("display") == "none") {
      $("#pnl_" + index).css("display", "table-row");
      $("#pl_" + index).removeAttr("class", "expand-close");
      $("#pl_" + index).attr("class", "expand-open");
    } else {
      $("#pnl_" + index).css("display", "none");
      $("#pl_" + index).removeAttr("class", "expand-open");
      $("#pl_" + index).attr("class", "expand-close");
    }
  };
});
app.controller("loginHistoryController", function (
  $scope,
  $http,
  $cookieStore
) {
  console.log("loginHistoryController");

  $scope.loading = true;
  $scope.getActivityLog = function () {
    if (authtoken == undefined) {
      window.location.href = "login.html";
      return false;
    }
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
        // if (response.status==401) {
        //              $window.location.href = 'login.html';
        //          }
      }
    );
  };
  $scope.getActivityLog();
});

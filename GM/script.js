var app = angular.module("globalManagementApp", [
  "ngTable",
  "ngRoute",
  "ngCookies",
]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "importMarketController",
      templateUrl: "importMarket.html",
    })
    .when("/importMarket", {
      controller: "importMarketController",
      templateUrl: "importMarket.html",
    })
    .when("/fancysettle", {
      controller: "fancysettleController",
      templateUrl: "fancysettle.html",
    })
    .when("/booksettle", {
      controller: "BMSettleController",
      templateUrl: "bookmaking.html",
    })

    .when("/BFmanagment", {
      controller: "BFmanagmentController",
      templateUrl: "data.html",
    })
    .when("/bf_subcribed_mktlist", {
      controller: "BFsubcribedmktlistController",
      templateUrl: "subcribed_mktlist.html",
    })
    .when("/Matchdetail", {
      controller: "MatchdetailController",
      templateUrl: "matchdetails.html",
    })
    .when("/marketResult", {
      controller: "marketResultController",
      templateUrl: "market-result.html",
    })
    .when("/teenpattilist", {
      controller: "teenpattilistController",
      templateUrl: "teenpattilist.html",
    });
});
app.filter("replace", [
  function () {
    return function (input, from, to) {
      if (input === undefined) {
        return;
      }
      var regex = new RegExp(from, "g");
      return input.replace(regex, to);
    };
  },
]);

const siteNameArr = [
  {
    siteName: "FunSports",
    siteFilter: "both",
  },
  {
    siteName: "USDFunSports",
    siteFilter: "both",
  },
  {
    siteName: "HKDFunSports",
    siteFilter: "both",
  },
  {
    siteName: "FunSportsonline",
    siteFilter: "both",
  },
];

var token = "";

app.controller("mainController", function (
  $scope,
  $http,
  NgTableParams,
  $location,
  $rootScope,
  $cookies
) {
  $rootScope.token = $cookies.get("cramp");
  if ($rootScope.token) {
    $rootScope.token = JSON.parse($cookies.get("cramp"));
  } else {
    window.location.href = "login.html";
  }

  token = $rootScope.token;

  $scope.Logout = function () {
    $cookies.remove("cramp");
    window.location.href = "login.html";
  };

  $rootScope.$on("$locationChangeSuccess", function () {
    if (
      $location.path().split("/").indexOf("dataServices") > -1 ||
      $location.path().split("/").indexOf("fancysettle") > -1 ||
      $location.path().split("/").indexOf("booksettle") > -1 ||
      $location.path().split("/").indexOf("BFmanagment") > -1 ||
      $location.path().split("/").indexOf("bf_subcribed_mktlist") > -1 ||
      $location.path().split("/").indexOf("Matchdetail") > -1 ||
      $location.path().split("/").indexOf("FancyMapping") > -1 ||
      $location.path().split("/").indexOf("LiveTvInt") > -1 ||
      $location.path().split("/").indexOf("marketResult") > -1 ||
      $location.path().split("/").indexOf("scoremapping") > -1 ||
      $location.path().split("/").indexOf("teenpattilist") > -1
    ) {
      $scope.showSiteChk = false;
    } else {
      $scope.showSiteChk = true;
    }
  });
  $scope.siteNameArr = siteNameArr;

  $scope.settleFancy = function (fancyName) {
    $scope.fancyName = fancyName;
    $("#settleFancyModal").modal("show");
  };
  $scope.updateStatus = function (status) {
    $scope.fancyActive = !$scope.fancyActive;
  };
  $scope.selectSite = function (siteName) {
    // console.log(siteName)
  };

  $scope.saveall = function () {
    $scope.saveLiveTvFunSports();
  };

  $scope.changepassword = function () {
    if (
      $scope.NewPassword == "" ||
      $scope.NewPassword == null ||
      $scope.NewPassword == undefined
    ) {
      $.toast({
        heading: "Error",
        text: "NewPassword can not be blank!",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    if (
      $scope.ConfirmPassword == "" ||
      $scope.ConfirmPassword == null ||
      $scope.ConfirmPassword == undefined
    ) {
      $.toast({
        heading: "Error",
        text: "ConfirmPassword can not be blank!",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    if ($scope.NewPassword != $scope.ConfirmPassword) {
      $.toast({
        heading: "Error",
        text: "Password Dosn't match",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    if (
      $scope.YourPassword == "" ||
      $scope.YourPassword == null ||
      $scope.YourPassword == undefined
    ) {
      $.toast({
        heading: "Error",
        text: "Old Password can not be blank!",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    $scope.data = {
      context: "web",
      newPwd: $scope.NewPassword,
      oldPwd: $scope.YourPassword,
    };
    $http({
      url: "http://159.8.244.50/DataSource/DataSource.svc/ChangePassword",
      method: "POST",
      headers: {
        Token: token,
      },
      data: $scope.data,
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
          $("#Changepwd").modal("hide");
          $scope.Logout();
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            showHideTransition: "fade",
            icon: "Error",
          });
        }
      },
      function myError(response) {
        console.log(response);
        if (response.status == 401) {
          $window.location.href = "login.html";
        }
      }
    );
  };

  $scope.saveLiveTvFunSports = function () {
    // console.log(channelno)

    if ($scope.Hdmi != undefined && $scope.Channelip != undefined) {
      var data = {
        channelIp: $scope.Channelip,
        channelNo: $scope.Channelno,
        hdmi: $scope.Hdmi,
        link: "",
        matchId: $scope.Matchid,
        program: "p1",
        type: 1,
      };
    } else if ($scope.Hdmi == undefined && $scope.Channelip != undefined) {
      var data = {
        channelIp: "",
        channelNo: $scope.Channelno,
        hdmi: "",
        link: $scope.Channelip,
        matchId: $scope.Matchid,
        program: "p1",
        type: 2,
      };
    } else if ($scope.Channelip == undefined) {
      var data = {
        channelIp: "",
        channelNo: $scope.Channelno,
        hdmi: "",
        link: $scope.Hdmi,
        matchId: $scope.Matchid,
        program: "p1",
        type: 3,
      };
    }

    $http({
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/UpdateLiveTV",
      method: "POST",
      headers: {
        Token: token,
      },
      data: data,
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",

            text: response.data.result,

            showHideTransition: "slide",

            icon: "success",
          });
        } else {
          $.toast({
            heading: "Error",

            text: response.data.result,

            showHideTransition: "fade",

            icon: "Error",
          });
        }
      },
      function myError(response) {
        console.log(response);
        if (response.status == 401) {
          $window.location.href = "login.html";
        }
      }
    );
  };
});
var checkedCount;
var importCallCount;
app.controller("importMarketController", function (
  $scope,
  $http,
  NgTableParams,
  $timeout
) {
  $scope.Sportslist=[
    {name:'Cricket',bfid:'4'},
    {name:'Tennis',bfid:'2'},
    {name:'Soccer',bfid:'1'}
  ]
  $scope.filter = { Sportname: "", matchName: "", matchDate: "" };
  $scope.selectsport = function (val) {
    console.log(val);
    if (val == null) {
      $scope.matchid = null;
      $scope.filter.Sportname = "";
    } else {
      $scope.filter.Sportname = val.name;
      console.log(val);
    }
  };
  $scope.selectMatch = function (val) {
    if (val == null || val == "") {
      $scope.filter.matchName = "";
    } else {
      $scope.filter.matchName = val;
    }
    console.log(val);
  };
  $scope.selectDate = function (val) {
    if (val == null || val == "") {
      $scope.filter.matchDate = "";
      $scope.tableParams.reload();
    } else {
      $scope.filter.matchDate = val;
    }
    console.log(val);
  };
  $scope.clearInput = function () {
    $scope.filter.MatchName = "";
  };
  $scope.GetMarketDataNew = function () {
    $scope.marketDataPending = true;
    $http({
      method: "GET",
      url:
        "http://www.funsports.win/Main/Admin.svc/SportsData/GetMarketCtlgNew",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.marketDataPending = false;
        $scope.getmarketdatanew = response.data.data;
        $scope.Matchwisedata = $scope.Matchwisedata(response.data.data);
        $scope.tableParams = new NgTableParams(
          {
            page: 1,
            count: 10,
            filter: $scope.filter,
          },
          {
            dataset: $scope.Matchwisedata,
            total: $scope.Matchwisedata.length,
          }
        );
        $scope.$watch("Sportslist", () => {
          $timeout(
            () => {
              $(".chosen-select").trigger("chosen:updated");
            },
            0,
            false
          );
        });
        $timeout(
          () => {
            $(".chosen-select").chosen();
          },
          0,
          false
        );
        $("#Match-search").typeahead({
          source: {
            data: $scope.Matchwisedata,
          },
          callback: {
            onClick: function (node, a, item, event) {
              $scope.selectFancy(item.display);
              $scope.tableParams.reload();
            },
            onSubmit: function (node, form, item, event) {
              event.preventDefault();
            },
          },
        });
        console.log($scope.Matchwisedata)
        console.log("marketdata", response.data.data);
      },
      function myError(response) {
        $scope.marketDataPending = false;
        console.log("marketdata", response);
      }
    );
  };

  $scope.Matchwisedata = function () {
    var highlightdata = [];
    angular.forEach($scope.getmarketdatanew, function (item, index) {
      angular.forEach(item.tournaments, function (item1, index1) {
        angular.forEach(item1.matches, function (item2, index2) {
          item2["TourbfId"] = item1.id;
          item2["SportbfId"] = item.id;
          item2["matchId"] = item2.id;
          item2["Tourname"] = item1.name;
          item2["Sportname"] = item.name;
          item2["matchName"] = item2.name;
          item2["matchDate"] = item2.startDate;
          highlightdata.push(item2);
        });
      });
    });
    return highlightdata;
  };

  $scope.SaveMatchDetails = function (
    Matchdates,
    MatchId,
    Matchname,
    MarketId
  ) {
    $scope.MATCHdata = {
      matchDate: Matchdates,
      matchId: MatchId,
      matchname: Matchname,
      mktId: MarketId,
    };
    $http({
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/SaveMatchDetails",
      method: "POST",
      data: $scope.MATCHdata,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(error) {
        if (error.status == 400) {
          $.toast({
            heading: "Error",
            text: "Please Enter Proper Data",
            showHideTransition: "slide",
            icon: "error",
          });
          return false;
        }
      }
    );
  };

  $scope.GetMarketDataNew();

  $scope.beforeInplayLt = 1;
  $scope.betDelay = 5;
  $scope.chkVol = 0;
  $scope.umAllowed = 0;
  $scope.maxLoss = 0;
  $scope.maxProfit = 0;
  $scope.maxRate = 100;
  $scope.maxStake = 100000;
  $scope.minRate = 1.01;
  $scope.minStake = 500;
  $scope.volInto = 1;
  $scope.matchSettings = {
    beforeInplayLimit: $scope.beforeInplayLt,
    betDelay: $scope.betDelay,
    isCheckVolume: $scope.chkVol,
    isUnMatchedAllowed: $scope.umAllowed,
    maxLoss: $scope.maxLoss,
    maxProfit: $scope.maxProfit,
    maxRate: $scope.maxRate,
    maxStake: $scope.maxStake,
    minRate: $scope.minRate,
    minStake: $scope.minStake,
    volumeMultiplier: $scope.volInto,
  };
  var marketInfo;
  var marketInfoOther;
  $scope.openImportMarketModal = function (
    sportId,
    sportName,
    tournamentId,
    tournamentName,
    matchId,
    matchName,
    marketId,
    marketName,
    matchStartDate
  ) {
    checkedCount = 0;
    importCallCount = 0;

    marketInfoOther = {
      marketId: marketId,
      marketName: marketName,
      matchDate: matchStartDate,
      matchId: matchId,
      matchName: matchName,
      settings: {},
      sportId: sportId,
      sportName: sportName,
      tournamentId: tournamentId,
      tournamentName: tournamentName,
    };
    $scope.modalTitle =
      sportName +
      " > " +
      tournamentName +
      " > " +
      matchName +
      " > " +
      marketName +
      " [" +
      matchStartDate +
      "]";
    $scope.marketid = marketId;
    if (
      document.getElementById("FunSports").checked ||
      document.getElementById("USDFunSports").checked ||
      document.getElementById("HKDFunSports").checked ||
      document.getElementById("FunSportsonline").checked
    ) {
      $('#marketList [data-dismiss="modal"]').click();
      $("#noSettingsModal").modal("show");
    } else {
      $.toast({
        heading: "Error",
        text: "Please select atlease one site",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
    }
  };

  $scope.importmarketlist=function(Matchdata){
    $scope.marketsList=Matchdata;
    console.log($scope.marketsList);
    checkedCount = 0;
    importCallCount = 0;
    if (
      document.getElementById("FunSports").checked ||
      document.getElementById("USDFunSports").checked ||
      document.getElementById("HKDFunSports").checked ||
      document.getElementById("FunSportsonline").checked
    ) {
      $("#marketList").modal("show");
    } else {
      $.toast({
        heading: "Error",
        text: "Please select atlease one site",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
    }
  }

  $scope.importMarket = function () {
    importCallCount = 0;
    if (document.getElementById("FunSports").checked) {
      var finalMktInfo = JSON.stringify(marketInfoOther);
      $scope.importMarketFunSports(finalMktInfo);
    }
    if (document.getElementById("FunSportsonline").checked) {
      var finalMktInfo = JSON.stringify(marketInfoOther);
      $scope.importMarketFunSportsOL(finalMktInfo);
    }
    if (document.getElementById("USDFunSports").checked) {
      var finalMktInfo = JSON.stringify(marketInfoOther);
      $scope.importMarketUSDFunSports(finalMktInfo);
    }
    if (document.getElementById("HKDFunSports").checked) {
      var finalMktInfo = JSON.stringify(marketInfoOther);
      $scope.importMarketHKDFunSports(finalMktInfo);
    }
  };

  $scope.importMarketFunSports = function (marketInfo) {
    $http({
      method: "POST",
      url: "http://www.funsports.win/Main/Admin.svc/SportsData/ImportMarketNew",
      data: marketInfo,
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          importCallCount = importCallCount + 1;
          if (response.data.hubAddress != null) {
            if (importCallCount == 1) {
              $scope.HubAddress(
                response.data.hubAddress,
                response.data.description.result
              );
            }
          } else {
            $scope.importMarketCalls = true;
            $.toast({
              heading: "Success",
              text: response.data.description.result,
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "success",
            });
            $("#noSettingsModal").modal("hide");
          }
        } else {
          $.toast({
            heading: "Error",
            text: response.data.description.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(response) {
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.importMarketUSDFunSports = function (marketInfo) {
    $http({
      method: "POST",
      url: "http://159.8.244.61/AdminU/Admin.svc/SportsData/ImportMarketNew",
      data: marketInfo,
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          importCallCount = importCallCount + 1;
          if (response.data.hubAddress != null) {
            if (importCallCount == 1) {
              $scope.HubAddress(
                response.data.hubAddress,
                response.data.description.result
              );
            }
          } else {
            $scope.importMarketCalls = true;
            $.toast({
              heading: "Success",
              text: response.data.description.result,
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "success",
            });
            $("#noSettingsModal").modal("hide");
          }
        } else {
          $.toast({
            heading: "Error",
            text: response.data.description.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(response) {
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.importMarketHKDFunSports = function (marketInfo) {
    $http({
      method: "POST",
      url: "http://159.8.244.61/AdminH/Admin.svc/SportsData/ImportMarketNew",
      data: marketInfo,
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          importCallCount = importCallCount + 1;
          if (response.data.hubAddress != null) {
            if (importCallCount == 1) {
              $scope.HubAddress(
                response.data.hubAddress,
                response.data.description.result
              );
            }
          } else {
            $scope.importMarketCalls = true;
            $.toast({
              heading: "Success",
              text: response.data.description.result,
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "success",
            });
            $("#noSettingsModal").modal("hide");
          }
        } else {
          $.toast({
            heading: "Error",
            text: response.data.description.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(response) {
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.importMarketFunSportsOL = function (marketInfo) {
    $http({
      method: "POST",
      url: "http://159.8.246.2/Admin/Admin.svc/SportsData/ImportMarketNew",
      data: marketInfo,
    }).then(
      function mySuccess(response) {
        if (response.data.description.status == "Success") {
          importCallCount = importCallCount + 1;
          if (response.data.hubAddress != null) {
            if (importCallCount == 1) {
              $scope.HubAddress(
                response.data.hubAddress,
                response.data.description.result
              );
            }
          } else {
            $scope.importMarketCalls = true;
            $.toast({
              heading: "Success",
              text: response.data.description.result,
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "success",
            });
            $("#noSettingsModal").modal("hide");
          }
        } else {
          $.toast({
            heading: "Error",
            text: response.data.description.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(response) {
        if (response.status == 401) {
          clear();
        }
      }
    );
  };

  $scope.HubAddress = function (ipAddress, response) {
    var connection;
    connection = $.hubConnection(ipAddress);
    var proxy = connection.createHubProxy("RunnersHub");
    connection
      .start()
      .done(function () {
        console.log("Connection Established");
        var invok = proxy.invoke("SubscribeMarket", $scope.marketid).Result;
      })
      .fail(function () {
        console.log("Could not connect");
      });
    proxy.on("BroadcastSubscribedData", function (feed) {
      console.log(feed);
      connection.stop();
      $scope.importMarketCalls = true;
      $.toast({
        heading: "Success",
        text: response,
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "success",
      });
      $("#noSettingsModal").modal("hide");
      $("#matchSettingsModal").modal("hide");
    });
  };
});

function showToast(toastType, toastMsg) {
  if (toastType == "Success") {
    $.toast({
      heading: "Success",
      text: toastMsg,
      position: "bottom-right",
      showHideTransition: "slide",
      icon: "success",
    });
  } else {
    $.toast({
      heading: "Error",
      text: toastMsg,
      position: "bottom-right",
      showHideTransition: "slide",
      icon: "error",
    });
  }
}

app.controller("fancysettleController", function (
  $scope,
  $http,
  NgTableParams,
  $timeout,
  $filter,
  $location,
  $rootScope
) {
  $scope.ApplicationTab = function (sitename) {
    $scope.sitename = sitename;
    // $scope.matchnamearray = [];
    // $scope.tournamearray=[];
    // $scope.tournamentstr=[];
    // $scope.matchstring = [];
    if (sitename == "FunSports") {
      if ($scope.Settled == true) {
        $scope.settle = 1;
      } else {
        $scope.settle = 0;
      }
      $scope.apilink =
        "http://www.funsports.win/Main/Admin.svc/Fancy/GetFancyList2?sportid=4&tourid=0&matchid=0&status=1&isettled=" +
        $scope.settle;
      $scope.GetFancyList2($scope.apilink);
    }
    if (sitename == "USDFunSports") {
      if ($scope.Settled == true) {
        $scope.settle = 1;
      } else {
        $scope.settle = 0;
      }
      $scope.apilink =
        "http://159.8.244.61/AdminU/Admin.svc/Fancy/GetFancyList2?sportid=4&tourid=0&matchid=0&status=1&isettled=" +
        $scope.settle;
      $scope.GetFancyList2($scope.apilink);
    }
    if (sitename == "HKDFunSports") {
      if ($scope.Settled == true) {
        $scope.settle = 1;
      } else {
        $scope.settle = 0;
      }
      $scope.apilink =
        "http://159.8.244.61/AdminH/Admin.svc/Fancy/GetFancyList2?sportid=4&tourid=0&matchid=0&status=1&isettled=" +
        $scope.settle;
      $scope.GetFancyList2($scope.apilink);
    }
    if (sitename == "FunSportsonline") {
      if ($scope.Settled == true) {
        $scope.settle = 1;
      } else {
        $scope.settle = 0;
      }
      $scope.apilink =
        "http://159.8.246.2/Admin/Admin.svc/Fancy/GetFancyList2?sportid=4&tourid=0&matchid=0&status=1&isettled=" +
        $scope.settle;
      $scope.GetFancyList2($scope.apilink);
    }
  };
  $scope.Matchname = "";
  $scope.matchnamearray = [];
  $scope.fancyNameIdArray = [];
  $scope.matchNameIdArray = [];
  $scope.tournamearray = [];
  $scope.tournamentstr = [];
  $scope.matchstring = [];

  $scope.filter = { matchName: "", fancyName: "", matchDate: "" };

  $scope.fancyList = [];
  $scope.GetFancyList2 = function (API) {
    // $scope.Matchname = "";

    $(".ajax_loader.hidden").css("visibility", "visible");
    $http({
      method: "GET",
      url: API,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // $scope.Matchname = "1";
        $(".ajax_loader.hidden").css("visibility", "hidden");
        $scope.fancyList = response.data.fancyList;
        $scope.fancyList = $scope.fancyList.reverse();
        $scope.tableParams = new NgTableParams(
          {
            page: 1,
            count: 200,
            filter: $scope.filter,
          },
          {
            dataset: $scope.fancyList,
            total: $scope.fancyList.length,
          }
        );
        angular.forEach(response.data.fancyList, function (item) {
          $scope.fancyNameIdArray.push(item.fancyName);
          if ($scope.matchnamearray.indexOf(item.matchName) == -1) {
            $scope.matchnamearray.push(item.matchName);
            $scope.matchNameIdArray.push({
              name: item.matchName,
              matchId: item.matchId,
            });
          } else {
            angular.forEach($scope.matchNameIdArray, function (item1) {
              if (item1.name == item.matchName) {
                item1.matchId = item.matchId;
              }
              if ($scope.Matchname == item.matchName) {
                $scope.matchid = item.matchId;
              }
            });
          }
        });

        $scope.$watch("matchNameIdArray", () => {
          $timeout(
            () => {
              $(".chosen-select").trigger("chosen:updated");
            },
            0,
            false
          );
        });
        $timeout(
          () => {
            $(".chosen-select").chosen();
          },
          0,
          false
        );

        $("#fancy-search").typeahead({
          source: {
            data: $scope.fancyNameIdArray,
          },
          callback: {
            onClick: function (node, a, item, event) {
              $scope.selectFancy(item.display);
              $scope.tableParams.reload();
            },
            onSubmit: function (node, form, item, event) {
              event.preventDefault();
            },
          },
        });
        // console.log($scope.matchdatearray)
        // console.log($scope.matchstring)
      },
      function myError(response) {
        $(".ajax_loader.hidden").css("visibility", "hidden");
        console.log(response);
      }
    );
  };
  $scope.selectoption = function (val) {
    console.log(val);
    if (val == null) {
      $scope.matchid = null;
      $scope.filter.matchName = "";
    } else {
      $scope.matchid = val.matchId;
      $scope.filter.matchName = val.name;
    }
  };
  $scope.selectFancy = function (val) {
    if (val == null || val == "") {
      $scope.filter.fancyName = "";
    } else {
      $scope.filter.fancyName = val;
    }
    console.log(val);
  };
  $scope.selectDate = function (val) {
    if (val == null || val == "") {
      $scope.filter.matchDate = "";
      $scope.tableParams.reload();
    } else {
      $scope.filter.matchDate = val;
    }
    console.log(val);
  };
  $scope.clearInput = function () {
    $scope.filter.fancyName = "";
  };
  $scope.ApplicationTab("FunSports");
  $scope.UpdateFancyStatus2 = function (fancy, id, val, name) {
    if (name == "FunSports") {
      $scope.UpdateFancyStatuslink =
        "http://www.funsports.win/Main/Admin.svc/Fancy/UpdateFancyStatus2?id=" +
        id +
        "&status=" +
        val;
    }
    if (name == "USDFunSports") {
      $scope.UpdateFancyStatuslink =
        "http://159.8.244.61/AdminU/Admin.svc/Fancy/UpdateFancyStatus2?id=" +
        id +
        "&status=" +
        val;
    }
    if (name == "HKDFunSports") {
      $scope.UpdateFancyStatuslink =
        "http://159.8.244.61/AdminH/Admin.svc/Fancy/UpdateFancyStatus2?id=" +
        id +
        "&status=" +
        val;
    }
    if (name == "FunSportsonline") {
      $scope.UpdateFancyStatuslink =
        "http://159.8.246.2/Admin/Admin.svc/Fancy/UpdateFancyStatus2?id=" +
        id +
        "&status=" +
        val;
    }

    // console.log($scope.UpdateFancyStatuslink)
    $http({
      method: "POST",
      url: $scope.UpdateFancyStatuslink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          // $scope.ApplicationTab(name);
          fancy.isActive = val;
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
  $scope.UpdateFancyBetStatus2 = function (fancy, id, val, name) {
    if (name == "FunSports") {
      $scope.UpdateFancyStatuslink =
        "http://www.funsports.win/Main/Admin.svc/Fancy/UpdateFancyBetStatus2?id=" +
        id +
        "&status=" +
        val;
    }
    if (name == "USDFunSports") {
      $scope.UpdateFancyStatuslink =
        "http://159.8.244.61/AdminU/Admin.svc/Fancy/UpdateFancyBetStatus2?id=" +
        id +
        "&status=" +
        val;
    }
    if (name == "HKDFunSports") {
      $scope.UpdateFancyStatuslink =
        "http://159.8.244.61/AdminH/Admin.svc/Fancy/UpdateFancyBetStatus2?id=" +
        id +
        "&status=" +
        val;
    }
    if (name == "FunSportsonline") {
      $scope.UpdateFancyStatuslink =
        "http://159.8.246.2/Admin/Admin.svc/Fancy/UpdateFancyBetStatus2?id=" +
        id +
        "&status=" +
        val;
    }

    // console.log($scope.UpdateFancyStatuslink)
    $http({
      method: "POST",
      url: $scope.UpdateFancyStatuslink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          // $scope.ApplicationTab(name);
          fancy.isBetAllow = val;
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
  $scope.SettleFancymodal = function (betname, fancycode, mtid, applname) {
    $scope.settleRate = "";
    $scope.fancyname = betname;
    $scope.Fancycod = fancycode;
    $scope.matchid = mtid;
    $scope.appname = applname;
  };

  $scope.CancelFancyAlert = function (betName, fancyCode, matchid, sitename) {
    $scope.fname = betName;
    $scope.fid = fancyCode;
    $scope.matchid = matchid;
    $scope.website = sitename;
    $scope.Password = null;
    // console.log(matchid,fancyCode,sitename,betName)
    // bootbox.alert("Are you sure, you want to cancel fancy?");

    bootbox.dialog({
      message: "Are you sure, you want to cancel fancy Bets?",

      buttons: {
        main: {
          label: "Yes",
          className: "btn btn-success btn-sm cancelFancy",
        },
        main2: {
          label: "No",
          className: "btn btn-danger btn-sm",
        },
      },
    });
    // $scope.password;
    $(".cancelFancy").click(function () {
      // $scope.Password = "";
      $("#cancelFancyModal").modal("show");
      $scope.cancelFancyValues($scope.fid, $scope.matchid, $scope.website);
    });
  };

  $scope.CancelFancyAllSiteAlert = function () {
    // $scope.fname = betName;
    // $scope.fid = fancyCode;
    // $scope.matchid = matchid;
    // $scope.website = sitename;
    // console.log(matchid,fancyCode,sitename,betName)
    // bootbox.alert("Are you sure, you want to cancel fancy?");

    bootbox.dialog({
      message: "Are you sure, you want to cancel fancy without Bets?",

      buttons: {
        main: {
          label: "Yes",
          className: "btn btn-success btn-sm cancelFancy",
        },
        main2: {
          label: "No",
          className: "btn btn-danger btn-sm",
        },
      },
    });
    // $scope.password;
    $(".cancelFancy").click(function () {
      // $scope.Password = "";
      $("#cancelFancywithoutbetModal").modal("show");
      $scope.cancelFancyValues($scope.fid, $scope.matchid, $scope.website);
    });
  };

  var modalid = document.getElementById("cancelFancyModal");

  modalid.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      //checks whether the pressed key is "Enter"
      $scope.cancelFancy();
    }
  });

  $scope.fid;
  $scope.matchid;
  $scope.website;

  $scope.cancelFancyValues = function (fid, matchid, website) {
    // console.log(Fancycod,matchid,appname)
    fid = fid;
    matchid = matchid;
    website = website;
  };

  $scope.UpdFancyBetStatusAllSites = function (fancy, match, betname, status) {
    $http({
      method: "POST",
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/UpdFancyBetStatusAllSites?mtname=" +
        match +
        "&fname=" +
        betname +
        "&status=" +
        status,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          fancy.isBetAllow = status;
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.UpdFancyStatusAllSites = function (fancy, match, betname, status) {
    $http({
      method: "POST",
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/UpdFancyStatusAllSites?mtname=" +
        match +
        "&fname=" +
        betname +
        "&status=" +
        status,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          fancy.isActive = status;
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.CancelFancyAllSites = function () {
    if ($scope.Password == "" || $scope.Password == null) {
      showToast("Error", "Please Enter password");
      return false;
    }
    var password = $scope.Password;

    if (password == "Wipe2019") {
      console.log("Success");
      $("#cancelFancywithoutbetModal").modal("hide");
      $http({
        method: "POST",
        url:
          "http://159.8.244.50/ApplicationManagement/ManagementService.svc/CancelFancyAllSites",
        headers: {
          Token: token,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response)
          if (response.data.status == "Success") {
            showToast("Success", response.data.result);
            // fancy.isActive = status;
          } else {
            showToast("Error", response.data.result);
          }
        },
        function myError(response) {
          console.log(response);
        }
      );
    } else {
      alert("Wrong password!!");
    }
  };

  $scope.cancelFancy = function () {
    if ($scope.Password == "" || $scope.Password == null) {
      showToast("Error", "Please Enter password");
      return false;
    }
    var password = $scope.Password;
    // console.log(password)
    console.log($scope.fid, $scope.matchid, $scope.website);

    if ($scope.website == "FunSports") {
      $scope.apilink =
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/CancelFunSportFancy?mtid=" +
        $scope.matchid +
        "&fid=" +
        $scope.fid;
    }
    if ($scope.website == "USDFunSports") {
      $scope.apilink =
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/CancelFunSportFancy?mtid=" +
        $scope.matchid +
        "&fid=" +
        $scope.fid;
    }
    if ($scope.website == "HKDFunSports") {
      $scope.apilink =
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/CancelFunSportFancy?mtid=" +
        $scope.matchid +
        "&fid=" +
        $scope.fid;
    }

    if (password == "Wipe2019") {
      // console.log($scope.apilink)
      $(".ajax_loader.hidden").css("visibility", "visible");
      $http({
        method: "POST",
        url: $scope.apilink,
        headers: {
          Token: token,
        },
      }).then(
        function mySuccess(response) {
          // console.log(response)
          $(".ajax_loader.hidden").css("visibility", "hidden");
          if (response.data.status == "Success") {
            showToast("Success", response.data.result);
          } else {
            showToast("Error", response.data.result);
          }
          $("#cancelFancyModal").modal("hide");
          $scope.ApplicationTab($scope.website);
          $scope.Password = "";
        },
        function myError(response) {
          $(".ajax_loader.hidden").css("visibility", "hidden");
          console.log(response);
        }
      );
    } else {
      alert("Wrong password!!");
      // $scope.Password = "";
    }
    // $scope.Password = "";
  };
  $scope.SettleFancy2 = function (name) {
    if ($scope.settleRate == "" || $scope.settleRate == null) {
      showToast("Error", "Please Enter Rate");
      return false;
    }
    if (name == "FunSports") {
      $scope.apilink =
        "http://www.funsports.win/Main/Admin.svc/Fancy/SettleFancy2?mid=" +
        $scope.matchid +
        "&fid=" +
        $scope.Fancycod +
        "&s=" +
        $scope.settleRate;
    }
    if (name == "USDFunSports") {
      $scope.apilink =
        "http://159.8.244.61/AdminU/Admin.svc/Fancy/SettleFancy2?mid=" +
        $scope.matchid +
        "&fid=" +
        $scope.Fancycod +
        "&s=" +
        $scope.settleRate;
    }
    if (name == "HKDFunSports") {
      $scope.apilink =
        "http://159.8.244.61/AdminH/Admin.svc/Fancy/SettleFancy2?mid=" +
        $scope.matchid +
        "&fid=" +
        $scope.Fancycod +
        "&s=" +
        $scope.settleRate;
    }
    if (name == "FunSportsonline") {
      $scope.apilink =
        "http://159.8.246.2/Admin/Admin.svc/Fancy/SettleFancy2?mid=" +
        $scope.matchid +
        "&fid=" +
        $scope.Fancycod +
        "&s=" +
        $scope.settleRate;
    }

    $(".ajax_loader.hidden").css("visibility", "visible");
    console.log($scope.apilink);
    $http({
      method: "POST",
      url: $scope.apilink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          $(".ajax_loader.hidden").css("visibility", "hidden");
          $('#settle-sessin-modal [data-dismiss="modal"]').click();
          showToast("Success", response.data.result);
          $scope.ApplicationTab(name);
        } else {
          showToast("Error", response.data.result);
          $(".ajax_loader.hidden").css("visibility", "hidden");
        }
      },
      function myError(response) {
        $(".ajax_loader.hidden").css("visibility", "hidden");
        console.log(response);
      }
    );
  };

  $scope.getFancyWithBets = function () {
    $scope.fancyWithBets = [];
    if (!$scope.matchid) {
      showToast("Error", "Please select match in match list.");
      return false;
    }

    if ($scope.sitename == "FunSports") {
      $scope.apilink =
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/FancyWithBets?mtid=" +
        $scope.matchid;
    }
    if ($scope.sitename == "USDFunSports") {
      $scope.apilink =
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/FancyWithBets?mtid=" +
        $scope.matchid;
    }
    if ($scope.sitename == "HKDFunSports") {
      $scope.apilink =
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/FancyWithBets?mtid=" +
        $scope.matchid;
    }

    $http({
      method: "GET",
      url: $scope.apilink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.fancyWithBets = response.data.data;

        $("#fancyWithModal").modal("show");
      },
      function myError(response) {
        $(".ajax_loader.hidden").css("visibility", "hidden");
        console.log(response);
      }
    );
  };
});

app.controller("teenpattilistController", function (
  $scope,
  $http,
  NgTableParams,
  $location,
  $rootScope
) {
  $scope.gametypes = [
    {
      "20-20 Teenpatti": 1,
    },
    {
      "1 Day Teenpatti": 2,
    },
  ];
  $rootScope.TPsites = [
    {
      siteName: "FunSports",
      // apilink: 'http://adm.thegodexch.com/Main/BetAdm.svc',
      apilink: "http://45.76.155.250/DiamondTeenpatti/TeenpattiData.svc",
      tebname: "GOD",
      type: 1,
    },
  ];

  $scope.Gametype = "0";
  $scope.selectStatus = "1";

  $scope.pending_GetGameList = false;
  $scope.GetGameList = function (index) {
    if (index == undefined) {
      index = 0;
    }
    if ($scope.Gametype == undefined) {
      $scope.Gametype = "0";
    }
    if ($scope.selectStatus == undefined) {
      $scope.selectStatus = "0";
    }
    $scope.selectedindex = index;
    $scope.selectedsite = $rootScope.TPsites[index].siteName;
    if ($scope.pending_GetGameList == true) return false;
    $scope.pending_GetGameList = true;
    $(".ajax_loader.hidden").css("visibility", "visible");

    if ($rootScope.TPsites[index].type == 0) {
      var URL =
        $rootScope.TPsites[index].apilink +
        "/GameManagement/GetGameList2?gametype=" +
        $scope.Gametype +
        "&betstatus=" +
        $scope.selectStatus;
    } else {
      var URL =
        $rootScope.TPsites[index].apilink +
        "/GetGameList?gametype=" +
        $scope.Gametype;
    }
    $http({
      url: URL,
      method: "GET",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.pending_GetGameList = false;

        // console.log(response.data.data)
        $scope.gamelist = response.data.data;
        $scope.tableParams = new NgTableParams(
          {
            page: 1,
            count: 15,
            // sorting: { id: "desc" },
          },
          {
            dataset: response.data.data,
          }
        );
        $scope.dataCount = $scope.gamelist.length;
        $(".ajax_loader.hidden").css("visibility", "hidden");
      },
      function myError(response) {
        $(".ajax_loader.hidden").css("visibility", "hidden");
        $scope.pending_GetGameList = false;
        console.log(response);
      }
    );
  };
  $scope.GetGameList();

  /* Settle Game*/

  $scope.pending_SettleGame = false;
  $scope.SettleGame = function (gamecode, gameid, gameType, index) {
    $scope.winner = $("#Runners-" + gamecode + " option:selected").val();
    if ($scope.winner == "Select Runner") {
      $.toast({
        heading: "Error",
        text: "Please Select Runner",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }

    if ($rootScope.TPsites[index].type == 0) {
      if (gameType == "20-20 Teenpatti") {
        var Apiurls =
          $rootScope.TPsites[index].apilink +
          "/GameManagement/SettleGame2?gameid=" +
          gamecode +
          "&winner=" +
          $scope.winner.trim();
      }
      if (gameType == "1 Day Teenpatti") {
        var Apiurls =
          $rootScope.TPsites[index].apilink +
          "/GameManagement/Settle1DayGame2?gameid=" +
          gamecode +
          "&winner=" +
          $scope.winner.trim();
      }
    } else {
      var Apiurls =
        $rootScope.TPsites[index].apilink +
        "/SaveGameResult?gameid=" +
        gameid +
        "&gametype=" +
        (gameType == "20-20 Teenpatti" ? 1 : 2) +
        "&result=" +
        $scope.winner.trim();
    }

    $(".ajax_loader.hidden").css("visibility", "visible");
    if ($scope.pending_SettleGame == true) return false;
    $scope.pending_SettleGame = true;
    console.log($scope.winner);
    $http({
      method: "POST",
      url: Apiurls,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.pending_SettleGame = false;
        $(".ajax_loader.hidden").css("visibility", "hidden");
        if (response.data.status == "Success") {
          $scope.GetGameList(index);
          $.toast({
            heading: "Success",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "success",
          });
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
        $(".ajax_loader.hidden").css("visibility", "hidden");
        $scope.pending_SettleGame = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };

  // Settle Tied Game

  $scope.pending_SettleGameTie2 = false;
  $scope.SettleGameTie = function (gameid, gameType, index) {
    $(".ajax_loader.hidden").css("visibility", "visible");
    if ($scope.pending_SettleGameTie2 == true) return false;
    $scope.pending_SettleGameTie2 = true;
    console.log($scope.winner);
    $http({
      method: "POST",
      url:
        $rootScope.TPsites[index].apilink +
        "/SettleGameTie?gameid=" +
        gameid +
        "&gametype=" +
        (gameType == "20-20 Teenpatti" ? 1 : 2),
      // url: $rootScope.TPsites[index].apilink+'/GameManagement/SettleGameTie2?gameid='+gameid
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.pending_SettleGameTie2 = false;
        $(".ajax_loader.hidden").css("visibility", "hidden");
        if (response.data.status == "Success") {
          $scope.GetGameList(index);
          $.toast({
            heading: "Success",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "success",
          });
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
        $(".ajax_loader.hidden").css("visibility", "hidden");
        $scope.pending_SettleGameTie2 = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };

  /*Edit Game Bet status*/

  $scope.pendinggamebetStatus = false;

  $scope.UpdateGameBetStatus = function (userid, status, index) {
    $scope.Gameid = userid;

    $scope.gameStatus = status;

    if ($scope.pendinggamebetStatus == true) return false;

    $scope.pendinggamebetStatus = true;
    $(".ajax_loader.hidden").css("visibility", "visible");

    $http({
      url:
        $rootScope.TPsites[index].apilink +
        "/GameManagement/UpdateGameBetStatus2?gameid=" +
        $scope.Gameid +
        "&status=" +
        $scope.gameStatus,

      method: "POST",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $scope.GetGameList(index);

          $.toast({
            heading: "Success",

            text: response.data.result,

            showHideTransition: "slide",

            icon: "success",
          });
        } else {
          $.toast({
            heading: "Error",

            text: response.data.result,

            showHideTransition: "slide",

            icon: "error",
          });
        }

        $scope.pendinggamebetStatus = false;
        // $(".ajax_loader.hidden").css('visibility', 'hidden');
      },
      function myError(response) {
        // $(".ajax_loader.hidden").css('visibility', 'hidden');
        console.log(response);

        if (response.status == 401) {
          $window.location.href = "login.html";
        }

        $scope.pendinggamebetStatus = false;
      }
    );
  };

  /*Edit Game status*/

  $scope.pendinggameStatus = false;

  $scope.UpdateGameStatus = function (userid, status, index) {
    $scope.Gameid = userid;

    $scope.gameStatus = status;

    if ($scope.pendinggameStatus == true) return false;

    $scope.pendinggameStatus = true;
    $(".ajax_loader.hidden").css("visibility", "visible");

    $http({
      url:
        $rootScope.TPsites[index].apilink +
        "/GameManagement/UpdateGameStatus2?gameid=" +
        $scope.Gameid +
        "&status=" +
        $scope.gameStatus,

      method: "POST",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $scope.GetGameList(index);

          $.toast({
            heading: "Success",

            text: response.data.result,

            showHideTransition: "slide",

            icon: "success",
          });
        } else {
          $.toast({
            heading: "Error",

            text: response.data.result,

            showHideTransition: "slide",

            icon: "error",
          });
        }

        $scope.pendinggameStatus = false;
        // $(".ajax_loader.hidden").css('visibility', 'hidden');
      },
      function myError(response) {
        // $(".ajax_loader.hidden").css('visibility', 'hidden');
        console.log(response);

        if (response.status == 401) {
          $window.location.href = "login.html";
        }

        $scope.pendinggameStatus = false;
      }
    );
  };

  $scope.getFlushData = function () {
    $scope.apilink =
      "http://45.76.155.250/DiamondTeenpatti/TeenpattiData.svc/FlushData";

    $http({
      method: "POST",
      url: $scope.apilink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.getCancleTpBet = function () {
    $scope.apilink =
      "http://159.8.244.50/ApplicationManagement/ManagementService.svc/CancelTpBets";

    $http({
      method: "POST",
      url: $scope.apilink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.updateCard = function (gameid, c1) {
    console.log(gameid, c1, "Card Detail");

    $scope.Gameid = gameid;

    $scope.c1 = c1;

    $scope.apilink =
      "http://45.76.155.250/DiamondTeenpatti/TeenpattiData.svc/UpdateLucky7ACard?gameid=" +
      $scope.Gameid +
      "&c1=" +
      $scope.c1;

    $http({
      method: "POST",
      url: $scope.apilink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
});

app.controller("BMSettleController", function (
  $scope,
  $http,
  NgTableParams,
  $location,
  $rootScope
) {
  $scope.ApplicationTab = function (sitename) {
    $scope.sitename = sitename;
    if (sitename == "FunSports") {
      $scope.apilink = "http://adm.lotusbook365.com/Admin/LotusAdm.svc/";
    }
    $scope.GetBookList2();
  };

  $scope.GetBookList2 = function () {
    $(".ajax_loader.hidden").css("visibility", "visible");
    $http({
      method: "GET",
      url: $scope.apilink + "BookMaking/GetBookList2?status=",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // $scope.Matchname = "1";
        $(".ajax_loader.hidden").css("visibility", "hidden");
        $scope.tableParams = new NgTableParams(
          {
            page: 1,
            count: 100000,
          },
          {
            dataset: response.data.data,
          }
        );
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.ApplicationTab("FunSports");

  $scope.UpdateBookStatus = function (book, val) {
    $http({
      method: "POST",
      url:
        $scope.apilink +
        "BookMaking/EditStatus?id=" +
        bookCode.bookCode +
        "&status=" +
        val,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          // $scope.ApplicationTab(name);
          book.isActive = val;
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
  $scope.UpdateBookBetStatus = function (book, val) {
    $http({
      method: "POST",
      url:
        $scope.apilink +
        "BookMaking/EditBetStatus?id=" +
        bookCode.bookCode +
        "&status=" +
        val,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          // $scope.ApplicationTab(name);
          book.isBetAllow = val;
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.pending_SttleBook = false;
  $scope.SttleBookmaker = function (fid, mtid) {
    $scope.winner = $("#Runners-" + fid + " option:selected").val();
    if ($scope.winner == "Select Runner") {
      $.toast({
        heading: "Error",
        text: "Please Select Runner",
        position: "bottom-right",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    $(".ajax_loader.hidden").css("visibility", "visible");
    if ($scope.pending_SttleBook == true) return false;
    $scope.pending_SttleBook = true;
    $http({
      method: "POST",
      url:
        $scope.apilink +
        "BookMaking/SettleBook?bookid=" +
        fid +
        "&mtid=" +
        mtid +
        "&winner=" +
        $scope.winner.trim(),
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.pending_SttleBook = false;
        $(".ajax_loader.hidden").css("visibility", "hidden");
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          // $scope.ApplicationTab(name);
          $scope.GetBookList2;
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        $(".ajax_loader.hidden").css("visibility", "hidden");
        $scope.pending_SttleBook = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
});

app.controller("BFmanagmentController", function (
  $scope,
  $http,
  NgTableParams,
  $location
) {
  $scope.gettata = function (
    address,
    bfKey,
    bfPwd,
    bfUsername,
    hubName,
    mktLimit,
    sportType,
    id
  ) {
    $scope.id = id;
    $("#myaddress").val(address);
    $("#bfKey").val(bfKey);
    $("#bfPwd").val(bfPwd);
    $("#bfUsername").val(bfUsername);
    $("#hubName").val(hubName);
    $("#mktLimit").val(mktLimit);
    $("#sportType").val(sportType);
  };
  $scope.GetHubConfigData = [];
  $scope.HubSubscriptionDetails = [];
  $scope.GetHubConfig = function () {
    $http({
      method: "GET",
      url: "http://159.8.244.50/DataSource/DataSource.svc/GetHubConfig",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        $scope.GetHubConfigData = response.data.data;
        console.log($scope.GetHubConfigData);
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };
  $scope.edithubConfig = function () {
    if ($("#myaddress").val() == "" || $("#myaddress").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "address cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#bfKey").val() == "" || $("#bfKey").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "bfKey cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#bfPwd").val() == "" || $("#bfPwd").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "bfPwd cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#bfUsername").val() == "" || $("#bfUsername").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "bfUsername cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#hubName").val() == "" || $("#hubName").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "hubName cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#mktLimit").val() == "" || $("#mktLimit").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "mktLimit cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#sportType").val() == "" || $("#sportType").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "sportType cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    var editdata = {
      address: $("#myaddress").val(),
      bfKey: $("#bfKey").val(),
      bfPwd: $("#bfPwd").val(),
      bfUsername: $("#bfUsername").val(),
      hubName: $("#hubName").val(),
      id: $scope.id,
      mktLimit: $("#mktLimit").val(),
      sportType: $("#sportType").val(),
    };
    console.log(JSON.stringify(editdata));
    $http({
      method: "POST",
      data: JSON.stringify(editdata),
      url: "http://159.8.244.50/DataSource/DataSource.svc/EdithubConfig",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
        } else {
          if (response.data.status == "Failed") {
            $.toast({
              heading: "Error",
              text: response.data.result,
              showHideTransition: "slide",
              icon: "error",
            });
          }
        }
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };
  $scope.AddhubConfig = function () {
    if ($("#address1").val() == "" || $("#address1").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "address cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#bfKey1").val() == "" || $("#bfKey1").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "bfKey cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#bfPwd1").val() == "" || $("#bfPwd1").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "bfPwd cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#bfUsername1").val() == "" || $("#bfUsername1").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "bfUsername cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#hubName1").val() == "" || $("#hubName1").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "hubName cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#mktLimit1").val() == "" || $("#mktLimit1").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "mktLimit cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    if ($("#sportType1").val() == "" || $("#sportType1").val() == undefined) {
      $.toast({
        heading: "Error",
        text: "sportType cant be blank",
        showHideTransition: "fade",
        icon: "error",
      });
      return false;
    }
    var adddata = {
      address: $("#address1").val(),
      bfKey: $("#bfKey1").val(),
      bfPwd: $("#bfPwd1").val(),
      bfUsername: $("#bfUsername1").val(),
      hubName: $("#hubName1").val(),
      mktLimit: $("#mktLimit1").val(),
      sportType: $("#sportType1").val(),
    };
    console.log(JSON.stringify(adddata));
    $http({
      method: "POST",
      data: JSON.stringify(adddata),
      url: "http://159.8.244.50/DataSource/DataSource.svc/AddhubConfig",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
        } else {
          if (response.data.status == "Failed") {
            $.toast({
              heading: "Error",
              text: response.data.result,
              showHideTransition: "slide",
              icon: "error",
            });
          }
        }
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };
  $scope.Startstopservice = function (url) {
    $http({
      method: "POST",
      url: url,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
        } else {
          if (response.data.status == "Failed") {
            $.toast({
              heading: "Error",
              text: response.data.result,
              showHideTransition: "slide",
              icon: "error",
            });
          }
        }
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };
  $scope.GetHubSubscriptionDetails = function (address) {
    $scope.ip = address;
    $http({
      method: "GET",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/GetHubSubscriptionDetails?address=" +
        $scope.ip,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response,"response");
        $scope.HubSubscriptionDetails = response.data.data;
        console.log($scope.HubSubscriptionDetails, "detail");
        $scope.datacount = $scope.HubSubscriptionDetails.length;
        console.log($scope.datacount, "$scope.datacount");
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };

  $scope.StartExecutionEnginesCalls = false;
  $scope.StartExecutionEngines = function () {
    if ($scope.StartExecutionEnginesCalls == true) {
      return false;
    }
    $scope.StartExecutionEnginesCalls = true;

    $http({
      method: "POST",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/StartExecutionEngines",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
        } else {
          if (response.data.status == "Failed") {
            $.toast({
              heading: "Error",
              text: response.data.result,
              showHideTransition: "slide",
              icon: "error",
            });
          }
        }
        $scope.StartExecutionEnginesCalls = false;
      },
      function myError(error) {
        $scope.StartExecutionEnginesCalls = false;
        $.toast({
          heading: "Error",
          text: "Error in response GetServices ",
          showHideTransition: "slide",
          icon: "error",
        });
      }
    );
  };

  $scope.FlushHistoryDataCalls = false;
  $scope.FlushHistoryData = function () {
    if ($scope.FlushHistoryDataCalls == true) {
      return false;
    }
    $scope.FlushHistoryDataCalls = true;

    $http({
      method: "POST",
      url: "http://159.8.244.50/DataSource/DataSource.svc/FlushHistoryData",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
        } else {
          if (response.data.status == "Failed") {
            $.toast({
              heading: "Error",
              text: response.data.result,
              showHideTransition: "slide",
              icon: "error",
            });
          }
        }
        $scope.FlushHistoryDataCalls = false;
      },
      function myError(error) {
        $scope.FlushHistoryDataCalls = false;
        $.toast({
          heading: "Error",
          text: "Error in response GetServices ",
          showHideTransition: "slide",
          icon: "error",
        });
      }
    );
  };

  $scope.StopExecutionEnginesCalls = false;

  $scope.StopExecutionEngines = function () {
    if ($scope.StopExecutionEnginesCalls == true) {
      return false;
    }
    $scope.StopExecutionEnginesCalls = true;

    $http({
      method: "POST",
      url: "http://159.8.244.50/DataSource/DataSource.svc/StopExecutionEngines",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
        } else {
          if (response.data.status == "Failed") {
            $.toast({
              heading: "Error",
              text: response.data.result,
              showHideTransition: "slide",
              icon: "error",
            });
          }
        }
        $scope.StopExecutionEnginesCalls = false;
      },
      function myError(error) {
        $scope.StopExecutionEnginesCalls = false;

        $.toast({
          heading: "Error",
          text: "Error in response GetServices ",
          showHideTransition: "slide",
          icon: "error",
        });
      }
    );
  };
});

app.controller("BFsubcribedmktlistController", function (
  $scope,
  $http,
  NgTableParams,
  $location
) {
  $scope.SelectedSport;

  $scope.GetSubscribedMktList = function (sportId) {
    $http({
      method: "GET",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/GetSubscribedMktList?sid=" +
        sportId,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response,"response");

        $scope.marketList = [];
        $scope.marketNameList = [];
        $scope.SubscribedMktList = response.data.data;

        angular.forEach(response.data.data, function (market) {
          if ($scope.marketNameList.indexOf(market.marketName) === -1) {
            $scope.marketNameList.push(market.marketName);
            $scope.marketList.push(market);
          }
        });

        $scope.tableParams2 = new NgTableParams(
          {
            page: 1,
            count: 100000,
          },
          {
            dataset: $scope.marketList,
          }
        );
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };

  // $scope.GetSubscribedMktList("4");
  var CurrentselectedSoprt = 4;
  $("#mktlist-sports").change(function () {
    SelectedSport = $(this).val();
    console.log(SelectedSport);
    $scope.GetSubscribedMktList(SelectedSport);
    CurrentselectedSoprt = SelectedSport;
  });

  var BFsubcribe_marketId;
  $scope.GetHubsList = function (mktid) {
    BFsubcribe_marketId = mktid;
    console.log(BFsubcribe_marketId, "mktid");
    $("#GetHubsList-modal").modal("show");

    $http({
      method: "GET",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/GetHubsList?sid=" +
        CurrentselectedSoprt,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response,"response");
        $scope.HubsList = response.data.data;
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };

  $scope.UpdateSubsMktHubAdd = function (hubAddress) {
    console.log(BFsubcribe_marketId);
    console.log(hubAddress);

    $(".ajax_loader.hidden").css("visibility", "visible");
    $http({
      method: "POST",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/UpdateSubsMktHubAdd?mktid=" +
        BFsubcribe_marketId +
        "&add=" +
        hubAddress,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        $(".ajax_loader.hidden").css("visibility", "hidden");
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
        } else {
          showToast("Error", response.data.result);
        }
        $("#GetHubsList-modal").modal("hide");
        $scope.GetSubscribedMktList(CurrentselectedSoprt);
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.sportWiseHubsList = function () {
    $("#sportWiseHubsList-modal").modal("show");

    $http({
      method: "GET",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/GetHubsList?sid=" +
        CurrentselectedSoprt,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response,"response");
        $scope.sportwiseHubsList = response.data.data;
        console.log("sportwiseHubsList", $scope.sportwiseHubsList);
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };

  $scope.UpdateSubsMktHubAddSport = function (hubAddress) {
    console.log(hubAddress);
    console.log(CurrentselectedSoprt);
    $(".ajax_loader.hidden").css("visibility", "visible");
    $http({
      method: "POST",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/UpdateSubsMktHubAddSport?sportid=" +
        CurrentselectedSoprt +
        "&add=" +
        hubAddress,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        $(".ajax_loader.hidden").css("visibility", "hidden");
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
        } else {
          showToast("Error", response.data.result);
        }
        $("#sportWiseHubsList-modal").modal("hide");
        $scope.GetSubscribedMktList(CurrentselectedSoprt);
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
});

app.controller("MatchdetailController", function (
  $scope,
  $http,
  NgTableParams,
  $location
) {
  $scope.selectedDate = "";
  $scope.Blankdata = function () {
    $scope.Matchdates = "";
    $scope.MatchId = "";
    $scope.Matchname = "";
    $scope.MarketId = "";
  };
  $scope.SaveMatchDetails = function () {
    if ($scope.Matchdates == "" || $scope.Matchdates == null) {
      $.toast({
        heading: "Error",
        text: "Please Enter Match date",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    if ($scope.MatchId == "" || $scope.MatchId == null) {
      $.toast({
        heading: "Error",
        text: "Please Enter MatchId",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    if ($scope.Matchname == "" || $scope.Matchname == null) {
      $.toast({
        heading: "Error",
        text: "Please Enter Matchname",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    if ($scope.MarketId == "" || $scope.MarketId == null) {
      $.toast({
        heading: "Error",
        text: "Please Enter MarketId",
        showHideTransition: "slide",
        icon: "error",
      });
      return false;
    }
    $scope.MATCHdata = {
      matchDate: $scope.Matchdates,
      matchId: $scope.MatchId,
      matchname: $scope.Matchname,
      mktId: $scope.MarketId,
    };
    $http({
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/SaveMatchDetails",
      method: "POST",
      data: $scope.MATCHdata,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
          $scope.GetmatchList();
          $('#Matchdetailmodal button[data-dismiss="modal"]').click();
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(error) {
        if (error.status == 400) {
          $.toast({
            heading: "Error",
            text: "Please Enter Proper Data",
            showHideTransition: "slide",
            icon: "error",
          });
          return false;
        }
      }
    );
  };
  $scope.selectDate = function (val) {
    if (val == null || val == "") {
      $scope.selectedDate = "";
      $scope.tableParams.reload();
    } else {
      $scope.selectedDate = val;
    }
    console.log(val);
  };
  $scope.GetmatchList = function () {
    $http({
      method: "GET",
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/GetMatchDetails",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $scope.getmatch = response.data.data;
        $scope.Matchlist = new NgTableParams(
          {
            page: 1,
            count: 100000,
          },
          {
            dataset: response.data.data,
          }
        );
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };
  $scope.RemoveMatchDetails = function (Mtid) {
    $http({
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/RemoveMatchDetails?id=" +
        Mtid,
      method: "POST",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
          $scope.GetmatchList();
          $('#removeSessionmodal [data-dismiss="modal"]').click();
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(error) {
        console.log("Error in response SaveMatchDetails ", error);
      }
    );
  };

  $scope.betAllowModal = function (matchName, mtid, status) {
    $scope.matchName = matchName;
    $scope.mtid = mtid;
    $scope.status = status;
  };
  $scope.removeSessionModal = function (matchName, id) {
    $scope.matchName = matchName;
    $scope.id = id;
  };

  $scope.UpdateMatchBetStatus = function (Mtid, flag) {
    $http({
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/UpdBetStatus?mtbfid=" +
        Mtid +
        "&flag=" +
        flag,
      method: "POST",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
          $scope.GetmatchList();
          $('#Matchdetailmodal [data-dismiss="modal"]').click();
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(error) {
        console.log("Error in response SaveMatchDetails ", error);
      }
    );
  };

  $scope.UpdateRunner = function (Mtid, runner) {
    console.log(Mtid, runner);
    $http({
      url:
        "http://159.8.244.50/ApplicationManagement/ManagementService.svc/UpdateMatchRunners?mtid=" +
        Mtid +
        "&num=" +
        runner,
      method: "POST",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "success",
          });
          $scope.GetFancyMappingDetails();
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            showHideTransition: "slide",
            icon: "error",
          });
        }
      },
      function myError(error) {
        console.log("Error in response SaveMatchDetails ", error);
      }
    );
  };

  $scope.FlushMarkets = function () {
    $scope.apilink =
      "http://159.8.244.50/ApplicationManagement/ManagementService.svc/FlushMarkets";

    $http({
      method: "POST",
      url: $scope.apilink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
  $scope.RemoveVirtualMatches = function () {
    $scope.apilink =
      "http://159.8.244.50/ApplicationManagement/ManagementService.svc/RemoveVirtualMatches";

    $http({
      method: "POST",
      url: $scope.apilink,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
});

app.controller("marketResultController", function (
  $scope,
  $http,
  NgTableParams,
  $location
) {
  $scope.GetActiveMarkets = function () {
    $(".ajax_loader.hidden").css("visibility", "visible");
    $http({
      method: "GET",
      url: "http://159.8.244.50/DataSource/DataSource.svc/GetActiveMarkets",
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        $(".ajax_loader.hidden").css("visibility", "hidden");
        $scope.tableParams = new NgTableParams(
          {
            page: 1,
            count: 100000,
          },
          {
            dataset: response.data.data,
          }
        );
        // $scope.GetTvSubcriptionData=response.data.data
      },
      function myError(error) {
        console.log("Error in response GetServices ", error);
      }
    );
  };

  $scope.selectoption = function (val) {
    console.log(val);
    if (val == null) {
      $scope.runner = "";
    } else {
      $scope.runner = val;
    }
  };

  $scope.UpdateStatus = function (MKTID, RUNNER) {
    console.log(MKTID, RUNNER);
    $http({
      method: "POST",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/UpdateMarketResult?mktid=" +
        MKTID +
        "&runner=" +
        RUNNER,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          $scope.GetActiveMarkets();
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.removeStatus = function (MKTID) {
    console.log(MKTID);
    $http({
      method: "POST",
      url:
        "http://159.8.244.50/DataSource/DataSource.svc/UpdateMarketResultRemoved?mktid=" +
        MKTID,
      headers: {
        Token: token,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response)
        if (response.data.status == "Success") {
          showToast("Success", response.data.result);
          $scope.GetActiveMarkets();
        } else {
          showToast("Error", response.data.result);
        }
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
});

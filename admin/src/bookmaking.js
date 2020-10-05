var myapp = angular.module("myBookmaking", [
  "ngCookies",
  "ngRoute",
  "ngTable",
  "ngSanitize"
]);
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  context = "mobile";
} else {
  context = "web";
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
myapp.controller("Booksettingcontroller", function (
  $scope,
  $http,
  $cookies,
  $interval,
  NgTableParams
) {
  var favoriteCookie = $cookies.get("kancha");
  $scope.bookid = getUrlParameter("book_id");
  $scope.pending_GetBookInfo = false;
  $scope.GetBookInfo = function () {
    // $('#Editfancymodal').modal('show');
    if ($scope.pending_GetBookInfo == true) return false;
    $scope.pending_GetBookInfo = true;
    $http({
      method: "GET",
      url:
        "http://www.funsports.win/Main/Admin.svc/BookMaking/GetBookInfo?id=" +
        $scope.bookid,
      headers: {
        Token: favoriteCookie
      }
    }).then(
      function mySuccess(response) {
        $scope.pending_GetBookInfo = false;
        // console.log(response.data.data.maxRate)
        $scope.runnerdata = response.data.runnerdata;
        $scope.txtMaxRate = response.data.data.maxRate;
        $scope.txtMaxStack = response.data.data.maxStake;
        $scope.maxstakeperrate = response.data.data.maxStakePerRate;
        $scope.txtMinRate = response.data.data.minRate;
        $scope.txtMinStack = response.data.data.minStake;
        $scope.txt_Rate_difference = response.data.data.rateDifference;
        $scope.sport = response.data.data.sport;
        $scope.competition = response.data.data.tournamentName;
        $scope.eventName = response.data.data.matchName;
        $scope.headerName = response.data.data.headerName;
        $scope.eventId = response.data.data.eventId;
        if (response.data.data.isActive == 2) {
          $scope.Inactivestatus = "active";
        } else if (response.data.data.isActive == 6) {
          $scope.Closedstatus = "closed";
        }
        if (response.data.data.isBetAllow == 1) {
          $scope.chkbxbetallow = 1;
          $scope.ChkIsBetAllow = true;
        } else {
          $scope.chkbxbetallow = 0;
          $scope.ChkIsBetAllow = false;
        }
        // $scope.BookBets();
      },
      function myError(error) {
        $scope.pending_GetBookInfo = false;
        console.log("Error in response get Book Info ", error);
      }
    );
  };
  $scope.GetBookInfo();
  $(document).ready(function () {
    $("#Minimum-Stake").on("keyup", function (e) {
      if (
        $("#Minimum-Stake").val() < 1 ||
        $("#Minimum-Stake").val() > 50000000
      ) {
        $.toast({
          heading: "Warning",
          text: "Min and Max Rate between(1-50000000)",
          showHideTransition: "fade",
          icon: "warning"
        });
        $("#Minimum-Stake").val(100);
      }
    });
    $("#Maximum-Stake").on("keyup", function (e) {
      if (
        $("#Maximum-Stake").val() < 1 ||
        $("#Maximum-Stake").val() > 50000000
      ) {
        $.toast({
          heading: "Warning",
          text: "Min and Max Rate between(1-50000000)",
          showHideTransition: "fade",
          icon: "warning"
        });
        $("#Maximum-Stake").val(10000000);
      }
    });
    $("#Minimum-Rate").on("keyup", function (e) {
      if ($("#Minimum-Rate").val() < 0.01 || $("#Minimum-Rate").val() > 100) {
        $.toast({
          heading: "Warning",
          text: "Min and Max Stake between(0.01-100)",
          showHideTransition: "fade",
          icon: "warning"
        });
        $("#Minimum-Rate").val(1);
      }
    });
    $("#Maximum-Rate").on("keyup", function (e) {
      if ($("#Maximum-Rate").val() < 0.01 || $("#Maximum-Rate").val() > 100) {
        $.toast({
          heading: "Warning",
          text: "Min and Max Rate between(0.01-100)",
          showHideTransition: "fade",
          icon: "warning"
        });
        $("#Maximum-Rate").val(100);
      }
    });
    $("#Text-Rate_difference").on("keyup", function (e) {
      if (
        $("#Text-Rate_difference").val() < 1 ||
        $("#Text-Rate_difference").val() > 100
      ) {
        $.toast({
          heading: "Warning",
          text: "RateDifference between(1-100)",
          showHideTransition: "fade",
          icon: "warning"
        });
        $("#Text-Rate_difference").val(1);
      }
    });
    $("#Max-Stake-PerRate").on("keyup", function (e) {
      if (
        $("#Max-Stake-PerRate").val() < 1 ||
        $("#Max-Stake-PerRate").val() > 5000000000
      ) {
        $.toast({
          heading: "Warning",
          text: "Max Stake Per Rate between(1-5000000000)",
          showHideTransition: "fade",
          icon: "warning"
        });
        $("#Max-Stake-PerRate").val(10000000);
      }
    });
  });
  $scope.pending_EditBookSettings = false;
  $scope.EditBookSettings = function () {
    var UpdFancySet = {
      bookId: $scope.bookid,
      maxRate: $scope.txtMaxRate,
      maxStake: $scope.txtMaxStack,
      maxStakePerRate: $scope.maxstakeperrate,
      minRate: $scope.txtMinRate,
      minStake: $scope.txtMinStack,
      rateDifference: $scope.txt_Rate_difference
    };
    var finaldata = JSON.stringify(UpdFancySet);
    if ($scope.pending_EditBookSettings == true) return false;
    $scope.pending_EditBookSettings = true;
    $http({
      method: "POST",
      url:
        "http://www.funsports.win/Main/Admin.svc/BookMaking/EditBookSettings",
      headers: {
        Token: favoriteCookie
      },
      data: finaldata
    }).then(
      function mySuccess(response) {
        if (response.data.status == "Success") {
          $scope.GetBookInfo();
          $.toast({
            heading: "Success",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "success"
          });
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error"
          });
        }
        $scope.pending_EditBookSettings = false;
      },
      function myError(response) {
        $scope.pending_EditBookSettings = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.pending_EditBetStatus = false;
  $scope.EditBetStatus = function (fstatus) {
    if ($scope.pending_EditBetStatus == true) return false;
    $scope.pending_EditBetStatus = true;
    $http({
      method: "POST",
      url:
        "http://www.funsports.win/Main/Admin.svc/BookMaking/EditBetStatus?id=" +
        $scope.bookid +
        "&status=" +
        fstatus,
      headers: {
        Token: favoriteCookie
      }
    }).then(
      function mySuccess(response) {
        $scope.pending_EditBetStatus = false;
        if (response.data.status == "Success") {
          $scope.GetBookInfo();
          $.toast({
            heading: "Success",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "success"
          });
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error"
          });
        }
      },
      function myError(response) {
        $scope.pending_EditBetStatus = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.pending_EditBookStatus = false;
  $scope.EditBookStatus = function (val) {
    if ($scope.pending_EditBookStatus == true) return false;
    $scope.pending_EditBookStatus = true;
    $http({
      method: "POST",
      url:
        "http://www.funsports.win/Main/Admin.svc/BookRates/EditBookStatus?id=" +
        $scope.bookid +
        "&status=" +
        val,
      headers: {
        Token: favoriteCookie
      }
    }).then(
      function mySuccess(response) {
        $scope.pending_EditBookStatus = false;
        if (response.data.status == "Success") {
          $.toast({
            heading: "Success",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "success"
          });
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error"
          });
        }
      },
      function myError(response) {
        $scope.pending_EditBookStatus = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.pending_UpdRunnerStatus = false;
  $scope.UpdRunnerStatus = function (id, val, isbothback) {
    if (val == 1) {
      $scope.bkid = id;
    } else {
      $scope.bkid = $scope.bookid;
    }
    if ($scope.pending_UpdRunnerStatus == true) return false;
    $scope.pending_UpdRunnerStatus = true;
    $http({
      method: "POST",
      url:
        "http://www.funsports.win/Main/Admin.svc/BookRates/UpdRunnerStatus?id=" +
        $scope.bkid +
        "&status=" +
        val +
        "&both=" +
        isbothback,
      headers: {
        Token: favoriteCookie
      }
    }).then(
      function mySuccess(response) {
        $scope.pending_UpdRunnerStatus = false;
        if (response.data.status == "Success") {
          if (val == 3) {
            $("#BackPrice-" + id + "").text("--");
            $("#BackSize-" + id + "").text("--");
            $("#LayPrice-" + id + "").text("--");
            $("#LaySize-" + id + "").text("--");
            if (isbothback == 1) {
              $("#BackPrice-" + id + "").text("--");
              $("#BackSize-" + id + "").text("--");
              var addedid = parseInt(id) + 1;
              $("#BackPrice-" + addedid + "").text("--");
              $("#BackSize-" + addedid + "").text("--");
              var minusid = parseInt(id) - 1;
              $("#BackPrice-" + minusid + "").text("--");
              $("#BackSize-" + minusid + "").text("--");
            }
            if (isbothback == 2) {
              $("#LayPrice-" + id + "").text("--");
              $("#LaySize-" + id + "").text("--");
            }
          }
          // $.toast({
          //     heading: 'Success',
          //     text: response.data.result,
          //     position: 'bottom-right',
          //     showHideTransition: 'slide',
          //     icon: 'success'
          // })
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error"
          });
        }
      },
      function myError(response) {
        $scope.pending_UpdRunnerStatus = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.pending_BookRate = false;
  $scope.BookRate = function (runnerid, type) {
    if ($("#txt-" + runnerid + "").val() == "") {
      $.toast({
        heading: "Warning",
        text: "Please Enter Rates",
        showHideTransition: "fade",
        icon: "warning"
      });
      return false;
    }
    // $scope.runnernme=runner.split(" ").join();
    var bookdata = {
      bookId: $scope.bookid,
      data: $("#txt-" + runnerid + "").val(),
      runnerId: runnerid
    };
    if ($scope.pending_BookRate == true) return false;
    $scope.pending_BookRate = true;
    $http({
      method: "POST",
      url: "http://www.funsports.win/Main/Admin.svc/BookRates/UpdBookRate",
      headers: {
        Token: favoriteCookie
      },
      data: bookdata
    }).then(
      function mySuccess(response) {
        $scope.pending_BookRate = false;
        console.log(response.data);
        if (response.data.description.status == "Success") {
          if (response.data.data.isBothBack == 1) {
            $("#BackPrice-" + runnerid + "").text(response.data.data.backPrice);
            $("#BackSize-" + runnerid + "").text(response.data.data.backSize);
            $("#LayPrice-" + runnerid + "").text("--");
            $("#LaySize-" + runnerid + "").text("--");
            var addedrunnerid = parseInt(runnerid) + 1;
            $("#BackPrice-" + addedrunnerid + "").text(
              response.data.data.backPrice
            );
            $("#BackSize-" + addedrunnerid + "").text(
              response.data.data.backSize
            );
            $("#LayPrice-" + addedrunnerid + "").text("--");
            $("#LaySize-" + addedrunnerid + "").text("--");
            var substractrunnerid = parseInt(runnerid) - 1;
            $("#BackPrice-" + substractrunnerid + "").text(
              response.data.data.backPrice
            );
            $("#BackSize-" + substractrunnerid + "").text(
              response.data.data.backSize
            );
            $("#LayPrice-" + substractrunnerid + "").text("--");
            $("#LaySize-" + substractrunnerid + "").text("--");
            var isbothback = 1;
          } else if (response.data.data.isBothBack == 2) {
            $("#BackPrice-" + runnerid + "").text("--");
            $("#BackSize-" + runnerid + "").text("--");
            $("#LayPrice-" + runnerid + "").text(response.data.data.layPrice);
            $("#LaySize-" + runnerid + "").text(response.data.data.laySize);
            var isbothback = 2;
          } else {
            $("#BackPrice-" + runnerid + "").text(response.data.data.backPrice);
            $("#BackSize-" + runnerid + "").text(response.data.data.backSize);
            $("#LayPrice-" + runnerid + "").text(response.data.data.layPrice);
            $("#LaySize-" + runnerid + "").text(response.data.data.laySize);
            isbothback = 0;
          }
          if ($("#rbtact-" + runnerid + "").prop("checked") == false) {
            $scope.rbtnstatus = "Act-" + runnerid + "";
            $scope.UpdRunnerStatus(runnerid, 1, isbothback);
            $.toast({
              heading: "Success",
              text: response.data.description.result,
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "success"
            });
          } else if ($("#rbtact-" + runnerid + "").prop("checked") == true) {
            if (type == 0) {
              $scope.rbtnstatus = "Act-" + runnerid + "";
              $scope.UpdRunnerStatus(runnerid, 1, isbothback);
              $.toast({
                heading: "Success",
                text: response.data.description.result,
                position: "bottom-right",
                showHideTransition: "slide",
                icon: "success"
              });
            } else {
              $scope.rbtnstatus = "Ball-" + runnerid + "";
              $scope.UpdRunnerStatus(runnerid, 3, isbothback);
              $("#txt-" + runnerid + "").val("");
            }
          }
        } else {
          $.toast({
            heading: "Error",
            text: response.data.description.result,
            position: "bottom-right",
            showHideTransition: "slide",
            icon: "error"
          });
        }
      },
      function myError(response) {
        $scope.pending_BookRate = false;
        console.log(response);
        if (response.status == 401) {
          clear();
        }
      }
    );
  };
  $scope.rejectbetchkbox = function () {
    if ($("#select_all").prop("checked") == true) {
      $("#Reject-Bet-btn").css("display", "block");
    } else {
      $("#Reject-Bet-btn").css("display", "none");
    }
  };
  $scope.pending_BookBets = false;
  $scope.BookBets = function () {
    if ($scope.pending_BookBets == true) return false;
    $scope.pending_BookBets = true;
    $http({
      method: "GET",
      url:
        "http://www.funsports.win/Main/Admin.svc/BookMaking/BookBets?id=" +
        $scope.bookid +
        "&mtid=" +
        $scope.eventId,
      headers: {
        Token: favoriteCookie
      }
    }).then(
      function mySuccess(response) {
        $scope.pending_BookBets = false;
        // console.log(response.data.bmbook)
        $scope.bmbook = response.data.bmbook;
        $scope.BMrunner1Book = 0;
        $scope.BMrunner2Book = 0;
        $scope.BMrunner3Book = 0;
        angular.forEach(response.data.bmbook, function (i) {
          if (i.Key === "Admin P&L") {
            $scope.BMrunner1Book = i.Value.runner1Book;
            $scope.BMrunner2Book = i.Value.runner2Book;
            $scope.BMrunner3Book = i.Value.runner3Book;
          }
        });
        $("#BmBook-0").text($scope.BMrunner1Book);
        if ($scope.BMrunner1Book > 0) {
          $("#BmBook-0").removeClass("text-danger");
          $("#BmBook-0").addClass("text-success");
        } else {
          $("#BmBook-0").addClass("text-danger");
          $("#BmBook-0").removeClass("text-success");
        }
        $("#BmBook-1").text($scope.BMrunner2Book);
        if ($scope.BMrunner2Book > 0) {
          $("#BmBook-1").removeClass("text-danger");
          $("#BmBook-1").addClass("text-success");
        } else {
          $("#BmBook-1").addClass("text-danger");
          $("#BmBook-1").removeClass("text-success");
        }
        $("#BmBook-2").text($scope.BMrunner3Book);
        if ($scope.BMrunner3Book > 0) {
          $("#BmBook-2").removeClass("text-danger");
          $("#BmBook-2").addClass("text-success");
        } else {
          $("#BmBook-2").addClass("text-danger");
          $("#BmBook-2").removeClass("text-success");
        }
        $scope.tableParams = new NgTableParams(
          {
            page: 1,
            count: 1000
          },
          {
            dataset: response.data.data,
            counts: [] // hides page sizes
          }
        );
        $scope.checkboxes = {
          checked: false,
          items: {}
        };
        $scope.$watch("checkboxes.checked", function (value) {
          angular.forEach(response.data.data, function (item) {
            if (angular.isDefined(item.id)) {
              $scope.checkboxes.items[item.id] = value;
            }
          });
        });
      },
      function myError(error) {
        $scope.pending_BookBets = false;
        console.log("Error in response get FancyBet ", error);
      }
    );
  };
  $interval(function () {
    // $scope.BookBets();
  }, 20000);

  $scope.bmBetsSignalr = function () {
    $scope.bmBetConnection = $.hubConnection("http://159.8.244.61:11475");
    $scope.bmBetProxy = $scope.bmBetConnection.createHubProxy("FancyBetsHub");
    $scope.bmBetConnection
      .start()
      .done(function () {
        console.log("BM bet connection stablished");
      })
      .fail(function () {
        console.log("BM bet could not connect");
      });
    $scope.bmBetConnection.stateChanged(function (change) {
      if (change.newState != 1) {
        $scope.bmBetConnection
          .start()
          .done(function () {
            console.log("BM bet reconnected");
          })
          .fail(function () {
            console.log("BM bet could not connect");
          });
      } else if (change.newState == 1) {
        $scope.subscribeBM();
      }
    });
    $scope.bmBetProxy.on("BroadcastSubscribedData", function (data) {
      // console.log(data);
      $scope.$apply(function () {
        $scope.bmbook = data.bmBook;
        $scope.BMrunner1Book = $scope.bmbook.runner1Book;
        $scope.BMrunner2Book = $scope.bmbook.runner2Book;
        $scope.BMrunner3Book = 0;
        // angular.forEach($scope.bmbook, function(i) {
        //     if (i.Key === "Admin P&L") {
        //         $scope.BMrunner1Book = i.Value.runner1Book;
        //         $scope.BMrunner2Book = i.Value.runner2Book;
        //         $scope.BMrunner3Book = i.Value.runner3Book;
        //     }
        // });
        $("#BmBook-0").text($scope.BMrunner1Book);
        if ($scope.BMrunner1Book > 0) {
          $("#BmBook-0").removeClass("text-danger");
          $("#BmBook-0").addClass("text-success");
        } else {
          $("#BmBook-0").addClass("text-danger");
          $("#BmBook-0").removeClass("text-success");
        }
        $("#BmBook-1").text($scope.BMrunner2Book);
        if ($scope.BMrunner2Book > 0) {
          $("#BmBook-1").removeClass("text-danger");
          $("#BmBook-1").addClass("text-success");
        } else {
          $("#BmBook-1").addClass("text-danger");
          $("#BmBook-1").removeClass("text-success");
        }
        $("#BmBook-2").text($scope.BMrunner3Book);
        if ($scope.BMrunner3Book > 0) {
          $("#BmBook-2").removeClass("text-danger");
          $("#BmBook-2").addClass("text-success");
        } else {
          $("#BmBook-2").addClass("text-danger");
          $("#BmBook-2").removeClass("text-success");
        }
        $scope.tableParams = new NgTableParams(
          {
            page: 1,
            count: 1000
          },
          {
            dataset: data.data,
            counts: [] // hides page sizes
          }
        );
        $scope.checkboxes = {
          checked: false,
          items: {}
        };
        $scope.$watch("checkboxes.checked", function (value) {
          angular.forEach(data.data, function (item) {
            if (angular.isDefined(item.id)) {
              $scope.checkboxes.items[item.id] = value;
            }
          });
        });
      });
    });
  };
  $scope.bmBetsSignalr();
  $scope.subscribeBM = function () {
    $scope.bmBetProxy.invoke("SubscribeMarket", $scope.bookid);
  };
  $scope.unsubscribeBM = function () {
    $scope.bmBetProxy.invoke("UnSubscribeMarket", $scope.bookid);
  };

  $scope.rejectbetids = function () {
    var ids = "";
    var id;
    $('input[name="rejectmultibet"]:checked').each(function (i) {
      ids += $(this).val() + ",";
      id = ids.substring(0, ids.length - 1);
    });
    $("#rejectmultibetid").val(id);
    $("#FancyMultiPassword").val("");
  };
  $scope.pending_RejectBetsMulti = false;
  $scope.RejectBetsMulti = function () {
    var ids = $("#rejectmultibetid").val();
    if (ids == "" || ids == undefined) {
      $.toast({
        heading: "Error",
        text: "Please Select Checkboxs First",
        position: "bottom-left",
        showHideTransition: "slide",
        icon: "error"
      });
      return false;
    }
    if (
      $scope.FancyMultiPassword == "" ||
      $scope.FancyMultiPassword == undefined
    ) {
      $.toast({
        heading: "Error",
        text: "Please Enter password",
        position: "bottom-left",
        showHideTransition: "slide",
        icon: "error"
      });
      return false;
    }
    if ($scope.pending_RejectBetsMulti == true) return false;
    $scope.pending_RejectBetsMulti = true;
    $http({
      method: "POST",
      url:
        "http://www.funsports.win/Main/Admin.svc/FancyRates/RejectBetsMulti?ids=" +
        ids +
        "&mtid=" +
        $scope.eventId +
        "&pwd=1" +
        $scope.FancyMultiPassword +
        "9",
      headers: {
        Token: favoriteCookie
      }
    }).then(
      function mySuccess(response) {
        $scope.pending_RejectBetsMulti = false;
        if (response.data.status == "Success") {
          $('#Reject-Multiple-Bet button[data-dismiss="modal"]').click();
          $.toast({
            heading: "Success",
            text: response.data.result,
            position: "bottom-left",
            showHideTransition: "slide",
            icon: "success"
          });
          // $scope.BookBets();
          $("#Reject-Bet-btn").css("display", "none");
        } else {
          $.toast({
            heading: "Error",
            text: response.data.result,
            position: "bottom-left",
            showHideTransition: "slide",
            icon: "error"
          });
        }
      },
      function myError(error) {
        $scope.pending_RejectBetsMulti = false;
        console.log("Error in response get FancyBet ", error);
      }
    );
  };
  $scope.pending_RejectBookmakingBets = false;
  $scope.RejectBookmakingBets = function (betId) {
    bootbox.confirm({
      title: "Cancel bet",
      message:
        'Please enter your password to confirm.<br><br><input id="cancelPassword" class="bootbox-input bootbox-input-password form-control" type="password">',
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Confirm'
        }
      },
      callback: function (result) {
        // console.log(result);
        // console.log($('#cancelPassword').val())
        $scope.cancelPassword = $("#cancelPassword").val();
        // console.log($scope.cancelPassword)
        // return false
        if (result == true) {
          if ($scope.cancelPassword == "") {
            $.toast({
              heading: "Error",
              text: "Please enter your security password..",
              position: "bottom-right",
              showHideTransition: "slide",
              icon: "error"
            });
            return false;
          }
          if ($scope.pending_RejectBookmakingBets == true) return false;
          $scope.pending_RejectBookmakingBets = true;
          $http({
            method: "POST",
            url:
              "http://www.funsports.win/Main/Admin.svc/FancyRates/RejectFancyBets?id=" +
              betId +
              "&pwd=1" +
              $scope.cancelPassword +
              "9",
            headers: {
              Token: favoriteCookie
            }
          }).then(
            function mySuccess(response) {
              $scope.pending_RejectBookmakingBets = false;
              // console.log(response.data)
              // $scope.getCurrentBets();
              if (response.data.status == "Success") {
                $.toast({
                  heading: "Success",
                  text: response.data.result,
                  position: "bottom-right",
                  showHideTransition: "slide",
                  icon: "success"
                });
                // $scope.BookBets();
              } else {
                $.toast({
                  heading: "Error",
                  text: response.data.result,
                  position: "bottom-right",
                  showHideTransition: "slide",
                  icon: "error"
                });
              }
            },
            function myError() {
              $scope.pending_RejectBookmakingBets = false;
              console.log(response);
            }
          );
        }
      }
    });
  };
});

var app = angular.module("myApp", ["ngRoute", "ngCookies"]);

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

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
var currency = "INR";
if (appType == 2) {
  ApiUrl = "http://www.funsports.win/ClientU/Client.svc";
} else if (appType == 3) {
  ApiUrl = "http://www.funsports.win/ClientH/Client.svc";
}

app.controller("tvController", function (
  $scope,
  $http,
  $interval
) {
  // console.log('tvController')
  $scope.mtid = getUrlParameter("mtid");
  $scope.mktid = getUrlParameter("mktid");
  $scope.mtbfid = getUrlParameter("mtbfid");
  $scope.tvConfig = JSON.parse(localStorage.getItem("Tvconfig"));
  console.log($scope.tvConfig);

  $scope.Gettv = function () {
    // var gettvlist = JSON.parse(localStorage.getItem("tvlist"));

    $http({
      url:
        ApiUrl + "/Data/MktData?mtid=" + $scope.mtid + "&mktid=" + $scope.mktid,
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        console.log(response);
        if ($scope.tvConfig != "" && $scope.tvConfig != null) {
          // $('#showLiveTvPro').empty()
          // var channelIp=response.data.liveTvConfig.channelIp.trim()
          // var channelNo=response.data.liveTvConfig.channelNo
          // var hdmi=response.data.liveTvConfig.hdmi.trim().toUpperCase();
          // var program=response.data.liveTvConfig.program.trim()
          var width = window.innerWidth;
          var height = Math.ceil(width / 1.778);

          // if ($('#hasTv').attr('id') == undefined) {
          //     $('#showLiveTvPro').append('<div id="hasTv" style="padding-left:0px;padding-top:4px;text-align:center"> <u1 id="' + program + '"></u1> <script type="text/javascript"> if ( "MediaSource" in window && "WebSocket" in window ){RunPlayer( \'' + program + '\', 370, 250, \'' + channelIp + '\', "443", true, \'' + hdmi + '\', "", true, true, 0.01, "", false ); } else {document.getElementById(' + program + ').innerHTML = "Websockets are not supported in your browser."; } </script> </div>');
          // }
          $("#showLiveTvPro").append(
            '<iframe id="mobilePlayer" allowfullscreen="true" frameborder="0" scrolling="no" style="overflow: hidden; width: ' +
              width +
              "px; height: " +
              height +
              'px;" src="http://tv.allexch.com/index.html?token=696363a6-035b-450c-8ec6-312e779732ac&mtid=' +
              $scope.mtbfid +
              '" height="' +
              height +
              '"></iframe>'
          );
        } else {
          var width = window.innerWidth;
          var height = Math.ceil(width / 1.778);
          $("#liveTvContent").append(
            '<iframe id="mobilePlayer" allowfullscreen="true" frameborder="0" scrolling="no" style="overflow: hidden; width: ' +
              width +
              "px; height: " +
              height +
              'px;" src="https://videoplayer.betfair.com/GetPlayer.do?tr=266&eID=' +
              $scope.mtbfid +
              "&contentType=viz&contentOnly=true&statsToggle=show&width=" +
              width +
              "&height=" +
              height +
              '" height="' +
              height +
              '"></iframe>'
          );
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

  $scope.Fund = function () {
    $http({
      url: ApiUrl + "/Data/FundExpo",
      method: "GET",
      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
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
    $scope.Fund();
  }, 15000);

  $scope.Setchannel = function (data) {
    $scope.channelIp = data.channelIp.trim();
    $scope.channelNo = data.channelNo;
    $scope.program = data.program.trim();
    $scope.hdmi = data.hdmi.trim();
    $("#player_preview").empty();

    $("#player_preview").append(
      '<div style="padding-left:0px;padding-top:4px;" align=center> <u1 id="' +
        $scope.program +
        '"></u1> <script type="text/javascript"> if ( "MediaSource" in window && "WebSocket" in window ){RunPlayer( \'' +
        $scope.program +
        "', 390, 250, '" +
        $scope.channelIp +
        "', \"443\", true, '" +
        $scope.hdmi +
        '\', "", true, true, 0.01, "", false ); } else {document.getElementById(' +
        $scope.program +
        ').innerHTML = "Websockets are not supported in your browser."; } </script> </div>'
    );
  };
});
app.controller("FancybookController", function (
  $scope,
  $http,
  $cookieStore,
  $window,
  $routeParams
) {
  $scope.mtid = getUrlParameter("mtid");
  $scope.fid = getUrlParameter("fid");
  $scope.fname = getUrlParameter("fname");

  $scope.reverse = true;
  $scope.GetFancyBook = function () {
    $http({
      url:
        ApiUrl + "/Bets/Fancybook?mtid=" + $scope.mtid + "&fid=" + $scope.fid,

      method: "GET",

      headers: {
        Token: authtoken,
      },
    }).then(
      function mySuccess(response) {
        // console.log(response);
        $scope.fancyDatabookList = $scope.combinedFancyBook(response.data.data);

        console.log($scope.fancyDatabookList);
      },

      function myError(error) {
        if (error.status == 401) {
          //$.removeCookie("auth-token");
          window.location.href = "login.html";
        }
      }
    );
  };

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
});

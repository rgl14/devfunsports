var loginApp = angular.module("loginApp", ["ngCookies"]);

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  context = "mobile";
} else {
  context = "web";
}

var ApiUrl = "http://www.funsports.win/Client/Client.svc";
// var ApiUrl = "http://159.8.246.2/Client/Client.svc"
// let Hostname = window.location.hostname;
// if (Hostname.indexOf('usd') > -1) {
//     ApiUrl = "http://" +Hostname + "/Client/Client.svc";
// } else if (Hostname.indexOf('hkd') > -1) {
//     ApiUrl = "http://" + Hostname + "/Client/Client.svc";
// }

loginApp.directive("disableRightClick", function () {
  return {
    restrict: "A",
    link: function (scope, element, attr) {
      element.bind("contextmenu", function (e) {
        e.preventDefault();
      });
    },
  };
});

loginApp.directive("myEnter", function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.myEnter);
        });
        event.preventDefault();
      }
    });
  };
});

loginApp.controller("loginController", function (
  $scope,
  $http,
  $cookies,
  $window,
  $location
) {
  // $scope.username='';
  // $scope.password='';

  $scope.authtoken = $cookies.get("authtoken");

  if ($scope.authtoken) {
    window.location.href = "index.html";
  }

  $("#authenticateImage").on("click", function () {
    $("#authenticateImage").attr("src", "captcha.php");
  });

  $scope.typePassword = false;

  $scope.showPassword = function () {
    $scope.typePassword = !$scope.typePassword;
  };

  $scope.loginCalls = true;
  $scope.login = function () {
    if ($scope.username == undefined || $scope.username == "") {
      $scope.result = "Username is empty";

      return false;
    }
    if ($scope.password == undefined || $scope.password == "") {
      $scope.result = "Password is empty";

      return false;
    }
    // if ($scope.captcha == "" || $scope.captcha == undefined) {
    //   $scope.result = "Captcha is mandatory";
    //   return false;
    // }

    $scope.result = "";

    $scope.loginData = {
      context: context,
      username: $scope.username,
      pwd: $scope.password,
    };

    console.log(JSON.stringify($scope.loginData));

    // if ($scope.captcha != null && $scope.captcha != "") {
    //   $.ajax({
    //     url: "captchaValidate.php",
    //     method: "POST",
    //     data: {
    //       vercode: $scope.captcha
    //     },
    //     success: function(response) {
    //       if (response != "Successful") {
    //         $scope.$apply(function() {
    //           $scope.result = "Invalid validation code !";
    //         });
    //         $("#authenticateImage").attr("src", "captcha.php");
    //         return false;
    //       } else {
    if ($scope.loginCalls == false) {
      return false;
    }
    $scope.loginCalls = false;

    $http({
      url: ApiUrl + "/Login",
      method: "POST",
      data: JSON.stringify($scope.loginData),
    }).then(
      function success(response) {
        if (response.data.description.status == "Success") {
          // $scope.result = response.data.description.result;
          $cookies.put("authtoken", response.data.response.AuthToken);

          $cookies.put("username", $scope.username);
          $cookies.put("appType", response.data.type);

          window.location.href = "index.html";
          localStorage.clear();
        } else {
          $scope.result = response.data.description.result;
          $("#authenticateImage").attr("src", "captcha.php");
        }
        $scope.loginCalls = true;
      },
      function error(error) {
        $scope.loginCalls = true;
      }
    );
    //       }
    //     }
    //   });
    // }
  };

  $scope.showOverlayInfo = function (id) {
    $("#" + id).css("display", "flex");
  };
  $scope.closeOverlayInfo = function (id) {
    $("#" + id).css("display", "none");
  };
});

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

    

    $scope.loginCalls = true;
    $scope.login = function () {
        if ($scope.username == undefined || $scope.username == "") {
            $scope.result = "Username is empty";
            $.toast({

                heading: 'Error',

                text: $scope.result,

                showHideTransition: 'slide',

                icon: 'error'
            })
            return false;
        }
        if ($scope.password == undefined || $scope.password == "") {
            $scope.result = "Password is empty";
            $.toast({

                heading: 'Error',

                text: $scope.result,

                showHideTransition: 'slide',

                icon: 'error'
            })

            return false;
        }

        $scope.result = "";

        $scope.loginData = {
            context: context,
            username: $scope.username,
            pwd: $scope.password,
        };
        


        if ($scope.loginCalls == false) {
            return false;
        }
        $scope.loginCalls = false;

        $http({
            url: "http://159.8.244.50/DataSource/DataSource.svc/Login",
            method: "POST",
            data: JSON.stringify($scope.loginData),
        }).then(
            function success(response) {
                if (response.data.description.status == "Success") {
                    $scope.result = response.data.description.result;
                    $cookies.put(
                        "cramp",
                        JSON.stringify(response.data.response.AuthToken)
                    );
                    $cookies.put("username", $scope.username);
                    window.location.href = "index.html";
                    localStorage.clear();
                } else {
                    $scope.result = response.data.description.result;
                    $.toast({

                        heading: 'Error',
        
                        text: $scope.result,
        
                        showHideTransition: 'slide',
        
                        icon: 'error'
                    })

                    $("#authenticateImage").attr("src", "captcha.php");
                }
                $scope.loginCalls = true;
            },
            function error(error) {
                $scope.loginCalls = true;
            }
        );
    };

});

var todo = angular.module("todo", ["ngRoute"]);
//factory
todo.factory("data", function() {
    factory = {};

    names = [
        { name: "Python Assignments", info: "inheritance, condition statements" },
        { name: "Java", info: "File input/output , interference" },
        { name: "ML", info: "Logical Regression, Linear Regression" },
        { name: "Data structure", info: "Graph" },
    ];
    factory.getData = function() {
        return names;
    };
    factory.removeFromTodoList = function(n) {
        var index = names.indexOf(n);
        names.splice(index, 1);
    };
    factory.modifyTodoList = function(n, title, info) {
        obj = names.find((obj) => {
            return obj.name == n;
        });
        obj.name = title;
        obj.info = info;
    };
    factory.addToTodoList = function(title, info1) {
        names.push({ name: title, info: info1 });
    };
    return factory;
});
//controller
todo.controller("simple_controller", [
    "$scope",
    "$location",
    "data",
    function($scope, $location, data, $routeParams) {
        $scope.names = data.getData();
        $scope.addToTodoList = function() {
            data.addToTodoList($scope.title, $scope.info);
            $scope.title = "";
            $scope.info = "";
            $location.path("/");
        };
        $scope.removeFromTodoList = function(n) {
            data.removeFromTodoList(n);
        };
    },
]);
todo.config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./views/search.html",
                controller: "simple_controller",
            })
            .when("/add", {
                templateUrl: "./views/add.html",
                controller: "simple_controller",
            })
            .when("/show:n", {
                templateUrl: "./views/show.html",
                controller: [
                    "$scope",
                    "$routeParams",
                    "data",

                    function($scope, $routeParams, data) {
                        $scope.title = $routeParams.n;
                        $scope.info = data.getData().find((obj) => {
                            return obj.name == $scope.title;
                        }).info;
                        console.log($scope.title);

                        console.log($scope.info);
                    },
                ],
            })
            .when("/edit:n", {
                templateUrl: "./views/edit.html",
                controller: [
                    "$scope",
                    "$routeParams",
                    "data",
                    "$location",

                    function($scope, $routeParams, data, $location) {
                        $scope.title = $routeParams.n;
                        var tmp = $scope.title;
                        $scope.info = data.getData().find((obj) => {
                            return obj.name == $scope.title;
                        }).info;
                        $scope.modifyTodoList = function() {
                            data.modifyTodoList(tmp, $scope.title, $scope.info);
                            $location.path("/");
                            console.log($scope.title);

                            console.log($scope.info);
                            console.log(tmp);
                        };
                    },
                ],
            });
    },
]);
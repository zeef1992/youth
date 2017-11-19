<html>
<head>
   <title>Vi du Scope trong AngularJS</title>
</head>
<body>
   <h2>Ung dung AngularJS</h2>
   <div ng-app="ungdungAngularjs" ng-controller="nhanvienController">
      <p>{{message}} <br/> {{type}} </p>
      <div ng-controller="nhanvienITController">
         <p>{{message}} <br/> {{type}} </p>
      </div>
      <div ng-controller="nhanvienBHController">
         <p>{{message}} <br/> {{type}} </p>
      </div>
   </div>
   
   <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
   <script>
      var ungdungAngularjs = angular.module("ungdungAngularjs", []);

      ungdungAngularjs.controller("nhanvienController", function($scope) {
         $scope.message = "Ben trong nhan vien controller";
         $scope.type = "Nhan vien";
      });

      ungdungAngularjs.controller("nhanvienITController", function($scope) {
         $scope.message = "Ben trong nhansdsdsd vien IT controller";   
      });

      ungdungAngularjs.controller("nhanvienBHController", function($scope) {
         $scope.message = "Ben trong nhan vien ban hang controller";
         $scope.type = "Nhan vien BH";
      });

   </script>
</body>
</html>
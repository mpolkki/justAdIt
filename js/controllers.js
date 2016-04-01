
var app = angular.module('adApp', ['ngResource', 'ngRoute']);

app.controller("adController", function($scope, $http, $resource) {
 
  $scope.fetch = function() { 
    $scope.viesti= "Haetaan ilmoituksia...";
    $scope.virheviesti= null;

    var MarketAds = $resource('http://mepa-store-api.herokuapp.com/marketads'); 

    MarketAds.query(function(data) {
       
        $scope.virheviesti=null;
        $scope.ads = data;
      }, function(error) {
        $scope.virheviesti='Virhe ilmoituksien haussa.';
    });

     $scope.viesti= null;
  }

  $scope.fetch();
});

app.controller("newAdController", function($scope, $http, $resource) {

  $scope.priceRegex = '[0-9]+([.][0-9]{1,2})?'; 
  $scope.finnishPhoneRegex = '^\+?\d{6,11}[2-9]\d{3}$';
  
  $scope.submit = function() {
    $scope.viesti= "Lisätään ilmoitusta...";
    var Ad = $resource('http://mepa-store-api.herokuapp.com/marketads');
    
    $scope.ad.priceCents= $scope.ad.price * 100;
    
    Ad.save($scope.ad,function(data) {
      $scope.viesti= "Ilmoitus lisätty";
      $scope.virheviesti=null;
      $scope.ad = null;
      }, 
      function(error) {
        $scope.viesti= null;
        $scope.virheviesti='Virhe ilmoituksen tallennuksessa. Yritä hetken päästä uudelleen.';    
      }
    )
  } 

  $scope.reset = function() {
    $scope.ad = null;
    $scope.lisaaForm.$setPristine();
    $scope.lisaaForm.$setValidity();
    $scope.lisaaForm.$setUntouched();
    
    /*$scope.lisaaForm.email.$invalid= false;
    $scope.lisaaForm.email.touched = false;*/

    $scope.virheviesti = null;
  }
});

app.config(function ($routeProvider) {
  $routeProvider
    .when ('/', 
      { controller: 'adController',
        templateUrl: 'partials/showAdds.html'
      })
    .when ('/add',
      { controller: 'newAdController',
        templateUrl: 'partials/addAd.html'
      })
    .when ('/info',
      { controller: null,
        templateUrl: 'partials/info.html'
      }) 
    .otherwise ( { redirectTo: '/'} );
});


/*$http.get("http://mepa-store-api.herokuapp.com/marketads")
    .then(function (response) 
        {
          $scope.ads = response.data;
        }
      )*/


   /*$scope.ads = [{
    "id": "554e24fce4b05414666d8378",
    "title": "slovakialainen tippukivi",
    "description": "slovakialainen tippukivi",
    "priceCents": 30000,
    "imageUrl": null,
    "thumbnailUrl": null,
    "email": "ad@ad.ad",
    "phone": "000 123 4567"
  },
  {
    "id": "55504e0be4b0f73cbd8b4cf8",
    "title": "Kaksio",
    "description": "Kaksio Kissainmaalla.",
    "priceCents": 8000000,
    "imageUrl": "http://d3ls91xgksobn.cloudfront.net/images/property/import/192/361192/4da39b010cac9674b00f9bd171bcf79f/52c909d2e7a8581d678aed37a232cc4b/WWW_THUMBNAIL.jpeg",
    "thumbnailUrl": null,
    "email": "ad@ad.ads",
    "phone": "000 000 00000"
  },
  {
    "id": "55522444e4b0ab70f42de6da",
    "title": "dddddd ddd",
    "description": "ddddddddddddddddd dddddd ddddd dddd dddddd",
    "priceCents": 1010,
    "imageUrl": null,
    "thumbnailUrl": null,
    "email": null,
    "phone": "+000 00 000 00000"
  }];*/
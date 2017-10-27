var app = angular.module('myApp', []);


app.service('chartService', function(){
   this.initChart = function(name, value, color, border) {
      	var ctx = document.getElementById("myChart").getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: name,
		        datasets: [{
		            label: 'Price in USD',
		            data: value,
		            backgroundColor: color,
		            borderColor: border,
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
   }
});


app.controller('myController', ['$scope', '$http', 'chartService', function($scope, $http, chartService){

	$scope.showErrorScreen = false;
	$scope.names = [];
	$scope.value = [];
	$scope.color = [];
	$scope.border = [];

	$scope.getData = function(){


		$http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
	    .then(function(response) {

	     	if(response.status !== 200){
	     		$scope.showErrorScreen = true;
	     	} else{
	     		var data = response.data;
	     		console.log("data", data);

	     		$scope.names = [];
	     		$scope.value = [];
	     		$scope.border = [];

	     		for(var i=0; i<data.length; i++){
	     			$scope.names.push(data[i].name);
	     			$scope.value.push(data[i].price_usd);
	     			$scope.border.push('#000');

	     			if($scope.color.length < data.length){
	     				var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	     				$scope.color.push(color);
	     			}
	     		}

	     		chartService.initChart($scope.names, $scope.value, $scope.color, $scope.border);
	     	}

	    });
	}



	for (var i=0;i<=1000;i++) {
      (function(ind) {
        setTimeout(function(){
        	$scope.getData();

        }, 300000 + (300000 * ind));
       })(i);

    }




}])
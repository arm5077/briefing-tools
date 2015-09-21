app = angular.module("toolsApp", [])
.controller("toolsController", ["$scope", "$sce", function($scope, $sce){



	$scope.data = [],
	$scope.raw = "Trump	27\nCarson	21\nCruz	9\nBush	6";
	
	$scope.absorbRaw = function(){
		$scope.error = null;
		$scope.data.length = 0;
		if( $scope.raw.indexOf("\n") == -1){
			$scope.error = "Looks like all your data is on one line?";
		} else{
			var temp = $scope.raw.split("\n");
			temp.forEach(function(row){
				if(!$scope.error){
					if( row.indexOf("\t") == -1 )
						$scope.error = "Looks like at least one of your rows is missing a tab?" 
				}
				row = row.split("\t");
				console.log(row);
				$scope.data.push({name: row[0], amount: parseInt(row[1]) });
			});

			if(!$scope.error){
				var max = Math.max.apply(null, $scope.data.map(function(d){ return d.amount }));
				$scope.data.forEach(function(datum){

					datum.percent = datum.amount / max * 100;
				});

				$scope.data.sort(function(a,b){
					return b.amount - a.amount;
				});
			}
		}
		
	}
	
	$scope.makeEmbed = function(){
		var exportString = "";
		$scope.data.forEach(function(datum){
			exportString += '<div class="andrew-bar" style="position: relative">' +
				'<div class="andrew-color" style="width: ' + datum.percent + '% !important; background-color: #cd6966; position: absolute; width: 100%; height: 100%; left: 0; top: 0; z-index: 1"></div>' +
				'<div class="andrew-text" style="padding: 3px 0px 5px 5px; margin-bottom:3px; position: relative; z-index: 2; font-weight: bold; color: rgba(255,255,255,.8) !important">' +
					datum.name + ': ' + datum.amount + '%' +
				'</div>' +
			'</div>';
		});
		return exportString;
	}
	
	$scope.absorbRaw();
		
}]);

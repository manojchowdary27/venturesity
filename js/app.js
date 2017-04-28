var vformApp = angular.module('vformApp', []);

//Filter to capitalize the first letter of the sentence. 
vformApp.filter('UpperFirst', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
//Controller for my vformApp
vformApp.controller('vformCtrl', function($scope, $http,$window ,$sce){
	$scope.butid = "GetForm";
	$scope.subid = "";
	$scope.fields="";                //Object to store the data which is received from the API
	$scope.formData = {};           //Object to store the all inputs data
	
	// function to send the formData api ---->start
	$scope.submit = function(){
		
		$scope.subid = "Submitting Please Wait...";
		$http({
          method  : 'POST',
          url     : 'https://randomform.herokuapp.com/submit',
          data    : $scope.formData, 
          headers : {'Content-Type': 'application/json'} 
         })
          .success(function(response) {
            if (response.success==true) {
              console.log(response.success);
              $scope.subid = "Success";
              alert("Success");
              window.location.href="index.html";
            } 
            else {
              console.log(response.success);
            }
          });

		}
		// function to send the formData api <----End
		
		// function to call api ---->start
	$scope.render = function (){
		$scope.butid = "Rendering the Form";
		$http.get("https://randomform.herokuapp.com/")
		.then(function (response) {
			var result = response.data.data.form_fields;
		 console.log(response.data.data.form_fields);
		 var i=0;
		 $scope.butid = false;
		 $scope.subid ="Submit";
		 
		 // function to call api <----end
		 
		 // modifying given fields data ---->start
		angular.forEach(result,function(value,key){
			var mk=0,ml=0,mm=0;
			if(result[key]['component'] == 'checkbox' && result[key]['autoselect']){
			var a1= result[key]['options'];
			var a2= result[key]['autoselect'];
			var newoptions =[];
			console.log(result[key]['options']);
			for(mk=0;mk<result[key]['options'].length;mk++){
				var flag=0;
				for(ml=0;ml<result[key]['autoselect'].length;ml++){
					if(a1[mk] == a2[ml]){                                
						flag=1;
						break;
						}
					}
					if(flag!=1){
						newoptions[mm] = a1[mk];                 //Updating newoptions[] array  to store the elements which are not autoselected  for further usage in Template
						mm = mm+1;
						}
				}
				console.log(newoptions);
			result[key]['newoptions'] = newoptions;
		}
        console.log(result[key]['editable']);
        i =i+1;
        result[key]['model'] = "input"+i;                      //Adding a new field model in result object .It is used to further to in the template at ng-model directive
         if(result[key]['editable']==false){
			 result[key]['editable'] = true;                   //Making false into True and True into false for further usage in Template
			 } 
			 else 
			 result[key]['editable'] = false;
        
		});
		
		// modifying given fields data <----end
		
		$scope.fields = result;
		console.log($scope.fields);
		 }
		 );	
		}
	});

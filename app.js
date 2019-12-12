(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('MenuCategoriesController', MenuCategoriesController)
    .service('MenuCategoriesService', MenuCategoriesService)
    .directive('menuList', MenuListDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function MenuListDirective() {
	console.log("HERE  in MenuListDirective");
	var ddo = {
	    templateUrl: 'menuList.html',
	    scope: {
		found: '<',
		dontWantThis: '&' 
	    },
	};
	return ddo;
    }
    
    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
	var menu = this;
	var promise = MenuCategoriesService.getMenuCategories();
	promise.then(function (response) {
	    menu.categories = response.data;
	})
        .catch(function (error) {
	    console.log("Something went terribly wrong.");
        });
	
	menu.menuItems = function (searchTerm) {
	    if (!searchTerm){
		menu.found = [];
	    } else {
		var promise = MenuCategoriesService.getMenuForCategory('');
		promise.then(function (response) {
		    console.log("searchTerm: ", searchTerm);
		    var temp  = response.data.menu_items;
		    console.log("temp: ", temp);
		    menu.found = temp.filter(x=>x.description.toLowerCase().indexOf(searchTerm.toLowerCase())>-1)
		    console.log("menu.found.length: ", menu.found.length);
		}).catch(function (error) {
		    console.log(error);
		})
		    }};

	menu.dontWantThis = function(index){
	    console.log("dontWantThis index:", index);
	    menu.found.splice(index,1);
	}
    };

    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath) {
	var service = this;

	service.getMenuCategories = function () {
	    var response = $http({
		method: "GET",
		url: (ApiBasePath + "/categories.json")
		//url: (ApiBasePath + "/categories.json") original
	    });

	    return response;
	};

	service.getMenuForCategory = function (shortName) {
	    var response = $http({
		method: "GET",
		url: (ApiBasePath + "/menu_items.json"),
		params: {
		    category: shortName
		}
	    });
	    return response;
	};

    }

})();  // END_OF_MAIN

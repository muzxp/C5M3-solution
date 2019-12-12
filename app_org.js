/*

THIS IS IT!.

 */

(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function foundItems() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      items: '<',
      badRemove: '=',
      onRemove: '&'
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}
    
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(ShoppingListFactory) {
  var menu = this;

  // Use factory to create new shopping list service
  var promise = MenuSearchService.getMatchedMenuItems();

    promise.then 
    MenuSearchService;
  
}


/*
https://davids-restaurant.herokuapp.com/menu_items.json
*/
MenuSearchService.$inject = ['$http'];
function MenuSearchService() {  // @@@
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
    return $http(...).then(function (result) {
	// process result and only keep items that match
	var foundItems = result.data.menuFilter(searchTerm);



	    // return processed items
	return foundItems;
    });
    };
};    // END_OF_function MenuSearchService() 

    

})();  // END_OF_IIFE

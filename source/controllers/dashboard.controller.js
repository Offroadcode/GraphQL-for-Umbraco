angular.module("umbraco").controller("graphql.for.umbraco.dashboardcontroller", function($scope) {

    // Initialization Methods //////////////////////////////////////////////////

    /**
     * @method init Triggered when the controller is loaded by a view to 
     * initialize the JS for the controller.
     */
    $scope.init = function(){
        console.info('GraphQL for Umbraco is initialized');
    }

    // Helper Methods //////////////////////////////////////////////////////////

    // Event Handler Methods ///////////////////////////////////////////////////

    // Call $scope.init() //////////////////////////////////////////////////////

    $scope.init();

});
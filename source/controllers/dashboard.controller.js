angular.module("umbraco").controller("graphql.for.umbraco.dashboardcontroller", function($scope, contentTypeResource) {

    // Initialization Methods //////////////////////////////////////////////////

    /**
     * @method init Triggered when the controller is loaded by a view to 
     * initialize the JS for the controller.
     * @returns {void}
     */
    $scope.init = function() {
        $scope.setInitialVariables();
        $scope.getDocTypes();
    };

    /**
     * @method setInitialVariables Sets the initial states of the variables used 
     * in the scope.
     * @returns {void}
     */
    $scope.setInitialVariables = function () {
        $scope.docTypes = [];
        $scope.groups = [];
        $scope.selectedDocType = false;
        $scope.selectedDocTypeName = '';
    };

    /**
     * @method getDocTypes Gets the doctypes that exist on the site and builds 
     * a list to display.
     * @returns {void}
     */
    $scope.getDocTypes = function() {
        contentTypeResource.getAll().then(function(docTypes) {
            docTypes.forEach(function (type, index) {
                $scope.docTypes.push({
                    alias: type.alias,
                    id: type.id,
                    name: type.name
                });
            });
        });
    };

    // Helper Methods //////////////////////////////////////////////////////////

    /**
     * @method isDocTypeSelected Returns `true` if a docType has been selected 
     * by the user.
     * @returns {boolean}
     */
    $scope.isDocTypeSelected = function() {
        return !!$scope.selectedDocType;
    };

    /**
     * @method getPropertiesForDocType Uses `contentTypeResource` to get a list 
     * of groups and properties that exist on the doctype with the indicated 
     * id and assigns them to scope.
     * @param {number} id 
     * @returns {void}
     */
    $scope.getPropertiesForDocType = function(id) {
        $scope.groups = [];
        contentTypeResource.getById(id).then(function(content) {
            $scope.groups = content.groups.map(function (group, index) {
                var properties = group.properties.map(function(prop) {
                    return {
                        alias: prop.alias,
                        id: prop.id,
                        isVisible: false,
                        name: prop.label
                    };
                });
                return {
                    name: group.name,
                    id: group.id,
                    properties: properties
                };
            });
        });
    };

    // Event Handler Methods ///////////////////////////////////////////////////

    /**
     * @method onChangeDocTypeClick Triggered when user clicks link to unselect 
     * a doctype, returning them to the view to select a new doctype.
     * @param {$event} e 
     * @returns {void}
     */
    $scope.onChangeDocTypeClick = function(e) {
        e.preventDefault();
        $scope.groups = [];
        $scope.selectedDocType = false;
        $scope.selectedDocTypeName = '';
    };

    /**
     * @method onDocTypeClick Triggered when user clicks a doctype link, saving 
     * it to $scope and toggling a request for the properties for that doctype.
     * @param {$event} e 
     * @returns {void}
     */
    $scope.onDocTypeClick = function(e) {
        e.preventDefault();
        var id = e.target.getAttribute('data-id');
        $scope.selectedDocType = id;
        $scope.selectedDocTypeName = e.target.getAttribute('data-name');
        $scope.getPropertiesForDocType(id);
    };

    // Call $scope.init() //////////////////////////////////////////////////////

    $scope.init();

});
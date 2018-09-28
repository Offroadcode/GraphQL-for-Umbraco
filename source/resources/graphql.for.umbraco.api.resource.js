angular.module("umbraco.resources").factory("graphQLForUmbracoApiResource", function ($http, $q) {

    var graphQLForUmbracoApiResource = {};
    var useMock = true;

    /**
     * @method get - Gets the currently set permissions for GraphQL visibility 
     * from the API.
     * @returns {Promise.<{permissions: {doctypeAlias: string, propertyAlias: string, isBuiltInProperty: boolean}[]}>}
     */
	graphQLForUmbracoApiResource.get = function () {
        if (useMock) {
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve({
                    "permissions": [  
                        {  
                            "doctypeAlias":"home",
                            "propertyAlias":"sitename",
                            "isBuiltInProperty": false
                        },
                        {  
                            "doctypeAlias":"home",
                            "propertyAlias":"bodyText",
                            "isBuiltInProperty": false
                        },
                        {
                            "doctypeAlias": "blogpost",
                            "propertyAlias": "pageTitle",
                            "isBuiltInProperty": false
                        }
                    ]
                });
            }, 1000);
            return deferred.promise;
        } else {
            return $http.get('/umbraco/backoffice/api/GraphQLPermissions/GetPermissions').then(function(response) {
                return response.data;
            });
        }
    };
    
    /**
     * @method set - Sends the currently set permissions for GraphQL visibility 
     * back via API.
     * @param {{doctypeAlias: string, propertyAlias: string, isBuiltInProperty: boolean}[]} permissions 
     * @param {number} [accountId = 1] 
     * @returns {Promise.<{success: boolean}>}
     */
    graphQLForUmbracoApiResource.set = function(permissions, accountId) {
        var id = typeof accountId !== 'undefined' ? accountId : 1;
        if (useMock) {
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve({
                    "success": true
                });
            }, 1000);
            return deferred.promise;
        } else {
            return $http.get('/umbraco/backoffice/api/GraphQLPermissions/SetPermissions').then(function(response) {
                return response.data;
            });
        }
    };

	return graphQLForUmbracoApiResource;
});
var Sample = {
    // Create this closure to contain the cached modules
    module: (function() {
        // Internal module cache.
        var modules = {};

        // Create a new module reference scaffold or load an
        // existing module.
        return function(name) {
            // If this module has already been created, return it.
            if (modules[name]) {
                return modules[name];
            }

            // Create a module and save it under this name
            return modules[name] = { Views: {} };
        };
    })(),
    
    menuView: (function() {
        var menuView;
        return function() {
            if (menuView) {
                menuView.model.setActiveItem(arguments[1]);
                return menuView;
            }
            var menu = Sample.module('menu');
            return menuView = new menu.View({
                el: $("#alfresco-backbone-sample-menu"),
                nodeRef: arguments[0]
            });
        };
    })(),

    samplePageView: (function() {
        var samplePageView;
        return function() {
            if (samplePageView) {
                samplePageView.render();
                return samplePageView;
            }
            var sample = Sample.module('sample-page');
            return samplePageView = new sample.View({
                el: $("#alfresco-backbone-sample-body"),
                nodeRef: arguments[0]
            });
        };
    })(),

    samplePageView2: (function() {
        var samplePageView2;
        return function() {
            if (samplePageView2) {
                samplePageView2.render();
                return samplePageView2;
            }
            var sample = Sample.module('sample-page2');
            return samplePageView2 = new sample.View({
                el: $("#alfresco-backbone-sample-body"),
                nodeRef: arguments[0]
            });
        };
    })(),

    // Cached Global Variables
    nodeData: (function() {
        var _nodeData = {
            "nodeRef" : null,
            "data" : null,
            "metaData" : null
        };
        return function() {
            var args = Sample.Utils.makeArray(arguments);
            if (args.length == 1) {
                var nodeRef = args.shift();
                if (nodeRef == _nodeData.nodeRef && _nodeData.data != null && _nodeData.metaData != null) {
                    return _nodeData;
                } else {
                    $.ajax({
                        dataType: "json",
                        url: "/share/proxy/alfresco/api/metadata?nodeRef=" + nodeRef,
                        async: false,
                        success: function(data) {
                            _nodeData.nodeRef = nodeRef;
                            _nodeData.metaData = data;
                            $.ajax({
                                url: "/share/proxy/alfresco/api/node/content/" + nodeRef.replace("://", "/"),
                                async: false,
                                success: function(data) {
                                    _nodeData.data = data;
                                }
                            });
                        }
                    });
                    return _nodeData;
                }
            } else {
                return _nodeData;
            }
        };
    })(),

    // Top Level Router
    router: Backbone.Router.extend({
        routes: {
            "sample-page/:nodeStoreType/:nodeStoreId/:nodeId": "samplePageAction",
            "sample-page2/:nodeStoreType/:nodeStoreId/:nodeId": "samplePage2Action",
            "*actions": "defaultRoute"
        },

        samplePageAction: function(nodeStoreType, nodeStoreId, nodeId) {
            var nodeRef = Sample.Utils.nodeRef(nodeStoreType, nodeStoreId, nodeId);
            var menuView = Sample.menuView(nodeRef,"sample-page");
            var samplePageView = Sample.samplePageView(nodeRef);
        },

        samplePage2Action: function(nodeStoreType, nodeStoreId, nodeId) {
            var nodeRef = Sample.Utils.nodeRef(nodeStoreType, nodeStoreId, nodeId);
            var menuView = Sample.menuView(nodeRef,"sample-page-2");
            var samplePageView2 = Sample.samplePageView2(nodeRef);
        },

        defaultRoute: function() {

        }
        
    }),

    // Template Manager that supports in-memory caching
    TemplateManager : {

        rootPath: "/share/res/alfresco-backbone-sample/templates/",

        templates: {},

        get: function(id, callback) {
            var template = this.templates[id];
            if (template) {
                callback(template);
            } else {
                var that = this;
                $.get(this.rootPath + id + ".html", function(template) {
                    var compiled = _.template(template);
                    that.templates[id] = compiled;
                    callback(compiled);
                });
            }
        }
    },

    // Utility functions
    Utils : {
        nodeRef : function(storeType, storeId, id) {
            return storeType + "://" + storeId + "/" + id;
        },
        makeArray : function(args) {
            return Array.prototype.slice.call(args);
        },
        isFunction : function(arg) {
            return Object.prototype.toString.call(arg) === "[object Function]";
        },
        isString : function(arg) {
            return (typeof arg == "string");
        }
    }
};


(function(Sample, Menu) {
    Menu.Model = Backbone.Model.extend({
        defaults: {
            "items" : [
            ]
        },

        initialize: function() {
        },

        setActiveItem: function(id) {
            var items = this.get("items");
            $.each(items, function(i, v) {
                if (v['id'] == id) {
                    v.active = true;
                } else {
                    v.active = false;
                }
            });
            this.set("items", items);
            // Change event won't be triggered for array value change.
            this.trigger('change');
        }
    });

    Menu.List = Backbone.Collection.extend({
        model: Menu.Model
    });

    Menu.View = Backbone.View.extend({
        template : "menu",

        initialize: function() {
            var menuItems = [];
            var arg = arguments[0];
            if (arg && arg['nodeRef'] != null) {
                menuItems.push({
                    "id" : "sample-page",
                    "title" : "Node Metadata",
                    "route" : "#sample-page/" + arg['nodeRef'].replace("://", "/")
                });
                menuItems.push({
                    "id" : "sample-page-2",
                    "title" : "Node Content",
                    "route" : "#sample-page2/" + arg['nodeRef'].replace("://", "/")
                });
                this.model = new Menu.Model({"items" : menuItems});
                this.render();
                this.model.on('change', this.render, this);
            } else {
                this.model = new Menu.Model();
                this.render();
                this.model.on('change', this.render, this);
            }
        },

        render: function() {
            var that = this;
            Sample.TemplateManager.get(this.template, function(template) {
                var html = template(that.model.toJSON());
                that.$el.html(html);
            });
            return this;
        }

    });

})(Sample, Sample.module("menu"));
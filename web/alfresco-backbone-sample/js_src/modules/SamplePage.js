(function(Sample, SamplePage) {
    SamplePage.Model = Backbone.Model.extend({
        defaults: {
        },

        initialize: function() {
        }
    });

    SamplePage.List = Backbone.Collection.extend({
        model: SamplePage.Model
    });

    SamplePage.View = Backbone.View.extend({
        template : "sample-page",

        initialize: function() {
            if (arguments[0] && arguments[0]['nodeRef'] != null) {
                var initModel = {
                    "nodeRef" : arguments[0]['nodeRef']
                };
                this.model = new SamplePage.Model(initModel);
            } else {
                this.model = new SamplePage.Model();
            }
            this.render();
            this.model.on('change', this.render, this);
        },

        render: function() {
            var that = this;
            var nodeRef = this.model.get('nodeRef');
            if (nodeRef != null) {
                Sample.TemplateManager.get(this.template, function(template) {
                    var html = template(Sample.nodeData(nodeRef));
                    that.$el.html(html);
                });
            }
            return this;
        }
    });

})(Sample, Sample.module("sample-page"));
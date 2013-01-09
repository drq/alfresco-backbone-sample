(function(Sample, SamplePage2) {
    SamplePage2.Model = Backbone.Model.extend({
        defaults: {
        },

        initialize: function() {
        }
    });

    SamplePage2.List = Backbone.Collection.extend({
        model: SamplePage2.Model
    });

    SamplePage2.View = Backbone.View.extend({
        template : "sample-page-2",

        initialize: function() {
            if (arguments[0] && arguments[0]['nodeRef'] != null) {
                var initModel = {
                    "nodeRef" : arguments[0]['nodeRef']
                };
                this.model = new SamplePage2.Model(initModel);
            } else {
                this.model = new SamplePage2.Model();
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

})(Sample, Sample.module("sample-page2"));
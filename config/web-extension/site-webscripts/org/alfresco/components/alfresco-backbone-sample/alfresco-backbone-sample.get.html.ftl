<div>
    <div id="alfresco-backbone-sample-container" class="container_12" style="margin: 10px;">
        <div id="alfresco-backbone-sample-menu" class="grid_2"></div>
        <div id="alfresco-backbone-sample-body" class="grid_10"></div>
        <div class="clear"></div>
    </div>
    <script type="text/javascript" id="alfresco-backbone-sample-field-script">
        $(function() {
            var topRouter = new Sample.router;
            Backbone.history.start();
            topRouter.navigate('#sample-page/${(page.url.args.nodeRef!"")?js_string?replace("://", "/")}', true);
        });
    </script>
</div>
<!--
            itemKind: "${(instance.properties.itemKind!"")?js_string}",
            itemId: "${(instance.properties.itemId!"")?js_string}",
            formId: "${(instance.properties.formId!"")?js_string}"
            nodeRef: "${(page.url.args.nodeRef!"")?js_string}"
-->
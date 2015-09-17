AsanaClone.Views.ProjectLinkItem = Backbone.CompositeView.extend({
  template: JST['projects/link-item'],

  render: function () {
    var renderContent = this.template({
      project: this.model,
      workspace: this.collection})

    this.$el.html(renderContent);
    return this;
  }
});

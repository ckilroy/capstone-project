AsanaClone.Views.ProjectDashItem = Backbone.CompositeView.extend({
  template: JST['projects/dash-item'],

  render: function () {
    var renderContent = this.template({project: this.model})

    this.$el.html(renderContent);
    return this;
  }
});

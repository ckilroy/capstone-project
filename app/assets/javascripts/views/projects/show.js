AsanaClone.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],

  render: function () {
    var renderContent = this.template({project: this.model})

    this.$el.html(renderContent);
    return this;
  }
});

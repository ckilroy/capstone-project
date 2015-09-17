// project will have its own show page listing tasks as composite view
AsanaClone.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST["projects/show"],
  
  render: function () {
    var renderedContent = this.template({project: this.model})

    this.$el.html(renderedContent);
    return this;
  }
})

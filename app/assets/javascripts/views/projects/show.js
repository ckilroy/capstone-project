// project will have its own show page listing tasks as composite view
AsanaClone.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST["projects/show"],

  initialize: function () {
    this.collection = this.model.tasks();

    this.collection.forEach(function(task) {
      this.addTaskLinkItem(task);
    }.bind(this));
  },

  render: function () {
    var renderedContent = this.template({project: this.model})

    this.$el.html(renderedContent);
    return this;
  },

  addTaskLinkItem: function (task) {
    var subview = new AsanaClone.Views.TaskLinkItem({
      model: task,
      collection: this.model
    });

    this.addSubview("#tasks", subview)
  }
})

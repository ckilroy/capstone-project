AsanaClone.Views.UserTaskShow = Backbone.CompositeView.extend({
  template: JST["users/taskshow"],

  initialize: function () {
    //this.model = user
    //this collection = user tasks
    this.collection = this.model.user_tasks();
    // // this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model, "sync", this.renderTaskMiniForm)
    this.listenTo(this.collection, "add", this.addTaskLinkItem);

    this.collection.forEach(function(task) {
      this.addTaskLinkItem(task);
    }.bind(this));
  },

  render: function () {
    var renderedContent = this.template({user: this.model});

    this.$el.html(renderedContent);
    this.renderTaskMiniForm();
    return this;
  },

  addTaskLinkItem: function (task) {
  var subview = new AsanaClone.Views.TaskLinkItem({
    model: task,
    // collection: this.collection
  });
  //probably need to listen to sync and render in this view

    this.addSubview("#tasks-list", subview)
  },

  renderTaskMiniForm: function (e) {
    var subview = new AsanaClone.Views.TaskMiniForm({
      collection: this.collection,
      current_user_id: this.model.id
    });
    this.addSubview("#task-form", subview);
  },
})

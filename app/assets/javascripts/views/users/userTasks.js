AsanaClone.Views.UserTaskShow = Backbone.CompositeView.extend({
  template: JST["users/taskshow"],

  initialize: function (options) {
    //this.model = user
    //this collection = user tasks
    this.workspace = options.workspace;
    this.collection = this.model.tasks();
    // this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model, "sync", this.renderTaskMiniForm)
    this.listenTo(this.collection, "add change:completed", this.addTaskLinkItem);

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
    var id = "#task" + task.id;
    
    if (this.$el.find(id).length === 1) {
      this.$el.find(id).parent().remove();
    }

    var subview = new AsanaClone.Views.TaskLinkItem({
      model: task
    });

    if (task.escape('completed') === "false") {
        this.addSubview("#tasks-list", subview);
    } else {
        this.addSubview("#completed-tasks-list", subview);
    }
  },

  renderTaskMiniForm: function (e) {
    var subview = new AsanaClone.Views.TaskMiniForm({
      collection: this.collection,
      current_user_id: this.model.id,
      workspace: this.workspace
    });
    this.addSubview("#task-form", subview);
  },
});

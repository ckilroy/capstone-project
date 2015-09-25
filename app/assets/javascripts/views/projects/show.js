//issues:
//only after clicking editable does the create new task link appear. needs to
//render

// project will have its own show page listing tasks as composite view
AsanaClone.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST["projects/show"],

  initialize: function (options) {
    //this.model = project
    //this.collection = tasks
    this.current_user_id = options.current_user_id;
    this.collection = this.model.tasks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderTaskMiniForm);
    this.listenTo(this.collection, "add change:completed", this.addTaskLinkItem);

    this.collection.forEach(function(task) {
      this.addTaskLinkItem(task);
    }.bind(this));
  },

//passing in current user-id... maybe this whole page via user json... ??

  render: function () {
    var renderedContent = this.template({project: this.model});

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
      model: task,
      collection: this.collection
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
      current_user_id: this.current_user_id
    });
    this.addSubview("#task-form", subview);
  },
});

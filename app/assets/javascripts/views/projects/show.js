//issues:
//only after clicking editable does the create new task link appear. needs to
//render

// project will have its own show page listing tasks as composite view
AsanaClone.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST["projects/show"],

  initialize: function () {
    //this.model = project
    //this.collection = tasks
    this.collection = this.model.tasks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderTaskMiniForm)
    this.listenTo(this.collection, "add", this.addTaskLinkItem);

    this.collection.forEach(function(task) {
      this.addTaskLinkItem(task);
    }.bind(this));
  },

  events: {
    "click .task-detail": "taskDetail"
  },

  render: function () {
    var renderedContent = this.template({project: this.model})

    this.$el.html(renderedContent);
    this.renderTaskMiniForm();
    return this;
  },

  addTaskLinkItem: function (task) {
    var subview = new AsanaClone.Views.TaskLinkItem({
      model: task,
      collection: this.collection //changed from model
    });
    //probably need to listen to sync and render in this view

    this.addSubview("#tasks", subview)
  },

  renderTaskMiniForm: function (e) {
    var subview = new AsanaClone.Views.TaskMiniForm({
      collection: this.collection
    });
    this.addSubview("#task-form", subview);
  },


  taskDetail: function (e) {
    e.preventDefault();
    $target = $(e.currentTarget);
    var task = this.collection.getOrFetch($target.data('id'))

    var subview = new AsanaClone.Views.TaskShow({
      model: task,
      collection: this.collection
    });

    this._currentView && this._currentView.remove();
    this._currentView = subview;
    this.addSubview('#task-detail-show', subview);
  }
})

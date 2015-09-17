// project will have its own show page listing tasks as composite view
AsanaClone.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST["projects/show"],

  initialize: function () {
    //this.model = project
    //this.collection = tasks
    this.collection = this.model.tasks();


    this.collection.forEach(function(task) {
      this.addTaskLinkItem(task);
    }.bind(this));
  },

  events: {
    "click .editable": "editTask",
    "blur .edit-task": "updateTask"
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
    //probably need to listen to sync and render in this view

    this.addSubview("#tasks", subview)
  },

  editTask: function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var field = $target.data('field') //right now, only name, but will be adding others
    var $input = $("<input class='edit-task'>");

    $input.data('field', field);
    var task = this.collection.getOrFetch($target.data('id'))
    $input.val(task.escape(field));
    $target.removeClass('editable');
    $target.html($input);
    $input.focus();
  },

  // saveTask: function (e) {
  //   e.preventDefault();
  //   var $target = $(e.currentTarget);
  //   var field = $target.data('field');
  //   var newVal = $target.val();
  //
  //   var task = this.collection.getOrFetch($target.data('id'))
  //   task.set(field, newVal);
  //   task.save();
  // }
  ///write thsese out separately... edit in place and create a new one as a link??
})

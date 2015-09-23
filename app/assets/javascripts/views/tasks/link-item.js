AsanaClone.Views.TaskLinkItem = Backbone.CompositeView.extend({
  template: JST['tasks/link-item'],

  tagName: "li",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click .editable": "editTask",
    "blur .edit-task": "saveTask",
    "keyup .edit-task": "maybeSaveTask"
  },

  render: function () {
    var renderedContent = this.template({
      task: this.model,
      // tasks: this.collection //still may not need this
    });

    this.$el.html(renderedContent);
    return this;
  },

  editTask: function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var field = $target.data('field') //right now, only name, but will be adding others
    var $input = $("<input class=\"edit-task\">");

    $input.data('field', field);
    $input.val(this.model.escape(field));
    $target.removeClass('editable');
    $target.html($input);
    $input.focus();
  },

  saveTask: function (e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var field = $target.data('field');
    var newVal = $target.val();

    this.model.set(field, newVal);
    this.model.save();
    this.render();
  },

  maybeSaveTask: function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.saveTask(e);
    }
  },
})

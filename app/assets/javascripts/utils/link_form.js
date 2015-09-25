Backbone.LinkFormView = Backbone.View.extend({
  formShowing: false,

  events: {
    "click a": "showForm", // click a link, show the form
    "click .close": "hideForm", //click close class, hide the form
    "submit .task-form": "createTask", //create is and underscore collection method... will be defined specifically in views using LinkFormView
    "submit": "create",
    "keydown text": "maybeCreate", //allows creation based on pressing enter, keycode 13
  },

  render: function () {
    var content;
    if (this.formShowing) {
      content = this.formTemplate();
    } else {
      content = this.linkTemplate();
    }

    this.$el.html(content);
    this.delegateEvents(); //binds events hash to right place (I like 80% understand this, revisit)
    return this;
  },

  hideForm: function () {
    this.formShowing = false;
    this.render();
  },

  maybeCreate: function(e) {
    if (e.keyCode === 13) {
      this.create(e);
    }
  },

  showForm: function (e) {
    e.preventDefault();
    this.formShowing = true;
    this.render();
    this.$('input').focus();
  }
});

AsanaClone.Views.TaskMiniForm = Backbone.LinkFormView.extend({
  formTemplate: JST['tasks/mini_form'],
  linkTemplate: JST['tasks/mini_form_link'],

  create: function (event) {
    event.preventDefault();
    this.collection.create({
      project_id: this.collection.project.id,
      name: this.$('input').val() //add other values like description later...
    }, {wait: true}); //adding new task to collection, (attrs, options),
    //waits for server before setting attributes
    this.hideForm();
  }
})

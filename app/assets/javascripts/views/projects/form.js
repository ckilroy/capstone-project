AsanaClone.Views.ProjectForm = Backbone.LinkFormView.extend({
  formTemplate: JST['projects/form'],
  linkTemplate: JST['projects/form_link'],

  initialize: function (options) {
    this.projects = options.projects
  },

  create: function (event) {
    event.preventDefault();
    this.projects.create({
      workspace_id: this.projects.workspace.id,
      name: this.$('input').val() //add other values like description later...
    }, {wait: true}); //adding new project to collection, (attrs, options),
    //waits for server before setting attributes
    this.hideForm();
  }
})

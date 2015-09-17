AsanaClone.Collections.Tasks = Backbone.Collection.extend({
  model: AsanaClone.Models.Task,

  initialize: function (models, options){
    this.project = options.project;
  }
});

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([{email: "ckilroy", password: "password"}, {email: "not-me", password: "password"}])
workspaces = Workspace.create([{name: "Personal Workspace"}, {name: "Team Workspace"}])

#ckilroy is associated with both
UserWorkspace.create({user_id: users[0].id, workspace_id: workspaces[0].id})
UserWorkspace.create({user_id: users[0].id, workspace_id: workspaces[1].id})
#not-me is only associated with the team workspace
UserWorkspace.create({user_id: users[1].id, workspace_id: workspaces[1].id})

Project.create({name: "Team Project One", workspace_id: workspaces[1].id})
Project.create({name: "Team Project Two", workspace_id: workspaces[1].id})
Project.create({name: "Personal Project", workspace_id: workspaces[0].id})

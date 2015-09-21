json.extract! @user, :id ,:email

json.workspaces @user.workspaces do |workspace|
  json.extract! workspace, :id, :name
end

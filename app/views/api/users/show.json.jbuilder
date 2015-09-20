json.extract! @user, :id

json.workspaces @user.workspaces do |workspace|
  json.extract! workspace, :id
end

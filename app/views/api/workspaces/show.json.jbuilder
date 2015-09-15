json.extract! @workspace, :name

json.projects @workspace.projects do |project|
  json.extract! project, :name, :description, :created_at, :updated_at
end

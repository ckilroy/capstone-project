json.extract! @workspace, :id, :name

json.projects @workspace.projects do |project|
  json.extract! project, :id, :name, :description, :created_at, :updated_at
end

class ChangeProjectsWorkspaceIdCol < ActiveRecord::Migration
  def change
    change_column_null :projects, :workspace_id, false
  end
end

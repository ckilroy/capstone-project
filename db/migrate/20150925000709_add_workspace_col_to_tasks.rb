class AddWorkspaceColToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :workspace_id, :integer

    add_index :tasks, :workspace_id
  end
end

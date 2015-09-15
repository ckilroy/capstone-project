class RenameUserWorkspaceJoinTable < ActiveRecord::Migration
  def change
    rename_table :users_workspaces, :user_workspaces
  end
end

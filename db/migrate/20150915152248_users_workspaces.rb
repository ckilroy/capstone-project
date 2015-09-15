class UsersWorkspaces < ActiveRecord::Migration
  def change
    create_table :users_workspaces do |t|
      t.integer :user_id
      t.integer :workspace_id

      t.timestamps
    end
  end
end

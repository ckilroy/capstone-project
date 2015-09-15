class CreateWorkspaces < ActiveRecord::Migration
  def change
    create_table :workspaces do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end

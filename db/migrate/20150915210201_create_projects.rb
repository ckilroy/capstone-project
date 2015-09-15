class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description
      t.integer :workspace_id

      t.timestamps
    end

  add_index :projects, :workspace_id
  end
end

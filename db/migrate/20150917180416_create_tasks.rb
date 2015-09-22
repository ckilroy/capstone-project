class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.datetime :due_date
      t.boolean :completed, default: false
      t.integer :priority
      t.integer :creator_id, null: false
      t.integer :assignee_id
      t.integer :project_id

      t.timestamps
    end

  add_index :tasks, :creator_id
  add_index :tasks, :assignee_id
  add_index :tasks, :project_id
  end
end

class AddsDashboardColumnToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :on_dashboard, :boolean, :default => true
  end
end

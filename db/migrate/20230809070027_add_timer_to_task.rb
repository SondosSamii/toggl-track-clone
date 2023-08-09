class AddTimerToTask < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :total_time_elapsed, :integer
  end
end

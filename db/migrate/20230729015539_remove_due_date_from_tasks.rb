class RemoveDueDateFromTasks < ActiveRecord::Migration[7.0]
  def change
    remove_column :tasks, :due_date
  end
end

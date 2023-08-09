class Task < ApplicationRecord
  belongs_to :project

  # attr_accessor :total_time_elapsed
  attribute :total_time_elapsed, :integer, default: 0
end

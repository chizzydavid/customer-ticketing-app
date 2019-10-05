class AddStatusToTickets < ActiveRecord::Migration[6.0]
  def change
    add_column :tickets, :status, :string, :default => "open"
  end
end

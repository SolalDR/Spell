class AddDescriptionToBooks < ActiveRecord::Migration[5.0]
  def change
    add_column :books, :description, :text
    add_column :books, :publisher, :text
  end
end

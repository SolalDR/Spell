class AddStartFragmentToBook < ActiveRecord::Migration[5.0]
  def change
    add_reference :books, :fragment
  end
end

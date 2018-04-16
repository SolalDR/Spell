class AddBookToFragments < ActiveRecord::Migration[5.0]
  def change
    add_reference :fragments, :book, foreign_key: true
  end
end

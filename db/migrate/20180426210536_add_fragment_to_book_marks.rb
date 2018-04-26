class AddFragmentToBookMarks < ActiveRecord::Migration[5.0]
  def change
    add_reference :book_marks, :fragment, foreign_key: true
  end
end

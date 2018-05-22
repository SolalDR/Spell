class CreateBookMarks < ActiveRecord::Migration[5.0]
  def change
    create_table :book_marks do |t|
      t.references :user, foreign_key: true
      t.references :book, foreign_key: true
      t.jsonb :config, null: false, default: {}
      t.integer :nb_visit

      t.timestamps
    end
  end
end

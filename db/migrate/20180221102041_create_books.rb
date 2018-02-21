class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title, 			nullable: false
      t.string :author, 		nullable: false
      t.integer :age, 			default: nil
      t.boolean :interactive, 	default: false

      t.timestamps
    end
  end
end

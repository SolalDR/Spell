class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'citext'

    create_table :books do |t|
      t.string :title, 			nullable: false
      t.string :author, 		nullable: false
      t.integer :age, 			default: nil
      t.integer :format, 		default: 0
      t.jsonb :config, null: false, default: {}
      t.timestamps
    end
  end
end

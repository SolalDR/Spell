class CreateWords < ActiveRecord::Migration[5.0]
  def change
    create_table :words do |t|
      t.string :name, nullable: false
      t.string :match
      t.timestamps
    end

    add_attachment :words, :file
    add_reference :words, :book
  end
end

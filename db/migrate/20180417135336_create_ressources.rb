class CreateRessources < ActiveRecord::Migration[5.0]
  def change
    create_table :ressources do |t|
      t.integer :mode, default: 0
      t.string :name
      t.timestamps
    end
  end
end

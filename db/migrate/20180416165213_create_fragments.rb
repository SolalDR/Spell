class CreateFragments < ActiveRecord::Migration[5.0]
  def change
    create_table :fragments do |t|
      t.string :name
      t.text :content
      t.text :config

      t.timestamps
    end
  end
end

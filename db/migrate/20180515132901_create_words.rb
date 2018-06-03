class CreateWords < ActiveRecord::Migration[5.0]
  def change
    create_table :words do |t|
      t.string :name, nullable: false
      t.string :match
      t.timestamps
      t.jsonb :config, null: false, default: { match: nil, options: {}, synonymous: [] }
    end

    add_attachment :words, :thumbnail
    add_attachment :words, :figure
    add_reference :words, :book
  end
end

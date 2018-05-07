class AddThumbnailsToBooksAndFragments < ActiveRecord::Migration[5.0]
  def change
    add_attachment :books, :thumbnail
    add_attachment :books, :cover
    add_attachment :fragments, :thumbnail
  end
end

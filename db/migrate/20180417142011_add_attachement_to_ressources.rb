class AddAttachementToRessources < ActiveRecord::Migration[5.0]
  def up
    add_attachment :ressources, :file
  end

  def down
    remove_attachment :ressources, :file
  end
end

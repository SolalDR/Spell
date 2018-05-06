class AddPolymorphicRelationToRessource < ActiveRecord::Migration[5.0]
  def change 
    add_reference :ressources, :ressourceable, polymorphic: true, index: true
  end
end

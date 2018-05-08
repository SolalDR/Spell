# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)




b = Book.create!({ 
  :title => "Mission Mars", 
  :author => "Delphine Chedru", 
  :age => 4, 
  :publisher => "Edition Hélium",
  :description => "Retrouvons la princesse Attaque et son compagnon le chevalier Courage \n Après leurs dernières aventures, ils courent des jours paisibles dans leur château."
})

json = ActiveSupport::JSON.decode(File.read('db/seeds/fragments.json'))
json.each do |a|
  Fragment.create!({
    book_id: b.id,
    name: a['name'], 
    content: a['content']
  })
end

json.each do |a|
  f = Fragment.where(name: a['name']).first
  a['children'].each do |c|
    f.children << Fragment.where(name: c['name']).first
  end

  f.save
end


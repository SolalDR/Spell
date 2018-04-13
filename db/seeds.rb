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

u = User.create!({
  :email => "admin@admin.com",
  :password => "adminadmin",
  :status => 2
})

bm = BookMark.create!({
  :user => u,
  :book => b
})

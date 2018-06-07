# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



jsonB = {
  "choices": {
    "choice_1": {
      "value":"test2", 
      "choices": ["test", "test2"]
    }
  }, 
  "variables": {
    "sound_gain": 1, 
    "sound_mute": false, 
    "participation": true, 
    "display_quality": "high", 
    "voice_recognition": true
  },
  "character": {
    "color_id": nil,
    "color_hex": "#139850",
    "body_parts": {
      "csqe": 1,
      "tete": 1,
      "crps": 1,
      "bras": 1,
      "jmbe": 1
    },
    "name": "Chevalier Courage",
    "ressource_id": 1
  }
}

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


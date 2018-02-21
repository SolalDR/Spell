json.extract! book, :id, :title, :author, :age, :interactive, :created_at, :updated_at
json.url book_url(book, format: :json)

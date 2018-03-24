json.extract! book_mark, :id, :user_id, :book_id, :config, :nb_visit, :created_at, :updated_at
json.url book_mark_url(book_mark, format: :json)

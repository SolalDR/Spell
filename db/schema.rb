# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180515132901) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "citext"

  create_table "book_marks", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "book_id"
    t.jsonb    "config",      default: {}, null: false
    t.integer  "nb_visit"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "fragment_id"
    t.index ["book_id"], name: "index_book_marks_on_book_id", using: :btree
    t.index ["fragment_id"], name: "index_book_marks_on_fragment_id", using: :btree
    t.index ["user_id"], name: "index_book_marks_on_user_id", using: :btree
  end

  create_table "books", force: :cascade do |t|
    t.string   "title"
    t.string   "author"
    t.integer  "age"
    t.integer  "format",                 default: 0
    t.jsonb    "config",                 default: {}, null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.text     "description"
    t.text     "publisher"
    t.string   "thumbnail_file_name"
    t.string   "thumbnail_content_type"
    t.integer  "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.string   "cover_file_name"
    t.string   "cover_content_type"
    t.integer  "cover_file_size"
    t.datetime "cover_updated_at"
  end

  create_table "fragment_links", force: :cascade do |t|
    t.integer  "parent_id"
    t.integer  "child_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fragments", force: :cascade do |t|
    t.string   "name"
    t.text     "content"
    t.jsonb    "config",                 default: {}, null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "book_id"
    t.string   "thumbnail_file_name"
    t.string   "thumbnail_content_type"
    t.integer  "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.index ["book_id"], name: "index_fragments_on_book_id", using: :btree
  end

  create_table "ressources", force: :cascade do |t|
    t.integer  "mode",               default: 0
    t.string   "name"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.string   "ressourceable_type"
    t.integer  "ressourceable_id"
    t.index ["ressourceable_type", "ressourceable_id"], name: "index_ressources_on_ressourceable_type_and_ressourceable_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "status",                 default: 0,  null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "words", force: :cascade do |t|
    t.string   "name"
    t.string   "match"
    t.datetime "created_at",                                                                       null: false
    t.datetime "updated_at",                                                                       null: false
    t.jsonb    "config",                 default: {"match"=>nil, "options"=>{}, "synonymous"=>[]}, null: false
    t.string   "thumbnail_file_name"
    t.string   "thumbnail_content_type"
    t.integer  "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.string   "figure_file_name"
    t.string   "figure_content_type"
    t.integer  "figure_file_size"
    t.datetime "figure_updated_at"
    t.integer  "book_id"
    t.index ["book_id"], name: "index_words_on_book_id", using: :btree
  end

  add_foreign_key "book_marks", "books"
  add_foreign_key "book_marks", "fragments"
  add_foreign_key "book_marks", "users"
  add_foreign_key "fragments", "books"
end

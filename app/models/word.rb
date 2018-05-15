class Word < ApplicationRecord
  
  belongs_to :book
  has_attached_file :file, default_url: "/images/missing_book.png"
  validates_attachment_content_type :file, :content_type => ["image/gif", "image/jpg", "image/jpeg", "image/png"]

end

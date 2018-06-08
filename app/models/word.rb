# == Schema Information
#
# Table name: words
#
#  id                     :integer          not null, primary key
#  name                   :string
#  match                  :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  config                 :jsonb            not null
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#  figure_file_name       :string
#  figure_content_type    :string
#  figure_file_size       :integer
#  figure_updated_at      :datetime
#  book_id                :integer
#

class Word < ApplicationRecord
  
  belongs_to :book
  has_attached_file :thumbnail, default_url: "/images/missing_book.png"
  has_attached_file :figure, default_url: "/images/missing_book.png"

  validates_attachment_content_type :thumbnail, :content_type => ["image/gif", "image/jpg", "image/jpeg", "image/png"]
  validates_attachment_content_type :figure, :content_type => ["image/gif", "image/jpg", "image/jpeg", "image/png", "video/mp4"]

  def file_url
    figure.url
  end
end




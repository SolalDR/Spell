# == Schema Information
#
# Table name: books
#
#  id                     :integer          not null, primary key
#  title                  :string
#  author                 :string
#  age                    :integer
#  format                 :integer          default("bard")
#  config                 :jsonb            not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  description            :text
#  publisher              :text
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#  cover_file_name        :string
#  cover_content_type     :string
#  cover_file_size        :integer
#  cover_updated_at       :datetime
#

class Book < ApplicationRecord
  has_many :fragments, dependent: :destroy
  has_many :book_marks, dependent: :destroy
  has_many :words, dependent: :destroy
  has_many :ressources, as: :ressourceable, :dependent => :destroy
  belongs_to :fragment
  
  has_attached_file :thumbnail, default_url: "/images/missing_book_thumbnail.png"
  has_attached_file :cover, default_url: "/images/missing_book.png"
  
  validates_attachment_content_type :thumbnail, :content_type => ["image/jpg", "image/jpeg", "image/png"]
  validates_attachment_content_type :cover, :content_type => ["image/jpg", "image/jpeg", "image/png"]

  accepts_nested_attributes_for :ressources, :reject_if => :all_blank, :allow_destroy => true

  enum :format => { :bard => 0, :epub => 1 }
  formats = { :bard => 0, :epub => 1 }



  def dictionnary
    dictionnary = words.map { |w| {id: w.id, name: w.name, match: w.match, url: w.file_url }}.to_json
  end

end

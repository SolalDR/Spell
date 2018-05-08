# == Schema Information
#
# Table name: books
#
#  id          :integer          not null, primary key
#  title       :string
#  author      :string
#  age         :integer
#  format      :integer          default("bard")
#  config      :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#  publisher   :text
#

class Book < ApplicationRecord
  has_many :fragments
  has_many :ressources, as: :ressourceable, :dependent => :destroy
  
  has_attached_file :thumbnail, default_url: "/images/missing_book.png"
  has_attached_file :cover, default_url: "/images/missing_book.png"
  validates_attachment_content_type :thumbnail, :content_type => ["image/jpg", "image/jpeg", "image/png"]
  validates_attachment_content_type :cover, :content_type => ["image/jpg", "image/jpeg", "image/png"]

  accepts_nested_attributes_for :ressources, :reject_if => :all_blank, :allow_destroy => true

  enum :format => { :bard => 0, :epub => 1 }
  formats = { :bard => 0, :epub => 1 }

end

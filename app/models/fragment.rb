# == Schema Information
#
# Table name: fragments
#
#  id         :integer          not null, primary key
#  name       :string
#  content    :text
#  config     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  book_id    :integer
#

class Fragment < ApplicationRecord
  belongs_to :book
  has_many :ressources, as: :ressourceable, dependent: :destroy
  has_many :fragment_links, :foreign_key => :parent_id, dependent: :destroy
  has_many :children, :through => :fragment_links, :source => :child

  has_attached_file :thumbnail, default_url: "/images/missing_fragment.png"
  validates_attachment_content_type :thumbnail, :content_type => ["image/jpg", "image/jpeg", "image/png"]

  
end

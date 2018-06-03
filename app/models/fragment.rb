# == Schema Information
#
# Table name: fragments
#
#  id                     :integer          not null, primary key
#  name                   :string
#  content                :text
#  config                 :jsonb            not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  book_id                :integer
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#

class Fragment < ApplicationRecord
  belongs_to :book
  has_many :ressources, as: :ressourceable, dependent: :destroy
  has_many :fragment_links, :foreign_key => :parent_id, dependent: :destroy
  has_many :children, :through => :fragment_links, :source => :child

  has_attached_file :thumbnail, default_url: "/images/missing_fragment.png"
  validates_attachment_content_type :thumbnail, :content_type => ["image/jpg", "image/jpeg", "image/png"]

  accepts_nested_attributes_for :ressources, :reject_if => :all_blank, :allow_destroy => true

  def js_class
    # I18n.transliterate(@fragment.name.split.map(&:capitalize).join)
    name.parameterize(separator: "_").classify
  end
    
end

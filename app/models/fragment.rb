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

  has_many :fragment_links, :foreign_key => :parent_id
  has_many :children, :through => :fragment_links, :source => :child
end

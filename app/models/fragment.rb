class Fragment < ApplicationRecord
  belongs_to :book

  has_many :fragment_links, :foreign_key => :parent_id
  has_many :children, :through => :fragment_links, :source => :child
end

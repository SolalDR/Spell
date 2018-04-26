# == Schema Information
#
# Table name: fragment_links
#
#  id         :integer          not null, primary key
#  parent_id  :integer
#  child_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class FragmentLink < ApplicationRecord
  belongs_to :parent, :class_name => 'Fragment'
  belongs_to :child, :class_name => 'Fragment'
end

class FragmentLink < ApplicationRecord
  belongs_to :parent, :class_name => 'Fragment'
  belongs_to :child, :class_name => 'Fragment'
end

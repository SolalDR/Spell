# == Schema Information
#
# Table name: ressources
#
#  id                 :integer          not null, primary key
#  mode               :integer          default("3d")
#  name               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  file_file_name     :string
#  file_content_type  :string
#  file_file_size     :integer
#  file_updated_at    :datetime
#  ressourceable_type :string
#  ressourceable_id   :integer
#

class Ressource < ApplicationRecord
  has_attached_file :file, default_url: "/images/missing_fragment.png"
  validates_attachment_content_type :file, :content_type => ["application/json", "text/plain", "image/jpg", "image/jpeg", "image/png", "image/gif"]
  belongs_to :ressourceable, polymorphic: true, :inverse_of => :ressources

  enum mode: ["3d", "image", "sound", "text"]
end

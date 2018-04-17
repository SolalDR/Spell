class Ressource < ApplicationRecord
  has_attached_file :file

  enum mode: ["3d", "image", "sound", "text"]
end

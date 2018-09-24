require 'pry'

module Web::Controllers::Songs
  class Create
    include Web::Action

    def call(params)
      binding.pry
    end
  end
end

require 'spec_helper'

describe CreateSong do
  let(:interactor) { CreateSong.new }
  let(:attributes) do
    {
      title: 'my new song',
      stems: [
        {}
      ]
    }
  end

  describe 'good input' do
    it 'succeeds' do
      expect(interactor.call(attributes)).to be_a_success
    end
  end
end

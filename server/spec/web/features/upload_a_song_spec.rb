require 'features_helper'

feature 'Song management' do
  scenario 'User can upload a new song' do
    visit '/'

    click_on 'New Song'

    fill_in 'Title', with: 'Some Song'
    attach_file 'Stems', Hanami.root + 'spec/web/features/fixtures/some-stem.mp3'

    click_on 'Create'
  end
end
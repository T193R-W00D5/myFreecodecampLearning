# frozen_string_literal: true

source "https://rubygems.org"

# Jekyll and GitHub Pages compatibility
gem "jekyll", "~> 4.4"
gem "webrick" # Required for Ruby 3.0+

# GitHub Pages plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# Performance-booster for watching directories on Windows
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem 'wdm', '>= 0.1.0'
end

# Lock HTTP parser to v0.6.x on JRuby builds since newer versions of the gem
# do not have a Java counterpart
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
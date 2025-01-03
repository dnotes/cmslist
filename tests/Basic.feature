Feature: Basic

Background:
  Given I am on "/"

@js @nojs
Scenario: the site very basically works with or without Javascript
  Then I should see a "CMS Showdown" heading
  And I should see a "WordPress" link
  When I click on the "WordPress" link
  Then I should see a "WordPress" heading
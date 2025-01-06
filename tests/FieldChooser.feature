Feature: Field Chooser

Background:
  Given I am on "/"
  And I click on the "Show fields" button

Scenario: the title field is not visible
  Then I should see a "Field list" dialog
  But I should not see a "CMS Name" checkbox

Scenario: the fields can be filtered
  When I select the following fields:
    | rank |
    | webMarketShare |
  Then I should not see a column for "paradigm"
  But I should see a column for "CMS Name"

Scenario: fields show and hide instantly
  When I check the "backend lang." checkbox
  Then I should immediately see a column for "backend lang."

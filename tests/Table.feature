Feature: Table

  As a user
  I should see all the content on the front page

  Rule: Front page table

    Background:
      Given I am on "/"

    Scenario: There is a link to each CMS
      Then I should see a "WordPress" link

    Scenario: Users can select multiple rows from the table
      When I click on the row for "WordPress"
      Then the "WordPress" row should be selected
      When I click on the row for "Joomla"
      Then the "WordPress" row should still be selected
      And the "Joomla" row should be selected

    Scenario: Users can compare selected rows
      When I select the following rows:
        | Wordpress |
        | Joomla    |
        | Drupal    |
      Then the "Compare" button should be enabled
      And the following rows should be selected:
        | Wordpress |
        | Joomla    |
        | Drupal    |
      When I click on the "Compare" button
      Then the url should contain "/compare?ids=drupal,joomla,wordpress"

  Rule: Field Chooser

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

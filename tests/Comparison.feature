Feature: Comparison

  As a user
  I want to be able to compare different CMS options
  In order to choose the best one for my needs

  Scenario: Users can select multiple rows from the table
    Given I am on "/"
    When I click on the row for "WordPress"
    Then the "WordPress" row should be selected
    When I click on the row for "Joomla"
    Then the "WordPress" row should still be selected
    And the "Joomla" row should be selected

  Scenario: Users can compare selected rows
    Given I am on "/"
    When I select the following rows:
      | Wordpress |
      | Joomla    |
      | Drupal    |
    Then I should see a "Compare" button
    When I click on the "Compare" button
    Then the url should be "/compare?ids=wordpress,joomla,drupal"

  Scenario: Users can see the comparison results
    Given I am on "/compare?ids=wordpress,joomla,drupal"
    Then I should see the full listing for "Wordpress"
    And I should see the full listing for "Joomla"
    And I should see the full listing for "Drupal"
    And I should not see the full listing for "Shopify"
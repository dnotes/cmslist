Feature: Comparison

  As a user
  I want to be able to compare different CMS options
  In order to choose the best one for my needs

  Scenario: Users can see the comparison results
    Given I am on "/compare?ids=wordpress,joomla,drupal"
    Then I should see the full listing for "Wordpress"
    And I should see the full listing for "Joomla"
    And I should see the full listing for "Drupal"
    And I should NOT see the full listing for "Shopify"

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

  Scenario: There is a dropdown to add more CMS comparisons
    Given I am on "/compare?ids=wordpress"
    Then I should see a "Go" button

  Scenario: There are links to add more CMS comparisons
    Given I am on "/compare?ids=wordpress"
    Then I should see the full listing for "WordPress"
    And I should see a "+Drupal" link
    But I should NOT see a "+WordPress" link

  Scenario: An empty Compare page has links
    Given I am on "/compare"
    Then I should see a "+Drupal" link
    And I should see a "+WordPress" link

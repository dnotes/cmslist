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

  Scenario: Even an empty Compare page has links
    Given I am on "/compare"
    Then I should see a "+Drupal" link
    And I should see a "+WordPress" link

  Scenario: Comparison pages have a good title
    Given I am on "/compare?ids=drupal,wordpress"
    Then the "title" metatag should contain "WordPress vs. Drupal"

  Scenario: With one comparison page, the title invites comparing
    Given I am on "/compare?ids=wordpress"
    Then the "title" metatag should contain "Compare WordPress with any other CMS"

  @mobile @soft
  Rule: Comparison must work for mobile Users

    Users see one CMS at a time, but can move between them

    Scenario: Comparing two items
      Given I am on "/compare?ids=drupal,wordpress"
      Then I should see a "WordPress" heading
      And I should not see a "Drupal" heading
      When I click the "Drupal" button
      Then I should see a "Drupal" heading
      When I scroll to the "Costs" heading
      And I click the "Wordpress" button
      Then the "Costs" heading should still be visible

    Scenario: One item is selected
      Given I am on "/compare?ids=wordpress"
      When I swipe left
      Then I should see the list of links to compare

Feature: Detail

  As a user
  I want to see a detail view of a CMS
  In order to learn more about it

  Scenario: Users can navigate to the detail view of a CMS
    Given I am on "/detail/wordpress"
    Then the screenshot of the "WordPress" heading should match
    And I should see the full listing for "WordPress"
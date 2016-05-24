---
title: iOS Developers Guide | Parse
permalink: /ios/guide/
layout: guide
platform: ios
platform_pretty: iOS
quickstart: https://parse.com/apps/quickstart
api_reference: https://parse.com/docs/ios/api/

sections_old: ["ios/getting-started.md", "ios/objects.md", "ios/queries.md", "ios/users.md", "common/sessions.md", "ios/roles.md", "ios/files.md", "ios/geopoints.md", "ios/local-datastore.md", "ios/extensions.md", "ios/push-notifications.md", "ios/config.md", "ios/analytics.md", "ios/user-interface.md", "ios/in-app-purchases.md", "common/data.md", "common/relations.md", "ios/handling-errors.md", "common/security.md", "common/performance.md", "common/errors.md" ]

sections:
- title: Getting Started
- title: Objects
  sections:
  - title: The PFObject
  - title: Saving Objects
  - title: Retrieving Objects
  - title: The Local Datastore
  - title: Saving Objects Offline
  - title: Updating Objects
  - title: Deleting Objects
  - title: Relational Data
  - title: Data Types
  - title: Subclasses
- title: Queries
  sections:
  - title: Basic Queries
  - title: Specifying Constraints with NSPredicate
  - title: Query Constraints
  - title: Queries on Array Values
  - title: Queries On String Values
  - title: Relational Queries
  - title: Querying The Local Datastore
  - title: Caching Queries
  - title: Counting Objects
  - title: Compound Queries
  - title: Subclass Queries
- title: Users
  sections:
  - title: Properties
  - title: Signing Up
  - title: Logging In
  - title: Verifying Emails
  - title: Current User
  - title: Anonymous Users
  - title: Setting The Current User
  - title: Security For User Objects
  - title: Resetting Passwords
  - title: Querying
  - title: Associations
  - title: Facebook Users
  - title: Twitter Users
- title: Sessions
  common: true
  sections:
  - title: Properties
  - title: Handling Invalid Session Token Error
  - title: Security
- title: Roles
- title: Files
- title: GeoPoints
- title: Local Datastore
- title: Extensions
- title: Push Notifications
- title: Config
- title: Analytics
- title: User Interface
- title: In-App Purchases
- title: Data
  common: true
- title: Relations
  common: true
- title: Handling Errors
- title: Security
  common: true
- title: Performance
  common: true
- title: Errors
  common: true


---

<div id="toc">
  <div class="top_links">
  {% if page.quickstart %}
    <a href="{{ page.quickstart }}">Quickstart<i class="icon_minimize"></i></a>
  {% endif %}
  {% if page.api_reference %}
    <a href="{{ page.api_reference }}">API Reference<i class="icon_minimize"></i></a>
  {% endif %}

    <ul class="ui_live_toc">
    {% for section in page.sections %}
      <li data-name="{{ section.source }}" class="ui_live_toc_main">
        <a href="#{{ section.title | downcase | replace: " ", "-" }}">{{ section.title }}</a>
        <ul class="ui_live_toc_major_list">
        {% for subsection in section.sections %}
          <li data-name="{{ subsection.title }}" class="ui_live_toc_major">
            <a href="#{{ subsection.title | downcase | replace: " ", "-" }}">{{ subsection.title }}</a>
          </li>
        {% endfor %}
        </ul>
      </li>
    {% endfor %}
    </ul>

  </div>
</div>

<div class="wysiwyg-content">
  {% for section in page.sections %}
    {% capture section_include %}{% if section.common }{% include common/{{ section.title | downcase | replace: " ", "-" }}.md %}{% else %}{% include {{ page.platform }}/{{ section.title | downcase | replace: " ", "-" }}.md %}{% endif %}{% endcapture %}
    {{ section_include | markdownify }}

    {% include helpful_box.html %}
  {% endfor %}
</div>

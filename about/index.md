---
layout: layouts/page.njk
title: About Me
navtitle: About
navorder: 2
---

I'm a web developer, but first and foremost, I'm a community member. My communities include women-in-tech-on-Twitter, progressives fighting for change in a red state, [advocates for renters' rights and affordable housing](https://facebook.com/RentersTogetherLNK/), my book club, people making cool stuff on [Glitch](https://www.glitch.com), and so many more. My communities are what drive me - coding is my job but not my life, even though some of those community memberships only make sense _because_ I code.

Recently, I [ran for City Council](http://casseyforcouncil.com) in Lincoln, Nebraska. I ran to draw attention to the importance of ensuring adequate and affordable housing for people of all income levels in Lincoln, and to be an advocate for neighborhoods that have been neglected by city officials for too long.

<hr/>
<h2>Now</h2>
I'm currently reading: 
{% if reading_list.current|length %}
<ul>
{% for book in reading_list.current %}
  <li><u>{{ book["name"]}}</u> {% if book.author %}by {% endif %} {{book.author}}
{% endfor %}
</ul>
{% endif %}

{% if not reading_list.current|length %}
  Nothing! Check back soon to see what I've started.
{% endif %}

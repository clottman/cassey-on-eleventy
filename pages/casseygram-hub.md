---
layout: layouts/post.njk
title: Casseygram
navtitle: Casseygram
navorder: 500
permalink: '/casseygram/'
pagination:
    data: images
    size: 20
---

This page is a work-in-progress. I'm experimenting with using Sanity CMS to host images that appear here.

It's not as pretty as that other gram site, and it's not as social (DM me on twitter to comment, for now, I guess, and if you want to 'like' a photo, smile at your screen) but it's all mine.

<ul class="casseygram-hub">
{%- for item in pagination.items %}
    <li class="casseygram-entry">
        <a href="/casseygram/{{ item.date }}-{{item.slug}}/">{{item.image | markdownify | safe}}</a>
        <p>{{ item.caption }}</p>
    </li>
{%- endfor %}
</ul>

<!-- 
<nav aria-label="Photo Pages">
    <ol>
      <li>{% if page.url != pagination.href.first %}<a href="{{ pagination.href.first }}">First</a>{% else %}First{% endif %}</li>
      <li>{% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">Previous</a>{% else %}Previous{% endif %}</li>
  {%- for pageEntry in pagination.pages %}
      <li><a href="{{ pagination.hrefs[ loop.index0 ] }}"{% if page.url == pagination.hrefs[ loop.index0 ] %} aria-current="page"{% endif %}>Page {{ loop.index }}</a></li>
  {%- endfor %}
      <li>{% if pagination.href.next %}<a href="{{ pagination.href.next }}">Next</a>{% else %}Next{% endif %}</li>
      <li>{% if page.url != pagination.href.last %}<a href="{{ pagination.href.last }}">Last</a>{% else %}Last{% endif %}</li>
    </ol>
</nav>
-->
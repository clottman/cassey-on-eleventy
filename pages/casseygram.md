---
tags: casseygram
pagination: 
    data: images
    size: 1
    alias: thisImage
    addAllPagesToCollections: true
permalink: "casseygram/{{ thisImage.date }}-{{thisImage.slug}}/index.html"    
layout: layouts/post.njk

---

{{ thisImage.image | safe }}
{{ thisImage.caption }}

<p><a href="{{ '/casseygram' | url }}"><span aria-hidden="true">← </span>Back to Casseygram</a></p>

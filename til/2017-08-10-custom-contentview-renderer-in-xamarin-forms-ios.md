---
til-tags: ['post', 'xamarin']
title: Custom ContentView Renderer in Xamarin Forms iOS
date: 2017-08-10
---

Today I learned how to write a custom renderer in iOS for a ContentPage in Xamarin Forms. 

At first I tried using extending Xamarin Forms' View class, but I found that the View did not size itself properly within the content page which was hosted in a NavigationPage. My custom content, which was supposed to be in the vertical center, appeared too far down because it didn't know it was being pushed down by the navigation bar. 

Instead of: 
NavigationPage.Push(
 -> Content View
   -> Custom View
)

I'm using 
NavigationPage.Push(
 -> Custom Content View
    -> CustomContentView.AddView(myControl);
)

and everything is centered properly. 
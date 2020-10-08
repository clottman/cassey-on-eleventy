---
tags: ['post', 'xamarin']
title: Xamarin Forms Reading
date: 2017-08-11
---

From [Chapter 27, Custom Renderers, in Creating Mobile Apps with Xamarin.Forms](https://xamarin.azureedge.net/developer/xamarin-forms-book/XamarinFormsBook-Ch27-Apr2016.pdf) I learned that the way to propagate property changed notifications from a Xamarin Forms control to the custom renderer that renders it, you can overload `OnElementPropertyChanged`. Within that method you can check the property that was changed and make any UI updates you need in the native control. 

From [Chapter 24, Page Navigation](https://developer.xamarin.com/guides/xamarin-forms/creating-mobile-apps-xamarin-forms/) I learned the concrete difference between `Navigation.PushAsync(ContentPage page)` and `Navigation.PushModalAsync(page)`. On platforms without a physical back button, they will be rendered differently. When you use `PushModalAsync`, the view must provide some other way to get 'back' to the previous page. 

From [Chapter 24 again](https://developer.xamarin.com/guides/xamarin-forms/creating-mobile-apps-xamarin-forms/): I've seen people in tutorials set Padding for iOS with comments about avoiding overwriting the status bar, but I've never had to do it. The reason is that using NavigationPage as the root removes the need to do that Padding setting.

[Link to all chapters of Creating Mobile Apps with Xamarin.Forms](https://developer.xamarin.com/guides/xamarin-forms/creating-mobile-apps-xamarin-forms/)
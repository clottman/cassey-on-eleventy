---
tilTags: ['xamarin']
title: Xamarin Android List Adapter
date: 2017-06-13
---

Things I learned implementing a list adapter in Xamarin Android - 
	- FindViewById can be an expensive call, so it's recommended to use the holder pattern to keep track in memory of the views you found already
		- Typically, this is accomplished by using an internal class that has properties for each type of view you'll need to set. An instance of this holder object is set as a tag on the view returned by the adapter's getView(). When the row goes off screen or its data is invalidated, it's possible that you getView() will receive an object to re-use that has already been returned from getView(). This object comes in from the second parameter of getView(), `convertView`. You can retrieve the tag from the convertView to get the 
		- The holder pattern didn't seem very intuitive from a C# perspective, but I found something that did - subclassing layout classes. I went that route, and instead of having a tag on each basic view containing all the child view objects, each view itself was a custom class which exposed its child views as properties. Much less casting and less coupling of the adapter implementation & view code, though it did also require quite a bit of boilerplate. 
	- If you set the empty view, for when the list provided to the adapter is empty, when the list is empty the listview will show only that view and not the header/footer. I solved this by adding an <include> tag bringing in the footer layout as part of my empty view.
	- SetHeaderView() & SetFooterView() must both be called from code and can't be set in XML. So, I found it was easiest to define those in separate XML files and inflate them. 
	- You can set onClick() handlers from XML. They must be `public void` and take a single View parameter, and be defined in the context that's using the layout they are defined in. In Xamarin to make this work, you also need to give it the `[Export("MethodName")]` attribute or Java won't be able to find it. That attribute is defined in the `Java.Interop` namespace in Mono.Android.Export.

Tags in Android
	- Each view has a tag property that can store arbitrary data as a primitive or an object. You can get <view>.Tag or call <view>.FindViewWithTag to retreive the data later. However, you do have to know what kind of data is stored there. And, the tag is public so can be modified from anywhere in your application - possibly a problem if another developer tries to modify it later. Using tag lets us find and update a single child of one of the ListView's children without invalidating the whole thing. Before we knew about tags, we were keeping a dictionary mapping button objects to ID values - this is easier! 
	Note - Tags on views are not to be confused with NFC tags, which are different but share a name! 
	- In Java, tags aren't available as properties as in Xamarin Android. They can only be accessed using Java-style getters - getTag() and setTag().

Android Layout - 
	- I learned a bit more about how the various layout parameters interact in Android views. It's still kind of fuzzy, but getting clearer. All views that don't have a weight are laid out first, and any remaining space is allocated between views with weights. The allocation works like a proportion - if the total sum of weights in a layout is 3, and view with weight 1 will get 1/3 of the remaining space. If there is only one view element within a container that has a weight value, it will get all the remaining space after other elements are laid out.
		- A small optimization can be done on view elements with a weight by setting either layout_height or layout_width to 0dp to prevent them from being measured twice. Elements with a weight are always re-measured after everything else has been measured, so if you provide a value of 0 for the first pass, it will save it from measuring something that will just get re-laid out anyways. https://stackoverflow.com/questions/12016781/why-is-0dp-considered-a-performance-enhancement 


---
tilTags: ['xamarin']
title: Check Build Configuration When the Wrong Project is Building in Visual Studio
date: 2017-09-05
---


I've been having problems getting a release build of my Xamarin Forms iOS project to work. It failed with "The LinkAssemblies task failed unexpectedly." 

Googling around, I mostly saw results for Xamarin Android, and one that suggested that perhaps one of the dependencies of my iOS project referenced Xamarin Android. I checked all the references, and none included Xamarin Android. 

When I asked my coworker about it, he knew immediately what the problem was. The release configuration for the iOS project was set in Configuration Manager to also build our Xamarin Android client project which is located in the same solution. Unchecking the box for building the Xamarin Android project in the iOS project's release configuration solved the issue. 
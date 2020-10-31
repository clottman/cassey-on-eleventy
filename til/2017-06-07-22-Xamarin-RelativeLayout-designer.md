---
til-tags: ['post', 'xamarin']
title: Xamarin Android RelativeLayout Designer
date: 2017-07-22
---

Summary: In Xamarin Android, if your layout is RelativeLayout, you can only drag controls into the Designer from the Toolbox onto an edge of an existing control, if there are controls in the RelativeLayout.

### Why can't I drag a Xamarin Android control in Visual Studio from the Toolbox to the Designer? 

I'm trying to get the hang of the Xamarin Android Designer in Visual Studio 2017. In the previous version of VS I was using, the Designer rarely loaded properly so I haven't used it much before. Today, I was trying to add a RadioGroup to one of my layouts using the Designer. I found that when I dragged the control from the Toolbox to anywhere over the screen, I got 🛇 ('prohibited sign') and wasn't able to drop the control. 

I googled around for a solution, and found bug reports from a Xamarin/Xamarin Studio combination in 2015 where dropping a control didn't work. But, nothing recent at all.

Eventually I figured out that since I was using a Relative Layout on this screen, I can only drop controls onto a border of another control. If I drag the control to the bottom of an existing control in my layout, it works. 

My debugging process was opening up a new single-page app template solution for Xamarin Android, and changing the Main.axml to use a Relative Layout. From there I tested what happened when I had no controls, or just one at the top. With no controls in the relative layout, a control could be dragged anywhere onto it. Once there was a control in the Relative Layout, additional controls had to be placed explictly relative to an existing control. It makes sense once you understand what it's doing! x
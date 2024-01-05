---
title: "Transferring my Baldur's Gate 3 Save from Windows to Steam Deck"
date: 2023-12-30
tags: [posts, resources, video-games]
social_description: "arghaasdfasd"
redirectsFrom: "/posts/2023-12-30-transferring-baldurs-gate-3-to-steam-deck/"
---

Notes to self on the process I followed, to transfer a save file I started on my wife's Windows PC for Baldur's Gate 3, to my newly purchased Steam Deck with a fresh install of BG3.

**NOTE: This process didn't actually work**, but I wanted to log what I tried in case it helps future me (or you!) get farther in the process.

Follow [these steps to enable SSH on the deck](https://www.reddit.com/r/SteamDeck/comments/tz490v/enable_ssh_on_the_deck/). 
Hold down the power button to enter Steam Desktop mode on the Steam Deck. 
Open a console by using the start-like menu to find the Konsole app. Do the commands Reddit says to do to enable ssh. Set a password!!

From the Windows machine, download WinScp. Connect to deck@steamdeck, using the password you just set. 

Click the "X Hidden" label at the bottom of WinScp's window to see the hidden files in the view you're looking at, which will help you be able to find the userdata folder. The full path of that folder will be in `/home/deck/.local/share/Steam/userdata/`

I tried putting my backup folders in `/userdata/` `/1086940/remote/_SAVE_Public/Savegames`

The Linux path is apparently `/steamapps/compatdata/1086940/pfx/` and the Steam path is apparently `/userdata/1086940/remote/_PROFILE_Public` - which applies to Steam deck? I am not sure. We tried both and neither seemed to work. Of note, I hadn't already gone through the tutorial/created an initial save on the Deck when we tried this.

So it didn't work but.. maybe this helps you?


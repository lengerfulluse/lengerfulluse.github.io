---
layout: post
category: "notes"
tags: [work, tutorial]
---
{% include JB/setup %}

Love is definitely amazing thing! ^_^, A ha ? Penny.   
I become to enjoy the writing and thinking time, when the light is  turn off. My heart is warm, and mind is clean, the whole circumstation is just right, except my pumble poor english represion. All right, lets take the driver, go!

#### My Vim Note ####
I choose the excellent vi\&vim editor since the first time I got contact with Linux OS. the just perfect j, k, h, l keys, all the scenes are so beautiful! I like the spirk learning curve, which discourage the weak, but encourage the brave man to walk the nice travel of a new world.  
##### Cursor movement #####
- **w** - jump by start of words \(punctuation considered words, etc. *word,* two words: *word* and *,*\)
- **W** - jump by words \(spaces separate words, etc. *word,* one word: *word,*\)
- **e** - jump to end of words \(punctuation considered words.\)
- **E** - jump end of words \(no punctuation\)
- **b** - jump backward by words\(punctuation considered\)
- **B** - jump backward by words\(no punctuation\)
- **0** - \(zero\), start of line. which is very practical.
**Note**: Prefix a cursor movement command with a number to repeat it.

##### Insert Mode -Inserting/Appending text #####
- **ea** - append at end of word. the same to bA, append start of words. Amazing combining commands.
##### Editing #####
- **J** - join line below to the current one.
- **cc** - change\(replace\) the whole line.
- **cw** - change\(replace\) to the end of word.
- **c$** - change\(replace\) to the end of line.
- **s** - delete character at cursor and substitute text. compare with *r*
- **S** - delete line at cursor and substitute text. \(same as *cc*\).
##### Cut and Paste #####
- **yy** - yank\(copy\) the whole line.
- **yw** - yank\(copy\) the whole word.
- **y$** - yank to end of line.
##### Search/Replace #####
- **:%s/old/new/gc ** - replace all the *old* with *new* throughout file with confirmations.
##### Working with multiple files ######
- **:e file** - Edit a file in a new buffer.
- **:bnext** - go to next buffer\(or :bn \).
- **:bprev** - go to previous buffer\( or :bp\).
- **:bd** - delete a buffer, namely close a file.
- **:sp filename ** - open file in a new buffer and split window. **This command is useful**.
- **Ctrl + ww** - switch between windows.
- **Ctrl + ws** -split windows.
- **Ctrl + wv** -split windows vertical.
- **Ctrl + wq** -close windows.


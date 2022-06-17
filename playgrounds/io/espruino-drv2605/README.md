# drv2605

Controls a DRV2605 haptic driver. This demo only works in Chrome.

[Read more about this module](http://www.espruino.com/DRV2605)

## Getting started

First upload the provided `espruino.js` to your board, which the example assumes is an Espruino Pico. Make sure the haptic board is connected up according to [instructions](http://www.espruino.com/DRV2605).

Try running some functions in the Espruino IDE's REPL. These are the same functions we'll call from the browser.

```
// Trigger effect #1 (it goes up to 127)
trigger(1);

// Trigger an effect by name
trigger('pulsing sharp 1 100%');
```

'Real time processing' is where motor power is set in real time. In this case, there's a helper function `rtpMode` that lets you queue motor powers and durations. Two arrays are used for this, each array index being a 'step' in a sequence. In the example below, the motor is set to 30 power for 100ms, for example. 

```
// Motor power (0-200) & durations (millis)
let powers =  [30, 100, 30, 127, 90, 100];
let durations = [100, 200, 100, 300, 200, 100];
rtpMode(powers, durations);
```

For the endurance of the motor, duration of each step is capped to 500ms. Call `rtpCancel()` to cancel a long-running sequence. Whilst the RTP sequence is running, it's not possible to trigger other effects.

## From the browser

It's necessary to connect to the Espruino via user interaction, in this case clicking a button. 
Using ixfx's serial wrapping, we invoke functions declared by `espruino.js`. Eg:

```
espruino.write(`trigger(2)\n`);
```

## Effects

After uploading `espruino.js`, you can list all available effects by pasting this into the Espruino IDE's REPL:

```
for (let i=0;i<hap.EFFECTS.length;i++) console.log( (i+1) + '. '+ hap.EFFECTS[i]);
```

1. strong click 100%
2. strong click 60%
3. strong click 30%
4. sharp click 100%
5. sharp click 60%
6. sharp click 30%
7. soft bump 100%
8. soft bump 60%
9. soft bump 30%
10. double click 100%
11. double click 60%
12. triple click 100%
13. soft fuzz 60%
14. strong buzz 100%
15. 750 ms alert 100%
16. 1000ms alert 100%
17. strong click 1 100%
18. strong click 2 80%
19. strong click 3 60%
20. strong click 4 30%
21. medium click 1 100%
22. medium click 2 80%
23. medium click 3 60%
24. sharp tick 1 100%
25. sharp tick 2 80%
26. sharp tick 3 60%
27. short double click strong 1 100%
28. short double click strong 2 80%
29. short double click strong 3 60%
30. short double click strong 4 30%
31. short double click medium 1 100%
32. short double click medium 2 80%
33. short double click medium 3 60%
34. short double sharp tick 1 100%
35. short double sharp tick 2 80%
36. short double sharp tick 3 60%
37. long double sharp click strong 1 100%
38. long double sharp click strong 2 80%
39. long double sharp click strong 3 60%
40. long double sharp click strong 4 30%
41. long double sharp click medium 1 100%
42. long double sharp click medium 2 80%
43. long double sharp click medium 3 60%
44. long double sharp tick 1 100%
45. long double sharp tick 2 80%
46. long double sharp tick 3 60%
47. buzz 1 100%
48. buzz 2 80%
49. buzz 3 60%
50. buzz 4 40%
51. buzz 5 20%
52. pulsing strong 1 100%
53. pulsing strong 2 60%
54. pulsing medium 1 100%
55. pulsing medium 2 60%
56. pulsing sharp 1 100%
57. pulsing sharp 2 60%
58. transition click 1 100%
59. transition click 2 80%
60. transition click 3 60%
61. transition click 4 40%
62. transition click 5 20%
63. transition click 6 10%
64. hum 1 100%
65. hum 2 80%
66. hum 3 60%
67. hum 4 40%
68. hum 5 20%
69. hum 6 10%
70. ramp down long smooth 1
71. ramp down long smooth 2
72. ramp down medium smooth 1
73. ramp down medium smooth 2
74. ramp down short smooth 1
75. ramp down short smooth 2
76. ramp down long sharp 1
77. ramp down long sharp 2
78. ramp down medium sharp 1
79. ramp down medium sharp 2
80. ramp down short sharp 1
81. ramp down short sharp 2
82. ramp up long smooth 1
83. ramp up long smooth 2
84. ramp up medium smooth 1
85. ramp up medium smooth 2
86. ramp up short smooth 1
87. ramp up short smooth 2
88. ramp up long sharp 1
89. ramp up long sharp 2
90. ramp up medium sharp 1
91. ramp up medium sharp 2
92. ramp up short sharp 1
93. ramp up short sharp 2
94. ramp down long smooth 1 half
95. ramp down long smooth 2 half
96. ramp down medium smooth 1 half
97. ramp down medium smooth 2 half
98. ramp down short smooth 1 half
99. ramp down short smooth 2 half
100. ramp down long sharp 1 half
101. ramp down long sharp 2 half
102. ramp down medium sharp 1 half
103. ramp down medium sharp 2 half
104. ramp down short sharp 1 half
105. ramp down short sharp 2 half
106. ramp up long smooth 1 half
107. ramp up long smooth 2 half
108. ramp up medium smooth 1 half
109. ramp up medium smooth 2 half
110. ramp up short smooth 1 half
111. ramp up short smooth 2 half
112. ramp up long sharp 1 half
113. ramp up long sharp 2 half
114. ramp up medium sharp 1 half
115. ramp up medium sharp 2 half
116. ramp up short sharp 1 half
117. ramp up short sharp 2 half
118. long buzz no stop
119. smooth hum 1 50%
120. smooth hum 2 40%
121. smooth hum 3 30%
122. smooth hum 4 20%
123. smooth hum 5 10%
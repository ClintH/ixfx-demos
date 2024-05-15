# espruino / heart-rate

Sends detected BPM and confidence level from a Bangle.js 2.

It dynamically runs this script on the watch:

```js
g.clear();
g.setFont("6x15");
g.drawString(`Heart rate sender`, 10, 10);

Bangle.setHRMPower(true, 'test');
Bangle.on('HRM', function(hrm) {
  // console.log(hrm);
  g.clearRect(10, 20, 300,120);
  g.setFont("6x15:4");
  g.drawString(`${hrm.bpm} bpm`, 10, 37);
  g.setFont("6x15");
  g.drawString(`${hrm.confidence}% confidence`, 10, 100);
  Bluetooth.println(JSON.stringify(hrm));
});
```
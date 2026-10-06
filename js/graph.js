/* SVG presentation; economic concepts by David Friedman, development by Eric McKee. */
(function () {
  'use strict';
  var W = 1000, H = 560, X0 = 270, X1 = 955, Y0 = 265, HEIGHT = 195;
  var cash = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  function render(svg, result, selected) {
    var cap = Math.max(1000, result.receipts, result.outflows, ...result.payments.map(p => Math.abs(p.amount)));
    var magnitude = Math.pow(10, Math.floor(Math.log10(cap)));
    cap = Math.ceil(cap / magnitude) * magnitude;
    var y = v => Y0 - v / cap * HEIGHT;
    var x = year => X0 + year / 30 * (X1 - X0);
    var parts = ['<defs><pattern id="pv-hatch" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-2 2L2-2M0 7L7 0M5 9L9 5" stroke="currentColor" stroke-width="1.5"/></pattern></defs>'];
    function line(a,b,c,d,cls) { parts.push('<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" class="'+cls+'"/>'); }
    function text(a,b,t,cls) { parts.push('<text x="'+a+'" y="'+b+'" class="'+cls+'">'+t+'</text>'); }
    text(105, 26, 'PV stacked at today', 'graph-title');
    text(600, 26, 'Payments across time', 'graph-title');
    for (var v of [-cap, -cap/2, 0, cap/2, cap]) {
      line(45,y(v),980,y(v), v === 0 ? 'axis' : 'grid');
      text(248,y(v)-5,cash.format(v),'tick dollar-tick');
    }
    line(X0,45,X0,492,'axis');
    for (var year = 0; year <= 30; year += 5) {
      line(x(year),480,x(year),487,'axis');
      text(x(year),511,String(year),'tick');
    }
    text(600,545,'Years from today (0 = today)','axis-title');
    var positive = 0, negative = 0;
    result.payments.forEach(function (p, i) {
      var color = p.amount < 0 ? 'outflow' : 'receipt';
      var same = result.payments.filter(q => q.year === p.year);
      var rank = same.findIndex(q => q.id === p.id);
      var offset = (rank - (same.length-1)/2) * 7;
      var bx = x(p.year) + offset;
      var top = Math.min(y(p.amount),Y0), height = Math.abs(y(p.amount)-Y0);
      var pvtop = Math.min(y(p.pv),Y0), pvheight = Math.abs(y(p.pv)-Y0);
      var start = p.pv >= 0 ? positive : negative, end = start + p.pv;
      if (p.pv >= 0) positive = end; else negative = end;
      var stacktop = Math.min(y(start),y(end));
      parts.push('<g class="'+color+(p.id === selected ? ' selected' : '')+'" data-payment="'+p.id+'">');
      parts.push('<rect x="70" y="'+stacktop+'" width="70" height="'+Math.max(1,Math.abs(y(start)-y(end)))+'" class="stack"/>');
      if (p.id === selected) line(140,y(end),bx,y(p.pv),'guide');
      parts.push('<rect x="'+(bx-8)+'" y="'+top+'" width="16" height="'+Math.max(2,height)+'" class="nominal"/>');
      parts.push('<rect x="'+(bx-8)+'" y="'+pvtop+'" width="16" height="'+Math.max(2,pvheight)+'" class="discounted"/>');
      text(bx,p.amount < 0 ? top+height+20 : top-10,String(i+1),'payment-label');
      parts.push('<rect x="'+(bx-13)+'" y="'+Math.max(35,top-25)+'" width="26" height="'+Math.max(44,height+50)+'" class="hit-area"/>');
      parts.push('</g>');
    });
    svg.setAttribute('viewBox', '0 0 '+W+' '+H);
    svg.innerHTML = parts.join('');
    var summary = result.payments.map((p,i) => 'Payment '+(i+1)+': '+p.amount.toFixed(2)+' dollars at year '+p.year+', present value '+p.pv.toFixed(2)+' dollars.').join(' ');
    document.getElementById('graph-summary').textContent = 'Bars show face amounts as outlines and present values as hatching. Positive and negative present values stack separately at today. '+summary+' Net present value '+result.net.toFixed(2)+' dollars. The table and formula below provide the same values.';
  }
  function yearAt(svg, clientX) {
    var pt = svg.createSVGPoint(); pt.x = clientX; pt.y = 0;
    var local = pt.matrixTransform(svg.getScreenCTM().inverse());
    return Math.max(0,Math.min(30,Math.round((local.x-X0)/(X1-X0)*30)));
  }
  window.PresentValueGraph = { render: render, yearAt: yearAt };
})();

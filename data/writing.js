// Writing tests and drills — original content; topics drawn from Neha's study folder
(function () {
  // ---------- SVG helpers ----------
  const F = "font-family='Arial, Helvetica, sans-serif'";
  function lineGraph(cfg) {
    const { w = 640, h = 400, pad = { l: 60, r: 150, t: 30, b: 50 }, xs, series, yMax, yStep, yLabel, title } = cfg;
    const W = w - pad.l - pad.r, H = h - pad.t - pad.b;
    const x = i => pad.l + (W * i) / (xs.length - 1);
    const y = v => pad.t + H - (H * v) / yMax;
    let s = `<svg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg' ${F} font-size='12'>`;
    s += `<rect width='${w}' height='${h}' fill='#fff'/>`;
    if (title) s += `<text x='${pad.l}' y='18' font-size='13' font-weight='bold'>${title}</text>`;
    for (let v = 0; v <= yMax; v += yStep) {
      s += `<line x1='${pad.l}' y1='${y(v)}' x2='${pad.l + W}' y2='${y(v)}' stroke='#ddd'/>`;
      s += `<text x='${pad.l - 8}' y='${y(v) + 4}' text-anchor='end'>${v}</text>`;
    }
    s += `<line x1='${pad.l}' y1='${pad.t}' x2='${pad.l}' y2='${pad.t + H}' stroke='#333'/><line x1='${pad.l}' y1='${pad.t + H}' x2='${pad.l + W}' y2='${pad.t + H}' stroke='#333'/>`;
    xs.forEach((lab, i) => { s += `<text x='${x(i)}' y='${pad.t + H + 18}' text-anchor='middle'>${lab}</text>`; });
    if (yLabel) s += `<text x='14' y='${pad.t + H / 2}' transform='rotate(-90 14 ${pad.t + H / 2})' text-anchor='middle'>${yLabel}</text>`;
    const dashes = ["", "6 4", "2 3", "10 4 2 4"];
    const markers = ["circle", "square", "triangle", "diamond"];
    series.forEach((sr, k) => {
      const pts = sr.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
      s += `<polyline points='${pts}' fill='none' stroke='#222' stroke-width='2' stroke-dasharray='${dashes[k]}'/>`;
      sr.values.forEach((v, i) => {
        const cx = x(i), cy = y(v);
        if (markers[k] === "circle") s += `<circle cx='${cx}' cy='${cy}' r='4' fill='#222'/>`;
        if (markers[k] === "square") s += `<rect x='${cx - 4}' y='${cy - 4}' width='8' height='8' fill='#fff' stroke='#222' stroke-width='2'/>`;
        if (markers[k] === "triangle") s += `<polygon points='${cx},${cy - 5} ${cx - 5},${cy + 4} ${cx + 5},${cy + 4}' fill='#222'/>`;
        if (markers[k] === "diamond") s += `<polygon points='${cx},${cy - 5} ${cx - 5},${cy} ${cx},${cy + 5} ${cx + 5},${cy}' fill='#fff' stroke='#222' stroke-width='2'/>`;
      });
      const ly = pad.t + 20 + k * 22, lx = pad.l + W + 16;
      s += `<line x1='${lx}' y1='${ly}' x2='${lx + 28}' y2='${ly}' stroke='#222' stroke-width='2' stroke-dasharray='${dashes[k]}'/>`;
      s += `<text x='${lx + 34}' y='${ly + 4}'>${sr.name}</text>`;
    });
    return s + "</svg>";
  }
  function barChart(cfg) {
    const { w = 640, h = 400, pad = { l: 60, r: 30, t: 40, b: 70 }, groups, series, yMax, yStep, yLabel, title } = cfg;
    const W = w - pad.l - pad.r, H = h - pad.t - pad.b;
    const gw = W / groups.length, bw = (gw * 0.7) / series.length;
    const y = v => pad.t + H - (H * v) / yMax;
    const fills = ["#333", "#999", "#fff", "#ccc"];
    let s = `<svg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg' ${F} font-size='12'><rect width='${w}' height='${h}' fill='#fff'/>`;
    if (title) s += `<text x='${pad.l}' y='18' font-size='13' font-weight='bold'>${title}</text>`;
    for (let v = 0; v <= yMax; v += yStep) {
      s += `<line x1='${pad.l}' y1='${y(v)}' x2='${pad.l + W}' y2='${y(v)}' stroke='#ddd'/><text x='${pad.l - 8}' y='${y(v) + 4}' text-anchor='end'>${v}</text>`;
    }
    s += `<line x1='${pad.l}' y1='${pad.t}' x2='${pad.l}' y2='${pad.t + H}' stroke='#333'/><line x1='${pad.l}' y1='${pad.t + H}' x2='${pad.l + W}' y2='${pad.t + H}' stroke='#333'/>`;
    groups.forEach((g, i) => {
      const gx = pad.l + i * gw + gw * 0.15;
      series.forEach((sr, k) => {
        const v = sr.values[i];
        s += `<rect x='${gx + k * bw}' y='${y(v)}' width='${bw - 2}' height='${y(0) - y(v)}' fill='${fills[k]}' stroke='#222'/>`;
        s += `<text x='${gx + k * bw + bw / 2 - 1}' y='${y(v) - 4}' text-anchor='middle' font-size='10'>${v}</text>`;
      });
      s += `<text x='${pad.l + i * gw + gw / 2}' y='${pad.t + H + 18}' text-anchor='middle'>${g}</text>`;
    });
    if (yLabel) s += `<text x='14' y='${pad.t + H / 2}' transform='rotate(-90 14 ${pad.t + H / 2})' text-anchor='middle'>${yLabel}</text>`;
    series.forEach((sr, k) => {
      const lx = pad.l + k * 160, ly = h - 18;
      s += `<rect x='${lx}' y='${ly - 10}' width='14' height='12' fill='${fills[k]}' stroke='#222'/><text x='${lx + 20}' y='${ly}'>${sr.name}</text>`;
    });
    return s + "</svg>";
  }
  function pieChart(cfg) {
    const { w = 640, h = 360, pies, title } = cfg; // pies: [{title, slices:[{label,value}]}]
    const fills = ["#333", "#777", "#aaa", "#ddd", "#fff", "#555"];
    let s = `<svg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg' ${F} font-size='12'><rect width='${w}' height='${h}' fill='#fff'/>`;
    if (title) s += `<text x='20' y='20' font-size='13' font-weight='bold'>${title}</text>`;
    const n = pies.length, each = w / n;
    pies.forEach((p, pi) => {
      const cx = each * pi + each / 2, cy = 190, r = 100;
      let a0 = -Math.PI / 2;
      p.slices.forEach((sl, k) => {
        const a1 = a0 + (2 * Math.PI * sl.value) / 100;
        const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
        const large = a1 - a0 > Math.PI ? 1 : 0;
        s += `<path d='M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z' fill='${fills[k]}' stroke='#222'/>`;
        const am = (a0 + a1) / 2, lx = cx + (r + 22) * Math.cos(am), ly = cy + (r + 22) * Math.sin(am);
        s += `<text x='${lx}' y='${ly + 4}' text-anchor='middle'>${sl.value}%</text>`;
        a0 = a1;
      });
      s += `<text x='${cx}' y='${cy + r + 50}' text-anchor='middle' font-weight='bold'>${p.title}</text>`;
    });
    pies[0].slices.forEach((sl, k) => {
      const lx = 20 + (k % 3) * 200, ly = 40 + Math.floor(k / 3) * 18;
      s += `<rect x='${lx}' y='${ly - 10}' width='14' height='12' fill='${fills[k]}' stroke='#222'/><text x='${lx + 20}' y='${ly}'>${sl.label}</text>`;
    });
    return s + "</svg>";
  }
  function box(x, y, w, h, text, size = 12) {
    const lines = text.split("\n");
    let s = `<rect x='${x}' y='${y}' width='${w}' height='${h}' rx='4' fill='#fff' stroke='#222' stroke-width='1.5'/>`;
    lines.forEach((ln, i) => { s += `<text x='${x + w / 2}' y='${y + h / 2 + (i - (lines.length - 1) / 2) * (size + 3) + 4}' text-anchor='middle' font-size='${size}'>${ln}</text>`; });
    return s;
  }
  function arrow(x1, y1, x2, y2) { return `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='#222' stroke-width='1.5' marker-end='url(#ah)'/>`; }
  const arrowDef = "<defs><marker id='ah' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto'><path d='M0,0 L8,4 L0,8 Z' fill='#222'/></marker></defs>";

  // ---------- TASK 1 FIGURES ----------
  const t1_line = lineGraph({
    title: "Percentage of households with internet access, 2000–2020",
    xs: ["2000", "2005", "2010", "2015", "2020"], yMax: 100, yStep: 20, yLabel: "% of households",
    series: [
      { name: "Country A", values: [38, 61, 78, 88, 93] },
      { name: "Country B", values: [22, 45, 70, 86, 92] },
      { name: "Country C", values: [5, 12, 31, 55, 74] },
      { name: "Country D", values: [1, 3, 9, 24, 48] }
    ]
  });
  const t1_bar = barChart({
    title: "Average time spent on unpaid housework per week, by country and gender (hours)",
    groups: ["Japan", "Italy", "Sweden", "Canada", "Turkey"], yMax: 35, yStep: 5, yLabel: "hours per week",
    series: [
      { name: "Men", values: [5, 9, 15, 14, 7] },
      { name: "Women", values: [24, 29, 20, 22, 31] }
    ]
  });
  const t1_process = (() => {
    let s = `<svg viewBox='0 0 680 400' xmlns='http://www.w3.org/2000/svg' ${F} font-size='12'><rect width='680' height='400' fill='#fff'/>${arrowDef}`;
    s += `<text x='20' y='22' font-size='13' font-weight='bold'>How recycled paper is produced</text>`;
    const row1 = [["Waste paper\ncollected from\nhomes and offices"], ["Sorted by type;\nplastic and metal\nremoved"], ["Pulper: paper mixed\nwith water and\nshredded into pulp"], ["Screening:\nstaples and glue\nfiltered out"]];
    const row2 = [["De-inking:\nair bubbles lift\nink to the surface"], ["Pulp bleached\n(optional) and\nmixed with\n10% new fibre"], ["Paper machine:\npulp spread on\nmesh, water drained"], ["Heated rollers\ndry and press\nthe sheet"]];
    row1.forEach((b, i) => { s += box(20 + i * 165, 50, 140, 70, b[0]); if (i < 3) s += arrow(160 + i * 165, 85, 185 + i * 165, 85); });
    s += arrow(585, 120, 585, 165);
    row2.slice().reverse().forEach((b, i) => { s += box(20 + i * 165, 165, 140, 80, b[0]); if (i < 3) s += arrow(185 + i * 165, 205, 160 + i * 165, 205); });
    s += arrow(90, 245, 90, 290);
    s += box(20, 290, 140, 70, "Large rolls cut\ninto sheets and\npackaged");
    s += arrow(160, 325, 200, 325);
    s += box(200, 290, 140, 70, "Delivered to\nshops and\nprinters");
    // water recycled from the paper machine back to the pulper
    s += `<path d='M255 165 L255 142 L420 142 L420 122' fill='none' stroke='#777' stroke-width='1.5' stroke-dasharray='5 3' marker-end='url(#ah)'/>`;
    s += `<text x='262' y='138' font-size='11' fill='#555'>water cleaned and returned to pulper</text>`;
    return s + "</svg>";
  })();
  const t1_map = (() => {
    let s = `<svg viewBox='0 0 680 420' xmlns='http://www.w3.org/2000/svg' ${F} font-size='11'><rect width='680' height='420' fill='#fff'/>`;
    const panel = (ox, title, after) => {
      s += `<text x='${ox + 10}' y='22' font-size='13' font-weight='bold'>${title}</text>`;
      s += `<rect x='${ox}' y='32' width='320' height='360' fill='#f3f6ee' stroke='#333'/>`;
      // sea at top
      s += `<rect x='${ox}' y='32' width='320' height='60' fill='#d6e6f2'/><text x='${ox + 140}' y='68' fill='#357'>SEA</text>`;
      // beach
      s += `<rect x='${ox}' y='92' width='320' height='24' fill='#f1e3b6'/><text x='${ox + 130}' y='108'>beach</text>`;
      // main road
      s += `<rect x='${ox + 150}' y='116' width='22' height='276' fill='#bbb'/><text x='${ox + 161}' y='380' font-size='10' text-anchor='middle'>road</text>`;
      // river on right
      s += `<path d='M${ox + 300} 116 C ${ox + 280} 200, ${ox + 300} 280, ${ox + 285} 392' stroke='#7ab' stroke-width='10' fill='none'/><text x='${ox + 262}' y='250' fill='#357'>river</text>`;
      if (!after) {
        s += `<rect x='${ox + 20}' y='140' width='110' height='60' fill='#cfe3c0' stroke='#333'/><text x='${ox + 75}' y='174' text-anchor='middle'>farmland</text>`;
        s += `<rect x='${ox + 20}' y='220' width='110' height='70' fill='#cfe3c0' stroke='#333'/><text x='${ox + 75}' y='259' text-anchor='middle'>farmland</text>`;
        s += `<g>${[0,1,2,3].map(i => `<rect x='${ox + 190 + (i%2)*40}' y='${150 + Math.floor(i/2)*40}' width='26' height='22' fill='#fff' stroke='#333'/>`).join("")}</g><text x='${ox + 222}' y='245' text-anchor='middle'>houses</text>`;
        s += `<rect x='${ox + 190}' y='270' width='70' height='40' fill='#fff' stroke='#333'/><text x='${ox + 225}' y='294' text-anchor='middle'>shop</text>`;
        s += `<circle cx='${ox + 70}' cy='340' r='22' fill='#b9d7a3' stroke='#333'/><text x='${ox + 70}' y='378' text-anchor='middle'>woodland</text>`;
        s += `<rect x='${ox + 40}' y='96' width='12' height='16' fill='#555'/><text x='${ox + 46}' y='132' text-anchor='middle' font-size='10'>pier</text>`;
      } else {
        s += `<rect x='${ox + 20}' y='140' width='110' height='60' fill='#fff' stroke='#333'/><text x='${ox + 75}' y='174' text-anchor='middle'>hotel</text>`;
        s += `<rect x='${ox + 20}' y='220' width='110' height='70' fill='#ccc' stroke='#333'/><text x='${ox + 75}' y='259' text-anchor='middle'>car park</text>`;
        s += `<g>${[0,1,2,3,4,5].map(i => `<rect x='${ox + 190 + (i%2)*40}' y='${130 + Math.floor(i/2)*36}' width='26' height='22' fill='#fff' stroke='#333'/>`).join("")}</g><text x='${ox + 222}' y='252' text-anchor='middle'>houses</text>`;
        s += `<rect x='${ox + 185}' y='262' width='95' height='40' fill='#fff' stroke='#333'/><text x='${ox + 232}' y='279' text-anchor='middle'>restaurants</text><text x='${ox + 232}' y='293' text-anchor='middle'>and shops</text>`;
        s += `<circle cx='${ox + 70}' cy='340' r='22' fill='#b9d7a3' stroke='#333'/><text x='${ox + 70}' y='378' text-anchor='middle'>woodland</text>`;
        s += `<rect x='${ox + 40}' y='96' width='12' height='16' fill='#555'/><rect x='${ox + 30}' y='100' width='60' height='8' fill='#888'/><text x='${ox + 60}' y='132' text-anchor='middle' font-size='10'>pier (extended)</text>`;
        s += `<rect x='${ox + 90}' y='56' width='40' height='30' fill='#fff' stroke='#333'/><text x='${ox + 110}' y='75' text-anchor='middle' font-size='10'>marina</text>`;
        s += `<line x1='${ox + 172}' y1='340' x2='${ox + 300}' y2='340' stroke='#bbb' stroke-width='8'/><text x='${ox + 226}' y='360' text-anchor='middle' font-size='10'>new bridge</text>`;
      }
      s += `<text x='${ox + 300}' y='50' text-anchor='end' font-size='10'>N ↑</text>`;
    };
    panel(10, "Seaview village in 1995", false);
    panel(350, "Seaview village today", true);
    return s + "</svg>";
  })();
  const t1_table = `<table class='t1table'><caption>Visitor numbers and spending at four national parks, 2022</caption>
<thead><tr><th>National park</th><th>Visitors (millions)</th><th>Average length of stay (days)</th><th>Average spending per visitor (US$)</th><th>Visitors arriving by car (%)</th></tr></thead>
<tbody><tr><td>Greenridge</td><td>4.2</td><td>1.5</td><td>85</td><td>91</td></tr>
<tr><td>Blue Lakes</td><td>2.8</td><td>3.2</td><td>240</td><td>64</td></tr>
<tr><td>Stonefell</td><td>1.1</td><td>4.8</td><td>410</td><td>38</td></tr>
<tr><td>Coral Bay</td><td>0.6</td><td>6.1</td><td>690</td><td>12</td></tr></tbody></table>`;
  const t1_pie = pieChart({
    title: "Sources of electricity generation in Country X, 2000 and 2020",
    pies: [
      { title: "2000", slices: [{ label: "Coal", value: 52 }, { label: "Gas", value: 20 }, { label: "Nuclear", value: 18 }, { label: "Hydro", value: 8 }, { label: "Wind and solar", value: 2 }] },
      { title: "2020", slices: [{ label: "Coal", value: 18 }, { label: "Gas", value: 30 }, { label: "Nuclear", value: 15 }, { label: "Hydro", value: 9 }, { label: "Wind and solar", value: 28 }] }
    ]
  });
  const t1_bar2 = barChart({
    title: "Reasons given for cycling to work in one city, 2010 and 2022 (% of cyclists)",
    groups: ["Cheaper", "Faster", "Health", "Environment", "Enjoyment"], yMax: 60, yStep: 10, yLabel: "% of cyclists",
    series: [{ name: "2010", values: [48, 22, 35, 12, 18] }, { name: "2022", values: [31, 39, 52, 41, 27] }]
  });

  // ---------- TESTS ----------
  window.WRITING_TESTS = [
    {
      id: "W1", difficulty: "easy", title: "Writing Test 1",
      task1: {
        kind: "line",
        prompt: "The graph below shows the percentage of households with access to the internet in four countries between 2000 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        svg: t1_line,
        keyFeatures: [
          "All four countries rose over the period; none fell.",
          "A and B started highest (38% and 22%) and were almost equal by 2020 (93% and 92%); growth slowed after 2010.",
          "B's increase between 2000 and 2010 was the steepest of the four (22% to 70%).",
          "C grew from 5% to 74%, with the fastest growth after 2010.",
          "D remained lowest throughout, below 10% until 2010, then roughly doubled every five years to 48%.",
          "Despite growth everywhere, the gap between the highest and lowest country widened slightly (37 points in 2000, 45 points in 2020); D still lagged far behind the others."
        ]
      },
      task2: {
        topic: "Education", type: "advantages",
        prompt: "In some countries, secondary school students are required to spend a fixed number of hours doing unpaid work in their community, such as helping in a hospital or cleaning a public park, before they can graduate.\n\nDo the advantages of this requirement outweigh the disadvantages?",
        ideas: [
          "For: develops social responsibility and empathy; soft skills (teamwork, communication, leadership); exposure to real-world problems; strengthens university or job applications.",
          "Against: compulsion can breed resentment and box-ticking; adds pressure during exam periods; organisational burden on schools; quality of placements varies.",
          "A band 8 answer takes a clear position on 'outweigh', develops two or three ideas fully with examples, and keeps the opposing side brief."
        ],
        backgroundStatements: [
          "Education plays a fundamental role in shaping individuals and societies, and different approaches to learning continue to be widely debated.",
          "The importance of education in personal and national development is undeniable, leading to ongoing discussions about how it should be delivered."
        ]
      }
    },
    {
      id: "W2", difficulty: "easy", title: "Writing Test 2",
      task1: {
        kind: "bar",
        prompt: "The chart below shows the average number of hours per week spent on unpaid housework by men and women in five countries in 2021.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        svg: t1_bar,
        keyFeatures: [
          "Women spent more time on housework than men in every country.",
          "The gap was largest in Turkey (31 vs 7 hours) and Japan (24 vs 5), smallest in Sweden (20 vs 15).",
          "Sweden's men did the most housework (15 hours); Japan's men the least (5).",
          "Turkey's women did the most (31), Sweden's women the least (20).",
          "Italy and Canada sat between the extremes; Canadian men (14) were close to Swedish men."
        ]
      },
      task2: {
        topic: "Technology and society", type: "positive-negative",
        prompt: "Many people now use social media as their main way of keeping in touch with friends and family, rather than meeting them in person.\n\nIs this a positive or negative development?",
        ideas: [
          "Positive: constant contact across distances; low cost; sharing life events; useful for migrants and students abroad.",
          "Negative: shallower relationships; comparison culture and loneliness; attention and sleep effects; replacing rather than supplementing real contact.",
          "Strong answers decide clearly (e.g. 'largely negative when it replaces, positive when it supplements') and sustain that view."
        ],
        backgroundStatements: [
          "Technological advancements have significantly transformed modern life, influencing how people communicate, work, and learn.",
          "The growing reliance on technology has sparked debate over its effects on human interaction and thinking skills."
        ]
      }
    },
    {
      id: "W3", difficulty: "standard", title: "Writing Test 3",
      task1: {
        kind: "process",
        prompt: "The diagram below shows how recycled paper is produced.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        svg: t1_process,
        keyFeatures: [
          "A linear, man-made process of about ten stages, beginning with collection of waste paper and ending with delivery of finished paper.",
          "Preparation stages: collection, sorting (plastic and metal removed), pulping with water, screening of staples and glue.",
          "Cleaning stages: de-inking using air bubbles, optional bleaching, mixing with 10% new fibre.",
          "Forming stages: pulp spread on mesh in the paper machine and water drained; heated rollers dry and press the sheet.",
          "Finishing: rolls cut into sheets, packaged, delivered. Water from the paper machine is recycled back to the pulper.",
          "Overview should mention number of stages, start and end points, and that water is reused. Passive voice and sequencing language expected."
        ]
      },
      task2: {
        topic: "Health and government", type: "discussion",
        prompt: "Some people say that the best way for a government to improve public health is to build more sports facilities. Others believe that there are more effective ways for governments to spend this money.\n\nDiscuss both these views and give your own opinion.",
        ideas: [
          "View 1: facilities remove practical barriers to exercise; cheaper access to pools, gyms, courts; community culture of fitness.",
          "View 2: facilities are unused without motivation; education on diet and nutrition; taxes on junk food; workplace wellness; preventive healthcare.",
          "Opinion must be clear and appear in introduction and conclusion; both views need roughly equal development."
        ],
        backgroundStatements: [
          "Health is a critical aspect of human life, and governments, individuals, and organizations continue to seek ways to promote well-being.",
          "Rising health problems have led to disputes over whether individuals or authorities should take charge of maintaining public health."
        ]
      }
    },
    {
      id: "W4", difficulty: "standard", title: "Writing Test 4",
      task1: {
        kind: "map",
        prompt: "The maps below show the village of Seaview in 1995 and the same village today.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        svg: t1_map,
        keyFeatures: [
          "The village changed from a small farming settlement into a tourist destination; the sea, beach, road, river and woodland remain.",
          "Farmland in the west was replaced by a hotel (north) and a car park (south).",
          "The number of houses east of the road increased from four to six, and the single shop became a row of restaurants and shops.",
          "The pier was extended and a marina was built in the sea near the beach.",
          "A new bridge now crosses the river in the south-east.",
          "Expected language: passive voice (was converted, were built), location language (to the west of, on the opposite side of the road), comparison of past and present."
        ]
      },
      task2: {
        topic: "Environment", type: "problem-solution",
        prompt: "In many countries the amount of household waste, particularly plastic packaging, is increasing every year.\n\nWhat problems does this cause?\n\nWhat measures could governments and individuals take to reduce the amount of plastic waste?",
        ideas: [
          "Problems: landfill and ocean pollution; harm to marine life entering the food chain; microplastics; cost of waste management; emissions from production.",
          "Government measures: bans or levies on single-use plastics; deposit-return schemes; producer responsibility laws; investment in recycling; awareness campaigns.",
          "Individual measures: reusable bags and bottles; buying loose produce; refusing excess packaging; correct sorting for recycling.",
          "Both questions must be answered with similar depth; examples (a country's ban, a supermarket scheme) strengthen Task Response."
        ],
        backgroundStatements: [
          "Environmental issues have become a pressing global concern, prompting discussions about sustainability and conservation efforts.",
          "As environmental degradation increases, there is disagreement over whether individuals or governments should bear more responsibility."
        ]
      }
    }
  ];

  // ---------- TESTS 5-8 ----------
  const t5_table = `<table class='t1table'><caption>Percentage of the population aged 65 and over in five countries, 1990, 2020 and 2050 (projected)</caption>
<thead><tr><th>Country</th><th>1990</th><th>2020</th><th>2050 (projected)</th></tr></thead>
<tbody><tr><td>Japan</td><td>12</td><td>29</td><td>38</td></tr>
<tr><td>Italy</td><td>15</td><td>23</td><td>35</td></tr>
<tr><td>United States</td><td>12</td><td>17</td><td>22</td></tr>
<tr><td>Brazil</td><td>4</td><td>10</td><td>23</td></tr>
<tr><td>Nigeria</td><td>3</td><td>3</td><td>4</td></tr></tbody></table>`;
  const t6_pie = pieChart({
    title: "Average household spending by category, Country Y, 1995 and 2020 (%)",
    pies: [
      { title: "1995", slices: [{ label: "Housing", value: 22 }, { label: "Food", value: 28 }, { label: "Transport", value: 14 }, { label: "Leisure", value: 10 }, { label: "Clothing", value: 12 }, { label: "Other", value: 14 }] },
      { title: "2020", slices: [{ label: "Housing", value: 34 }, { label: "Food", value: 17 }, { label: "Transport", value: 15 }, { label: "Leisure", value: 18 }, { label: "Clothing", value: 6 }, { label: "Other", value: 10 }] }
    ]
  });
  const t7_mixed = (() => {
    // bar: cars per 1000 people; line: % of trips by public transport, one city, 1990-2020
    const w = 640, h = 400, pad = { l: 60, r: 70, t: 40, b: 60 }, W = w - pad.l - pad.r, H = h - pad.t - pad.b;
    const xs = ["1990", "2000", "2010", "2020"], bars = [180, 260, 340, 350], line = [38, 29, 24, 31];
    const gw = W / xs.length; const yB = v => pad.t + H - (H * v) / 400; const yL = v => pad.t + H - (H * v) / 50;
    let s = `<svg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg' ${F} font-size='12'><rect width='${w}' height='${h}' fill='#fff'/>`;
    s += `<text x='${pad.l}' y='18' font-size='13' font-weight='bold'>Car ownership and use of public transport in one European city, 1990–2020</text>`;
    for (let v = 0; v <= 400; v += 100) s += `<line x1='${pad.l}' y1='${yB(v)}' x2='${pad.l + W}' y2='${yB(v)}' stroke='#ddd'/><text x='${pad.l - 8}' y='${yB(v) + 4}' text-anchor='end'>${v}</text>`;
    for (let v = 0; v <= 50; v += 10) s += `<text x='${pad.l + W + 8}' y='${yL(v) + 4}'>${v}%</text>`;
    s += `<line x1='${pad.l}' y1='${pad.t}' x2='${pad.l}' y2='${pad.t + H}' stroke='#333'/><line x1='${pad.l + W}' y1='${pad.t}' x2='${pad.l + W}' y2='${pad.t + H}' stroke='#333'/><line x1='${pad.l}' y1='${pad.t + H}' x2='${pad.l + W}' y2='${pad.t + H}' stroke='#333'/>`;
    xs.forEach((x, i) => { const bx = pad.l + i * gw + gw * 0.25; s += `<rect x='${bx}' y='${yB(bars[i])}' width='${gw * 0.5}' height='${yB(0) - yB(bars[i])}' fill='#999' stroke='#222'/><text x='${bx + gw * 0.25}' y='${yB(bars[i]) - 4}' text-anchor='middle' font-size='10'>${bars[i]}</text><text x='${pad.l + i * gw + gw / 2}' y='${pad.t + H + 18}' text-anchor='middle'>${x}</text>`; });
    s += `<polyline fill='none' stroke='#222' stroke-width='2' points='${line.map((v, i) => `${pad.l + i * gw + gw / 2},${yL(v)}`).join(" ")}'/>`;
    line.forEach((v, i) => { s += `<circle cx='${pad.l + i * gw + gw / 2}' cy='${yL(v)}' r='4' fill='#222'/><text x='${pad.l + i * gw + gw / 2 + 8}' y='${yL(v) - 6}' font-size='10'>${v}%</text>`; });
    s += `<text x='14' y='${pad.t + H / 2}' transform='rotate(-90 14 ${pad.t + H / 2})' text-anchor='middle'>cars per 1,000 people</text>`;
    s += `<text x='${w - 12}' y='${pad.t + H / 2}' transform='rotate(90 ${w - 12} ${pad.t + H / 2})' text-anchor='middle'>% of journeys by public transport</text>`;
    s += `<rect x='${pad.l}' y='${h - 22}' width='14' height='12' fill='#999' stroke='#222'/><text x='${pad.l + 20}' y='${h - 12}'>Cars per 1,000 people (bars)</text><line x1='${pad.l + 230}' y1='${h - 16}' x2='${pad.l + 258}' y2='${h - 16}' stroke='#222' stroke-width='2'/><circle cx='${pad.l + 244}' cy='${h - 16}' r='4' fill='#222'/><text x='${pad.l + 264}' y='${h - 12}'>Journeys by public transport (line)</text>`;
    return s + "</svg>";
  })();
  const t8_process = (() => {
    let s = `<svg viewBox='0 0 680 400' xmlns='http://www.w3.org/2000/svg' ${F} font-size='12'><rect width='680' height='400' fill='#fff'/>${arrowDef}`;
    s += `<text x='20' y='22' font-size='13' font-weight='bold'>How electricity is generated at a hydroelectric power station</text>`;
    // reservoir (left, high), dam, intake, penstock down to turbine, generator, transformer, pylons; water out to river
    s += `<path d='M20 120 L240 120 L240 300 L20 300 Z' fill='#cfe3f5' stroke='#345'/><text x='90' y='210' fill='#245'>reservoir</text>`;
    s += `<rect x='240' y='100' width='40' height='230' fill='#bbb' stroke='#333'/><text x='244' y='90' font-size='11'>dam</text>`;
    s += `<rect x='232' y='150' width='16' height='22' fill='#fff' stroke='#333'/><text x='160' y='140' font-size='11'>intake gate</text><line x1='215' y1='143' x2='235' y2='155' stroke='#333'/>`;
    s += `<path d='M248 161 L330 161 L330 290' fill='none' stroke='#345' stroke-width='12'/><text x='340' y='230' font-size='11'>penstock</text>`;
    s += `<circle cx='330' cy='310' r='26' fill='#fff' stroke='#333' stroke-width='1.5'/><path d='M330 284 L330 336 M304 310 L356 310 M312 292 L348 328 M348 292 L312 328' stroke='#333'/><text x='262' y='345' font-size='11' text-anchor='end'>turbine</text>`;
    s += `<line x1='356' y1='310' x2='420' y2='310' stroke='#333' stroke-width='4'/><text x='362' y='300' font-size='10'>shaft</text>`;
    s += `<rect x='420' y='285' width='80' height='50' rx='4' fill='#fff' stroke='#333' stroke-width='1.5'/><text x='460' y='314' text-anchor='middle'>generator</text>`;
    s += `<path d='M500 310 L540 310' stroke='#333' stroke-width='1.5' marker-end='url(#ah)'/>`;
    s += `<rect x='540' y='285' width='80' height='50' rx='4' fill='#fff' stroke='#333' stroke-width='1.5'/><text x='580' y='306' text-anchor='middle'>transformer</text><text x='580' y='322' text-anchor='middle' font-size='10'>(voltage raised)</text>`;
    s += `<path d='M580 285 L580 200' stroke='#333' stroke-width='1.5' marker-end='url(#ah)'/>`;
    s += `<path d='M560 200 L600 200 L580 130 Z M565 180 L595 180 M570 160 L590 160' fill='none' stroke='#333'/><text x='612' y='170' font-size='11'>pylons to</text><text x='612' y='184' font-size='11'>homes and</text><text x='612' y='198' font-size='11'>factories</text>`;
    s += `<path d='M340 334 L370 365 L560 365' fill='none' stroke='#345' stroke-width='8'/><text x='440' y='386' font-size='11' fill='#245'>water returned to river downstream</text>`;
    s += `<path d='M120 100 L120 118' stroke='#777' marker-end='url(#ah)'/><text x='60' y='92' font-size='11' fill='#555'>river water and rain fill the reservoir</text>`;
    return s + "</svg>";
  })();

  window.WRITING_TESTS.push(
    {
      id: "W5", difficulty: "easy", title: "Writing Test 5",
      task1: {
        kind: "table",
        prompt: "The table below shows the percentage of the population aged 65 and over in five countries in 1990 and 2020, with a projection for 2050.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        tableHtml: t5_table,
        keyFeatures: [
          "Every country except Nigeria is projected to have a larger share of older people in 2050 than in 1990.",
          "Japan shows the biggest rise (12% to 29% to a projected 38%) and is highest in 2020 and 2050; Italy is second (15%, 23%, 35%).",
          "The United States rises more slowly (12%, 17%, 22%).",
          "Brazil starts low (4%) but is projected to catch up with the United States (23% in 2050), the fastest proportional growth.",
          "Nigeria stays almost unchanged at 3% to 4% throughout.",
          "Good answers group countries (fast-ageing, moderate, young) rather than listing every figure, and mark 2050 as a projection."
        ]
      },
      task2: {
        topic: "Crime and society", type: "discussion",
        prompt: "Some people think that the rise in crime among young people is the fault of their parents. Others believe that schools and the wider society are more to blame.\n\nDiscuss both these views and give your own opinion.",
        ideas: [
          "Parents: first teachers of right and wrong; lack of supervision and boundaries; modelling behaviour; home conflict.",
          "Schools and society: exclusion from school, lack of opportunity, peer influence, media glamorising violence, poverty, poor youth services.",
          "A strong answer gives a clear opinion (often: responsibility shared, with one side weighed more) and keeps it consistent."
        ],
        backgroundStatements: []
      }
    },
    {
      id: "W6", difficulty: "standard", title: "Writing Test 6",
      task1: {
        kind: "pie",
        prompt: "The charts below show the percentage of average household spending on six categories in one country in 1995 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        svg: t6_pie,
        keyFeatures: [
          "Housing became the largest category, rising from 22% to 34%, while food fell from the largest (28%) to 17%.",
          "Leisure spending almost doubled (10% to 18%); clothing halved (12% to 6%).",
          "Transport stayed almost unchanged (14% to 15%); 'other' fell slightly (14% to 10%).",
          "Overview: a shift from necessities (food, clothing) towards housing and leisure.",
          "Expected language: proportion, share, accounted for, whereas, by contrast, in both years."
        ]
      },
      task2: {
        topic: "Media and advertising", type: "opinion",
        prompt: "Some people say that advertising encourages us to buy things we do not really need. Others say that advertising tells us about new products that may improve our lives.\n\nTo what extent do you agree or disagree with these views?",
        ideas: [
          "Against advertising: creates artificial wants, status anxiety, debt; targets children; environmental cost of consumption.",
          "For: informs consumers, supports competition and lower prices, funds free media, introduces genuinely useful products.",
          "The question asks for a position on both claims; a strong answer takes a clear stance (e.g. agree largely with the first, partly with the second) and supports each with a developed example."
        ],
        backgroundStatements: []
      }
    },
    {
      id: "W7", difficulty: "harder", title: "Writing Test 7",
      task1: {
        kind: "mixed",
        prompt: "The chart below shows the number of cars per 1,000 people and the percentage of journeys made by public transport in one European city between 1990 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        svg: t7_mixed,
        keyFeatures: [
          "Car ownership almost doubled from 180 to 350 per 1,000 people, with growth slowing after 2010 (340 to 350).",
          "Public transport's share of journeys fell from 38% in 1990 to a low of 24% in 2010 as car ownership rose.",
          "Between 2010 and 2020 the trend reversed: public transport recovered to 31% even though car ownership barely changed.",
          "Overview: an inverse relationship until 2010, then a partial recovery for public transport.",
          "Two data sets with different units: good answers describe each and then relate them."
        ]
      },
      task2: {
        topic: "Culture and tradition", type: "two-part",
        prompt: "In many countries, traditional skills and ways of life are disappearing as people move to cities and adopt modern technology.\n\nWhy is this happening?\n\nIs this a positive or negative development?",
        ideas: [
          "Causes: migration to cities for work; mass-produced goods cheaper than handmade; education and media promote global culture; young people see no future income in traditional crafts.",
          "Negative: loss of identity, knowledge and community; environmental knowledge disappears; homogenised culture.",
          "Positive: higher living standards, freedom from rigid roles, some traditions survive as heritage or tourism.",
          "Both questions must be answered; the second needs a clear judgement."
        ],
        backgroundStatements: []
      }
    },
    {
      id: "W8", difficulty: "harder", title: "Writing Test 8",
      task1: {
        kind: "process",
        prompt: "The diagram below shows how electricity is generated at a hydroelectric power station.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        svg: t8_process,
        keyFeatures: [
          "A man-made process with about seven stages, from water collecting in the reservoir to electricity reaching homes, with water returned to the river.",
          "Water from river and rain is held behind a dam; an intake gate releases it into the penstock, where it falls and gains speed.",
          "The falling water turns a turbine; a shaft connects the turbine to a generator which produces electricity.",
          "A transformer raises the voltage; pylons carry the electricity to homes and factories.",
          "The water leaves the turbine and flows back into the river downstream.",
          "Overview: two parallel outcomes, electricity to consumers and water returned; passive voice and sequencing expected."
        ]
      },
      task2: {
        topic: "Work and employment", type: "problem-solution",
        prompt: "In many countries, young people find it difficult to get a job after they finish their education.\n\nWhat are the causes of this problem?\n\nWhat measures could be taken to solve it?",
        ideas: [
          "Causes: mismatch between courses and labour market; employers demand experience; competition from automation and older workers; economic slowdowns; too many graduates in some fields.",
          "Solutions: apprenticeships and internships linked to study; career guidance and work placements in school; incentives for employers who hire first-time workers; vocational routes; entrepreneurship support.",
          "Each cause should connect to a solution; examples from a named country strengthen the answer."
        ],
        backgroundStatements: []
      }
    }
  );

  // ---------- DRILLS ----------
  window.WRITING_DRILLS = {
    intro: [
      { topic: "Education", type: "opinion", prompt: "Some people believe that university education should be free for all students, while others think students should pay for it themselves. Discuss both views and give your opinion.", background: ["Education plays a fundamental role in shaping individuals and societies, and different approaches to learning continue to be widely debated.", "Some argue that academic qualifications are essential for success, while others believe skills and experience matter more."] },
      { topic: "Technology", type: "opinion", prompt: "Some people think that the increasing use of artificial intelligence in the workplace will do more harm than good. To what extent do you agree or disagree?", background: ["Technological advancements have significantly transformed modern life, influencing how people communicate, work, and learn.", "In today's digital era, the integration of technology into various aspects of life has sparked debates about its benefits and drawbacks."] },
      { topic: "Environment", type: "opinion", prompt: "Some people believe that individuals can do little to protect the environment and that only governments and large companies can make a real difference. To what extent do you agree or disagree?", background: ["As the impact of human activity on the planet becomes increasingly evident, environmental protection has become a major area of focus.", "As environmental degradation increases, there is disagreement over whether individuals or governments should bear more responsibility."] },
      { topic: "Health", type: "problem-solution", prompt: "In many countries, levels of obesity among children are rising. What are the causes of this trend, and what measures could be taken to address it?", background: ["With rising health challenges worldwide, the debate over how to achieve a healthier population has become more prominent.", "Health is a critical aspect of human life, and governments, individuals, and organizations continue to seek ways to promote well-being."] },
      { topic: "Crime and punishment", type: "discussion", prompt: "Some people believe that longer prison sentences are the best way to reduce crime. Others think there are better alternatives. Discuss both views and give your opinion.", background: ["Crime remains a major issue in many societies, leading to ongoing debates about the most effective methods of prevention and punishment.", "The justice system and its ability to reduce crime and rehabilitate offenders are topics of significant public interest."] },
      { topic: "Media and advertising", type: "opinion", prompt: "Advertising aimed at children should be banned. To what extent do you agree or disagree?", background: ["The influence of media and advertising on public opinion and consumer behavior is a widely discussed issue in the modern world.", "As media becomes increasingly pervasive, concerns have arisen about its effects on individuals and society."] },
      { topic: "Work and career", type: "positive-negative", prompt: "An increasing number of people are choosing to work from home rather than in an office. Is this a positive or negative development?", background: ["The nature of work is constantly evolving due to technological and economic changes, raising questions about job satisfaction and stability.", "Employment is a key aspect of adult life, and finding the right balance between work and personal life is an ongoing challenge."] },
      { topic: "Globalisation and culture", type: "advantages", prompt: "International tourism has grown enormously in the last fifty years. Do the advantages of this development outweigh the disadvantages?", background: ["Globalization has connected nations like never before, leading to both opportunities and challenges for people and businesses alike.", "International tourism contributes to global understanding, but it may also harm local cultures and the environment."] },
      { topic: "Children and parenting", type: "discussion", prompt: "Some people think that parents have the greatest influence on a child's development, while others believe that schools play a more important role. Discuss both views and give your opinion.", background: ["There is ongoing debate about whether parents or schools play the most crucial role in a child's development.", "Children and young people are deeply influenced by their environment, education, and media, prompting debates on how best to nurture them."] },
      { topic: "Transport", type: "discussion", prompt: "Some people believe governments should invest in public transport to solve traffic problems, while others think building more roads is the answer. Discuss both views and give your opinion.", background: ["Transportation is an essential part of modern life, and cities continue to grapple with how to manage it efficiently and sustainably.", "Some believe investing in public transport is the best solution to traffic problems, while others argue for road expansion."] },
      { topic: "Urbanisation", type: "problem-solution", prompt: "More and more people are moving from rural areas to cities. What problems does this cause, and how can they be solved?", background: ["The rapid growth of cities has brought economic benefits but also significant urban challenges.", "As urban populations grow, the demand for better transport systems has led to discussions on infrastructure development."] },
      { topic: "Immigration", type: "advantages", prompt: "Many people move to other countries in search of work. What are the advantages and disadvantages of this for the countries they leave?", background: ["Immigration has become a global phenomenon, raising questions about integration, identity, and national security.", "Multicultural societies offer a range of benefits and challenges, leading to varied public opinions on immigration policies."] }
    ],
    body: [
      { topic: "Education", prompt: "Children should be taught how to manage money at school.", side: "Write ONE body paragraph supporting this view.", ideaHint: "financial literacy prepares for adult responsibilities; avoids debt; example of budgeting a part-time salary" },
      { topic: "Health", prompt: "In many countries fast food is becoming cheaper and more widely available. Do the disadvantages outweigh the advantages?", side: "Write ONE body paragraph on the disadvantages.", ideaHint: "high fat, sugar and salt; obesity and chronic disease; strain on healthcare; example of rising diabetes" },
      { topic: "Technology", prompt: "Mobile phones should be banned in public places such as libraries, shops and public transport.", side: "Write ONE body paragraph AGAINST a ban.", ideaHint: "communication, navigation, emergencies; ticketing and route updates; example of a late commuter" },
      { topic: "Crime", prompt: "The best way to reduce crime is to give longer prison sentences.", side: "Write ONE body paragraph arguing for alternatives.", ideaHint: "root causes: poverty, education, addiction; rehabilitation; example of a country with low reoffending" },
      { topic: "Society", prompt: "More people today prefer to live alone than in the past. Is this a positive or negative development?", side: "Write ONE body paragraph on the negative side.", ideaHint: "isolation and loneliness; mental health; no support in emergencies; older adults" },
      { topic: "Transport", prompt: "Governments should invest more in public transport than in roads.", side: "Write ONE body paragraph supporting this view.", ideaHint: "efficiency, lower emissions, less congestion; example of a city with strong transit" },
      { topic: "Environment", prompt: "Plastic containers cause serious environmental problems. What solutions are there?", side: "Write ONE body paragraph of solutions.", ideaHint: "regulate single-use plastics; biodegradable alternatives; awareness and recycling; retailer incentives" },
      { topic: "Work", prompt: "Working from home is better for employees than working in an office.", side: "Write ONE body paragraph on the drawbacks of working from home.", ideaHint: "blurred boundaries, burnout; isolation; weaker collaboration; roles needing presence" }
    ],
    overview: [
      { kind: "pie", prompt: "The pie charts below show the sources of electricity generation in Country X in 2000 and 2020.", svg: t1_pie, keyFeatures: ["Coal's share fell sharply (52% to 18%) while wind and solar rose from almost nothing (2%) to 28%.", "Gas became the largest single source in 2020 (30%).", "Nuclear and hydro changed little (18% to 15%; 8% to 9%)."] },
      { kind: "table", prompt: "The table below gives information about visitors to four national parks in 2022.", tableHtml: t1_table, keyFeatures: ["Clear inverse pattern: the most-visited park (Greenridge, 4.2m) had the shortest stays, lowest spending and highest car use; the least-visited (Coral Bay, 0.6m) the opposite.", "Spending per visitor ranged from $85 to $690, rising as visitor numbers fell.", "Car arrivals fell from 91% to 12% across the same order."] },
      { kind: "bar", prompt: "The chart below shows the reasons people gave for cycling to work in one city in 2010 and 2022.", svg: t1_bar2, keyFeatures: ["Every reason except 'cheaper' became more common; 'cheaper' fell from 48% to 31%.", "'Health' became the most common reason in 2022 (52%), overtaking 'cheaper'.", "The largest increase was 'environment' (12% to 41%)."] }
    ]
  };

  // Idea bank adapted from Neha's own "Ideas on different topics" notes (condensed)
  window.IDEA_BANK = [
    { q: "Unpaid community service should be compulsory in high school.", for: "social responsibility, empathy; soft skills from teamwork; maturity beyond academics", against: "resentment, box-ticking; exam-period stress; conflicts with deadlines" },
    { q: "Fast food is cheaper and more available. Do disadvantages outweigh advantages?", for: "convenience for busy or low-income people; jobs and economy", against: "obesity and chronic disease; strain on healthcare; rising diabetes" },
    { q: "Mobile phones should be banned in libraries, shops and public transport.", for: "quiet, respectful environment; concentration for students", against: "communication, navigation, emergencies; ticketing and route updates" },
    { q: "Best way to improve public health is more sports facilities.", for: "removes barriers; culture of fitness; lower obesity", against: "unused without motivation; education campaigns and workplace incentives work better" },
    { q: "Governments should invest in public transport rather than roads.", for: "efficient, lower emissions, less congestion (e.g. Singapore)", against: "roads needed for logistics and rural access; but highways encourage sprawl (e.g. Los Angeles)" },
    { q: "Social media is replacing face-to-face interaction.", for: "contact across distances; real-time sharing; migrants and students", against: "loneliness; comparison culture; addiction and attention" },
    { q: "Children should be taught to manage money at school.", for: "budgeting and saving; avoiding debt; independence", against: "(usually agree) - develop two reasons fully" },
    { q: "Longer prison sentences are the best way to reduce crime.", for: "deterrence; public safety; sense of justice", against: "root causes: poverty, education, addiction; rehabilitation (Norway's low reoffending)" },
    { q: "Children are told they can achieve anything if they try hard enough.", for: "motivation, resilience, ambition", against: "unrealistic expectations; talent and opportunity matter; sense of failure" },
    { q: "More people prefer to live alone. Positive or negative?", for: "independence, privacy, self-reliance", against: "isolation, loneliness, no support in emergencies (elderly)" },
    { q: "Governments should provide free healthcare.", for: "equal access regardless of wealth; social justice (e.g. NHS)", against: "overuse, waiting lists, funding shortages (e.g. Canadian waiting times)" },
    { q: "Children's leisure activities must be educational.", for: "puzzles, chess, coding build focus and thinking", against: "unstructured play builds creativity, emotion and social skills" },
    { q: "Plastic containers: problems and solutions.", for: "problems: slow decomposition, pollution, harm to animals, food chain", against: "solutions: regulation, biodegradable alternatives, awareness, retailer incentives (Rwanda's ban)" },
    { q: "Parents vs schools in teaching social values.", for: "parents: first teachers, model behaviour, early morals", against: "schools: diverse peers, civic education, teamwork, conflict resolution" },
    { q: "Public libraries vs digital content.", for: "libraries: free access, quiet study, support for the underprivileged", against: "digital: convenience, cost, flexibility (online courses)" },
    { q: "Raising the legal driving age.", for: "young drivers lack maturity; higher crash rates", against: "better training, graduated licensing, technology are more effective (Sweden)" },
    { q: "Children should start school early vs at age seven.", for: "early: literacy, routine, social skills", against: "late: emotional maturity, play and creativity, less burnout" },
    { q: "The internet is a source of negative influence.", for: "misinformation; comparison and anxiety; addiction", against: "education, relationships, communities; responsible use and digital literacy" },
    { q: "Raising fuel prices is the best way to solve environmental problems.", for: "discourages fossil fuel use; pushes public transport and renewables", against: "hurts low-income families; need multi-faceted solutions and regulation" },
    { q: "More people are working from home. Positive or negative?", for: "no commute, flexibility, lower costs, job satisfaction", against: "blurred boundaries, isolation, weaker collaboration; hybrid model" }
  ];
})();

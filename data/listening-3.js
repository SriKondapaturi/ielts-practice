// Listening Test 3 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L3",
  title: "Listening Test 3",
  parts: [
    {
      number: 1,
      intro: "You will hear a man registering with an employment agency for temporary work.",
      speakers: { W: { name: "Agency adviser", gender: "female" }, M: { name: "Callum", gender: "male" } },
      script: [
        { cue: "look", range: [1, 6] },
        { s: "W", t: "Good morning, welcome to Brightway Recruitment. I'm Rachel. Have a seat. You're here to register for temporary work, is that right?" },
        { s: "M", t: "Yes, that's right. A friend of mine found work through you last summer and he said it was quite straightforward." },
        { s: "W", t: "It is, mostly. I'll take your details first, then we'll talk about what sort of work you're looking for. Can I have your full name?" },
        { s: "M", t: "Callum Ferreira." },
        { s: "W", t: "Could you spell the surname for me?" },
        { s: "M", t: "It's F-E-R-R-E-I-R-A." },
        { s: "W", t: "F-E-R-R-E-I-R-A. Thank you. And your date of birth?" },
        { s: "M", t: "The 14th of August, 1996." },
        { s: "W", t: "14th of August, 96. And your address?" },
        { s: "M", t: "Flat 3, 27 Linden Street." },
        { s: "W", t: "And the postcode?" },
        { s: "M", t: "B-R-6, 2-H-L." },
        { s: "W", t: "B-R-6, 2-H-L. Lovely. Now, tell me about your work history. What was your most recent job?" },
        { s: "M", t: "For the last two years I was a driver for a parcel company. Before that I worked in a warehouse, but that was only for a few months." },
        { s: "W", t: "So, driver most recently. Do you have any qualifications that might be relevant?" },
        { s: "M", t: "I've got a forklift licence. I did the course about two years ago and it's still valid. I also started an accountancy course at college, but I didn't finish it, so I'm not sure that counts." },
        { s: "W", t: "I'll note the licence. That's useful, a lot of our clients ask for it. Now, when could you start?" },
        { s: "M", t: "Straight away, really. I could start next Monday. Oh, actually, no. I've got a hospital appointment on Monday morning. Tuesday would be the first day I could do." },
        { s: "W", t: "Tuesday, then. That's fine." },
        { cue: "continue", range: [7, 10] },
        { s: "W", t: "Let's talk about the kind of work you'd like. We have quite a range at the moment. There's warehouse work, some office administration, catering, and a lot of outdoor work with the council's parks department over the summer." },
        { s: "M", t: "To be honest, I'd like something outdoors if possible. I spent too long sitting in a van. Parks, gardening, groundwork, anything like that." },
        { s: "W", t: "Good, that's the area where we most need people. The outdoor jobs are mostly five days a week, seven till three." },
        { s: "M", t: "That suits me. What's the pay?" },
        { s: "W", t: "For the parks work the standard rate is 13 pounds 50 an hour. Sorry, let me check that. No, it went up at the start of the month. It's 14 pounds 20 now." },
        { s: "M", t: "Fourteen twenty. That's better than I expected." },
        { s: "W", t: "You're paid weekly, straight into your bank account, so we'll need your bank details at some point. Now, before we can offer you anything, you'll need to come in for a short interview and bring some documents." },
        { s: "M", t: "What do I need to bring?" },
        { s: "W", t: "Your passport, so we can check you have the right to work, and proof of address, such as a bank statement or a bill from the last three months. Don't bring a mobile phone bill, though, we can't accept those." },
        { s: "M", t: "Passport and a bank statement. Fine. Do you need references?" },
        { s: "W", t: "We'll ask for two, but you can email those to me later. The interview itself only takes about twenty minutes. Can you come in on Thursday?" },
        { s: "M", t: "Thursday's fine. What time?" },
        { s: "W", t: "Let me see. I've got nine o'clock, or half past ten." },
        { s: "M", t: "Half past ten would be better. The buses are a nightmare before nine." },
        { s: "W", t: "Half past ten on Thursday, then. Ask for me at reception, Rachel Dunn. And wear something smart but comfortable, because for the outdoor jobs we also do a quick practical check of lifting technique." },
        { s: "M", t: "Okay. Thanks very much, Rachel. See you on Thursday." }
      ],
      questionGroups: [
        {
          type: "table",
          range: [1, 6],
          instructions: [
            "Complete the table below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          tableTitle: "Brightway Recruitment – Registration form",
          columns: ["Detail", "Information"],
          rows: [
            ["Name", "Callum [[1]]"],
            ["Date of birth", "[[2]] 1996"],
            ["Address", "Flat 3, 27 Linden Street"],
            ["Postcode", "[[3]]"],
            ["Most recent job", "[[4]]"],
            ["Qualification", "forklift [[5]]"],
            ["Available from", "next [[6]]"]
          ],
          questions: [
            { n: 1, answer: ["ferreira"] },
            { n: 2, answer: ["14 august", "14th august", "august 14", "august 14th", "14/8", "14/08"] },
            { n: 3, answer: ["br6 2hl", "br62hl"] },
            { n: 4, answer: ["driver", "parcel driver"] },
            { n: 5, answer: ["licence", "license"] },
            { n: 6, answer: ["tuesday"] }
          ]
        },
        {
          type: "notes",
          range: [7, 10],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Work preferences and next steps",
          lines: [
            "• Prefers work that is [[7]]",
            "• Hourly rate for parks work: £[[8]]",
            "• Bring to interview: passport and proof of [[9]]",
            "• Interview: Thursday at [[10]]"
          ],
          questions: [
            { n: 7, answer: ["outdoors", "outdoor", "outside"] },
            { n: 8, answer: ["14.20", "14,20", "1420"] },
            { n: 9, answer: ["address"] },
            { n: 10, answer: ["10.30", "10:30", "1030", "half past ten", "10.30 am", "10:30 am"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a radio presenter talking about a cycling festival that is taking place in the town this weekend.",
      speakers: { P: { name: "Presenter", gender: "male" } },
      script: [
        { cue: "look", range: [11, 15] },
        { s: "P", t: "It's twenty past eight, and if you're in or around Fenbridge this weekend, you'll have noticed the bunting going up, because it's time once again for the Fenbridge Cycling Festival. I've got all the details for you now." },
        { s: "P", t: "First, the location. Regular listeners will remember that for the first few years the festival was based in the market square, and last year it spread into the town park as well. It simply became too big for the centre of town, so this year the organisers have moved everything down to the riverside, along Meadow Walk. All the stalls, the stage and the start and finish lines will be there." },
        { s: "P", t: "Now, traffic, and there's a real change this year. For the first time, the council has agreed to close High Street and Bridge Street to cars for the whole weekend, from six on Saturday morning until Sunday evening. The organisers have asked for this every year and have always been turned down before. Buses will be diverted along Station Road." },
        { s: "P", t: "So how should you get there? There are shuttle buses from the station every twenty minutes, and the trains are running, although there's a reduced service on Sunday because of engineering work, so check before you travel. But honestly, the easiest way to arrive at a cycling festival is on a bike. There's secure bike parking for five hundred bikes right next to the entrance, staffed all weekend, and it's free." },
        { s: "P", t: "Food and drink. There'll be about thirty food stalls along the river, selling everything from local cheese to wood-fired pizza. Most of the stalls are run by local businesses, though not all of them. One thing to be aware of: the whole site is cashless this year, so every stall takes cards and phone payments only. So leave your coins at home." },
        { s: "P", t: "Entry to the site is free, and the organisers only charge for a few of the events, which I'll come to in a moment. Any money left over after the costs are paid goes to a very good cause. In previous years it went to the children's hospital, but this year the committee has decided to give it to the campaign for a new cycle path linking Fenbridge to Ashby, which would take cyclists off the main road for the first time." },
        { cue: "continue", range: [16, 20] },
        { s: "P", t: "Now let's go through the main events. The big one, as always, is the family ride on Saturday morning. It's a gentle twelve-kilometre loop along the river and back through the villages, suitable for anyone who can ride a bike. There's a small charge, five pounds for adults and two pounds for children, which covers the marshals and the medals at the end. Please note that it sets off at nine this year rather than ten, because last year the riders were coming back just as the market got busy, which caused a bit of chaos." },
        { s: "P", t: "On Saturday evening there's the night ride, which was so popular last year that they've had to limit it to two hundred riders. You absolutely must book in advance through the festival website; there'll be no places available on the day. Lights are compulsory, and the route is about twenty kilometres." },
        { s: "P", t: "If your bike is making strange noises, there's a free bike maintenance workshop running all day Sunday. It was going to be in a marquee by the river, but with the forecast of showers on Sunday it's been moved into the town hall, so you'll stay dry while you learn to fix a puncture and adjust your brakes." },
        { s: "P", t: "For the more competitive, the hill climb takes place on Sunday morning on Chalk Lane, a short but brutal climb that gains over a hundred metres. Entry is ten pounds, and this year the fastest rider wins a brand-new bike donated by the shop on Bridge Street, which is quite a prize for a two-minute effort." },
        { s: "P", t: "Then there's the vintage parade on Sunday afternoon, which hasn't been part of the festival before. Anyone with a bike more than thirty years old, or who fancies dressing up in old-fashioned cycling clothes, can join a slow procession along the river." },
        { s: "P", t: "I should also mention that the BMX display that was advertised has unfortunately been cancelled, because the team's transport broke down. Everything else is going ahead as planned. Full details are on the festival website, and I'll be down there on Saturday, so come and say hello." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [11, 15],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 11, text: "Where is the festival being held this year?", options: ["in the market square", "in the town park", "beside the river"], answer: "C" },
            { n: 12, text: "What is happening for the first time this year?", options: ["Two streets are being closed to traffic.", "Buses are being diverted along Station Road.", "Parking is being provided in the park."], answer: "A" },
            { n: 13, text: "The presenter recommends travelling to the festival", options: ["by train.", "by shuttle bus.", "by bike."], answer: "C" },
            { n: 14, text: "What does the presenter say about the food stalls?", options: ["All of them are run by local businesses.", "They do not accept cash.", "They are cheaper than last year."], answer: "B" },
            { n: 15, text: "This year, money raised by the festival will go to", options: ["a children's hospital.", "a new cycle path.", "repairs to the main road."], answer: "B" }
          ]
        },
        {
          type: "matchfeatures",
          range: [16, 20],
          instructions: [
            "What does the presenter say about each of the following events?",
            "Choose FIVE answers from the box and write the correct letter, A-G, next to Questions 16-20."
          ],
          optionsTitle: "Information",
          options: [
            { letter: "A", text: "It has been cancelled." },
            { letter: "B", text: "It requires advance booking." },
            { letter: "C", text: "It is free for children." },
            { letter: "D", text: "It starts earlier than last year." },
            { letter: "E", text: "It takes place indoors." },
            { letter: "F", text: "It is new this year." },
            { letter: "G", text: "It has a prize." }
          ],
          questions: [
            { n: 16, text: "Family ride", answer: "D" },
            { n: 17, text: "Night ride", answer: "B" },
            { n: 18, text: "Bike maintenance workshop", answer: "E" },
            { n: 19, text: "Hill climb", answer: "G" },
            { n: 20, text: "Vintage parade", answer: "F" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear a student called Hannah discussing her dissertation on sleep and academic performance with her tutor.",
      speakers: { T: { name: "Tutor", gender: "male" }, H: { name: "Hannah", gender: "female" } },
      script: [
        { cue: "look", range: [21, 26] },
        { s: "T", t: "Come in, Hannah. Remind me how you ended up with sleep and academic performance as your dissertation topic. You were going to look at exercise originally." },
        { s: "H", t: "I was, yes. But then I came across a review article on sleep, and nearly all the studies it covered were done with school children or with older adults. There was hardly anything on university students, so it felt like a gap I could do something about." },
        { s: "T", t: "That's a good reason. A gap in the literature is a much stronger starting point than a personal hunch. What did the reading tell you?" },
        { s: "H", t: "The thing that surprised me most was that how long people sleep seems to matter less than how well they sleep. People who got seven hours of broken sleep did worse on memory tests than people who got six hours uninterrupted. I'd assumed it was simply about the number of hours." },
        { s: "T", t: "Yes, quality versus duration comes up a lot now. How are you planning to recruit your participants?" },
        { s: "H", t: "I'm aiming for eighty second-year students, all from the university but from different courses, so it's not just psychology students." },
        { s: "T", t: "Eighty is reasonable, and mixing courses is sensible. My concern is a different one. When you ask for volunteers for a sleep study, who comes forward? Usually the people who already sleep well and feel good about it. The students who are up until four every night don't volunteer. So your sample may not represent the people you most want to know about." },
        { s: "H", t: "I hadn't thought about that. Maybe I could offer a small incentive, so that it's not only the enthusiasts who take part?" },
        { s: "T", t: "That would help, and you should acknowledge the issue in your limitations section. Now, how are you measuring sleep? You said in your proposal that participants would keep a sleep diary." },
        { s: "H", t: "Yes, a simple diary each morning: bedtime, waking time, how many times they woke in the night." },
        { s: "T", t: "Diaries are fine, but people are poor at estimating their own sleep; they round everything to the nearest hour. The department has about thirty wrist-worn sleep trackers that nobody is using at the moment. I'd strongly suggest you use those instead. The data will be far more accurate." },
        { s: "H", t: "That would be fantastic. I didn't know we had them." },
        { s: "T", t: "You ran a small pilot before the summer, didn't you? How did that go?" },
        { s: "H", t: "Mixed. The ethics approval came through on time, which was a relief, and the questionnaire itself was fine, nobody complained that it was too long. But two things went wrong. First, about half the participants simply forgot to fill in the diary on at least a few days, so there were gaps in the data. And second, one of the questions, about caffeine, was misunderstood. Some people counted cups of tea as caffeinated drinks and some didn't." },
        { s: "T", t: "Both common problems. The trackers solve the first, and the second just needs clearer wording." },
        { cue: "continue", range: [27, 30] },
        { s: "T", t: "Let's go through the procedure step by step, so I can see whether the timings work." },
        { s: "H", t: "Okay. Stage one is recruitment. In the pilot I put up posters around campus, but I got almost no response from those. Nearly everyone came through the email I sent to all second-years, so this time I'll only use email." },
        { s: "T", t: "Sensible. Then what?" },
        { s: "H", t: "Then everyone who agrees to take part completes a questionnaire about their general sleep habits and lifestyle, including the caffeine question, reworded. " },
        { s: "T", t: "Good. And the tracking phase?" },
        { s: "H", t: "I was going to run it for two weeks, but now that the trackers are available I'd like to extend it to three weeks, so I get at least one normal week and one week before a deadline." },
        { s: "T", t: "Three weeks is fine, as long as you have enough trackers to run the participants in groups. After the tracking phase?" },
        { s: "H", t: "At the end of the three weeks, everyone sits a short memory test under exam conditions, so I can compare their scores against their sleep data." },
        { s: "T", t: "And the final stage?" },
        { s: "H", t: "At the end of the semester, with their permission, I compare the results with their actual grades, to see whether the pattern holds up in real assessments." },
        { s: "T", t: "That's a well-designed study. Write it up as a flow chart for the methods chapter." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [21, 24],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 21, text: "Why did Hannah choose sleep and academic performance as her topic?", options: ["Her own sleep had affected her studies.", "Few studies had looked at university students.", "Her tutor had suggested it to her."], answer: "B" },
            { n: 22, text: "What surprised Hannah most in her reading?", options: ["Sleep quality matters more than sleep length.", "Short naps improve memory.", "Students sleep less than other adults."], answer: "A" },
            { n: 23, text: "The tutor is concerned that Hannah's sample may", options: ["be too small to produce reliable results.", "include too many psychology students.", "consist mainly of people who already sleep well."], answer: "C" },
            { n: 24, text: "To measure sleep more accurately, the tutor suggests", options: ["using wearable trackers.", "asking participants to keep a more detailed diary.", "observing participants in a sleep laboratory."], answer: "A" }
          ]
        },
        {
          type: "mcq-multi",
          range: [25, 26],
          select: 2,
          instructions: ["Choose TWO letters, A-E."],
          stem: "Which TWO problems did Hannah have with her pilot study?",
          options: [
            "The questionnaire was too long.",
            "Participants forgot to complete the diary.",
            "The software for recording data failed.",
            "Ethics approval was delayed.",
            "One question was misunderstood."
          ],
          questions: [{ n: 25 }, { n: 26 }],
          answer: ["B", "E"]
        },
        {
          type: "flowchart",
          range: [27, 30],
          instructions: [
            "Complete the flow-chart below.",
            "Write ONE WORD ONLY for each answer."
          ],
          flowchartTitle: "Research procedure",
          lines: [
            "Recruit 80 second-year students by [[27]]",
            "Participants complete a [[28]] about sleep habits and lifestyle",
            "Participants wear sleep trackers for [[29]] weeks",
            "Participants sit a [[30]] test under exam conditions",
            "Compare results with end-of-semester grades"
          ],
          questions: [
            { n: 27, answer: ["email", "e-mail"] },
            { n: 28, answer: ["questionnaire"] },
            { n: 29, answer: ["three", "3"] },
            { n: 30, answer: ["memory"] }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the urban heat island effect.",
      speakers: { L: { name: "Lecturer", gender: "female" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good morning. In today's lecture I want to look at a phenomenon that affects more than half the world's population, and which is becoming more serious every year: the urban heat island effect. Put simply, this is the tendency of cities to be warmer than the countryside around them. I'll cover the causes, how it's measured, what the consequences are, and finally what cities are doing about it." },
        { s: "L", t: "Let's start with causes, and there are four main ones. The first is the materials cities are made of. Roads, car parks and roofs are mostly dark, dense surfaces like asphalt and concrete. They absorb heat from the sun during the day and release it slowly after dark, so the city stays warm long into the night. A field or a forest, by contrast, reflects more sunlight and never stores as much heat. The second cause is the lack of vegetation. Plants cool the air around them because water evaporates from their leaves, and a city with few trees loses almost all of that natural cooling. Third, cities generate heat of their own. Traffic, industry and, increasingly, air conditioning all pump waste heat into the streets. Air conditioning is a particular problem, because the hotter the city gets, the more people use it, and the more heat it releases outside. And the fourth cause is the shape of the city itself. Tall buildings packed closely together trap heat between them and block the wind, which would otherwise carry warm air away." },
        { s: "L", t: "Now, how do we know about this, and how do we measure it? The effect was first described surprisingly early. In 1818, Luke Howard, who was a chemist by profession and a weather observer in his spare time, compared temperature readings taken in the centre of London with readings from the countryside outside it, and found the city consistently warmer. He's better known today for giving clouds the names we still use, but his London study is really the beginning of urban climate science. Modern measurements use two approaches. Networks of weather stations across a city record the air temperature at street level. These show that the difference between city and countryside is small during the day but reaches its peak at night, when the stored heat is released; in large cities the gap can exceed ten degrees. The second approach uses satellites, which measure the temperature of surfaces, roofs, roads and so on, rather than the air. Surface temperatures are much more extreme, so it's important not to confuse the two when you read the figures." },
        { s: "L", t: "What are the consequences? The most obvious is the demand for electricity. When a city is several degrees warmer, millions of people turn on cooling systems at the same time, which strains the power supply and, if that power comes from fossil fuels, adds to the very problem we're describing. The second consequence is health. During heatwaves, deaths rise sharply, and the people most at risk are the elderly, especially those living alone in upper-floor flats that don't cool down at night. The third consequence is air quality. High temperatures speed up the chemical reactions that produce ground-level ozone, so hot cities are also polluted cities." },
        { s: "L", t: "So what can be done? I'll mention three strategies that have been tried at scale. The first is cool roofs. A roof that is painted white, or covered with a reflective coating, can be as much as thirty degrees cooler on its surface than a dark one, and that reduces the temperature inside the building below. Some cities have gone further and covered roofs with plants, so-called green roofs, which also absorb rainwater. The second strategy is trees. A street with mature trees can be several degrees cooler than a bare one, because of both shade and evaporation. The difficulty is that trees in cities often die young, because their roots have no room under the pavement and because nobody waters them in the first few summers. Planting is easy; keeping trees alive is the hard part. The third strategy is water. Fountains, ponds and rivers cool the air around them. The most famous example is Seoul, where in the early 2000s the city removed a motorway and restored the stream that had been running underneath it for decades. Temperatures along the restored stream are now several degrees lower than in the surrounding streets." },
        { s: "L", t: "In the second half of the lecture I'll look in detail at how one city, Melbourne, has combined all three of these strategies in its urban forest plan." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write NO MORE THAN TWO WORDS for each answer."
          ],
          notesTitle: "The urban heat island effect",
          lines: [
            "Causes",
            "• dark surfaces such as roads and roofs absorb heat and release it at night",
            "• lack of [[31]] – little natural cooling by evaporation",
            "• waste heat from traffic, industry and [[32]]",
            "• tall buildings trap heat and block the [[33]]",
            "Measurement",
            "• first described in 1818 by Luke Howard, a [[34]] who compared London with the countryside",
            "• weather stations: difference between city and countryside is greatest at [[35]]",
            "• satellites measure the temperature of surfaces, not the [[36]]",
            "Consequences",
            "• increased demand for [[37]]",
            "• more deaths among the [[38]] during heatwaves",
            "• poorer air quality",
            "Solutions",
            "• cool roofs: white paint, reflective coatings or [[39]]",
            "• trees: give shade but often die young",
            "• water: Seoul removed a motorway and restored a [[40]]"
          ],
          questions: [
            { n: 31, answer: ["vegetation", "plants", "trees"] },
            { n: 32, answer: ["air conditioning", "air-conditioning"] },
            { n: 33, answer: ["wind"] },
            { n: 34, answer: ["chemist"] },
            { n: 35, answer: ["night"] },
            { n: 36, answer: ["air"] },
            { n: 37, answer: ["electricity", "power"] },
            { n: 38, answer: ["elderly", "elderly people", "old people"] },
            { n: 39, answer: ["plants", "green roofs"] },
            { n: 40, answer: ["stream", "river"] }
          ]
        }
      ]
    }
  ]
});

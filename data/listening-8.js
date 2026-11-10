// Listening Test 8 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L8", difficulty: "standard",
  title: "Listening Test 8",
  parts: [
    {
      number: 1,
      intro: "You will hear an international student phoning a university accommodation office to arrange a room.",
      speakers: { W: { name: "Accommodation officer", gender: "female" }, M: { name: "Lukas", gender: "male" } },
      script: [
        { cue: "look", range: [1, 5] },
        { s: "W", t: "Good morning, Northgate University Accommodation Office, Janet speaking. How can I help you?" },
        { s: "M", t: "Oh, hello. I'm an international student and I'm starting at Northgate in September. I'd like to arrange a room in one of the university halls. I filled in the online form about three weeks ago, but I haven't heard anything since." },
        { s: "W", t: "I'm sorry about that. We've had a very busy few weeks. Let me find your form on the system. Could I have your full name, please?" },
        { s: "M", t: "It's Lukas Brandvik. Lukas is spelt with a K, and the surname is B-R-A-N-D-V-I-K." },
        { s: "W", t: "B-R-A-N-D-V-I-K. Yes, here you are. And you're coming to us from Norway, is that right?" },
        { s: "M", t: "That's right, from Bergen." },
        { s: "W", t: "Lovely. And which course will you be studying? The form says Business Management." },
        { s: "M", t: "Ah, that's out of date, I'm afraid. I did apply for Business Management originally, but I changed to Economics over the summer, so it should say Economics now." },
        { s: "W", t: "Economics. I'll update that for you. Now, when are you planning to arrive? I've got the 12th of September written here." },
        { s: "M", t: "That's changed as well, sorry. My flight was cancelled and the only seat I could get is a week later, so I'll actually be arriving on the 19th." },
        { s: "W", t: "The 19th of September. That's no problem at all, as long as you're here before term starts on the 22nd. Now, what type of room were you hoping for?" },
        { s: "M", t: "I'd really like my own bathroom if that's possible. I'm not very keen on sharing with people I don't know." },
        { s: "W", t: "I understand. Most of our standard rooms share a bathroom between four students, and I'm afraid those are mostly what's left at this stage. However, we do still have a few ensuite rooms available in Keswick House, which is one of the newer halls, about ten minutes from the library." },
        { s: "M", t: "An ensuite room in Keswick House would be perfect." },
        { s: "W", t: "Then I'll reserve one of those for you now." },
        { s: "M", t: "Thank you. Could you tell me how much the rent is?" },
        { s: "W", t: "Of course. Last year the ensuite rooms were 150 pounds a week, and that's the figure you'll still see on some of our older leaflets, but the price went up this year. It's now 165 pounds a week." },
        { s: "M", t: "165 a week. Okay." },
        { cue: "continue", range: [6, 10] },
        { s: "M", t: "And is there a deposit to pay?" },
        { s: "W", t: "There is. The deposit is 300 pounds, and you pay it when you accept the offer. You get the whole amount back at the end of the year, provided the room is left in good condition." },
        { s: "M", t: "That's fine. What exactly is included in the rent? I'm trying to work out my budget before I come." },
        { s: "W", t: "All your bills are included: heating, electricity, water and the internet connection in your room. It also includes insurance for your belongings, which a lot of students don't realise, so you don't need to buy that separately. The one thing you do pay for yourself is the laundry. The machines in the basement take cards." },
        { s: "M", t: "That's really helpful. And how do I get to the university from the hall? Is it far?" },
        { s: "W", t: "It's about twenty minutes on foot, but there's a bus stop right outside the main door. Be careful, though. The number 24 goes into the town centre, so don't take that one by mistake. The one you want is the 42. That stops right at the main campus entrance." },
        { s: "M", t: "The 42. I'll write that down. And if I have any problems when I arrive, when is your office open?" },
        { s: "W", t: "Monday to Friday. We used to open at nine, but since this term we've been opening at half past eight, because so many students need to see us before their first lecture. We close at five." },
        { s: "M", t: "Half past eight. Great. And who should I ask for?" },
        { s: "W", t: "Ask for me. My name is Janet Pearce, that's P-E-A-R-C-E. I'll be looking after your room from now on." },
        { s: "M", t: "P-E-A-R-C-E. Thank you very much, Janet, you've been very kind." },
        { s: "W", t: "You're welcome, Lukas. I'll email the offer to you this afternoon, and you'll have seven days to accept it and pay the deposit. Have a safe journey, and we'll see you in September." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [1, 10],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Northgate University – Accommodation enquiry",
          lines: [
            "Example   University:   Northgate",
            "Student details",
            "• Name: Lukas [[1]]",
            "• Course: [[2]]",
            "• Arrival date: [[3]] September",
            "• Room type requested: [[4]] room in Keswick House",
            "Costs",
            "• Rent: £[[5]] per week",
            "• Deposit: £[[6]] (returned at end of year)",
            "• Rent includes all bills, internet and [[7]]",
            "• Laundry paid for separately",
            "Other information",
            "• Nearest bus to campus: number [[8]]",
            "• Accommodation Office opens at [[9]] a.m., Monday to Friday",
            "• Contact: Janet [[10]]"
          ],
          questions: [
            { n: 1, answer: ["brandvik"] },
            { n: 2, answer: ["economics"] },
            { n: 3, answer: ["19", "19th", "nineteenth"] },
            { n: 4, answer: ["ensuite", "en-suite", "en suite"] },
            { n: 5, answer: ["165"] },
            { n: 6, answer: ["300"] },
            { n: 7, answer: ["insurance"] },
            { n: 8, answer: ["42"] },
            { n: 9, answer: ["8.30", "8:30", "830"] },
            { n: 10, answer: ["pearce"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a council officer talking to residents at a public meeting about a town's new recycling scheme.",
      speakers: { W: { name: "Council officer", gender: "female" } },
      script: [
        { cue: "look", range: [11, 15] },
        { s: "W", t: "Good evening, everyone, and thank you for coming. My name's Helen Marsh and I'm the recycling officer for Millbridge Council. I'm here to explain the changes to household recycling that begin in the New Year, and I'll take your questions at the end." },
        { s: "W", t: "First of all, why are we changing anything? You may have read in the local paper that it's all about the council saving money, and I won't pretend that costs don't matter, because sending waste to landfill gets more expensive every year. But that isn't the reason we're doing this. Millbridge currently recycles just 31 per cent of its household waste. That is the second lowest figure of any town in this region, and the government has set every council a target of 55 per cent by the end of the decade. With the system we have now, we simply cannot get there." },
        { s: "W", t: "So what will change? At the moment, every house has a single black box for all its recycling. From January, you'll have two wheeled bins instead: a blue one for paper and cardboard, and a green one for plastics and cans. We did originally plan to deliver them before Christmas, but the manufacturer couldn't supply enough in time, so they'll arrive during the first two weeks of January. Your collection day will stay the same." },
        { s: "W", t: "People keep asking me what to do with the old black box. We won't be coming round specially to collect them. You're very welcome to keep yours, and many people find them useful for storage in the garage. If you don't want it, just leave it out next to your new bins on your first new collection day, and the crew will take it away to be recycled." },
        { s: "W", t: "Now, plastics. The green bin will take plastic bottles, and also pots, tubs and trays, like yoghurt pots and the trays that meat and fruit come in. That's a big change, because the old black box only took bottles. What the green bin won't take is plastic film and carrier bags. Those wrap themselves around the machinery at the sorting plant and bring the whole line to a halt." },
        { s: "W", t: "I want to be honest about where the biggest difficulty lies at the moment. It isn't that people don't recycle. Most of you do. The problem is that too much of what's collected is dirty. A single jar with food still inside it can spoil an entire lorry load of paper, which then has to go to landfill after all. So please, a quick rinse before anything goes in the bin." },
        { cue: "continue", range: [16, 20] },
        { s: "W", t: "Now let me explain how some particular materials will be collected under the new scheme." },
        { s: "W", t: "Glass is the question I get asked more than any other. Glass won't go in either of the new bins. Broken glass damages the sorting equipment, and when it gets mixed with paper it makes the paper worthless. Instead, we're installing bottle banks in the car parks of all three supermarkets in town. So glass goes there, not to the kerb." },
        { s: "W", t: "Garden waste: grass cuttings, hedge trimmings, leaves and so on. This will carry on being collected from the kerb in the brown bin every two weeks, exactly as now. The difference is that from April there will be an annual charge of 40 pounds for that service. If you don't want to pay, you can still take garden waste to the household recycling centre free of charge, but for most households the kerbside collection is far more convenient." },
        { s: "W", t: "Batteries. Please never put batteries in any of the bins. They are the main cause of fires in our collection lorries, and we had two last year. Instead, put your used batteries in a small clear bag, tie it, and place it on top of the lid of your blue bin on collection day. The crew will pick it up separately." },
        { s: "W", t: "Textiles, which means clothes, shoes, towels and bedding. For years we had an arrangement with a charity which sent a van round every month, but the charity has closed that service. From January, you book a collection on the council website, up to four times a year, and we'll collect the bag from your doorstep on the date you've chosen." },
        { s: "W", t: "And finally, food waste, which is the newest part of the scheme. Every household will receive a small grey caddy to keep in the kitchen, and a larger lockable one to keep outside. The outdoor caddy will be emptied every week, on the same day as whichever of your other bins is due. The food is taken to a plant outside town where it's turned into gas for electricity and into fertiliser for farms." },
        { s: "W", t: "Right, that's the overview. There are leaflets by the door with collection dates for every street. Who has the first question?" }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [11, 15],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 11, text: "According to the speaker, the main reason for changing the recycling scheme is that", options: ["the town's recycling rate is too low.", "landfill is becoming more expensive.", "the council needs to reduce its spending."], answer: "A" },
            { n: 12, text: "The new bins will be delivered", options: ["before Christmas.", "in January.", "in April."], answer: "B" },
            { n: 13, text: "What does the speaker say about the old black boxes?", options: ["The council will collect them from every house.", "Residents should take them to the recycling centre.", "Residents can keep them or leave them out with the new bins."], answer: "C" },
            { n: 14, text: "What change does the speaker mention regarding plastics?", options: ["Carrier bags can now be recycled at the kerb.", "Pots, tubs and trays will now be accepted.", "Plastic bottles will no longer be collected."], answer: "B" },
            { n: 15, text: "The speaker says the biggest problem with recycling at present is that", options: ["too few residents take part.", "recycled items are often not clean.", "the lorries are too small."], answer: "B" }
          ]
        },
        {
          type: "matchfeatures",
          range: [16, 20],
          instructions: [
            "How will each of the following materials be collected under the new scheme?",
            "Choose FIVE answers from the box and write the correct letter, A-G, next to Questions 16-20."
          ],
          optionsTitle: "Methods of collection",
          options: [
            { letter: "A", text: "collected every week in a separate container" },
            { letter: "B", text: "collected every two weeks for an annual charge" },
            { letter: "C", text: "taken to the household recycling centre" },
            { letter: "D", text: "collected from the doorstep after booking online" },
            { letter: "E", text: "taken to collection points at supermarkets" },
            { letter: "F", text: "left in a bag on top of a recycling bin" },
            { letter: "G", text: "collected by a charity" }
          ],
          questions: [
            { n: 16, text: "glass", answer: "E" },
            { n: 17, text: "garden waste", answer: "B" },
            { n: 18, text: "batteries", answer: "F" },
            { n: 19, text: "textiles", answer: "D" },
            { n: 20, text: "food waste", answer: "A" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear two nutrition students, Priya and Ben, discussing their study of school lunches with their tutor.",
      speakers: { T: { name: "Tutor", gender: "male" }, P: { name: "Priya", gender: "female" }, B: { name: "Ben", gender: "male" } },
      script: [
        { cue: "look", range: [21, 25] },
        { s: "T", t: "Come in, both of you. So, the school lunches project. Before we look at the data, remind me how you chose this topic. Was it the new government standards that came out in the spring?" },
        { s: "B", t: "That's what everyone assumes, and I did think about using it in the introduction. But that's not actually how it started." },
        { s: "P", t: "No, it was my sister. She teaches at a primary school, and she kept telling me that half her class never touched the vegetables on their plates. They went straight in the bin. I mentioned it to Ben and we both thought, there's a real study in that." },
        { s: "T", t: "I'd put that in the introduction. A real observation is a better starting point than a policy document. Now, you looked at three schools. How did the data collection go?" },
        { s: "B", t: "Hillcrest Primary was the difficult one." },
        { s: "T", t: "Why was that? Did the head teacher object?" },
        { s: "P", t: "No, she was really supportive from the start. The problem was that because the pupils are under eleven, we needed written consent from every parent. We sent out 120 forms, and they came back so slowly that we had to go in three separate times to collect them. In the end we couldn't wait any longer and worked with the ones we had." },
        { s: "T", t: "Fair enough. Now, I've read your draft, and there's something missing. At the moment you only have the pupils' side of the story." },
        { s: "P", t: "We were thinking of comparing our figures with the national statistics on school meals." },
        { s: "T", t: "You can do that, but national figures won't tell you anything about these particular schools. What I'd really like you to do is go back and talk to the kitchen staff. They see what comes back on the plates every single day, and they'll know things the questionnaires can't tell you." },
        { s: "B", t: "That makes sense. We hadn't thought of them as a source." },
        { s: "T", t: "Now, your discussion section. You seem to disagree with each other about something, and the draft rather hides that." },
        { s: "P", t: "We do, a bit. I think pupils choose whatever gets them through the queue fastest. If the pizza is ready and the pasta isn't, they take the pizza." },
        { s: "B", t: "And I think that's only part of it. In my observation, they take what their friends take. A whole table would have the same dish. The queue has less to do with it than Priya thinks." },
        { s: "T", t: "Then say that openly. Two interpretations of the same data is a strength. Finally, what happens after you hand the report in?" },
        { s: "B", t: "All three schools have asked us to come and present our findings to them. We're doing that in March." },
        { s: "T", t: "Excellent. If it goes well, we could think about a short article for the department journal later in the year, but let's get the report right first." },
        { cue: "continue", range: [26, 30] },
        { s: "T", t: "Right, let's go through the figures school by school so I can check them against your tables. Hillcrest first." },
        { s: "P", t: "Hillcrest Primary. Of the 120 forms we sent out, 84 came back, so 84 pupils filled in the questionnaire. The average time in the queue was 10 minutes, which is the shortest of the three. The most popular main dish was pizza, by a long way. 40 per cent of pupils took a piece of fruit, which is actually quite high for that age group. And the main complaint was that the portions were too small." },
        { s: "T", t: "Good. Riverside Academy?" },
        { s: "B", t: "Riverside had a sample of 150 pupils. The queue was the real story there. We expected it to be around 15 minutes, but it averaged 25, so some pupils had only ten minutes left to eat. The most popular dish surprised us. We assumed it would be pizza again, but it was actually the curry. Only 15 per cent took fruit, and the main complaint, unsurprisingly, was the long queues." },
        { s: "T", t: "And Oakfield High?" },
        { s: "P", t: "200 pupils surveyed. The queue averaged 12 minutes. The most popular main dish was pasta. Fruit was taken by 22 per cent. I originally wrote 20 in the draft, but I went back to the raw figures and it's 22. And the main complaint at Oakfield wasn't about the food at all. It was the price. Older pupils felt a full meal cost too much, so a lot of them bought a snack instead." },
        { s: "T", t: "That's an interesting point to end on. Right, I think you're in good shape. Fix the figure for Oakfield, add the kitchen staff interviews, and send me the next draft in two weeks." },
        { s: "B", t: "Will do. Thanks very much." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [21, 25],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 21, text: "The students chose school lunches as their topic because of", options: ["a recent change in government rules.", "something a relative had noticed.", "a lecture they had attended."], answer: "B" },
            { n: 22, text: "What problem did the students have at Hillcrest Primary?", options: ["The head teacher was reluctant to take part.", "Parents were slow to return consent forms.", "The pupils were too young to complete the questionnaire."], answer: "B" },
            { n: 23, text: "The tutor advises the students to", options: ["compare their results with national statistics.", "interview the people who prepare the food.", "include a fourth school in the study."], answer: "B" },
            { n: 24, text: "Priya and Ben disagree about", options: ["why pupils choose particular dishes.", "how reliable the questionnaires were.", "whether the schools will accept their recommendations."], answer: "A" },
            { n: 25, text: "After submitting the report, the students will", options: ["present their findings to the schools.", "write an article for a journal.", "extend the study to more schools."], answer: "A" }
          ]
        },
        {
          type: "table",
          range: [26, 30],
          instructions: [
            "Complete the table below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          tableTitle: "School lunch survey – summary of findings",
          columns: ["School", "Pupils surveyed", "Average queue time", "Most popular main dish", "Pupils taking fruit", "Main complaint"],
          rows: [
            ["Hillcrest Primary", "[[26]]", "10 minutes", "pizza", "40%", "portions too small"],
            ["Riverside Academy", "150", "[[27]] minutes", "[[28]]", "15%", "long queues"],
            ["Oakfield High", "200", "12 minutes", "pasta", "[[29]]%", "the [[30]]"]
          ],
          questions: [
            { n: 26, answer: ["84"] },
            { n: 27, answer: ["25"] },
            { n: 28, answer: ["curry"] },
            { n: 29, answer: ["22"] },
            { n: 30, answer: ["price", "cost"] }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the history of map-making.",
      speakers: { L: { name: "Lecturer", gender: "female" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good morning. In this lecture I want to trace the history of map-making, from the first scratches on clay to the satellite images on your phone, and I want to finish with a question that matters more than any of the technology: what do maps leave out?" },
        { s: "L", t: "Let's start at the beginning. The oldest surviving map of the whole world is a Babylonian clay tablet from around the sixth century before the common era. It is tiny, smaller than your hand, and it shows the known world as a flat circle, with Babylon near the middle and the whole thing surrounded by a ring of ocean. What strikes me about this object is that it isn't really a tool for finding your way. It is a statement about where its makers believed they stood in the universe." },
        { s: "L", t: "The same is true of the great maps of medieval Europe. If you look at one of these, you'll notice that east is at the top, not north, and that Jerusalem sits at the exact centre. The coastlines are vague and the distances are wrong, but that didn't matter to the people who made them, because their purpose was religious. They were visual summaries of the Christian view of history, with biblical events painted onto the landscape." },
        { s: "L", t: "Accuracy became important when people started crossing oceans. The problem every map-maker faces is that the earth is a sphere and paper is flat, and you cannot flatten a sphere without stretching it somewhere. Every method of doing this is called a projection, and every projection distorts something. The most famous was published by Gerardus Mercator in 1569. Its great virtue was that a straight line drawn on it represents a constant compass bearing, which made it enormously useful for navigation. But the cost of that convenience is that areas far from the equator are stretched, so that regions near the poles look much too large. On a Mercator map, Greenland appears to be about the same size as Africa. In reality, Africa is roughly fourteen times bigger." },
        { s: "L", t: "The next revolution happened on land, and it was mathematical. From the seventeenth century onwards, surveyors began to measure countries using triangulation. You measure one baseline very precisely, then measure the angles to a distant point from each end of it, and trigonometry gives you the position of that point. Repeat this thousands of times and you have a network of triangles covering a whole country. France was the first nation to be mapped completely in this way. In India, a similar survey in the nineteenth century stretched from the south of the country to the Himalayas, and the same measurements were used to calculate the height of the mountains, including the peak later named Everest. In Britain, the Ordnance Survey, which still produces our national maps today, began in the seventeen nineties for military reasons. The government feared a French invasion and wanted accurate maps of the south coast." },
        { s: "L", t: "The twentieth century moved map-making into the air. During the First World War, both sides sent aircraft over the front line to photograph enemy trenches, and the photographs were used to update maps almost daily. After the war, the same technique was applied to peaceful purposes, and it had an unexpected advantage. If you take two photographs of the same area from slightly different positions and view them together, the landscape appears in three dimensions. This gives map-makers a real sense of depth, and it allowed hills and valleys to be drawn far more accurately than any ground survey could manage." },
        { s: "L", t: "Then came the satellites. From 1972, the Landsat programme began photographing the entire surface of the earth every few weeks, and it has continued ever since. For the first time, maps could show not just where things are but how they change. Scientists have used these images to track the spread of cities and, in particular, the shrinking of glaciers, which are now one of the clearest signs of a warming climate. And then there is the Global Positioning System. A receiver compares the timing of signals from several satellites and works out its own position to within a few metres." },
        { s: "L", t: "So let me end with the question I began with. We now have maps of extraordinary accuracy, but no map is complete, and no map can be. A map that showed everything would be as large as the territory itself and entirely useless. Every map is a selection. Someone decided what to include and what to leave out, and those decisions depend on the purpose of the person who made it. A road map ignores the height of the land. A hiking map ignores the shops. The medieval monk with Jerusalem at the centre and the satellite engineer are doing the same thing: showing you the world as it matters to them. The skill in reading a map is to ask what the maker wanted you to see, and what they did not." },
        { s: "L", t: "Next week we'll look at some examples of maps that were deliberately misleading, and why." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD ONLY for each answer."
          ],
          notesTitle: "The history of map-making",
          lines: [
            "Early maps",
            "• Babylonian clay tablet: the world shown as a flat circle surrounded by [[31]]",
            "• Medieval European maps: Jerusalem at the centre; purpose was [[32]]",
            "Projections",
            "• a sphere cannot be shown flat without distortion",
            "• Mercator (1569): straight lines show a constant compass bearing, so useful for [[33]]",
            "• weakness: regions near the poles appear too [[34]]",
            "Surveying",
            "• triangulation: network of triangles covering a country",
            "• France: first country mapped completely",
            "• India: survey measurements used to calculate the height of [[35]]",
            "• Britain: Ordnance Survey began for [[36]] reasons",
            "Aerial photography",
            "• First World War: aircraft photographed enemy [[37]]",
            "• two photographs of the same area viewed together give a sense of [[38]]",
            "Satellites and GPS",
            "• Landsat (from 1972): shows change over time, e.g. the shrinking of [[39]]",
            "• GPS receiver compares the timing of signals from several satellites",
            "What maps leave out",
            "• every map is a selection; what is included depends on the [[40]] of the map-maker"
          ],
          questions: [
            { n: 31, answer: ["ocean"] },
            { n: 32, answer: ["religious"] },
            { n: 33, answer: ["navigation"] },
            { n: 34, answer: ["large", "big"] },
            { n: 35, answer: ["mountains", "everest"] },
            { n: 36, answer: ["military"] },
            { n: 37, answer: ["trenches"] },
            { n: 38, answer: ["depth"] },
            { n: 39, answer: ["glaciers"] },
            { n: 40, answer: ["purpose"] }
          ]
        }
      ]
    }
  ]
});

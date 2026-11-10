// Listening Test 1 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L1", difficulty: "standard",
  title: "Listening Test 1",
  parts: [
    {
      number: 1,
      intro: "You will hear a man phoning a community sports centre to ask about joining a swimming course.",
      speakers: { W: { name: "Receptionist", gender: "female" }, M: { name: "Daniel", gender: "male" } },
      script: [
        { cue: "look", range: [1, 5] },
        { s: "W", t: "Good morning, Ashford Leisure Centre, Karen speaking. How can I help you?" },
        { s: "M", t: "Oh, hello. I'm ringing about the adult swimming courses. A friend told me you run lessons for people who can already swim a bit but want to improve." },
        { s: "W", t: "Yes, that's our Improvers course. It's very popular. Can I take a few details first and then I'll tell you about the options?" },
        { s: "M", t: "Of course." },
        { s: "W", t: "Could I have your full name, please?" },
        { s: "M", t: "It's Daniel Okonedo. That's O-K-O-N-E-D-O." },
        { s: "W", t: "O-K-O-N-E-D-O. Lovely. And a contact number?" },
        { s: "M", t: "My mobile is best. It's 0-7-7-2-4, 5-0-9, 3-1-8." },
        { s: "W", t: "0-7-7-2-4, 5-0-9, 3-1-8. Thank you. And your address?" },
        { s: "M", t: "It's 14 Beacon Road. Actually, sorry, we moved last month. It's 41 Beacon Road now, not 14." },
        { s: "W", t: "41 Beacon Road. Easy to mix those up. And the postcode?" },
        { s: "M", t: "A-S-7, 4-J-P." },
        { s: "W", t: "Great. Now, do you have any medical conditions we should know about? We ask everyone." },
        { s: "M", t: "Nothing serious. I do have asthma, but it's well controlled. I always carry my inhaler." },
        { s: "W", t: "That's fine, I'll just note it down so the instructor is aware. And how would you describe your current level? Can you swim a length of the pool?" },
        { s: "M", t: "I can, but only breaststroke really. I'd like to learn front crawl properly. I think my technique is the main problem, and I get tired quickly." },
        { s: "W", t: "That's exactly what the Improvers course is designed for. We work mostly on technique and breathing." },
        { cue: "continue", range: [6, 10] },
        { s: "M", t: "When do the courses run?" },
        { s: "W", t: "There are two groups at the moment. One is on Tuesday evenings from seven until eight, and the other is on Saturday mornings. The Saturday one used to start at nine, but we've moved it to eight thirty because the pool gets busy with families later on." },
        { s: "M", t: "Tuesday would suit me better, I think. I work on Saturdays sometimes." },
        { s: "W", t: "Tuesday it is. Each course lasts ten weeks, and the next one starts on the 3rd of March." },
        { s: "M", t: "And how much is it?" },
        { s: "W", t: "For non-members it's 95 pounds for the ten weeks. If you're a member of the centre, it's 72 pounds." },
        { s: "M", t: "I'm not a member. Is membership worth it just for this?" },
        { s: "W", t: "Probably not just for the course, but members also get free use of the gym and the pool outside lesson times. Anyway, you can decide later. For now I'll put you down at the non-member price of 95." },
        { s: "M", t: "Fine. Do I need to bring anything special?" },
        { s: "W", t: "Just your swimming things and a towel. A swimming cap is compulsory in our pool, though, so make sure you have one. We sell them at reception if you don't." },
        { s: "M", t: "Okay, a cap. Got it. How many people are in the group?" },
        { s: "W", t: "We keep it small. The maximum is eight, and there's one instructor in the water with you and one on the side." },
        { s: "M", t: "That sounds good. How do I pay?" },
        { s: "W", t: "You can pay online, or at reception, but we need the payment before the course starts to hold your place. There's also a form to fill in. I can email it to you if you give me your email address." },
        { s: "M", t: "It's d dot okonedo at mailbox dot com." },
        { s: "W", t: "Perfect. One last thing: the changing rooms are being refurbished until the end of February, so for the first week you'll need to use the temporary changing area next to the café. There'll be signs." },
        { s: "M", t: "Thanks for letting me know. I'll look out for the email." },
        { s: "W", t: "You're welcome, Daniel. Enjoy the course." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [1, 10],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Ashford Leisure Centre – Adult swimming course",
          lines: [
            "Example   Course name:   Improvers",
            "Customer details",
            "• Name: Daniel [[1]]",
            "• Mobile: 07724 [[2]]",
            "• Address: [[3]] Beacon Road, AS7 4JP",
            "• Medical condition: [[4]]",
            "• Wants to learn: front [[5]] properly",
            "Course details",
            "• Day: Tuesday, 7–8 p.m.",
            "• Starts: [[6]] March",
            "• Cost for non-members: £[[7]]",
            "• Must bring a swimming [[8]]",
            "• Maximum of [[9]] people in a group",
            "• First week: use the temporary changing area next to the [[10]]"
          ],
          questions: [
            { n: 1, answer: ["okonedo"] },
            { n: 2, answer: ["509318", "509 318"] },
            { n: 3, answer: ["41"] },
            { n: 4, answer: ["asthma"] },
            { n: 5, answer: ["crawl"] },
            { n: 6, answer: ["3", "3rd", "third"] },
            { n: 7, answer: ["95"] },
            { n: 8, answer: ["cap"] },
            { n: 9, answer: ["8", "eight"] },
            { n: 10, answer: ["cafe", "café"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a volunteer coordinator talking to a group of new volunteers at a city farm.",
      speakers: { W: { name: "Coordinator", gender: "female" } },
      script: [
        { cue: "look", range: [11, 15] },
        { s: "W", t: "Good morning everyone, and welcome to Hollowbrook City Farm. My name's Priya and I'm the volunteer coordinator, so I'm the person to come to if you have any questions over the next few weeks. I'll start by telling you a little about the farm, then explain how volunteering works here, and finally I'll show you where everything is." },
        { s: "W", t: "The farm opened in 1979 on what used to be a railway goods yard. Local residents had campaigned for a park, but the council had no money for one, so a group of them simply started clearing the land themselves and brought in a few goats. The council eventually agreed to lease them the site for a pound a year, and it has grown from there. Today we have about four hectares, around a hundred and twenty animals, and we get roughly sixty thousand visitors a year." },
        { s: "W", t: "Our main purpose is education. Many of the children who visit have never seen a cow or a pig in real life, and several of the local schools come every term. We also run a programme for adults with learning difficulties who work here two days a week, and a small training scheme for young people who've left school without qualifications and want to work in horticulture. The food we grow is sold in the farm shop, and the money from that covers about a third of our costs. The rest comes from grants and from donations." },
        { s: "W", t: "Now, how volunteering works. You've each been given a green folder. Inside you'll find your induction checklist, a map, and a timetable. Everyone starts with two weeks in the animal team, whatever you've asked to do eventually, because we need every volunteer to be able to help with feeding in an emergency. After that you'll move to the area you've chosen, which might be the gardens, the shop, or working with school groups." },
        { s: "W", t: "A few rules. Please always sign in at the office when you arrive and sign out when you leave. That's not us checking up on you, it's so that we know who is on site if there's a fire. Wear the boots we've given you whenever you're in the animal areas, and wash your hands at one of the sinks before you eat or drink anything. And please don't feed the animals anything that isn't in their feed bins, even if visitors offer you food for them. Last year a goat became very ill because a visitor gave it bread." },
        { cue: "continue", range: [16, 20] },
        { s: "W", t: "Right, let me show you around using the map in your folder. We're standing at the main entrance now, at the bottom of the map. Straight ahead of you, the large building in the centre is the barn, where the cows and sheep spend the night. If you go past the barn and turn left, the long low building in the far corner on the left is the volunteer room. There's a kettle, a fridge and lockers there, and that's where we meet each morning at nine." },
        { s: "W", t: "The farm shop is the building just to the right of the entrance as you come in, with the big windows facing the car park, so visitors see it first. Beyond the shop, following the path along the right-hand side, you come to the pig pens, and behind them, right at the top on the right, is the orchard. We planted it about ten years ago and this will be the first year we get a proper crop of apples." },
        { s: "W", t: "The vegetable gardens take up most of the area on the left-hand side of the map, between the entrance and the volunteer room. You can't miss them. And finally, the classroom, where the school groups start their visits, is the small square building directly behind the barn, in line with the barn and the entrance. It's the only building with a red roof." },
        { s: "W", t: "Toilets are at the back of the farm shop. If anyone needs a first-aid kit, there's one in the office and one in the volunteer room. Okay, that's enough from me. Let's go and meet the goats." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [11, 15],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 11, text: "Hollowbrook City Farm was started by", options: ["the city council.", "a group of local people.", "a railway company."], answer: "B" },
            { n: 12, text: "What does the speaker say about the farm's income?", options: ["Most of it comes from the shop.", "It depends mainly on visitor tickets.", "Grants and donations provide most of it."], answer: "C" },
            { n: 13, text: "All new volunteers must first spend two weeks", options: ["working in the gardens.", "helping in the shop.", "with the animals."], answer: "C" },
            { n: 14, text: "Volunteers must sign in and out so that staff", options: ["can record their working hours.", "know who is present in an emergency.", "can plan the daily tasks."], answer: "B" },
            { n: 15, text: "Last year an animal became ill because", options: ["a visitor fed it the wrong food.", "it escaped from its pen.", "its water was dirty."], answer: "A" }
          ]
        },
        {
          type: "diagram",
          range: [16, 20],
          instructions: [
            "Label the map below.",
            "Write the correct letter, A-H, next to Questions 16-20."
          ],
          caption: "Hollowbrook City Farm",
          letterOptions: ["A", "B", "C", "D", "E", "F", "G", "H"],
          svg: "<svg viewBox='0 0 620 420' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='14'>" +
            "<rect x='20' y='20' width='580' height='380' fill='#f6f3ea' stroke='#555'/>" +
            "<rect x='250' y='180' width='120' height='70' fill='#d9c7a6' stroke='#555'/><text x='282' y='220'>BARN</text>" +
            "<rect x='270' y='360' width='80' height='30' fill='#fff' stroke='#555'/><text x='275' y='380' font-size='12'>ENTRANCE</text>" +
            "<rect x='380' y='320' width='90' height='50' fill='#fff' stroke='#555'/><text x='418' y='350' font-weight='bold'>A</text>" +
            "<rect x='480' y='200' width='90' height='60' fill='#fff' stroke='#555'/><text x='518' y='235' font-weight='bold'>B</text>" +
            "<rect x='470' y='40' width='110' height='90' fill='#fff' stroke='#555'/><text x='518' y='90' font-weight='bold'>C</text>" +
            "<rect x='270' y='90' width='70' height='55' fill='#f3cfc7' stroke='#555'/><text x='298' y='122' font-weight='bold'>D</text>" +
            "<rect x='40' y='40' width='150' height='70' fill='#fff' stroke='#555'/><text x='108' y='80' font-weight='bold'>E</text>" +
            "<rect x='40' y='150' width='150' height='200' fill='#fff' stroke='#555'/><text x='108' y='255' font-weight='bold'>F</text>" +
            "<rect x='150' y='360' width='80' height='30' fill='#fff' stroke='#555'/><text x='184' y='380' font-weight='bold'>G</text>" +
            "<rect x='400' y='140' width='60' height='40' fill='#fff' stroke='#555'/><text x='424' y='165' font-weight='bold'>H</text>" +
            "<text x='450' y='395' font-size='11' fill='#555'>car park</text>" +
            "<path d='M310 360 L310 250' stroke='#999' stroke-dasharray='4 3' fill='none'/><path d='M370 215 L480 230' stroke='#999' stroke-dasharray='4 3' fill='none'/>" +
            "</svg>",
          questions: [
            { n: 16, text: "Volunteer room", answer: "E" },
            { n: 17, text: "Farm shop", answer: "A" },
            { n: 18, text: "Orchard", answer: "C" },
            { n: 19, text: "Vegetable gardens", answer: "F" },
            { n: 20, text: "Classroom", answer: "D" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear two students, Lena and Marcus, discussing a presentation on urban beekeeping with their tutor.",
      speakers: { T: { name: "Tutor", gender: "male" }, L: { name: "Lena", gender: "female" }, M: { name: "Marcus", gender: "male" } },
      script: [
        { cue: "look", range: [21, 26] },
        { s: "T", t: "So, Lena, Marcus, you've chosen urban beekeeping for your joint presentation. How's the research going?" },
        { s: "L", t: "Quite well, I think. We've read most of the key studies. The problem is deciding what to leave out." },
        { s: "M", t: "That's always my problem. I wanted to start with the history, how beekeeping on city rooftops began in Paris in the 1980s, but Lena thinks that's a distraction." },
        { s: "L", t: "It's interesting, but we only have fifteen minutes. I'd rather open with the question everyone asks, which is whether city bees are actually good for the environment." },
        { s: "T", t: "I'd agree with Lena there. A strong question at the start gives the audience a reason to listen. You can bring in the history later if there's time. What have you found on that question?" },
        { s: "M", t: "Well, it's more complicated than we expected. Honeybee numbers in cities like London have gone up a lot. There are now more hives in London than the available flowers can support, according to one study." },
        { s: "L", t: "And that's the key point. Honeybees are a managed species, almost like livestock. When there are too many hives, they compete with wild bees and other pollinators for food. So adding more hives can actually harm the insects that really need help." },
        { s: "T", t: "Good. That's a point most people find surprising, so make sure you give the evidence for it, not just the claim." },
        { s: "M", t: "We have the figures from the London study. The other thing we found is that a lot of companies put hives on their office roofs mainly for publicity. One researcher called it 'bee-washing'." },
        { s: "T", t: "Be careful with that. It's a nice phrase, but you need to show that you're reporting a view, not making an accusation. Attribute it clearly." },
        { s: "L", t: "We will. The second half of the talk is going to be about what people should do instead if they want to help pollinators. Planting the right flowers, leaving areas of long grass, that kind of thing." },
        { s: "T", t: "That gives the talk a positive ending, which is good. Who's doing which part?" },
        { s: "M", t: "I'm doing the first half, the problem, and Lena's doing the solutions. We thought we'd each take about six minutes and leave three for questions." },
        { s: "T", t: "Sensible. One more thing: what visual material are you using?" },
        { s: "L", t: "Slides, mainly. I'm going to include a map showing hive density across the city." },
        { s: "T", t: "A map is good. Just make sure the text on it is large enough to read from the back of the room. Last year several groups lost marks for that." },
        { cue: "continue", range: [27, 30] },
        { s: "T", t: "Now, let's talk about the reading you've done. You mentioned several sources in your plan. Which ones were actually useful?" },
        { s: "M", t: "The Stevenson report, the one about London hive numbers, was essential. All our key figures come from it." },
        { s: "L", t: "The Bauer article was less helpful. It's about rural beekeeping in Germany, so a lot of it doesn't apply. We're only using it for one point about disease spreading between hives." },
        { s: "T", t: "That's fine, as long as you say why it's relevant. What about the Okafor chapter?" },
        { s: "M", t: "Honestly, I found it hard to follow. It's very theoretical. But Lena got more out of it." },
        { s: "L", t: "It has a really good framework for thinking about who benefits from urban nature projects, so I'm using that to structure the solutions section." },
        { s: "T", t: "Good. And the Patel survey?" },
        { s: "L", t: "That was the one we were most excited about, but when we looked closely, the sample was tiny. Only forty beekeepers. We've decided not to use it at all." },
        { s: "T", t: "That's a mature decision. It's better to leave out weak evidence than to have someone in the audience point out the problem. Right, I think you're in good shape. Send me your slides by Friday and I'll have a look." },
        { s: "M", t: "Thanks, we will." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [21, 24],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 21, text: "Lena wants to begin the presentation with", options: ["the history of rooftop beekeeping.", "a question about environmental benefit.", "statistics on bee numbers in London."], answer: "B" },
            { n: 22, text: "According to the students, too many hives in a city", options: ["reduce the quality of honey.", "spread disease to farm animals.", "take food away from wild pollinators."], answer: "C" },
            { n: 23, text: "The tutor advises the students to", options: ["avoid using the term 'bee-washing'.", "make clear whose opinion they are reporting.", "criticise companies that keep hives for publicity."], answer: "B" },
            { n: 24, text: "What does the tutor warn about the map?", options: ["It may take too long to explain.", "It may be difficult to read.", "It may be out of date."], answer: "B" }
          ]
        },
        {
          type: "mcq-multi",
          range: [25, 26],
          select: 2,
          instructions: ["Choose TWO letters, A-E."],
          stem: "Which TWO things do the students say about the structure of their presentation?",
          options: [
            "Marcus will present the solutions.",
            "Each student will speak for about six minutes.",
            "They will include the history of beekeeping in the middle.",
            "Time will be left for questions.",
            "They will use a video of a city hive."
          ],
          questions: [{ n: 25 }, { n: 26 }],
          answer: ["B", "D"]
        },
        {
          type: "matchfeatures",
          range: [27, 30],
          instructions: [
            "What do the students decide about each of the following sources?",
            "Choose FOUR answers from the box and write the correct letter, A-F, next to Questions 27-30."
          ],
          optionsTitle: "Decisions",
          options: [
            { letter: "A", text: "It is the main source of their statistics." },
            { letter: "B", text: "It will not be used." },
            { letter: "C", text: "It provides the structure for one section." },
            { letter: "D", text: "It is used for a single point only." },
            { letter: "E", text: "It needs to be checked for accuracy." },
            { letter: "F", text: "It will be shown on a slide." }
          ],
          questions: [
            { n: 27, text: "Stevenson report", answer: "A" },
            { n: 28, text: "Bauer article", answer: "D" },
            { n: 29, text: "Okafor chapter", answer: "C" },
            { n: 30, text: "Patel survey", answer: "B" }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the history and uses of salt.",
      speakers: { L: { name: "Lecturer", gender: "female" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good afternoon. Today I want to talk about a substance so ordinary that most of us never think about it, and yet for most of human history it was one of the most valuable commodities in the world. I mean, of course, salt." },
        { s: "L", t: "Let's begin with why it mattered so much. Humans need salt to live. Our bodies cannot make it, and we lose it constantly in sweat. Hunters obtained enough from the meat they ate, but once people settled down and began to farm, their diet became dominated by grain, which contains very little salt. So from the beginning of agriculture, salt had to be found and traded. The second reason was preservation. Before refrigeration, salting was the main way of keeping meat and fish edible for months. A community with no salt could not store food for the winter, and could not provision an army or a ship." },
        { s: "L", t: "Where did it come from? There were essentially three sources. The first was the sea. In warm, dry climates, seawater was led into shallow ponds and allowed to evaporate in the sun, leaving a crust of crystals that could be raked up. The second source was rock salt, mined from underground deposits left by ancient seas. The mine at Wieliczka in Poland, for example, operated continuously from the thirteenth century until 2007, which makes it one of the longest-running industrial sites anywhere. The third source was brine, salty water from natural springs, which was boiled in large pans until the water had gone. This method used enormous quantities of fuel, and in parts of England whole forests disappeared to feed the salt pans." },
        { s: "L", t: "Because it was essential and because its sources were limited, salt was an obvious target for taxation. Governments throughout history have taxed it, and the results were often dramatic. In France, the salt tax, known as the gabelle, forced every person over the age of eight to buy a fixed quantity of salt each year at a price set by the state. It was deeply hated and was one of the grievances that fed the French Revolution. In India, the British monopoly on salt production led, in 1930, to the famous march by Gandhi to the coast, where he simply picked up a handful of natural salt from the shore. The gesture was symbolic, but it drew worldwide attention to the independence movement." },
        { s: "L", t: "Salt also shaped language and geography. The word 'salary' comes from the Latin for salt, probably because Roman soldiers were at one time paid partly in salt, or given an allowance to buy it. Many European towns have names that record their origins as salt-producing centres: any English place name ending in 'wich', such as Nantwich or Droitwich, usually marks an old brine spring. And some of the earliest roads in Europe were salt roads, built to carry the product from the coast or the mines to the cities inland." },
        { s: "L", t: "So what changed? Two things, mainly. The first was geology. In the nineteenth century, geologists realised that rock salt deposits were far more widespread than anyone had thought, and new drilling techniques made it possible to reach them cheaply. The second was refrigeration, which from the 1880s onwards removed the need to preserve food with salt. Within a few decades, a substance that had started wars became almost worthless. Today it costs less than almost anything else sold in a supermarket." },
        { s: "L", t: "That does not mean it is unimportant. Only a small fraction of the salt produced today, around six per cent, is actually eaten. The largest single use is the chemical industry, where salt is the starting point for making chlorine and sodium hydroxide, which in turn go into everything from plastics to paper. In cold countries, a great deal is spread on roads in winter to melt ice, which has created a new environmental problem, because the run-off ends up in rivers and damages freshwater life. And medicine still depends on it: the saline solution used in hospitals worldwide is simply salt dissolved in water at the same concentration as the human body." },
        { s: "L", t: "In the time remaining, I want to look at one case study in detail, the salt trade across the Sahara, which linked West Africa to the Mediterranean for nearly a thousand years." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Salt",
          lines: [
            "Why salt mattered",
            "• the body cannot produce it; lost through [[31]]",
            "• diets based on [[32]] contain very little salt",
            "• needed to preserve food before refrigeration",
            "Sources",
            "• seawater evaporated in shallow ponds",
            "• rock salt from mines, e.g. Wieliczka (operated until [[33]])",
            "• brine boiled in pans – used a lot of [[34]]",
            "Salt and governments",
            "• France: the gabelle – everyone over the age of [[35]] had to buy salt",
            "• India (1930): Gandhi's march to the [[36]]",
            "Language and places",
            "• 'salary' comes from the Latin for salt – Roman [[37]] were partly paid in salt",
            "• English place names ending in 'wich'",
            "Salt today",
            "• only about [[38]] per cent is eaten",
            "• biggest use: the [[39]] industry",
            "• road salt run-off harms life in [[40]]"
          ],
          questions: [
            { n: 31, answer: ["sweat"] },
            { n: 32, answer: ["grain"] },
            { n: 33, answer: ["2007"] },
            { n: 34, answer: ["fuel"] },
            { n: 35, answer: ["8", "eight"] },
            { n: 36, answer: ["coast"] },
            { n: 37, answer: ["soldiers"] },
            { n: 38, answer: ["6", "six"] },
            { n: 39, answer: ["chemical"] },
            { n: 40, answer: ["rivers"] }
          ]
        }
      ]
    }
  ]
});

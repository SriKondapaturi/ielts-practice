// Listening Test 5 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L5", difficulty: "harder",
  title: "Listening Test 5",
  parts: [
    {
      number: 1,
      intro: "You will hear a man phoning a music school to enrol his daughter in piano lessons.",
      speakers: { W: { name: "Receptionist", gender: "female" }, M: { name: "Father", gender: "male" } },
      script: [
        { cue: "look", range: [1, 5] },
        { s: "W", t: "Good afternoon, Ashcombe Music School, Helen speaking. How can I help?" },
        { s: "M", t: "Oh, hello. I'd like to enrol my daughter for lessons, please. She's been asking for ages. It's the piano she wants to learn, not the violin like her cousin." },
        { s: "W", t: "Piano, lovely. We've got a few spaces left for the new term, which starts in three weeks, so you've called at a good time. Can I take some details first and then I'll run through the lessons? What's your daughter's name?" },
        { s: "M", t: "It's Keira Whitlock. Keira is spelt K-E-I-R-A." },
        { s: "W", t: "K-E-I-R-A. Thank you, people do spell that in all sorts of ways. And Whitlock, is that W-H-I-T-L-O-C-K?" },
        { s: "M", t: "That's right." },
        { s: "W", t: "And how old is Keira?" },
        { s: "M", t: "She's 9. Well, she'll be 10 in April, but she's 9 at the moment." },
        { s: "W", t: "I'll put 9, then, because the groups are based on age at the start of term. Has she played any instrument before?" },
        { s: "M", t: "Not the piano. She did learn the recorder at school for a couple of years, so she can read a little bit of music, and she's picked out a few tunes on her grandmother's keyboard. But she's never had a proper lesson." },
        { s: "W", t: "That's fine, most of our beginners are the same. So I'll note that she plays the recorder. Now, a contact number for you, please." },
        { s: "M", t: "My mobile's best. It's 0-7-9-1-1, 4-4-2, 6-7-5." },
        { s: "W", t: "0-7-9-1-1, 4-4-2, 6-7-5. Lovely. And which day would suit you for the lesson? Beginners' lessons are after school, from four o'clock onwards." },
        { s: "M", t: "Wednesday would be ideal. Actually, no, hang on, Wednesday is her swimming club. Could we do Thursday instead?" },
        { s: "W", t: "Thursday's fine. There's a slot at half past four on Thursdays." },
        { s: "M", t: "Half past four on Thursday. Perfect." },
        { cue: "continue", range: [6, 10] },
        { s: "M", t: "Who would her teacher be?" },
        { s: "W", t: "On Thursdays the beginners are taught by Simon Dalby. That's D-A-L-B-Y. He's been with us for twelve years and he's very good with younger children. Our other piano teacher, Anna Marsh, only teaches the advanced students." },
        { s: "M", t: "Dalby, D-A-L-B-Y. Good. And how long is each lesson?" },
        { s: "W", t: "For beginners we offer either 30 minutes or 45. Most parents of nine-year-olds choose the shorter one to begin with, because concentration tends to fade, and you can move up later." },
        { s: "M", t: "Let's start with 30 minutes, then. And what does the term cost?" },
        { s: "W", t: "The term is eleven weeks. For a 30 minute lesson that comes to 240 pounds. Oh, but hold on, you're enrolling before the end of this month, so you qualify for the early enrolment discount. That brings it down to 210 pounds." },
        { s: "M", t: "210. That's better than I expected. Do we have to pay all at once?" },
        { s: "W", t: "You can pay in two halves if you prefer. The first half is due before the first lesson." },
        { s: "M", t: "Fine. Does Keira need to bring anything? We don't have a piano at home yet." },
        { s: "W", t: "She doesn't need an instrument for the lesson, there's one in every room. We provide the music books for the first term too. The only thing she should bring is a notebook, because Simon writes down what to practise each week, and the parents find it useful." },
        { s: "M", t: "A notebook. Easy. And where exactly are you? I know you're on Station Road, but I've never noticed the building." },
        { s: "W", t: "That's because the entrance isn't on Station Road at all. It's round the side, on Chapel Lane, next to the dentist. And please don't try to park on Station Road, there are cameras. Use the car park behind the library. It's free after four, and it's a two minute walk." },
        { s: "M", t: "Behind the library. Right, I've got all that. Thank you very much." },
        { s: "W", t: "You're welcome. I'll send you a confirmation by text, and we'll see Keira on the first Thursday of term." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [1, 10],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Ashcombe Music School – New pupil enrolment",
          lines: [
            "Example   Instrument:   piano",
            "Pupil",
            "• Name: [[1]] Whitlock",
            "• Age: [[2]]",
            "• Experience: plays the [[3]] at school",
            "• Parent's mobile: 07911 [[4]]",
            "Lesson",
            "• Day: [[5]], 4.30 p.m.",
            "• Teacher: Simon [[6]]",
            "• Length of lesson: [[7]] minutes",
            "• Cost for the term (with discount): £[[8]]",
            "• Pupil should bring a [[9]]",
            "Getting there",
            "• Entrance is on Chapel Lane",
            "• Park behind the [[10]]"
          ],
          questions: [
            { n: 1, answer: ["keira"] },
            { n: 2, answer: ["9", "nine"] },
            { n: 3, answer: ["recorder"] },
            { n: 4, answer: ["442675", "442 675"] },
            { n: 5, answer: ["thursday"] },
            { n: 6, answer: ["dalby"] },
            { n: 7, answer: ["30", "thirty"] },
            { n: 8, answer: ["210"] },
            { n: 9, answer: ["notebook"] },
            { n: 10, answer: ["library"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a ranger welcoming a group of volunteers to a work day at a nature reserve.",
      speakers: { R: { name: "Ranger", gender: "male" } },
      script: [
        { cue: "look", range: [11, 14] },
        { s: "R", t: "Morning, everyone, and thanks for coming out on such a grey day. My name's Owen, I'm the ranger here at Fennimore Marsh, and I'll be looking after you today. We've got about twenty of you, which is a great turnout, and I know a few faces from the autumn work days. For those who are new, I'll start by explaining what we're doing, then a few practical things, and then I'll show you round the site using the map on the back of your sheet." },
        { s: "R", t: "So, the job. When we sent out the email we said we'd be repairing the boardwalk through the reedbed, and I know some of you came specially for that. Unfortunately the timber was supposed to arrive on Tuesday and it still hasn't turned up, so the boardwalk will have to wait until next month. Instead, today we're going to be cutting back the willow scrub around the pond. It sounds less exciting, but it's actually more urgent. If we leave it another year, the willow will shade out the open water and we'll lose the dragonflies and the plants that depend on light. We'll be using loppers and bow saws, and I'll show you how to use them safely before we start." },
        { s: "R", t: "A few practical things. Gloves and tools are provided, so please don't use your own tools, even if you've brought them, because ours are checked and insured. Wear your waterproofs, because the forecast says rain by lunchtime. Normally on a work day we ask you to bring your own food, but today the Friends of Fennimore Marsh have very kindly offered to make lunch for everyone, so there'll be hot soup and bread in the visitor centre at one o'clock. Tea and coffee are available all day, as usual." },
        { s: "R", t: "While we work, keep an eye out for wildlife. Most visitors come here hoping to see the kingfishers, and you may well spot one along the river. But the species we're really proud of is the water vole. They've disappeared from most of the country, and we've got one of the few healthy populations in the region. If you see one, or more likely if you hear a plop as it dives into the water, let me know and I'll record it." },
        { s: "R", t: "We'll finish the cutting at about three. Then, for anyone who wants to stay, we end the day with a short bird count from the hide. It's part of a national survey and we do it every month. There's no guided walk today, I'm afraid, and the talk about the reserve's history that some of you asked about will be at the next work day instead." },
        { cue: "continue", range: [15, 20] },
        { s: "R", t: "Right, the map. We're standing at the entrance, which is at the bottom of the map, and the main path runs straight up from here towards the river at the top. The car park where you left your cars is along the bottom edge to the left of the entrance." },
        { s: "R", t: "As you come in through the entrance, the visitor centre is the building immediately on your right. That's where lunch will be, and where the toilets are. Please leave your bags there rather than carrying them around." },
        { s: "R", t: "Now, the car park has a separate exit for vehicles, and it's important you use it when you leave, because the entrance gate is too narrow for two cars to pass. The exit is at the far end of the car park, to the left of the entrance, right in the bottom left corner of the map." },
        { s: "R", t: "Walk up the main path and you'll pass the meadow, the large open area in the middle of the map. Just beyond the meadow, on the right hand side of the path, there's a small green hut. That's the tool shed. We'll collect the loppers and saws from there in a few minutes." },
        { s: "R", t: "Carry on straight up the main path, past the tool shed, and you reach the pond. It sits right at the top of the path, just before the river. That's where we'll be working today, so you'll get to know it well." },
        { s: "R", t: "From the pond, if you turn right and follow the river bank, you come to the bird hide. It's in the top right corner of the reserve, overlooking the river, and that's where we'll do the count at the end of the day." },
        { s: "R", t: "And finally, the picnic area. That's on the right hand side of the reserve, about halfway between the visitor centre and the hide. There are a few benches and a shelter, so if the rain holds off we might take our tea break there. Okay, let's go and get the tools." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [11, 14],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 11, text: "What will the volunteers be doing today?", options: ["repairing a boardwalk", "cutting back bushes", "planting trees"], answer: "B" },
            { n: 12, text: "What is being provided for the volunteers today that is not usually provided?", options: ["lunch", "tools", "hot drinks"], answer: "A" },
            { n: 13, text: "Which species is the reserve most proud of?", options: ["the kingfisher", "the dragonfly", "the water vole"], answer: "C" },
            { n: 14, text: "At the end of the day, volunteers can", options: ["go on a guided walk.", "help to count birds.", "attend a talk about the reserve."], answer: "B" }
          ]
        },
        {
          type: "diagram",
          range: [15, 20],
          instructions: [
            "Label the map below.",
            "Write the correct letter, A-H, next to Questions 15-20."
          ],
          caption: "Fennimore Marsh Nature Reserve",
          letterOptions: ["A", "B", "C", "D", "E", "F", "G", "H"],
          svg: "<svg viewBox='0 0 620 420' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='14'>" +
            "<rect x='20' y='20' width='580' height='380' fill='#f6f3ea' stroke='#555'/>" +
            "<path d='M20 30 Q90 18 160 30 T300 30 T440 30 T600 30' stroke='#7fa7c9' stroke-width='6' fill='none'/><text x='290' y='52' font-size='12' fill='#3b6a8f'>RIVER</text>" +
            "<rect x='250' y='180' width='120' height='70' fill='#dfe8c8' stroke='#555'/><text x='280' y='220'>MEADOW</text>" +
            "<rect x='270' y='360' width='80' height='30' fill='#fff' stroke='#555'/><text x='275' y='380' font-size='12'>ENTRANCE</text>" +
            "<path d='M310 360 L310 145' stroke='#999' stroke-dasharray='4 3' fill='none'/>" +
            "<text x='40' y='350' font-size='11' fill='#555'>car park</text>" +
            "<rect x='380' y='320' width='90' height='50' fill='#fff' stroke='#555'/><text x='418' y='350' font-weight='bold'>A</text>" +
            "<rect x='480' y='200' width='90' height='60' fill='#fff' stroke='#555'/><text x='518' y='235' font-weight='bold'>B</text>" +
            "<rect x='470' y='60' width='110' height='70' fill='#fff' stroke='#555'/><text x='518' y='100' font-weight='bold'>C</text>" +
            "<rect x='270' y='75' width='80' height='60' fill='#cfe3ee' stroke='#555'/><text x='303' y='110' font-weight='bold'>D</text>" +
            "<rect x='40' y='60' width='150' height='70' fill='#fff' stroke='#555'/><text x='108' y='100' font-weight='bold'>E</text>" +
            "<rect x='60' y='190' width='110' height='70' fill='#fff' stroke='#555'/><text x='108' y='230' font-weight='bold'>F</text>" +
            "<rect x='40' y='360' width='80' height='30' fill='#fff' stroke='#555'/><text x='74' y='380' font-weight='bold'>G</text>" +
            "<rect x='400' y='135' width='60' height='40' fill='#fff' stroke='#555'/><text x='424' y='160' font-weight='bold'>H</text>" +
            "</svg>",
          questions: [
            { n: 15, text: "Visitor centre", answer: "A" },
            { n: 16, text: "Car park exit", answer: "G" },
            { n: 17, text: "Tool shed", answer: "H" },
            { n: 18, text: "Pond", answer: "D" },
            { n: 19, text: "Bird hide", answer: "C" },
            { n: 20, text: "Picnic area", answer: "B" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear two psychology students, Hannah and Tom, discussing an experiment on background music and memory with their tutor.",
      speakers: { T: { name: "Tutor", gender: "male" }, H: { name: "Hannah", gender: "female" }, M: { name: "Tom", gender: "male" } },
      script: [
        { cue: "look", range: [21, 24] },
        { s: "T", t: "Right, Hannah, Tom, let's go through your experiment on background music and memory. Remind me how you ended up with this topic. Was it the lecture on attention?" },
        { s: "M", t: "Not really. I'd read a newspaper article about it, but that wasn't the real reason." },
        { s: "H", t: "The real reason is that I always revise with music on, and Tom kept telling me it was ruining my memory. We argued about it for weeks, and in the end we thought, well, let's actually test it instead of arguing." },
        { s: "T", t: "A disagreement is a perfectly good starting point. So what was the hardest part of the design?" },
        { s: "M", t: "I expected it to be finding participants, but that was easy in the end, because first years get course credit for taking part. The hard part was deciding what music to use. Every piece of music is different, so how do you compare them?" },
        { s: "H", t: "We eventually settled on three conditions. Silence, instrumental music, and the same music but in a version with singing. That way the only difference between the two music conditions was the words." },
        { s: "T", t: "That's a sensible solution. Now, you asked participants to memorise a list of words and then write down as many as they could remember. I had a look at your list. My one concern was that several of the words were linked. You had cup, plate and spoon, for example. People remember related words as a group, which makes the task easier and may hide the effect you're looking for." },
        { s: "H", t: "We did wonder about that. The list wasn't too short, we had thirty words, and they were all common words, so nobody struggled with the meaning." },
        { s: "T", t: "Agreed, the length and familiarity were fine. It's just the connections between words that I'd change. So, what did you find?" },
        { s: "M", t: "The interesting thing is that the instrumental music made no real difference. Recall in that condition was almost identical to silence. But the version with singing reduced the number of words people remembered by about a fifth." },
        { s: "T", t: "Which fits the literature. It's the words in the music competing with the words you're trying to remember." },
        { cue: "continue", range: [25, 30] },
        { s: "T", t: "If you ran it again, what would you change?" },
        { s: "M", t: "I'd use longer word lists, to make the task harder." },
        { s: "H", t: "I don't think that would help. People would just give up. What I'd change is where we did it. We used a seminar room in the library, and twice there were people talking in the corridor. Next time it should be a proper lab, where we can control the noise." },
        { s: "T", t: "I'd agree with Hannah on both points." },
        { s: "M", t: "Fair enough. A lab would have been better, I accept that." },
        { s: "T", t: "What about the sample size? You had thirty-six people." },
        { s: "H", t: "I did wonder whether that was too few." },
        { s: "M", t: "I don't think it was a problem, actually. The effect was clear enough with thirty-six." },
        { s: "T", t: "For a student project it's perfectly adequate. Anything else?" },
        { s: "M", t: "One thing we both agree on. We only tested recall straight after the music. It would be much more interesting to bring people back a week later and see whether the music affected long-term memory too." },
        { s: "T", t: "Good, that's a real gap. Now, for the write-up, I want you to reflect on each stage of the process. Let's start with recruiting the participants." },
        { s: "M", t: "That went smoothly, as I said, but it took far longer than we'd planned. We'd allowed a week, and in the end it was nearly a month before we had enough people, because of the exam period." },
        { s: "T", t: "Make sure you say that. And choosing the music?" },
        { s: "H", t: "That was all me, really. Tom was away for two weeks, so I listened to about fifty tracks and picked the one that existed in both an instrumental and a sung version." },
        { s: "M", t: "She did a good job. I just approved it when I got back." },
        { s: "T", t: "Running the sessions?" },
        { s: "H", t: "Mostly fine, but in the third session the laptop speakers stopped working halfway through, so we had to abandon it and bring those participants back another day." },
        { s: "T", t: "Worth noting as a limitation. And the data analysis?" },
        { s: "M", t: "Honestly, we couldn't have done that without you. We had no idea which statistical test to use until you went through it with us." },
        { s: "T", t: "Well, that's what I'm here for. All right, get the first draft to me by the end of next week." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [21, 24],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 21, text: "The students chose their topic because of", options: ["a lecture they attended.", "an article Tom had read.", "a disagreement between them."], answer: "C" },
            { n: 22, text: "What did the students find most difficult when designing the experiment?", options: ["choosing the music", "finding enough participants", "deciding how to score the results"], answer: "A" },
            { n: 23, text: "What was the tutor's concern about the word list?", options: ["It was too short.", "Some words were related in meaning.", "Some words were unfamiliar."], answer: "B" },
            { n: 24, text: "What did the experiment show?", options: ["All music reduced recall.", "Only music with singing reduced recall.", "Instrumental music improved recall."], answer: "B" }
          ]
        },
        {
          type: "mcq-multi",
          range: [25, 26],
          select: 2,
          instructions: ["Choose TWO letters, A-E."],
          stem: "Which TWO changes do the students agree they would make if they repeated the experiment?",
          options: [
            "use longer lists of words",
            "test participants in a laboratory",
            "recruit more participants",
            "test memory again after a week",
            "pay the participants"
          ],
          questions: [{ n: 25 }, { n: 26 }],
          answer: ["B", "D"]
        },
        {
          type: "matchfeatures",
          range: [27, 30],
          instructions: [
            "What do the students say about each stage of their experiment?",
            "Choose FOUR answers from the box and write the correct letter, A-F, next to Questions 27-30."
          ],
          optionsTitle: "Comments",
          options: [
            { letter: "A", text: "It took much longer than expected." },
            { letter: "B", text: "It needed the tutor's help." },
            { letter: "C", text: "It required extra permission." },
            { letter: "D", text: "It was affected by an equipment failure." },
            { letter: "E", text: "It was done by one student alone." },
            { letter: "F", text: "It produced a surprising result." }
          ],
          questions: [
            { n: 27, text: "Recruiting participants", answer: "A" },
            { n: 28, text: "Choosing the music", answer: "E" },
            { n: 29, text: "Running the sessions", answer: "D" },
            { n: 30, text: "Analysing the data", answer: "B" }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the methods scientists use to track bird migration.",
      speakers: { L: { name: "Lecturer", gender: "female" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good morning. For thousands of years people noticed that certain birds vanished in autumn and reappeared in spring, and they had some remarkable explanations. Aristotle believed that swallows spent the winter asleep in the mud at the bottom of ponds, and as late as the eighteenth century serious writers suggested that some birds flew to the moon. Today we know a great deal about where birds go, and in this lecture I want to look at how we found out, method by method, and at what each method can and cannot tell us." },
        { s: "L", t: "The first systematic method was ringing, or banding as it is called in North America. It began in 1899, when a Danish teacher called Hans Mortensen put small metal rings on the legs of starlings, each stamped with a number and his address. The idea was simple. If the bird was found somewhere else, whoever found it could write to him and he would know where it had been. The method is still used today, and millions of birds are ringed every year by trained volunteers. Its great strength is that it is cheap, and the ring weighs almost nothing. Its great weakness is that a ring only produces information if the bird is found again and the find is reported. For most small birds, fewer than one ring in a hundred is ever reported, and most of those come from birds that have been found dead. So ringing tells us about the start and the end of a journey, but almost nothing about the route in between." },
        { s: "L", t: "The second method arrived by accident. During the Second World War, radar operators watching for enemy aircraft kept seeing faint echoes that moved slowly across their screens and could not be explained. They called them angels. It was only after the war that scientists realised the angels were flocks of migrating birds. Radar turned out to be extremely useful. It can measure the number of birds passing overhead, their height, their speed and their direction, by day or night and in any weather. What it cannot do is identify the species. A radar echo from a thrush looks much the same as one from a warbler, so radar tells us about migration as a mass movement, not about individual birds." },
        { s: "L", t: "To follow individuals, we needed to attach a transmitter to the bird itself, and that became possible with satellite tags in the nineteen eighties. The early tags were heavy, so they could only be fitted to large birds, and some of the first studies followed storks on their journey from Europe to Africa. The rule that researchers follow is that a tag must not exceed a small proportion of the bird's weight, usually three per cent, because anything heavier changes the way the bird flies. As the electronics shrank, smaller birds could be tagged, and the results were astonishing. In 2007 a bar-tailed godwit fitted with a satellite tag flew from Alaska to New Zealand, across the whole Pacific Ocean, without stopping once. The journey took nine days and covered more than eleven thousand kilometres. Nobody had believed a bird could do that." },
        { s: "L", t: "Even so, satellite tags remain too heavy for the smallest birds, and they are expensive. For songbirds, the breakthrough was the geolocator. This is a tiny device, lighter than a paperclip, which does not transmit anything at all. It simply records the level of light every few minutes. From the time of sunrise and sunset, researchers can later work out roughly where on the planet the bird was each day. The disadvantage is obvious. Because the device does not transmit, the bird has to be recaptured the following year to get the data back, and many birds never return to the same place. But where it works, it has revealed the complete annual journeys of species that weigh less than a coin." },
        { s: "L", t: "The most recent development does not involve the birds carrying anything. It relies on people. Citizen science projects invite ordinary birdwatchers to record what they see, when and where, using an app on their phones. Together, these volunteers produce hundreds of millions of records a year, far more than any team of scientists could gather. The data has already shown that many species are arriving at their breeding grounds earlier than they did thirty years ago, a change that is linked to climate. But this method has its own problem. Volunteers record birds where the volunteers are, and most of them live in cities, so we know far more about migration over towns and suburbs than over forests, mountains or the sea." },
        { s: "L", t: "So each method fills a gap left by the others. In the second half of the lecture I want to look at how researchers are now combining all of them to answer a question that none of them can answer alone, which is why some migratory species are declining so fast." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD ONLY for each answer."
          ],
          notesTitle: "Tracking bird migration",
          lines: [
            "Ringing",
            "• began in 1899 with a Danish [[31]]",
            "• cheap and very light",
            "• only useful if the bird is found and the ring is [[32]]",
            "Radar",
            "• wartime operators called the unexplained echoes '[[33]]'",
            "• gives numbers, height, speed and direction",
            "• cannot identify the [[34]]",
            "Satellite tags",
            "• first used on large birds, e.g. [[35]]",
            "• tag must not exceed a small proportion of the bird's [[36]]",
            "• 2007: a godwit flew from Alaska to New Zealand without [[37]]",
            "Geolocators",
            "• record light levels to estimate position",
            "• bird must be [[38]] to recover the data",
            "Citizen science",
            "• birdwatchers record sightings on phone apps",
            "• shows birds arriving earlier – linked to [[39]]",
            "• problem: most records come from [[40]]"
          ],
          questions: [
            { n: 31, answer: ["teacher"] },
            { n: 32, answer: ["reported"] },
            { n: 33, answer: ["angels"] },
            { n: 34, answer: ["species"] },
            { n: 35, answer: ["storks"] },
            { n: 36, answer: ["weight"] },
            { n: 37, answer: ["stopping"] },
            { n: 38, answer: ["recaptured", "recaught"] },
            { n: 39, answer: ["climate"] },
            { n: 40, answer: ["cities", "towns"] }
          ]
        }
      ]
    }
  ]
});

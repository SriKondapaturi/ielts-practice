// Listening Test 6 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L6", difficulty: "standard",
  title: "Listening Test 6",
  parts: [
    {
      number: 1,
      intro: "You will hear a woman phoning a railway lost-property office about a bag she left on a train.",
      speakers: { M: { name: "Clerk", gender: "male" }, W: { name: "Fiona", gender: "female" } },
      script: [
        { cue: "look", range: [1, 6] },
        { s: "M", t: "Good morning, Western Rail lost property, Gareth speaking. How can I help?" },
        { s: "W", t: "Oh, hello. I left a bag on a train yesterday morning and I'm hoping somebody has handed it in." },
        { s: "M", t: "Let's have a look. I'll need to take some details first, then I'll check the system. Can I start with your name?" },
        { s: "W", t: "Yes, it's Fiona Lindgren." },
        { s: "M", t: "Could you spell the surname for me?" },
        { s: "W", t: "Of course. It's L-I-N-D-G-R-E-N." },
        { s: "M", t: "L-I-N-D-G-R-E-N. Thank you. And which train were you on? I need the time it left." },
        { s: "W", t: "It was the early one from Bristol. I think it was the seven fifteen. Actually no, hold on, I missed that one and caught the next, so it was the seven forty-five." },
        { s: "M", t: "So the seven forty-five from Bristol. And where was it going? The lost property goes to the office at the end of the line, so I need the final destination, not where you got off." },
        { s: "W", t: "Ah, I see. I got off at Exeter, but the train itself was going on to Plymouth." },
        { s: "M", t: "Bristol to Plymouth. Fine. Now, can you describe the bag?" },
        { s: "W", t: "It's a canvas shoulder bag, quite big. People sometimes think it's black, but it's actually a very dark green. It has a brown leather strap." },
        { s: "M", t: "A dark green canvas bag with a leather strap. And what was inside it? Anything that would help us identify it?" },
        { s: "W", t: "The main thing is my laptop, which is why I'm so worried. There's also a grey woollen scarf. And I thought my purse was in there too, but luckily I found that in my coat pocket last night." },
        { s: "M", t: "Right, so a laptop and a scarf, not the purse. Anything else?" },
        { s: "W", t: "Yes, there's a diary. A small blue one. It's got my name written inside the front cover, so that should help." },
        { s: "M", t: "That's very useful, actually. Items with a name in them are the easiest to match. Give me a moment while I search." },
        { pause: 1500 },
        { s: "M", t: "Good news. There's a dark green canvas bag logged yesterday at Plymouth. It was handed in by the cleaning staff at about eleven in the morning, and the notes say it contains a laptop. That sounds like yours." },
        { s: "W", t: "Oh, what a relief. Thank you so much." },
        { cue: "continue", range: [7, 10] },
        { s: "M", t: "Now, let me give you the reference number, because you'll need it when you collect the bag. It's R-T-4-8-2." },
        { s: "W", t: "R-T-4-8-2. Let me write that down. Is that the same as the number on the receipt I'll get?" },
        { s: "M", t: "Yes, it stays with the item until it's collected. Now, where would you like to pick it up? The bag's in Plymouth at the moment, but we can move items between the main stations at no extra cost. It usually takes two working days." },
        { s: "W", t: "Could it come back to Bristol? That's much easier for me." },
        { s: "M", t: "Certainly. The Bristol office is actually inside the station. People often go to the ticket office by mistake, but you need the lost property office, which is on platform two. It's next to the waiting room." },
        { s: "W", t: "Platform two, next to the waiting room. And when is it open?" },
        { s: "M", t: "On weekdays it's open from eight in the morning until six in the evening. It's open on Saturdays as well, but only in the morning. It closes at one o'clock. It's shut all day on Sundays." },
        { s: "W", t: "Saturday morning would suit me. Is there a charge?" },
        { s: "M", t: "There is, I'm afraid. For most items it's three pounds, but for anything containing electronics, like a laptop, the fee is eight pounds. That covers the extra security storage." },
        { s: "W", t: "Eight pounds. That's fine, I'd happily pay more than that to get the laptop back." },
        { s: "M", t: "One more thing. Please bring some photo identification with you, a passport or a driving licence, because we can only release items to the person named on the record." },
        { s: "W", t: "I'll bring my driving licence. Thank you, Gareth, you've been really helpful." },
        { s: "M", t: "You're welcome. Goodbye." }
      ],
      questionGroups: [
        {
          type: "table",
          range: [1, 6],
          instructions: [
            "Complete the table below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          tableTitle: "Western Rail – Lost property enquiry",
          columns: ["Item", "Details"],
          rows: [
            ["Example: Type of item", "bag"],
            ["Caller's name", "Fiona [[1]]"],
            ["Train time", "the [[2]] from Bristol"],
            ["Final destination of train", "[[3]]"],
            ["Description of bag", "dark [[4]] canvas, with a leather strap"],
            ["Contents", "a [[5]], a grey scarf and a small blue [[6]]"]
          ],
          questions: [
            { n: 1, answer: ["lindgren"] },
            { n: 2, answer: ["7.45", "7:45", "745", "0745", "7.45 am", "7:45 am", "7.45am", "7:45am", "07.45", "07:45"] },
            { n: 3, answer: ["plymouth"] },
            { n: 4, answer: ["green"] },
            { n: 5, answer: ["laptop"] },
            { n: 6, answer: ["diary"] }
          ]
        },
        {
          type: "sentence",
          range: [7, 10],
          instructions: [
            "Complete the sentences below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          questions: [
            { n: 7, text: "The reference number for the bag is ______.", answer: ["rt482", "rt 482"] },
            { n: 8, text: "In Bristol, the lost property office is on platform ______, next to the waiting room.", answer: ["2", "two"] },
            { n: 9, text: "On Saturdays the office closes at ______.", answer: ["1 pm", "1pm", "1 p.m.", "1", "one", "1 o'clock", "13.00", "13:00"] },
            { n: 10, text: "The fee for collecting a bag containing a laptop is £______.", answer: ["8", "eight"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a librarian talking on local radio about changes at a community library.",
      speakers: { W: { name: "Librarian", gender: "female" } },
      script: [
        { cue: "look", range: [11, 15] },
        { s: "W", t: "Thanks for having me on the programme. My name's Ruth Adeyemi and I'm the manager at Millbrook Community Library, and I'm here this morning because quite a lot is changing at the library from the start of next month, and I want to make sure everybody knows about it." },
        { s: "W", t: "Let me start with the opening hours, because that's what people ask about most. Two years ago the council reduced our hours to save money, and there was speculation last year that they would be cut again. In fact, the opposite has happened. Last autumn we asked everyone who came through the door to fill in a short questionnaire about when they'd most like the library to be open, and over nine hundred people replied. The new timetable is based directly on what you told us. So this isn't about the budget, and it isn't because we've taken on new staff, although we have one new colleague. It's your answers that have shaped it." },
        { s: "W", t: "So what are the new hours? From the first of the month, we'll be open six days a week, Monday to Saturday. We did consider Sunday afternoons, which quite a few people requested, but the building shares its heating system with the community hall next door, which is closed on Sundays, so that just wasn't practical. Mondays are back, though, which I'm delighted about. The biggest change is that on Thursdays we'll stay open late, until eight o'clock in the evening, instead of closing at five like the other days. That's for people who work during the day and told us they couldn't get to us. Saturdays stay as they are, nine until one." },
        { s: "W", t: "While the hours were being sorted out, we also had some building work done. The old staff room at the back has been turned into a quiet study room with twelve desks and power sockets, which students have been asking for for years. I know some people were hoping we'd put in a café, and the children's area has had a fresh coat of paint, but the study room is the real addition. It's bookable in two-hour slots at the front desk." },
        { s: "W", t: "And if you're not a member yet, it's very easy to join. You don't need to fill anything in online beforehand, and please don't ring us to do it, because we need to see you in person. Just come in with something that shows your current address, such as a recent bill or a bank letter, and we'll make your card on the spot. It takes about five minutes, and membership is free." },
        { cue: "continue", range: [16, 20] },
        { s: "W", t: "Now let me run through our regular events, because several of these are changing too, and I don't want anyone turning up at the wrong time." },
        { s: "W", t: "First, children's story time. This has always been on Wednesday mornings, but with the new timetable it's moving to Saturday mornings at ten thirty. We found that many parents who work during the week couldn't bring their children on a Wednesday, so we hope the weekend slot will suit more families. Everything else about it stays the same." },
        { s: "W", t: "Next, the coding club for ages eight to fourteen, which runs on Thursday evenings now that we're open late. This has become so popular that we've had to limit the numbers, because we only have eight laptops. So you do need to reserve a place in advance, either at the desk or by phone. If you just turn up on the night, I'm afraid you may be disappointed." },
        { s: "W", t: "The author talk this month is on the twenty-third, when the crime writer Helen Marsh will be speaking about her new novel. Most of our events cost nothing, but for the author talks we do ask for two pounds on the door, which goes towards the speaker's travel costs. There's no need to reserve, and it's open to everyone, including older children." },
        { s: "W", t: "Then there's the book swap, which is something we've only just introduced, and this is the first year we've run it. The idea is simple. Bring in a book you've finished, leave it on the swap shelf near the entrance, and take any other book home. You don't even need to be a member." },
        { s: "W", t: "And finally, film night. Unfortunately I have to tell you that there won't be a film night this month. The projector has broken and the replacement part hasn't arrived, so we've had to call it off. We fully expect it to be back next month, on the usual last Friday." },
        { s: "W", t: "That's everything from me. Do come and have a look at the new study room, and I hope to see many of you on a Thursday evening." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [11, 15],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 11, text: "The new opening hours were decided mainly on the basis of", options: ["the council's budget.", "a survey of library users.", "the arrival of new staff."], answer: "B" },
            { n: 12, text: "Why will the library not open on Sundays?", options: ["Few people asked for it.", "The heating cannot be run that day.", "There are not enough staff."], answer: "B" },
            { n: 13, text: "On Thursdays the library will close at", options: ["5 p.m.", "8 p.m.", "1 p.m."], answer: "B" },
            { n: 14, text: "The main change to the building is", options: ["a new café.", "a redecorated children's area.", "a room for quiet study."], answer: "C" },
            { n: 15, text: "To join the library, people must", options: ["complete a form online.", "telephone in advance.", "bring proof of their address."], answer: "C" }
          ]
        },
        {
          type: "matchfeatures",
          range: [16, 20],
          instructions: [
            "What does the speaker say about each of the following events?",
            "Choose FIVE answers from the box and write the correct letter, A-G, next to Questions 16-20."
          ],
          optionsTitle: "Information",
          options: [
            { letter: "A", text: "It takes place in the new study room." },
            { letter: "B", text: "Booking is required." },
            { letter: "C", text: "It has moved to a new day." },
            { letter: "D", text: "It is for adults only." },
            { letter: "E", text: "It is cancelled this month." },
            { letter: "F", text: "It is new this year." },
            { letter: "G", text: "It has a small charge." }
          ],
          questions: [
            { n: 16, text: "Children's story time", answer: "C" },
            { n: 17, text: "Coding club", answer: "B" },
            { n: 18, text: "Author talk", answer: "G" },
            { n: 19, text: "Book swap", answer: "F" },
            { n: 20, text: "Film night", answer: "E" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear a student called Amira and her tutor discussing her poster on coral reef restoration.",
      speakers: { T: { name: "Tutor", gender: "male" }, A: { name: "Amira", gender: "female" } },
      script: [
        { cue: "look", range: [21, 24] },
        { s: "T", t: "Come in, Amira. So, this is the draft of your poster on coral reef restoration. Before we look at it, remind me why you picked this topic." },
        { s: "A", t: "Of course. I'd seen a documentary about reefs years ago, which first got me interested, and I did go diving on holiday once, but what actually decided it was the guest lecture in week three. The speaker had worked on a restoration project in Indonesia and made it sound like something you could really do." },
        { s: "T", t: "Good, that's a sound reason. Now, the draft. I think the science is solid and the structure is logical. My concern is the amount of writing. A poster isn't an essay. At the moment there are long paragraphs in every panel, and nobody standing in a corridor is going to read all that." },
        { s: "A", t: "I was worried the photographs were too small, actually." },
        { s: "T", t: "The images are fine, and the title is clear. It's the text. Cut it by at least half, use bullet points, and let the diagram carry the explanation." },
        { s: "A", t: "Okay. That's easier than I feared." },
        { s: "T", t: "What did you find most unexpected when you were reading for this?" },
        { s: "A", t: "I expected the cost to be the big obstacle, and it is high, but what really surprised me was the role of local people. Almost every successful project I read about was run day to day by fishermen and villagers, not by scientists. The scientists set it up and then step back." },
        { s: "T", t: "That's an important point and it's barely visible on the poster at the moment. Give it its own panel." },
        { s: "A", t: "I will." },
        { s: "T", t: "One other thing is missing. You describe the process well, but you never say how well it works. You need some figures on how many of the transplanted corals are still alive after a year or two. There's no point in a reader seeing a method without knowing whether it succeeds." },
        { s: "A", t: "I have those numbers from two of the studies. I left them out because I thought a map of the project sites would be more interesting, but I can swap it." },
        { s: "T", t: "Keep the map if there's space, but those figures are essential. Your reference list is fine, by the way." },
        { cue: "continue", range: [25, 30] },
        { s: "T", t: "Let's go through the process diagram, since that's going to be the centre of the poster. Talk me through it." },
        { s: "A", t: "Right. The first stage is collecting the coral. Most projects don't break pieces off a healthy reef, because that damages it. Instead, divers go out after a storm and gather the fragments that have already been broken off naturally and are lying on the sea floor, where they'd die anyway." },
        { s: "T", t: "Good. And then?" },
        { s: "A", t: "Then the pieces are cut into much smaller fragments, about the size of a finger. That seems strange, because you'd think bigger pieces would do better, but small fragments actually grow much faster. It's a bit like pruning a plant. So cutting them speeds up growth." },
        { s: "T", t: "I'd put that explanation in a single line under the box. Then the nursery stage." },
        { s: "A", t: "Yes. The fragments are fixed onto ropes that are stretched between posts underwater, a few metres below the surface. Some projects use metal frames instead, but ropes are cheaper and easier to move, and most of the projects I read about use them. The nursery is in a sheltered spot away from the reef." },
        { s: "T", t: "And the nursery needs looking after, presumably." },
        { s: "A", t: "That's the part that takes the most time. Algae grow on the ropes and on the fragments themselves, and if it isn't cleaned off it smothers the coral. So divers go down roughly every two weeks and scrub the algae away by hand. That's usually the job the local community takes on." },
        { s: "T", t: "How long do the corals stay in the nursery?" },
        { s: "A", t: "About a year, until they're the size of a hand. Then they're moved to the damaged reef. Early projects tried gluing them down, but the glue didn't hold in strong currents. Now most teams attach them to the rock with a small amount of cement, which sets underwater." },
        { s: "T", t: "And the last box?" },
        { s: "A", t: "Monitoring. Divers go back at intervals and record how many corals are still alive. That's the survival figure you were talking about. Some projects also measure water temperature, but survival is the key number everyone reports." },
        { s: "T", t: "That's a clear sequence. Six boxes, one line under each, and the survival figures alongside. Do that and you'll have a strong poster." },
        { s: "A", t: "Thank you. I'll have a new draft by Monday." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [21, 24],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 21, text: "Amira finally chose coral reef restoration as her topic because of", options: ["a documentary she had watched.", "a diving holiday.", "a talk by a visiting speaker."], answer: "C" },
            { n: 22, text: "The tutor's main criticism of the draft poster is that", options: ["there is too much text.", "the photographs are too small.", "the title is unclear."], answer: "A" },
            { n: 23, text: "What surprised Amira most during her research?", options: ["how expensive restoration projects are", "how much local people are involved", "how quickly scientists leave a project"], answer: "B" },
            { n: 24, text: "The tutor says Amira must add", options: ["a list of references.", "a map of project sites.", "figures on coral survival."], answer: "C" }
          ]
        },
        {
          type: "flowchart",
          range: [25, 30],
          instructions: [
            "Complete the flow-chart below.",
            "Write ONE WORD ONLY for each answer."
          ],
          flowchartTitle: "Coral reef restoration process",
          lines: [
            "Divers collect broken pieces of coral from the sea floor after a [[25]]",
            "Pieces are cut into small fragments to speed up [[26]]",
            "Fragments are fixed onto [[27]] in an underwater nursery",
            "Every two weeks, divers remove [[28]] by hand",
            "After about a year, corals are attached to the reef using [[29]]",
            "Divers monitor the site and record the [[30]] of the corals"
          ],
          questions: [
            { n: 25, answer: ["storm"] },
            { n: 26, answer: ["growth"] },
            { n: 27, answer: ["ropes", "rope"] },
            { n: 28, answer: ["algae"] },
            { n: 29, answer: ["cement"] },
            { n: 30, answer: ["survival"] }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the history of the bicycle.",
      speakers: { L: { name: "Lecturer", gender: "male" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good morning. In this series we've been looking at everyday technologies that changed society, and today's subject is the bicycle. I want to trace its development, and then consider what it did to the societies that adopted it." },
        { s: "L", t: "The story usually starts in 1817 with a German inventor called Karl Drais. His machine had two wheels in line and a saddle, and the frame was made almost entirely of wood. It had no pedals. The rider sat astride it and pushed along the ground with his feet. It was briefly fashionable among wealthy young men, but it was heavy and useless on hills, and within a few years it had been largely forgotten." },
        { s: "L", t: "The next step came in France in the 1860s, when pedals were attached directly to the front wheel. This machine was called the velocipede, but riders gave it a less flattering name. It had a heavy frame and tyres made of iron, and on cobbled streets every bump went straight through the rider, so it was nicknamed the boneshaker. Even so, the first cycling clubs and races date from this time." },
        { s: "L", t: "Because the pedals were fixed to the front wheel, one turn of the pedals meant one turn of the wheel. The only way to go faster was to make the wheel bigger, and so through the 1870s the front wheel grew and grew, until we arrive at the high wheeler, or penny-farthing, with a front wheel as tall as a man and a tiny wheel behind. Its whole purpose was speed, since a larger wheel covered more ground with each turn of the pedals. But it was also dangerous. If the front wheel hit a stone, the rider was thrown forward over the handlebars, and serious injuries were common. As a result, it was really only ridden by young, athletic men." },
        { s: "L", t: "The breakthrough came in 1885, when an English manufacturer, John Kemp Starley, produced what he called the Rover. It had two wheels of roughly equal size, the rider sat low between them, and, crucially, the pedals were connected to the rear wheel by a chain. Because the chain ran over gears of different sizes, the rear wheel could turn faster than the pedals, so a huge front wheel was no longer needed. This design was known as the safety bicycle, and it is, essentially, the bicycle we still ride today." },
        { s: "L", t: "There was one more piece to add. The safety bicycle still ran on solid rubber tyres, which gave a hard ride. In 1888 a Scottish vet living in Belfast, John Boyd Dunlop, was watching his young son struggle to ride his tricycle over the cobbles, and he set about finding a way to make it more comfortable for the boy. His solution was a tube of rubber filled with air, which he fixed around the wheel. The pneumatic tyre, as it was called, was both more comfortable and faster, and within a few years every serious bicycle had them." },
        { s: "L", t: "So by the early 1890s the modern bicycle existed, and there followed what historians call the bicycle boom. Prices fell, and for the first time an ordinary working person could afford a machine that would carry them ten miles in an hour. Until then, most people had lived within walking distance of their work. Now a worker could live well outside the town and still get to the factory every day, and cities began to spread accordingly. Marriage records from the period show people marrying partners from villages much further away than before, because they could simply cycle to the next town on a Sunday." },
        { s: "L", t: "The effect on women was especially marked. In the 1890s a respectable woman was expected to wear long heavy skirts and a tight corset, and she did not go anywhere alone. Neither is compatible with cycling. Women who took up the bicycle adopted a new style of clothing, known at the time as rational dress, with shorter skirts or loose trousers gathered at the knee. There was fierce criticism, but the fashion stuck. More importantly, the bicycle gave women a degree of independence they had never had. One American campaigner for women's rights said it had done more for the emancipation of women than anything else in the world." },
        { s: "L", t: "The boom did not last. From the 1920s onwards, first in the United States and later in Britain, the bicycle was pushed aside by the motor car. Roads were redesigned for cars, and cycling came to be seen as something for children and for people who could not afford anything better." },
        { s: "L", t: "And then it came back. The turning point was the oil crisis of the 1970s, when fuel prices rose sharply and governments began to question whether cities built around the car made sense. The Netherlands began to build separate cycle paths, and other countries have slowly followed. Today, with concern about air quality and climate, the machine of 1885 is once again being taken seriously as transport. In the second half of the lecture I want to look at that revival in more detail." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write NO MORE THAN TWO WORDS for each answer."
          ],
          notesTitle: "The history of the bicycle",
          lines: [
            "Early designs",
            "• 1817, Karl Drais: frame made of [[31]]; no pedals",
            "• rider pushed along the ground with his [[32]]",
            "• 1860s velocipede: nicknamed the 'boneshaker' because of its [[33]] tyres",
            "• 1870s high wheeler (penny-farthing): large front wheel gave greater [[34]]; dangerous",
            "The safety bicycle",
            "• 1885, John Kemp Starley's Rover: pedals linked to the rear wheel by a [[35]]",
            "• 1888, Dunlop: air-filled tyre invented to help his [[36]] ride more comfortably",
            "Effects on society",
            "• workers could live further from the [[37]]",
            "• people married partners from more distant villages",
            "• women adopted a style of clothing called [[38]]; greater independence",
            "Decline and revival",
            "• from the 1920s, replaced by the [[39]]",
            "• revival began with the [[40]] of the 1970s"
          ],
          questions: [
            { n: 31, answer: ["wood"] },
            { n: 32, answer: ["feet"] },
            { n: 33, answer: ["iron"] },
            { n: 34, answer: ["speed"] },
            { n: 35, answer: ["chain"] },
            { n: 36, answer: ["son", "young son"] },
            { n: 37, answer: ["factory", "factories", "town"] },
            { n: 38, answer: ["rational dress"] },
            { n: 39, answer: ["motor car", "car", "motor cars", "cars"] },
            { n: 40, answer: ["oil crisis"] }
          ]
        }
      ]
    }
  ]
});

// Listening Test 2 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L2", difficulty: "easy",
  title: "Listening Test 2",
  parts: [
    {
      number: 1,
      intro: "You will hear a woman phoning a holiday letting company to book a cottage.",
      speakers: { M: { name: "Booking agent", gender: "male" }, W: { name: "Mrs Pennington", gender: "female" } },
      script: [
        { cue: "look", range: [1, 5] },
        { s: "M", t: "Good afternoon, Coastline Cottages, Rob speaking. How can I help?" },
        { s: "W", t: "Oh, hello. I'm calling about one of the cottages on your website, Larkspur Cottage, in Saltby. Is it still available in August?" },
        { s: "M", t: "Larkspur Cottage, yes, I've got it here. Which dates were you thinking of?" },
        { s: "W", t: "We'd like a week, ideally arriving on the 7th." },
        { s: "M", t: "I'm afraid the week beginning the 7th has already gone. I've got it free from Saturday the 14th for seven nights, and then again from the 28th." },
        { s: "W", t: "The 14th would work for us. The 28th is too close to the children going back to school." },
        { s: "M", t: "So that's Saturday the 14th of August, for seven nights, leaving on the 21st. And how many people will be staying?" },
        { s: "W", t: "There'll be four of us, my husband and me and our two children. Oh, actually, no. My sister is bringing her son as well now, so it's five altogether." },
        { s: "M", t: "Five. That's no problem, the cottage sleeps six. Can I take your name, please?" },
        { s: "W", t: "It's Mrs Pennington. That's P-E-N-N-I-N-G-T-O-N." },
        { s: "M", t: "P-E-N-N-I-N-G-T-O-N. Thank you. And a phone number, in case we need to get hold of you?" },
        { s: "W", t: "You're best using my landline, actually. It's 0-1-6-3-2, 4-4-8, 9-1-0." },
        { s: "M", t: "0-1-6-3-2, 4-4-8, 9-1-0. Lovely." },
        { s: "W", t: "Can you tell me what the cost will be? Your website says 840 pounds for a week in August." },
        { s: "M", t: "That's the price for the first two weeks of August, which are our peak period. From the 14th onwards it drops, so your week would be 790 pounds. That includes all the electricity and heating." },
        { s: "W", t: "Oh good, 790. That's better than I was expecting." },
        { cue: "continue", range: [6, 10] },
        { s: "W", t: "Does the price include bed linen?" },
        { s: "M", t: "It does. All the beds are made up when you arrive. What we don't supply is towels, so you'll need to bring those with you. People often forget, and there's nowhere in the village to buy them." },
        { s: "W", t: "Towels. I'll write that down. And how do we get into the cottage when we arrive? Is there a key safe?" },
        { s: "M", t: "No, we tried a key safe, but the sea air kept jamming it. The keys are kept at the shop in the village, the one right next to the church. It's open until eight in the evening, so if you think you'll be arriving later than that, give us a ring and we'll arrange something else." },
        { s: "W", t: "The shop next to the church. Fine. One more thing. The photos on the website show a swimming pool in the garden. My children were very excited about that." },
        { s: "M", t: "Ah. I'm sorry, I should have mentioned it straight away. The pool was badly damaged in the storms last winter and it's having to be rebuilt, so it won't be open at all this year. I'll make sure the website gets changed. The garden and the barbecue are available, of course, and the beach is only a ten-minute walk." },
        { s: "W", t: "That's a shame, but I'm sure the beach will make up for it. Is there anywhere nearby to buy food?" },
        { s: "M", t: "The village shop does bread and milk and the basics, but for a proper weekly shop the nearest supermarket is in Hadley, which is about three miles away. There's a bus every hour, or it's a very short drive." },
        { s: "W", t: "We'll have the car, so that's fine. So how do I confirm the booking?" },
        { s: "M", t: "I'll need a deposit of 150 pounds now to hold the dates, and then the balance is due six weeks before you arrive, so by the beginning of July. You can pay by card over the phone or by bank transfer." },
        { s: "W", t: "I'll pay the 150 by card now, if that's all right." },
        { s: "M", t: "Perfect. Let me just take the card details, and then I'll email you a confirmation with directions." },
        { s: "W", t: "Wonderful. Thank you so much." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [1, 10],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Coastline Cottages – booking enquiry",
          lines: [
            "Example   Cottage name:   Larkspur Cottage",
            "Booking details",
            "• Arrival date: Saturday [[1]] August",
            "• Length of stay: 7 nights",
            "• Number of guests: [[2]]",
            "• Name: Mrs [[3]]",
            "• Phone (landline): 01632 [[4]]",
            "• Cost for the week: £[[5]] (includes electricity and heating)",
            "Other information",
            "• Bed linen is provided, but guests must bring their own [[6]]",
            "• Keys: collect from the [[7]] next to the church (open until 8 p.m.)",
            "• The [[8]] will not be open this year",
            "• Nearest [[9]] is in Hadley, about 3 miles away",
            "• Deposit: £[[10]] to pay now; balance due 6 weeks before arrival"
          ],
          questions: [
            { n: 1, answer: ["14", "14th", "fourteenth"] },
            { n: 2, answer: ["5", "five"] },
            { n: 3, answer: ["pennington"] },
            { n: 4, answer: ["448910", "448 910"] },
            { n: 5, answer: ["790"] },
            { n: 6, answer: ["towels"] },
            { n: 7, answer: ["shop"] },
            { n: 8, answer: ["pool", "swimming pool"] },
            { n: 9, answer: ["supermarket"] },
            { n: 10, answer: ["150"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a guide welcoming a group of visitors to a regional museum.",
      speakers: { M: { name: "Guide", gender: "male" } },
      script: [
        { cue: "look", range: [11, 14] },
        { s: "M", t: "Good morning, everyone, and welcome to the Marshfield Regional Museum. My name's Graham, and I'm one of the volunteer guides here. Before you explore, I'll tell you a little about the building and the collection, go through one or two rules, and then explain where everything is." },
        { s: "M", t: "First, the building itself. A lot of visitors assume it must have been the town hall, because of the clock tower and the grand front steps. In fact it was never a public building at all. It was put up in 1840 as a warehouse for a wool merchant called Josiah Brent, when Marshfield was one of the busiest wool towns in the region. The clock was added later so that the workers knew when to go home. The business closed in the 1920s, and the building only became a museum in 1952." },
        { s: "M", t: "Now, the collection. People often ask whether the objects were bought by the council, or sent down from one of the national museums. Neither, actually. Almost everything you'll see today was collected by one woman, Dr Edith Marlow, a local doctor who spent forty years gathering objects from farms and workshops around the town. She gave the whole collection to Marshfield in 1950, on condition that a museum was opened to house it. Local families have added things since, but the core of the collection is still hers." },
        { s: "M", t: "A couple of rules, and then I'll let you go. Photography is fine, and that includes the galleries upstairs. The one thing we ask is that you don't use a flash anywhere in the building, because the light damages the old fabrics and paper. Secondly, bags. We used to allow visitors to carry rucksacks as long as they wore them on the front, but after some damage to a display case last year, we've had to change that. Anything larger than a small handbag now has to go in the lockers by the entrance. They're free, you just need a pound coin, which you get back." },
        { cue: "continue", range: [15, 20] },
        { s: "M", t: "Right, the layout. You can follow on the plan you were given. We're standing just inside the main entrance, at the bottom of the plan, and directly in front of you is the reception desk. Immediately on your left as you come in, in the corner, is the gift shop. It's small, but it has some very good local history books." },
        { s: "M", t: "On your right as you come in, the room with the large windows looking out onto the street, is the café. It used to be at the far end of the building next to the garden, but we moved it two years ago so that people can pop in for a coffee without walking through the whole museum." },
        { s: "M", t: "If you walk past the reception desk, you come into the central hall, which runs the full length of the building. The two small kiosks in the middle of the hall are information points, with touch screens. The big room on your left, beyond the shop, is the lecture theatre. There's a free talk on the wool trade at two o'clock today." },
        { s: "M", t: "Opposite the lecture theatre, on the right-hand side of the hall, the room beyond the café is the textiles gallery. That's where you'll find the oldest pieces in the collection, including the Marlow tapestry, so it's the one room you really shouldn't miss. It's kept quite dark, for the reasons I mentioned." },
        { s: "M", t: "At the far end of the hall, straight ahead of you, there's a pair of double doors. That's the garden entrance. The garden has been planted with the dye plants that were once used to colour wool. The room in the far right-hand corner, just before you reach the garden doors, is our temporary exhibition space. At the moment it has a display of photographs of the town in the 1950s." },
        { s: "M", t: "Finally, if you'd rather not use the stairs, the lift is in the far left-hand corner of the hall, right next to the staircase, and it takes you to the first-floor galleries. I'll be around the hall all morning, so do stop me if you have any questions. Enjoy your visit." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [11, 14],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 11, text: "The museum building was originally", options: ["the town hall.", "a wool merchant's warehouse.", "a doctor's house."], answer: "B" },
            { n: 12, text: "Most of the museum's collection came from", options: ["one private collector.", "purchases made by the council.", "a national museum."], answer: "A" },
            { n: 13, text: "Visitors may take photographs", options: ["only on the ground floor.", "anywhere, as long as they do not use flash.", "only in the garden."], answer: "B" },
            { n: 14, text: "Since last year, visitors with large bags must", options: ["leave them in the lockers.", "carry them on their front.", "pay a small fee at reception."], answer: "A" }
          ]
        },
        {
          type: "diagram",
          range: [15, 20],
          instructions: [
            "Label the plan below.",
            "Write the correct letter, A-I, next to Questions 15-20."
          ],
          caption: "Marshfield Regional Museum – ground floor",
          letterOptions: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          svg: "<svg viewBox='0 0 620 420' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='14'>" +
            "<rect x='20' y='20' width='580' height='380' fill='#f6f3ea' stroke='#555'/>" +
            "<rect x='270' y='370' width='80' height='28' fill='#fff' stroke='#555'/><text x='275' y='389' font-size='12'>ENTRANCE</text>" +
            "<rect x='265' y='300' width='90' height='36' fill='#d9c7a6' stroke='#555'/><text x='272' y='323' font-size='12'>RECEPTION</text>" +
            "<rect x='120' y='40' width='80' height='70' fill='#d9c7a6' stroke='#555'/><text x='133' y='80' font-size='12'>STAIRS</text>" +
            "<rect x='450' y='300' width='130' height='70' fill='#fff' stroke='#555'/><text x='510' y='340' font-weight='bold'>A</text>" +
            "<rect x='450' y='160' width='130' height='120' fill='#fff' stroke='#555'/><text x='510' y='225' font-weight='bold'>B</text>" +
            "<rect x='450' y='40' width='130' height='70' fill='#fff' stroke='#555'/><text x='510' y='80' font-weight='bold'>C</text>" +
            "<rect x='40' y='300' width='130' height='70' fill='#fff' stroke='#555'/><text x='100' y='340' font-weight='bold'>D</text>" +
            "<rect x='250' y='40' width='120' height='70' fill='#fff' stroke='#555'/><text x='305' y='80' font-weight='bold'>E</text>" +
            "<rect x='200' y='200' width='70' height='50' fill='#fff' stroke='#555'/><text x='230' y='230' font-weight='bold'>F</text>" +
            "<rect x='40' y='160' width='130' height='120' fill='#fff' stroke='#555'/><text x='100' y='225' font-weight='bold'>G</text>" +
            "<rect x='40' y='40' width='70' height='70' fill='#fff' stroke='#555'/><text x='70' y='80' font-weight='bold'>H</text>" +
            "<rect x='350' y='200' width='70' height='50' fill='#fff' stroke='#555'/><text x='380' y='230' font-weight='bold'>I</text>" +
            "<text x='270' y='160' font-size='12' fill='#555'>central hall</text>" +
            "<text x='420' y='412' font-size='11' fill='#555'>street</text>" +
            "<path d='M310 370 L310 336' stroke='#999' stroke-dasharray='4 3' fill='none'/><path d='M310 300 L310 110' stroke='#999' stroke-dasharray='4 3' fill='none'/>" +
            "</svg>",
          questions: [
            { n: 15, text: "Gift shop", answer: "D" },
            { n: 16, text: "Café", answer: "A" },
            { n: 17, text: "Lecture theatre", answer: "G" },
            { n: 18, text: "Textiles gallery", answer: "B" },
            { n: 19, text: "Garden entrance", answer: "E" },
            { n: 20, text: "Lift", answer: "H" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear two marketing students, Chloe and Ravi, discussing their project on a local bakery with their tutor.",
      speakers: { T: { name: "Tutor", gender: "female" }, C: { name: "Chloe", gender: "female" }, R: { name: "Ravi", gender: "male" } },
      script: [
        { cue: "look", range: [21, 25] },
        { s: "T", t: "Come in, both of you. So, the small business project. Which business did you end up working with?" },
        { s: "C", t: "Oakfield Bakery, on the high street. We emailed about ten local businesses and three replied, a hairdresser, a garden centre and the bakery." },
        { s: "R", t: "The garden centre was tempting, but the bakery changed hands six months ago. The new owner, Sandra, took over from her uncle, and she's keen to attract younger customers. We thought that would give us more to work with." },
        { s: "T", t: "Good reasoning. And what did the owner say the main problem is?" },
        { s: "R", t: "That surprised us. I'd assumed it would be the new supermarket on the edge of town, which has its own bakery counter. But Sandra said sales were fine until the council made the high street one-way last spring. Since then far fewer people walk past, because the buses stop on a different street." },
        { s: "C", t: "So it's really a problem of passing trade. Hardly anyone new discovers the place." },
        { s: "T", t: "Good. Tell me about the customer survey." },
        { s: "C", t: "We stood in the shop for three mornings and asked customers to fill in a short questionnaire. We got eighty-two responses. We expected most customers to live close by, but almost sixty per cent travel in from outside the town, mostly on their way to work. What really struck us, though, was the age profile. Two thirds of them were over fifty." },
        { s: "R", t: "Which fits with what Sandra said. They're loyal, most visit at least twice a week, but there aren't enough of them." },
        { s: "T", t: "Here's my concern. You've only spoken to people who were already inside the shop. If the question is why younger people don't come in, those aren't the people who can tell you. You need to talk to the people who walk straight past." },
        { s: "C", t: "Fair point. We could do a street survey next week." },
        { s: "T", t: "Do. One more thing before we look at your ideas. Whatever you recommend, remember that this is a business with four staff and very small margins. A plan costing thousands of pounds might look impressive in your report, but it isn't realistic for her. Anything over a few hundred pounds needs a very strong justification." },
        { s: "R", t: "Understood." },
        { cue: "continue", range: [26, 30] },
        { s: "T", t: "So, run me through the promotional ideas you've looked at, and what you've decided about each." },
        { s: "C", t: "The first was a loyalty card, buy nine loaves and get the tenth free. But it turns out Sandra's uncle tried a paper stamp card two years ago. Hardly anyone kept the cards, and it slowed the queue down, so it was dropped after a few months. There's no point suggesting it again." },
        { s: "T", t: "Fair enough. Next?" },
        { s: "R", t: "A social media account. At the moment the bakery has no online presence at all. Given that the aim is to reach younger people, and that it costs nothing except time, we think this should be the centre of the whole plan. Photographs of the bread coming out of the oven, that kind of thing. Sandra was nervous about it, but she's agreed to try." },
        { s: "T", t: "Sensible. What else?" },
        { s: "C", t: "We looked at an early-morning delivery service to offices and cafés in the town. There's demand, two cafés were interested. But it would need a van and a driver before seven in the morning, and when we costed it, it came to far more than the business could afford, so we've ruled it out." },
        { s: "R", t: "Then there's the idea of baking classes in the evenings, after the shop closes. Sandra likes it, and the kitchen is big enough. The problem is that we have no evidence that anyone would pay for them. So we're adding a question about it to the street survey, and we'll decide after that." },
        { s: "T", t: "Good. And the last one?" },
        { s: "C", t: "A discount for students, because the college is five minutes' walk away. We thought it was a strong idea, but Sandra said no, quite firmly. The margins on bread are so thin that even ten per cent off would wipe out the profit, and she doesn't want to be known as the cheap option." },
        { s: "T", t: "Then respect that, and say so in the report. It's her business. You might mention the free coffee she already offers with a pastry before nine, though. That's a promotion that's working." },
        { s: "R", t: "We will. Thanks." }
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [21, 25],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 21, text: "The students chose the bakery for their project because", options: ["it was the only business that replied to them.", "it was the largest of the businesses available.", "it had recently come under new ownership."], answer: "C" },
            { n: 22, text: "According to the owner, the bakery's main problem is", options: ["competition from a new supermarket.", "a fall in the number of people walking past.", "the rising cost of ingredients."], answer: "B" },
            { n: 23, text: "What did the students' survey show about the bakery's customers?", options: ["Most of them live close to the shop.", "Most of them are over fifty.", "Most of them visit less than once a week."], answer: "B" },
            { n: 24, text: "The tutor says the students should", options: ["collect responses from people who do not enter the shop.", "repeat the survey at the weekend.", "ask customers more questions about prices."], answer: "A" },
            { n: 25, text: "The tutor reminds the students that their recommendations must", options: ["concentrate on online advertising.", "be tested before the report is written.", "be affordable for a very small business."], answer: "C" }
          ]
        },
        {
          type: "matchfeatures",
          range: [26, 30],
          instructions: [
            "What do the students decide about each of the following promotional ideas?",
            "Choose FIVE answers from the box and write the correct letter, A-G, next to Questions 26-30."
          ],
          optionsTitle: "Decisions",
          options: [
            { letter: "A", text: "It will be the main recommendation." },
            { letter: "B", text: "It has been tried before without success." },
            { letter: "C", text: "It would cost too much." },
            { letter: "D", text: "It needs more research first." },
            { letter: "E", text: "The owner has rejected it." },
            { letter: "F", text: "It will be recommended for a later stage." },
            { letter: "G", text: "It is already being done." }
          ],
          questions: [
            { n: 26, text: "loyalty card", answer: "B" },
            { n: 27, text: "social media account", answer: "A" },
            { n: 28, text: "early-morning delivery service", answer: "C" },
            { n: 29, text: "baking classes", answer: "D" },
            { n: 30, text: "discount for students", answer: "E" }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the history of coffee.",
      speakers: { L: { name: "Lecturer", gender: "male" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good morning. Over the last few weeks we've been looking at commodities that changed the world, and today's subject is coffee. Five hundred years ago almost nobody outside a small corner of Africa and Arabia had tasted it. I want to trace how that changed, and then look at the industry today." },
        { s: "L", t: "Coffee is native to Ethiopia, where it still grows wild in the highland forests of the south-west. The famous story is that a goat herder noticed his animals became unusually lively after eating the red berries of a particular bush, tried them himself, and discovered their effect. It's almost certainly a legend, but it captures something real: coffee was first valued not for its taste but for what it did to the body." },
        { s: "L", t: "The first firm evidence of coffee being brewed as a drink comes from Yemen, across the Red Sea, in the fifteenth century. There it was drunk by monks in religious communities, who found that it kept them awake through long night-time prayers. From the monasteries it spread to the towns, and by the early sixteenth century coffee was being drunk in Cairo, Damascus and Constantinople." },
        { s: "L", t: "The Arabian merchants understood that they had something valuable, and they protected it carefully. For well over a century, the beans could only be exported after they had been roasted, so that nobody who bought them could plant them. The monopoly was eventually broken, according to tradition, by a pilgrim from India who hid seven seeds in his clothing and carried them home in the early 1600s. Coffee was certainly growing in India by the middle of that century. The Dutch then took plants to Java, the French carried a single seedling to the Caribbean, and from there the crop spread through Central and South America. Brazil has been the world's largest producer for more than a hundred and fifty years." },
        { s: "L", t: "Now, the coffee house. The first ones opened in Constantinople in the 1550s. The first in England appeared in Oxford in 1650, and in London two years later. Within fifty years London had hundreds of them, and they had become known as penny universities, because for a penny a customer bought a cup of coffee and the right to sit and read the newspapers that the house provided. A great deal of business was done over the tables. The most famous example is the coffee house run by Edward Lloyd, where ship owners and sea captains met to exchange news. The arrangements they made there for sharing the risk of lost cargoes grew into Lloyd's of London, which remains one of the largest insurance markets in the world." },
        { s: "L", t: "Governments did not always welcome all this conversation. In 1675, King Charles the Second tried to close every coffee house in England, because he believed they were places where people met to plot rebellion against him. The outcry was so great that the order was withdrawn within eleven days." },
        { s: "L", t: "Let's move to the present. Coffee grows only in a band around the equator. Two species account for almost the entire crop. Arabica, the original Ethiopian plant, has the finer flavour, but it is a delicate tree. It needs cool temperatures, so it has to be grown at high altitude, and it is easily damaged by disease. Robusta is tougher, grows on lower ground and contains roughly twice as much caffeine, but it tastes harsher, so it sells for less and goes mainly into instant coffee. Around twenty-five million farmers grow coffee worldwide, most of them on very small plots." },
        { s: "L", t: "That brings me to the problems facing the industry. There are three. The first is price. The world price can halve within a single year, which means that farmers frequently sell their crop for less than it cost them to grow it. The second is climate change. Arabica is so sensitive to temperature that several studies suggest the land suitable for growing it could shrink by half by 2050, and warmer conditions are already helping leaf rust, a fungal disease, to spread into areas where it was never seen before. And the third problem concerns the wild plants. The forests of Ethiopia where coffee first grew are being cleared for farming and timber, and with them we are losing the genetic variety that plant breeders will need to produce new, hardier types of coffee. One recent survey concluded that around sixty per cent of wild coffee species are at risk of disappearing." },
        { s: "L", t: "So a plant that began in an African forest now supports millions of livelihoods, and its future may depend on protecting the place where it started. In the second half of the lecture, I'll look at the fair trade movement." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD ONLY for each answer."
          ],
          notesTitle: "The history of coffee",
          lines: [
            "Origins",
            "• coffee plant is native to [[31]]",
            "• legend: a goat herder noticed the effect of the berries on his animals",
            "• 15th century, Yemen: drunk by [[32]] to stay awake during night-time prayers",
            "Spread",
            "• Arabian merchants only exported beans that had been [[33]]",
            "• early 1600s: a pilgrim carried seeds to [[34]]",
            "• Dutch took plants to Java; French took a seedling to the Caribbean",
            "• Brazil: largest producer for over 150 years",
            "Coffee houses",
            "• London: known as 'penny universities' – a penny bought coffee and access to the [[35]]",
            "• Edward Lloyd's coffee house developed into a major [[36]] market",
            "• 1675: Charles II tried to close coffee houses because he feared [[37]]",
            "Production today",
            "• Arabica: better flavour, but must be grown at [[38]] altitude",
            "• Robusta: tougher, more caffeine, mainly used for instant coffee",
            "Problems",
            "• unstable prices: farmers may sell for less than the cost of production",
            "• [[39]] change: suitable land for Arabica may halve by 2050; spread of leaf rust",
            "• wild coffee plants threatened by the clearing of Ethiopian [[40]]"
          ],
          questions: [
            { n: 31, answer: ["ethiopia"] },
            { n: 32, answer: ["monks"] },
            { n: 33, answer: ["roasted"] },
            { n: 34, answer: ["india"] },
            { n: 35, answer: ["newspapers"] },
            { n: 36, answer: ["insurance"] },
            { n: 37, answer: ["rebellion"] },
            { n: 38, answer: ["high"] },
            { n: 39, answer: ["climate"] },
            { n: 40, answer: ["forests", "forest"] }
          ]
        }
      ]
    }
  ]
});

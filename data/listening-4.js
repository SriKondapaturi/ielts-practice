// Listening Test 4 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L4",
  title: "Listening Test 4",
  parts: [
    {
      number: 1,
      intro: "You will hear a woman phoning a removals company to arrange a house move.",
      speakers: { M: { name: "Removals clerk", gender: "male" }, W: { name: "Helen", gender: "female" } },
      script: [
        { cue: "look", range: [1, 5] },
        { s: "M", t: "Good afternoon, Westgate Removals, Tony speaking. How can I help?" },
        { s: "W", t: "Oh, hello. I'd like to get a quote for a house move, please. We're moving in June." },
        { s: "M", t: "Certainly. Is that a house move or a flat? We have different vans for each." },
        { s: "W", t: "It's a house. We're going from one house to another." },
        { s: "M", t: "Fine, I'll put that down. Can I start with your name?" },
        { s: "W", t: "It's Helen Fairweather." },
        { s: "M", t: "Could you spell the surname for me?" },
        { s: "W", t: "Yes, it's F-A-I-R-W-E-A-T-H-E-R." },
        { s: "M", t: "F-A-I-R-W-E-A-T-H-E-R. Thank you. And the address we'll be collecting from?" },
        { s: "W", t: "It's 52 Hawthorn Crescent. That's Hawthorn, H-A-W-T-H-O-R-N." },
        { s: "M", t: "52 Hawthorn Crescent. Is that here in Marsden?" },
        { s: "W", t: "Yes, just off the ring road. And we're moving to Stroud, so it's about forty miles." },
        { s: "M", t: "That's a fairly standard distance for us. Do you have the postcode of the new place? I need it to work out the travel time." },
        { s: "W", t: "I do, hang on. It's G-L-5, 2-R-T." },
        { s: "M", t: "G-L-5, 2-R-T. Lovely. Now, you said June. Do you have a date yet?" },
        { s: "W", t: "We were told Friday the 14th originally, but the solicitors have just changed it. The keys won't be ready until the Saturday, so it'll be the 15th now." },
        { s: "M", t: "Saturday the 15th of June. I should say we charge a little more for Saturdays, but I'll come to the price in a minute. How many bedrooms does your current house have? That's how we estimate the size of the load." },
        { s: "W", t: "Three bedrooms. Oh, and the attic room, which is full of furniture, so I suppose you'd better say four." },
        { s: "M", t: "Four it is. Better to send a bigger van than to run out of space." },
        { cue: "continue", range: [6, 10] },
        { s: "M", t: "Now, is there anything unusually large or heavy? Wardrobes, safes, that kind of thing?" },
        { s: "W", t: "There's a piano. An upright, not a grand, but it's very heavy." },
        { s: "M", t: "A piano. That's no problem, but we'll need to send a specialist team with a trolley for it, so I'll make a note." },
        { s: "W", t: "What happens about insurance? A friend of mine had a table damaged when she moved." },
        { s: "M", t: "There are two levels. Basic cover is included in the price, and that pays up to 40 pounds per item. Then there's full cover, which replaces anything that's damaged at its actual value. That's an extra 35 pounds." },
        { s: "W", t: "With a piano I think we'd better have the full cover." },
        { s: "M", t: "Sensible. Right, let me add it all up. A four-bedroom house, forty miles, a Saturday, the piano team and full cover. That comes to 740 pounds. However, you're booking more than six weeks ahead, so you qualify for our early booking discount, which brings it down to 680." },
        { s: "W", t: "680. That's less than I expected, to be honest." },
        { s: "M", t: "We like to hear that. Now, packing. Are you doing your own packing, or would you like us to do it?" },
        { s: "W", t: "We'll do it ourselves. Do you supply boxes?" },
        { s: "M", t: "We do, and they're free as long as you return them after the move. We normally give thirty, but for a four-bedroom house that's never enough, so I'll send you forty. We can drop them off a couple of weeks before." },
        { s: "W", t: "Forty boxes, perfect. And what time will the van arrive on the day?" },
        { s: "M", t: "On a Saturday we usually start at eight, but the piano team come from our other depot and they won't get to you until half past, so let's say eight thirty for everyone." },
        { s: "W", t: "Eight thirty. Fine. Is there anything I need to do beforehand?" },
        { s: "M", t: "Just make sure the piano has nothing on top of it and that there's somewhere for the van to park outside. I'll email you a confirmation this afternoon." },
        { s: "W", t: "Thank you very much, Tony. That's really helpful." },
        { s: "M", t: "You're welcome. Good luck with the move." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [1, 10],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Westgate Removals – Booking enquiry",
          lines: [
            "Example   Type of move:   house",
            "Customer details",
            "• Name: Helen [[1]]",
            "• Current address: [[2]] Hawthorn Crescent, Marsden",
            "• New postcode: [[3]]",
            "Move details",
            "• Date: Saturday [[4]] June",
            "• Number of bedrooms: [[5]]",
            "• Special item: a [[6]]",
            "• Insurance: [[7]] cover",
            "• Total cost after discount: £[[8]]",
            "• Boxes supplied free: [[9]]",
            "• Van will arrive at [[10]] a.m."
          ],
          questions: [
            { n: 1, answer: ["fairweather"] },
            { n: 2, answer: ["52", "fifty-two", "fifty two"] },
            { n: 3, answer: ["GL5 2RT", "gl52rt"] },
            { n: 4, answer: ["15", "15th", "fifteenth"] },
            { n: 5, answer: ["4", "four"] },
            { n: 6, answer: ["piano"] },
            { n: 7, answer: ["full"] },
            { n: 8, answer: ["680"] },
            { n: 9, answer: ["40", "forty"] },
            { n: 10, answer: ["8.30", "8:30", "830", "half past eight"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a manager giving an induction talk to new staff at a large garden centre.",
      speakers: { M: { name: "Manager", gender: "male" } },
      script: [
        { cue: "look", range: [11, 15] },
        { s: "M", t: "Good morning, everyone, and welcome to Oakfield Garden Centre. I'm Graham, the general manager, and I'll be looking after you this morning. I'll show you where everything is on the site and then run through a few rules. You should each have a copy of the site plan." },
        { s: "M", t: "We're standing at the main entrance now, at the bottom of the plan. The big building in the middle is the main shop, where the tills are, along with seeds, gifts and the indoor plant displays." },
        { s: "M", t: "Let's start with the staff room, since that's where you'll leave your things. If you walk straight up past the main shop, it's directly behind it, the small building with the green door, tucked between the back of the shop and the top boundary fence. You'll find lockers, a kettle and the noticeboard where the rota goes up every Thursday." },
        { s: "M", t: "Next, the tool store. Now, to the right of the main shop you'll see the greenhouse, which is a long glass building running along the right-hand side. Squeezed in between the main shop and the greenhouse is a tiny brick building. That's the tool store. Everything you need for the outdoor areas lives in there, and it's locked at night." },
        { s: "M", t: "The café, which I'm sure you'll find quickly enough, is the building immediately to your right as you come in through the entrance, with the big windows overlooking the car park. It's one of our busiest areas, especially at weekends." },
        { s: "M", t: "Now, the outdoor plants area. That's the large open area that takes up most of the left-hand side of the site. It stretches from just inside the entrance right up towards the top of the plan. That's where the shrubs, trees and bedding plants are displayed. Beyond it, in the top left corner, you'll find the aquatics section with the pond plants and fish." },
        { s: "M", t: "Finally, the delivery bay. It used to be behind the main shop, where the staff room is now, but the lorries couldn't turn round, so three years ago we moved it. It's now in the top right corner of the site, past the greenhouse, and lorries come in through a separate gate on the top road. The trolleys live in the small shelter to the left of the entrance." },
        { cue: "continue", range: [16, 20] },
        { s: "M", t: "Right, a few rules. First, uniform. You'll each be given a green fleece and two polo shirts today. For trousers, you wear your own, any dark colour is fine, and boots or sturdy shoes if you're working outside. The one thing we are strict about is your name badge. You must wear it at all times, even out in the yard, because customers need to be able to see who to ask." },
        { s: "M", t: "Breaks. You're entitled to a 45-minute lunch break and two 15-minute tea breaks on a full day. In the past people took them whenever the shop was quiet, but that meant the tills were sometimes left with nobody on them. So now your break times are printed on the rota, and please stick to them." },
        { s: "M", t: "The staff discount. It's 25 per cent off plants and 10 per cent off everything else in the shop. I should be clear that it doesn't apply to food and drink in the café, because the café is run by a separate company." },
        { s: "M", t: "Training. There's a first-aid course in the autumn, which is voluntary, and I'd encourage you to do it. Forklift training is only for those of you who'll be working in the delivery bay. But there is one thing that everyone has to complete, and that's the online health and safety module. You need to have finished it by the end of your first week." },
        { s: "M", t: "Lastly, customers will ask you questions about plants, and some of them will be very detailed. Please don't guess. If you don't know, don't send them to the information desk either, because there's often nobody there. Use your radio and call one of the plant specialists. There's always at least one on duty. Okay, that's everything from me. Let's go and find your team leaders." }
      ],
      questionGroups: [
        {
          type: "diagram",
          range: [11, 15],
          instructions: [
            "Label the plan below.",
            "Write the correct letter, A-H, next to Questions 11-15."
          ],
          caption: "Oakfield Garden Centre",
          letterOptions: ["A", "C", "D", "E", "F", "G", "H"],
          svg: "<svg viewBox='0 0 620 420' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='14'>" +
            "<rect x='20' y='20' width='580' height='380' fill='#f6f3ea' stroke='#555'/>" +
            "<rect x='230' y='170' width='160' height='80' fill='#d9c7a6' stroke='#555'/><text x='268' y='215'>MAIN SHOP</text>" +
            "<rect x='270' y='360' width='80' height='30' fill='#fff' stroke='#555'/><text x='275' y='380' font-size='12'>ENTRANCE</text>" +
            "<rect x='390' y='320' width='90' height='50' fill='#fff' stroke='#555'/><text x='428' y='350' font-weight='bold'>A</text>" +
            "<rect x='500' y='170' width='80' height='130' fill='#d9c7a6' stroke='#555'/><text x='504' y='240' font-size='10'>GREENHOUSE</text>" +
            "<rect x='470' y='40' width='110' height='90' fill='#fff' stroke='#555'/><text x='518' y='90' font-weight='bold'>C</text>" +
            "<rect x='270' y='80' width='90' height='55' fill='#fff' stroke='#555'/><text x='308' y='112' font-weight='bold'>D</text>" +
            "<rect x='40' y='40' width='150' height='70' fill='#fff' stroke='#555'/><text x='108' y='80' font-weight='bold'>E</text>" +
            "<rect x='40' y='160' width='150' height='180' fill='#fff' stroke='#555'/><text x='108' y='255' font-weight='bold'>F</text>" +
            "<rect x='150' y='360' width='80' height='30' fill='#fff' stroke='#555'/><text x='184' y='380' font-weight='bold'>G</text>" +
            "<rect x='410' y='190' width='70' height='45' fill='#fff' stroke='#555'/><text x='439' y='218' font-weight='bold'>H</text>" +
            "<text x='450' y='395' font-size='11' fill='#555'>car park</text>" +
            "<text x='480' y='32' font-size='11' fill='#555'>top road</text>" +
            "<path d='M310 360 L310 250' stroke='#999' stroke-dasharray='4 3' fill='none'/><path d='M310 170 L310 135' stroke='#999' stroke-dasharray='4 3' fill='none'/>" +
            "</svg>",
          questions: [
            { n: 11, text: "Staff room", answer: "D" },
            { n: 12, text: "Tool store", answer: "H" },
            { n: 13, text: "Café", answer: "A" },
            { n: 14, text: "Outdoor plants area", answer: "F" },
            { n: 15, text: "Delivery bay", answer: "C" }
          ]
        },
        {
          type: "mcq",
          range: [16, 20],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 16, text: "What must staff wear at all times?", options: ["a name badge", "a green fleece", "dark trousers"], answer: "A" },
            { n: 17, text: "Staff should take their lunch break", options: ["whenever the shop is quiet.", "at the time shown on the rota.", "after checking with the manager."], answer: "B" },
            { n: 18, text: "The staff discount does not apply to", options: ["plants.", "tools.", "café food."], answer: "C" },
            { n: 19, text: "All new staff must complete", options: ["a first-aid course.", "forklift training.", "an online safety module."], answer: "C" },
            { n: 20, text: "If staff cannot answer a customer's question about plants, they should", options: ["send the customer to the information desk.", "contact a specialist by radio.", "ask their team leader."], answer: "B" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear two geography students, Priya and Josh, planning a field trip to a coastal wetland.",
      speakers: { P: { name: "Priya", gender: "female" }, J: { name: "Josh", gender: "male" } },
      script: [
        { cue: "look", range: [21, 26] },
        { s: "P", t: "Right, Josh, we need to get the equipment list sorted for the wetland trip before Friday, or Dr Ahmed won't sign it off." },
        { s: "J", t: "Okay. Let's go through it. GPS receivers first. We need two to record the position of every sample point." },
        { s: "P", t: "I asked about those. The department has a box of them in the technicians' office. I'll borrow two on Thursday." },
        { s: "J", t: "Great, that's one thing we don't have to pay for. Quadrats next, for the vegetation survey." },
        { s: "P", t: "Do we buy those? They're not expensive." },
        { s: "J", t: "No need. My brother made four wooden ones for his ecology project last year and they're still in our garage. I'll bring them in. What about waders? We can't walk out across the mud in ordinary boots." },
        { s: "P", t: "The department doesn't have any, and buying six pairs would cost a fortune. There's an outdoor shop in town that hires them for about eight pounds a day, so I think that's the answer." },
        { s: "J", t: "Hiring makes sense. We'll only use them once. Now, water sampling. We need the bottles, the salinity meter and the test strips." },
        { s: "P", t: "That's actually sorted. I rang the wildlife trust that manages the reserve, and the ranger said they'd lend us a complete sampling kit for the day, as long as we send them a copy of our results." },
        { s: "J", t: "That's generous. Okay, the drone. I was quite keen on getting aerial photos of the creek patterns." },
        { s: "P", t: "I was too, but there's a problem. The reserve is a protected bird site and drones aren't permitted at all between March and October. The ranger was very firm about it." },
        { s: "J", t: "Oh. Then it's off the list. A phone camera from the sea wall will do." },
        { s: "P", t: "Agreed. Last thing, transport. There are six of us plus equipment, so we need the department minibus." },
        { s: "J", t: "I looked into that. It's free for field trips, but it has to be booked three weeks ahead, and apparently it goes quickly in the summer term, so we should put the request in today." },
        { s: "P", t: "I'll do it as soon as we finish. Oh, and Dr Ahmed said she'd bring the clipboards and the recording sheets herself, so we don't need to worry about those." },
        { cue: "continue", range: [27, 30] },
        { s: "J", t: "Can I just check something about the site? Someone asked me why we chose Harlow Marsh when Fenwick Bay is a lot closer to the university." },
        { s: "P", t: "It is closer, by about half an hour. But the trust has been monitoring Harlow Marsh since the 1970s, so there are nearly fifty years of records on vegetation and water levels. We can compare what we measure with what was there before." },
        { s: "J", t: "That's what I told them. What's your main worry about the day itself?" },
        { s: "P", t: "The tide, definitely. The ranger said it comes in across the flats faster than a person can walk, and people have been caught out. We need to be back on the sea wall an hour before it turns. Weather you can dress for, and the creeks are obvious enough that nobody's going to get lost, but the tide doesn't give you a second chance." },
        { s: "J", t: "I'll print the tide tables and put the safe time on everyone's sheet. What are we actually producing at the end? A report?" },
        { s: "P", t: "No, it's changed. Dr Ahmed said the assessment this year is a poster. We present it at the departmental session in week ten. The report option has gone, and she doesn't want a map on its own, though a map can be part of the poster." },
        { s: "J", t: "Are we still going on the 12th?" },
        { s: "P", t: "That's the plan. Is that a problem for you?" },
        { s: "J", t: "Not for me personally, the date's fine, and the forecast is usually settled in May. It's the birds. Half the point of the site is the wading birds, and most of them don't arrive until late August. On the 12th we'll see very few." },
        { s: "P", t: "That's true, but our focus is the vegetation and the water, so we'll still get what we need. We can mention it in the poster as a limitation." },
        { s: "J", t: "Fair enough. Right, you book the minibus and I'll start the risk assessment form." }
      ],
      questionGroups: [
        {
          type: "matchfeatures",
          range: [21, 26],
          instructions: [
            "What do the students decide about each of the following items for the field trip?",
            "Choose SIX answers from the box and write the correct letter, A-H, next to Questions 21-26."
          ],
          optionsTitle: "Decisions",
          options: [
            { letter: "A", text: "Josh will bring it from home." },
            { letter: "B", text: "Priya will borrow it from the department." },
            { letter: "C", text: "It will be hired." },
            { letter: "D", text: "It will be bought new." },
            { letter: "E", text: "The tutor will supply it." },
            { letter: "F", text: "It is no longer needed." },
            { letter: "G", text: "It must be booked in advance." },
            { letter: "H", text: "A local organisation will lend it." }
          ],
          questions: [
            { n: 21, text: "GPS receivers", answer: "B" },
            { n: 22, text: "Quadrats", answer: "A" },
            { n: 23, text: "Waders", answer: "C" },
            { n: 24, text: "Water sampling kit", answer: "H" },
            { n: 25, text: "Drone", answer: "F" },
            { n: 26, text: "Minibus", answer: "G" }
          ]
        },
        {
          type: "mcq",
          range: [27, 30],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 27, text: "Why did the students choose Harlow Marsh as their site?", options: ["It is the nearest wetland to the university.", "Long-term records exist for it.", "It is easier to get permission to visit."], answer: "B" },
            { n: 28, text: "What is Priya most concerned about on the day of the trip?", options: ["the speed of the incoming tide", "a sudden change in the weather", "students losing their way in the creeks"], answer: "A" },
            { n: 29, text: "The students will present their findings as", options: ["a written report.", "a poster.", "a map."], answer: "B" },
            { n: 30, text: "What does Josh think about the proposed date?", options: ["It is too early to see many birds.", "It clashes with another commitment.", "The weather may be unsuitable."], answer: "A" }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the history and science of glass.",
      speakers: { L: { name: "Lecturer", gender: "male" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good morning. In this lecture I want to look at a material that is all around us and yet remains, in some ways, rather mysterious. I'm talking about glass. We'll go through its history, and then I'll say what glass actually is, because the usual answer is wrong." },
        { s: "L", t: "Glass was not invented by people. It occurs naturally. When lava from a volcano cools very quickly, there is no time for crystals to form, and the result is a black, shiny glass called obsidian. Early humans discovered that when obsidian breaks, it produces an edge far sharper than any metal, and they used it for blades and arrowheads for tens of thousands of years." },
        { s: "L", t: "The first glass made by people appears in Mesopotamia, in what is now Iraq and Syria, around 3500 BC. These earliest objects were not vessels or windows but beads, small, coloured and precious. The recipe was essentially sand, which provides silica, lime, which makes the glass stable, and the ash of plants, which lowers the melting point so that the mixture can be worked in a simple furnace. Early glass was opaque and brightly coloured, and it was valued in much the same way as gemstones." },
        { s: "L", t: "The great breakthrough came in the first century BC, somewhere on the eastern Mediterranean coast, when a glassworker discovered that you could gather molten glass on the end of a hollow iron tube and blow into it. The blowing pipe transformed glass from a luxury into an everyday material. Within a century, the Roman Empire was full of glass cups, bottles and jars, and glass was cheap enough to be thrown away. The Romans also produced the first window glass, by pouring molten glass onto a flat surface. It was thick, greenish and cloudy." },
        { s: "L", t: "After the fall of Rome, the centre of the industry moved eventually to Venice. In 1291 the Venetian government ordered all the glassmakers to move their furnaces out of the city to the island of Murano. The official reason was fire. Venice was a city of wooden buildings, and furnaces that ran day and night were a constant danger. But keeping the workers on one small island also made it easier to guard their secrets. Glassmakers were forbidden to leave the Republic. On Murano, in the fifteenth century, they developed cristallo, the first truly clear, colourless glass, and later the mirrors that made Venice rich." },
        { s: "L", t: "Window glass remained difficult to make flat until surprisingly recently. For centuries it was made by spinning a blob of molten glass into a disc, or by blowing a cylinder and cutting it open. The modern solution was found in the 1950s in England, when Alastair Pilkington developed the float process. Molten glass is poured onto a bath of liquid tin. Because the glass floats on the metal, it spreads into a perfectly flat sheet with a smooth surface on both sides." },
        { s: "L", t: "So what is glass? People often say it is a liquid that flows extremely slowly, and they point to old cathedral windows that are thicker at the bottom. This is a myth. Those panes were simply made unevenly, and the glaziers tended to put the heavy edge downwards. Glass is a solid, but a peculiar one. In a crystal, the atoms are arranged in a regular, repeating pattern. In glass, the atoms are frozen in a disordered arrangement, like a liquid that has been stopped in time." },
        { s: "L", t: "The transparency of glass has given us one of the most important technologies of the modern world. An optical fibre is a strand of extraordinarily pure glass thinner than a human hair, and it carries information not as electricity but as pulses of light. The glass is so pure that a signal can travel many kilometres before it fades. Glass is also in your pocket. The screen of a modern phone is chemically strengthened: the glass is bathed in a hot salt solution, and the small sodium ions in its surface are exchanged for larger potassium ions, which squeeze the surface and make it far harder to scratch or crack." },
        { s: "L", t: "Finally, recycling. Glass has one great environmental advantage. Unlike paper or plastic, it can be melted down and reformed indefinitely with no loss of quality. Adding crushed recycled glass to the furnace also lowers the melting temperature, which saves a considerable amount of energy. The main obstacle is colour. Green, brown and clear glass must be sorted before they are melted, and mixed glass has far less value. In the second part of the lecture I'll look at how different countries have tackled that problem." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD ONLY for each answer."
          ],
          notesTitle: "Glass",
          lines: [
            "Natural glass",
            "• obsidian forms when [[31]] from a volcano cools quickly",
            "• used by early humans for blades",
            "Early manufacture",
            "• Mesopotamia, c. 3500 BC: the first objects were [[32]]",
            "• ingredients: sand, lime and plant [[33]]",
            "• early glass valued like gemstones",
            "Roman period",
            "• the blowing [[34]] made glass cheap and common",
            "• first window glass: thick and cloudy",
            "Venice",
            "• 1291: glassmakers moved to Murano because of the danger of [[35]]",
            "• cristallo: the first clear glass",
            "Flat glass",
            "• float process (1950s): molten glass poured onto liquid [[36]]",
            "What glass is",
            "• NOT a slow-moving liquid",
            "• atoms lack the regular pattern found in a [[37]]",
            "Modern uses",
            "• optical fibre carries data as pulses of [[38]]",
            "• phone screens: sodium ions in the surface replaced by [[39]] ions",
            "Recycling",
            "• can be recycled endlessly with no loss of [[40]]",
            "• crushed glass lowers furnace temperature and saves energy",
            "• problem: sorting by colour"
          ],
          questions: [
            { n: 31, answer: ["lava"] },
            { n: 32, answer: ["beads"] },
            { n: 33, answer: ["ash"] },
            { n: 34, answer: ["pipe"] },
            { n: 35, answer: ["fire"] },
            { n: 36, answer: ["tin"] },
            { n: 37, answer: ["crystal"] },
            { n: 38, answer: ["light"] },
            { n: 39, answer: ["potassium"] },
            { n: 40, answer: ["quality"] }
          ]
        }
      ]
    }
  ]
});

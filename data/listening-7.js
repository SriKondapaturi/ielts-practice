// Listening Test 7 — original content
window.LISTENING_TESTS = window.LISTENING_TESTS || [];
window.LISTENING_TESTS.push({
  id: "L7", difficulty: "harder",
  title: "Listening Test 7",
  parts: [
    {
      number: 1,
      intro: "You will hear a man phoning a catering company to arrange food for a family party.",
      speakers: { W: { name: "Caterer", gender: "female" }, M: { name: "Rob", gender: "male" } },
      script: [
        { cue: "look", range: [1, 5] },
        { s: "W", t: "Good afternoon, Meadow Lane Catering, Sandra speaking. How can I help?" },
        { s: "M", t: "Oh, hello. I'd like to arrange some catering for a party. It's my parents' wedding anniversary, their fortieth, and we're organising a surprise for them." },
        { s: "W", t: "How lovely. We do a lot of anniversary parties. Let me take some details and then we can talk about the food. Can I start with your name?" },
        { s: "M", t: "It's Rob Hargreaves." },
        { s: "W", t: "Could you spell the surname for me?" },
        { s: "M", t: "Yes, it's H-A-R-G-R-E-A-V-E-S." },
        { s: "W", t: "H-A-R-G-R-E-A-V-E-S. Thank you. And when is the party?" },
        { s: "M", t: "Well, we were going to hold it on Saturday the 17th of August, which is the actual anniversary, but my sister can't get back from Canada until the following week. So it'll be Saturday the 24th of August instead." },
        { s: "W", t: "The 24th of August. That's fine, we're free that weekend. Do you have an idea of numbers?" },
        { s: "M", t: "We've got forty people who've said yes so far. Oh, actually, I forgot my cousin and her family. They're definitely coming, so make that forty-five." },
        { s: "W", t: "Forty-five. We always allow a little extra anyway, so don't worry if one or two more turn up. And where is the party going to be?" },
        { s: "M", t: "We did think about having it at my parents' house, but the garden isn't really big enough. So we've booked the village hall in Elmford. It's got a proper kitchen, which I thought might be useful for you." },
        { s: "W", t: "The hall, perfect. A kitchen makes things much easier. Now, is there anything I need to know about what your guests can and can't eat?" },
        { s: "M", t: "A couple of people are vegetarian, but I imagine that's normal." },
        { s: "W", t: "Yes, we always include vegetarian dishes. Anything more serious? Any allergies?" },
        { s: "M", t: "Actually, yes. My aunt is allergic to nuts, quite badly. She carries medication for it, so we need to be really careful." },
        { s: "W", t: "I'll put that at the top of the order. We'll keep nuts out of everything for the event, not just her plate. It's safer that way." },
        { s: "M", t: "That's a relief, thank you." },
        { cue: "continue", range: [6, 10] },
        { s: "W", t: "Right, let's talk about the food. For a group that size we usually suggest one of two options. There's a sit-down meal with three courses, which we serve to the tables, or a buffet, where guests help themselves. The buffet is more relaxed and it works well when people want to move around and chat." },
        { s: "M", t: "I think my parents would prefer people mixing, and some of the older guests might not want to sit through three courses. Let's go for the buffet." },
        { s: "W", t: "The buffet it is. Our standard price for that is thirty-two pounds per person, but for parties of forty or more we take four pounds off, so for you it would be twenty-eight pounds a head." },
        { s: "M", t: "Twenty-eight. That's better than I expected. Does that include staff?" },
        { s: "W", t: "It includes two members of staff to set up, serve and clear away. Drinks are separate, but you're welcome to supply your own and we'll just charge for glasses." },
        { s: "M", t: "We'll probably do that. What about paying?" },
        { s: "W", t: "We ask for a deposit to secure the date. It's normally two hundred pounds, but as the event is still more than three months away, I can take a hundred and fifty now and the rest a week before the party." },
        { s: "M", t: "A hundred and fifty, fine. I can do that by card today." },
        { s: "W", t: "Lovely. Now, timing. What time are your guests arriving?" },
        { s: "M", t: "The hall is ours from four, and my parents are being brought there at seven. We'd like to eat at about half past seven." },
        { s: "W", t: "Then we'll aim to deliver and set up at five thirty. That gives us two hours, which is plenty. If we said six, it would be a bit tight." },
        { s: "M", t: "Five thirty is fine. I'll make sure someone is there to let you in." },
        { s: "W", t: "Thank you. Finally, could I have an email address so I can send you the menu and the confirmation?" },
        { s: "M", t: "Yes, it's rob at brightwave dot net." },
        { s: "W", t: "Rob at brightwave dot net. I'll send everything through this afternoon. Have a look at the menu and let me know if you'd like any changes." },
        { s: "M", t: "Will do. Thanks very much for your help, Sandra." },
        { s: "W", t: "You're welcome. I hope your parents enjoy their surprise." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [1, 10],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD AND/OR A NUMBER for each answer."
          ],
          notesTitle: "Meadow Lane Catering – Booking form",
          lines: [
            "Example   Type of event:   anniversary party",
            "Customer details",
            "• Name: Rob [[1]]",
            "• Date of party: Saturday [[2]] August",
            "• Number of guests: [[3]]",
            "• Venue: the village [[4]] in Elmford",
            "• Dietary requirements: some vegetarians; one guest allergic to [[5]]",
            "Food and payment",
            "• Type of meal: [[6]]",
            "• Price per person (with discount): £[[7]]",
            "• Deposit to pay today: £[[8]]",
            "• Delivery and set-up time: [[9]]",
            "• Email: rob@[[10]].net"
          ],
          questions: [
            { n: 1, answer: ["hargreaves"] },
            { n: 2, answer: ["24", "24th"] },
            { n: 3, answer: ["45", "forty-five"] },
            { n: 4, answer: ["hall"] },
            { n: 5, answer: ["nuts"] },
            { n: 6, answer: ["buffet"] },
            { n: 7, answer: ["28"] },
            { n: 8, answer: ["150"] },
            { n: 9, answer: ["5.30", "5:30", "530", "5.30 pm", "5:30 pm", "5.30pm", "5:30pm"] },
            { n: 10, answer: ["brightwave"] }
          ]
        }
      ]
    },
    {
      number: 2,
      intro: "You will hear a guide introducing a tour of a historic castle to a group of visitors.",
      speakers: { M: { name: "Guide", gender: "male" } },
      script: [
        { cue: "look", range: [11, 15] },
        { s: "M", t: "Good morning everyone, and welcome to Ravensmere Castle. My name's Geoff and I'll be your guide for the next hour or so. Before we set off, I'd like to give you a quick idea of the layout. You should all have one of the plans we handed out at the ticket desk." },
        { s: "M", t: "We're standing just inside the entrance now, at the bottom of the plan. The stone building immediately in front of us, the one we've just walked through, is the gatehouse. That was the only way in for six hundred years. Beyond the gatehouse is the courtyard, the big open space in the middle of the plan, and the round structure in the centre of the courtyard is the well. It's forty metres deep, so please keep children away from the edge." },
        { s: "M", t: "Now, the most important building. If you walk straight across the courtyard, past the well, you come to the great hall. It's the long building directly opposite the gatehouse, on the far side of the courtyard. That's where our tour will finish." },
        { s: "M", t: "The chapel is often confused with the small building to the left of the great hall, in the far left-hand corner. That's actually the old bakehouse. The chapel is on the other side, in the far right-hand corner of the courtyard, to the right of the great hall. You'll recognise it by the tall pointed windows." },
        { s: "M", t: "The gift shop used to be in the gatehouse itself, but it moved two years ago because the rooms were too small. It's now in the building immediately to the right of the gatehouse as you come in, the one with the blue door. So that's the first building on your right-hand side, before you reach the corner." },
        { s: "M", t: "If you need the kitchen, and I mean the medieval kitchen, not somewhere to buy a sandwich, it's on the left-hand side of the courtyard, halfway along the west wall, directly level with the well. Don't confuse it with the stables, which are the building nearer to us in the bottom left-hand corner. The kitchen has two enormous fireplaces and you can still see the hooks where the meat was hung." },
        { s: "M", t: "And finally the tower, which most people want to climb. The tower stands in the corner on your right as you enter, beyond the gift shop. The entrance to the tower is at its base, in the bottom right-hand corner of the plan. There are a hundred and twelve steps, so take your time. The building halfway along the right-hand wall, opposite the kitchen, is the armoury, which is closed for repairs this year." },
        { cue: "continue", range: [16, 20] },
        { s: "M", t: "A little history before we start walking. People often assume Ravensmere was built as a home for a noble family, or even as a royal hunting lodge, because the forest comes right up to the walls. In fact it was built in the twelfth century for a purely military reason: to control the crossing over the River Sayle, the only crossing for thirty miles. The living quarters came much later." },
        { s: "M", t: "The castle had its most dramatic moment in the sixteen-forties, during the civil war. It was held by the king's supporters and was besieged for eleven weeks. Many visitors think it was then burnt down, but there was no fire. When the war was over, Parliament ordered that the walls on the north side be pulled down so that the castle could never be defended again. What you see today is roughly two-thirds of the original building." },
        { s: "M", t: "The same family owned the castle from the sixteen-nineties right up until nineteen-fifty-two. After that it stood empty for a time, and the county council considered buying it, but in the end it was taken over by a heritage charity, and that charity still owns and runs it today. All the money from your tickets goes back into conservation." },
        { s: "M", t: "Now, a few rules. Photography is fine everywhere, including inside the hall, as long as you don't use a flash near the tapestries. You're welcome to bring your own food and eat it in the courtyard. The one thing we do insist on is that nobody goes up onto the walls without a member of staff. The walkways are narrow and in places the parapet is quite low, so you'll be taken up in small groups." },
        { s: "M", t: "Lastly, I'd encourage you to visit this year's special exhibition in the gatehouse before you leave. Last year it was about medieval cooking, and the year before it was weapons and armour, which was very popular. This year the subject is the people who were held prisoner here over the centuries, including a bishop and a famous highwayman." },
        { s: "M", t: "Right, if you'd like to follow me, we'll begin with the gatehouse." }
      ],
      questionGroups: [
        {
          type: "diagram",
          range: [11, 15],
          instructions: [
            "Label the plan below.",
            "Write the correct letter, A-H, next to Questions 11-15."
          ],
          caption: "Ravensmere Castle",
          letterOptions: ["A", "B", "C", "D", "E", "F", "G", "H"],
          svg: "<svg viewBox='0 0 620 420' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='14'>" +
            "<rect x='20' y='20' width='580' height='380' fill='#f6f3ea' stroke='#555' stroke-width='3'/>" +
            "<rect x='200' y='120' width='220' height='170' fill='#ece6d6' stroke='#999' stroke-dasharray='5 4'/><text x='270' y='145' fill='#555'>COURTYARD</text>" +
            "<circle cx='310' cy='205' r='14' fill='#fff' stroke='#555'/><text x='296' y='238' font-size='12' fill='#555'>well</text>" +
            "<rect x='250' y='300' width='120' height='45' fill='#d9c7a6' stroke='#555'/><text x='268' y='327'>GATEHOUSE</text>" +
            "<rect x='270' y='360' width='80' height='30' fill='#fff' stroke='#555'/><text x='275' y='380' font-size='12'>ENTRANCE</text>" +
            "<rect x='40' y='40' width='110' height='70' fill='#fff' stroke='#555'/><text x='90' y='80' font-weight='bold'>A</text>" +
            "<rect x='240' y='40' width='140' height='60' fill='#fff' stroke='#555'/><text x='305' y='75' font-weight='bold'>B</text>" +
            "<rect x='470' y='40' width='110' height='70' fill='#fff' stroke='#555'/><text x='520' y='80' font-weight='bold'>C</text>" +
            "<rect x='40' y='170' width='110' height='70' fill='#fff' stroke='#555'/><text x='90' y='210' font-weight='bold'>D</text>" +
            "<rect x='470' y='170' width='110' height='70' fill='#fff' stroke='#555'/><text x='520' y='210' font-weight='bold'>E</text>" +
            "<rect x='40' y='300' width='110' height='60' fill='#fff' stroke='#555'/><text x='90' y='335' font-weight='bold'>F</text>" +
            "<rect x='470' y='300' width='110' height='60' fill='#fff' stroke='#555'/><text x='520' y='335' font-weight='bold'>G</text>" +
            "<rect x='385' y='310' width='65' height='40' fill='#fff' stroke='#555'/><text x='412' y='335' font-weight='bold'>H</text>" +
            "<path d='M310 360 L310 345' stroke='#999' fill='none'/><path d='M310 300 L310 225' stroke='#999' stroke-dasharray='4 3' fill='none'/><path d='M310 185 L310 100' stroke='#999' stroke-dasharray='4 3' fill='none'/>" +
            "<text x='30' y='395' font-size='11' fill='#555'>N</text><path d='M34 388 L34 372 M30 376 L34 372 L38 376' stroke='#555' fill='none'/>" +
            "</svg>",
          questions: [
            { n: 11, text: "Great hall", answer: "B" },
            { n: 12, text: "Chapel", answer: "C" },
            { n: 13, text: "Gift shop", answer: "H" },
            { n: 14, text: "Kitchen", answer: "D" },
            { n: 15, text: "Tower entrance", answer: "G" }
          ]
        },
        {
          type: "mcq",
          range: [16, 20],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 16, text: "Ravensmere Castle was originally built in order to", options: ["house a noble family.", "serve as a royal hunting lodge.", "control a river crossing."], answer: "C" },
            { n: 17, text: "What happened to the castle after the civil war?", options: ["It was destroyed by fire.", "Part of it was deliberately demolished.", "It was sold to a new owner."], answer: "B" },
            { n: 18, text: "Who owns the castle today?", options: ["the family who bought it in the 1690s", "the county council", "a heritage charity"], answer: "C" },
            { n: 19, text: "Visitors to the castle must not", options: ["take photographs inside the hall.", "eat their own food in the courtyard.", "go onto the walls without a member of staff."], answer: "C" },
            { n: 20, text: "This year's special exhibition is about", options: ["food in the Middle Ages.", "weapons and armour.", "prisoners held at the castle."], answer: "C" }
          ]
        }
      ]
    },
    {
      number: 3,
      intro: "You will hear two engineering students, Priya and Tom, discussing a project on small wind turbines with their tutor.",
      speakers: { T: { name: "Tutor", gender: "male" }, P: { name: "Priya", gender: "female" }, M: { name: "Tom", gender: "male" } },
      script: [
        { cue: "look", range: [21, 26] },
        { s: "T", t: "Come in, both of you. So, you're designing a small wind turbine for the primary school in Hatherton. Talk me through the main decisions you've made so far." },
        { s: "P", t: "The first one was the overall type. Most small turbines are horizontal-axis, like the big ones on hills. We've gone for a vertical-axis design instead, where the blades spin around an upright shaft." },
        { s: "T", t: "And why was that? I'd have guessed noise, since it's a school." },
        { s: "M", t: "We assumed that at first, but the difference in noise turns out to be small. The real reason is the site. The turbine will be on the roof, where the wind swirls around the buildings and keeps changing direction. A horizontal-axis machine has to turn to face the wind every time, and it loses power while it's turning. A vertical-axis one doesn't care which way the wind is coming from." },
        { s: "T", t: "Good, that's a sound argument. What about the blades?" },
        { s: "P", t: "We've chosen three blades rather than two. Two would actually give slightly more power for the same cost, but a two-bladed rotor vibrates more, and that vibration is what people hear as a humming sound. Three blades run much more smoothly, so the turbine will be quieter for the classrooms underneath." },
        { s: "M", t: "And the blades themselves will be laminated timber, not carbon fibre or aluminium. Carbon fibre is lighter and stronger, but a set of blades would cost more than the rest of the project put together. Wood is about a tenth of the price." },
        { s: "T", t: "As long as you seal the wood properly. Rain is the enemy. How are you mounting it?" },
        { s: "P", t: "On a steel mast, about six metres tall, and the mast is hinged at the base. That was Tom's idea." },
        { s: "M", t: "If anything goes wrong, or when the bearings need greasing, one person can release a pin and lower the whole mast to the roof with a winch. Otherwise someone would have to climb up every time, so this way the school caretaker can look after it himself." },
        { s: "T", t: "Sensible. Now, you've mentioned an automatic brake in your plan. Is that for safety?" },
        { s: "P", t: "Not mainly, no. The brake is there for storms. In very high winds a small turbine can spin so fast that the blades or the bearings fail, so a sensor will apply the brake automatically once the wind speed goes above a set limit, and release it again when things calm down." },
        { s: "T", t: "And the mesh guard around the base of the mast?" },
        { s: "M", t: "That one is safety, pure and simple. Maintenance staff and sometimes teachers use the roof, and we don't want anyone walking into moving parts or touching the cables." },
        { cue: "continue", range: [27, 30] },
        { s: "T", t: "Right. Let me tell you what worries me about the proposal as it stands. Your budget looks reasonable and the timetable is achievable. But you've designed a turbine without knowing how much wind there actually is on that roof. You've used the regional average from the weather service, and a rooftop in a village can be very different." },
        { s: "P", t: "We did wonder about that. The problem is that proper wind measurement takes months." },
        { s: "T", t: "It does, but even four weeks of real readings would tell you a great deal. How would you get them?" },
        { s: "M", t: "We could use the online records from the airport, but that's twenty kilometres away. Or we could buy a cheap sensor, but Priya found that the accuracy of those is poor." },
        { s: "P", t: "The department has a proper anemometer that the final-year students use for their field work. If we could borrow it for a month, we'd have data we could trust." },
        { s: "T", t: "I'll sign the loan form today. Anything else worrying you?" },
        { s: "P", t: "For me, it's connecting the turbine to the school's electricity supply. I'm comfortable with the welding and the mechanical side, and the school says we don't need planning permission for something this small. But feeding power into the building's system has to be done by a qualified electrician, and we need to understand the regulations before we even design that part." },
        { s: "T", t: "I'll put you in touch with the estates department. Now, think ahead to the final report. Detailed drawings and a cost breakdown are expected, but the examiners will be most interested in one thing: how your turbine compares with a commercial small turbine of the same size. Cost, output, noise, maintenance. If you can show where yours is better and be honest about where it's worse, that's what earns the marks." },
        { s: "M", t: "That makes sense. We'll build that comparison in from the start." },
        { s: "T", t: "Good. Same time next month, then, and bring the wind data." }
      ],
      questionGroups: [
        {
          type: "matchfeatures",
          range: [21, 26],
          instructions: [
            "What reason do the students give for each of the following design decisions?",
            "Choose SIX answers from the box and write the correct letter, A-H, next to Questions 21-26."
          ],
          optionsTitle: "Reasons",
          options: [
            { letter: "A", text: "to reduce noise" },
            { letter: "B", text: "to lower the cost" },
            { letter: "C", text: "to cope with changing wind direction" },
            { letter: "D", text: "to make maintenance easier" },
            { letter: "E", text: "to protect people on the roof" },
            { letter: "F", text: "to increase the power output" },
            { letter: "G", text: "to prevent damage in very high winds" },
            { letter: "H", text: "to reduce the weight" }
          ],
          questions: [
            { n: 21, text: "vertical-axis design", answer: "C" },
            { n: 22, text: "three blades", answer: "A" },
            { n: 23, text: "wooden blades", answer: "B" },
            { n: 24, text: "hinged mast", answer: "D" },
            { n: 25, text: "automatic brake", answer: "G" },
            { n: 26, text: "mesh guard", answer: "E" }
          ]
        },
        {
          type: "mcq",
          range: [27, 30],
          instructions: ["Choose the correct letter, A, B or C."],
          questions: [
            { n: 27, text: "What does the tutor think is the main weakness of the proposal?", options: ["The budget is too high.", "There is no wind data for the site.", "The timetable is unrealistic."], answer: "B" },
            { n: 28, text: "How will the students measure the wind on the school roof?", options: ["by using records from the airport", "by buying a low-cost sensor", "by borrowing equipment from the department"], answer: "C" },
            { n: 29, text: "Priya is most concerned about", options: ["the quality of the welding.", "connecting the turbine to the school's electricity.", "getting planning permission."], answer: "B" },
            { n: 30, text: "According to the tutor, the final report should focus on", options: ["a comparison with a commercial turbine.", "detailed technical drawings.", "a full breakdown of the costs."], answer: "A" }
          ]
        }
      ]
    },
    {
      number: 4,
      intro: "You will hear part of a lecture about the psychology of colour in marketing and design.",
      speakers: { L: { name: "Lecturer", gender: "female" } },
      script: [
        { cue: "look", range: [31, 40] },
        { s: "L", t: "Good morning. Today's lecture is about colour, and specifically about the claims that marketers and designers make for it. You'll have seen the diagrams online: red means passion, blue means trust, and so on. Some of this is supported by evidence and some of it is not, and by the end of the hour I want you to be able to tell the difference." },
        { s: "L", t: "Let's start with the associations that do seem to hold up, at least in Western consumers. Red is the colour most consistently linked with excitement and urgency, which is why it appears on sale signs and clearance labels. There is also a physical effect. Several studies have found that looking at large areas of red produces a small but measurable rise in heart rate, which may be why red is used so often in fast-food branding, where the aim is to get people in and out quickly. Blue is the opposite. It's associated with calm, reliability and trust, and it has been adopted by a remarkable number of banks for exactly that reason. If you look at the logos of the twenty largest banks in Europe, more than half use blue as the main colour. Green, as you'd expect, carries ideas of nature and health. In packaging it's used to suggest that a product is natural, even when the contents are anything but." },
        { s: "L", t: "Now, the important caveat: these associations are learned, and they vary from culture to culture. White is the clearest example. In Europe and North America it stands for purity and new beginnings, which is why brides wear it. In China and several other parts of Asia, white is the colour of mourning, and it's worn at funerals. A company that launched white gift packaging across both regions discovered this the hard way. Orange is another case. In most places it is simply a cheerful, energetic colour, but in the Netherlands it is strongly associated with the royal family, and it carries a sense of national identity that it has nowhere else. So the first rule for anyone working internationally is to check the local meaning before you choose." },
        { s: "L", t: "What about actual research, rather than lists of associations? The most famous experiments were done in the nineteen-fifties by a consultant called Louis Cheskin, who was interested in packaging. In one study, he gave housewives the same washing powder in three different boxes, yellow, blue, and a mixture of the two, and asked them to use each for a few weeks. The powder was identical, but the women reported that the product in the yellow box was too strong and had damaged their clothes, while the one in the blue box was too weak. The mixed design was judged just right. Cheskin called this 'sensation transference': people transfer the feelings produced by the package to the product inside. Later work has extended this. Colour interacts with weight, for instance. The same object in dark packaging is judged to be heavier than it is in pale packaging, which is why some manufacturers of premium goods deliberately choose dark boxes, to make the product feel more substantial." },
        { s: "L", t: "Let's move to the digital world, where the evidence comes mainly from what are called A B tests, in which two versions of a web page are shown to different visitors and the results are compared. The best-known example is a software company that changed the colour of a single button, from green to red, and recorded a large increase in the number of clicks that button received. The result was widely reported as proof that red sells. But notice what had actually changed. On that page, everything else was green, so the red button stood out. What mattered was contrast, not the hue itself. A green button on a red page would probably have done just as well. That brings us to accessibility. Roughly one in twelve men has some form of colour vision deficiency, compared with about one in two hundred women, so any design that relies on colour alone to carry information will fail for a significant part of its audience. Good designers always pair colour with text, shape or position." },
        { s: "L", t: "Finally, a word about the limits of all this. Much of the published research on colour and behaviour is weaker than it looks. Many of the studies were carried out on small groups of students, often fewer than fifty, in one country, and then generalised to the whole world. Several well-known findings have failed to replicate when other researchers tried to repeat them. And the commercial studies, the ones quoted on marketing websites, are usually unpublished, so nobody can check the method. My advice is to treat colour as one factor among many, to test it in your own context, and to be suspicious of anyone who tells you that a single colour will change your sales." },
        { s: "L", t: "In the second half, we'll look at how these ideas apply to the design of a product range, using a case study from the food industry." }
      ],
      questionGroups: [
        {
          type: "notes",
          range: [31, 40],
          instructions: [
            "Complete the notes below.",
            "Write ONE WORD ONLY for each answer."
          ],
          notesTitle: "Colour in marketing and design",
          lines: [
            "Common associations (Western consumers)",
            "• red: excitement and urgency; can raise the [[31]] rate",
            "• blue: calm and trust; the main colour used by many [[32]]",
            "• green: nature and health; suggests a product is [[33]]",
            "Cultural differences",
            "• white: purity in the West, but linked to [[34]] in parts of Asia",
            "• orange: in the Netherlands, associated with the [[35]] family",
            "Research on packaging (Cheskin, 1950s)",
            "• same washing powder in different boxes: product in the yellow box judged too [[36]]",
            "• 'sensation transference'",
            "• objects in dark packaging seem [[37]] than in pale packaging",
            "Websites",
            "• changing the colour of a button greatly increased the number of [[38]]",
            "• the key factor was contrast, not hue",
            "• about one in twelve [[39]] cannot see some colours normally",
            "Limits of the research",
            "• many studies used small groups of [[40]] in one country",
            "• some findings could not be replicated"
          ],
          questions: [
            { n: 31, answer: ["heart"] },
            { n: 32, answer: ["banks"] },
            { n: 33, answer: ["natural"] },
            { n: 34, answer: ["mourning", "funerals", "death"] },
            { n: 35, answer: ["royal"] },
            { n: 36, answer: ["strong"] },
            { n: 37, answer: ["heavier", "heavy"] },
            { n: 38, answer: ["clicks"] },
            { n: 39, answer: ["men", "males"] },
            { n: 40, answer: ["students"] }
          ]
        }
      ]
    }
  ]
});

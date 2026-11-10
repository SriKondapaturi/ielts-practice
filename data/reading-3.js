// Reading Test 3 — original content
window.READING_TESTS = window.READING_TESTS || [];
window.READING_TESTS.push({
  id: "R3", difficulty: "easy",
  title: "Reading Test 3",
  passages: [
    {
      number: 1,
      title: "Towers built by the blind",
      subtitle: "What the mounds of African termites reveal about keeping cool without machines",
      wordCount: 930,
      lettered: false,
      paragraphs: [
        "Across the savannas of southern and eastern Africa, the landscape is punctuated by tall earthen spires, some of them more than five metres high. They are the work of termites of the genus Macrotermes, insects a few millimetres long whose workers are blind. If the builders were scaled up to human size, each mound would be a tower several kilometres tall, and all of it raised one mouthful of soil at a time. The material is a mixture of soil, the termites' own saliva and their dung, which dries as hard as brick. Farmers who want to clear a mound from a field generally need a pickaxe to do it.",
        "The termites do not build these structures to live in. Macrotermes species are farmers: they cultivate a fungus on combs made of chewed grass and wood, and it is the fungus, not the insects, that breaks the plant material down into food the colony can digest. A mature colony of two million termites, together with its fungus, consumes oxygen and produces heat and carbon dioxide at roughly the rate of a goat. All of this takes place in a nest that must be kept close to 30°C and almost saturated with moisture, since the fungus dies if it dries out. The mound above the nest is, in effect, a device for ventilating a busy underground farm.",
        "The layout of a typical mound is remarkably consistent. The nest itself lies at or just below ground level: a dense cluster of chambers with the queen's cell at its centre, surrounded on all sides by the fungus combs. Beneath the nest the workers excavate a cellar, a hollow space that may extend several metres down, sometimes as far as the water table, from which damp soil is carried up to moisten the nest. Above the nest rises the mound, and through its centre runs a central chimney, a wide vertical shaft that is open at the top in some species and sealed in others. Between the chimney and the outside of the mound lies a network of narrow tunnels, the surface conduits, which run just beneath the outer skin from the base to the tip of the spire. The outer wall itself is porous, riddled with holes too small to see but large enough for air to pass through.",
        "For a long time, scientists thought they understood how this arrangement worked. In the 1960s the Swiss entomologist Konrad Haller proposed that the mound functioned like a domestic radiator. Warm air produced by the nest rose up the central chimney, cooled as it passed through the surface conduits close to the outer wall, and then sank back down the outside of the nest to be warmed again, in a continuous loop driven only by the heat of the colony. Haller's theory was elegant, it appeared in textbooks for decades, and it was cited by architects in several countries who designed buildings intended to cool themselves in the same way.",
        "The theory was not tested directly until the early 2000s, when a team led by the physiologist Hannelore Brandt, working in Namibia, injected a tracer gas into living mounds and followed its movement with sensors placed in the chimney, the conduits and the nest. The results surprised them. Air in the mound was not circulating in a steady loop at all. Instead, it moved mainly in response to the wind. Gusts striking the mound pushed air into the porous wall on one side and drew it out on the other, and because wind on the savanna is turbulent rather than constant, the effect was a tidal movement, in and out, rather than a flow in a single direction. The surface conduits, Brandt argued, behave less like the pipes of a radiator and more like the passages of a lung: the mound breathes. Only at night, when the wind dropped and the outer walls cooled faster than the nest, did a slow temperature-driven circulation take over. Throughout, the concentration of carbon dioxide in the nest stayed at around four per cent, roughly a hundred times the level in the open air, but it was remarkably stable from hour to hour.",
        "The termites also maintain the structure with great speed. Daniel Okoye, an entomologist at the University of Nairobi, drilled holes five centimetres across into the walls of twenty mounds and filmed what happened. Workers appeared at the breach within minutes, and every hole had been sealed within 24 hours. Okoye found that the trigger was not light or temperature but the altered movement of air through the damaged wall, which the termites appear to detect with great sensitivity. When he covered a breach with a transparent sheet that admitted light but blocked air, the termites largely ignored it.",
        "The practical interest in all this is considerable. Engineers have long wanted buildings that stay cool without air conditioning, and the mound offers a model that uses no moving parts and no fuel. A research group led by Paul Sandström at a Swedish university has printed scaled-up copies of the conduit networks in porous ceramic and shown that they ventilate a test chamber using nothing but a light breeze. Whether such structures can be made to work in a city centre, where the wind is far less reliable than on the open savanna, remains an open question. The termites, meanwhile, go on building. Some abandoned mounds in Africa and South America are thousands of years old, and the structures that are still occupied are repaired, adjusted and extended every day by workers that have never seen the tower they maintain."
      ],
      questionGroups: [
        {
          type: "tfng",
          range: [1, 5],
          instructions: [
            "Do the following statements agree with the information given in Reading Passage 1?",
            "In boxes 1-5 on your answer sheet, write"
          ],
          legend: [
            ["TRUE", "if the statement agrees with the information"],
            ["FALSE", "if the statement contradicts the information"],
            ["NOT GIVEN", "if there is no information on this"]
          ],
          questions: [
            { n: 1, text: "Termite mounds are made from a mixture that includes the insects' own waste.", answer: "TRUE" },
            { n: 2, text: "The mound is built as a place for the termites to live in.", answer: "FALSE" },
            { n: 3, text: "The fungus grown by the termites is also eaten by other animals.", answer: "NOT GIVEN" },
            { n: 4, text: "Haller's explanation was widely accepted for many years.", answer: "TRUE" },
            { n: 5, text: "Brandt's team found that air moved through the mound in a steady, one-way flow.", answer: "FALSE" }
          ]
        },
        {
          type: "diagram",
          range: [6, 9],
          instructions: [
            "Label the diagram below.",
            "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
            "Write your answers in boxes 6-9 on your answer sheet."
          ],
          caption: "Cross-section of a Macrotermes mound",
          svg: "<svg viewBox='0 0 600 360' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='13'>" +
            "<defs><pattern id='soil' width='6' height='6' patternUnits='userSpaceOnUse'><circle cx='3' cy='3' r='0.8' fill='#999'/></pattern></defs>" +
            "<rect x='0' y='200' width='600' height='160' fill='url(#soil)'/>" +
            "<line x1='0' y1='200' x2='600' y2='200' stroke='#555' stroke-width='2'/>" +
            "<text x='8' y='216' fill='#333'>ground level</text>" +
            "<path d='M190 200 C 230 120, 270 90, 300 25 C 330 90, 370 120, 410 200 Z' fill='#d9c3a0' stroke='#6b4f2a' stroke-width='2'/>" +
            "<path d='M220 200 C 250 140, 278 110, 300 58 C 322 110, 350 140, 380 200' fill='none' stroke='#6b4f2a' stroke-width='1' stroke-dasharray='4 3'/>" +
            "<path d='M205 200 C 240 130, 272 100, 300 42 C 328 100, 360 130, 395 200' fill='none' stroke='#6b4f2a' stroke-width='1' stroke-dasharray='4 3'/>" +
            "<rect x='291' y='70' width='18' height='130' fill='#f4ecdc' stroke='#6b4f2a'/>" +
            "<ellipse cx='300' cy='245' rx='85' ry='32' fill='#f4ecdc' stroke='#6b4f2a' stroke-width='2'/>" +
            "<circle cx='300' cy='245' r='9' fill='#c98' stroke='#6b4f2a'/>" +
            "<circle cx='255' cy='240' r='7' fill='#e2b96e' stroke='#6b4f2a'/><circle cx='270' cy='258' r='7' fill='#e2b96e' stroke='#6b4f2a'/><circle cx='330' cy='258' r='7' fill='#e2b96e' stroke='#6b4f2a'/><circle cx='345' cy='238' r='7' fill='#e2b96e' stroke='#6b4f2a'/><circle cx='320' cy='230' r='7' fill='#e2b96e' stroke='#6b4f2a'/>" +
            "<ellipse cx='300' cy='318' rx='60' ry='22' fill='#f4ecdc' stroke='#6b4f2a' stroke-width='2'/>" +
            "<line x1='300' y1='277' x2='300' y2='296' stroke='#6b4f2a' stroke-width='3'/>" +
            "<line x1='309' y1='85' x2='360' y2='70' stroke='#333'/><text class='gap' data-gap='6' x='365' y='74'>6 ..........</text>" +
            "<line x1='345' y1='238' x2='400' y2='230' stroke='#333'/><text class='gap' data-gap='7' x='405' y='234'>7 ..........</text>" +
            "<line x1='360' y1='318' x2='400' y2='318' stroke='#333'/><text class='gap' data-gap='8' x='405' y='322'>8 ..........</text>" +
            "<line x1='238' y1='150' x2='160' y2='150' stroke='#333'/><text class='gap' data-gap='9' x='55' y='154'>9 ..........</text>" +
            "<line x1='410' y1='190' x2='470' y2='160' stroke='#333'/><text x='475' y='158' fill='#333'>porous outer wall</text>" +
            "<line x1='215' y1='245' x2='160' y2='245' stroke='#333'/><text x='60' y='249' fill='#333'>nest (queen's cell</text><text x='60' y='265' fill='#333'>at the centre)</text>" +
            "</svg>",
          questions: [
            { n: 6, answer: ["central chimney", "chimney"] },
            { n: 7, answer: ["fungus combs", "fungus comb", "combs"] },
            { n: 8, answer: ["cellar"] },
            { n: 9, answer: ["surface conduits", "conduits"] }
          ]
        },
        {
          type: "notes",
          range: [10, 13],
          instructions: [
            "Complete the notes below.",
            "Choose ONE WORD AND/OR A NUMBER from the passage for each answer.",
            "Write your answers in boxes 10-13 on your answer sheet."
          ],
          notesTitle: "Studying termite mounds",
          lines: [
            "Brandt (Namibia, early 2000s)",
            "• followed air movement by injecting a [[10]] gas into mounds",
            "• found air is moved mainly by the [[11]], not by heat from the nest",
            "• carbon dioxide in the nest about [[12]] times higher than in the open air, but very stable",
            "Okoye (University of Nairobi)",
            "• made holes 5 cm wide in 20 mounds",
            "• all holes repaired within [[13]] hours",
            "• termites react to changes in air movement, not to light"
          ],
          questions: [
            { n: 10, answer: ["tracer"] },
            { n: 11, answer: ["wind"] },
            { n: 12, answer: ["100", "hundred"] },
            { n: 13, answer: ["24", "twenty-four", "twenty four"] }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "The concrete that heals itself",
      subtitle: "Roman harbour walls have stood in the sea for two thousand years. Scientists are finally learning why.",
      wordCount: 900,
      lettered: true,
      paragraphs: [
        "Along the coasts of Italy, Turkey and North Africa, the remains of Roman harbours still stand where they were built: breakwaters, piers and quays that have been pounded by waves for roughly two thousand years and are, for the most part, intact. Modern concrete structures in the same water tell a different story. Sea walls built in the twentieth century from reinforced concrete commonly need major repairs after fifty years and are often demolished after a hundred. In Rome itself, the dome of the Pantheon, completed in the second century AD, remains the largest unreinforced concrete dome in the world. For engineers, the contrast poses an uncomfortable question: how did builders with no laboratories and no chemistry produce a material that outlasts our own?",
        "Part of the answer lies in the recipe. Roman writers describe a mortar made from lime and a volcanic ash called pozzolana, named after the town of Pozzuoli near Naples, where the best deposits were dug. To this binder the builders added rock fragments, often chunks of volcanic tuff, as aggregate. The lime was produced by heating limestone in kilns to around 900°C, a process that drives off carbon dioxide and leaves quicklime. Modern concrete, by contrast, is made with Portland cement, invented in Britain in the nineteenth century, which is produced by heating limestone and clay together to about 1,450°C and grinding the result to a powder. The cement is then mixed with sand, gravel and water, and in most structures it is poured around a skeleton of steel bars.",
        "For many years, the longevity of Roman marine concrete was attributed simply to the volcanic ash. The geologist Teresa Albrecht and her colleagues decided to look more closely. Over a decade, they drilled cores from Roman breakwaters at six sites around the Mediterranean and examined them with X-ray and electron microscopes. What they found was unexpected. Seawater seeping through the concrete had slowly dissolved parts of the volcanic ash, and in the spaces left behind, rare minerals had grown, including a form of aluminous tobermorite whose interlocking, plate-like crystals bind the material together. These minerals are extremely hard to produce in a laboratory, yet in the Roman walls they had formed at ordinary temperatures over centuries. In other words, the concrete had not merely survived the sea: it had been strengthened by it. In modern concrete the opposite happens. Seawater reaches the steel reinforcement inside, which rusts and expands, cracking the concrete from within.",
        "A second discovery concerned a feature that had long been dismissed. Anyone who examines Roman concrete closely will notice small white lumps, a few millimetres across, scattered through it. These lime clasts had generally been explained as the result of poor mixing, a sign that the Romans had simply not blended their ingredients well. A team led by the materials scientist Marco Ferrante, analysing samples from the walls of a small Roman town north of Rome, reached a different conclusion. The chemistry of the lumps suggested that the builders had added quicklime directly to the mix, rather than first slaking it with water as later practice required. This 'hot mixing' generates very high temperatures, which speed up the setting of the concrete and leave behind lumps of lime that remain chemically reactive. When a crack later forms and water enters, the lime in the nearest lump dissolves and then recrystallises, forming new calcium carbonate crystals that fill the crack. Ferrante's team tested the idea by making concrete both ways, cracking the samples and running water through them. In the hot-mixed samples the cracks had sealed within two weeks; in the control samples, made with slaked lime, water was still flowing freely after a month.",
        "If the method was so effective, why was it abandoned? The Romans left no technical manual precise enough to follow, and the details of the craft seem to have been passed from builder to builder rather than written down. When the western empire collapsed in the fifth century, large building projects ceased, the quarries at Pozzuoli fell silent, and within a few generations the knowledge had gone with the men who held it. Medieval masons built in stone bound with lime mortar, and concrete as a structural material was not reinvented until British engineers began experimenting with hydraulic lime for lighthouse foundations in the eighteenth century. Even then, nobody thought to ask how the Romans had done it.",
        "Today there are pressing reasons to ask. The production of cement is responsible for around eight per cent of the world's emissions of carbon dioxide, most of it released from the kilns. A binder that can be made at a lower temperature, and that produces structures lasting centuries rather than decades, is an attractive prospect, and several companies are now trialling Roman-style mixes. Yet the recipe cannot simply be copied. Roman concrete sets slowly and never reaches the compressive strength that modern engineers specify for tall buildings or bridges. It was never designed to work with steel, which is what allows modern structures to span wide gaps. And pozzolana of the right quality is found in only a few places on earth. The most likely outcome, researchers suggest, is not a return to Roman methods but a modern cement that borrows some of their chemistry, so that the sea walls of the twenty-first century might, like those of the first, repair their own wounds."
      ],
      questionGroups: [
        {
          type: "headings",
          range: [14, 18],
          instructions: [
            "Reading Passage 2 has six paragraphs, A-F.",
            "Choose the correct heading for each paragraph from the list of headings below.",
            "Write the correct number, i-ix, in boxes 14-18 on your answer sheet."
          ],
          headings: [
            "The disappearance of a building technique",
            "The spread of concrete across the Roman Empire",
            "The materials used by Roman and modern builders",
            "Why the method cannot simply be copied today",
            "Evidence that the material improves with age under water",
            "An ancient material that outlasts its modern equivalent",
            "The decline of Roman architecture in the provinces",
            "A feature previously regarded as a flaw",
            "How Roman concrete was transported by sea"
          ],
          example: { paragraph: "A", answer: "vi" },
          questions: [
            { n: 14, paragraph: "B", answer: "iii" },
            { n: 15, paragraph: "C", answer: "v" },
            { n: 16, paragraph: "D", answer: "viii" },
            { n: 17, paragraph: "E", answer: "i" },
            { n: 18, paragraph: "F", answer: "iv" }
          ]
        },
        {
          type: "summary-box",
          range: [19, 23],
          instructions: [
            "Complete the summary using the list of words, A-I, below.",
            "Write the correct letter, A-I, in boxes 19-23 on your answer sheet."
          ],
          summaryTitle: "Ferrante's lime clasts",
          text: "Ferrante's team examined the small white lumps found in Roman concrete, which had usually been explained as the result of poor [[19]]. The team suggested instead that builders had added [[20]] directly to the mix, producing very high [[21]] and leaving lumps that were still chemically active. When water later entered a [[22]], the lime in the nearest lump dissolved and formed new [[23]], which closed the gap.",
          options: [
            { letter: "A", text: "mixing" }, { letter: "B", text: "quicklime" }, { letter: "C", text: "temperatures" },
            { letter: "D", text: "crack" }, { letter: "E", text: "crystals" }, { letter: "F", text: "ash" },
            { letter: "G", text: "steel" }, { letter: "H", text: "pressure" }, { letter: "I", text: "seawater" }
          ],
          questions: [
            { n: 19, answer: "A" },
            { n: 20, answer: "B" },
            { n: 21, answer: "C" },
            { n: 22, answer: "D" },
            { n: 23, answer: "E" }
          ]
        },
        {
          type: "table",
          range: [24, 26],
          instructions: [
            "Complete the table below.",
            "Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
            "Write your answers in boxes 24-26 on your answer sheet."
          ],
          tableTitle: "Roman and modern concrete compared",
          columns: ["", "Roman concrete", "Modern concrete"],
          rows: [
            ["Binder", "lime mixed with [[24]]", "Portland cement (limestone and clay)"],
            ["Kiln temperature", "about [[25]]", "about 1,450°C"],
            ["Effect of seawater", "new minerals grow and strengthen the material", "the [[26]] rusts and expands, causing cracks"]
          ],
          questions: [
            { n: 24, answer: ["volcanic ash", "pozzolana", "ash"] },
            { n: 25, answer: ["900°C", "900", "900 degrees"] },
            { n: 26, answer: ["steel reinforcement", "steel", "reinforcement"] }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "A lesson that will not be unlearned",
      subtitle: "",
      wordCount: 1000,
      lettered: false,
      paragraphs: [
        "In a primary school classroom, a teacher hands out a short questionnaire. Do you remember faces better than names? Would you rather read instructions or have them explained? Do you fidget when you have to sit still? By the end of the lesson each child has been assigned a letter: V for visual, A for auditory, K for kinaesthetic. The letters will follow them through the year, guiding how the teacher presents material. The scene is a typical one. Surveys in Britain, the Netherlands, China and the United States have found that around nine teachers in ten believe that pupils learn better when information is delivered in their preferred 'learning style'. It is one of the most widely held ideas in education. According to most of the cognitive psychologists who have examined it, it is also unsupported by evidence.",
        "The idea has a surprisingly specific origin. In the early 1980s Graham Whitlock, a training officer with a British police force, noticed that the recruits he taught seemed to respond differently to the same material: some wanted to see a procedure demonstrated, others wanted it talked through, others wanted to try it for themselves. In 1987 he published a questionnaire, the Modality Preferences Inventory, that sorted learners into three types. It spread quickly through teacher-training colleges and corporate training departments, and by the early 2000s versions of it were in use in thousands of schools. It was free, it took ten minutes, and it told people something flattering about themselves. Above all, it offered teachers an explanation for failure that did not blame the learner: a child who did not understand had not been taught in the right channel.",
        "The most influential challenge came in 2009, when the psychologist Lena Aspinall was asked by a learned society in the United States to review the evidence. Aspinall began by setting out what a fair test would have to look like. Learners would need to be sorted by style, then randomly assigned to be taught either in a way that matched their style or in a way that did not, and finally all of them would have to sit the same test. If the theory were correct, visual learners should do better after visual teaching and auditory learners after auditory teaching: the lines on the graph should cross. Of the hundreds of studies that cited learning styles, Aspinall found only a handful with this design, and none of them produced the crossing lines. Several found the opposite. The contrast between the theory's enormous popularity and the lack of credible evidence for it was, she wrote, 'striking and disturbing'.",
        "Later experiments have reached the same conclusion from a different direction. The cognitive scientist Rachel Odum has run a series of studies in which students were given the same material in their preferred modality or in another, and has consistently found no advantage to matching. Odum's explanation is that the modality that matters is determined by the content, not by the learner. The shape of a country is visual information for everyone; a French accent is auditory information for everyone, and no amount of looking at diagrams will help a student pronounce it. People certainly differ in their abilities. But a preference for pictures does not mean a person learns a poem better from pictures, because memory stores meaning rather than the form in which the meaning arrived.",
        "Why, then, does the belief persist? In 2019 the educational researcher Tomasz Wisniewski surveyed 400 teachers in Poland and England and found that 89 per cent agreed that pupils have a dominant learning style that should guide instruction. Strikingly, those who had completed their training most recently were the most convinced, which suggests that colleges are still teaching the idea as established fact. Wisniewski points to several reasons for its survival. Teachers observe, correctly, that children differ; the theory gives those differences a tidy vocabulary. It appears to honour individuality, which is a value most teachers hold deeply. And there is a commercial industry of inventories, workshops and consultants with every reason to keep it alive. Learning styles have now joined the small group of 'neuromyths' that educators believe far more often than the general public does.",
        "Advocates have not conceded. Celia Marchbanks, an education consultant who has run learning-style workshops for twenty years, argues that the critics are attacking a caricature. No serious practitioner, she says, claims that a child should be taught only through one channel. The inventories are a starting point for conversations with students about how they study, and their chief effect is on engagement rather than on memory. The laboratory studies, in her view, measure the wrong thing: recall after a single lesson, rather than motivation and confidence over a school year. Teachers who use the approach see pupils becoming more willing to try, and that, she argues, is a result no crossover experiment will ever capture.",
        "Marchbanks has a point about the caricature, but it cuts both ways. If the theory no longer predicts that matched teaching produces better learning, then it is not clear what it predicts at all, and a theory that makes no testable claim is not a theory but a slogan. The harm, moreover, is real. A child told that she is a kinaesthetic learner may come to believe that reading is not for her. Teachers who conscientiously prepare three versions of every lesson are spending hours that could go into the approaches for which the evidence is strong: spaced practice, regular testing, and prompt feedback. The money that schools spend on inventories and training days could be spent on those instead. None of this means that lessons should be monotonous. Presenting an idea in several forms helps all students, not because each form reaches a different type of learner but because multiple representations deepen everyone's understanding. The problem is not that teachers believe their students are different. It is that they have been sold the wrong map of how."
      ],
      questionGroups: [
        {
          type: "mcq",
          range: [27, 30],
          instructions: [
            "Choose the correct letter, A, B, C or D.",
            "Write the correct letter in boxes 27-30 on your answer sheet."
          ],
          questions: [
            {
              n: 27,
              text: "The writer's main purpose in the first paragraph is to",
              options: [
                "show that teachers in different countries disagree about learning styles.",
                "describe a teaching method that has been shown to improve results.",
                "explain how students' preferences are measured in schools.",
                "introduce a widely held belief and the doubts surrounding it."
              ],
              answer: "D"
            },
            {
              n: 28,
              text: "According to the writer, one reason Whitlock's inventory became popular was that it",
              options: [
                "was based on extensive research with police recruits.",
                "offered an explanation for failure that did not blame the learner.",
                "was recommended by the education authorities.",
                "took a long time to complete carefully."
              ],
              answer: "B"
            },
            {
              n: 29,
              text: "Aspinall's review concluded that",
              options: [
                "no study had ever attempted to examine learning styles.",
                "the few studies with a suitable design did not support the theory.",
                "learning styles improved results in some subjects but not others.",
                "more funding was needed before a judgement could be made."
              ],
              answer: "B"
            },
            {
              n: 30,
              text: "Odum uses the example of a French accent to show that",
              options: [
                "some skills can only be learned by students with good hearing.",
                "auditory learners have an advantage when learning languages.",
                "the nature of the material decides how it has to be learned.",
                "most people prefer to learn new information by listening."
              ],
              answer: "C"
            }
          ]
        },
        {
          type: "matchfeatures",
          range: [31, 35],
          instructions: [
            "Look at the following statements (Questions 31-35) and the list of people below.",
            "Match each statement with the correct person, A-E.",
            "Write the correct letter, A-E, in boxes 31-35 on your answer sheet."
          ],
          optionsTitle: "List of People",
          options: [
            { letter: "A", text: "Graham Whitlock" },
            { letter: "B", text: "Lena Aspinall" },
            { letter: "C", text: "Rachel Odum" },
            { letter: "D", text: "Tomasz Wisniewski" },
            { letter: "E", text: "Celia Marchbanks" }
          ],
          questions: [
            { n: 31, text: "Belief in learning styles is strongest among those who qualified most recently.", answer: "D" },
            { n: 32, text: "Research into learning styles has measured the wrong outcomes.", answer: "E" },
            { n: 33, text: "A proper test of the theory requires learners to be taught in both matched and unmatched ways.", answer: "B" },
            { n: 34, text: "Memory retains the meaning of material rather than the form in which it was presented.", answer: "C" },
            { n: 35, text: "Observing differences between adult trainees led to the creation of a questionnaire.", answer: "A" }
          ]
        },
        {
          type: "ynng",
          range: [36, 40],
          instructions: [
            "Do the following statements agree with the claims of the writer in Reading Passage 3?",
            "In boxes 36-40 on your answer sheet, write"
          ],
          legend: [
            ["YES", "if the statement agrees with the claims of the writer"],
            ["NO", "if the statement contradicts the claims of the writer"],
            ["NOT GIVEN", "if it is impossible to say what the writer thinks about this"]
          ],
          questions: [
            { n: 36, text: "Marchbanks is right that critics sometimes exaggerate what the theory claims.", answer: "YES" },
            { n: 37, text: "Teachers who believe in learning styles are generally less effective in the classroom.", answer: "NOT GIVEN" },
            { n: 38, text: "Preparing several versions of each lesson is a good use of a teacher's time.", answer: "NO" },
            { n: 39, text: "Presenting ideas in more than one form benefits only students with a strong preference.", answer: "NO" },
            { n: 40, text: "Money spent on learning-style programmes could be used more productively elsewhere.", answer: "YES" }
          ]
        }
      ]
    }
  ]
});

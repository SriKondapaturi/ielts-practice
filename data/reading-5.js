// Reading Test 5 — original content
window.READING_TESTS = window.READING_TESTS || [];
window.READING_TESTS.push({
  id: "R5", difficulty: "standard",
  title: "Reading Test 5",
  passages: [
    {
      number: 1,
      title: "The light on the rock",
      subtitle: "How the lighthouse, and the lens inside it, kept ships off the shore",
      wordCount: 950,
      lettered: false,
      paragraphs: [
        "For as long as ships have sailed at night, sailors have needed a way of knowing where the land is. The earliest aids were simply fires lit on headlands by local people, sometimes to guide fishing boats home and sometimes to lure passing vessels onto the rocks so that their cargoes could be plundered. The first purpose-built towers appeared in the ancient Mediterranean, and the best known is the Pharos of Alexandria, completed in the third century BC, which carried a fire at its summit and stood for more than a thousand years before a series of earthquakes brought it down. Its name survives in the word for lighthouse in several European languages.",
        "A lighthouse is a tall building designed to lift a light high enough to be seen from far out at sea, and most follow a familiar pattern. At the top is the lantern room, a glazed chamber that protects the lamp from the weather. Inside it the lamp sits at the centre of the lens, which gathers the light and directs it towards the horizon. Around the outside of the lantern room runs the gallery, a narrow walkway from which the keeper could clean salt and ice from the glass. Beneath the lantern rises the tower itself, usually tapering towards the top and containing a spiral staircase and, in rotating lights, the long shaft down which the weights of the clockwork descended. The keeper's quarters were either built into the lower floors of the tower or placed in a cottage alongside it. Towers on wave-swept rocks presented a special problem, and in the eighteenth century British engineers learned to interlock the granite blocks so that each course was locked to the one below, and to give the tower a curved profile, wider at the base, that deflected the force of the sea rather than meeting it head-on.",
        "The light itself changed slowly. Open fires of wood or coal remained in use in some places into the nineteenth century, but they were expensive to feed, easily hidden by their own smoke, and useless in heavy rain. Candles were cleaner but feeble; a tower might burn two dozen at once and still be visible only a few miles away. A decisive advance came in the 1780s with the lamp devised by the Swiss inventor Aimé Argand. Argand's lamp had a hollow circular wick which allowed air to reach the flame from inside as well as outside, and a glass chimney above it that drew the air upwards. The result was a flame that burned steadily, with little smoke, and gave the light of about ten candles. Argand lamps burning whale oil, and later paraffin, lit most lighthouses for a century, until electricity replaced them.",
        "A brighter lamp solved only half the problem. Light leaves a flame in every direction, and most of it is wasted on the sky and on the sea at the foot of the tower. Early designers placed polished metal reflectors behind the flame to throw the light outwards, but the metal tarnished quickly in the salt air and had to be polished daily to remain of any use. In 1822 the physicist Augustin Fresnel designed a lens built not from a single heavy piece of glass but from a series of concentric rings, each one angled so as to bend the light passing through it into a flat horizontal beam. A lens of this kind was far lighter and thinner than a conventional lens of the same size, absorbed less light, and sent a much greater share of the lamp's output towards the horizon. The first Fresnel lens was installed in 1823 at the Cordouan lighthouse on the west coast of France, and within decades the design had been adopted around the world.",
        "The largest Fresnel lenses stood taller than a man and weighed several tonnes. Many were built in panels around a central lamp and set turning, so that the beam swept the horizon and an observer saw a flash each time a panel passed. From the 1890s the heaviest lenses were floated on a shallow bath of mercury, which allowed them to be turned with the pressure of a hand. The turning was driven by clockwork, powered by weights that descended through the tower and had to be wound back up by the keeper every few hours. Rotation also solved a second difficulty: a sailor who could see a light had to know which light it was. By varying the number of panels and the speed of rotation, engineers gave each lighthouse its own pattern of flashes, known as its character, which was printed in lists carried aboard ships.",
        "Behind all this stood the keeper, whose work was less romantic than it is often remembered. Wicks had to be trimmed, the lens and the lantern glass polished, the clockwork wound, the weather and passing ships recorded in a log, and a watch kept all night. At rock stations, relief crews might be unable to land for weeks in bad weather. After an incident at a Welsh rock lighthouse in 1801, when one of the two keepers died and his colleague was left alone with the body for weeks, it became the rule in Britain that every offshore station was staffed by three men. Electric light, automatic lamp changers and timers made the keeper's tasks unnecessary one by one, and by the end of the twentieth century the lighthouses of Britain and most other countries were unmanned. Satellite navigation has since reduced their importance further, yet most are still maintained as a check on electronic systems that can fail, and many of the great Fresnel lenses have found a second life in museums."
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
            { n: 1, text: "The Pharos of Alexandria survived for more than a thousand years.", answer: "TRUE" },
            { n: 2, text: "Towers built on offshore rocks were shaped to meet the force of the waves directly.", answer: "FALSE" },
            { n: 3, text: "The British method of building offshore towers was copied by engineers in other countries.", answer: "NOT GIVEN" },
            { n: 4, text: "The Argand lamp produced a great deal of smoke.", answer: "FALSE" },
            { n: 5, text: "Metal reflectors lost their effectiveness unless they were cleaned regularly.", answer: "TRUE" }
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
          caption: "Cross-section of a lighthouse with a rotating light",
          svg: "<svg viewBox='0 0 640 420' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='13'>" +
            "<line x1='40' y1='380' x2='600' y2='380' stroke='#555' stroke-width='2'/>" +
            "<polygon points='250,380 390,380 356,135 284,135' fill='#e8e4dc' stroke='#444' stroke-width='1.5'/>" +
            "<rect x='262' y='127' width='116' height='9' fill='#777' stroke='#333'/>" +
            "<line x1='266' y1='127' x2='266' y2='108' stroke='#333'/><line x1='374' y1='127' x2='374' y2='108' stroke='#333'/><line x1='266' y1='110' x2='374' y2='110' stroke='#333'/>" +
            "<line x1='290' y1='127' x2='290' y2='110' stroke='#333' stroke-width='0.7'/><line x1='350' y1='127' x2='350' y2='110' stroke='#333' stroke-width='0.7'/>" +
            "<rect x='280' y='68' width='80' height='59' fill='#eef6fb' stroke='#444' stroke-width='1.5'/>" +
            "<line x1='300' y1='68' x2='300' y2='127' stroke='#999' stroke-width='0.7'/><line x1='340' y1='68' x2='340' y2='127' stroke='#999' stroke-width='0.7'/>" +
            "<polygon points='274,68 366,68 320,38' fill='#8a6d3b' stroke='#444'/>" +
            "<rect x='302' y='80' width='36' height='40' rx='9' fill='none' stroke='#2a6f97' stroke-width='3'/>" +
            "<line x1='306' y1='90' x2='334' y2='90' stroke='#2a6f97' stroke-width='0.8'/><line x1='306' y1='100' x2='334' y2='100' stroke='#2a6f97' stroke-width='0.8'/><line x1='306' y1='110' x2='334' y2='110' stroke='#2a6f97' stroke-width='0.8'/>" +
            "<rect x='316' y='104' width='8' height='12' fill='#555'/><path d='M320 92 q6 6 0 12 q-6 -6 0 -12z' fill='#f2a33c' stroke='#c47a12'/>" +
            "<rect x='312' y='140' width='16' height='170' fill='#f7f5f0' stroke='#888' stroke-dasharray='3 3'/>" +
            "<line x1='320' y1='140' x2='320' y2='255' stroke='#333'/><rect x='313' y='255' width='14' height='24' fill='#666' stroke='#222'/>" +
            "<rect x='262' y='318' width='116' height='62' fill='#fbf7ee' stroke='#666'/>" +
            "<rect x='272' y='350' width='34' height='14' fill='#c9b79c' stroke='#555'/><rect x='272' y='344' width='10' height='6' fill='#c9b79c' stroke='#555'/>" +
            "<rect x='330' y='330' width='16' height='16' fill='#eef6fb' stroke='#555'/><line x1='338' y1='330' x2='338' y2='346' stroke='#555'/><line x1='330' y1='338' x2='346' y2='338' stroke='#555'/>" +
            "<line x1='280' y1='78' x2='200' y2='56' stroke='#333'/><text x='110' y='52' fill='#333'>lantern room</text>" +
            "<line x1='320' y1='116' x2='200' y2='110' stroke='#333'/><text x='168' y='114' fill='#333'>lamp</text>" +
            "<line x1='338' y1='84' x2='420' y2='96' stroke='#333'/><text class='gap' data-gap='6' x='426' y='100'>6 ..........</text><text x='426' y='116' fill='#333' font-size='11'>sends light towards the horizon</text>" +
            "<line x1='262' y1='131' x2='200' y2='160' stroke='#333'/><text class='gap' data-gap='7' x='100' y='164'>7 ..........</text><text x='100' y='180' fill='#333' font-size='11'>for cleaning the glass</text>" +
            "<line x1='380' y1='230' x2='420' y2='230' stroke='#333'/><text x='426' y='234' fill='#333'>tower</text>" +
            "<line x1='327' y1='267' x2='420' y2='290' stroke='#333'/><text class='gap' data-gap='8' x='426' y='294'>8 ..........</text><text x='426' y='310' fill='#333' font-size='11'>of the clockwork, wound up by the keeper</text>" +
            "<line x1='262' y1='349' x2='200' y2='349' stroke='#333'/><text class='gap' data-gap='9' x='100' y='353'>9 ..........</text><text x='100' y='369' fill='#333' font-size='11'>on the lower floors</text>" +
            "</svg>",
          questions: [
            { n: 6, answer: ["lens", "the lens", "Fresnel lens"] },
            { n: 7, answer: ["gallery", "the gallery", "walkway", "narrow walkway", "the walkway"] },
            { n: 8, answer: ["weights", "the weights"] },
            { n: 9, answer: ["keeper's quarters", "keepers quarters", "keeper's quarter"] }
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
          notesTitle: "Lighting the lighthouse",
          lines: [
            "Open fires",
            "• costly; hidden by smoke; no use in heavy rain",
            "Candles",
            "• clean but weak",
            "Argand lamp (1780s)",
            "• hollow wick; glass [[10]] above the flame draws air upwards",
            "• light equal to about [[11]] candles",
            "Fresnel lens",
            "• rings of glass bend light into a horizontal beam",
            "• first fitted at Cordouan in [[12]]",
            "• largest lenses later floated on [[13]] so they could turn easily"
          ],
          questions: [
            { n: 10, answer: ["chimney"] },
            { n: 11, answer: ["ten", "10"] },
            { n: 12, answer: ["1823"] },
            { n: 13, answer: ["mercury"] }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "The secret of the Cremona violins",
      subtitle: "Scientists have spent decades trying to explain why instruments made three hundred years ago still sound so good",
      wordCount: 950,
      lettered: true,
      paragraphs: [
        "In the small city of Cremona in northern Italy, between roughly 1650 and 1750, three families of craftsmen, the Amati, the Guarneri and above all the Stradivari, made stringed instruments that musicians have prized ever since. Of the thousand or more violins that Antonio Stradivari is thought to have built, around 650 survive, and the finest of them change hands for sums that rival the price of a painting by an old master. Players describe their sound as warm, complex and able to fill a concert hall without effort. For almost three centuries makers have tried to reproduce it, and for almost as long scientists have tried to explain it. The puzzle is not whether these violins are remarkable, which few musicians doubt, but which of their many features matters most.",
        "One popular explanation looks not at the makers but at the weather. The top plate of a violin, the part that does most to produce its sound, is almost always made of spruce, and the spruce used in Cremona came from forests in the Alps to the north of the city. The dendrochronologist Hélène Duchamp, who dates wood by the pattern of its annual growth rings, examined the tops of more than thirty Cremonese instruments and matched their rings to a period of exceptionally cold winters that gripped Europe from about 1645 to 1715. Trees grew slowly in those decades, and their rings were narrow and strikingly even. Duchamp argues that this gave the makers wood of a uniformity that no modern forester can supply. Critics reply that spruce of similar character can still be found in cold mountain forests today.",
        "Whether the wood really is different can now be tested without harming a priceless instrument. Ulrike Falkenrath, a radiologist with an interest in acoustics, borrowed a CT scanner from the hospital where she worked and passed five classical Cremonese violins and eight modern ones through it. The scans measured the density of the wood at thousands of points. The average density of the old and new spruce turned out to be almost identical. What differed was the variation within each piece: in the old wood, the dense late-season growth and the lighter spring growth were much closer in density than they were in the modern samples. Falkenrath suggests that wood of this kind vibrates more evenly across the whole plate, though she notes that a scan cannot tell her whether the difference is the result of climate, age or treatment.",
        "Treatment is exactly what the chemist Marco Severini believes he has found. Working with tiny shavings taken from the interiors of instruments during repair, he analysed the wood of several Cremonese violins and compared it with wood of the same species from furniture of the same period. The violin wood contained traces of minerals, including borax, copper and alum, that were absent from the furniture. Severini's explanation is that the makers soaked their timber in mineral solutions, not to improve its sound but to protect it from woodworm, a constant threat in the damp towns of the Po valley. If so, the treatment may have had an acoustic effect that nobody intended, because the salts would have stiffened the cell walls of the wood and altered the way it resonated.",
        "The oldest theory of all concerns the varnish. Stories of a secret recipe, lost when the last of the great makers died, have circulated since the eighteenth century. Rachel Oyelaran, a conservation scientist, set out to test the legend by analysing microscopic samples of varnish from four Stradivari instruments. She found an entirely ordinary two-layer coating: a thin film of oil applied directly to the wood, and above it a layer of oil and pine resin coloured with a common red pigment. There was no unusual ingredient, and the layers were so thin that, in her view, they could have had little influence on the sound. The varnish, she concluded, was simply the kind that any good furniture maker of the time would have used.",
        "A more unsettling line of research asks whether the superiority of the old instruments can be heard at all. The psychologist Bartosz Wieliczko arranged for twenty professional soloists to play six violins, three of them by Stradivari or Guarneri and three made within the previous decade, in a darkened hall. The players wore welding goggles so that they could not see the instruments, and the violins were dabbed with scent so that they could not be identified by smell. Asked which they would most like to take home, the majority chose a modern instrument, and when asked to say which were old, they guessed correctly no more often than chance would predict. Wieliczko does not conclude that the old violins are poor instruments, only that part of what listeners hear in them is what they expect to hear.",
        "None of these findings rules out the others, and the most likely answer is that several things are true at once. The wood of the Cremonese violins may have been unusually even, it may have been treated, and it has certainly changed over three centuries: the hemicellulose that binds the fibres of wood breaks down slowly with age, leaving the plates lighter and stiffer than they were when new. The instruments have also been played, more or less continuously, for longer than any modern violin has existed, and adjusted by generations of expert hands. A maker working today can copy the shape, the thickness of the plates and even the mineral treatment, but cannot supply the three hundred years. Whether that time matters as much as the reputation that has grown up alongside it is a question that goggles and scanners have not yet settled."
      ],
      questionGroups: [
        {
          type: "headings",
          range: [14, 19],
          instructions: [
            "Reading Passage 2 has seven paragraphs, A-G.",
            "Choose the correct heading for each paragraph from the list of headings below.",
            "Write the correct number, i-ix, in boxes 14-19 on your answer sheet."
          ],
          headings: [
            "A test that removed the influence of expectation",
            "The weather conditions that shaped the trees",
            "Why old instruments are so costly to insure",
            "An ordinary coating with no hidden ingredient",
            "Evidence of deliberate treatment with minerals",
            "A modern maker who has matched the old masters",
            "Measuring the wood without damaging the instrument",
            "Several explanations that may all be partly true",
            "A centuries-old puzzle that still attracts scientists"
          ],
          example: { paragraph: "A", answer: "ix" },
          questions: [
            { n: 14, paragraph: "B", answer: "ii" },
            { n: 15, paragraph: "C", answer: "vii" },
            { n: 16, paragraph: "D", answer: "v" },
            { n: 17, paragraph: "E", answer: "iv" },
            { n: 18, paragraph: "F", answer: "i" },
            { n: 19, paragraph: "G", answer: "viii" }
          ]
        },
        {
          type: "matchinfo",
          range: [20, 23],
          paragraphsRange: "A-G",
          instructions: [
            "Reading Passage 2 has seven paragraphs, A-G.",
            "Which paragraph contains the following information?",
            "Write the correct letter, A-G, in boxes 20-23 on your answer sheet."
          ],
          questions: [
            { n: 20, text: "a reference to the prices that old violins reach today", answer: "A" },
            { n: 21, text: "a possible reason, unconnected with sound, why the wood was treated", answer: "D" },
            { n: 22, text: "a description of how performers were prevented from recognising the instruments", answer: "F" },
            { n: 23, text: "a mention of a change that takes place in wood as it gets older", answer: "G" }
          ]
        },
        {
          type: "sentence",
          range: [24, 26],
          instructions: [
            "Complete the sentences below.",
            "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
            "Write your answers in boxes 24-26 on your answer sheet."
          ],
          questions: [
            { n: 24, text: "Duchamp linked the growth rings of the Cremonese spruce to a period of exceptionally ______ in Europe.", answer: ["cold winters"] },
            { n: 25, text: "Falkenrath examined the violins using a ______ borrowed from a hospital.", answer: ["CT scanner", "scanner"] },
            { n: 26, text: "According to Severini, the purpose of the mineral treatment was to protect the wood against ______.", answer: ["woodworm"] }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Can money buy happiness?",
      subtitle: "",
      wordCount: 1000,
      lettered: false,
      paragraphs: [
        "Few questions have been asked so often, or answered so confidently, as whether money makes people happy. Folk wisdom says that it does not, and points to the miserable millionaire; common sense says that it does, and points to the anxieties of poverty. For most of the twentieth century economists avoided the question altogether, on the grounds that happiness could not be measured and that what people chose to buy revealed their preferences well enough. That changed when large surveys began to ask people directly how satisfied they were with their lives, usually on a scale from zero to ten, and researchers set the answers against income. The results have produced one of the liveliest disputes in modern social science, and one in which the evidence, properly read, points in a clearer direction than the dispute suggests.",
        "The argument began in 1974, when the economist Nathaniel Brierley published a comparison of survey data from more than a dozen countries. Within any one country, he found, richer people were on average happier than poorer ones. Yet when he compared countries, the richer nations were not noticeably happier than the poorer ones, and when he followed a single country over time, decades of rising income had produced no rise in reported happiness at all. Brierley's explanation was that what matters is not how much a person has but how much they have relative to others. If everyone's income doubles, everyone's position in the ranking stays the same, and so does their satisfaction. The finding, known as the Brierley paradox, was taken by many as proof that economic growth was a treadmill, and it has been quoted ever since by those who argue that governments should pursue well-being rather than wealth.",
        "The paradox did not survive the arrival of better data unscathed. In the 2000s the economists Sofia Marchetti and Pawel Ostrowski assembled surveys covering more than 130 countries and found a strong and consistent relationship between national income and average life satisfaction, with no sign of a level above which further income ceased to matter. The relationship was logarithmic: each doubling of income added roughly the same amount of satisfaction, whether it took a household from 10,000 to 20,000 dollars a year or from 100,000 to 200,000. Brierley's samples, they argued, had been too small and too dominated by a handful of wealthy nations to detect the pattern. Where he had seen a flat line, they saw a slope that merely became gentler the further one travelled along it.",
        "Part of the disagreement, it turned out, lay in what was being measured. The psychologist Yusuf Kalani drew a distinction between two things that the word happiness is used to cover. One is life evaluation, the considered judgement a person makes when asked to rate their life as a whole. The other is emotional well-being, the frequency of pleasant and unpleasant feelings in the course of an ordinary day. Analysing nearly half a million responses to a daily survey in the United States, Kalani found that life evaluation rose steadily with income, exactly as Marchetti and Ostrowski had reported. Emotional well-being, however, rose only up to an annual household income of about 75,000 dollars and then levelled off. Beyond that point people continued to judge their lives more favourably but did not feel noticeably better from one day to the next. Money, on this account, buys the sense of a life going well, not more good moods.",
        "Why should extra money deliver so little beyond a certain point? Two mechanisms have been proposed, and both have support. The first is adaptation. The economist Meera Venkataraman followed several hundred lottery winners for ten years and found that their satisfaction, which jumped sharply in the first year, had drifted most of the way back to its old level within five. People, she concluded, grow used to a larger house and a better car much as they grow used to a change in the weather. The second mechanism is comparison, the force that Brierley had identified. Venkataraman also showed that a rise in the income of a person's neighbours lowered that person's satisfaction almost as much as an equal rise in their own income raised it. Being richer, it seems, matters partly because it means being richer than someone.",
        "If the amount of money has limits, the manner of spending it may matter more than either side of the debate has allowed. The behavioural scientist Hanne Bjerke has spent a decade testing how different purchases affect well-being. Money spent on experiences, such as travel, concerts or meals with friends, produces more lasting satisfaction than the same money spent on objects, partly because experiences are harder to compare with those of other people and partly because they are remembered more fondly than they were lived. Money spent to buy time, by paying someone else to clean the house or by living closer to work, raises satisfaction in almost everyone who does it, yet in Bjerke's surveys only about half of those who could afford to do so actually did. And money given away produces a measurable improvement in the mood of the giver, an effect she has recorded in countries as different as Canada, Uganda and India.",
        "Taken together, the evidence supports neither the comforting claim that money is irrelevant to happiness nor the cynical one that more is always better. Money does buy happiness, and it goes on doing so at every level of income, but each additional pound buys less than the one before, and how it is spent and against whom it is measured can matter more than how much of it there is. The poor gain enormously from having more; the rich gain a little, and chiefly in how they judge their lives rather than in how they feel. The question that has been asked for so long turns out to have been the wrong one. It is not whether money can buy happiness, but how much, for whom, and spent on what."
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
              text: "What does the writer say about economists for most of the twentieth century?",
              options: [
                "They regarded income as the best available measure of happiness.",
                "They believed that people's purchases showed what they wanted.",
                "They disagreed about how happiness should be measured.",
                "They were the first to ask people to rate their own satisfaction."
              ],
              answer: "B"
            },
            {
              n: 28,
              text: "The Brierley paradox was based on the observation that",
              options: [
                "richer countries were clearly happier than poorer ones.",
                "within a country, income made no difference to happiness.",
                "rising national income over time brought no rise in happiness.",
                "the happiest people were those who compared themselves least with others."
              ],
              answer: "C"
            },
            {
              n: 29,
              text: "According to Marchetti and Ostrowski, Brierley's conclusions were unreliable because",
              options: [
                "his data came from too few countries.",
                "his method of measuring happiness was faulty.",
                "he ignored differences between rich and poor individuals.",
                "he assumed that income and happiness were unrelated."
              ],
              answer: "A"
            },
            {
              n: 30,
              text: "What did Kalani's study show about people with household incomes above 75,000 dollars?",
              options: [
                "They rated their lives no more highly than people on lower incomes.",
                "They experienced fewer unpleasant feelings than any other group.",
                "Their day-to-day feelings did not improve as their income rose.",
                "They found it harder to judge their own happiness accurately."
              ],
              answer: "C"
            }
          ]
        },
        {
          type: "matchfeatures",
          range: [31, 35],
          instructions: [
            "Look at the following findings (Questions 31-35) and the list of researchers below.",
            "Match each finding with the correct researcher or researchers, A-E.",
            "Write the correct letter, A-E, in boxes 31-35 on your answer sheet."
          ],
          optionsTitle: "List of Researchers",
          options: [
            { letter: "A", text: "Nathaniel Brierley" },
            { letter: "B", text: "Marchetti and Ostrowski" },
            { letter: "C", text: "Yusuf Kalani" },
            { letter: "D", text: "Meera Venkataraman" },
            { letter: "E", text: "Hanne Bjerke" }
          ],
          questions: [
            { n: 31, text: "The effect of extra income on satisfaction weakens gradually but never disappears.", answer: "B" },
            { n: 32, text: "People become less satisfied when those living near them become richer.", answer: "D" },
            { n: 33, text: "Paying for experiences brings more lasting benefit than buying possessions.", answer: "E" },
            { n: 34, text: "How people judge their lives and how they feel each day respond differently to income.", answer: "C" },
            { n: 35, text: "A person's position relative to others matters more than the actual amount they earn.", answer: "A" }
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
            { n: 36, text: "The evidence on money and happiness is less clear than the arguments about it suggest.", answer: "NO" },
            { n: 37, text: "Governments should measure well-being rather than economic growth.", answer: "NOT GIVEN" },
            { n: 38, text: "Giving money to others improves the mood of the person who gives it.", answer: "YES" },
            { n: 39, text: "Most people who can afford to pay for time-saving services choose to do so.", answer: "NO" },
            { n: 40, text: "The traditional question about money and happiness was badly framed.", answer: "YES" }
          ]
        }
      ]
    }
  ]
});

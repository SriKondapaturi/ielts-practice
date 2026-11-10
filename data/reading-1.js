// Reading Test 1 — original content
window.READING_TESTS = window.READING_TESTS || [];
window.READING_TESTS.push({
  id: "R1", difficulty: "harder",
  title: "Reading Test 1",
  passages: [
    {
      number: 1,
      title: "Harvesting the fog",
      subtitle: "How some of the driest communities on Earth draw drinking water from the clouds",
      wordCount: 860,
      lettered: false,
      paragraphs: [
        "On the coastal hills of northern Chile, in a region where some weather stations have never recorded a single millimetre of rain, a line of tall rectangular frames stands facing the Pacific Ocean. Each frame holds a sheet of fine plastic mesh, and each morning the mesh drips steadily into a gutter fixed along its lower edge. The water is not rain. It has been captured from the camanchaca, the dense fog that rolls in from the sea almost every night and dissolves again by mid-morning. For the villagers of Chungungo, who once depended on water delivered by lorry, these 'fog catchers' briefly provided the whole community with a reliable supply.",
        "The principle behind fog harvesting is simple. Fog consists of tiny water droplets, typically between one and forty micrometres across, that are too light to fall as rain. When wind pushes the fog through a mesh, some of the droplets strike the fibres and cling to them. As more droplets arrive, they merge into larger drops which eventually become heavy enough to run down the mesh under gravity. At the bottom they are collected in a gutter, carried by a pipe into a storage tank, and from there distributed to homes or fields. No pump is needed if the tank is placed below the collectors, and the only energy involved is supplied by the wind.",
        "The idea is far older than the Chilean project. Travellers in the Canary Islands described in the sixteenth century a 'fountain tree' on the island of El Hierro whose leaves condensed so much fog that the islanders collected the drips in pits dug beneath it. In the Atacama Desert, archaeologists have found that pre-Columbian communities planted rows of trees on ridges in positions that appear chosen to intercept fog. What the modern collectors added was a measurable, repeatable design. The first systematic experiments were carried out in the 1960s by the Chilean physicist Carlos Espinosa, who tested different materials on a hilltop near the city of Antofagasta and settled on a woven polypropylene mesh of the type used to shade crops.",
        "Chungungo's system, installed in 1992 with support from a Canadian development agency, consisted of around ninety collectors, each measuring twelve metres wide and four metres high. Together they produced an average of 15,000 litres a day, and on the foggiest days more than 100,000 litres. For a village of about 300 people this was more than enough, and for several years it transformed daily life. Gardens appeared, a small fish-processing business opened, and the population grew. The project failed, however, for reasons that had little to do with the technology. Responsibility for maintenance was handed to the local authority, which lacked the funds and the expertise to repair torn mesh and blocked gutters, and the village eventually returned to water brought by lorry.",
        "That experience shaped later projects. Robert Schemenauer, a cloud physicist who had worked on the Chungungo scheme, went on to co-found FogQuest, a non-profit organisation that has since installed collectors in Guatemala, Eritrea, Nepal and Morocco. The organisation now insists that a community must manage its own system from the outset and that a trained local technician must be in place before a single collector is erected. In the Anti-Atlas mountains of south-western Morocco, a project led by the association Dar Si Hmad supplies around 400 people in five villages. Its collectors use a newer mesh, developed in Germany, which withstands strong winds and yields roughly three times more water per square metre than the material used in Chile.",
        "Researchers are still refining the mesh itself. A team at the Massachusetts Institute of Technology found that the ideal fibres are about three times thicker than a human hair and spaced so that the holes are roughly twice the width of the fibres. If the holes are too large, droplets pass straight through; if they are too small, water clogs the mesh and the wind simply flows around it. Coating the fibres with a chemical that repels water helps the drops to slide off more quickly, which matters because a drop that lingers on the mesh can be blown away again before it reaches the gutter. In laboratory tests the team's optimised mesh collected five times more water than the standard design.",
        "Nobody suggests that fog will solve the water problems of large cities. Even the best collectors yield only a few litres per square metre of mesh each day, and they work only where fog is frequent, where there is a steady wind, and where the site is high enough to be inside the cloud for much of the night. Those conditions exist along the coastal deserts of Chile and Peru, parts of southern Africa, the Canary Islands and Oman, and on the dry slopes of several mountain ranges. In such places, however, the appeal of the technology is clear: it requires no fuel, its parts can be made and repaired locally, and the water it produces is generally clean enough to drink without treatment. For a small village at the edge of a desert, a line of mesh frames on the hill above may still be the cheapest well there is."
      ],
      questionGroups: [
        {
          type: "tfng",
          range: [1, 6],
          instructions: [
            "Do the following statements agree with the information given in Reading Passage 1?",
            "In boxes 1-6 on your answer sheet, write"
          ],
          legend: [
            ["TRUE", "if the statement agrees with the information"],
            ["FALSE", "if the statement contradicts the information"],
            ["NOT GIVEN", "if there is no information on this"]
          ],
          questions: [
            { n: 1, text: "Some parts of northern Chile have never had any recorded rainfall.", answer: "TRUE" },
            { n: 2, text: "Fog droplets are heavier than raindrops.", answer: "FALSE" },
            { n: 3, text: "The design can operate without any source of power apart from the wind.", answer: "TRUE" },
            { n: 4, text: "The islanders of El Hierro sold the water collected from the fountain tree.", answer: "NOT GIVEN" },
            { n: 5, text: "The material Espinosa settled on had been developed specifically for collecting fog.", answer: "FALSE" },
            { n: 6, text: "The Chungungo project ended because the mesh wore out faster than expected.", answer: "FALSE" }
          ]
        },
        {
          type: "diagram",
          range: [7, 10],
          instructions: [
            "Label the diagram below.",
            "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
            "Write your answers in boxes 7-10 on your answer sheet."
          ],
          caption: "A fog collector",
          svg: "<svg viewBox='0 0 640 360' xmlns='http://www.w3.org/2000/svg' font-family='Arial' font-size='13'>" +
            "<defs><pattern id='mesh' width='8' height='8' patternUnits='userSpaceOnUse'><path d='M0 0L8 8M8 0L0 8' stroke='#777' stroke-width='0.6'/></pattern></defs>" +
            "<line x1='60' y1='300' x2='600' y2='300' stroke='#555' stroke-width='2'/>" +
            "<rect x='150' y='60' width='10' height='240' fill='#8a6d3b'/><rect x='390' y='60' width='10' height='240' fill='#8a6d3b'/>" +
            "<rect x='160' y='70' width='230' height='150' fill='url(#mesh)' stroke='#444'/>" +
            "<rect x='150' y='222' width='250' height='12' fill='#9ab' stroke='#345'/>" +
            "<path d='M400 234 L430 234 L430 262 L520 262' fill='none' stroke='#345' stroke-width='3'/>" +
            "<rect x='520' y='240' width='70' height='60' fill='#cde' stroke='#345'/>" +
            "<path d='M30 120 q 20 -10 40 0 q 20 10 40 0' stroke='#999' fill='none' stroke-width='3'/><path d='M30 150 q 20 -10 40 0 q 20 10 40 0' stroke='#999' fill='none' stroke-width='3'/>" +
            "<text x='30' y='105' fill='#333'>fog carried by the</text>" +
            "<text class='gap' data-gap='7' x='30' y='185'>7 ..........</text>" +
            "<text x='250' y='40' fill='#333'>droplets caught on the</text>" +
            "<text class='gap' data-gap='8' x='250' y='56'>8 ..........</text>" +
            "<line x1='275' y1='240' x2='275' y2='275' stroke='#333'/><text class='gap' data-gap='9' x='200' y='292'>9 ..........</text>" +
            "<text class='gap' data-gap='10' x='500' y='330'>10 ..........</text>" +
            "</svg>",
          questions: [
            { n: 7, answer: ["wind"] },
            { n: 8, answer: ["mesh", "plastic mesh", "fibres"] },
            { n: 9, answer: ["gutter"] },
            { n: 10, answer: ["storage tank", "tank"] }
          ]
        },
        {
          type: "notes",
          range: [11, 13],
          instructions: [
            "Complete the notes below.",
            "Choose ONE WORD AND/OR A NUMBER from the passage for each answer.",
            "Write your answers in boxes 11-13 on your answer sheet."
          ],
          notesTitle: "Fog collection projects",
          lines: [
            "Chungungo, Chile (1992)",
            "• about 90 collectors; average output 15,000 litres a day",
            "• project later failed: the local authority could not pay for [[11]]",
            "Morocco (Dar Si Hmad)",
            "• supplies about [[12]] people in five villages",
            "• new German mesh gives three times more water",
            "MIT laboratory research",
            "• fibres coated with a chemical that repels water",
            "• best mesh collected [[13]] times more water than the standard type"
          ],
          questions: [
            { n: 11, answer: ["maintenance", "repairs"] },
            { n: 12, answer: ["400", "four hundred"] },
            { n: 13, answer: ["5", "five"] }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Why we forget",
      subtitle: "Forgetting is usually seen as a failure of memory. Some psychologists now argue that it is one of memory's most useful features.",
      wordCount: 900,
      lettered: true,
      paragraphs: [
        "Most people regard forgetting as a weakness: a name that will not come when it is needed, a fact learned for an examination and gone a week later, the location of the car in a multi-storey car park. For more than a century, researchers treated it in the same way, as the gradual decay of a trace that was once clear. The German psychologist Hermann Ebbinghaus, who in the 1880s memorised long lists of nonsense syllables and then tested himself at intervals, produced the famous 'forgetting curve', which shows that most of what we learn is lost within hours, and that the loss then slows down. His conclusion was that memories simply fade unless they are refreshed.",
        "The decay theory has an intuitive appeal, but it has proved difficult to confirm. In the 1920s, two American researchers, John Jenkins and Karl Dallenbach, asked students to learn lists of syllables either just before going to sleep or at the start of the day. When tested eight hours later, the students who had slept remembered almost twice as much as those who had been awake, even though the same amount of time had passed. If memories decayed at a steady rate, the two groups should have performed equally. The difference suggested that forgetting is caused less by the passage of time than by what happens during it.",
        "What happens, in most cases, is that we learn other things. Psychologists call this interference, and they distinguish two kinds. Retroactive interference occurs when new information makes it harder to recall something learned earlier: a person who moves house may find, after a few months, that the old telephone number has become almost impossible to retrieve. Proactive interference works in the opposite direction, when old habits block new learning, as when a driver who has switched to a new car keeps reaching for the gear lever in the place where it used to be. In both cases the memory is probably still stored. What has been lost is the ability to find it among its competitors.",
        "Interference explains why some memories are hard to retrieve, but it does not explain why so many disappear entirely. Here, recent work in neuroscience has prompted a different view. In 2017, Blake Richards and Paul Frankland of the University of Toronto reviewed evidence that the brain actively removes memories, through processes that weaken the connections between neurons and that generate new cells in the hippocampus, a structure essential for forming memories. The growth of new neurons, which was once assumed to improve memory, appears in some experiments to disrupt the memories that are already there. Richards and Frankland argued that this is not a defect. The purpose of memory, they wrote, is not to store the past accurately but to guide behaviour in the present, and a brain that remembered everything would be badly equipped to do that.",
        "There are several reasons why this might be so. A memory system that kept every detail would struggle to generalise: it would recognise the particular dog it had met, but not dogs in general. Forgetting the specifics allows the brain to extract what is common to many experiences and to apply it to new ones. A second advantage is flexibility. Information that was once useful often becomes outdated, and a person who could not let go of an old address, an old price or an old rule would make constant errors. Finally, there is the question of emotional regulation. Memories of painful events fade in intensity over time for most people, and those in whom they do not fade, as in post-traumatic stress disorder, suffer precisely because their forgetting has failed.",
        "This reassessment has consequences for how we try to remember. The practice of 'spaced repetition', in which material is reviewed at increasing intervals, has been shown in dozens of studies to produce far more durable learning than the same amount of study concentrated in one session. What is less widely appreciated is that the technique works because of forgetting, not in spite of it. The psychologist Robert Bjork has described the 'desirable difficulty' created when a memory has partly faded: the effort of retrieving it at that point strengthens it far more than retrieving it while it is still fresh. Students who reread their notes until the material feels familiar are, on this account, practising the wrong skill.",
        "None of this means that forgetting is always welcome, and the distress of people with dementia is a reminder of how much depends on memory. But the research does suggest a more balanced picture. Rather than a leaky container from which the past slowly drains away, memory may be better understood as an editor, constantly deciding what to keep, what to blur and what to discard, in the service of a life that has to be lived forward. The person who cannot remember where the car is parked is, on this view, not so much failing to remember as succeeding in not being overwhelmed by the thousands of places where it has been parked before."
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
            "An experiment that challenged a long-held idea",
            "Why forgetting helps us think and feel",
            "Forgetting as a deliberate process in the brain",
            "The difficulty of remembering very old events",
            "Using forgetting to learn more effectively",
            "Competition between memories",
            "A new way of picturing memory",
            "How emotions make memories stronger",
            "The traditional view of a fading trace"
          ],
          example: { paragraph: "A", answer: "ix" },
          questions: [
            { n: 14, paragraph: "B", answer: "i" },
            { n: 15, paragraph: "C", answer: "vi" },
            { n: 16, paragraph: "D", answer: "iii" },
            { n: 17, paragraph: "E", answer: "ii" },
            { n: 18, paragraph: "F", answer: "v" },
            { n: 19, paragraph: "G", answer: "vii" }
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
            { n: 20, text: "an example of an old habit preventing a person from learning a new one", answer: "C" },
            { n: 21, text: "a reference to a medical condition in which painful memories fail to fade", answer: "E" },
            { n: 22, text: "a description of how a researcher tested his own memory", answer: "A" },
            { n: 23, text: "a claim that a process once thought to improve memory may in fact damage it", answer: "D" }
          ]
        },
        {
          type: "summary-box",
          range: [24, 26],
          instructions: [
            "Complete the summary using the list of words, A-H, below.",
            "Write the correct letter, A-H, in boxes 24-26 on your answer sheet."
          ],
          summaryTitle: "Spaced repetition",
          text: "Reviewing material at gradually longer intervals produces more [[24]] learning than studying it all at once. According to Robert Bjork, the [[25]] involved in recalling a memory that has partly faded makes the memory much stronger. Students who keep rereading their notes until the content seems [[26]] are therefore developing the wrong ability.",
          options: [
            { letter: "A", text: "familiar" }, { letter: "B", text: "effort" }, { letter: "C", text: "accurate" }, { letter: "D", text: "lasting" },
            { letter: "E", text: "difficult" }, { letter: "F", text: "speed" }, { letter: "G", text: "recent" }, { letter: "H", text: "pleasure" }
          ],
          questions: [
            { n: 24, answer: "D" },
            { n: 25, answer: "B" },
            { n: 26, answer: "A" }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "The city that makes you happy",
      subtitle: "",
      wordCount: 960,
      lettered: false,
      paragraphs: [
        "In 2010, the mayor of a mid-sized European city announced that his administration would be judged not by economic growth but by the happiness of its residents. The declaration was widely reported and, in some quarters, ridiculed. Happiness, critics said, is a private matter, shaped by health, relationships and temperament; a council can mend the roads, but it cannot make people content. Over the following decade, however, a growing body of research has suggested that the critics were only half right. The physical form of a city has measurable effects on how its inhabitants feel, and some of those effects are large enough to rival the influence of income.",
        "The most consistent finding concerns commuting. The economists Bruno Frey and Alois Stutzer, analysing German survey data, found that people with long commutes reported systematically lower life satisfaction than those with short ones, and that the difference was not offset by the higher wages or larger homes that long-distance commuters typically enjoyed. They called this the 'commuting paradox', since standard economic theory predicts that people will only accept a longer journey if they are compensated for it. Frey and Stutzer's explanation was that people are poor at predicting how they will adapt. We quickly get used to a bigger kitchen, but we never get used to sitting in traffic, because each journey is slightly different and demands fresh attention.",
        "If commuting is the clearest negative, the clearest positive is contact with other people, and here the design of streets turns out to matter a great deal. In a study of three residential streets in San Francisco that differed mainly in the volume of traffic, the urban planner Donald Appleyard found that residents of the quiet street had three times as many friends on the street, and twice as many acquaintances, as residents of the busy one. People on the heavy-traffic street described their homes as places to retreat from the outside world; those on the light-traffic street thought of the street itself as part of their home. Appleyard's work, first published in 1969, has been repeated in several countries with similar results.",
        "The psychologist Colin Ellard has taken a more direct approach, fitting volunteers with sensors that record their physiological state as they walk through different parts of a city. On a block in Manhattan dominated by the blank wall of a supermarket, participants' arousal dropped, they walked faster, and when asked to describe their mood they chose words such as 'bored' and 'passive'. A few minutes later, on a block of small restaurants and shops with open doors, the same people slowed down, their arousal rose, and they described themselves as 'lively' and 'engaged'. Ellard argues that human beings have evolved to find complexity at eye level rewarding, and that long stretches of featureless facade produce a low-level stress that most pedestrians never consciously notice.",
        "Nature, too, appears to have an effect that goes beyond the obvious pleasure of a pleasant view. A team led by the environmental psychologist Marc Berman asked participants to take a fifty-minute walk either through an arboretum or along a busy downtown street and then tested their ability to concentrate. The park walkers improved their scores by about twenty per cent; the street walkers did not improve at all. Berman attributes this to what he calls 'attention restoration': urban environments demand constant, effortful attention to traffic, signs and other people, whereas natural scenes hold attention gently, allowing the directed-attention system to recover. The effect held even in winter, when the trees were bare, and even for participants who said they had not enjoyed the walk.",
        "What is striking about these findings is how cheaply many of them could be acted upon. Narrowing a road, planting a line of trees, requiring ground-floor shops to have windows onto the street: none of these is expensive by the standards of urban infrastructure, and all of them have been shown to alter the daily experience of residents in a positive direction. The architect Jan Gehl, whose consultancy has advised cities from Copenhagen to Melbourne, has spent fifty years arguing that the test of a good city is whether people choose to linger in it when they do not have to. Observing where people stop, sit and talk, he says, tells a planner more than any amount of survey data about what is working.",
        "There are, of course, limits to what design can achieve, and some researchers worry that the enthusiasm for 'happy cities' risks turning a complex problem into a matter of street furniture. Poverty, insecure housing and poor health will not be cured by wider pavements, and a city that invests in attractive public spaces while neglecting these may simply produce pleasant places that its poorest residents cannot afford to live near. Yet the evidence that form matters is now hard to dismiss. The mayor who promised to be judged by happiness may have been naive about how much a council can do. He was not wrong that it can do something, and that the something begins with the shape of the streets."
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
              text: "What does the writer say about the mayor's announcement in 2010?",
              options: [
                "It was based on research that had already been published.",
                "It was later shown to be partly justified.",
                "It was ignored by most of the media.",
                "It led to a rapid rise in the city's economic growth."
              ],
              answer: "B"
            },
            {
              n: 28,
              text: "According to Frey and Stutzer, people with long commutes",
              options: [
                "earn less than people who live near their work.",
                "do not realise that they will fail to adapt to the journey.",
                "prefer larger homes to higher salaries.",
                "eventually stop noticing the time they spend travelling."
              ],
              answer: "B"
            },
            {
              n: 29,
              text: "What point does the writer make about Appleyard's study?",
              options: [
                "Its findings have been confirmed by later research.",
                "It compared streets in several different cities.",
                "It showed that traffic reduced the value of people's homes.",
                "It was the first study to measure happiness directly."
              ],
              answer: "A"
            },
            {
              n: 30,
              text: "The writer mentions ground-floor shop windows in order to",
              options: [
                "criticise the appearance of modern supermarkets.",
                "show how Jan Gehl's ideas have been misunderstood.",
                "give an example of a low-cost improvement.",
                "explain why some streets attract more visitors than others."
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
            "Match each finding with the correct researcher, A-E.",
            "Write the correct letter, A-E, in boxes 31-35 on your answer sheet."
          ],
          optionsTitle: "List of Researchers",
          options: [
            { letter: "A", text: "Frey and Stutzer" },
            { letter: "B", text: "Donald Appleyard" },
            { letter: "C", text: "Colin Ellard" },
            { letter: "D", text: "Marc Berman" },
            { letter: "E", text: "Jan Gehl" }
          ],
          questions: [
            { n: 31, text: "A short period in a green space improves people's ability to concentrate.", answer: "D" },
            { n: 32, text: "Watching how people use a place is more informative than asking them questions.", answer: "E" },
            { n: 33, text: "The benefits that people gain in exchange for a long journey to work do not make up for its costs.", answer: "A" },
            { n: 34, text: "Residents of streets with little traffic have more social relationships with their neighbours.", answer: "B" },
            { n: 35, text: "People walking past plain, unbroken building fronts feel less stimulated.", answer: "C" }
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
            { n: 36, text: "The influence of city design on happiness can be as great as that of income.", answer: "YES" },
            { n: 37, text: "Berman's results depended on participants finding the park walk enjoyable.", answer: "NO" },
            { n: 38, text: "Jan Gehl's advice has been more successful in Copenhagen than in Melbourne.", answer: "NOT GIVEN" },
            { n: 39, text: "Improving public spaces is the most effective way to help a city's poorest residents.", answer: "NO" },
            { n: 40, text: "The mayor was correct to believe that a council can affect residents' happiness.", answer: "YES" }
          ]
        }
      ]
    }
  ]
});

# Data schema for the IELTS practice site

All content lives in plain JS files under `site/data/`, each assigning to a global:

- `data/reading.js`   -> `window.READING_TESTS = [ ...ReadingTest ]`
- `data/listening.js` -> `window.LISTENING_TESTS = [ ...ListeningTest ]`
- `data/writing.js`   -> `window.WRITING_TESTS`, `window.WRITING_DRILLS`
- `data/speaking.js`  -> `window.SPEAKING_SETS`

To add a test later: append one more object to the array. Nothing else changes.

Style rules for ALL content
- Original text only. No Cambridge passages, recordings, questions or answers. Nothing that paraphrases a known Cambridge item.
- British spelling (colour, programme, organisation, centre).
- Instruction wording copies the official style exactly, e.g.
  "Choose the correct letter, A, B, C or D."
  "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer."
  "Choose ONE WORD ONLY from the passage for each answer."
  "Do the following statements agree with the information given in Reading Passage 1?"
  "Write ONE WORD AND/OR A NUMBER for each answer."
- Difficulty: Cambridge IELTS Academic 13 to 20. Passage 1 easiest, Passage 3 hardest.
- Answers must be unambiguous and present verbatim (or with the stated word limit) in the text. Every answer key must be checked against the text by hand.

------------------------------------------------------------------
## ReadingTest

```js
{
  id: "R1",                       // unique
  title: "Reading Test 1",
  passages: [ Passage, Passage, Passage ]   // exactly 3; questions numbered 1-40 across the test
}
```

### Passage
```js
{
  number: 1,                       // 1, 2 or 3
  title: "The silk roads of the sea",
  subtitle: "optional italic line under the title (e.g. 'How ancient mariners crossed the Indian Ocean')",
  wordCount: 880,                  // 750-950 words. Passage 3 may run to 1000.
  paragraphs: [                    // array of paragraph strings. Paragraph letters A, B, C... are added
    "text...", "text..."           // automatically by the UI for passages that use matching questions.
  ],
  lettered: true,                  // true when paragraphs should display with letters A-H (needed for
                                   // matching headings / matching information). false otherwise.
  questionGroups: [ QuestionGroup, ... ]   // 13 or 14 questions per passage; 40 total per test
}
```

### QuestionGroup
Common fields:
```js
{
  type: "tfng",                    // see types below
  range: [1, 6],                   // first and last question number in this group (inclusive)
  instructions: [                  // array of lines shown in bold/plain above the group
    "Do the following statements agree with the information given in Reading Passage 1?",
    "In boxes 1-6 on your answer sheet, write"
  ],
  legend: [                        // optional; for tfng / ynng
    ["TRUE", "if the statement agrees with the information"],
    ["FALSE", "if the statement contradicts the information"],
    ["NOT GIVEN", "if there is no information on this"]
  ],
  questions: [ Question, ... ]     // see per type
}
```

Types and their question shapes:

1. `tfng` (True/False/Not Given) and `ynng` (Yes/No/Not Given)
   ```js
   { n: 1, text: "statement...", answer: "TRUE" }      // answer: TRUE | FALSE | NOT GIVEN  (or YES | NO | NOT GIVEN)
   ```
2. `headings` (Matching headings). The group carries the list of headings; questions map paragraph -> heading.
   ```js
   type: "headings",
   headings: ["A long and difficult journey", "The role of monsoon winds", ...],   // 2-3 more than questions
   questions: [ { n: 7, paragraph: "B", answer: "iii" } ]   // answer is roman numeral i, ii, iii ... matching index in headings (i = headings[0])
   ```
   Instructions: "Reading Passage 2 has seven paragraphs, A-G." / "Choose the correct heading for each paragraph from the list of headings below." / "Write the correct number, i-ix, in boxes 14-20 on your answer sheet."
3. `matchinfo` (Matching information: which paragraph contains...)
   ```js
   type: "matchinfo", paragraphsRange: "A-G",
   questions: [ { n: 7, text: "a reference to ...", answer: "C" } ]
   ```
   Instructions include: "Which paragraph contains the following information?" "Write the correct letter, A-G, in boxes 7-11 on your answer sheet." Add "NB You may use any letter more than once." when a letter repeats.
4. `matchfeatures` (Matching features / names)
   ```js
   type: "matchfeatures",
   options: [ {letter:"A", text:"Maria Lund"}, {letter:"B", text:"Kenji Sato"}, ... ],
   optionsTitle: "List of Researchers",
   questions: [ { n: 18, text: "statement...", answer: "B" } ]
   ```
5. `endings` (Matching sentence endings)
   ```js
   type: "endings",
   options: [ {letter:"A", text:"...ending text."}, ... ],   // more endings than questions
   questions: [ { n: 36, text: "Sentence beginning", answer: "C" } ]
   ```
6. `mcq` (Multiple choice, one answer)
   ```js
   { n: 27, text: "What does the writer say about ...?", options: ["...","...","...","..."], answer: "B" }
   ```
   options array of 4 (A-D) for Reading; 3 (A-C) allowed for Listening.
7. `mcq-multi` (Choose TWO letters, A-E)
   ```js
   type: "mcq-multi", select: 2,
   stem: "Which TWO of the following ... ?",
   options: ["...","...","...","...","..."],      // 5 options
   questions: [ { n: 23 }, { n: 24 } ],           // two boxes
   answer: ["B","D"]                              // group-level, order free
   ```
8. `sentence` (Sentence completion), `short` (Short-answer questions), `table`, `notes`, `flowchart`, `summary` (without box) — all free-text gap questions:
   ```js
   { n: 9, text: "The crew used the stars and the ______ to navigate.", answer: ["monsoon winds", "monsoon wind"] }
   ```
   - `answer` is an array of accepted strings (lowercase compared, punctuation ignored). First item is the model answer displayed.
   - `text` contains exactly one `______` (six underscores) where the box goes. For `table` and `notes` and `flowchart` layouts, use `rows`:
   ```js
   type: "table",
   tableTitle: "Voyage records",
   columns: ["Period", "Route", "Cargo"],
   rows: [
     ["1st century", "Red Sea to [[1]]", "glass and [[2]]"],   // [[n]] marks a gap for question n
     ["4th century", "...", "..."]
   ],
   questions: [ { n: 1, answer: ["India"] }, { n: 2, answer: ["wine"] } ]
   ```
   `notes` and `flowchart` use `lines: [ "Heading", "• text with [[3]]", ... ]`; a flowchart renders each line as a box with a down arrow between boxes. `summary` without a box uses `text: "paragraph with [[31]] gaps [[32]]..."` and `summaryTitle`.
9. `summary-box` (Summary completion with a list of words)
   ```js
   type: "summary-box", summaryTitle: "Why the voyages ended",
   text: "paragraph with [[33]] gaps ...",
   options: [ {letter:"A", text:"storms"}, {letter:"B", text:"taxes"}, ... ],  // more than needed
   questions: [ { n: 33, answer: "D" } ]
   ```
10. `diagram` (Diagram / map / plan labelling)
    ```js
    type: "diagram",
    svg: "<svg viewBox='0 0 600 360' ...> ... </svg>",   // the drawing, with [[n]] placeholders drawn as labelled boxes "n ......" by the UI using <text data-gap='n'> elements
    caption: "A traditional Omani sewn boat",
    questions: [ { n: 11, answer: ["coconut fibre", "coconut fibres"] } ]
    ```
    In the SVG, put each gap as `<text class="gap" data-gap="11" x=".." y="..">11 ..........</text>`; the UI will draw an input next to it.

### Reading question-type mix per test (aim)
Across 40 questions: tfng/ynng 10-13, headings 5-7, matchinfo 4-5, matchfeatures or endings 4-5, mcq 4-6, completion types (sentence/summary/notes/table/flowchart) 8-12, diagram 3-4 in at least two of the four tests. Every test must contain at least one of each: tfng or ynng, headings, matchinfo, mcq, a completion type, a summary with box OR matching features/endings. Diagram in Tests 1 and 3 at minimum.

------------------------------------------------------------------
## ListeningTest

```js
{
  id: "L1", title: "Listening Test 1",
  parts: [ Part, Part, Part, Part ]
}
```
### Part
```js
{
  number: 1,
  intro: "You will hear a woman phoning a sports centre to ask about membership.",  // read aloud before the part
  speakers: { "W": {name:"Receptionist", gender:"female"}, "M": {name:"Tom", gender:"male"} },
  script: [                    // ordered utterances. Also include stage directions as {pause: ms}.
    { s: "W", t: "Good morning, Riverside Sports Centre, how can I help?" },
    { s: "M", t: "Oh hello. I'm calling about ..." },
    { pause: 1500 }
  ],
  // Where the recording says "You now have some time to look at questions 1 to 5", mark it:
  //   { cue: "look", range:[1,5] }  -> the UI reads "You now have some time to look at questions 1 to 5" and pauses ~20s (shorter for practice)
  //   { cue: "continue", range:[6,10] } -> "Now listen and answer questions 6 to 10"
  questionGroups: [ QuestionGroup ]   // same shapes as Reading: notes, table, sentence, short, mcq, mcq-multi, matchfeatures (matching), diagram (map/plan), flowchart, summary
}
```
Listening-specific rules
- Part 1: everyday dialogue, transactional (booking, enquiry, registration). 10 questions, mostly `notes`/`table` with names spelled out letter by letter, numbers, dates, prices.
- Part 2: monologue, general interest (tour guide, club welcome, radio talk). Mix of mcq and a map/plan `diagram` (3-5 items) or matching.
- Part 3: 2-4 speakers, academic discussion (students and tutor). mcq, mcq-multi, matching.
- Part 4: academic lecture monologue, 10 gaps in `notes`/`summary`, ONE WORD ONLY or no more than two.
- Each part has ~700-900 spoken words (Part 1 ~650, Part 4 ~800). Include natural distractors: a speaker gives one answer then corrects it.
- Spelling of names: write letters separated by hyphens with spaces in the script, e.g. "That's B-R-A-D-S-H-A-W." The UI reads letters individually.
- Numbers: write as digits for the UI to read, e.g. "0-7-7-0-0 9-0-0-1-2-3" for phone numbers (hyphen groups).
- Use `speakers` genders so the UI can pick distinct voices. Max 4 speakers per part. Keys: W1, W2, M1, M2 (or any short code).

------------------------------------------------------------------
## WritingTest
```js
{
  id: "W1", title: "Writing Test 1",
  task1: {
    kind: "line" | "bar" | "pie" | "table" | "process" | "map" | "mixed",
    prompt: "The graph below shows ... Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: "<svg ...>...</svg>",                 // the figure, fully drawn (or an html table string for kind 'table' in field `tableHtml`)
    tableHtml: "<table>...</table>",           // only for kind 'table'
    keyFeatures: ["...", "..."],               // 4-6 bullet points the marker should expect (used in the marking prompt, hidden from candidate until after submit)
    modelAnswer: "optional model report, 170-200 words, Meghna structure (intro, overview, 2 bodies)"
  },
  task2: {
    topic: "Education",
    type: "opinion" | "discussion" | "advantages" | "problem-solution" | "two-part" | "positive-negative",
    prompt: "Some people believe ... To what extent do you agree or disagree?",
    ideas: ["3-5 bullet ideas the marker can compare against (hidden until after submit)"],
    backgroundStatements: ["two openers lifted from her Background statements file for this topic"]
  }
}
```
WRITING_DRILLS: `{ intro: [ {topic, prompt, background:[...]} ], body: [ {topic, prompt, side:"for|against", ideaHint} ], overview: [ {kind, prompt, svg, keyFeatures} ] }`

------------------------------------------------------------------
## SpeakingSet
```js
{
  id: "S1", theme: "Hometown, Work and Weather",
  part1: { topics: [ { name: "Hometown", questions: ["...", "...", "..."] }, { name:"Work or study", questions:[...] }, { name:"Weather", questions:[...] } ] },  // 3 topics, 3-4 questions each
  part2: { cue: "Describe a place in your hometown that you like to visit.", bullets: ["where it is", "what you do there", "who you go there with"], andLine: "and explain why you like visiting this place.", roundingOff: ["Do you go there often?"] },
  part3: { topics: [ { name: "Public spaces", questions: ["...", "..."] }, { name:"Cities of the future", questions:[...] } ] }  // 2 topics, 3 questions each
}
```

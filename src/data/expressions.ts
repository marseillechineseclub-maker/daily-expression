import type { Expression } from '../types';

// Helper to generate ID from expression string
const toId = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

export const expressions: Expression[] = [
  {
    id: toId("Break the ice"),
    expression: "Break the ice",
    meaning: "To initiate conversation in a social setting, especially to make people feel more comfortable.",
    category: "Casual",
    examples: [
      "I told a joke to break the ice at the beginning of the meeting.",
      "Playing a fun game can help break the ice at parties.",
      "She's great at breaking the ice with new clients."
    ]
  },
  {
    id: toId("Hit the nail on the head"),
    expression: "Hit the nail on the head",
    meaning: "To describe exactly what is causing a situation or problem; to be exactly right about something.",
    category: "Idioms",
    examples: [
      "You hit the nail on the head when you said the project needed better planning.",
      "Her analysis hit the nail on the head - that's precisely our problem.",
      "I think you've hit the nail on the head with that suggestion."
    ]
  },
  {
    id: toId("Piece of cake"),
    expression: "Piece of cake",
    meaning: "Something very easy to do; a task that requires little effort.",
    category: "Idioms",
    examples: [
      "The exam was a piece of cake - I finished in 30 minutes.",
      "Don't worry, installing this software is a piece of cake.",
      "For an experienced chef, making this dish is a piece of cake."
    ]
  },
  {
    id: toId("Under the weather"),
    expression: "Under the weather",
    meaning: "Feeling ill or unwell; not in good health.",
    category: "Idioms",
    examples: [
      "I'm feeling a bit under the weather today, so I'll work from home.",
      "She's been under the weather all week with a cold.",
      "If you're under the weather, you should get some rest."
    ]
  },
  {
    id: toId("Cost an arm and a leg"),
    expression: "Cost an arm and a leg",
    meaning: "To be very expensive; to cost a lot of money.",
    category: "Idioms",
    examples: [
      "That new car must have cost him an arm and a leg!",
      "The repairs to the house cost an arm and a leg.",
      "Designer clothes can cost an arm and a leg."
    ]
  },
  {
    id: toId("Bite the bullet"),
    expression: "Bite the bullet",
    meaning: "To force yourself to do something unpleasant or difficult that you have been avoiding.",
    category: "Idioms",
    examples: [
      "I finally bit the bullet and went to the dentist.",
      "We need to bite the bullet and have that difficult conversation.",
      "Sometimes you just have to bite the bullet and make tough decisions."
    ]
  },
  {
    id: toId("Spill the beans"),
    expression: "Spill the beans",
    meaning: "To reveal secret information, often unintentionally or prematurely.",
    category: "Idioms",
    examples: [
      "Don't spill the beans about the surprise party!",
      "He accidentally spilled the beans about the company merger.",
      "I can't believe she spilled the beans about our vacation plans."
    ]
  },
  {
    id: toId("Let the cat out of the bag"),
    expression: "Let the cat out of the bag",
    meaning: "To accidentally reveal a secret or surprise.",
    category: "Idioms",
    examples: [
      "I let the cat out of the bag about their engagement.",
      "Someone let the cat out of the bag about the new product launch.",
      "Try not to let the cat out of the bag before the announcement."
    ]
  },
  {
    id: toId("The ball is in your court"),
    expression: "The ball is in your court",
    meaning: "It's your turn to take action or make a decision; the responsibility is now yours.",
    category: "Business",
    examples: [
      "I've made my offer, so now the ball is in your court.",
      "We've given you all the information - the ball is in your court.",
      "After the interview, the ball is in their court to make a decision."
    ]
  },
  {
    id: toId("Blessing in disguise"),
    expression: "Blessing in disguise",
    meaning: "Something that seems bad at first but turns out to be beneficial.",
    category: "Idioms",
    examples: [
      "Losing that job was a blessing in disguise - I found a much better one!",
      "The flight delay was a blessing in disguise; we avoided a storm.",
      "Missing that meeting was a blessing in disguise."
    ]
  },
  {
    id: toId("Once in a blue moon"),
    expression: "Once in a blue moon",
    meaning: "Very rarely; almost never.",
    category: "Idioms",
    examples: [
      "I only eat fast food once in a blue moon.",
      "We see each other once in a blue moon since she moved away.",
      "He cleans his room once in a blue moon."
    ]
  },
  {
    id: toId("The best of both worlds"),
    expression: "The best of both worlds",
    meaning: "A situation where you can enjoy two different opportunities or benefits at the same time.",
    category: "Idioms",
    examples: [
      "Working from home gives me the best of both worlds - professional growth and family time.",
      "This hybrid car offers the best of both worlds: efficiency and performance.",
      "Living in the suburbs gives you the best of both worlds - nature and city access."
    ]
  },
  {
    id: toId("Call it a day"),
    expression: "Call it a day",
    meaning: "To stop working on something; to decide that you have done enough.",
    category: "Casual",
    examples: [
      "We've been working for 10 hours - let's call it a day.",
      "I'm exhausted, I think I'll call it a day.",
      "After finishing the report, they decided to call it a day."
    ]
  },
  {
    id: toId("Cut corners"),
    expression: "Cut corners",
    meaning: "To do something in the easiest or cheapest way, often sacrificing quality.",
    category: "Business",
    examples: [
      "Don't cut corners when it comes to safety.",
      "They cut corners during construction, and now there are problems.",
      "We can save money, but we shouldn't cut corners on quality."
    ]
  },
  {
    id: toId("Get out of hand"),
    expression: "Get out of hand",
    meaning: "To become difficult to control or manage.",
    category: "Phrasal Verbs",
    examples: [
      "The party got out of hand when too many people showed up.",
      "If we don't address this now, it could get out of hand.",
      "The argument got out of hand very quickly."
    ]
  },
  {
    id: toId("Go the extra mile"),
    expression: "Go the extra mile",
    meaning: "To make more effort than is expected of you; to do more than necessary.",
    category: "Business",
    examples: [
      "She always goes the extra mile to help her customers.",
      "If you want to stand out, you need to go the extra mile.",
      "The team went the extra mile to finish the project on time."
    ]
  },
  {
    id: toId("Hit the sack"),
    expression: "Hit the sack",
    meaning: "To go to bed; to go to sleep.",
    category: "Casual",
    examples: [
      "I'm exhausted - I'm going to hit the sack early tonight.",
      "After the long flight, I just wanted to hit the sack.",
      "It's midnight, time to hit the sack."
    ]
  },
  {
    id: toId("Keep your chin up"),
    expression: "Keep your chin up",
    meaning: "To remain cheerful and optimistic in difficult circumstances; don't be discouraged.",
    category: "Casual",
    examples: [
      "I know it's tough, but keep your chin up!",
      "Keep your chin up - things will get better.",
      "She told him to keep his chin up during the challenging times."
    ]
  },
  {
    id: toId("On cloud nine"),
    expression: "On cloud nine",
    meaning: "Extremely happy; in a state of bliss.",
    category: "Idioms",
    examples: [
      "She's been on cloud nine since she got engaged.",
      "I was on cloud nine when I heard I got the job!",
      "Winning the award put him on cloud nine."
    ]
  },
  {
    id: toId("Pull yourself together"),
    expression: "Pull yourself together",
    meaning: "To calm down and regain control of your emotions; to get organized.",
    category: "Phrasal Verbs",
    examples: [
      "Pull yourself together - we have a presentation in 10 minutes.",
      "After the shock, she pulled herself together and continued.",
      "You need to pull yourself together and focus."
    ]
  },
  {
    id: toId("See eye to eye"),
    expression: "See eye to eye",
    meaning: "To agree with someone; to have the same opinion.",
    category: "Idioms",
    examples: [
      "We don't always see eye to eye, but we respect each other.",
      "The partners finally see eye to eye on the business strategy.",
      "It's difficult when you don't see eye to eye with your manager."
    ]
  },
  {
    id: toId("Sit on the fence"),
    expression: "Sit on the fence",
    meaning: "To avoid making a decision or choice; to remain neutral.",
    category: "Idioms",
    examples: [
      "Stop sitting on the fence and make a decision!",
      "He's sitting on the fence about which job offer to accept.",
      "Politicians often sit on the fence on controversial issues."
    ]
  },
  {
    id: toId("Take it with a grain of salt"),
    expression: "Take it with a grain of salt",
    meaning: "To not take something too seriously; to be skeptical about something.",
    category: "Idioms",
    examples: [
      "He exaggerates a lot, so take what he says with a grain of salt.",
      "Take online reviews with a grain of salt.",
      "I'd take that rumor with a grain of salt until it's confirmed."
    ]
  },
  {
    id: toId("The elephant in the room"),
    expression: "The elephant in the room",
    meaning: "An obvious problem or difficult situation that people avoid talking about.",
    category: "Idioms",
    examples: [
      "Let's address the elephant in the room - our sales are down 30%.",
      "The elephant in the room was his recent scandal.",
      "We can't ignore the elephant in the room any longer."
    ]
  },
  {
    id: toId("Throw in the towel"),
    expression: "Throw in the towel",
    meaning: "To give up; to admit defeat.",
    category: "Idioms",
    examples: [
      "After three failed attempts, he finally threw in the towel.",
      "Don't throw in the towel - you're so close to success!",
      "Many businesses threw in the towel during the recession."
    ]
  },
  {
    id: toId("Up in the air"),
    expression: "Up in the air",
    meaning: "Uncertain; not yet decided or settled.",
    category: "Idioms",
    examples: [
      "Our vacation plans are still up in the air.",
      "The future of the project is up in the air right now.",
      "Everything is up in the air until we hear back from them."
    ]
  },
  {
    id: toId("Weather the storm"),
    expression: "Weather the storm",
    meaning: "To survive a difficult period or situation.",
    category: "Idioms",
    examples: [
      "The company managed to weather the storm of the economic crisis.",
      "We'll weather the storm together as a family.",
      "Small businesses struggled to weather the storm of the pandemic."
    ]
  },
  {
    id: toId("When pigs fly"),
    expression: "When pigs fly",
    meaning: "Something that will never happen; expressing impossibility.",
    category: "Idioms",
    examples: [
      "He'll clean his room when pigs fly!",
      "When pigs fly, she'll admit she was wrong.",
      "I'll wake up early voluntarily when pigs fly."
    ]
  },
  {
    id: toId("You can say that again"),
    expression: "You can say that again",
    meaning: "I completely agree with you; that's very true.",
    category: "Casual",
    examples: [
      "\"This coffee is amazing!\" \"You can say that again!\"",
      "\"It's been a long week.\" \"You can say that again.\"",
      "\"This project is challenging.\" \"You can say that again!\""
    ]
  },
  {
    id: toId("Your guess is as good as mine"),
    expression: "Your guess is as good as mine",
    meaning: "I don't know any more than you do; I have no idea.",
    category: "Casual",
    examples: [
      "\"When will the meeting start?\" \"Your guess is as good as mine.\"",
      "Your guess is as good as mine about what he'll decide.",
      "\"Who's responsible?\" \"Your guess is as good as mine.\""
    ]
  },
  {
    id: toId("Burn the midnight oil"),
    expression: "Burn the midnight oil",
    meaning: "To work late into the night; to stay up late working.",
    category: "Business",
    examples: [
      "I had to burn the midnight oil to finish the report.",
      "Students often burn the midnight oil before exams.",
      "She's been burning the midnight oil on this project."
    ]
  },
  {
    id: toId("Get your act together"),
    expression: "Get your act together",
    meaning: "To organize yourself and start behaving more responsibly or efficiently.",
    category: "Phrasal Verbs",
    examples: [
      "You need to get your act together if you want to pass this course.",
      "The company needs to get its act together before the investors arrive.",
      "Get your act together - the deadline is tomorrow!"
    ]
  },
  {
    id: toId("Jump on the bandwagon"),
    expression: "Jump on the bandwagon",
    meaning: "To join others in doing something that is currently popular or fashionable.",
    category: "Idioms",
    examples: [
      "Everyone's jumping on the bandwagon of sustainable living.",
      "Many companies jumped on the bandwagon when remote work became popular.",
      "Don't just jump on the bandwagon - make your own decisions."
    ]
  },
  {
    id: toId("Miss the boat"),
    expression: "Miss the boat",
    meaning: "To miss an opportunity; to be too late to take advantage of something.",
    category: "Idioms",
    examples: [
      "If you don't apply soon, you'll miss the boat on this job opportunity.",
      "We missed the boat on investing in that company.",
      "Don't miss the boat - the sale ends today!"
    ]
  },
  {
    id: toId("Not rocket science"),
    expression: "Not rocket science",
    meaning: "Not difficult to understand or do; quite simple.",
    category: "Casual",
    examples: [
      "Using this app is not rocket science - anyone can do it.",
      "It's not rocket science, just follow the instructions.",
      "Cooking pasta is not rocket science."
    ]
  },
  {
    id: toId("Read between the lines"),
    expression: "Read between the lines",
    meaning: "To understand the hidden or implied meaning rather than just the literal words.",
    category: "Business",
    examples: [
      "You need to read between the lines of his email - he's not happy.",
      "Reading between the lines, I think they're planning to sell the company.",
      "She didn't say it directly, but if you read between the lines, she's interested."
    ]
  },
  {
    id: toId("Steal someone's thunder"),
    expression: "Steal someone's thunder",
    meaning: "To take attention or praise away from someone by doing what they planned to do first.",
    category: "Idioms",
    examples: [
      "Don't announce your news at her party - you'll steal her thunder!",
      "He stole my thunder by presenting my idea before I could.",
      "I didn't mean to steal your thunder with my announcement."
    ]
  },
  {
    id: toId("Take with a pinch of salt"),
    expression: "Take with a pinch of salt",
    meaning: "To be skeptical about something; to not believe something entirely.",
    category: "Idioms",
    examples: [
      "Take his stories with a pinch of salt - he tends to exaggerate.",
      "You should take those statistics with a pinch of salt.",
      "I take everything I read on social media with a pinch of salt."
    ]
  },
  {
    id: toId("The last straw"),
    expression: "The last straw",
    meaning: "The final problem in a series of problems that makes you unable to accept a situation anymore.",
    category: "Idioms",
    examples: [
      "Missing my birthday was the last straw - I broke up with him.",
      "That rude email was the last straw; I'm quitting.",
      "The broken promise was the last straw for the investors."
    ]
  },
  {
    id: toId("Tip of the iceberg"),
    expression: "Tip of the iceberg",
    meaning: "A small visible part of a much larger problem or situation.",
    category: "Idioms",
    examples: [
      "These complaints are just the tip of the iceberg.",
      "The financial issues we see are only the tip of the iceberg.",
      "What's been reported is just the tip of the iceberg."
    ]
  },
  {
    id: toId("Get the ball rolling"),
    expression: "Get the ball rolling",
    meaning: "To start something; to begin a process or activity.",
    category: "Business",
    examples: [
      "Let's get the ball rolling on this project.",
      "I'll send the first email to get the ball rolling.",
      "We need someone to get the ball rolling on planning the event."
    ]
  },
  {
    id: toId("In the same boat"),
    expression: "In the same boat",
    meaning: "In the same difficult situation as someone else.",
    category: "Casual",
    examples: [
      "We're all in the same boat - we all have tight deadlines.",
      "Don't worry, we're in the same boat with the budget cuts.",
      "If the company fails, we're all in the same boat."
    ]
  },
  {
    id: toId("Keep your eyes peeled"),
    expression: "Keep your eyes peeled",
    meaning: "To watch carefully for something; to be alert and observant.",
    category: "Casual",
    examples: [
      "Keep your eyes peeled for any spelling errors in the document.",
      "Keep your eyes peeled for the exit - it's easy to miss.",
      "I'll keep my eyes peeled for any good deals."
    ]
  },
  {
    id: toId("Make a long story short"),
    expression: "Make a long story short",
    meaning: "To tell something briefly, leaving out details.",
    category: "Casual",
    examples: [
      "To make a long story short, we got lost and arrived two hours late.",
      "Let me make a long story short - the project failed.",
      "Making a long story short, I decided to accept the job offer."
    ]
  },
  {
    id: toId("No pain, no gain"),
    expression: "No pain, no gain",
    meaning: "You have to work hard or suffer to achieve something worthwhile.",
    category: "Casual",
    examples: [
      "I'm sore from the workout, but no pain, no gain!",
      "Learning a new language is hard, but no pain, no gain.",
      "It's tough now, but remember - no pain, no gain."
    ]
  },
  {
    id: toId("On the same page"),
    expression: "On the same page",
    meaning: "To have the same understanding or opinion about something.",
    category: "Business",
    examples: [
      "Let's meet to make sure we're all on the same page.",
      "I think we're on the same page about the project goals.",
      "Are we on the same page about the deadline?"
    ]
  },
  {
    id: toId("Par for the course"),
    expression: "Par for the course",
    meaning: "What is normal or expected in a particular situation.",
    category: "Idioms",
    examples: [
      "Delays are par for the course with this airline.",
      "Technical issues on launch day are par for the course.",
      "Complaints from that client are par for the course."
    ]
  },
  {
    id: toId("Pull someone's leg"),
    expression: "Pull someone's leg",
    meaning: "To joke with or tease someone in a playful way.",
    category: "Casual",
    examples: [
      "I'm just pulling your leg - I didn't really sell your car!",
      "Are you serious or just pulling my leg?",
      "He loves pulling people's legs with outrageous stories."
    ]
  },
  {
    id: toId("Get cold feet"),
    expression: "Get cold feet",
    meaning: "To become nervous or anxious about something you planned to do, often leading to hesitation or withdrawal.",
    category: "Phrasal Verbs",
    examples: [
      "He got cold feet about the presentation and almost canceled.",
      "Many couples get cold feet before their wedding.",
      "Don't get cold feet now - you've prepared well for this!"
    ]
  },
  {
    id: toId("Actions speak louder than words"),
    expression: "Actions speak louder than words",
    meaning: "What you do is more important and shows your true intentions better than what you say.",
    category: "Idioms",
    examples: [
      "He says he'll help, but actions speak louder than words.",
      "Don't just promise to change - actions speak louder than words.",
      "She proved that actions speak louder than words by volunteering every week."
    ]
  },
  // === NEW EXPRESSIONS (51-100) ===
  {
    id: toId("Back to square one"),
    expression: "Back to square one",
    meaning: "To start something over again because the previous attempt failed.",
    category: "Idioms",
    examples: [
      "The deal fell through, so we're back to square one.",
      "After the code crashed, we had to go back to square one.",
      "If this plan doesn't work, it's back to square one."
    ]
  },
  {
    id: toId("Barking up the wrong tree"),
    expression: "Barking up the wrong tree",
    meaning: "To pursue a mistaken or misguided course of action; to be looking in the wrong place.",
    category: "Idioms",
    examples: [
      "If you think I took your keys, you're barking up the wrong tree.",
      "The detective realized he'd been barking up the wrong tree.",
      "You're barking up the wrong tree if you expect him to help."
    ]
  },
  {
    id: toId("Beat around the bush"),
    expression: "Beat around the bush",
    meaning: "To avoid talking about what is important; to delay or be indirect.",
    category: "Idioms",
    examples: [
      "Stop beating around the bush and tell me what happened.",
      "He kept beating around the bush instead of answering directly.",
      "Don't beat around the bush - just say what you mean."
    ]
  },
  {
    id: toId("Better late than never"),
    expression: "Better late than never",
    meaning: "It's better to do something late than not do it at all.",
    category: "Casual",
    examples: [
      "You finally finished the project! Better late than never.",
      "He apologized after three years - better late than never, I suppose.",
      "Better late than never - I'm glad you could make it."
    ]
  },
  {
    id: toId("Bite off more than you can chew"),
    expression: "Bite off more than you can chew",
    meaning: "To take on more responsibility than you can handle.",
    category: "Idioms",
    examples: [
      "I bit off more than I could chew with this project.",
      "Don't bite off more than you can chew - start with smaller goals.",
      "She bit off more than she could chew by volunteering for everything."
    ]
  },
  {
    id: toId("Break a leg"),
    expression: "Break a leg",
    meaning: "A way to wish someone good luck, especially before a performance.",
    category: "Casual",
    examples: [
      "You're going on stage? Break a leg!",
      "Break a leg at your interview tomorrow!",
      "The whole cast told her to break a leg before the show."
    ]
  },
  {
    id: toId("Bring to the table"),
    expression: "Bring to the table",
    meaning: "To contribute something of value to a discussion or situation.",
    category: "Business",
    examples: [
      "What skills do you bring to the table?",
      "She brings years of experience to the table.",
      "Each team member brings something unique to the table."
    ]
  },
  {
    id: toId("By the skin of your teeth"),
    expression: "By the skin of your teeth",
    meaning: "Just barely; by a very narrow margin.",
    category: "Idioms",
    examples: [
      "I passed the exam by the skin of my teeth.",
      "We caught the flight by the skin of our teeth.",
      "He escaped the accident by the skin of his teeth."
    ]
  },
  {
    id: toId("Cross that bridge when you come to it"),
    expression: "Cross that bridge when you come to it",
    meaning: "Deal with a problem when it arises, not before.",
    category: "Idioms",
    examples: [
      "We'll cross that bridge when we come to it.",
      "Don't worry about retirement now - cross that bridge when you come to it.",
      "If complications arise, we'll cross that bridge when we come to it."
    ]
  },
  {
    id: toId("Cut to the chase"),
    expression: "Cut to the chase",
    meaning: "To get to the point without wasting time.",
    category: "Business",
    examples: [
      "Let me cut to the chase - we need more funding.",
      "Cut to the chase - are you interested or not?",
      "I'll cut to the chase: the project has been canceled."
    ]
  },
  {
    id: toId("Don't put all your eggs in one basket"),
    expression: "Don't put all your eggs in one basket",
    meaning: "Don't risk everything on a single opportunity.",
    category: "Idioms",
    examples: [
      "Diversify your investments - don't put all your eggs in one basket.",
      "Apply to multiple jobs; don't put all your eggs in one basket.",
      "I learned not to put all my eggs in one basket the hard way."
    ]
  },
  {
    id: toId("Drop the ball"),
    expression: "Drop the ball",
    meaning: "To make a mistake or fail to do something important.",
    category: "Business",
    examples: [
      "I really dropped the ball on that deadline.",
      "Someone dropped the ball and the client never got the email.",
      "Don't drop the ball on this - it's too important."
    ]
  },
  {
    id: toId("Every cloud has a silver lining"),
    expression: "Every cloud has a silver lining",
    meaning: "There's something positive in every negative situation.",
    category: "Idioms",
    examples: [
      "I lost my job, but every cloud has a silver lining - I found a better one.",
      "Remember, every cloud has a silver lining.",
      "The delay was frustrating, but every cloud has a silver lining."
    ]
  },
  {
    id: toId("Face the music"),
    expression: "Face the music",
    meaning: "To accept the consequences of your actions.",
    category: "Idioms",
    examples: [
      "He made the mistake, now he has to face the music.",
      "It's time to face the music and admit we were wrong.",
      "She knew she'd have to face the music eventually."
    ]
  },
  {
    id: toId("Get the hang of it"),
    expression: "Get the hang of it",
    meaning: "To learn how to do something; to become skilled at something.",
    category: "Phrasal Verbs",
    examples: [
      "Don't worry, you'll get the hang of it soon.",
      "It took me a week to get the hang of the new software.",
      "Once you get the hang of it, it becomes second nature."
    ]
  },
  {
    id: toId("Give someone the benefit of the doubt"),
    expression: "Give someone the benefit of the doubt",
    meaning: "To believe someone's statement without proof; to assume good intentions.",
    category: "Idioms",
    examples: [
      "Let's give him the benefit of the doubt this time.",
      "I'll give you the benefit of the doubt, but don't let it happen again.",
      "She deserves the benefit of the doubt."
    ]
  },
  {
    id: toId("Go back to the drawing board"),
    expression: "Go back to the drawing board",
    meaning: "To start planning something again because the first plan failed.",
    category: "Business",
    examples: [
      "The design was rejected, so we need to go back to the drawing board.",
      "If this doesn't work, we'll have to go back to the drawing board.",
      "It's time to go back to the drawing board and rethink our strategy."
    ]
  },
  {
    id: toId("Hang in there"),
    expression: "Hang in there",
    meaning: "Keep trying; don't give up despite difficulties.",
    category: "Casual",
    examples: [
      "Hang in there - things will get better!",
      "I know it's hard, but hang in there.",
      "Just hang in there a little longer."
    ]
  },
  {
    id: toId("Hit the ground running"),
    expression: "Hit the ground running",
    meaning: "To start something and immediately work hard at it.",
    category: "Business",
    examples: [
      "We need someone who can hit the ground running.",
      "She hit the ground running on her first day.",
      "After training, you'll be expected to hit the ground running."
    ]
  },
  {
    id: toId("In a nutshell"),
    expression: "In a nutshell",
    meaning: "In summary; briefly.",
    category: "Casual",
    examples: [
      "In a nutshell, we need more time and money.",
      "That's the situation in a nutshell.",
      "To put it in a nutshell, the project was a success."
    ]
  },
  {
    id: toId("It takes two to tango"),
    expression: "It takes two to tango",
    meaning: "Both people involved in a situation are responsible for it.",
    category: "Idioms",
    examples: [
      "Don't just blame him - it takes two to tango.",
      "They're both at fault; it takes two to tango.",
      "Remember, it takes two to tango in any relationship."
    ]
  },
  {
    id: toId("Keep someone in the loop"),
    expression: "Keep someone in the loop",
    meaning: "To keep someone informed about progress or changes.",
    category: "Business",
    examples: [
      "Please keep me in the loop on any updates.",
      "Make sure to keep the client in the loop.",
      "I want to be kept in the loop about the project status."
    ]
  },
  {
    id: toId("Kill two birds with one stone"),
    expression: "Kill two birds with one stone",
    meaning: "To accomplish two things with a single action.",
    category: "Idioms",
    examples: [
      "By biking to work, I kill two birds with one stone - exercise and commuting.",
      "We can kill two birds with one stone by having the meeting over lunch.",
      "This solution kills two birds with one stone."
    ]
  },
  {
    id: toId("Leave no stone unturned"),
    expression: "Leave no stone unturned",
    meaning: "To search thoroughly; to try everything possible.",
    category: "Idioms",
    examples: [
      "We'll leave no stone unturned in finding the solution.",
      "The police left no stone unturned in their investigation.",
      "Leave no stone unturned when looking for opportunities."
    ]
  },
  {
    id: toId("Let sleeping dogs lie"),
    expression: "Let sleeping dogs lie",
    meaning: "To avoid interfering with a situation that is currently stable.",
    category: "Idioms",
    examples: [
      "Don't bring up that old argument - let sleeping dogs lie.",
      "Sometimes it's better to let sleeping dogs lie.",
      "I decided to let sleeping dogs lie and not mention it."
    ]
  },
  {
    id: toId("Look before you leap"),
    expression: "Look before you leap",
    meaning: "Think carefully before making a decision or taking action.",
    category: "Idioms",
    examples: [
      "Before quitting your job, look before you leap.",
      "Look before you leap - make sure you understand the risks.",
      "He should have looked before he leaped into that investment."
    ]
  },
  {
    id: toId("Make ends meet"),
    expression: "Make ends meet",
    meaning: "To have just enough money to pay for necessities.",
    category: "Idioms",
    examples: [
      "With rising costs, it's hard to make ends meet.",
      "Many families struggle to make ends meet.",
      "She works two jobs to make ends meet."
    ]
  },
  {
    id: toId("Miss the point"),
    expression: "Miss the point",
    meaning: "To fail to understand the main idea or purpose.",
    category: "Casual",
    examples: [
      "I think you're missing the point of the exercise.",
      "He completely missed the point of my argument.",
      "You're missing the point - it's not about the money."
    ]
  },
  {
    id: toId("Nip it in the bud"),
    expression: "Nip it in the bud",
    meaning: "To stop something at an early stage before it becomes a bigger problem.",
    category: "Idioms",
    examples: [
      "We need to nip this problem in the bud.",
      "Address bad habits early - nip them in the bud.",
      "The manager nipped the conflict in the bud before it escalated."
    ]
  },
  {
    id: toId("Off the top of my head"),
    expression: "Off the top of my head",
    meaning: "Without careful thought or research; from memory.",
    category: "Casual",
    examples: [
      "Off the top of my head, I'd say there are about 50 employees.",
      "I can't give you exact figures off the top of my head.",
      "Off the top of my head, I think the meeting is at 3 PM."
    ]
  },
  {
    id: toId("On thin ice"),
    expression: "On thin ice",
    meaning: "In a risky or precarious situation.",
    category: "Idioms",
    examples: [
      "After that mistake, he's on thin ice with the boss.",
      "You're on thin ice - one more error and you're out.",
      "The company has been on thin ice financially."
    ]
  },
  {
    id: toId("Out of the blue"),
    expression: "Out of the blue",
    meaning: "Unexpectedly; without warning.",
    category: "Idioms",
    examples: [
      "She called me out of the blue after ten years.",
      "The news came out of the blue.",
      "Out of the blue, he announced his resignation."
    ]
  },
  {
    id: toId("Play it by ear"),
    expression: "Play it by ear",
    meaning: "To decide how to deal with a situation as it develops.",
    category: "Casual",
    examples: [
      "Let's not make plans - we'll play it by ear.",
      "I don't know what to expect, so I'll play it by ear.",
      "We can play it by ear and see how things go."
    ]
  },
  {
    id: toId("Put your foot down"),
    expression: "Put your foot down",
    meaning: "To firmly assert your authority or wishes; to refuse to yield.",
    category: "Phrasal Verbs",
    examples: [
      "She finally put her foot down and demanded a raise.",
      "Sometimes you need to put your foot down.",
      "The manager put his foot down about working overtime."
    ]
  },
  {
    id: toId("Raining cats and dogs"),
    expression: "Raining cats and dogs",
    meaning: "Raining very heavily.",
    category: "Idioms",
    examples: [
      "Take an umbrella - it's raining cats and dogs out there!",
      "We couldn't go outside because it was raining cats and dogs.",
      "It started raining cats and dogs just as we left."
    ]
  },
  {
    id: toId("Rome wasn't built in a day"),
    expression: "Rome wasn't built in a day",
    meaning: "Important work takes time to complete properly.",
    category: "Idioms",
    examples: [
      "Be patient with your progress - Rome wasn't built in a day.",
      "Learning a language takes time. Rome wasn't built in a day.",
      "Remember, Rome wasn't built in a day - keep practicing."
    ]
  },
  {
    id: toId("Speak of the devil"),
    expression: "Speak of the devil",
    meaning: "Said when the person you were just talking about arrives.",
    category: "Casual",
    examples: [
      "Speak of the devil - we were just talking about you!",
      "Oh, speak of the devil! Here comes John now.",
      "Speak of the devil - I was just about to call you."
    ]
  },
  {
    id: toId("Take it easy"),
    expression: "Take it easy",
    meaning: "To relax; to calm down; to not work too hard.",
    category: "Casual",
    examples: [
      "You've been working hard - take it easy this weekend.",
      "Take it easy, there's no rush.",
      "The doctor told him to take it easy for a few days."
    ]
  },
  {
    id: toId("The early bird catches the worm"),
    expression: "The early bird catches the worm",
    meaning: "Those who arrive first or act promptly have an advantage.",
    category: "Idioms",
    examples: [
      "I always shop early - the early bird catches the worm.",
      "Get there early! The early bird catches the worm.",
      "He believes the early bird catches the worm, so he's always first."
    ]
  },
  {
    id: toId("Think outside the box"),
    expression: "Think outside the box",
    meaning: "To think creatively or differently from the usual way.",
    category: "Business",
    examples: [
      "We need to think outside the box to solve this problem.",
      "The company encourages employees to think outside the box.",
      "Thinking outside the box led to a breakthrough idea."
    ]
  },
  {
    id: toId("Time flies"),
    expression: "Time flies",
    meaning: "Time seems to pass very quickly.",
    category: "Casual",
    examples: [
      "Time flies when you're having fun!",
      "I can't believe it's already December - time flies.",
      "Time flies - my kids are already teenagers."
    ]
  },
  {
    id: toId("Touch base"),
    expression: "Touch base",
    meaning: "To briefly make or renew contact with someone.",
    category: "Business",
    examples: [
      "Let's touch base next week to discuss progress.",
      "I wanted to touch base with you about the meeting.",
      "We should touch base before the presentation."
    ]
  },
  {
    id: toId("Turn over a new leaf"),
    expression: "Turn over a new leaf",
    meaning: "To start behaving in a better way; to make a fresh start.",
    category: "Idioms",
    examples: [
      "New year, new me - I'm turning over a new leaf.",
      "After the warning, he decided to turn over a new leaf.",
      "She turned over a new leaf and started exercising daily."
    ]
  },
  {
    id: toId("Under pressure"),
    expression: "Under pressure",
    meaning: "Feeling stressed because of urgent demands or difficult circumstances.",
    category: "Casual",
    examples: [
      "I work well under pressure.",
      "The team is under pressure to meet the deadline.",
      "Don't make important decisions when you're under pressure."
    ]
  },
  {
    id: toId("Wrap your head around"),
    expression: "Wrap your head around",
    meaning: "To understand something difficult or complex.",
    category: "Phrasal Verbs",
    examples: [
      "I'm still trying to wrap my head around the new policy.",
      "It's hard to wrap your head around quantum physics.",
      "Give me time to wrap my head around this information."
    ]
  },
  {
    id: toId("You can't judge a book by its cover"),
    expression: "You can't judge a book by its cover",
    meaning: "You shouldn't judge something or someone based only on appearance.",
    category: "Idioms",
    examples: [
      "He may look intimidating, but you can't judge a book by its cover.",
      "The restaurant looked shabby but the food was amazing - you can't judge a book by its cover.",
      "She learned that you can't judge a book by its cover."
    ]
  },
  {
    id: toId("Zoom in on"),
    expression: "Zoom in on",
    meaning: "To focus attention on something specific; to examine closely.",
    category: "Business",
    examples: [
      "Let's zoom in on the sales figures for Q3.",
      "The report zooms in on customer satisfaction.",
      "We need to zoom in on the root cause of the problem."
    ]
  },
  {
    id: toId("A penny for your thoughts"),
    expression: "A penny for your thoughts",
    meaning: "A way of asking what someone is thinking about.",
    category: "Casual",
    examples: [
      "You look deep in thought - a penny for your thoughts?",
      "A penny for your thoughts - what are you thinking about?",
      "She asked him, 'A penny for your thoughts?'"
    ]
  },
  {
    id: toId("Add insult to injury"),
    expression: "Add insult to injury",
    meaning: "To make a bad situation even worse.",
    category: "Idioms",
    examples: [
      "To add insult to injury, it started raining after the car broke down.",
      "They fired him and, to add insult to injury, didn't pay his final bonus.",
      "Adding insult to injury, they charged me for the defective product."
    ]
  },
  {
    id: toId("At the end of the day"),
    expression: "At the end of the day",
    meaning: "Ultimately; when everything is considered.",
    category: "Business",
    examples: [
      "At the end of the day, customer satisfaction is what matters.",
      "At the end of the day, we need to make a profit.",
      "At the end of the day, it's your decision."
    ]
  }
];

export const categories = ['All', 'Idioms', 'Business', 'Casual', 'Phrasal Verbs'] as const;

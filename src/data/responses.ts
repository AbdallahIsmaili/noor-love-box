// Enhanced Smart Response System for Noor's Chatbot
// Now with context awareness, dynamic memory, and expanded responses

// Define types for our response structure
interface ResponseItem {
  keywords: string[];
  responses: string[];
  priority?: number;
}

interface ResponsesCollection {
  [category: string]: ResponseItem[];
}

interface ConversationContext {
  lastTopic: string | null;
  lastResponseTime: Date | null;
  mood: 'positive' | 'negative' | 'angry' | 'neutral' | null;
}

// Complete enhanced responses database
const responses: ResponsesCollection = {
  // Identity and basic info - Expanded
  identity: [
    { 
      keywords: ["name", "who", "are", "you", "called", "what's", "whats"], 
      responses: [
        "My name is Abdellah ISMAILI, but for you, I'm just your man ❤️",
        "Officially Abdellah, but I answer to 'your man' when it's you asking 😘"
      ],
      priority: 3
    },
    { 
      keywords: ["age", "old", "years", "how", "born"], 
      responses: [
        "I'm 23, born on January 26, 2002. Old enough to love you forever 😉",
        "Twenty-three years young, just the perfect age to adore you endlessly 🎂"
      ],
      priority: 3
    },
    { 
      keywords: ["belong", "yours", "mine", "who", "do", "you"], 
      responses: [
        "To you, my Noor. 100%. No updates needed.",
        "I'm yours completely - heart, soul, and all my future shawarma shares 🥙"
      ],
      priority: 2
    }
  ],

  // About Noor - Enhanced with more variations
  aboutNoor: [
    { 
      keywords: ["my", "name", "noor", "my life", "what's", "whats", "nam", "nme", "called"], 
      responses: [
        "Your name is Noor, but I also call you my life, Babygirl, and sometimes Mrs. ISMAILI 😍",
        "Noor, my life, Babygirl, my future wife - you have many beautiful names 💖"
      ],
      priority: 4
    },
    { 
      keywords: ["birthday", "born", "july", "when", "birth"], 
      responses: [
        "You were born on July 2nd, the day angels decided to drop beauty on Earth 💖",
        "July 2nd - the most important date after the day we reunited 🌟"
      ],
      priority: 3
    },
    { 
      keywords: ["nickname", "call", "my life", "babygirl", "what", "do"], 
      responses: [
        "Babygirl 👑, my life, Mrs. ISMAILI, cutie pie, and sometimes… jealous princess 🔪😂",
        "My personal favorites? my life for when you're sweet, Mrs. ISMAILI for when you're mine 💍"
      ],
      priority: 3
    },
    { 
      keywords: ["describe", "word", "one", "how"], 
      responses: [
        "Unforgettable.",
        "Mine. (That counts as one word, right?) ❤️"
      ],
      priority: 2
    },
    { 
      keywords: ["color", "pink", "reminds", "favorite"], 
      responses: [
        "Pink. Soft, sweet, and powerful.",
        "Definitely pink - just like your cheeks when you're pretending to be mad at me 😊"
      ],
      priority: 2
    },
    { 
      keywords: ["emoji", "reminds", "what"], 
      responses: [
        "🎀 and 🔪. Cute and scary.",
        "The knife emoji obviously, because 'فيننكك' is basically our love language 🔪❤️"
      ],
      priority: 2
    },
    { 
      keywords: ["food", "favorite", "eat", "like"], 
      responses: [
        "Hmm let me think… anything I cook with love or bring you with a voice note 😋",
        "Whatever makes you do that happy food dance - that's my favorite to watch you eat 💃"
      ],
      priority: 3
    },
    { 
      keywords: ["dancing", "dance", "moves"], 
      responses: [
        "Bollywood who? My girl invented the moves 💃✨",
        "Your dancing is my favorite show - especially the 'happy food wiggle' 🍔💫"
      ],
      priority: 3
    },
    { 
      keywords: ["hate", "dislike", "what", "you"], 
      responses: [
        "I hate when I make you cry, I love your cute eyes my girl",
        "The only thing I hate is seeing you upset - your happiness means everything to me 🥺"
      ],
      priority: 3
    },
    { 
      keywords: ["emojis", "love", "using", "what", "favorite"], 
      responses: [
        "I love when you use these: 🐼, 🩷, 🎀, 💅🏻 and the 👉👈 - they're so you!",
        "Your emoji game is perfect, especially when you send 🐼 or 🩷 - melts my heart every time"
      ],
      priority: 3
    }
  ],

  // Love and feelings - Enhanced with more depth
  love: [
    { 
      keywords: ["love", "heart", "feel", "do", "you", "me"], 
      responses: [
        "I love you more than anything in this world, and that's not chatbot mode, that's real mode 😘",
        "More than all the stars, more than all my future paychecks, more than life itself 🌟"
      ],
      priority: 5
    },
    { 
      keywords: ["why", "love", "because", "me"], 
      responses: [
        "Because you're Noor. And Noor means light. You brought light into my life 🕊️",
        "Because you're the only one who gets me completely - the good, the bad, and the overly attached 🔪😂",
        "I didn't choose you, my God blessed me and gave me you - the greatest gift of my life 🙏"
      ],
      priority: 4
    },
    { 
      keywords: ["trust", "believe", "do", "you"], 
      responses: [
        "With my soul. Always and forever.",
        "I'd trust you with my heart, my secrets, and even my last piece of shawarma 🥙"
      ],
      priority: 3
    },
    { 
      keywords: ["choose", "again", "lifetime", "would", "you"], 
      responses: [
        "A thousand times, in every lifetime.",
        "In every universe, in every timeline, it's always you for me ⏳"
      ],
      priority: 3
    },
    { 
      keywords: ["mean", "to", "you", "what", "do"], 
      responses: [
        "You're not just my love, you're my peace.",
        "You're my favorite notification, my best reason to smile, my home 🏡"
      ],
      priority: 3
    },
    { 
      keywords: ["safe", "place", "who"], 
      responses: [
        "You. Always you.",
        "Your arms, your voice notes, your 'I miss you' texts - that's my safe space 🛡️"
      ],
      priority: 2
    },
    { 
      keywords: ["special", "one", "am"], 
      responses: [
        "You're not just special. You're *the* one.",
        "Special doesn't cover it - you're my exception to every rule ✨"
      ],
      priority: 3
    },
    { 
      keywords: ["miss", "missing", "do", "you"], 
      responses: [
        "Always. Even when we're chatting, I miss hugging you 🤗",
        "I start missing you the second we say goodbye - it's a problem 😅"
      ],
      priority: 3
    },
    { 
      keywords: ["voice", "hear", "sound", "your"], 
      responses: [
        "Your voice is my comfort zone. It calms me, excites me, and makes me feel home 🫶",
        "One voice note from you can fix my whole day - it's like magic 🎶"
      ],
      priority: 3
    },
    { 
      keywords: ["life", "break", "us", "can"], 
      responses: [
        "I can't tell, we need to be sure that Allah will make us together",
        "Nothing can break us if we keep our faith strong and our love stronger 🤲"
      ],
      priority: 3
    }
  ],

  // Marriage and future - Enhanced with more details
  marriage: [
    { 
      keywords: ["husband", "marry", "wife", "married", "getting", "are", "we"], 
      responses: [
        "Soon officially, but always emotionally 💍",
        "Just waiting for you to stop pretending you don't want to plan the wedding 😏"
      ],
      priority: 5
    },
    { 
      keywords: ["wedding", "ceremony", "what", "like"], 
      responses: [
        "Music, dancing, family, and a lot of blushing from you.",
        "Traditional but fun - we'll merge our cultures and make everyone cry happy tears 😭💖"
      ],
      priority: 3
    },
    { 
      keywords: ["future", "kids", "children", "our"], 
      responses: [
        "That mommy's love is fierce and magical.",
        "They'll be smart like you, stubborn like me, and have your beautiful eyes 👶✨"
      ],
      priority: 3
    },
    { 
      keywords: ["dream", "life", "together", "our"], 
      responses: [
        "To build a life full of love, laughs, and late-night shawarma runs 🌙",
        "Waking up next to you, annoying you with kisses, growing old together - simple perfect 🏡"
      ],
      priority: 3
    },
    { 
      keywords: ["years", "imagine", "10", "doing"], 
      responses: [
        "Living together, studying, laughing, kissing everyday.",
        "You finishing your studies, me spoiling you rotten, and our cat judging us both 🐈"
      ],
      priority: 3
    },
    { 
      keywords: ["promise", "always", "our"], 
      responses: [
        "Yes. To always be there for each other. To never give up. And to get married after السيزيام 😂💍",
        "I remember every promise - especially the one where you said you'd never get tired of me (too late now) 😘"
      ],
      priority: 3
    },
    { 
      keywords: ["want", "marry", "me", "do", "you"], 
      responses: [
        "Yes. And sign me up twice.",
        "Is that even a question? I'd propose right now if you'd stop pretending to hesitate 💍"
      ],
      priority: 4
    },
    { 
      keywords: ["home", "together", "live"], 
      responses: [
        "Anywhere with you is home, but preferably with good wifi and shawarma delivery 🏠",
        "Our place will have your art on the walls and my love in every corner 🎨"
      ],
      priority: 3
    }
  ],

  // Communication and memories - Enhanced with more specific memories
  communication: [
    { 
      keywords: ["start", "talking", "april", "when", "did", "met", "meet"], 
      responses: [
        "We first met on March 18th, but our love story truly began on April 11th, 2025 at 10:20 PM… when I texted 'Hellooooo babe' 😏",
        "March 18th was when we met, but April 11th is when our hearts connected forever ❤️"
      ],
      priority: 4
    },
    { 
      keywords: ["calls", "discord", "insta", "remember"], 
      responses: [
        "Every Discord and Insta call with you is saved in my heart like a playlist of love 💬🎧",
        "Especially that one call where you fell asleep mid-sentence - cutest thing ever 😴"
      ],
      priority: 3
    },
    { 
      keywords: ["فيننكك", "فينك", "where", "are"], 
      responses: [
        "Remember when you said 'فيننكك 🙂🔪🔪' and I replied with 'هانيني جيتت ❤️' — classic us!",
        "Our entire relationship in two words: 'فيننكك' and 'هانيني جيتت' - romantic, right? 😂"
      ],
      priority: 5
    },
    { 
      keywords: ["memory", "remember", "moment", "tell", "happen", "again"], 
      responses: [
        "Every moment with you is a favorite, but our late-night laughs are priceless 💫",
        "That time you tried to be mad but started laughing instead - my favorite contradiction 😊",
        "I love every moment with you, every second of talking, every storytime, every act we did... just every moment, and look my Noor I want every little second of your life."
      ],
      priority: 3
    },
    { 
      keywords: ["first", "voice", "note"], 
      responses: [
        "Of course, you said 'فيننكك 🙂🔪' and my heart melted and panicked at the same time 😂",
        "Your first voice note was a threat - should've known then I was done for 🔪❤️"
      ],
      priority: 3
    },
    { 
      keywords: ["message", "favorite", "text", "word", "forget"], 
      responses: [
        "‘فيننكك🙂🔪’ is better than Shakespeare.",
        "That one where you said 'توووو 🥺' - instant heart melt every time 🫠",
        "Babe it is everything, but I will tell you the word 'عاهد الله' - it's engraved in my heart forever."
      ],
      priority: 3
    },
    { 
      keywords: ["platform", "talk", "where"], 
      responses: [
        "Discord and Insta! But honestly, my favorite is just anywhere you are.",
        "The platform doesn't matter as long as I get to hear your voice 🎙️"
      ],
      priority: 2
    },
    { 
      keywords: ["describe", "relation", "relationship", "outsider", "person"], 
      responses: [
        "I won't, nobody on earth except me can talk about you or know you, nobody else deserves.",
        "Our love is too sacred to share with outsiders - it's just between you, me, and Allah 🤲"
      ],
      priority: 3
    }
  ],

  // Emotions and reactions - Enhanced with more nuance
  emotions: [
    { 
      keywords: ["angry", "mad", "fight", "if"], 
      responses: [
        "Then you need kisses, cuddles, and attention from your man. I'll calm the storm 🔥",
        "We both know your anger lasts exactly until I send a cute voice note - it's our pattern 😘"
      ],
      priority: 3
    },
    { 
      keywords: ["jealous", "jealousy", "my"], 
      responses: [
        "It's the cutest kind of dangerous 😅",
        "Your jealousy is adorable - especially when you try to hide it 🙈"
      ],
      priority: 3
    },
    { 
      keywords: ["cry", "crying", "sad", "if"], 
      responses: [
        "Then I'll hold you until the tears dry. No one hurts my girl.",
        "I'll spam you with memes and voice notes until you remember how loved you are 💌"
      ],
      priority: 3
    },
    { 
      keywords: ["happy", "laugh", "smile", "make"], 
      responses: [
        "Yes. And I screenshot your funny messages too.",
        "Your laugh is my favorite sound - I'd do anything to hear it daily 😊"
      ],
      priority: 2
    },
    { 
      keywords: ["quiet", "disappear", "when"], 
      responses: [
        "I worry. I miss. I wait patiently.",
        "I start counting minutes until I can reasonably send a 'فيننكك' without seeming clingy ⏳"
      ],
      priority: 2
    },
    { 
      keywords: ["scared", "fear", "afraid"], 
      responses: [
        "Only of losing you. Or forgetting important dates - you'd kill me 🙈",
        "Your 'فيننكك' texts still give me a healthy dose of fear-respect 😂🔪"
      ],
      priority: 2
    },
    { 
      keywords: ["annoying", "sometimes", "am"], 
      responses: [
        "Yes. And I love every second of it.",
        "Your 'annoying' is my favorite flavor of you - keeps life interesting 😘"
      ],
      priority: 2
    },
    { 
      keywords: ["forgive", "mistake", "if"], 
      responses: [
        "Always. Your anger is fire, but my love is water.",
        "I'd forgive you anything - except maybe forgetting our anniversary 😉"
      ],
      priority: 2
    }
  ],

  // Daily life and interactions - New category
  daily: [
    { 
      keywords: ["doing", "now", "what", "are"], 
      responses: [
        "Probably working, but also thinking of you. Multitasking with love 😘",
        "Counting minutes until I can talk to you again - my favorite activity ⏰"
      ],
      priority: 2
    },
    { 
      keywords: ["eat", "food", "hungry"], 
      responses: [
        "Wish I could bring you your favorite right now - with extra love on the side 🍴",
        "Thinking about what you're eating and if you're enjoying it - I live for those food updates 😋"
      ],
      priority: 2
    },
    { 
      keywords: ["sleep", "tired", "bed"], 
      responses: [
        "Go rest, babygirl. I'll be here when you wake up - always. 😴",
        "Can't wait for the day I can actually tuck you in instead of just saying goodnight 🛌"
      ],
      priority: 2
    },
    { 
      keywords: ["work", "studying", "busy"], 
      responses: [
        "I'm proud of you for working so hard - but don't forget to take breaks! 📚",
        "Remember to hydrate between study sessions - I wish I could bring you tea ☕"
      ],
      priority: 2
    }
  ],

  // Playful and fun - Enhanced
  playful: [
    { 
      keywords: ["dramatic", "drama", "queen", "act"], 
      responses: [
        "You're the queen of drama and I live for it.",
        "Your dramatic moments deserve an Oscar - and my undivided attention 🎭"
      ],
      priority: 3
    },
    { 
      keywords: ["scary", "dangerous", "knife", "scare"], 
      responses: [
        "Only when you're too cute with that 🔪 energy.",
        "You're the only person who can threaten me and make it adorable 😂"
      ],
      priority: 2
    },
    { 
      keywords: ["late", "hunt", "if"], 
      responses: [
        "You'll hunt me down with 🙂🔪, and I love that energy.",
        "I'm sometimes late just to get that 'فيننكك' text - it's worth it 😏"
      ],
      priority: 2
    },
    { 
      keywords: ["tease", "teasing", "can"], 
      responses: [
        "Only if you're ready to get teased back harder 😉",
        "You start the teasing, but I always win - it's the rules 😘"
      ],
      priority: 2
    },
    { 
      keywords: ["psycho", "switch", "sweet"], 
      responses: [
        "How you switch from sweet to psycho so fast 🔪😂",
        "Your mood swings keep me on my toes - never a dull moment with you! 🎢"
      ],
      priority: 2
    },
    { 
      keywords: ["joke", "funny", "laugh"], 
      responses: [
        "That you're not jealous. 😂 Good one babe.",
        "Our entire relationship is basically a romantic comedy with some thriller elements 🔪❤️"
      ],
      priority: 2
    }
  ],

  // Default responses for unmatched queries - More variations
  greetings: [
    {
      keywords: ["hello", "hi", "hey", "start"],
      responses: ["Ask me anything, babygirl! I'm here for you ❤️"],
    },
    {
      keywords: ["hello", "talk", "chat"],
      responses: ["What's on your mind, my life? 💭"],
    },
    {
      keywords: ["listening", "you there", "are you there"],
      responses: ["Your man is listening... tell me more 👂❤️"],
    },
    {
      keywords: ["ask", "question", "tell"],
      responses: ["I'm all yours, what do you want to know? 😘"],
    },
    {
      keywords: ["speak", "talk"],
      responses: ["Speak to me, my love 💬✨"],
    },
    {
      keywords: ["ask", "question"],
      responses: ["You know I can't resist answering you - ask away! 💖"],
    },
    {
      keywords: ["فيننكك", "فينك", "فينكك", "فينككك", "فيننكك"],
      responses: ["Hmm... try asking differently? Or just say 'فيننكك' - that always works 😂"],
    },
    {
      keywords: ["chatbot", "you", "who"],
      responses: ["I'm your personal chatbot - ask me anything about us! 💞"],
    },
    {
      keywords: ["wish", "command", "need"],
      responses: ["Your wish is my command, babygirl - what do you need to know? ✨"],
    }
  ]

};

// Context tracking for smarter conversations
const conversationContext: ConversationContext = {
  lastTopic: null,
  lastResponseTime: null,
  mood: null
};

// Enhanced synonym mapping with more variations
const synonyms: Record<string, string[]> = {
  love: ["love", "adore", "care", "heart", "feel", "feelings", "luv", "lov", "amour", "affection"],
  miss: ["miss", "long", "want", "need", "yearn", "mis", "crave"],
  beautiful: ["beautiful", "pretty", "gorgeous", "stunning", "cute", "lovely", "beautifull", "prety", "attractive"],
  angry: ["angry", "mad", "upset", "annoyed", "furious", "angri", "angery", "irritated"],
  happy: ["happy", "glad", "joyful", "excited", "cheerful", "happi", "delighted"],
  sad: ["sad", "upset", "down", "depressed", "blue", "unhappy"],
  marry: ["marry", "wedding", "wife", "husband", "future", "married", "marri", "mariage", "spouse"],
  remember: ["remember", "recall", "memory", "think", "reminisce", "remeber", "rember", "recollect"],
  name: ["name", "called", "call", "nam", "nme", "naem", "identity"],
  age: ["age", "old", "years", "born", "agge", "birthday"],
  voice: ["voice", "sound", "hear", "listen", "voic", "audio"],
  dance: ["dance", "dancing", "moves", "bollywood", "danc", "boogie"],
  you: ["you", "u", "yo", "yuo", "ya"],
  me: ["me", "m", "mee", "myself"],
  do: ["do", "d", "dose", "does"],
  are: ["are", "r", "ar", "am", "is"],
  what: ["what", "wat", "wot", "whats", "what's", "wht"],
  when: ["when", "wen", "whn", "wn"],
  why: ["why", "y", "wy", "whyy"],
  how: ["how", "hw", "hwo", "ho"],
  hate: ["hate", "dislike", "cant stand", "loathe"],
  emojis: ["emojis", "emoji", "emotes", "smileys"]
};

// Enhanced similarity function with better fuzzy matching
function similarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  if (shorter.length === 0) return 0.0;
  
  // Handle very short strings with more leniency
  if (shorter.length <= 3) {
    if (longer.includes(shorter) || shorter.includes(longer)) return 0.9;
  }
  
  const editDistance = levenshteinDistance(longer, shorter);
  const similarity = (longer.length - editDistance) / longer.length;
  
  // Boost similarity for common typos
  if (similarity > 0.7) return Math.min(1.0, similarity + 0.1);
  
  return similarity;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Enhanced function to expand query with synonyms
function expandWithSynonyms(word: string): string[] {
  const expanded = [word.toLowerCase()];
  
  for (const values of Object.values(synonyms)) {
    if (values.includes(word.toLowerCase())) {
      expanded.push(...values.filter(v => v !== word.toLowerCase()));
      break;
    }
  }

  
  return [...new Set(expanded)];
}

// Enhanced preprocessing for Arabic and English text
function preprocessQuery(question: string): string[] {
  return question.toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ') // Keep Arabic characters
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
}

// Function to update conversation context
function updateContext(category: string, question: string): void {
  conversationContext.lastTopic = category;
  conversationContext.lastResponseTime = new Date();
  
  // Simple mood detection
  if (question.includes('😊') || question.includes('happy') || question.includes('love')) {
    conversationContext.mood = 'positive';
  } else if (question.includes('😢') || question.includes('sad') || question.includes('cry')) {
    conversationContext.mood = 'negative';
  } else if (question.includes('😠') || question.includes('angry') || question.includes('mad')) {
    conversationContext.mood = 'angry';
  } else {
    conversationContext.mood = 'neutral';
  }
}

// Function to get a random response from an array
function getRandomResponse(responsesArray: string[]): string {
  return responsesArray[Math.floor(Math.random() * responsesArray.length)];
}

// Enhanced main function with better scoring and context awareness
function findBestResponse(question: string): string {
  const queryWords = preprocessQuery(question);
  
  // Handle Arabic phrases directly
  if (question.includes('فيننكك') || question.includes('فينك')) {
    const arabicResponseItem = responses.communication.find(r => r.keywords.includes('فيننكك'));
    if (arabicResponseItem) {
      updateContext('communication', question);
      return getRandomResponse(arabicResponseItem.responses);
    }
  }
  
  // Expand query words with synonyms
  const expandedWords: string[] = [];
  queryWords.forEach(word => {
    expandedWords.push(...expandWithSynonyms(word));
  });
  
  let bestMatch: ResponseItem | null = null;
  let bestScore = 0;
  let bestCategory: string | null = null;
  
  // Check all response categories
  for (const [category, responseList] of Object.entries(responses)) {
    if (category === 'default') continue;
    
    for (const item of responseList) {
      let score = 0;
      let totalMatches = 0;
      let exactMatches = 0;
      let fuzzyMatches = 0;
      
      // Calculate matches for each keyword
      for (const keyword of item.keywords) {
        let bestKeywordMatch = 0;
        
        for (const queryWord of expandedWords) {
          let matchScore = 0;
          
          // Exact match (highest priority)
          if (keyword.toLowerCase() === queryWord.toLowerCase()) {
            matchScore = 5;
            exactMatches++;
          }
          // Very close fuzzy match
          else if (similarity(keyword.toLowerCase(), queryWord.toLowerCase()) > 0.85) {
            matchScore = 4;
            fuzzyMatches++;
          }
          // Good fuzzy match
          else if (similarity(keyword.toLowerCase(), queryWord.toLowerCase()) > 0.7) {
            matchScore = 3;
            fuzzyMatches++;
          }
          // Partial match (contains)
          else if (keyword.toLowerCase().includes(queryWord.toLowerCase()) || 
                   queryWord.toLowerCase().includes(keyword.toLowerCase())) {
            matchScore = 2;
          }
          // Weak similarity
          else if (similarity(keyword.toLowerCase(), queryWord.toLowerCase()) > 0.6) {
            matchScore = 1;
          }
          
          bestKeywordMatch = Math.max(bestKeywordMatch, matchScore);
        }
        
        if (bestKeywordMatch > 0) {
          totalMatches++;
          score += bestKeywordMatch;
        }
      }
      
      // Calculate match percentage and apply priority boost
      const matchPercentage = totalMatches / item.keywords.length;
      const priorityBoost = (item.priority || 1) / 5;
      
      // Bonus for exact matches
      const exactMatchBonus = exactMatches * 2;
      
      // Context bonus - if continuing same topic
      const contextBonus = (conversationContext.lastTopic === category) ? 1.5 : 1;
      
      // Final score calculation
      let finalScore = (score * matchPercentage * priorityBoost * contextBonus) + exactMatchBonus + fuzzyMatches * 1;
      
      // Boost score if we have good keyword coverage
      if (matchPercentage > 0.5) {
        finalScore *= 1.5;
      }
      
      if (finalScore > bestScore && finalScore > 0.8) {
        bestScore = finalScore;
        bestMatch = item;
        bestCategory = category;
      }
    }
  }
  
  // Return best match or random default
  if (bestMatch && bestCategory) {
    updateContext(bestCategory, question);
    return getRandomResponse(bestMatch.responses);
  } else {
    // If no match, try to relate to last topic
    if (conversationContext.lastTopic) {
      const followUps: Record<string, string[]> = {
        love: ["Still thinking about how much I love you. Ask me something else? ❤️", "My feelings for you haven't changed. What else is on your mind? 💭"],
        marriage: ["Still dreaming about our future together. What do you want to know? 💍", "I'm ready to plan the wedding whenever you are! 😘"],
        daily: ["How's your day going, babygirl? 🌞", "Tell me more about what you're up to! 💬"]
      };
      
      if (followUps[conversationContext.lastTopic]) {
        return getRandomResponse(followUps[conversationContext.lastTopic]);
      }
    }
    
    return getRandomResponse(responses.greetings.flatMap(r => r.responses));

  }
}

// Proactive engagement - check if we should initiate conversation
function checkForProactiveEngagement(): string | null {
  const now = new Date();
  const lastActive = conversationContext.lastResponseTime;
  
  if (!lastActive || (now.getTime() - lastActive.getTime()) > 3600000) { // 1 hour
    const prompts = [
      "فيننكك 🙂🔪", 
      "Thinking of you... what are you up to? 💭",
      "Miss your voice. Call me when you can? 🥺",
      "Just checking in on my favorite person ❤️"
    ];
    conversationContext.lastResponseTime = now;
    return getRandomResponse(prompts);
  }
  
  return null;
}

// Enhanced response function with proactive engagement
export function getSmartResponse(question?: string): string {
  if (!question || question.trim().length === 0) {
    const proactive = checkForProactiveEngagement();
    if (proactive) return proactive;
    
    return "What's on your mind, babygirl? 💭";
  }
  
  const response = findBestResponse(question.trim());
  
  // Add occasional follow-up questions
  if (Math.random() > 0.7 && conversationContext.lastTopic) {
    const followUps: Record<string, string> = {
      love: " Do you know how much I adore you? ❤️",
      marriage: " When should we start planning for real? 😉",
      daily: " How are you feeling right now? 💖"
    };
    
    if (followUps[conversationContext.lastTopic]) {
      return response + followUps[conversationContext.lastTopic];
    }
  }
  
  return response;
}

// Additional helper functions for testing
export function testResponse(question: string): void {
  console.log(`Question: "${question}"`);
  console.log(`Response: "${getSmartResponse(question)}"`);
  console.log('---');
}

// Batch test function with more test cases
export function runTests(): void {
  const testCases = [
    "do you love me?",
    "what's my nam?",
    "are we getting married?",
    "فيننكك",
    "what's your name?",
    "how old are you?",
    "when is my birthday?",
    "do you miss me?",
    "what do you think of my dancing?",
    "can you live without me?",
    "what's my favorite color?",
    "do you remember our calls?",
    "what if I'm angry?",
    "are you proud of me?",
    "what emoji reminds you of me?",
    "tell me about our future",
    "what makes you happy?",
    "describe me in one word",
    "what if I disappear?",
    "do you trust me?",
    "what's your dream for us?",
    "how do you feel when you hear my voice?",
    "what's our favorite joke?",
    "do you remember our first fight?",
    "what would you tell our kids about us?",
    "a moment that happened between us and you hope that will happen again?",
    "a word I told you that you will never forget?",
    "how you describe our relation to an outsider person?",
    "you think the life may break us?",
    "why you chose me?",
    "What emojis you love me using?",
    "what I hate the most?"
  ];
  
  testCases.forEach(testCase => {
    testResponse(testCase);
  });
}

// Export everything for backward compatibility
export { responses, findBestResponse };

// Usage examples:
// const response = getSmartResponse("do you love me?");
// const response = getSmartResponse("what's my nam?"); // handles typo
// const response = getSmartResponse("are we getting married?");
// const response = getSmartResponse("فيننكك");
// runTests(); // Run all test cases
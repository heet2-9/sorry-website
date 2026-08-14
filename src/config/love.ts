export interface PromiseCardItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  handwrittenNote: string;
  isFeatured?: boolean;
}

export interface LoveConfig {
  girlfriendName: string;
  musicUrl?: string; // e.g. "/song.mp3" or external audio URL
  nicknames: {
    name: string;
    aaru: string;
    baby: string;
    madamJii: string;
  };
  opening: {
    eyebrow: string;
    question: string;
    subLine1: string;
    subLine2: string;
  };
  attemptMessages: {
    attempt1: string;
    attempt2: string;
    attempt3: string;
    attempt4: string;
    attempt5: string;
    attempt7: string;
    attempt10Header: string;
    attempt10Sub: string;
    easterEggHint: string;
    randomPool: string[];
  };
  promisePage: {
    thankYouHeader: string;
    mainTitle: string;
    subLine1: string;
    subLine2: string;
    forYouAaru: string;
    cards: PromiseCardItem[];
    madamJiiNote: {
      header: string;
      stubbornText: string;
      promise: string;
    };
    allOpenedNote: {
      header: string;
      reallyMeanThem: string;
    };
    oneMoreThing: {
      header: string;
      notPerfectLine: string;
      actionsMeaningLine: string;
      sorryMattersLine: string;
      becomingBetterLine: string;
    };
    cuteHug: {
      andNow: string;
      comeHereBaby: string;
      oweYouHugSubtitle: string;
      justKidding: string;
      iOweYouOne: string;
    };
    finalLove: {
      iLoveYouAaru: string;
      keepChoosingYou: string;
      alwaysBaby: string;
    };
    secretEasterEgg: {
      line1: string;
      line2: string;
      line3: string;
    };
  };
}

export const loveConfig: LoveConfig = {
  girlfriendName: "Aarya",
  musicUrl: "/song.mpeg", // Place your MP3 file inside the public/ folder as "song.mp3" or update this URL
  nicknames: {
    name: "Aarya",
    aaru: "Aaru",
    baby: "Baby",
    madamJii: "Madam Jii",
  },

  opening: {
    eyebrow: "Madam jii yrr..🥺",
    question: "Maaf kar dona plss😭",
    subLine1: "I know I can't change what happened.",
    subLine2: "But I hope I can make things better.",
  },

  attemptMessages: {
    attempt1: "Hey... wait 😭",
    attempt2: "Are you sure? 🥺",
    attempt3: "Please reconsider...",
    attempt4: "You're really trying to click that? 😭",
    attempt5: "My heart can't handle this 😭❤️",
    attempt7: "I admire your determination 😂",
    attempt10Header: "TEN TIMES?! 😭",
    attempt10Sub: "You really don't want to forgive me, huh? 🥺",
    easterEggHint: "Psst... the Yes button is right there. 👀",

    randomPool: [
      "That button seems a little shy today 👀",
      "Nope. Try again 😭",
      "I think the button knows you love me. 🥺",
      "Okay okay... I promise I'll do better.",
      "The No button has officially entered escape mode 😂",
      "Why are you chasing it? 😭",
      "It escaped again. I'm sorry 😂",
      "Okay... this button is definitely on my side.",
      "You almost got it! ...almost. 👀",
      "The No button said: absolutely not. 😂",
      "I think we both know where this is going... 🥺❤️",
      "One more try? Maybe? 😭",
      "I'm starting to think this button is scared of you. 👀",
      "Please don't bully the poor No button 😂",
      "Fine, I'll keep asking nicely. 🥺",
    ],
  },

  promisePage: {
    thankYouHeader: "Thank you, Aaruu.. ❤️",
    mainTitle: "Loveee You Madam jii🫶🥹",
    subLine1: "I can't promise I'll never make a mistake...",
    subLine2: "But I can promise to keep learning from them.",
    forYouAaru: "For you, Aaru. 🌷",

    cards: [
      {
        id: 1,
        emoji: "🫶",
        title: "I'll Listen Better.",
        description: "Not just hear you... but actually listen to what you're trying to tell me.",
        handwrittenNote: "Your feelings deserve my attention. ❤️",
      },
      {
        id: 2,
        emoji: "🌷",
        title: "I'll Communicate Instead of Assuming.",
        description: "I'll ask instead of assuming. I'll talk instead of letting misunderstandings grow.",
        handwrittenNote: "No more unnecessary overthinking, okay Aaru? 🥺",
      },
      {
        id: 3,
        emoji: "🥺",
        title: "I'll Think Before I Speak.",
        description: "Because sometimes words can hurt more than we realize. I'll be more careful with mine.",
        handwrittenNote: "Especially with you, Baby. ❤️",
      },
      {
        id: 4,
        emoji: "❤️",
        title: "I'll Never Take Your Feelings Lightly.",
        description: "Even when I don't completely understand how you feel, I'll respect that you feel it. I want you to feel heard, understood and valued.",
        handwrittenNote: "Your feelings matter to me, Aarya.",
      },
      {
        id: 5,
        emoji: "✨",
        title: "I'll Keep Choosing Us.",
        description: "Not just when everything is perfect. Especially when things get difficult. I'll choose patience. I'll choose understanding. I'll choose us.",
        handwrittenNote: "Every time.",
        isFeatured: true,
      },
    ],

    madamJiiNote: {
      header: "And yes, Madam Jii...",
      stubbornText: "I'll try to be a little less stubborn. 😂❤️",
      promise: "Promise.",
    },

    allOpenedNote: {
      header: "Okay... those are my promises.",
      reallyMeanThem: "And I really mean them.",
    },

    oneMoreThing: {
      header: "One More Thing Aarya",
      notPerfectLine: "I don't expect everything to become perfect just because you i made this website for you",
      actionsMeaningLine: "I just want to make sure my actions slowly give meaning to these promises.",
      sorryMattersLine: "Because saying sorry matters...",
      becomingBetterLine: "But becoming better matters more.",
    },

    cuteHug: {
      andNow: "And now...",
      comeHereBaby: "Come here, Baby. 🫂",
      oweYouHugSubtitle: "You still owe me a hug for making me build all of this. 😂❤️",
      justKidding: "Just kidding.",
      iOweYouOne: "I owe you one.",
    },

    finalLove: {
      iLoveYouAaru: "I love you, Aaru. ❤️",
      keepChoosingYou: "And I'll keep choosing you.",
      alwaysBaby: "Always, Baby.",
    },

    secretEasterEgg: {
      line1: "P.S. Aaru...",
      line2: "I really hope you're smiling right now. 🥺❤️",
      line3: "Mission accomplished. 😌",
    },
  },
};

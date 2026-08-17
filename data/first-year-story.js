/**
 * First Year Story Data for Prathamesh Salokhe's Cinematic Anime Portfolio
 * Contains scene metadata, timestamps, narration text, and visual triggers.
 */

export const firstYearStory = {
  chapterId: "first-year",
  chapterTitle: "First Year: The Beginning",
  totalScenes: 11,
  scenes: [
    {
      id: "admission",
      number: 1,
      title: "Admission Day",
      bgImage: "images/first-year/admission.png",
      audioSrc: "audio/first-year/admission.mp3",
      effect: "rain",
      duration: 42,
      storyLines: [
        { text: "Okay... let's go back to where everything actually started.", start: 0, end: 4.2 },
        { text: "My first day of college.", start: 4.2, end: 6.5, emphasis: true },
        { text: "I still remember coming to college for admission.", start: 6.5, end: 10.0 },
        { text: "And of course... because apparently my college journey needed a dramatic opening scene...", start: 10.0, end: 15.5 },
        { text: "...it was raining.", start: 15.5, end: 18.0, emphasis: true },
        { text: "And just to make things even more interesting... there was a power failure.", start: 18.0, end: 23.5 },
        { text: "No proper lights, no perfect beginning... just rain, darkness, and me standing there for my admission.", start: 23.5, end: 30.5 },
        { text: "And that day, I officially took admission in Artificial Intelligence and Data Science.", start: 30.5, end: 36.0, highlight: "Artificial Intelligence and Data Science" },
        { text: "At that time, I had absolutely no idea how much this decision was going to change my life.", start: 36.0, end: 42.0 }
      ]
    },
    {
      id: "beginning",
      number: 2,
      title: "First Year Beginning",
      bgImage: "images/first-year/beginning.png",
      audioSrc: "audio/first-year/beginning.mp3",
      effect: "classroom",
      duration: 19,
      storyLines: [
        { text: "Then came my first year.", start: 0, end: 3.0, emphasis: true },
        { text: "Honestly... it wasn't exactly a smooth beginning.", start: 3.0, end: 7.0 },
        { text: "I had just come back from a long vacation, and my brain was still in vacation mode.", start: 7.0, end: 13.0 },
        { text: "Studying?", start: 13.0, end: 15.0, emphasis: true },
        { text: "Yeah... I wasn't really interested.", start: 15.0, end: 19.0 }
      ]
    },
    {
      id: "friends",
      number: 3,
      title: "New Friends",
      bgImage: "images/first-year/friends.png",
      audioSrc: "audio/first-year/friends.mp3",
      effect: "warm-glow",
      duration: 17,
      storyLines: [
        { text: "Instead, I started making new friends.", start: 0, end: 4.0, emphasis: true },
        { text: "And with new friends came some of my best memories.", start: 4.0, end: 8.5 },
        { text: "We spent time together, laughed a lot...", start: 8.5, end: 12.5 },
        { text: "...and slowly, college started feeling like home.", start: 12.5, end: 17.0 }
      ]
    },
    {
      id: "gaming",
      number: 4,
      title: "Gaming & Memories",
      bgImage: "images/first-year/gaming.webp",
      audioSrc: "audio/first-year/gaming.mp3",
      effect: "gaming-neon",
      duration: 15,
      storyLines: [
        { text: "And of course... we played games. A lot.", start: 0, end: 5.0, emphasis: true },
        { text: "Those gaming sessions weren't just about winning.", start: 5.0, end: 9.5 },
        { text: "They became some of the memories that made my first year special.", start: 9.5, end: 15.0 }
      ]
    },
    {
      id: "learning",
      number: 5,
      title: "Discovering Technology",
      bgImage: "images/first-year/learning.webp",
      audioSrc: "audio/first-year/learning.mp3",
      effect: "tech-floating",
      techIcons: ["C", "C++", "HTML", "CSS", "AutoCAD"],
      duration: 33,
      storyLines: [
        { text: "But somewhere between all those games, friendships and fun... I actually started learning.", start: 0, end: 6.5 },
        { text: "My first year introduced me to technology.", start: 6.5, end: 10.0 },
        { text: "I learned C and C++.", start: 10.0, end: 13.0, highlight: "C & C++" },
        { text: "Then I explored HTML and CSS.", start: 13.0, end: 16.5, highlight: "HTML & CSS" },
        { text: "I also learned AutoCAD.", start: 16.5, end: 19.5, highlight: "AutoCAD" },
        { text: "I wasn't an expert. I was just experimenting...", start: 19.5, end: 24.0 },
        { text: "...trying things... breaking things...", start: 24.0, end: 28.0 },
        { text: "...and slowly figuring out what I enjoyed.", start: 28.0, end: 33.0 }
      ]
    },
    {
      id: "idea-lab",
      number: 6,
      title: "The IDEA LAB Project",
      bgImage: "images/first-year/idea-lab.webp",
      audioSrc: "audio/first-year/idea-lab.mp3",
      effect: "blueprint-glow",
      projectTitle: "AI Matrix Light for Vehicles",
      duration: 28,
      storyLines: [
        { text: "Then came one of the moments I still remember clearly.", start: 0, end: 4.5 },
        { text: "We had a subject called IDEA LAB.", start: 4.5, end: 8.0, emphasis: true },
        { text: "The idea was simple... take a real problem and try to build something that could actually help solve it.", start: 8.0, end: 15.0 },
        { text: "Our team worked on a project called AI Matrix Light for Vehicles.", start: 15.0, end: 20.5, highlight: "AI Matrix Light for Vehicles" },
        { text: "The goal was to use intelligent lighting to improve visibility and help reduce the chances of accidents.", start: 20.5, end: 28.0 }
      ]
    },
    {
      id: "competition",
      number: 7,
      title: "Competition Win",
      bgImage: "images/first-year/competition.webp",
      audioSrc: "audio/first-year/competition.mp3",
      effect: "trophy-particles",
      duration: 16,
      storyLines: [
        { text: "And somehow... our project won the IDEA LAB project competition.", start: 0, end: 6.0, emphasis: true, highlight: "1ST PLACE WINNER" },
        { text: "That was one of my first real moments where I thought...", start: 6.0, end: 10.5 },
        { text: "...wait... maybe I can actually build something meaningful.", start: 10.5, end: 16.0 }
      ]
    },
    {
      id: "festivals",
      number: 8,
      title: "Festivals & Social Events",
      bgImage: "images/first-year/festivals.webp",
      audioSrc: "audio/first-year/festivals.mp3",
      effect: "festival-sparks",
      duration: 22,
      storyLines: [
        { text: "But first year wasn't only about academics and projects.", start: 0, end: 4.5 },
        { text: "There were festivals too.", start: 4.5, end: 7.5 },
        { text: "Dandiya. Ganpati. Social events.", start: 7.5, end: 12.0, highlight: "Dandiya • Ganpati • Social Events" },
        { text: "Those days were completely different from normal college days.", start: 12.0, end: 16.5 },
        { text: "Music... friends... laughing... and taking random photos.", start: 16.5, end: 22.0 }
      ]
    },
    {
      id: "memories",
      number: 9,
      title: "Real Memories & Photographs",
      bgImage: "images/first-year/memories.webp",
      audioSrc: "audio/first-year/memories.mp3",
      effect: "photo-carousel",
      photos: [
        { src: "photos/first-year/photo1.jpg", caption: "College Campus Moments" },
        { src: "photos/first-year/photo2.jpg", caption: "Friends & Laughter" },
        { src: "photos/first-year/photo3.jpg", caption: "IDEA LAB Project Demo" },
        { src: "photos/first-year/photo4.jpg", caption: "Festivals & Celebrations" },
        { src: "photos/first-year/photo5.jpg", caption: "Unforgettable First Year Days" }
      ],
      duration: 12,
      storyLines: [
        { text: "And honestly... these photographs aren't just photographs.", start: 0, end: 5.5 },
        { text: "They are little pieces of the person I was during that time.", start: 5.5, end: 12.0 }
      ]
    },
    {
      id: "result",
      number: 10,
      title: "Academic Result",
      bgImage: "images/first-year/result.webp",
      audioSrc: "audio/first-year/result.mp3",
      effect: "cgpa-reveal",
      cgpa: "8.87",
      duration: 36,
      storyLines: [
        { text: "And surprisingly...", start: 0, end: 2.5 },
        { text: "...despite the fact that I started my first year with almost zero motivation to study...", start: 2.5, end: 8.5 },
        { text: "...I finished the year with an 8.87 CGPA.", start: 8.5, end: 13.0, highlight: "8.87 CGPA", emphasis: true },
        { text: "Looking back, that number means more to me than just marks.", start: 13.0, end: 18.0 },
        { text: "Because my first year wasn't about becoming a perfect student.", start: 18.0, end: 22.5 },
        { text: "It was about adjusting. Making friends. Trying new things.", start: 22.5, end: 27.5 },
        { text: "Learning technology. Having fun.", start: 27.5, end: 31.0 },
        { text: "And slowly discovering what I wanted to become.", start: 31.0, end: 36.0 }
      ]
    },
    {
      id: "ending",
      number: 11,
      title: "First Year Complete",
      bgImage: "images/first-year/ending.webp",
      audioSrc: "audio/first-year/ending.mp3",
      effect: "sunset-glow",
      isEnding: true,
      duration: 29,
      storyLines: [
        { text: "So yeah... that was my first year.", start: 0, end: 4.0, emphasis: true },
        { text: "I came to college on a rainy admission day... with no idea what was waiting for me.", start: 4.0, end: 10.0 },
        { text: "And I left my first year with new friends, new skills, my first project achievement, countless memories...", start: 10.0, end: 17.5 },
        { text: "...and a small feeling that maybe... this field was actually meant for me.", start: 17.5, end: 24.0 },
        { text: "But that... was only the beginning.", start: 24.0, end: 29.0, emphasis: true }
      ]
    }
  ]
};

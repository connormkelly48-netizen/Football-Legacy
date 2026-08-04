import { RandomEvent, Player } from '../types';

export const RANDOM_EVENTS: RandomEvent[] = [
  // --- EXISTING BASE EVENTS ---
  {
    id: "breakthrough_season",
    title: "🚀 Breakthrough Season!",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: (p: Player) => p.age <= 21 && p.ovr < 80,
    execute: (p: Player) => {
      const bonus = Math.floor(Math.random() * 2) + 2; // +2 or +3 OVR
      p.ovr += bonus;
      return {
        ovrDelta: bonus,
        legacyBonus: 250,
        text: `You experienced a dramatic breakthrough season! Your confidence skyrocketed, granting an extra +${bonus} OVR!`
      };
    }
  },
  {
    id: "late_bloomer_spark",
    title: "✨ Late Bloomer Spark",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: (p: Player) => p.age >= 24 && p.age <= 28,
    execute: (p: Player) => {
      p.ovr += 2;
      return {
        ovrDelta: 2,
        legacyBonus: 200,
        text: "Pundits praised your refined tactical maturity this season! You gained +2 OVR unexpectedly."
      };
    }
  },
  {
    id: "veteran_renaissance",
    title: "👑 Veteran Renaissance",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: (p: Player) => p.age >= 32,
    execute: (p: Player) => {
      p.ovr += 1;
      return {
        ovrDelta: 1,
        legacyBonus: 300,
        text: "Defying your age, your supreme positioning led to an exceptional campaign! You gained +1 OVR instead of declining."
      };
    }
  },
  {
    id: "motivation_dip",
    title: "📉 Motivation Dip",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: (p: Player) => p.ovr > 75,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return {
        ovrDelta: -1,
        legacyBonus: 0,
        text: "Off-pitch distractions impacted your training focus. You suffered a temporary -1 OVR setback."
      };
    }
  },
  {
    id: "minor_injury_setback",
    title: "🩹 Minor Injury Setback",
    category: "INJURY",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return {
        ovrDelta: -1,
        legacyBonus: 0,
        text: "A recurring hamstring niggle disrupted your match rhythm late in the season (-1 OVR)."
      };
    }
  },
  {
    id: "peak_conditioning",
    title: "💪 Peak Physical Conditioning",
    category: "INJURY",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return {
        ovrDelta: 1,
        legacyBonus: 100,
        text: "Work with a specialist sports scientist boosted your stamina and agility (+1 OVR)."
      };
    }
  },
  {
    id: "board_takeover",
    title: "💼 Billionaire Board Takeover",
    category: "CLUB",
    isInteractive: true,
    rarity: "uncommon",
    condition: () => true,
    description: "A wealthy consortium completed a takeover of your club! The new chairman approaches you personally with two options:",
    choices: [
      {
        label: "🌟 Accept Super-Star Target Role",
        description: "Embrace the pressure. Target immediate trophies.",
        resolve: (p: Player) => {
          p.ovr += 2;
          return {
            ovrDelta: 2,
            legacyBonus: 500,
            text: "You relished the high-pressure spotlight! The club invested in elite squad players around you (+2 OVR, +500 Legacy Score)."
          };
        }
      },
      {
        label: "🛡️ Request Team-First Balanced Growth",
        description: "Avoid pressure. Focus on squad cohesion.",
        resolve: () => {
          return {
            ovrDelta: 0,
            legacyBonus: 200,
            text: "You kept a cool head. Squad morale remained stable with zero added pressure (+200 Legacy Score)."
          };
        }
      }
    ]
  },
  {
    id: "transfer_ultimatum",
    title: "⚡ Transfer Ultimatum",
    category: "CAREER",
    isInteractive: true,
    rarity: "uncommon",
    condition: (p: Player) => p.ovr >= 78,
    description: "Your recent performances attracted major European media attention. Your agent suggests pushing for a high-profile move.",
    choices: [
      {
        label: "📝 Request Official Transfer",
        description: "Force a move to a bigger club next season.",
        resolve: () => {
          return {
            ovrDelta: 0,
            legacyBonus: 100,
            text: "Your transfer request was accepted! You will receive higher-tier transfer offers this window.",
            forceHigherOffers: true
          };
        }
      },
      {
        label: "🤝 Declare Loyalty to Current Club",
        description: "Reject transfer rumors and commit your future.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return {
            ovrDelta: 1,
            legacyBonus: 400,
            text: "Fans praised your loyalty! Your standing at the club soared (+1 OVR, +400 Legacy Score)."
          };
        }
      }
    ]
  },
  {
    id: "golden_generation",
    title: "🎓 Youth Academy Golden Generation",
    category: "CLUB",
    isInteractive: true,
    rarity: "rare",
    condition: () => true,
    description: "A wave of talented academy youngsters joined the senior squad. The manager asks if you will mentor the new prodigy.",
    choices: [
      {
        label: "👨‍🏫 Mentor the Youth Star",
        description: "Spend extra time coaching the youngster.",
        resolve: () => {
          return {
            ovrDelta: 0,
            legacyBonus: 600,
            text: "Your leadership elevated the entire club's future! You earned massive respect (+600 Legacy Score)."
          };
        }
      },
      {
        label: "🎯 Focus Exclusively on Your Own Game",
        description: "Maintain 100% focus on individual training.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return {
            ovrDelta: 1,
            legacyBonus: 100,
            text: "Your intense personal regime paid off with sharper match stats (+1 OVR)."
          };
        }
      }
    ]
  },

  // ==========================================
  // --- POSITIVE NEW EVENTS (1 TO 50) ---
  // ==========================================
  {
    id: "ev_pos_01_breakthrough_season",
    title: "🚀 Breakthrough Season",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: (p: Player) => p.age <= 22,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 300, text: "You announced yourself to world football with a stellar breakthrough season! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_02_late_bloomer",
    title: "🌟 Late Bloomer",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: (p: Player) => p.age >= 24 && p.age <= 28,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 250, text: "Tactical understanding clicked late in your career, unlocking peak performance! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_03_rapid_development",
    title: "⚡ Rapid Development",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: (p: Player) => p.age <= 21,
    execute: (p: Player) => {
      p.ovr += 3;
      return { ovrDelta: 3, legacyBonus: 350, text: "An astonishing physical and technical growth spurt elevated your game to new heights! (+3 OVR)" };
    }
  },
  {
    id: "ev_pos_04_confidence_boost",
    title: "🔥 Confidence Boost",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "very_common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 150, text: "A series of decisive match-winning moments gave you supreme confidence on the ball! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_05_perfect_preseason",
    title: "⚽ Perfect Pre-Season",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 200, text: " Flawless summer conditioning and friendly goals set you up for a sensational campaign! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_06_fitness_programme",
    title: "🏋️ Elite Fitness Programme",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 150, text: "Tailored sports science regimens enhanced your stamina, speed, and recovery. (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_07_world_class_mentor",
    title: "🧠 World-Class Mentor",
    category: "DEVELOPMENT",
    isInteractive: true,
    rarity: "rare",
    condition: () => true,
    description: "A legendary veteran striker joins your club and offers to take you under his wing after training sessions.",
    choices: [
      {
        label: "📖 Absorb Tactical Wisdom",
        description: "Focus on match reading and off-the-ball positioning.",
        resolve: (p: Player) => {
          p.ovr += 2;
          return { ovrDelta: 2, legacyBonus: 500, text: "Your mentor's subtle positional advice transformed your match intelligence! (+2 OVR)" };
        }
      },
      {
        label: "⚡ Focus On Raw Athletic Instincts",
        description: "Rely on natural explosive pace and flair.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 800, text: "You maintained your unique instinctual flair and won over fan hearts nationwide! (+800 Legacy)" };
        }
      }
    ]
  },
  {
    id: "ev_pos_08_new_manager_favourite",
    title: "👔 New Manager's Favourite",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 200, text: "The newly appointed manager built the team's tactics around your key strengths! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_09_tactical_fit",
    title: "🧩 Tactical System Fits Perfectly",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 300, text: "The club's new formation suits your natural movement like a glove! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_10_becomes_first_choice",
    title: "🥇 Becomes First Choice",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 250, text: "You cemented your position as the undisputed first-name on the team sheet! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_11_club_captain",
    title: "👑 Club Captain",
    category: "CLUB",
    isInteractive: true,
    rarity: "rare",
    condition: (p: Player) => p.age >= 23,
    description: "The senior squad voted you as the new team captain! How will you wear the armband?",
    choices: [
      {
        label: "📢 Vocal On-Pitch Leader",
        description: "Demanding excellence from every teammate.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return { ovrDelta: 1, legacyBonus: 800, text: "Your commanding presence rallied the squad through tough fixtures! (+1 OVR, +800 Legacy)" };
        }
      },
      {
        label: "🧘 Lead Quietly By Example",
        description: "Focus on personal composure and consistency.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 600, text: "Your ice-cold composure inspired the squad without unnecessary dressing-room drama! (+600 Legacy)" };
        }
      }
    ]
  },
  {
    id: "ev_pos_12_national_team_debut",
    title: "🌐 National Team Debut",
    category: "WORLD",
    isInteractive: false,
    rarity: "uncommon",
    condition: (p: Player) => p.intCaps >= 1,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 400, text: "Earning your senior international cap brought immense national pride and media praise! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_13_national_team_captain",
    title: "🎖️ National Team Captain",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.intCaps >= 20,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 1000, text: "Leading your nation onto the international stage elevated you into an iconic ambassador! (+1 OVR, +1000 Legacy)" };
    }
  },
  {
    id: "ev_pos_14_dream_transfer",
    title: "✈️ Dream Transfer",
    category: "CAREER",
    isInteractive: true,
    rarity: "rare",
    condition: (p: Player) => p.ovr >= 80,
    description: "A world mega-club submitted a glowing inquiry to sign you as their next flagship star.",
    choices: [
      {
        label: "📝 Push For The Dream Move",
        description: "Guarantee higher-tier transfer offers this window.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 1200, text: "Your agent opened direct talks! Expect marquee European offers this window.", forceHigherOffers: true };
        }
      },
      {
        label: "❤️ Stay Loyal to Current Project",
        description: "Refuse the mega-offer and build your local legacy.",
        resolve: (p: Player) => {
          p.ovr += 2;
          return { ovrDelta: 2, legacyBonus: 1500, text: "Your loyalty ignited legendary fan adoration! (+2 OVR, +1500 Legacy)" };
        }
      }
    ]
  },
  {
    id: "ev_pos_15_fans_favourite",
    title: "❤️ Fans' Favourite",
    category: "CLUB",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 350, text: "The supporters created a custom chant in your honour, singing your name every matchday! (+350 Legacy)" };
    }
  },
  {
    id: "ev_pos_16_media_darling",
    title: "📰 Media Darling",
    category: "WORLD",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 300, text: "Pundits consistently highlighted your highlights on national sports broadcasts! (+300 Legacy)" };
    }
  },
  {
    id: "ev_pos_17_sponsorship_boom",
    title: "💰 Sponsorship Boom",
    category: "CAREER",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 450, text: "Major sportswear brands competed to sign you as their global brand ambassador! (+450 Legacy)" };
    }
  },
  {
    id: "ev_pos_18_leadership_growth",
    title: "📢 Leadership Growth",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 200, text: "Your voice in team huddles transformed match momentum during tight finishes! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_19_big_match_specialist",
    title: "🎯 Big Match Specialist",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 400, text: "You scored or created crucial goals in derby matches and cup finals! (+1 OVR, +400 Legacy)" };
    }
  },
  {
    id: "ev_pos_20_clinical_finisher",
    title: "⚽ Clinical Finisher",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 300, text: "Hours of extra shooting drills paid off with lethal xG conversion in front of goal! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_21_creative_genius",
    title: "🎨 Creative Genius",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 300, text: "Your visionary through-balls continuously unlocked stubborn low-block defenses! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_22_defensive_masterclass",
    title: "🛡️ Defensive Masterclass",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 300, text: "Imperious tackles and interception instincts made you an unbreachable wall! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_23_playmaker_evolution",
    title: "🎼 Playmaker Evolution",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 350, text: "Dictating the tempo of matches from midfield earned you rave reviews nationwide! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_24_golden_boot_challenge",
    title: "🏆 Golden Boot Challenge",
    category: "CAREER",
    isInteractive: true,
    rarity: "rare",
    condition: () => true,
    description: "You find yourself near the top of the league goalscoring charts approaching the final run-in.",
    choices: [
      {
        label: "🎯 Shoot At Every Opportunity",
        description: "Prioritise individual goals over team passing.",
        resolve: (p: Player) => {
          p.ovr += 2;
          return { ovrDelta: 2, legacyBonus: 500, text: "Your relentless goal-scoring streak dazzled fans! (+2 OVR, +500 Legacy)" };
        }
      },
      {
        label: "🤝 Team-First Unselfish Play",
        description: "Pass to better-positioned teammates.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 700, text: "Your selfless play secured vital team victories and earned dressing-room praise! (+700 Legacy)" };
        }
      }
    ]
  },
  {
    id: "ev_pos_25_ucl_hero",
    title: "🇪🇺 Champions League Hero",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.ovr >= 82,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 1200, text: "Unforgettable European night heroics etched your name into Champions League history! (+2 OVR, +1200 Legacy)" };
    }
  },
  {
    id: "ev_pos_26_world_cup_hero",
    title: "🌍 World Cup Hero",
    category: "WORLD",
    isInteractive: false,
    rarity: "legendary",
    condition: (p: Player) => p.intCaps >= 5,
    execute: (p: Player) => {
      p.ovr += 3;
      return { ovrDelta: 3, legacyBonus: 2000, text: "Masterclass performances on the World Cup stage captivated billions of viewers across the planet! (+3 OVR, +2000 Legacy)" };
    }
  },
  {
    id: "ev_pos_27_euro_hero",
    title: "🏆 European Championship Hero",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.intCaps >= 5,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 1500, text: "Sensational knockout tournament goals carried your national side to glory! (+2 OVR, +1500 Legacy)" };
    }
  },
  {
    id: "ev_pos_28_legendary_partnership",
    title: "🤝 Legendary Partnership",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 400, text: "An telepathic dynamic with your teammate created the most feared tandem in the league! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_29_winning_mentality",
    title: "🏆 Winning Mentality",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 300, text: "Refusing to accept defeat turned multiple losing positions into late victories! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_30_iron_man",
    title: "🛡️ Iron Man (No Injuries)",
    category: "INJURY",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 250, text: "You completed 100% of competitive matches without missing a single minute to injury! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_31_veteran_renaissance",
    title: "👑 Veteran Renaissance",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.age >= 32,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 600, text: "Pundits were silenced as your veteran intelligence produced a career-best statistical season! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_32_homegrown_hero",
    title: "🏡 Homegrown Hero",
    category: "CLUB",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 500, text: "As a local boy done good, your connection with the matchday faithful is unbreakable! (+500 Legacy)" };
    }
  },
  {
    id: "ev_pos_33_youth_academy_success_story",
    title: "🌱 Youth Academy Success Story",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: (p: Player) => p.age <= 20,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 300, text: "Your meteoric rise from academy prodigy to senior star inspired young kids everywhere! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_34_record_transfer",
    title: "💸 Record Transfer",
    category: "CAREER",
    isInteractive: true,
    rarity: "rare",
    condition: (p: Player) => p.ovr >= 84,
    description: "A world-record breaking transfer fee offer arrives on the club president's desk.",
    choices: [
      {
        label: "💰 Accept Historic Mega-Deal",
        description: "Become the most expensive transfer headline.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 1000, text: "The astronomical transfer fee set breaking news alerts worldwide!", forceHigherOffers: true };
        }
      },
      {
        label: "🛡️ Reject The Money & Stay",
        description: "Prove that loyalty cannot be bought with money.",
        resolve: (p: Player) => {
          p.ovr += 2;
          return { ovrDelta: 2, legacyBonus: 1500, text: "Turning down mega-money cemented your immortal status at the club! (+2 OVR, +1500 Legacy)" };
        }
      }
    ]
  },
  {
    id: "ev_pos_35_massive_reputation_boost",
    title: "⭐ Massive Reputation Boost",
    category: "WORLD",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 500, text: "Global football magazines featured your portrait on their front covers worldwide! (+500 Legacy)" };
    }
  },
  {
    id: "ev_pos_36_club_legend_status",
    title: "🏛️ Club Legend Status",
    category: "CLUB",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.totalApps >= 100,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 1000, text: "A massive stadium banner was unveiled commemorating your legendary club service! (+2 OVR, +1000 Legacy)" };
    }
  },
  {
    id: "ev_pos_37_hall_of_fame_candidate",
    title: "🎖️ Hall of Fame Candidate",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.age >= 28,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 1500, text: "Experts officially listed you among the all-time greats destined for the Hall of Fame! (+1500 Legacy)" };
    }
  },
  {
    id: "ev_pos_38_perfect_season",
    title: "✨ Perfect Season",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "legendary",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 3;
      return { ovrDelta: 3, legacyBonus: 2000, text: "Goals, assists, trophies, and flawless ratings... You experienced an immortal campaign! (+3 OVR, +2000 Legacy)" };
    }
  },
  {
    id: "ev_pos_39_unstoppable_form",
    title: "🔥 Unstoppable Form",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 300, text: "Opposition defenders simply could not contain your sharp acceleration and skill! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_40_career_revival",
    title: "🔄 Career Revival",
    category: "CAREER",
    isInteractive: false,
    rarity: "uncommon",
    condition: (p: Player) => p.ovr < 75,
    execute: (p: Player) => {
      p.ovr += 3;
      return { ovrDelta: 3, legacyBonus: 500, text: "Reinventing your tactical role sparked a dramatic resurgence in your performance! (+3 OVR)" };
    }
  },
  {
    id: "ev_pos_41_training_obsession",
    title: "🏃 Training Obsession",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "very_common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 150, text: "First to arrive at training and last to leave—your relentless work ethic delivered gains! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_42_improved_professionalism",
    title: "🧘 Improved Professionalism",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 200, text: "Adopting strict nutrition and sleep analytics maximized your energy levels. (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_43_tactical_intelligence",
    title: "🧠 Tactical Intelligence",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 1;
      return { ovrDelta: 1, legacyBonus: 250, text: "Studying opposition video footage allowed you to read every play seconds in advance! (+1 OVR)" };
    }
  },
  {
    id: "ev_pos_44_position_change_success",
    title: "🔄 Position Change Success",
    category: "DEVELOPMENT",
    isInteractive: true,
    rarity: "uncommon",
    condition: () => true,
    description: "The coaching staff suggests testing you in a new secondary position to maximize your tactical impact.",
    choices: [
      {
        label: "🔄 Embrace Versatile Tactical Adaptation",
        description: "Learn the new role to help squad flexibility.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return { ovrDelta: 1, legacyBonus: 400, text: "Your versatility made you an indispensable tactical asset! (+1 OVR, +400 Legacy)" };
        }
      },
      {
        label: "🎯 Specialize In Core Position",
        description: "Refuse position changes to master your current role.",
        resolve: (p: Player) => {
          p.ovr += 2;
          return { ovrDelta: 2, legacyBonus: 100, text: "Refining your primary role paid off with lethal specialized stats! (+2 OVR)" };
        }
      }
    ]
  },
  {
    id: "ev_pos_45_goal_scoring_explosion",
    title: "⚽ Goal Scoring Explosion",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 350, text: "A run of consecutive hat-tricks thrilled fans and shattered club goal records! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_46_assist_machine",
    title: "🅰️ Assist Machine",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 350, text: "Precision crosses and key passes saw you lead the league assist leaderboard! (+2 OVR)" };
    }
  },
  {
    id: "ev_pos_47_international_recognition",
    title: "🌐 International Recognition",
    category: "WORLD",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 350, text: "Respected international coaches singled you out as one of football's premier talents! (+350 Legacy)" };
    }
  },
  {
    id: "ev_pos_48_ballon_dor_momentum",
    title: "🏆 Ballon d'Or Momentum",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.ovr >= 86,
    execute: (p: Player) => {
      p.ovr += 2;
      return { ovrDelta: 2, legacyBonus: 1200, text: "Widespread media campaigns positioned you among the front-runners for the Golden Ball! (+2 OVR, +1200 Legacy)" };
    }
  },
  {
    id: "ev_pos_49_global_superstar",
    title: "🌟 Global Superstar",
    category: "WORLD",
    isInteractive: false,
    rarity: "legendary",
    condition: (p: Player) => p.ovr >= 88,
    execute: (p: Player) => {
      p.ovr += 3;
      return { ovrDelta: 3, legacyBonus: 2500, text: "Your fame transcended sports into pop culture, solidifying you as a household global icon! (+3 OVR, +2500 Legacy)" };
    }
  },
  {
    id: "ev_pos_50_goat_debate",
    title: "🐐 Greatest Of All Time Debate",
    category: "WORLD",
    isInteractive: false,
    rarity: "legendary",
    condition: (p: Player) => p.ovr >= 92,
    execute: (p: Player) => {
      p.ovr += 3;
      return { ovrDelta: 3, legacyBonus: 3000, text: "Analysts officially debated whether your prime peak surpassed the historic legends of football history! (+3 OVR, +3000 Legacy)" };
    }
  },

  // ==========================================
  // --- NEGATIVE NEW EVENTS (51 TO 100) ---
  // ==========================================
  {
    id: "ev_neg_51_long_term_injury",
    title: "🚑 Long-Term Injury",
    category: "INJURY",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 2);
      return { ovrDelta: -2, legacyBonus: 0, text: "A severe tendon tear sidelined you for 6 months, hampering your physical sharpness. (-2 OVR)" };
    }
  },
  {
    id: "ev_neg_52_acl_injury",
    title: "💔 ACL Injury",
    category: "INJURY",
    isInteractive: false,
    rarity: "rare",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 3);
      return { ovrDelta: -3, legacyBonus: 0, text: "A heartbreaking knee ligament injury required reconstructive surgery and months of grueling rehab. (-3 OVR)" };
    }
  },
  {
    id: "ev_neg_53_broken_leg",
    title: "🦴 Broken Leg",
    category: "INJURY",
    isInteractive: false,
    rarity: "rare",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 3);
      return { ovrDelta: -3, legacyBonus: 0, text: "A heavy late tackle resulted in a fractured tibia, cutting your season short. (-3 OVR)" };
    }
  },
  {
    id: "ev_neg_54_repeated_muscle_injuries",
    title: "🩹 Repeated Muscle Injuries",
    category: "INJURY",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Recurring calf tightness repeatedly broke up your match continuity. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_55_injury_prone",
    title: "⚠️ Injury Prone",
    category: "INJURY",
    isInteractive: false,
    rarity: "very_common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Minor niggly injuries prevented you from reaching 100% peak rhythm. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_56_loss_of_confidence",
    title: "📉 Loss Of Confidence",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "very_common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A few missed chances led to overthinking and hesitation on the pitch. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_57_poor_form",
    title: "🥶 Poor Form",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A cold streak of sub-par match ratings tested your mental resilience. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_58_confidence_crisis",
    title: "🧠 Confidence Crisis",
    category: "DEVELOPMENT",
    isInteractive: true,
    rarity: "uncommon",
    condition: () => true,
    description: "Doubt has crept deep into your game following a string of poor team performances.",
    choices: [
      {
        label: "🧠 Hire Elite Mindset Coach",
        description: "Invest personal time in mental conditioning.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return { ovrDelta: 1, legacyBonus: 200, text: "Mental coaching restored your belief and sharpened your focus! (+1 OVR)" };
        }
      },
      {
        label: "🏃 Grind Harder In Training",
        description: "Push through the slump without extra support.",
        resolve: (p: Player) => {
          p.ovr = Math.max(48, p.ovr - 1);
          return { ovrDelta: -1, legacyBonus: 0, text: "Overtraining led to fatigue and worsened your slump. (-1 OVR)" };
        }
      }
    ]
  },
  {
    id: "ev_neg_59_new_manager_distrust",
    title: "👔 New Manager Doesn't Trust You",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "The incoming head coach prefers a different tactical profile for your position. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_60_benched",
    title: "🪑 Benched",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A tactical shift saw you dropped to the substitute bench for key matches. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_61_transfer_listed",
    title: "📋 Transfer Listed",
    category: "CAREER",
    isInteractive: true,
    rarity: "uncommon",
    condition: () => true,
    description: "The club board officially placed you on the transfer list due to squad restructuring.",
    choices: [
      {
        label: "✈️ Demand Immediate Transfer",
        description: "Instruct your representative to secure a new club.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 100, text: "You requested an exit! You will receive new club transfer offers this window.", forceHigherOffers: true };
        }
      },
      {
        label: "⚔️ Fight For Your Spot",
        description: "Refuse to leave and force your way back into the team.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return { ovrDelta: 1, legacyBonus: 300, text: "Your fierce determination impressed coaches and earned back your place! (+1 OVR)" };
        }
      }
    ]
  },
  {
    id: "ev_neg_62_loan_listed",
    title: "🔄 Loan Listed",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "The manager deemed you in need of temporary loan experience to maintain match fitness. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_63_contract_dispute",
    title: "⚖️ Contract Dispute",
    category: "CLUB",
    isInteractive: true,
    rarity: "uncommon",
    condition: () => true,
    description: "Contract extension negotiations hit a bitter stalemate between your agent and the executive director.",
    choices: [
      {
        label: "💼 Hold Firm On Wage Demands",
        description: "Refuse lower terms, risking club tension.",
        resolve: (p: Player) => {
          p.ovr = Math.max(48, p.ovr - 1);
          return { ovrDelta: -1, legacyBonus: 100, text: "Tension in contract talks distracted your match focus. (-1 OVR)" };
        }
      },
      {
        label: "🤝 Accept Club Compromise",
        description: "Sign the offered deal and restore team harmony.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return { ovrDelta: 1, legacyBonus: 200, text: "Signing the extension cleared your head and boosted team focus! (+1 OVR)" };
        }
      }
    ]
  },
  {
    id: "ev_neg_64_dressing_room_conflict",
    title: "💥 Dressing Room Conflict",
    category: "CLUB",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Squabbles among senior players disrupted squad harmony and chemistry. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_65_media_criticism",
    title: "🗞️ Media Criticism",
    category: "WORLD",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Harsh tabloid headlines singled out your performance after a derby defeat. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_66_fan_backlash",
    title: "🗣️ Fan Backlash",
    category: "CLUB",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Frustrated home fans whistled after a poor collective team outing. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_67_trophy_drought",
    title: "🚫 Trophy Drought",
    category: "CLUB",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 0, text: "Another trophyless campaign ended with cup knockout disappointments." };
    }
  },
  {
    id: "ev_neg_68_relegation",
    title: "📉 Relegation",
    category: "CLUB",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A nightmare season concluded with painful relegation heartbreak. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_69_club_financial_crisis",
    title: "💸 Club Financial Crisis",
    category: "CLUB",
    isInteractive: true,
    rarity: "rare",
    condition: () => true,
    description: "The club hit financial difficulties and asks key players to assist with wage deferrals.",
    choices: [
      {
        label: "🛡️ Agree To Wage Deferral",
        description: "Help save the club's financial stability.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 500, text: "Your selfless sacrifice saved club staff jobs and earned legendary fan respect! (+500 Legacy)" };
        }
      },
      {
        label: "✈️ Demand Immediate Transfer",
        description: "Protect your career and seek a move elsewhere.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 100, text: "Your transfer request was processed immediately due to club money trouble.", forceHigherOffers: true };
        }
      }
    ]
  },
  {
    id: "ev_neg_70_failed_transfer",
    title: "❌ Failed Transfer",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A deadline day move collapsed at the final minute due to paperwork delays. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_71_international_snub",
    title: "🚫 International Snub",
    category: "WORLD",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "The national team manager surprisingly excluded you from the upcoming squad call-up. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_72_international_retirement",
    title: "🏳️ International Retirement",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.age >= 30,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 300, text: "You officially stepped down from international duty to preserve club longevity! (+300 Legacy)" };
    }
  },
  {
    id: "ev_neg_73_captaincy_removed",
    title: "🚫 Captaincy Removed",
    category: "CLUB",
    isInteractive: false,
    rarity: "rare",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A tactical reshuffle saw the leadership armband handed to a new signing. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_74_declining_professionalism",
    title: "🍺 Declining Professionalism",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Late nights and poor recovery habits caught up with your fitness metrics. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_75_weight_problems",
    title: "🏋️ Weight Problems",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Returning from summer break overweight delayed your sharp match fitness. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_76_motivation_issues",
    title: "📉 Motivation Issues",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Monotony in daily training drills saw your mental sharpness drop slightly. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_77_homesick",
    title: "✈️ Homesick",
    category: "CAREER",
    isInteractive: true,
    rarity: "uncommon",
    condition: () => true,
    description: "Living far from family and friends has begun taking a toll on your day-to-day happiness.",
    choices: [
      {
        label: "✈️ Request Transfer Closer To Home",
        description: "Instruct your agent to seek domestic league offers.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 100, text: "Your transfer request was submitted to prioritize your mental wellbeing.", forceHigherOffers: true };
        }
      },
      {
        label: "🧠 Fly Family Out & Adapt",
        description: "Overcome cultural adjustment and stay focused.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return { ovrDelta: 1, legacyBonus: 300, text: "Settling into your surroundings restored your passion and form! (+1 OVR)" };
        }
      }
    ]
  },
  {
    id: "ev_neg_78_career_plateau",
    title: "⛰️ Career Plateau",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: (p: Player) => p.age >= 23,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 0, text: "Your progression stalled into a steady plateau with flat developmental growth." };
    }
  },
  {
    id: "ev_neg_79_rapid_decline",
    title: "📉 Rapid Decline",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.age >= 29,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 3);
      return { ovrDelta: -3, legacyBonus: 0, text: "A sharp physical drop-off made it difficult to keep up with intense match speeds. (-3 OVR)" };
    }
  },
  {
    id: "ev_neg_80_pace_loss",
    title: "🐢 Pace Loss",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: (p: Player) => p.age >= 28,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 2);
      return { ovrDelta: -2, legacyBonus: 0, text: "A loss of top-end sprint speed forced you to alter your positional style. (-2 OVR)" };
    }
  },
  {
    id: "ev_neg_81_serious_knee_injury",
    title: "🦵 Serious Knee Injury",
    category: "INJURY",
    isInteractive: false,
    rarity: "rare",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 2);
      return { ovrDelta: -2, legacyBonus: 0, text: "A serious meniscus tear forced a lengthy lay-off in the treatment room. (-2 OVR)" };
    }
  },
  {
    id: "ev_neg_82_misses_world_cup",
    title: "💔 Misses World Cup",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.intCaps >= 3,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A cruel late injury ruled you out of the World Cup squad on the eve of the tournament. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_83_misses_euros",
    title: "💔 Misses European Championship",
    category: "WORLD",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.intCaps >= 3,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Unexpected illness forced you to withdraw from the European Championship squad. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_84_club_administration",
    title: "📉 Club Administration",
    category: "CLUB",
    isInteractive: false,
    rarity: "rare",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Points deductions and financial collapse demoralized the entire club structure. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_85_manager_sacked",
    title: "👔 Manager Sacked",
    category: "CLUB",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 0, text: "Poor results led to the manager's dismissal, bringing uncertainty to tactics." };
    }
  },
  {
    id: "ev_neg_86_falls_out_with_manager",
    title: "🤬 Falls Out With Manager",
    category: "CLUB",
    isInteractive: true,
    rarity: "uncommon",
    condition: () => true,
    description: "A heated argument in the dugout after being substituted leaked to the sports press.",
    choices: [
      {
        label: "🗣️ Issue Public Apology",
        description: "Swallow your pride and reconcile with the boss.",
        resolve: (p: Player) => {
          p.ovr += 1;
          return { ovrDelta: 1, legacyBonus: 100, text: "Your professional apology defused the tension and restored your starting spot! (+1 OVR)" };
        }
      },
      {
        label: "🥊 Stand Your Ground",
        description: "Refuse to back down and demand a transfer.",
        resolve: (p: Player) => {
          p.ovr = Math.max(48, p.ovr - 1);
          return { ovrDelta: -1, legacyBonus: 0, text: "You were banished from first-team training. Offers will be sought.", forceHigherOffers: true };
        }
      }
    ]
  },
  {
    id: "ev_neg_87_loses_starting_position",
    title: "🪑 Loses Starting Position",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Inconsistent match ratings cost you your guaranteed starting position. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_88_goal_drought",
    title: "🧱 Goal Drought",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "A painful 12-match drought tested your patience in front of goal. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_89_transfer_value_falls",
    title: "📉 Transfer Value Falls",
    category: "CAREER",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 0, text: "Decreased match sharpness resulted in lower valuation estimates from scouts." };
    }
  },
  {
    id: "ev_neg_90_reputation_damage",
    title: "⚠️ Reputation Damage",
    category: "WORLD",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "On-pitch red cards and disciplinary issues damaged your public standing. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_91_wonderkid_failure",
    title: "💔 Wonderkid Failure",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "rare",
    condition: (p: Player) => p.age <= 23 && p.ovr < 75,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 2);
      return { ovrDelta: -2, legacyBonus: 0, text: "Unrealistic early media hype proved too heavy to bear, stalling your potential. (-2 OVR)" };
    }
  },
  {
    id: "ev_neg_92_public_scandal",
    title: "📰 Public Scandal",
    category: "WORLD",
    isInteractive: true,
    rarity: "rare",
    condition: () => true,
    description: "An off-pitch private controversy made front-page news across national tabloids.",
    choices: [
      {
        label: "💼 Hire PR Crisis Specialist",
        description: "Manage press coverage professionally.",
        resolve: () => {
          return { ovrDelta: 0, legacyBonus: 300, text: "Swift PR action contained the media story and protected your image! (+300 Legacy)" };
        }
      },
      {
        label: "🤐 Keep Silence & Ignore News",
        description: "Refuse media comments and focus on football.",
        resolve: (p: Player) => {
          p.ovr = Math.max(48, p.ovr - 1);
          return { ovrDelta: -1, legacyBonus: 0, text: "Media speculation lingered throughout the season, disrupting match focus. (-1 OVR)" };
        }
      }
    ]
  },
  {
    id: "ev_neg_93_career_collapse",
    title: "💥 Career Collapse",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "legendary",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 3);
      return { ovrDelta: -3, legacyBonus: 0, text: "A disastrous combination of injuries, poor form, and tactical misuse derailed your year. (-3 OVR)" };
    }
  },
  {
    id: "ev_neg_94_persistent_injuries",
    title: "🏥 Persistent Injuries",
    category: "INJURY",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 2);
      return { ovrDelta: -2, legacyBonus: 0, text: "Unresolved ankle ligament weakness repeatedly put you back in the medical room. (-2 OVR)" };
    }
  },
  {
    id: "ev_neg_95_loss_of_pace",
    title: "🐢 Loss Of Pace",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: (p: Player) => p.age >= 27,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Natural loss of sprint acceleration made beating defenders 1v1 harder. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_96_tactical_mismatch",
    title: "❌ Tactical Mismatch",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Being asked to play an unnatural defensive role limited your attacking output. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_97_squad_competition",
    title: "⚔️ Squad Competition Increases",
    category: "CLUB",
    isInteractive: false,
    rarity: "common",
    condition: () => true,
    execute: () => {
      return { ovrDelta: 0, legacyBonus: 0, text: "The club signed an expensive rival in your position, intensifying team competition." };
    }
  },
  {
    id: "ev_neg_98_confidence_shattered",
    title: "💔 Confidence Shattered",
    category: "DEVELOPMENT",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 2);
      return { ovrDelta: -2, legacyBonus: 0, text: "A high-profile penalty miss in a crucial derby shattered your match confidence. (-2 OVR)" };
    }
  },
  {
    id: "ev_neg_99_forgotten_talent",
    title: "👻 Forgotten Talent",
    category: "CAREER",
    isInteractive: false,
    rarity: "uncommon",
    condition: () => true,
    execute: (p: Player) => {
      p.ovr = Math.max(48, p.ovr - 1);
      return { ovrDelta: -1, legacyBonus: 0, text: "Spending long stretches in the reserves caused pundits to question your future. (-1 OVR)" };
    }
  },
  {
    id: "ev_neg_100_early_retirement_threat",
    title: "⚠️ Early Retirement Threat",
    category: "INJURY",
    isInteractive: true,
    rarity: "legendary",
    condition: (p: Player) => p.age >= 26,
    description: "Specialist doctors warned that a chronic joint issue could threaten your long-term career if unaddressed.",
    choices: [
      {
        label: "🏥 Undergo High-Risk Surgery",
        description: "Attempt a full cure to prolong elite career years.",
        resolve: (p: Player) => {
          p.ovr += 2;
          return { ovrDelta: 2, legacyBonus: 1000, text: "Surgery was a complete success! You returned stronger than ever! (+2 OVR, +1000 Legacy)" };
        }
      },
      {
        label: "🛡️ Manage Minutes Conservatively",
        description: "Avoid surgery and play through pain on reduced minutes.",
        resolve: (p: Player) => {
          p.ovr = Math.max(48, p.ovr - 2);
          return { ovrDelta: -2, legacyBonus: 0, text: "Managing pain meant reduced training intensity and lower sharpness. (-2 OVR)" };
        }
      }
    ]
  }
];

const RARITY_WEIGHTS: Record<string, number> = {
  very_common: 50,
  common: 30,
  uncommon: 15,
  rare: 4,
  legendary: 1
};

export function triggerRandomEvent(player: Player): RandomEvent | null {
  const validEvents = RANDOM_EVENTS.filter(e => e.condition(player));
  if (validEvents.length === 0) return null;

  // 35% chance for interactive choice event, 65% for auto-applied
  const isInteractiveRoll = Math.random() < 0.35;
  let pool = validEvents.filter(e => isInteractiveRoll ? e.isInteractive : !e.isInteractive);
  if (pool.length === 0) pool = validEvents;

  // Weighted random selection based on rarity
  const totalWeight = pool.reduce((acc, ev) => acc + (RARITY_WEIGHTS[ev.rarity] || 10), 0);
  let randomRoll = Math.random() * totalWeight;

  for (const event of pool) {
    const weight = RARITY_WEIGHTS[event.rarity] || 10;
    if (randomRoll < weight) {
      return event;
    }
    randomRoll -= weight;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

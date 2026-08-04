import { Player, Superstar, Position } from '../types';

export const INITIAL_SUPERSTARS: Superstar[] = [
  { id: "mbappe", name: "Kylian Mbappé", club: "Real Madrid", ovr: 91, pos: "ST", age: 27, peakOvr: 94, nationality: "France" },
  { id: "haaland", name: "Erling Haaland", club: "Manchester City", ovr: 90, pos: "ST", age: 26, peakOvr: 94, nationality: "Norway" },
  { id: "vini", name: "Vinícius Júnior", club: "Real Madrid", ovr: 89, pos: "LW", age: 26, peakOvr: 92, nationality: "Brazil" },
  { id: "bellingham", name: "Jude Bellingham", club: "Real Madrid", ovr: 88, pos: "CAM", age: 23, peakOvr: 93, nationality: "England" },
  { id: "yamal", name: "Lamine Yamal", club: "FC Barcelona", ovr: 87, pos: "RW", age: 19, peakOvr: 95, nationality: "Spain" },
  { id: "wirtz", name: "Florian Wirtz", club: "Bayer Leverkusen", ovr: 87, pos: "CAM", age: 23, peakOvr: 92, nationality: "Germany" },
  { id: "musiala", name: "Jamal Musiala", club: "Bayern Munich", ovr: 87, pos: "CAM", age: 23, peakOvr: 93, nationality: "Germany" },
  { id: "rodri", name: "Rodri", club: "Manchester City", ovr: 89, pos: "CDM", age: 30, peakOvr: 90, nationality: "Spain" },
  { id: "lautaro", name: "Lautaro Martínez", club: "Inter Milan", ovr: 87, pos: "ST", age: 28, peakOvr: 89, nationality: "Argentina" },
  { id: "kane", name: "Harry Kane", club: "Bayern Munich", ovr: 88, pos: "ST", age: 32, peakOvr: 90, nationality: "England" },
  { id: "salah", name: "Mohamed Salah", club: "Liverpool", ovr: 87, pos: "RW", age: 34, peakOvr: 90, nationality: "Egypt" },
  { id: "debruyne", name: "Kevin De Bruyne", club: "Manchester City", ovr: 87, pos: "CM", age: 34, peakOvr: 91, nationality: "Belgium" }
];

const NAMES_BY_NATION: Record<string, { first: string[]; last: string[] }> = {
  France: {
    first: ["Kylian", "Antoine", "Lucas", "Hugo", "Enzo", "Mathieu", "Rayane", "Aurélien", "Jules"],
    last: ["Dupont", "Mercier", "Moreau", "Laurent", "Giroud", "Camavinga", "Dubois", "Fontaine"]
  },
  Spain: {
    first: ["Lamine", "Pedro", "Gavi", "Marco", "Alejandro", "Pablo", "Hector", "Iker"],
    last: ["Garcia", "Torres", "Lopez", "Rodriguez", "Fernandez", "Gomez", "Ruiz", "Navarro"]
  },
  Brazil: {
    first: ["Thiago", "Gabriel", "Vinicius", "Rodrygo", "Lucas", "Matheus", "Endrick", "Caio"],
    last: ["Silva", "Santos", "Oliveira", "Ribeiro", "Lima", "Ferreira", "Costa", "Souza"]
  },
  England: {
    first: ["Jude", "Harry", "Liam", "Ethan", "Cole", "Declan", "Bukayo", "Archie"],
    last: ["Smith", "Jones", "Walker", "Palmer", "Rice", "Alexander", "Kane", "Greenwood"]
  },
  Germany: {
    first: ["Florian", "Jamal", "Noah", "Leon", "Julian", "Lukas", "Maximilian", "Felix"],
    last: ["Schmidt", "Weber", "Müller", "Hoffmann", "Schneider", "Fischer", "Wagner", "Becker"]
  },
  Argentina: {
    first: ["Julian", "Lautaro", "Enzo", "Alexis", "Mateo", "Thiago", "Franco", "Nicolas"],
    last: ["Alvarez", "Fernandez", "Mac Allister", "Martinez", "Gomez", "Romero", "Benitez"]
  },
  Italy: {
    first: ["Sandro", "Marco", "Federico", "Nicolò", "Gianluca", "Davide", "Mateo"],
    last: ["Rossi", "Moretti", "Bastoni", "Chiesa", "Barella", "Donnarumma", "Pellegrini"]
  },
  Portugal: {
    first: ["Rafael", "João", "Bernardo", "Gonçalo", "Diogo", "Vitinha", "Ruben"],
    last: ["Neves", "Silva", "Dias", "Felix", "Cancelo", "Fernandes", "Ramos"]
  },
  Netherlands: {
    first: ["Cody", "Xavi", "Frenkie", "Virgil", "Ryan", "Sven", "Denzel"],
    last: ["de Jong", "Simons", "Gakpo", "van Dijk", "Gravenberch", "de Ligt", "Dumfries"]
  },
  Norway: {
    first: ["Erling", "Martin", "Oscar", "Sander", "Leo", "Kristoffer"],
    last: ["Haaland", "Ødegaard", "Bobb", "Berge", "Ajer", "Sørloth"]
  }
};

const CLUBS = ["Real Madrid", "Manchester City", "FC Barcelona", "Bayern Munich", "Paris Saint-Germain", "Arsenal", "Liverpool", "Inter Milan", "Chelsea", "Juventus"];
const NATIONS = Object.keys(NAMES_BY_NATION);
const POSITIONS: Position[] = ["ST", "CAM", "LW", "RW", "CM", "CB"];

export function generateNewGenSuperstar(year: number): Superstar {
  const nationality = NATIONS[Math.floor(Math.random() * NATIONS.length)];
  const pool = NAMES_BY_NATION[nationality];
  const firstName = pool.first[Math.floor(Math.random() * pool.first.length)];
  const lastName = pool.last[Math.floor(Math.random() * pool.last.length)];
  const club = CLUBS[Math.floor(Math.random() * CLUBS.length)];
  const pos = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  const age = 16 + Math.floor(Math.random() * 4); // 16 - 19 y/o
  const ovr = 80 + Math.floor(Math.random() * 6); // 80 - 85 OVR
  const peakOvr = 91 + Math.floor(Math.random() * 5); // 91 - 95 OVR

  return {
    id: `regen_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: `${firstName} ${lastName}`,
    club,
    ovr,
    pos,
    age,
    peakOvr,
    nationality,
    isRegen: true
  };
}

export function advanceSuperstars(
  superstars: Superstar[],
  currentYear: number
): { updatedSuperstars: Superstar[]; retirementHeadlines: string[] } {
  const retirementHeadlines: string[] = [];
  const updatedSuperstars = superstars.map(star => {
    if (star.isRetired) return star;

    const newAge = star.age + 1;
    let newOvr = star.ovr;

    if (newAge <= 22) {
      const growth = Math.floor(Math.random() * 3) + 1;
      newOvr = Math.min(star.peakOvr, star.ovr + growth);
    } else if (newAge <= 29) {
      if (star.ovr < star.peakOvr) {
        newOvr += Math.floor(Math.random() * 2);
      } else {
        const delta = Math.floor(Math.random() * 3) - 1;
        newOvr = Math.min(star.peakOvr + 1, Math.max(82, star.ovr + delta));
      }
    } else if (newAge <= 32) {
      const decline = Math.floor(Math.random() * 2);
      newOvr = Math.max(75, star.ovr - decline);
    } else if (newAge <= 34) {
      const decline = Math.floor(Math.random() * 2) + 1;
      newOvr = Math.max(70, star.ovr - decline);
    } else {
      const decline = Math.floor(Math.random() * 3) + 2;
      newOvr = Math.max(62, star.ovr - decline);
    }

    const shouldRetire =
      newAge >= 37 ||
      (newAge >= 34 && newOvr < 78) ||
      (newAge >= 35 && Math.random() < 0.45);

    if (shouldRetire) {
      retirementHeadlines.push(
        `💔 RETIREMENT LEGEND: ${star.name} (${star.club}) has officially retired from professional football at age ${newAge}!`
      );
      return {
        ...star,
        age: newAge,
        ovr: newOvr,
        isRetired: true,
        retiredYear: currentYear
      };
    }

    return {
      ...star,
      age: newAge,
      ovr: newOvr
    };
  });

  const activeCount = updatedSuperstars.filter(s => !s.isRetired && s.ovr >= 82).length;

  if (activeCount < 9) {
    const numToGenerate = Math.min(3, 10 - activeCount);
    for (let i = 0; i < numToGenerate; i++) {
      const regen = generateNewGenSuperstar(currentYear);
      updatedSuperstars.push(regen);
      retirementHeadlines.push(
        `🌟 NEW GENERATION PRODIGY: ${regen.name} (${regen.age}y/o) breaks into world football at ${regen.club} (${regen.ovr} OVR)!`
      );
    }
  }

  return {
    updatedSuperstars,
    retirementHeadlines
  };
}

export interface MediaVerdict {
  status: string;
  text: string;
  color: string;
}

export interface SeasonPerfStats {
  apps: number;
  goals: number;
  assists: number;
  avgRating: number;
  ovrGrowth?: number;
}

/**
 * Contextual & Age-Aware Media Verdict logic.
 * Never criticizes young players simply for not reaching an arbitrary potential!
 */
export function getMediaVerdict(player: Player, seasonStats?: SeasonPerfStats): MediaVerdict {
  const age = player.age;
  const stats = seasonStats || { apps: 20, goals: 5, assists: 3, avgRating: 7.1, ovrGrowth: 1 };
  const totalContrib = stats.goals + stats.assists;

  // 1. TEENAGERS (Age 15 - 18)
  if (age <= 18) {
    if (totalContrib >= 10 || stats.avgRating >= 7.3) {
      return {
        status: "AHEAD OF SCHEDULE",
        text: `Outstanding performances for an 18y/o (${stats.goals}G/${stats.assists}A, ${stats.avgRating} avg rating)! Exceeding early expectations.`,
        color: "#F1C40F"
      };
    }
    if (stats.apps >= 12 || stats.avgRating >= 7.0) {
      return {
        status: "EXCELLENT DEVELOPMENT",
        text: `Excellent progress for a ${age}-year-old playing senior football. Gaining invaluable match experience.`,
        color: "#2ECC71"
      };
    }
    if (stats.apps >= 5) {
      return {
        status: "SETTLING INTO PROFESSIONAL FOOTBALL",
        text: `Adapting nicely to the intensity of senior football. Positive early glimpses for a ${age}yo.`,
        color: "#3498DB"
      };
    }
    return {
      status: "PROMISING YOUNG TALENT",
      text: `Impressing coaching staff in training. Plenty of time to develop as a young prospect.`,
      color: "#9B59B6"
    };
  }

  // 2. YOUNG PROSPECTS (Age 19 - 22)
  if (age <= 22) {
    if (totalContrib >= 18 || stats.avgRating >= 7.6) {
      return {
        status: "BREAKTHROUGH CAMPAIGN",
        text: `Sensational breakout season! Dominating matches and turning heads across European scouts.`,
        color: "#F1C40F"
      };
    }
    if (stats.avgRating >= 7.1 && stats.apps >= 15) {
      return {
        status: "DEVELOPING WELL",
        text: `Developing steadily at a competitive level with consistent first-team involvement.`,
        color: "#2ECC71"
      };
    }
    if (stats.apps >= 10 && stats.avgRating >= 6.8) {
      return {
        status: "ONE TO WATCH",
        text: `Displaying bright flashes of technical instinct as first-team minutes increase.`,
        color: "#3498DB"
      };
    }
    if (stats.apps < 8) {
      return {
        status: "STRUGGLING FOR MINUTES",
        text: `Limited involvement this campaign. Needs additional starter minutes to maintain progress.`,
        color: "#E67E22"
      };
    }
    if (stats.avgRating < 6.7) {
      return {
        status: "CAREER STALLING",
        text: `Form has dipped this season. Media pundits encourage a loan move to regain sharp rhythm.`,
        color: "#E74C3C"
      };
    }
    return {
      status: "CONSISTENT SQUAD MEMBER",
      text: `Solid rotational role provided steady squad depth over the campaign.`,
      color: "#3498DB"
    };
  }

  // 3. PRIME YEARS (Age 23 - 29)
  if (age <= 29) {
    if (stats.avgRating >= 7.8 || totalContrib >= 25) {
      return {
        status: "WORLD CLASS PERFORMER",
        text: `Dominating matches week in, week out. Considered a marquee reference point for ${player.club}.`,
        color: "#F1C40F"
      };
    }
    if (stats.avgRating >= 7.2) {
      return {
        status: "CONSISTENT PERFORMER",
        text: `Reliable, high-grade contributions throughout the season for ${player.club}.`,
        color: "#2ECC71"
      };
    }
    if (stats.apps >= 20) {
      return {
        status: "RELIABLE SQUAD PLAYER",
        text: `Solid squad contributor executing tactical roles effectively.`,
        color: "#3498DB"
      };
    }
    if (stats.avgRating < 6.7) {
      return {
        status: "POOR SEASON",
        text: `Underwhelming campaign failing to leave a major mark on the pitch.`,
        color: "#E74C3C"
      };
    }
    return {
      status: "PLATEAUING",
      text: `Performances have leveled off. Seeking extra consistency to make the next step.`,
      color: "#E67E22"
    };
  }

  // 4. VETERANS (Age 30+)
  if (stats.avgRating >= 7.3) {
    return {
      status: "AGELESS VETERAN MASTERCLASS",
      text: `Defying age with composed leadership and tactical brilliance on matchdays.`,
      color: "#2ECC71"
    };
  }
  if (stats.ovrGrowth && stats.ovrGrowth < 0) {
    return {
      status: "DECLINING",
      text: `Natural physical decline taking its toll, though experience remains invaluable.`,
      color: "#95A5A6"
    };
  }
  return {
    status: "EXPERIENCED LEADER",
    text: `Guiding younger teammates with professionalism and positional wisdom.`,
    color: "#3498DB"
  };
}

export function getMediaPotentialStatus(player: Player): MediaVerdict {
  return getMediaVerdict(player);
}

export interface Contender {
  name: string;
  club: string;
  ovr: number;
  score: number;
  isUser: boolean;
}

export interface YouthAward {
  title: string;
  description: string;
  icon: string;
}

export interface BallonDorResult {
  winner: Contender;
  isUserWinner: boolean;
  userRank: number | null; // Null or number if in top rankings
  top10: Contender[]; // Full Top 10 list
  youthAwards: YouthAward[];
  userPoints: number;
  userEligible: boolean;
}

/**
 * Reworked Ballon d'Or calculation with strict entry thresholds (78+ OVR or Top 20 performance)
 * and Top 10 rankings display.
 */
export function calculateBallonDor(
  player: Player,
  seasonStats: { goals: number; assists: number; avgRating: number; trophyWon: boolean; intTrophyWon?: boolean; apps?: number },
  superstars: Superstar[] = INITIAL_SUPERSTARS
): BallonDorResult {
  const activeStars = superstars.filter(s => !s.isRetired);

  // Generate dynamic performance scores for world-class CPU superstars
  const contenders: Contender[] = activeStars.map(star => {
    const simRating = 7.1 + Math.random() * 1.1; // 7.1 to 8.2 avg rating
    const simGoals = star.pos === 'ST' ? Math.floor(Math.random() * 28) + 16 : Math.floor(Math.random() * 14) + 4;
    const simAssists = star.pos === 'CAM' || star.pos === 'LW' || star.pos === 'RW' ? Math.floor(Math.random() * 16) + 7 : Math.floor(Math.random() * 8) + 2;
    const simTrophies = Math.random() > 0.55 ? 30 : 0;
    const clubPrestige = (star.club === "Real Madrid" || star.club === "Manchester City" || star.club === "Bayern Munich") ? 20 : 10;

    // Multi-factor weighted formula
    const score = (star.ovr * 3.5) + (simRating * 18) + (simGoals * 1.5) + (simAssists * 1.0) + simTrophies + clubPrestige + (Math.random() * 20 - 10);

    return {
      name: star.name,
      club: star.club,
      ovr: star.ovr,
      score,
      isUser: false
    };
  });

  // Calculate User Player Score
  const trophyBonus = (seasonStats.trophyWon ? 30 : 0) + (seasonStats.intTrophyWon ? 50 : 0);
  const userScore = (player.ovr * 3.5) + 
                    (seasonStats.avgRating * 18) + 
                    (seasonStats.goals * 1.5) + 
                    (seasonStats.assists * 1.0) + 
                    trophyBonus;

  // Strict Threshold Check:
  // Must be 78+ OVR OR have a generational breakout score to qualify for Ballon d'Or votes.
  const isUserEligible = player.ovr >= 78 || userScore >= 420;

  if (isUserEligible) {
    contenders.push({
      name: player.name,
      club: player.club,
      ovr: player.ovr,
      score: userScore,
      isUser: true
    });
  }

  // Sort candidates by score
  contenders.sort((a, b) => b.score - a.score);

  // Top 10 List
  const top10 = contenders.slice(0, 10);
  const winner = contenders[0];
  const isUserWinner = winner.isUser;
  
  const userIndex = contenders.findIndex(c => c.isUser);
  const userRank = isUserEligible && userIndex !== -1 ? userIndex + 1 : null;

  // Youth Awards for Young Players (<= 21y/o)
  const youthAwards: YouthAward[] = [];
  const apps = seasonStats.apps || 20;

  if (player.age <= 21) {
    // 1. European Golden Boy Award
    if ((player.ovr >= 74 || seasonStats.goals + seasonStats.assists >= 12) && seasonStats.avgRating >= 7.2) {
      youthAwards.push({
        title: "🏆 Golden Boy Winner",
        description: "Voted the best young under-21 player in European football!",
        icon: "GoldenBoy"
      });
    } else if (player.ovr >= 68 && seasonStats.avgRating >= 7.0 && apps >= 15) {
      youthAwards.push({
        title: "⭐ Golden Boy Shortlist",
        description: "Nominated among the top 10 under-21 prospects in Europe.",
        icon: "Shortlist"
      });
    }

    // 2. League Young Player of the Season
    if (seasonStats.avgRating >= 7.2 && apps >= 15) {
      youthAwards.push({
        title: "🥇 League Young Player of the Year",
        description: `Selected as the official Young Player of the Season in ${player.club}!`,
        icon: "YoungPlayer"
      });
    }

    // 3. World Rising Star XI
    if (apps >= 12 && seasonStats.avgRating >= 6.9) {
      youthAwards.push({
        title: "🌟 World Rising Star XI Selection",
        description: "Named in the international Under-21 Team of the Year.",
        icon: "RisingStar"
      });
    }
  }

  return {
    winner,
    isUserWinner,
    userRank,
    top10,
    youthAwards,
    userPoints: Math.round(userScore),
    userEligible: isUserEligible
  };
}

export function calculateGoldenShoe(player: Player, seasonGoals: number): boolean {
  const isEligiblePos = player.position === 'ST' || player.position === 'LW' || player.position === 'RW';
  return isEligiblePos && seasonGoals >= 32 && player.ovr >= 82;
}

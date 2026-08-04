import {
  Player,
  HiddenTrait,
  TransferOffer,
  Superstar,
  Club,
  League,
  TimelineEntry,
  WorldHeadlinePackage,
  QuickFireSummaryData,
  SeasonRecord
} from '../types';
import { getClubByName, generateClubOffers, LEAGUES_2026, evolveWorldClubsAndOwners } from '../data/database2026';
import { simulateInternationalDuty, IntSimResult } from '../data/international';
import { addTimelineEntry } from '../data/timeline';
import {
  calculateBallonDor,
  calculateGoldenShoe,
  getMediaVerdict,
  advanceSuperstars,
  INITIAL_SUPERSTARS
} from '../data/awards';
import { setWorldFeed } from '../data/world';

export const ALL_HIDDEN_TRAITS: HiddenTrait[] = [
  'LOYAL',
  'AMBITIOUS',
  'MONEY_MOTIVATED',
  'HOMEBODY',
  'JOURNEYMAN',
  'BIG_MATCH_PLAYER',
  'RISK_TAKER',
  'ACADEMY_HERO',
  'LEGEND_BUILDER',
  'TROPHY_HUNTER',
  'UNDERDOG',
  'LATE_EXPLORER',
  'LEADER',
  'MERCENARY',
  'FAN_FAVOURITE',
  'NATIONAL_HERO',
  'FAMILY_FOCUSED',
  'SETTLED',
  'ADVENTURER'
];

/**
 * Generates between 3 and 6 unique hidden traits for a player.
 */
export function generateHiddenTraits(): HiddenTrait[] {
  const count = Math.floor(Math.random() * 4) + 3; // 3 to 6
  const shuffled = [...ALL_HIDDEN_TRAITS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Helper to get country code or name from league ID (e.g. ENG_1 -> England)
 */
function getCountryFromLeagueId(leagueId: string): string {
  const league = LEAGUES_2026.find(l => l.id === leagueId);
  return league ? league.country : 'England';
}

/**
 * AI Hidden Decision Engine: Chooses a transfer offer based on player's hidden traits + football logic.
 */
export function aiSelectTransferOffer(player: Player, offers: TransferOffer[]): TransferOffer {
  if (!offers || offers.length === 0) {
    const defaultClub = getClubByName(player.club);
    return {
      id: "stay",
      club: defaultClub,
      type: 'STAY',
      label: "RE-SIGN AT CURRENT CLUB",
      tagClass: "tag-perfect",
      contractLength: 1,
      description: `Stay at ${defaultClub.name}.`
    };
  }

  const traits = player.hiddenTraits || [];
  const currentClubObj = getClubByName(player.club);
  const currentNation = getCountryFromLeagueId(currentClubObj.leagueId);

  // Calculate years at current club
  let yearsAtCurrentClub = 0;
  for (let i = player.history.length - 1; i >= 0; i--) {
    if (player.history[i].club.toLowerCase() === player.club.toLowerCase()) {
      yearsAtCurrentClub++;
    } else {
      break;
    }
  }

  let bestOffer = offers[0];
  let highestScore = -9999;

  for (const offer of offers) {
    let score = 0;

    // Base type scores
    switch (offer.type) {
      case 'STAY': score += 50; break;
      case 'SISTER_CLUB': score += 55; break;
      case 'TOO_GOOD': score += 65; break;
      case 'PERFECT': score += 60; break;
      case 'LOWER_TIER': score += 40; break;
      case 'LOAN': score += 45; break;
      case 'FORCED_TRANSFER': score += 60; break;
    }

    const offerNation = getCountryFromLeagueId(offer.club.leagueId);
    const isSameCountry = offerNation === currentNation;

    // 1. LOYAL / SETTLED / FAMILY_FOCUSED
    if (traits.includes('LOYAL') || traits.includes('SETTLED') || traits.includes('FAMILY_FOCUSED')) {
      if (offer.type === 'STAY') score += 45;
      else score -= 25;
    }

    // 2. ACADEMY_HERO
    if (traits.includes('ACADEMY_HERO')) {
      if (player.history.length === 0 || (player.history[0] && player.history[0].club.toLowerCase() === player.club.toLowerCase())) {
        if (offer.type === 'STAY') score += 50;
      }
    }

    // 3. LEGEND_BUILDER
    if (traits.includes('LEGEND_BUILDER')) {
      if (yearsAtCurrentClub >= 3 && offer.type === 'STAY') {
        score += 35;
      }
    }

    // 4. MERCENARY / JOURNEYMAN
    if (traits.includes('MERCENARY') || traits.includes('JOURNEYMAN')) {
      if (offer.type === 'STAY') score -= 35;
      else score += 35;
    }

    // 5. AMBITIOUS / TROPHY_HUNTER / BIG_MATCH_PLAYER
    if (traits.includes('AMBITIOUS') || traits.includes('TROPHY_HUNTER') || traits.includes('BIG_MATCH_PLAYER')) {
      if (offer.club.rating >= 82 || offer.type === 'TOO_GOOD') score += 40;
      if (offer.type === 'LOWER_TIER') score -= 30;
    }

    // 6. HOMEBODY
    if (traits.includes('HOMEBODY')) {
      if (isSameCountry) score += 35;
      else score -= 40;
    }

    // 7. RISK_TAKER / ADVENTURER
    if (traits.includes('RISK_TAKER') || traits.includes('ADVENTURER')) {
      if (!isSameCountry) score += 35;
    }

    // 8. LATE_EXPLORER
    if (traits.includes('LATE_EXPLORER') && player.age >= 28) {
      if (!isSameCountry) score += 40;
    }

    // 9. UNDERDOG
    if (traits.includes('UNDERDOG')) {
      if (offer.club.rating < 78 || offer.type === 'LOWER_TIER') score += 35;
      if (offer.club.rating >= 86) score -= 20;
    }

    // 10. MONEY_MOTIVATED
    if (traits.includes('MONEY_MOTIVATED')) {
      const spendingPower = offer.club.owner?.spendingPower || 5;
      score += spendingPower * 5;
    }

    // Random variance noise (-10 to +10)
    score += (Math.random() * 20 - 10);

    if (score > highestScore) {
      highestScore = score;
      bestOffer = offer;
    }
  }

  return bestOffer;
}

/**
 * Calculates season performance for Quick Fire simulation.
 */
function simulateQuickFireSeason(player: Player, club: Club): SeasonRecord {
  const baseApps = 32 + Math.floor(Math.random() * 8); // 32 to 40
  const ovrBonus = (player.ovr - 65) * 0.25;

  let baseGoals = 0;
  let baseAssists = 0;

  switch (player.position) {
    case 'ST':
      baseGoals = Math.floor(Math.random() * 15) + Math.floor(ovrBonus * 1.2);
      baseAssists = Math.floor(Math.random() * 6) + Math.floor(ovrBonus * 0.4);
      break;
    case 'LW':
    case 'RW':
    case 'CAM':
      baseGoals = Math.floor(Math.random() * 10) + Math.floor(ovrBonus * 0.8);
      baseAssists = Math.floor(Math.random() * 10) + Math.floor(ovrBonus * 0.8);
      break;
    case 'CM':
    case 'LM':
    case 'RM':
      baseGoals = Math.floor(Math.random() * 6) + Math.floor(ovrBonus * 0.5);
      baseAssists = Math.floor(Math.random() * 8) + Math.floor(ovrBonus * 0.7);
      break;
    default: // CB, LB, RB, CDM, GK
      baseGoals = Math.floor(Math.random() * 3);
      baseAssists = Math.floor(Math.random() * 4) + Math.floor(ovrBonus * 0.3);
      break;
  }

  const goals = Math.max(0, baseGoals);
  const assists = Math.max(0, baseAssists);
  const rating = parseFloat((6.8 + (player.ovr / 100) * 1.5 + Math.random() * 0.6).toFixed(2));

  // Trophy chance based on club rating
  const isTrophyWon = (club.rating >= 82 && Math.random() < 0.6) || (club.rating >= 75 && Math.random() < 0.25);
  const trophyWon = isTrophyWon ? (club.rating >= 86 ? 'UEFA Champions League' : 'Domestic League Title') : null;

  const oldOvr = player.ovr;

  return {
    year: player.year,
    age: player.age,
    club: player.club,
    leagueName: club.leagueId,
    apps: baseApps,
    goals,
    assists,
    rating,
    oldOvr,
    newOvr: oldOvr,
    ovrChange: 0,
    trophyWon,
    awardsWon: []
  };
}

/**
 * Calculates Career Rating grade (C, B, A, S, LEGENDARY)
 */
export function calculateCareerRating(player: Player, peakOvr: number): 'C' | 'B' | 'A' | 'S' | 'LEGENDARY' {
  const totalContrib = player.totalGoals + player.totalAssists;
  const trophies = player.totalTrophies;
  const ballonDors = player.ballonDorsWon;

  if (ballonDors >= 2 || (peakOvr >= 90 && trophies >= 8 && totalContrib >= 300)) {
    return 'LEGENDARY';
  }
  if (ballonDors >= 1 || (peakOvr >= 86 && trophies >= 5) || totalContrib >= 250) {
    return 'S';
  }
  if (peakOvr >= 80 || trophies >= 3 || totalContrib >= 150) {
    return 'A';
  }
  if (peakOvr >= 74 || totalContrib >= 80) {
    return 'B';
  }
  return 'C';
}

/**
 * Runs the entire Quick Fire career simulation in a single function call!
 */
export function runFullQuickFireCareer(
  initialPlayer: Player,
  initialSuperstars: Superstar[] = INITIAL_SUPERSTARS,
  initialClubs: Club[] = [],
  initialLeagues: League[] = LEAGUES_2026
): {
  finalPlayer: Player;
  summary: QuickFireSummaryData;
  timeline: TimelineEntry[];
  superstars: Superstar[];
  newsFeed: WorldHeadlinePackage[];
} {
  let player = JSON.parse(JSON.stringify(initialPlayer)) as Player;
  if (!player.hiddenTraits || player.hiddenTraits.length === 0) {
    player.hiddenTraits = generateHiddenTraits();
  }
  player.gameMode = 'QUICK_FIRE';

  let superstars = JSON.parse(JSON.stringify(initialSuperstars)) as Superstar[];
  let clubs = initialClubs.length > 0 ? JSON.parse(JSON.stringify(initialClubs)) : [];
  let timeline: TimelineEntry[] = [];
  let newsFeed: WorldHeadlinePackage[] = [];

  const startYear = player.year;
  let peakOvr = player.ovr;

  const clubTenures: Record<string, { years: number; goals: number; apps: number; trophies: number }> = {};

  while (true) {
    // 1. Check Forced Retirement
    // Forced retirement is 46 years old. If a player is 33+ years old and below 66 rated then they are also forced to retire.
    if (player.age >= 46 || (player.age >= 33 && player.ovr < 66)) {
      break;
    }

    const currentClubObj = getClubByName(player.club);

    // 2. Simulate Season
    const seasonRecord = simulateQuickFireSeason(player, currentClubObj);

    // 3. OVR Progression / Aging
    let ovrDelta = 0;
    if (player.age <= 21) {
      ovrDelta = Math.floor(Math.random() * 4) + 2; // +2 to +5
    } else if (player.age <= 27) {
      ovrDelta = Math.floor(Math.random() * 3) + 1; // +1 to +3
    } else if (player.age <= 31) {
      ovrDelta = Math.floor(Math.random() * 3) - 1; // -1 to +1
    } else {
      ovrDelta = -(Math.floor(Math.random() * 3) + 1); // -1 to -3
    }

    const oldOvr = player.ovr;
    player.ovr = Math.max(50, Math.min(99, player.ovr + ovrDelta));
    seasonRecord.oldOvr = oldOvr;
    seasonRecord.newOvr = player.ovr;
    seasonRecord.ovrChange = ovrDelta;

    if (player.ovr > peakOvr) peakOvr = player.ovr;

    // Update Totals
    player.history.push(seasonRecord);
    player.totalApps += seasonRecord.apps;
    player.totalGoals += seasonRecord.goals;
    player.totalAssists += seasonRecord.assists;
    player.avgRatingSum += seasonRecord.rating;
    if (seasonRecord.trophyWon) player.totalTrophies += 1;

    // Track Club Tenures
    if (!clubTenures[player.club]) {
      clubTenures[player.club] = { years: 0, goals: 0, apps: 0, trophies: 0 };
    }
    clubTenures[player.club].years += 1;
    clubTenures[player.club].goals += seasonRecord.goals;
    clubTenures[player.club].apps += seasonRecord.apps;
    if (seasonRecord.trophyWon) clubTenures[player.club].trophies += 1;

    // 4. International Duty
    const intResult = simulateInternationalDuty(player);
    if (intResult.calledUp) {
      player.intCaps += intResult.caps;
      player.intGoals += intResult.goals;
      if (intResult.trophyWon) {
        player.intTrophies.push(intResult.trophyWon);
        player.totalTrophies += 1;
      }
    }

    // 5. Awards (Ballon d'Or & Golden Shoe)
    const ballonDor = calculateBallonDor(player, {
      goals: seasonRecord.goals,
      assists: seasonRecord.assists,
      avgRating: seasonRecord.rating,
      trophyWon: seasonRecord.trophyWon !== null,
      intTrophyWon: intResult.trophyWon !== null,
      apps: seasonRecord.apps
    }, superstars);
    if (ballonDor.isUserWinner) {
      player.ballonDorsWon += 1;
      seasonRecord.awardsWon.push("Ballon d'Or Winner");
    }

    const goldenShoe = calculateGoldenShoe(player, seasonRecord.goals);
    if (goldenShoe) {
      player.goldenShoesWon += 1;
      seasonRecord.awardsWon.push("Golden Shoe Winner");
    }

    // 6. Timeline Entry
    const timelineEntry: TimelineEntry = {
      id: `qf_tl_${player.year}_${Math.random().toString(36).substr(2, 4)}`,
      year: player.year,
      age: player.age,
      generation: player.generation || 1,
      playerName: player.name,
      club: player.club,
      type: seasonRecord.trophyWon ? 'TROPHY' : 'MILESTONE',
      icon: seasonRecord.trophyWon ? '🏆' : '🎯',
      color: seasonRecord.trophyWon ? '#F1C40F' : '#2ECC71',
      title: `${player.year} Season Concluded`,
      description: `Played for ${player.club}. Recorded ${seasonRecord.goals} goals and ${seasonRecord.assists} assists (${seasonRecord.rating} Avg Rating).`
    };
    timeline.unshift(timelineEntry);

    // 7. World Evolution
    const adv = advanceSuperstars(superstars, player.year);
    superstars = adv.updatedSuperstars;
    if (clubs.length > 0) {
      const { updatedClubs, headlines } = evolveWorldClubsAndOwners(clubs, player.year);
      clubs = updatedClubs;
    }

    // 8. Transfers for Next Season
    const offers = generateClubOffers(player);
    const chosenOffer = aiSelectTransferOffer(player, offers);

    if (chosenOffer.type !== 'STAY' && chosenOffer.club.name !== player.club) {
      player.club = chosenOffer.club.name;
      player.clubColor = chosenOffer.club.color;
      player.clubSecondaryColor = chosenOffer.club.secondaryColor || '#FFFFFF';

      timeline.unshift({
        id: `qf_tr_${player.year}_${Math.random().toString(36).substr(2, 4)}`,
        year: player.year,
        age: player.age,
        generation: player.generation || 1,
        playerName: player.name,
        club: chosenOffer.club.name,
        type: 'TRANSFER',
        icon: '🔄',
        color: '#3498DB',
        title: `Transferred to ${chosenOffer.club.name}`,
        description: chosenOffer.description
      });
    }

    player.year += 1;
    player.age += 1;
  }

  // Finalize Summary
  const clubsPlayedList = Object.entries(clubTenures).map(([clubName, data]) => ({
    clubName,
    years: data.years,
    goals: data.goals,
    apps: data.apps,
    trophies: data.trophies
  }));

  const endYear = player.year - 1;
  const careerLength = endYear - startYear + 1;
  const totalSeasons = player.history.length;

  let legacyScore = (player.totalGoals * 5) + (player.totalAssists * 3) + (player.totalTrophies * 50) + (player.ballonDorsWon * 200) + (player.intCaps * 2) + (peakOvr * 10);
  const careerRating = calculateCareerRating(player, peakOvr);

  const recordsBroken: string[] = [];
  if (player.totalGoals >= 200) recordsBroken.push("200+ Career Club Goals");
  if (player.ballonDorsWon > 0) recordsBroken.push(`${player.ballonDorsWon}x Ballon d'Or Winner`);
  if (player.intCaps >= 50) recordsBroken.push(`${player.intCaps} International Caps`);
  if (player.totalTrophies >= 10) recordsBroken.push("Double-Digit Trophy Winner");

  const hallOfFameStatus = careerRating === 'LEGENDARY' ? 'First Ballot Legend' : careerRating === 'S' ? 'All-Time Great' : careerRating === 'A' ? 'Club Icon' : 'Professional Veteran';

  const summary: QuickFireSummaryData = {
    careerLength,
    startYear,
    endYear,
    peakOvr,
    clubsPlayed: clubsPlayedList,
    totalSeasons,
    totalApps: player.totalApps,
    totalGoals: player.totalGoals,
    totalAssists: player.totalAssists,
    totalTrophies: player.totalTrophies,
    ballonDorsWon: player.ballonDorsWon,
    goldenShoesWon: player.goldenShoesWon,
    intCaps: player.intCaps,
    intGoals: player.intGoals,
    intTrophies: player.intTrophies,
    legacyScore,
    hallOfFameStatus,
    recordsBroken,
    careerRating
  };

  return {
    finalPlayer: player,
    summary,
    timeline,
    superstars,
    newsFeed
  };
}

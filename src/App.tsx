import React, { useState, useEffect } from 'react';
import {
  Player,
  Ancestor,
  TimelineEntry,
  WorldHeadlinePackage,
  League,
  SeasonRecord,
  TransferOffer,
  RandomEvent,
  SaveSlot,
  Superstar,
  QuickFireSummaryData
} from './types';
import { Header } from './components/Header';
import { Navbar, TabType } from './components/Navbar';
import { HomeTab } from './components/HomeTab';
import { CareerTab } from './components/CareerTab';
import { LegacyTab } from './components/LegacyTab';
import { WorldTab } from './components/WorldTab';
import { MoreTab } from './components/MoreTab';

import { CreationModal } from './components/CreationModal';
import { RandomEventModal } from './components/RandomEventModal';
import { SeasonSummaryModal } from './components/SeasonSummaryModal';
import { AwardsModal } from './components/AwardsModal';
import { TransferModal } from './components/TransferModal';
import { RetirementModal } from './components/RetirementModal';
import { QuickFireSummaryModal } from './components/QuickFireSummaryModal';

import { runFullQuickFireCareer } from './utils/quickfireEngine';

import { getClubByName, generateClubOffers, LEAGUES_2026 } from './data/database2026';
import { triggerRandomEvent } from './data/events';
import { simulateInternationalDuty, IntSimResult } from './data/international';
import {
  timelineFeed,
  setTimelineFeed,
  addTimelineEntry,
  checkSeasonMilestones
} from './data/timeline';
import {
  calculateBallonDor,
  calculateGoldenShoe,
  getMediaVerdict,
  getMediaPotentialStatus,
  BallonDorResult,
  MediaVerdict,
  INITIAL_SUPERSTARS,
  advanceSuperstars
} from './data/awards';
import {
  globalNewsFeed,
  dynamicLeagues,
  setWorldFeed,
  generateSeasonHeadlines
} from './data/world';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Master State
  const [player, setPlayer] = useState<Player | null>(null);
  const [ancestors, setAncestors] = useState<Ancestor[]>([]);
  const [legacyScore, setLegacyScore] = useState<number>(0);
  const [currentGen, setCurrentGen] = useState<number>(1);
  const [localTimeline, setLocalTimeline] = useState<TimelineEntry[]>([]);
  const [newsFeed, setNewsFeed] = useState<WorldHeadlinePackage[]>([]);
  const [leagues, setLeagues] = useState<League[]>(LEAGUES_2026);
  const [superstars, setSuperstars] = useState<Superstar[]>(INITIAL_SUPERSTARS);

  // Modals Flow
  const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
  const [activeRandomEvent, setActiveRandomEvent] = useState<RandomEvent | null>(null);
  const [pendingSeasonData, setPendingSeasonData] = useState<{
    seasonRecord: SeasonRecord;
    ballonDor: BallonDorResult;
    mediaVerdict: MediaVerdict;
    goldenShoeWon: boolean;
    intResult: IntSimResult;
    retirementHeadlines?: string[];
    updatedSuperstars?: Superstar[];
  } | null>(null);

  const [showSeasonSummary, setShowSeasonSummary] = useState<boolean>(false);
  const [showAwardsModal, setShowAwardsModal] = useState<boolean>(false);
  const [activeTransferOffers, setActiveTransferOffers] = useState<TransferOffer[] | null>(null);
  const [showRetirementModal, setShowRetirementModal] = useState<boolean>(false);
  const [quickFireSummary, setQuickFireSummary] = useState<QuickFireSummaryData | null>(null);
  const [showQuickFireSummaryModal, setShowQuickFireSummaryModal] = useState<boolean>(false);

  // Load Auto-Save or Trigger Character Creation
  useEffect(() => {
    const rawAuto = localStorage.getItem('football_legacy_autosave');
    if (rawAuto) {
      try {
        const parsed: SaveSlot = JSON.parse(rawAuto);
        if (parsed.player) {
          setPlayer(parsed.player);
          setAncestors(parsed.legacyTree || []);
          setLegacyScore(parsed.legacyScore || 0);
          setCurrentGen(parsed.currentGeneration || 1);
          setLocalTimeline(parsed.timeline || []);
          setTimelineFeed(parsed.timeline || []);
          setNewsFeed(parsed.newsFeed || []);
          if (parsed.dynamicLeagues) {
            setLeagues(parsed.dynamicLeagues);
          }
          if (parsed.worldSuperstars && parsed.worldSuperstars.length > 0) {
            setSuperstars(parsed.worldSuperstars);
          } else {
            setSuperstars(INITIAL_SUPERSTARS);
          }
          setWorldFeed(parsed.newsFeed || [], parsed.dynamicLeagues || LEAGUES_2026);
          return;
        }
      } catch {
        // Fallback to fresh setup
      }
    }
    setShowCreationModal(true);
  }, []);

  // Auto-save helper
  const saveToAutoSave = (updatedPlayer: Player, updatedScore: number, updatedAncestors: Ancestor[], currentSuperstars?: Superstar[]) => {
    const autoObj: SaveSlot = {
      id: 0,
      saveName: `${updatedPlayer.name} (Auto-Save)`,
      dateSaved: new Date().toLocaleDateString(),
      player: updatedPlayer,
      legacyTree: updatedAncestors,
      legacyScore: updatedScore,
      currentGeneration: updatedPlayer.generation,
      timeline: timelineFeed,
      newsFeed: globalNewsFeed,
      dynamicLeagues: leagues,
      worldSuperstars: currentSuperstars || superstars
    };
    localStorage.setItem('football_legacy_autosave', JSON.stringify(autoObj));
  };

  // 1. Creation Handler
  const handlePlayerCreated = (newPlayer: Player) => {
    setPlayer(newPlayer);
    setShowCreationModal(false);

    // Initial timeline entry
    addTimelineEntry(
      newPlayer,
      'MILESTONE',
      'Career Kickoff',
      `Signed first professional contract with ${newPlayer.club} at 18 years old.`
    );

    setLocalTimeline([...timelineFeed]);
    saveToAutoSave(newPlayer, legacyScore, ancestors);
  };

// Dynamic OVR Progression Calculator (Age bounds, performance, league quality vs player rating)
function calculateDynamicOvrChange(
  player: Player,
  clubRating: number,
  apps: number,
  goals: number,
  assists: number,
  rating: number
): number {
  // 1. Age Bounds (Feature #6)
  let minBound = -5;
  let maxBound = 7;

  if (player.age <= 20) {
    minBound = -5;
    maxBound = 7;
  } else if (player.age <= 24) {
    minBound = -5;
    maxBound = 5;
  } else if (player.age <= 32) {
    minBound = -3;
    maxBound = 3;
  } else {
    minBound = -5;
    maxBound = 2;
  }

  // 2. Performance Factor (-3 to +4)
  let perfBonus = 0;
  if (rating >= 7.8) perfBonus += 3;
  else if (rating >= 7.4) perfBonus += 2;
  else if (rating >= 7.1) perfBonus += 1;
  else if (rating < 6.8) perfBonus -= 2;

  // Goals / Assists bonus
  const isAttacker = player.position === 'ST' || player.position === 'LW' || player.position === 'RW' || player.position === 'CAM';
  if (isAttacker && goals >= 25) perfBonus += 2;
  else if (isAttacker && goals >= 15) perfBonus += 1;
  if (assists >= 12) perfBonus += 1;

  // 3. League Quality vs Player OVR Factor
  // clubRating represents the competition standard
  let leagueQualityDelta = 0;
  const ovrGap = clubRating - player.ovr;

  if (ovrGap >= 15 && rating >= 7.2) {
    // Player is far lower rated than competition but playing well -> Massive Growth!
    leagueQualityDelta += 3;
  } else if (ovrGap >= 8) {
    leagueQualityDelta += 1;
  } else if (ovrGap <= -25) {
    // Player is 25+ OVR higher than competition (e.g. 95 OVR in a 55 OVR league)
    leagueQualityDelta -= 5;
  } else if (ovrGap <= -15) {
    // Player is 15+ OVR higher than competition -> Competition too low to maintain elite standard
    leagueQualityDelta -= 3;
  } else if (ovrGap <= -8) {
    leagueQualityDelta -= 1;
  }

  // 4. High OVR Soft Resistance (88+ hard to maintain unless top tier)
  let eliteResistance = 0;
  if (player.ovr >= 92) {
    eliteResistance = -2;
  } else if (player.ovr >= 88) {
    eliteResistance = -1;
  }

  // 5. Playing Time
  let timeFactor = 0;
  if (apps < 20) timeFactor = -2;
  else if (apps < 28) timeFactor = -1;

  // 6. Traits Bonus
  let traitBonus = 0;
  if (player.traits.some(t => t.id === 'dynasty_blood')) {
    traitBonus += 1;
  }

  // 7. Random Career Noise (-2 to +2)
  const randomNoise = Math.floor(Math.random() * 5) - 2;

  // Raw Delta
  let calculatedDelta = perfBonus + leagueQualityDelta + timeFactor + traitBonus + eliteResistance + randomNoise;

  // Enforce Strict Age Bounds
  calculatedDelta = Math.max(minBound, Math.min(maxBound, calculatedDelta));

  return calculatedDelta;
}

  // 2. Sim Season Controller
  const handleSimSeason = () => {
    if (!player) return;

    if (player.gameMode === 'QUICK_FIRE') {
      sound.playSimStart();
      const result = runFullQuickFireCareer(player, superstars, [], leagues);
      setPlayer(result.finalPlayer);
      setSuperstars(result.superstars);
      setLocalTimeline(result.timeline);
      setTimelineFeed(result.timeline);
      setQuickFireSummary(result.summary);
      setShowQuickFireSummaryModal(true);
      const newScore = legacyScore + result.summary.legacyScore;
      setLegacyScore(newScore);
      saveToAutoSave(result.finalPlayer, newScore, ancestors, result.superstars);
      return;
    }

    const club = getClubByName(player.club);

    // Calculate match stats
    const apps = Math.floor(Math.random() * 10) + 28; // 28 to 38 apps

    let posGoalFactor = 0.1;
    if (player.position === 'ST') posGoalFactor = 0.65;
    else if (player.position === 'CAM' || player.position === 'LW' || player.position === 'RW') posGoalFactor = 0.42;
    else if (player.position === 'CM' || player.position === 'LM' || player.position === 'RM') posGoalFactor = 0.22;
    else if (player.position === 'CB' || player.position === 'LB' || player.position === 'RB') posGoalFactor = 0.08;
    else if (player.position === 'GK') posGoalFactor = 0.0;

    const goals = player.position === 'GK' ? 0 : Math.floor(apps * posGoalFactor * (player.ovr / 72) * (Math.random() * 0.7 + 0.65));
    const assists = player.position === 'GK' ? 0 : Math.floor(apps * 0.22 * (player.ovr / 75) * (Math.random() * 0.8 + 0.5));
    const rating = Math.round((7.0 + (goals * 0.08) + (assists * 0.05) + (player.ovr * 0.01) + (Math.random() * 0.4 - 0.2)) * 100) / 100;

    // Calculate Dynamic OVR Delta
    const baseDelta = calculateDynamicOvrChange(player, club.rating, apps, goals, assists, rating);

    // Check for Club Trophy
    let trophyWon: string | null = null;
    if (club.rating >= 82 && rating >= 7.3 && Math.random() < 0.35) {
      trophyWon = club.rating >= 86 ? "UEFA Champions League" : "Domestic League Title";
    } else if (Math.random() < 0.15) {
      trophyWon = "Domestic Cup Trophy";
    }

    // International Duty
    const intResult = simulateInternationalDuty(player);

    // Create Base Season Record
    const oldOvr = player.ovr;
    const newOvr = Math.max(48, Math.min(99, oldOvr + baseDelta));
    const ovrChange = newOvr - oldOvr;

    const seasonRecord: SeasonRecord = {
      year: player.year,
      age: player.age,
      club: player.club,
      leagueName: club.leagueId,
      apps,
      goals,
      assists,
      rating,
      oldOvr,
      newOvr,
      ovrChange,
      trophyWon,
      awardsWon: []
    };

    // Advance AI Superstars (Aging, Decline, Retirement & Regens)
    const { updatedSuperstars, retirementHeadlines } = advanceSuperstars(superstars, player.year);
    setSuperstars(updatedSuperstars);

    // Calculate Ballon d'Or & Golden Shoe using updated active superstars
    const ballonDor = calculateBallonDor(player, {
      goals,
      assists,
      avgRating: rating,
      trophyWon: trophyWon !== null,
      intTrophyWon: intResult.trophyWon !== null,
      apps
    }, updatedSuperstars);

    const goldenShoeWon = calculateGoldenShoe(player, goals);
    const mediaVerdict = getMediaVerdict({ ...player, ovr: newOvr }, {
      apps,
      goals,
      assists,
      avgRating: rating,
      ovrGrowth: ovrChange
    });

    // Store Pending Simulation Data
    setPendingSeasonData({
      seasonRecord,
      ballonDor,
      mediaVerdict,
      goldenShoeWon,
      intResult,
      retirementHeadlines,
      updatedSuperstars
    });

    // Check for Random Event Trigger
    const event = triggerRandomEvent(player);
    if (event) {
      setActiveRandomEvent(event);
    } else {
      finalizeSeasonData(seasonRecord, ballonDor, goldenShoeWon, intResult);
    }
  };

  // 3. Resolve Random Event and Proceed
  const handleRandomEventResolved = (result: { ovrDelta: number; legacyBonus: number; text: string; forceHigherOffers?: boolean }) => {
    if (!player || !pendingSeasonData) return;

    setActiveRandomEvent(null);

    // Apply event modifiers
    const updatedRecord = { ...pendingSeasonData.seasonRecord };
    updatedRecord.newOvr = Math.max(48, Math.min(99, updatedRecord.newOvr + result.ovrDelta));
    updatedRecord.ovrChange = updatedRecord.newOvr - updatedRecord.oldOvr;

    if (result.forceHigherOffers) {
      player.isTransferListed = true;
    }

    addTimelineEntry(
      player,
      result.ovrDelta >= 0 ? 'MILESTONE' : 'INJURY',
      'Season Event Outcome',
      result.text
    );

    setLegacyScore(prev => prev + result.legacyBonus);

    finalizeSeasonData(
      updatedRecord,
      pendingSeasonData.ballonDor,
      pendingSeasonData.goldenShoeWon,
      pendingSeasonData.intResult
    );
  };

  // 4. Finalize Season Logging & Legacy Calculations
  const finalizeSeasonData = (
    sRecord: SeasonRecord,
    bDor: BallonDorResult,
    gShoe: boolean,
    intRes: IntSimResult
  ) => {
    if (!player) return;

    // Mutate Player State for Season Stats
    const updatedPlayer: Player = { ...player };
    updatedPlayer.ovr = sRecord.newOvr;
    updatedPlayer.totalApps += sRecord.apps;
    updatedPlayer.totalGoals += sRecord.goals;
    updatedPlayer.totalAssists += sRecord.assists;
    updatedPlayer.avgRatingSum += sRecord.rating;
    if (sRecord.trophyWon) updatedPlayer.totalTrophies += 1;

    if (bDor.isUserWinner) {
      updatedPlayer.ballonDorsWon += 1;
      sRecord.awardsWon.push("Ballon d'Or");
      addTimelineEntry(updatedPlayer, 'AWARD', "BALLON D'OR WINNER!", "Crown world player of the year!");
    }

    if (gShoe) {
      updatedPlayer.goldenShoesWon += 1;
      sRecord.awardsWon.push("European Golden Shoe");
    }

    // International Duty Stats
    if (intRes.calledUp) {
      updatedPlayer.intCaps += intRes.caps;
      updatedPlayer.intGoals += intRes.goals;
      updatedPlayer.intAssists += intRes.assists;
      if (intRes.isCaptain) updatedPlayer.isCaptain = true;
      if (intRes.trophyWon) {
        if (!updatedPlayer.intTrophies) updatedPlayer.intTrophies = [];
        updatedPlayer.intTrophies.push(intRes.trophyWon);
      }
    }

    // Milestones check
    checkSeasonMilestones(updatedPlayer, sRecord.apps, sRecord.goals, intRes);

    // History log
    updatedPlayer.history.push(sRecord);

    // Legacy Score calculation
    const seasonPts =
      sRecord.goals * 100 +
      sRecord.assists * 50 +
      (sRecord.trophyWon ? 1500 : 0) +
      (bDor.isUserWinner ? 5000 : 0) +
      (gShoe ? 1000 : 0) +
      (intRes.trophyWon ? 2000 : 0);

    const newLegacyScore = legacyScore + seasonPts;
    setLegacyScore(newLegacyScore);

    // World Headlines
    generateSeasonHeadlines(
      updatedPlayer,
      {
        goals: sRecord.goals,
        apps: sRecord.apps,
        trophyWon: sRecord.trophyWon
      },
      bDor,
      intRes,
      pendingSeasonData?.retirementHeadlines || []
    );

    setNewsFeed([...globalNewsFeed]);
    setLocalTimeline([...timelineFeed]);
    setPlayer(updatedPlayer);

    saveToAutoSave(updatedPlayer, newLegacyScore, ancestors, pendingSeasonData?.updatedSuperstars || superstars);

    // Open Season Summary Modal
    setShowSeasonSummary(true);
  };

  // 5. Proceed from Season Summary -> Awards Modal
  const handleProceedToAwards = () => {
    setShowSeasonSummary(false);
    setShowAwardsModal(true);
  };

  // 6. Proceed from Awards Modal -> Transfer Offers
  const handleProceedToTransfers = () => {
    if (!player) return;
    setShowAwardsModal(false);

    const offers = generateClubOffers(player);
    setActiveTransferOffers(offers);
  };

  // 7. Complete Transfer Option Selection
  const handleOfferSelected = (offer: TransferOffer) => {
    if (!player) return;

    let updatedClubName = player.club;
    let updatedColor = player.clubColor;
    let updatedSecondaryColor = player.clubSecondaryColor;

    if (offer.type !== 'STAY') {
      updatedClubName = offer.club.name;
      updatedColor = offer.club.color;
      updatedSecondaryColor = offer.club.secondaryColor || '#1E1E1E';

      addTimelineEntry(
        player,
        'TRANSFER',
        `Transfer to ${offer.club.name}`,
        `Completed contract move to ${offer.club.name} (${offer.label}).`
      );
    } else {
      addTimelineEntry(
        player,
        'MILESTONE',
        `Contract Extension`,
        `Re-signed with ${player.club} for another season.`
      );
    }

    const nextPlayer: Player = {
      ...player,
      age: player.age + 1,
      year: player.year + 1,
      club: updatedClubName,
      clubColor: updatedColor,
      clubSecondaryColor: updatedSecondaryColor,
      isTransferListed: false
    };

    setPlayer(nextPlayer);
    setActiveTransferOffers(null);
    setLocalTimeline([...timelineFeed]);

    saveToAutoSave(nextPlayer, legacyScore, ancestors);

    // Check forced retirement rule
    if (nextPlayer.age >= 46 || (nextPlayer.age >= 33 && nextPlayer.ovr < 66)) {
      setShowRetirementModal(true);
    }
  };

  // 8. Handle Return to Main Menu
  const handleReturnToMainMenu = () => {
    if (player) {
      saveToAutoSave(player, legacyScore, ancestors);
    }
    setShowQuickFireSummaryModal(false);
    setShowSeasonSummary(false);
    setShowAwardsModal(false);
    setActiveTransferOffers(null);
    setShowRetirementModal(false);
    setShowCreationModal(true);
  };

  // 9. Handle Quick Fire Continue As Child
  const handleQuickFireContinueAsChild = () => {
    if (!player) return;

    const peak = Math.max(player.ovr, ...player.history.map(h => h.ovrAfterSeason || h.newOvr || player.ovr));
    const startYr = player.history.length > 0 ? player.history[0].year : player.year;

    const newAncestor: Ancestor = {
      generation: player.generation,
      name: player.name,
      nationality: player.nationality,
      position: player.position,
      startYear: startYr,
      retireYear: player.year,
      peakOvr: peak,
      finalClub: player.club,
      totalApps: player.totalApps,
      totalGoals: player.totalGoals,
      totalAssists: player.totalAssists,
      totalTrophies: player.totalTrophies,
      ballonDorsWon: player.ballonDorsWon,
      intCaps: player.intCaps,
      intGoals: player.intGoals || 0,
      inheritedTraits: [],
      hallOfFame: player.ovr >= 85 || player.ballonDorsWon >= 1
    };

    const updatedAncestors = [...ancestors, newAncestor];
    setAncestors(updatedAncestors);
    setCurrentGen(prev => prev + 1);
    setShowQuickFireSummaryModal(false);
    setShowCreationModal(true);
  };

  // Handle Instant Sim Career
  const handleSimCareer = () => {
    if (!player) return;
    sound.playSimStart();
    const result = runFullQuickFireCareer(player, superstars, [], leagues);
    setPlayer(result.finalPlayer);
    setSuperstars(result.superstars);
    setLocalTimeline(result.timeline);
    setTimelineFeed(result.timeline);
    setQuickFireSummary(result.summary);
    setShowQuickFireSummaryModal(true);

    const newScore = (result.finalPlayer.totalGoals * 5) +
      (result.finalPlayer.totalAssists * 3) +
      (result.finalPlayer.totalTrophies * 50) +
      (result.finalPlayer.ballonDorsWon * 200) +
      (result.finalPlayer.intCaps * 2) +
      (result.summary.peakOvr * 10);

    setLegacyScore(newScore);
    saveToAutoSave(result.finalPlayer, newScore, ancestors, result.superstars);
  };

  // 10. Handle Retirement & Child Generation
  const handleRetireClick = () => {
    sound.playTap();
    setShowRetirementModal(true);
  };

  const handleProceedToChildCreation = () => {
    if (!player) return;

    // Archive ancestor
    const peakOvr = Math.max(...player.history.map(h => h.newOvr), player.ovr);
    const isHOF = peakOvr >= 85 || player.ballonDorsWon >= 1;

    const ancestorNode: Ancestor = {
      generation: player.generation,
      name: player.name,
      nationality: player.nationality,
      position: player.position,
      startYear: player.year - (player.age - 18),
      retireYear: player.year,
      peakOvr,
      finalClub: player.club,
      totalApps: player.totalApps,
      totalGoals: player.totalGoals,
      totalAssists: player.totalAssists,
      totalTrophies: player.totalTrophies,
      ballonDorsWon: player.ballonDorsWon,
      intCaps: player.intCaps,
      intGoals: player.intGoals,
      inheritedTraits: player.traits || [],
      hallOfFame: isHOF
    };

    const updatedAncestors = [...ancestors, ancestorNode];
    setAncestors(updatedAncestors);
    setCurrentGen(prev => prev + 1);

    setShowRetirementModal(false);
    setShowCreationModal(true);
  };

  // 9. Reset Dynasty
  const handleResetData = () => {
    localStorage.removeItem('football_legacy_autosave');
    setPlayer(null);
    setAncestors([]);
    setLegacyScore(0);
    setCurrentGen(1);
    setTimelineFeed([]);
    setLocalTimeline([]);
    setNewsFeed([]);
    setLeagues(LEAGUES_2026);
    setSuperstars(INITIAL_SUPERSTARS);
    setShowCreationModal(true);
  };

  // 10. Load Save Slot
  const handleLoadSave = (slot: SaveSlot) => {
    if (slot.player) {
      setPlayer(slot.player);
      setAncestors(slot.legacyTree || []);
      setLegacyScore(slot.legacyScore || 0);
      setCurrentGen(slot.currentGeneration || 1);
      setLocalTimeline(slot.timeline || []);
      setTimelineFeed(slot.timeline || []);
      setNewsFeed(slot.newsFeed || []);
      if (slot.dynamicLeagues) {
        setLeagues(slot.dynamicLeagues);
      }
      if (slot.worldSuperstars && slot.worldSuperstars.length > 0) {
        setSuperstars(slot.worldSuperstars);
      } else {
        setSuperstars(INITIAL_SUPERSTARS);
      }
      setWorldFeed(slot.newsFeed || [], slot.dynamicLeagues || LEAGUES_2026);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center items-center font-sans selection:bg-[#2ECC71] selection:text-black sm:py-6">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 min-h-screen sm:min-h-[820px] sm:max-h-[920px] sm:rounded-[36px] sm:border-[5px] sm:border-[#2A2A2A] bg-[#1E1E1E] relative overflow-hidden shadow-2xl">
        {/* Header */}
        <Header player={player} legacyScore={legacyScore} />

        {/* Tab View Contents */}
        <main className="flex-1 p-4 overflow-y-auto pb-20">
          {player && activeTab === 'home' && (
            <HomeTab
              player={player}
              legacyScore={legacyScore}
              currentGen={currentGen}
              onSimSeason={handleSimSeason}
              onSimCareer={handleSimCareer}
              onRetire={handleRetireClick}
            />
          )}

          {player && activeTab === 'career' && (
            <CareerTab
              player={player}
              timelineFeed={localTimeline}
            />
          )}

          {player && activeTab === 'legacy' && (
            <LegacyTab
              player={player}
              ancestors={ancestors}
              legacyScore={legacyScore}
            />
          )}

          {player && activeTab === 'world' && (
            <WorldTab
              player={player}
              leagues={leagues}
              newsFeed={newsFeed}
              superstars={superstars}
            />
          )}

          {activeTab === 'more' && (
            <MoreTab
              player={player}
              legacyTree={ancestors}
              legacyScore={legacyScore}
              currentGen={currentGen}
              timeline={localTimeline}
              newsFeed={newsFeed}
              leagues={leagues}
              onLoadSave={handleLoadSave}
              onResetData={handleResetData}
              onReturnToMainMenu={handleReturnToMainMenu}
            />
          )}
        </main>

        {/* Footer Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* --- MODALS OVERLAYS --- */}

      {/* Quick Fire / Career Summary Modal */}
      {showQuickFireSummaryModal && player && quickFireSummary && (
        <QuickFireSummaryModal
          player={player}
          summary={quickFireSummary}
          onViewHistory={() => {
            setShowQuickFireSummaryModal(false);
            setActiveTab('career');
          }}
          onContinueAsChild={handleQuickFireContinueAsChild}
          onReturnToMainMenu={handleReturnToMainMenu}
          onNewQuickFire={() => {
            setShowQuickFireSummaryModal(false);
            setShowCreationModal(true);
          }}
        />
      )}

      {/* Creation Modal */}
      {showCreationModal && (
        <CreationModal
          generation={currentGen}
          fatherPlayer={ancestors.length > 0 ? player : null}
          onComplete={handlePlayerCreated}
        />
      )}

      {/* Random Event Modal */}
      {activeRandomEvent && player && (
        <RandomEventModal
          event={activeRandomEvent}
          player={player}
          onResolve={handleRandomEventResolved}
        />
      )}

      {/* Season Summary Modal */}
      {showSeasonSummary && player && pendingSeasonData && (
        <SeasonSummaryModal
          player={player}
          seasonRecord={pendingSeasonData.seasonRecord}
          onProceedToAwards={handleProceedToAwards}
        />
      )}

      {/* Ballon d'Or & Awards Modal */}
      {showAwardsModal && player && pendingSeasonData && (
        <AwardsModal
          player={player}
          ballonDor={pendingSeasonData.ballonDor}
          mediaVerdict={pendingSeasonData.mediaVerdict}
          goldenShoeWon={pendingSeasonData.goldenShoeWon}
          onContinue={handleProceedToTransfers}
        />
      )}

      {/* Transfer Offer Selection Modal */}
      {activeTransferOffers && player && (
        <TransferModal
          player={player}
          offers={activeTransferOffers}
          onSelectOffer={handleOfferSelected}
        />
      )}

      {/* Retirement Modal */}
      {showRetirementModal && player && (
        <RetirementModal
          player={player}
          legacyScore={legacyScore}
          onProceedToChild={handleProceedToChildCreation}
          onClose={() => setShowRetirementModal(false)}
        />
      )}
    </div>
  );
}

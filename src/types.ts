export type Position = 
  | 'ST' | 'CAM' | 'CM' | 'CB' | 'LB' | 'RB' 
  | 'CDM' | 'LM' | 'RM' | 'LW' | 'RW' | 'GK';

export type StoryPreset = 'wonderkid' | 'standard' | 'late' | 'custom';

export interface PlayerTrait {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface SeasonRecord {
  year: number;
  age: number;
  club: string;
  leagueName: string;
  apps: number;
  goals: number;
  assists: number;
  rating: number;
  oldOvr: number;
  newOvr: number;
  ovrChange: number;
  trophyWon: string | null;
  awardsWon: string[];
}

export type ClubPhilosophy = 
  | 'YOUTH_DEVELOPMENT' 
  | 'MONEYBALL' 
  | 'LOCAL_TALENT' 
  | 'WORLD_SUPERSTARS' 
  | 'WINNING_NOW' 
  | 'FINANCIAL_STABILITY' 
  | 'LONG_TERM_DEVELOPMENT' 
  | 'SELLING_CLUB' 
  | 'BUYING_CLUB' 
  | 'DEFENSIVE_FOOTBALL' 
  | 'ATTACKING_FOOTBALL' 
  | 'BALANCED'
  | 'PROVEN_STARS'
  | 'YOUTH_ACADEMY'
  | 'BALANCED_MIX'
  | 'VETERAN_EXPERIENCE';

export type HiddenTrait = 
  | 'LOYAL'
  | 'AMBITIOUS'
  | 'MONEY_MOTIVATED'
  | 'HOMEBODY'
  | 'JOURNEYMAN'
  | 'BIG_MATCH_PLAYER'
  | 'RISK_TAKER'
  | 'ACADEMY_HERO'
  | 'LEGEND_BUILDER'
  | 'TROPHY_HUNTER'
  | 'UNDERDOG'
  | 'LATE_EXPLORER'
  | 'LEADER'
  | 'MERCENARY'
  | 'FAN_FAVOURITE'
  | 'NATIONAL_HERO'
  | 'FAMILY_FOCUSED'
  | 'SETTLED'
  | 'ADVENTURER';

export type GameMode = 'CAREER' | 'QUICK_FIRE';

export type OwnerPersonality = 
  | 'YOUTH_INVESTOR'
  | 'GALACTICO_OWNER'
  | 'BUSINESS_OWNER'
  | 'LOCAL_INVESTOR'
  | 'AGGRESSIVE_OWNER'
  | 'PATIENT_OWNER'
  | 'FINANCIALLY_CONSERVATIVE';

export interface Owner {
  id: string;
  name: string;
  personality: OwnerPersonality;
  patience: number;
  spendingPower: number;
  age: number;
}

export interface MultiClubGroup {
  id: string;
  name: string;
  clubIds: string[];
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  nationality: string;
  position: Position;
  age: number;
  ovr: number;
  mediaPot: number;
  club: string;
  clubColor: string;
  clubSecondaryColor: string;
  year: number;
  generation: number;
  traits: PlayerTrait[];
  history: SeasonRecord[];
  
  // Total Club/Career Stats
  totalApps: number;
  totalGoals: number;
  totalAssists: number;
  totalTrophies: number;
  avgRatingSum: number;
  
  // International Stats
  intCaps: number;
  intGoals: number;
  intAssists: number;
  intTrophies: string[];
  isCaptain: boolean;

  // Personal Records / Milestones
  motmAwards: number;
  goldenShoesWon: number;
  ballonDorsWon: number;

  // Transfer Status & Hidden Engine
  isTransferListed?: boolean;
  hiddenTraits?: HiddenTrait[];
  gameMode?: GameMode;
  supporterBadge?: string;
}

export interface QuickFireSummaryData {
  careerLength: number;
  startYear: number;
  endYear: number;
  peakOvr: number;
  clubsPlayed: { clubName: string; years: number; goals: number; apps: number; trophies: number }[];
  totalSeasons: number;
  totalApps: number;
  totalGoals: number;
  totalAssists: number;
  totalTrophies: number;
  ballonDorsWon: number;
  goldenShoesWon: number;
  intCaps: number;
  intGoals: number;
  intTrophies: string[];
  legacyScore: number;
  hallOfFameStatus: string;
  recordsBroken: string[];
  careerRating: 'C' | 'B' | 'A' | 'S' | 'LEGENDARY';
}

export interface Ancestor {
  generation: number;
  name: string;
  nationality: string;
  position: Position;
  startYear: number;
  retireYear: number;
  peakOvr: number;
  finalClub: string;
  totalApps: number;
  totalGoals: number;
  totalAssists: number;
  totalTrophies: number;
  ballonDorsWon: number;
  intCaps: number;
  intGoals: number;
  inheritedTraits: PlayerTrait[];
  hallOfFame: boolean;
}

export interface League {
  id: string;
  name: string;
  country: string;
  tier: number;
  rep: number;
  promotionTo: string | null;
  relegationTo: string | null;
}

export interface Club {
  id: string;
  name: string;
  leagueId: string;
  rating: number;
  color: string;
  secondaryColor?: string;
  philosophy?: ClubPhilosophy;
  stadium?: string;
  finances?: number;
  owner?: Owner;
  rivals?: string[];
  multiClubGroupId?: string;
  historicalPeak?: number;
  historicalTrough?: number;
}

export interface TransferOffer {
  id: string;
  club: Club;
  type: 'STAY' | 'TOO_GOOD' | 'PERFECT' | 'LOWER_TIER' | 'LOAN' | 'FORCED_TRANSFER' | 'SISTER_CLUB';
  label: string;
  tagClass: string;
  contractLength: number;
  description: string;
}

export interface ChoiceOption {
  label: string;
  description: string;
  resolve: (player: Player) => { ovrDelta: number; legacyBonus: number; text: string; forceHigherOffers?: boolean };
}

export interface RandomEvent {
  id: string;
  title: string;
  category: 'DEVELOPMENT' | 'INJURY' | 'CLUB' | 'WORLD' | 'CAREER';
  isInteractive: boolean;
  rarity: 'very_common' | 'common' | 'uncommon' | 'rare' | 'legendary';
  condition: (player: Player) => boolean;
  description?: string;
  choices?: ChoiceOption[];
  execute?: (player: Player) => { ovrDelta: number; legacyBonus: number; text: string; forceHigherOffers?: boolean };
}

export interface TimelineEntry {
  id: string;
  year: number;
  age: number;
  generation: number;
  playerName: string;
  club: string;
  type: 'TRANSFER' | 'MILESTONE' | 'AWARD' | 'TROPHY' | 'INJURY' | 'GENERATION' | 'INTERNATIONAL';
  icon: string;
  color: string;
  title: string;
  description: string;
}

export interface WorldHeadlinePackage {
  year: number;
  headlines: string[];
}

export interface Superstar {
  id: string;
  name: string;
  club: string;
  ovr: number;
  pos: Position;
  age: number;
  peakOvr: number;
  nationality?: string;
  isRetired?: boolean;
  retiredYear?: number;
  isRegen?: boolean;
}

export interface SaveSlot {
  id: number;
  saveName: string;
  dateSaved: string;
  player: Player | null;
  legacyTree: Ancestor[];
  legacyScore: number;
  currentGeneration: number;
  timeline: TimelineEntry[];
  newsFeed: WorldHeadlinePackage[];
  dynamicLeagues: League[];
  worldSuperstars?: Superstar[];
}

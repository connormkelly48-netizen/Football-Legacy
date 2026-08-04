import { League, Club, TransferOffer, Player, ClubPhilosophy, Owner, OwnerPersonality, MultiClubGroup } from '../types';

export const MULTI_CLUB_GROUPS: MultiClubGroup[] = [
  {
    id: "mcg_city",
    name: "City Football Group",
    clubIds: ["mancity", "girona", "nycfc", "palermo", "melbournecity", "troyes", "mumbaicity", "yokohama"]
  },
  {
    id: "mcg_redbull",
    name: "Red Bull Football Group",
    clubIds: ["rbleipzig", "salzburg", "nyredbulls", "bragantino"]
  },
  {
    id: "mcg_ineos",
    name: "INEOS Sports Group",
    clubIds: ["manutd", "nice", "lausanne"]
  },
  {
    id: "mcg_blueco",
    name: "BlueCo Ownership",
    clubIds: ["chelsea", "strasbourg"]
  },
  {
    id: "mcg_eagle",
    name: "Eagle Football Holdings",
    clubIds: ["lyon", "botafogo", "crystalpalace", "rwdm"]
  }
];

export const LEAGUES_2026: League[] = [
  // ENGLAND (5 Tiers)
  { id: "ENG_1", name: "Premier League", country: "England", tier: 1, rep: 95, promotionTo: null, relegationTo: "ENG_2" },
  { id: "ENG_2", name: "EFL Championship", country: "England", tier: 2, rep: 78, promotionTo: "ENG_1", relegationTo: "ENG_3" },
  { id: "ENG_3", name: "EFL League One", country: "England", tier: 3, rep: 64, promotionTo: "ENG_2", relegationTo: "ENG_4" },
  { id: "ENG_4", name: "EFL League Two", country: "England", tier: 4, rep: 55, promotionTo: "ENG_3", relegationTo: "ENG_5" },
  { id: "ENG_5", name: "National League", country: "England", tier: 5, rep: 45, promotionTo: "ENG_4", relegationTo: null },

  // SPAIN (2 Tiers)
  { id: "ESP_1", name: "La Liga", country: "Spain", tier: 1, rep: 92, promotionTo: null, relegationTo: "ESP_2" },
  { id: "ESP_2", name: "La Liga 2", country: "Spain", tier: 2, rep: 72, promotionTo: "ESP_1", relegationTo: null },

  // GERMANY (3 Tiers)
  { id: "GER_1", name: "Bundesliga", country: "Germany", tier: 1, rep: 90, promotionTo: null, relegationTo: "GER_2" },
  { id: "GER_2", name: "2. Bundesliga", country: "Germany", tier: 2, rep: 73, promotionTo: "GER_1", relegationTo: "GER_3" },
  { id: "GER_3", name: "3. Liga", country: "Germany", tier: 3, rep: 58, promotionTo: "GER_2", relegationTo: null },

  // ITALY (2 Tiers)
  { id: "ITA_1", name: "Serie A", country: "Italy", tier: 1, rep: 89, promotionTo: null, relegationTo: "ITA_2" },
  { id: "ITA_2", name: "Serie B", country: "Italy", tier: 2, rep: 70, promotionTo: "ITA_1", relegationTo: null },

  // FRANCE (2 Tiers)
  { id: "FRA_1", name: "Ligue 1", country: "France", tier: 1, rep: 86, promotionTo: null, relegationTo: "FRA_2" },
  { id: "FRA_2", name: "Ligue 2", country: "France", tier: 2, rep: 68, promotionTo: "FRA_1", relegationTo: null },

  // NETHERLANDS (2 Tiers)
  { id: "NED_1", name: "Eredivisie", country: "Netherlands", tier: 1, rep: 82, promotionTo: null, relegationTo: "NED_2" },
  { id: "NED_2", name: "Eerste Divisie", country: "Netherlands", tier: 2, rep: 65, promotionTo: "NED_1", relegationTo: null },

  // PORTUGAL (2 Tiers)
  { id: "POR_1", name: "Primeira Liga", country: "Portugal", tier: 1, rep: 81, promotionTo: null, relegationTo: "POR_2" },
  { id: "POR_2", name: "Liga Portugal 2", country: "Portugal", tier: 2, rep: 63, promotionTo: "POR_1", relegationTo: null },

  // BELGIUM (1 Tier)
  { id: "BEL_1", name: "Belgian Pro League", country: "Belgium", tier: 1, rep: 77, promotionTo: null, relegationTo: null },

  // SCOTLAND (2 Tiers)
  { id: "SCO_1", name: "Scottish Premiership", country: "Scotland", tier: 1, rep: 75, promotionTo: null, relegationTo: "SCO_2" },
  { id: "SCO_2", name: "Scottish Championship", country: "Scotland", tier: 2, rep: 56, promotionTo: "SCO_1", relegationTo: null },

  // TURKEY (1 Tier)
  { id: "TUR_1", name: "Süper Lig", country: "Turkey", tier: 1, rep: 76, promotionTo: null, relegationTo: null },

  // IRELAND (2 Tiers)
  { id: "IRL_1", name: "League of Ireland Premier", country: "Ireland", tier: 1, rep: 52, promotionTo: null, relegationTo: "IRL_2" },
  { id: "IRL_2", name: "League of Ireland First Div", country: "Ireland", tier: 2, rep: 42, promotionTo: "IRL_1", relegationTo: null }
];

export const CLUBS_2026: Club[] = [
  // --- ENGLAND: PREMIER LEAGUE (ENG_1) ---
  { id: "mancity", name: "Manchester City", leagueId: "ENG_1", rating: 87, color: "#6CABDD", secondaryColor: "#1C2C5B", philosophy: "WORLD_SUPERSTARS", stadium: "Etihad Stadium", finances: 98, multiClubGroupId: "mcg_city", rivals: ["manutd", "liverpool"], owner: { id: "o_mancity", name: "Sheikh Mansour", personality: "GALACTICO_OWNER", patience: 8, spendingPower: 10, age: 55 } },
  { id: "arsenal", name: "Arsenal", leagueId: "ENG_1", rating: 86, color: "#EF0107", secondaryColor: "#FFFFFF", philosophy: "WINNING_NOW", stadium: "Emirates Stadium", finances: 92, rivals: ["tottenham", "chelsea"], owner: { id: "o_arsenal", name: "Stan Kroenke", personality: "BUSINESS_OWNER", patience: 7, spendingPower: 8, age: 78 } },
  { id: "liverpool", name: "Liverpool", leagueId: "ENG_1", rating: 85, color: "#C8102E", secondaryColor: "#F6EB61", philosophy: "MONEYBALL", stadium: "Anfield", finances: 90, rivals: ["everton", "manutd"], owner: { id: "o_liverpool", name: "John W. Henry", personality: "BUSINESS_OWNER", patience: 8, spendingPower: 7, age: 76 } },
  { id: "chelsea", name: "Chelsea", leagueId: "ENG_1", rating: 83, color: "#034694", secondaryColor: "#DBA111", philosophy: "YOUTH_DEVELOPMENT", stadium: "Stamford Bridge", finances: 94, multiClubGroupId: "mcg_blueco", rivals: ["arsenal", "tottenham"], owner: { id: "o_chelsea", name: "Todd Boehly", personality: "AGGRESSIVE_OWNER", patience: 5, spendingPower: 9, age: 52 } },
  { id: "tottenham", name: "Tottenham Hotspur", leagueId: "ENG_1", rating: 82, color: "#132257", secondaryColor: "#FFFFFF", philosophy: "FINANCIAL_STABILITY", stadium: "Tottenham Hotspur Stadium", finances: 88, rivals: ["arsenal"], owner: { id: "o_tottenham", name: "Daniel Levy", personality: "BUSINESS_OWNER", patience: 6, spendingPower: 6, age: 64 } },
  { id: "astonvilla", name: "Aston Villa", leagueId: "ENG_1", rating: 81, color: "#95BFE5", secondaryColor: "#670E36", philosophy: "WINNING_NOW", stadium: "Villa Park", finances: 82, rivals: ["birmingham"], owner: { id: "o_astonvilla", name: "Nassef Sawiris", personality: "PATIENT_OWNER", patience: 8, spendingPower: 8, age: 65 } },
  { id: "newcastle", name: "Newcastle United", leagueId: "ENG_1", rating: 81, color: "#241F20", secondaryColor: "#FFFFFF", philosophy: "BUYING_CLUB", stadium: "St James' Park", finances: 96, rivals: ["sunderland"], owner: { id: "o_newcastle", name: "PIF Consortium", personality: "GALACTICO_OWNER", patience: 7, spendingPower: 10, age: 50 } },
  { id: "manutd", name: "Manchester United", leagueId: "ENG_1", rating: 79, color: "#DA020E", secondaryColor: "#FFE500", philosophy: "LONG_TERM_DEVELOPMENT", stadium: "Old Trafford", finances: 90, multiClubGroupId: "mcg_ineos", rivals: ["mancity", "liverpool"], owner: { id: "o_manutd", name: "Sir Jim Ratcliffe", personality: "PATIENT_OWNER", patience: 7, spendingPower: 8, age: 73 } },
  { id: "brighton", name: "Brighton & Hove Albion", leagueId: "ENG_1", rating: 78, color: "#0057B8", secondaryColor: "#FFCD00", philosophy: "MONEYBALL", stadium: "AMEX Stadium", finances: 78, rivals: ["crystalpalace"], owner: { id: "o_brighton", name: "Tony Bloom", personality: "YOUTH_INVESTOR", patience: 9, spendingPower: 6, age: 55 } },
  { id: "brentford", name: "Brentford", leagueId: "ENG_1", rating: 77, color: "#E30613", secondaryColor: "#F9B233", philosophy: "MONEYBALL", stadium: "Gtech Community Stadium", finances: 74, rivals: ["fulham"], owner: { id: "o_brentford", name: "Matthew Benham", personality: "YOUTH_INVESTOR", patience: 9, spendingPower: 5, age: 57 } },
  { id: "westham", name: "West Ham United", leagueId: "ENG_1", rating: 78, color: "#7A263A", secondaryColor: "#1BB1E7", philosophy: "BALANCED", stadium: "London Stadium", finances: 80, rivals: ["millwall", "tottenham"], owner: { id: "o_westham", name: "David Sullivan", personality: "FINANCIALLY_CONSERVATIVE", patience: 6, spendingPower: 6, age: 77 } },
  { id: "crystalpalace", name: "Crystal Palace", leagueId: "ENG_1", rating: 77, color: "#1B458F", secondaryColor: "#A71930", philosophy: "SELLING_CLUB", stadium: "Selhurst Park", finances: 75, multiClubGroupId: "mcg_eagle", rivals: ["brighton"], owner: { id: "o_palace", name: "John Textor", personality: "LOCAL_INVESTOR", patience: 7, spendingPower: 6, age: 58 } },
  { id: "fulham", name: "Fulham", leagueId: "ENG_1", rating: 76, color: "#000000", secondaryColor: "#CC0000", philosophy: "BALANCED", stadium: "Craven Cottage", finances: 76, rivals: ["brentford", "chelsea"], owner: { id: "o_fulham", name: "Shahid Khan", personality: "PATIENT_OWNER", patience: 8, spendingPower: 7, age: 75 } },
  { id: "bournemouth", name: "Bournemouth", leagueId: "ENG_1", rating: 76, color: "#DA291C", secondaryColor: "#000000", philosophy: "YOUTH_DEVELOPMENT", stadium: "Vitality Stadium", finances: 72, rivals: ["southampton"], owner: { id: "o_bournemouth", name: "Bill Foley", personality: "AGGRESSIVE_OWNER", patience: 6, spendingPower: 7, age: 80 } },
  { id: "everton", name: "Everton", leagueId: "ENG_1", rating: 76, color: "#003399", secondaryColor: "#FFFFFF", philosophy: "FINANCIAL_STABILITY", stadium: "Hill Moshiri Stadium", finances: 70, rivals: ["liverpool"], owner: { id: "o_everton", name: "777 Partners", personality: "BUSINESS_OWNER", patience: 5, spendingPower: 5, age: 48 } },
  { id: "wolves", name: "Wolverhampton Wanderers", leagueId: "ENG_1", rating: 76, color: "#FDB913", secondaryColor: "#231F20", philosophy: "SELLING_CLUB", stadium: "Molineux", finances: 74, rivals: ["westbrom"], owner: { id: "o_wolves", name: "Guo Guangchang", personality: "BUSINESS_OWNER", patience: 6, spendingPower: 5, age: 58 } },
  { id: "nottingham", name: "Nottingham Forest", leagueId: "ENG_1", rating: 76, color: "#DD0000", secondaryColor: "#FFFFFF", philosophy: "BUYING_CLUB", stadium: "City Ground", finances: 78, rivals: ["derby"], owner: { id: "o_forest", name: "Evangelos Marinakis", personality: "AGGRESSIVE_OWNER", patience: 4, spendingPower: 8, age: 58 } },
  { id: "ipswich", name: "Ipswich Town", leagueId: "ENG_1", rating: 73, color: "#0000FF", secondaryColor: "#FFFFFF", philosophy: "LOCAL_TALENT", stadium: "Portman Road", finances: 68, rivals: ["norwich"], owner: { id: "o_ipswich", name: "Gamechanger 20", personality: "PATIENT_OWNER", patience: 8, spendingPower: 6, age: 50 } },
  { id: "leicester", name: "Leicester City", leagueId: "ENG_1", rating: 75, color: "#0053A0", secondaryColor: "#FDBE11", philosophy: "BALANCED", stadium: "King Power Stadium", finances: 75, rivals: ["nottingham"], owner: { id: "o_leicester", name: "Aiyawatt Srivaddhanaprabha", personality: "PATIENT_OWNER", patience: 8, spendingPower: 6, age: 39 } },
  { id: "southampton", name: "Southampton", leagueId: "ENG_1", rating: 75, color: "#D71921", secondaryColor: "#111111", philosophy: "YOUTH_DEVELOPMENT", stadium: "St Mary's Stadium", finances: 72, rivals: ["portsmouth"], owner: { id: "o_southampton", name: "Dragan Solak", personality: "YOUTH_INVESTOR", patience: 7, spendingPower: 6, age: 59 } },

  // --- ENGLAND: CHAMPIONSHIP (ENG_2) ---
  { id: "leeds", name: "Leeds United", leagueId: "ENG_2", rating: 74, color: "#FFCD00", secondaryColor: "#1D428A", philosophy: "WINNING_NOW", stadium: "Elland Road", finances: 76, rivals: ["manutd"], owner: { id: "o_leeds", name: "49ers Enterprises", personality: "AGGRESSIVE_OWNER", patience: 6, spendingPower: 7, age: 52 } },
  { id: "sunderland", name: "Sunderland", leagueId: "ENG_2", rating: 73, color: "#EB1C24", secondaryColor: "#FFFFFF", philosophy: "YOUTH_DEVELOPMENT", stadium: "Stadium of Light", finances: 70, rivals: ["newcastle"], owner: { id: "o_sunderland", name: "Kyril Louis-Dreyfus", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 6, age: 28 } },
  { id: "middlesbrough", name: "Middlesbrough", leagueId: "ENG_2", rating: 72, color: "#E00000", secondaryColor: "#FFFFFF", philosophy: "BALANCED", stadium: "Riverside Stadium", finances: 68, rivals: ["sunderland"], owner: { id: "o_boro", name: "Steve Gibson", personality: "LOCAL_INVESTOR", patience: 9, spendingPower: 5, age: 68 } },
  { id: "burnley", name: "Burnley", leagueId: "ENG_2", rating: 72, color: "#6C1D45", secondaryColor: "#99D6EA", philosophy: "ATTACKING_FOOTBALL", stadium: "Turf Moor", finances: 70, rivals: ["blackburn"], owner: { id: "o_burnley", name: "Alan Pace", personality: "BUSINESS_OWNER", patience: 7, spendingPower: 6, age: 56 } },
  { id: "coventry", name: "Coventry City", leagueId: "ENG_2", rating: 71, color: "#2FA4DF", secondaryColor: "#FFFFFF", philosophy: "MONEYBALL", stadium: "Building Society Arena", finances: 66, rivals: ["leicester"], owner: { id: "o_coventry", name: "Doug King", personality: "PATIENT_OWNER", patience: 8, spendingPower: 5, age: 55 } },
  { id: "bristolcity", name: "Bristol City", leagueId: "ENG_2", rating: 70, color: "#E30613", secondaryColor: "#FFFFFF", philosophy: "LOCAL_TALENT", stadium: "Ashton Gate", finances: 65, rivals: ["bristolrovers"], owner: { id: "o_bristol", name: "Steve Lansdown", personality: "LOCAL_INVESTOR", patience: 8, spendingPower: 5, age: 73 } },
  { id: "westbrom", name: "West Bromwich Albion", leagueId: "ENG_2", rating: 72, color: "#122F67", secondaryColor: "#FFFFFF", philosophy: "FINANCIAL_STABILITY", stadium: "The Hawthorns", finances: 68, rivals: ["wolves"], owner: { id: "o_wba", name: "Shilen Patel", personality: "PATIENT_OWNER", patience: 7, spendingPower: 6, age: 44 } },
  { id: "norwich", name: "Norwich City", leagueId: "ENG_2", rating: 72, color: "#FFF200", secondaryColor: "#00A651", philosophy: "SELLING_CLUB", stadium: "Carrow Road", finances: 68, rivals: ["ipswich"], owner: { id: "o_norwich", name: "Mark Attanasio", personality: "BUSINESS_OWNER", patience: 7, spendingPower: 6, age: 67 } },
  { id: "watford", name: "Watford", leagueId: "ENG_2", rating: 71, color: "#FBEE23", secondaryColor: "#ED2127", philosophy: "BUYING_CLUB", stadium: "Vicarage Road", finances: 66, rivals: ["luton"], owner: { id: "o_watford", name: "Gino Pozzo", personality: "AGGRESSIVE_OWNER", patience: 3, spendingPower: 5, age: 58 } },
  { id: "sheffutd", name: "Sheffield United", leagueId: "ENG_2", rating: 72, color: "#EE272C", secondaryColor: "#000000", philosophy: "BALANCED", stadium: "Bramall Lane", finances: 68, rivals: ["sheffwed"], owner: { id: "o_sheffutd", name: "Prince Abdullah", personality: "FINANCIALLY_CONSERVATIVE", patience: 6, spendingPower: 5, age: 59 } },

  // --- ENGLAND: LEAGUE ONE & TWO & NATIONAL LEAGUE & IRL ---
  { id: "birmingham", name: "Birmingham City", leagueId: "ENG_3", rating: 67, color: "#0000FF", secondaryColor: "#FFFFFF", philosophy: "WINNING_NOW", stadium: "St Andrew's", finances: 75, rivals: ["astonvilla"], owner: { id: "o_bham", name: "Tom Wagner & Tom Brady", personality: "AGGRESSIVE_OWNER", patience: 7, spendingPower: 8, age: 52 } },
  { id: "wrexham", name: "Wrexham", leagueId: "ENG_3", rating: 64, color: "#E00000", secondaryColor: "#FFFFFF", philosophy: "WINNING_NOW", stadium: "Racecourse Ground", finances: 72, rivals: ["chester"], owner: { id: "o_wrexham", name: "Ryan Reynolds & Rob McElhenney", personality: "GALACTICO_OWNER", patience: 9, spendingPower: 8, age: 48 } },
  { id: "nottscounty", name: "Notts County", leagueId: "ENG_4", rating: 58, color: "#000000", secondaryColor: "#FFFFFF", philosophy: "MONEYBALL", stadium: "Meadow Lane", finances: 52, rivals: ["mansfield"], owner: { id: "o_notts", name: "Reedtz Brothers", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 5, age: 40 } },
  { id: "crewe", name: "Crewe Alexandra", leagueId: "ENG_4", rating: 55, color: "#D00000", secondaryColor: "#FFFFFF", philosophy: "YOUTH_DEVELOPMENT", stadium: "Gresty Road", finances: 48, rivals: ["portvale"], owner: { id: "o_crewe", name: "Charles Grant", personality: "LOCAL_INVESTOR", patience: 9, spendingPower: 4, age: 62 } },
  { id: "barnet", name: "Barnet", leagueId: "ENG_5", rating: 51, color: "#FAA61A", secondaryColor: "#000000", philosophy: "BALANCED", stadium: "The Hive", finances: 44, rivals: ["stevenage"], owner: { id: "o_barnet", name: "Tony Kleanthous", personality: "LOCAL_INVESTOR", patience: 8, spendingPower: 4, age: 60 } },
  { id: "yorkcity", name: "York City", leagueId: "ENG_5", rating: 49, color: "#E30613", secondaryColor: "#002B49", philosophy: "LONG_TERM_DEVELOPMENT", stadium: "LNER Community Stadium", finances: 42, rivals: ["harrogate"], owner: { id: "o_york", name: "Matt Uggla", personality: "PATIENT_OWNER", patience: 8, spendingPower: 5, age: 31 } },

  // --- SPAIN: LA LIGA (ESP_1) & LA LIGA 2 ---
  { id: "realmadrid", name: "Real Madrid", leagueId: "ESP_1", rating: 88, color: "#FEBE10", secondaryColor: "#00529F", philosophy: "WORLD_SUPERSTARS", stadium: "Santiago Bernabéu", finances: 99, rivals: ["barcelona", "atletico"], owner: { id: "o_rm", name: "Florentino Pérez", personality: "GALACTICO_OWNER", patience: 7, spendingPower: 10, age: 78 } },
  { id: "barcelona", name: "FC Barcelona", leagueId: "ESP_1", rating: 86, color: "#A50044", secondaryColor: "#004D98", philosophy: "YOUTH_DEVELOPMENT", stadium: "Spotify Camp Nou", finances: 88, rivals: ["realmadrid"], owner: { id: "o_barca", name: "Joan Laporta", personality: "AGGRESSIVE_OWNER", patience: 6, spendingPower: 8, age: 62 } },
  { id: "atletico", name: "Atlético Madrid", leagueId: "ESP_1", rating: 84, color: "#CB3524", secondaryColor: "#272E61", philosophy: "DEFENSIVE_FOOTBALL", stadium: "Cívitas Metropolitano", finances: 88, rivals: ["realmadrid"], owner: { id: "o_atleti", name: "Enrique Cerezo", personality: "AGGRESSIVE_OWNER", patience: 7, spendingPower: 8, age: 77 } },
  { id: "athletic", name: "Athletic Club", leagueId: "ESP_1", rating: 79, color: "#EE2523", secondaryColor: "#FFFFFF", philosophy: "LOCAL_TALENT", stadium: "San Mamés", finances: 80, rivals: ["sociedad"], owner: { id: "o_athletic", name: "Jon Uriarte", personality: "LOCAL_INVESTOR", patience: 9, spendingPower: 6, age: 46 } },
  { id: "sociedad", name: "Real Sociedad", leagueId: "ESP_1", rating: 79, color: "#0067B1", secondaryColor: "#FFFFFF", philosophy: "YOUTH_DEVELOPMENT", stadium: "Reale Arena", finances: 78, rivals: ["athletic"], owner: { id: "o_la_real", name: "Jokin Aperribay", personality: "PATIENT_OWNER", patience: 9, spendingPower: 7, age: 58 } },
  { id: "girona", name: "Girona", leagueId: "ESP_1", rating: 79, color: "#CF142B", secondaryColor: "#FFFFFF", philosophy: "ATTACKING_FOOTBALL", stadium: "Montilivi", finances: 80, multiClubGroupId: "mcg_city", rivals: ["espanyol"], owner: { id: "o_girona", name: "Pere Guardiola", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 7, age: 48 } },
  { id: "celtavigo", name: "Celta Vigo", leagueId: "ESP_1", rating: 76, color: "#8CCCE5", secondaryColor: "#DA291C", philosophy: "BALANCED", stadium: "Balaídos", finances: 72, rivals: ["deportivo"], owner: { id: "o_celta", name: "Marián Mouriño", personality: "LOCAL_INVESTOR", patience: 8, spendingPower: 6, age: 48 } },

  // --- GERMANY: BUNDESLIGA (GER_1) ---
  { id: "bayern", name: "Bayern Munich", leagueId: "GER_1", rating: 87, color: "#DC052D", secondaryColor: "#0066B2", philosophy: "BUYING_CLUB", stadium: "Allianz Arena", finances: 96, rivals: ["dortmund"], owner: { id: "o_bayern", name: "Herbert Hainer", personality: "FINANCIALLY_CONSERVATIVE", patience: 8, spendingPower: 9, age: 70 } },
  { id: "leverkusen", name: "Bayer Leverkusen", leagueId: "GER_1", rating: 84, color: "#E32219", secondaryColor: "#000000", philosophy: "MONEYBALL", stadium: "BayArena", finances: 86, rivals: ["koln"], owner: { id: "o_bayer", name: "Fernando Carro", personality: "PATIENT_OWNER", patience: 8, spendingPower: 8, age: 60 } },
  { id: "dortmund", name: "Borussia Dortmund", leagueId: "GER_1", rating: 83, color: "#FDE100", secondaryColor: "#000000", philosophy: "SELLING_CLUB", stadium: "Signal Iduna Park", finances: 88, rivals: ["schalke"], owner: { id: "o_bvb", name: "Hans-Joachim Watzke", personality: "BUSINESS_OWNER", patience: 8, spendingPower: 7, age: 65 } },
  { id: "rbleipzig", name: "RB Leipzig", leagueId: "GER_1", rating: 81, color: "#DD013F", secondaryColor: "#001F5B", philosophy: "YOUTH_DEVELOPMENT", stadium: "Red Bull Arena", finances: 88, multiClubGroupId: "mcg_redbull", rivals: ["salzburg"], owner: { id: "o_rbl", name: "Oliver Mintzlaff", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 8, age: 49 } },

  // --- ITALY: SERIE A (ITA_1) ---
  { id: "inter", name: "Inter Milan", leagueId: "ITA_1", rating: 85, color: "#0053A0", secondaryColor: "#000000", philosophy: "WINNING_NOW", stadium: "San Siro", finances: 88, rivals: ["acmilan", "juventus"], owner: { id: "o_inter", name: "Oaktree Capital", personality: "FINANCIALLY_CONSERVATIVE", patience: 7, spendingPower: 7, age: 50 } },
  { id: "juventus", name: "Juventus", leagueId: "ITA_1", rating: 83, color: "#000000", secondaryColor: "#FFFFFF", philosophy: "BUYING_CLUB", stadium: "Allianz Stadium", finances: 88, rivals: ["inter", "torino"], owner: { id: "o_juve", name: "John Elkann", personality: "PATIENT_OWNER", patience: 8, spendingPower: 8, age: 48 } },
  { id: "acmilan", name: "AC Milan", leagueId: "ITA_1", rating: 82, color: "#FB090B", secondaryColor: "#000000", philosophy: "YOUTH_DEVELOPMENT", stadium: "San Siro", finances: 84, rivals: ["inter"], owner: { id: "o_milan", name: "Gerry Cardinale", personality: "BUSINESS_OWNER", patience: 7, spendingPower: 7, age: 57 } },
  { id: "palermo", name: "Palermo", leagueId: "ITA_2", rating: 71, color: "#F7A8B8", secondaryColor: "#000000", philosophy: "ATTACKING_FOOTBALL", stadium: "Renzo Barbera", finances: 72, multiClubGroupId: "mcg_city", rivals: ["catania"], owner: { id: "o_palermo", name: "City Football Group", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 7, age: 50 } },

  // --- FRANCE: LIGUE 1 (FRA_1) ---
  { id: "psg", name: "Paris Saint-Germain", leagueId: "FRA_1", rating: 86, color: "#004170", secondaryColor: "#DA291C", philosophy: "WORLD_SUPERSTARS", stadium: "Parc des Princes", finances: 98, rivals: ["marseille"], owner: { id: "o_psg", name: "Nasser Al-Khelaifi", personality: "GALACTICO_OWNER", patience: 6, spendingPower: 10, age: 51 } },
  { id: "nice", name: "OGC Nice", leagueId: "FRA_1", rating: 78, color: "#000000", secondaryColor: "#E30613", philosophy: "MONEYBALL", stadium: "Allianz Riviera", finances: 82, multiClubGroupId: "mcg_ineos", rivals: ["monaco"], owner: { id: "o_nice", name: "INEOS", personality: "PATIENT_OWNER", patience: 8, spendingPower: 7, age: 73 } },
  { id: "strasbourg", name: "RC Strasbourg", leagueId: "FRA_1", rating: 75, color: "#00A3E0", secondaryColor: "#FFFFFF", philosophy: "YOUTH_DEVELOPMENT", stadium: "Stade de la Meinau", finances: 76, multiClubGroupId: "mcg_blueco", rivals: ["metz"], owner: { id: "o_strasbourg", name: "BlueCo", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 7, age: 52 } },
  { id: "lyon", name: "Olympique Lyonnais", leagueId: "FRA_1", rating: 78, color: "#1B458F", secondaryColor: "#DA291C", philosophy: "ATTACKING_FOOTBALL", stadium: "Groupama Stadium", finances: 80, multiClubGroupId: "mcg_eagle", rivals: ["stetienne"], owner: { id: "o_lyon", name: "John Textor", personality: "AGGRESSIVE_OWNER", patience: 6, spendingPower: 7, age: 58 } },
  { id: "troyes", name: "ESTAC Troyes", leagueId: "FRA_2", rating: 68, color: "#0055A5", secondaryColor: "#FFFFFF", philosophy: "YOUTH_DEVELOPMENT", stadium: "Stade de l'Aube", finances: 66, multiClubGroupId: "mcg_city", rivals: ["auxerre"], owner: { id: "o_troyes", name: "City Football Group", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 6, age: 50 } },

  // --- SISTER CLUBS AROUND THE WORLD ---
  { id: "salzburg", name: "Red Bull Salzburg", leagueId: "BEL_1", rating: 77, color: "#DD013F", secondaryColor: "#FFFFFF", philosophy: "YOUTH_DEVELOPMENT", stadium: "Red Bull Arena Salzburg", finances: 82, multiClubGroupId: "mcg_redbull", owner: { id: "o_salzburg", name: "Red Bull GmbH", personality: "YOUTH_INVESTOR", patience: 9, spendingPower: 8, age: 40 } },
  { id: "nycfc", name: "New York City FC", leagueId: "ENG_1", rating: 72, color: "#6CABDD", secondaryColor: "#000000", philosophy: "ATTACKING_FOOTBALL", stadium: "Yankee Stadium", finances: 78, multiClubGroupId: "mcg_city", owner: { id: "o_nycfc", name: "City Football Group", personality: "YOUTH_INVESTOR", patience: 8, spendingPower: 7, age: 50 } },
  { id: "melbournecity", name: "Melbourne City", leagueId: "ENG_1", rating: 68, color: "#6CABDD", secondaryColor: "#FFFFFF", philosophy: "BALANCED", stadium: "AAMI Park", finances: 70, multiClubGroupId: "mcg_city", owner: { id: "o_melbourne", name: "City Football Group", personality: "LOCAL_INVESTOR", patience: 8, spendingPower: 6, age: 50 } },

  // --- SCOTLAND & NETHERLANDS & PORTUGAL & IRELAND ---
  { id: "celtic", name: "Celtic", leagueId: "SCO_1", rating: 75, color: "#018749", secondaryColor: "#FFFFFF", philosophy: "WINNING_NOW", stadium: "Celtic Park", finances: 78, rivals: ["rangers"], owner: { id: "o_celtic", name: "Dermot Desmond", personality: "FINANCIALLY_CONSERVATIVE", patience: 8, spendingPower: 6, age: 75 } },
  { id: "rangers", name: "Rangers", leagueId: "SCO_1", rating: 74, color: "#1B458F", secondaryColor: "#AF1E2D", philosophy: "WINNING_NOW", stadium: "Ibrox Stadium", finances: 74, rivals: ["celtic"], owner: { id: "o_rangers", name: "John Bennett", personality: "PATIENT_OWNER", patience: 7, spendingPower: 6, age: 61 } },
  { id: "shamrock", name: "Shamrock Rovers", leagueId: "IRL_1", rating: 62, color: "#00A859", secondaryColor: "#FFFFFF", philosophy: "BALANCED", stadium: "Tallaght Stadium", finances: 56, rivals: ["bohemians"], owner: { id: "o_shamrock", name: "Dermot Desmond", personality: "LOCAL_INVESTOR", patience: 9, spendingPower: 5, age: 75 } },
  { id: "derry", name: "Derry City", leagueId: "IRL_1", rating: 60, color: "#E30613", secondaryColor: "#000000", philosophy: "ATTACKING_FOOTBALL", stadium: "Ryan McBride Brandywell", finances: 52, rivals: ["finnharps"], owner: { id: "o_derry", name: "Philip O'Doherty", personality: "LOCAL_INVESTOR", patience: 9, spendingPower: 5, age: 65 } },
  { id: "stpatricks", name: "St Patrick's Athletic", leagueId: "IRL_1", rating: 57, color: "#FF0000", secondaryColor: "#FFFFFF", philosophy: "YOUTH_DEVELOPMENT", stadium: "Richmond Park", finances: 48, rivals: ["shelbourne"], owner: { id: "o_pats", name: "Garrett Kelleher", personality: "LOCAL_INVESTOR", patience: 8, spendingPower: 4, age: 58 } },
  { id: "bohemians", name: "Bohemians", leagueId: "IRL_1", rating: 56, color: "#000000", secondaryColor: "#FF0000", philosophy: "LOCAL_TALENT", stadium: "Dalymount Park", finances: 46, rivals: ["shamrock"], owner: { id: "o_bohs", name: "Fan-Owned Members", personality: "FINANCIALLY_CONSERVATIVE", patience: 8, spendingPower: 3, age: 45 } },
  { id: "shelbourne", name: "Shelbourne", leagueId: "IRL_1", rating: 57, color: "#FF0000", secondaryColor: "#000000", philosophy: "DEFENSIVE_FOOTBALL", stadium: "Tolka Park", finances: 48, rivals: ["stpatricks"], owner: { id: "o_shels", name: "Acun Ilicali Consortium", personality: "AGGRESSIVE_OWNER", patience: 6, spendingPower: 5, age: 55 } },
  { id: "corkcity", name: "Cork City", leagueId: "IRL_2", rating: 52, color: "#008000", secondaryColor: "#FF0000", philosophy: "LONG_TERM_DEVELOPMENT", stadium: "Turners Cross", finances: 42, rivals: ["waterford"], owner: { id: "o_cork", name: "Dermot Usher", personality: "PATIENT_OWNER", patience: 8, spendingPower: 4, age: 50 } }
];

export function getClubByName(name: string): Club {
  const found = CLUBS_2026.find(c => c.name.toLowerCase() === name.toLowerCase());
  if (found) return found;
  return { 
    id: `club_${name.toLowerCase().replace(/\s+/g, '')}`, 
    name: name, 
    leagueId: "ENG_1", 
    rating: 75, 
    color: "#2ECC71", 
    secondaryColor: "#1E1E1E", 
    philosophy: "BALANCED", 
    stadium: "Local Arena",
    finances: 70
  };
}

export function getEffectiveClubPhilosophy(club: Club, year: number): ClubPhilosophy {
  if (club.owner) {
    switch (club.owner.personality) {
      case 'YOUTH_INVESTOR': return 'YOUTH_DEVELOPMENT';
      case 'GALACTICO_OWNER': return 'WORLD_SUPERSTARS';
      case 'BUSINESS_OWNER': return 'SELLING_CLUB';
      case 'LOCAL_INVESTOR': return 'LOCAL_TALENT';
      case 'AGGRESSIVE_OWNER': return 'WINNING_NOW';
      case 'PATIENT_OWNER': return 'LONG_TERM_DEVELOPMENT';
      case 'FINANCIALLY_CONSERVATIVE': return 'FINANCIAL_STABILITY';
    }
  }
  return club.philosophy || 'BALANCED';
}

/**
 * Dynamic Club Overall Rating & Ownership Evolution.
 * Recalculates every club's rating and simulates natural owner changes/takeovers every season!
 */
export function evolveWorldClubsAndOwners(
  clubs: Club[],
  currentYear: number
): { updatedClubs: Club[]; headlines: string[] } {
  const headlines: string[] = [];
  const ownerNamesPool = ["Arthur Pendelton", "Mikhail Volkov", "Chen Wei", "Marcus Sterling", "Sandro Rossi", "Tariq Al-Mansoor", "Lars Lindqvist", "Mateo Fernandez"];
  const personalities: OwnerPersonality[] = ['YOUTH_INVESTOR', 'GALACTICO_OWNER', 'BUSINESS_OWNER', 'LOCAL_INVESTOR', 'AGGRESSIVE_OWNER', 'PATIENT_OWNER', 'FINANCIALLY_CONSERVATIVE'];

  const updatedClubs = clubs.map(club => {
    let updatedOwner = club.owner ? { ...club.owner, age: club.owner.age + 1 } : undefined;
    let currentRating = club.rating;
    let currentFinances = club.finances || 70;

    // 1. DYNAMIC TAKEOVER / OWNER CHANGE CHECK (5% annual probability)
    const takeoverOccurred = Math.random() < 0.05 || (updatedOwner && updatedOwner.age >= 78 && Math.random() < 0.35);

    if (takeoverOccurred) {
      const newOwnerName = ownerNamesPool[Math.floor(Math.random() * ownerNamesPool.length)];
      const newPersonality = personalities[Math.floor(Math.random() * personalities.length)];
      const newSpendingPower = Math.floor(Math.random() * 5) + 5; // 5 - 10

      updatedOwner = {
        id: `owner_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: newOwnerName,
        personality: newPersonality,
        patience: Math.floor(Math.random() * 5) + 4,
        spendingPower: newSpendingPower,
        age: 42 + Math.floor(Math.random() * 25)
      };

      if (newPersonality === 'GALACTICO_OWNER' || newPersonality === 'AGGRESSIVE_OWNER') {
        currentFinances = Math.min(100, currentFinances + 18);
        headlines.push(`💰 MAJOR TAKEOVER: ${newOwnerName} buys ${club.name}! Injects massive transfer funds (${newPersonality}).`);
      } else if (newPersonality === 'FINANCIALLY_CONSERVATIVE') {
        currentFinances = Math.max(30, currentFinances - 15);
        headlines.push(`📉 FINANCIAL RESTRUCTURING: ${club.name} acquired by conservative ownership (${newOwnerName}). Budget cut.`);
      } else {
        headlines.push(`👔 CLUB TAKEOVER: ${club.name} sold to ${newOwnerName} under ${newPersonality.replace('_', ' ')} vision.`);
      }
    }

    // 2. DYNAMIC CLUB RATING EVOLUTION
    // Influenced by financial status, owner personality, and natural momentum
    let ratingDelta = 0;
    const spendingBonus = updatedOwner ? (updatedOwner.spendingPower - 5) * 0.4 : 0;
    const randomShift = (Math.random() * 3.2) - 1.6;

    ratingDelta = Math.round(spendingBonus + randomShift);

    // Bound ratings between tier standards (45 min, 96 max)
    let newRating = Math.max(45, Math.min(96, currentRating + ratingDelta));

    // Update Historical Peak and Trough
    const historicalPeak = Math.max(club.historicalPeak || currentRating, newRating);
    const historicalTrough = Math.min(club.historicalTrough || currentRating, newRating);

    // Major growth headline (e.g. Burnley rising to top tier OVR)
    if (newRating >= 85 && currentRating < 85) {
      headlines.push(`🚀 EUROPEAN POWERHOUSE: ${club.name} reaches elite status with a ${newRating} OVR club rating!`);
    } else if (currentRating >= 82 && newRating < 78) {
      headlines.push(`⚠️ CLUB DECLINE: ${club.name} falls out of European elite following disappointing campaigns (${newRating} OVR).`);
    }

    return {
      ...club,
      rating: newRating,
      finances: currentFinances,
      owner: updatedOwner,
      historicalPeak,
      historicalTrough
    };
  });

  return { updatedClubs, headlines };
}

/**
 * Multi-factor calculation of club interest in a player.
 */
function calculateClubInterestScore(club: Club, player: Player): number {
  const year = player.year;
  const philosophy = getEffectiveClubPhilosophy(club, year);
  const lastSeason = player.history.length > 0 ? player.history[player.history.length - 1] : null;

  let performanceBonus = 0;
  let isBreakoutStar = false;

  if (lastSeason) {
    const totalContrib = lastSeason.goals + lastSeason.assists;
    const avgRating = lastSeason.rating;

    if (totalContrib >= 25) performanceBonus += 35;
    else if (totalContrib >= 15) performanceBonus += 20;

    if (avgRating >= 8.0) performanceBonus += 40;
    else if (avgRating >= 7.4) performanceBonus += 25;

    if ((player.ovr <= 75 || player.age <= 21) && (totalContrib >= 18 || avgRating >= 7.6)) {
      isBreakoutStar = true;
      performanceBonus += 30;
    }
  }

  const effectivePlayerRating = isBreakoutStar ? Math.max(player.ovr, player.ovr + 12) : player.ovr;

  if (club.rating >= 84) {
    if (player.age <= 18 && player.ovr < 72 && !isBreakoutStar) return -999;
    if (effectivePlayerRating < 78 && !isBreakoutStar && player.intCaps < 10) return -500;
  }

  let ageScore = 0;
  if (player.age <= 20) {
    if (philosophy === 'YOUTH_DEVELOPMENT') ageScore += 45;
    else if (philosophy === 'MONEYBALL') ageScore += 35;
    else if (philosophy === 'WORLD_SUPERSTARS') ageScore -= 30;
  } else if (player.age >= 21 && player.age <= 27) {
    ageScore += 25;
    if (philosophy === 'WINNING_NOW' || philosophy === 'WORLD_SUPERSTARS') ageScore += 30;
  }

  const ratingGap = club.rating - effectivePlayerRating;
  let gapScore = 0;
  if (ratingGap >= -5 && ratingGap <= 8) gapScore += 50;
  else if (ratingGap > 8 && ratingGap <= 15) gapScore += 20;
  else if (ratingGap < -5 && ratingGap >= -15) gapScore += 25;

  return gapScore + performanceBonus + ageScore + (Math.random() * 10 - 5);
}

export function generateClubOffers(player: Player): TransferOffer[] {
  const isTransferListed = !!player.isTransferListed;
  const currentClub = getClubByName(player.club);
  const eligibleClubs = CLUBS_2026.filter(c => c.name.toLowerCase() !== player.club.toLowerCase());
  const usedClubIds = new Set<string>();

  const scoredClubs = eligibleClubs
    .map(c => ({ club: c, score: calculateClubInterestScore(c, player) }))
    .filter(item => item.score > -200)
    .sort((a, b) => b.score - a.score);

  const pickUnusedClub = (predicate: (c: Club) => boolean, defaultFallbackId: string): Club => {
    const match = scoredClubs.find(item => predicate(item.club) && !usedClubIds.has(item.club.id));
    if (match) {
      usedClubIds.add(match.club.id);
      return match.club;
    }
    const fallback = CLUBS_2026.find(c => c.id !== defaultFallbackId && c.name.toLowerCase() !== player.club.toLowerCase() && !usedClubIds.has(c.id))
      || CLUBS_2026.find(c => !usedClubIds.has(c.id))
      || currentClub;
    usedClubIds.add(fallback.id);
    return fallback;
  };

  const resultOffers: TransferOffer[] = [];

  // Check for Multi-Club Sister Transfer Option
  let sisterClubOption: Club | null = null;
  if (currentClub.multiClubGroupId) {
    const group = MULTI_CLUB_GROUPS.find(g => g.id === currentClub.multiClubGroupId);
    if (group) {
      const sisterIds = group.clubIds.filter(id => id !== currentClub.id);
      const candidates = CLUBS_2026.filter(c => sisterIds.includes(c.id));
      if (candidates.length > 0) {
        sisterClubOption = candidates[Math.floor(Math.random() * candidates.length)];
        usedClubIds.add(sisterClubOption.id);
      }
    }
  }

  if (!isTransferListed) {
    resultOffers.push({
      id: "stay",
      club: currentClub,
      type: 'STAY',
      label: "RE-SIGN AT CURRENT CLUB",
      tagClass: "tag-perfect",
      contractLength: 1,
      description: `Stay at ${currentClub.name} and lead the team for another campaign.`
    });

    if (sisterClubOption) {
      resultOffers.push({
        id: "sister_club",
        club: sisterClubOption,
        type: 'SISTER_CLUB',
        label: "MOVE TO SISTER CLUB",
        tagClass: "tag-too-good",
        contractLength: 1,
        description: `Direct internal transfer within ownership group to ${sisterClubOption.name} (${sisterClubOption.rating} OVR).`
      });
    }

    const stepUpClub = pickUnusedClub(c => c.rating > player.ovr, "realmadrid");
    resultOffers.push({
      id: "too_good",
      club: stepUpClub,
      type: 'TOO_GOOD',
      label: "HIGH PRESTIGE MOVE",
      tagClass: "tag-too-good",
      contractLength: 1,
      description: `High prestige move to ${stepUpClub.name} (${stepUpClub.rating} OVR) to compete at the highest level.`
    });

    const perfectClub = pickUnusedClub(c => Math.abs(c.rating - player.ovr) <= 5, "celtic");
    resultOffers.push({
      id: "perfect",
      club: perfectClub,
      type: 'PERFECT',
      label: "PERFECT MATCH",
      tagClass: "tag-perfect",
      contractLength: 1,
      description: `Ideal squad fit at ${perfectClub.name} (${perfectClub.rating} OVR) with starting guarantees.`
    });

    const lowerClub = pickUnusedClub(c => c.rating < player.ovr, "shamrock");
    resultOffers.push({
      id: "lower",
      club: lowerClub,
      type: 'LOWER_TIER',
      label: "STAR ROLE MOVE",
      tagClass: "tag-not-good",
      contractLength: 1,
      description: `Offering starring role and leadership responsibilities at ${lowerClub.name}.`
    });

    if (!sisterClubOption) {
      const loanClub = pickUnusedClub(c => true, "anderlecht");
      resultOffers.push({
        id: "loan",
        club: loanClub,
        type: 'LOAN',
        label: "SEASON LOAN",
        tagClass: "tag-loan",
        contractLength: 1,
        description: `1-Year temporary loan deal to gain crucial top-flight experience at ${loanClub.name}.`
      });
    }

  } else {
    // TRANSFER LISTED WINDOW (6 OFFERS, NO STAY)
    if (sisterClubOption) {
      resultOffers.push({
        id: "forced_sister",
        club: sisterClubOption,
        type: 'SISTER_CLUB',
        label: "SISTER CLUB REFUGE",
        tagClass: "tag-too-good",
        contractLength: 1,
        description: `Internal network transfer to sister club ${sisterClubOption.name} (${sisterClubOption.rating} OVR).`
      });
    }

    const stepUpClub = pickUnusedClub(c => c.rating >= player.ovr, "realmadrid");
    resultOffers.push({
      id: "forced_1",
      club: stepUpClub,
      type: 'FORCED_TRANSFER',
      label: "PRESTIGE EXIT BID",
      tagClass: "tag-too-good",
      contractLength: 1,
      description: `Capitalizing on transfer listing, ${stepUpClub.name} submitted a major bid.`
    });

    const perfectClubA = pickUnusedClub(c => Math.abs(c.rating - player.ovr) <= 5, "celtic");
    resultOffers.push({
      id: "forced_2",
      club: perfectClubA,
      type: 'PERFECT',
      label: "PRIMARY PERFECT MATCH",
      tagClass: "tag-perfect",
      contractLength: 1,
      description: `Immediate starting opportunity following transfer listing at ${perfectClubA.name}.`
    });

    const perfectClubB = pickUnusedClub(c => Math.abs(c.rating - player.ovr) <= 6, "sociedad");
    resultOffers.push({
      id: "forced_3",
      club: perfectClubB,
      type: 'PERFECT',
      label: "ALTERNATIVE MATCH",
      tagClass: "tag-perfect",
      contractLength: 1,
      description: `Tactical fit offering key first-team responsibilities at ${perfectClubB.name}.`
    });

    const fallbackClubA = pickUnusedClub(c => c.rating <= player.ovr && c.rating >= player.ovr - 5, "southampton");
    resultOffers.push({
      id: "forced_4",
      club: fallbackClubA,
      type: 'LOWER_TIER',
      label: "REALISTIC FALLBACK MOVE",
      tagClass: "tag-not-good",
      contractLength: 1,
      description: `Guaranteed starting spot and immediate squad exit at ${fallbackClubA.name}.`
    });

    if (!sisterClubOption) {
      const fallbackClubB = pickUnusedClub(c => c.rating <= player.ovr && c.rating >= player.ovr - 7, "coventry");
      resultOffers.push({
        id: "forced_5",
        club: fallbackClubB,
        type: 'LOWER_TIER',
        label: "SECOND REALISTIC FALLBACK",
        tagClass: "tag-not-good",
        contractLength: 1,
        description: `Offering fresh start and captaincy role at ${fallbackClubB.name}.`
      });
    }
  }

  return resultOffers;
}

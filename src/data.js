/* Core Knowledge unit data, K–8, plus the Oxford book list and the character list.
   Unit titles and download pages checked against coreknowledge.org on 11 Oct 2026. */
const CKU = "https://www.coreknowledge.org/wp-content/uploads/";
const FR = "https://www.coreknowledge.org/free-resource/";
const SOURCES = {
  hg:   { t: "Core Knowledge: History & Geography (unit list and Online Resources)", u: "https://www.coreknowledge.org/history-geography/" },
  sci:  { t: "Core Knowledge: Science (unit list and Online Resources)", u: "https://www.coreknowledge.org/science/" },
  la:   { t: "Core Knowledge: Language Arts (Grades 6–8 unit list)", u: "https://www.coreknowledge.org/language-arts/" },
  llk2: { t: "CKLA Grades K–2: Sequence of Domains in the Listening & Learning Strand (PDF)", u: CKU + "2017/03/AnnotatedLesson_LL_CKLA.pdf" },
  g3:   { t: "CKLA Grade 3 domain list (RACHEL offline mirror of Core Knowledge materials)", u: "https://rachel.core2learn.org/modules/en-coreknowledge/CoreKnowledgeG3.html" },
  pages:{ t: "Core Knowledge site index of free unit pages (library sitemap)", u: "https://www.coreknowledge.org/library-sitemap2.xml" },
  dl:   { t: "Core Knowledge: Download Free Curriculum", u: "https://www.coreknowledge.org/download-free-curriculum/" },
  home: { t: "Core Knowledge: Homeschoolers (what is free, what is sold)", u: "https://www.coreknowledge.org/homeschoolers/" }
};

const NOTES = {
  us: "U.S.-focused unit. Optional for Pakistani families: mark it Skipped, or use the time for Pakistan Studies.",
  islam: "Written by a secular U.S. publisher for general schools. Read it before teaching; it names the Prophet ﷺ without salutation and describes Islam from outside the faith. Add the proper titles aloud and correct anything that conflicts with your ʿaqīdah.",
  sa: "Connects directly to South Asian history. A good place to add Sindh and the Indus Valley to the family timeline.",
  review: "Parents may wish to read this unit first and decide how and when to teach it.",
  book: "The unit guide is free, but it is built around a published novel or memoir that you buy separately.",
  nopage: "The Foundation's site has no separate download page for this unit. The Online Resources guide below lists the unit's materials, and the Core Classics series has the novel."
};

/* Rows: [title, unit-page slug or null, Online Resources path or null, flags] */
const RAW = {
  la: {
    0: ["Nursery Rhymes and Fables|ckla-domain-01-nursery-rhymes-fables","The Five Senses|ckla-domain-02-human-body-five-senses","Stories|ckla-domain-03-stories","Plants|ckla-domain-04-plants-kinder","Farms|ckla-domain-05-farms","Native Americans|ckla-domain-06-native-americans|us","Kings and Queens|ckla-domain-07-kings-queens","Seasons and Weather|ckla-domain-08-seasons-weather","Columbus and the Pilgrims|ckla-domain-09-columbus-pilgrims|us","Colonial Towns and Townspeople|ckla-domain-10-colonial-towns-townspeople|us","Taking Care of the Earth|ckla-domain-11-taking-care-earth","Presidents and American Symbols|ckla-domain-12-presidents-american-symbols|us"],
    1: ["Fables and Stories|ckla-domain-01-fables-stories","The Human Body|ckla-domain-02-human-body","Different Lands, Similar Stories|ckla-domain-03-different-lands-similar-stories","Early World Civilizations|ckla-domain-04-early-world-civilizations","Early American Civilizations|ckla-domain-05-early-american-civilizations","Astronomy|ckla-domain-06-astronomy","The History of the Earth|ckla-domain-07-history-earth","Animals and Habitats|ckla-domain-08-animals-habitats","Fairy Tales|ckla-domain-09-fairy-tales","A New Nation|ckla-domain-10-new-nation-american-independence|us","Frontier Explorers|ckla-domain-11-frontier-explorers|us"],
    2: ["Fairy Tales and Tall Tales|ckla-domain-01-fairy-tales-tall-tales","Early Asian Civilizations|ckla-domain-02-early-asian-civilizations","The Ancient Greek Civilization|ckla-domain-03-ancient-greek-civilization","Greek Myths|ckla-domain-04-greek-myths","The War of 1812|ckla-domain-05-war-1812|us","Cycles in Nature|ckla-domain-06-cycles-nature","Westward Expansion|ckla-domain-07-westward-expansion|us","Insects|ckla-domain-08-insects","The U.S. Civil War|ckla-domain-09-us-civil-war|us","The Human Body: Building Blocks and Nutrition|ckla-domain-10-human-body-building-blocks-nutrition","Immigration|ckla-domain-11-immigration|us","Fighting for a Cause|ckla-domain-12-fighting-cause|us"],
    3: ["Classic Tales: The Wind in the Willows|ckla-domain-01-classic-tales-the-wind-in-the-willows","Classification of Animals|ckla-domain-02-classification-animals","The Human Body: Systems and Senses|ckla-domain-03-human-body-systems-senses","The Ancient Roman Civilization|ckla-domain-04-ancient-roman-civilization","Light and Sound|ckla-domain-05-light-sound","The Viking Age|ckla-domain-06-viking-age","Astronomy: Our Solar System and Beyond|ckla-domain-07-astronomy-solar-system-beyond","Native Americans: Regions and Cultures|ckla-domain-08-native-americans-regions-cultures|us","European Exploration of North America|ckla-domain-09-european-exploration-north-america|us","Colonial America|ckla-domain-10-colonial-america|us","Ecology|ckla-domain-11-ecology"],
    4: ["Brown Girl Dreaming|ckla-unit-1-brown-girl-dreaming|book","The Middle Ages|ckla-unit-2-middle-ages","King Arthur and the Round Table|ckla-unit-3-king-arthur-and-the-round-table","Listen, My Children (Poetry)|ckla-unit-4-listen-my-children-poetry","Geology|ckla-unit-5-geology","The American Revolution|ckla-unit-6-american-revolution|us","The United States Constitution|ckla-unit-7-united-states-constitution|us","Treasure Island|ckla-unit-8-treasure-island"],
    5: ["They Call Me Güero|ckla-unit-1-they-call-me-guero-g5|book us","Early American Civilizations|ckla-unit-2-early-american-civilizations","Adventures of Don Quixote|ckla-unit-3-adventures-of-dondon-quixote","The Renaissance|ckla-unit-4-the-renaissance","A Midsummer Night’s Dream|ckla-unit-5-a-midsummer-nights-dream","The Reformation|ckla-unit-6-the-reformation","Poetry|ckla-unit-7-poetry","Native Americans|ckla-unit-8-native-americans|us","The Science of Breakable Things|ckla-unit-9-the-science-of-breakable-things|book"],
    6: ["Flying Lessons & Other Stories|ckla-unit-1-flying-lessons-other-stories|2023/08/CKLA_G6U1_FlyingLessonsAndOtherStories_ORG.pdf","Calling All Minds: How to Think and Create Like an Inventor|ckla-unit-2-calling-all-minds|2023/08/CKLA_G6U2_CallingAllMinds_ORG.pdf","The Heritage of Ancient Greece and Rome|ckla-unit-3-the-heritage-of-ancient-greece-and-rome|2023/08/CKLA_G6U3_TheHeritageOfAncientGreeceAndRome_ORG.pdf","The Iliad, the Odyssey, and Other Greek Stories|ckla-unit-4-the-iliad-and-the-odyssey-and-other-greek-stories|2023/08/CKLA_G6U4_TheIliadTheOdysseyAndOtherGreekStories_ORG.pdf","The Tragedy of Julius Caesar|ckla-unit-5-the-tragedy-of-julius-caesar|2023/08/CKLA_G6U5_TheTragedyOfJuliusCaesar_ORG.pdf","90 Miles to Havana|ckla-unit-6-ninety-miles-to-havana|2023/08/CKLA_G6U6_90MilesToHavana_ORG.pdf","The Blessings of Liberty|ckla-unit-7-the-blessings-of-liberty|2023/08/CKLA_G6U7_TheBlessingsOfLiberty_ORG.pdf|us","Realms of Gold, Volume 1|ckla-unit-8-realms-of-gold-volume-1|2023/08/CKLA_G6U8_RealmsOfGoldV1_ORG.pdf"],
    7: ["Hello, Universe|ckla-unit-1-hello-universe|2021/11/CKLA_G7U1_HelloUniverse_ORG.pdf","The Tempest|ckla-unit-2-the-tempest|2021/11/CKLA_G7U2_TheTempest_ORG.pdf","Strange Case of Dr. Jekyll and Mr. Hyde|ckla-unit-3-strange-case-of-dr-jekyll-and-mr-hyde|2021/11/CKLA_G7U3_StrangeCaseOfDrJekyllAndMrHyde_ORG.pdf","The Time Machine|ckla-unit-4-the-time-machine|2022/08/CKLA_G7U4_TheTimeMachine_ORG.pdf","Realms of Gold, Volume 2|ckla-unit-5-realms-of-gold-volume-2|2022/09/CKLA_G7U5_RealmsOfGoldVol2_ORG.pdf","The Genius of the Harlem Renaissance, Volume 1|ckla-unit-6-the-genius-of-the-harlem-renaissance-volume-1|2021/11/CKLA_G7U6_TheGeniusOfTheHarlemRenaissanceV1_ORG.pdf|us","Anne Frank’s Tales from the Secret Annex|ckla-unit-7-anne-franks-tales-from-the-secret-annex|2021/11/CKLA_G7U7_AnneFranksTalesFromTheSecretAnnex_ORG.pdf","Code Talker|ckla-unit-8-code-talker|2022/09/CKLA_G7U8_CodeTalker_ORG.pdf|us"],
    8: ["Us, in Progress: Short Stories About Young Latinos|ckla-unit-1-us-in-progress-short-stories-about-young-latinos|2023/08/CKLA_G8U1_UsInProgress_ORG.pdf|us","Frankenstein||2023/08/CKLA_G8U2_Frankenstein_ORG.pdf|nopage","Narrative of the Life of Frederick Douglass||2023/08/CKLA_G8U3_NarrativeOfTheLifeOfFrederickDouglass_ORG.pdf|nopage","The Genius of the Harlem Renaissance, Volume 2|ckla-unit-4-the-genius-of-the-harlem-renaissance-volume-2|2023/08/CKLA_G8U4_TheGeniusOfTheHarlemRenaissanceV2_ORG.pdf|us","A More Perfect Union: Voices for Civil Rights in America|ckla-unit-5-a-more-perfect-union-voices-for-civil-rights-in-america|2023/08/CKLA_G8U5_AMorePerfectUnion_ORG.pdf|us","The Squatter and the Don|ckla-unit-6-the-squatter-and-the-don|2023/08/CKLA_G8U6_TheSquatterAndTheDon_ORG.pdf|us","The Importance of Being Earnest|ckla-unit-7-the-importance-of-being-earnest|2023/08/CKLA_G8U7_TheImportanceOfBeingEarnest_ORG.pdf","Realms of Gold, Volume 3|ckla-unit-8-realms-of-gold-volume-3|2023/08/CKLA_G8U8_RealmsOfGoldV3_ORG.pdf"]
  },
  skills: {
    0: Array.from({length:10},(_,i)=>`Kindergarten Skills, Unit ${i+1}|ckla-unit-${String(i+1).padStart(2,"0")}-kindergarten-skills`),
    1: ["Grade 1 Skills, Unit 1|ckla-unit-1-grade-1-skills","Gran|ckla-unit-2-grade-1-skills-gran","Fables|ckla-unit-3-grade-1-skills-fables","The Green Fern Zoo|ckla-unit-4-grade-1-skills-green-fern-zoo","Kate’s Book|ckla-unit-5-grade-1-skills-kates-book","Grace|ckla-unit-6-grade-1-skills-grace","Kay and Martez|ckla-unit-7-grade-1-skills-kay-martez"],
    2: ["The Cat Bandit|ckla-unit-1-second-grade-skills-cat-bandit","Bedtime Tales|ckla-unit-2-second-grade-skills-bedtime-tales","Kids Excel|ckla-unit-3-second-grade-skills-kids-excel","Job Hunt|ckla-unit-4-second-grade-skills-job-hunt","Sir Gus|ckla-unit-5-second-grade-skills-sir-gus","The War of 1812|ckla-unit-6-second-grade-skills-war-1812"],
    3: ["Classic Tales|ckla-unit-01-third-grade-skills-classic-tales","Rattenborough’s Guide to Animals|ckla-unit-02-third-grade-skills-rattenboroughs-guide-animals","How Does Your Body Work?|ckla-unit-03-third-grade-skills-body-work","Stories of Ancient Rome|ckla-unit-04-third-grade-skills-stories-ancient-rome","Adventures in Light and Sound|ckla-unit-05-third-grade-skills-adventures-light-sound","Gods, Giants, and Dwarves|ckla-unit-06-third-grade-skills-gods-giants-dwarves","What’s in the Universe?|ckla-unit-07-third-grade-skills-whats-universe","Native American Stories|ckla-unit-08-third-grade-skills-native-american-stories","The Age of Exploration|ckla-unit-09-third-grade-skills-age-exploration","Living in Colonial America|ckla-unit-10-third-grade-skills-living-colonial-america","Introduction to Ecology|ckla-unit-11-third-grade-skills-introduction-ecology"]
  },
  hg: {
    0: ["Let’s Explore Our World!|ckhg-unit-1-lets-explore-our-world|2019/08/CKHG_GK_U1_Lets-Explore-Our-World_Online-Resources_W1.pdf","Native Americans|ckhg-unit-2-native-americans|2019/07/CKHG_GK_U2_Native-Americans_Online-Resources_W1.pdf|us","Exploring and Moving to America|ckhg-unit-3-exploring-and-moving-to-america|2019/09/CKHG_GK-U3_Exploring-and-Moving-to-America_Online-Resources_W1.pdf|us","The Mount Rushmore Presidents|ckhg-unit-4-the-mount-rushmore-presidents|2019/11/CKHG_GK-U4_Mount-Rushmore-Presidents_Online-Resources_W1.pdf|us"],
    1: ["Continents, Countries, and Maps|ckhg-unit-1-continents-countries-and-maps|2019/07/CKHG_G1-U1_ContinentsCountriesMaps_Online-Resources_W1.pdf","Mesopotamia|ckhg-unit-2-mesopotamia|2018/12/CKHG_G1-U2_Mesopotamia_Online-Resources_W1.pdf","Ancient Egypt|ckhg-unit-3-ancient-egypt|2018/12/CKHG_G1-U3_Ancient-Egypt_Online-Resources_W1.pdf","Three World Religions|ckhg-unit-4-three-world-religions|2019/08/CKHG_G1-U4_Three-World-Religions_Online-Resources_W1.pdf|islam","Early Civilizations of the Americas|ckhg-unit-5-early-civilizations-of-the-americas|2019/06/CKHG_G1_U5_Early_Civilizations_Americas_Online-Resources_W1.pdf","The Culture of Mexico|ckhg-unit-6-culture-of-mexico|2019/06/CKHG_G1_U6_The-Culture-of-Mexico_Online-Resources_W1.pdf","Early Explorers and Settlers|ckhg-unit-7-early-explorers-and-settlers|2019/10/CKHG_G1-U7_Early-Explorers-and-Settlers_Online_Resources_W1.pdf|us","From Colonies to Independence|ckhg-unit-8-from-colonies-to-independence|2019/11/CKHG_G1-U8_From-Colonies-to-Independence_Online-Resources_W1.pdf|us","Exploring the West|ckhg-unit-9-exploring-the-west|2020/03/CKHG_G1_U9_Exploring-the-West_Online-Resources_W1.pdf|us","Lessons in Civics|ckhg-unit-10-lessons-in-civics|2023/12/CKHG_G1U10_ORG_Web_W1.pdf"],
    2: ["Ancient India|ckhg-unit-01-ancient-india|2022/08/CKHG_G2_U1_AncientIndia_OnlineResources_W2.pdf|sa","Ancient China|ckhg-unit-02-ancient-china|2019/08/CKHG_G2_U2_AncientChina_OnlineResources_W1.pdf","The Culture of Japan|ckhg-unit-03-the-culture-of-japan|2019/06/CKHG_G2_U3_The-Culture-of-Japan_Online-Resources_W1.pdf","Ancient Greece|ckhg-unit-04-ancient-greece|2019/08/CKHG_G2_U4_Ancient-Greece_Online-Resources_W1.pdf","Geography of the Americas|ckhg-unit-05-geography-of-americas|2019/06/CKHG_G2_U5_Geography-of-the-Americas_Online-Resources_W1.pdf","Making the Constitution|ckhg-unit-06-making-the_constitution|2019/10/CKHG_G2_U6_Making-the-Constitution_Online-Resources_W1.pdf|us","The War of 1812|ckhg-unit-07-the-war-of-1812|2020/03/CKHG_G2-U7_The_War_of_1812_Online_Resources_W1.pdf|us","Americans Move West|ckhg-unit-08-americans-move-west|2019/11/CKHG_G2-U8_Americans-Move-West_Online-Resources_W1.pdf|us","The Civil War|ckhg-unit-09-the-civil-war|2019/12/The-Civil-War_Online-Resources_W1.pdf|us","Immigration and Citizenship|ckhg-unit-10-immigration-and-citizenship|2019/12/CKHG_G2_U10_Immigration-and-Citizenship_ORG_W1.pdf|us","Civil Rights Leaders|ckhg-unit-11-civil-rights-leaders|2019/12/CKHG_G2-U11_Civil-Rights-Leaders_Online-Resources_W1.pdf|us","Lessons in Economics|ckhg-unit-12-lessons-in-economics|2023/12/CKHG_G2U12_ORG_Web_W1.pdf"],
    3: ["World Rivers|ckhg-unit-1-world-rivers|2017/02/CKHG_G3_U1_WorldRiversOnlineResources_W1.pdf","Ancient Rome|ckhg-unit-2-ancient-rome|2017/02/CKHG_G3_U2_AncientRomeOnlineResources_W1.pdf","The Vikings|ckhg-unit-3-vikings|2017/03/CKHG_G3_U3_OnlineResources_Vikings_W1.pdf","The Earliest Americans|ckhg-unit-4-earliest-americans|2023/01/CKHG_G3_U4_Earliest_Americansonlineresources_W1.pdf","Canada|ckhg-unit-5-canada|2017/03/CKHG_G3U5_OnlineResources_Canada_W1.pdf","Exploration of North America|ckhg-unit-6-exploration-north-america|2017/08/CKHG-Online-Resources-Exploration-Of-North-America_W1.pdf|us","The Thirteen Colonies|ckhg-unit-7-thirteen-colonies|2017/07/CKHG_G3U7_Online-Resources-Thirteen-Colonies_W1.pdf|us"],
    4: ["Using Maps|ckhg-unit-01-using-maps|2017/02/CKHG_OnlineResources-Using-Maps.pdf","World Mountains|ckhg-unit-02-world-mountains|2017/02/CKHG_OnlineResources_World-Mountains.pdf","Medieval Europe|ckhg-unit-03-medieval-europe|2022/06/CKHG-G4U3_OnlineResources_Medieval-Europe_W1.pdf","Medieval Islamic Empires|ckhg-unit-04-medieval-islamic-empires|2017/03/CKHG-Online-Resources-Islamic-Empires_W1.pdf|islam","Early and Medieval African Kingdoms|ckhg-unit-05-early-medieval-african-kingdoms|2017/03/CKHG_G4_U4-Online-Resources-Early-Islamic-Civilization-and-African-Kingdoms_W1.pdf","Dynasties of China|ckhg-unit-06-dynasties-china|2017/03/CKHG_G4_U6-Online-Resources-Dynasties-of-China_W1.pdf","The American Revolution|ckhg-unit-07-american-revolution|2017/02/CKHG_G4_U7-OnlineResources_American-Revolution_W1.pdf|us","The United States Constitution|ckhg-unit-08-united-states-constitution|2017/08/CKHG_G4_U8-Online-Resources-The-United-States-Constitution_W1.pdf|us","Early Presidents|ckhg-unit-09-early-presidents|2017/09/CKHG_G4_U9-EarlyPresidents_W1.pdf|us","American Reformers|ckhg-unit-10-american-reformers|2017/09/CKHG_G4_U9-EarlyPresidents_W1.pdf|us","Understanding Civics|ckhg-unit-11-understanding-civics|2024/01/CKHG_G4U11_ORG_Web_W1.pdf|us"],
    5: ["World Lakes|ckhg-unit-01-world-lakes|2017/02/CKHG_OnlineResources_World-Lakes.pdf","Maya, Aztec, and Inca Civilizations|ckhg-unit-02-maya-aztec-inca-civilizations|2017/02/CKHG_G5-U2_Maya-Inca_Aztec_W1.pdf","The Age of Exploration|ckhg-unit-03-age-exploration|2023/01/CKHG_OnlineResources_Age-of-Exploration.pdf","The Renaissance|ckhg-unit-04-renaissance|2017/08/CKHG_G5_U4-5-6-Online-Resources-Renaissance-Englands-Golden-Age_W1.pdf","The Reformation|ckhg-unit-05-reformation|2017/08/CKHG_G5_U4-5-6-Online-Resources-Renaissance-Englands-Golden-Age_W1.pdf","England and the Golden Age|ckhg-unit-06-england-golden-age|2017/08/CKHG_G5_U4-5-6-Online-Resources-Renaissance-Englands-Golden-Age_W1.pdf","Early Russia|ckhg-unit-07-early-russia|2023/02/CKHG-G5_U7-8_Online-Resources-Czars-and-Shoguns_W1.pdf","Feudal Japan|ckhg-unit-08-feudal-japan|2023/02/CKHG-G5_U7-8_Online-Resources-Czars-and-Shoguns_W1.pdf","The Geography of the United States|ckhg-unit-09-geography-united-states|2017/07/CKHG_G5_U9-Online-Resources-US-Geography_W1.pdf|us","Westward Expansion Before the Civil War|ckhg-unit-10-westward-expansion-civil-war|2017/08/CKHG_G5_U10-Online-Resources-Westward-Expansion-Before-the-Civil-War_W1.pdf|us","The Civil War|ckhg-unit-11-civil-war|2017/08/CKHG_G5_U11-Online-Resources-The-Civil-War-U11_W1.pdf|us","Westward Expansion After the Civil War|ckhg-unit-12-westward-expansion-civil-war|2017/09/CKHG-Native-Americans-and-Westward-Expansion_Online-Resources.pdf|us","Native Americans: Cultures and Conflicts|ckhg-unit-13-native-americans-cultures-conflicts|2017/09/CKHG-Native-Americans-and-Westward-Expansion_Online-Resources.pdf|us","Understanding Economics|ckhg-unit-14-understanding-economics|2024/01/CKHG_G5U14_ORG_Web_W1.pdf"],
    6: ["World Deserts|ckhg-unit-1-world-deserts|2018/01/CKHG_G6_U1_WorldDeserts_OnlineResources_W1.pdf","Ancient Greece and Rome|ckhg-unit-2-ancient-greece-rome|2018/03/CKHG_G6_U2-Online-Resources-Ancient-Greece-and-Rome_W2.pdf","The Enlightenment|ckhg-unit-3-enlightenment|2018/04/CKHG_G6_U3_Enlightenment_OnlineResources.pdf","The French Revolution and Romanticism|ckhg-unit-4-the-french-revolution-and-romanticism|2018/04/CKHG_G6_U4_FrenchRevRomanticism_OnlineResources_W1.pdf","The Industrial Revolution: Changes and Challenges|ckhg-unit-5-industrial-revolution|2018/04/CKHG_G6_U5_Industrial-Revolution_Online-Resources_W1.pdf","Independence of Latin America|ckhg-unit-6-independence-for-latin-america|2018/05/CKHG_G6_U6_Independence-for-Latin-America_OnlineResources.pdf","Immigration|ckhg-unit-7-immigration|2018/05/CKHG_G6_U7_Immigration_OnlineResources_W1.pdf|us","Industrialization and Urbanization in America|ckhg-unit-8-industrialization-and-urbanization-in-america|2018/05/CKHG_G6_U8_Industrialization-and-Urbanization-in-America_OnlineRecources_W1.pdf|us","Reform in Industrial America|ckhg-unit-9-reform-in-industrial-america|2018/05/CKHG_G6_U9_Reform-in-Industrial-America_OnlineResources.pdf|us"],
    7: ["A History of the United States, Volume 1: Precolonial to the 1800s|ckhg-a-history-of-the-united-states|2021/07/CKHG_G7_The-US-History_Volume-1_Online-Resources_W1.pdf|us","A History of the United States, Volume 2: Late 1800s to the 2000s|ckhg-a-history-of-the-united-states|2023/01/CKHG_G7_The-US-History_Volume-2_Online-Resources_W1.pdf|us","Civics and Economics in U.S. History|ckhg-civics-and-economics-in-u-s-history|2023/09/CKHG_G7_CivicsEcon_ORG_Web_W1.pdf|us"],
    8: ["World History, Volume 1: The Ancient World to the Medieval Era|world-history|2022/11/CKHG_World-History_Vol1_Online-Resources-1_W1.pdf","World History, Volume 2: Renaissance to Modern Day|world-history|2022/11/CKHG_World-History_Vol2_Online-Resources-1_W1.pdf","Civics and Economics in World History|ckhg-civics-and-economics-in-world-history|2023/09/CKHG_G8_CivicsEcon_ORG_Web_W1.pdf"]
  },
  sci: {
    0: ["Pushes and Pulls|cksci-unit-1-pushes-and-pulls|2020/06/CKSci_GKU1_Pushes-and-Pulls_ORG_W1.pdf","Needs of Plants and Animals|cksci-unit-2-needs-of-plants-and-animals|2020/07/CKSci_GKU2_Needs-of-Plants-and-Animals_ORG_W1.pdf","Changing Environments|cksci-unit-3-changing-environments|2020/07/CKSci_GKU3_Changing-Environments_ORG_W1.pdf","Weather Patterns|cksci-unit-4-weather-patterns|2020/07/CKSci_GKU4_Weather-Patterns_ORG_W1.pdf","Our Five Senses|cksci-unit-5-health-and-the-human-body-our-five-senses|2020/12/CKSci_GKU5_Our-Five-Senses_ORG_W1.pdf","Computers All Around Us|cksci-unit-6-computers-all-around-us|2023/09/CKSciSC_GKU6_ComputersAllAroundUs_ORG_W2.pdf","Science All Around Us|cksci-unit-7-science-all-around-us|2024/08/CKSciSC_GKU7_ScienceAllAroundUs_ORG_W1.pdf"],
    1: ["Sun, Moon, and Stars|cksci-unit-1-sun-moon-and-stars|2020/07/CKSci_G1U1_Sun-Moon-and-Stars_ORG_W1.pdf","Plant and Animal Survival|cksci-unit-2-plant-and-animal-survival|2020/06/CKSci_G1U2_Plant-and-Animal-Survival_ORG_W1.pdf","Exploring Light and Sound|cksci-unit-3-exploring-light-and-sound|2020/06/CKSci_G1U3_LightandSound_ORG_W1.pdf","Simple Machines|cksci-unit-4-simple-machines|2020/12/CKSci_G1U4_Simple-Machines_ORG_W1.pdf","Human Body Systems|cksci-unit-5-health-and-the-human-body-human-body-systems|2020/12/CKSci_G1U5_Human-Body-Systems_ORG_W1.pdf","Helpful Computers|cksci-unit-6-helpful-computers|2023/09/CKSci_G1U6_HelpfulComputers_ORG_W2.pdf","Science for Everyone|cksci-unit-7-science-for-everyone|2024/08/CKSci_G1U7_ScienceForEveryone_ORG_W1.pdf"],
    2: ["Properties of Matter|cksci-unit-1-properties-of-matter|2020/06/CKSci_G2U1_Properties-of-Matter_Online-Resource_W1.pdf","Organisms and Their Habitats|cksci-unit-2-organisms-and-their-habitats|2020/07/CKSci_G2U2_Organisms-and-their-Habitats_ORG_W1.pdf","Exploring Land and Water|cksci-unit-3-exploring-land-and-water|2020/07/CKSci_G2U3_Exploring-Land-and-Water_ORG_W1.pdf","Electricity and Magnetism|cksci-unit-4-electricity-and-magnetism|2020/12/CKSci_G2U4_Electricity-and-Magnetism_ORG_W1.pdf","Human Cells and Digestion|cksci-unit-5-human-cells-and-digestion|2020/12/CKSci_G2U5_Human-Cells_ORG_W1.pdf","Using Computers|cksci-unit-6-using-computers|2023/09/CKSciSC_G2U6_UsingComputers_ORG_W2.pdf","Learning About Science|cksci-unit-7-learning-about-science|2024/08/CKSci_G2U7_LearningAboutScience_ORG_W1.pdf"],
    3: ["Investigating Forces|cksci-unit-1-forces|2019/06/CKSci_G3U1_Investigating_Forces_Online_Resources_W1.pdf","Life Cycles, Traits, and Variations|cksci-unit-2-life-cycles-traits-and-variations|2019/08/CKSci_G3U2_Life_Cycles_OnlineResources_W1.pdf","Habitats and Change|cksci-unit-3-habitats-and-change|2019/08/CKSci_G3U3_Habitats_OnlineResources_W1.pdf","Weather and Climate|cksci-unit-4-weather-and-climate|2023/11/CKSci_G3U4_Weather_NGSS_OnlineResources_W2.pdf","Human Senses and Movement|cksci-unit-5-human-senses-and-movement|2021/02/CKSci_G3U5_Human-Senses-and-movement_ORG_W1.pdf","Codes and Computers|cksci-unit-6-codes-and-computers|2023/09/CKSciSC_G3U6_CodesAndComputers_ORG_W2.pdf","Reading About Science|cksci-unit-7-reading-about-science|2024/08/CKSci_G3U7_ReadingAboutScience_ORG_W1.pdf"],
    4: ["Energy Transfer and Transformation|cksci-unit-1-energy-transfer-and-transformation|2019/01/CKSci_G4U1_Energy-Transfer-and-Transformation_Online_Resources_W1.pdf","Investigating Waves|cksci-unit-2-investigating-waves|2019/08/CKSci_G4U2_InvestigatingWaves_OnlineResources_W1.pdf","Structures and Functions of Living Things|cksci-unit-3-structures-and-functions|2019/08/CKSci_G4U3_StructureFunction_OnlineResources_W1.pdf","Processes That Shape Earth|cksci-unit-4-processes-that-shape-earth|2019/09/CKSci_G4U4_EarthProcesses_OnlineResources_W1.pdf","Using Natural Resources for Energy|cksci-unit-5-using-natural-resources-for-energy|2019/09/CKSci_G4U5_EnergyResources_OnlineResources_W1.pdf","Human Respiration and Circulation|cksci-unit-6-human-respiration-and-circulation|2021/06/CKSci_G4U6_ORG_W1.pdf","Problem-Solving and Computers|cksci-unit-7-problem-solving-and-computers|2023/09/CKSciSC_G4U7_ProblemSolvingAndComputers_ORG_W2.pdf","Making Sense of Science|cksci-unit-8-making-sense-of-science|2024/08/CKSci_G4U8_MakingSenseOfScience_ORG_W1.pdf"],
    5: ["Investigating Matter|cksci-unit-1-investigating-matter|2019/07/CKSci_G5U1_Investigating-Matter_Online_Resources_W1.pdf","Energy and Matter in Ecosystems|cksci-unit-2-energy-and-matter-in-ecosystems|2020/01/CKSci_G5_U2_Ecosystems_OnlineResources_W1.pdf","Modeling Earth’s Systems|cksci-unit-3-modeling-earths-systems|2019/08/G5Sci-U3_EarthSystems_Online-Resources_W1.pdf","Protecting Earth’s Resources|cksci-unit-4-protecting-earths-resources|2019/09/G5Sci-U4_ProtectingResources_OnlineResources_W1.pdf","Astronomy: Space Systems|cksci-unit-5-astronomy-space-systems|2019/09/G5Sci-U5_Astronomy_OnlineResources_W1.pdf","Human Hormones and Reproduction|cksci-unit-6-human-hormones-and-reproduction|2021/06/CKSci_G5U6_ORG_W1.pdf|review","Designing Computer Programs|cksci-unit-7-designing-computer-programs|2023/09/CKSciSC_G5U7_DesigningComputerPrograms_ORG_W2.pdf","Using Science Knowledge|cksci-unit-8-using-science-knowledge|2024/08/CKSci_G5U8_UsingScienceKnowledge_ORG_W1.pdf"],
    6: ["Light and Matter|cksci-unit-1-light-and-matter|2022/02/CKSci_OSE_G6U1_ORG.pdf","Thermal Energy|cksci-unit-2-thermal-energy|2022/03/CKSci_OSE_G6U2_ORG.pdf","Weather, Climate, and Water Cycling|cksci-unit-3-weather-climate-and-water-cycling|2022/05/CKSci_OSE_G6U3_ORG_W3.pdf","Plate Tectonics and Rock Cycling|cksci-unit-4-plate-tectonics-and-rock-cycling|2022/09/CKSci_G6U4_Plate-Tectonics-and-Rock-Cycling_ORG.pdf","Natural Hazards|cksci-unit-5-natural-hazards|2022/10/CKSci_OSE_G6U5_ORG.pdf","Cells and Systems|cksci-unit-6-cells-and-systems|2022/11/CKSci_OSE_G6U6_ORG_W1.pdf"],
    7: ["Chemical Reactions and Matter|cksci-unit-1-chemical-reactions-and-matter|2022/02/CKSci_OSE_G7U1_ORG.pdf","Chemical Reactions and Energy|cksci-unit-2-chemical-reactions-and-energy|2022/05/CKSci_OSE_G7U2_ORG.pdf","Metabolic Reactions|cksci-unit-3-metabolic-reactions|2022/05/CKSci_OSE_G7U3_ORG.pdf","Matter Cycling and Photosynthesis|cksci-unit-4-matter-cycling-and-photosynthesis|2022/09/CKSci_OSE_G7U4_ORG.pdf","Ecosystem Dynamics|cksci-unit-5-ecosystem-dynamics|2022/11/CKSci_OSE_G7U5_ORG.pdf","Earth’s Resources and Human Impact|cksci-unit-6-earths-resources-and-human-impact|2022/10/CKSci_OSE_G7U6_ORG_W1.pdf"],
    8: ["Contact Forces|cksci-unit-1-contact-forces|2022/03/CKSci_OSE_G8U1_ORG_W1.pdf","Sound Waves|cksci-unit-2-sound-waves|2022/02/CKSci_OSE_G8U2_ORG_W1.pdf","Forces at a Distance|cksci-unit-3-forces-at-a-distance|2022/05/CKSci_OSE_G8U3_ORG_W1.pdf","Earth in Space|cksci-unit-4-earth-in-space|2022/08/CKSci_G8U4_Earth-in-Space_ORG_W1.pdf","Genetics|cksci-unit-5-genetics|2022/10/CKSci_OSE_G8U5_ORG_W1.pdf|review","Natural Selection and Common Ancestry|cksci-unit-6-natural-selection-and-common-ancestry|2022/11/CKSci_OSE_G8U6_ORG.pdf|review"]
  }
};

const SUBJECTS = {
  la:  { name: "Language Arts", code: "CKLA" },
  hg:  { name: "History & Geography", code: "CKHG" },
  sci: { name: "Science", code: "CKSci" }
};

/* Flatten. Language Arts K–3 has two strands: read-aloud domains (Knowledge) and Skills units. */
const ITEMS = (() => {
  const out = [];
  const push = (s, g, i, row, strand) => {
    const parts = row.split("|");
    let [title, slug, a, b] = parts;
    let guide = null, flags = "";
    if (a && a.endsWith(".pdf")) { guide = CKU + a; flags = b || ""; } else flags = a || "";
    const f = flags.split(" ").filter(Boolean);
    let src;
    if (s === "la" && strand === "skills") src = "pages";
    else if (s === "la" && g <= 2) src = "llk2";
    else if (s === "la" && g === 3) src = "g3";
    else if (s === "la" && g <= 5) src = "pages";
    else src = s;
    let unit;
    if (strand === "skills") unit = "Skills " + (i + 1);
    else if (s === "la" && g <= 3) unit = "Domain " + (i + 1);
    else if (s === "hg" && g >= 7) unit = "Book " + (i + 1);
    else unit = "Unit " + (i + 1);
    const id = strand === "skills" ? `la-${g}-s${i + 1}` : `${s}-${g}-${i + 1}`;
    out.push({ id, s, g, unit, title, page: slug ? FR + slug + "/" : null, guide, src, flags: f, strand: strand || null });
  };
  for (const s of ["la", "hg", "sci"]) for (let g = 0; g <= 8; g++) {
    (RAW[s][g] || []).forEach((row, i) => push(s, g, i, row, s === "la" && g <= 3 ? "knowledge" : null));
    if (s === "la") (RAW.skills[g] || []).forEach((row, i) => push("la", g, i, row, "skills"));
  }
  return out;
})();

/* Oxford University Press Pakistan series seen on oup.com.pk and on Karachi school book lists.
   Chapter lists are not published online, so the parent types or pastes the contents page. */
const BOOK_SERIES = [
  { n: "New Oxford Social Studies for Pakistan", subj: "Social Studies" },
  { n: "Oxford International Primary English", subj: "English" },
  { n: "Oxford Reading Circle", subj: "English" },
  { n: "Oxford Progressive English", subj: "English" },
  { n: "Oxford International Primary Science", subj: "Science" },
  { n: "Oxford International Primary Geography", subj: "Geography" },
  { n: "Oxford International Primary History", subj: "History" },
  { n: "Oxford International Primary Computing", subj: "Computing" },
  { n: "Islamiyat for Primary Classes", subj: "Islamiyat" },
  { n: "Urdu Say Dosti", subj: "Urdu" },
  { n: "Nai Oxford Waqfiyat-e-Aama", subj: "Social Studies" },
  /* from a Karachi school's 2026–27 book list (see SCHOOL_LIST) */
  { n: "Oxford Discover", subj: "English" },
  { n: "Primary Mathematics", subj: "Mathematics" },
  { n: "Countdown", subj: "Mathematics" },
  { n: "New Oxford Primary Science", subj: "Science" },
  { n: "New Oxford Secondary Science", subj: "Science" },
  { n: "Secondary Social Studies for Pakistan", subj: "Social Studies" },
  { n: "Keyboard", subj: "Computing" },
  { n: "Karwan-e-Urdu", subj: "Urdu" }
];
const BOOK_SUBJECTS = ["English","Urdu","Mathematics","Science","Social Studies","History","Geography","Islamiyat","Qur'an","Computing","Sindhi","Art","General Knowledge","Other"];
const SUBJ_TO_CK = { English: ["la"], Science: ["sci"], "Social Studies": ["hg","sci"], History: ["hg"], Geography: ["hg","sci"] };

/* From the article "Things Every Child (4–12) Should Learn — Beyond Just Good Grades" by Abul Laith Muhammad Tahir Qadri */
const CHAR = [
  { k: "deen", name: "Deen", items: [
    "Love for Allah, His Messenger ﷺ, the Ahl al-Bayt and the Ṣaḥābah",
    "Performs Salah correctly, and is becoming regular with all five prayers",
    "Reads the Holy Qur'an with Tajweed, even a little each day",
    "Has memorised short Surahs and everyday duas (eating, sleeping, leaving the house)",
    "Says Bismillah before starting anything and Alhamdulillah afterwards",
    "Loves cleanliness and performs wudu properly"] },
  { k: "emo", name: "Managing emotions", ef: true, items: [
    "Controls anger instead of reacting impulsively",
    "Waits patiently and takes turns",
    "Listens without interrupting",
    "Finishes what they start instead of giving up quickly",
    "Tries to solve small problems alone before asking for help"] },
  { k: "others", name: "How they treat others", items: [
    "Respects parents and elders, and is kind to younger children",
    "Tells the truth, even after making a mistake",
    "Says please, thank you and sorry sincerely",
    "Keeps their word and returns what does not belong to them",
    "Is kind, forgiving and willing to help others",
    "Greets others with Salam; a good friend and neighbour",
    "Shares, gives charity, and cares for the poor and for animals"] },
  { k: "habits", name: "Daily habits", ef: true, items: [
    "Follows a routine and takes responsibility for small chores",
    "Keeps clean and keeps belongings organised",
    "Saves instead of spending everything at once",
    "Stays active, sleeps well and eats healthy food",
    "Knows basic safety: roads, strangers, emergency contacts, safe internet use",
    "Stays curious and is not afraid to ask questions"] }
];
const LEVELS = ["Not yet", "Learning", "Often", "Habit"];
const HARVARD = [
  { t: "A Guide to Executive Function", u: "https://developingchild.harvard.edu/resource-guides/guide-executive-function/", d: "What executive function is: the skills to plan, focus attention, switch gears and juggle tasks." },
  { t: "Activities Guide: Enhancing and Practicing Executive Function Skills", u: "https://developingchild.harvard.edu/resources/handouts-tools/activities-guide-enhancing-and-practicing-executive-function-skills/", d: "Games and routines grouped by age. Use the 3–5, 5–7 and 7–12 year sections." },
  { t: "What Is Executive Function? And How Does It Relate to Child Development?", u: "https://developingchild.harvard.edu/resources/infographics/what-is-executive-function-and-how-does-it-relate-to-child-development/", d: "A one-page infographic to share with the other parent or a teacher." }
];

/* A Karachi school's book list for 2026–27, supplied by the owner (printed 15 July 2026): Nursery (used for KG), Cambridge Levels I–VI and Matric Grades VII–VIII.
   Each row: [title as printed, subject, publisher, ISBN]. The optional dictionary is left out. The list gives no chapters. */
const SCHOOL_LIST = { name: "School book list 2026–27", classes: {
  /* KG uses the school's Nursery list (the owner confirmed this on 11 October 2026) */
  0: [
    ["New Phonic Language Series 2", "English", "Paragon Publications", ""],
    ["Phonic Student's Copy 2", "English", "Paragon Publications", ""],
    ["New Number Concept Series 2", "Mathematics", "Paragon Publications", ""],
    ["Maths Student's Copy 2", "Mathematics", "Paragon Publications", ""],
    ["میری اردو کی کتاب (اوّل)", "Urdu", "Paragon Publications", ""],
    ["اردو کی مشقی کتاب اوّل", "Urdu", "Paragon Publications", ""],
    ["Kids Culture, Junior", "General Knowledge", "Paragon Publications", ""],
    ["Rehmani Quaida [Jadeed] (For Class)", "Islamiyat", "Maktaba Barkat-ul-Madina (Bahadurabad)", ""],
    ["Rehmani Quaida [Jadeed] (For Home)", "Islamiyat", "Maktaba Barkat-ul-Madina (Bahadurabad)", ""]
  ],
  1: [
    ["Oxford Discover Student Book 1 (2nd Edition)", "English", "Oxford", "9780194053877"],
    ["Oxford Discover Workbook 1 (2nd Edition)", "English", "Oxford", "9780194053891"],
    ["Join Handwriting Series 1", "English", "Sheikh Shoukat Ali & Sons", ""],
    ["Primary Mathematics Book 1 (2nd Edition) SNC", "Mathematics", "Oxford", "9780190709655"],
    ["Primary Mathematics Book 1A (2nd Edition)", "Mathematics", "Oxford", "9780190701505"],
    ["Primary Mathematics Book 1B (2nd Edition)", "Mathematics", "Oxford", "9780190701512"],
    ["Karwan-e-Urdu Book - 1", "Urdu", "Paramount", "9789696370499"],
    ["Keyboard Book - 1 (4th Edition)", "Computing", "Oxford", "9789697346219"],
    ["Islamiat Juzz Awwal", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["My Creative Club Book - 1", "Art", "Paramount", ""]
  ],
  2: [
    ["Oxford Discover Student Book 2 (2nd Edition)", "English", "Oxford", "9780194053907"],
    ["Oxford Discover Workbook 2 (2nd Edition)", "English", "Oxford", "9780194053921"],
    ["Join Handwriting Series 2", "English", "Sheikh Shoukat Ali & Sons", ""],
    ["Primary Mathematics Book 2 (2nd Edition) SNC", "Mathematics", "Oxford", "9780190709662"],
    ["Primary Mathematics Book 2A (2nd Edition)", "Mathematics", "Oxford", "9780190701529"],
    ["Primary Mathematics Book 2B (2nd Edition)", "Mathematics", "Oxford", "9780190701536"],
    ["Karwan-e-Urdu Book - 2", "Urdu", "Paramount", "9789696370581"],
    ["Keyboard Book 2 (4th Edition)", "Computing", "Oxford", "9789697346226"],
    ["Islamiat Juzz Doem", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["My Creative Club Book - 2", "Art", "Paramount", ""]
  ],
  3: [
    ["Oxford Discover Student Book 3 (2nd Edition)", "English", "Oxford", "9780194053938"],
    ["Oxford Discover Workbook 3 (2nd Edition)", "English", "Oxford", "9780194053952"],
    ["Join Handwriting Series 3", "English", "Sheikh Shoukat Ali & Sons", ""],
    ["Primary Mathematics Book 3 (2nd Edition) SNC", "Mathematics", "Oxford", "9780190709679"],
    ["Primary Mathematics Book 3A (2nd Edition)", "Mathematics", "Oxford", "9780190701543"],
    ["Primary Mathematics Book 3B (2nd Edition)", "Mathematics", "Oxford", "9780190701550"],
    ["Karwan-e-Urdu Book - 3", "Urdu", "Paramount", "9789696370598"],
    ["New Oxford Primary Science Book 3 (3rd Edition)", "Science", "Oxford", "9780190700072"],
    ["Keyboard Book 3 (4th Edition)", "Computing", "Oxford", "9789697346233"],
    ["New Oxford Social Studies for Pakistan Book 3 (4th Edition)", "Social Studies", "Oxford", "9780190700621"],
    ["Islamiat Juzz Salis (Revised Edition)", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["My Creative Club Book - 3", "Art", "Paramount", ""],
    ["Asaan Tajweed", "Qur'an", "Maktaba Barkat-ul-Madina", ""]
  ],
  4: [
    ["Oxford Discover Student Book 4 (2nd Edition)", "English", "Oxford", "9780194053969"],
    ["Oxford Discover Workbook 4 (2nd Edition)", "English", "Oxford", "9780194053983"],
    ["Join Handwriting Series 4", "English", "Sheikh Shoukat Ali & Sons", ""],
    ["Primary Mathematics Book 4 (2nd Edition) SNC", "Mathematics", "Oxford", "9780190709686"],
    ["Primary Mathematics Book 4A (2nd Edition)", "Mathematics", "Oxford", "9780190701567"],
    ["Primary Mathematics Book 4B (2nd Edition)", "Mathematics", "Oxford", "9780190701574"],
    ["Karwan-e-Urdu Book - 4", "Urdu", "Paramount", "9789696370536"],
    ["New Oxford Primary Science Book 4 (3rd Edition) SNC", "Science", "Oxford", "9780190706937"],
    ["Keyboard Book 4 (4th Edition)", "Computing", "Oxford", "9789697346240"],
    ["New Oxford Social Studies for Pakistan Book 4 (4th Edition) SNC", "Social Studies", "Oxford", "9780190706982"],
    ["Islamiat Juzz Chaharum", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["My Creative Club Book - 4", "Art", "Paramount", ""],
    ["Asaan Tajweed", "Qur'an", "Maktaba Barkat-ul-Madina", ""]
  ],
  5: [
    ["Oxford Discover Student Book 5 (2nd Edition)", "English", "Oxford", "9780194053990"],
    ["Oxford Discover Workbook 5 (2nd Edition)", "English", "Oxford", "9780194054010"],
    ["Primary Mathematics Book 5 (2nd Edition) SNC", "Mathematics", "Oxford", "9780190709693"],
    ["Primary Mathematics Book 5A (2nd Edition)", "Mathematics", "Oxford", "9780190701581"],
    ["Primary Mathematics Book 5B (2nd Edition)", "Mathematics", "Oxford", "9780190701598"],
    ["Karwan-e-Urdu Book - 5", "Urdu", "Paramount", "9789696370543"],
    ["New Oxford Primary Science Book 5 (3rd Edition) SNC", "Science", "Oxford", "9780190706944"],
    ["Keyboard Book 5 (4th Edition)", "Computing", "Oxford", "9789697346257"],
    ["New Oxford Social Studies for Pakistan Book 5 (4th Edition) SNC", "Social Studies", "Oxford", "9780190706999"],
    ["Islamiat Juzz Punjum", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["My Creative Club Book - 5", "Art", "Paramount", ""],
    ["Asaan Tajweed", "Qur'an", "Maktaba Barkat-ul-Madina", ""]
  ],
  6: [
    ["Oxford Discover Student Book 6 (2nd Edition)", "English", "Oxford", "9780194054027"],
    ["Oxford Discover Workbook 6 (2nd Edition)", "English", "Oxford", "9780194054041"],
    ["Primary Mathematics Book 6 (2nd Edition)", "Mathematics", "Oxford", "9780190701499"],
    ["Primary Mathematics Book 6A (2nd Edition)", "Mathematics", "Oxford", "9780190701604"],
    ["Primary Mathematics Book 6B (2nd Edition)", "Mathematics", "Oxford", "9780190701611"],
    ["Karwan-e-Urdu Book - 6", "Urdu", "Paramount", "9789696370550"],
    ["New Oxford Secondary Science Book 6 (1st Edition)", "Science", "Oxford", "9789697340033"],
    ["New Oxford Secondary Science Workbook 6 (1st Edition)", "Science", "Oxford", "9789697344307"],
    ["Keyboard Book 6 (4th Edition)", "Computing", "Oxford", "9789697341870"],
    ["Secondary Social Studies for Pakistan Book - 1 (Revised Edition)", "Social Studies", "Oxford", "9780195478952"],
    ["Bahar-e-Shariat Juzz Shashum", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["Asaan Tajweed", "Qur'an", "Maktaba Barkat-ul-Madina", ""]
  ],
  7: [
    ["Oxford Progressive English 7 (2nd Edition) SNC", "English", "Oxford", "9780190701871"],
    ["Countdown Book 7 (3rd Edition) SNC", "Mathematics", "Oxford", "9789697342662"],
    ["Karwan-e-Urdu Book - 7", "Urdu", "Paramount", "9789696370567"],
    ["New Oxford Secondary Science Book 7 (1st Edition)", "Science", "Oxford", "9789697340040"],
    ["New Oxford Secondary Science Workbook 7 (1st Edition)", "Science", "Oxford", "9789697344314"],
    ["Secondary Social Studies for Pakistan Book - 2 (Revised Edition)", "Social Studies", "Oxford", "9780195478969"],
    ["Keyboard Book - 7 (4th Edition)", "Computing", "Oxford", "9789697341887"],
    ["Bahar-e-Shariat Juzz Haftum", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["Asan Sindhi Book for Grade 7", "Sindhi", "Sindh Textbook Board, Jamshoro", ""],
    ["Asaan Tajweed", "Qur'an", "Maktaba Barkat-ul-Madina", ""]
  ],
  8: [
    ["Oxford Progressive English 8 (2nd Edition) SNC", "English", "Oxford", "9780190701888"],
    ["Count Down Book 8 (3rd Edition) SNC", "Mathematics", "Oxford", "9789697342679"],
    ["Karwan-e-Urdu Book - 8", "Urdu", "Paramount", "9789696370574"],
    ["New Oxford Secondary Science Book 8 (1st Edition)", "Science", "Oxford", "9789697340057"],
    ["New Oxford Secondary Science Workbook 8 (1st Edition)", "Science", "Oxford", "9789697344321"],
    ["Secondary Social Studies for Pakistan Book - 3 (Revised Edition)", "Social Studies", "Oxford", "9780195478976"],
    ["Keyboard Book - 8 (4th Edition)", "Computing", "Oxford", "9789697341894"],
    ["Bahar-e-Shariat Juzz Hashtum", "Islamiyat", "Maktaba Barkat-ul-Madina", ""],
    ["Asan Sindhi Book for Grade 8", "Sindhi", "Sindh Textbook Board, Jamshoro", ""],
    ["Asaan Tajweed", "Qur'an", "Maktaba Barkat-ul-Madina", ""]
  ]
} };

/* Chapter lists copied from Oxford Pakistan's free Teaching Guides on oup.com.pk, keyed by the ISBN of the pupil's book (11 October 2026).
   ch: [label, title, page in the pupil's book (when checked against a printed copy), group heading (optional)]. u: the Teaching Guide, or "" when taken from the printed book. check: the guide is an older printing than the school's edition, so parents are asked to compare it with their book. */
const BOOK_CHAPTERS = {
  "9789696370543": { src: "Contents (فہرست) of the printed Karwan-e-Urdu Book 5, Paramount Books (first published 2015, ninth printing 2026), photographed by the owner on 11 October 2026", u: "",
    ch: [["Lesson 1", "حمد باری تعالیٰ", 1], ["Lesson 2", "محبت و شفقت کے پیکر حضرت محمد رسول اللہ خاتم النبیین ﷺ (سیرت)", 5], ["Lesson 3", "ایمان دار چرواہا (سچی کہانی)", 10], ["Lesson 4", "تفہیم (تحریری)", 16], ["Lesson 5", "غصّہ (نظم)", 20], ["Lesson 6", "نوجوان سپہ سالار (تاریخی مضمون)", 26], ["Lesson 7", "خاموش محسن (کہانی)", 32], ["Lesson 8", "نمک کا شہر (مضمون)", 37], ["Lesson 9", "سونا اور ہمدردی (نظم)", 42], ["Lesson 10", "عاجزی (تاریخی کہانی)", 48], ["Lesson 11", "کہانی نویسی (نثر نگاری)", 53], ["Lesson 12", "ایک صبح (تخیّل)", 55], ["Lesson 13", "تصویری تفہیم (تفہیم)", 64], ["Lesson 14", "کر بھلا، ہو بھلا (کہانی)", 66], ["Lesson 15", "بچو! ایک پہیلی بوجھو (نظم)", 71], ["Lesson 16", "پھیکی کھچڑی (کہانی)", 74], ["Lesson 17", "حکایاتِ سعدیؒ (حکایات)", 82], ["Lesson 18", "اپنا شاعر ہے اقبالؒ (نظم)", 88], ["Lesson 19", "چھلاوا (واقعہ)", 92], ["Lesson 20", "علم کی شمع (سچّی کہانی)", 101], ["Lesson 21", "پرندے کی فریاد (نظم)", 109], ["Lesson 22", "اُردو گنتی", 115], ["Lesson 23", "خطوط نویسی", 120], ["Lesson 24", "خیالی پلاؤ (ڈراما)", 122], ["Lesson 25", "پیار کے نام (نظم)", 130], ["Lesson 26", "کراچی کی کہانی، کراچی کی زُبانی (آپ بیتی)", 136], ["Lesson 27", "چھپّر پھاڑ (نظم)", 148], ["Lesson 28", "کتاب بہتر یا کمپیوٹر (مُکالمہ)", 152], ["Lesson 29", "مضمون نویسی (نثر نگاری)", 157]] },
  "9780194054010": { src: "Contents of the printed Oxford Discover 5 Workbook, 2nd edition, photographed by the owner on 11 October 2026 (it lists unit numbers and pages; unit titles are those of the matching Student Book units)", u: "",
    ch: [["Unit 1", "Dreaming of Dodos", 2, "Big Question 1 · Why do we protect animals?"], ["Unit 2", "Save Our Tigers!", 10, "Big Question 1 · Why do we protect animals?"], ["Unit 3", "“The Cavity” and “Have You Any Idea?”", 22, "Big Question 2 · What are teeth for?"], ["Unit 4", "Teeth: Not Just for Eating", 30, "Big Question 2 · What are teeth for?"], ["Unit 5", "A Revolution in History", 42, "Big Question 3 · Why are wheels important?"], ["Unit 6", "Planet SinRota", 50, "Big Question 3 · Why are wheels important?"], ["Unit 7", "Magdi and the Dolphin", 62, "Big Question 4 · How do animals communicate?"], ["Unit 8", "Chatterboxes", 70, "Big Question 4 · How do animals communicate?"], ["Unit 9", "Journey Back in Time", 82, "Big Question 5 · What do different cultures give to the world?"], ["Unit 10", "Choco Choco Boom Boom!", 90, "Big Question 5 · What do different cultures give to the world?"], ["Unit 11", "What’s So Good About Mountains?", 102, "Big Question 6 · Why are mountains important?"], ["Unit 12", "The Lost Explorer", 110, "Big Question 6 · Why are mountains important?"], ["Unit 13", "The Sound of Money and the Smell of Soup", 122, "Big Question 7 · Why do we use money?"], ["Unit 14", "The History of Money", 130, "Big Question 7 · Why do we use money?"], ["Unit 15", "One Man’s Self-Expression", 142, "Big Question 8 · How do we express ourselves?"], ["Unit 16", "The Tempest", 150, "Big Question 8 · How do we express ourselves?"], ["Unit 17", "The World’s Most Extraordinary Buildings", 162, "Big Question 9 · Why do we make buildings?"], ["Unit 18", "The Mystery of Peril Castle", 170, "Big Question 9 · Why do we make buildings?"]] },
  "9789697346257": { src: "Contents of the printed Keyboard Computer Science with Application Software Book 5, Fourth Edition (2025, Third Impression 2026), photographed by the owner on 11 October 2026", u: "",
    ch: [["Ch. 1", "Introduction to AI and its Applications", 2, "Unit 1 · ICT"], ["Ch. 2", "Creating Media", 17, "Unit 2 · Digital Skills"], ["Ch. 3", "Fundamentals of Digital Marketing", 26, "Unit 2 · Digital Skills"], ["Ch. 4", "Building a Website", 38, "Unit 3 · Data Handling"], ["Ch. 5", "Data Handling with Google Sheets", 57, "Unit 3 · Data Handling"], ["Ch. 6", "Coding Animal Adaptations", 70, "Unit 4 · Computational Thinking"]] },
  "9780194053990": { src: "Contents (scope and sequence) of the printed Oxford Discover 5 Student Book, 2nd edition, photographed by the owner on 11 October 2026", u: "",
    ch: [["Unit 1", "Dreaming of Dodos", 6, "Big Question 1 · Why do we protect animals?"], ["Unit 2", "Save Our Tigers!", 16, "Big Question 1 · Why do we protect animals?"], ["Unit 3", "“The Cavity” and “Have You Any Idea?”", 26, "Big Question 2 · What are teeth for?"], ["Unit 4", "Teeth: Not Just for Eating", 36, "Big Question 2 · What are teeth for?"], ["Unit 5", "A Revolution in History", 46, "Big Question 3 · Why are wheels important?"], ["Unit 6", "Planet SinRota", 56, "Big Question 3 · Why are wheels important?"], ["Unit 7", "Magdi and the Dolphin", 68, "Big Question 4 · How do animals communicate?"], ["Unit 8", "Chatterboxes", 78, "Big Question 4 · How do animals communicate?"], ["Unit 9", "Journey Back in Time", 88, "Big Question 5 · What do different cultures give to the world?"], ["Unit 10", "Choco Choco Boom Boom!", 98, "Big Question 5 · What do different cultures give to the world?"], ["Unit 11", "What’s So Good About Mountains?", 108, "Big Question 6 · Why are mountains important?"], ["Unit 12", "The Lost Explorer", 118, "Big Question 6 · Why are mountains important?"], ["Unit 13", "The Sound of Money and the Smell of Soup", 130, "Big Question 7 · Why do we use money?"], ["Unit 14", "The History of Money", 140, "Big Question 7 · Why do we use money?"], ["Unit 15", "One Man’s Self-Expression", 150, "Big Question 8 · How do we express ourselves?"], ["Unit 16", "The Tempest", 160, "Big Question 8 · How do we express ourselves?"], ["Unit 17", "The World’s Most Extraordinary Buildings", 170, "Big Question 9 · Why do we make buildings?"], ["Unit 18", "The Mystery of Peril Castle", 180, "Big Question 9 · Why do we make buildings?"]] },
  "9780190706999": { src: "Oxford Pakistan, New Oxford Social Studies for Pakistan Teaching Guide 5 SNC; checked against the printed book (Eighth Impression 2026), with its page numbers", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Social%20Studies%20for%20Pakistan%204th%20Edition/05-New%20Oxford%20Social%20Studies%20for%20Pakistan%20TG%205%20SNC.pdf",
    ch: [["Ch. 1", "Maps", 2], ["Ch. 2", "World climate", 7], ["Ch. 3", "Life in desert and forest regions", 16], ["Ch. 4", "The polar regions and exploration", 26], ["Ch. 5", "Our country", 36], ["Ch. 6", "Minerals, power resources, and industries", 50], ["Ch. 7", "Agriculture and irrigation in Pakistan", 62], ["Ch. 8", "Pakistan and her neighbours", 72], ["Ch. 9", "Economics", 80], ["Ch. 9a", "Entrepreneurship", 90], ["Ch. 10", "Information communication", 92], ["Ch. 11", "The government and the law", 98], ["Ch. 12", "Our culture", 106], ["Ch. 13", "Ancient civilisations of the world", 114], ["Ch. 14", "The struggle for independence", 118], ["Ch. 15", "Human rights", 127]] },
  "9780190706944": { src: "Oxford Pakistan, New Oxford Primary Science Teaching Guide 5 SNC; checked against the printed book's Contents, with its page numbers and Parts", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Primary%20Science%203rd%20Edition/NOPS%20TG%205%20SNC.pdf",
    ch: [["Unit 1", "Classification of Living Things", 2, "Part 1 · Living Things"], ["Unit 2", "Microorganisms", 18, "Part 1 · Living Things"], ["Unit 3", "Flowers and Seeds", 28, "Part 1 · Living Things"], ["Unit 4", "Environmental Pollution", 40, "Part 2 · Materials and Matter"], ["Unit 5", "Physical and Chemical Changes of Matter", 49, "Part 2 · Materials and Matter"], ["Unit 6a", "Light", 59, "Part 3 · Forces, Energy, and Machines"], ["Unit 6b", "Sound", 67, "Part 3 · Forces, Energy, and Machines"], ["Unit 7", "Electricity and Magnetism", 75, "Part 3 · Forces, Energy, and Machines"], ["Unit 8", "The Structure of The Earth", 92, "Part 4 · The Earth and Space"], ["Unit 9", "Space and Satellites", 99, "Part 4 · The Earth and Space"], ["Unit 10", "Technology in Everyday Life", 108, "Technology in Everyday Life · STEM activities"]] },
  "9780190709693": { src: "Oxford Pakistan, New Syllabus Primary Mathematics Teacher's Resource Book 5 (2nd Edition, 2020)", u: "https://oup.com.pk/media/teaching-guides/New%20Syllabus%20Primary%20Mathematics%202nd%20Edition/NSPM-Teacher's-Resource-Book-5.pdf", check: true,
    ch: [["Ch. 1", "Numbers up to 10 Million"], ["Ch. 2", "Four Operations"], ["Ch. 3", "Introduction to Algebra"], ["Ch. 4", "Fractions"], ["Ch. 5", "Ratio"], ["Ch. 6", "Area of Triangles"], ["Ch. 7", "Volume"], ["Ch. 8", "Decimals"], ["Ch. 9", "Percentage"], ["Ch. 10", "Average"], ["Ch. 11", "Rate"], ["Ch. 12", "Angles"], ["Ch. 13", "Properties of Triangles"], ["Ch. 14", "Properties of Four-sided Figures"], ["Ch. 15", "Probability"]] }
};

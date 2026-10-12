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
  "9780190709655": { src: "Oxford Pakistan, New Syllabus Primary Mathematics Teacher's Resource Book 1 (2nd Edition)", u: "https://oup.com.pk/media/teaching-guides/New%20Syllabus%20Primary%20Mathematics%202nd%20Edition/NSPM-Teacher%27s-Resource-Book-1.pdf", check: true,
    ch: [["Ch. 1", "Numbers to 10"], ["Ch. 2", "Number Bonds"], ["Ch. 3", "Addition Within 10"], ["Ch. 4", "Subtraction Within 10"], ["Ch. 5", "Positions"], ["Ch. 6", "Numbers to 20"], ["Ch. 7", "Addition and Subtraction Within 20"], ["Ch. 8", "Shapes and Patterns"], ["Ch. 9", "Length"], ["Ch. 10", "Numbers to 40"], ["Ch. 11", "Addition and Subtraction Within 40"], ["Ch. 12", "More Word Problems"], ["Ch. 13", "Multiplication"], ["Ch. 14", "Division"], ["Ch. 15", "Numbers to 100"], ["Ch. 16", "Addition and Subtraction Within 100"], ["Ch. 17", "Halves and Quarters"], ["Ch. 18", "Time"], ["Ch. 19", "Money"], ["Ch. 20", "Volume"], ["Ch. 21", "Picture Graphs"], ["Ch. 22", "Clockwise and Anticlockwise Movement"]] },
  "9780190709662": { src: "Oxford Pakistan, New Syllabus Primary Mathematics Teacher's Resource Book 2 (2nd Edition)", u: "https://oup.com.pk/media/teaching-guides/New%20Syllabus%20Primary%20Mathematics%202nd%20Edition/NSPM-Teacher%27s-Resource-Book-2.pdf", check: true,
    ch: [["Ch. 1", "Numbers to 1000"], ["Ch. 2", "Addition and Subtraction Within 1000"], ["Ch. 3", "Multiplication Tables of 2, 5 and 10"], ["Ch. 4", "Dividing by 2, 5 and 10"], ["Ch. 5", "Multiplication Tables of 3 and 4"], ["Ch. 6", "Dividing by 3 and 4"], ["Ch. 7", "Length"], ["Ch. 8", "Mass"], ["Ch. 9", "More Word Problems"], ["Ch. 10", "Dollars, Cents and Rupees"], ["Ch. 11", "Two-Dimensional Shapes"], ["Ch. 12", "Three-Dimensional Shapes"], ["Ch. 13", "Fractions"], ["Ch. 14", "Time"], ["Ch. 15", "Volume"], ["Ch. 16", "Picture Graphs and Tally Charts"], ["Ch. 17", "Rotation"]] },
  "9780190709679": { src: "Oxford Pakistan, New Syllabus Primary Mathematics Teacher's Resource Book 3 (2nd Edition)", u: "https://oup.com.pk/media/teaching-guides/New%20Syllabus%20Primary%20Mathematics%202nd%20Edition/NSPM-Teacher%27s-Resource-Book-3.pdf", check: true,
    ch: [["Ch. 1", "Numbers to 10 000"], ["Ch. 2", "Addition and Subtraction Within 10 000"], ["Ch. 3", "Multiplication and Division"], ["Ch. 4", "Length"], ["Ch. 5", "Mass"], ["Ch. 6", "Volume"], ["Ch. 7", "Dollars, Cents and Rupees"], ["Ch. 8", "Bar Graphs"], ["Ch. 9", "Fractions"], ["Ch. 10", "Time"], ["Ch. 11", "Angles"], ["Ch. 12", "Perpendicular and Parallel Lines"], ["Ch. 13", "Area and Perimeter"]] },
  "9780190709686": { src: "Oxford Pakistan, New Syllabus Primary Mathematics Teacher's Resource Book 4 (2nd Edition)", u: "https://oup.com.pk/media/teaching-guides/New%20Syllabus%20Primary%20Mathematics%202nd%20Edition/NSPM-Teacher%27s-Resource-Book-4.pdf", check: true,
    ch: [["Ch. 1", "Numbers to 100 000"], ["Ch. 2", "Multiplication and Division"], ["Ch. 3", "Fractions"], ["Ch. 4", "Symmetry"], ["Ch. 5", "Angles"], ["Ch. 6", "Translation and Tessellations"], ["Ch. 7", "Squares and Rectangles"], ["Ch. 8", "Decimals (I)"], ["Ch. 9", "Decimals (II)"], ["Ch. 10", "Area and Perimeter"], ["Ch. 11", "Tables and Line Graphs"], ["Ch. 12", "Time"]] },
  "9780190701499": { src: "Oxford Pakistan, New Syllabus Primary Mathematics Teacher's Resource Book 6 (2nd Edition)", u: "https://oup.com.pk/media/teaching-guides/New%20Syllabus%20Primary%20Mathematics%202nd%20Edition/NSPM-Teacher%27s-Resource-Book-6.pdf",
    ch: [["Ch. 1", "Algebra"], ["Ch. 2", "Angles in Geometric Figures"], ["Ch. 3", "Fractions"], ["Ch. 4", "Ratio"], ["Ch. 5", "Percentage"], ["Ch. 6", "Circles"], ["Ch. 7", "Speed"], ["Ch. 8", "Volume of Cubes and Cuboids"], ["Ch. 9", "Pie Charts"], ["Ch. 10", "Solid Figures"]] },
  "9780190700072": { src: "Oxford Pakistan, New Oxford Primary Science Teaching Guide 3 (contents page)", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Primary%20Science%203rd%20Edition/NOPS%20TG%203.pdf",
    ch: [["Unit 1", "The Human Body", 0, "Part 1 · Ourselves"], ["Unit 2", "Health and Safety", 0, "Part 1 · Ourselves"], ["Unit 3", "Living on Earth", 0, "Part 2 · Living Things"], ["Unit 4", "The Life Cycles of Animals", 0, "Part 2 · Living Things"], ["Unit 5", "The Life Cycle of Plants", 0, "Part 2 · Living Things"], ["Unit 6", "Materials", 0, "Part 3 · Materials and Matter"], ["Unit 7", "Force", 0, "Part 4 · Forces, Energy, and Machines"], ["Unit 8", "Electricity", 0, "Part 4 · Forces, Energy, and Machines"], ["Unit 9", "Simple Machines", 0, "Part 4 · Forces, Energy, and Machines"], ["Unit 10", "Sound and Light", 0, "Part 4 · Forces, Energy, and Machines"], ["Unit 11", "The Earth", 0, "Part 5 · The Earth and the Atmosphere"], ["Unit 12", "The Solar System", 0, "Part 6 · The Sky and Space"]] },
  "9780190706937": { src: "Oxford Pakistan, New Oxford Primary Science Teaching Guide 4 SNC (contents and lesson pages; the guide also calls Unit 5 'Forms of Energy and Energy Transfer')", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Primary%20Science%203rd%20Edition/NOPS%20TG%204%20SNC.pdf", check: true,
    ch: [["Unit 1", "Characteristics and Life Processes of Organisms"], ["Unit 2", "Ecosystem"], ["Unit 3", "Human Health"], ["Unit 4", "Matter and its Characteristics"], ["Unit 5", "Forces, Energy and Machines"], ["Unit 6", "Forces and Motion"], ["Unit 7", "Earth and its Resources"], ["Unit 8", "Earth’s Weather and Climate"], ["Unit 9", "Earth in the Solar System"], ["Unit 10", "Technology in Everyday Life"]] },
  "9780190700621": { src: "Oxford Pakistan, New Oxford Social Studies for Pakistan Teaching Guide 3 (contents page)", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Social%20Studies%20for%20Pakistan%204th%20Edition/03-New%20Oxford%20Social%20Studies%20for%20Paksitan%20TG%203.pdf",
    ch: [["Ch. 1", "The Earth in space", 0, "Unit 1 · Geography"], ["Ch. 2", "Maps", 0, "Unit 1 · Geography"], ["Ch. 3", "Climate", 0, "Unit 1 · Geography"], ["Ch. 4", "Our country", 0, "Unit 1 · Geography"], ["Ch. 5", "For all to use", 0, "Unit 2 · Citizenship"], ["Ch. 6", "Services", 0, "Unit 2 · Citizenship"], ["Ch. 7", "Transport", 0, "Unit 2 · Citizenship"], ["Ch. 8", "Work", 0, "Unit 3 · Work and Money"], ["Ch. 9", "Money and banks", 0, "Unit 3 · Work and Money"], ["Ch. 10", "Calendars", 0, "Unit 4 · Culture"], ["Ch. 11", "Festivals", 0, "Unit 4 · Culture"], ["Ch. 12", "Cities and villages", 0, "Unit 5 · Where We Live"], ["Ch. 13", "Early people", 0, "Unit 6 · History and Rights"], ["Ch. 14", "Religion", 0, "Unit 6 · History and Rights"], ["Ch. 15", "Human rights", 0, "Unit 6 · History and Rights"]] },
  "9780190706982": { src: "Oxford Pakistan, New Oxford Social Studies for Pakistan Teaching Guide 4 SNC (contents page)", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Social%20Studies%20for%20Pakistan%204th%20Edition/04-New%20Oxford%20Social%20Studies%20for%20Pakistan%20TG%204%20SNC.pdf",
    ch: [["Ch. 1", "The Earth in space", 0, "Unit 1 · Geography"], ["Ch. 2", "Our country", 0, "Unit 1 · Geography"], ["Ch. 3", "Climate", 0, "Unit 1 · Geography"], ["Ch. 4", "Landforms", 0, "Unit 1 · Geography"], ["Ch. 5", "Land use: farming and forests", 0, "Unit 1 · Geography"], ["Ch. 6", "Water and power", 0, "Unit 1 · Geography"], ["Ch. 6a", "State and government", 0, "Unit 2 · Citizenship"], ["Ch. 7", "Peace and conflict", 0, "Unit 2 · Citizenship"], ["Ch. 8", "People and work", 0, "Unit 2 · Citizenship"], ["Ch. 9", "Money", 0, "Unit 2 · Citizenship"], ["Ch. 10", "Our past", 0, "Unit 3 · Our History"], ["Ch. 10a", "Early history of Islam", 0, "Unit 3 · Our History"], ["Ch. 11", "A history of Pakistan", 0, "Unit 3 · Our History"], ["Ch. 12", "Communication and transport", 0, "Unit 4 · Culture and Society"], ["Ch. 13", "Religion and languages", 0, "Unit 4 · Culture and Society"], ["Ch. 14", "Culture", 0, "Unit 4 · Culture and Society"], ["Ch. 15", "Animal rights", 0, "Unit 4 · Culture and Society"]] },
  "9789697341870": { src: "Oxford Pakistan, Keyboard Fourth Edition Teaching Guide 6 (contents page)", u: "https://oup.com.pk/media/teaching-guides/Keyboard%20Fourth%20Edition/Keyboard-4E-TG-6.pdf",
    ch: [["Ch. 1", "The Computer System"], ["Ch. 2", "The Operating System"], ["Ch. 3", "Image Processing and Research Skills"], ["Ch. 4", "Algorithmic Thinking"], ["Ch. 5", "Scratch: An Introduction to Computer Programming"], ["Ch. 6", "Basic Programming Constructs with Scratch"], ["Ch. 7", "Digital Citizenship"], ["Ch. 8", "Digital Entrepreneurship"]] },
  "9789697341887": { src: "Oxford Pakistan, Keyboard Fourth Edition Teaching Guide 7 (contents page)", u: "https://oup.com.pk/media/teaching-guides/Keyboard%20Fourth%20Edition/Keyboard-4E-TG-7.pdf",
    ch: [["Ch. 1", "Introduction to Emerging Technologies"], ["Ch. 2", "MS Word"], ["Ch. 3", "MS PowerPoint"], ["Ch. 4", "The Internet as Post Office"], ["Ch. 5", "Algorithmic Thinking and Problem Solving"], ["Ch. 6", "Binary Computing"], ["Ch. 7", "Scratch Game Development"], ["Ch. 8", "C Programming"], ["Ch. 9", "Visual Basic"], ["Ch. 10", "Digital Citizenship"], ["Ch. 11", "Entrepreneurial Design Thinking"]] },
  "9789697341894": { src: "Oxford Pakistan, Keyboard Fourth Edition Teaching Guide 8 (contents page)", u: "https://oup.com.pk/media/teaching-guides/Keyboard%20Fourth%20Edition/Keyboard-4E-TG-8.pdf",
    ch: [["Ch. 1", "Emerging Technologies"], ["Ch. 2", "Computer Network"], ["Ch. 3", "Spreadsheet Software"], ["Ch. 4", "Algorithmic Thinking"], ["Ch. 5", "Advance Programming"], ["Ch. 6", "Advance C Language"], ["Ch. 7", "Advance Visual Basic"], ["Ch. 8", "Cyber Security"], ["Ch. 9", "Entrepreneurship in Digital Age"]] },
  "9789697340033": { src: "Oxford Pakistan, New Oxford Secondary Science Teaching Guide 6 (contents page)", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Secondary%20Science/New-Oxford-Secondary-Science-tg-6.pdf",
    ch: [["Unit 1", "Cellular Organization"], ["Unit 2", "Reproduction in Plants"], ["Unit 3", "Balanced Diet"], ["Unit 4", "Human Digestive System"], ["Unit 5", "Matters as Particles"], ["Unit 6", "Elements and Compounds"], ["Unit 7", "Mixtures"], ["Unit 8", "Energy"], ["Unit 9", "Electricity"], ["Unit 10", "Magnetism"], ["Unit 11", "Solar System"], ["Unit 12", "Technology in Everyday Life"]] },
  "9789697340040": { src: "Oxford Pakistan, New Oxford Secondary Science Teaching Guide 7 (contents page)", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Secondary%20Science/New-Oxford-Secondary-Science-tg-7.pdf",
    ch: [["Unit 1", "Plant System"], ["Unit 2", "Human Respiratory and Circulatory System"], ["Unit 3", "Immunity and Diseases"], ["Unit 4", "Structure of an Atom"], ["Unit 5", "Physical and Chemical Changes"], ["Unit 6", "Chemical Bonds"], ["Unit 7", "Solutions"], ["Unit 8", "Force and Motion"], ["Unit 9", "Waves and Energy"], ["Unit 10", "Heat and Temperature"], ["Unit 11", "Earth and Space"], ["Unit 12", "Technology in Everyday Life"]] },
  "9789697340057": { src: "Oxford Pakistan, New Oxford Secondary Science Teaching Guide 8 (contents page)", u: "https://oup.com.pk/media/teaching-guides/New%20Oxford%20Secondary%20Science/New-Oxford-Secondary-Science-tg-8.pdf",
    ch: [["Unit 1", "Ecology"], ["Unit 2", "The Nervous System"], ["Unit 3", "Variations, Heredity, and Cell Division"], ["Unit 4", "Biotechnology"], ["Unit 5", "Periodic Table"], ["Unit 6", "Chemical Reaction"], ["Unit 7", "Acids, Bases, and Salts"], ["Unit 8", "Forces and Pressure"], ["Unit 9", "Reflection and Refraction of light"], ["Unit 10", "Electricity and Magnetism"], ["Unit 11", "Our Universe"], ["Unit 12", "Technology in Everyday Life"]] },
  "9780195478952": { src: "Oxford Pakistan, Secondary Social Studies for Pakistan (Revised) Teaching Guide 1 (contents page)", u: "https://oup.com.pk/media/teaching-guides/Secondary%20Social%20Studies%20for%20Pakistan%20Revised/Teaching%20Guide%201.pdf",
    ch: [["Ch. 1", "Our country in the world", 0, "Section 1 · Geography"], ["Ch. 2", "Weather and climate", 0, "Section 1 · Geography"], ["Ch. 3", "Winds and cyclones", 0, "Section 1 · Geography"], ["Ch. 4", "Measuring the weather", 0, "Section 1 · Geography"], ["Ch. 5", "The land and agriculture in Pakistan and South Asia", 0, "Section 1 · Geography"], ["Ch. 6", "The climate of South Asia", 0, "Section 1 · Geography"], ["Ch. 7", "Main crops", 0, "Section 1 · Geography"], ["Ch. 8", "Farming problems in Pakistan", 0, "Section 1 · Geography"], ["Ch. 9", "Minerals and energy resources", 0, "Section 1 · Geography"], ["Ch. 10", "Power resources of Pakistan and South Asia", 0, "Section 1 · Geography"], ["Ch. 11", "Industry in Pakistan", 0, "Section 1 · Geography"], ["Ch. 12", "Industry in South Asia", 0, "Section 1 · Geography"], ["Ch. 13", "The environment of South Asia", 0, "Section 1 · Geography"], ["Ch. 14", "The people of Pakistan and South Asia", 0, "Section 1 · Geography"], ["Ch. 15", "Citizenship, rights, and values", 0, "Section 1 · Geography"], ["Ch. 16", "Early Pakistan", 0, "Section 2 · History"], ["Ch. 17", "The ancient invaders", 0, "Section 2 · History"], ["Ch. 18", "Buddhism and early kingdoms", 0, "Section 2 · History"], ["Ch. 19", "The Gandhara civilization", 0, "Section 2 · History"], ["Ch. 20", "The beginning and spread of Islam", 0, "Section 2 · History"], ["Ch. 21", "Islam first reaches the subcontinent", 0, "Section 2 · History"], ["Ch. 22", "The Mughals", 0, "Section 2 · History"], ["Ch. 23", "The coming of the Europeans", 0, "Section 2 · History"], ["Ch. 24", "The East India Company", 0, "Section 2 · History"], ["Ch. 25", "The struggle for freedom", 0, "Section 2 · History"], ["Ch. 26", "The British power (1858–1905)", 0, "Section 2 · History"], ["Ch. 27", "Sir Sayyid Ahmed Khan", 0, "Section 2 · History"]] },
  "9780195478969": { src: "Oxford Pakistan, Secondary Social Studies for Pakistan (Revised) Teaching Guide 2 (contents page)", u: "https://oup.com.pk/media/teaching-guides/Secondary%20Social%20Studies%20for%20Pakistan%20Revised/Teaching%20Guide%202.pdf",
    ch: [["Ch. 1", "Geography of the Muslim world", 0, "Section 1 · Geography"], ["Ch. 2", "Climatic regions of the Muslim world", 0, "Section 1 · Geography"], ["Ch. 3", "Main agricultural products of the Muslim world", 0, "Section 1 · Geography"], ["Ch. 4", "Minerals and natural resources of the Muslim world", 0, "Section 1 · Geography"], ["Ch. 5", "Industrialization in the Muslim world", 0, "Section 1 · Geography"], ["Ch. 6", "Trade and commerce", 0, "Section 1 · Geography"], ["Ch. 7", "Transport and communication", 0, "Section 1 · Geography"], ["Ch. 8", "Environment", 0, "Section 1 · Geography"], ["Ch. 9", "The population of the Muslim world", 0, "Section 1 · Geography"], ["Ch. 10", "The early Muslims", 0, "Section 2 · History"], ["Ch. 11", "Islam in South-east Asia", 0, "Section 2 · History"], ["Ch. 12", "Muslim scientists, philosophers, and travellers", 0, "Section 2 · History"], ["Ch. 13", "The decline and the reawakening of the Muslims", 0, "Section 2 · History"], ["Ch. 14", "National unity and freedom movements", 0, "Section 2 · History"], ["Ch. 15", "The struggle for freedom", 0, "Section 2 · History"], ["Ch. 16", "The road to independence", 0, "Section 2 · History"], ["Ch. 17", "Leading the freedom movement", 0, "Section 2 · History"], ["Ch. 18", "1937–46: The last steps to independence", 0, "Section 2 · History"], ["Ch. 19", "Pakistan—1947–71 and beyond", 0, "Section 2 · History"], ["Ch. 20", "Human rights", 0, "Section 2 · History"]] },
  "9780195478976": { src: "Oxford Pakistan, Secondary Social Studies for Pakistan (Revised) Teaching Guide 3 (contents page)", u: "https://oup.com.pk/media/teaching-guides/Secondary%20Social%20Studies%20for%20Pakistan%20Revised/Teaching%20Guide%203.pdf",
    ch: [["Ch. 1", "The Universe", 0, "Section 1 · Geography"], ["Ch. 2", "The Earth", 0, "Section 1 · Geography"], ["Ch. 3", "Major climatic regions of the world", 0, "Section 1 · Geography"], ["Ch. 4", "Agriculture and main crops", 0, "Section 1 · Geography"], ["Ch. 5", "Industry", 0, "Section 1 · Geography"], ["Ch. 6", "Trade and commerce", 0, "Section 1 · Geography"], ["Ch. 7", "Exports and imports of Pakistan", 0, "Section 1 · Geography"], ["Ch. 8", "World population", 0, "Section 1 · Geography"], ["Ch. 9", "Major occupations in the world", 0, "Section 1 · Geography"], ["Ch. 10", "World environment and its problems", 0, "Section 1 · Geography"], ["Ch. 11", "The concept of the two-nation state", 0, "Section 2 · History"], ["Ch. 12", "Pakistan’s chronology: 1970–2008", 0, "Section 2 · History"], ["Ch. 13", "The United Nations", 0, "Section 2 · History"], ["Ch. 14", "International problems", 0, "Section 2 · History"], ["Ch. 15", "Migration", 0, "Section 2 · History"], ["Ch. 16", "Democracy and human rights", 0, "Section 2 · History"], ["Ch. 17", "World travellers", 0, "Section 2 · History"], ["Ch. 18", "Explorers, scientists, and inventors", 0, "Section 2 · History"]] },
  "9780190701871": { src: "Oxford Pakistan, Oxford Progressive English Teaching Guide 7 SNC (contents page)", u: "https://oup.com.pk/media/teaching-guides/Oxford%20Progressive%20English%202nd%20Edition/Oxford%20Progressive%20English%20Teaching%20Guide%207%20SNC.pdf",
    ch: [["Unit 1", "Striving for peace"], ["Unit 2", "Elephants"], ["Unit 3", "London"], ["Unit 4", "Sugar and Spice"], ["Unit 5", "Danger!"], ["Unit 6", "Lessons"], ["Unit 7", "Water"], ["Unit 8", "Family Feelings"], ["Unit 9", "Other Worlds"], ["Unit 10", "Achievement"]] },
  "9780190701888": { src: "Oxford Pakistan, Oxford Progressive English Teaching Guide 8 SNC (contents page)", u: "https://oup.com.pk/media/teaching-guides/Oxford%20Progressive%20English%202nd%20Edition/Oxford%20Progressive%20English%20Teaching%20Guide%208%20SNC.pdf",
    ch: [["Unit 1", "Great Inventions?"], ["Unit 2", "Horses"], ["Unit 3", "Mysteries"], ["Unit 4", "Conflict"], ["Unit 5", "Railways"], ["Unit 6", "Food"], ["Unit 7", "Belonging"], ["Unit 8", "Money"], ["Unit 9", "The English Language"], ["Unit 10", "Per ardua ad astra"]] },
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

/* Pakistan's National Curriculum, by class: plain-language summaries of the official progression grids
   on ncc.gov.pk (National Curriculum Council). In force: National Curriculum of Pakistan 2020 for ECE to
   Class 5 and 2022-23 for Classes 6 to 8. Each point is [summary, codes or place in the grid].
   KG uses the 4 to 5 years column of the ECE grid. See notes/decisions.md. */
const NCF = "https://ncc.gov.pk/SiteImage/Misc/files/";
const NCP_SUBJ = {
  ece:  { n: "Early years", src: "1_%20NCP%20ECE%20PG.pdf", st: "Early Childhood Education progression grid, ages 4 to 5" },
  eng:  { n: "English", src: "(link)%20English%201-8%20-%20Suggested%20Guidelines.pdf", st: "English Classes 1 to 8, suggested guidelines" },
  urdu: { n: "Urdu", src: "(link)%20Urdu%201-8%20-%20Required%20Standards%20and%20SLOs.pdf", st: "Urdu Classes 1 to 8, required standards" },
  math: { n: "Mathematics", src: "(link)%20Mathematics%201-8%20%20-%20Required%20Standards%20and%20SLOs(1).pdf", st: "Mathematics Classes 1 to 8, required standards" },
  isl:  { n: "Islamiyat", src: "5_%20NCP%20Islamiyat%20PG%201-12.pdf", st: "Islamiyat progression grid, Classes 1 to 12" },
  gk:   { n: "General Knowledge", src: "6_%20NCP%20GK%20PG.pdf", st: "General Knowledge progression grid, Classes 1 to 3" },
  sci:  { n: "Science", src: "8_%20NCP%20Science%20PG%204-8.pdf", st: "Science progression grid, Classes 4 to 8" },
  sst:  { n: "Social Studies", src: "7_%20NCP%20SST%20PG.pdf", st: "Social Studies progression grid, Classes 4 and 5" },
  his:  { n: "History", src: "11_%20NCP%20History%20PG.pdf", st: "History progression grid, Classes 6 to 8" },
  geo:  { n: "Geography", src: "10_%20NCP%20Geography%20PG.pdf", st: "Geography progression grid, Classes 6 to 8" },
  cs:   { n: "Computer Science", src: "9_%20NCP%20Computer%20Science%20PG.pdf", st: "Computer Science progression grid, Classes 6 to 8" }
};
const NCP = {
  0: {
    ece: [
      ["Says their parents' and siblings' names and their address; names their feelings (happy, sad, scared, angry); keeps themselves clean.", "ECE-00-A1-01 to A1-05"],
      ["Takes turns, respects others' feelings and works with other children to sort out a problem.", "ECE-00-A2"],
      ["Knows about Pakistan's flag, national flower, food, dress and languages. Muslim children believe Allah is the only Creator and the Prophet Muhammad ﷺ is His last Messenger, recite the first Kalimah and small du'as, and know the pillars of Islam.", "ECE-00-A3-01 to A3-05"],
      ["Listens to stories and rhymes and retells them in order; uses at least 150 new words; follows instructions with two or more steps.", "ECE-00-B1, B2, B3a"],
      ["Knows the letters and their common sounds; reads simple three-letter words (like c-a-t); reads Urdu right to left and English left to right.", "ECE-00-B3a-06 to 07, B3b"],
      ["Holds a pencil properly; traces, copies and writes letters; writes their full name and simple three-letter words.", "ECE-00-B4"],
      ["Counts, reads and writes numbers to 50, counts back from 20, and adds and takes away with objects for totals under 10.", "ECE-00-C1, C2"],
      ["Compares tall, taller, tallest; knows day, night, today, yesterday, tomorrow and the days of the week; names 2-D and 3-D shapes and makes patterns.", "ECE-00-C3, C4"],
      ["Living and non-living things, plants, animals and their homes, weather and seasons, and simple ways to save water and keep places clean.", "ECE-00-D2 to D5"],
      ["Healthy food and daily hygiene; safety rules: strangers, roads, electricity, hot and sharp things, and that private parts of the body are private.", "ECE-00-E1, E2"],
      ["Draws, colours, cuts and pastes, models with clay, recites poems and national songs, and runs, jumps, hops and balances.", "ECE-00-F, G"]],
  },
  1: {
    eng: [
      ["Listens, takes part in small group talk, gives simple instructions and says how they feel.", "English Grade 1, Competency A"],
      ["Sorts words into groups, finds rhyming words, knows the days and months.", "Competency C"],
      ["Naming words, singular and plural, he/she/it/they, and question words (what, who, where, when, why).", "Competency C"],
      ["Writes capital and small letters correctly, left to right, with spaces between words.", "Competency D"]],
    urdu: [
      ["Know the Urdu alphabet in order, including the half (joining) shapes of letters, and write them.", "SLO U-01-C-02, U-01-D-01"],
      ["Use letter sounds and the short vowels zer, zabar and pesh to build and read one- and two-syllable words.", "SLO U-01-C-01, U-01-C-03, U-01-C-04"],
      ["Read a passage of at least 100 words correctly and answer questions on a picture or short text.", "SLO U-01-C-10, U-01-C-12"],
      ["Listen to a short story, poem or instruction, answer questions on it aloud, and talk about themselves and their family.", "SLO U-01-A-01, U-01-A-02, U-01-B-06"],
      ["Write the numbers 1 to 10 in Urdu figures and in words.", "SLO U-01-D-03"],
      ["Write 3 to 5 simple sentences on a topic and write a home or school address.", "SLO U-01-D-05, U-01-D-02"],
      ["Tell singular from plural and masculine from feminine, and recognise a noun (اسم) and a verb (فعل).", "SLO U-01-E-01, U-01-E-02, U-01-E-07"]],
    math: [
      ["Counts, reads and writes numbers to 99; tens and ones; compares numbers; first, second, third.", "M-01-A-01 to A-06"],
      ["Adds and subtracts small numbers and solves simple word problems; Pakistani coins and notes.", "M-01-A-08 to A-12"],
      ["Counts in 2s, 5s and 10s; first ideas of multiplication and sharing; halves and quarters.", "M-01-A-14 to A-21"],
      ["Compares length, mass and capacity; tells time to the hour; days of the week and months of the solar and Islamic year.", "M-01-C-01 to C-10"],
      ["Flat and solid shapes; position and direction; reading pictographs and tally charts.", "M-01-D-01 to E-02"]],
    isl: [
      ["Reads the Qaida with correct letter sounds, vowel marks and basic tajweed (qalqalah, ghunnah), and shows good manners while reciting.", "I-01-A-01 to A-06"],
      ["Has memorised Surah al-Fatihah and Surah al-Ikhlas with correct pronunciation, and knows the Kalimah Tayyibah with its meaning.", "I-01-A-07 to A-14"],
      ["Knows one short hadith and the dua for more knowledge, and the names of Allah ar-Rahman, ar-Rahim and al-Malik with meanings.", "I-01-A-15 to A-22"],
      ["Knows Allah is the one Creator and Owner of everything, thanks Him for His blessings, and believes the Prophet ﷺ is the last Prophet.", "I-01-B-01 to B-08"],
      ["Knows the names of the pillars of Islam, the five daily prayers, that the masjid is for prayer and the adhan is the call to prayer, and that prayer needs cleanliness.", "I-01-B-09 to B-20"],
      ["Knows basic facts of the Prophet's ﷺ birth and family (parents, grandfather, uncle, foster mother) and that he was truthful and trustworthy.", "I-01-C-01 to C-08"],
      ["Learns good manners and greets others with salam, and knows Prophets عليهم السلام were sent to guide people, from Sayyidunā Adam عليه السلام to the Prophet ﷺ.", "I-01-D-01 to D-06; I-01-E-01 to E-04"]],
    gk: [
      ["Talks about themselves, their family and the people at school, and respects family and friends.", "GK-01-A-01 to A-08"],
      ["Good manners: greeting with Assalamu alaikum, speaking politely, honesty, not wasting food, eating with clean hands.", "GK-01-B-01 to B-04"],
      ["Plays fairly in groups, follows the rules of a game, and knows exercise keeps everyone healthy.", "GK-01-C-01 to C-05"],
      ["Knows the full name of our country and when it was formed, and can draw the flag of Pakistan.", "GK-01-D-01 to D-03"],
      ["Names the parts of the body and the five senses; keeps clean and chooses healthy food.", "GK-01-F-01 to F-08"],
      ["Living and non-living things; common plants and animals, what they need, and how to care for them.", "GK-01-F-09 to F-19"],
      ["Pushes and pulls make things move; ways people travel, slow and fast.", "GK-01-E-01 to E-02, G-01 to G-04"],
      ["The Earth is land and water; the sun, moon and stars in the day and night sky.", "GK-01-H-01 to H-07"]],
  },
  2: {
    eng: [
      ["Takes turns, asks and answers questions, and speaks clearly to classmates and adults.", "English Grade 2, Competency A"],
      ["Plurals, pronouns, articles (a, an, the), describing words and action words.", "Competency C"],
      ["Builds simple sentences (He eats apples) and answers wh-questions.", "Competency C"],
      ["Plans before writing and writes short factual pieces with correct spelling.", "Competency D"]],
    urdu: [
      ["Retell a short story, poem or event in their own words and give a short talk of 5 to 6 sentences.", "SLO U-02-A-01, U-02-B-05"],
      ["Recognise how letters change shape when joined, and tell short vowels (زیر، زبر، پیش) from long ones (ا، و، ی، ے).", "SLO U-02-C-02, U-02-C-04"],
      ["Read a passage of at least 150 words, and read a story, dialogue or short play with understanding.", "SLO U-02-C-09, U-02-C-12"],
      ["Write the numbers 1 to 20 in figures and words, and the ordinal numbers 1st to 10th.", "SLO U-02-D-03, U-02-D-04"],
      ["Write at least 5 sentences about a picture or scene, and 5 to 7 simple sentences on a topic.", "SLO U-02-D-05, U-02-D-06"],
      ["Make positive, negative and question sentences, and change a simple sentence into past, present or future.", "SLO U-02-E-09, U-02-E-08"],
      ["Put words in alphabetical order and use the full stop, comma and question mark correctly.", "SLO U-02-E-10, U-02-E-05"]],
    math: [
      ["Numbers to 999, place value, rounding to tens, and Roman numbers to 12.", "M-02-A-01 to A-07"],
      ["Adding and subtracting with and without carrying; word problems with rupees.", "M-02-A-09 to A-13, A-29"],
      ["Tables of 2, 3, 4, 5 and 10; multiplying and dividing; simple fractions and tenths.", "M-02-A-15 to A-33"],
      ["Metres, kilograms and litres; temperature; time to five minutes; the solar and Islamic calendars.", "M-02-C-01 to C-16"],
      ["2-D and 3-D shapes, straight and curved lines, quarter turns; bar graphs and tally charts.", "M-02-D-01 to E-02"]],
    isl: [
      ["Reads Para 1 and Para 30 with tajweed and the stop signs, and has memorised Surah al-Falaq and Surah an-Nas to recite before sleeping.", "I-02-A-01 to A-09"],
      ["Knows ta'awwudh, tasbih and a short durood with meanings, uses Bismillah, Alhamdulillah, Yarhamukallah and JazakAllah, and says durood on hearing the Prophet's ﷺ name.", "I-02-A-10 to A-13"],
      ["Knows two short hadith, the dua for parents, and the names of Allah al-Quddus, as-Salam and al-Mu'min with meanings.", "I-02-A-14 to A-20"],
      ["Knows the articles of faith, the four great angels, the four revealed books and their Prophets, that the Quran is the last book, and the meaning of the Hereafter.", "I-02-B-01 to B-10"],
      ["Knows fasting is a pillar of Islam, about Ramadan, sehri and iftar, and when Eid al-Fitr and Eid al-Adha come.", "I-02-B-11 to B-18"],
      ["Knows the Prophet's ﷺ family and childhood, why we love and obey him, and his gentleness, mercy, promise-keeping and forgiveness.", "I-02-C-01 to C-08"],
      ["Follows manners of eating, drinking and speaking, respects parents, teachers and elders, is kind to animals, and knows the stories of Sayyidunā Adam and Sayyidunā Nuh عليهما السلام.", "I-02-D-01 to D-07; I-02-E-01 to E-04"]],
    gk: [
      ["Life in villages, towns, cities and kachi abadis; common jobs in Pakistan.", "GK-02-A-01 to A-04, E-01 to E-04"],
      ["Sharing, taking turns, fair and unfair behaviour, saying sorry and forgiving.", "GK-02-B-01 to B-10"],
      ["Traffic and road safety; what the government provides for people.", "GK-02-C-01 to C-03"],
      ["Pakistan has many religions; everyone may practise their religion freely, and all places of worship deserve respect.", "GK-02-C-04 to C-07"],
      ["The map of Pakistan, its provinces and areas, the capital, the flag and national symbols, and festivals.", "GK-02-D-01 to D-09"],
      ["Main crops and livestock of Pakistan, and how cotton becomes cloth.", "GK-02-E-05 to E-07"],
      ["Parts of a plant and what each does; animals, their young, and where they live.", "GK-02-F-01 to F-13"],
      ["Materials and their properties; sources of heat and light; push and pull as forces.", "GK-02-G-01 to G-12"],
      ["Natural resources and water: why they matter and how to save water.", "GK-02-H-01 to H-09"]],
  },
  3: {
    eng: [
      ["Follows longer talks, stories and broadcasts; gives instructions, directions and short presentations; joins role plays.", "English Grade 3, Competency A"],
      ["Reads stories, poems and information books aloud with fluency; sounds out new words by syllables.", "Competency B"],
      ["Spells common and irregular words; uses capital letters, full stops and question marks.", "Competency D"],
      ["Writes a simple paragraph and a step-by-step 'how to' paragraph with linking words.", "Competency D"]],
    urdu: [
      ["Give a reasoned opinion on what they hear and give a talk of 8 to 10 sentences.", "SLO U-03-A-02, U-03-B-04"],
      ["Read a passage of at least 200 words, answer questions on it and give it a title.", "SLO U-03-C-09, U-03-C-11"],
      ["Read poems and prose aloud with correct pronunciation, rhythm and flow, and draw conclusions from stories and poems.", "SLO U-03-C-13, U-03-C-12"],
      ["Write an essay of 8 to 10 sentences and a story of 8 to 10 sentences from pictures or an outline.", "SLO U-03-D-07, U-03-D-08"],
      ["Write a short informal letter and rewrite a poem in prose.", "SLO U-03-D-09, U-03-D-03"],
      ["Name common nouns, proper nouns and adjectives (اسم نکرہ، اسم معرفہ، اسم صفت) and pick out the verb and subject (فعل، فاعل).", "SLO U-03-E-08"],
      ["Find word meanings in a dictionary by alphabetical order, and use synonyms and opposites.", "SLO U-03-E-11, U-03-E-04, U-03-E-03"]],
    math: [
      ["Numbers to 9,999, place value, rounding, and Roman numbers to 20.", "M-03-A-01 to A-06"],
      ["Tables of 6, 7, 8 and 9; multiplying and dividing larger numbers; mixed word problems.", "M-03-A-07 to A-19"],
      ["Proper and improper fractions, equivalent fractions, adding fractions; tenths and hundredths.", "M-03-A-20 to A-26"],
      ["Kilometres to millimetres, kilograms and grams, litres; time with a.m. and p.m.; dates on the calendar; area and perimeter.", "M-03-C-01 to C-13"],
      ["Polygons, prisms and pyramids; lines, rays and the parts of a circle; turns and symmetry; Carroll diagrams.", "M-03-D-01 to E-02"]],
    isl: [
      ["Reads Paras 2 to 8 with tajweed, and has memorised Surah al-Kawthar, Surah an-Nasr and Surah al-Lahab.", "I-03-A-01 to A-08"],
      ["Knows Durood Ibrahimi, Thana and the meaning of Surah al-Fatihah, four short hadith, the duas before and after eating, and six names of Allah with meanings.", "I-03-A-09 to A-21"],
      ["Understands tawhid, Allah's attributes, prophethood and the finality of prophethood, and knows the Kalimah Shahadah with meaning.", "I-03-B-01 to B-15"],
      ["Knows the virtues and manners of the adhan and wudu, the times and rak'ahs of the five prayers, and the Qiblah (including the first Qiblah) and manners of the masjid.", "I-03-B-16 to B-28"],
      ["Learns tolerance and patience from the Seerah of the Prophet ﷺ, and values truthfulness and gentle speech, avoiding lies, backbiting and bad names.", "I-03-C-11 to C-13; I-03-D-01 to D-07"],
      ["Knows the rights of parents, teachers, siblings, relatives and neighbours, and learns from Sayyidunā Ibrahim, Ismail and Ishaq عليهم السلام and Sayyidunā Abu Bakr Siddiq رضي الله عنه.", "I-03-E-01 to E-04; I-03-F-01 to F-08"],
      ["Knows the importance of cleanliness from the Quran and Sunnah and practises it.", "I-03-G-01 to G-02"]],
    gk: [
      ["How life today differs from the past; staying safe at home, with strangers, and in natural disasters.", "GK-03-A-01 to A-05"],
      ["Why disagreements happen and how to settle them by talking.", "GK-03-B-01 to B-04"],
      ["Being part of a local community and a good citizen.", "GK-03-C-01 to C-04"],
      ["Quaid-e-Azam Muhammad Ali Jinnah, Mohtarma Fatima Jinnah and Allama Muhammad Iqbal: their lives and work for Pakistan.", "GK-03-D-01 to D-06"],
      ["Resources (natural, human and capital), goods and services, buyers and sellers, and scarcity.", "GK-03-E-01 to E-07"],
      ["Healthy living: balanced diet, hygiene, sleep, exercise, and vaccinations.", "GK-03-F-01 to F-04"],
      ["Habitats (polar, desert, forest, water) and the life cycles of plants and animals.", "GK-03-F-05 to F-12"],
      ["Energy and its sources; solids, liquids and gases; electricity safety and a simple circuit.", "GK-03-G-01 to G-10"],
      ["The solar system, day and night, directions; pollution and Pakistan's endangered animals (Indus dolphin, markhor).", "GK-03-H-01 to H-10"]],
  },
  4: {
    eng: [
      ["Listens to longer talks and broadcasts and picks out the main ideas.", "English Grade 4, Competency A"],
      ["Verb types and tenses (past, present, future); adverbs and adverb phrases.", "Competency C"],
      ["Sentence patterns (subject-verb-object) and the four kinds of sentences; homophones and confusing words (two/too).", "Competency C"],
      ["Reads a range of fiction and non-fiction and writes paragraphs on different topics.", "Competencies B and D"]],
    urdu: [
      ["Listen to a conversation or speech and tell correct Urdu from incorrect Urdu.", "SLO U-04-A-03"],
      ["Read a passage of at least 250 words and find its title, main parts and conclusion.", "SLO U-04-C-06, U-04-C-09"],
      ["Write the meaning of the verses of a poem.", "SLO U-04-D-03"],
      ["Write an informal letter with all its parts, plus a story and an essay of 10 to 12 sentences each.", "SLO U-04-D-09, U-04-D-08, U-04-D-07"],
      ["Write a dialogue, a first-person life story (آپ بیتی) and a diary entry.", "SLO U-04-D-10, U-04-D-11, U-04-D-12"],
      ["Identify the verb, subject and object (فعل، فاعل، مفعول) and use command and 'do not' verbs (فعل امر، فعل نہی).", "SLO U-04-E-09, U-04-E-12"],
      ["Use prefixes and suffixes correctly, and use quotation marks and brackets.", "SLO U-04-E-11, U-04-E-07"]],
    math: [
      ["Numbers to 99,999 and Roman numbers to 100; four operations with larger numbers and multi-step word problems.", "M-04-A-01 to A-14"],
      ["Divisibility rules, factors, multiples, prime and composite numbers.", "M-04-A-15 to A-18"],
      ["Fractions of all kinds; decimals to three places; order of operations; first look at percent.", "M-04-A-19 to A-37"],
      ["Converting units of length, mass, capacity and time; 12-hour and 24-hour clocks; perimeter and area.", "M-04-C-01 to C-13"],
      ["Parallel lines, the circle, measuring angles with a protractor, lines of symmetry; bar graphs.", "M-04-D-01 to E-01"]],
    isl: [
      ["Reads Paras 9 to 18 with tajweed, and has memorised Surah al-Ma'un and Surah al-Kafirun.", "I-04-A-01 to A-05"],
      ["Knows the meanings of the tasbihat of ruku, sujud and tashahhud, the meaning of Surah al-Kawthar, five hadith, and the duas for entering and leaving the toilet.", "I-04-A-06 to A-17"],
      ["Knows about belief in angels, the meaning and virtues of fasting, i'tikaf and Laylat al-Qadr, and the rights of Allah and the value of dua.", "I-04-B-01 to B-21"],
      ["Knows the hardships of early Makkah, the migration to Abyssinia and Sayyidunā Ja'far's رضي الله عنه speech to the Negus, the boycott in Shi'b Abi Talib, and the Year of Sorrow.", "I-04-C-08 to C-20"],
      ["Practises simplicity, manners of gatherings and punctuality.", "I-04-D-01 to D-14"],
      ["Learns to serve others and love the homeland as a responsible citizen of Pakistan.", "I-04-E-09 to E-18"],
      ["Knows the life of Sayyidunā Musa عليه السلام, Sayyidunā Umar Faruq and Sayyidunā Uthman Ghani رضي الله عنهما, and the importance of cleanliness and saving water.", "I-04-F-08 to F-19; I-04-G-01 to G-08"]],
    sci: [
      ["What living things need; flowering and non-flowering plants; parts of a plant and flower; how water moves in a plant; seeds and germination.", "SCI-04-A-01 to A-13"],
      ["Animals with and without backbones; the skeleton; the human digestive system, teeth and tooth care; the first aid box.", "SCI-04-A-14 to A-21"],
      ["Ecosystems and habitats, how plants and animals adapt, and how people change habitats.", "SCI-04-A-22 to A-27"],
      ["States of matter and how they change; properties of materials and metals.", "SCI-04-B-01 to B-05"],
      ["Light, sound, temperature and thermometers; simple electric circuits.", "SCI-04-B-07 to B-18"],
      ["Forces (friction, push and pull) and simple machines such as levers, pulleys and ramps.", "SCI-04-B-19 to B-28"],
      ["Land and water on Earth and the water cycle; the solar system, the Moon, day and night, and eclipses.", "SCI-04-C-01 to C-10"]],
    sst: [
      ["Citizens, global citizens and digital citizens; human rights; tolerance; settling conflicts by talking; good manners and civic sense.", "SS-04-A-01 to A-12"],
      ["Nation and nationalism; the cultures, languages, festivals and minorities of Pakistan.", "SS-04-B-01 to B-09"],
      ["State and government, the constitution, general elections and voting, and the qualities of a good leader.", "SS-04-C-01 to C-06"],
      ["What history is; ancient civilisations on a timeline; daily life in the Indus Valley Civilization.", "SS-04-D-01 to D-03"],
      ["Key events in the life of the Prophet ﷺ and the Khulafa-e-Rashideen رضي الله عنهم; Quaid-e-Azam, Allama Iqbal and Fatima Jinnah in the creation of Pakistan.", "SS-04-D-ADD, D-04"],
      ["Maps and globes, continents and oceans, directions, BOLTSS; landforms of Pakistan; weather and climate.", "SS-04-E-01 to E-09"],
      ["How people change the environment; water, sanitation and hygiene; population, census and growth.", "SS-04-E-10 to E-18"],
      ["Needs and choices, goods and services, producers and consumers, Pakistani entrepreneurs, money, saving and banks.", "SS-04-F-01 to F-11"]],
  },
  5: {
    eng: [
      ["Takes roles in group discussions, gives a five-minute talk, and argues a point politely.", "English Grade 5, Competency A"],
      ["Reads fiction and non-fiction with expression; works out new words from context; answers both direct and inference questions.", "Competency B"],
      ["Kinds of nouns (collective, abstract), relative pronouns, and making adjectives from other words (music → musical).", "Competency C"],
      ["Spelling rules (have/having, fry/fries); stories with a strong opening, clear sequence and one idea per paragraph.", "Competency D"]],
    urdu: [
      ["Read a passage of at least 300 words, take out its meaning and leave out unimportant detail.", "SLO U-05-C-05, U-05-C-08"],
      ["Read poems aloud with the right rise and fall of the voice, or in a sung style (ترنم).", "SLO U-05-C-10"],
      ["Write a formal letter and an application (درخواست).", "SLO U-05-D-09, U-05-D-13"],
      ["Write a story and an essay of 12 to 15 sentences each, and the gist of a poem's verses.", "SLO U-05-D-08, U-05-D-07, U-05-D-03"],
      ["Use idioms (محاورات) in their own sentences.", "SLO U-05-E-15"],
      ["Use joining words and the particles for condition, calling and surprise, and make sentences that show a wish or a doubt.", "SLO U-05-E-07, U-05-E-12"],
      ["Write numbers 1 to 100 in figures and words, and know noun types such as words for sounds and tools (اسم صوت، اسم آلہ).", "SLO U-05-D-04, U-05-E-09"]],
    math: [
      ["Numbers to 9,999,999; adding, subtracting, multiplying and dividing large numbers; multi-step word problems.", "M-05-A-01 to A-11"],
      ["Divisibility by 7 and 11, prime numbers, HCF and LCM.", "M-05-A-12 to A-15"],
      ["Fractions, decimals to three places and percentages, and converting between them; the unitary method; square and cube numbers.", "M-05-A-16 to A-34"],
      ["Converting units and time; area and perimeter of squares, rectangles and triangles.", "M-05-C-01 to C-10"],
      ["Quadrilaterals, nets of prisms and pyramids, angles on a line and at a point, triangles; bar and line graphs, pie charts, averages and chance.", "M-05-D-01 to E-04"]],
    isl: [
      ["Reads Paras 19 to 29 with tajweed, and has memorised Ayat al-Kursi, Surah al-Fil and Surah Quraysh.", "I-05-A-01 to A-09"],
      ["Knows Durood Ibrahimi, Dua-e-Qunut and chosen Quranic duas, nine names of Allah with meanings, selected hadith, and the duas for entering and leaving home.", "I-05-A-10 to A-21"],
      ["Understands belief in the Hereafter, the finality of prophethood and following the Sunnah of the Prophet ﷺ.", "I-05-B-01 to B-14"],
      ["Knows the rules of zakat (and how it differs from ushr and sadaqah), the virtues and rules of Jumu'ah, and the two Eids, fitrah and qurbani.", "I-05-B-15 to B-32"],
      ["Knows the Mi'raj, the pledges of Aqabah, the Hijrah to Madinah, the brotherhood of Madinah, Masjid an-Nabawi, the Charter of Madinah, and an introduction to the battles of Badr, Uhud and Khandaq.", "I-05-C-01 to C-32"],
      ["Practises tolerance, keeping promises and Islamic brotherhood, and avoids tale-bearing.", "Akhlaq & Adab, printed p. 85; I-05-E-01 to E-14"],
      ["Knows the life of Sayyidunā Isa عليه السلام and Sayyidunā Ali رضي الله عنه, the Sufis Shaykh Abdul Qadir Jilani, Ali bin Uthman Hujwiri and Maulana Rumi رحمهم الله, and road safety.", "I-05-F-01 to F-16; I-05-G-1 to G-4"]],
    sci: [
      ["Body systems: senses, breathing (respiratory system) and blood circulation; dressing a wound with a first aid box.", "SCI-05-A-01 to A-07"],
      ["Microorganisms (bacteria, viruses, fungi): diseases, how infections spread and how to prevent them, and useful microbes.", "SCI-05-A-08 to A-15"],
      ["Food chains and food webs; pollution of water, air and land; biodegradable materials.", "SCI-05-A-16 to A-23"],
      ["Physical and chemical changes in materials.", "SCI-05-B-04 to B-07"],
      ["Light sources, transparent and opaque objects; how sound travels and noise pollution.", "SCI-05-B-08 to B-15"],
      ["Electric current and circuit diagrams; magnets, poles and making a compass.", "SCI-05-B-16 to B-22"],
      ["Volcanoes, soil types and soil pollution; satellites, space exploration and space careers.", "SCI-05-C-02 to C-15"]],
    sst: [
      ["Equal rights for everyone whatever their religion or ethnicity; respecting other opinions; free speech used well.", "SS-05-A-01 to A-07"],
      ["Mass media and social media, and checking information before believing or sharing it.", "SS-05-A-08, A-09, A-ADD"],
      ["Inclusion, shared values among Pakistan's cultures, and interfaith harmony.", "SS-06-B-01 to B-05 (printed in the Grades 4-5 grid under Class 5)"],
      ["Why Pakistan has a federal government and a constitution; federal, provincial and local government; Legislature, Executive and Judiciary; democracy.", "SS-05-C-01 to C-05"],
      ["Ancient civilisations (Mesopotamia, Egypt, Indus, Gandhara); national heroes such as Sir Syed Ahmed Khan and Begum Ra'ana Liaquat Ali Khan; the role of their province and of minorities in creating Pakistan.", "SS-05-D-01 to D-05"],
      ["Kinds of maps, latitude and longitude, grid references and scale; the physical regions of Pakistan.", "SS-05-E-01 to E-06"],
      ["Climate and global warming; natural disasters and how to stay safe; food security.", "SS-05-E-07 to E-15"],
      ["Trade, imports and exports of Pakistan, entrepreneurship, inflation, the history of money, banks and the State Bank of Pakistan.", "SS-05-F-01 to F-15"]],
  },
  6: {
    eng: [
      ["Speaks to explain, describe, narrate and persuade; recites poems with expression; discusses in groups.", "English Grade 6, Competency A"],
      ["Skims for the main idea, predicts from titles and pictures, uses a dictionary and thesaurus.", "Competencies B and C"],
      ["Nouns with only a plural form, gender of nouns, parts of speech.", "Competency C"],
      ["Writes unified paragraphs with a topic sentence, and informative texts such as posters and book blurbs.", "Competency D"]],
    urdu: [
      ["Read a long passage and understand the idioms and proverbs in it.", "SLO U-06-C-01, U-06-C-02"],
      ["Explain the verses of a poem (تشریح) and write the summary or central idea of a poem or prose piece.", "SLO U-06-D-03, U-06-D-04"],
      ["Write an essay of at least 200 words, and a story and a dialogue of at least 175 words each.", "SLO U-06-D-05, U-06-D-06, U-06-D-08"],
      ["Write a report of an event (روداد) of at least 150 words, formal and informal letters, and applications.", "SLO U-06-D-10, U-06-D-07, U-06-D-09"],
      ["Recognise and use similes (تشبیہ), idioms and proverbs (محاورات، ضرب الامثال).", "SLO U-06-E-15, U-06-E-14"],
      ["Tell simple sentences from compound ones, and know the types of nouns and verbs.", "SLO U-06-E-12, U-06-E-08, U-06-E-09"],
      ["Use a dictionary and a thesaurus to choose words.", "SLO U-06-E-11"]],
    math: [
      ["Factors, multiples, HCF and LCM; integers (positive and negative numbers) and their operations.", "M-06-A-01 to A-10"],
      ["Percentages, ratio, rate and continued ratio; squares of numbers.", "M-06-A-11 to A-17"],
      ["Number patterns; algebra as letters standing for numbers; solving simple linear equations.", "M-06-B-01 to B-10"],
      ["Area of paths around rectangles; surface area and volume of cubes and cuboids.", "M-06-C-01 to C-04"],
      ["Reflection and rotational symmetry; parallel lines and angles; constructing angles with a compass; mean, median, mode and probability.", "M-06-D-01 to E-04"]],
    isl: [
      ["Understands the translation of Surah al-Fatihah, surahs on Prophets Adam, Nuh, Hud, Salih, Lut and Shu'ayb عليهم السلام, and Surah al-Fil to Surah an-Nas.", "I-06-A-01 to A-04"],
      ["Has memorised Surah az-Zalzalah, al-Adiyat, al-Qari'ah, at-Takathur, al-Asr and al-Humazah, plus Quranic duas such as Sayyidunā Adam's عليه السلام dua.", "I-06-A-05 to A-14"],
      ["Understands tawhid and how it differs from shirk, the meaning of worship from Hadith Jibril (ikhlas, ihsan), purity (wudu, ghusl, tayammum) and the conditions of salah.", "I-06-B-01 to B-31"],
      ["Knows the society of Madinah: Masjid an-Nabawi, Ashab as-Suffah, the brotherhood, the Charter, the change of Qiblah, and the battles of Badr and Uhud.", "I-06-C-01 to C-30"],
      ["Learns love and obedience of the Prophet ﷺ, his kindness to children and orphans, and his keeping of promises.", "I-06-C-31 to C-48"],
      ["Practises consultation, patience and good manners on roads, in travel and public places, and avoids theft, taking by force and cheating.", "I-06-D-01 to D-24"],
      ["Knows the rights of parents and relatives, justice, ihsan and public welfare, and the lives of Sayyidah Khadijah, Aishah, Sawdah and Fatimah رضي الله عنهن, the Prophet's ﷺ children and the Ashara Mubashshara رضي الله عنهم.", "I-06-E-01 to E-18; I-06-F-01 to F-17; Mashahir-e-Islam, printed p. 109"]],
    sci: [
      ["Cells: plant and animal cells, and how cells build tissues and organs.", "SCI-06-A-02 to A-06"],
      ["Reproduction in plants, including growing plants from cuttings.", "SCI-06-A-07 to A-10"],
      ["Digestion, enzymes, a balanced diet, nutrients and deficiency diseases.", "SCI-06-A-11 to A-20"],
      ["Atoms, molecules, the first elements and their symbols; elements, compounds and mixtures and how to separate them.", "SCI-06-B-01 to B-24"],
      ["The particle model of solids, liquids and gases; diffusion; melting, freezing and evaporation.", "SCI-06-B-11 to B-16"],
      ["Energy: potential and kinetic energy, conservation of energy, renewable energy.", "SCI-06-B-27 to B-33"],
      ["Static electricity, series and parallel circuits, magnets and electromagnets.", "SCI-06-B-34 to B-51"],
      ["Planets, dwarf planets, asteroids, meteors and comets; how satellites help us.", "SCI-06-C-01 to C-06"]],
    his: [
      ["Ancient civilisations: Mesopotamia, Egypt, the Indus Valley and China (two studied in depth).", "History grid, Grade 6 topics 1"],
      ["Persian, Greek and Roman civilisations.", "Grade 6 topic 2"],
      ["Aryans, Kushans and Guptas in the subcontinent.", "Grade 6 topic 3"],
      ["The rise of Islamic civilisation.", "Grade 6 topic 4"],
      ["Thinking like a historian: why events happened, how the past is told differently by different people, and what it teaches about rights, laws and good citizenship.", "H-06-A-01 to D-01"]],
    geo: [
      ["How the Earth formed and how landscapes change; reading maps and six-figure grid references.", "G-06-A-01 to A-04"],
      ["Weather and climate, world climate zones, vegetation, and how deforestation changes the climate.", "G-06-A-05 to A-09"],
      ["Resources and work: forests of the world and of Pakistan, education and industry.", "G-06-B-01 to B-02"],
      ["Why settlements grow where they do; comparing ways of life in different places.", "G-06-B-03 to B-10"],
      ["How people and the environment affect each other, and how to protect the environment.", "G-06-C-01 to C-05"]],
    cs: [
      ["Computer hardware and software, and the parts inside a computer.", "CS-06-A-01 to A-03"],
      ["Using an operating system, editing images, and searching the internet for reliable results.", "CS-06-B-01 to B-03"],
      ["Algorithmic thinking and first programs (sequence, selection, repetition, variables) in a visual tool such as Scratch.", "CS-06-C-02 to D-02"],
      ["Digital citizenship and the basics of entrepreneurship.", "CS-06-E-01, F-01"]],
  },
  7: {
    eng: [
      ["Leads and joins discussions and presents ideas with good delivery.", "English Grade 7, Competency A"],
      ["Summarises and links ideas from different parts of a text; reads widely from print and online sources.", "Competency B"],
      ["Clauses and phrases, sentence patterns, complex and compound sentences; prefixes and suffixes.", "Competency C"],
      ["Plans writing with brainstorming and mind maps, then drafts with correct punctuation and spelling.", "Competency D"]],
    urdu: [
      ["Listen to news, dramas and features and analyse the moral, social, economic and cultural points they raise.", "SLO U-07-A-04"],
      ["Read prose and judge its parts and its context.", "SLO U-07-C-03"],
      ["Explain the verses of a poem with references (تشریح مع حوالہ).", "SLO U-07-D-03"],
      ["Write an essay and a story of at least 250 words each, using idioms in the story, and a 200-word dialogue.", "SLO U-07-D-05, U-07-D-06, U-07-D-08"],
      ["Write a review (تبصرہ) and a report of at least 175 words each, and a summary (تلخیص) of a 100-word passage.", "SLO U-07-D-11, U-07-D-10, U-07-D-12"],
      ["Recognise metaphor (استعارہ) and change simple sentences into compound ones.", "SLO U-07-E-13, U-07-E-12"],
      ["Know the types of past tense and proper nouns, and correct sentences with gender mistakes.", "SLO U-07-E-09, U-07-E-08, U-07-E-14"]],
    math: [
      ["Rational numbers, rounding and estimating; squares and square roots; sets and Venn diagrams.", "M-07-A-01 to A-26"],
      ["Rate and proportion; profit, loss, discount and commission; income tax, sales tax, zakat and ushr.", "M-07-A-14 to A-19"],
      ["Algebra: Al-Khwarizmi as its founder; polynomials, identities and factorising; linear equations and their graphs.", "M-07-B-01 to B-21"],
      ["Time, speed and journeys; area and volume of 3-D shapes.", "M-07-C-01 to C-11"],
      ["Quadrilaterals, circles and angles in polygons; constructing triangles; graphs, averages, frequency tables and probability.", "M-07-D-01 to E-05"]],
    isl: [
      ["Understands the translation of selected surahs about Sayyidunā Ibrahim and Musa عليهما السلام, and has memorised Surah at-Tin, al-Alaq, al-Qadr and al-Bayyinah.", "I-07-A-01 to A-06"],
      ["Knows the duas of Sayyidunā Musa and Nuh عليهما السلام, seven hadith, duas for protection and looking in a mirror, and 12 names of Allah with meanings.", "I-07-A-07 to A-20"],
      ["Understands the finality of prophethood, belief in angels and the revealed books, fasting and taqwa, the funeral prayer and other prayers (tahajjud, ishraq, eclipse), and dua.", "I-07-B-01 to B-38"],
      ["Knows the problems of Madinah from hypocrites and some Jewish tribes, the battles of Khandaq and Banu Qurayzah, and the Prophet's ﷺ patience, gratitude, simplicity and manner of speech.", "I-07-C-01 to C-52"],
      ["Learns manners of seeking knowledge and respect for teachers, avoids showing off, earns halal, avoids interest, bribery and gambling, and looks after public property.", "I-07-D-16 to D-30; I-07-E-18 to E-29"],
      ["Knows Mothers of the Believers Sayyidah Hafsah, Zaynab bint Khuzaymah, Umm Salamah and Zaynab bint Jahsh, Sayyidunā Hasan, Sayyidah Zaynab bint Ali, and Ibn Abbas, Ubayy bin Ka'b, Zayd bin Thabit, Abu Hurayrah and Ibn Umar رضي الله عنهم.", "I-07-F-01 to F-21"],
      ["Knows the Sufis Bahauddin Naqshband and Shihabuddin Suhrawardi, the Imams Bukhari, Shafi'i and Ahmad bin Hanbal رحمهم الله, the conquerors Musa bin Nusayr and Tariq bin Ziyad, and Islam's teaching on knowledge, science and peace.", "I-07-F-22 to F-38; I-07-G-01 to G-16"]],
    sci: [
      ["Plants: roots and shoots, xylem and phloem, photosynthesis and respiration.", "SCI-07-A-01 to A-10"],
      ["The human respiratory and circulatory systems: lungs, heart, blood vessels and blood.", "SCI-07-A-11 to A-19"],
      ["Immunity and infectious diseases (such as hepatitis and typhoid) and how communities protect themselves.", "SCI-07-A-20 to A-28"],
      ["Structure of the atom, electron shells, the Periodic Table, valency and chemical formulae.", "SCI-07-B-01 to B-10"],
      ["Physical and chemical changes: burning, rusting and how to prevent rust; solutions and solubility.", "SCI-07-B-12 to B-27"],
      ["Heat and temperature: expansion, conduction, convection, radiation and insulation.", "SCI-07-B-28 to B-35"],
      ["Waves and sound: pitch, loudness and echoes.", "SCI-07-B-36 to B-45"],
      ["Force and motion: speed, distance-time graphs, action and reaction.", "SCI-07-B-46 to B-53"],
      ["Gravity, tides and the seasons.", "SCI-07-C-01 to C-05"]],
    his: [
      ["The Middle Ages in Europe (500 to 1500).", "History grid, Grade 7 topic 1"],
      ["The spread of Islam in Europe and Asia under the Umayyads and Abbasids.", "Grade 7 topic 2"],
      ["Muslim dynasties (Seljuk, Ayyubid, Fatimid, Safavid, Ottoman) and the Crusades.", "Grade 7 topic 3"],
      ["Muslims in South Asia: the Delhi Sultanate and the Mughal Empire.", "Grade 7 topic 4"],
      ["The Renaissance and Enlightenment in Europe; comparing periods and explaining causes with evidence.", "Grade 7 topic 5; H-07-A-01 to D-01"]],
    geo: [
      ["Time zones and the date line; using maps, photographs and satellite images.", "G-07-A-01 to A-03"],
      ["Climate change and its causes, such as excessive farming.", "G-07-A-04"],
      ["Farming, land and population; urban and rural life; using resources wisely.", "G-07-B-01 to B-12"],
      ["Pollution and changing landforms; the world economy, World Bank and IMF.", "G-07-C-01 to C-05"]],
    cs: [
      ["Emerging technologies (artificial intelligence, robotics, biometrics) and more computer hardware.", "CS-07-A-01 to A-02"],
      ["Word processing, presentations and e-mail.", "CS-07-B-01 to B-02"],
      ["Computational thinking with conditions and loops; binary numbers; multi-sprite programs.", "CS-07-C-01 to D-02"],
      ["Digital citizenship; design thinking for entrepreneurs.", "CS-07-E-01, F-01"]],
  },
  8: {
    eng: [
      ["Discusses texts and issues with others, presents ideas, and takes part in drama.", "English Grade 8, Competency A"],
      ["Reads widely and analyses how a paragraph supports its main idea (evidence, cause and effect, comparison).", "Competency B"],
      ["Literary devices: similes, metaphors, personification, imagery, alliteration and rhyme scheme.", "Competency C"],
      ["Edits and proofreads longer writing and punctuates it correctly.", "Competency D"]],
    urdu: [
      ["Understand an author's technique, purpose and style in stories, plays and essays.", "SLO U-08-C-03, U-08-C-02"],
      ["Explain verses with references, and write the central idea or a summary of a passage.", "SLO U-08-D-03, U-08-D-04, U-08-D-12"],
      ["Write an essay and a story of at least 300 words each, using idioms and proverbs in the story.", "SLO U-08-D-05, U-08-D-06"],
      ["Write a 250-word dialogue, and a review and a report of at least 200 words each.", "SLO U-08-D-08, U-08-D-11, U-08-D-10"],
      ["Write a speech of at least 200 words and deliver a speech on any topic with confidence.", "SLO U-08-D-13, U-08-B-03"],
      ["Recognise and use allusion (تلمیح) and Arabic plural forms.", "SLO U-08-E-10, U-08-E-01"],
      ["Tell active from passive verbs (معروف، مجہول) and know the types of adjectives.", "SLO U-08-E-08, U-08-E-07"]],
    math: [
      ["Real numbers, significant figures and approximation; converting rupees to other currencies.", "M-08-A-01 to A-10"],
      ["Proportion; profit and loss percentages, markup, insurance; squares, cubes and their roots; sets and De Morgan's laws.", "M-08-A-11 to A-24"],
      ["Arithmetic and geometric sequences; polynomials and identities; simultaneous equations; laws of indices; inequalities; straight-line graphs.", "M-08-B-01 to B-25"],
      ["Pythagoras' theorem; surface area and volume of pyramids, spheres and cones.", "M-08-C-01 to C-05"],
      ["Rotation, parts of a circle, constructing triangles, congruent and similar shapes; range, variance and standard deviation; histograms and probability.", "M-08-D-01 to E-06"]],
    isl: [
      ["Understands the translation of Surah Yusuf and other selected surahs, and has memorised Surah al-Balad, ash-Shams, al-Layl, ad-Duha and al-Inshirah.", "I-08-A-01 to A-06"],
      ["Knows Quranic duas (al-Baqarah 286, Sayyidunā Musa's عليه السلام dua in Surah Ta-Ha), Hasbunallahu wa ni'mal wakil, the dua of Sayyidunā Yunus عليه السلام, eight hadith, daily duas and 12 names of Allah with meanings.", "I-08-A-07 to A-18"],
      ["Understands divine decree (taqdir), trust in Allah and the Hereafter, and knows zakat in detail (nisab, who receives it, ushr) and how Hajj and Umrah differ.", "I-08-B-01 to B-42"],
      ["Knows the Prophet's ﷺ letters to kings, the battle of Khaybar, the battle of Mu'tah, his noble appearance and character, and his social teachings on hijab, modesty and asking permission.", "I-08-C-01 to C-31"],
      ["Practises equality, Islamic brotherhood and unity of the Ummah, avoids suspicion and greed, cares for the sick, disabled and orphans, and deals honestly in buying and selling.", "I-08-D-01 to D-25; I-08-E-01 to E-11"],
      ["Knows Mothers of the Believers Sayyidah Juwayriyah, Safiyyah, Umm Habibah, Maymunah and Mariyah رضي الله عنهن, Sayyidunā Imam Husayn and Karbala, Ibn Mas'ud, Mu'adh bin Jabal, Abu Dharr and Salman Farsi رضي الله عنهم, Khwaja Mu'inuddin Chishti, Mujaddid Alf Thani, Baba Farid, Imam Ghazali, Shah Waliullah and Shaykh Abdul Haq Muhaddith Dehlvi رحمهم الله, and the conquerors Nuruddin Zangi, Salahuddin Ayyubi and Sultan Muhammad Fatih.", "I-08-F-01 to F-35"],
      ["Understands enjoining good and forbidding evil, and using media responsibly by checking news before sharing it.", "I-08-G-01 to G-14"]],
    sci: [
      ["Variation and adaptation; genes, chromosomes and DNA; cell division (mitosis and meiosis).", "SCI-08-A-01 to A-10"],
      ["The nervous system and the brain, and how messages travel through the body.", "SCI-08-A-11 to A-25"],
      ["Ecology: the oxygen and carbon cycles, energy flow, global warming and protecting ecosystems.", "SCI-08-A-26 to A-34"],
      ["Biotechnology and its uses in Pakistan, including food production.", "SCI-08-A-35 to A-38"],
      ["The Periodic Table (first 18 elements), metals and non-metals, chemical reactions and equations, ionic and covalent bonds.", "SCI-08-B-01 to B-15"],
      ["Acids, alkalis and salts; pH and neutralisation.", "SCI-08-B-16 to B-21"],
      ["Light: reflection, mirrors, refraction and colour.", "SCI-08-B-22 to B-33"],
      ["Electricity at home: resistance, voltage, current, power, fuses and safety.", "SCI-08-B-34 to B-41"],
      ["Forces and pressure, floating and sinking; electromagnets and their uses.", "SCI-08-B-42 to B-52"],
      ["Stars, galaxies and the Milky Way; the life of the Sun; telescopes and space technology.", "SCI-08-C-01 to C-06"]],
    his: [
      ["The arrival of the British in the subcontinent.", "History grid, Grade 8 topic 1"],
      ["Reform movements in India.", "Grade 8 topic 2"],
      ["The First and Second World Wars.", "Grade 8 topic 3"],
      ["Political awakening in India and the road to independence.", "Grade 8 topic 4"],
      ["Pakistan, a new country: 1947 to today; forming their own view from evidence.", "Grade 8 topic 5; H-08-A-01 to D-01"]],
    geo: [
      ["Earthquakes, rivers, the water cycle, the rock cycle and minerals; geospatial tools such as GPS and GIS.", "G-08-A-01 to A-03"],
      ["Soil erosion and climate change.", "G-08-A-04"],
      ["Fishing, minerals and energy; infrastructure such as CPEC; how culture depends on place.", "G-08-B-01 to B-12"],
      ["How places depend on each other; managing land and water; the World Bank and IMF.", "G-08-C-01 to C-05"]],
    cs: [
      ["Emerging technologies such as 5G; computer networks and their parts.", "CS-08-A-01 to A-02"],
      ["Handling data with software tools such as spreadsheets.", "CS-08-B-01"],
      ["Solving complex problems step by step, including nested algorithms.", "CS-08-C-01 to C-02"],
      ["Information literacy and protection against cybercrime; digital marketing and a simple business plan.", "CS-08-E-01, F-01 to F-02"]],
  },
};
/* School-book subjects that teach each National Curriculum subject (for progress on the Class goals tab) */
const NCP_BOOKS = { eng: ["English"], urdu: ["Urdu"], math: ["Mathematics"], isl: ["Islamiyat", "Qur'an"], gk: ["General Knowledge", "Science", "Social Studies"],
  sci: ["Science"], sst: ["Social Studies"], his: ["History", "Social Studies"], geo: ["Geography", "Social Studies"], cs: ["Computing"] };
/* Core Knowledge subjects to offer as extra reading for each National Curriculum subject */
const NCP_CK = { eng: "la", gk: "hg", sci: "sci", sst: "hg", his: "hg", geo: "hg" };

/* Where in the world each Core Knowledge History & Geography unit is set (this tracker's grouping) */
const HG_REGIONS = [
  ["sa", "Pakistan and South Asia"], ["islam", "Middle East, Africa and Islam"], ["asia", "China, Japan and Russia"],
  ["geo", "World geography and maps"], ["eu", "Ancient Greece, Rome and Europe"], ["am", "Latin America and Canada"],
  ["world", "World history, civics and economics"], ["us", "United States"]
];
const HG_REGION = {
  "hg-2-1": "sa",
  "hg-1-2": "islam", "hg-1-3": "islam", "hg-1-4": "islam", "hg-4-4": "islam", "hg-4-5": "islam",
  "hg-2-2": "asia", "hg-2-3": "asia", "hg-4-6": "asia", "hg-5-7": "asia", "hg-5-8": "asia",
  "hg-0-1": "geo", "hg-1-1": "geo", "hg-3-1": "geo", "hg-4-1": "geo", "hg-4-2": "geo", "hg-5-1": "geo", "hg-6-1": "geo",
  "hg-2-4": "eu", "hg-3-2": "eu", "hg-3-3": "eu", "hg-4-3": "eu", "hg-5-3": "eu", "hg-5-4": "eu", "hg-5-5": "eu", "hg-5-6": "eu",
  "hg-6-2": "eu", "hg-6-3": "eu", "hg-6-4": "eu", "hg-6-5": "eu",
  "hg-1-5": "am", "hg-1-6": "am", "hg-2-5": "am", "hg-3-4": "am", "hg-3-5": "am", "hg-5-2": "am", "hg-6-6": "am",
  "hg-1-10": "world", "hg-2-12": "world", "hg-5-14": "world", "hg-8-1": "world", "hg-8-2": "world", "hg-8-3": "world"
}; /* every unit flagged "us" is in the United States group */

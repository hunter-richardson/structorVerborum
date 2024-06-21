# StructorVerborum [![CodeFactor](https://www.codefactor.io/repository/github/hunter-richardson/structorverborum/badge)](https://www.codefactor.io/repository/github/hunter-richardson/structorverborum)  [![GitHub Issues](https://img.shields.io/github/issues-raw/hunter-richardson/structorVerborum?logo=github)](https://github.com/hunter-richardson/structorVerborum/issues)  [![GitHub Issues](https://img.shields.io/github/issues-pr/hunter-richardson/structorVerborum?logo=github)](https://github.com/hunter-richardson/structorVerborum/pulls)  [![.github/workflows/aedificare.yaml](https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yaml/badge.svg?branch=princeps&event=status)](https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yaml)

*Structor Verborum (anglice *"Phrase Factory"*) situm intenditur licentem hospites facere locutiones Latinas lemmis inflexis accurate. Propter naturam linguae Latinae hospites modicum aliquid eius requiruntur intellegere aut discere posse saltem. Hoc nec opera dictionarii nec magister linguae Latinae quamquam res pro casu illa providerentur cum posset.* / *Structor Verborum* ("Phrase Factory" in English) is intended to be a website that allows its visitors to compose Latin phrases with accurately inflected lemmas. Due to the nature of the Latin language, this requires visitors understand (or at least be able to learn) some modicum thereof. This is neither a dictionary service nor a facilitor of teaching the Latin language, although resources may be provided to help with that when possible.

*Hic situs verba Latina tabulasque inflexionis praebet similiter [dictionario](https://latinitium.com/latin-dictionaries) praebenti vires contextuales. Hospes [copiam lemmarum](/res/lemmae) quaereret de scripto principali categoriave. Lemma quaesita tonsori ante seligendum praebebitur cum tabula inflexionis si patet atque tabula lemmam inflectet de colaminibus seligendis et hospes locutioni currenti addere optet.* / This website presents Latin words and their inflection tables similiar to a [dictionary](https://latinitium.com/latin-dictionaries) that presents their contextual meanings. The visitor may search the [lemma store](/res/lemmae) according to the printed value of their principal parts and/or by the sentence function they perform. After (s)he selects the desired lemma, it is presented in the browser, with its inflection table if available. The table further inflects the lemma according to a selection of filters, and the visitor may choose to add it to the running phrase.

*Et Structor Verborum pro numeris Romanis modos [numeratoris](/src/facies/numerare.vue) [calculatorisque](/src/facies/numerare.vue) (qui dicuntur) praebet. Numerator simpliciter numeros Arabicos Romanis facit calculatorque operationes simplices mathematicas numeris Romanis agit.* / In addition to searching lemmas, *Structor Verborum* offers a so-called ["numerator"](/src/facies/numerare.vue) and ["calculator"](/src/facies/calculare.vue) functions for the purpose of Roman numerals. The numerator simply turns Arabic numbers into Roman numerals, and the calculator performs simple mathematics operations on Roman numerals.

## *Crustula* / Cookies

*Situs crustula in tonsorem hospitis coquitur ni negaret aperte, casu crustulum coctum solum illud indicabit. Si hospes titulum crustulorum agnoscere nollet tum quoties apparebit; hospes nec titulum crustulorum nec globulos ferentes ante negandum videbit donec crustulum exibit. Crustula hic intenduntur hospites licere singulas optare pro usu sibi nec pro indagendo venditioneque. Pro illa casu hospes singulas has optaret* / The website stores cookies in the visitor's browser, unless of course (s)he refuses them -- in which case the only stored cookie shall indicate that. If the visitor does not acknowledge the cookie policy, then it will appear every time (s)he visits; after refusing, the visitor will see neither the cookie policy nor the buttons that facilitate their storage, until the cookie expires. Cookies are intended here to allow the visitor to tailor his/her website experience, not for the purpose of tracking or advertisements. To that end, the visitor may select the following customizations.

* ***assensus*** ("consent"):
  * *Propositum* / Purpose: *pro intellegendo hospitis usus crustulorum siti* / to facilitate the visitor's understanding of the website's cookie usage
  * *Valora* / Values: *assensit* ("agreed") *aut*/or *negavit* ("denied")
  * *Valor inhaerendus nullus* / no default value

* ***facies*** ("theme"):
  * *Propositum: pro consilio colorum siti ut automatust a [Viutificando](https://vuetifyjs.com)* / to facilitate the website's color palette, as automated by [Vuetify](https://vuetifyjs.com)
  * *Valora: illustris* ("light") *aut fusca* ("dark")
  * *Valor inhaerendus ante assensum/negatum* / Default value (after consent/refusal): *fusca*

* ***lingua*** ("language"):
  * *Propositum: elementa siti scribere aut Anglice aut Latine at lemmae etiam Latine scribentur* / to display the website's structural elements in either English or Latin. (The printed lemmas and phrases still display in Latin.)
  * *Valora: anglica* ("English") *aut latina* ("Latin")
  * *Valor inhaerendus: latina*

* ***utendaU*** ("use the U"):
  * *Propositum: lemmas locutionesque scribere aut ut tonsas aut cum littera U reposita V ut Romani veteres corpus Latinum scripserunt quod facilius incidere tabulis lapideis fuerat. Deinde cum cera papyroque scribendis littera U litteram V mutam reponere incepit.* / To display the lemmas and phrases either as stored, or with *U*s replaced with *V*s. Ancient Romans wrote Latin literature with *V*s instead of *U*s, as *V*s were easier to carve on stone tablets and buildings. Later, as wax and paper became more popular means of written communication, *U*s started to replace *V*s used as vowels.
  * *Valora: ita* ("yes") *aut non* ("no")
  * *Valor inhaerendus: ita*

* ***magnas*** ("capitals"):
  * *Propositum: lemmas locutionesque cum litteris MAGNIS aut parvis scribere. Romani veteres corpus Latinum cum litteris MAGNIS scripserunt quod facilius incidere tabulis lapideis fuerat. Deinde cum cera papyroque scribendis litterae parvae factae fuerant. (Scribentur cum littera magna prima nomina propria et verba prima locutionum.)* / to print lemmas and phrases either in UPPERCASE or in lowercase. Ancient Romans wrote Latin literature in ALL CAPS, as they were easier to carve on stone tablets and buildings. Later, as wax and paper became more popular means of written communication, lowercase letters were developed. (Proper names and the phrases' first word are always capitalized.)
  * *Valora: ita aut non*
  * *Valor inhaerendus: non*

* ***apices*** ("macra"):
  * *Propositum: lemmas locutionesque cum apicibus scribere. Hi litteras longas signant ergo conare longius maiusque sonare brevibus atque in pluria dictionaria scripturaque grammaticalia scriptaest at aliter remotae* / to print lemmas and phrases either with or without diacritic marks (called macra). These marks indicate long vowels -- try to pronounce them longer and/or louder than the short, unmarked vowels -- and are written in most dictionaries and Latin grammar textbooks, but otherwise removed from written language.
  * *Valora: ita aut non*
  * *Valor inhaerendus: ita*

* ***separator*** ("separator"):
  * *Propositum: verba locutionum deliminare littera data: inane (' ') aut interpunctum ('·') aut nullum. Ab auctoribus diversis corporis Latini per aestatem clarissimam quaeque usast.* / To delimit phrases' words by the given character: a space (' '), an interpunct ('·'), or none. Each was used by various authors of Latin literature during the classical era.
  * *Valora: inane* ("space") *aut interpunctum* ("interpunt") *aut nullum* ("none")
  * *Valor inhaerendus: inane*

const carsData = {
	Acura: [
		"Legend",
		"Integra",
		"NSX",
		"Vigor",
		"CL",
		"RL",
		"MDX",
		"RSX",
		"TSX",
		"RDX",
		"ZDX",
		"ILX",
		"TLX",
		"RLX",
		"NSX (2nd Gen)",
	],
	"Alfa Romeo": [
		"24 HP",
		"12 HP",
		"15 HP",
		"40-60 HP",
		"20-30 HP",
		"RL",
		"6C 1500",
		"6C 1750",
		"8C 2300",
		"6C 1900",
		"8C 2900",
		"6C 2500",
		"1900",
		"Giulietta",
		"2000",
		"2600",
		"Giulia",
		"Giulietta",
		"Spider",
		"1750",
		"Montreal",
		"Alfetta",
		"Sprint",
		"33",
		"GTV",
		"SZ",
		"RZ",
		"75",
		"164",
		"Spider (1995)",
		"145",
		"146",
		"155",
		"156",
		"166",
		"GT",
		"147",
		"GTA",
		"Spider (2006)",
		"159",
		"Brera",
		"Spider (2008)",
		"MiTo",
		"Giulietta (2010)",
		"4C",
		"Giulia (2016)",
		"Stelvio",
	],
	"Aston Martin": [
		"Coal Scuttle",
		"Bamford & Martin 1.5L",
		"Aston Martin Standard Sports",
		"2-Litre Sports",
		"Ulster",
		"Mark II",
		"DB2",
		"DB2/4",
		"DB Mark III",
		"DB4",
		"DB5",
		"DB6",
		"DBS",
		"V8",
		"Vantage",
		"Lagonda Rapide",
		"V8 Vantage",
		"V8 Zagato",
		"Bulldog",
		"AMV8",
		"V8 Volante",
		"Lagonda",
		"Virage",
		"DB7",
		"V12 Vanquish",
		"DB9",
		"V8 Vantage (2005)",
		"Vantage (2005)",
		"Rapide",
		"Virage (2011)",
		"Vanquish (2012)",
		"V12 Vantage",
		"V8 Vantage (2018)",
		"DB11",
		"Vantage (2018)",
		"DBS Superleggera",
		"Valhalla",
		"DBX",
	],
	Audi: [
		"Type A",
		"Type B",
		"Type C",
		"Type M",
		"Front",
		"Type K",
		"Type L",
		"Type E",
		"920",
		"60",
		"75",
		"100",
		"80",
		"Super 90",
		"200",
		"V8",
		"A2",
		"A3",
		"A4",
		"A6",
		"A8",
		"TT",
		"S3",
		"S4",
		"S6",
		"S8",
		"RS2",
		"RS4",
		"RS6",
		"RS8",
		"R8",
		"Q2",
		"Q3",
		"Q5",
		"Q7",
		"Q8",
		"e-tron",
		"A1",
		"A7",
		"S1",
		"S7",
		"SQ5",
		"SQ7",
		"SQ8",
		"e-tron GT",
		"RS3",
		"RS5",
		"RS7",
		"e-tron Sportback",
		"Q4 e-tron",
		"Q4 Sportback e-tron",
		"A3 Sportback e-tron",
	],
	Bentley: [
		"3 Litre",
		"6.5 Litre",
		"4.5 Litre",
		"8 Litre",
		"4 Litre",
		"Mark V",
		"R Type",
		"S1",
		"S2",
		"S3",
		"Continental S",
		"Continental S2",
		"T1",
		"T2",
		"Corniche",
		"Mulsanne",
		"Turbo R",
		"Continental",
		"Brooklands",
		"Azure",
		"Continental R",
		"Continental T",
		"Arnage",
		"Azure (2006)",
		"Continental GT",
		"Flying Spur (2006)",
		"Brooklands (2007)",
		"Continental GTC",
		"Azure (2010)",
		"Mulsanne (2010)",
		"Continental Supersports",
		"Mulsanne (2016)",
		"Bentayga",
		"Continental GT (2018)",
		"Flying Spur (2019)",
		"Bentayga Speed",
		"Mulliner Bacalar",
		"Continental GT Speed",
		"Bentayga S",
		"Continental GT Speed Convertible",
		"Bentayga Speed",
		"Bentayga Hybrid",
	],
	BMW: [
		"Dixi",
		"3/15",
		"303",
		"309",
		"315",
		"319",
		"327",
		"328",
		"335",
		"501",
		"502",
		"503",
		"507",
		"Isetta",
		"600",
		"700",
		"1500",
		"1600",
		"1800",
		"2000",
		"2002",
		"2500",
		"2800",
		"3.0CS",
		"3.0 CSL",
		"5 Series",
		"6 Series",
		"7 Series",
		"8 Series",
		"M1",
		"M3",
		"M5",
		"M6",
		"Z1",
		"Z3",
		"Z4",
		"Z8",
		"1 Series",
		"3 Series",
		"5 Series (E39)",
		"7 Series (E38)",
		"X5",
		"X3",
		"X6",
		"X1",
		"X4",
		"X2",
		"6 Series (E63/E64)",
		"1 Series (E87)",
		"3 Series (E46)",
		"5 Series (E60/E61)",
		"M Coupe",
		"M Roadster",
		"X5 (E53)",
		"X3 (E83)",
		"Z4 (E85/E86)",
		"1 Series (E82/E88)",
		"7 Series (F01/F02)",
		"X6 (E71/E72)",
		"5 Series (F10/F11)",
		"6 Series (F12/F13)",
		"X3 (F25)",
		"X5 (F15)",
		"2 Series",
		"4 Series",
		"i3",
		"i8",
		"X4 (F26)",
		"X1 (F48)",
		"7 Series (G11/G12)",
		"5 Series (G30/G31)",
		"X3 (G01)",
		"X5 (G05)",
		"8 Series (G14/G15/G16)",
		"Z4 (G29)",
		"X7",
		"1 Series (F40)",
		"2 Series Gran Coupe",
		"4 Series (G22)",
		"M2",
		"M4",
		"M8",
		"iX3",
		"iX",
		"i4",
	],
	Buick: [
		"Model B",
		"Model C",
		"Model D",
		"Model F",
		"Model G",
		"Model K",
		"Model 10",
		"Model 14",
		"Model 24",
		"Model 35",
		"Model 36",
		"Model 50",
		"Model 51",
		"Model 53",
		"Model 54",
		"Model 55",
		"Model 56",
		"Model 60",
		"Model 70",
		"Model 80",
		"Model 90",
		"Model 10 (1910)",
		"Model 21",
		"Model 24 (1910)",
		"Model 25",
		"Model 26",
		"Model 27",
		"Model 28",
		"Model 29",
		"Model 30",
		"Model 31",
		"Model 32",
		"Model 33",
		"Model 34",
		"Model 35 (1915)",
		"Model 36 (1915)",
		"Model 37",
		"Model 38",
		"Model 39",
		"Model 40",
		"Model 41",
		"Model 43",
		"Model 44",
		"Model 45",
		"Model 46",
		"Model 47",
		"Model 48",
		"Model 49",
		"Model 50 (1918)",
		"Model 51 (1918)",
		"Model 53 (1918)",
		"Model 54 (1918)",
		"Model 55 (1918)",
		"Model 56 (1918)",
		"Model 57",
		"Model 58",
		"Model 59",
		"Model 60 (1919)",
		"Series 121",
		"Series 121 (1935)",
		"Series 40",
		"Series 40 Special",
		"Series 50 Super",
		"Series 50",
		"Roadmaster",
		"Limited",
		"Century",
		"Skylark",
		"Special",
		"Electra",
		"LeSabre",
		"Riviera",
		"Wildcat",
		"GS",
		"Gran Sport",
		"Apollo",
		"Regal",
		"Skyhawk",
		"Century Turbo",
		"Somerset",
		"Reatta",
		"Park Avenue",
		"Roadmaster Estate",
		"Roadmaster Sedan",
		"Roadmaster Wagon",
		"Skylark Gran Sport",
		"Somerset Regal",
		"LaCrosse",
		"Rendezvous",
		"Terraza",
		"Enclave",
		"Lucerne",
		"Regal GS",
		"Verano",
		"Encore",
		"Cascada",
		"Envision",
		"Avenir",
	],
	Cadillac: [
		"Model A",
		"Model Thirty",
		"Model B",
		"Model C",
		"Model D",
		"Model E",
		"Model G",
		"Model H",
		"Model K",
		"Model L",
		"Model M",
		"Model S",
		"Model V-63",
		"V-12",
		"V-16",
		"Series 60",
		"Series 61",
		"Series 62",
		"Series 63",
		"Series 65",
		"Series 67",
		"Series 70",
		"Series 75",
		"Series 80",
		"Series 85",
		"Series 90",
		"Sixty Special",
		"Eldorado",
		"Fleetwood",
		"DeVille",
		"Seville",
		"Cimarron",
		"Allanté",
		"Brougham",
		"Catera",
		"Escalade",
		"XLR",
		"STS",
		"DTS",
		"ATS",
		"ELR",
		"CTS",
		"SRX",
		"Escalade ESV",
		"Escalade EXT",
		"CT6",
		"XT5",
		"XT4",
		"XT6",
		"CT4",
		"CT5",
		"Lyriq",
		"Celestiq",
		"Blackwing",
		"Escalade (2021)",
	],
	Chevrolet: [
		"Series C Classic Six",
		"Series H",
		"Series 490",
		"Series AA Capitol",
		"Series AE Independence",
		"Superior",
		"Standard",
		"Master",
		"Master Deluxe",
		"Special Deluxe",
		"Fleetmaster",
		"Stylemaster",
		"Deluxe",
		"Bel Air",
		"One-Fifty",
		"Two-Ten",
		"Townsman",
		"Beauville",
		"Nomad",
		"Biscayne",
		"Brookwood",
		"Parkwood",
		"Kingswood",
		"Impala",
		"Corvette",
		"El Camino",
		"Camaro",
		"Chevelle",
		"Nova",
		"Vega",
		"Monte Carlo",
		"Monza",
		"Caprice",
		"Malibu",
		"Citation",
		"Celebrity",
		"Sprint",
		"Lumina",
		"Beretta",
		"Corsica",
		"Geo Prizm",
		"Lumina APV",
		"Monte Carlo (1995)",
		"Blazer",
		"Tahoe",
		"Suburban",
		"S-10 Blazer",
		"Tracker",
		"Metro",
		"Prizm",
		"Express",
		"Silverado",
		"Avalanche",
		"SSR",
		"Colorado",
		"Equinox",
		"Traverse",
		"Orlando",
		"Trax",
		"Sonic",
		"Spark",
		"Volt",
		"Bolt",
		"Malibu (2013)",
		"Impala (2014)",
		"Camaro (2016)",
		"Cruze",
		"Blazer (2019)",
		"Trailblazer",
		"Silverado HD",
		"Suburban (2021)",
		"Tahoe (2021)",
		"Corvette (C8)",
		"Silverado EV",
		"Silverado ZR2",
		"Equinox (2022)",
	],
	Chrysler: [
		"Six",
		"Imperial",
		"Airflow",
		"Windsor",
		"Saratoga",
		"New Yorker",
		"Town & Country",
		"Newport",
		"300",
		"Newport Town & Country",
		"Newport Royal",
		"Saratoga Newport",
		"Saratoga New Yorker",
		"Windsor Newport",
		"Windsor Highlander",
		"Windsor Deluxe",
		"Windsor Newport Royal",
		"Windsor Saratoga",
		"Windsor Windsor Deluxe",
		"Windsor Windsor Highlander",
		"Windsor Windsor New Yorker",
		"Windsor Windsor Newport",
		"Windsor Windsor Saratoga",
		"Windsor Windsor Town & Country",
		"300M",
		"Concorde",
		"LHS",
		"Cirrus",
		"Sebring",
		"PT Cruiser",
		"Pacifica",
		"Aspen",
		"200",
		"Town & Country (2008)",
		"300 (2011)",
		"200 (2015)",
		"Pacifica (2017)",
		"300 (2015)",
		"Pacifica Hybrid",
		"Voyager",
		"300 (2019)",
		"Pacifica (2021)",
		"Grand Caravan",
		"Aspen (2022)",
	],
	Dodge: [
		"Model 30",
		"Model 116",
		"Model 124",
		"Model 128",
		"Model 129",
		"Series 116",
		"Series 126",
		"Series 129",
		"Senior",
		"Six",
		"Fast Four",
		"Victory Six",
		"Senior Six",
		"Standard Six",
		"Deluxe",
		"Custom",
		"Coronet",
		"Meadowbrook",
		"Royal",
		"Wayfarer",
		"Custom Royal",
		"Dart",
		"Polara",
		"330",
		"440",
		"Lancer",
		"880",
		"Charger",
		"Challenger",
		"Coronet Super Bee",
		"Monaco",
		"Coronet R/T",
		"Polara 500",
		"Charger Daytona",
		"Charger 500",
		"Aspen",
		"Diplomat",
		"Mirada",
		"Aries",
		"400",
		"600",
		"Lancer",
		"Daytona",
		"Shelby Charger",
		"Caravan",
		"Van",
		"Ramcharger",
		"Raider",
		"Conquest",
		"Dakota",
		"Shadow",
		"Spirit",
		"Dynasty",
		"Viper",
		"Stealth",
		"Avenger",
		"Intrepid",
		"Neon",
		"Stratus",
		"Durango",
		"Grand Caravan",
		"Ram",
		"Dakota (2000)",
		"Neon SRT-4",
		"Viper SRT-10",
		"Magnum",
		"Caliber",
		"Nitro",
		"Challenger (2008)",
		"Journey",
		"HD",
		"Chassis Cab",
		"Charger (2011)",
		"Dart (2012)",
		"Durango (2011)",
		"Avenger (2007)",
		"Challenger (2015)",
		"Charger (2015)",
		"Viper (2013)",
		"Challenger Hellcat",
		"Charger Hellcat",
		"Durango SRT",
		"Challenger Demon",
		"Charger Scat Pack",
		"Durango Hellcat",
		"Charger (2021)",
		"Challenger (2021)",
		"Durango (2021)",
		"1500 (2019)",
		"2500 (2019)",
		"3500 (2019)",
	],
	Ferrari: [
		"125 S",
		"166 Inter",
		"195 Inter",
		"212 Inter",
		"340 America",
		"342 America",
		"375 MM",
		"250 Europa",
		"375 America",
		"250 GT Europa",
		"250 GT Boano",
		"250 GT Ellena",
		"250 GT Berlinetta Tour de France",
		"250 GT Lusso",
		"250 GT Spyder California",
		"400 Superamerica",
		"500 Superfast",
		"275 GTB",
		"330 GT",
		"365 GT",
		"365 GTB/4 Daytona",
		"Dino 206 GT",
		"Dino 246 GT",
		"365 GTC",
		"365 GTS",
		"365 GT 2+2",
		"365 GTB/4 Daytona Competizione",
		"512 S",
		"365 GTC/4",
		"365 GT4 BB",
		"308 GTB",
		"308 GTS",
		"400 GT",
		"512 BB",
		"308 GT4",
		"512 BBi",
		"208 GTB",
		"208 GTS",
		"Mondial",
		"288 GTO",
		"Testarossa",
		"328 GTB",
		"328 GTS",
		"412",
		"348 TB",
		"348 TS",
		"Mondial T",
		"512 TR",
		"F40",
		"348 GT Competizione",
		"Mondial 3.2",
		"348 Spider",
		"F512 M",
		"456 GT",
		"F355",
		"F50",
		"456 GTA",
		"550 Maranello",
		"456M GT",
		"456M GTA",
		"360 Modena",
		"360 Spider",
		"550 Barchetta Pininfarina",
		"Enzo Ferrari",
		"575M Maranello",
		"575M Superamerica",
		"F430",
		"612 Scaglietti",
		"F430 Spider",
		"599 GTB Fiorano",
		"599 GTO",
		"430 Scuderia",
		"California",
		"458 Italia",
		"458 Spider",
		"F12berlinetta",
		"LaFerrari",
		"488 GTB",
		"488 Spider",
		"Portofino",
		"SF90 Stradale",
		"F8 Tributo",
		"Roma",
		"812 Superfast",
		"812 GTS",
		"SF90 Spider",
		"Daytona SP3",
	],
	Fiat: [
		"3½ HP",
		"6 HP",
		"8 HP",
		"10 HP",
		"12 HP",
		"24-32 HP",
		"18-24 HP",
		"28-40 HP",
		"15-20 HP",
		"505",
		"507",
		"Zero",
		"70",
		"501",
		"502",
		"503",
		"505",
		"510",
		"512",
		"514",
		"515",
		"525",
		"508 Balilla",
		"522",
		"524",
		"527",
		"1100",
		"2800",
		"518 Ardita",
		"527",
		"508 C Balilla",
		"527 S",
		"1100 Balilla",
		"1500",
		"500 Topolino",
		"1100 Musone",
		"2800 Coloniale",
		"1100 A",
		"508 L Balilla",
		"500 B Topolino",
		"1100 E",
		"508 C Nuova Balilla",
		"500 C Topolino",
		"1500 Coloniale",
		"1100 BLR",
		"2800 Torpedo",
		"500 D Topolino",
		"508 Balilla Sport",
		"600",
		"500 Giardiniera",
		"1100 BL",
		"1100 E Berlina",
		"1100 E Cabriolet",
		"1100 E Familiale",
		"1100 E Giardiniera",
		"1100 E Spider",
		"1100 S",
		"1400",
		"1900",
		"600 Multipla",
		"1200",
		"500 F",
		"1800",
		"500 N",
		"500 Jolly",
		"500 D",
		"1500 S",
		"500 F Berlina",
		"500 F Cabriolet",
		"1500 Cabriolet",
		"500 L",
		"500 R",
		"850",
		"124",
		"Dino",
		"128",
		"130",
		"X1/9",
		"131",
		"Ritmo",
		"Panda",
		"Argenta",
		"Uno",
		"Regata",
		"Croma",
		"Tipo",
		"Tempra",
		"Cinquecento",
		"Bravo",
		"Marea",
		"Barchetta",
		"Multipla",
		"Seicento",
		"Palio",
		"Siena",
		"Albea",
		"Stilo",
		"Panda (2003)",
		"Idea",
		"Grande Punto",
		"Nuova 500",
		"Bravo (2007)",
		"Linea",
		"Qubo",
		"Fiorino",
		"Doblo",
		"500 Abarth",
		"500L",
		"Freemont",
		"Viaggio",
		"Ottimo",
		"500X",
		"Tipo (2015)",
		"Fullback",
		"Argo",
		"Cronos",
		"Talento",
		"Centoventi",
	],
	Ford: [
		"Model A",
		"Model B",
		"Model C",
		"Model F",
		"Model K",
		"Model N",
		"Model R",
		"Model S",
		"Model T",
		"Model TT",
		"Model A (1927)",
		"Model AA",
		"Model AF",
		"Model B (1932)",
		"Model C (1934)",
		"Model CX",
		"Model 48",
		"Model 50",
		"Model 68",
		"Model 74",
		"Model 78",
		"Deluxe",
		"Super Deluxe",
		"Crestline",
		"Mainline",
		"Customline",
		"Fairlane",
		"Galaxie",
		"Starliner",
		"Skyliner",
		"Sunliner",
		"Ranchero",
		"Custom",
		"LTD",
		"Thunderbird",
		"Anglia",
		"Prefect",
		"Zephyr",
		"Consul",
		"Escort",
		"Capri",
		"Cortina",
		"Granada",
		"Fiesta",
		"Taunus",
		"Pinto",
		"Maverick",
		"Mustang",
		"Torino",
		"Elite",
		"LTD II",
		"Thunderbird (1977)",
		"Fairmont",
		"Granada (North America)",
		"Fiesta (1976)",
		"Mustang II",
		"LTD Crown Victoria",
		"Thunderbird (1980)",
		"Escort (North America)",
		"Tempo",
		"EXP",
		"Taurus",
		"Bronco II",
		"Aerostar",
		"Festiva",
		"Probe",
		"Explorer",
		"Ranger",
		"Crown Victoria",
		"Thunderbird (1989)",
		"Windstar",
		"Contour",
		"Escort (1991)",
		"Mustang (1993)",
		"Aspire",
		"Mondeo",
		"Taurus SHO",
		"Ranger (North America)",
		"Windstar (1995)",
		"Expedition",
		"F-Series",
		"Escort (1997)",
		"Puma",
		"Focus",
		"Cougar",
		"Fiesta (1999)",
		"Excursion",
		"Escape",
		"Thunderbird (2002)",
		"Explorer Sport Trac",
		"Mondeo (2000)",
		"Transit Connect",
		"GT",
		"Freestar",
		"Five Hundred",
		"Fusion",
		"Mustang (2005)",
		"Taurus X",
		"Edge",
		"Flex",
		"Fiesta (2008)",
		"F-150",
		"Focus (2011)",
		"C-Max",
		"Transit",
		"Everest",
		"Mustang (2015)",
		"GT (2017)",
		"EcoSport",
		"Fiesta (2017)",
		"Focus (2018)",
		"Ranger (2019)",
		"Mustang (2018)",
		"Explorer (2020)",
		"Escape (2020)",
		"Bronco",
		"Mustang Mach-E",
		"F-150 (2021)",
		"Maverick (2022)",
	],
	Genesis: [
		"G80",
		"G90",
		"G70",
		"GV80",
		"GV70",
		"G80 Sport",
		"Essentia",
		"Mint",
		"GV60",
		"GV90",
	],
	GMC: [
		"Suburban",
		"Jimmy",
		"Yukon",
		"Envoy",
		"Safari",
		"Vandura",
		"S-15 Jimmy",
		"Syclone",
		"Typhoon",
		"Sierra",
		"Sonoma",
		"Savana",
		"Sierra HD",
		"Yukon XL",
		"Envoy XL",
		"Envoy XUV",
		"Canyon",
		"Acadia",
		"Terrain",
		"Sierra 1500",
		"Sierra 2500HD",
		"Sierra 3500HD",
		"Savana Cargo",
		"Savana Passenger",
		"Yukon (2021)",
		"Yukon XL (2021)",
		"Canyon (2021)",
		"Sierra 1500 (2021)",
		"Sierra 2500HD (2021)",
		"Sierra 3500HD (2021)",
		"Terrain (2021)",
		"Acadia (2021)",
		"Hummer EV",
		"Sierra Electric",
		"Sierra 1500 Limited (2022)",
	],
	Honda: [
		"T360",
		"S500",
		"S600",
		"S800",
		"1300",
		"600",
		"Z600",
		"N360",
		"N600",
		"Life",
		"Civic",
		"Accord",
		"Prelude",
		"CR-X",
		"Ballade",
		"Quint",
		"Vigor",
		"Ascot",
		"Integra",
		"Concerto",
		"NSX",
		"CR-V",
		"Odyssey",
		"HR-V",
		"Logo",
		"Capa",
		"Fit",
		"City",
		"Stream",
		"Element",
		"S2000",
		"Insight",
		"Pilot",
		"Ridgeline",
		"CR-Z",
		"Freed",
		"Vamos",
		"Zest",
		"Acty",
		"Airwave",
		"Mobilio",
		"Jade",
		"N-One",
		"N-Box",
		"S660",
		"Shuttle",
		"HR-V (2014)",
		"Fit (2013)",
		"Odyssey (2014)",
		"Vezel",
		"Legend",
		"Fit Shuttle",
		"BR-V",
		"Avancier",
		"CR-V (2017)",
		"Civic Type R",
		"Clarity",
		"N-Van",
		"Acty Truck",
		"Ridgeline (2017)",
		"Fit (2020)",
		"Jazz",
		"City (2020)",
		"Fit e:HEV",
		"Fit Shuttle (2021)",
		"Odyssey (2021)",
		"HR-V (2021)",
		"Civic (2022)",
		"CR-V (2022)",
		"HR-V e:HEV",
		"Civic Type R Limited Edition",
		"Clarity (2022)",
		"NSX Type S",
	],
	Hyundai: [
		"Pony",
		"Stellar",
		"Excel",
		"Sonata",
		"Scoupe",
		"Elantra",
		"Tiburon",
		"Accent",
		"Atos",
		"Coupe",
		"Santa Fe",
		"Trajet",
		"XG",
		"Terracan",
		"Getz",
		"Matrix",
		"Equus",
		"Genesis",
		"i10",
		"i20",
		"i30",
		"Azera",
		"Veracruz",
		"i40",
		"Veloster",
		"Elantra GT",
		"Grand Santa Fe",
		"Genesis Coupe",
		"iLoad",
		"iMax",
		"ix20",
		"ix35",
		"ix55",
		"Sonata Hybrid",
		"Accent (2011)",
		"Accent (2018)",
		"Azera (2012)",
		"Azera (2018)",
		"Elantra (2011)",
		"Elantra (2019)",
		"Elantra GT (2013)",
		"Elantra GT (2018)",
		"Genesis (2015)",
		"Genesis (2019)",
		"Genesis Coupe (2013)",
		"Ioniq",
		"Kona",
		"Nexo",
		"Palisade",
		"Santa Cruz",
		"Venue",
		"Prophecy",
		"45",
		"Bayon",
		"Tucson (2021)",
		"Ioniq 5",
		"Santa Fe (2021)",
		"Kona (2021)",
		"Tucson (2022)",
		"Ioniq 6",
		"Ioniq 7",
		"Ioniq 8",
	],
	Infiniti: [
		"Q45",
		"M30",
		"G20",
		"J30",
		"I30",
		"QX4",
		"G35",
		"FX35",
		"QX56",
		"M45",
		"EX35",
		"G37",
		"FX50",
		"G25",
		"QX60",
		"Q70",
		"Q50",
		"Q60",
		"QX80",
		"QX50",
		"QX30",
		"QX60 Hybrid",
		"QX Sport Inspiration",
		"Q60 Project Black S",
	],
	Jaguar: [
		"SS 2½-litre",
		"SS 100",
		"Mark IV",
		"XK120",
		"XK140",
		"XK150",
		"Mark VII",
		"Mark VIII",
		"Mark IX",
		"Mark 1",
		"Mark 2",
		"E-Type",
		"S-Type",
		"420",
		"XJ6",
		"XJ12",
		"XJ Series III",
		"XJ40",
		"XJ220",
		"XJ",
		"XK",
		"X-Type",
		"XKR",
		"XF",
		"XFR",
		"XK8",
		"XKR-S",
		"F-Type",
		"XE",
		"F-Pace",
		"I-Pace",
		"XJ (2019)",
		"XF (2021)",
		"F-Pace (2021)",
		"E-Pace",
		"XJ (2021)",
	],
	Jeep: [
		"Willys MB",
		"CJ-2A",
		"CJ-3A",
		"CJ-3B",
		"CJ-5",
		"CJ-6",
		"CJ-7",
		"CJ-8 Scrambler",
		"DJ",
		"Wagoneer",
		"Gladiator",
		"Cherokee (SJ)",
		"J10/J20",
		"Cherokee (XJ)",
		"Comanche",
		"Wrangler (YJ)",
		"Grand Wagoneer",
		"Wrangler (TJ)",
		"Grand Cherokee (ZJ)",
		"Cherokee (XJ) (1997)",
		"Wrangler (JK)",
		"Commander (XK)",
		"Compass",
		"Patriot",
		"Liberty",
		"Grand Cherokee (WK)",
		"Wrangler Unlimited (JK)",
		"Wrangler (JL)",
		"Grand Cherokee (WK2)",
		"Cherokee (KL)",
		"Renegade",
		"Compass (2017)",
		"Wrangler Unlimited (JL)",
		"Grand Cherokee (WK2) (2017)",
		"Wrangler (JL) (2018)",
		"Gladiator (JT)",
		"Renegade (2019)",
		"Compass (2021)",
		"Grand Cherokee (WK2) (2021)",
		"Wrangler Unlimited (JL) (2021)",
		"Grand Cherokee L (WL)",
		"Grand Wagoneer (WS)",
		"Wrangler (JL) (2022)",
		"Grand Cherokee (WK3)",
		"Grand Cherokee 4xe",
	],
	Kia: [
		"Brisa",
		"K-360",
		"Titan",
		"1000",
		"Bongo",
		"Capital",
		"Pride",
		"Concord",
		"Potentia",
		"Sportage",
		"Sephia",
		"Elan",
		"Credos",
		"Clarus",
		"Avella",
		"Spectra",
		"Carens",
		"Opirus",
		"Sorento",
		"Magentis",
		"Rio",
		"Carnival",
		"Optima",
		"Picanto",
		"Mohave/Borrego",
		"Forte",
		"Venga",
		"Quoris",
		"Niro",
		"Stinger",
		"Stonic",
		"Telluride",
		"K5",
		"Seltos",
		"K900",
		"EV6",
		"Sportage (2021)",
		"Carnival (2022)",
		"Niro EV",
		"Sorento (2021)",
		"Soul (2021)",
		"K3 (2022)",
		"Ceed",
		"Sportage PHEV",
		"EV9",
		"Seltos (2022)",
		"Sorento PHEV",
		"Soul EV (2022)",
		"Telluride (2022)",
	],
	Lamborghini: [
		"350 GT",
		"400 GT",
		"Miura",
		"Espada",
		"Islero",
		"Jarama",
		"Urraco",
		"Countach",
		"Jalpa",
		"LM002",
		"Diablo",
		"Murciélago",
		"Gallardo",
		"Reventón",
		"Aventador",
		"Huracán",
		"Centenario",
		"Sián",
		"Urus",
	],
	"Land Rover": [
		"Series I",
		"Series II",
		"Series III",
		"Defender",
		"Range Rover (Classic)",
		"Discovery (Series I)",
		"Range Rover (P38A)",
		"Freelander",
		"Discovery (Series II)",
		"Range Rover (L322)",
		"Range Rover Sport",
		"LR2/Freelander 2",
		"LR3/Discovery 3",
		"Range Rover (L322) (2010)",
		"Range Rover Evoque",
		"LR4/Discovery 4",
		"Range Rover (L405)",
		"Discovery Sport",
		"Range Rover Evoque (2019)",
		"Range Rover Velar",
		"Defender (2020)",
		"Range Rover (L460)",
		"Discovery (2021)",
		"Defender 90 (2021)",
		"Defender 110 (2021)",
	],
	Lexus: [
		"LS 400",
		"ES 250",
		"ES 300",
		"SC 300/400",
		"GS 300",
		"LS 300",
		"LX 450",
		"LX 470",
		"RX 300",
		"IS 200/300",
		"SC 430",
		"LS 430",
		"GX 470",
		"RX 330",
		"ES 330",
		"LX 570",
		"RX 400h",
		"IS 250/350",
		"GS 450h",
		"LS 460",
		"GS 460",
		"RX 350",
		"ES 350",
		"IS F",
		"LS 600h",
		"HS 250h",
		"RX 450h",
		"CT 200h",
		"GX 460",
		"LFA",
		"ES 300h",
		"LS 460L",
		"GS 350",
		"IS C",
		"RX 350 (2013)",
		"IS (2014)",
		"NX 200t/300h",
		"RC 350/RC F",
		"GS F",
		"RX 450h (2016)",
		"LX 570 (2016)",
		"LC 500",
		"LS 500",
		"LS 500h",
		"RX 350L/RX 450hL",
		"UX 200/UX 250h",
		"ES (2018)",
		"LS (2018)",
		"UX (2019)",
		"RX (2020)",
		"GX (2020)",
		"IS (2021)",
		"LS (2021)",
		"NX (2022)",
		"LX (2022)",
		"ES (2023)",
		"RX (2023)",
		"LX (2023)",
	],
	Lincoln: [
		"Zephyr",
		"Continental",
		"Capri",
		"Premiere",
		"Mark II",
		"Versailles",
		"Town Car",
		"Continental Mark III",
		"Continental Mark IV",
		"Continental Mark V",
		"Continental Mark VI",
		"Continental Mark VII",
		"Continental Mark VIII",
		"Mark LT",
		"Navigator",
		"LS",
		"Aviator",
		"Blackwood",
		"MKX",
		"Zephyr/MKZ",
		"MKS",
		"MKT",
		"MKC",
		"Navigator L",
		"MKS (2013)",
		"MKC (2015)",
		"MKX (2016)",
		"Continental (2017)",
		"Navigator (2018)",
		"Nautilus",
		"Aviator (2020)",
		"Corsair",
		"Navigator (2020)",
		"Nautilus (2021)",
		"Aviator (2021)",
		"Corsair (2021)",
		"Navigator L (2021)",
		"Zephyr (2021)",
		"Continental (2022)",
		"Aviator (2022)",
		"Corsair (2022)",
		"Nautilus (2022)",
		"Navigator (2022)",
	],
	Lotus: [
		"Seven",
		"Elite",
		"Elan",
		"Europa",
		"Elan Plus 2",
		"Eclat",
		"Esprit",
		"Excel",
		"Elan M100",
		"Carlton",
		"Omega",
		"Elise",
		"Exige",
		"Europa S",
		"Evora",
		"3-Eleven",
		"Evija",
	],
	Maserati: [
		"3500 GT",
		"Sebring",
		"Mistral",
		"Ghibli",
		"Bora",
		"Indy",
		"Khamsin",
		"Merak",
		"Quattroporte",
		"Kyalami",
		"Biturbo",
		"228",
		"430",
		"Karif",
		"Shamal",
		"Ghibli II",
		"Quattroporte IV",
		"Spyder",
		"3200 GT",
		"Coupe",
		"Quattroporte V",
		"GranSport",
		"MC12",
		"Quattroporte (2003)",
		"GranTurismo",
		"Quattroporte (2004)",
		"GranTurismo Convertible",
		"Quattroporte (2008)",
		"GranCabrio",
		"Levante",
		"Alfieri",
		"Grecale",
	],
	Mazda: [
		"R360",
		"Carol",
		"Familia",
		"Luce",
		"Capella",
		"Savanna",
		"RX-7",
		"RX-8",
		"Cosmo",
		"626",
		"MX-6",
		"323",
		"929",
		"MPV",
		"MX-3",
		"MX-5 Miata",
		"Millenia",
		"Demio",
		"Premacy",
		"Mazda6",
		"RX-8 (2003)",
		"RX-7 (2017)",
		"MX-5 Miata (2016)",
		"CX-9",
		"CX-7",
		"CX-5",
		"MX-5 Miata (2019)",
		"Mazda3",
		"Mazda2",
		"Mazda5",
		"MX-5 Miata (2022)",
		"CX-30",
		"MX-30",
		"Mazda3 (2021)",
		"CX-5 (2022)",
		"MX-5 Miata (2023)",
	],
	McLaren: [
		"F1",
		"MP4-12C",
		"650S",
		"P1",
		"570S",
		"540C",
		"675LT",
		"720S",
		"Speedtail",
		"GT",
		"Elva",
		"Sabre",
		"Artura",
	],
	"Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLC", "GLE"],
	MINI: [
		"Cooper",
		"Cooper S",
		"Cooper Convertible",
		"Cooper S Convertible",
		"Cooper Clubman",
		"Cooper S Clubman",
		"Cooper Countryman",
		"Cooper S Countryman",
		"Cooper Coupe",
		"Cooper Roadster",
		"John Cooper Works",
		"Cooper Paceman",
		"Cooper Hardtop (2014)",
		"Cooper 5-Door (2015)",
		"Cooper Convertible (2016)",
		"John Cooper Works Convertible (2016)",
		"Countryman (2017)",
		"John Cooper Works Countryman (2017)",
		"Cooper Hardtop (2018)",
		"John Cooper Works Hardtop (2018)",
		"Cooper Convertible (2019)",
		"John Cooper Works Convertible (2019)",
		"Clubman (2020)",
		"John Cooper Works Clubman (2020)",
		"Countryman (2021)",
		"John Cooper Works Countryman (2021)",
		"Cooper Hardtop (2022)",
		"John Cooper Works Hardtop (2022)",
		"Electric",
		"Cooper SE Countryman ALL4",
		"Cooper SE Hardtop",
		"Pacesetter",
		"Urbanaut",
	],
	Mitsubishi: [
		"Model A",
		"PX33",
		"A6M Zero",
		"500",
		"Jeep",
		"360",
		"Colt 600",
		"Colt 1000",
		"500",
		"Minica",
		"360",
		"1100",
		"500",
		"Colt 1100",
		"360 Pickup",
		"Colt 1500",
		"Galant",
		"Lancer",
		"Celeste",
		"Galant Sigma",
		"Lancer Celeste",
		"Cordia",
		"Tredia",
		"Starion",
		"Pajero",
		"Montero",
		"Eclipse",
		"Mirage",
		"3000GT",
		"Diamante",
		"FTO",
		"Chariot",
		"Montero Sport",
		"Lancer Evolution",
		"Carisma",
		"Space Star",
		"Airtrek",
		"Outlander",
		"Eclipse Cross",
		"Xpander",
		"i-MiEV",
		"Minicab",
		"Delica",
		"Montero/Pajero (2021)",
		"Outlander (2022)",
		"Eclipse Cross (2022)",
	],
	Nissan: [
		"Model 70",
		"Datsun Type 15",
		"Datsun Type 16",
		"Datsun Type 17",
		"Datsun Type 11",
		"Datsun Type 21",
		"Datsun Type 31",
		"Datsun Type 41",
		"Datsun Type 51",
		"Datsun Type 70",
		"Datsun Type 80",
		"Datsun Type 90",
		"Datsun Type 91",
		"Datsun Type 92",
		"Datsun Type 93",
		"Datsun Type 94",
		"Datsun Type 95",
		"Datsun Type 96",
		"Datsun Type 97",
		"Datsun Type 98",
		"Datsun Type 99",
		"Datsun Type 100",
		"Patrol",
		"Skyline",
		"Bluebird",
		"Sunny",
		"Cedric",
		"Fairlady Z",
		"Laurel",
		"Cherry",
		"Silvia",
		"Vanette",
		"Pulsar",
		"Maxima",
		"Stanza",
		"240SX",
		"300ZX",
		"Sentra",
		"Altima",
		"Pathfinder",
		"Quest",
		"350Z",
		"Armada",
		"Murano",
		"Titan",
		"Xterra",
		"Versa",
		"GT-R",
		"Rogue",
		"Cube",
		"Juke",
		"Leaf",
		"NV200",
		"370Z",
		"Maxima (2016)",
		"Rogue (2021)",
		"Kicks",
		"Altima (2019)",
		"Armada (2021)",
		"Sentra (2020)",
		"Titan (2020)",
		"Z Proto",
		"Ariya",
		"Rogue (2022)",
		"Pathfinder (2022)",
		"Frontier (2022)",
		"Z (2022)",
	],
	Porsche: [
		"356",
		"550 Spyder",
		"911 (original)",
		"912",
		"911 Carrera RS",
		"914",
		"911 Turbo (930)",
		"924",
		"928",
		"911 Carrera (964)",
		"968",
		"911 Carrera (993)",
		"Boxster (986)",
		"911 Carrera (996)",
		"Cayenne",
		"Carrera GT",
		"911 Carrera (997)",
		"911 Carrera (991)",
		"Panamera",
		"918 Spyder",
		"Macan",
		"718 Boxster",
		"718 Cayman",
		"Taycan",
		"911 Carrera (992)",
		"Cayenne Coupe",
		"911 Speedster",
		"Taycan Cross Turismo",
		"911 GT3 (992)",
		"911 GT3 Touring (992)",
		"718 Cayman GT4",
		"718 Boxster Spyder",
		"Cayenne GTS (2020)",
		"911 Turbo (992)",
		"911 Turbo S (992)",
		"Taycan GTS",
		"911 GT3 RS (992)",
	],
	Ram: [
		"Dodge Ram",
		"1500",
		"2500",
		"3500",
		"4500",
		"5500",
		"ProMaster",
		"ProMaster City",
		"1500 Classic",
		"1500 TRX",
		"ProMaster City (2022)",
		"1500 (2022)",
		"ProMaster (2023)",
	],
	Rivian: ["R1T", "R1S"],
	"Rolls-Royce": [
		"10 hp",
		"15 hp",
		"20 hp",
		"30 hp",
		"V-8",
		"Silver Ghost",
		"Phantom I",
		"Phantom II",
		"20/25",
		"Phantom III",
		"Wraith",
		"Silver Wraith",
		"Silver Dawn",
		"Phantom IV",
		"Silver Cloud",
		"Silver Cloud II",
		"Silver Cloud III",
		"Phantom V",
		"Silver Shadow",
		"Silver Shadow II",
		"Silver Wraith II",
		"Camargue",
		"Silver Spirit",
		"Silver Spur",
		"Corniche",
		"Silver Spirit II",
		"Silver Spur II",
		"Corniche II",
		"Silver Spirit III",
		"Silver Spur III",
		"Corniche III",
		"Silver Spirit IV",
		"Silver Spur IV",
		"Corniche IV",
		"Silver Seraph",
		"Corniche V",
		"Phantom VI",
		"Park Ward",
		"Silver Dawn (2018)",
		"Phantom (2018)",
		"Cullinan",
		"Ghost",
		"Phantom (2020)",
		"Ghost (2020)",
		"Wraith (2020)",
		"Dawn (2020)",
		"Ghost (2021)",
		"Phantom (2021)",
		"Wraith (2021)",
		"Dawn (2021)",
		"Spectre (2023)",
	],
	Subaru: [
		"1500",
		"360",
		"R-2",
		"Sambar",
		"1000",
		"FF-1 Star",
		"Leone",
		"BRAT",
		"XT",
		"Legacy",
		"Impreza",
		"SVX",
		"Alcyone",
		"Justy",
		"Vivio",
		"Traviq",
		"Baja",
		"Outback",
		"Forester",
		"Tribeca",
		"WRX",
		"Crosstrek",
		"XV",
		"BRZ",
		"Levorg",
		"WRX STI",
		"Ascent",
		"Legacy (2020)",
		"Outback (2020)",
		"Forester (2020)",
		"Crosstrek (2020)",
		"Impreza (2020)",
		"WRX (2020)",
		"BRZ (2021)",
		"Crosstrek (2021)",
		"Outback (2021)",
		"Ascent (2021)",
		"Impreza (2021)",
		"Forester (2021)",
		"WRX (2021)",
		"Legacy (2021)",
		"Outback Wilderness",
		"WRX STI (2022)",
		"Solterra",
		"WRX (2022)",
		"Outback (2022)",
		"Forester (2022)",
		"Ascent (2022)",
		"Impreza (2022)",
		"Crosstrek (2022)",
	],
	Tesla: [
		"Roadster (First Generation)",
		"Model S",
		"Model X",
		"Model 3",
		"Model Y",
		"Cybertruck",
		"Semi",
		"Roadster (2022)",
	],
	Toyota: [
		"AA",
		"AB",
		"AC",
		"AE",
		"BA",
		"BJ",
		"SA",
		"Crown",
		"Land Cruiser",
		"Celica",
		"Publica",
		"2000GT",
		"Corolla",
		"Carina",
		"Corolla (E30)",
		"Corolla (E70)",
		"Celica Supra",
		"Starlet",
		"Tercel",
		"MR2",
		"Hilux",
		"Cressida",
		"Land Cruiser (J70)",
		"Supra",
		"Previa/Estima",
		"RAV4",
		"Avalon",
		"Camry",
		"Tacoma",
		"4Runner",
		"Paseo",
		"Land Cruiser (J100)",
		"Prius",
		"Sequoia",
		"Highlander",
		"Sienna",
		"Echo",
		"Matrix",
		"Prius c",
		"Prius v",
		"FJ Cruiser",
		"Venza",
		"86",
		"Prius Prime",
		"C-HR",
		"Supra",
		"Corolla (E210)",
		"RAV4 Prime",
		"Mirai",
		"GR Yaris",
		"Sienna",
		"Land Cruiser",
		"Corolla Cross",
		"bZ4X",
		"Tundra",
	],
	Volkswagen: [
		"Beetle",
		"Type 2 (Microbus)",
		"Karmann Ghia",
		"Type 3",
		"411",
		"412",
		"Golf (Rabbit)",
		"Passat",
		"Scirocco",
		"Polo",
		"Jetta",
		"Derby",
		"Santana",
		"Golf GTI",
		"Golf Country",
		"Golf Cabriolet",
		"Golf (Mark 3)",
		"Vento",
		"Corrado",
		"EuroVan",
		"Golf (Mark 4)",
		"New Beetle",
		"Lupo",
		"Passat (B5)",
		"Polo (Mark 4)",
		"Golf (Mark 5)",
		"Passat (B6)",
		"Tiguan",
		"Scirocco (Third Generation)",
		"Golf (Mark 6)",
		"Jetta (A6)",
		"Beetle (A5)",
		"Polo (Mark 5)",
		"Up!",
		"Golf (Mark 7)",
		"Passat (B8)",
		"Touran",
		"Tiguan (Second Generation)",
		"Arteon",
		"Atlas",
		"T-Roc",
		"Polo (Sixth Generation)",
		"Jetta (A7)",
		"Touareg (Third Generation)",
		"ID.3",
		"ID.4",
		"Golf (Mark 8)",
		"Tiguan (Third Generation)",
		"Taigo",
		"Multivan",
		"Amarok",
		"ID. Buzz",
		"ID.5",
		"Atlas Cross Sport",
		"Golf R (Mark 8)",
	],
	Volvo: [
		"ÖV4",
		"PV4",
		"PV650 Series",
		"TR671-679",
		"PV800 Series",
		"PV36 Carioca",
		"PV51",
		"PV60",
		"PV800",
		"PV444",
		"PV60-1",
		"Duett",
		"Amazon",
		"P1800",
		"140 Series",
		"164",
		"66",
		"240 Series",
		"260 Series",
		"340",
		"360",
		"480",
		"740",
		"760",
		"780",
		"850",
		"S40",
		"V40",
		"S70",
		"V70",
		"C70",
		"S80",
		"V90",
		"C30",
		"S60",
		"V60",
		"XC60",
		"XC70",
		"S90",
		"V90 Cross Country",
		"XC90",
		"XC40",
		"S60 (2019)",
		"V60 (2019)",
		"S90 (2019)",
		"V90 (2019)",
		"XC60 (2019)",
		"XC40 (2018)",
		"S60 (2020)",
		"V60 (2020)",
		"S90 (2020)",
		"V90 (2020)",
		"XC40 (2020)",
		"XC60 (2020)",
		"XC90 (2020)",
		"S60 Recharge (2020)",
		"V60 Recharge (2020)",
		"S90 Recharge (2020)",
		"V90 Recharge (2020)",
		"XC40 Recharge (2020)",
		"XC60 Recharge (2020)",
		"XC90 Recharge (2020)",
		"C40 Recharge",
		"S60 Recharge (2022)",
		"V60 Recharge (2022)",
		"S90 Recharge (2022)",
		"V90 Recharge (2022)",
		"XC40 Recharge (2022)",
		"XC60 Recharge (2022)",
		"XC90 Recharge (2022)",
	],
};
export default carsData;

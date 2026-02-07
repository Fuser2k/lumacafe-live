export const menuPages = [
    {
        id: 'food_page',
        title: 'Food Menu',
        columns: [
            // Page 1: Breakfast
            [
                {
                    type: 'section',
                    title: 'FRÜHSTÜCK',
                    subtitle: 'TÄGLICH BIS 11:00 UHR',
                    color: '#3BB6D8', // Turquoise
                    items: [
                        { name: 'START UP', price: '4,40', desc: '1 Handsemmel, Butter, weiches Ei' },
                        { name: 'DIE SÜSSE', price: '6,40', desc: '2 Handsemmeln, Butter, Marmelade, Nutella' },
                        { name: 'DAS WIENER', price: '9,40', desc: '2 Handsemmeln, Butter, Schinken, Salami, Käse, weiches Ei' },
                        { name: 'HAM & EGGS', price: '6,90', desc: '1 Handsemmel, 2 Eier, Schinken' },
                        { name: 'SCHINKEN TOAST', price: '4,40', desc: 'dazu Chips und Ketchup' },
                        { name: 'KÄSE TOAST', price: '4,40', desc: 'dazu Chips und Ketchup' },
                        { name: 'SCHINKEN-KÄSE TOAST', price: '4,90', desc: 'dazu Chips und Ketchup' }
                    ]
                },
                {
                    type: 'promo_box',
                    text: 'morgens heiß & günstig',
                    subtext: 'jede Tasse nur',
                    price: '€2.90 bis 11:00 Uhr',
                    color: '#008b8b' // Teal/Darker Turquoise
                }
            ],
            // Page 2: Fingerfood
            [
                {
                    type: 'section',
                    title: 'FINGERFOOD',
                    color: '#FFD83A', // Yellow/Orange
                    items: [
                        { name: 'POMMES', price: '4,90', desc: 'knusprige Pommes mit Ketchup' },
                        { name: 'POMMES ROT WEISS', price: '5,90', desc: 'knusprige Pommes mit Ketchup und Mayo' },
                        { name: 'KAS POMMES', price: '6,90', desc: 'knusprige Pommes mit Cheddar Sauce' },
                        { name: 'SPECK POMMES', price: '7,90', desc: 'knusprige Pommes mit Cheddar Sauce und gegrillten Speckwürfeln', isNew: true },
                        { name: 'HÜHNERFILETSPITZEN', price: '9,90', desc: '3 Stk. in Cornflakespanade, mit kleinen knusprigen Pommes und Ketchup' },
                        { name: 'CHICKEN WINGS', price: '9,90', desc: '4 Stk. mit kleinen knusprigen Pommes und Ketchup' },
                        { name: 'GOLDEN NUGGETS', price: '9,90', desc: '5 Stk. in Knusperpanade mit kleinen Pommes und Ketchup', isNew: true },
                        { name: 'FRANKFURTER', price: '5,90', desc: '1 Paar Frankfurter mit Gebäck und Ketchup' },
                        { name: 'HOT DOG', price: '6.90', desc: 'Hot Dog - im frischen Brot vom Bäcker, mit Ketchup' },
                        { name: 'HÜHNERSCHNITZEL SEMMEL', price: '5,90', desc: 'Schnitzel, Semmel, Salat, Tomate und Ketchup' },
                        { name: 'SCHINKEN TOAST', price: '4,90', desc: 'dazu Chips und Ketchup' },
                        { name: 'KÄSE TOAST', price: '4,90', desc: 'dazu Chips und Ketchup' },
                        { name: 'SCHINKEN-KÄSE TOAST', price: '5,40', desc: 'dazu Chips und Ketchup' }
                    ]
                }
            ],
            // Page 3: Coffee, Tea, Sweets
            [
                {
                    type: 'section',
                    title: 'KAFFEE & TEE',
                    subtitle: 'von Hausbrandt Trieste 1892!',
                    color: '#3BB6D8',
                    items: [
                        { name: 'ESPRESSO klein | groß', price: '3.50 | 4.60' },
                        { name: 'BRAUN klein | groß', price: '3.70 | 4.80' },
                        { name: 'VERLÄNGERT schwarz | braun', price: '3.90 | 4.40' },
                        { name: 'CAPPUCCINO | MELANGE', price: '4.50 | 4.50' },
                        { name: 'MACCHIATO espresso | latte', price: '3.90 | 4.90' },
                        { name: 'TRINKSCHOKOLADE mit Schlag', price: '4,40' },
                        { name: 'EIS KAFFEE', price: '6,90', desc: 'Espresso, Milch, Vanilleeis vom Eis-Greissler, Schlag' },
                        { name: 'AFFOGATO', price: '4,90', desc: 'Espresso mit einer Kugel Vanilleeis vom Eis-Greissler' },
                        { name: 'TEE IN DER KANNE', price: '4,90', desc: 'Tee wie von der Plantage - einfach nachfragen' }
                    ]
                },
                {
                    type: 'section',
                    title: 'SWEEET!',
                    color: '#FFD83A',
                    items: [
                        { name: 'GEFÜLLTE MANDARINE', price: '5,90', desc: 'frische Mandarine mit Mandarinen Sorbe gefüllt' },
                        { name: 'CANNOLO SICILIANO', price: '5,90', desc: 'gefülltes Gebäck aus Sizilien, Füllung aus Ricotta, Schokoladenstückchen und kandierten Früchten' },
                        { name: 'TORTE', price: '4,90', desc: 'Täglich frische Torte, vom Bäcker - jeden Tag eine andere' }
                    ]
                }
            ],
            // Page 4: Burgers & Starters
            [
                {
                    type: 'section',
                    title: 'GUTE BURGER',
                    subtitle: '100% Rindfleisch aus Österreich & Brot vom Bäcker aus der Region',
                    color: '#3BB6D8',
                    items: [
                        { name: 'HAMBURGER', price: '10,90', desc: '150gr. Rindfleisch, Salat, Tomate, Cocktailsauce' },
                        { name: 'CHEESEBURGER', price: '11,90', desc: '150gr. Rindfleisch, Cheddar Käse, Salat, Tomate, Cocktailsauce' },
                        { name: 'SPECKBURGER', price: '12,90', desc: '150gr. Rindfleisch, Bacon-Würfel, Cheddar Käse, Salat, Tomate, Cocktailsauce' },
                        { name: 'CHICKENBURGER', price: '12,90', desc: '130gr. knuspriges Chicken, Salat, Tomate, Sour Cream Sauce', isNew: true },
                        { name: 'ORIENTBURGER', price: '12,90', desc: 'Falafel hausgemacht, Hummus, Salat, Tomate' }
                    ]
                },
                {
                    type: 'section',
                    title: 'VORSPEISE',
                    subtitle: 'mit Gebäck',
                    color: '#FFD83A',
                    items: [
                        { name: 'BURRATA E POMODORO', price: '9,90', desc: 'Burrata, Rucola, gelbe und rote Cherry Tomaten, Balsamico' },
                        { name: 'PIATTO DELLA CASA', price: '10,90', desc: 'italienische Wurstvariationen, gegrilltes Gemüse, Oliven' }
                    ]
                },
                {
                    type: 'section',
                    title: 'SALAT',
                    subtitle: 'mit Gebäck, Balsamico- oder Essig & Öl',
                    color: '#3BB6D8',
                    items: [
                        { name: 'SALATTELLER', price: '8,90', desc: 'gemischt' },
                        { name: 'THUNFISCH SALAT mit Oliven und Zwiebel', price: '10,90' },
                        { name: 'CESAR SALAT', price: '11,90', desc: 'mit gebratenem Huhn, Croutons, Grana und Blattsalat' },
                        { name: 'BACKHENDEL SALAT', price: '10,90', desc: 'Huhn gebacken, Kartoffelsalat, Kürbiskernöl und Kerne' }
                    ]
                }
            ],
            // Page 5: Pasta & Classics
            [
                {
                    type: 'section',
                    title: 'PASTA',
                    subtitle: 'Frisch zubereitet, perfekt serviert. AUCH KLEIN MÖGLICH -2.00 EURO',
                    color: '#3BB6D8',
                    items: [
                        { name: 'SPAGHETTI NAPOLI mit Tomatensauce', price: '10,90' },
                        { name: 'SPAGHETTI E PESTO mit Basilikum Pesto', price: '11,90' },
                        { name: 'SPAGHETTI BOLOGNESE', price: '12,90', desc: 'vom Rind & Schwein gemischt nach Oma\'s Rezept mit Tomatensauce' },
                        { name: 'SPAGHETTI ORTELANO', price: '12,90', desc: 'mit Grillgemüse und Tomatensauce' },
                        { name: 'SPAGHETTI TONNO', price: '12,90', desc: 'mit Thunfisch, Tomatensauce, Paprika, Oliven' }
                    ]
                },
                {
                    type: 'section',
                    title: 'KLASSIKER',
                    subtitle: 'Ohne wär\'s kein richtiger Badetag',
                    color: '#FFD83A',
                    items: [
                        { name: 'BERNERWÜRSTEL', price: '12,90', desc: 'mit Pommes, Ketchup und Senf' },
                        { name: 'CEVAPCICI', price: '13,90', desc: '4 Stk. mit Pommes, Ketchup und BBQ-Honig-Senf' },
                        { name: 'SCHWEINSCHNITZEL', price: '13,90', desc: 'mit Pommes, Salat und Ketchup' },
                        { name: 'HÜHNERSCHNITZEL', price: '13,90', desc: 'mit Pommes, Salat und Ketchup' },
                        { name: 'KABELJAU', price: '15,90', desc: 'gebacken mit Kartoffelsalat, Salat dazu Sauce Tartare' },
                        { name: 'FALAFEL BOWL', price: '12,90', desc: 'mit Reis, Salat, Hummus' },
                        { name: 'HALOUMI BOWL', price: '13,90', desc: 'Ziegenkäse gegrillt, mit Reis, Salat, Hummus' },
                        { name: 'KINDERSCHNITZEL', price: '9,90', desc: 'vom Huhn mit Pommes, Salat und Ketchup' }
                    ]
                }
            ],
            // Page 6: Pinsa
            [
                {
                    type: 'section',
                    title: 'PINSA',
                    subtitle: 'Unser frischer Pinsateig, wird nach original römischem Rezept hergestellt',
                    color: '#3BB6D8', // Turq box
                    items: [
                        { name: 'MARINARA', price: '8,90', desc: 'Tomatensauce, Oregano, Knoblauch, ohne Käse' },
                        { name: 'NUVO', price: '10,90', desc: 'Tomatensauce, Oregano, Knoblauch, getrocknete gelbe und rote Cherry Tomaten, ohne Käse', isNew: true },
                        { name: 'MARGAREHTE', price: '10,90', desc: 'Tomatensauce, Mozzarella und Basilikum' },
                        { name: 'GARTENFEST', price: '12,90', desc: 'Tomatensauce, Mozzarella, Cherry Tomate und Grillgemüse' },
                        { name: 'IL CLASICO', price: '11,90', desc: 'Tomatensauce, Mozzarella und Schinken' },
                        { name: 'CARDINALE', price: '12,90', desc: 'Tomatensauce, Mozzarella, Schinken und Mais' },
                        { name: 'SALAMI DOLCE', price: '12,90', desc: 'Tomatensauce, Mozzarella und milde Salami' },
                        { name: 'RIO MARE', price: '12,90', desc: 'Tomatensauce, Mozzarella, Thunfisch, Oliven, rote Zwiebel' },
                        { name: 'VESUV', price: '12,90', desc: 'Tomatensauce, Mozzarella und scharfer Salami' },
                        { name: 'INFERNO', price: '13,90', desc: 'Tomatensauce, Mozzarella, scharfer Salami, Schinken, Tabasco und Mais' },
                        { name: 'PRIMAVERA', price: '13,90', desc: 'Tomatensauce, Mozzarella, Parmaschinken, Rucola, Parmesan...', isNew: true },
                        { name: 'ANDRIA', price: '14,90', desc: 'Tomatensauce, Mozzarella, Burrata, getrocknete gelbe & rote Tomaten...', isNew: true },
                    ]
                }
            ],
            // Page 7: Zugabe
            [
                {
                    type: 'section',
                    title: 'ZUGABE !!!!',
                    color: '#FFD83A',
                    items: [
                        { name: 'Knoblauch Öl', price: '1.50', desc: 'unser Service' },
                        { name: 'Tabasco', price: '1.50', desc: 'unser Service' },
                        { name: 'Zwiebeln rot', price: '1.00' },
                        { name: 'Mais', price: '1.50' },
                        { name: 'Oliven ohne Kern', price: '2.00' },
                        { name: 'Parmesan gehobelt', price: '2.00' },
                        { name: 'Grillgemüse', price: '2.00' },
                        { name: 'Rucola', price: '2.00' },
                        { name: 'Getrocknete Tomaten', price: '2.00' },
                        { name: 'Mozzarella', price: '1.50' },
                        { name: 'Tomatensauce', price: '1.50' },
                        { name: 'Basilikum', price: '1.50' },
                        { name: 'milde Salami', price: '2.00' },
                        { name: 'scharfe Salami', price: '2.00' },
                        { name: 'Schinken (Bein)', price: '2.50' },
                        { name: 'Parma Schinken', price: '2.50' },
                        { name: 'Thunfisch', price: '2.50' },
                        { name: 'Burrata', price: '3.00' }
                    ]
                }
            ],
            // Page 8: Comparison Box
            [
                {
                    type: 'comparison_box',
                    title: 'PINSA ODER PIZZA ?',
                    color: '#FFD83A',
                    items: [
                        { name: 'GERINGER KALORIENGEHALT', score: '1:0' },
                        { name: 'LUFTIGER TEXTUR', score: '2:0' },
                        { name: 'BESSERE VERDAULICHKEIT', score: '3:0' },
                        { name: 'GERINGER GLUTENGEHALT', score: '4:0' },
                        { name: 'IST RUND', score: '4:1' }
                    ]
                }
            ]
        ]
    },
    {
        id: 'drinks_page',
        title: 'Drinks Menu',
        columns: [
            // Page 1: Erfrischend
            [
                {
                    type: 'section',
                    title: 'ERFRISCHEND',
                    subtitle: 'ANTIALKOHOLISCHE GETRÄNKE',
                    color: '#3BB6D8',
                    items: [
                        { name: 'BIO COLA FL. 0,275l', price: '3,90' },
                        { name: 'BIO ARANCIATA FL. 0,275l Orangenlimonade', price: '3,90' },
                        { name: 'BIO LIMONATA FL. 0,275l Zitronenlimonade', price: '3,90' },
                        { name: 'BIO EISTEE ZITRONE FL. 0,275l', price: '3,90' },
                        { name: 'BIO EISTEE PFIRSICH FL. 0,275l', price: '3,90' },
                        { name: 'FRITZ COLA OHNE ZUCKER Fl. 0,33l', price: '4,50' },
                        { name: 'APFEL- ODER STEIRISCHER APFEL NATURTRÜB', price: '0,25l 3,40 | 0,5l 4,90' },
                        { name: 'MINERALWASSER FL.', price: '0,25l 3,50 | 0,75l 7,50' },
                        { name: 'SODA', price: '0,25l 2,70 | 0,5l 3,90' },
                        { name: 'REDBULL ODER SUGARFREE 0,275l', price: '4,90' },
                        { name: 'SODA MIT GESCHMACK', price: '0,25l 3,10 | 0,5l 4,40', desc: 'frische Zitrone - Himbeere - Holunder' }
                    ]
                }
            ],
            // Page 2: Homemade
            [
                {
                    type: 'section',
                    title: 'HAUSGEMACHTER EISTEE',
                    color: '#3BB6D8',
                    items: [
                        { name: 'HONEY ICE TEA 0,4l', price: '5,40', desc: 'Eistee, Zitrone, Minze, Honig' },
                        { name: 'NICE ICE TEA 0,4l', price: '5,40', desc: 'Eistee, Granatapfel, Minze', isNew: true }
                    ]
                },
                {
                    type: 'section',
                    title: 'HAUSLIMONADE',
                    color: '#FFD83A',
                    items: [
                        { name: 'ENZO 0,4l', price: '4,90', desc: 'Holunder, Ingwer, Minze, Soda', isNew: true },
                        { name: 'DINO 0,4l', price: '4,90', desc: 'Granatapfel, Aloe Vera, Minze, Soda' },
                        { name: 'FABIO 0,4l', price: '4,90', desc: 'Zitrone, Ingwer, Minze, Soda *zuckerfrei*' }
                    ]
                },
                {
                    type: 'section',
                    title: 'SMOOTHIES',
                    subtitle: 'Frucht pur. Ohne Schnickschnack.',
                    color: '#3BB6D8',
                    items: [
                        { name: 'TROPICAL 0,25l', price: '4,90', desc: 'Mango, Ananas, Banane, Kokos, Orange, Quinoa' },
                        { name: 'ROYAL BERRY 0,25l', price: '4,90', desc: 'Heidelbeere, Erdbeere, Banane, Aronia, Rote Beete, Quinoa' },
                        { name: 'GREEN 0,25l', price: '5,40', desc: 'Birne, Apfel, Pfirsich, Kiwi, Spinat, Quinoa, Spirulina...', isNew: true }
                    ]
                }
            ],
            // Page 3: Beer & Wine
            [
                {
                    type: 'section',
                    title: 'BIER',
                    subtitle: 'SCHANKBIER',
                    color: '#3BB6D8',
                    items: [
                        { name: 'WIESELBURGER', price: '0,5l 4,40' },
                        { name: 'SCHLADMINGER BIOZWICKL', price: '0,5l 4,40' },
                        { name: 'ALM- ODER SODARADLER', price: '0,5l 4,40' },
                        { name: 'GÖSSER NATURGOLD Alkoholfrei', price: '0,5l 5,40' },
                        { name: 'EDELWEISS HEFETRÜB Weißbier', price: '0,5l 5,40' }
                    ]
                },
                {
                    type: 'subtitle_only',
                    title: 'WEIN',
                    color: '#3BB6D8'
                },
                {
                    type: 'items_no_border',
                    title: 'WEIN_LISTE',
                    items: [
                        { name: 'GRÜNER VELTLINER Weiß', price: '1/8l 4,20' },
                        { name: 'PINOT GRIGIO Weiß', price: '1/8l 3,90' },
                        { name: 'CHIANTI Rot', price: '1/8l 4,20' },
                        { name: 'LAMBRUSCO ROSSO IGT Rot', price: '1/8l 3,60' },
                        { name: 'SCHANKWEIN Weiß oder Rot', price: '1/8l 2,90' }
                    ]
                }
            ],
            // Page 4: Spritz & Longdrinks
            [
                {
                    type: 'section',
                    title: 'SPRITZER & SPRUDEL',
                    color: '#3BB6D8',
                    items: [
                        { name: 'SPRITZER Weiß oder Rot', price: '1/4l 3,50' },
                        { name: 'SOMMERSPRITZER', price: '1/2l 4,50' },
                        { name: 'APEROL SPRITZER', price: '1/4l 5,90' },
                        { name: 'KAISER SPRITZER', price: '1/4l 5,20' },
                        { name: 'HUGO', price: '1/4l 5,90' },
                        { name: 'LIMONCELLO SPRITZ', price: '1/4l 5,90' },
                        { name: 'MIONETTO PROSECCO', price: '0,1l 4,80', isNew: true }
                    ]
                },
                {
                    type: 'section',
                    title: 'LONGDRINKS & CO',
                    color: '#3BB6D8',
                    items: [
                        { name: 'CAMPARI SODA 0,25l', price: '6,90' },
                        { name: 'VODKA BULL 0,25l', price: '7,90' },
                        { name: 'RUM COLA 0,25l', price: '7,90' },
                        { name: 'WHISKEY SOUR 0,125l', price: '7,90' },
                        { name: 'STOLI MULE 0,25l', price: '7,90' },
                        { name: 'LONDON GIN', price: '0,25l 7,90', isNew: true }
                    ]
                }
            ],
            // Page 5: Logo
            [
                {
                    type: 'brand_logo',
                    items: []
                }
            ]
        ]
    }
];

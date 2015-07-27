'use strict';

require('./set-selector.module.js')
    .constant('ArtistListConstants', [
        {
            artistId: "1",
            name: "Robert Adams",
            bio: "Robert Adams (1917–1984) was an English sculptor and painter. He studied at the Northampton School of Art from 1933 to 1944. During World War II he was employed as an engineer, and after the war he spent two years teaching himself to sculpt in wood. He also produced abstract paintings, but soon came to specialise in sculpture."
        },
        {
            artistId: "",
            name: "Eileen Agar",
            bio: "Eileen Agar (1889-1991) was an English painter of Argentine birth. She was a member of the London Group from 1933, and exhibited with the Surrealists both in England and abroad. In her later life she experimented with automatic techniques and new materials, taking photographs and making collages and objects."
        },
        {
            artistId: "",
            name: "Kenneth Armitage",
            bio: "Kenneth Armitage (1916-2002) first attracted international attention as one of a group of young British sculptors who showed at the 26th Venice Biennale in 1952 and whose work signalled a new, anti-monumental, expressionist approach. Armitage's preoccupation was with the human figure, combined with an interest in vertical and horizontal structure."
        },
        {
            artistId: "",
            name: "Francis Bacon",
            bio: "Francis Bacon (1909-1992) was an English painter born in Dublin who began his career during the Second World War and the artistic milieu of post-war Soho. Known for figurative and emotionally charged imagery, Bacon’s images depicted the bleakness of the human condition. He was inspired, in part, by an illicit lifestyle of gambling and homosexuality, as well as frequent travels abroad."
        },
        {
            artistId: "",
            name: "John Banting",
            bio: "John Banting (1902-1972) was a Surrealist drawer, painter, and writer known for shaving his head as a response to premature hair loss. Although he produced few paintings in his last years and devoted considerable time to writing, Banting regularly contributed earlier works to Surrealist exhibitions."
        },
        {
            artistId: "",
            name: "Stuart Brisley",
            bio: "Stuart Brisley (b.1933) is an English artist and sculptor. Influenced by Marxist counter-cultural politics in the 1960s, he adopted performance as the democratic basis for a new relationship between artist and audience. Despite changes in media over time, Brisley’s critical motivations remain unchanged: the production of a political art capable of capturing the ‘morbid symptoms' of capitalist culture."
        },
        {
            artistId: "",
            name: "Edward Burra",
            bio: "Edward Burra (1905-1976) was a painter in watercolour of sardonic genre and of scenes of violence and destruction, as well as large-scale landscapes and still life paintings with macabre overtones. He exhibited both alone and with English Surrealists in the 1930s, and travelled in Europe, the United States, and Mexico."
        },
        {
            artistId: "",
            name: "Prunella Clough",
            bio: "Prunella Clough (1919-1999) was an English painter, draughtsman, and printmaker. Her early work was characterised by the proletarian subject matter of labour and the urban landscape described within a narrow tonal range. Towards the end of her life she became regarded largely as an abstractionist, but her work always retained a figurative base."
        },
        {
            artistId: "",
            name: "Cecil Collins",
            bio: "Cecil Collins (1908-1989) was an English painter and drawer active in the British Surrealism movement, and later in Neo-Romanticism. Collins received a number of religious commissions later in life, and occasionally collaborated with his wife, sculptor Elisabeth Ramsden Collins."
        },
        {
            artistId: "",
            name: "Ithell Colquhoun",
            bio: "Ithell Colquhoun (1906-1988) an English painter born in India and trained in England. Known for botanical works inspired in part by Surrealism, Colquhoun broke with the movement in 1940 in lieu of sacrificing her interest in the occult. She was an acknowledged authority and writer on the occult and Surrealism."
        },
        {
            artistId: "",
            name: "Thomas Cooper Gotch",
            bio: "Thomas Cooper Gotch (1854-1931) was an English painter associated with the Newlyn school. Portrait painting was Gotch’s primary source of income, but he experimented with subjects, styles, and media. He was a founding member of the New English Art Club and the Royal British Colonial Society of Artists, serving as president between 1913–28."
        },
        {
            artistId: "",
            name: "Henry Scott Tuke",
            bio: "Henry Scott Tuke (1858-1929) was an English painter and founder member of the Newlyn school. Impersonality and detachment combined with sincere commitment to subject and atmosphere characterise his mature style and challenged artistic expectations of the time, broadening the parameters of British plein-air painting."
        },
        {
            artistId: "",
            name: "Jacob Epstein",
            bio: "Jacob Epstein (1880-1959) made his name as a sculptor of monuments and portraits, and as an occasional painter and illustrator. In his lifetime he championed many of the concepts central to modernist sculpture, including 'truth to material', direct carving, and inspiration from primitive art, all of which became central to twentieth-century practice."
        },
        {
            artistId: "",
            name: "Stanhope Alexander Forbes",
            bio: "Stanhope Alexander Forbes (1857-1947) was a painter of the realistic genre, frequently focusing on the open air, historical subjects, and landscapes. A leading member of the Newlyn School, Forbes was trained in both England and Paris."
        },
        {
            artistId: "",
            name: "Henri Gaudier-Brzeska",
            bio: "Henri Gaudier-Brzeska (1891-1915) was a French sculptor and draughtsman. He moved to London in 1911 and was inspired to take a more experimental style after a crucial meeting with Jacob Epstein. Gaudier-Brzeska’s work often featured proto-geometrical simplification and impish humour. He was killed in action while serving in the French Army in the First World War."
        },
        {
            artistId: "",
            name: "Stephen Gilbert",
            bio: "Stephen Gilbert (1910-2007) was a Scottish painter, architectural designer and sculptor who became increasingly abstract after 1948. In 1954 he began making three-dimensional constructions, joined the Groupe Espace, and began exhibiting at the Salon de la Jeune Sculpture. His later work included the use of curvilinear planes in aluminium."
        },
        {
            artistId: "",
            name: "Duncan Grant",
            bio: "Duncan Grant (1885-1978) was a Scottish painter who was central in the Bloomsbury circle of artists and writers. Later in life, he was influenced by the Post-Impressionists and became a member of the London Group, designing sets and costumes for various theatrical productions."
        },
        {
            artistId: "",
            name: "Ian Hamilton Finlay",
            bio: "Ian Hamilton Finlay (1925-2006) was Scottish sculptor, graphic artist and poet. As a sculptor he worked in a wide range of materials including stone carving and neon lighting. With his personal garden, which he named Little Sparta, Finlay revived the traditional notion of the poet's garden."
        },
        {
            artistId: "1274",
            name: "Dame Barbara Hepworth",
            bio: "Dame Barbara Hepworth (1903-1975) was a British abstract sculptor connected to the modernist movement. Hepworth represented a link with pre-war ideals in a post-1945 climate of social and physical reconstruction, and came to international prominence after the Grand Prix of the 1959 São Paulo Bienal. Scholarly interest has focused on her status as one of the few women artists to achieve international prominence."
        },
        {
            artistId: "",
            name: "Josef Herman",
            bio: "Josef Herman (1911-2000) was a figure painter and draughtsman inspired in part by Expressionism. Herman was born in Warsaw, the son of a Jewish cobbler, but became a naturalised British subject in 1948 after living in Britain for 8 years. His subjects, treated in sombre tones, were taken mainly from miners and field labourers in Wales."
        },
        {
            artistId: "",
            name: "Ivon Hitchens",
            bio: "Ivon Hitchens (1893-1979) was an English painter who was part of the London Group in his early life. After his house was bombed in 1940 he moved to a patch of woodland near Petworth, W. Sussex. He worked there for the next 40 years, distanced from the predominantly literary currents of British modern art."
        },
        {
            artistId: "",
            name: "David Jones",
            bio: "David Jones (1895-1974) was an English painter, draughtsman, printmaker, illustrator and poet. His primary influences included his service during World War I and his subsequent conversion to Roman Catholicism. Jones’ work can be divided into three main phases punctuated by his two breakdowns in 1932 and 1947, and included a focus on epics and myths represented with modern motifs."
        },
        {
            artistId: "",
            name: "L.S. Lowry",
            bio: "L.S. Lowry (1887-1976) was an English painter chiefly associated with street scenes and townscapes. Lowry spent an unusually long period as an art student, regarded himself as self-taught, and was unconcerned with his slow but eventually widespread success. From 1948 until his death he lived in the same small, unmodernised house in Cheshire."
        },
        {
            artistId: "",
            name: "F.E. McWilliam",
            bio: "F.E. McWilliam (1909-1992) was an Irish sculptor who studied painting in Belfast and London before turning to sculpture in the early 1930s. Although initially influenced by archaic and primitive art, McWilliam’s work increasingly took a Surrealist spirit. Later in life, McWilliam worked with a wide variety of media and experimented with both subject and style."
        },
        {
            artistId: "",
            name: "Bernard Meninsky",
            bio: "Bernard Meninsky (1891-1950) was a landscape and figure painter born in the Ukraine to Jewish parents but raised in Liverpool. He was a member of the London Group and an Official War Artist during the First World War. Meninsky painted mostly with oils, watercolour, and gouache."
        },
        {
            artistId: "",
            name: "Ronald Moody",
            bio: "Ronald Moody (1900-1984) was a British sculptor and writer of Jamaican birth. Influenced by the Second World War, Moody used his later work to examine the dichotomy between man’s power for self-destruction and for spiritual evolution. He experimented with a variety of media including concrete and metallic resins, and was a member of the Caribbean Artists Movement."
        },
        {
            artistId: "",
            name: "Henry Moore",
            bio: "Henry Moore OM, CH (1898-1986) was a British sculptor and draughtsman. He was a member of the London Group and exhibited with the 1936 and 1938 International Surrealist Exhibitions. He was an Official War Artist from 1940-1942, and after the Second World War exhibited across Europe as well as North and South America."
        },
        {
            artistId: "",
            name: "Sir Cedric Morris",
            bio: "Sir Cedric Morris, Bt (1889-1982) was a self-taught Welsh painter and horticulturist. His paintings focus on a wide range of subjects including still life, flower paintings, landscape, townscapes, and animals. Morris often used his works to protest against prudery, environmental pollution, and hypocrisy."
        },
        {
            artistId: "",
            name: "John Nash",
            bio: "John Nash (1893-1977) was a self-trained painter, wood engraver, and illustrator. He was a member of the London Group, and an Official War Artist in 1918 and again in 1940. Nash focused primarily on watercolour landscapes and comic drawings, and held a variety of teaching positions in the south of England."
        },
        {
            artistId: "",
            name: "Paul Nash",
            bio: "Paul Nash (1889-1946) was a landscape painter, book illustrator, writer, and designer for applied art. In 1917 he was appointed as an Official War Artist after his exhibition Ypres Salient. Nash exhibited at the 1936 and 1938 International Surrealist Exhibitions, and served again as a War Artist during the Second World War."
        },
        {
            artistId: "",
            name: "Ben Nicholson",
            bio: "Ben Nicholson OM (1894-1982) was a painter of the Post-Impressionistic and Cubist styles. His work advocated the use of “constructivist” principles of mathematical precision, clean lines, and the absence of ornamentation in public and private art. Along with Henry Moore, Nicholson represents the quintessence of British modernism."
        },
        {
            artistId: "",
            name: "John Piper",
            bio: "John Piper (1903-1992) was a painter, theatre and stained-glass window designer, and writer on the arts. He focused primarily on architecture, landscape, and abstract compositions, and served as an Official War Artist from 1940-1942. Later in life, Piper designed windows and decorations for a number of religious and governmental buildings."
        },
        {
            artistId: "",
            name: "Sir William Rothenstein",
            bio: "Sir William Rothenstein (1872-1945) was a painter, printmaker, teacher, and writer who was inspired by the grim landscapes of his native Yorkshire. His style gradually evolved towards brighter colours in response to Post-Impressionism, and drew later inspiration from the Gloucestershire landscape. His pupils at the Royal College of Art included Henry Moore and Barbara Hepworth."
        },
        {
            artistId: "",
            name: "Ethel Sands",
            bio: "Ethel Sands (1873-1962) was an artistic hostess and painter whose primary influence on British art came from her interest in hosting social events for artists. She was a founding member of the London Group, and her painting was often exhibited alongside the work of her Impressionist and Cubist colleagues. Sands was the lifelong partner of Anna (Nan) Hope Hudson, another painter influential in British art."
        },
        {
            artistId: "",
            name: "Kurt Schwitters",
            bio: "Kurt Schwitters (1887-1948) was a German painter, sculptor, typographer, and writer influenced by Expressionism and Cubism. While in Hanover he created his own form of Dada known as Merz before fleeing to England in 1940. After the Second World War, Schwitters spent the last months of his life working on a new Merz construction in an old barn at Langdale."
        },
        {
            artistId: "",
            name: "Sir Stanley Spencer",
            bio: "Sir Stanley Spencer (1891-1959) was a British painter of landscapes, portraits, and imaginative and religious subjects. He exhibited at the 1912 Second Post-Impressionist Exhibition, and was an Official War Artist from 1940-1944. "
        },
        {
            artistId: "",
            name: "Graham Sutherland",
            bio: "Graham Sutherland OM (1903-1980) was a British painter of imaginative landscapes, still life, figure pieces, and portraits. He participated in the 1936 International Surrealist Exhibition and served as an Official War Artist from 1941-1944. "
        },
        {
            artistId: "",
            name: "Julian Trevelyan",
            bio: "Julian Trevelyan (1910-1988) was a painter and engraver of Surrealist and Expressionist tendencies. He was a member of the English Surrealist Group and London Group, and served as a Camouflage Officer from 1940-1943."
        },
        {
            artistId: "",
            name: "Keith Vaughn",
            bio: "Keith Vaughn (1912-1977) was an English painter and writer whose drawings of army life during the First World War brought him to prominence. Influenced heavily by early Neo-Romantics including Graham Sutherland, Henry Moore, and William Blake, Vaughn’s pieces attempted to balance male nudes with abstract environments."
        },
        {
            artistId: "",
            name: "Robert \"Scottie\" Wilson",
            bio: "Robert \"Scottie\" Wilson (1889-1972) was a self-taught painter of imaginative subjects. He began to draw only after his second-hand furniture shop in Toronto was unsuccessful. He exhibited in the 1947 International Surrealism Exhibition, and his designs were used for tapestries and pottery designs."
        }
    ]);

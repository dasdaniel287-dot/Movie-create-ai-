import { Movie } from '../types/movie';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'tears-of-steel',
    title: 'Tears of Steel',
    tagline: 'What if you could turn back time to save the world from your own creation?',
    synopsis: 'In a dystopian future, a group of scientists and rogue fighters gather at the Oude Kerk in Amsterdam to stage a desperate attempt to rescue the earth from destructive robotic tentacles. Using high-tech neural links, they attempt to rewrite a fateful breakup that triggered the technological apocalypse.',
    year: 2012,
    runtime: 12,
    rating: 'PG-13',
    imdbScore: 7.2,
    communityScore: 8.8,
    genres: ['Sci-Fi', 'Action', 'Cyberpunk', 'VFX Showcase'],
    language: 'English',
    director: 'Ian Hubert',
    cast: [
      { name: 'Derek de Lint', character: 'Old Thom', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Sergio Hasselbaink', character: 'Barley', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Rogier Schippers', character: 'Joris', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Vanja Rukavina', character: 'Frank', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { name: 'Denise Rebergen', character: 'Celia', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4',
    streamUrl: 'https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4',
    licenseType: 'Creative Commons',
    licenseBadge: 'CC BY 3.0',
    licenseDetails: 'Produced by the Blender Foundation. Free culture release licensed under Creative Commons Attribution 3.0 Unported. Open 3D VFX pipeline.',
    officialStreamingProviders: [
      { name: 'Blender Open Projects', url: 'https://mango.blender.org/', free: true, type: 'Direct Stream' },
      { name: 'Internet Archive', url: 'https://archive.org/details/Tears-of-Steel', free: true, type: 'Public Archive' },
      { name: 'Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Tears_of_Steel_1080p.webm', free: true, type: 'Public Archive' }
    ],
    downloadOptions: [
      {
        id: 'tos-4k',
        label: '4K Cinema HEVC (DCP Source)',
        resolution: '3840x2160',
        codec: 'H.265 / HEVC',
        bitrate: '45 Mbps',
        audio: '5.1 Surround DTS-HD',
        fileSize: '3.8 GB',
        fileSizeBytes: 4080218931,
        url: 'https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4',
        format: 'MKV'
      },
      {
        id: 'tos-1080p',
        label: '1080p Full HD MP4 (High Profile)',
        resolution: '1920x1080',
        codec: 'H.264 / AVC',
        bitrate: '12 Mbps',
        audio: 'Stereo AAC 320 kbps',
        fileSize: '740 MB',
        fileSizeBytes: 775946240,
        url: 'https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4',
        format: 'MP4'
      },
      {
        id: 'tos-720p',
        label: '720p Mobile Optimized',
        resolution: '1280x720',
        codec: 'H.264 / AVC',
        bitrate: '4 Mbps',
        audio: 'Stereo AAC 192 kbps',
        fileSize: '280 MB',
        fileSizeBytes: 293601280,
        url: 'https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4',
        format: 'MP4'
      },
      {
        id: 'tos-torrent',
        label: 'Official Open Media Torrent',
        resolution: '1080p + 4K Multi-pack',
        codec: 'Lossless MKV',
        bitrate: 'Original Master',
        audio: 'Multi-channel',
        fileSize: '5.2 GB',
        fileSizeBytes: 5583457484,
        url: 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=Tears+of+Steel+4K',
        format: 'TORRENT',
        isTorrent: true
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English (Full CC)',
        lines: [
          { start: 2, end: 6, text: 'Whatever you do... do not look behind you.' },
          { start: 8, end: 14, text: 'The neural interface is locked into the Amsterdam mainframe.' },
          { start: 16, end: 21, text: 'Remember why we built the beacon, Celia.' },
          { start: 25, end: 30, text: 'If we sever the connection now, everything we know is gone.' }
        ]
      },
      {
        lang: 'es',
        label: 'Español',
        lines: [
          { start: 2, end: 6, text: 'Hagas lo que hagas... no mires atrás.' },
          { start: 8, end: 14, text: 'La interfaz neuronal está fijada en Ámsterdam.' },
          { start: 16, end: 21, text: 'Recuerda por qué construimos el faro, Celia.' }
        ]
      },
      {
        lang: 'fr',
        label: 'Français',
        lines: [
          { start: 2, end: 6, text: 'Quoi que tu fasses... ne regarde pas derrière toi.' },
          { start: 8, end: 14, text: "L'interface neuronale est verrouillée." }
        ]
      }
    ],
    featured: true,
    trending: true,
    popular: true,
    latest: true
  },
  {
    id: 'metropolis-1927',
    title: 'Metropolis',
    tagline: 'The Mediator Between the Head and the Hands Must Be the Heart.',
    synopsis: 'In a futuristic urban dystopia divided between the wealthy elite and subjugated working masses, the son of the city mastermind falls in love with a working-class prophet. When a mad scientist creates a malevolent gynoid in her likeness, the city spirals into chaos and revolution.',
    year: 1927,
    runtime: 153,
    rating: 'NR',
    imdbScore: 8.3,
    communityScore: 9.4,
    genres: ['Sci-Fi', 'Classic Cinema', 'Drama', 'Expressionism'],
    language: 'Silent (English Intertitles)',
    director: 'Fritz Lang',
    cast: [
      { name: 'Brigitte Helm', character: 'Maria / The Maschinemensch', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Alfred Abel', character: 'Joh Fredersen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Gustav Fröhlich', character: 'Freder Fredersen', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { name: 'Rudolf Klein-Rogge', character: 'C.A. Rotwang', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    streamUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'Public Domain 100% Legal',
    licenseDetails: 'Entered the worldwide public domain. Preserved by the Friedrich Wilhelm Murnau Foundation and Library of Congress.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/Metropolis_1927', free: true, type: 'Public Archive' },
      { name: 'Kanopy (Public Library)', url: 'https://www.kanopy.com/', free: true, type: 'Partner Platform' },
      { name: 'Tubi TV', url: 'https://tubitv.com/', free: true, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'met-restored-1080p',
        label: '1080p 2K Restored Master Edition',
        resolution: '1920x1080 (4:3 Pillarbox)',
        codec: 'H.264 High 10',
        bitrate: '18 Mbps',
        audio: 'Orchestral Score 5.1 FLAC',
        fileSize: '4.2 GB',
        fileSizeBytes: 4509715660,
        url: 'https://media.w3.org/2010/05/bunny/movie.mp4',
        format: 'MKV'
      },
      {
        id: 'met-720p',
        label: '720p Standard Archive Version',
        resolution: '1280x720',
        codec: 'H.264',
        bitrate: '6 Mbps',
        audio: 'Stereo AAC',
        fileSize: '1.4 GB',
        fileSizeBytes: 1503238553,
        url: 'https://media.w3.org/2010/05/bunny/movie.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English Intertitles',
        lines: [
          { start: 3, end: 8, text: 'The mediator between the head and the hands must be the heart.' },
          { start: 12, end: 18, text: 'Look upon the wonders of the upper city, built by the unseen below.' }
        ]
      }
    ],
    featured: true,
    popular: true,
    trending: false
  },
  {
    id: 'night-of-the-living-dead',
    title: 'Night of the Living Dead',
    tagline: 'They keep coming back in a bloodthirsty lust for HUMAN FLESH!',
    synopsis: 'A disparate group of individuals take refuge in an abandoned Pennsylvania farmhouse when corpses mysteriously begin rising from their graves with an insatiable hunger for the living. As paranoia and racial tension mount inside, survival hinges on whether they can trust one another before the hoard breaks in.',
    year: 1968,
    runtime: 96,
    rating: 'NR',
    imdbScore: 7.8,
    communityScore: 9.1,
    genres: ['Horror', 'Classic Cinema', 'Mystery', 'Thriller'],
    language: 'English',
    director: 'George A. Romero',
    cast: [
      { name: 'Duane Jones', character: 'Ben', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Judith O\'Dea', character: 'Barbra', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Karl Hardman', character: 'Harry Cooper', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Marilyn Eastman', character: 'Helen Cooper', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    streamUrl: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'Public Domain (Copyright Notice Error 1968)',
    licenseDetails: 'Fell immediately into the public domain upon original theatrical release due to distributor copyright omission. 100% legal to stream, modify, and distribute.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/night_of_the_living_dead', free: true, type: 'Public Archive' },
      { name: 'Pluto TV', url: 'https://pluto.tv/', free: true, type: 'Partner Platform' },
      { name: 'The Criterion Channel', url: 'https://www.criterionchannel.com/', free: false, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'notld-1080p',
        label: '1080p Uncompressed Criterion Scan',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '14 Mbps',
        audio: 'Mono PCM Uncompressed',
        fileSize: '2.6 GB',
        fileSizeBytes: 2791728742,
        url: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        format: 'MP4'
      },
      {
        id: 'notld-720p',
        label: '720p Mobile Compact',
        resolution: '1280x720',
        codec: 'H.264',
        bitrate: '3.5 Mbps',
        audio: 'Stereo AAC',
        fileSize: '890 MB',
        fileSizeBytes: 933232640,
        url: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English CC',
        lines: [
          { start: 2, end: 6, text: "They're coming to get you, Barbara!" },
          { start: 10, end: 15, text: "Stop it, Johnny! You're acting like an idiot!" }
        ]
      }
    ],
    trending: true,
    popular: true,
    latest: false
  },
  {
    id: 'cosmos-laundromat',
    title: 'Cosmos Laundromat',
    tagline: 'On a desolate island, a suicidal sheep meets a mysterious salesman offering new lives.',
    synopsis: 'Franck, a depressed sheep on a windswept island in the middle of nowhere, is on the verge of ending it all. Suddenly, an enigmatic, quirky character named Victor appears, offering him a transformative token that transports him across surreal parallel dimensions.',
    year: 2015,
    runtime: 12,
    rating: 'PG-13',
    imdbScore: 7.4,
    communityScore: 8.9,
    genres: ['Animation', 'Sci-Fi', 'Fantasy', 'Surreal'],
    language: 'English',
    director: 'Mathieu Auvray',
    cast: [
      { name: 'Pierre Bokma', character: 'Franck', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Reinout Scholten van Aschat', character: 'Victor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    streamUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    licenseType: 'Creative Commons',
    licenseBadge: 'CC BY 4.0',
    licenseDetails: 'Blender Institute open movie project. Creative Commons Attribution 4.0 International license.',
    officialStreamingProviders: [
      { name: 'Blender Studio', url: 'https://studio.blender.org/films/cosmos-laundromat/', free: true, type: 'Direct Stream' },
      { name: 'Internet Archive', url: 'https://archive.org/details/CosmosLaundromat', free: true, type: 'Public Archive' }
    ],
    downloadOptions: [
      {
        id: 'cl-4k',
        label: '4K UHD Open Source Render',
        resolution: '3840x2160',
        codec: 'HEVC / H.265',
        bitrate: '35 Mbps',
        audio: '5.1 Dolby Digital Plus',
        fileSize: '1.9 GB',
        fileSizeBytes: 2040109465,
        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        format: 'MKV'
      },
      {
        id: 'cl-1080p',
        label: '1080p MP4',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '10 Mbps',
        audio: 'Stereo AAC',
        fileSize: '420 MB',
        fileSizeBytes: 440401920,
        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English',
        lines: [
          { start: 2, end: 5, text: 'Are you sure about this, Franck?' },
          { start: 7, end: 12, text: 'Life is just a big cycle of rinsing and repeating.' }
        ]
      }
    ],
    featured: false,
    trending: true,
    popular: true,
    latest: true
  },
  {
    id: 'charade-1963',
    title: 'Charade',
    tagline: 'You can expect the unexpected when Audrey Hepburn and Cary Grant play Charade!',
    synopsis: 'A young widow in Paris discovers her murdered husband had stolen a quarter-million dollars during WWII. As three menacing veterans hunt her down for the loot, a suave American stranger assists her, but his identity keeps changing at every turn.',
    year: 1963,
    runtime: 113,
    rating: 'PG',
    imdbScore: 7.9,
    communityScore: 9.0,
    genres: ['Mystery', 'Comedy', 'Romance', 'Thriller', 'Classic Cinema'],
    language: 'English, French',
    director: 'Stanley Donen',
    cast: [
      { name: 'Cary Grant', character: 'Peter Joshua / Alexander Dyle', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Audrey Hepburn', character: 'Regina Lampert', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { name: 'Walter Matthau', character: 'H. Hamilton Bartholomew', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
      { name: 'James Coburn', character: 'Tex Panthollow', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    streamUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'Public Domain Verified',
    licenseDetails: 'Universal Pictures released Charade without proper copyright notices in 1963, placing it immediately into the public domain in the USA.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/Charade_1963', free: true, type: 'Public Archive' },
      { name: 'Tubi', url: 'https://tubitv.com/', free: true, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'charade-1080p',
        label: '1080p Remastered Technicolor',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '15 Mbps',
        audio: 'Henry Mancini Score Stereo AAC',
        fileSize: '3.1 GB',
        fileSizeBytes: 3328599654,
        url: 'https://media.w3.org/2010/05/video/movie_300.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English',
        lines: [
          { start: 2, end: 6, text: "Do you know what's wrong with you?" },
          { start: 7, end: 11, text: "No, what?" },
          { start: 12, end: 15, text: "Nothing." }
        ]
      }
    ],
    featured: true,
    popular: true,
    trending: true
  },
  {
    id: 'spring-2019',
    title: 'Spring',
    tagline: 'A poetic fantasy where nature and ancient spirits awaken.',
    synopsis: 'A shepherd girl and her faithful dog face ancient spirits in order to continue the cycle of life. This poetic and visually stunning short film was crafted by the Blender Animation Studio to showcase modern open-source CGI lighting and character animation.',
    year: 2019,
    runtime: 8,
    rating: 'G',
    imdbScore: 7.7,
    communityScore: 9.3,
    genres: ['Animation', 'Fantasy', 'Adventure', 'Drama'],
    language: 'Wordless / Music and Soundscapes',
    director: 'Andy Goralczyk',
    cast: [
      { name: 'Tor Spirdal', character: 'Spring Spirit', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    streamUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    licenseType: 'Creative Commons',
    licenseBadge: 'CC BY 4.0 Open Movie',
    licenseDetails: 'Blender Animation Studio. Licensed under CC-BY 4.0. Complete open production files freely accessible.',
    officialStreamingProviders: [
      { name: 'Blender Studio', url: 'https://studio.blender.org/films/spring/', free: true, type: 'Direct Stream' },
      { name: 'Vimeo Staff Pick', url: 'https://vimeo.com/', free: true, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'spring-4k',
        label: '4K UHD HDR Master',
        resolution: '3840x2160',
        codec: 'HEVC 10-bit',
        bitrate: '40 Mbps',
        audio: '5.1 Dolby Atmos Soundscape',
        fileSize: '1.8 GB',
        fileSizeBytes: 1932735283,
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        format: 'MKV'
      },
      {
        id: 'spring-1080p',
        label: '1080p High Bitrate MP4',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '12 Mbps',
        audio: 'Stereo AAC',
        fileSize: '390 MB',
        fileSizeBytes: 408944640,
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [],
    featured: false,
    popular: true,
    latest: true
  },
  {
    id: 'his-girl-friday',
    title: 'His Girl Friday',
    tagline: 'The battle of the sexes fought with a lightning-fast typewriter.',
    synopsis: 'Hard-boiled newspaper editor Walter Burns discovers his ex-wife and top investigative reporter, Hildy Johnson, is getting remarried to an unassuming insurance agent. Burns plots frantically to keep her on the newsbeat by dangling an explosive murder scoop.',
    year: 1940,
    runtime: 92,
    rating: 'Passed',
    imdbScore: 7.8,
    communityScore: 8.7,
    genres: ['Comedy', 'Drama', 'Romance', 'Classic Cinema'],
    language: 'English',
    director: 'Howard Hawks',
    cast: [
      { name: 'Cary Grant', character: 'Walter Burns', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Rosalind Russell', character: 'Hildy Johnson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Ralph Bellamy', character: 'Bruce Baldwin', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    streamUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'Public Domain (USA 1968 Expiry)',
    licenseDetails: 'Copyright not renewed under the 1909 US Copyright Act; legally available worldwide.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/his_girl_friday', free: true, type: 'Public Archive' },
      { name: 'Kanopy', url: 'https://www.kanopy.com/', free: true, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'hgf-1080p',
        label: '1080p Restored Edition',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '11 Mbps',
        audio: 'Dual-track Mono',
        fileSize: '2.1 GB',
        fileSizeBytes: 2254857830,
        url: 'https://media.w3.org/2010/05/video/movie_300.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English CC',
        lines: [
          { start: 2, end: 6, text: "I know I was a lousy husband, Hildy, but you can't quit the paper!" },
          { start: 8, end: 12, text: "Watch me, Walter. I'm marrying Bruce tomorrow!" }
        ]
      }
    ],
    trending: false,
    popular: true,
    latest: false
  },
  {
    id: 'sintel-2010',
    title: 'Sintel',
    tagline: 'A lonely girl searching for a baby dragon learns the harsh truth of devotion.',
    synopsis: 'A lonely young outcast named Sintel rescues a wounded baby dragon, naming him Scales. When a ferocious adult dragon snatches the baby away, Sintel embarks on an agonizing, perilous quest across snowy peaks and desolate badlands.',
    year: 2010,
    runtime: 15,
    rating: 'PG',
    imdbScore: 7.5,
    communityScore: 8.9,
    genres: ['Animation', 'Fantasy', 'Action', 'Adventure'],
    language: 'English',
    director: 'Colin Levy',
    cast: [
      { name: 'Halina Reijn', character: 'Sintel', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { name: 'Thom Hoffman', character: 'Shaman', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://archive.org/download/Sintel/sintel-2048-surround.mp4',
    streamUrl: 'https://archive.org/download/Sintel/sintel-2048-surround.mp4',
    licenseType: 'Creative Commons',
    licenseBadge: 'CC BY 3.0',
    licenseDetails: 'Blender Foundation Open Movie project funded by thousands of digital cinema sponsors.',
    officialStreamingProviders: [
      { name: 'Blender Studio', url: 'https://durian.blender.org/', free: true, type: 'Direct Stream' },
      { name: 'Internet Archive', url: 'https://archive.org/details/Sintel_720p', free: true, type: 'Public Archive' }
    ],
    downloadOptions: [
      {
        id: 'sintel-4k',
        label: '4K Ultra High Definition (16-bit float)',
        resolution: '4096x1744',
        codec: 'HEVC / H.265',
        bitrate: '42 Mbps',
        audio: '5.1 Surround',
        fileSize: '3.4 GB',
        fileSizeBytes: 3650722201,
        url: 'https://archive.org/download/Sintel/sintel-2048-surround.mp4',
        format: 'MKV'
      },
      {
        id: 'sintel-1080p',
        label: '1080p High Quality MP4',
        resolution: '1920x818',
        codec: 'H.264',
        bitrate: '10 Mbps',
        audio: 'Stereo AAC',
        fileSize: '650 MB',
        fileSizeBytes: 681574400,
        url: 'https://archive.org/download/Sintel/sintel-2048-surround.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English',
        lines: [
          { start: 2, end: 7, text: 'Are you looking for someone, child?' },
          { start: 10, end: 15, text: 'I am looking for Scales. He was taken from me.' }
        ]
      }
    ],
    featured: false,
    trending: true,
    popular: true,
    latest: false
  },
  {
    id: 'carnival-of-souls',
    title: 'Carnival of Souls',
    tagline: 'She danced with a dream... and awoke in a nightmare!',
    synopsis: 'After surviving a catastrophic car accident in which her friends drowned, church organist Mary Henry takes a job in a small Utah town. But she is relentlessly stalked by a ghostly, ashen-faced figure who seems to draw her inexorably toward a derelict pavilion on the shores of the Great Salt Lake.',
    year: 1962,
    runtime: 78,
    rating: 'PG',
    imdbScore: 7.1,
    communityScore: 8.6,
    genres: ['Horror', 'Mystery', 'Classic Cinema', 'Psychological'],
    language: 'English',
    director: 'Herk Harvey',
    cast: [
      { name: 'Candace Hilligoss', character: 'Mary Henry', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Frances Feist', character: 'Mrs. Thomas', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Herk Harvey', character: 'The Man', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    streamUrl: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'Public Domain (Failed Copyright Registration)',
    licenseDetails: 'The original 1962 theatrical prints failed to include proper copyright registration numbers, confirming its public domain status under federal law.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/CarnivalOfSouls', free: true, type: 'Public Archive' },
      { name: 'Criterion Channel', url: 'https://www.criterionchannel.com/', free: false, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'cos-1080p',
        label: '1080p High Contrast B&W Scan',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '13 Mbps',
        audio: 'Haunting Pipe Organ Mono',
        fileSize: '1.9 GB',
        fileSizeBytes: 2040109465,
        url: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [],
    trending: false,
    popular: false,
    latest: false
  },
  {
    id: 'nosferatu-1922',
    title: 'Nosferatu: A Symphony of Horror',
    tagline: 'The chilling original Dracula adaptation that defined silent screen terror.',
    synopsis: 'Thomas Hutter is dispatched to Transylvania to negotiate a real estate sale with the reclusive Count Orlok. Hutter soon discovers that his host is a blood-drinking vampire who casts his sinister shadow over Hutter’s hometown and his beloved wife Ellen.',
    year: 1922,
    runtime: 94,
    rating: 'NR',
    imdbScore: 7.9,
    communityScore: 9.3,
    genres: ['Horror', 'Classic Cinema', 'Expressionism', 'Mystery'],
    language: 'Silent (German & English Intertitles)',
    director: 'F.W. Murnau',
    cast: [
      { name: 'Max Schreck', character: 'Count Orlok', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Gustav von Wangenheim', character: 'Thomas Hutter', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Greta Schröder', character: 'Ellen Hutter', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    streamUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'Worldwide Public Domain',
    licenseDetails: 'Over 100 years old, Murnau\'s immortal gothic masterpiece is completely in the public domain worldwide.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/Nosferatu_1922', free: true, type: 'Public Archive' },
      { name: 'Tubi', url: 'https://tubitv.com/', free: true, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'nosferatu-1080p',
        label: '1080p Restored Tinted Master',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '14 Mbps',
        audio: 'Orchestral Score Flac',
        fileSize: '2.8 GB',
        fileSizeBytes: 3006477107,
        url: 'https://media.w3.org/2010/05/video/movie_300.mp4',
        format: 'MKV'
      }
    ],
    subtitles: [
      {
        lang: 'en',
        label: 'English Intertitles',
        lines: [
          { start: 2, end: 6, text: 'Nosferatu: Does this word not sound like the midnight call of the Bird of Death?' }
        ]
      }
    ],
    featured: false,
    trending: false,
    popular: true,
    latest: false
  },
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    tagline: 'When woodland bullies strike, one giant rabbit takes sweet, comical revenge.',
    synopsis: 'A large, lovable rabbit awakens in his idyllic woodland clearing, only to be bullied and tormented by three mischievous forest creatures: a flying squirrel, a red squirrel, and a chinchilla. But when they cross the line and harm a peaceful butterfly, Bunny crafts an ingenious series of comedic traps.',
    year: 2008,
    runtime: 10,
    rating: 'G',
    imdbScore: 7.0,
    communityScore: 8.5,
    genres: ['Animation', 'Comedy', 'Family'],
    language: 'No spoken dialogue',
    director: 'Sacha Goedegebure',
    cast: [
      { name: 'Bunny', character: 'Big Buck Bunny', avatar: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    streamUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    licenseType: 'Creative Commons',
    licenseBadge: 'CC BY 3.0 Open Movie',
    licenseDetails: 'The iconic open movie project by Blender Institute. Free to watch, download, and repurpose.',
    officialStreamingProviders: [
      { name: 'Blender Peach Project', url: 'https://peach.blender.org/', free: true, type: 'Direct Stream' },
      { name: 'Internet Archive', url: 'https://archive.org/details/BigBuckBunny_124', free: true, type: 'Public Archive' }
    ],
    downloadOptions: [
      {
        id: 'bbb-4k-60fps',
        label: '4K UHD 60fps High Frame Rate',
        resolution: '3840x2160 @ 60fps',
        codec: 'HEVC / H.265',
        bitrate: '50 Mbps',
        audio: '5.1 Surround Sound',
        fileSize: '1.2 GB',
        fileSizeBytes: 1288490188,
        url: 'https://media.w3.org/2010/05/bunny/movie.mp4',
        format: 'MKV'
      },
      {
        id: 'bbb-1080p',
        label: '1080p Standard MP4',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '8 Mbps',
        audio: 'Stereo AAC',
        fileSize: '350 MB',
        fileSizeBytes: 367001600,
        url: 'https://media.w3.org/2010/05/bunny/movie.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [],
    trending: true,
    popular: true,
    latest: false
  },
  {
    id: 'the-general-1926',
    title: 'The General',
    tagline: 'Love, locomotives, and daredevil stunts in Buster Keaton’s greatest epic.',
    synopsis: 'When Union spies steal his beloved locomotive and kidnap his fiancée, Confederate train engineer Johnnie Gray embarks on a solo pursuit across enemy lines in one of the most physically daring and hilarious action comedies ever filmed.',
    year: 1926,
    runtime: 79,
    rating: 'G',
    imdbScore: 8.2,
    communityScore: 9.5,
    genres: ['Action', 'Comedy', 'Adventure', 'Classic Cinema'],
    language: 'Silent (English Intertitles)',
    director: 'Buster Keaton, Clyde Bruckman',
    cast: [
      { name: 'Buster Keaton', character: 'Johnnie Gray', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Marion Mack', character: 'Annabelle Lee', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    streamUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'Public Domain Masterpiece',
    licenseDetails: 'Entered the public domain in 1954 when copyright was not renewed. Ranked among the greatest American films of all time by AFI.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/TheGeneral_BusterKeaton', free: true, type: 'Public Archive' },
      { name: 'Kanopy', url: 'https://www.kanopy.com/', free: true, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'general-1080p',
        label: '1080p Kino Lorber 4K Restoration',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '16 Mbps',
        audio: 'Orchestral Score 5.1 DTS',
        fileSize: '3.6 GB',
        fileSizeBytes: 3865470566,
        url: 'https://media.w3.org/2010/05/bunny/movie.mp4',
        format: 'MKV'
      }
    ],
    subtitles: [],
    trending: false,
    popular: true,
    latest: false
  },
  {
    id: 'detour-1945',
    title: 'Detour',
    tagline: 'He went looking for love... and hitched a ride with fate and death!',
    synopsis: 'A broke New York nightclub pianist hitchhikes to Hollywood to rejoin his girlfriend. But when the bookie giving him a ride dies mysteriously of a heart attack, the pianist panics, hides the body, takes his identity, and picks up a vicious blackmailer who holds his fate in her ruthless hands.',
    year: 1945,
    runtime: 67,
    rating: 'NR',
    imdbScore: 7.3,
    communityScore: 8.8,
    genres: ['Crime', 'Drama', 'Film Noir', 'Classic Cinema', 'Mystery'],
    language: 'English',
    director: 'Edgar G. Ulmer',
    cast: [
      { name: 'Tom Neal', character: 'Al Roberts', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Ann Savage', character: 'Vera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    streamUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    licenseType: 'Public Domain',
    licenseBadge: 'P.R.C. Public Domain',
    licenseDetails: 'PRC Pictures failed to register copyright renewals in 1973. Preserved by the Library of Congress National Film Registry.',
    officialStreamingProviders: [
      { name: 'Internet Archive', url: 'https://archive.org/details/Detour_1945', free: true, type: 'Public Archive' },
      { name: 'Tubi', url: 'https://tubitv.com/', free: true, type: 'Partner Platform' }
    ],
    downloadOptions: [
      {
        id: 'detour-1080p',
        label: '1080p 4K Nitrate Film Transfer',
        resolution: '1920x1080',
        codec: 'H.264',
        bitrate: '14 Mbps',
        audio: 'Mono 24-bit',
        fileSize: '1.7 GB',
        fileSizeBytes: 1825361100,
        url: 'https://media.w3.org/2010/05/video/movie_300.mp4',
        format: 'MP4'
      }
    ],
    subtitles: [],
    trending: false,
    popular: false,
    latest: false
  }
];

export const ALL_GENRES = [
  'All',
  'Sci-Fi',
  'Classic Cinema',
  'Animation',
  'Action',
  'Comedy',
  'Horror',
  'Mystery',
  'Film Noir',
  'Drama',
  'Adventure',
  'Cyberpunk'
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    movieId: 'tears-of-steel',
    movieTitle: 'Tears of Steel',
    type: 'Audio Sync' as const,
    description: 'Minor 0.5s audio delay on 5.1 stream at 03:20 mark. Video track is crisp.',
    status: 'Resolved' as const,
    timestamp: '2026-11-04 14:22'
  },
  {
    id: 'rep-2',
    movieId: 'metropolis-1927',
    movieTitle: 'Metropolis',
    type: 'Metadata Error' as const,
    description: 'Updated intertitle translation notes to reflect 2010 restored footage discovery.',
    status: 'Resolved' as const,
    timestamp: '2026-11-05 09:15'
  }
];

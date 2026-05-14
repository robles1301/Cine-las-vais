const CINE = {
  nombre: "Cines Las Vías",
  slogan: "Parque de Ocio Las Vías — Ciudad Real",
  direccion: "C/ Eras del Cerrillo, 1 — Parque de Ocio Las Vías, 13004 Ciudad Real",
  telefono: "926 921 472",
  email: "info@cineslasvias.es",
  web: "www.cineslasvias.es",
  horarioTaquilla: "Lunes a Domingo: 16:00 – 23:30",
  servicios: ["3D", "Parking gratuito", "Acceso adaptado", "Zona de ocio"],
  salas: [
    { id: 1,  nombre: "Sala 1",  capacidad: 280, tipo: "standard", filas: 14, asientosPorFila: 20 },
    { id: 2,  nombre: "Sala 2",  capacidad: 240, tipo: "standard", filas: 12, asientosPorFila: 20 },
    { id: 3,  nombre: "Sala 3",  capacidad: 200, tipo: "standard", filas: 12, asientosPorFila: 17 },
    { id: 4,  nombre: "Sala 4",  capacidad: 180, tipo: "standard", filas: 10, asientosPorFila: 18 },
    { id: 5,  nombre: "Sala 5",  capacidad: 160, tipo: "standard", filas: 10, asientosPorFila: 16 },
    { id: 6,  nombre: "Sala 6",  capacidad: 140, tipo: "standard", filas: 9,  asientosPorFila: 16 },
    { id: 14, nombre: "Sala 14 · Premium", capacidad: 80, tipo: "vip", filas: 8, asientosPorFila: 10 },
  ]
};

const PELICULAS = [
  {
    id: 1,
    titulo: "El Beso de la Mujer Araña",
    titulo_original: "Kiss of the Spider Woman",
    genero: ["Drama", "Musical"],
    duracion: 128,
    clasificacion: "12",
    rating: 7.5,
    año: 2026,
    director: "Bill Condon",
    reparto: ["Jennifer Lopez", "Diego Luna", "Tonatiuh"],
    sinopsis: "Adaptación del aclamado musical de Broadway basado en la novela de Manuel Puig. Dos hombres comparten celda en una prisión latinoamericana: uno político, otro un soñador que evade la realidad a través del cine. Un vínculo inesperado, poderoso y profundamente humano.",
    poster: "https://www.compraentradas.com/img/Carteles/el_beso_de_la_mujer_arana_2026.jpg",
    color: "linear-gradient(160deg, #1a0a2e 0%, #2d1050 40%, #0a1530 100%)",
    enCartelera: true,
    destacada: true,
    sesiones: [
      { id: 101, sala: 1, fecha: "2026-05-15", hora: "17:30", version: "ES" },
      { id: 102, sala: 1, fecha: "2026-05-15", hora: "20:00", version: "ES" },
      { id: 103, sala: 1, fecha: "2026-05-15", hora: "22:25", version: "ES" },
      { id: 104, sala: 14, fecha: "2026-05-15", hora: "20:00", version: "ES", vip: true },
      { id: 105, sala: 1, fecha: "2026-05-16", hora: "17:30", version: "ES" },
      { id: 106, sala: 1, fecha: "2026-05-16", hora: "20:00", version: "VO (SUB)" },
      { id: 107, sala: 1, fecha: "2026-05-17", hora: "22:25", version: "ES" },
    ]
  },
  {
    id: 2,
    titulo: "Michael",
    titulo_original: "Michael",
    genero: ["Musical", "Biopic"],
    duracion: 127,
    clasificacion: "12",
    rating: 7.8,
    año: 2026,
    director: "Antoine Fuqua",
    reparto: ["Jaafar Jackson", "Nia Long", "Miles Teller"],
    sinopsis: "La vida extraordinaria de Michael Jackson: desde sus orígenes en Gary, Indiana, hasta convertirse en el Rey del Pop. Un retrato íntimo, espectacular y complejo del artista más influyente del siglo XX.",
    poster: "https://www.compraentradas.com/img/Carteles/michael_2026.jpg",
    color: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 40%, #0d0d20 100%)",
    enCartelera: true,
    destacada: true,
    sesiones: [
      { id: 201, sala: 2, fecha: "2026-05-15", hora: "17:15", version: "ES" },
      { id: 202, sala: 2, fecha: "2026-05-15", hora: "19:45", version: "ES" },
      { id: 203, sala: 2, fecha: "2026-05-15", hora: "22:15", version: "ES" },
      { id: 204, sala: 14, fecha: "2026-05-15", hora: "18:25", version: "ES", vip: true },
      { id: 205, sala: 2, fecha: "2026-05-16", hora: "17:15", version: "VO (SUB)" },
      { id: 206, sala: 2, fecha: "2026-05-17", hora: "20:00", version: "ES" },
    ]
  },
  {
    id: 3,
    titulo: "El Diablo Viste de Prada 2",
    titulo_original: "The Devil Wears Prada 2",
    genero: ["Comedia", "Drama"],
    duracion: 118,
    clasificacion: "7",
    rating: 7.2,
    año: 2026,
    director: "David Frankel",
    reparto: ["Meryl Streep", "Anne Hathaway", "Emily Blunt"],
    sinopsis: "Miranda Priestly regresa más implacable que nunca. Años después, el mundo de la moda ha cambiado pero ella no. Andy Sachs deberá decidir hasta dónde está dispuesta a llegar en el juego más cruel de la industria.",
    poster: "https://www.compraentradas.com/img/Carteles/el_diablo_viste_de_prada_2_2026.jpg",
    color: "linear-gradient(160deg, #1a0a00 0%, #2a1500 40%, #1a0a10 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 301, sala: 3, fecha: "2026-05-15", hora: "17:20", version: "ES" },
      { id: 302, sala: 3, fecha: "2026-05-15", hora: "19:50", version: "ES" },
      { id: 303, sala: 3, fecha: "2026-05-15", hora: "22:15", version: "ES" },
      { id: 304, sala: 3, fecha: "2026-05-16", hora: "17:20", version: "ES" },
      { id: 305, sala: 3, fecha: "2026-05-17", hora: "19:50", version: "ES" },
    ]
  },
  {
    id: 4,
    titulo: "Mortal Kombat II",
    titulo_original: "Mortal Kombat 2",
    genero: ["Acción", "Fantasía"],
    duracion: 115,
    clasificacion: "16",
    rating: 6.8,
    año: 2026,
    director: "Simon McQuoid",
    reparto: ["Lewis Tan", "Josh Lawson", "Joe Taslim"],
    sinopsis: "Los guerreros de la Tierra regresan para enfrentarse a Shang Tsung en el torneo definitivo. Esta vez las apuestas son más altas: el destino de dos reinos pende de un hilo.",
    poster: "https://www.compraentradas.com/img/Carteles/mortal_kombat_II_2026.jpg",
    color: "linear-gradient(160deg, #1a0000 0%, #2a0808 40%, #0a0a1a 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 401, sala: 4, fecha: "2026-05-15", hora: "20:05", version: "ES" },
      { id: 402, sala: 4, fecha: "2026-05-15", hora: "22:20", version: "ES" },
      { id: 403, sala: 4, fecha: "2026-05-16", hora: "20:05", version: "VO (SUB)" },
      { id: 404, sala: 4, fecha: "2026-05-17", hora: "22:20", version: "ES" },
    ]
  },
  {
    id: 5,
    titulo: "Proyecto Salvación",
    titulo_original: "Project Salvation",
    genero: ["Ciencia Ficción", "Aventura"],
    duracion: 156,
    clasificacion: "12",
    rating: 7.9,
    año: 2026,
    director: "Phil Lord, Christopher Miller",
    reparto: ["Dwayne Johnson", "Zoe Saldana", "Chris Evans"],
    sinopsis: "Un equipo de científicos y soldados emprende una misión suicida al núcleo de la Tierra para detener una extinción masiva. Acción, ingenio y humanidad al límite del planeta.",
    poster: "https://www.compraentradas.com/img/Carteles/proyecto_salvacion_2026.jpg",
    color: "linear-gradient(160deg, #001a2a 0%, #002a3a 40%, #001015 100%)",
    enCartelera: true,
    destacada: true,
    sesiones: [
      { id: 501, sala: 1, fecha: "2026-05-15", hora: "21:05", version: "ES" },
      { id: 502, sala: 5, fecha: "2026-05-15", hora: "21:05", version: "VO (SUB)" },
      { id: 503, sala: 1, fecha: "2026-05-16", hora: "21:05", version: "ES" },
      { id: 504, sala: 14, fecha: "2026-05-16", hora: "21:00", version: "ES", vip: true },
      { id: 505, sala: 1, fecha: "2026-05-17", hora: "21:05", version: "ES" },
    ]
  },
  {
    id: 6,
    titulo: "La Momia",
    titulo_original: "The Mummy",
    genero: ["Terror", "Thriller"],
    duracion: 134,
    clasificacion: "18",
    rating: 7.1,
    año: 2026,
    director: "Lee Cronin",
    reparto: ["Tom Holland", "Florence Pugh", "Christoph Waltz"],
    sinopsis: "Una expedición arqueológica en Egipto desentierra algo que debería haber permanecido enterrado para siempre. El terror regresa con toda su fuerza en esta nueva visión del mito más aterrador de la historia.",
    poster: "https://www.compraentradas.com/img/Carteles/la_momia_de_lee_cronin_2026.jpg",
    color: "linear-gradient(160deg, #0a0800 0%, #1a1400 40%, #0a0505 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 601, sala: 5, fecha: "2026-05-15", hora: "21:10", version: "ES" },
      { id: 602, sala: 5, fecha: "2026-05-16", hora: "21:10", version: "ES" },
      { id: 603, sala: 6, fecha: "2026-05-16", hora: "22:30", version: "ES" },
      { id: 604, sala: 5, fecha: "2026-05-17", hora: "21:10", version: "ES" },
    ]
  },
  {
    id: 7,
    titulo: "Super Mario Galaxy: La Película",
    titulo_original: "Super Mario Galaxy: The Movie",
    genero: ["Animación", "Familiar"],
    duracion: 98,
    clasificacion: "7",
    rating: 7.6,
    año: 2026,
    director: "Aaron Horvath, Michael Jelenic",
    reparto: ["Chris Pratt", "Jack Black", "Anya Taylor-Joy"],
    sinopsis: "Mario y Luigi emprenden una aventura galáctica para rescatar a la Princesa Peach de las garras de Bowser, quien ha encontrado el poder de las Estrellas Luma para dominar el universo entero.",
    poster: "https://www.compraentradas.com/img/Carteles/super_mario_galaxy_la_pelicula_2026.jpg",
    color: "linear-gradient(160deg, #001a3a 0%, #00204a 40%, #0a1020 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 701, sala: 6, fecha: "2026-05-15", hora: "17:00", version: "ES" },
      { id: 702, sala: 6, fecha: "2026-05-15", hora: "19:05", version: "ES" },
      { id: 703, sala: 6, fecha: "2026-05-16", hora: "17:00", version: "ES" },
      { id: 704, sala: 6, fecha: "2026-05-17", hora: "17:00", version: "ES" },
      { id: 705, sala: 6, fecha: "2026-05-17", hora: "19:05", version: "ES" },
    ]
  },
  {
    id: 8,
    titulo: "Hokum",
    titulo_original: "Hokum",
    genero: ["Terror", "Misterio"],
    duracion: 107,
    clasificacion: "16",
    rating: 7.0,
    año: 2026,
    director: "Damian Mc Carthy",
    reparto: ["Abigail Hardingham", "Simon O'Connor"],
    sinopsis: "Una pareja llega a una remota casa rural donde encuentran los objetos de un ilusionista fallecido. Lo que empieza como curiosidad se convierte rápidamente en una pesadilla sin escapatoria.",
    poster: "https://www.compraentradas.com/img/Carteles/hokum_2026.jpg",
    color: "linear-gradient(160deg, #0a0a0a 0%, #151015 40%, #050510 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 801, sala: 4, fecha: "2026-05-15", hora: "20:40", version: "ES" },
      { id: 802, sala: 4, fecha: "2026-05-15", hora: "22:35", version: "ES" },
      { id: 803, sala: 4, fecha: "2026-05-16", hora: "22:35", version: "ES" },
      { id: 804, sala: 4, fecha: "2026-05-17", hora: "20:40", version: "ES" },
    ]
  },
  {
    id: 9,
    titulo: "Torrente Presidente",
    titulo_original: "Torrente Presidente",
    genero: ["Comedia"],
    duracion: 102,
    clasificacion: "16",
    rating: 6.5,
    año: 2026,
    director: "Santiago Segura",
    reparto: ["Santiago Segura", "Florentino Fernández", "Karra Elejalde"],
    sinopsis: "El agente más torpe de España se presenta a las elecciones presidenciales. Una campaña electoral como nunca se ha visto, con el humor más irreverente y gamberro del cine español.",
    poster: "https://www.compraentradas.com/img/Carteles/torrente_presidente_2026_2.jpg",
    color: "linear-gradient(160deg, #1a0a00 0%, #251500 40%, #100800 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 901, sala: 2, fecha: "2026-05-15", hora: "22:10", version: "ES" },
      { id: 902, sala: 3, fecha: "2026-05-16", hora: "22:10", version: "ES" },
      { id: 903, sala: 3, fecha: "2026-05-17", hora: "22:10", version: "ES" },
    ]
  },
  {
    id: 10,
    titulo: "El Señor de los Anillos: La Comunidad del Anillo",
    titulo_original: "The Lord of the Rings: The Fellowship of the Ring",
    genero: ["Fantasía", "Aventura"],
    duracion: 212,
    clasificacion: "12",
    rating: 9.0,
    año: 2001,
    director: "Peter Jackson",
    reparto: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
    sinopsis: "Versión extendida del clásico de Peter Jackson. El hobbit Frodo Baggins hereda el Anillo Único y emprende un peligroso viaje para destruirlo. El inicio de la saga más épica de la historia del cine.",
    poster: "https://www.compraentradas.com/img/Carteles/esdla_la_comunidad_del_anillo_vextend_2023.jpg",
    color: "linear-gradient(160deg, #0a1200 0%, #101a00 40%, #080e00 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 1001, sala: 1, fecha: "2026-05-15", hora: "21:00", version: "VO (SUB)" },
      { id: 1002, sala: 1, fecha: "2026-05-16", hora: "21:00", version: "ES" },
      { id: 1003, sala: 1, fecha: "2026-05-17", hora: "21:00", version: "VO (SUB)" },
    ]
  },
  {
    id: 11,
    titulo: "Las Ovejas Detectives",
    titulo_original: "Sheep & Wolves: Detective",
    genero: ["Animación", "Comedia"],
    duracion: 109,
    clasificacion: "7",
    rating: 7.0,
    año: 2026,
    director: "Kyle Balda",
    reparto: [],
    sinopsis: "Las ovejas más valientes del valle se convierten en detectives para resolver el misterio que tiene en jaque a todos los animales del bosque. Aventura y risas para toda la familia.",
    poster: "https://www.compraentradas.com/img/Carteles/las_ovejas_detectives_2026.jpg",
    color: "linear-gradient(160deg, #001520 0%, #001e2a 40%, #000e15 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 1101, sala: 6, fecha: "2026-05-15", hora: "18:00", version: "ES" },
      { id: 1102, sala: 6, fecha: "2026-05-16", hora: "18:00", version: "ES" },
      { id: 1103, sala: 6, fecha: "2026-05-17", hora: "18:00", version: "ES" },
    ]
  },
  {
    id: 12,
    titulo: "David: Una Aventura Gigante",
    titulo_original: "David: A Giant Adventure",
    genero: ["Animación", "Aventura"],
    duracion: 109,
    clasificacion: "7",
    rating: 7.2,
    año: 2026,
    director: "Phil Cunningham, Brent Dawes",
    reparto: [],
    sinopsis: "La historia bíblica de David y Goliat revisitada con animación moderna. Un joven pastor con más valentía que recursos se enfrenta al gigante más temido de su tiempo.",
    poster: "https://www.compraentradas.com/img/Carteles/david_una_aventura_gigante_2025.jpg",
    color: "linear-gradient(160deg, #100a20 0%, #1a1030 40%, #080510 100%)",
    enCartelera: true,
    destacada: false,
    sesiones: [
      { id: 1201, sala: 5, fecha: "2026-05-15", hora: "17:00", version: "ES" },
      { id: 1202, sala: 5, fecha: "2026-05-16", hora: "17:00", version: "ES" },
      { id: 1203, sala: 5, fecha: "2026-05-17", hora: "17:00", version: "ES" },
    ]
  }
];

const PROXIMOS_ESTRENOS = [
  {
    id: 20,
    titulo: "Iron Maiden: Burning Ambition",
    genero: ["Documental", "Música"],
    fechaEstreno: "2026-05-22",
    poster: "https://www.compraentradas.com/img/Carteles/iron_maiden_burning_ambition_2026.jpg",
    color: "linear-gradient(160deg, #0a0a0a 0%, #1a0000 100%)",
    clasificacion: "12",
    sinopsis: "El documental definitivo sobre Iron Maiden, la banda de heavy metal más influyente de todos los tiempos. 50 años de historia, música y leyenda."
  },
  {
    id: 21,
    titulo: "Jugada Maestra",
    genero: ["Comedia", "Thriller"],
    fechaEstreno: "2026-05-29",
    poster: "https://www.compraentradas.com/img/Carteles/jugada_maestra_2026.jpg",
    color: "linear-gradient(160deg, #001a10 0%, #002a18 100%)",
    clasificacion: "16",
    sinopsis: "Un timador de segunda fila se ve involucrado en el mayor fraude corporativo de la historia. Una comedia negra sobre avaricia, mentiras y una jugada que nadie vio venir."
  },
  {
    id: 22,
    titulo: "Un Hijo",
    genero: ["Drama"],
    fechaEstreno: "2026-06-05",
    poster: "https://www.compraentradas.com/img/Carteles/un_hijo_2026.jpg",
    color: "linear-gradient(160deg, #0a0a10 0%, #10101a 100%)",
    clasificacion: "12",
    sinopsis: "Un padre y su hijo adolescente intentan reconstruir su relación rota por años de distancia y malentendidos. Un drama íntimo sobre el amor familiar y la segunda oportunidad."
  },
  {
    id: 23,
    titulo: "La Familia Benetón +2",
    genero: ["Comedia", "Familiar"],
    fechaEstreno: "2026-06-12",
    poster: "https://www.compraentradas.com/img/Carteles/la_familia_beneton_2_2026.jpg",
    color: "linear-gradient(160deg, #001520 0%, #002030 100%)",
    clasificacion: "0",
    sinopsis: "La familia más caótica de España regresa con dos miembros más. El verano más disparatado, tierno e hilarante del año para toda la familia."
  }
];

const PRECIOS = {
  standard: { general: 8.00, reducida: 5.50, infantil: 4.50 },
  vip:      { general: 12.00, reducida: 9.00, infantil: 7.50 }
};

function getSesionById(id) {
  for (const p of PELICULAS) {
    for (const s of p.sesiones) {
      if (s.id === id) return { pelicula: p, sesion: s };
    }
  }
  return null;
}
function getSalaById(id)      { return CINE.salas.find(s => s.id === id); }
function getPeliculaById(id)  { return PELICULAS.find(p => p.id === id); }

function formatFecha(isoDate) {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('es-ES', { weekday:'short', day:'numeric', month:'short' });
}
function formatFechaLarga(isoDate) {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });
}

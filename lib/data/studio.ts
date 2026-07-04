export const STUDIO = {
  name: "Lumière",
  address: "54 Cummings Park, Woburn, MA 01801",
  phone: "(857) 353-1849",
  instagram: "https://instagram.com/princesstouchbeauty",
  handle: "@princesstouchbeauty",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-71.1505%2C42.4920%2C-71.1345%2C42.5000&layer=mapnik&marker=42.4960%2C-71.1425",
  mapLink:
    "https://www.openstreetmap.org/?mlat=42.4960&mlon=-71.1425#map=16/42.4960/-71.1425",
  hours: [
    { day: "Monday", time: "Closed", closed: true },
    { day: "Tuesday", time: "9:00 AM – 7:00 PM", closed: false },
    { day: "Wednesday", time: "9:00 AM – 7:00 PM", closed: false },
    { day: "Thursday", time: "9:00 AM – 7:00 PM", closed: false },
    { day: "Friday", time: "9:00 AM – 7:00 PM", closed: false },
    { day: "Saturday", time: "9:00 AM – 5:00 PM", closed: false },
    { day: "Sunday", time: "10:00 AM – 3:00 PM", closed: false },
  ],
} as const;

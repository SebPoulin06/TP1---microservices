export const seed = {
  staff: [
    { id: 1, name: 'Léa', role: 'server' },
    { id: 2, name: 'Sam', role: 'server' },
    { id: 3, name: 'Marc', role: 'kitchen' },
  ],
  tables: [1, 2, 3, 4, 5, 6].map((n) => ({
    id: n, number: n, seats: 4, status: 'free', serverId: null, guests: 0,
  })),
  menuItems: [
    { id: 1, name: "Soupe à l'oignon", category: 'starter', priceCents: 950, available: true },
    { id: 2, name: 'Tourtière', category: 'main', priceCents: 2200, available: true },
    { id: 3, name: 'Poutine', category: 'main', priceCents: 1600, available: true },
    { id: 4, name: 'Pouding chômeur', category: 'dessert', priceCents: 900, available: true },
    { id: 5, name: 'Limonade maison', category: 'drink', priceCents: 500, available: true },
    { id: 6, name: 'Pâté chinois', category: 'main', priceCents: 1900, available: false },
  ],
};
export const printMethods = {
  screen: {
    id: 'screen',
    label: 'Screen Printing',
    icon: '🖨️',
    tagline: 'Sharp. Scalable.',
    desc: 'Up to 8 colours, best for bulk',
    detail: 'Razor-sharp graphics with professional inks that bond deep into the fabric. Perfect for logos, illustrations, and high-impact designs.',
    basePrice: 95,
    features: ['Up to 8 colours', 'Bulk friendly', 'Long lasting'],
    minOrder: 1,
  },
  embroidery: {
    id: 'embroidery',
    label: 'Embroidery',
    icon: '🧵',
    tagline: 'Premium texture.',
    desc: 'Logo up to 10cm, 3D puff option',
    detail: 'Thread by thread, your design is stitched with precision. Adds dimension and a luxury finish that lasts a lifetime.',
    basePrice: 150,
    features: ['Up to 10cm design', '3D Puff available', 'Premium finish'],
    minOrder: 1,
  },
  dtg: {
    id: 'dtg',
    label: 'DTG Printing',
    icon: '🎨',
    tagline: 'Full colour freedom.',
    desc: 'Photo-quality, no minimums',
    detail: 'Direct-to-garment printing reproduces full-colour images, gradients, and fine details with stunning accuracy.',
    basePrice: 120,
    features: ['No minimums', 'Full colour', 'Photo quality'],
    minOrder: 1,
  },
  vinyl: {
    id: 'vinyl',
    label: 'Heat Transfer Vinyl',
    icon: '✂️',
    tagline: 'Clean edges.',
    desc: 'Names, numbers, single items',
    detail: 'Precise heat-applied vinyl for crisp text, numbers, and shapes. Perfect for sports kits, names, and bold single-colour designs.',
    basePrice: 80,
    features: ['Clean edges', 'Names & numbers', 'Single items'],
    minOrder: 1,
  },
};

export const garmentMultipliers = {
  tshirt: 1.0,
  hoodie: 1.4,
  polo: 1.2,
};

export const quantityTiers = [
  { min: 1, max: 4, label: 'Single', discount: 0, delivery: 35, badge: null },
  { min: 5, max: 19, label: 'Small Batch', discount: 0.15, delivery: 35, badge: 'MOST POPULAR' },
  { min: 20, max: 99, label: 'Bulk', discount: 0.35, delivery: 0, badge: null },
  { min: 100, max: Infinity, label: 'Business / Enterprise', discount: 0.45, delivery: 0, badge: 'BEST VALUE' },
];

export function getUnitPrice(method, garment, qty) {
  const base = printMethods[method]?.basePrice ?? 120;
  const gMult = garmentMultipliers[garment] ?? 1;
  const tier = quantityTiers.find(t => qty >= t.min && qty <= t.max) ?? quantityTiers[0];
  return Math.round(base * gMult * (1 - tier.discount));
}

export function getDelivery(qty) {
  const tier = quantityTiers.find(t => qty >= t.min && qty <= t.max) ?? quantityTiers[0];
  return tier.delivery;
}

export function calcTotal(method, garment, qty, designFee = 0) {
  const unit = getUnitPrice(method, garment, qty);
  const delivery = getDelivery(qty);
  return {
    unitPrice: unit,
    subtotal: unit * qty,
    delivery,
    designFee,
    total: unit * qty + delivery + designFee,
  };
}

export const paymentMethods = [
  { id: 'airtel', name: 'Airtel Money', icon: '📱', desc: 'Pay instantly via *115#. Available nationwide.' },
  { id: 'mtn', name: 'MTN MoMo', icon: '📲', desc: 'Send payment via *303#. Instant confirmation.' },
  { id: 'zamtel', name: 'Zamtel Kwacha', icon: '📡', desc: "Pay via Zamtel's mobile money platform." },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', desc: 'Direct transfer to our Stanbic / Zanaco business account.' },
  { id: 'card', name: 'Card Payment', icon: '💳', desc: 'Visa & Mastercard via DPO Pay / Pesapal.' },
  { id: 'cod', name: 'Cash on Delivery', icon: '🏠', desc: 'Available in Lusaka only. Confirmation call before delivery.' },
];

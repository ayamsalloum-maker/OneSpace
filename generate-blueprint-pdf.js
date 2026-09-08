import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  bufferPages: true
});

const outputPath = path.join(__dirname, 'OneSpace-Visual-Blueprint-2026.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Colors
const INK = '#17141F';
const MUTED = '#676270';
const BORDER = '#ECE8E1';
const SOFT_BG = '#FBFBFE';
const AYA_PINK = '#FF2F7D';
const AYA_VIOLET = '#7C4DFF';
const MOH_CYAN = '#24C7D9';
const MOH_PURPLE = '#5B35D5';
const US_ROSE = '#F0568A';
const US_AMBER = '#FFB020';
const US_MINT = '#43D9A3';

// Helper: Section header
function drawHeader(title, subtitle) {
  doc.rect(45, 35, doc.page.width - 90, 4).fill(AYA_PINK);
  doc.fillColor(INK).fontSize(20).font('Helvetica-Bold').text(title, 45, 48);
  if (subtitle) {
    doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(subtitle, 45, 72);
  }
  doc.strokeColor(BORDER).lineWidth(1).moveTo(45, 90).lineTo(doc.page.width - 45, 90).stroke();
  doc.y = 105;
}

// Helper: Pill Tag
function drawTag(text, x, y, bg = '#F0EBF8', fg = INK) {
  const w = doc.widthOfString(text, { font: 'Helvetica-Bold', size: 8 }) + 14;
  const h = 16;
  doc.roundedRect(x, y, w, h, 8).fill(bg);
  doc.fillColor(fg).fontSize(8).font('Helvetica-Bold').text(text, x + 7, y + 4);
  return w;
}

// ==========================================
// PAGE 1: EXECUTIVE VISION & CONCEPT
// ==========================================
doc.rect(45, 40, doc.page.width - 90, 6).fill(AYA_PINK);

doc.fillColor(INK).fontSize(32).font('Helvetica-Bold').text('OneSpace', 45, 60);
doc.fillColor(AYA_VIOLET).fontSize(14).font('Helvetica-Bold').text('PRODUCT, BRAND, UX & PLAYFULNESS BLUEPRINT', 45, 100);
doc.fillColor(MUTED).fontSize(11).font('Helvetica').text('Master Executive Summary & Visual DNA Guide — 2026 Edition', 45, 120);

doc.strokeColor(BORDER).lineWidth(1).moveTo(45, 145).lineTo(doc.page.width - 45, 145).stroke();

// Core thesis box
doc.roundedRect(45, 160, doc.page.width - 90, 80, 10).fill('#FFF4F7');
doc.fillColor(AYA_PINK).fontSize(11).font('Helvetica-Bold').text('THE DESIGN THESIS', 65, 175);
doc.fillColor(INK).fontSize(14).font('Helvetica-Bold').text('"One continuous digital world — not a dashboard of boxes."', 65, 192);
doc.fillColor(MUTED).fontSize(9.5).font('Helvetica').text(
  'OneSpace is a living operating world for Aya & Mohamad and their shared life. It reduces mental fragmentation, preserves personal history, and turns daily routines, interior architecture, fitness, and intimacy into an emotionally intelligent experience.',
  65, 212, { width: doc.page.width - 130, lineGap: 3 }
);

// 3 Pillars
const pillarW = (doc.page.width - 110) / 3;
const pY = 260;

// Pillar 1
doc.roundedRect(45, pY, pillarW, 110, 8).fill(SOFT_BG).strokeColor(BORDER).stroke();
doc.fillColor(AYA_PINK).fontSize(13).font('Helvetica-Bold').text('01. Elegant', 55, pY + 12);
doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(
  '• Pure bright-white canvas\n• Disciplined editorial typography\n• Zero beige or dusty washes\n• Quiet secondary surfaces\n• Generous whitespace to breathe',
  55, pY + 32, { width: pillarW - 20, lineGap: 3 }
);

// Pillar 2
doc.roundedRect(45 + pillarW + 10, pY, pillarW, 110, 8).fill(SOFT_BG).strokeColor(BORDER).stroke();
doc.fillColor(AYA_VIOLET).fontSize(13).font('Helvetica-Bold').text('02. Playful & Tactile', 55 + pillarW + 10, pY + 12);
doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(
  '• Real tactile steppers (+ / -)\n• Angled sticky notes (2-4° tilt)\n• Source-aware shuffles\n• Couple dice & time capsules\n• Breathing disc & live feedback',
  55 + pillarW + 10, pY + 32, { width: pillarW - 20, lineGap: 3 }
);

// Pillar 3
doc.roundedRect(45 + (pillarW + 10) * 2, pY, pillarW, 110, 8).fill(SOFT_BG).strokeColor(BORDER).stroke();
doc.fillColor(MOH_CYAN).fontSize(13).font('Helvetica-Bold').text('03. Personal', 55 + (pillarW + 10) * 2, pY + 12);
doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(
  '• User-owned photos & work\n• No generic stock illustrations\n• AES-GCM client encrypted vault\n• Living portfolio accumulation\n• Authentic partner connection',
  55 + (pillarW + 10) * 2, pY + 32, { width: pillarW - 20, lineGap: 3 }
);

// What makes it unique section
doc.fillColor(INK).fontSize(14).font('Helvetica-Bold').text('What Adjacent Products Got Wrong & The OneSpace Gap', 45, 395);
const compTable = [
  ['Notion', 'Requires tedious setup; feels like a sterile database table.', 'Pre-designed intelligence: deep structure is built-in.'],
  ['Structured / Tiimo', 'Rigid timeline checklists without emotional depth.', 'Combines daily flow with creative work, wellness & couple life.'],
  ['Paired / Cupla', 'Isolated couple chat or shared calendar with no personal worlds.', 'Three interconnected universes: Aya, Mohamad & Us.'],
  ['Finch', 'Juvenile gamification & cartoon pets.', 'Sophisticated, adult playfulness rooted in tactile action.']
];

let tableY = 420;
compTable.forEach(([app, weakness, fix]) => {
  doc.roundedRect(45, tableY, doc.page.width - 90, 36, 6).fill('#FAFAFD').strokeColor(BORDER).stroke();
  doc.fillColor(INK).fontSize(10).font('Helvetica-Bold').text(app, 55, tableY + 8);
  doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text(`Gap: ${weakness}`, 140, tableY + 7, { width: 190 });
  doc.fillColor(AYA_PINK).fontSize(8.5).font('Helvetica-Bold').text(`OneSpace: ${fix}`, 340, tableY + 7, { width: 195 });
  tableY += 42;
});

// Footer
doc.fillColor(MUTED).fontSize(8).font('Helvetica').text('OneSpace Visual Blueprint · Page 1 of 5 · Confidential & Prepared for Aya & Mohamad', 45, 780, { align: 'center' });

// ==========================================
// PAGE 2: MASTER VISUAL SYSTEM & COLOR LAW
// ==========================================
doc.addPage();
drawHeader('Master Visual System & The Color Law', 'Vivid controlled accents on pure white canvas — no washed-out beige');

doc.fillColor(INK).fontSize(12).font('Helvetica-Bold').text('The 3 Cardinal Visual Rules', 45, 110);

doc.roundedRect(45, 130, doc.page.width - 90, 75, 8).fill('#FFFDFB').strokeColor(BORDER).stroke();
doc.fillColor(INK).fontSize(9.5).font('Helvetica').text(
  '1. WHITE CARRIES THE EXPERIENCE (#FFFFFF):\n   The canvas is pure, high-contrast, bright white. It lets the vibrant colors pop and gives the mind room to breathe. Beige is forbidden as a background wash.\n\n2. COLOR MUST HAVE A JOB (NOT ARBITRARY DECORATION):\n   Every color belongs strictly to an identity family and communicates status, energy, or area. Tints are used at 8-15% only for subtle local atmosphere.\n\n3. TEXT CONTRAST ALWAYS WINS:\n   Never place low-contrast gray text on tinted cards. Body text is always deep Ink (#17141F) with high WCAG AA readability.',
  55, 138, { width: doc.page.width - 110, lineGap: 3 }
);

// Color swatches section
doc.fillColor(INK).fontSize(12).font('Helvetica-Bold').text('Official OneSpace Palette Tokens', 45, 225);

const swatches = [
  { name: 'Canvas White', hex: '#FFFFFF', role: 'Main background canvas', border: true },
  { name: 'Cool Pearl', hex: '#FCFCFF', role: 'Quiet secondary surfaces', border: true },
  { name: 'Ink Text', hex: '#17141F', role: 'Primary high-contrast typography' },
  { name: 'Blossom Pink', hex: '#FF2F7D', role: 'Aya primary / Intimacy / Action' },
  { name: 'Vivid Violet', hex: '#7C4DFF', role: 'Aya focus / Create / Intelligence' },
  { name: 'Lilac Tint', hex: '#E8DFFF', role: 'Aya reset / Breathing / Calm state' },
  { name: 'Aqua Cyan', hex: '#24C7D9', role: 'Mohamad hydration / Freshness' },
  { name: 'Rich Purple', hex: '#5B35D5', role: 'Mohamad depth / Tech / Gaming' },
  { name: 'Warm Rose (Us)', hex: '#F0568A', role: 'Shared chronicle / Love Bar / Nerves' },
  { name: 'Juicy Amber', hex: '#FFB020', role: 'Milestones / Nutrition / Warmth' },
  { name: 'Fresh Mint', hex: '#43D9A3', role: 'Home goals / Habits / Success' }
];

let swX = 45;
let swY = 245;
swatches.forEach((sw, idx) => {
  doc.roundedRect(swX, swY, 240, 36, 6).fill(SOFT_BG).strokeColor(BORDER).stroke();
  doc.roundedRect(swX + 6, swY + 6, 24, 24, 4).fill(sw.hex);
  if (sw.border) doc.roundedRect(swX + 6, swY + 6, 24, 24, 4).strokeColor(BORDER).stroke();
  
  doc.fillColor(INK).fontSize(9).font('Helvetica-Bold').text(sw.name, swX + 36, swY + 7);
  doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(`${sw.hex}  ·  ${sw.role}`, swX + 36, swY + 20);

  if (idx % 2 === 1) {
    swX = 45;
    swY += 42;
  } else {
    swX = 295;
  }
});

// Typography Contract
doc.fillColor(INK).fontSize(12).font('Helvetica-Bold').text('Typographic Pairing & Hierarchy', 45, 510);
doc.roundedRect(45, 530, doc.page.width - 90, 110, 8).fill(SOFT_BG).strokeColor(BORDER).stroke();

doc.fillColor(AYA_VIOLET).fontSize(16).font('Helvetica-Bold').text('Fraunces Serif', 55, 545);
doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(
  'Used exclusively for: Page titles, signature statements, emotional prompts ("How are you, really?"), and key celebration numbers. It gives the feeling of a refined personal book or luxury editorial journal. Never used for dense body text.',
  55, 568, { width: doc.page.width - 110, lineGap: 2 }
);

doc.fillColor(INK).fontSize(14).font('Helvetica-Bold').text('Inter Sans-Serif', 55, 600);
doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(
  'Used for: Controls, navigation, form inputs, counters, task lists, and information banks. Ensures instantaneous scannability, zero eye-strain, and crisp rendering across mobile and desktop.',
  55, 620, { width: doc.page.width - 110, lineGap: 2 }
);

doc.fillColor(MUTED).fontSize(8).font('Helvetica').text('OneSpace Visual Blueprint · Page 2 of 5 · Confidential & Prepared for Aya & Mohamad', 45, 780, { align: 'center' });

// ==========================================
// PAGE 3: THE 6 LAYOUT PRIMITIVES
// ==========================================
doc.addPage();
drawHeader('The 6 Layout Primitives', 'Replacing repetitive card walls with dynamic, purposeful rhythm');

const primitives = [
  {
    num: '1',
    title: 'Open Canvas',
    desc: 'Titles, mood check-ins, and high-level intentions sit directly on the clean white surface without bounding boxes. Feels open, light, and unconstrained.',
    example: 'Aya arrival: "How are you, really?" with tap-selectable feeling chips.'
  },
  {
    num: '2',
    title: 'Visual Rail',
    desc: 'A horizontal, swipeable strip of items side-by-side. Avoids vertical clutter and encourages quick horizontal browsing without forcing endless page scrolls.',
    example: 'Movement rail (Stretch, Walk, Dance, Strength) or Interior Studio rooms.'
  },
  {
    num: '3',
    title: 'Active Stage',
    desc: 'Selecting an option transforms a single dedicated area in-place instead of injecting new nested boxes below. Keeps focus on one decision at a time.',
    example: 'Creative Studio: switching between [Write], [Voice], and [Visual] modes.'
  },
  {
    num: '4',
    title: 'Editorial Split',
    desc: 'Two complementary ideas side-by-side in one balanced composition. Creates natural visual contrast between structured daily focus and spontaneous ideas.',
    example: 'Today’s main intention paired with a tactile tilted Sticky Note reminder.'
  },
  {
    num: '5',
    title: 'Timeline / Gallery',
    desc: 'Living, growing collections arranged organically. Removes rigid constraints and lets memories, meals, and inspirations accumulate beautifully.',
    example: 'Daily Food Collage (photo + time + feel) or Shared Polaroid memories.'
  },
  {
    num: '6',
    title: 'Immersive Moment',
    desc: 'A full-width, tranquil visual anchor with minimal UI noise, designed for nervous system soothing and grounding at the end of a busy day.',
    example: '4-7-8 Breathing disc with gentle breathing guidance and calm sounds.'
  }
];

let primY = 110;
primitives.forEach(p => {
  doc.roundedRect(45, primY, doc.page.width - 90, 68, 8).fill(SOFT_BG).strokeColor(BORDER).stroke();
  
  // Badge
  doc.roundedRect(55, primY + 12, 26, 26, 6).fill(AYA_PINK);
  doc.fillColor('#FFF').fontSize(12).font('Helvetica-Bold').text(p.num, 63, primY + 18);
  
  doc.fillColor(INK).fontSize(11).font('Helvetica-Bold').text(p.title, 90, primY + 12);
  doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text(p.desc, 90, primY + 28, { width: doc.page.width - 150 });
  doc.fillColor(AYA_VIOLET).fontSize(8).font('Helvetica-Bold').text(`Signature Use: ${p.example}`, 90, primY + 52);

  primY += 76;
});

// Shape grammar notice
doc.roundedRect(45, 580, doc.page.width - 90, 80, 8).fill('#F6FAFD').strokeColor(MOH_CYAN).stroke();
doc.fillColor(MOH_CYAN).fontSize(10).font('Helvetica-Bold').text('SHAPE GRAMMAR: STOP TURNING EVERYTHING INTO CIRCLES', 55, 595);
doc.fillColor(INK).fontSize(8.5).font('Helvetica').text(
  '• Default Content Surface: Soft rectangles with 14-18px corner radius.\n• Tabs & Navigation: Underline indicator or soft rectangular highlight — not pill bubbles.\n• Circles: Strictly reserved for avatars, progress circular dials, and breathing touchpoints.\n• Sticky Notes: Paper slips with 2° to 4° tilt and soft drop shadow. Maximum 1-2 visible per screen.',
  55, 612, { lineGap: 3 }
);

doc.fillColor(MUTED).fontSize(8).font('Helvetica').text('OneSpace Visual Blueprint · Page 3 of 5 · Confidential & Prepared for Aya & Mohamad', 45, 780, { align: 'center' });

// ==========================================
// PAGE 4: SIGNATURE PLAYFUL INTERACTIONS
// ==========================================
doc.addPage();
drawHeader('Signature Playful Interactions', 'Tactile behavior, joyful discovery, and intimate partner rituals');

const interactions = [
  {
    title: 'Tactile Stepper Counters',
    who: 'Fitness & Hydration',
    desc: 'Large legible numbers with instant tactile plus/minus buttons (+5 / -5). Directly updates workout stats and water vessel fills with immediate visual feedback.',
    badge: 'Tactile Feedback'
  },
  {
    title: 'Source-Aware Shuffles ("Pick For Me")',
    who: 'Aya Today & Shared Space',
    desc: 'Instead of generic random quotes, the shuffle button pulls from real stored product banks (Interior Studio challenges, house cleaning tasks, or Unravel questions) and always credits the source.',
    badge: 'Intelligent Shuffle'
  },
  {
    title: 'Unravel Couple Dice & Games',
    who: 'Shared Intimacy',
    desc: 'Rollable virtual dice generating an action and a location (e.g. "A slow, sweet kiss" + "On the balcony"). Truth or Dare cards, Heart-to-Heart questions, and Secret Fantasies.',
    badge: 'Playful Ritual'
  },
  {
    title: 'Sealed Time Capsules',
    who: 'Shared Memories',
    desc: 'Written love letters or anniversary notes sealed with a future unlock date. Keeps relationship milestones sacred and creates meaningful anticipation.',
    badge: 'Gated Reveal'
  },
  {
    title: 'Dual Voice Lockbox & Instant Love Bar',
    who: 'Private Couple Sync',
    desc: 'Send quick love taps ("Thinking of you", "Proud of your hard work") with one tap. Private encrypted voice notes stay locked until both partners record theirs.',
    badge: 'Zero Friction'
  },
  {
    title: 'Interactive 4-7-8 Breathing Disc',
    who: 'Sanctuary & Reset',
    desc: 'A calming pulsing disc with 4s inhale, 7s hold, and 8s exhale intervals, paired with relaxing background sound options (Gentle Rain, Cozy Hearth, Night Air).',
    badge: 'Nervous System Reset'
  }
];

let intY = 110;
interactions.forEach(item => {
  doc.roundedRect(45, intY, doc.page.width - 90, 72, 8).fill(SOFT_BG).strokeColor(BORDER).stroke();
  
  doc.fillColor(INK).fontSize(11).font('Helvetica-Bold').text(item.title, 55, intY + 12);
  doc.fillColor(AYA_PINK).fontSize(8.5).font('Helvetica-Bold').text(`Space: ${item.who}`, 55, intY + 28);
  doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text(item.desc, 55, intY + 42, { width: doc.page.width - 200 });

  // Tag
  drawTag(item.badge, doc.page.width - 150, intY + 12, '#FFEAF1', AYA_PINK);

  intY += 80;
});

// Reminder note
doc.roundedRect(45, 610, doc.page.width - 90, 60, 8).fill('#FFFDF0').strokeColor(US_AMBER).stroke();
doc.fillColor(US_AMBER).fontSize(10).font('Helvetica-Bold').text('NOTE: PLAYFULNESS COMES FROM INTERACTION, NOT DECORATION', 55, 622);
doc.fillColor(INK).fontSize(8.5).font('Helvetica').text(
  'True delight happens when tapping a button feels responsive, rewarding, and purposeful. We avoid superficial cartoon stickers or floating confetti in favor of smooth physics, satisfying clicks, and meaningful partner revelations.',
  55, 638, { width: doc.page.width - 110, lineGap: 2 }
);

doc.fillColor(MUTED).fontSize(8).font('Helvetica').text('OneSpace Visual Blueprint · Page 4 of 5 · Confidential & Prepared for Aya & Mohamad', 45, 780, { align: 'center' });

// ==========================================
// PAGE 5: THREE WORLDS & IMPLEMENTATION CONTRACT
// ==========================================
doc.addPage();
drawHeader('The Three Worlds & Implementation Contract', 'Strict architecture for the step-by-step rollout');

// Three worlds table
doc.fillColor(INK).fontSize(12).font('Helvetica-Bold').text('The 3 Spaces Architecture', 45, 110);

const worlds = [
  {
    title: 'Aya’s Space (Sanctuary, Create & Grow)',
    color: AYA_PINK,
    points: [
      '• Today View: Flowing rhythm from check-in ➔ tasks ➔ movement rail ➔ food collage ➔ reset.',
      '• Interior Studio: Hero architectural hub with real room plans (Bedroom, Living, Kitchen, Bath), dimensions, technical drawings, and user portfolio.',
      '• Creative Studio: Voice-over, writing & visual idea capture with creative draft shelves.',
      '• One-Week Strip: 7-day horizontal planning canvas with integrated shopping drawer.'
    ]
  },
  {
    title: 'Mohamad’s Space (Tech, Fitness & Focus)',
    color: MOH_CYAN,
    points: [
      '• Tactical Workouts: Rep steppers for pushups, bicep curls, tricep dips, and squats.',
      '• Recharge Modes: Visual mode switcher (Gaming, Music, Rest, Outside) to reset focus.',
      '• Visuality & Work Pipeline: Structured CRM for leads, projects, client stages, and revenue.',
      '• Gamer Theme: Sophisticated technological energy, never generic dark mode.'
    ]
  },
  {
    title: 'Shared / Us Space (Intimacy & Future Home)',
    color: US_ROSE,
    points: [
      '• Living Chronicle: Live days count together + countdown to moving into the shared home.',
      '• Partner Sync: Gated emotional check-in, Instant Love Bar, and private voice exchanges.',
      '• Future Home Sanctuary: Room wishlist, budget ledger, circular savings progress dial.',
      '• Unravel Games: Couple Dice, Truth or Dare, Heart-to-Heart, and Time Capsules.'
    ]
  }
];

let wY = 130;
worlds.forEach(w => {
  doc.roundedRect(45, wY, doc.page.width - 90, 95, 8).fill(SOFT_BG).strokeColor(BORDER).stroke();
  doc.rect(45, wY, 5, 95).fill(w.color);
  
  doc.fillColor(w.color).fontSize(11).font('Helvetica-Bold').text(w.title, 58, wY + 10);
  doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text(w.points.join('\n'), 58, wY + 28, { lineGap: 3 });

  wY += 105;
});

// Non-negotiable Contract
doc.fillColor(INK).fontSize(12).font('Helvetica-Bold').text('The Non-Negotiable Engineering Contract', 45, 465);
doc.roundedRect(45, 485, doc.page.width - 90, 150, 8).fill('#FFF4F7').strokeColor(AYA_PINK).stroke();

doc.fillColor(AYA_PINK).fontSize(10).font('Helvetica-Bold').text('STRICT COMMITMENT TO DATA PRESERVATION & CRAFT', 55, 498);
doc.fillColor(INK).fontSize(8.5).font('Helvetica').text(
  '1. ZERO DATA LOSS:\n   All existing routes, state structures, local AES-GCM vault security, information banks (Interior Studio scenes, CRM leads, routines, memories, audio recordings) MUST be 100% preserved.\n\n2. REIMAGINE PRESENTATION ONLY:\n   We do not cut features to make things look cleaner. We upgrade the presentation layer from boxed clutter into an elegant, high-contrast, living world.\n\n3. STEP-BY-STEP BUILD ORDER:\n   Phase 1: Main Portal (Open identities, no cards)\n   Phase 2: Aya Today (Flowing day composition)\n   Phase 3: Grow & Learn + Interior Studio (Hero architectural studio)\n   Phase 4: Create Studio & One-Week Canvas\n   Phase 5: Mohamad Space & Shared Us Center',
  55, 515, { width: doc.page.width - 110, lineGap: 2.5 }
);

// Sign-off
doc.fillColor(INK).fontSize(10).font('Helvetica-Bold').text('Ready for Step-by-Step Implementation with Aya.', 45, 660);
doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text('OneSpace · Designed with love, craft, and technical precision.', 45, 675);

doc.fillColor(MUTED).fontSize(8).font('Helvetica').text('OneSpace Visual Blueprint · Page 5 of 5 · Confidential & Prepared for Aya & Mohamad', 45, 780, { align: 'center' });

doc.end();

stream.on('finish', () => {
  console.log(`Successfully generated PDF blueprint at: ${outputPath}`);
});

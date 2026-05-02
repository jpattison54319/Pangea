# Figma Make Prompt — Global Cultural Education App (iOS & Android High-Fidelity Prototype)

## 1. Project Overview

Build a fully wired, interactive, high-fidelity prototype for a mobile app (working title: **Pangea**) that lets people experience authentic local culture around the world through short-form vertical video answers to daily cultural questions from real locals. Produce **two platform variants: iOS (Human Interface Guidelines) and Android (Material 3)** — same design system, platform-native affordances. Every screen in the inventory below must be reachable via tap, swipe, or gesture. No screen should be a dead end.

**One-line pitch:** "See your planet through the eyes of locals."

**Core mechanic:**
- Anyone can browse the feed anonymously — no account, no email, no location permission.
- To post, comment, or follow, users must answer one daily cultural question about their own region. This unlocks contribution features for 24 hours.
- Users explore a 3D spinnable globe with heat-map hotspots; zooming into a region launches a TikTok-style vertical reel of answers from that place.

---

## 2. Who This Is For

Primary persona **"Maria"** — ages 16–35, globally distributed, digitally native (TikTok/Instagram fluent), observer-first behavior (scrolls before participating), privacy-sensitive, low tolerance for complex UI or heavy data requirements.

**Regional design constraints surfaced in user research — treat as binding:**

- **US users:** extreme data-collection sensitivity; abandon app if onboarding asks for location, real name, or personal habits without justification. Expect TikTok-grade UX polish, immediate gratification, gamification, and a real "I don't know" option.
- **Guatemala users:** hyper-aware of being manipulated; will leave if app feels corporate, gimmicky, or complex. Need visible social proof, authenticity signals, and a proven-safe environment before contributing.
- **Namibia users:** view app as cultural preservation, not entertainment. Low-bandwidth, older devices — heavy video uploads cause deletion. Mandatory email verification is a blocker. Want their traditions (e.g., Olufuko festival) documented accurately, not misrepresented.

---

## 3. Design Principles (Non-Negotiable)

1. **Zero-friction entry.** Feed is reachable from cold start in ≤2 taps. No credential walls before value.
2. **Observer-first.** Browsing, reading comments, and watching are always anonymous-friendly.
3. **Cultural respect, not novelty.** Copy, illustration, and animation treat cultures as living traditions. No cartoon stereotypes, no stock travel imagery.
4. **Low-stake participation.** Every daily question offers "I don't know" and "Skip for today." Engagement without posting (likes, trivia, polls) is rewarded equally.
5. **Authentic, not corporate.** Warm, human, slightly textured aesthetic. Avoid sterile SaaS patterns, purple gradients, and startup-template polish.
6. **Gamification optional, never gating.** Streaks, fog-of-war globe, and region unlocks drive return visits but never lock content.
7. **Privacy as trust signal.** Visible community guidelines, verified-local badges, explicit justification for any permission, default-off notifications.

---

## 4. Visual Design System

**Palette:**
- Primary (terracotta, earth/travel): `#C9633A`
- Secondary (deep teal, water/globe): `#1F6B6B`
- Accent (warm gold, streaks/rewards): `#E8B04B`
- Surface light: `#F7F3EE`
- Surface dark / ink: `#1A1A1A`
- Muted text: `#6B6860`
- Success: `#3A8A5C` · Error: `#B33A3A`
- Support full light + dark mode.

**Typography:**
- Display / headlines: warm serif (Fraunces or Recoleta).
- Body / UI: humanist sans (Inter or DM Sans).
- Captions / metadata: same sans, smaller weight, slightly looser tracking.

**Iconography:** custom-feeling, rounded, 1.5px stroke. Generic line icons are forbidden. Specifically design: globe marker, streak flame, verified-local checkmark, question mark, record button, passport stamp.

**Motion:**
- Globe rotation uses inertial physics with natural dampening.
- Region zoom: ease-in-out, ~500ms, with altitude-like reveal of labels.
- Reel transitions: snap with subtle haptic cue (indicate on mobile).
- Streak flame: warm particle bloom on increment.
- Fog-of-war unlock: golden ripple outward from unlocked region.
- All motion respects `prefers-reduced-motion`.

**Voice & tone:** warm, curious, respectful, globally neutral. Avoid slang that doesn't translate. Never say "community" as marketing filler — earn it.

---

## 5. Screen Inventory & Wired Flows

### FLOW A — Anonymous Cold-Start (default entry)

1. **Splash** — logo + globe animation (1.5s).
2. **Welcome** — headline "See the world through locals." Primary CTA: *Start exploring* (no account). Secondary: *Create account*.
3. **Observer Onboarding** — 3 swipeable cards:
   - Card 1: "Spin the globe. Land anywhere."
   - Card 2: "Watch real locals answer questions about home."
   - Card 3: "Answer today's question from your own region to join in."
   Skip visible on every card. Final CTA: *Start exploring*.
4. **Home — Globe View** (see Flow B). Bottom nav: **Globe** (selected) · **Reel** · **Today's Q** · **Profile** (Profile is soft-gated; tap prompts account sheet).

### FLOW B — Globe Exploration

1. **Globe View** — "Take a Spin… Where do you want to go?" 3D draggable globe with heat-map hotspots sized by video density. Spin button triggers random region. Streak flame top-right.
2. **Zoom Level 1** — "Zooming in… United States… Midwest." Map outlines fade in as altitude drops.
3. **Zoom Level 2** — "Check out what's going on in Kansas City, MO, USA." Pulsing ring over city hotspot.
4. **Reel Entry** — tapping ring transitions into full-screen vertical Reel (Flow C).

### FLOW C — Video Reel

- Full-screen vertical video. Overlay: question being answered (top), @username + location tag (bottom-left), right rail (like, comment, share, save, more).
- Swipe up/down: next/previous video.
- Swipe right: return to globe with smooth zoom-out.
- Double-tap: like with heart bloom.
- Tap question pill: filter reel to all answers to this question worldwide.
- Tap @username: half-sheet profile preview with follow button (account-gated).
- At least 3 fully populated dummy videos for prototype swiping.

### FLOW D — Like / Comment / Share (from Reel)

1. **Like (anonymous)** — heart animates, count increments locally, then soft prompt: "Save your likes — create a free account." Dismissible.
2. **Like (account)** — persists, no prompt.
3. **Comment** — tap icon opens drawer at 70% screen height. List of comments with avatar, handle, body, timestamp, like-per-comment. Input pinned bottom. Anonymous users can read; posting opens account sheet.
4. **Share** — native share sheet representation.
5. **Save** — account-gated; adds to Passport collection.

### FLOW E — Daily Question (Contribution Gate)

1. **Entry** — triggered by tapping *Today's Q* tab, or by attempting to post/comment/follow as anonymous.
2. **Question Modal** — slides up. Localized question based on IP or user-selected region.
   - Primary CTA: *Answer*
   - Secondary: *I don't know — show me others'* → deep-links into reel filtered to this question.
   - Tertiary: *Skip for today* (confirmation sheet: "You'll keep your streak but lose today's unlock. Continue?")
3. **Composer (chat-style)** — question appears as incoming bubble. Bottom input field with placeholder "Type response here." Left: **+** media button. Right: **send**.
4. **Media Dropdown (from +)** — three options: *Choose media* · *Record video* · *Take photo*.

   **E1. Video path**
   - Tap *Record video* → full-screen camera with red record button (hold or tap-to-start, max 60s), timer, flip-camera, flash toggle, close (X).
   - Stop → preview screen with red X (discard) and green ✓ (keep).
   - ✓ appends video bubble to composer. Optional caption field appears. Tap *send*.

   **E2. Photo path**
   - Tap *Choose media* → gallery grid (mocked, 6–9 tiles, multi-select visual, confirm ✓ top-right).
   - Or tap *Take photo* → same camera component as video, photo mode.
   - Confirm → photo bubble in composer. Optional caption. *Send*.

   **E3. Text + background path**
   - User types text, no media.
   - Before send, prompt "Pick a background" → sheet with 6 stock backgrounds + *Upload photo* + *Take photo*.
   - Preview composed card. *Send*.

5. **Account Prompt (first post only)** — before send fires, anonymous users see minimal sign-up sheet (Flow F). Return to composer on completion, auto-send.
6. **Upload State** — route to Profile. New post tile shows green progress bar overlay. Toast: "Uploading — feel free to keep exploring." Toast dismisses after 3s.
7. **Post-Answer Unlock** — streak flame animates (+1). Banner appears on Globe: "You unlocked today — post, comment, and follow for 24h."

### FLOW F — Account Creation (on-demand)

Triggered by: first post, first comment, first follow, tapping Profile tab, or explicit *Create account*.

1. **Join Sheet** — title "Join the community." Three buttons: *Continue with Apple* · *Continue with Google* · *Continue with Email*.
2. **Email Path**
   - Step 1: Email input → send code.
   - Step 2: 6-digit code, auto-advance per digit.
   - Step 3: Display name (handle @auto-generated, editable).
   - Step 4: Home region (auto-detected, editable via search).
   - No phone, no real name, no birthday required.
3. **Community Guidelines** — one scrollable screen. Must tap *I agree*. Copy emphasizes respect, anti-harassment, anti-misrepresentation, and explicit consequences.
4. **Return** — auto-completes the original action that triggered the sheet.

### FLOW G — Profile

1. **Own Profile** — avatar, handle, home region, streak flame + number, countries unlocked count, posts grid (3-column thumbnails; in-progress post shows green bar).
2. **Tap post** — opens in Reel view.
3. **Settings** (gear icon top-right)
   - Privacy (granular: who can see posts, comment, follow).
   - Notifications (all **OFF by default**; explicit opt-in toggles per type).
   - Content language preferences.
   - Blocked users.
   - Download my data.
   - Delete account (two-step confirmation).
4. **Other User Profile** — same layout, follow button, report icon, message button (account-gated).

### FLOW H — Search & Category Filter

1. **Search Tab** — top input, category chips: Food · Festivals · Music · Daily Life · Language · Traditions. Region filter (dropdown). Question-of-the-day archive (scrollable list of past questions, tappable to filter reel).
2. **Tap category** — loads reel pre-filtered.
3. **Tap archived question** — reel filtered to that question, any region.

### FLOW I — Gamification Layer

1. **Streak** — visible on Profile and top-right of Globe. Tap → detail sheet: calendar (answered days lit, skips shown muted), longest streak, freeze tokens (earned, not bought).
2. **Fog-of-War Globe** — first-time users see globe partially dimmed. Region unlocks after user watches ≥3 videos from it OR answers a question. Unlock = golden ripple animation + "Passport stamp earned."
3. **Passport** — accessible from Profile. Grid of unlocked region stamps, tally, and next-region hint.

### FLOW J — Notifications (account only)

Represent these as a Notifications screen (bell icon in nav if signed in):
- Daily question reminder (respectful tone, opt-in only).
- "Someone in [region] answered your question."
- New comment reply.
- New follower milestones (10, 100, 1000).

---

## 6. Microinteractions & States to Prototype

- Globe spin with inertia; snap to region on tap.
- Video reel loading skeleton (not a spinner — a subtle texture shimmer).
- Upload progress bar on post tile.
- Like double-tap heart bloom + haptic.
- Streak +1 flame bloom.
- Fog-of-war golden ripple.
- "Come back tomorrow" state when daily question already answered (countdown timer + *Browse the reel* CTA).
- Empty region state: "Be the first to share [region]'s story" (if user's home region matches).
- Network failure during upload: retry UI, local draft preserved.
- Flagged content: blurred thumbnail + "Review in progress" overlay.

---

## 7. Seed Content (use these verbatim in the prototype)

**Daily questions (localized examples):**
- US: "What is a place to eat near you visitors have to visit? What should they order?"
- Namibia: "Describe one tradition from your community that outsiders often misunderstand."
- Guatemala: "¿Cuál es una comida de tu región que nadie más sabe hacer como aquí?"
- Japan: "What small daily ritual in your neighborhood would a visitor never notice?"
- Iceland: "Where do locals actually go that tourists never find?"

**Dummy regions with content:** Kansas City MO USA · Windhoek Namibia · Antigua Guatemala · Tokyo Japan · Reykjavik Iceland.

**Dummy video titles (for reel):** "BBQ Fest Celebration" · "KC Chiefs Football Game" · "Olufuko Festival Day 1" · "Semana Santa Procession" · "Tsukiji Morning Market" · "Reykjavik Winter Solstice."

**Dummy handles:** `@maya.kc`, `@tuahepa.wnb`, `@isabela.ant`, `@kenji.tyo`, `@bjorn.rvk`. Use neutral, initial-based avatar placeholders, not stock faces.

---

## 8. Accessibility (required)

- Tap targets ≥44×44pt (iOS) / ≥48×48dp (Android).
- WCAG AA contrast minimum across all text/background pairs.
- Dynamic Type / scalable text support.
- VoiceOver / TalkBack labels on every interactive element.
- Auto-captions shown by default on videos in the prototype.
- `prefers-reduced-motion` alternative for globe spin, fog ripple, streak bloom.
- Language attribute set per-video so screen readers switch voices.

---

## 9. Platform Variants

Produce both builds. Shared design system, platform-correct affordances.

**iOS**
- SF Symbols for system icons where custom isn't specified.
- Bottom tab bar, iOS-style.
- Modals as bottom sheets with rubber-band dismiss.
- Navigation bar with large-title behavior where appropriate.
- Haptic cues represented visually where platform permits.

**Android**
- Material 3 components.
- Bottom navigation with active indicator pill.
- FAB for primary post/answer action on Today's Q tab.
- Container-transform motion on reel entry from globe.
- Material dialog/sheet styles.

---

## 10. Out of Scope

- Real authentication or backend wiring.
- Monetization, subscriptions, ads, coins.
- Creator studio beyond the daily composer.
- Admin / moderation dashboards.
- Language translation engine (show placeholder "Translate" button but don't build the flow).

---

## 11. Deliverable Checklist

- [ ] iOS build with all 10 flows (A–J) wired.
- [ ] Android build with all 10 flows wired.
- [ ] Light and dark mode for both.
- [ ] At least 3 populated dummy videos with working swipe in Reel.
- [ ] At least 5 globe hotspots with drill-down.
- [ ] All modals dismissible, all back-nav functional.
- [ ] Community Guidelines screen with real copy, not lorem.
- [ ] Settings → Notifications screen with all toggles default OFF.
- [ ] Empty, loading, error, and success states for Daily Question, Upload, and Reel.
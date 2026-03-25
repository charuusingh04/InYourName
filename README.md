# 💙 Charu's Romantic Medical Birthday Website

A beautifully crafted, deeply emotional birthday website for Charu from Apoorv. This is a journey through a clinic where one patient discovers that his heart belongs to Dr. Charu.

## 🎯 Website Overview

The website tells a romantic story through 7-8 pages, blending medical themes with profound emotional expressions.

### Pages:
1. **Landing Page** (`index.html`) - Welcome with 3-question quiz
2. **Birthday Page** (`birthday.html`) - Birthday greeting with confetti
3. **Patient Report** (`love_report.html`) - Medical diagnosis of love
4. **Memory Gallery** (`memories.html`) - Photo gallery as case history
5. **Why I Love You** (`reasons.html`) - Prescription-style reasons
6. **Future Plan** (`future.html`) - Lifetime prescription together
7. **Heart Monitor** (`heart_monitor.html`) - ECG visualization & diagnosis
8. **Forever Page** (`forever.html`) - Final message with hidden heart icon
9. **Secret Letter** (`secret_letter.html`) - Hidden page unlocked after 7 heart clicks

## 🚀 Quick Start

### 1. Add Your Memory Photos

Place your memory photos in the `images/photos/` folder:
- `case_01.jpg` - The Smile That Changed Everything
- `case_02.jpg` - The Hug That Felt Like Home
- `case_03.jpg` - The Moment My Heart Said Yes
- `case_04.jpg` - Quiet Moments, Loud Love
- `case_05.jpg` - Forever Starts With You

Photos should ideally be:
- JPG or PNG format
- 800x600px or larger (will be resized responsively)
- Rectangular/landscape oriented

If photos aren't available, placeholders will show with gradient backgrounds.

### 2. Add Background Music (Optional)

The website supports background music. To add:

**Option A: Using Free Online Audio**
- Edit `script.js` line ~89
- Replace the URL with a royalty-free instrumental link from:
  - [Pixabay Music](https://pixabay.com/music/)
  - [Free Music Archive](https://freemusicarchive.org/)
  - [YouTube Audio Library](https://www.youtube.com/audiolibrary)

**Option B: Using Local Audio File**
- Place your `background.mp3` file in a new `music/` folder
- The HTML already references `music/background.mp3`
- Use MP3, WAV, or OGG format

### 3. Open Website

Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

## 🎨 Features

### ✨ Interactive Elements
- **3-Question Quiz** - Landing page asks 3 questions; all must be "Yes" to proceed
- **Confetti Animation** - Celebratory effect on birthday page
- **ECG Heartbeat** - Animated electrical cardiovascular graph
- **Floating Hearts** - Particles that float upward
- **Glow Effects** - Highlighting important emotional moments
- **Music Toggle** - On/off button for background music (persists via localStorage)

### 🎭 Special Features
- **Hidden Love Letter** - Click the small heart icon (💌) on Forever page 7 times to unlock a secret page with a deeply personal love letter
- **Heartbeat Button** - "Listen to Heartbeat" button that accelerates ECG animation and shows emotional text
- **Vibration API** - Heartbeat vibration on supported devices
- **Responsive Design** - Fully mobile-friendly (tested on 320px to 2560px width)
- **Smooth Animations** - Fade-ins, slides, and cascading effects throughout

### 🎨 Design System
- **Colors**: White, Pastel Pink (#FFD6E8), Teal (#4A9B9E), Soft Blue (#B4D7E8)
- **Fonts**: 
  - Playfair Display (headings)
  - Poppins (body text)
  - Great Vibes (emotional accents)
- **Medical Theme**: Prescription cards, medical reports, case files
- **Romantic Theme**: Soft colors, gentle animations, emotional messaging

## 🛠️ Customization

### Change Colors
Edit the CSS variables at the top of `style.css`:
```css
:root {
  --color-pink: #FFD6E8;
  --color-teal: #4A9B9E;
  --color-blue: #B4D7E8;
  /* ... more colors ... */
}
```

### Edit Messages
- Birthday message: Edit `birthday.html` around line 25
- Patient report: Edit `love_report.html` around line 40
- Reasons for love: Edit `reasons.html` - add/modify prescription cards
- Secret letter: Edit `secret_letter.html` around line 30
- All other text content is editable in the respective HTML files

### Change Navigation Links
All links use `navigateTo('page.html')` function. To adjust the flow, modify the button onclick attributes.

## 💾 File Structure

```
Charu's Birthday/
├── index.html              # Landing page
├── birthday.html           # Birthday greeting
├── love_report.html        # Medical diagnosis
├── memories.html           # Photo gallery
├── reasons.html            # Why I love you
├── future.html             # Future together
├── heart_monitor.html      # ECG visualization
├── forever.html            # Final message
├── secret_letter.html      # Hidden page
│
├── style.css               # All styling & animations
├── script.js               # Shared JavaScript
│
├── images/
│   └── photos/
│       ├── case_01.jpg     # Memory photos (add yours)
│       ├── case_02.jpg
│       ├── case_03.jpg
│       ├── case_04.jpg
│       └── case_05.jpg
│
└── music/
    └── background.mp3      # Optional background music
```

## 🔐 Hidden Features

### Secret Letter Page
- Located at `secret_letter.html`
- **Unlocked by**: Clicking the small heart icon (💌) on the Forever page **7 times**
- Click counter resets when you navigate away
- Unlock status persists in browser localStorage
- When unlocked:
  - A notification appears
  - Button to navigate to secret letter
  - Page shows deeply personal love letter
  - Includes heartbeat vibration
  - Soft glowing animation

### Heartbeat Button
- Present on Heart Monitor page
- Accelerates ECG animation
- Shows emotional text
- Triggers heartbeat vibration pattern
- Can be clicked multiple times

## 🎵 Audio & Vibration

### Background Music
- Toggle button in top-right (🔇 / 🎵)
- Muted by default (browsers block autoplay)
- Click button to enable
- Preference saved in browser storage
- Works on all pages

### Vibration
- Triggers on:
  - Heart monitor visualization
  - Heartbeat button click
  - Secret page unlock
  - Secret page reveal
- Gracefully degrades on devices without vibration API

## 📱 Mobile Responsive

The website is fully responsive and optimized for:
- **Mobile** (320px - 480px): Single column, touch-friendly buttons
- **Tablet** (481px - 768px): Two-column layouts
- **Desktop** (769px+): Multi-column grids and full animations

All text is readable, buttons are 44px+ for touch, and animations perform smoothly.

## 🌐 Browser Support

**Fully Supported:**
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Graceful Degradation:**
- Older browsers will work but may miss some animations
- Audio and vibration features are optional enhancements

## 💡 Tips & Tricks

### For Maximum Impact:
1. Open in fullscreen (F11)
2. Enable sound for background music
3. Open on a device that supports vibration for full experience
4. On forever.html, try clicking the heart icon 7 times as an easter egg
5. Use the heartbeat button on the heart monitor page

### Before Going Live:
1. ✅ Add all 5 memory photos to `images/photos/`
2. ✅ Test on mobile (use browser DevTools)
3. ✅ Test hidden page unlock (7 clicks on Forever page)
4. ✅ Add background music (or it works without it)
5. ✅ Verify all text customizations are correct
6. ✅ Check all links work properly

## 🚨 Troubleshooting

### Music not playing?
- Make sure audio file is in `music/background.mp3` or update the URL in `script.js`
- Click the music toggle button (🎵) to enable
- Some browsers require user interaction before playing audio

### Photos not showing?
- Verify files are in `images/photos/` folder
- File names must be: `case_01.jpg`, `case_02.jpg`, etc.
- Check browser console for file path errors
- Placeholder gradients will show if images can't load

### Animations not smooth?
- Try a different browser
- On mobile, disable other apps running in background
- Some older devices may struggle with confetti animation

### Hidden page not unlocking?
- Make sure you're clicking the heart emoji (💌) on the Forever page
- You need exactly 7 clicks
- Click counter resets when you navigate away
- Try opening browser console to verify clicks are registered

## 📝 Notes for Future Updates

- This is a static HTML/CSS/JS website (no backend required)
- All state is stored in browser's localStorage
- No cookies or analytics by default
- Entirely self-contained - works completely offline once loaded

## 💌 Special Message

This website is a labor of love. Every animation, every word, every color choice was made with care and intention. It's designed to make Charu feel truly special and to convey the depth of Apoorv's emotions through an interactive, memorable experience.

The 3 emotional peaks are:
1. **Diagnosis Reveal** - "This heart belongs to Dr. Charu"
2. **Future Prescription** - A lifetime prescription written by the doctor herself
3. **Secret Letter Discovery** - A hidden love letter revealed after 7 clicks

These moments are designed to create profound emotional impact. 💖

## 🙏 Credits

- Concept: Apoorv's love for Charu
- Design: Medical romance theme
- Fonts: Google Fonts (Playfair Display, Poppins, Great Vibes)
- Icons: Custom SVG + Unicode emoji
- Inspiration: Deep, genuine love and appreciation

---

**Happy Birthday Charu! 🎂💙**

*"In a world full of doctors, you became the one who healed my soul."*

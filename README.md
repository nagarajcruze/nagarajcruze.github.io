# nagarajcruze.github.io
My Personal Portfolio Page

## ✅ Existing Features
- Hero intro section with animated background, social links, and scroll chevrons
- Knowledge Base section — "Everything I've Learned" digital garden
- Category tabs (DevOps, Media & Arts, Audiophile, Motorbikes) with pill-shaped horizontal navigation
- Two-column sidebar + inline content panel layout (desktop)
- Slide-in drawer content panel (mobile/tablet)
- Search by topic/group/category name with inline expandable search bar
- Close icon (✕) toggle on search focus with Escape key support
- Markdown rendering with syntax-highlighted code blocks (highlight.js + marked.js)
- Copy-to-clipboard on code blocks
- Zen Mode (fullscreen reader) toggle
- Deep-link hash routing (`#kb/devops/docker/basics`)
- Entrance scroll animations (IntersectionObserver)
- Mobile drawer backdrop with close-on-tap and Escape key
- Auto-scroll peek hint (3s after page load)
- Bouncing scroll chevron indicator on intro section
- "View source on GitHub" link per topic
- Preloader with spinner animation
- Responsive breakpoints at 1024px, 768px, and 600px


# Tasks — Code Review Execution

## 🔴 Bug Fixes
- [x] Bug 1: Fix stale `</li>` nesting in intro social links
- [x] Bug 2: Scope main.css rules so they only apply to `#intro` and non-KB sections (Option B)
- [x] Bug 3: Fix `margin-bottom: 3rem` on KB markdown paragraphs/lists
- [x] Bug 4: Replace emoji search icons with inline SVG (Option B)
- [x] Bug 5: Fix deprecated `$(window).load()` in main.js
- [x] Bug 6: Remove `maximum-scale=1` from viewport meta
- [x] Bug 7: Remove IE conditional comments
- [x] Bug 8: Mobile drawer state (`kb-drawer-open`) persists incorrectly if the window is resized to desktop while open
- [x] Bug 9: Hash routing logic doesn't decode URI components (`%20` spaces) when parsing file paths from URL
- [x] Bug 10: `highlight.js` throws a console warning for missing `dockerfile` language definition
- [x] Bug 11: Missing placeholder markdown files in `DEMO_CONTENT` for Media & Arts, Audiophile, and Motorbikes categories causes 404 fetches

## 🟢 Enhancements
- [x] Enhancement 1: Cancel auto-scroll on user interaction
- [x] Enhancement 3: Add `rel="noopener noreferrer"` to external links
- [x] Enhancement 4: Progressive disclosure of topic list on mobile
- [x] Enhancement 5: Remove duplicate `justify-content` declaration
- [x] Enhancement 6: Table responsiveness in markdown content
- [x] Enhancement 7: Remove backdrop blur from mobile drawer backdrop
- [x] Enhancement 8: Preload hero background image
- [x] Enhancement 9: Debounce window resize events in `knowledge-base.js` for better performance
- [ ] Enhancement 10: Add ARIA roles (`aria-hidden`, `role="dialog"`) to the mobile drawer for screen readers
- [ ] Enhancement 11: Add CSS `:active` states for category tabs to provide tactile feedback on mobile

## 🟡 Pending Features (deferred)
- [x] Feature 1: "Zen Mode" fullscreen reader
- [x] Feature 2: Expandable "Topics" drawer for mobile
- [x] Feature 3: Set up GitHub Repo & Fetch Manifest via API
- [x] Feature 4: Keyboard navigation for topics sidebar
- [ ] Feature 5: Keyboard Shortcuts (`Ctrl+K` for search, `Ctrl+B` for sidebar, `Esc` to close) (planned later)
- [ ] Feature 6: Syntax Highlighting Theme Switcher (planned later)
- [x] Feature 7: Copy Link to Heading (Deep Anchors)
- [x] Feature 8: Reading progress bar at the top of the knowledge base panel
- [x] Feature 9: Next/Previous topic navigation buttons at the bottom of the content panel
- [ ] Feature 10: Dynamic Table of Contents (ToC) sidebar for long articles
- [ ] Feature 11: Full-text content search (planned later)
- [ ] Feature 12: Interactive code playgrounds (planned later)
- [ ] Feature 13: Fuzzy search command palette (planned later)
- [ ] Feature 14: Export to PDF / Print optimization (planned later)
- [ ] Feature 15: Offline Mode (PWA Support) (planned later)
- [ ] Feature 16: Admonitions & visual callouts (planned later)
- [ ] Feature 17: Gamified checklists / mark completed (planned later)
- [ ] Feature 18: Roadmaps & Learning paths (planned later)
- [x] Feature 19: Prefetch next topic at 75% scroll progress with network retry mechanism
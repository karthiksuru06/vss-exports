# Audit Report: Missing and External Elements

As part of the principal audit, the following elements have been identified as missing, placeholders, or relying on external dependencies that should be localized.

## 1. Missing Visual Assets (Currently Hotlinked)
The following critical visual elements are currently loaded from external third-party sources (Unsplash, Mixkit, TransparentTextures). **Recommendation:** Replace all with owned, high-quality local assets in `src/assets/images`.

### Hero & Layout
- **Hero Video**: `https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-ocean-surface-1151-large.mp4`
- **Hero Stardust Pattern**: `https://www.transparenttextures.com/patterns/stardust.png`
- **Navbar Cubes Pattern**: `https://www.transparenttextures.com/patterns/cubes.png`
- **Hero Poster**: `https://images.unsplash.com/photo-1551244072-5d12893278ab...`

### Product Images (`src/utils/constants.js`)
- **Shrimp Division**: `https://images.unsplash.com/photo-1565680018434-b513d5e5fd47...`
- **Seafood Division**: `https://images.unsplash.com/photo-1534942205242-a42d3c2a117b...`
- **Bio-Products**: `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69...`
- **Black Tiger Shrimp**: `https://images.unsplash.com/photo-1626804475297-411dbe631267...`
- **Vannamei Shrimp**: `https://images.unsplash.com/photo-1559339352-11d035aa65de...`
- **Silver Pomfret**: `https://images.unsplash.com/photo-1534942205242-a42d3c2a117b...`
- **Processing Images**:
    - `https://images.unsplash.com/photo-1623341214825-9f4f963727da...`
    - `https://images.unsplash.com/photo-1678809549303-346765276337...`
    - `https://images.unsplash.com/photo-1615141982880-131f4794101f...`

## 2. Missing Functional Implementations
The following UI elements are present but lack backend logic or real data connection.

- **Footer Newsletter**: Currently displays an alert window. Needs integration with a marketing email service or backend API.
- **Social Media Links**: Facebook, LinkedIn, and Instagram icons link to `#`. Real company profile URLs are required.
- **Legal Documents**: "Privacy Policy" and "Terms of Trade" link to `#`. Content pages for these policies are missing.
- **Contact Form**: The contact form on the `/contact` page effectively manages state but does not send data to a server.

## 3. Missing Infrastructure
- **Assets Directory Structure**: While `src/assets/images` was just created for the logo, a structured approach (e.g., `src/assets/video`, `src/assets/textures`) is recommended for the migrated assets.

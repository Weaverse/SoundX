# Bundled fonts

Normal variable fonts downloaded from the official Google Fonts repository on
2026-11-10. Their SIL Open Font License files are included alongside them.

- `inter-variable.ttf`: https://github.com/google/fonts/blob/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf
  (weight 100–900; optical size uses the font default).
- `open-sans-variable.ttf`: https://github.com/google/fonts/blob/main/ofl/opensans/OpenSans%5Bwdth,wght%5D.ttf
  (weight 300–800; width uses the font default).

The root layout loads these with `next/font/local`, preserving the existing CSS
variables and `display: swap`. Dev and production compilation do not need to
download these fonts from Google. These are the complete normal font files,
rather than Latin-only subsets; italic files are not included.

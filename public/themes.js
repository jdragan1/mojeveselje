/* ============================================================
   SOPSTVENE TEME — ovde dodaješ nove stilove pozivnica.
   Ovaj fajl možeš slobodno menjati bez diranja glavne aplikacije.

   Kako se dodaje nova tema:
   1. Kopiraj ceo jedan blok iz CUSTOM_THEMES niza ispod (od { do },).
   2. Promeni "id" u nešto jedinstveno (npr. "rodjendan-svemir").
   3. Promeni "tpl" na kategoriju kojoj tema pripada: "vencanje", "krstenje", "ispracaj" ili "ostalo"
      (ovo određuje koje se sekcije/nazivi koriste — npr. "Mladenci" za venčanje).
   4. Promeni "label" (ime koje se vidi) i "swatch" (boje kružića za izbor).
   5. U "css" nalepi svoj CSS — možeš menjati boje, fontove, pozadinu, dekoracije, sve.
      Selektor #view-app[data-theme="TPL"][data-style="ID"] mora ostati isti kao "tpl" i "id" koje si izabrao.
   6. Sačuvaj fajl — nova tema se automatski pojavljuje u galeriji šablona.

   Svaka tema MORA definisati bar ove CSS promenljive (--v-bg, --v-ink, --v-accent,
   --v-accent2, --v-deep, --v-card, --v-display, --v-body) da bi ostatak aplikacije
   (dugmad, RSVP forma, kartice) izgledao ispravno. Sve ostalo (pozadine, ivice,
   fontovi, animacije) je slobodno za dodavanje.
============================================================ */

const CUSTOM_THEMES = [
  {
    id: 'crtani',
    tpl: 'ostalo',
    label: 'Crtani filmovi',
    swatch: 'linear-gradient(135deg,#FFE066,#FF6B6B,#4ECDC4)',
    fontLinks: [
      'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&display=swap'
    ],
    css: `
      #view-app[data-theme="ostalo"][data-style="crtani"]{
        --v-bg:#FFF6E0; --v-ink:#3A2E1F; --v-accent:#FF6B6B; --v-accent2:#4ECDC4;
        --v-deep:#2E5EAA; --v-card:#FFFFFF;
        --v-display:'Baloo 2',cursive; --v-body:'Baloo 2',cursive;
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-hero{
        background-color:#FFE066;
        background-image:
          radial-gradient(circle at 12% 20%, rgba(255,255,255,.55) 0 14px, transparent 15px),
          radial-gradient(circle at 85% 15%, rgba(255,255,255,.55) 0 10px, transparent 11px),
          radial-gradient(circle at 70% 80%, rgba(255,255,255,.5) 0 18px, transparent 19px),
          radial-gradient(circle at 25% 75%, rgba(255,255,255,.5) 0 8px, transparent 9px);
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-names{
        text-shadow:3px 3px 0 var(--v-accent2), 6px 6px 0 rgba(0,0,0,.08);
        font-weight:800;
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-kicker{
        background:var(--v-accent); color:#fff; display:inline-block; padding:6px 16px;
        border-radius:20px; font-weight:700; letter-spacing:.08em;
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-event-card,
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-detail-card,
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-person{
        border-radius:22px;
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-event-card{
        border:3px solid var(--v-accent2);
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-rsvp{
        background:var(--v-deep); border-radius:26px;
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-submit{
        border-radius:30px; font-weight:800; letter-spacing:.04em;
        box-shadow:0 6px 0 rgba(0,0,0,.15);
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-submit:active{
        transform:translateY(4px); box-shadow:0 2px 0 rgba(0,0,0,.15);
      }
      #view-app[data-theme="ostalo"][data-style="crtani"] .v-gallery img{
        border-radius:16px; border:3px solid #fff; box-shadow:0 4px 10px rgba(0,0,0,.12);
      }
    `
  },
  {
    id: 'svemir',
    tpl: 'ostalo',
    label: 'Svemirska avantura',
    swatch: 'linear-gradient(135deg,#1B1F3B,#6C5CE7,#00D2D3)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&display=swap'],
    css: `
      #view-app[data-theme="ostalo"][data-style="svemir"]{
        --v-bg:#161A33; --v-ink:#EDEEFB; --v-accent:#00D2D3; --v-accent2:#FDCB6E;
        --v-deep:#0D0F22; --v-card:#20244A;
        --v-display:'Baloo 2',cursive; --v-body:'Baloo 2',cursive;
      }
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-hero{
        background-color:#161A33;
        background-image:
          radial-gradient(circle at 10% 15%, #fff 0 2px, transparent 3px),
          radial-gradient(circle at 80% 10%, #fff 0 2px, transparent 3px),
          radial-gradient(circle at 60% 30%, #fff 0 1.5px, transparent 2.5px),
          radial-gradient(circle at 30% 70%, #fff 0 2px, transparent 3px),
          radial-gradient(circle at 90% 75%, #fff 0 1.5px, transparent 2.5px),
          radial-gradient(circle at 45% 90%, #FDCB6E 0 20px, transparent 21px);
      }
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-names{ text-shadow:3px 3px 0 var(--v-accent2); font-weight:800; }
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-kicker{ background:var(--v-accent); color:#0D0F22; display:inline-block; padding:6px 16px; border-radius:20px; font-weight:700; }
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-event-card,
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-detail-card,
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-person{ border-radius:20px; border:2px solid var(--v-accent); }
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-submit{ border-radius:30px; font-weight:800; box-shadow:0 6px 0 rgba(0,0,0,.3); }
      #view-app[data-theme="ostalo"][data-style="svemir"] .v-submit:active{ transform:translateY(4px); box-shadow:0 2px 0 rgba(0,0,0,.3); }
    `
  },
  {
    id: 'dinosaurusi',
    tpl: 'ostalo',
    label: 'Dinosaurusi',
    swatch: 'linear-gradient(135deg,#DCEFC7,#6FA84B,#F4A300)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&display=swap'],
    css: `
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"]{
        --v-bg:#F3F7E8; --v-ink:#2B3A1F; --v-accent:#6FA84B; --v-accent2:#F4A300;
        --v-deep:#2F4A22; --v-card:#FFFFFF;
        --v-display:'Baloo 2',cursive; --v-body:'Baloo 2',cursive;
      }
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"] .v-hero{
        background:repeating-linear-gradient(115deg,#E4F0D2,#E4F0D2 26px,#D8ECC0 26px,#D8ECC0 52px);
      }
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"] .v-names{ text-shadow:3px 3px 0 var(--v-accent2); font-weight:800; }
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"] .v-kicker{ background:var(--v-accent); color:#fff; display:inline-block; padding:6px 16px; border-radius:20px; font-weight:700; }
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"] .v-event-card,
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"] .v-person{ border-radius:6px 20px 6px 20px; border:3px solid var(--v-accent); }
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"] .v-submit{ border-radius:30px; font-weight:800; box-shadow:0 6px 0 rgba(0,0,0,.15); }
      #view-app[data-theme="ostalo"][data-style="dinosaurusi"] .v-submit:active{ transform:translateY(4px); box-shadow:0 2px 0 rgba(0,0,0,.15); }
    `
  },
  {
    id: 'podvodni',
    tpl: 'ostalo',
    label: 'Podvodni svet',
    swatch: 'linear-gradient(135deg,#CDEFF2,#1CA9C9,#FDCB6E)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&display=swap'],
    css: `
      #view-app[data-theme="ostalo"][data-style="podvodni"]{
        --v-bg:#E7F7FA; --v-ink:#0F3A44; --v-accent:#1CA9C9; --v-accent2:#FDCB6E;
        --v-deep:#0B4A57; --v-card:#FFFFFF;
        --v-display:'Baloo 2',cursive; --v-body:'Baloo 2',cursive;
      }
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-hero{
        background:linear-gradient(180deg,#CDEFF2,#9FDCE6);
      }
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-names{ text-shadow:3px 3px 0 var(--v-accent2); font-weight:800; }
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-kicker{ background:var(--v-accent); color:#fff; display:inline-block; padding:6px 16px; border-radius:20px; font-weight:700; }
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-event-card,
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-person,
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-gallery img{ border-radius:50% 20px 50% 20px; }
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-submit{ border-radius:30px; font-weight:800; box-shadow:0 6px 0 rgba(0,0,0,.15); }
      #view-app[data-theme="ostalo"][data-style="podvodni"] .v-submit:active{ transform:translateY(4px); box-shadow:0 2px 0 rgba(0,0,0,.15); }
    `
  },
  {
    id: 'lavanda',
    tpl: 'vencanje',
    label: 'Lavanda & latice',
    swatch: 'linear-gradient(135deg,#EDEAF5,#C9A9D9,#E7A8B8)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Sacramento&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,500&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="lavanda"]{
        --v-bg:#EFEDF7; --v-ink:#3A3550; --v-accent:#B98FC7; --v-accent2:#E7A8B8;
        --v-deep:#5B4A72; --v-card:#FFFFFF;
        --v-display:'Sacramento',cursive; --v-body:'Cormorant Garamond',serif;
      }
      #view-app[data-theme="vencanje"][data-style="lavanda"] .v-names{ font-size:clamp(40px,9vw,78px); font-weight:400; }
      #view-app[data-theme="vencanje"][data-style="lavanda"] .v-kicker{ font-style:italic; font-family:'Cormorant Garamond',serif; letter-spacing:.08em; text-transform:none; font-size:16px; }
      #view-app[data-theme="vencanje"][data-style="lavanda"] .v-section h2{ font-family:'Sacramento',cursive; font-size:clamp(30px,4vw,42px); font-weight:400; }
      #view-app[data-theme="vencanje"][data-style="lavanda"] .v-event-card,
      #view-app[data-theme="vencanje"][data-style="lavanda"] .v-person,
      #view-app[data-theme="vencanje"][data-style="lavanda"] .v-detail-card{ border-radius:2px; box-shadow:0 8px 24px -12px rgba(91,74,114,.25); }
      #view-app[data-theme="vencanje"][data-style="lavanda"] .v-rsvp{ background:var(--v-deep); }
    `
  },
  {
    id: 'maslina',
    tpl: 'vencanje',
    label: 'Maslina & venčić',
    swatch: 'linear-gradient(135deg,#F7F5EC,#8FA377,#B08D57)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="maslina"]{
        --v-bg:#F8F6ED; --v-ink:#3A3D2E; --v-accent:#8FA377; --v-accent2:#B08D57;
        --v-deep:#4A5238; --v-card:#FFFFFF;
        --v-display:'Cormorant Garamond',serif; --v-body:'Cormorant Garamond',serif;
      }
      #view-app[data-theme="vencanje"][data-style="maslina"] .v-names{ font-style:italic; font-weight:500; }
      #view-app[data-theme="vencanje"][data-style="maslina"] .v-kicker:before,
      #view-app[data-theme="vencanje"][data-style="maslina"] .v-kicker:after{ content:'❦'; margin:0 10px; color:var(--v-accent); }
      #view-app[data-theme="vencanje"][data-style="maslina"] .v-section h2{ font-style:italic; }
      #view-app[data-theme="vencanje"][data-style="maslina"] .v-event-card{ border:1px solid rgba(143,163,119,.35); box-shadow:none; }
      #view-app[data-theme="vencanje"][data-style="maslina"] .v-submit{ letter-spacing:.12em; text-transform:uppercase; font-size:12px; }
    `
  },
  {
    id: 'smaragd',
    tpl: 'vencanje',
    label: 'Smaragdna elegancija',
    swatch: 'linear-gradient(135deg,#1F3B32,#B08D57,#0F241E)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="smaragd"]{
        --v-bg:#1B332B; --v-ink:#F2EFE4; --v-accent:#C9A24B; --v-accent2:#8FA98F;
        --v-deep:#102019; --v-card:#233F35;
        --v-display:'Cormorant Garamond',serif; --v-body:'Cormorant Garamond',serif;
      }
      #view-app[data-theme="vencanje"][data-style="smaragd"] .v-hero{ background:radial-gradient(circle at 50% 20%,#254539,#152922 70%); }
      #view-app[data-theme="vencanje"][data-style="smaragd"] .v-names{ font-weight:500; letter-spacing:.02em; }
      #view-app[data-theme="vencanje"][data-style="smaragd"] .v-kicker{ color:var(--v-accent); letter-spacing:.28em; }
      #view-app[data-theme="vencanje"][data-style="smaragd"] .v-person img{ border:2px solid var(--v-accent); }
      #view-app[data-theme="vencanje"][data-style="smaragd"] .v-event-card,
      #view-app[data-theme="vencanje"][data-style="smaragd"] .v-detail-card{ border:1px solid rgba(201,162,75,.3); }
    `
  },
  {
    id: 'cvetna',
    tpl: 'vencanje',
    label: 'Cvetna elegancija',
    swatch: 'linear-gradient(135deg,#FAF7F0,#8FA377,#D9A6A6)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,500&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="cvetna"]{
        --v-bg:#FAF7F0; --v-ink:#3A3A2E; --v-accent:#8FA377; --v-accent2:#C98F94;
        --v-deep:#4A5A3E; --v-card:#FFFFFF;
        --v-display:'Cormorant Garamond',serif; --v-body:'Cormorant Garamond',serif;
      }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-hero{ position:relative; overflow:hidden; }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-hero:before,
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-hero:after{
        content:''; position:absolute; width:130px; height:130px; opacity:.55; pointer-events:none;
        background-repeat:no-repeat; background-size:contain;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M8 92 Q18 42 58 18 Q38 40 28 68 Q48 48 68 8' stroke='%238FA377' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='58' cy='18' r='4' fill='%23C98F94'/%3E%3Ccircle cx='68' cy='8' r='3' fill='%23C98F94'/%3E%3C/svg%3E");
      }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-hero:before{ top:0; left:0; }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-hero:after{ bottom:0; right:0; transform:rotate(180deg); }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-names{ font-style:italic; font-weight:500; position:relative; z-index:1; }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-kicker{ text-transform:none; font-style:italic; letter-spacing:.04em; font-size:16px; position:relative; z-index:1; }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-section h2{ font-style:italic; font-weight:500; }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-event-card{ text-align:center; box-shadow:0 6px 20px -12px rgba(74,90,62,.3); }
      #view-app[data-theme="vencanje"][data-style="cvetna"] .v-event-head:before{
        content:'❦'; display:block; text-align:center; color:var(--v-accent2); font-size:20px; margin-bottom:8px;
      }
    `
  },
  {
    id: 'dnevnik',
    tpl: 'vencanje',
    label: 'Zeleni dnevnik ljubavi',
    swatch: 'linear-gradient(135deg,#1F3626,#C9A24B,#12241A)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,500&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="dnevnik"]{
        --v-bg:#1F3626; --v-ink:#F1EDE0; --v-accent:#C9A24B; --v-accent2:#8FA98F;
        --v-deep:#12241A; --v-card:#26402F;
        --v-display:'Cormorant Garamond',serif; --v-body:'Cormorant Garamond',serif;
      }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-names{ font-style:italic; }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-kicker{ color:var(--v-accent); }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-timeline{
        border-left:none; position:relative; text-align:center; max-width:420px; margin:10px auto 0;
      }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-timeline:before{
        content:''; position:absolute; left:50%; top:0; bottom:0; width:1px; background:rgba(201,162,75,.35); transform:translateX(-50%);
      }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-tl-item{ padding-left:0; padding-bottom:36px; }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-tl-item:before{
        left:50%; transform:translateX(-50%); top:-2px; width:8px; height:8px; background:var(--v-accent);
      }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-tl-date{ text-transform:uppercase; letter-spacing:.22em; font-size:10px; }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-tl-title{ font-style:italic; color:var(--v-accent); font-size:23px; margin-top:6px; }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-tl-photo{
        border-radius:50%; width:170px; height:170px; object-fit:cover; margin:14px auto 0; border:3px solid var(--v-accent); display:block;
      }
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-event-card,
      #view-app[data-theme="vencanje"][data-style="dnevnik"] .v-person{ border:1px solid rgba(201,162,75,.25); }
    `
  },
  {
    id: 'noc',
    demoPhoto: '/images/silueta-prosidba.jpg',
    tpl: 'vencanje',
    label: 'Noć zaljubljenih',
    swatch: 'linear-gradient(135deg,#0B1330,#E8B84B,#060A1C)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,500&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="noc"]{
        --v-bg:#0B1330; --v-ink:#EFEFF5; --v-accent:#E8B84B; --v-accent2:#8C6BAE;
        --v-deep:#060A1C; --v-card:#141B3D;
        --v-display:'Cormorant Garamond',serif; --v-body:'Jost',sans-serif;
      }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-hero-overlay{ display:none !important; }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-kicker{ color:var(--v-accent); }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-names{ color:#fff; text-shadow:0 4px 24px rgba(0,0,0,.55); }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-sub{ color:#fff; }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-count .box b{ color:#fff; }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-count .box span{ color:#fff; }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-event-card,
      #view-app[data-theme="vencanje"][data-style="noc"] .v-person,
      #view-app[data-theme="vencanje"][data-style="noc"] .v-detail-card{ border:1px solid rgba(232,184,75,.25); }
      #view-app[data-theme="vencanje"][data-style="noc"] .v-rsvp{ background:var(--v-deep); }
    `
  },
  {
    id: 'party',
    demoPhoto: '/images/wedding-party-cover.jpg',
    tpl: 'vencanje',
    label: 'Party Roze',
    swatch: 'linear-gradient(135deg,#FF69B4,#222222)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,900&family=Nunito:wght@700;900&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="party"]{
        --v-bg:#FFFFFF; --v-ink:#222222; --v-accent:#FF69B4; --v-accent2:#222222;
        --v-deep:#1A1A1A; --v-card:#FFFFFF;
        --v-display:'Playfair Display',serif; --v-body:'Nunito',sans-serif;
      }
      #view-app[data-theme="vencanje"][data-style="party"] .v-names{ font-style:italic; font-weight:900; text-transform:uppercase; letter-spacing:-.01em; }
      #view-app[data-theme="vencanje"][data-style="party"] .v-kicker{ font-weight:900; color:var(--v-accent); letter-spacing:.3em; }
      #view-app[data-theme="vencanje"][data-style="party"] .v-section h2{ font-weight:900; font-style:italic; text-transform:uppercase; }
      #view-app[data-theme="vencanje"][data-style="party"] .v-count .box b{ color:var(--v-accent); font-weight:900; }
      #view-app[data-theme="vencanje"][data-style="party"] .v-submit{ text-transform:uppercase; font-weight:900; letter-spacing:.08em; }
      #view-app[data-theme="vencanje"][data-style="party"] .v-event-card{ border-top:4px solid var(--v-accent); }
    `
  },
  {
    id: 'zalazak',
    demoPhoto: '/images/free-template-cover.jpg',
    tpl: 'vencanje',
    label: 'Narandžasti zalazak',
    swatch: 'linear-gradient(135deg,#EDF5F7,#E47A2E,#121F38)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;600&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="zalazak"]{
        --v-bg:#EDF5F7; --v-ink:#121F38; --v-accent:#E47A2E; --v-accent2:#121F38;
        --v-deep:#121F38; --v-card:#FFFFFF;
        --v-display:'Great Vibes',cursive; --v-body:'Montserrat',sans-serif;
      }
      #view-app[data-theme="vencanje"][data-style="zalazak"] .v-names{ font-weight:400; font-size:clamp(44px,10vw,84px); }
      #view-app[data-theme="vencanje"][data-style="zalazak"] .v-kicker{ text-transform:uppercase; letter-spacing:.22em; font-size:11px; color:var(--v-accent); }
      #view-app[data-theme="vencanje"][data-style="zalazak"] .v-section h2{ font-family:'Great Vibes',cursive; font-size:clamp(34px,5vw,46px); font-weight:400; }
      #view-app[data-theme="vencanje"][data-style="zalazak"] .v-event-card{ border-radius:2px; border-bottom:3px solid var(--v-accent); }
    `
  },
  {
    id: 'koral',
    demoPhoto: '/images/bootstrap-template-cover.jpg',
    tpl: 'vencanje',
    label: 'Koral i pesak',
    swatch: 'linear-gradient(135deg,#fd5d5d,#bbbd98)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Great+Vibes&family=Petit+Formal+Script&family=Open+Sans:wght@400;500;600&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="koral"]{
        --v-bg:#FBF8F1; --v-ink:#2F2F2F; --v-accent:#fd5d5d; --v-accent2:#bbbd98;
        --v-deep:#8C6F4E; --v-card:#FFFFFF;
        --v-display:'Great Vibes',cursive; --v-body:'Open Sans',sans-serif;
      }
      #view-app[data-theme="vencanje"][data-style="koral"] .v-names{ font-weight:400; }
      #view-app[data-theme="vencanje"][data-style="koral"] .v-kicker{ font-family:'Petit Formal Script',cursive; font-size:20px; text-transform:none; letter-spacing:0; color:var(--v-accent2); }
      #view-app[data-theme="vencanje"][data-style="koral"] .v-section h2{ font-family:'Great Vibes',cursive; font-weight:400; font-size:clamp(32px,5vw,44px); }
      #view-app[data-theme="vencanje"][data-style="koral"] .v-event-card{ border:1px solid var(--v-accent2); }
    `
  },
  {
    id: 'romansa',
    demoPhoto: '/images/wedding-master-cover.jpg',
    tpl: 'vencanje',
    label: 'Roze romansa',
    swatch: 'linear-gradient(135deg,#F14E95,#ffffff)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Sacramento&family=Work+Sans:wght@400;500;600&display=swap'],
    css: `
      #view-app[data-theme="vencanje"][data-style="romansa"]{
        --v-bg:#FFF5FA; --v-ink:#2B2B2B; --v-accent:#F14E95; --v-accent2:#F14E95;
        --v-deep:#B23570; --v-card:#FFFFFF;
        --v-display:'Sacramento',cursive; --v-body:'Work Sans',sans-serif;
      }
      #view-app[data-theme="vencanje"][data-style="romansa"] .v-names{ font-size:clamp(42px,9vw,80px); font-weight:400; }
      #view-app[data-theme="vencanje"][data-style="romansa"] .v-kicker{ color:var(--v-accent); text-transform:none; font-style:italic; font-family:'Work Sans',sans-serif; }
      #view-app[data-theme="vencanje"][data-style="romansa"] .v-section h2{ font-family:'Sacramento',cursive; font-weight:400; font-size:clamp(34px,5vw,46px); }
      #view-app[data-theme="vencanje"][data-style="romansa"] .v-person img{ border:3px solid var(--v-accent); }
      #view-app[data-theme="vencanje"][data-style="romansa"] .v-event-card{ border-radius:50px 4px 50px 4px; }
    `
  },
  {
    id: 'jubilej',
    tpl: 'ostalo',
    label: 'Jubilej / Korporativni event',
    swatch: 'linear-gradient(135deg,#0B2540,#C9A24B,#0B2540)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600&display=swap'],
    css: `
      #view-app[data-theme="ostalo"][data-style="jubilej"]{
        --v-bg:#F5F3EE; --v-ink:#12233A; --v-accent:#C9A24B; --v-accent2:#0B2540;
        --v-deep:#0B2540; --v-card:#FFFFFF;
        --v-display:'Cormorant Garamond',serif; --v-body:'Jost',sans-serif;
      }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-hero{ background-color:#0B2540; }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-hero-overlay{ background:linear-gradient(180deg,rgba(11,37,64,.2),rgba(11,37,64,.85)); }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-names{ color:#fff; font-weight:600; letter-spacing:.01em; }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-kicker{ color:var(--v-accent); text-transform:uppercase; letter-spacing:.28em; font-size:11px; }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-sub{ color:#fff; opacity:.85; }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-section h2{ font-weight:600; letter-spacing:.01em; }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-event-card,
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-person,
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-detail-card{ border:1px solid rgba(201,162,75,.35); border-radius:2px; }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-rsvp{ background:var(--v-deep); border-radius:2px; }
      #view-app[data-theme="ostalo"][data-style="jubilej"] .v-submit{ border-radius:2px; letter-spacing:.06em; text-transform:uppercase; font-size:13px; }
    `
  },
  {
    id: 'devojacko',
    tpl: 'ostalo',
    label: 'Devojačko veče',
    swatch: 'linear-gradient(135deg,#F7D9E3,#D6A4C4,#FFFFFF)',
    fontLinks: ['https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,800&family=Poppins:wght@400;500;600&display=swap'],
    css: `
      #view-app[data-theme="ostalo"][data-style="devojacko"]{
        --v-bg:#FFF7FA; --v-ink:#3A1F30; --v-accent:#D6A4C4; --v-accent2:#E8B84B;
        --v-deep:#7A2F58; --v-card:#FFFFFF;
        --v-display:'Playfair Display',serif; --v-body:'Poppins',sans-serif;
      }
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-hero{ background:linear-gradient(160deg,#FFE9F1,#F7D9E3); }
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-names{ font-style:italic; font-weight:800; }
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-kicker{ background:var(--v-accent); color:#fff; display:inline-block; padding:6px 18px; border-radius:20px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; font-size:10.5px; }
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-section h2{ font-style:italic; }
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-event-card,
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-person{ border-radius:24px; border:2px solid var(--v-accent); }
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-submit{ border-radius:30px; background:var(--v-accent2); font-weight:600; }
      #view-app[data-theme="ostalo"][data-style="devojacko"] .v-gallery img{ border-radius:18px; }
    `
  }
  // Dodaj sledeću temu ispod ovog reda, po istom obrascu (ne zaboravi zarez iznad).
];

/* ============================================================
   Ne menjaj ispod ove linije — ovo automatski učitava teme
   definisane iznad u aplikaciju (fontove, CSS, i dugmiće u galeriji).
============================================================ */
(function loadCustomThemes(){
  CUSTOM_THEMES.forEach(theme => {
    if (theme.fontLinks) {
      theme.fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      });
    }
    const style = document.createElement('style');
    style.textContent = theme.css;
    document.head.appendChild(style);
  });
  window.CUSTOM_THEMES = CUSTOM_THEMES;
})();

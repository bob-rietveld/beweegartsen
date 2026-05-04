/* Beweegartsen — shared site behaviour */
(function () {
  'use strict';

  /* ---------- i18n ---------- */
  const I18N = {
    nav: {
      home:        { nl: 'Home', en: 'Home' },
      practice:    { nl: 'De praktijk', en: 'The practice' },
      knowledge:   { nl: 'Kennis & netwerk', en: 'Knowledge & network' },
      faq:         { nl: 'Veelgestelde vragen', en: 'FAQ' },
      contact:     { nl: 'Contact', en: 'Contact' },
      practice_info: { nl: 'Informatie praktijk', en: 'About the practice' },
      pricing:     { nl: 'Tarieven', en: 'Pricing' },
      book:        { nl: 'Afspraak maken', en: 'Book appointment' },
      contact_p:   { nl: 'Contact', en: 'Contact' },
      cta_book:    { nl: 'Afspraak plannen', en: 'Book appointment' },
    },
    footer: {
      tag:         { nl: 'Praktijk voor Musculoskeletale Geneeskunde — gespecialiseerd in klachten van het bewegingsapparaat.', en: 'Practice for Musculoskeletal Medicine — specialised in disorders of the movement apparatus.' },
      h_practice:  { nl: 'Praktijk', en: 'Practice' },
      h_info:      { nl: 'Informatie', en: 'Information' },
      h_visit:     { nl: 'Bezoek', en: 'Visit' },
      about:       { nl: 'Over Beweegartsen', en: 'About Beweegartsen' },
      pricing:     { nl: 'Tarieven', en: 'Pricing' },
      knowledge:   { nl: 'Kennis & netwerk', en: 'Knowledge & network' },
      faq:         { nl: 'Veelgestelde vragen', en: 'FAQ' },
      collab:      { nl: 'Samenwerking', en: 'Collaboration' },
      privacy:     { nl: 'Privacyverklaring', en: 'Privacy' },
      registered:  { nl: 'Geregistreerd bij NVAMG', en: 'Registered with NVAMG' },
    },
    booking: {
      step1: { nl: 'Klacht', en: 'Complaint' },
      step2: { nl: 'Arts', en: 'Physician' },
      step3: { nl: 'Tijd', en: 'Time' },
      step4: { nl: 'Gegevens', en: 'Details' },
      title1: { nl: 'Waar zit uw klacht?', en: 'Where is your complaint?' },
      sub1:   { nl: 'U mag meerdere gebieden selecteren.', en: 'You may select more than one area.' },
      title2: { nl: 'Heeft u een voorkeur voor een arts?', en: 'Do you prefer a specific physician?' },
      title3: { nl: 'Kies een datum en tijd', en: 'Pick a date and time' },
      title4: { nl: 'Uw gegevens', en: 'Your details' },
      cancel: { nl: 'Annuleren', en: 'Cancel' },
      back:   { nl: 'Terug', en: 'Back' },
      next:   { nl: 'Volgende', en: 'Next' },
      send:   { nl: 'Verzoek versturen', en: 'Send request' },
      done_t: { nl: 'Verzoek ontvangen', en: 'Request received' },
      done_p: { nl: 'We bellen u binnen één werkdag terug om uw afspraak te bevestigen.', en: 'We will call you within one working day to confirm your appointment.' },
      close:  { nl: 'Sluiten', en: 'Close' },
      pref:   { nl: 'Voorkeur', en: 'Preference' },
      doctor: { nl: 'Arts', en: 'Physician' },
      date:   { nl: 'Datum', en: 'Date' },
      pickdate:{ nl: 'Kies eerst een datum.', en: 'Pick a date first.' },
      noPref: { nl: 'Geen voorkeur', en: 'No preference' },
      firstAvail: { nl: 'Eerstvolgende beschikbaar', en: 'First available' },
      label_name: { nl: 'Naam', en: 'Name' },
      label_email:{ nl: 'E-mail', en: 'Email' },
      label_phone:{ nl: 'Telefoon', en: 'Phone' },
      label_note: { nl: 'Korte toelichting', en: 'Short note' },
      err_name: { nl: 'Vul uw naam in', en: 'Please enter your name' },
      err_email: { nl: 'Geen geldig e-mailadres', en: 'Invalid email address' },
      err_email_req: { nl: 'E-mailadres is verplicht', en: 'Email is required' },
    },
    contact: {
      label_name: { nl: 'Naam', en: 'Name' },
      label_email:{ nl: 'E-mail', en: 'Email' },
      label_phone:{ nl: 'Telefoon', en: 'Phone' },
      label_msg:  { nl: 'Verzoek of vraag', en: 'Request or question' },
      optional:   { nl: '(optioneel)', en: '(optional)' },
      submit:     { nl: 'Verstuur bericht', en: 'Send message' },
      note:       { nl: 'We bellen u binnen één werkdag terug.', en: 'We will call you back within one working day.' },
      success_t:  { nl: 'Bedankt voor uw bericht', en: 'Thank you for your message' },
      success_p:  { nl: 'We bellen u binnen één werkdag terug op het opgegeven nummer.', en: 'We will call you back within one working day at the number provided.' },
      reset:      { nl: 'Nieuw bericht', en: 'New message' },
      err_name:   { nl: 'Vul uw naam in', en: 'Please enter your name' },
      err_email_req: { nl: 'E-mailadres is verplicht', en: 'Email is required' },
      err_email:  { nl: 'Geen geldig e-mailadres', en: 'Invalid email address' },
      err_phone:  { nl: 'Geen geldig telefoonnummer', en: 'Invalid phone number' },
      err_msg:    { nl: 'Schrijf ten minste 10 tekens', en: 'Please write at least 10 characters' },
    },
  };

  /* ---------- Language store ---------- */
  const getLang = () => localStorage.getItem('bw-lang') || document.documentElement.lang || 'nl';
  const setLang = (l) => {
    localStorage.setItem('bw-lang', l);
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n-nl][data-i18n-en]').forEach(el => {
      el.innerHTML = el.getAttribute(`data-i18n-${l}`);
    });
    document.querySelectorAll('.bw-lang-flag').forEach(el => el.textContent = l.toUpperCase());
    // close & re-open booking modal text if open
    const modal = document.getElementById('bw-booking-modal');
    if (modal && modal.classList.contains('is-open')) renderBookingStep();
  };

  const tr = (key) => {
    const lang = getLang();
    const path = key.split('.');
    let n = I18N;
    for (const p of path) n = n[p];
    return n[lang] || n.nl;
  };

  /* ---------- Icons ---------- */
  const ICONS = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'check': '<path d="m4 12 5 5L20 6"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'minus': '<path d="M5 12h14"/>',
    'menu': '<path d="M3 7h18M3 17h18"/>',
    'close': '<path d="M6 6l12 12M18 6 6 18"/>',
    'phone': '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    'pin': '<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    'spine': '<path d="M12 3v18"/><path d="M9 6h6M8 10h8M8 14h8M9 18h6"/>',
    'shoulder': '<circle cx="12" cy="9" r="3"/><path d="M12 12v5M7 17h10"/>',
    'knee': '<path d="M10 3v7l-3 5v6"/><path d="M14 3v7l3 5v6"/><circle cx="12" cy="12" r="2"/>',
    'hand': '<path d="M9 11V5a1.5 1.5 0 0 1 3 0v6"/><path d="M12 11V4a1.5 1.5 0 0 1 3 0v7"/><path d="M15 11V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7H9a4 4 0 0 1-4-4v-1l-1-3a1.5 1.5 0 0 1 2.6-1.4L8 13"/>',
    'foot': '<circle cx="9" cy="5" r="1.2"/><circle cx="12" cy="4" r="1.2"/><circle cx="15" cy="5" r="1.2"/><circle cx="17" cy="8" r="1.2"/><path d="M7 11c0 4 1 6 4 6s4-2 4-5"/><path d="M11 17v4"/>',
    'head': '<path d="M8 21v-3a4 4 0 0 1-2-3.5V11a6 6 0 1 1 12 0v2l1 2-1 1v2a2 2 0 0 1-2 2h-2v2"/>',
    'heart-pulse': '<path d="M3 12h4l2-4 4 8 2-4h6"/>',
    'sparkle': '<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
  };
  const icon = (name, size = 18, stroke = 1.5) => {
    const path = ICONS[name] || '';
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  };

  /* ---------- Nav rendering ---------- */
  const NAV = [
    { id: 'home',      key: 'nav.home',      href: 'index.html' },
    { id: 'practice',  key: 'nav.practice',  children: [
      { key: 'nav.practice_info', href: 'praktijk.html' },
      { key: 'nav.pricing',       href: 'tarieven.html' },
      { label: { nl: 'Leonie Seebregts', en: 'Leonie Seebregts' }, href: 'leonie-seebregts.html' },
      { label: { nl: 'Astrid de Vries', en: 'Astrid de Vries' }, href: 'astrid-de-vries.html' },
      { label: { nl: 'Lonneke van der Mark', en: 'Lonneke van der Mark' }, href: 'lonneke-van-der-mark.html' },
    ]},
    { id: 'knowledge', key: 'nav.knowledge', href: 'kennis-netwerk.html' },
    { id: 'faq',       key: 'nav.faq',       href: 'veelgestelde-vragen.html' },
    { id: 'contact',   key: 'nav.contact',   children: [
      { key: 'nav.book',      href: 'afspraak-maken.html' },
      { key: 'nav.contact_p', href: 'contact.html' },
    ]},
  ];

  const labelFor = (entry) => {
    const lang = getLang();
    if (entry.label) return entry.label[lang] || entry.label.nl;
    if (entry.key) {
      const path = entry.key.split('.');
      let n = I18N;
      for (const p of path) n = n[p];
      return n[lang] || n.nl;
    }
    return '';
  };

  const renderNav = () => {
    const mount = document.querySelector('[data-bw-nav]');
    if (!mount) return;
    const active = mount.dataset.activePage || '';
    const lang = getLang();
    mount.outerHTML = `
      <header class="bw-nav">
        <div class="bw-nav-inner">
          <a href="index.html" class="bw-nav-logo" aria-label="Beweegartsen home">
            <img src="assets/img/logo.png" alt="Beweegartsen"/>
          </a>
          <nav class="bw-nav-links" aria-label="Primary">
            ${NAV.map(item => {
              const lbl = labelFor(item);
              const isActive = active === item.id;
              if (item.children) {
                return `
                  <div class="bw-nav-item" data-nav-id="${item.id}">
                    <button class="bw-nav-link ${isActive ? 'is-active' : ''}" data-nav-toggle>
                      <span>${lbl}</span>${icon('chevron-down', 14, 2)}
                    </button>
                    <div class="bw-dropdown">
                      ${item.children.map(c => `
                        <a href="${c.href}" class="bw-dropdown-item">
                          <span>${labelFor(c)}</span>${icon('arrow-right', 14, 1.5)}
                        </a>`).join('')}
                    </div>
                  </div>`;
              }
              return `<a href="${item.href}" class="bw-nav-link ${isActive ? 'is-active' : ''}">${lbl}</a>`;
            }).join('')}
          </nav>
          <div class="bw-nav-actions">
            <button class="bw-lang" data-bw-lang aria-label="Toggle language">
              ${icon('globe', 14, 1.8)}<span class="bw-lang-flag">${lang.toUpperCase()}</span>
            </button>
            <a href="tel:+31302129300" class="bw-nav-phone">
              ${icon('phone', 14, 1.8)}<span>030&nbsp;212&nbsp;93&nbsp;00</span>
            </a>
            <button class="bw-btn bw-btn-primary" data-bw-book>
              <span data-i18n-nl="Afspraak plannen" data-i18n-en="Book appointment">${tr('nav.cta_book')}</span>
              ${icon('arrow-right', 14, 2)}
            </button>
            <button class="bw-nav-burger" data-bw-burger aria-label="Open menu">
              ${icon('menu', 22, 1.8)}
            </button>
          </div>
        </div>
        <div class="bw-mobile-drawer" data-bw-drawer role="dialog" aria-modal="true">
          <div class="bw-mobile-head">
            <img src="assets/img/logo.png" alt="Beweegartsen"/>
            <button class="bw-icon-btn" data-bw-drawer-close aria-label="Close menu">${icon('close', 22, 1.8)}</button>
          </div>
          <div class="bw-mobile-body">
            ${NAV.map(item => {
              if (item.children) {
                return `
                  <div class="bw-mobile-group" data-mobile-group>
                    <button class="bw-mobile-link" data-mobile-toggle>
                      <span>${labelFor(item)}</span>${icon('plus', 16, 1.8)}
                    </button>
                    <div class="bw-mobile-children">
                      ${item.children.map(c => `<a href="${c.href}" class="bw-mobile-sublink">${labelFor(c)}</a>`).join('')}
                    </div>
                  </div>`;
              }
              return `<a href="${item.href}" class="bw-mobile-link">${labelFor(item)}</a>`;
            }).join('')}
            <div class="bw-mobile-foot">
              <button class="bw-btn bw-btn-primary" data-bw-book>${tr('nav.cta_book')} ${icon('arrow-right', 14, 2)}</button>
              <a href="tel:+31302129300" class="bw-mobile-phone">${icon('phone', 14, 1.8)} 030 212 93 00</a>
            </div>
          </div>
        </div>
      </header>`;
    bindNav();
  };

  const bindNav = () => {
    document.querySelectorAll('.bw-nav-item').forEach(item => {
      let timer;
      item.addEventListener('mouseenter', () => { clearTimeout(timer); item.classList.add('is-open'); });
      item.addEventListener('mouseleave', () => { timer = setTimeout(() => item.classList.remove('is-open'), 120); });
      const btn = item.querySelector('[data-nav-toggle]');
      btn && btn.addEventListener('click', (e) => { e.stopPropagation(); item.classList.toggle('is-open'); });
    });
    document.addEventListener('click', () => document.querySelectorAll('.bw-nav-item.is-open').forEach(n => n.classList.remove('is-open')));

    const burger = document.querySelector('[data-bw-burger]');
    const drawer = document.querySelector('[data-bw-drawer]');
    burger && burger.addEventListener('click', () => drawer.classList.add('is-open'));
    document.querySelectorAll('[data-bw-drawer-close]').forEach(b => b.addEventListener('click', () => drawer.classList.remove('is-open')));
    document.querySelectorAll('[data-mobile-group] [data-mobile-toggle]').forEach(b => {
      b.addEventListener('click', () => b.parentElement.classList.toggle('is-open'));
    });

    document.querySelectorAll('[data-bw-lang]').forEach(b => b.addEventListener('click', () => {
      setLang(getLang() === 'nl' ? 'en' : 'nl');
    }));

    document.querySelectorAll('[data-bw-book]').forEach(b => b.addEventListener('click', openBooking));
  };

  /* ---------- Footer ---------- */
  const renderFooter = () => {
    const mount = document.querySelector('[data-bw-footer]');
    if (!mount) return;
    mount.outerHTML = `
      <footer class="bw-footer">
        <div class="bw-footer-inner">
          <div class="bw-footer-brand">
            <img src="assets/img/logo-light.png" alt="Beweegartsen"/>
            <p class="bw-footer-tag" data-i18n-nl="${I18N.footer.tag.nl}" data-i18n-en="${I18N.footer.tag.en}">${tr('footer.tag')}</p>
          </div>
          <div class="bw-footer-cols">
            <div>
              <h6 data-i18n-nl="${I18N.footer.h_practice.nl}" data-i18n-en="${I18N.footer.h_practice.en}">${tr('footer.h_practice')}</h6>
              <a href="praktijk.html" data-i18n-nl="${I18N.footer.about.nl}" data-i18n-en="${I18N.footer.about.en}">${tr('footer.about')}</a>
              <a href="tarieven.html" data-i18n-nl="${I18N.footer.pricing.nl}" data-i18n-en="${I18N.footer.pricing.en}">${tr('footer.pricing')}</a>
              <a href="leonie-seebregts.html">Leonie Seebregts</a>
              <a href="astrid-de-vries.html">Astrid de Vries</a>
              <a href="lonneke-van-der-mark.html">Lonneke van der Mark</a>
            </div>
            <div>
              <h6 data-i18n-nl="${I18N.footer.h_info.nl}" data-i18n-en="${I18N.footer.h_info.en}">${tr('footer.h_info')}</h6>
              <a href="kennis-netwerk.html" data-i18n-nl="${I18N.footer.knowledge.nl}" data-i18n-en="${I18N.footer.knowledge.en}">${tr('footer.knowledge')}</a>
              <a href="samenwerking.html" data-i18n-nl="${I18N.footer.collab.nl}" data-i18n-en="${I18N.footer.collab.en}">${tr('footer.collab')}</a>
              <a href="veelgestelde-vragen.html" data-i18n-nl="${I18N.footer.faq.nl}" data-i18n-en="${I18N.footer.faq.en}">${tr('footer.faq')}</a>
              <a href="contact.html" data-i18n-nl="Contact" data-i18n-en="Contact">Contact</a>
            </div>
            <div>
              <h6 data-i18n-nl="${I18N.footer.h_visit.nl}" data-i18n-en="${I18N.footer.h_visit.en}">${tr('footer.h_visit')}</h6>
              <p class="bw-footer-addr">
                Rembrandtlaan 2B<br/>
                3723 BJ Bilthoven<br/>
                <a href="tel:+31302129300">030 212 93 00</a><br/>
                <a href="mailto:info@beweegartsen.nl">info@beweegartsen.nl</a>
              </p>
            </div>
          </div>
        </div>
        <div class="bw-footer-base">
          <span>© 2026 Beweegartsen</span>
          <span data-i18n-nl="${I18N.footer.registered.nl}" data-i18n-en="${I18N.footer.registered.en}">${tr('footer.registered')}</span>
        </div>
      </footer>`;
  };

  /* ---------- FAQ accordion ---------- */
  const FAQ_ITEMS = [
    { q: { nl: 'Heb ik een verwijzing van mijn huisarts nodig?', en: 'Do I need a referral from my GP?' },
      a: { nl: 'Voor een consult bij Beweegartsen heeft u geen verwijzing nodig. U kunt direct een afspraak maken. Sommige zorgverzekeraars vragen wel een verwijzing voor vergoeding van aanvullende behandelingen.', en: 'You do not need a referral to make an appointment with Beweegartsen. Some insurers do require a referral for reimbursement of supplementary treatments.' }},
    { q: { nl: 'Wordt de behandeling vergoed door mijn zorgverzekeraar?', en: 'Is treatment reimbursed by my insurer?' },
      a: { nl: 'MSK-geneeskunde valt bij de meeste zorgverzekeraars onder de aanvullende verzekering. De vergoeding verschilt per pakket — wij raden aan dit vooraf bij uw verzekeraar na te vragen.', en: 'MSK medicine is reimbursed under most supplementary insurance plans. Coverage varies — we recommend checking with your insurer in advance.' }},
    { q: { nl: 'Hoe lang duurt een eerste consult?', en: 'How long is a first consultation?' },
      a: { nl: 'Een eerste consult duurt ongeveer 45 minuten. We nemen de tijd voor anamnese, lichamelijk onderzoek en doorgaans direct een eerste behandeling.', en: 'A first consultation takes approximately 45 minutes. We take time for the case history, physical examination and usually a first treatment on the same day.' }},
    { q: { nl: 'Hoeveel behandelingen heb ik nodig?', en: 'How many treatments will I need?' },
      a: { nl: 'Gemiddeld zijn 3 tot 6 behandelingen voldoende. Na elk consult evalueren we het effect en stemmen het vervolg af op uw herstel.', en: 'On average 3 to 6 treatments are sufficient. After each consultation we evaluate progress and adjust the plan to your recovery.' }},
    { q: { nl: 'Kan ik na de behandeling direct weer sporten?', en: 'Can I exercise right after a treatment?' },
      a: { nl: 'Na de behandeling adviseren we de eerste 24 uur rustig aan te doen. Daarna kunt u meestal weer geleidelijk uw activiteiten oppakken volgens het advies van de arts.', en: 'For the first 24 hours we advise taking it easy. After that you can usually return to your activities gradually, following the advice given.' }},
    { q: { nl: 'Wat is het verschil met een fysiotherapeut?', en: 'How is this different from a physiotherapist?' },
      a: { nl: 'MSK-artsen zijn basisartsen met een specialisatie in musculoskeletale geneeskunde. Wij stellen zelf de medische diagnose en passen manuele en injectieve technieken toe. Vaak werken we nauw samen met fysiotherapeuten in het vervolgtraject.', en: 'MSK physicians are medical doctors with specialisation in musculoskeletal medicine. We make the medical diagnosis and apply manual and injection techniques. We often work alongside physiotherapists in follow-up care.' }},
  ];

  const renderFAQ = () => {
    const mount = document.querySelector('[data-bw-faq]');
    if (!mount) return;
    const lang = getLang();
    mount.innerHTML = `
      <div class="bw-faq">
        ${FAQ_ITEMS.map((it, i) => `
          <div class="bw-faq-row ${i === 0 ? 'is-open' : ''}">
            <button class="bw-faq-q" data-faq-toggle aria-expanded="${i === 0}">
              <span class="bw-faq-num">${String(i + 1).padStart(2, '0')}</span>
              <span class="bw-faq-q-text" data-i18n-nl="${escapeAttr(it.q.nl)}" data-i18n-en="${escapeAttr(it.q.en)}">${it.q[lang]}</span>
              <span class="bw-faq-icon">${icon('plus', 18, 1.6)}</span>
            </button>
            <div class="bw-faq-a-wrap">
              <div class="bw-faq-a-inner">
                <p class="bw-faq-a" data-i18n-nl="${escapeAttr(it.a.nl)}" data-i18n-en="${escapeAttr(it.a.en)}">${it.a[lang]}</p>
              </div>
            </div>
          </div>`).join('')}
      </div>`;
    mount.querySelectorAll('[data-faq-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.bw-faq-row');
        const open = row.classList.toggle('is-open');
        const ico = btn.querySelector('.bw-faq-icon');
        ico.innerHTML = icon(open ? 'minus' : 'plus', 18, 1.6);
        btn.setAttribute('aria-expanded', open);
      });
    });
  };

  const escapeAttr = (s) => s.replace(/"/g, '&quot;');

  /* ---------- Contact form ---------- */
  const renderContactForm = () => {
    const mount = document.querySelector('[data-bw-contact-form]');
    if (!mount) return;
    const lang = getLang();
    mount.innerHTML = `
      <form class="bw-form" novalidate>
        <label class="bw-field">
          <span class="bw-field-label" data-i18n-nl="${I18N.contact.label_name.nl}" data-i18n-en="${I18N.contact.label_name.en}">${tr('contact.label_name')}</span>
          <input name="name" type="text"/>
          <span class="bw-field-error" hidden></span>
        </label>
        <div class="bw-form-row-2">
          <label class="bw-field">
            <span class="bw-field-label" data-i18n-nl="${I18N.contact.label_email.nl}" data-i18n-en="${I18N.contact.label_email.en}">${tr('contact.label_email')}</span>
            <input name="email" type="email"/>
            <span class="bw-field-error" hidden></span>
          </label>
          <label class="bw-field">
            <span class="bw-field-label">
              <span data-i18n-nl="${I18N.contact.label_phone.nl}" data-i18n-en="${I18N.contact.label_phone.en}">${tr('contact.label_phone')}</span>
              <span class="bw-field-opt" data-i18n-nl="${I18N.contact.optional.nl}" data-i18n-en="${I18N.contact.optional.en}">${tr('contact.optional')}</span>
            </span>
            <input name="phone" type="tel"/>
            <span class="bw-field-error" hidden></span>
          </label>
        </div>
        <label class="bw-field">
          <span class="bw-field-label" data-i18n-nl="${I18N.contact.label_msg.nl}" data-i18n-en="${I18N.contact.label_msg.en}">${tr('contact.label_msg')}</span>
          <textarea name="message" rows="4"></textarea>
          <span class="bw-field-error" hidden></span>
        </label>
        <div class="bw-form-foot">
          <p class="bw-form-note" data-i18n-nl="${I18N.contact.note.nl}" data-i18n-en="${I18N.contact.note.en}">${tr('contact.note')}</p>
          <button type="submit" class="bw-btn bw-btn-primary">
            <span data-i18n-nl="${I18N.contact.submit.nl}" data-i18n-en="${I18N.contact.submit.en}">${tr('contact.submit')}</span>
            ${icon('arrow-right', 14, 2)}
          </button>
        </div>
      </form>`;

    const form = mount.querySelector('form');
    const validate = (data) => {
      const errs = {};
      if (!data.name.trim()) errs.name = tr('contact.err_name');
      if (!data.email.trim()) errs.email = tr('contact.err_email_req');
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errs.email = tr('contact.err_email');
      if (data.phone && !/^[+()\d\s\-]{7,}$/.test(data.phone)) errs.phone = tr('contact.err_phone');
      if (!data.message.trim() || data.message.trim().length < 10) errs.message = tr('contact.err_msg');
      return errs;
    };
    const showErrors = (errs) => {
      ['name', 'email', 'phone', 'message'].forEach(k => {
        const field = form.querySelector(`[name="${k}"]`).closest('.bw-field');
        const errEl = field.querySelector('.bw-field-error');
        if (errs[k]) {
          field.classList.add('has-error');
          errEl.textContent = errs[k];
          errEl.hidden = false;
        } else {
          field.classList.remove('has-error');
          errEl.hidden = true;
        }
      });
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const errs = validate(data);
      showErrors(errs);
      if (Object.keys(errs).length === 0) {
        mount.innerHTML = `
          <div class="bw-form-success">
            <div class="bw-form-success-icon">${icon('check', 28, 2)}</div>
            <h3>${tr('contact.success_t')}</h3>
            <p>${tr('contact.success_p')}</p>
            <button class="bw-btn bw-btn-ghost" data-reset>${tr('contact.reset')}</button>
          </div>`;
        mount.querySelector('[data-reset]').addEventListener('click', renderContactForm);
      }
    });
    form.querySelectorAll('input, textarea').forEach(inp => {
      inp.addEventListener('blur', () => {
        const data = Object.fromEntries(new FormData(form).entries());
        showErrors(validate(data));
      });
    });
  };

  /* ---------- Booking modal ---------- */
  const COMPLAINT_AREAS = [
    { id: 'spine', icon: 'spine', nl: 'Rug & nek', en: 'Back & neck' },
    { id: 'head', icon: 'head', nl: 'Hoofdpijn', en: 'Headache' },
    { id: 'shoulder', icon: 'shoulder', nl: 'Schouder & elleboog', en: 'Shoulder & elbow' },
    { id: 'hand', icon: 'hand', nl: 'Pols & hand', en: 'Wrist & hand' },
    { id: 'pelvis', icon: 'heart-pulse', nl: 'Bekken & heup', en: 'Pelvis & hip' },
    { id: 'knee', icon: 'knee', nl: 'Knie & enkel', en: 'Knee & ankle' },
    { id: 'foot', icon: 'foot', nl: 'Voet', en: 'Foot' },
    { id: 'sport', icon: 'sparkle', nl: 'Sportblessure', en: 'Sports injury' },
  ];
  const DOCTORS = [
    { id: 'leonie',  name: 'Leonie Seebregts',     nl: 'MSK-arts, oprichter', en: 'MSK physician, founder', img: 'assets/img/photos/leonie.jpg',  pos: '50% 30%' },
    { id: 'astrid',  name: 'Astrid de Vries',      nl: 'MSK-arts',           en: 'MSK physician',           img: 'assets/img/photos/astrid.jpg',  pos: '50% 30%' },
    { id: 'lonneke', name: 'Lonneke van der Mark', nl: 'MSK-arts',           en: 'MSK physician',           img: 'assets/img/photos/lonneke.jpg', pos: '50% 30%' },
    { id: 'any',     name: '',                     nl: 'Geen voorkeur',      en: 'No preference',           img: null, pos: null },
  ];
  const TIME_SLOTS = ['08:30', '09:15', '10:00', '11:00', '13:30', '14:15', '15:00', '16:00'];

  let booking = { step: 0, areas: [], doctor: 'any', date: null, time: null, name: '', email: '', phone: '', notes: '', done: false };

  const dateOptions = (() => {
    const days = [];
    const d = new Date(2026, 4, 4);
    while (days.length < 14) {
      const dy = d.getDay();
      if (dy !== 0 && dy !== 6) days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  })();

  const monthName = (d) => {
    const lang = getLang();
    const nl = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    const en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (lang === 'nl' ? nl : en)[d.getMonth()];
  };
  const dayName = (d) => {
    const lang = getLang();
    const nl = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
    const en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (lang === 'nl' ? nl : en)[d.getDay()];
  };

  const ensureBookingMount = () => {
    if (document.getElementById('bw-booking-modal')) return;
    const div = document.createElement('div');
    div.id = 'bw-booking-modal';
    div.className = 'bw-modal';
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-modal', 'true');
    div.addEventListener('click', (e) => { if (e.target === div) closeBooking(); });
    document.body.appendChild(div);
  };

  const openBooking = () => {
    ensureBookingMount();
    booking = { step: 0, areas: [], doctor: 'any', date: null, time: null, name: '', email: '', phone: '', notes: '', done: false };
    document.getElementById('bw-booking-modal').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    renderBookingStep();
  };
  const closeBooking = () => {
    const m = document.getElementById('bw-booking-modal');
    if (m) m.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const canNext = () => {
    if (booking.step === 0) return booking.areas.length > 0;
    if (booking.step === 1) return booking.doctor != null;
    if (booking.step === 2) return booking.date && booking.time;
    if (booking.step === 3) return booking.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(booking.email);
    return false;
  };

  const renderBookingStep = () => {
    const m = document.getElementById('bw-booking-modal');
    if (!m) return;
    const lang = getLang();
    const STEPS = [tr('booking.step1'), tr('booking.step2'), tr('booking.step3'), tr('booking.step4')];

    let body = '';
    if (booking.done) {
      const a = COMPLAINT_AREAS.filter(c => booking.areas.includes(c.id)).map(c => c[lang]).join(', ');
      const d = DOCTORS.find(x => x.id === booking.doctor);
      const dName = d.name || (d[lang]);
      const dt = booking.date ? `${dayName(booking.date)} ${booking.date.getDate()} ${monthName(booking.date)}` : '';
      body = `
        <div class="bw-booking-done">
          <div class="bw-form-success-icon">${icon('check', 28, 2)}</div>
          <h3>${tr('booking.done_t')}</h3>
          <p>${tr('booking.done_p')}</p>
          <div class="bw-booking-summary">
            <div><span>${tr('booking.pref')}</span><strong>${a}</strong></div>
            <div><span>${tr('booking.doctor')}</span><strong>${dName}</strong></div>
            <div><span>${tr('booking.date')}</span><strong>${dt} — ${booking.time || ''}</strong></div>
          </div>
          <button class="bw-btn bw-btn-primary" data-booking-close>${tr('booking.close')}</button>
        </div>`;
    } else if (booking.step === 0) {
      body = `
        <h3 class="bw-modal-title">${tr('booking.title1')}</h3>
        <p class="bw-modal-sub">${tr('booking.sub1')}</p>
        <div class="bw-areas">
          ${COMPLAINT_AREAS.map(a => `
            <button class="bw-area ${booking.areas.includes(a.id) ? 'is-active' : ''}" data-area="${a.id}">
              ${icon(a.icon, 28, 1.4)}
              <span>${a[lang]}</span>
            </button>`).join('')}
        </div>`;
    } else if (booking.step === 1) {
      body = `
        <h3 class="bw-modal-title">${tr('booking.title2')}</h3>
        <div class="bw-doctors-list">
          ${DOCTORS.map(d => `
            <button class="bw-doctor-pick ${booking.doctor === d.id ? 'is-active' : ''}" data-doctor="${d.id}">
              <div class="bw-doctor-thumb">${d.img ? `<img src="${d.img}" style="object-position: ${d.pos}"/>` : ''}</div>
              <div>
                <div class="bw-doctor-name">${d.name || d[lang]}</div>
                <div class="bw-doctor-role">${d.name ? d[lang] : tr('booking.firstAvail')}</div>
              </div>
            </button>`).join('')}
        </div>`;
    } else if (booking.step === 2) {
      body = `
        <h3 class="bw-modal-title">${tr('booking.title3')}</h3>
        <div class="bw-cal">
          <div class="bw-cal-days">
            ${dateOptions.map(d => {
              const sel = booking.date && booking.date.getTime() === d.getTime();
              return `
                <button class="bw-cal-day ${sel ? 'is-active' : ''}" data-date="${d.getTime()}">
                  <span class="bw-cal-dow">${dayName(d)}</span>
                  <span class="bw-cal-num">${d.getDate()}</span>
                  <span class="bw-cal-mon">${monthName(d)}</span>
                </button>`;
            }).join('')}
          </div>
          <div class="bw-cal-times">
            ${booking.date ? TIME_SLOTS.map((time, i) => {
              const disabled = (booking.date.getDate() + i) % 5 === 0;
              const sel = booking.time === time;
              return `<button class="bw-cal-time ${sel ? 'is-active' : ''}" data-time="${time}" ${disabled ? 'disabled' : ''}>${time}</button>`;
            }).join('') : `<p class="bw-cal-empty">${tr('booking.pickdate')}</p>`}
          </div>
        </div>`;
    } else {
      body = `
        <h3 class="bw-modal-title">${tr('booking.title4')}</h3>
        <div class="bw-booking-form">
          <label class="bw-field">
            <span class="bw-field-label">${tr('booking.label_name')}</span>
            <input data-bk="name" value="${escapeAttr(booking.name)}"/>
          </label>
          <div class="bw-form-row-2">
            <label class="bw-field">
              <span class="bw-field-label">${tr('booking.label_email')}</span>
              <input type="email" data-bk="email" value="${escapeAttr(booking.email)}"/>
            </label>
            <label class="bw-field">
              <span class="bw-field-label">${tr('booking.label_phone')} <span class="bw-field-opt">${tr('contact.optional')}</span></span>
              <input type="tel" data-bk="phone" value="${escapeAttr(booking.phone)}"/>
            </label>
          </div>
          <label class="bw-field">
            <span class="bw-field-label">${tr('booking.label_note')} <span class="bw-field-opt">${tr('contact.optional')}</span></span>
            <textarea rows="3" data-bk="notes">${escapeAttr(booking.notes)}</textarea>
          </label>
        </div>`;
    }

    m.innerHTML = `
      <div class="bw-modal-card">
        <div class="bw-modal-head">
          <div class="bw-modal-steps">
            ${STEPS.map((s, i) => `
              <div class="bw-step ${i === booking.step ? 'is-active' : ''} ${i < booking.step ? 'is-done' : ''}">
                <span class="bw-step-num">${i < booking.step ? icon('check', 12, 2.4) : i + 1}</span>
                <span class="bw-step-label">${s}</span>
              </div>`).join('')}
          </div>
          <button class="bw-icon-btn" data-booking-close aria-label="Close">${icon('close', 20, 1.8)}</button>
        </div>
        <div class="bw-modal-body">${body}</div>
        ${booking.done ? '' : `
          <div class="bw-modal-foot">
            <button class="bw-btn bw-btn-ghost" data-booking-prev>${booking.step === 0 ? tr('booking.cancel') : tr('booking.back')}</button>
            <button class="bw-btn bw-btn-primary" data-booking-next ${canNext() ? '' : 'disabled'}>
              ${booking.step === 3 ? tr('booking.send') : tr('booking.next')}
              ${icon('arrow-right', 14, 2)}
            </button>
          </div>`}
      </div>`;

    bindBooking();
  };

  const bindBooking = () => {
    const m = document.getElementById('bw-booking-modal');
    m.querySelectorAll('[data-booking-close]').forEach(b => b.addEventListener('click', closeBooking));

    m.querySelectorAll('[data-area]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.area;
      booking.areas = booking.areas.includes(id) ? booking.areas.filter(x => x !== id) : [...booking.areas, id];
      renderBookingStep();
    }));
    m.querySelectorAll('[data-doctor]').forEach(b => b.addEventListener('click', () => {
      booking.doctor = b.dataset.doctor;
      renderBookingStep();
    }));
    m.querySelectorAll('[data-date]').forEach(b => b.addEventListener('click', () => {
      booking.date = new Date(parseInt(b.dataset.date, 10));
      booking.time = null;
      renderBookingStep();
    }));
    m.querySelectorAll('[data-time]').forEach(b => b.addEventListener('click', () => {
      if (b.disabled) return;
      booking.time = b.dataset.time;
      renderBookingStep();
    }));
    m.querySelectorAll('[data-bk]').forEach(inp => inp.addEventListener('input', () => {
      booking[inp.dataset.bk] = inp.value;
      const next = m.querySelector('[data-booking-next]');
      if (next) next.toggleAttribute('disabled', !canNext());
    }));
    const prev = m.querySelector('[data-booking-prev]');
    prev && prev.addEventListener('click', () => {
      if (booking.step === 0) closeBooking();
      else { booking.step--; renderBookingStep(); }
    });
    const next = m.querySelector('[data-booking-next]');
    next && next.addEventListener('click', () => {
      if (booking.step < 3) { booking.step++; renderBookingStep(); }
      else { booking.done = true; renderBookingStep(); }
    });
  };

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = getLang();
    renderNav();
    renderFooter();
    renderFAQ();
    renderContactForm();
    // Replay i18n once
    setLang(getLang());
  });

  // expose for inline use
  window.BW = { openBooking, setLang, getLang, icon };
})();

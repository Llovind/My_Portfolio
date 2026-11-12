import { photoFiles } from "@/lib/photo-files";
export const TODO = "TODO: confirm";
export const confirmed = (value: string): boolean => value.trim().length > 0 && !value.includes("TODO");

export const profile = {
  name: "Lovind",
  fullDisplayName: "Lovind Luthfan Hakeem Firdaus",
  role: "Telecommunications Engineering student · Security & Infrastructure Engineering",
  positioning: TODO,
  location: "Bandung, Indonesia",
  university: "Telkom University",
  education: "B.Eng Telecommunications Engineering · Aug 2023–present · Expected 2027",
  email: "lovindfirdaus@gmail.com",
  github: "https://github.com/Llovind",
  linkedin: "https://www.linkedin.com/in/lovind-luthfan-hakeem-firdaus/",
  medium: "https://medium.com/@lovindfirdaus",
  cv: "/cv/CV_Lovind_Infra.pdf",
  cvs: [{ label: "CV · Infrastructure", href: "/cv/CV_Lovind_Infra.pdf" }, { label: "CV · SOC", href: "/cv/CV_Lovind_SOC.pdf" }],
  availability: "Open to network, cloud, and security & infrastructure engineering roles.",
  proof: [
    { label: "AWS Certified Cloud Practitioner", detail: "2026" },
    { label: "Infranexia · PSS internship", detail: "Jun–Sep 2026" },
  ],
  metadata: { title: "Lovind | Networks, Infrastructure & Security", description: "Telecommunications Engineering student · Security & Infrastructure Engineering." },
};

export const film = {
  title: "Layer 1 → Layer 8",
  navLabel: "Portfolio layer navigation",
  navHeading: "Chapters",
  navClose: "Close",
  home: "Introduction",
  skip: "Skip to my story",
  scroll: "Scroll slowly",
  illustration: "",
  pending: "Next scene · not built yet",
  pilot: "Layer 1 → 8",
  end: "Lovind",
  layers: [
    { number: 1, name: "Foundation", chapter: "Foundation", target: "layer1", built: true },
    { number: 2, name: "Applied work", chapter: "Applied work", target: "layer2", built: true },
    { number: 3, name: "Leadership", chapter: "Leadership", target: "layer3", built: true },
    { number: 4, name: "Builds", chapter: "Builds", target: "layer4", built: true },
    { number: 5, name: "Security", chapter: "Security", target: "layer5", built: true },
    { number: 6, name: "Proof", chapter: "Proof", target: "layer6", built: true },
    { number: 7, name: "Stack", chapter: "Stack", target: "layer7", built: true },
    { number: 8, name: "Human", chapter: "Human", target: "layer8", built: true },
  ],
  hero: {
    chapter: "My story in eight layers",
    intro: "I'm",
    name: "Lovind",
    line: "building security & infrastructure systems",
    role: "Telecommunications Engineering student · Security & Infrastructure Engineering",
    location: "Bandung, Indonesia",
    next: "Begin with my foundation",
    noiseAlphabet: "01/<>[]+*#",
  },
  foundation: {
    label: "L1 — L2 / Foundation",
    firstTitle: "I study the systems that connect us.",
    firstBody: "I've been studying Telecommunications Engineering at Telkom University since August 2023.",
    firstMeta: "B.Eng · Expected 2027",
    secondTitle: "At CPS Lab, I turn that foundation into practice.",
    secondBody: "I'm a Practicum Assistant at CPS Laboratory, working with Linux, Packet Tracer, GNS3 and VoIP.",
    secondMeta: "Telkom University · Aug 2025–present",
    diagramTitle: "A cable becomes a switch topology",
    diagramDescription: "",
    switchLabel: "SWITCH",
    endpoints: ["Linux", "Packet Tracer", "GNS3", "VoIP"],
    caption: "One connection becomes a network.",
  },
  network: {
    label: "L3 / Network",
    beats: [
      { title: "I study what moves through a network.", body: "At MBC Laboratory, my cybersecurity research covers NDN/SDN.", meta: "Cybersecurity Research Assistant · Oct 2025–present" },
      { title: "Then I look at what disrupts it.", body: "My research includes an NFD testbed for Cache Pollution Attack.", meta: "MBC Laboratory · NFD testbed" },
      { title: "I work on the defensive side, too.", body: "My work also covers SDN-based IPS and OPNsense NGFW segmentation.", meta: "MBC Laboratory · Network security research" },
    ],
    diagramTitle: "NDN / NFD",
    diagramDescription: "",
    stages: ["Connections", "Cache pollution", "Defensive response"],
    caption: "Understanding the network. Studying its defenses.",
  },
};

export const humanChapter = {
  chapter: "L8 / Human",
  headline: "I helped people grow.",
  notesLabel: "People & responsibilities",
  illustration: "",
  artAlt: "A stylised fingerprint with rounded ridges and a central loop, linked to teaching, organisational development, events and business research.",
  moments: [
    { beat: "Handed", text: "I help students get hands-on with Linux and network security at CPS Laboratory.", reference: "Practicum assistance · network security mentoring" },
    { beat: "Chose", text: "I work on how MBC assesses and develops its members.", reference: "Human capital · MBC Laboratory" },
    { beat: "Chose", text: "I chaired Open Laboratory and Lab Exhibition.", reference: "Open Laboratory: 120+ participants · Lab Exhibition: 50–100 participants" },
    { beat: "Closing", text: "I coordinated Creator Turbo Agent and worked on its business model.", reference: "Project management · Creator Turbo Agent" },
  ],
  contexts: [
    { label: "CPS Laboratory", detail: "Linux · network security", className: "human-context--practice" },
    { label: "MBC Laboratory", detail: "Weighted KPI evaluation · org development", className: "human-context--framework" },
    { label: "Open Laboratory", detail: "120+ participants · Sep–Oct 2025", className: "human-context--open" },
    { label: "Lab Exhibition", detail: "50–100 participants · Jan–Mar 2026", className: "human-context--exhibition" },
    { label: "B2B2C", detail: "Business research · positioning", className: "human-context--business" },
  ],
  notes: [
    { text: "I supported Linux and network-security practice at CPS Laboratory as a practicum assistant and network security mentor.", meta: "CPS Laboratory, Telkom University · Aug 2025–present" },
    { text: "At MBC Laboratory, my human-capital work covered a weighted KPI evaluation framework and organisational development.", meta: "Head of Human Capital · May 2026–present" },
    { text: "I chaired Open Laboratory, with 120+ participants, and Lab Exhibition, with 50–100 participants.", meta: "Open Laboratory · Sep–Oct 2025 / Lab Exhibition · Jan–Mar 2026" },
    { text: "I coordinated Creator Turbo Agent as project manager and led business research, positioning and the B2B2C monetization model.", meta: "ZTE Indonesia x ITB" },
  ],
};

export const profilePhotos = {
  portrait: { ...photoFiles.portrait, id: "portrait", alt: "Portrait supplied for Lovind's portfolio", caption: "Lovind", meta: "" },
  mentoring: { ...photoFiles.mentoring, id: "mentoring", alt: "Network-security mentoring group in a classroom", caption: "I help students get hands-on with Linux and network security at CPS Laboratory.", meta: "CPS Laboratory · Network security mentoring" },
  openLab: { ...photoFiles.openLab, id: "open-lab", alt: "Open Laboratory group gathered in a lecture room", caption: "I chaired Open Laboratory.", meta: "120+ participants · Sep–Oct 2025" },
  exhibition: { ...photoFiles.exhibition, id: "exhibition", alt: "Lab Exhibition group gathered in front of the event screen", caption: "I chaired Lab Exhibition.", meta: "50–100 participants · Jan–Mar 2026" },
  zteTeam: { ...photoFiles.zteTeam, id: "zte-team", alt: "Three team members on stage during the ZTE project presentation", caption: "I coordinated Creator Turbo Agent as project manager.", meta: "ZTE Indonesia x ITB" },
};

export const heroPresentation = {
  intro: "I'm a",
  role: confirmed(profile.role) ? profile.role.split(" · ")[0] : "",
  tagline: confirmed(film.hero.line) ? film.hero.line : "",
  progressLabel: "Layer progress",
  linksLabel: "Profile links",
  shortcutsLabel: "Jump to my work or contact",
  shortcuts: [{ label: "Contact", href: "#finale" }],
  links: [
    { label: "CV", href: profile.cv },
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter(link => confirmed(link.href)),
};


export const finale = {
  chapter: film.title,
  count: "08 / 08",
  headline: "Let's connect.",
  availability: "I'm open to network, cloud, and security & infrastructure engineering roles.",
  emailLabel: "Email me",
  email: confirmed(profile.email) ? profile.email : "",
  linksLabel: "Elsewhere",
  links: [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Medium", href: profile.medium },
    ...profile.cvs,
  ].filter(link => confirmed(link.href)),
  back: "Back to the beginning",
  name: profile.name,
  location: confirmed(profile.location) ? profile.location : "",
  arrow: "↗",
};


export const photoViewer = {
  open: "View full-size photo",
  close: "Close photo",
};

// Derived from the owner update in facts.md, L1–L3 and L6–L7.
export const balancedProfile = {
  labels: ['Foundation', 'Applied work', 'Leadership', 'Builds', 'Security', 'Proof', 'Stack', 'Human'],
  foundation: {
    title: 'I learned networks by working on them.',
    intro: 'I study Telecommunications Engineering at Telkom University. In the labs, I teach network practice and research network security.',
    facts: [
      { place: 'Telkom University', date: 'Aug 2023–present', text: 'I study Telecommunications Engineering.', scope: 'B.Eng Telecommunications Engineering' },
      { place: 'CPS Laboratory', date: 'Aug 2025–present', text: 'I help with Linux, Packet Tracer, GNS3 and VoIP in the Network and Telecommunication Traffic labs.', detail: 'My lab work also includes 5G Core/RAN analysis with MATLAB, Simulink and SimEvents.', scope: 'Practicum Assistant' },
      { place: 'MBC Laboratory', date: 'Oct 2025–present', text: 'I research NDN and SDN security, including a physical NFD testbed for Cache Pollution Attack mitigation.', detail: 'I also work on an SDN-based IPS and co-authored a research paper.', scope: 'Cybersecurity Research Assistant · co-authored research paper' },
    ],
  },
  technicalLabel: 'How it worked',
  applied: {
    title: 'I worked beyond the lab.',
    intro: '',
    offline: 'UNSW-NB15 · offline model benchmark',
    entries: [
      { id: 'humic-work', place: 'HUMIC Engineering Research Center', date: 'Apr–Jul 2026', status: 'Telkom University', completed: false, role: 'SOC Analyst', text: 'A teammate trained the model. I got it running on a cloud VPS and connected it to the SOC.', detail: 'I ran an SSH brute-force test against the VPS. It blocked the IP automatically.', technical: 'My work covered deployment, Flask serving, the hybrid override and response automation. Suricata, Wazuh and Shuffle formed the pipeline; the system could also run remote commands.', metrics: [{label: 'Recall', value: '92.69%'}, {label: 'ROC-AUC', value: '97.42%'}] },
      { id: 'infranexia-work', place: 'Infranexia', date: 'Jun–Sep 2026', status: 'Completed internship', completed: true, role: 'Performance and Support (PSS) Intern · PT Telkom Infrastruktur Indonesia', text: 'I built Human Firewall for phishing simulation and security awareness, with micro-quizzes, streaks and leaderboards.', detail: 'I also brought 32 Excel sources into the KPI WISA Dashboard, covering 90+ telecom KPIs.', technical: 'The ETL pipeline rolled the data up through WITEL, DISTRICT and HSA.' },
      { id: 'cisometric-work', place: 'Cisometric', date: 'Sep 2026–present', status: 'Apprenticeship', completed: false, role: 'Information Security Audit Apprentice', text: 'I’m learning how to assess security controls under a practicing industry auditor.', detail: 'I work through audit cases and practise documenting findings.', technical: 'The apprenticeship covers ISO/IEC 27001 and ISO 19011, including first-, second- and third-party audit exercises.' },
    ],
  },
  leadership: {
    title: 'I worked with people, too.',
    intro: 'I also teach English and work on member development at MBC Laboratory.',
    entries: [
      { place: 'MBC Laboratory', date: 'May 2026–present', role: 'Head of Human Capital', text: 'I help assess members each quarter and track their performance. I also work on communication and external partnerships.' },
      { place: 'omongin.id', date: 'Mar–Sep 2026', role: 'English Tutor', text: 'I coached professionals on speaking English, preparing a CV and handling interviews.' },
      { place: 'English for Everyone', date: 'Sep 2026–present', role: 'English Tutor', text: 'I teach speaking and grammar.' },
    ],
  },
  proof: {
    title: 'Here is the record.', competitionsLabel: 'Competitions', heldLabel: 'Certifications held', progressLabel: 'In progress', finalist: 'Finalist',
    competitions: [
      { event: 'HackNusa 2026', detail: 'Human-Centric Security track', project: 'Afferent' },
      { event: 'ZTE x ITB National Competition', detail: '', project: 'Creator Turbo Agent' },
      { event: 'ITASE 7.0 AI Innovation Challenge', detail: '', project: 'OMNIkpi' },
    ],
    held: [
      { name: 'AWS Certified Cloud Practitioner', issuer: '2026' },
      { name: 'Google Cybersecurity Certificate', issuer: '' },
      { name: 'Certified Blue Team Practitioner', issuer: 'The SecOps Group' },
      { name: 'Certified Social Engineering Defense Practitioner', issuer: 'The SecOps Group' },
      { name: 'AWS re/Start Cloud Computing Graduate', issuer: 'Orbit Future Academy' },
    ],
    progress: 'Microsoft SC-500 Cloud and AI Security Engineer Associate',
  },
  stack: {
    title: 'This is what I work with.', directionLabel: 'Where I’m heading', direction: 'Security and infrastructure engineering.',
    groups: [
      { name: 'Security', items: ['Wazuh', 'Suricata', 'Shuffle SOAR', 'GoPhish', 'Keycloak', 'OpenZiti', 'MITRE ATT&CK', 'Wireshark', 'Nmap'] },
      { name: 'Cloud / infrastructure', items: ['AWS · VPC, EC2, IAM, S3, CloudWatch, Lambda, CloudFormation', 'Docker', 'NGINX', 'Linux'] },
      { name: 'App / data', items: ['Python · Flask, pandas', 'Next.js', 'SQLite', 'n8n'] },
      { name: 'Networking', items: ['SDN · Ryu, Mininet', 'NDN', 'VoIP', 'GNS3', '5G Core/RAN fundamentals'] },
      { name: 'Machine learning', items: ['Transformer classification', 'Clustering', 'Anomaly detection'] },
    ],
  },
};

export const chapterArt = {
  illustration: '',
  foundation: {
    alt: 'Diagram: a cable becomes a switch and branches toward network practice and research.',
    origin: 'Telecommunications', center: 'Lab practice', endpoints: ['Linux', 'Packet Tracer', 'GNS3', 'VoIP'],
  },
  timeline: { year: '2026', months: ['Apr', 'Jun', 'Sep'], label: 'Follow my applied work' },
  people: { alt: 'Diagram: two overlapping conversation shapes connect member development and teaching.', member: 'Member development', teaching: 'Speaking. Grammar. Communication.' },
};

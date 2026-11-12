import { photoFiles } from "@/lib/photo-files";

export const projectPhotos = {
  ztePitch: { ...photoFiles.ztePitch, id: "zte-pitch", alt: "A speaker holding a microphone with teammates during the ZTE project pitch", caption: "I led business research, positioning and the B2B2C monetization model.", meta: "Creator Turbo Agent · ZTE Indonesia x ITB" },
};

// Derived from facts.md L4–L5. Project names follow the personal decision.
export const balancedBuilds = {
  title: 'I worked with traffic and spreadsheets.',
  intro: '',
  projects: [
    {
      decision: 'I worked on the business side.', name: 'Creator Turbo Agent',
      text: 'I coordinated the project and developed its B2B2C model. The prototype recognised encrypted livestreams from flow statistics and asked the 5G Core for uplink priority.',
      detail: 'Edge AI ran on the ZTE CPE. The QoD request used NEF/PCF and CAMARA, without inspecting the payload.',
      scope: 'This was a three-VM proof of concept, with a classifier tested on synthetic data.',
      cost: '',
      input: 'Flow statistics', output: 'Uplink priority request',
    },
    {
      decision: 'I took the work beyond a dashboard.', name: 'omniKPI',
      text: 'I grew the KPI WISA work into omniKPI: a workspace for finding KPI anomalies and explaining them from evidence.',
      detail: 'The workspace connects anomaly investigation with evidence-based root cause analysis.',
      scope: 'It’s a local prototype, and the demo uses synthetic data.',
      cost: '', input: 'Divisional KPI data', output: 'Evidence-based explanation',
    },
  ],
  evidence: [
    { src: '/evidence/omnikpi-dashboard.png', alt: 'omniKPI dashboard showing synthetic demo data', caption: 'omniKPI · synthetic demo data' },
    { src: '/evidence/cta-business-model.png', alt: 'Creator Turbo Agent B2B2C business-model slide', caption: 'Creator Turbo Agent · B2B2C model' },
  ],
  missing: 'TODO: project evidence image not supplied',
};

export const balancedSecurity = {
  title: 'I connected detection to enforcement.',
  intro: 'I worked on the SOC pipeline, explored identity and network authorization, and built a phishing-awareness loop.',
  soc: { decision: 'I made the response automatic.', name: 'AI-Assisted SOC Platform', text: 'The Transformer came from a teammate. I connected it to the alert pipeline and built the response around it.', link: 'See my HUMIC work', href: '#humic-work' },
  trust: { decision: 'I separated identity from network access.', name: 'Zero Trust Architecture Lab', text: 'I used Keycloak to handle identity and OpenZiti to control network access. The four-VM lab had three personas with progressively stricter MFA.', facts: ['4 VMs', 'Keycloak + OpenZiti', '3 personas · progressive MFA'] },
  afferent: { decision: 'I closed the loop at the web layer.', name: 'Afferent', text: 'I worked on phishing simulation and security awareness for employees, HR/GRC and the SOC.', scope: 'The loop closes at the web layer.', mapping: 'I mapped the GRC Readiness Engine to ISO 27001 Annex A.6.3, A.6.8 and A.8.12, and UU PDP Pasal 35 and 46.', mappingLabel: 'The controls I mapped' },
};

export const projectArt = {
  illustration: '',
  signal: { alt: 'Diagram: flow statistics follow a selected route to a 5G Core priority request, without payload inspection.', input: 'Flow statistics', noDpi: 'No payload inspection', output: 'Priority request', api: '5G Core · NEF/PCF · CAMARA' },
  data: { alt: 'Diagram: reporting sheets connect to evidence-based root cause analysis; this is not a product screenshot.', input: 'Divisional KPI data', output: 'Evidence-based explanation', rca: 'RCA' },
  identity: { alt: 'Diagram: three personas cross identity and network authorization layers in a four-VM lab.', personas: '3 personas · progressive MFA', identity: 'Keycloak · identity', network: 'OpenZiti · network authorization', lab: '4-VM lab' },
  web: { alt: 'Diagram: Employee, HR/GRC and SOC experiences surround a web-layer loop; these are contexts, not an ordered production workflow.', center: 'Web layer', roles: ['Employee', 'HR/GRC', 'SOC'] },
  soc: ['Suricata', 'Wazuh', 'Shuffle', 'Flask'],
};

export const topologyArt = {
  cta: {
    alt: 'Diagram: encrypted live-streaming connects to Edge AI on a ZTE CPE, then a 5G Core QoD API priority request. This is a logical topology, not a VM deployment map.',
    nodes: [{name:'Encrypted stream', detail:''}, {name:'ZTE CPE', detail:'Edge AI'}, {name:'5G Core', detail:'QoD API'}],
    note: 'The payload stays encrypted.', request: 'Uplink priority request',
  },
  trust: {
    alt: 'Diagram: three personas connect through Keycloak identity and OpenZiti network authorization; four VM symbols represent the lab without assigning applications to individual VMs.',
    personas: '3 personas', mfa: 'Progressive MFA', identity: 'Keycloak', identityDetail: 'Identity', network: 'OpenZiti', networkDetail: 'Network authorization', lab: '4-VM lab',
  },
  soc: {
    alt: 'Diagram: Suricata connects to Wazuh, then Shuffle and the Flask Transformer API. The model prediction returns to the response workflow for automatic IP blocking.',
    nodes: ['Suricata', 'Wazuh', 'Shuffle SOAR', 'Flask · Transformer'], prediction: 'Model prediction', response: 'Automatic IP blocking', validation: 'Validated with live SSH brute-force traffic · cloud VPS',
  },
};

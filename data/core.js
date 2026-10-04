/* Core data + authoring helpers for the IB CS paper generator (first assessment 2027). */
// Escape code for display inside <pre>.
function escCode(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
// C(text) or C({py,java}) -> a code block (language-aware when given an object).
function C(x){
  if(x&&typeof x==="object")return{py:`<pre class="code">${escCode(dedent(x.py))}</pre>`,java:`<pre class="code">${escCode(dedent(x.java))}</pre>`};
  return`<pre class="code">${escCode(dedent(x))}</pre>`;
}
// inline code
function I(x){
  if(x&&typeof x==="object")return{py:`<code class="i">${escCode(x.py)}</code>`,java:`<code class="i">${escCode(x.java)}</code>`};
  return`<code class="i">${escCode(x)}</code>`;
}
// language pair shorthand
function PJ(py,java){return{py,java}}
function dedent(s){
  s=String(s).replace(/^\n+/,"").replace(/\s+$/,"");
  const lines=s.split("\n");const ind=Math.min(...lines.filter(l=>l.trim()).map(l=>l.match(/^ */)[0].length));
  return lines.map(l=>l.slice(ind)).join("\n");
}
// simple HTML table: T([["h1","h2"],["a","b"]])
function T(rows){return`<table class="dt"><tr>${rows[0].map(c=>`<th>${c}</th>`).join("")}</tr>${rows.slice(1).map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table>`}

// [code, name, SL hours, HL hours, HL only]
const TOPICS=[
 ["A1.1","Computer hardware and operation",5,7],
 ["A1.2","Data representation and computer logic",4,4],
 ["A1.3","Operating systems and control systems",2,5],
 ["A1.4","Translation",0,2,1],
 ["A2.1","Network fundamentals",3,5],
 ["A2.2","Network architecture",3,4],
 ["A2.3","Data transmissions",3,4],
 ["A2.4","Network security",2,5],
 ["A3.1","Database fundamentals",2,2],
 ["A3.2","Database design",6,6],
 ["A3.3","Database programming",3,5],
 ["A3.4","Alternative databases and data warehouses",0,5,1],
 ["A4.1","Machine learning fundamentals",3,3],
 ["A4.2","Data preprocessing",0,3,1],
 ["A4.3","Machine learning approaches",0,9,1],
 ["A4.4","Ethical considerations",2,3],
 ["B1.1","Approaches to computational thinking",5,5],
 ["B2.1","Programming fundamentals",8,8],
 ["B2.2","Data structures",10,10],
 ["B2.3","Programming constructs",8,8],
 ["B2.4","Programming algorithms",9,11],
 ["B2.5","File processing",5,5],
 ["B3.1","Fundamentals of OOP for a single class",7,9],
 ["B3.2","Fundamentals of OOP for multiple classes",0,14,1],
 ["B4.1","Fundamentals of abstract data types",0,23,1]
];

// Case-study style markbands (from the specimen markschemes)
const BANDS={
 6:[["0","No knowledge or understanding of the relevant issues and concepts. No use of appropriate terminology."],
    ["1–2","Basic: minimal knowledge and understanding of the relevant issues; minimal use of appropriate terminology; the answer may be little more than a list; no reference to the scenario or independent research."],
    ["3–4","Adequate: a descriptive response with limited knowledge and/or understanding; limited use of appropriate terminology; some analysis; evidence of some research."],
    ["5–6","Competent: knowledge and understanding of the related issues and/or concepts; terminology used appropriately in places; evidence of analysis and research; there is a conclusion."]],
 12:[["0","No knowledge or understanding of the relevant issues and concepts. No use of appropriate terminology."],
    ["1–3","Basic: minimal knowledge and understanding of the relevant issues or concepts; minimal use of appropriate terminology; may be little more than a list; no reference to the scenario or independent research."],
    ["4–6","Adequate: a descriptive response with limited knowledge and/or understanding; limited use of terminology; limited evidence of analysis; limited research."],
    ["7–9","Competent: knowledge and understanding of the related issues and/or concepts; terminology used appropriately in places; some evidence of analysis; evidence of research."],
    ["10–12","Proficient: detailed knowledge and clear understanding of computer science; terminology used appropriately throughout; competent and balanced analysis; conclusions drawn that are linked to the analysis; clear evidence of extensive research."]]
};

// Discussion questions for topic tests (marked with the case-study markbands: [6] SL, [12] HL)
const EQ=[
 {t:"A1.1",q:"To what extent should a small design studio move its software and storage to cloud services (SaaS, PaaS, IaaS) rather than keep its own servers?",ind:["SaaS: no installation/maintenance, subscription cost, accessible anywhere; less control over features/data location","PaaS: developers build/deploy without managing OS/hardware; vendor lock-in","IaaS: rent virtual servers/storage; most control, but staff need skills to manage","Benefits: scalability, lower upfront cost, automatic backups/updates, remote working","Risks: dependence on internet connection, latency, recurring cost, data privacy/legal jurisdiction, provider outages","Security responsibility is shared between provider and customer","Conclusion that weighs control vs convenience for a small organization"]},
 {t:"A1.3",q:"Evaluate the use of polling and interrupt handling in a battery-powered fitness tracker.",ind:["Polling: CPU repeatedly checks device status at fixed intervals; simple, predictable timing","Polling wastes CPU cycles and battery when events are rare","Interrupts: device signals CPU only when an event occurs; CPU can sleep between events — saves power","Interrupt handling has overheads (saving state/context switch) and can be harder to debug","Event frequency: high-frequency sensor data (heart rate) may suit polling/batching; rare events (button press) suit interrupts","Latency: interrupts give faster response to unpredictable events","Conclusion: likely a hybrid, with justification"]},
 {t:"A2.2",q:"Discuss whether a peer-to-peer model or a client–server model is more suitable for a school's file-sharing system.",ind:["Client–server: central control, centralized backups, access rights, easier security management","Client–server: server is a single point of failure, cost of server and admin staff","P2P: no dedicated server, cheaper, resilient if one peer fails","P2P: harder to manage security/permissions/backups; files scattered; performance depends on peers","School context: many users, need for safeguarding and monitoring","Conclusion with justification"]},
 {t:"A2.4",q:"Discuss the effectiveness of firewalls in protecting a hospital network from cyberattacks.",ind:["Packet filtering using rules, whitelists and blacklists","Stateful inspection of connections; application-layer filtering","NAT hides internal IP addresses","Limitations: cannot stop attacks inside the network, phishing, malware on allowed ports, encrypted traffic, misconfigured rules","Need for layered security: IDS/IPS, MFA, staff training, patching","Conclusion"]},
 {t:"A2.4",q:"To what extent does asymmetric encryption solve the problems of key distribution in secure communication?",ind:["Symmetric: same key to encrypt/decrypt; fast but key must be shared securely","Asymmetric: public key shared openly, private key kept secret; solves key exchange","Asymmetric is slower, so often used to exchange a symmetric session key (TLS)","Digital certificates bind public keys to identities; issued by certificate authorities","Remaining problems: private key theft, trust in CAs, key management/revocation","Conclusion"]},
 {t:"A3.2",q:"Evaluate the decision to denormalize the database used by a busy online shop's product catalogue.",ind:["Normalization (3NF) reduces redundancy and update anomalies, improves integrity","Denormalization reduces joins, so read-heavy queries (product pages) are faster","Costs: duplicated data, more storage, risk of inconsistency on update, more complex updates","Read-intensive vs write-intensive workloads","Alternatives: indexes, caching, materialized views","Conclusion"]},
 {t:"A3.3",q:"Discuss the benefits and risks of allowing staff to run their own SQL queries directly on a company database.",ind:["Benefits: flexible data retrieval, quicker reporting, less reliance on IT","Risks: accidental UPDATE/DELETE without WHERE, poorly written queries slowing the system, access to sensitive data","Controls: read-only accounts, views, access privileges, DML vs DDL permissions","Training needs","Conclusion"]},
 {t:"A4.1",q:"Discuss the hardware choices a start-up should consider when deploying a machine learning model that identifies plant diseases from photos taken on farmers' phones.",ind:["Training vs inference have different needs","Cloud GPUs/TPUs for training: scalable, pay-as-you-go","Edge devices (the phone) for inference: works offline, lower latency, privacy; limited processing/battery","ASICs/FPGAs for specialised high-volume inference","Storage for image datasets","Cost, scalability, connectivity in rural areas","Conclusion"]},
 {t:"A4.4",q:"To what extent should social media companies be held accountable for the content their recommendation algorithms promote?",ind:["Recommendation algorithms optimize engagement, which can amplify misinformation/extreme content","Bias in training data and feedback loops","Accountability: who is responsible — developers, company, users?","Transparency/explainability of algorithms","Free speech vs harm; online harassment; anonymity","Regulation and independent audits","Conclusion"]},
 {t:"A4.4",q:"Discuss the ethical implications of using machine learning to screen job applications.",ind:["Efficiency: process large numbers of applications quickly and consistently","Bias: historical hiring data may encode discrimination (gender, ethnicity, age)","Transparency: applicants may not know why they were rejected","Accountability for wrong decisions","Privacy/consent over data used","Mitigations: audits, diverse training data, human review","Conclusion"]},
 {t:"A4.4",q:"Discuss the implications of the increasing use of augmented reality (AR) and virtual reality (VR) in education.",ind:["Benefits: immersive learning, simulations of dangerous/expensive experiments, accessibility for remote learners","Equity: cost of headsets; digital divide","Privacy: devices collect movement/biometric/location data","Health: motion sickness, eye strain, screen time","Need to reassess ethical guidelines as technology advances","Conclusion"]},
 {t:"A3.4",q:"Evaluate the use of a NoSQL database instead of a relational database for a social media platform.",hl:1,ind:["NoSQL: flexible schema for unstructured/semi-structured data (posts, images, comments)","Horizontal scaling across many servers for big data","High availability; eventual consistency","Relational: strong consistency, ACID transactions, complex joins/queries","Social media: massive volume, varied data, read-heavy feeds","Conclusion (often a hybrid)"]},
 {t:"A4.3",q:"Evaluate the use of a convolutional neural network (CNN) rather than a decision tree to diagnose skin conditions from photographs.",hl:1,ind:["CNNs learn spatial hierarchies of features directly from image pixels (convolution, pooling, fully connected layers)","Decision trees need hand-crafted features; easy to interpret","CNNs need large labelled datasets, GPUs, long training; risk of overfitting","Explainability: CNN is a 'black box'; doctors may need reasons","Bias: training images may under-represent some skin tones","Evaluation with precision/recall/F1 for medical use","Conclusion"]},
 {t:"B3.1",q:"Evaluate the use of object-oriented programming for developing a library management system.",ind:["Classes model real-world entities (Book, Member, Loan)","Encapsulation protects data integrity through methods","Reusability and maintainability; teams can work on separate classes","Inheritance/polymorphism (e.g. types of items) can extend the system","Disadvantages: design overhead, can be slower/larger, steeper learning curve, over-engineering for small programs","Conclusion"]},
 {t:"B2.4",q:"Discuss the choice between linear search and binary search for a school's student record system.",ind:["Linear search: O(n), works on unsorted data, simple","Binary search: O(log n), much faster for large data but needs sorted data","Cost of sorting/keeping data sorted when records are added","Search key: searching by sorted ID vs unsorted field (e.g. phone number)","Size of data set; frequency of searches vs updates","Conclusion"]},
 {t:"B4.1",q:"Evaluate the use of a hash table to store user accounts for a website login system.",hl:1,ind:["Hash function maps key (username) to index; average O(1) insert/search","Collisions: chaining or open addressing; performance degrades with high load factor","Resizing/rehashing when load factor exceeds a threshold","No ordering of keys — range queries/sorted listing are inefficient","Compared with BST (O(log n), ordered) or array/list (O(n) search)","Conclusion"]}
];

// Flowchart as a vertical list of numbered boxes. nodes: [type, text, branches?]
// type: "t" terminal (start/end), "p" process, "io" input/output, "d" decision (branches: "true → 4, false → 8")
function FC(title,nodes){
  const shape={t:"border-radius:999px",p:"border-radius:3px",io:"border-radius:3px;transform:skewX(-12deg)",d:"border-radius:3px;border-style:double;border-width:3px"};
  return `<div class="flowbox"><div class="flowt">${title}</div>${nodes.map((n,i)=>`<div class="fnode"><span class="fn">${i+1}</span><span class="fs" style="${shape[n[0]]}"><span style="${n[0]==="io"?"display:inline-block;transform:skewX(12deg)":""}">${escCode(n[1])}</span></span>${n[2]?`<span class="fb">${escCode(n[2])}</span>`:i<nodes.length-1&&n[0]!=="t"||i===0?`<span class="fb">↓</span>`:""}</div>`).join("")}<div class="flowk">Shapes: rounded = start/end · rectangle = process · slanted = input/output · double border = decision. Arrows show the next step.</div></div>`;
}

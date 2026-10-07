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

/* ---------- flowcharts: proper SVG (terminator, process, input/output, decision, arrows) ----------
   FLOWSVG(nodes, opts) -> {svg, desc}
   nodes: [{id, k:"t"|"p"|"io"|"d", x:"text|second line", next:id, yes:id, no:id, side:true}]
   Nodes stack in a main column in array order; side:true puts a node to the right of the node before
   it (a decision's side branch). Back edges loop round on the left, forward skips run down on the right;
   longer jumps use outer lanes so lines never cross.
   opts: {labels:["Yes","No"], num:true (show step numbers), arrow:true (show "<-" as ←)} */
function FLOWSVG(nodes,opts){
  opts=opts||{};const LB=opts.labels||["Yes","No"];
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const tx=(x,y,t,a,ex)=>`<text x="${x}" y="${y}" text-anchor="${a||"middle"}" fill="currentColor" stroke="none"${ex?" "+ex:""}>${t}</text>`;
  const arw=(x1,y1,x2,y2)=>{const a=Math.atan2(y2-y1,x2-x1),s=7,p=d=>[x2-s*Math.cos(a+d),y2-s*Math.sin(a+d)],l=p(.45),r=p(-.45);
    return`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polygon points="${x2},${y2} ${l[0].toFixed(1)},${l[1].toFixed(1)} ${r[0].toFixed(1)},${r[1].toFixed(1)}" fill="currentColor"/>`};
  const FS=12.5,CW=7.1,LH=16,GAP=30,LANE=16,byId={};nodes.forEach(n=>byId[n.id]=n);
  const txt=n=>String(n.x).replace(/<-/g,"←");
  const lines=n=>txt(n).split(/\||\n/);
  nodes.forEach(n=>{const L=lines(n),tw=Math.max(...L.map(l=>l.length))*CW;
    if(n.k==="d"){n.w=Math.max(130,tw*1.25+56);n.h=Math.max(62,L.length*LH+40)}
    else{n.w=Math.max(n.k==="t"?96:120,tw+(n.k==="io"?44:26));n.h=Math.max(34,L.length*LH+14)}});
  let row=-1;nodes.forEach((n,i)=>{if(n.side&&i>0){n.row=nodes[i-1].row;n.col=1}else{n.row=++row;n.col=0}});
  const nrows=row+1,rowH=[];nodes.forEach(n=>{rowH[n.row]=Math.max(rowH[n.row]||0,n.h)});
  const rowY=[];let y=14;for(let r=0;r<nrows;r++){rowY[r]=y+rowH[r]/2;y+=rowH[r]+GAP}
  const H=y-GAP+14;
  const outs=n=>n.k==="d"?[[LB[0],n.yes],[LB[1],n.no]]:(n.next?[["",n.next]]:[]);
  // lanes: collect jumps, longest span gets the outermost lane
  const backs=[],fwds=[];nodes.forEach(n=>outs(n).forEach(([l,t])=>{const T=byId[t];if(!T||n.col||T.col)return;
    if(T.row<n.row)backs.push({n,t,span:n.row-T.row});else if(T.row>n.row+1)fwds.push({n,t,span:T.row-n.row})}));
  const lane={};[backs,fwds].forEach(arr=>{arr.sort((a,b)=>a.span-b.span).forEach((e,i)=>lane[e.n.id+">"+e.t]=i)}); // 0 = innermost
  const w0=Math.max(...nodes.filter(n=>!n.col).map(n=>n.w)),w1=Math.max(0,...nodes.filter(n=>n.col).map(n=>n.w));
  const left=(opts.num?34:24)+backs.length*LANE,x0=left+w0/2,x1=x0+w0/2+48+w1/2,rightEdge=w1?x1+w1/2:x0+w0/2;
  const W=rightEdge+20+fwds.length*LANE+14;
  nodes.forEach(n=>{n.cx=n.col?x1:x0;n.cy=rowY[n.row]});
  let b="";
  const T=(x,y,t,ex)=>tx(x,y,esc(t).replace(/←/g,'<tspan font-size="17" dy="1">←</tspan><tspan dy="-1"></tspan>'),"middle",`font-size="${FS}"`+(ex?" "+ex:""));
  const LBL=(x,y,t,a)=>t?tx(x,y,t,a||"start",'font-size="11.5" font-weight="700"'):"";
  nodes.forEach((n,i)=>{const{cx,cy,w,h}=n,l=cx-w/2,t=cy-h/2;
    if(n.k==="t")b+=`<rect x="${l}" y="${t}" width="${w}" height="${h}" rx="${h/2}"/>`;
    else if(n.k==="p")b+=`<rect x="${l}" y="${t}" width="${w}" height="${h}"/>`;
    else if(n.k==="io"){const s=12;b+=`<path d="M${l+s},${t} H${l+w} L${l+w-s},${t+h} H${l} Z"/>`}
    else b+=`<path d="M${cx},${t} L${l+w},${cy} L${cx},${t+h} L${l},${cy} Z"/>`;
    const L=lines(n);L.forEach((s,k)=>{b+=T(cx,cy+4.5+(k-(L.length-1)/2)*LH,s,n.k==="t"?'font-weight="700"':"")});
    if(opts.num)b+=tx(n.k==="d"?cx-w/4-4:l-5,t+(n.k==="d"?h/4:10),i+1,"end",'font-size="10" fill-opacity=".6"');});
  const poly=a=>`<polyline points="${a.map(p=>p.join(",")).join(" ")}" fill="none"/>`;
  const path=a=>{const z=a[a.length-2],e=a[a.length-1];return(a.length>2?poly(a.slice(0,-1)):"")+arw(z[0],z[1],e[0],e[1])};
  nodes.forEach(n=>outs(n).forEach(([lab,tid])=>{const t=byId[tid];if(!t)return;
    const bot=[n.cx,n.cy+n.h/2],lft=[n.cx-n.w/2,n.cy],rgt=[n.cx+n.w/2,n.cy],k=lane[n.id+">"+tid];
    if(!n.col&&!t.col&&t.row===n.row+1)b+=path([bot,[t.cx,t.cy-t.h/2]])+LBL(n.cx+6,bot[1]+13,lab);
    else if(!n.col&&t.col&&t.row===n.row)b+=path([rgt,[t.cx-t.w/2,t.cy]])+LBL(rgt[0]+6,rgt[1]-6,lab);
    else if(!n.col&&!t.col&&t.row<n.row){const X=left-12-k*LANE;b+=path([lft,[X,lft[1]],[X,t.cy],[t.cx-t.w/2,t.cy]])+LBL((X+lft[0])/2,lft[1]-6,lab,"middle")}
    else if(!n.col&&!t.col){const X=rightEdge+20+k*LANE;b+=path([rgt,[X,rgt[1]],[X,t.cy],[t.cx+t.w/2,t.cy]])+LBL(rgt[0]+6,rgt[1]-6,lab)}
    else if(n.col&&!t.col&&t.row>n.row)b+=path([bot,[n.cx,t.cy],[t.cx+t.w/2,t.cy]])+LBL(n.cx+6,bot[1]+13,lab);
    else if(n.col&&!t.col)b+=path([[n.cx,n.cy-n.h/2],[n.cx,t.cy],[t.cx+t.w/2,t.cy]]);}));
  const kind={t:"terminator",p:"process",io:"input/output",d:"decision"},ix=id=>nodes.indexOf(byId[id])+1;
  const desc=nodes.map((n,i)=>`Step ${i+1} [${kind[n.k]}] ${lines(n).join("; ")}${n.k==="d"?` (${LB[0]} → step ${ix(n.yes)}, ${LB[1]} → step ${ix(n.no)})`:n.next?` → step ${ix(n.next)}`:""}`).join(". ");
  const Wc=Math.ceil(W),Hc=Math.ceil(H);
  const svg=`<svg class="dg flowsvg" viewBox="0 0 ${Wc} ${Hc}" width="${Wc}" height="${Hc}" role="img" xmlns="http://www.w3.org/2000/svg" font-family="Archivo, Arial, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="max-width:100%;height:auto">${b}</svg>`;
  return{svg,desc};
}
// flowchart figure: SVG plus a hidden step list (used as the text version for AI marking)
function FLOW(title,nodes){const r=FLOWSVG(nodes,{labels:["true","false"],num:true});
  return`<div class="flowbox"><div class="flowsvgwrap">${r.svg}</div><div class="flowt">${title}</div><div class="flowdesc">Flowchart steps: ${escCode(r.desc)}</div></div>`}

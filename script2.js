/* ==========================================================
   NAVIGATION
   ========================================================== */

// Collapse the whitespace between tags so pre-wrap text doesn't leave gaps
function cleanHtml(html){
    return html
        .replace(/>\s+</g, "><")
        .replace(/<div([^>]*)>\s+/g, "<div$1>")
        .replace(/\s+<\/div>/g, "</div>")
        .replace(/(<\/div>)\s+(?=[^<\s])/, "$1")
        .replace(/\s+(<div class="data-grid">)/, "$1")
        .replace(/\n[ \t]+/g, "\n")
        .trim();
}

function showLog(text, button){
    document.getElementById("logOutput").innerHTML = cleanHtml(text);

    document.querySelectorAll(".menu-item").forEach(i=>{
        i.classList.remove("selected");
        i.removeAttribute("aria-current");
    });
    if(button){
        button.classList.add("selected");
        button.setAttribute("aria-current", "true");
    }

    // if the content's top edge is scrolled out of view, bring it back
    const viewer = document.getElementById("viewer");
    if(viewer.getBoundingClientRect().top < 0){
        viewer.scrollIntoView({behavior:"smooth", block:"start"});
    }
}

function openTab(tabId, element){

    const page = document.getElementById(tabId);
    if(!page) return;

    document.querySelectorAll(".menu-page").forEach(p=>p.classList.remove("active-page"));
    document.querySelectorAll(".tab").forEach(t=>{
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
    });

    page.classList.add("active-page");

    const tab = element || document.querySelector('.tab[data-tab="'+tabId+'"]');
    if(tab){
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        tab.scrollIntoView({block:"nearest", inline:"center"});
    }

    // header links: Home vs Department heads
    document.querySelectorAll(".site-nav a[data-nav]").forEach(a=>{
        const on = (a.dataset.nav === "heads") === (tabId === "Heads");
        a.classList.toggle("active", on);
        if(on) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });

    // never leave the right side stale: open the first topic of the tab
    const first = page.querySelector(".menu-item");
    if(first) showLog(LOG_MAP[first.dataset.log], first);

    // make tabs shareable, e.g. index.html#Heads
    if(history.replaceState){
        history.replaceState(null, "", tabId === "overview" ? location.pathname : "#" + tabId);
    }
}

// menu items use data-log="variableName"
document.addEventListener("click", e=>{
    const item = e.target.closest(".menu-item[data-log]");
    if(item) showLog(LOG_MAP[item.dataset.log], item);

    // header / hero links like href="#Heads" open that tab
    const link = e.target.closest('a[href^="#"]');
    if(link){
        const id = link.getAttribute("href").slice(1);
        if(id && document.getElementById(id)?.classList.contains("menu-page")){
            e.preventDefault();
            openTab(id);
            document.getElementById("tabs").scrollIntoView({behavior:"smooth", block:"start"});
        }
    }
});

function openFromHash(){
    const id = location.hash.slice(1);
    if(id && document.getElementById(id)?.classList.contains("menu-page")){
        openTab(id);
        document.getElementById("tabs").scrollIntoView({block:"start"});
    }
}


/* ==========================================================
   DEPARTMENT HEADS  — EDIT THIS BLOCK
   Replace the placeholder name and contact for each department.
   ========================================================== */

const HEADS = {
    Robotics:{
        name:"Name to be added",
        ask:"Building robots: electronics, mechanics, wiring, sensors, and motors.",
        reach:"Contact details to be added"
    },
    Programming:{
        name:"Name to be added",
        ask:"Coding, microcontrollers, automation, and debugging.",
        reach:"Contact details to be added"
    },
    Graphics:{
        name:"Name to be added",
        ask:"Posters, pubmats, logos, presentations, and digital art.",
        reach:"Contact details to be added"
    },
    Media:{
        name:"Name to be added",
        ask:"Photography, videography, editing, content, and social media.",
        reach:"Contact details to be added"
    }
};

function headCard(dept){
    const h = HEADS[dept];
    const ph = v => v.endsWith("to be added") ? ' class="placeholder"' : "";
    return `
<article class="head-card lite">
<div class="avatar" aria-hidden="true">${dept[0]}</div>
<div class="head-name${h.name.endsWith("to be added") ? " placeholder" : ""}">${h.name}</div>
<div class="head-role">Head, ${dept} Department</div>
<dl>
<dt>Approach for</dt>
<dd>${h.ask}</dd>
<dt>Where to find them</dt>
<dd${ph(h.reach)}>${h.reach}</dd>
</dl>
</article>`;
}

const headsAll = `
<div class="data-title">Department heads</div>

Not sure who to talk to? These are the people to approach for each department.

<div class="heads-grid">
${Object.keys(HEADS).map(headCard).join("")}
</div>
`;

const headsDept = dept => `
<div class="data-title">${dept} department head</div>

<div class="heads-grid">${headCard(dept)}</div>

<div class="head-cta"><a class="btn btn-primary" href="Registration.html">Apply to ${dept}</a></div>
`;

const headsRobotics     = headsDept("Robotics");
const headsProgramming  = headsDept("Programming");
const headsGraphics     = headsDept("Graphics");
const headsMedia        = headsDept("Media");


/* ==========================================================
   CONTENT
   ========================================================== */

const homeData = `
<div class="data-title">
CLUB OVERVIEW
</div>

Welcome to Our club!
WE are a group of students who are passionate about technology and innovation. and we offer:

Actively engage members in local, national, and international robotics competitions.
Provide practical training in programming, electronics, and engineering.
Host events to promote robotics awareness within the school and community.
Encourage innovation and teamwork through project-based challenges.
Inspire students to explore STEM careers by highlighting the impact of robotics.
We host a variety of events, workshops, and discussions that cater to all interests and skill levels.

Connect with like-minded individuals and explore opportunities for personal and professional development.

<div class="data-grid">

<div class="data-card lite">
<h3>FOUNDING YEAR</h3>
<p class="highlight">2024</p>
</div>

<div class="data-card lite">
<h3>STATUS</h3>
<p class="highlight">ACTIVE</p>
</div>

</div>
`;

const preambleData = `
<div class="data-title">
PREAMBLE
</div>

We, the students of Manolo Fortich National High School, recognizing the transformative 
role of robotics and technology in education and future careers, hereby establish the NanoNova Robotics Club. 
Committed to fostering innovation, teamwork, and technical excellence, we strive to cultivate creativity,
problem-solving skills, and a passion for discovery. With integrity and dedication, we pledge to advance knowledge, 
inspire collaboration, and uphold the values of excellence in all our endeavors.
`;

const RBoverview = `
<div class="data-title">
Robotics Department
</div>

The Robotics Department is the core engineering team of the NanoNova Robotics Club. 
Members design, build, assemble, and test robotic systems for projects, competitions, and innovations. 
This department focuses on electronics, mechanics, wiring, sensors, motors, and hardware integration while encouraging 
creativity, teamwork, and problem-solving skills.
`;

const PDoverview = `
<div class="data-title">
Programming Department
</div>

The Programming Department develops the software and intelligence behind the club’s robotic projects.
Members learn and apply coding skills using programming languages and microcontrollers to control robots,
automate systems, and create innovative solutions. This department strengthens logical thinking, debugging,
and technological creativity.
`;

const GDoverview = `
<div class="data-title">
Graphics Department
</div>

The Graphics Department is responsible for the visual identity and creative designs of the NanoNova Robotics Club.
Members create posters, pubmats, logos, presentations, and digital artworks used for promotions, events, and social media.
This department combines creativity and technology to make the club visually engaging and professional.
`;

const MDoverview = `
<div class="data-title">
Media Department
</div>

The Media Department documents and promotes the activities, projects, and achievements of the NanoNova Robotics Club.
 Members handle photography, videography, editing, content creation, and social media management to keep the community
 informed and connected. This department helps showcase the club’s innovation, teamwork, and events through creative storytelling.
`;

const SectionA = `
<div class="data-title">
Section A: Club Purpose and Mission
</div>

The NanoNova Robotics Club provides students with a platform to learn, innovate, and excel in robotics.
Through hands-on activities, competitions, and community outreach, the club aims to:
-Foster a passion for programming, engineering, and robotics.
-Cultivate critical thinking, teamwork, and creativity.
-Promote awareness of robotics and its applications in solving real-world problems.
-Prepare students for future careers in STEM by building technical and problem-solving skills.
`;

const SectionB = `
<div class="data-title">
Section B: Club Goals
</div>

The club shall strive to:
-Actively engage members in local, national, and international robotics competitions.
-Provide practical training in programming, electronics, and engineering.
-Host events to promote robotics awareness within the school and community.
-Encourage innovation and teamwork through project-based challenges.
-Inspire students to explore STEM careers by highlighting the impact of robotics.
`;

const SectionC = `
<div class="data-title">
Section C: Vision
</div>

“To inspire and empower students to lead in the field of robotics, combining education, creativity,
and technology to build a better future."
`;

const LOGS1 = `
<div class="data-title">
DEVELOPMENT LOG - 001 
<p class="highlight"> AUDIT: H. DEV. DY</p>
</div>
 > Website skeleton CREATED
 > Website EMAIL AUTOMATION ADDED
 > WEBSITE FORMAT OFFICIALIZED
 <div class="data-grid">

<div class="data-card lite">
<h3>DATE</h3>
<p class="highlight">[05.22.2026]</p>
</div>

<div class="data-card lite">
<h3>LOG TYPE</h3>
<p class="highlight"> RECORD </p>
</div>

</div>
`;

const LOGS2 = `
<div class="data-title">
DEVELOPMENT LOG - 002 
<p class="highlight"> AUDIT: H. DEV. DY</p>
</div>
 > Website skeleton UPDATED
 > WEBSITE REMODELED
 > BUGS FOUND: 23
 <div class="data-grid">

<div class="data-card lite">
<h3>DATE</h3>
<p class="highlight">[05.23.2026]</p>
</div>

<div class="data-card lite">
<h3>LOG TYPE</h3>
<p class="highlight"> ISSUE </p>
</div>

<div class="data-card lite">
<h3>BUGS RESOLVED</h3>
<p class="highlight"> 0 </p>
</div>
</div>
`;

const LOGS3 = `
<div class="data-title">
DEVELOPMENT LOG - 003
<p class="highlight"> AUDIT: H. DEV. DY</p>
</div>
 > ROOT PROBLEM FIXED
 > WEBSITE PALLETE CHANGED
 > ADDED REGISTRATION SYSTEM
 <div class="data-grid">

<div class="data-card lite">
<h3>DATE</h3>
<p class="highlight">[05.23.2026]</p>
</div>

<div class="data-card lite">
<h3>LOG TYPE</h3>
<p class="highlight"> ISSUE </p>
</div>

<div class="data-card lite">
<h3>BUGS RESOLVED</h3>
<p class="highlight"> 15 </p>
</div>
</div>
`;

const LOGS4 = `
<div class="data-title">
DEVELOPMENT LOG - 004
<p class="highlight"> AUDIT: H. DEV. DY</p>
</div>
 > HOME PAGE ADDED
 > INTERFACE UPDATED
 > SYSTEM REMODELED
 > LAYOUT REFORMATED
 <div class="data-grid">

<div class="data-card lite">
<h3>DATE</h3>
<p class="highlight">[05.23.2026]</p>
</div>

<div class="data-card lite">
<h3>LOG TYPE</h3>
<p class="highlight"> ISSUE </p>
</div>

<div class="data-card lite">
<h3>BUGS RESOLVED</h3>
<p class="highlight"> 28 </p>
</div>
</div>
`;

/* Menu buttons look their content up here by data-log name */
const LOG_MAP = {
    homeData, preambleData,
    RBoverview, PDoverview, GDoverview, MDoverview,
    headsAll, headsRobotics, headsProgramming, headsGraphics, headsMedia,
    SectionA, SectionB, SectionC,
    LOGS1, LOGS2, LOGS3, LOGS4
};

/* ==========================================================
   START
   ========================================================== */
window.addEventListener("hashchange", openFromHash);

(function init(){
    const first = document.querySelector("#overview .menu-item");
    showLog(LOG_MAP[first.dataset.log], first);
    openFromHash();
})();
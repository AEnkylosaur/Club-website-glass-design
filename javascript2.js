function openTab(tabId, element){

    const pages =
    document.querySelectorAll(".menu-page");

    const tabs =
    document.querySelectorAll(".tab");

    pages.forEach(page=>{
        page.classList.remove("active-page");
    });

    tabs.forEach(tab=>{
        tab.classList.remove("active");
    });

    document
    .getElementById(tabId)
    .classList.add("active-page");

    element.classList.add("active");
}

function showLog(text){

    document.getElementById("logOutput")
    .innerHTML = text;
}

/* DATA */

const homeData = `
<div class="data-title">
CLUB OVERVIEW
</div>

NanoNova Robotics Club is a technology organization
focused on robotics, software engineering,
automation systems, AI research,
multimedia production, and futuristic innovation.

<div class="data-grid">

<div class="data-card">
<h3>FOUNDING YEAR</h3>
<p class="highlight">2021</p>
</div>

<div class="data-card">
<h3>STATUS</h3>
<p class="highlight">ACTIVE</p>
</div>

</div>
`;

const memberData = `
<div class="data-title">
MEMBER STATISTICS
</div>

> ACTIVE OPERATIVES : 142
<br>
> ENGINEERING DIVISION : 38
<br>
> SOFTWARE DIVISION : 44
<br>
> MEDIA DIVISION : 29
<br>
> DESIGN DIVISION : 31
`;

const serverData = `
<div class="data-title">
SYSTEM STATUS
</div>

> MAIN NETWORK : ONLINE
<br>
> TERMINAL ACCESS : GRANTED
<br>
> DATABASE STATUS : STABLE
<br>
> ARCHIVE STATUS : SYNCHRONIZED
`;

const roboticsData = `
<div class="data-title">
ROBOTICS DIVISION
</div>

Mechanical engineering,
automation systems,
embedded hardware,
robot construction,
and autonomous systems research.
`;

const programmingData = `
<div class="data-title">
PROGRAMMING DIVISION
</div>

Software engineering,
AI systems,
web development,
cybersecurity,
and automation software.
`;

const graphicsData = `
<div class="data-title">
GRAPHICS DIVISION
</div>

Futuristic branding,
UI systems,
3D modeling,
poster design,
and digital illustration.
`;

const mediaData = `
<div class="data-title">
MEDIA DIVISION
</div>

Photography,
videography,
editing,
livestream systems,
and documentation.
`;

const droneData = `
<div class="data-title">
DRONE NAVIGATION PROJECT
</div>

STATUS : ACTIVE

Developing autonomous navigation systems
for aerial robotics and campus monitoring.
`;

const aiData = `
<div class="data-title">
AI SECURITY SYSTEM
</div>

STATUS : TESTING

Experimental AI monitoring system
for smart campus integration.
`;

const robotData = `
<div class="data-title">
AUTONOMOUS ROBOT PROJECT
</div>

STATUS : ONLINE

Researching intelligent movement systems
and machine automation.
`;

const archiveData = `
<div class="data-title">
HISTORICAL ARCHIVES
</div>

NanoNova Robotics Club
was established to advance
student technological innovation
and collaborative engineering.
`;

const networkData = `
<div class="data-title">
NETWORK LOGS
</div>

> SERVER LOAD : NORMAL
<br>
> ACTIVE TERMINALS : 18
<br>
> NETWORK PING : 14ms
`;

const systemData = `
<div class="data-title">
SYSTEM DIAGNOSTICS
</div>

> CPU STATUS : STABLE
<br>
> MEMORY STATUS : OPTIMAL
<br>
> TERMINAL STATUS : OPERATIONAL
`;
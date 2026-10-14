/* Shared UI helpers (used by index.html and Registration.html) */

function toggleMenu(){
    const nav = document.getElementById("govNav");
    const btn = document.querySelector(".menu-toggle");
    const open = nav.classList.toggle("show");
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "✕" : "☰";
}

function closeMenu(){
    const nav = document.getElementById("govNav");
    const btn = document.querySelector(".menu-toggle");
    if(!nav || !nav.classList.contains("show")) return;
    nav.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "☰";
}

// close the mobile menu after choosing a link, or with Escape
document.addEventListener("click", e => { if(e.target.closest(".site-nav a")) closeMenu(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeMenu(); });

// cursor-following sheen on glass buttons/cards
document.addEventListener("pointermove", e => {
    const el = e.target.closest(".sheen");
    if(!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
});
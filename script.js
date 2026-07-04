// =========================
// LOADER
// =========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.transition = "opacity .8s ease";
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 800);

        }, 1800);

    }

});

// =========================
// BUTTON HOVER
// =========================

document.querySelectorAll(".buttons a, .hero-buttons a").forEach(button => {

    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-6px) scale(1.05)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0) scale(1)";
    });

});

// =========================
// EASTER EGG
// =========================

let typed = "";

window.addEventListener("keydown", e => {

    typed += e.key.toLowerCase();

    if (typed.length > 5)
        typed = typed.slice(-5);

    if (typed === "glory") {

        alert("⚡ ALL GLORY TO GOD ⚡");

        typed = "";

    }

});

// =========================
// PARTICLE BACKGROUND
// =========================

const canvas = document.getElementById("particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const particles = [];

    for (let i = 0; i < 80; i++) {

        particles.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - .5) * .4,
            speedY: (Math.random() - .5) * .4

        });

    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(179,102,255,.8)";
            ctx.fill();

        });

        requestAnimationFrame(animate);

    }

    animate();

}

// =========================
// AUTO YOUTUBE VIDEOS
// =========================

const latestVideos = document.getElementById("latestVideos");

if (latestVideos) {

    fetch(
        "https://rss2json.com/api.json?rss_url=" +
        encodeURIComponent(
            "https://www.youtube.com/feeds/videos.xml?channel_id=UC7c6NUsgZI-LsXfZOBj5qkA"
        )
    )

    .then(res => res.json())

    .then(data => {

        latestVideos.innerHTML = "";

        data.items.slice(0, 6).forEach(video => {

            const id = video.link.split("v=")[1];

            latestVideos.innerHTML += `

<div class="card">

<iframe
src="https://www.youtube.com/embed/${id}"
allowfullscreen>
</iframe>

<h3>${video.title}</h3>

<a
class="business-btn"
href="${video.link}"
target="_blank">

▶ Watch

</a>

</div>

`;

        });

    })

    .catch(() => {

        latestVideos.innerHTML = `

<div class="card">

<h3>Couldn't load videos.</h3>

<p>Please try again later.</p>

</div>

`;

    });

}

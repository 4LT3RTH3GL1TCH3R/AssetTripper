document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('dark-mode-toggle');
    const factButton = document.getElementById('random-fact');
    const factText = document.getElementById('fact-text');

    const facts = [
        "Modding is just hacking but with extra steps. 🧐",
        "Cheat Engine exists because we all suck at games. 🎮",
        "Ripping assets is like digital dumpster diving. 🗑️",
        "Game devs fear modders more than hackers. 👀",
        "Unreal Engine is just LEGOs for adults. 🏗️",
        "Some game devs secretly mod their own games. 🤫",
        "Modding: Because game devs didn't finish the job. 💀",
        "You haven’t really lived until you’ve modded a game in a way the devs didn’t want. 😎",
        "If you aren't breaking something, are you even modding? 🏆",
        "When in doubt, use a hex editor. 🔥",
        "The line between modding and cheating is just a gray zone. 🤷‍♂️",
        "Modding a game is the art of making it better than it was. 💡",
        "Asset ripping is just creative piracy. 🏴‍☠️",
        "If a game didn’t expect you to mod it, did it really exist? 🤔",
        "Without mods, Skyrim would still be a buggy mess. 🤯",
        "If you can’t hack it, mod it! 🔨",
        "Game mods: because life’s too short for bad graphics. 🖼️",
        "There are no bugs, only unintentional features. 🐞",
        "Modders are the unsung heroes of the gaming world. 👑",
        "Sometimes, modding is just playing a game the devs never intended. 😈",
        "A game without mods is like a pizza without cheese. 🍕",
        "Every modder’s motto: ‘Don’t break it until it’s already broken.’ 🤪",
        "Modding is the only legal way to break a game and still have fun. 🎉",
        "True modders know that nothing is ever really ‘finished.’ 🏁"
    ];    

    if (darkModeButton) {
        darkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    if (factButton) {
        factButton.addEventListener('click', () => {
            factText.textContent = facts[Math.floor(Math.random() * facts.length)];
        });
    }

    // 🖥️ Particle Background Setup
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        let numParticles = Math.floor(window.innerWidth / 7);

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00ffcc';
            ctx.fill();

            for (let other of particles) {
                let dx = p.x - other.x;
                let dy = p.y - other.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(0, 255, 204, ${1 - dist / 140})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        connectToCursor();
        requestAnimationFrame(updateParticles);
    }

    let cursor = { x: 0, y: 0 };

    function connectToCursor() {
        for (let p of particles) {
            let dx = cursor.x - p.x;
            let dy = cursor.y - p.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 170) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(cursor.x, cursor.y);
                ctx.strokeStyle = `rgba(0, 255, 204, ${1 - dist / 170})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    canvas.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();
    createParticles();
    updateParticles();
});

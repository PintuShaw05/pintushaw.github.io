// app.js - basic interactivity & animations

document.addEventListener('DOMContentLoaded', function(){
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect for hero subtitle
  (function typingEffect(){
    const el = document.querySelector('.hero-typing');
    const text = el.dataset.text || '';
    let i = 0;
    let forward = true;
    function tick(){
      if(!el) return;
      el.textContent = text.slice(0, i);
      if(forward){
        i++;
        if(i > text.length){ forward=false; setTimeout(()=>{ i = text.length-1; }, 1000); }
      } else {
        i--;
        if(i < 0){ forward=true; i=0; }
      }
      setTimeout(tick, 40);
    }
    tick();
  })();

  // IntersectionObserver for reveal animations
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.15});

  document.querySelectorAll('.anim-image, .anim-text').forEach(el => observer.observe(el));

  // YouTube link prompt -> embed
  document.querySelectorAll('.yt-btn').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const url = prompt('Paste YouTube video URL for this project (eg. https://youtu.be/xxxx or https://www.youtube.com/watch?v=xxxx):');
      if(!url) return;
      const id = extractYouTubeID(url);
      if(!id){ alert('Invalid YouTube link'); return; }
      const iframe = document.getElementById('project-iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`;
      document.getElementById('video-player').style.display = 'block';
      window.scrollTo({top: iframe.getBoundingClientRect().top + window.scrollY - 60, behavior:'smooth'});
    });
  });

  // Clear video
  document.getElementById('clear-video').addEventListener('click', ()=>{
    const iframe = document.getElementById('project-iframe');
    iframe.src = '';
    document.getElementById('video-player').style.display = 'none';
  });

 // ✅ EmailJS integration
emailjs.init("YOUR_PUBLIC_KEY");  // <-- Your EmailJS Public Key

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: document.getElementById("name").value,
      reply_to: document.getElementById("email").value,
      message: document.getElementById("message").value,
    })
    .then(() => {
      alert("✅ Message Sent Successfully!");
      this.reset();
    })
    .catch((error) => {
      alert("❌ Failed: " + error);
    });
});

  // helper: extract youtube id
  function extractYouTubeID(url){
    // common id extract patterns
    const patterns = [
      /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
      /v=([a-zA-Z0-9_-]{6,})/,
      /\/embed\/([a-zA-Z0-9_-]{6,})/,
      /\/v\/([a-zA-Z0-9_-]{6,})/
    ];
    for(const p of patterns){
      const m = url.match(p);
      if(m && m[1]) return m[1];
    }
    return null;
  }
});

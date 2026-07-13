
const progress = document.getElementById('progress');
document.addEventListener('scroll', ()=>{
  const s = window.scrollY;
  const h = document.body.scrollHeight - window.innerHeight;
  progress.style.width = (s/h*100) + '%';
  document.querySelectorAll('.section, .track, .shot, .full').forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight*0.9) el.classList.add('reveal','visible');
  });
});

// Grainy noise background for hero
const c = document.getElementById('noise');
const ctx = c.getContext('2d');
function resize(){ c.width = innerWidth+100; c.height = innerHeight+100 }
function drawNoise(){
  const id = ctx.createImageData(c.width, c.height);
  for(let i=0;i<id.data.length;i+=4){
    const n = Math.random()*255|0;
    id.data[i]=id.data[i+1]=id.data[i+2]=n; id.data[i+3]=255;
  }
  ctx.putImageData(id,0,0);
}
resize(); drawNoise();
window.addEventListener('resize', ()=>{ resize(); drawNoise(); });

// Lightbox for gallery
const g = document.getElementById('gallery');
if(g){
  g.addEventListener('click', e=>{
    if(e.target.tagName==='IMG'){
      const ov = document.createElement('div');
      ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.88);display:grid;place-items:center;z-index:9999';
      const im = document.createElement('img'); im.src = e.target.src;
      im.style.maxWidth='92%'; im.style.maxHeight='92%';
      ov.appendChild(im); ov.addEventListener('click', ()=>ov.remove());
      document.body.appendChild(ov);
    }
  });
}

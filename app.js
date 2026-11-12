(function(){
  var top=document.getElementById('top');
  var burger=top.querySelector('.burger');
  var menu=document.getElementById('menu-mob');
  function stan(){top.classList.toggle('jasny',window.scrollY>40)}
  stan();window.addEventListener('scroll',stan,{passive:true});
  function zamknij(){menu.hidden=true;top.classList.remove('otwarte');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu');document.body.style.overflow=''}
  burger.addEventListener('click',function(){
    if(menu.hidden){menu.hidden=false;top.classList.add('otwarte');burger.setAttribute('aria-expanded','true');burger.setAttribute('aria-label','Zamknij menu');document.body.style.overflow='hidden'}
    else zamknij();
  });
  menu.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)zamknij()});

  // aktywna sekcja w menu
  var linki=[].slice.call(document.querySelectorAll('.nav a, .menu-mob nav a'));
  var sekcje=['zabiegi','linie','marka','gabinety','kontakt'].map(function(id){return document.getElementById(id)});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(wpisy){
      wpisy.forEach(function(w){
        if(w.isIntersecting){linki.forEach(function(a){a.classList.toggle('akt',a.getAttribute('href')==='#'+w.target.id)})}
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    sekcje.forEach(function(s){io.observe(s)});
    new IntersectionObserver(function(w){if(w[0].isIntersecting)linki.forEach(function(a){a.classList.remove('akt')})},{rootMargin:'-45% 0px -50% 0px'}).observe(document.getElementById('start'));
  }

  // karuzela: palec natywnie, mysz przeciąganiem, strzałki
  document.querySelectorAll('[data-karuzela]').forEach(function(k){
    var tor=k.querySelector('.tor');
    k.querySelectorAll('.strz').forEach(function(b){
      b.addEventListener('click',function(){
        var el=tor.querySelector('li');var krok=el?el.getBoundingClientRect().width+20:300;
        tor.scrollBy({left:krok*Number(b.dataset.kierunek),behavior:'smooth'});
      });
    });
    var x0=0,s0=0,ciag=false,ruch=0;
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;ruch=0;x0=e.clientX;s0=tor.scrollLeft;tor.setPointerCapture(e.pointerId)});
    tor.addEventListener('pointermove',function(e){if(!ciag)return;var d=e.clientX-x0;ruch=Math.abs(d);if(ruch>4)tor.classList.add('ciagnie');tor.scrollLeft=s0-d});
    function koniec(){if(!ciag)return;ciag=false;tor.classList.remove('ciagnie')}
    tor.addEventListener('pointerup',koniec);tor.addEventListener('pointercancel',koniec);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
  });

  // przyciski z tematem ustawiają temat formularza
  var temat=document.getElementById('temat');
  document.querySelectorAll('[data-temat]').forEach(function(a){
    a.addEventListener('click',function(){
      var t=a.dataset.temat;
      for(var i=0;i<temat.options.length;i++){if(temat.options[i].text===t){temat.selectedIndex=i;break}}
    });
  });

  // formularz pokazowy - nic nie wysyła
  var f=document.getElementById('formularz');
  f.addEventListener('submit',function(e){e.preventDefault();var info=f.querySelector('.form-info');info.hidden=false});

  document.getElementById('rok').textContent=new Date().getFullYear();
})();

(() => {
  'use strict';
  const SAVE_KEY = 'aoshima-summer-save-v1';
  const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const LOCATIONS = [
    {id:'square',name:'Town Square',icon:'⌂',time:'ANYTIME',mood:'The town is waking slowly',sky:['#a8c9c8','#f4c995','#738e86'],kind:'square',people:['nami']},
    {id:'harbor',name:'Blueglass Harbor',icon:'≈',time:'AFTERNOON',mood:'Salt air and gulls overhead',sky:['#80b7c4','#f2c99d','#3e8793'],kind:'harbor',people:['nami','ren']},
    {id:'cafe',name:'Sora Café',icon:'☕',time:'MIDDAY',mood:'Something sweet in the oven',sky:['#d6b99b','#f4dbb1','#988c78'],kind:'cafe',people:['ren']},
    {id:'garden',name:'Hillside Garden',icon:'❀',time:'MORNING',mood:'Dew still clings to the leaves',sky:['#97b99d','#dfd1a6','#738870'],kind:'garden',people:['mika']},
    {id:'station',name:'Old Station',icon:'▤',time:'EVENING',mood:'A train sighs in the distance',sky:['#8e9ba8','#edb78f','#70777d'],kind:'station',people:['mika','ren']}
  ];
  const PEOPLE = {
    nami:{id:'nami',name:'Nami Kuroda',age:22,role:'Illustrator · harbor regular',short:'Sketches the changing sky',color:'#db826e',hair:'#44314a',skin:'#f3c9b0',eye:'#638995',icon:'✎',spot:'harbor',bio:'A freelance illustrator who came home to paint the sea. Nami is 22, thoughtful, and happiest with a sketchbook in hand. She likes honesty more than grand gestures.'},
    ren:{id:'ren',name:'Ren Hayashi',age:23,role:'Café apprentice · 23',short:'Perfecting his lemon tart',color:'#5d9c9b',hair:'#344956',skin:'#e6b89a',eye:'#4b827c',icon:'☕',spot:'cafe',bio:'Twenty-three and learning to run his aunt’s little café, Ren jokes when he is nervous and remembers everyone’s order. He appreciates patience and a good pun.'},
    mika:{id:'mika',name:'Mika Fujita',age:21,role:'Botany student · 21',short:'Growing flowers for the festival',color:'#8a9c6c',hair:'#49394a',skin:'#f0c8b3',eye:'#668d75',icon:'❀',spot:'garden',bio:'A 21-year-old botany student spending the summer with her grandparents. Mika is quietly funny, observant, and always has a cutting or seed packet in her pocket.'}
  };
  const QUOTES=['“The sea keeps all the little things we almost said.”','“A familiar road can still lead somewhere new.”','“Good things grow at their own pace.”','“Some afternoons are made for doing nothing.”','“Even the smallest light changes the harbor.”','“The best plans leave a little room for surprise.”','“Summer is a collection of borrowed golden hours.”'];
  const $ = id => document.getElementById(id);
  const freshState = () => ({day:1,energy:3,location:'square',bonds:{nami:0,ren:0,mika:0},festival:0,flags:{},memories:[],journal:[],name:'Yuki Tanaka',intro:true,ended:false,sound:false});
  let state = loadState();
  function loadState(){try{const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');return saved?{...freshState(),...saved,bonds:{...freshState().bonds,...saved.bonds},flags:{...saved.flags}}:freshState()}catch{return freshState()}}
  function save(show=false){localStorage.setItem(SAVE_KEY,JSON.stringify(state));$('saveStatus').innerHTML='<span class="status-dot"></span> YOUR SUMMER IS SAVED';if(show)toast('Your summer is tucked away safely.');}
  function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2300)}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function personSvg(person,full=false){
    const p=typeof person==='string'?PEOPLE[person]:person, h=full?400:130, w=full?180:100;
    if(!p)return '';
    return `<svg viewBox="0 0 180 400" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anime-style illustration of ${p.name}"><defs><linearGradient id="coat-${p.id}" x2="0" y2="1"><stop stop-color="${p.color}"/><stop offset="1" stop-color="${p.color}" stop-opacity=".76"/></linearGradient></defs><ellipse cx="90" cy="390" rx="48" ry="8" fill="#24343b" opacity=".15"/><path d="M61 260 Q90 244 119 260 L137 366 Q91 383 43 366Z" fill="#f1e8d8"/><path d="M60 260 Q90 246 119 260 L139 355 Q90 373 41 355Z" fill="url(#coat-${p.id})"/><path d="M74 260 L90 286 106 260 98 326 82 326Z" fill="#fff7e9" opacity=".85"/><path d="M47 290 Q37 330 34 370" fill="none" stroke="${p.skin}" stroke-width="15" stroke-linecap="round"/><path d="M133 290 Q143 328 146 367" fill="none" stroke="${p.skin}" stroke-width="15" stroke-linecap="round"/><path d="M65 354 L61 386 M115 354 L120 386" stroke="#e8b99c" stroke-width="14" stroke-linecap="round"/><path d="M50 386 Q61 380 73 389 M107 389 Q119 379 131 386" fill="none" stroke="#59646a" stroke-width="12" stroke-linecap="round"/><path d="M65 239 Q65 207 62 190 L119 188 Q113 221 119 250 Q105 270 75 250Z" fill="${p.skin}"/><ellipse cx="90" cy="153" rx="51" ry="62" fill="${p.skin}"/><path d="M40 157 Q33 88 91 88 Q147 89 141 154 L129 208 Q120 185 121 149 Q96 160 60 139 Q57 170 49 197Z" fill="${p.hair}"/><path d="M47 126 Q69 89 93 98 Q117 86 137 123 Q122 111 108 118 Q84 127 61 119Z" fill="${p.hair}"/><path d="M45 138 Q32 170 49 204 M131 135 Q148 171 128 211" fill="none" stroke="${p.hair}" stroke-width="11" stroke-linecap="round"/><path d="M65 152 Q75 147 82 153 M100 153 Q109 147 117 151" fill="none" stroke="#5d4a4b" stroke-width="3" stroke-linecap="round"/><ellipse cx="74" cy="161" rx="5" ry="7" fill="${p.eye}"/><ellipse cx="108" cy="161" rx="5" ry="7" fill="${p.eye}"/><circle cx="75" cy="159" r="1.7" fill="white"/><circle cx="109" cy="159" r="1.7" fill="white"/><path d="M87 176 Q91 179 94 176" fill="none" stroke="#bd8175" stroke-width="1.5" stroke-linecap="round"/><path d="M83 190 Q91 195 99 189" fill="none" stroke="#bf7772" stroke-width="2" stroke-linecap="round"/><ellipse cx="61" cy="177" rx="8" ry="4" fill="#ec9b91" opacity=".35"/><ellipse cx="119" cy="177" rx="8" ry="4" fill="#ec9b91" opacity=".35"/><path d="M76 249 Q90 261 104 249" fill="none" stroke="#fff6e8" stroke-width="5"/><path d="M82 259 L90 274 98 259" fill="none" stroke="#d7b797" stroke-width="2"/></svg>`;
  }
  function drawPeople(){
    const loc=LOCATIONS.find(l=>l.id===state.location)||LOCATIONS[0], ids=loc.people.filter(id=>!state.flags[`away-${id}`]);
    if(state.ended) $('scenePeople').innerHTML=personSvg('nami',true)+personSvg('ren',true)+personSvg('mika',true);
    else $('scenePeople').innerHTML=ids.slice(0,2).map(id=>`<div class="character-figure">${personSvg(id,true)}</div>`).join('');
    $('peopleList').innerHTML=Object.values(PEOPLE).map(p=>{const bond=state.bonds[p.id],pct=Math.min(100,bond*12.5);return `<div class="person-card" data-person="${p.id}" role="button" tabindex="0" aria-label="Meet ${p.name}"><div class="person-portrait">${personSvg(p)}</div><div class="person-info"><b>${p.name.split(' ')[0]} ${p.name.split(' ')[1]}</b><small>${bond===0?'A familiar face':bond<4?p.short:bond<7?'A good friend':'Someone special'}</small><div class="heart-meter"><span style="width:${pct}%"></span></div></div><span class="person-chevron">›</span></div>`}).join('');
    document.querySelectorAll('.person-card').forEach(el=>{el.addEventListener('click',()=>meetPerson(el.dataset.person));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();meetPerson(el.dataset.person)}})});
  }
  function sceneSvg(loc){
    const [sky,horizon,ground]=loc.sky;let scenery='';
    if(loc.kind==='harbor') scenery=`<path d="M0 400 Q180 370 360 400 T720 395 T1200 390V780H0Z" fill="#76aeb0"/><path d="M0 490 Q210 460 430 492T860 480T1200 490V780H0Z" fill="#4d8589"/><path d="M0 595 Q230 568 450 600T900 587T1200 610V780H0Z" fill="#39757c"/><path d="M0 494H1200" stroke="#d7e6d5" stroke-opacity=".4" stroke-width="3"/><path d="M625 410 L710 410 790 659 532 659Z" fill="#e9d3ad"/><path d="M655 422 L688 422 729 653 609 653Z" fill="#be8f6c"/><path d="M120 374h330v90H120z" fill="#eadab8"/><path d="M97 376h380l-60-61H160z" fill="#9c6657"/><path d="M190 402h52v62h-52zM282 402h52v62h-52zM374 402h45v62h-45z" fill="#729896"/><path d="M280 376v88" stroke="#bb906d" stroke-width="6"/><path d="M0 540h190m0-16v80m-12-55h25M990 547h210m-55-15v75" stroke="#d9c29a" stroke-width="8"/>`;
    else if(loc.kind==='garden') scenery=`<path d="M0 400 Q220 250 450 400T900 350T1200 365V780H0Z" fill="#788f72"/><path d="M0 455 Q220 335 460 475T850 410T1200 430V780H0Z" fill="#92a881"/><path d="M0 552 Q300 460 630 550T1200 520V780H0Z" fill="#718963"/><path d="M70 560q180-140 390 4t430-5" fill="none" stroke="#e7d2a9" stroke-width="30"/><path d="M140 543q170-108 338 1t368-4" fill="none" stroke="#b89b72" stroke-width="3"/><path d="M90 445h95v110H90zM70 446l67-60 70 60" fill="#d9c49c"/><path d="M111 475h27v80h-27" fill="#8e7155"/><g fill="#f3d9b3"><circle cx="250" cy="540" r="9"/><circle cx="300" cy="513" r="8"/><circle cx="850" cy="536" r="8"/><circle cx="960" cy="491" r="10"/><circle cx="1010" cy="522" r="7"/></g>`;
    else if(loc.kind==='cafe') scenery=`<path d="M0 398H1200V780H0Z" fill="#b79b7e"/><path d="M0 426H1200V780H0Z" fill="#ede0c7"/><path d="M200 205H1000V573H200Z" fill="#e8d8bd"/><path d="M176 205H1024L974 141H225Z" fill="#bd755d"/><path d="M230 292H970V471H230Z" fill="#88a9a4"/><path d="M250 315H510V450H250ZM535 315H795V450H535ZM820 315H948V450H820Z" fill="#c7d7c8"/><path d="M380 315v135m285-135v135m-405-10h690" stroke="#e6dfc9" stroke-width="8"/><path d="M186 475h826v28H186z" fill="#b47f62"/><path d="M730 510h185v110H730z" fill="#d8c6a7"/><path d="M744 498h160v23H744z" fill="#8a7863"/><path d="M50 611H1150" stroke="#ad967a" stroke-width="13"/><circle cx="1040" cy="130" r="60" fill="#f5d399" opacity=".6"/>`;
    else if(loc.kind==='station') scenery=`<path d="M0 400H1200V780H0Z" fill="#d6b99c"/><path d="M0 532Q300 490 600 535T1200 520V780H0Z" fill="#7c8b87"/><path d="M225 258H875V540H225Z" fill="#e8dfcb"/><path d="M190 255H910L845 192H255Z" fill="#8e6e62"/><path d="M275 307H490V455H275ZM535 307H750V455H535Z" fill="#8caeb0"/><path d="M385 307v148m258-148v148" stroke="#e4d7c2" stroke-width="9"/><path d="M240 471H858" stroke="#a0876f" stroke-width="14"/><path d="M0 548h1050" stroke="#575d5c" stroke-width="7"/><path d="M940 525v-150h30v150m-37-100h44" fill="none" stroke="#59666a" stroke-width="8"/><circle cx="1090" cy="165" r="54" fill="#f5d398" opacity=".7"/>`;
    else scenery=`<path d="M0 400 Q170 370 340 402T720 390T1200 405V780H0Z" fill="#87a18f"/><path d="M0 535H1200V780H0Z" fill="#729083"/><path d="M180 333h250v190H180zM510 305h300v218H510zM855 350h225v173H855z" fill="#eddec1"/><path d="M155 335h300l-42-67H197zM485 307h350l-50-74H540zM830 352h275l-45-65h-185z" fill="#aa745f"/><path d="M225 388h52v70h-52zm96 0h52v70h-52zm244-31h63v83h-63zm111 0h63v83h-63zm237 33h55v68h-55zm98 0h55v68h-55z" fill="#87a8a2"/><path d="M0 574Q250 530 500 575T1000 570T1200 586" fill="none" stroke="#d7c29c" stroke-width="14"/><path d="M0 650H1200" stroke="#d2bf9e" stroke-width="5"/><circle cx="1000" cy="142" r="62" fill="#f7d99f"/>`;
    return `<svg viewBox="0 0 1200 780" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="skyGradient" x2="0" y2="1"><stop stop-color="${sky}"/><stop offset=".74" stop-color="${horizon}"/><stop offset="1" stop-color="${ground}"/></linearGradient><radialGradient id="sunGlow"><stop stop-color="#fff5cf" stop-opacity=".75"/><stop offset="1" stop-color="#fff5cf" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="780" fill="url(#skyGradient)"/><circle cx="945" cy="140" r="160" fill="url(#sunGlow)"/><circle cx="945" cy="140" r="48" fill="#ffedbf" opacity=".85"/><path d="M0 300 Q160 280 350 306T720 290T1200 309" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>${scenery}<g fill="#fff4d8" opacity=".62"><circle cx="80" cy="205" r="2"/><circle cx="270" cy="176" r="2"/><circle cx="745" cy="243" r="2"/><circle cx="1100" cy="278" r="2"/></g></svg>`;
  }
  function render(){
    const loc=LOCATIONS.find(l=>l.id===state.location)||LOCATIONS[0];
    $('dayLabel').textContent=state.ended?'EPILOGUE':`DAY ${String(state.day).padStart(2,'0')} · ${DAYS[(state.day-1)%7]}`;
    $('energyText').textContent=`${state.energy} / 3`;$('energyTrack').innerHTML=[0,1,2].map(n=>`<span class="energy-orb ${n<state.energy?'active':''}"></span>`).join('');
    $('festivalProgress').style.width=`${Math.min(100,state.festival/3*100)}%`;$('festivalCaption').textContent=state.festival>=3?'All set for the festival!':`${state.festival} of 3 preparations done.`;
    $('locationList').innerHTML=LOCATIONS.map(l=>`<button class="location-button ${l.id===loc.id?'active':''}" data-location="${l.id}"><span class="loc-icon">${l.icon}</span><b>${l.name}</b><span class="loc-time">${l.time}</span></button>`).join('');
    document.querySelectorAll('.location-button').forEach(el=>el.addEventListener('click',()=>goLocation(el.dataset.location)));
    $('locationTitle').textContent=loc.name.toUpperCase();$('sceneTime').textContent=state.ended?'THE LAST LIGHT':loc.time;$('sceneMood').textContent=state.ended?'A summer full of small beginnings':loc.mood;$('sceneArt').innerHTML=sceneSvg(loc);
    $('sceneHint').textContent=loc.people.map(id=>PEOPLE[id].name.split(' ')[0]).join(' & ')+' might be around.';
    $('sceneAction').innerHTML=`<span>✦</span><b>${state.ended?'PLAY AGAIN':'LOOK AROUND'}</b>`;
    $('festivalProgress').style.width=`${Math.min(100,state.festival/3*100)}%`;$('memoryCount').textContent=`${state.memories.length} ${state.memories.length===1?'moment':'moments'} collected`;
    $('dailyQuote').textContent=QUOTES[(state.day-1)%QUOTES.length];$('profileButton').textContent=(state.name.split(' ').map(x=>x[0]).join('').slice(0,1)||'Y').toUpperCase();
    $('peopleHelp').title='Nami (22), Ren (23), and Mika (21) are adults. This is a gentle, non-explicit romance story.';
    drawPeople();
    if(!state.dialogue) showHomeDialogue();
    updateDialogue();
  }
  function showHomeDialogue(){
    if(state.intro){state.dialogue={speaker:'A NEW CHAPTER',role:'AOshima · early summer',icon:'✦',text:`At 20, you have a whole summer ahead—and a familiar seaside town to rediscover. The first festival is six days away. How do you want to begin?`,note:'Everyone you meet in Aoshima is an adult.',choices:[{text:'Take the scenic road into town',run:()=>{state.intro=false;state.location='square';addMemory('A summer begins','The familiar rooftops of Aoshima appeared beyond the hill.');showHomeDialogue()}},{text:'Head straight for the harbor',run:()=>{state.intro=false;state.location='harbor';addMemory('First sea breeze','Salt air, sunlit water, and the feeling that anything could happen.');showHomeDialogue()}}]};return}
    if(state.ended){state.dialogue={speaker:'AOSHIMA · SUMMER FINALE',role:'A gentle ending · always room for more',icon:'✦',text:'Lanterns drift over the water. Somewhere among the voices and music, you realize this summer already feels like a place you can return to.',note:'Your story is complete. You can begin a fresh summer whenever you like.',choices:[{text:'Start another summer from the beginning',run:resetGame},{text:'Stay here a little longer',run:()=>{state.ended=false;state.day=7;state.energy=1;state.dialogue=null;render()}}]};return}
    if(state.day===6&&state.festival>=2&&!state.flags.festivalScene){state.dialogue={speaker:'THE SUMMER FESTIVAL',role:'Harbor · Saturday evening',icon:'✧',text:'The lanterns are lit, the stalls are ready, and the whole town has spilled down to the water. Nami, Ren, and Mika wave you over. For a moment, the harbor feels like the center of the universe.',note:'A memory worth keeping.',choices:[{text:'Join everyone beneath the lanterns',run:()=>{state.flags.festivalScene=true;addMemory('Lanterns on the water','You spent the festival together, laughing as the first lanterns drifted out to sea.');state.location='harbor';showHomeDialogue()}},{text:'Make a quiet promise to come back',run:()=>{state.flags.festivalScene=true;addMemory('A promise at the harbor','You promised yourself this would not be the last summer you came home.');state.location='square';showHomeDialogue()}}]};return}
    if(state.day>=7){state.ended=true;showHomeDialogue();return}
    state.dialogue={speaker:'AOSHIMA · DAY '+String(state.day).padStart(2,'0'),role:'A little time, just for you',icon:'✦',text:state.energy?`The afternoon is yours. Where your day goes is entirely up to you.`:'The light is fading. There is still time to pause, or you can turn in and see what tomorrow brings.',note:'Choose a place, then look around or meet someone.',choices:[]};
  }
  function setDialogue(speaker,role,icon,text,note,choices){state.dialogue={speaker,role,icon,text,note,choices};updateDialogue()}
  function updateDialogue(){
    const d=state.dialogue;if(!d)return;
    $('speakerName').textContent=d.speaker;$('speakerRole').textContent=d.role;$('speakerIcon').textContent=d.icon;$('dialogueText').textContent=d.text;$('dialogueFootnote').textContent=d.note;
    const list=$('choiceList');list.innerHTML=(d.choices||[]).map((c,i)=>`<button class="choice-button" data-choice="${i}"><span class="choice-number">${i+1}</span>${c.text}</button>`).join('');
    list.querySelectorAll('.choice-button').forEach(el=>el.addEventListener('click',()=>choose(Number(el.dataset.choice))));
    const cont=$('continueButton');cont.style.display=d.choices&&d.choices.length?'none':'inline-block';cont.textContent=state.energy?'CONTINUE →':'REST & CONTINUE →';
  }
  function choose(i){const c=state.dialogue?.choices?.[i];if(!c)return;c.run();save();render()}
  function continueDay(){if(state.dialogue?.choices?.length)return;if(state.energy>0)lookAround();else advanceDay()}
  function goLocation(id){if(state.location===id)return;state.location=id;state.dialogue=null;render();toast(`You wandered over to ${LOCATIONS.find(l=>l.id===id).name}.`)}
  function meetPerson(id){const p=PEOPLE[id];if(!p)return;state.location=p.spot;state.dialogue=null;render();talk(id)}
  function talk(id){
    const p=PEOPLE[id],bond=state.bonds[id];if(!p)return;
    if(state.energy<=0){setDialogue(p.name,p.role,p.icon,'The day has been full. You can pick up this conversation tomorrow.','A little rest can make room for a new day.',[]);return}
    const lines={nami:['Nami taps the edge of her sketchbook. “I keep drawing the same stretch of water. Maybe I’m waiting for it to tell me something.”','“Do you think people can really come home different?” Nami asks, watching the tide fold over itself.','Nami turns her sketchbook around. A tiny figure is standing at the edge of the harbor, looking toward the hills.'],ren:['Ren sets a slightly lopsided tart on the counter. “First attempt. You can be honest—I’ve got a backup one.”','“I keep trying to make this place feel like it belongs to me, too,” Ren says. “It’s silly, isn’t it?”','Ren slides over a cup of iced tea. “I saved you the sunny seat. No special reason. Probably.”'],mika:['Mika cups a tiny seedling in both hands. “It’s not much to look at yet, but it’s doing its best.”','“My grandmother says the garden remembers everyone who has cared for it,” Mika says. “I think I believe her.”','Mika laughs softly. “I brought too many flowers again. Would you help me choose which ones look happiest together?”']};
    const prompts={nami:['Tell her what you honestly missed about home.','Ask what she hopes the picture will become.','Offer to sit together in comfortable quiet.'],ren:['Give the tart a kind, honest review.','Ask what he wants the café to feel like.','Volunteer as his official taste-tester.'],mika:['Tell her small beginnings are still beginnings.','Ask about the flowers she is growing.','Offer to help carry the extra pots.']};
    const index=Math.min(2,Math.floor(bond/3));
    setDialogue(p.name.toUpperCase(),p.role,p.icon,lines[id][index],`A thoughtful answer can bring you closer. (${bond} / 8)`,prompts[id].map((text,n)=>({text,run:()=>{state.energy--;state.bonds[id]=Math.min(8,state.bonds[id]+1);state.journal.unshift({day:state.day,title:`A moment with ${p.name.split(' ')[0]}`,text:[`You shared a quiet, honest moment with ${p.name.split(' ')[0]}.`,`The conversation left you smiling on the way out.`,`You learned a little more about what ${p.name.split(' ')[0]} hopes for.`][n]});addMemory(`${p.name.split(' ')[0]} · ${['A little honesty','A story shared','An easy afternoon'][n]}`,`You spent some time together at ${LOCATIONS.find(x=>x.id===p.spot).name}.`);toast(`You and ${p.name.split(' ')[0]} feel a little closer.`);state.dialogue=null}})));
  }

  function addMemory(title,text){
    if(state.memories.some(item=>item.title===title))return;
    state.memories.unshift({title,text,day:state.day});
    state.journal.unshift({day:state.day,title,text});
    if(state.memories.length>30)state.memories.pop();
  }

  function lookAround(){
    if(state.energy<=0){showHomeDialogue();updateDialogue();return}
    const loc=LOCATIONS.find(item=>item.id===state.location)||LOCATIONS[0];
    const taskByLocation={
      harbor:{key:'lanterns',title:'Help hang lanterns along the pier',desc:'You and a neighbor string paper lanterns along the harbor rail. They sway gently in the sea breeze.',label:'HARBOR PREPARATIONS'},
      cafe:{key:'refreshments',title:'Help Ren prepare festival treats',desc:'You help Ren pack little lemon cakes for the festival. He lets you keep the slightly uneven one.',label:'CAFÉ PREPARATIONS'},
      garden:{key:'flowers',title:'Gather flowers for the festival stalls',desc:'Mika helps you bundle bright flowers from the garden. A few petals cling to your sleeves.',label:'GARDEN PREPARATIONS'}
    };
    const task=taskByLocation[loc.id],choices=[];
    if(task&&!state.flags[`prep-${task.key}`])choices.push({text:task.title,run:()=>doActivity(task)});
    choices.push({text:loc.id==='station'?'Watch the last train roll by':'Take a quiet moment and enjoy the view',run:()=>doQuietActivity(loc)});
    if(loc.people.length)choices.push({text:`See if ${PEOPLE[loc.people[0]].name.split(' ')[0]} has a moment to talk`,run:()=>talk(loc.people[0])});
    setDialogue(loc.name.toUpperCase(),loc.mood,loc.icon,task&&!state.flags[`prep-${task.key}`]?`There's a little work to do before the summer festival. You could lend a hand, or simply enjoy being here.`:`You take in the details: the colors, the sounds, the familiar shapes of a town that feels a little different this year.`,task&&!state.flags[`prep-${task.key}`]?`${state.festival} of 3 festival preparations complete.`:'A small pause is a plan, too.',choices);
  }

  function doActivity(task){
    if(state.energy<=0)return;
    state.energy--;
    state.flags[`prep-${task.key}`]=true;
    state.festival=Math.min(3,state.festival+1);
    addMemory(task.label,task.desc);
    state.dialogue=null;
    toast('Festival preparations +1. The town is getting ready!');
  }

  function doQuietActivity(loc){
    if(state.energy<=0)return;
    state.energy--;
    const moments={
      square:['A pause in the square','You watched the town move around you and felt, for a moment, completely at home.'],
      harbor:['A pause by the water','The tide kept its own time. You let your thoughts drift with it.'],
      cafe:['A sweet little break','A cool drink and the soft clatter of cups made the afternoon feel unhurried.'],
      garden:['A breath in the garden','The garden smelled of warm earth and green leaves. You took the long way back.'],
      station:['The last train','You watched the last train pull away, carrying someone toward a different summer.']
    };
    const [title,text]=moments[loc.id];
    if(!state.flags[`quiet-${state.day}-${loc.id}`])addMemory(title,text);
    else state.journal.unshift({day:state.day,title:'A quiet afternoon',text:'You let the afternoon pass gently, without needing to make anything of it.'});
    state.dialogue=null;
  }

  function advanceDay(){
    if(state.day>=7){state.ended=true;state.dialogue=null;render();return}
    state.day++;
    state.energy=3;
    state.location='square';
    state.dialogue=null;
    if(state.day===6)addMemory('Festival day','The town is full of lanterns, flowers, and the promise of a good evening.');
    showHomeDialogue();
    save();render();
  }

  function openModal(title,eyebrow,html){
    $('modalTitle').textContent=title;$('modalEyebrow').textContent=eyebrow;$('modalContent').innerHTML=html;
    $('modalBackdrop').hidden=false;$('modalClose').focus();
  }
  function closeModal(){$('modalBackdrop').hidden=true}
  function openJournal(){
    const entries=state.journal.slice(0,8).map(item=>`<div class="journal-entry"><b>DAY ${String(item.day).padStart(2,'0')} · ${escapeHtml(item.title)}</b><p>${escapeHtml(item.text)}</p></div>`).join('');
    const html=`<div class="journal-grid"><div class="journal-stat"><b>${state.day}</b><small>SUMMER DAY</small></div><div class="journal-stat"><b>${Object.values(state.bonds).reduce((a,b)=>a+b,0)}</b><small>CONVERSATIONS SHARED</small></div><div class="journal-stat"><b>${state.festival}/3</b><small>FESTIVAL PREPARATIONS</small></div><div class="journal-stat"><b>${state.memories.length}</b><small>LITTLE MEMORIES</small></div></div><h3>Recent pages</h3>${entries||'<div class="journal-empty">Your journal is waiting for its first little story.</div>'}<div class="modal-actions"><button id="journalSave">Save summer</button><button id="journalReset">Start over</button></div>`;
    openModal('Your journal','A LITTLE NOTE',html);
    $('journalSave').addEventListener('click',()=>save(true));
    $('journalReset').addEventListener('click',()=>{if(confirm('Start a new summer? Your current save will be replaced.'))resetGame()});
  }
  function openMemories(){
    const html=state.memories.length?`<div class="memory-grid">${state.memories.map(item=>`<article class="memory-item"><b>${escapeHtml(item.title)}</b><p>Day ${String(item.day).padStart(2,'0')} · ${escapeHtml(item.text)}</p></article>`).join('')}</div>`:'<div class="journal-empty">The summer is just beginning. Little moments will find their way here.</div>';
    openModal('Little memories','KEPT CLOSE',html);
  }
  function openProfile(){
    const html=`<p>You are spending the summer in Aoshima. Everyone you meet is an adult, and this story is about gentle connection, friendship, and choosing how to spend your time.</p><div class="journal-grid"><div class="journal-stat"><b>${escapeHtml(state.name)}</b><small>YOUR NAME · AGE 20</small></div><div class="journal-stat"><b>Day ${state.day}</b><small>THE LONGEST SUMMER</small></div></div><div class="modal-actions"><button id="profileName">Change your name</button><button id="profileReset">Start a new summer</button></div>`;
    openModal('A little about you','YOUR AOshima PROFILE',html);
    $('profileName').addEventListener('click',changeName);
    $('profileReset').addEventListener('click',()=>{if(confirm('Start a new summer? Your current save will be replaced.'))resetGame()});
  }
  function changeName(){
    const value=prompt('What should the town call you?',state.name);
    if(value&&value.trim()){state.name=value.trim().slice(0,32);document.querySelector('.player-card b').textContent=state.name;save();render();if(!$('modalBackdrop').hidden)openProfile();toast('Your name is updated.')}
  }
  function resetGame(){state=freshState();localStorage.removeItem(SAVE_KEY);closeModal();render();save();toast('A new summer is waiting for you.')}

  let audioContext=null,oscillator=null,gain=null;
  function toggleSound(){
    state.sound=!state.sound;
    if(state.sound){
      try{audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();audioContext.resume();oscillator=audioContext.createOscillator();gain=audioContext.createGain();oscillator.type='sine';oscillator.frequency.value=174;gain.gain.value=.012;oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start();$('soundButton').classList.add('sound-on');toast('A soft ambient tone is on.')}catch{state.sound=false;toast('Ambient audio is not available in this browser.')}
    }else if(oscillator){oscillator.stop();oscillator=null;$('soundButton').classList.remove('sound-on');toast('Ambient sound is off.')}
    save();
  }

  $('sceneAction').addEventListener('click',()=>state.ended?resetGame():lookAround());
  $('continueButton').addEventListener('click',continueDay);
  $('brandHome').addEventListener('click',()=>goLocation('square'));
  $('saveButton').addEventListener('click',()=>save(true));
  $('journalButton').addEventListener('click',openJournal);
  $('profileButton').addEventListener('click',openProfile);
  $('editName').addEventListener('click',changeName);
  $('memoriesButton').addEventListener('click',openMemories);
  $('soundButton').addEventListener('click',toggleSound);
  $('modalClose').addEventListener('click',closeModal);
  $('modalBackdrop').addEventListener('click',event=>{if(event.target===$('modalBackdrop'))closeModal()});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){closeModal();return}
    if(event.target.matches('input,textarea'))return;
    if(event.key.toLowerCase()==='j')openJournal();
    if(/^[1-3]$/.test(event.key)){choose(Number(event.key)-1)}
  });

  render();
  save();
})();

import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const $ = (id) => document.getElementById(id);
const DB_KEY = "nova-ai-5-data-v1";
const MODEL_IDS = [
  "Llama-3.2-1B-Instruct-q4f16_1-MLC",
  "Qwen2.5-0.5B-Instruct-q4f16_1-MLC"
];

const translations = {
  en: {
    newChat:"New chat",history:"HISTORY",models:"Models",memory:"Memory",agent:"Agent workspace",dashboard:"Dashboard",settings:"Settings",
    localNote:"Local-first · Your data stays in this browser",offlineReady:"Local workspace",activeModel:"ACTIVE MODEL",manageModels:"Manage models",
    welcomeTitle:"Your AI. Your models. Your control.",welcomeText:"Load a local model to start a private conversation.",
    quickPlan:"Plan a project",quickExplain:"Explain something",quickIdeas:"Brainstorm ideas",promptPlaceholder:"Message Nova...",
    localInference:"Local inference · No AI API key",modelsTitle:"Model library",modelsDesc:"Download open-weight models into this browser and run them locally.",
    deviceNoteTitle:"Device compatibility",deviceNote:"Local inference requires WebGPU and enough available memory. A model download can be large. Start with the smallest option on iPhone.",
    chooseModel:"Choose a model",loadModel:"Load model",unloadModel:"Unload model",modelInfoTitle:"How local models work",
    modelInfo1:"The first load downloads model files into browser storage.",modelInfo2:"Later loads may reuse cached files.",modelInfo3:"Prompts are processed on this device when local inference is active.",modelInfo4:"Closing the tab stops generation; it does not run as a background service.",
    memoryTitle:"Nova memory",memoryDesc:"Information you choose to keep available to future chats on this device.",memoryLabel:"Your saved memory",memoryPlaceholder:"Add preferences or useful context...",saveMemory:"Save memory",memoryPrivacy:"Memory is stored in this browser only. Do not store passwords or sensitive information.",
    agentTitle:"Agent workspace",agentDesc:"Ask Nova to plan a task and use the local tools below. Actions that change data require your confirmation.",
    taskLabel:"What should Nova help you do?",taskPlaceholder:"Example: Help me organize my study week...",createPlan:"Create a plan with AI",planWillAppear:"Your plan will appear here.",
    localTools:"Local tools",timeTool:"Show local date and time",timeToolDesc:"Reads the device clock",noteTool:"Create a note",noteToolDesc:"Saves a note after confirmation",exportTool:"Export my data",exportToolDesc:"Download chats, memory and notes",
    dashboardTitle:"Local dashboard",dashboardDesc:"Private statistics for this browser profile. This is not a secure multi-user admin system.",
    totalChats:"Chats",totalMessages:"Messages",savedNotes:"Saved notes",memoryChars:"Memory characters",dataManagement:"Data management",
    dataManagementDesc:"Export a backup before clearing local data. Browser storage can be cleared by iOS or by deleting website data.",
    backup:"Download backup",importBackup:"Restore backup",clearData:"Clear all local data",settingsTitle:"Settings",settingsDesc:"Adjust how Nova communicates with you.",
    personality:"AI personality",responseLanguage:"Response language",speakReplies:"Read replies aloud",confirmActions:"Ask before saving or changing data",
    saveSettings:"Save settings",privacyTitle:"Privacy and limitations",privacyText:"Chats, memory and notes stay in this browser unless you export or share them. The static version has no accounts, cross-device sync, remote search or always-on server. Never put secrets in a public repository.",
    loading:"Loading model...",ready:"Model ready",noModel:"No model loaded.",user:"YOU",assistant:"NOVA",error:"Error",thinking:"Thinking...",noWebGPU:"WebGPU is unavailable in this browser. Try a compatible device/browser or use a self-hosted computer server.",
    confirmNote:"Create and save this note?",notePrompt:"Enter note text",saved:"Saved.",cleared:"Local data cleared.",modelUnloaded:"Model unloaded.",loadFirst:"Load a model first.",planNeed:"Enter a task first.",
    speechUnavailable:"Voice input is not available in this browser.",listening:"Listening...",planPrompt:"Create a clear, practical step-by-step plan for this task. Use the user's language. Do not claim to have performed actions.",
    fileAdded:"File attached",noFileText:"Could not read this file.",backupDone:"Backup downloaded.",confirmImport:"Replace current local data with this backup?",importInvalid:"This backup file is not valid Nova data.",confirmClear:"Delete all Nova chats, notes, memory and settings from this browser?",
    chatTitle:"New conversation"
  },
  nl: {
    newChat:"Nieuwe chat",history:"GESCHIEDENIS",models:"Modellen",memory:"Geheugen",agent:"Agentwerkruimte",dashboard:"Dashboard",settings:"Instellingen",
    localNote:"Lokaal · Je gegevens blijven in deze browser",offlineReady:"Lokale werkruimte",activeModel:"ACTIEF MODEL",manageModels:"Modellen beheren",
    welcomeTitle:"Jouw AI. Jouw modellen. Jouw controle.",welcomeText:"Laad een lokaal model om privé te chatten.",
    quickPlan:"Project plannen",quickExplain:"Iets uitleggen",quickIdeas:"Ideeën bedenken",promptPlaceholder:"Bericht aan Nova...",
    localInference:"Lokale AI · Geen AI API-sleutel",modelsTitle:"Modellenbibliotheek",modelsDesc:"Download open modellen naar deze browser en voer ze lokaal uit.",
    deviceNoteTitle:"Apparaatcompatibiliteit",deviceNote:"Lokale AI vereist WebGPU en voldoende vrij geheugen. Een model kan groot zijn. Begin op iPhone met de kleinste optie.",
    chooseModel:"Kies een model",loadModel:"Model laden",unloadModel:"Model sluiten",modelInfoTitle:"Hoe lokale modellen werken",
    modelInfo1:"De eerste keer worden modelbestanden naar browseropslag gedownload.",modelInfo2:"Latere keren kunnen de bestanden uit de cache worden gebruikt.",modelInfo3:"Prompts worden op dit apparaat verwerkt wanneer lokale AI actief is.",modelInfo4:"Als je het tabblad sluit, stopt het genereren. De AI draait niet op de achtergrond.",
    memoryTitle:"Nova-geheugen",memoryDesc:"Informatie die je op dit apparaat beschikbaar wilt houden voor toekomstige chats.",memoryLabel:"Opgeslagen geheugen",memoryPlaceholder:"Voeg voorkeuren of nuttige context toe...",saveMemory:"Geheugen opslaan",memoryPrivacy:"Geheugen staat alleen in deze browser. Sla geen wachtwoorden of gevoelige informatie op.",
    agentTitle:"Agentwerkruimte",agentDesc:"Vraag Nova om een taak te plannen en gebruik de lokale hulpmiddelen hieronder. Acties die gegevens wijzigen vragen om bevestiging.",
    taskLabel:"Waarmee moet Nova je helpen?",taskPlaceholder:"Voorbeeld: Help me mijn schoolweek organiseren...",createPlan:"Plan maken met AI",planWillAppear:"Je plan verschijnt hier.",
    localTools:"Lokale hulpmiddelen",timeTool:"Lokale datum en tijd tonen",timeToolDesc:"Leest de klok van je apparaat",noteTool:"Notitie maken",noteToolDesc:"Slaat een notitie op na bevestiging",exportTool:"Mijn gegevens exporteren",exportToolDesc:"Download chats, geheugen en notities",
    dashboardTitle:"Lokaal dashboard",dashboardDesc:"Privéstatistieken voor dit browserprofiel. Dit is geen beveiligd beheersysteem voor meerdere gebruikers.",
    totalChats:"Chats",totalMessages:"Berichten",savedNotes:"Notities",memoryChars:"Geheugentekens",dataManagement:"Gegevensbeheer",
    dataManagementDesc:"Maak eerst een back-up. iOS kan browseropslag wissen of je kunt websitegegevens verwijderen.",
    backup:"Back-up downloaden",importBackup:"Back-up terugzetten",clearData:"Alle lokale gegevens wissen",settingsTitle:"Instellingen",settingsDesc:"Pas aan hoe Nova met je communiceert.",
    personality:"AI-persoonlijkheid",responseLanguage:"Antwoordtaal",speakReplies:"Antwoorden voorlezen",confirmActions:"Vraag toestemming voordat gegevens worden opgeslagen of gewijzigd",
    saveSettings:"Instellingen opslaan",privacyTitle:"Privacy en beperkingen",privacyText:"Chats, geheugen en notities blijven in deze browser tenzij je ze exporteert of deelt. Deze statische versie heeft geen accounts, synchronisatie tussen apparaten, extern zoeken of altijd actieve server. Zet nooit geheimen in een openbare repository.",
    loading:"Model laden...",ready:"Model gereed",noModel:"Geen model geladen.",user:"JIJ",assistant:"NOVA",error:"Fout",thinking:"Even denken...",noWebGPU:"WebGPU is niet beschikbaar in deze browser. Probeer een compatibele browser of gebruik een eigen AI-server op een computer.",
    confirmNote:"Deze notitie maken en opslaan?",notePrompt:"Voer de notitietekst in",saved:"Opgeslagen.",cleared:"Lokale gegevens gewist.",modelUnloaded:"Model gesloten.",loadFirst:"Laad eerst een model.",planNeed:"Vul eerst een taak in.",
    speechUnavailable:"Spraakinvoer is niet beschikbaar in deze browser.",listening:"Luisteren...",planPrompt:"Maak een duidelijk, praktisch stappenplan voor deze taak. Gebruik de taal van de gebruiker. Beweer niet dat acties al zijn uitgevoerd.",
    fileAdded:"Bestand toegevoegd",noFileText:"Dit bestand kon niet worden gelezen.",backupDone:"Back-up gedownload.",confirmImport:"Huidige lokale gegevens vervangen door deze back-up?",importInvalid:"Dit back-upbestand bevat geen geldige Nova-gegevens.",confirmClear:"Alle Nova-chats, notities, geheugen en instellingen uit deze browser verwijderen?",
    chatTitle:"Nieuw gesprek"
  }
};

let state = loadState();
let engine = null;
let engineModel = "";
let busy = false;
let attachedText = "";
let attachedName = "";
let currentChatId = null;
let recognition = null;

function defaultState(){
  return {
    chats: [],
    notes: [],
    memory: "",
    settings: {language:"en", responseLang:"auto", personality:"helpful", speak:false, confirm:true, theme:"dark"},
    selectedModel: MODEL_IDS[0]
  };
}
function loadState(){
  try {
    const parsed = JSON.parse(localStorage.getItem(DB_KEY));
    return parsed && typeof parsed === "object" ? {...defaultState(), ...parsed} : defaultState();
  } catch { return defaultState(); }
}
function persist(){
  try { localStorage.setItem(DB_KEY, JSON.stringify(state)); }
  catch { toast("Storage is full. Export your data and remove old chats."); }
}
function t(key){ return translations[state.settings.language]?.[key] || translations.en[key] || key; }
function toast(message){
  const el=$("toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove("show"),2600);
}
function uid(){ return crypto.randomUUID ? crypto.randomUUID() : String(Date.now())+Math.random(); }
function activeChat(){
  return state.chats.find(c=>c.id===currentChatId) || null;
}
function ensureChat(){
  let chat=activeChat();
  if(!chat){
    chat={id:uid(),title:t("chatTitle"),created:Date.now(),updated:Date.now(),messages:[]};
    state.chats.unshift(chat); currentChatId=chat.id; persist(); renderChatList();
  }
  return chat;
}
function systemPrompt(){
  const language = state.settings.responseLang==="auto" ? "Reply in the language used by the user." :
    state.settings.responseLang==="nl" ? "Always reply in Dutch." : "Always reply in English.";
  const styles = {
    helpful:"Be helpful, balanced, clear and honest.",
    creative:"Be imaginative and offer useful creative options.",
    technical:"Be precise, structured and technically detailed.",
    tutor:"Be a patient tutor. Explain concepts step by step."
  };
  return `You are Nova, a personal AI assistant. ${styles[state.settings.personality]||styles.helpful} ${language}
Respect safety boundaries. Do not claim you accessed the internet, files, accounts or devices unless a tool actually did so.
User-provided memory (may be incomplete): ${state.memory || "No saved memory."}
When asked to plan tasks, provide practical numbered steps. You cannot execute external actions in this local-only version.`;
}
function showView(name){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  const target=$(name+"View"); if(target) target.classList.add("active");
  document.querySelectorAll(".nav-button").forEach(b=>b.classList.toggle("selected",b.dataset.panel===name));
  $("sidebar").classList.remove("open");
  if(name==="admin") refreshStats();
  if(name==="chat") renderMessages();
}
function renderMessages(){
  const wrap=$("messages"); wrap.replaceChildren();
  const chat=activeChat();
  if(!chat || !chat.messages.length){
    const welcome=document.createElement("div"); welcome.className="welcome";
    welcome.innerHTML=`<div class="welcome-orb">✦</div><p class="eyebrow">NOVA AI 5.0</p><h1>${escapeHTML(t("welcomeTitle"))}</h1><p>${escapeHTML(t("welcomeText"))}</p>`;
    wrap.appendChild(welcome); return;
  }
  for(const m of chat.messages) addBubble(m.role,m.content,false);
  wrap.scrollTop=wrap.scrollHeight;
}
function escapeHTML(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function addBubble(role,content,save=true){
  const wrap=$("messages");
  const welcome=wrap.querySelector(".welcome"); if(welcome) welcome.remove();
  const b=document.createElement("div"); b.className="bubble "+(role==="user"?"user":"assistant");
  const label=document.createElement("div"); label.className="role"; label.textContent=role==="user"?t("user"):t("assistant");
  const body=document.createElement("div"); body.textContent=content;
  b.append(label,body); wrap.appendChild(b); wrap.scrollTop=wrap.scrollHeight;
  return body;
}
function renderChatList(){
  const list=$("chatList"); list.replaceChildren();
  for(const chat of state.chats){
    const btn=document.createElement("button"); btn.className="chat-item"+(chat.id===currentChatId?" active":"");
    btn.textContent=chat.title || t("chatTitle"); btn.title=btn.textContent;
    btn.onclick=()=>{currentChatId=chat.id;renderChatList();renderMessages();showView("chat");};
    list.appendChild(btn);
  }
}
function setLanguage(lang){
  state.settings.language=lang; persist();
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n; if(translations[lang][key]) el.textContent=translations[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const key=el.dataset.i18nPlaceholder; if(translations[lang][key]) el.placeholder=translations[lang][key];
  });
  $("languageSelect").value=lang; renderChatList(); renderMessages();
  $("modelStatus").textContent=engine?t("ready"):t("noModel");
}
function refreshStats(){
  $("statChats").textContent=state.chats.length;
  $("statMessages").textContent=state.chats.reduce((n,c)=>n+c.messages.length,0);
  $("statNotes").textContent=state.notes.length;
  $("statMemory").textContent=state.memory.length;
}
function downloadJSON(data,name){
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob); const a=document.createElement("a");
  a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);
}
function exportData(){
  downloadJSON({app:"Nova AI 5.0",exportedAt:new Date().toISOString(),...state},"nova-ai-backup.json");
  toast(t("backupDone"));
}
async function loadModel(){
  if(busy) return;
  const id=$("modelSelect").value;
  if(engine && engineModel===id){toast(t("ready"));return;}
  if(!navigator.gpu){
    $("modelStatus").textContent=t("noWebGPU"); toast(t("noWebGPU")); return;
  }
  busy=true; $("loadModelBtn").disabled=true; $("sendBtn").disabled=true;
  $("modelStatus").textContent=t("loading"); $("loadProgress").style.width="2%";
  try{
    const mod=await import("https://esm.run/@mlc-ai/web-llm");
    const Create=mod.CreateMLCEngine;
    engine=await Create(id,{
      initProgressCallback:(p)=>{
        $("modelStatus").textContent=p.text||t("loading");
        if(typeof p.progress==="number") $("loadProgress").style.width=Math.round(p.progress*100)+"%";
      }
    });
    engineModel=id; state.selectedModel=id; persist();
    $("activeModelLabel").textContent=id;
    $("modelStatus").textContent=t("ready"); $("loadProgress").style.width="100%";
    $("sendBtn").disabled=false; toast(t("ready"));
  }catch(err){
    engine=null;engineModel="";$("modelStatus").textContent="Error: "+err.message;
    toast("Model load failed: "+err.message);
  }finally{busy=false;$("loadModelBtn").disabled=false;$("sendBtn").disabled=!engine;}
}
async function sendMessage(raw){
  const text=raw.trim(); if(!text||busy)return;
  if(!engine){toast(t("loadFirst"));showView("models");return;}
  const chat=ensureChat();
  const userText=attachedText ? `${text}\n\n[Attached file: ${attachedName}]\n${attachedText}` : text;
  attachedText="";attachedName="";$("fileChip").classList.add("hidden");
  chat.messages.push({role:"user",content:userText,at:Date.now()});
  if(chat.messages.length===1) chat.title=text.slice(0,42);
  chat.updated=Date.now();persist();renderChatList();renderMessages();
  $("promptInput").value="";$("charCount").textContent="0";
  busy=true;$("sendBtn").disabled=true;
  const placeholder=addBubble("assistant",t("thinking"));
  try{
    const history=[{role:"system",content:systemPrompt()},...chat.messages.slice(-20).map(m=>({role:m.role,content:m.content}))];
    const result=await engine.chat.completions.create({
      messages:history,temperature:0.65,max_tokens:700
    });
    const answer=result.choices?.[0]?.message?.content?.trim() || "No response.";
    placeholder.textContent=answer;
    chat.messages.push({role:"assistant",content:answer,at:Date.now()});
    chat.updated=Date.now();persist();renderChatList();
    if(state.settings.speak) speak(answer);
  }catch(err){
    placeholder.textContent="AI error: "+err.message;
  }finally{busy=false;$("sendBtn").disabled=!engine;}
}
function speak(text){
  if(!("speechSynthesis" in window)){toast("Speech output is not supported.");return;}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.lang=state.settings.responseLang==="nl"?"nl-NL":"en-US";
  speechSynthesis.speak(utterance);
}
function startVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){toast(t("speechUnavailable"));return;}
  recognition=new SR();recognition.lang=state.settings.language==="nl"?"nl-NL":"en-US";
  recognition.interimResults=false;recognition.maxAlternatives=1;
  recognition.onstart=()=>toast(t("listening"));
  recognition.onresult=e=>{$("promptInput").value=e.results[0][0].transcript;$("charCount").textContent=$("promptInput").value.length;};
  recognition.onerror=()=>toast(t("speechUnavailable"));
  recognition.start();
}
async function readFile(file){
  try{
    const text=await file.text();
    if(!text.trim()) throw new Error("empty");
    attachedText=text.slice(0,18000);attachedName=file.name;
    $("fileChip").textContent=`📎 ${file.name} · ${attachedText.length} chars`;
    $("fileChip").classList.remove("hidden");
    $("promptInput").value=state.settings.language==="nl"?"Vat dit bestand samen en analyseer de belangrijkste punten.":"Summarize this file and analyze its key points.";
  }catch{$("fileChip").textContent=t("noFileText");$("fileChip").classList.remove("hidden");}
}
function saveNote(note){
  state.notes.unshift({id:uid(),text:note,created:Date.now()});persist();refreshStats();
}
function renderSettings(){
  $("personalitySelect").value=state.settings.personality;
  $("responseLang").value=state.settings.responseLang;
  $("speakReplies").checked=state.settings.speak;
  $("agentConfirm").checked=state.settings.confirm;
  $("memoryInput").value=state.memory;
}
function applyTheme(){
  document.body.classList.toggle("light",state.settings.theme==="light");
}
function init(){
  $("languageSelect").value=state.settings.language;
  setLanguage(state.settings.language);
  $("modelSelect").value=MODEL_IDS.includes(state.selectedModel)?state.selectedModel:MODEL_IDS[0];
  $("activeModelLabel").textContent=t("noModel");
  renderSettings();applyTheme();renderChatList();renderMessages();
  document.querySelectorAll("[data-panel]").forEach(btn=>btn.addEventListener("click",()=>showView(btn.dataset.panel)));
  $("newChat").onclick=()=>{currentChatId=null;ensureChat();renderChatList();renderMessages();showView("chat");};
  $("menuBtn").onclick=()=>$("sidebar").classList.toggle("open");
  $("languageSelect").onchange=e=>setLanguage(e.target.value);
  $("themeBtn").onclick=()=>{state.settings.theme=state.settings.theme==="dark"?"light":"dark";persist();applyTheme();};
  $("loadModelBtn").onclick=loadModel;
  $("unloadModelBtn").onclick=()=>{if(engine?.unload)engine.unload();engine=null;engineModel="";$("activeModelLabel").textContent=t("noModel");$("modelStatus").textContent=t("modelUnloaded");$("sendBtn").disabled=true;toast(t("modelUnloaded"));};
  $("chatForm").onsubmit=e=>{e.preventDefault();sendMessage($("promptInput").value);};
  $("promptInput").addEventListener("input",()=>{$("charCount").textContent=$("promptInput").value.length;});
  $("promptInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("chatForm").requestSubmit();}});
  document.querySelectorAll("[data-prompt]").forEach(b=>b.onclick=()=>{$("promptInput").value=b.dataset.prompt;$("promptInput").focus();});
  $("attachBtn").onclick=()=>$("fileInput").click();
  $("fileInput").onchange=e=>{if(e.target.files[0])readFile(e.target.files[0]);};
  $("voiceBtn").onclick=startVoice;
  $("saveMemoryBtn").onclick=()=>{state.memory=$("memoryInput").value;persist();toast(t("saved"));};
  $("saveSettingsBtn").onclick=()=>{
    state.settings.personality=$("personalitySelect").value;
    state.settings.responseLang=$("responseLang").value;
    state.settings.speak=$("speakReplies").checked;
    state.settings.confirm=$("agentConfirm").checked;
    persist();toast(t("saved"));
  };
  $("planTaskBtn").onclick=async()=>{
    const task=$("agentTask").value.trim();if(!task){toast(t("planNeed"));return;}
    if(!engine){toast(t("loadFirst"));showView("models");return;}
    $("agentPlan").textContent=t("thinking");
    try{
      const result=await engine.chat.completions.create({messages:[
        {role:"system",content:systemPrompt()+" "+t("planPrompt")},
        {role:"user",content:task}
      ],temperature:0.5,max_tokens:650});
      $("agentPlan").textContent=result.choices[0].message.content;
    }catch(e){$("agentPlan").textContent="Error: "+e.message;}
  };
  $("timeTool").onclick=()=>{$("toolResult").textContent=new Date().toLocaleString(state.settings.language==="nl"?"nl-NL":"en-US",{dateStyle:"full",timeStyle:"medium"});};
  $("noteTool").onclick=()=>{
    const note=prompt(t("notePrompt"));if(note===null||!note.trim())return;
    if(state.settings.confirm&&!confirm(t("confirmNote")))return;
    saveNote(note.trim());$("toolResult").textContent=t("saved");toast(t("saved"));
  };
  $("exportTool").onclick=exportData;$("backupBtn").onclick=exportData;
  $("importBtn").onclick=()=>$("importInput").click();
  $("importInput").onchange=async e=>{
    const file=e.target.files?.[0]; if(!file)return;
    try{
      const incoming=JSON.parse(await file.text());
      if(!incoming || incoming.app!=="Nova AI 5.0" || !Array.isArray(incoming.chats) || !Array.isArray(incoming.notes) || typeof incoming.memory!=="string" || !incoming.settings) throw new Error("invalid");
      if(!confirm(t("confirmImport"))) return;
      state={...defaultState(),...incoming};
      persist();currentChatId=null;renderSettings();renderChatList();renderMessages();refreshStats();
      toast(t("saved"));
    }catch{toast(t("importInvalid"));}
    finally{$("importInput").value="";}
  };
  $("clearBtn").onclick=()=>{
    if(!confirm(t("confirmClear")))return;
    localStorage.removeItem(DB_KEY);state=defaultState();currentChatId=null;
    renderSettings();renderChatList();renderMessages();refreshStats();toast(t("cleared"));
  };
  $("modelSelect").onchange=()=>{state.selectedModel=$("modelSelect").value;persist();};
  if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
}
init();

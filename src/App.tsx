import { useState, useEffect, useRef, useCallback } from "react";
import {
  Car, User, Shield, MapPin, CheckCircle, LogOut, Settings,
  Activity, Calendar, Clock, Lock, Users, ToggleLeft, ToggleRight,
  Star, History, ChevronRight, X, BarChart3, AlertTriangle,
  TrendingUp, ArrowLeft, FileText, Check, Building2, Briefcase,
  Zap, ArrowRight, Bell, Search, Plus, Download, RefreshCw,
  Phone, Mail, Hash, Radio, ChevronDown, AlertCircle, Info,
  DollarSign, Percent, TrendingDown, Key, Server, Cpu,
  MessageCircle, Sparkles, Brain, Route, Navigation, Loader,
  CheckSquare, MoreVertical, Eye, Edit2, Trash2, Package,
  Map, Globe, Send, Bot, Mic, ThumbsUp, ThumbsDown, RotateCcw,
  ChevronUp, Grid3X3, List, PieChart, Target, Award,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════ */
const C = {
  brand:   { 50:"#EEF2FF", 100:"#E0E7FF", 200:"#C7D2FE", 300:"#A5B4FC", 400:"#818CF8", 500:"#6366F1", 600:"#4F46E5", 700:"#4338CA", 800:"#3730A3", 900:"#312E81" },
  slate:   { 50:"#F8FAFC", 100:"#F1F5F9", 200:"#E2E8F0", 300:"#CBD5E1", 400:"#94A3B8", 500:"#64748B", 600:"#475569", 700:"#334155", 800:"#1E293B", 900:"#0F172A", 950:"#020617" },
  emerald: { 50:"#ECFDF5", 100:"#D1FAE5", 200:"#A7F3D0", 400:"#34D399", 500:"#10B981", 600:"#059669", 700:"#047857", 800:"#065F46" },
  amber:   { 50:"#FFFBEB", 100:"#FEF3C7", 200:"#FDE68A", 400:"#FBBF24", 500:"#F59E0B", 600:"#D97706", 800:"#92400E" },
  rose:    { 50:"#FFF1F2", 100:"#FFE4E6", 400:"#FB7185", 500:"#F43F5E", 600:"#E11D48", 800:"#9F1239" },
  sky:     { 50:"#F0F9FF", 100:"#E0F2FE", 400:"#38BDF8", 500:"#0EA5E9", 600:"#0284C7", 800:"#075985" },
  violet:  { 50:"#F5F3FF", 100:"#EDE9FE", 400:"#A78BFA", 500:"#8B5CF6", 600:"#7C3AED", 800:"#5B21B6" },
  orange:  { 50:"#FFF7ED", 100:"#FFEDD5", 400:"#FB923C", 600:"#EA580C", 800:"#9A3412" },
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Cabinet+Grotesk:wght@700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; overflow: hidden; }
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: ${C.slate[50]}; color: ${C.slate[800]}; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${C.slate[200]}; border-radius: 99px; }
    ::-webkit-scrollbar-thumb:hover { background: ${C.slate[300]}; }
    button, input, select, textarea { font-family: inherit; }
    a { text-decoration: none; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes slideRight { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes radar { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    .fade-up { animation: fadeUp 0.4s ease both; }
    .fade-in { animation: fadeIn 0.3s ease both; }
    .hover-lift { transition: transform 0.18s, box-shadow 0.18s; }
    .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
    .btn-primary { background: ${C.brand[600]}; color: white; border: none; border-radius: 10px; padding: 10px 20px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.15s, transform 0.1s; }
    .btn-primary:hover { background: ${C.brand[700]}; }
    .btn-primary:active { transform: scale(0.97); }
    .btn-ghost { background: transparent; color: ${C.slate[600]}; border: 1px solid ${C.slate[200]}; border-radius: 10px; padding: 9px 18px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.15s; }
    .btn-ghost:hover { background: ${C.slate[50]}; border-color: ${C.slate[300]}; }
    .input { width:100%; padding:10px 14px; border:1px solid ${C.slate[200]}; border-radius:10px; font-size:14px; color:${C.slate[800]}; background:white; outline:none; transition:border-color 0.15s; }
    .input:focus { border-color:${C.brand[400]}; box-shadow:0 0 0 3px ${C.brand[100]}; }
    .card { background: white; border: 1px solid ${C.slate[200]}; border-radius: 16px; }
    .sidebar-item { display:flex; align-items:center; gap:10px; padding:9px 12px; border-radius:10px; border:none; background:transparent; font-size:14px; font-weight:600; color:${C.slate[500]}; cursor:pointer; transition:all 0.12s; width:100%; text-align:left; }
    .sidebar-item:hover { background:${C.slate[100]}; color:${C.slate[700]}; }
    .sidebar-item.active { background:${C.brand[50]}; color:${C.brand[700]}; }
    .tab-pill { padding:7px 16px; border-radius:8px; border:none; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.15s; background:transparent; color:${C.slate[500]}; }
    .tab-pill.active { background:white; color:${C.brand[700]}; box-shadow:0 1px 4px rgba(0,0,0,0.1); }
    .ai-typing::after { content:'▋'; animation: blink 1s infinite; }
    .shimmer { background: linear-gradient(90deg, ${C.slate[100]} 25%, ${C.slate[50]} 50%, ${C.slate[100]} 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════════════════ */
const DEMO_COMPANIES = {
  "technova": {
    id:"technova", name:"TechNova Corp", industry:"IT Services", city:"Hyderabad",
    employees:1842, plan:"Professional", logo:"🏢",
    zones:["Zone A - Main Campus","Zone B - Annex","Zone C - Lab Block"],
    fleet:[
      { id:"c1", plate:"TS 09 EN 1234", model:"Toyota Innova", driver:"Bob Mitchell", driverId:"d1", cap:6, rating:4.9, trips:1420, status:"active", fuel:"CNG", lat:17.445, lng:78.362 },
      { id:"c2", plate:"TS 08 AB 5678", model:"Maruti Ertiga", driver:"Dave Johnson", driverId:"d2", cap:6, rating:4.7, trips:850, status:"active", fuel:"Petrol", lat:17.438, lng:78.371 },
      { id:"c3", plate:"MH 12 XY 9012", model:"Honda City", driver:"Sarah Connor", driverId:"d3", cap:4, rating:4.95, trips:2100, status:"active", fuel:"Electric", lat:17.452, lng:78.355 },
      { id:"c4", plate:"KA 01 MN 3456", model:"Toyota Fortuner", driver:"Raj Kumar", driverId:"d4", cap:6, rating:4.6, trips:620, status:"maintenance", fuel:"Diesel", lat:17.441, lng:78.368 },
      { id:"c5", plate:"AP 28 TZ 7890", model:"Mahindra XUV", driver:"Meena Iyer", driverId:"d5", cap:6, rating:4.8, trips:980, status:"active", fuel:"Diesel", lat:17.449, lng:78.358 },
    ],
    rides:[
      { id:"r1", emp:"Alice Smith", empId:"e1", driver:"Bob Mitchell", dId:"d1", plate:"TS 09 EN 1234", from:"Kondapur", to:"Zone A", status:"SCHEDULED", date:"Today", time:"17:30", otp1:"1234", otp2:"5678", dist:"12.4 km", dur:"38 min", pax:3, shared:["John D.","Sarah M."] },
      { id:"r2", emp:"Charlie Davis", empId:"e2", driver:"Sarah Connor", dId:"d3", plate:"MH 12 XY 9012", from:"Miyapur Metro", to:"Zone B", status:"IN_PROGRESS", date:"Today", time:"15:00", otp1:"1111", otp2:"2222", dist:"18 km", dur:"45 min", pax:1, shared:[] },
      { id:"r_req1", emp:"Nisha Patel", empId:"e3", driver:null, dId:null, plate:null, from:"Banjara Hills", to:"Zone A", status:"REQUESTED", date:"Tomorrow", time:"09:00", otp1:"3333", otp2:"4444", dist:"10.5 km", dur:"30 min", pax:2, shared:["Dev R."] },
      { id:"r_req2", emp:"Vikram Rao", empId:"e4", driver:null, dId:null, plate:null, from:"Secunderabad", to:"Zone B", status:"REQUESTED", date:"Tomorrow", time:"08:30", otp1:"5555", otp2:"6666", dist:"15 km", dur:"42 min", pax:1, shared:[] },
      { id:"r3", emp:"Alice Smith", empId:"e1", driver:"Dave Johnson", dId:"d2", plate:"TS 08 AB 5678", from:"Miyapur Metro", to:"Zone B", status:"COMPLETED", date:"Yesterday", time:"08:30", boardAt:"08:35", dropAt:"09:15", otp1:"----", otp2:"----", dist:"14.1 km", dur:"40 min", pax:1, shared:[] },
      { id:"r4", emp:"Alice Smith", empId:"e1", driver:"Bob Mitchell", dId:"d1", plate:"TS 09 EN 1234", from:"Zone B", to:"Kondapur", status:"COMPLETED", date:"Oct 24", time:"18:00", boardAt:"18:02", dropAt:"18:45", otp1:"----", otp2:"----", dist:"12.4 km", dur:"43 min", pax:2, shared:["John D."] },
    ],
    users:{
      admin:{ id:"a1", name:"Priya Mehta", role:"admin", email:"priya@technova.com", phone:"+91 98765 43210", designation:"Ops Head" },
      employee:{ id:"e1", name:"Alice Smith", role:"employee", email:"alice@technova.com", phone:"+91 99876 54321", dept:"Engineering", erpId:"ERP-9921", shift:"Morning (8AM–5PM)" },
      driver:{ id:"d1", name:"Bob Mitchell", role:"driver", phone:"+91 91234 56789", vehicle:"Toyota Innova", plate:"TS 09 EN 1234", license:"TS2024-001" },
    }
  }
};

/* ═══════════════════════════════════════════════════════════
   TINY COMPONENTS
═══════════════════════════════════════════════════════════ */
const Badge = ({ children, color="slate", dot=false }) => {
  const map = {
    brand:  [C.brand[50],  C.brand[700],  C.brand[200]],
    green:  [C.emerald[50],C.emerald[700],C.emerald[200]],
    amber:  [C.amber[50],  C.amber[700],  C.amber[200]],
    red:    [C.rose[50],   C.rose[700],   C.rose[100]],
    violet: [C.violet[50], C.violet[700], C.violet[200]],
    sky:    [C.sky[50],    C.sky[700],    C.sky[200]],
    slate:  [C.slate[100], C.slate[600],  C.slate[200]],
    orange: [C.orange[50], C.orange[700], C.orange[200]],
  };
  const [bg,text,border] = map[color]||map.slate;
  return (
    <span style={{background:bg,color:text,border:`1px solid ${border}`,borderRadius:99,fontSize:11,fontWeight:700,padding:"2px 9px",display:"inline-flex",alignItems:"center",gap:5,letterSpacing:"0.02em",whiteSpace:"nowrap"}}>
      {dot && <span style={{width:5,height:5,borderRadius:"50%",background:text,flexShrink:0}}/>}
      {children}
    </span>
  );
};

const Avatar = ({ name="?", size=36, bg=C.brand[600] }) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:`${bg}20`,border:`1.5px solid ${bg}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:800,fontSize:size*0.33,color:bg,letterSpacing:"0.04em"}}>
    {name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
  </div>
);

const Pill = ({ status }) => {
  const m = { SCHEDULED:["blue","Scheduled"], IN_PROGRESS:["green","Live"], COMPLETED:["slate","Completed"], REQUESTED:["amber","Pending"], active:["green","Active"], maintenance:["orange","Maint."], inactive:["red","Inactive"] };
  const [c,l] = m[status]||["slate",status];
  return <Badge color={c} dot>{l}</Badge>;
};

const Metric = ({ icon:Icon, label, value, sub, accent=C.brand[600], onClick }) => (
  <div className="card hover-lift" onClick={onClick} style={{padding:"18px 20px",cursor:onClick?"pointer":"default",display:"flex",flexDirection:"column",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{width:36,height:36,borderRadius:9,background:`${accent}15`,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Icon size={16} color={accent}/>
      </div>
    </div>
    <div>
      <div style={{fontSize:26,fontWeight:900,color:C.slate[900],lineHeight:1}}>{value}</div>
      <div style={{fontSize:12,color:C.slate[500],fontWeight:600,marginTop:4}}>{label}</div>
      {sub && <div style={{fontSize:11,color:C.slate[400],marginTop:2}}>{sub}</div>}
    </div>
  </div>
);

const RouteViz = ({ from, to, time, dist, dur }) => (
  <div style={{position:"relative",paddingLeft:20,display:"flex",flexDirection:"column",gap:14}}>
    <div style={{position:"absolute",left:5,top:6,bottom:6,width:1.5,background:C.slate[200],borderRadius:2}}/>
    <div style={{position:"relative"}}>
      <div style={{position:"absolute",left:-15,top:3,width:8,height:8,borderRadius:"50%",background:C.brand[500],border:"2px solid white",boxShadow:`0 0 0 2px ${C.brand[200]}`}}/>
      <div style={{fontSize:13,fontWeight:700,color:C.slate[800]}}>{from}</div>
      <div style={{fontSize:11,color:C.slate[400],marginTop:1}}>{time} · Pickup</div>
    </div>
    <div style={{position:"relative"}}>
      <div style={{position:"absolute",left:-15,top:3,width:8,height:8,borderRadius:"50%",background:C.emerald[500],border:"2px solid white",boxShadow:`0 0 0 2px ${C.emerald[200]}`}}/>
      <div style={{fontSize:13,fontWeight:700,color:C.slate[800]}}>{to}</div>
      <div style={{fontSize:11,color:C.slate[400],marginTop:1}}>Drop · {dist} · {dur}</div>
    </div>
  </div>
);

const OTPCard = ({ label, code, type="pickup" }) => (
  <div style={{background:type==="pickup"?C.brand[50]:C.emerald[50],border:`1px solid ${type==="pickup"?C.brand[200]:C.emerald[200]}`,borderRadius:12,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <div>
      <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:type==="pickup"?C.brand[500]:C.emerald[600],marginBottom:4}}>{label}</div>
      <div style={{fontFamily:"monospace",fontSize:24,fontWeight:900,letterSpacing:"0.25em",color:type==="pickup"?C.brand[700]:C.emerald[700]}}>{code}</div>
    </div>
    {type==="pickup"?<Lock size={18} color={`${C.brand[400]}`} opacity={0.4}/>:<CheckCircle size={18} color={C.emerald[400]} opacity={0.4}/>}
  </div>
);

const Divider = ({my="12px"}) => <div style={{height:1,background:C.slate[100],margin:`${my} 0`}}/>;

const Section = ({ title, sub, action, children }) => (
  <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
      <div>
        <h2 style={{fontSize:16,fontWeight:800,color:C.slate[900]}}>{title}</h2>
        {sub && <p style={{fontSize:13,color:C.slate[400],marginTop:2}}>{sub}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   ONBOARDING FLOW
═══════════════════════════════════════════════════════════ */
const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ companyName:"", industry:"", city:"", employeeCount:"", adminName:"", adminEmail:"", adminPhone:"", plan:"professional" });
  const [creating, setCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const steps = [
    { title:"Company Info", desc:"Tell us about your organization" },
    { title:"Admin Setup", desc:"Who will manage the platform?" },
    { title:"Choose Plan", desc:"Pick the right tier for your fleet" },
    { title:"Workspace Creation", desc:"We're setting everything up" },
  ];

  const plans = [
    { id:"starter", name:"Starter", price:"$499", desc:"Up to 20 vehicles", features:["500 employees","2 admins","Basic analytics"] },
    { id:"professional", name:"Professional", price:"$1,299", desc:"Up to 100 vehicles", popular:true, features:["2,500 employees","10 admins","Live GPS tracking","ERP integration"] },
    { id:"enterprise", name:"Enterprise", price:"Custom", desc:"Unlimited", features:["Unlimited employees","Unlimited admins","Dedicated infra","Custom SLA"] },
  ];

  const handleNext = () => {
    if (step < 2) { setStep(s => s+1); return; }
    if (step === 2) {
      setStep(3);
      setCreating(true);
      const logItems = [
        "Registering company workspace…",
        "Provisioning isolated database…",
        "Configuring ERP connector…",
        "Setting up fleet management module…",
        "Creating admin account…",
        "Initializing GPS tracking service…",
        "Generating OTP security keys…",
        "Building analytics pipeline…",
        "Deploying AI scheduling engine…",
        "Workspace ready! ✓",
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLogs(l => [...l, logItems[i]]);
        setProgress(((i+1)/logItems.length)*100);
        i++;
        if (i >= logItems.length) {
          clearInterval(interval);
          setTimeout(() => onComplete({ ...form, companyId: "technova" }), 1000);
        }
      }, 400);
    }
  };

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg, ${C.slate[950]} 0%, #0f0a2e 60%, ${C.slate[900]} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",padding:24,overflow:"auto"}}>
      <GlobalStyles/>
      <div style={{position:"fixed",inset:0,backgroundImage:`radial-gradient(${C.brand[800]}18 1px, transparent 1px)`,backgroundSize:"28px 28px",pointerEvents:"none"}}/>
      <div style={{position:"fixed",top:"15%",left:"8%",width:320,height:320,background:C.brand[600],borderRadius:"50%",filter:"blur(110px)",opacity:0.08,pointerEvents:"none"}}/>
      <div style={{position:"fixed",bottom:"15%",right:"8%",width:260,height:260,background:C.violet[600],borderRadius:"50%",filter:"blur(100px)",opacity:0.08,pointerEvents:"none"}}/>

      <div style={{width:"100%",maxWidth:560,position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:48,height:48,background:C.brand[600],borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
            <Car size={24} color="white"/>
          </div>
          <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Cabinet Grotesk', sans-serif"}}>
            CorpCab<span style={{color:C.brand[400]}}>.OS</span>
          </div>
          <div style={{fontSize:13,color:C.slate[400],marginTop:4}}>Enterprise Fleet Management Platform</div>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:28}}>
          {steps.map((s,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all 0.3s",background:i<step?C.emerald[500]:i===step?C.brand[600]:C.slate[700],color:"white"}}>
                  {i<step?<Check size={13}/>:i+1}
                </div>
                <div style={{fontSize:10,fontWeight:700,color:i<=step?C.slate[200]:C.slate[500],whiteSpace:"nowrap"}}>{s.title}</div>
              </div>
              {i<steps.length-1 && <div style={{flex:1,height:1.5,background:i<step?C.emerald[500]:C.slate[700],margin:"0 6px",marginBottom:16,transition:"background 0.3s"}}/>}
            </div>
          ))}
        </div>

        <div style={{background:C.slate[800],border:`1px solid ${C.slate[700]}`,borderRadius:24,padding:32,backdropFilter:"blur(20px)"}}>
          {step===0 && (
            <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{marginBottom:4}}>
                <h2 style={{fontSize:20,fontWeight:900,color:"white"}}>Company Information</h2>
                <p style={{fontSize:13,color:C.slate[400],marginTop:4}}>Set up your organization's workspace</p>
              </div>
              {[
                { label:"Company Name", key:"companyName", placeholder:"e.g. TechNova Corp" },
                { label:"Industry", key:"industry", placeholder:"e.g. IT Services / BPO / Manufacturing" },
                { label:"City", key:"city", placeholder:"e.g. Hyderabad" },
                { label:"Approximate Employees", key:"employeeCount", placeholder:"e.g. 2000" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{display:"block",fontSize:12,fontWeight:700,color:C.slate[300],textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>{f.label}</label>
                  <input className="input" placeholder={f.placeholder} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={{background:C.slate[700],border:`1px solid ${C.slate[600]}`,color:"white"}} />
                </div>
              ))}
            </div>
          )}

          {step===1 && (
            <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{marginBottom:4}}>
                <h2 style={{fontSize:20,fontWeight:900,color:"white"}}>Admin Account</h2>
                <p style={{fontSize:13,color:C.slate[400],marginTop:4}}>This person will manage the platform</p>
              </div>
              {[
                { label:"Full Name", key:"adminName", placeholder:"e.g. Priya Mehta" },
                { label:"Work Email", key:"adminEmail", placeholder:"e.g. priya@company.com", type:"email" },
                { label:"Phone Number", key:"adminPhone", placeholder:"e.g. +91 98765 43210" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{display:"block",fontSize:12,fontWeight:700,color:C.slate[300],textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>{f.label}</label>
                  <input className="input" type={f.type||"text"} placeholder={f.placeholder} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={{background:C.slate[700],border:`1px solid ${C.slate[600]}`,color:"white"}}/>
                </div>
              ))}
              <div style={{background:C.slate[700],border:`1px solid ${C.slate[600]}`,borderRadius:12,padding:"12px 16px",display:"flex",gap:8,fontSize:12,color:C.slate[300]}}>
                <Info size={14} style={{flexShrink:0,marginTop:1}} color={C.sky[400]}/>
                You can add more admin accounts after setup from the Settings panel.
              </div>
            </div>
          )}

          {step===2 && (
            <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{marginBottom:4}}>
                <h2 style={{fontSize:20,fontWeight:900,color:"white"}}>Select Your Plan</h2>
                <p style={{fontSize:13,color:C.slate[400],marginTop:4}}>Each plan gets an isolated database instance</p>
              </div>
              {plans.map(p => (
                <div key={p.id} onClick={()=>setForm({...form,plan:p.id})} style={{padding:"16px 18px",borderRadius:14,border:`2px solid ${form.plan===p.id?C.brand[500]:C.slate[600]}`,background:form.plan===p.id?`${C.brand[900]}60`:C.slate[700],cursor:"pointer",transition:"all 0.15s",position:"relative"}}>
                  {p.popular && <div style={{position:"absolute",top:-10,right:14,background:C.brand[500],color:"white",fontSize:10,fontWeight:800,padding:"2px 10px",borderRadius:99,letterSpacing:"0.06em"}}>POPULAR</div>}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontWeight:800,fontSize:16,color:"white"}}>{p.name}</div>
                      <div style={{fontSize:12,color:C.slate[400],marginTop:2}}>{p.desc}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:20,fontWeight:900,color:"white"}}>{p.price}</div>
                      {p.price!=="Custom" && <div style={{fontSize:11,color:C.slate[400]}}>/ month</div>}
                    </div>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
                    {p.features.map(f=><span key={f} style={{fontSize:11,color:C.slate[300],background:C.slate[600],padding:"2px 8px",borderRadius:6}}>{f}</span>)}
                  </div>
                  {form.plan===p.id && <div style={{position:"absolute",top:14,right:14}}><Check size={16} color={C.brand[400]}/></div>}
                </div>
              ))}
            </div>
          )}

          {step===3 && (
            <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:20,alignItems:"center",textAlign:"center"}}>
              <div>
                <h2 style={{fontSize:20,fontWeight:900,color:"white"}}>Building Your Workspace</h2>
                <p style={{fontSize:13,color:C.slate[400],marginTop:4}}>Sit back — this takes about 10 seconds</p>
              </div>
              <div style={{position:"relative",width:100,height:100}}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke={C.slate[700]} strokeWidth="6"/>
                  <circle cx="50" cy="50" r="42" fill="none" stroke={C.brand[500]} strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${2*Math.PI*42}`} strokeDashoffset={`${2*Math.PI*42*(1-progress/100)}`}
                    transform="rotate(-90 50 50)" style={{transition:"stroke-dashoffset 0.4s ease"}}/>
                </svg>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"white"}}>{Math.round(progress)}%</div>
              </div>
              <div style={{width:"100%",background:C.slate[950],borderRadius:12,padding:"14px 16px",textAlign:"left",maxHeight:200,overflow:"auto",border:`1px solid ${C.slate[700]}`}}>
                {logs.map((l,i)=>(
                  <div key={i} style={{fontSize:12,fontFamily:"monospace",color:i===logs.length-1?C.emerald[400]:C.slate[400],padding:"2px 0",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:C.brand[500]}}>$</span> {l}
                  </div>
                ))}
                {creating && progress<100 && <div style={{fontSize:12,fontFamily:"monospace",color:C.brand[400],padding:"2px 0"}} className="ai-typing"/>}
              </div>
            </div>
          )}

          {step<3 && (
            <button className="btn-primary" onClick={handleNext} style={{width:"100%",marginTop:24,padding:"13px",fontSize:15,borderRadius:12}}>
              {step===2 ? "Create My Workspace →" : "Continue →"}
            </button>
          )}
        </div>

        {step<3 && (
          <p style={{textAlign:"center",fontSize:12,color:C.slate[500],marginTop:16}}>
            Already have an account?{" "}
            <span onClick={()=>onComplete({companyId:"technova"})} style={{color:C.brand[400],cursor:"pointer",fontWeight:700}}>
              Load Demo Workspace →
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ROLE LOGIN
═══════════════════════════════════════════════════════════ */
const RoleLogin = ({ company, onLogin, onBack }) => {
  const roles = [
    { role:"admin", icon:Shield, label:"Admin", sub:company.users.admin.name+" · "+company.users.admin.designation, color:C.brand[600] },
    { role:"employee", icon:User, label:"Employee", sub:company.users.employee.name+" · "+company.users.employee.dept, color:C.emerald[600] },
    { role:"driver", icon:Car, label:"Driver", sub:company.users.driver.name+" · "+company.users.driver.vehicle, color:C.violet[600] },
  ];
  return (
    <div style={{minHeight:"100vh",background:C.slate[50],display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <GlobalStyles/>
      <div style={{width:"100%",maxWidth:440}}>
        <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:600,color:C.slate[500],background:"none",border:"none",cursor:"pointer",marginBottom:24}}>
          <ArrowLeft size={14}/> Back to Onboarding
        </button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:52,height:52,background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",boxShadow:`0 8px 24px ${C.brand[600]}40`}}>
            <Car size={26} color="white"/>
          </div>
          <div style={{fontFamily:"'Cabinet Grotesk', sans-serif",fontSize:24,fontWeight:900,color:C.slate[900]}}>
            CorpCab<span style={{color:C.brand[600]}}>.OS</span>
          </div>
          <div style={{fontSize:13,color:C.slate[400],marginTop:4}}>{company.name} Workspace</div>
        </div>
        <div className="card" style={{padding:24}}>
          <div style={{fontSize:11,fontWeight:800,color:C.slate[400],textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>Sign in as</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {roles.map(r=>(
              <button key={r.role} onClick={()=>onLogin(r.role)}
                style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:12,border:`1px solid ${C.slate[200]}`,background:"white",cursor:"pointer",transition:"all 0.15s",textAlign:"left"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=r.color;e.currentTarget.style.background=`${r.color}06`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.slate[200];e.currentTarget.style.background="white";}}>
                <div style={{width:40,height:40,borderRadius:10,background:`${r.color}15`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <r.icon size={18} color={r.color}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:14,color:C.slate[900]}}>{r.label}</div>
                  <div style={{fontSize:12,color:C.slate[400],marginTop:1}}>{r.sub}</div>
                </div>
                <ChevronRight size={14} color={C.slate[300]}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   APP SHELL
═══════════════════════════════════════════════════════════ */
const AppShell = ({ user, company, onLogout, onBack, activeTab, onTab, notifCount, children }) => {
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const adminTabs = [
    { id:"dashboard", icon:BarChart3, label:"Dashboard" },
    { id:"assignments", icon:AlertTriangle, label:"Assignments" },
    { id:"fleet", icon:Car, label:"Fleet" },
    { id:"drivers", icon:Users, label:"Drivers" },
    { id:"analytics", icon:TrendingUp, label:"Analytics" },
    { id:"ai", icon:Brain, label:"AI Scheduler" },
    { id:"settings", icon:Settings, label:"Settings" },
  ];
  const empTabs = [
    { id:"home", icon:Car, label:"My Rides" },
    { id:"schedule", icon:Calendar, label:"Schedule" },
    { id:"ai", icon:Brain, label:"AI Scheduler" },
    { id:"history", icon:History, label:"History" },
  ];
  const drvTabs = [
    { id:"queue", icon:Activity, label:"Queue" },
    { id:"history", icon:History, label:"Trip Log" },
  ];
  const tabs = user.role==="admin"?adminTabs:user.role==="employee"?empTabs:drvTabs;

  const roleColor = user.role==="admin"?C.brand[600]:user.role==="employee"?C.emerald[600]:C.violet[600];

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <header style={{height:56,flexShrink:0,background:"white",borderBottom:`1px solid ${C.slate[200]}`,display:"flex",alignItems:"center",padding:"0 16px",gap:12,zIndex:30}}>
        <button onClick={onBack} style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${C.slate[200]}`,background:C.slate[50],color:C.slate[500],fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
          <ArrowLeft size={12}/> Exit
        </button>
        <button onClick={()=>setSideCollapsed(s=>!s)} style={{padding:6,borderRadius:8,border:"none",background:C.slate[100],cursor:"pointer",flexShrink:0}}>
          <MoreVertical size={14} color={C.slate[500]}/>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
          <div style={{width:30,height:30,background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Car size={15} color="white"/>
          </div>
          <span style={{fontWeight:900,fontSize:16,color:C.slate[900],whiteSpace:"nowrap"}}>CorpCab<span style={{color:C.brand[600]}}>.OS</span></span>
          <Badge color="brand">{company.plan}</Badge>
        </div>
        <div style={{position:"relative",flexShrink:0}}>
          <button onClick={()=>{setShowNotif(s=>!s);setShowProfile(false);}} style={{width:34,height:34,borderRadius:9,border:`1px solid ${C.slate[200]}`,background:C.slate[50],cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <Bell size={15} color={C.slate[500]}/>
            {notifCount>0 && <div style={{position:"absolute",top:6,right:6,width:7,height:7,borderRadius:"50%",background:C.rose[500],border:"1.5px solid white"}}/>}
          </button>
          {showNotif && (
            <div className="fade-in" style={{position:"absolute",right:0,top:"calc(100% + 6px)",width:300,background:"white",borderRadius:14,border:`1px solid ${C.slate[200]}`,boxShadow:"0 12px 40px rgba(0,0,0,0.12)",zIndex:200,overflow:"hidden"}}>
              <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.slate[100]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:800,fontSize:14}}>Notifications</span>
                <Badge color="brand">{notifCount} new</Badge>
              </div>
              {[
                {title:"Ride Confirmed",body:"Your 17:30 pickup is confirmed.",time:"2 min ago",read:false},
                {title:"Schedule Change",body:"Tomorrow's 09:00 shift updated to 09:15.",time:"1 hr ago",read:false},
                {title:"Trip Completed",body:"Yesterday's commute logged. Rate your ride!",time:"Yesterday",read:true},
              ].map((n,i)=>(
                <div key={i} style={{padding:"11px 16px",background:n.read?"white":C.brand[50],borderBottom:`1px solid ${C.slate[50]}`,display:"flex",gap:10}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:n.read?C.slate[300]:C.brand[500],marginTop:5,flexShrink:0}}/>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:C.slate[800]}}>{n.title}</div>
                    <div style={{fontSize:12,color:C.slate[500],lineHeight:1.4,marginTop:1}}>{n.body}</div>
                    <div style={{fontSize:11,color:C.slate[400],marginTop:3}}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{position:"relative",flexShrink:0}}>
          <button onClick={()=>{setShowProfile(s=>!s);setShowNotif(false);}} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 10px 4px 4px",borderRadius:10,border:`1px solid ${C.slate[200]}`,background:C.slate[50],cursor:"pointer"}}>
            <Avatar name={user.name} size={26} bg={roleColor}/>
            <span style={{fontSize:13,fontWeight:700,color:C.slate[700],maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name.split(" ")[0]}</span>
            <ChevronDown size={12} color={C.slate[400]}/>
          </button>
          {showProfile && (
            <div className="fade-in" style={{position:"absolute",right:0,top:"calc(100% + 6px)",width:200,background:"white",borderRadius:12,border:`1px solid ${C.slate[200]}`,boxShadow:"0 12px 40px rgba(0,0,0,0.12)",zIndex:200,padding:8}}>
              <div style={{padding:"8px 10px",marginBottom:4}}>
                <div style={{fontWeight:800,fontSize:13,color:C.slate[900]}}>{user.name}</div>
                <div style={{fontSize:11,color:C.slate[400],marginTop:1,textTransform:"capitalize"}}>{user.role} · {company.name}</div>
              </div>
              <Divider my="0"/>
              <button onClick={onLogout} style={{width:"100%",padding:"9px 10px",borderRadius:8,border:"none",background:"none",display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:C.rose[600],fontWeight:700,marginTop:4}}>
                <LogOut size={13}/> Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        <aside style={{width:sideCollapsed?56:200,flexShrink:0,background:"white",borderRight:`1px solid ${C.slate[200]}`,display:"flex",flexDirection:"column",padding:"12px 8px",transition:"width 0.2s",overflow:"hidden"}}>
          {tabs.map(t=>(
            <button key={t.id} className={`sidebar-item${activeTab===t.id?" active":""}`} onClick={()=>onTab(t.id)}>
              <t.icon size={16} color={activeTab===t.id?C.brand[600]:C.slate[400]} style={{flexShrink:0}}/>
              {!sideCollapsed && <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.label}</span>}
            </button>
          ))}
          <div style={{flex:1}}/>
          {!sideCollapsed && (
            <div style={{padding:"10px 12px",borderRadius:10,background:C.slate[50],border:`1px solid ${C.slate[100]}`}}>
              <div style={{fontSize:10,fontWeight:800,color:C.slate[400],textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>Workspace</div>
              <div style={{fontSize:12,fontWeight:800,color:C.slate[700],overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{company.name}</div>
              <div style={{fontSize:11,color:C.slate[400],marginTop:1}}>{company.employees.toLocaleString()} employees</div>
            </div>
          )}
        </aside>

        <main style={{flex:1,overflow:"auto",padding:20,minWidth:0}}>
          {children}
        </main>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   AI SCHEDULER
═══════════════════════════════════════════════════════════ */
const AIScheduler = ({ company, rides, setRides, userRole }) => {
  const [messages, setMessages] = useState([
    { role:"ai", text:`Hello! I'm your AI Fleet Scheduler for **${company.name}**.\n\nI can:\n• **Auto-book rides** — just tell me who, where, and when\n• **Check cab availability** in real-time\n• **Optimize routing** — pooling passengers on similar routes\n• **Analyze fleet utilization** and suggest improvements\n\nWhat would you like to do?`, ts:Date.now() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions] = useState([
    "Book a cab from Kondapur to Zone A tomorrow at 9 AM for 3 people",
    "Which cabs are available tonight after 6 PM?",
    "Optimize all pending ride requests",
    "Show me the most cost-effective routing plan for tomorrow morning",
  ]);
  const bottomRef = useRef(null);

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  const simulateAI = async (userMsg) => {
    setLoading(true);
    await new Promise(r=>setTimeout(r, 1200+Math.random()*800));

    const msg = userMsg.toLowerCase();
    let response = "";
    let action = null;

    if (msg.includes("book") || msg.includes("schedule") || msg.includes("cab for")) {
      const timeMatch = msg.match(/(\d{1,2})\s*(am|pm)/i);
      const timeStr = timeMatch ? timeMatch[0].toUpperCase() : "09:00 AM";
      const peopleMatch = msg.match(/(\d+)\s*people/i);
      const pax = peopleMatch ? parseInt(peopleMatch[1]) : 1;

      const available = company.fleet.filter(f=>f.status==="active" && f.cap>=pax);
      const best = available.sort((a,b)=>b.rating-a.rating)[0];

      response = `🔍 **Analyzing availability for ${pax} passenger(s)...**\n\n`;
      response += `✅ **Best match found:**\n`;
      response += `• **Vehicle:** ${best?.plate} (${best?.model})\n`;
      response += `• **Driver:** ${best?.driver} ⭐ ${best?.rating}\n`;
      response += `• **Capacity:** ${best?.cap} seats (${pax} requested — ${best?.cap-pax} seat(s) can be shared)\n\n`;
      response += `📍 **Route optimization:**\n`;
      response += `• Estimated distance: ~14.2 km\n`;
      response += `• Estimated duration: ~38 min (accounting for peak traffic)\n`;
      response += `• Routing via: NH-65 → Outer Ring Road → Zone A Gate 4\n\n`;
      response += `💡 **AI Suggestion:** I found 2 other employees with similar pickup zones. Pooling would **reduce cost by 35%**.\n\n`;
      response += `Shall I **confirm this booking** and send OTP codes to the employee?`;
      action = { type:"book_preview", cab:best, pax };
    } else if (msg.includes("available") || msg.includes("availability")) {
      const avail = company.fleet.filter(f=>f.status==="active");
      const maint = company.fleet.filter(f=>f.status==="maintenance");
      response = `📊 **Fleet Availability Report:**\n\n`;
      response += `**Active & Ready (${avail.length} vehicles):**\n`;
      avail.forEach(f=>{
        const occupied = rides.filter(r=>r.plate===f.plate && r.status==="IN_PROGRESS").length;
        response += `• ${f.plate} — ${f.driver} — ${occupied?"🔴 In progress":"🟢 Available"} — ${f.cap} seats\n`;
      });
      response += `\n**Under Maintenance (${maint.length}):**\n`;
      maint.forEach(f=>{ response += `• ${f.plate} — ${f.driver} — Est. return: Tomorrow\n`; });
      response += `\n🕐 **Peak demand window:** 8:30–9:30 AM & 5:30–7:00 PM\n`;
      response += `💡 Recommend pre-positioning **2 vehicles** near Kondapur by 8:15 AM.`;
    } else if (msg.includes("optim") || msg.includes("pending")) {
      const pending = rides.filter(r=>r.status==="REQUESTED");
      response = `🧠 **AI Route Optimization — ${pending.length} Pending Requests:**\n\n`;
      if (pending.length === 0) {
        response = "✅ No pending requests to optimize! All rides are assigned.";
      } else {
        pending.forEach((r,i) => {
          const cab = company.fleet.filter(f=>f.status==="active")[i%3];
          response += `**Request ${i+1}:** ${r.emp}\n`;
          response += `• Route: ${r.from} → ${r.to}\n`;
          response += `• Suggested: ${cab.plate} (${cab.driver})\n`;
          response += `• Pool opportunity: ${Math.random()>0.5?"Yes — matches 1 other pickup":"No direct match"}\n\n`;
        });
        response += `\n💰 **Cost savings with pooling: ₹2,840 (~23% reduction)**\n\nShall I **auto-assign all** with these suggestions?`;
        action = { type:"optimize_all" };
      }
    } else if (msg.includes("cost") || msg.includes("plan") || msg.includes("morning")) {
      response = `📅 **Tomorrow Morning Fleet Plan (AI Generated):**\n\n`;
      response += `**Wave 1 — 8:00–8:30 AM (High demand)**\n`;
      response += `• TS 09 EN 1234 → Kondapur + Miyapur (pool) → Zone A [6 pax]\n`;
      response += `• MH 12 XY 9012 → Banjara Hills → Zone B [4 pax]\n\n`;
      response += `**Wave 2 — 8:30–9:30 AM (Peak)**\n`;
      response += `• TS 08 AB 5678 → Secunderabad → Zone A [6 pax]\n`;
      response += `• AP 28 TZ 7890 → HITEC City → Zone C [5 pax]\n\n`;
      response += `**Estimated metrics:**\n`;
      response += `• Total rides: 28 | Passengers: 47\n`;
      response += `• Fleet utilization: 94%\n`;
      response += `• Cost vs individual cabs: **₹12,400 saved (41%)**\n`;
      response += `• Avg wait time: 4.2 min\n\n`;
      response += `📌 One vehicle (KA 01 MN 3456) is in maintenance — plan accounts for this.`;
    } else if (msg.includes("confirm") || msg.includes("yes") || msg.includes("proceed")) {
      const newRide = {
        id:"ai_"+Date.now(), emp:"Alice Smith", empId:"e1",
        driver:company.fleet[0].driver, dId:company.fleet[0].driverId,
        plate:company.fleet[0].plate, from:"Kondapur", to:"Zone A",
        status:"SCHEDULED", date:"Tomorrow", time:"09:00",
        otp1:Math.floor(1000+Math.random()*9000).toString(),
        otp2:Math.floor(1000+Math.random()*9000).toString(),
        dist:"14.2 km", dur:"38 min", pax:1, shared:[]
      };
      setRides(r=>[...r,newRide]);
      response = `✅ **Ride booked successfully!**\n\n`;
      response += `• **ID:** ${newRide.id}\n`;
      response += `• **Vehicle:** ${newRide.plate}\n`;
      response += `• **Driver:** ${newRide.driver}\n`;
      response += `• **Pickup OTP:** \`${newRide.otp1}\`\n`;
      response += `• **Drop OTP:** \`${newRide.otp2}\`\n\n`;
      response += `📱 OTP codes sent to employee's registered number. Driver notified.\n`;
      response += `📍 Tracking will go live 15 minutes before pickup.`;
    } else {
      response = `I understand you're asking about: *"${userMsg}"*\n\nI can help you with:\n• **Booking rides** — "Book a cab from X to Y at 9 AM"\n• **Checking availability** — "Which cabs are available tonight?"\n• **Optimizing routes** — "Optimize all pending requests"\n• **Fleet planning** — "Show tomorrow's morning plan"\n\nTry one of those prompts or ask me anything about your fleet!`;
    }

    setLoading(false);
    setMessages(m=>[...m, { role:"ai", text:response, ts:Date.now(), action }]);
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    setMessages(m=>[...m, { role:"user", text:msg, ts:Date.now() }]);
    simulateAI(msg);
  };

  const renderText = (text) => {
    return text.split("\n").map((line,i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      const code = bold.replace(/`(.*?)`/g, `<code style="background:${C.brand[50]};color:${C.brand[700]};padding:1px 6px;border-radius:4px;font-family:monospace;font-size:13px">$1</code>`);
      return <div key={i} style={{lineHeight:1.65,minHeight:line?"auto":"8px"}} dangerouslySetInnerHTML={{__html:code||"&nbsp;"}}/>;
    });
  };

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",gap:0}}>
      <div style={{marginBottom:16,padding:"0 0 14px",borderBottom:`1px solid ${C.slate[200]}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Brain size={18} color="white"/>
          </div>
          <div>
            <h1 style={{fontSize:17,fontWeight:900,color:C.slate[900]}}>AI Fleet Scheduler</h1>
            <p style={{fontSize:12,color:C.slate[400]}}>Powered by CorpCab Intelligence Engine</p>
          </div>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,color:C.emerald[600]}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:C.emerald[500],animation:"pulse 2s infinite"}}/>
            AI Online
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
        {suggestions.map((s,i)=>(
          <button key={i} onClick={()=>{setInput(s);}} style={{padding:"6px 12px",borderRadius:99,border:`1px solid ${C.brand[200]}`,background:C.brand[50],color:C.brand[700],fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
            {s}
          </button>
        ))}
      </div>

      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:14,paddingRight:4}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",flexDirection:m.role==="user"?"row-reverse":"row"}} className="fade-up">
            {m.role==="ai" && (
              <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                <Bot size={14} color="white"/>
              </div>
            )}
            <div style={{maxWidth:"80%",padding:"12px 16px",borderRadius:m.role==="user"?"16px 4px 16px 16px":"4px 16px 16px 16px",background:m.role==="user"?C.brand[600]:"white",color:m.role==="user"?"white":C.slate[700],border:m.role==="ai"?`1px solid ${C.slate[200]}`:"none",fontSize:14,lineHeight:1.6}}>
              {renderText(m.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Bot size={14} color="white"/>
            </div>
            <div style={{padding:"12px 16px",borderRadius:"4px 16px 16px 16px",background:"white",border:`1px solid ${C.slate[200]}`,display:"flex",alignItems:"center",gap:8}}>
              <Loader size={14} color={C.brand[500]} style={{animation:"spin 1s linear infinite"}}/>
              <span style={{fontSize:13,color:C.slate[400]}}>Analyzing fleet data…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      <div style={{marginTop:12,display:"flex",gap:8,borderTop:`1px solid ${C.slate[200]}`,paddingTop:12}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSend()} placeholder="Ask me to book, check availability, optimize routes…" className="input" style={{flex:1}}/>
        <button onClick={handleSend} disabled={!input.trim()||loading} className="btn-primary" style={{padding:"10px 16px",borderRadius:10,display:"flex",alignItems:"center",gap:6,opacity:(!input.trim()||loading)?0.5:1}}>
          <Send size={14}/> Send
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   RADAR WIDGET
═══════════════════════════════════════════════════════════ */
const RadarWidget = ({ liveRides, fleet }) => {
  const [tick, setTick] = useState(0);
  useEffect(()=>{ const id=setInterval(()=>setTick(t=>t+1),1400); return()=>clearInterval(id); },[]);
  const dots = liveRides.slice(0,4).map((r,i)=>({
    x:28+(i*22)+Math.sin(tick*0.35+i*1.5)*5,
    y:22+(i*18)+Math.cos(tick*0.3+i*2)*4,
    plate:r.plate,
  }));
  return (
    <div style={{background:C.slate[900],borderRadius:14,overflow:"hidden",border:`1px solid ${C.slate[700]}`}}>
      <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.slate[700]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:7,color:"white",fontWeight:800,fontSize:13}}>
          <Radio size={13} color={C.emerald[400]}/> Fleet Radar
        </div>
        <div style={{fontSize:11,fontWeight:700,color:C.emerald[400],display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:C.emerald[400],animation:"pulse 1.5s infinite"}}/>
          {liveRides.length} live
        </div>
      </div>
      <div style={{position:"relative",height:160,overflow:"hidden",background:`radial-gradient(circle at 50% 50%,${C.slate[800]},${C.slate[950]})`}}>
        {[35,55,75].map(r=>(
          <div key={r} style={{position:"absolute",top:`${50-r/2}%`,left:`${50-r/2}%`,width:`${r}%`,height:`${r}%`,border:`1px solid ${C.slate[700]}33`,borderRadius:"50%",pointerEvents:"none"}}/>
        ))}
        <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:`${C.slate[600]}30`}}/>
        <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`${C.slate[600]}30`}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",width:2,height:"38%",background:`linear-gradient(transparent,${C.emerald[400]}60)`,transformOrigin:"top center",transform:`translateX(-50%) rotate(${tick*18}deg)`,transition:"transform 0.5s linear"}}/>
        {dots.map((d,i)=>(
          <div key={i} style={{position:"absolute",left:`${d.x}%`,top:`${d.y}%`,transform:"translate(-50%,-50%)",transition:"left 0.8s ease,top 0.8s ease"}}>
            <div style={{background:C.brand[600],width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 10px ${C.brand[600]}90`,border:`1.5px solid ${C.brand[400]}`}}>
              <Car size={10} color="white"/>
            </div>
            <div style={{position:"absolute",top:24,left:"50%",transform:"translateX(-50%)",background:C.slate[800],borderRadius:5,padding:"2px 6px",whiteSpace:"nowrap",fontSize:9,color:C.slate[300],fontWeight:700,border:`1px solid ${C.slate[600]}`}}>
              {d.plate?.slice(0,8)}
            </div>
          </div>
        ))}
        {liveRides.length===0 && <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:C.slate[500]}}>No active rides</div>}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ADMIN VIEWS
═══════════════════════════════════════════════════════════ */
const AdminDashboard = ({ company, rides, onTab }) => {
  const live = rides.filter(r=>r.status==="IN_PROGRESS");
  const pending = rides.filter(r=>r.status==="REQUESTED");
  const scheduled = rides.filter(r=>r.status==="SCHEDULED");
  const completed = rides.filter(r=>r.status==="COMPLETED");

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:C.slate[900]}}>Operations Dashboard</h1>
          <p style={{fontSize:13,color:C.slate[400],marginTop:2}}>{company.name} · Live overview</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12,padding:"7px 12px",display:"flex",alignItems:"center",gap:5}}><RefreshCw size={12}/> Refresh</button>
          <button className="btn-ghost" style={{fontSize:12,padding:"7px 12px",display:"flex",alignItems:"center",gap:5}}><Download size={12}/> Export</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        <Metric icon={Car} label="Total Fleet" value={company.fleet.length} sub={`${company.fleet.filter(f=>f.status==="active").length} active`} accent={C.brand[600]} onClick={()=>onTab("fleet")}/>
        <Metric icon={Activity} label="Live Rides" value={live.length} accent={C.emerald[600]}/>
        <Metric icon={AlertTriangle} label="Pending" value={pending.length} accent={C.amber[600]} onClick={()=>onTab("assignments")}/>
        <Metric icon={CheckCircle} label="Completed" value={completed.length} accent={C.violet[600]}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.slate[100]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:800,fontSize:14,color:C.slate[800]}}>Scheduled Today</span>
              <Badge color="sky">{scheduled.length}</Badge>
            </div>
            {scheduled.length===0 ? <div style={{padding:24,textAlign:"center",fontSize:13,color:C.slate[400]}}>No scheduled rides</div>
            : scheduled.map(r=>(
              <div key={r.id} style={{padding:"12px 16px",borderBottom:`1px solid ${C.slate[50]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <Avatar name={r.emp} size={30}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:C.slate[800]}}>{r.emp}</div>
                    <div style={{fontSize:11,color:C.slate[400]}}>{r.from} → {r.to}</div>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:700,fontSize:12,color:C.slate[700]}}>{r.time}</div>
                  <div style={{fontSize:11,color:C.slate[400]}}>{r.plate||"Unassigned"}</div>
                </div>
              </div>
            ))}
          </div>
          {pending.length>0 && (
            <div style={{background:`linear-gradient(135deg,${C.amber[500]},${C.orange[500]})`,borderRadius:14,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:800,fontSize:15,color:"white"}}>{pending.length} rides need assignment</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:2}}>Assign drivers manually or use AI Scheduler</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>onTab("assignments")} style={{padding:"8px 14px",borderRadius:9,border:"none",background:"rgba(255,255,255,0.2)",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>Assign Now</button>
                <button onClick={()=>onTab("ai")} style={{padding:"8px 14px",borderRadius:9,border:"none",background:"white",color:C.orange[600],fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                  <Brain size={12}/> Use AI
                </button>
              </div>
            </div>
          )}
          {live.length>0 && (
            <div style={{background:`linear-gradient(135deg,${C.emerald[600]},${C.sky[600]})`,borderRadius:14,padding:"16px 20px",color:"white"}}>
              <div style={{fontWeight:800,fontSize:14,marginBottom:12,display:"flex",alignItems:"center",gap:7}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:"white",animation:"pulse 1.5s infinite"}}/>
                Live in Progress
              </div>
              {live.map(r=>(
                <div key={r.id} style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 14px",marginBottom:6,backdropFilter:"blur(8px)"}}>
                  <div style={{fontWeight:700,fontSize:13}}>{r.emp}</div>
                  <div style={{fontSize:11,opacity:0.8,marginTop:2}}>{r.from} → {r.to} · {r.plate}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <RadarWidget liveRides={live} fleet={company.fleet}/>
          <div className="card" style={{padding:14}}>
            <div style={{fontWeight:800,fontSize:13,color:C.slate[800],marginBottom:10}}>Fleet Status</div>
            {company.fleet.map(car=>(
              <div key={car.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.slate[50]}`}}>
                <div style={{fontSize:12,fontWeight:700,color:C.slate[600],overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:110}}>{car.plate}</div>
                <Pill status={car.status}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminAssignments = ({ company, rides, setRides }) => {
  const pending = rides.filter(r=>r.status==="REQUESTED");
  const [sel, setSel] = useState({});

  const assign = (rideId) => {
    const cabId = sel[rideId];
    if(!cabId) return;
    const cab = company.fleet.find(c=>c.id===cabId);
    setRides(rides.map(r=>r.id===rideId?{...r,driver:cab.driver,dId:cab.driverId,plate:cab.plate,status:"SCHEDULED"}:r));
  };

  return (
    <Section title="Ride Assignments" sub={`${pending.length} pending request(s)`}>
      {pending.length===0 ? (
        <div className="card" style={{padding:48,textAlign:"center"}}>
          <CheckCircle size={32} color={C.emerald[300]}/>
          <div style={{fontSize:15,fontWeight:700,color:C.slate[400],marginTop:12}}>All requests assigned</div>
        </div>
      ) : pending.map(req=>(
        <div key={req.id} className="card" style={{padding:"18px 20px",border:`1px solid ${C.amber[200]}`,background:C.amber[50]}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <Avatar name={req.emp} size={42}/>
              <div>
                <div style={{fontWeight:800,fontSize:15,color:C.slate[900]}}>{req.emp}</div>
                <div style={{fontSize:13,color:C.slate[500],marginTop:2}}>{req.from} → {req.to}</div>
                <div style={{display:"flex",gap:8,marginTop:6}}>
                  <Badge color="amber"><Calendar size={9}/> {req.date} · {req.time}</Badge>
                  <Badge color="slate">{req.dist}</Badge>
                  {req.pax>1 && <Badge color="sky">{req.pax} pax</Badge>}
                </div>
              </div>
            </div>
            <Pill status="REQUESTED"/>
          </div>
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
            <select value={sel[req.id]||""} onChange={e=>setSel({...sel,[req.id]:e.target.value})} className="input" style={{flex:1,minWidth:200}}>
              <option value="">Select vehicle & driver…</option>
              {company.fleet.filter(f=>f.status==="active").map(car=>(
                <option key={car.id} value={car.id}>{car.plate} · {car.driver} ({car.cap} seats)</option>
              ))}
            </select>
            <button onClick={()=>assign(req.id)} disabled={!sel[req.id]} className="btn-primary" style={{opacity:sel[req.id]?1:0.5,whiteSpace:"nowrap"}}>Assign</button>
          </div>
        </div>
      ))}
    </Section>
  );
};

const AdminFleet = ({ company, rides }) => (
  <Section title="Fleet Registry" sub={`${company.fleet.length} vehicles`}
    action={<button className="btn-primary" style={{display:"flex",alignItems:"center",gap:6,fontSize:13}}><Plus size={13}/> Add Vehicle</button>}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
      {company.fleet.map(car=>{
        const carRides = rides.filter(r=>r.plate===car.plate&&r.status==="COMPLETED");
        return (
          <div key={car.id} className="card hover-lift" style={{overflow:"hidden"}}>
            <div style={{background:car.status==="maintenance"?C.amber[50]:C.slate[50],padding:"12px 16px",borderBottom:`1px solid ${C.slate[100]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:900,fontSize:14,color:C.slate[900]}}>{car.plate}</span>
              <Pill status={car.status}/>
            </div>
            <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[["Model",car.model],["Fuel",car.fuel],["Seats",`${car.cap} seats`],["Trips",car.trips],["Rating",`★ ${car.rating}`]].map(([l,v])=>(
                  <div key={l}>
                    <div style={{fontSize:10,color:C.slate[400],fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>{l}</div>
                    <div style={{fontSize:13,fontWeight:700,color:C.slate[700],marginTop:2}}>{v}</div>
                  </div>
                ))}
              </div>
              <Divider my="4px"/>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <Avatar name={car.driver} size={28} bg={C.violet[600]}/>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.slate[800]}}>{car.driver}</div>
                  <div style={{fontSize:11,color:C.slate[400]}}>Assigned driver</div>
                </div>
              </div>
              {carRides[0] && <div style={{background:C.slate[50],borderRadius:8,padding:"8px 10px",fontSize:11,color:C.slate[500]}}><span style={{fontWeight:700,color:C.slate[700]}}>{carRides[0].emp}</span> · {carRides[0].date}</div>}
            </div>
          </div>
        );
      })}
    </div>
  </Section>
);

const AdminDrivers = ({ company, rides }) => {
  const [sel, setSel] = useState(null);
  if(sel) {
    const driverRides = rides.filter(r=>r.dId===sel.driverId);
    return (
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <button onClick={()=>setSel(null)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:700,color:C.slate[500],border:"none",background:"none",cursor:"pointer"}}>
          <ArrowLeft size={13}/> Back to Directory
        </button>
        <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div className="card" style={{padding:20,textAlign:"center"}}>
              <Avatar name={sel.driver} size={60} bg={C.violet[600]}/>
              <div style={{fontWeight:900,fontSize:18,color:C.slate[900],marginTop:12}}>{sel.driver}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:14}}>
                <div style={{background:C.slate[50],borderRadius:10,padding:"10px 6px"}}>
                  <div style={{fontSize:20,fontWeight:900,color:C.slate[900]}}>{sel.rating}</div>
                  <div style={{fontSize:10,color:C.slate[400],marginTop:1}}>Rating</div>
                </div>
                <div style={{background:C.slate[50],borderRadius:10,padding:"10px 6px"}}>
                  <div style={{fontSize:20,fontWeight:900,color:C.slate[900]}}>{sel.trips}</div>
                  <div style={{fontSize:10,color:C.slate[400],marginTop:1}}>Trips</div>
                </div>
              </div>
            </div>
            <div className="card" style={{padding:16}}>
              {[["Vehicle",sel.plate],["Model",sel.model],["Fuel",sel.fuel],["Capacity",`${sel.cap} seats`]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.slate[50]}`}}>
                  <span style={{fontSize:12,color:C.slate[500]}}>{l}</span>
                  <span style={{fontSize:12,fontWeight:700,color:C.slate[800]}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.slate[100]}`,fontWeight:800,fontSize:14,color:C.slate[800]}}>Activity Log</div>
            {driverRides.length===0 ? <div style={{padding:32,textAlign:"center",color:C.slate[400],fontSize:13}}>No rides found</div>
            : driverRides.map(r=>(
              <div key={r.id} style={{padding:"12px 18px",borderBottom:`1px solid ${C.slate[50]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:C.slate[800]}}>{r.emp}</div>
                  <div style={{fontSize:11,color:C.slate[400],marginTop:2}}>{r.from} → {r.to} · {r.date}</div>
                </div>
                <Pill status={r.status}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Section title="Driver Directory" sub={`${company.fleet.length} drivers`}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
        {company.fleet.map(car=>(
          <div key={car.id} className="card hover-lift" style={{overflow:"hidden",cursor:"pointer"}} onClick={()=>setSel(car)}>
            <div style={{height:56,background:`linear-gradient(135deg,${C.slate[800]},${C.slate[700]})`}}/>
            <div style={{padding:"0 16px 18px",marginTop:-24}}>
              <Avatar name={car.driver} size={48} bg={C.violet[600]}/>
              <div style={{fontWeight:800,fontSize:16,color:C.slate[900],marginTop:10}}>{car.driver}</div>
              <div style={{fontSize:12,color:C.slate[400],marginTop:3,display:"flex",alignItems:"center",gap:4}}>
                <Star size={11} color={C.amber[500]}/> {car.rating} · {car.trips} trips
              </div>
              <div style={{background:C.slate[50],borderRadius:10,padding:"10px 12px",marginTop:12,display:"flex",justifyContent:"space-between"}}>
                <div><div style={{fontSize:10,color:C.slate[400]}}>Vehicle</div><div style={{fontSize:12,fontWeight:700,color:C.slate[700],marginTop:1}}>{car.plate.slice(0,9)}</div></div>
                <Pill status={car.status}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const AdminAnalytics = () => {
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const vals=[42,55,61,49,70,38,21];
  const max=Math.max(...vals);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:C.slate[900]}}>Analytics Dashboard</h1>
          <p style={{fontSize:13,color:C.slate[400],marginTop:2}}>Month-to-date metrics</p>
        </div>
        <button className="btn-ghost" style={{fontSize:12,padding:"7px 12px",display:"flex",alignItems:"center",gap:5}}><Download size={12}/> Export</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        <Metric icon={TrendingUp} label="Bookings MTD" value="4,270" accent={C.brand[600]}/>
        <Metric icon={Star} label="Avg Rating" value="4.85" accent={C.amber[600]}/>
        <Metric icon={DollarSign} label="Cost Saved" value="₹2.8L" accent={C.emerald[600]}/>
        <Metric icon={Percent} label="On-Time Rate" value="93.2%" accent={C.violet[600]}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16}}>
        <div className="card" style={{padding:20}}>
          <div style={{fontWeight:800,fontSize:14,color:C.slate[800],marginBottom:16}}>Weekly Ride Volume</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:10,height:120}}>
            {vals.map((v,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <div style={{fontSize:11,fontWeight:700,color:C.slate[400]}}>{v}</div>
                <div style={{width:"100%",background:i===4?C.brand[600]:`${C.brand[600]}60`,borderRadius:"5px 5px 0 0",height:`${(v/max)*90}px`,transition:"height 0.5s ease"}}/>
                <div style={{fontSize:11,color:C.slate[400]}}>{days[i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div className="card" style={{padding:16}}>
            <div style={{fontWeight:800,fontSize:13,color:C.slate[800],marginBottom:12}}>KPIs</div>
            {[["Compliance",96.4,C.brand[600]],["On-Time",93.2,C.emerald[600]],["Cancel Rate",1.8,C.rose[500]]].map(([l,v,col])=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:700,marginBottom:5}}>
                  <span style={{color:C.slate[600]}}>{l}</span><span style={{color:C.slate[700]}}>{v}%</span>
                </div>
                <div style={{height:5,background:C.slate[100],borderRadius:99,overflow:"hidden"}}>
                  <div style={{width:`${v}%`,height:"100%",background:col,borderRadius:99}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,borderRadius:14,padding:18,color:"white"}}>
            <div style={{fontSize:11,fontWeight:700,opacity:0.8,marginBottom:4}}>Driver Retention</div>
            <div style={{fontSize:34,fontWeight:900}}>98.5%</div>
            <div style={{fontSize:12,opacity:0.7,marginTop:3}}>Avg tenure: 2.1 yrs</div>
          </div>
        </div>
      </div>
      <div className="card" style={{padding:20}}>
        <div style={{fontWeight:800,fontSize:14,color:C.slate[800],marginBottom:14}}>Top Routes (MTD)</div>
        {[["Kondapur → Zone A",312,68],["Miyapur → Zone B",245,53],["Airport → Zone A",180,39],["Banjara Hills → Zone B",142,31]].map(([r,c,p])=>(
          <div key={r} style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:600,marginBottom:6}}>
              <span style={{color:C.slate[700]}}>{r}</span>
              <span style={{color:C.slate[400]}}>{c} rides</span>
            </div>
            <div style={{height:5,background:C.slate[100],borderRadius:99,overflow:"hidden"}}>
              <div style={{width:`${p}%`,height:"100%",background:C.brand[500],borderRadius:99}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminSettings = ({ adminSettings, setAdminSettings }) => {
  const [saved, setSaved] = useState(false);
  return (
    <div style={{maxWidth:600,display:"flex",flexDirection:"column",gap:14}}>
      <div>
        <h1 style={{fontSize:20,fontWeight:900,color:C.slate[900]}}>Settings & Policies</h1>
        <p style={{fontSize:13,color:C.slate[400],marginTop:2}}>Platform-wide configuration</p>
      </div>
      {saved && <div style={{background:C.emerald[50],border:`1px solid ${C.emerald[200]}`,borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:700,color:C.emerald[700]}}><CheckCircle size={14}/> Saved!</div>}
      <div className="card" style={{padding:18}}>
        <div style={{fontWeight:800,fontSize:14,color:C.slate[800],marginBottom:14}}>Shift Timing Mode</div>
        {[["STRICT","Strict — Admin controls all scheduling"],["OPEN","Open — Employees self-schedule"],["HYBRID","Hybrid — Within admin time windows"]].map(([val,desc])=>(
          <label key={val} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 12px",borderRadius:10,border:`1.5px solid ${adminSettings.mode===val?C.brand[400]:C.slate[200]}`,background:adminSettings.mode===val?C.brand[50]:"white",cursor:"pointer",marginBottom:8,transition:"all 0.15s"}}>
            <input type="radio" checked={adminSettings.mode===val} onChange={()=>setAdminSettings({...adminSettings,mode:val})}/>
            <div>
              <div style={{fontWeight:800,fontSize:13,color:C.slate[800]}}>{val}</div>
              <div style={{fontSize:12,color:C.slate[500]}}>{desc}</div>
            </div>
          </label>
        ))}
      </div>
      {[["OTP Verification","Require OTP at pickup and drop","otp"],["Ride Sharing","Allow pooling on similar routes","sharing"],["AI Auto-Assign","Let AI scheduler auto-assign pending rides","aiAssign"]].map(([t,d,k])=>(
        <div key={k} className="card" style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontWeight:800,fontSize:14,color:C.slate[800]}}>{t}</div>
            <div style={{fontSize:12,color:C.slate[500],marginTop:2}}>{d}</div>
          </div>
          <button onClick={()=>setAdminSettings({...adminSettings,[k]:!adminSettings[k]})} style={{border:"none",background:"none",cursor:"pointer"}}>
            {adminSettings[k]!==false?<ToggleRight size={30} color={C.brand[600]}/>:<ToggleLeft size={30} color={C.slate[300]}/>}
          </button>
        </div>
      ))}
      <div className="card" style={{padding:"14px 18px",background:C.rose[50],border:`1px solid ${C.rose[200]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontWeight:800,fontSize:14,color:C.rose[800]}}>Emergency Stop All</div>
          <div style={{fontSize:12,color:C.rose[600],marginTop:2}}>Halt all active rides immediately</div>
        </div>
        <button style={{padding:"8px 16px",borderRadius:9,background:C.rose[600],color:"white",border:"none",fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
          <AlertTriangle size={12}/> Stop All
        </button>
      </div>
      <button className="btn-primary" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500);}} style={{alignSelf:"flex-start",padding:"11px 26px"}}>Save Settings</button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   EMPLOYEE VIEWS
═══════════════════════════════════════════════════════════ */
const EmployeeHome = ({ user, company, rides }) => {
  const myRides = rides.filter(r=>r.empId===user.id&&r.status!=="COMPLETED");
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:16}}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,borderRadius:18,padding:"22px 26px",color:"white"}}>
          <div style={{fontSize:20,fontWeight:900,marginBottom:3}}>Hi, {user.name.split(" ")[0]} 👋</div>
          <div style={{fontSize:13,opacity:0.8}}>{user.dept} · {user.shift}</div>
          <div style={{display:"flex",gap:12,marginTop:16}}>
            <div style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 16px"}}>
              <div style={{fontSize:20,fontWeight:900}}>{myRides.length}</div>
              <div style={{fontSize:11,opacity:0.8,marginTop:1}}>Upcoming</div>
            </div>
            <div style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 16px"}}>
              <div style={{fontSize:20,fontWeight:900}}>4.9 ★</div>
              <div style={{fontSize:11,opacity:0.8,marginTop:1}}>My Rating</div>
            </div>
          </div>
        </div>
        {myRides.length===0 ? (
          <div className="card" style={{padding:40,textAlign:"center"}}><Car size={32} color={C.slate[300]}/><div style={{fontSize:14,color:C.slate[400],marginTop:10}}>No upcoming rides</div></div>
        ) : myRides.map(ride=>{
          const driver = company.fleet.find(f=>f.driverId===ride.dId);
          return (
            <div key={ride.id} className="card" style={{overflow:"hidden"}}>
              <div style={{padding:"11px 16px",background:C.slate[50],borderBottom:`1px solid ${C.slate[100]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:7,fontSize:13,fontWeight:700,color:C.slate[600]}}>
                  <Clock size={13}/> {ride.date} · {ride.time}
                </div>
                <Pill status={ride.status}/>
              </div>
              <div style={{padding:"16px 20px"}}>
                <RouteViz from={ride.from} to={ride.to} time={ride.time} dist={ride.dist} dur={ride.dur}/>
              </div>
              {driver ? (
                <div style={{padding:"12px 20px",borderTop:`1px solid ${C.slate[100]}`,background:C.slate[50],display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:9}}>
                    <Avatar name={driver.driver} size={30} bg={C.violet[600]}/>
                    <div>
                      <div style={{fontWeight:700,fontSize:13,color:C.slate[800]}}>{driver.driver}</div>
                      <div style={{fontSize:11,color:C.slate[400]}}>★ {driver.rating} · {ride.plate}</div>
                    </div>
                  </div>
                  <button style={{padding:"5px 12px",borderRadius:8,border:`1px solid ${C.slate[200]}`,background:"white",fontSize:12,fontWeight:600,cursor:"pointer",color:C.slate[600]}}>
                    <Phone size={11} style={{verticalAlign:"middle",marginRight:4}}/> Call
                  </button>
                </div>
              ) : (
                <div style={{padding:"10px 20px",borderTop:`1px solid ${C.amber[200]}`,background:C.amber[50],fontSize:12,color:C.amber[700],fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
                  <AlertCircle size={12}/> Awaiting admin assignment
                </div>
              )}
              <div style={{padding:"14px 20px",borderTop:`1px solid ${C.slate[100]}`,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <OTPCard label="Pickup OTP" code={ride.otp1} type="pickup"/>
                <OTPCard label="Drop OTP" code={ride.otp2} type="drop"/>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <RadarWidget liveRides={rides.filter(r=>r.status==="IN_PROGRESS")} fleet={company.fleet}/>
        <div className="card" style={{padding:16}}>
          <div style={{fontWeight:800,fontSize:13,color:C.slate[800],marginBottom:12}}>My Profile</div>
          {[[Hash,user.erpId],[Mail,user.email],[Phone,user.phone],[Clock,user.shift]].map(([Icon,val],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
              <Icon size={12} color={C.slate[400]}/>
              <div style={{fontSize:12,color:C.slate[600],overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EmployeeSchedule = ({ user, rides, setRides }) => {
  const [form, setForm] = useState({date:"",time:"",from:"",to:""});
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setRides(r=>[...r,{id:"r"+Date.now(),emp:user.name,empId:user.id,driver:null,dId:null,plate:null,from:form.from,to:form.to,status:"REQUESTED",date:form.date,time:form.time,otp1:Math.floor(1000+Math.random()*9000)+"",otp2:Math.floor(1000+Math.random()*9000)+"",dist:"Calculating",dur:"—",pax:1,shared:[]}]);
    setDone(true); setTimeout(()=>{setDone(false);setForm({date:"",time:"",from:"",to:""});},3000);
  };
  return (
    <div style={{maxWidth:520}}>
      <div style={{marginBottom:18}}>
        <h1 style={{fontSize:20,fontWeight:900,color:C.slate[900]}}>Schedule a Ride</h1>
        <p style={{fontSize:13,color:C.slate[400],marginTop:2}}>Submit a commute request — admin assigns your driver</p>
      </div>
      {done && <div style={{background:C.emerald[50],border:`1px solid ${C.emerald[200]}`,borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:9,fontSize:13,fontWeight:700,color:C.emerald[700]}}><CheckCircle size={14}/> Ride request submitted!</div>}
      <div className="card" style={{padding:24}}>
        <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["Date","date","date"],["Time","time","time"]].map(([l,t,k])=>(
              <div key={k}>
                <label style={{display:"block",fontSize:11,fontWeight:800,color:C.slate[500],textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{l}</label>
                <input required type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="input"/>
              </div>
            ))}
          </div>
          {[["Pickup Location","from","e.g. Kondapur, Hyderabad"],["Drop Location","to","e.g. Zone A"]].map(([l,k,ph])=>(
            <div key={k}>
              <label style={{display:"block",fontSize:11,fontWeight:800,color:C.slate[500],textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{l}</label>
              <input required type="text" placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="input"/>
            </div>
          ))}
          <div style={{background:C.sky[50],border:`1px solid ${C.sky[200]}`,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.sky[700],display:"flex",gap:7}}>
            <Info size={13} style={{flexShrink:0,marginTop:1}}/> OTPs are generated after driver assignment.
          </div>
          <button type="submit" className="btn-primary" style={{padding:"12px",fontSize:15,borderRadius:11}}>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

const EmployeeHistory = ({ user, rides, company }) => {
  const hist = rides.filter(r=>r.empId===user.id&&r.status==="COMPLETED");
  return (
    <Section title="Trip History" sub={`${hist.length} completed trips`}>
      {hist.length===0 ? <div className="card" style={{padding:40,textAlign:"center"}}><History size={28} color={C.slate[300]}/><div style={{fontSize:14,color:C.slate[400],marginTop:10}}>No trips yet</div></div>
      : hist.map(r=>(
        <div key={r.id} className="card" style={{padding:"14px 18px",display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:36,height:36,borderRadius:9,background:C.emerald[50],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <CheckCircle size={16} color={C.emerald[600]}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:13,color:C.slate[800],overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.from} → {r.to}</div>
            <div style={{fontSize:11,color:C.slate[400],marginTop:2}}>{r.date} · {r.time} · {company.fleet.find(f=>f.driverId===r.dId)?.driver||"—"} · {r.dist}</div>
          </div>
          <Pill status="COMPLETED"/>
        </div>
      ))}
    </Section>
  );
};

/* ═══════════════════════════════════════════════════════════
   DRIVER VIEWS
═══════════════════════════════════════════════════════════ */
const DriverQueue = ({ user, rides, setRides }) => {
  const myRides = rides.filter(r=>r.dId===user.id&&r.status!=="COMPLETED");
  const [action, setAction] = useState(null);
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const verify = () => {
    const ride = rides.find(r=>r.id===action.rideId);
    if(action.type==="start"&&otp===ride.otp1){setRides(rides.map(r=>r.id===ride.id?{...r,status:"IN_PROGRESS"}:r));setAction(null);setOtp("");setErr("");}
    else if(action.type==="end"&&otp===ride.otp2){setRides(rides.map(r=>r.id===ride.id?{...r,status:"COMPLETED"}:r));setAction(null);setOtp("");setErr("");}
    else{setErr("Incorrect OTP. Try again.");}
  };
  return (
    <Section title="My Queue" sub={`${myRides.length} active assignment(s)`}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {myRides.map(ride=>(
          <div key={ride.id} className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"12px 16px",background:C.slate[50],borderBottom:`1px solid ${C.slate[100]}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:9,alignItems:"center"}}>
                <Avatar name={ride.emp} size={30}/>
                <div><div style={{fontWeight:700,fontSize:13,color:C.slate[800]}}>{ride.emp}</div><div style={{fontSize:11,color:C.slate[400]}}>{ride.pax} pax</div></div>
              </div>
              <Pill status={ride.status}/>
            </div>
            <div style={{padding:"16px 18px"}}><RouteViz from={ride.from} to={ride.to} time={ride.time} dist={ride.dist} dur={ride.dur}/></div>
            <div style={{padding:"14px 18px",borderTop:`1px solid ${C.slate[100]}`}}>
              {action?.rideId===ride.id ? (
                <div>
                  <div style={{fontSize:11,fontWeight:800,color:C.slate[500],textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Enter {action.type==="start"?"Pickup":"Drop"} OTP</div>
                  <div style={{display:"flex",gap:7}}>
                    <input type="text" maxLength="4" placeholder="••••" value={otp} onChange={e=>{setOtp(e.target.value);setErr("");}} style={{flex:1,padding:"9px 12px",border:`1.5px solid ${err?C.rose[400]:C.slate[200]}`,borderRadius:9,fontFamily:"monospace",fontSize:20,textAlign:"center",letterSpacing:"0.3em",outline:"none"}}/>
                    <button onClick={verify} className="btn-primary" style={{padding:"9px 14px"}}>OK</button>
                    <button onClick={()=>{setAction(null);setOtp("");setErr("");}} className="btn-ghost" style={{padding:"9px 11px"}}><X size={13}/></button>
                  </div>
                  {err && <div style={{fontSize:12,color:C.rose[600],marginTop:6,fontWeight:600}}>{err}</div>}
                </div>
              ) : (
                <button onClick={()=>setAction({type:ride.status==="SCHEDULED"?"start":"end",rideId:ride.id})} className="btn-primary" style={{width:"100%",padding:"11px",borderRadius:10,background:ride.status==="SCHEDULED"?C.slate[800]:C.emerald[600],fontSize:14}}>
                  {ride.status==="SCHEDULED"?"✓ Arrived — Verify Pickup OTP":"✓ Drop — Verify End OTP"}
                </button>
              )}
            </div>
          </div>
        ))}
        {myRides.length===0 && <div className="card" style={{padding:40,textAlign:"center",gridColumn:"1/-1"}}><CheckCircle size={28} color={C.emerald[300]}/><div style={{fontSize:14,color:C.slate[400],marginTop:10}}>No pending rides</div></div>}
      </div>
    </Section>
  );
};

const DriverHistory = ({ user, rides }) => {
  const hist = rides.filter(r=>r.dId===user.id&&r.status==="COMPLETED");
  return (
    <Section title="Trip Log" sub={`${hist.length} completed`}>
      {hist.map(r=>(
        <div key={r.id} className="card" style={{padding:"13px 18px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:34,height:34,borderRadius:9,background:C.emerald[50],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><CheckCircle size={15} color={C.emerald[600]}/></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:13,color:C.slate[800]}}>{r.emp}</div>
            <div style={{fontSize:11,color:C.slate[400],marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.from} → {r.to} · {r.date} · {r.dist}</div>
          </div>
          <Pill status="COMPLETED"/>
        </div>
      ))}
    </Section>
  );
};

/* ═══════════════════════════════════════════════════════════
   DEMO APP
═══════════════════════════════════════════════════════════ */
const DemoApp = ({ companyConfig, onBack }) => {
  const company = DEMO_COMPANIES[companyConfig.companyId] || DEMO_COMPANIES["technova"];
  const [rides, setRides] = useState(company.rides);
  const [adminSettings, setAdminSettings] = useState({mode:"STRICT",otp:true,sharing:true,aiAssign:true});
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");

  if(!user) return <RoleLogin company={company} onLogin={role=>{setUser(company.users[role]);setTab(role==="admin"?"dashboard":role==="employee"?"home":"queue");}} onBack={onBack}/>;

  const renderContent = () => {
    if(user.role==="admin"){
      if(tab==="dashboard") return <AdminDashboard company={company} rides={rides} onTab={setTab}/>;
      if(tab==="assignments") return <AdminAssignments company={company} rides={rides} setRides={setRides}/>;
      if(tab==="fleet") return <AdminFleet company={company} rides={rides}/>;
      if(tab==="drivers") return <AdminDrivers company={company} rides={rides}/>;
      if(tab==="analytics") return <AdminAnalytics/>;
      if(tab==="ai") return <AIScheduler company={company} rides={rides} setRides={setRides} userRole="admin"/>;
      if(tab==="settings") return <AdminSettings adminSettings={adminSettings} setAdminSettings={setAdminSettings}/>;
    }
    if(user.role==="employee"){
      if(tab==="home") return <EmployeeHome user={user} company={company} rides={rides}/>;
      if(tab==="schedule") return <EmployeeSchedule user={user} rides={rides} setRides={setRides}/>;
      if(tab==="ai") return <AIScheduler company={company} rides={rides} setRides={setRides} userRole="employee"/>;
      if(tab==="history") return <EmployeeHistory user={user} rides={rides} company={company}/>;
    }
    if(user.role==="driver"){
      if(tab==="queue") return <DriverQueue user={user} rides={rides} setRides={setRides}/>;
      if(tab==="history") return <DriverHistory user={user} rides={rides}/>;
    }
  };

  return (
    <AppShell user={user} company={company} onLogout={()=>setUser(null)} onBack={onBack} activeTab={tab} onTab={setTab} notifCount={2}>
      {renderContent()}
    </AppShell>
  );
};

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE
═══════════════════════════════════════════════════════════ */
const LandingPage = ({ onGetStarted, onDemo }) => (
  <div style={{minHeight:"100vh",overflowY:"auto",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",background:C.slate[50]}}>
    <GlobalStyles/>
    <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.slate[200]}`,height:64,display:"flex",alignItems:"center",padding:"0 32px",gap:20}}>
      <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
        <div style={{width:34,height:34,background:C.brand[600],borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}><Car size={17} color="white"/></div>
        <span style={{fontWeight:900,fontSize:18,color:C.slate[900]}}>CorpCab<span style={{color:C.brand[600]}}>.OS</span></span>
      </div>
      <div style={{display:"flex",gap:24,alignItems:"center"}}>
        {["Features","Pricing","Who It's For"].map(l=><a key={l} href={`#${l.replace(/\s/g,"").toLowerCase()}`} style={{fontSize:14,fontWeight:600,color:C.slate[600],cursor:"pointer"}}>{l}</a>)}
        <button onClick={onDemo} className="btn-ghost" style={{fontSize:13}}>Live Demo</button>
        <button onClick={onGetStarted} className="btn-primary">Get Started →</button>
      </div>
    </nav>

    <div style={{background:`linear-gradient(135deg,${C.slate[950]} 0%,#0f0a2e 60%,${C.slate[900]} 100%)`,padding:"80px 32px 100px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${C.brand[800]}18 1px,transparent 1px)`,backgroundSize:"28px 28px"}}/>
      <div style={{position:"absolute",top:"20%",left:"10%",width:280,height:280,background:C.brand[600],borderRadius:"50%",filter:"blur(110px)",opacity:0.1}}/>
      <div style={{position:"relative",zIndex:1,maxWidth:760,margin:"0 auto"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${C.brand[600]}20`,border:`1px solid ${C.brand[500]}40`,borderRadius:99,padding:"5px 14px",marginBottom:24}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:C.emerald[400]}}/>
          <span style={{fontSize:11,fontWeight:800,color:C.brand[300],letterSpacing:"0.1em",textTransform:"uppercase"}}>Multi-Tenant Enterprise Mobility</span>
        </div>
        <h1 style={{fontSize:54,fontWeight:900,color:"white",lineHeight:1.1,marginBottom:20,letterSpacing:"-0.02em"}}>
          One Platform.<br/><span style={{color:C.brand[400]}}>Your Entire Fleet.</span>
        </h1>
        <p style={{fontSize:17,color:C.slate[400],lineHeight:1.7,marginBottom:36,maxWidth:540,margin:"0 auto 36px"}}>
          Automate employee commutes, driver rosters, live GPS tracking, and AI-powered scheduling. For IT parks, BPOs, and enterprise campuses.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
          <button onClick={onGetStarted} className="btn-primary" style={{padding:"13px 28px",fontSize:15,borderRadius:12,display:"flex",alignItems:"center",gap:8}}>
            Register Your Company <ArrowRight size={15}/>
          </button>
          <button onClick={onDemo} style={{padding:"13px 28px",fontSize:15,borderRadius:12,border:`1.5px solid ${C.slate[600]}`,background:"transparent",color:"white",fontWeight:700,cursor:"pointer"}}>
            Try Live Demo
          </button>
        </div>
      </div>
    </div>

    <div style={{background:"white",borderBottom:`1px solid ${C.slate[200]}`,padding:"24px 32px"}}>
      <div style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,textAlign:"center"}}>
        {[["500+","Enterprise Clients"],["2.4M+","Monthly Rides"],["99.8%","Uptime SLA"],["₹0","Hidden Fees"]].map(([v,l])=>(
          <div key={l}><div style={{fontSize:28,fontWeight:900,color:C.brand[600]}}>{v}</div><div style={{fontSize:12,color:C.slate[500],fontWeight:600,marginTop:3}}>{l}</div></div>
        ))}
      </div>
    </div>

    <div id="features" style={{padding:"80px 32px",background:C.slate[50]}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <Badge color="brand">Platform Features</Badge>
          <h2 style={{fontSize:36,fontWeight:900,color:C.slate[900],marginTop:14,marginBottom:12}}>Everything your fleet needs</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>
          {[[Map,"Live GPS Radar","Real-time tracking with geo-fence alerts and ETA across your fleet."],[Shield,"OTP Security","Dual OTP at pickup and drop — verified boarding every trip."],[Brain,"AI Scheduler","Intelligent cab matching, pooling, and route optimization."],[BarChart3,"Analytics","Executive dashboards with cost, compliance, and driver metrics."],[Users,"Ride Pooling","Smart grouping reduces fleet costs by up to 40%."],[Server,"ERP Integration","Syncs with SAP, Workday, Oracle, and custom HRMS."],[Calendar,"Shift Management","Admin-controlled or flexible scheduling modes."],[AlertTriangle,"Emergency Tools","One-tap SOS, admin stop-all, and incident reporting."]].map(([Icon,t,d])=>(
            <div key={t} className="card hover-lift" style={{padding:22,transition:"all 0.18s"}}>
              <div style={{width:38,height:38,background:C.brand[50],borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><Icon size={17} color={C.brand[600]}/></div>
              <h3 style={{fontSize:15,fontWeight:800,color:C.slate[900],marginBottom:8}}>{t}</h3>
              <p style={{fontSize:13,color:C.slate[500],lineHeight:1.6}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div id="who-its-for" style={{padding:"80px 32px",background:"white"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <Badge color="violet">Industry Fit</Badge>
          <h2 style={{fontSize:36,fontWeight:900,color:C.slate[900],marginTop:14}}>Who relies on CorpCab.OS?</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:24}}>
          {[[Briefcase,"BPOs & IT Services",C.violet[600],C.violet[50],"Manage 24/7 shifts. Late-night employee safety with OTP-verified pickups and full audit trails."],[Building2,"Corporate Campuses",C.brand[600],C.brand[50],"Connect zones seamlessly. On-demand inter-facility transport bookable from mobile."],[Zap,"Manufacturing Plants",C.emerald[600],C.emerald[50],"Coordinate large fleets from remote areas to industrial parks with strict SLA compliance."]].map(([Icon,t,col,bg,d])=>(
            <div key={t} style={{padding:32,borderRadius:20,background:bg,border:`1px solid ${col}20`}}>
              <div style={{width:50,height:50,background:`${col}15`,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}><Icon size={22} color={col}/></div>
              <h3 style={{fontSize:18,fontWeight:800,color:C.slate[900],marginBottom:10}}>{t}</h3>
              <p style={{fontSize:14,color:C.slate[600],lineHeight:1.6}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div id="pricing" style={{padding:"80px 32px",background:C.slate[900]}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <Badge color="brand">Pricing</Badge>
          <h2 style={{fontSize:36,fontWeight:900,color:"white",marginTop:14,marginBottom:10}}>Scale on your terms</h2>
          <p style={{fontSize:14,color:C.slate[400]}}>Isolated database per tenant. No shared infrastructure.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {[{n:"Starter",p:"$499",d:"Up to 20 vehicles",f:["500 employees","2 admins","Basic analytics","OTP verification"],pop:false},{n:"Professional",p:"$1,299",d:"Up to 100 vehicles",f:["2,500 employees","10 admins","Live GPS tracking","AI Scheduler","ERP integration"],pop:true},{n:"Enterprise",p:"Custom",d:"Unlimited scale",f:["Unlimited all","Dedicated infra","Custom SLA","White-label option"],pop:false}].map(p=>(
            <div key={p.n} style={{background:p.pop?C.brand[600]:C.slate[800],borderRadius:20,padding:28,border:p.pop?`2px solid ${C.brand[400]}`:`1px solid ${C.slate[700]}`,position:"relative"}}>
              {p.pop && <div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:C.brand[400],color:"white",fontSize:10,fontWeight:800,padding:"2px 14px",borderRadius:99,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>MOST POPULAR</div>}
              <div style={{fontSize:13,fontWeight:700,color:p.pop?C.brand[200]:C.slate[400],letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:8}}>{p.n}</div>
              <div style={{fontSize:34,fontWeight:900,color:"white",marginBottom:4}}>{p.p}{p.p!=="Custom"&&<span style={{fontSize:14,fontWeight:500,color:p.pop?C.brand[200]:C.slate[400]}}>  /mo</span>}</div>
              <div style={{fontSize:13,color:p.pop?C.brand[200]:C.slate[400],marginBottom:20,paddingBottom:20,borderBottom:`1px solid ${p.pop?C.brand[500]+"60":C.slate[700]}`}}>{p.d}</div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                {p.f.map(f=><li key={f} style={{display:"flex",gap:9,fontSize:13,color:p.pop?"rgba(255,255,255,0.9)":C.slate[300],fontWeight:500}}><Check size={14} color={p.pop?C.brand[200]:C.emerald[400]} style={{flexShrink:0,marginTop:1}}/>{f}</li>)}
              </ul>
              <button onClick={onGetStarted} style={{width:"100%",padding:"12px",borderRadius:11,border:"none",background:p.pop?"white":"transparent",color:p.pop?C.brand[700]:"white",fontWeight:800,fontSize:14,cursor:"pointer",border:p.pop?"none":`1px solid ${C.slate[600]}`}}>
                {p.p==="Custom"?"Contact Sales":"Start Free Trial"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{padding:"64px 32px",background:`linear-gradient(135deg,${C.brand[600]},${C.violet[600]})`,textAlign:"center"}}>
      <h2 style={{fontSize:36,fontWeight:900,color:"white",marginBottom:14}}>Ready to streamline your fleet?</h2>
      <p style={{fontSize:15,color:"rgba(255,255,255,0.8)",marginBottom:28}}>Register your company and be live in minutes.</p>
      <button onClick={onGetStarted} style={{background:"white",color:C.brand[700],border:"none",borderRadius:12,padding:"14px 32px",fontWeight:800,fontSize:16,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>
        Register Your Company <ArrowRight size={16}/>
      </button>
    </div>

    <footer style={{background:C.slate[950],padding:"32px",textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:10}}>
        <div style={{width:28,height:28,background:C.brand[600],borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center"}}><Car size={14} color="white"/></div>
        <span style={{fontWeight:900,fontSize:15,color:"white"}}>CorpCab<span style={{color:C.brand[400]}}>.OS</span></span>
      </div>
      <p style={{fontSize:12,color:C.slate[500]}}>Enterprise Fleet Management · © 2025 CorpCab Technologies · Hyderabad, India</p>
    </footer>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */
export default function CorpCabOS() {
  const [page, setPage] = useState("landing"); // landing | onboarding | app
  const [companyConfig, setCompanyConfig] = useState(null);

  if(page==="landing") return <LandingPage onGetStarted={()=>setPage("onboarding")} onDemo={()=>{setCompanyConfig({companyId:"technova"});setPage("app");}}/>;
  if(page==="onboarding") return <OnboardingFlow onComplete={cfg=>{setCompanyConfig(cfg);setPage("app");}}/>;
  if(page==="app") return <DemoApp companyConfig={companyConfig} onBack={()=>setPage("landing")}/>;
  return null;
}

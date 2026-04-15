/* ══════════════════════════════════════════════════════════════
   RESURRECTION TEMPLE — COMPLETE API SERVER v2
   ══════════════════════════════════════════════════════════════ */
'use strict';
require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const path       = require('path');
const fs         = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto     = require('crypto');

const app  = express();
const PORT = process.env.PORT || 3000;

let stripe = null;
if (process.env.STRIPE_SK && process.env.STRIPE_SK !== 'not_configured') {
  try { stripe = require('stripe')(process.env.STRIPE_SK); } catch {}
}

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({ origin: ['https://www.resurrectiontemple.com','https://resurrectiontemple.com','http://localhost:3000'] }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

const formLimiter = rateLimit({ windowMs: 15*60*1000, max: 30 });
const authLimiter = rateLimit({ windowMs: 15*60*1000, max: 10 });

const ROOT=path.join(__dirname,'..'), PUBLIC=path.join(ROOT,'public'), PORTAL=path.join(ROOT,'portal'), ADMIN=path.join(ROOT,'admin');
app.use(express.static(PUBLIC));
app.use('/portal', express.static(PORTAL));
app.use('/admin',  express.static(ADMIN));

const DATA_DIR=path.join(__dirname,'data'), DATA_FILE=path.join(DATA_DIR,'submissions.json');
if(!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR,{recursive:true});
if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE,'[]');
const loadData=()=>{ try{return JSON.parse(fs.readFileSync(DATA_FILE,'utf8'))}catch{return[]} };
const saveData=d=>fs.writeFileSync(DATA_FILE,JSON.stringify(d,null,2));
const addRecord=r=>{ const d=loadData(); d.push(r); saveData(d); return r; };

let transporter=null;
if(process.env.EMAIL_USER&&process.env.EMAIL_PASS){
  transporter=nodemailer.createTransport({ host:process.env.EMAIL_HOST||'smtp.gmail.com', port:parseInt(process.env.EMAIL_PORT)||587, secure:false, auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS} });
}
async function sendEmail(to,subject,html){ if(!transporter)return; try{ await transporter.sendMail({from:`"Resurrection Temple" <${process.env.EMAIL_USER}>`,to,subject,html}); }catch(e){console.error('Email:',e.message);} }

function notifHTML(title,record){
  const rows=Object.entries(record).map(([k,v])=>`<tr><td style="padding:6px 12px;color:#888;font-size:12px;border-bottom:1px solid #f5f5f5;">${k}</td><td style="padding:6px 12px;font-size:12px;border-bottom:1px solid #f5f5f5;">${Array.isArray(v)?v.join(', '):(v||'—')}</td></tr>`).join('');
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;"><div style="background:#1A1A1A;padding:1rem 1.5rem;"><h2 style="color:#C9A84C;font-weight:400;margin:0;">${title}</h2></div><table style="width:100%;border-collapse:collapse;">${rows}</table><div style="padding:1rem 1.5rem;background:#f9f7f3;font-size:11px;color:#999;">resurrectiontemple.com · (626) 479-1082</div></div>`;
}
function autoReplyHTML(name,type){
  const msgs={'client-intake':'Your client intake has been received. We will contact you within 24 business hours.','invoice-request':'Your invoice request has been received. We will confirm your total within 24 hours.','payment-confirmed':'Your payment has been received. We will begin your order within 1 business day.','default':'Your submission has been received. We will be in touch within 24–48 hours.'};
  return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2.5rem;color:#1A1A1A;"><div style="border-bottom:2px solid #C9A84C;padding-bottom:1rem;margin-bottom:2rem;"><h2 style="font-weight:400;margin:0;">Resurrection Temple Ministries</h2><p style="font-size:12px;color:#888;margin:4px 0 0;">resurrectiontemple.com · (626) 479-1082</p></div><p>Dear ${name},</p><p style="line-height:1.9;">${msgs[type]||msgs['default']}</p><p style="margin-top:2rem;">With purpose,<br><strong>Craig A. Mayweather</strong><br><em>President, Resurrection Temple Ministries</em></p></div>`;
}

const ADMIN_TOKENS=new Set();
function requireAdmin(req,res,next){
  const auth=req.headers.authorization;
  if(!auth||!auth.startsWith('Bearer ')) return res.status(401).json({ok:false,error:'Unauthorized'});
  if(!ADMIN_TOKENS.has(auth.slice(7))) return res.status(401).json({ok:false,error:'Invalid token'});
  next();
}

app.post('/api/admin/login', authLimiter, (req,res)=>{
  const{password}=req.body;
  if(!password||password!==(process.env.ADMIN_PASS||'RTAdmin2025!')) return res.status(401).json({ok:false,error:'Invalid password'});
  const token=crypto.randomBytes(32).toString('hex');
  ADMIN_TOKENS.add(token);
  setTimeout(()=>ADMIN_TOKENS.delete(token),8*60*60*1000);
  res.json({ok:true,token});
});

app.get('/api/admin/submissions', requireAdmin, (req,res)=>{
  const submissions=loadData();
  res.json({ok:true,count:submissions.length,submissions});
});

app.delete('/api/admin/submissions/:id', requireAdmin, (req,res)=>{
  saveData(loadData().filter(s=>s.id!==req.params.id));
  res.json({ok:true});
});

app.post('/api/contact', formLimiter, async(req,res)=>{
  try{
    const{formType='general-contact',name,email,...rest}=req.body;
    if(!name||String(name).trim().length<2) return res.status(400).json({ok:false,error:'Name required.'});
    const record=addRecord({id:uuidv4(),timestamp:new Date().toISOString(),formType,name:String(name).trim(),email:String(email||'').trim(),...rest});
    const notify=process.env.NOTIFY_EMAIL||'cmayweather@ResurrectionTemple.org';
    sendEmail(notify,`[RT] New ${formType} — ${name}`,notifHTML(`New ${formType} from ${name}`,record));
    if(email) sendEmail(email,'Resurrection Temple Ministries — Submission Received',autoReplyHTML(name,formType));
    res.json({ok:true,id:record.id});
  }catch(err){ console.error(err); res.status(500).json({ok:false,error:'Server error.'}); }
});

app.get('/api/stripe-key',(req,res)=>res.json({publishableKey:process.env.STRIPE_PK||'not_configured'}));

app.post('/api/create-payment-intent', formLimiter, async(req,res)=>{
  if(!stripe) return res.status(503).json({error:'Stripe not configured. Add STRIPE_SK to .env'});
  try{
    const{amount,name,email,description}=req.body;
    if(!amount||amount<100) return res.status(400).json({error:'Invalid amount.'});
    const intent=await stripe.paymentIntents.create({amount:Math.round(amount),currency:'usd',description:description||'RT Ministries Service',receipt_email:email,metadata:{name,email,description}});
    res.json({clientSecret:intent.client_secret});
  }catch(err){ res.status(500).json({error:err.message}); }
});

app.post('/api/stripe-webhook', express.raw({type:'application/json'}), async(req,res)=>{
  if(!stripe||!process.env.STRIPE_WEBHOOK_SECRET) return res.json({received:true});
  let event;
  try{ event=stripe.webhooks.constructEvent(req.body,req.headers['stripe-signature'],process.env.STRIPE_WEBHOOK_SECRET); }
  catch(err){ return res.status(400).send(`Webhook error: ${err.message}`); }
  if(event.type==='payment_intent.succeeded'){
    const i=event.data.object;
    const record=addRecord({id:uuidv4(),timestamp:new Date().toISOString(),formType:'payment-confirmed',name:i.metadata.name||'—',email:i.metadata.email||'—',amount:`$${(i.amount/100).toLocaleString()}`,description:i.description,stripeId:i.id});
    const notify=process.env.NOTIFY_EMAIL||'cmayweather@ResurrectionTemple.org';
    sendEmail(notify,`[RT] Payment $${(i.amount/100).toLocaleString()} — ${i.metadata.name}`,notifHTML('Payment Confirmed',record));
    if(i.metadata.email) sendEmail(i.metadata.email,'Payment Confirmed — Resurrection Temple Ministries',autoReplyHTML(i.metadata.name,'payment-confirmed'));
  }
  res.json({received:true});
});

app.get('/api/health',(req,res)=>res.json({ok:true,timestamp:new Date().toISOString(),version:'2.0.0',email:!!transporter,stripe:!!stripe,submissions:loadData().length}));

app.get('/portal',           (_,r)=>r.sendFile(path.join(PORTAL,'index.html')));
app.get('/portal/',          (_,r)=>r.sendFile(path.join(PORTAL,'index.html')));
app.get('/portal/intake',    (_,r)=>r.sendFile(path.join(PORTAL,'intake.html')));
app.get('/portal/contracts', (_,r)=>r.sendFile(path.join(PORTAL,'contracts.html')));
app.get('/portal/invoice',   (_,r)=>r.sendFile(path.join(PORTAL,'invoice.html')));
app.get('/portal/pricing',   (_,r)=>r.sendFile(path.join(PORTAL,'pricing.html')));
app.get('/portal/payment',   (_,r)=>r.sendFile(path.join(PORTAL,'payment.html')));
app.get('/admin',            (_,r)=>r.sendFile(path.join(ADMIN,'index.html')));
app.get('/admin/',           (_,r)=>r.sendFile(path.join(ADMIN,'index.html')));

app.get('/pages/:page',(req,res)=>{
  const file=path.join(PUBLIC,'pages',`${req.params.page}.html`);
  if(fs.existsSync(file)) return res.sendFile(file);
  res.status(404).send('<h1>404</h1><p><a href="/">Return to Resurrection Temple</a></p>');
});

app.get('*',(_,r)=>r.sendFile(path.join(PUBLIC,'index.html')));

app.listen(PORT,()=>{
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   RESURRECTION TEMPLE — SERVER v2.0    ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log(`\n🌐  Site:    http://localhost:${PORT}`);
  console.log(`🚪  Portal:  http://localhost:${PORT}/portal`);
  console.log(`🔐  Admin:   http://localhost:${PORT}/admin`);
  console.log(`💳  Stripe:  ${stripe?'Configured':'Not configured'}`);
  console.log(`📧  Email:   ${transporter?process.env.EMAIL_USER:'Not configured'}`);
  console.log(`🔑  Admin PW: ${process.env.ADMIN_PASS||'RTAdmin2025! (default)'}\n`);
});
module.exports=app;

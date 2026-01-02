'use client';

import React, { useState, useEffect, useMemo } from 'react';

// --- [Types] ---
type InputState = {
  income: string;
  hours: string;
  miles: string;
  orders: string;
  gasPrice: string;
  mpg: string;
  targetMoney: string;
  myHourlyWage: string;
  homePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  propertyTaxRate: string;
  monthlyRent: string;
  saveTaxRate: string;
  saveRepairRate: string;
  saveEmergencyRate: string;
  saveVacationRate: string;
  useTax: boolean;
  useRepair: boolean;
  useEmergency: boolean;
  useVacation: boolean;
  isRenting: boolean;
};

// --- [Constants & SEO Data] ---
const INITIAL_STATE: InputState = {
  income: '', hours: '', miles: '', orders: '',
  gasPrice: '3.50', mpg: '25',
  targetMoney: '', myHourlyWage: '20',
  homePrice: '300000', downPayment: '20', interestRate: '6.5', loanTerm: '30', propertyTaxRate: '1.2',
  monthlyRent: '2200', isRenting: false,
  saveTaxRate: '20', saveRepairRate: '0.08', saveEmergencyRate: '5', saveVacationRate: '3',
  useTax: true, useRepair: true, useEmergency: true, useVacation: true,
};

const TAB_SEO_INFO: any = {
  profit: { title: "Driver Profit Calc (Net Income) - GigCalc.US", desc: "Calculate Real Hourly Wage & Net Profit for Uber/DoorDash using 2025 IRS Standard Mileage Rates." },
  safe: { title: "Tax Savings Calculator - GigCalc.US", desc: "Estimate Safe-to-Spend income and 2025 Quarterly Tax payments based on IRS Schedule SE logic." },
  tax: { title: "Mileage Deduction Calculator - GigCalc.US", desc: "Calculate 2025 tax deductions using the 67 cents/mile Standard Mileage Rate vs Actual Expenses." },
  goal: { title: "Shift Planner (Net Wage) - GigCalc.US", desc: "Plan your driving shifts based on real net profit per hour, not just gross app earnings." },
  house: { title: "Gig Worker Mortgage Calc - GigCalc.US", desc: "Calculate mortgage qualification capability based on Schedule C Net Profit (Line 31)." }
};

// --- [Icons Component] (A11y Optimized) ---
const Icons = {
  Profit: () => <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Shield: () => <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Target: () => <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  House: () => <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Wallet: () => <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
  Share: () => <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
  Mail: () => <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  ArrowDown: () => <svg aria-hidden="true" className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
  Check: () => <svg aria-hidden="true" className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
};

// --- [Utility Components] ---
const ShareButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    const shareText = `${text} Check yours at: https://gigcalcapp.com`;
    if (navigator.share) {
      try { await navigator.share({ title: 'GigCalc.US', text: shareText, url: 'https://gigcalcapp.com' }); } catch (err) { console.error(err); }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button onClick={handleShare} aria-label="Share Result" className="text-[10px] font-bold text-blue-500 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition focus:ring-2 focus:ring-blue-300 outline-none">
      <Icons.Share /> {copied ? 'Copied!' : 'Share'}
    </button>
  );
};

const AdSlot = ({ label = 'Sponsored', className = '' }) => (
  <aside className={`w-full bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center py-6 px-4 my-6 ${className}`} aria-label="Advertisement">
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
    <div className="w-full h-16 bg-slate-200 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-xs text-slate-400 font-medium">Google AdSense Area</span>
    </div>
  </aside>
);

// --- [Modal Components] ---
const FeedbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close">✕</button>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Send Feedback</h3>
        <form action="https://formspree.io/f/xldqqkdb" method="POST" className="space-y-3 mt-4">
          <textarea name="message" placeholder="Found a bug? Suggestions?" className="w-full h-32 p-4 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 ring-blue-100 resize-none" required></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">Send</button>
        </form>
      </div>
    </div>
  );
};

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close">✕</button>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Privacy Policy</h2>
        <div className="text-xs text-slate-600 space-y-4">
          <p>GigCalc.US does not store personal data. Calculations are local. We use Google AdSense/Analytics which use cookies.</p>
        </div>
        <button onClick={onClose} className="w-full mt-6 bg-slate-100 text-slate-900 font-bold py-3 rounded-xl">Close</button>
      </div>
    </div>
  );
};

const CookieBanner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem('cookieConsent')) setShow(true); }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-[90] shadow-2xl flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
      <p className="text-xs text-slate-600 text-center sm:text-left">🍪 We use cookies for ads & analytics.</p>
      <button onClick={() => { localStorage.setItem('cookieConsent', 'true'); setShow(false); }} className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-blue-700 shadow-sm whitespace-nowrap">I Accept</button>
    </div>
  );
};

// --- [Custom Hook: Calculation Engine] ---
const useGigCalculations = (inputs: InputState) => {
  return useMemo(() => {
    const inc = parseFloat(inputs.income) || 0;
    const hrs = parseFloat(inputs.hours) || 1;
    const mi = parseFloat(inputs.miles) || 0;
    const ord = parseFloat(inputs.orders) || 0;
    const gas = parseFloat(inputs.gasPrice) || 3.5;
    const carMpg = parseFloat(inputs.mpg) || 25;
    const IRS_RATE = 0.67;

    const fuelCost = (mi / carMpg) * gas;
    const wearCost = mi * 0.1; 
    const totalActualExpenses = fuelCost + wearCost;
    
    const netProfit = inc - totalActualExpenses;
    const realWage = hrs > 0 ? netProfit / hrs : 0;
    const profitPerMile = mi > 0 ? netProfit / mi : 0;
    const payPerOrder = ord > 0 ? inc / ord : 0;

    const deduction = mi * IRS_RATE;
    const taxableIncome = Math.max(0, inc - deduction);
    const seTaxBase = taxableIncome * 0.9235;
    const taxLiability = seTaxBase * 0.153;

    const repairFund = inputs.useRepair ? mi * (parseFloat(inputs.saveRepairRate) || 0) : 0;
    const userTaxRate = (parseFloat(inputs.saveTaxRate) || 20) / 100;
    const taxFund = inputs.useTax ? Math.max(taxLiability, taxableIncome * userTaxRate) : 0; 
    const emergencyFund = inputs.useEmergency ? netProfit * ((parseFloat(inputs.saveEmergencyRate) || 5) / 100) : 0;
    const vacationFund = inputs.useVacation ? netProfit * ((parseFloat(inputs.saveVacationRate) || 3) / 100) : 0;
    const safeSpendAmount = netProfit - repairFund - taxFund - emergencyFund - vacationFund;

    const hPrice = parseFloat(inputs.homePrice) || 0;
    const loanP = hPrice * (1 - (parseFloat(inputs.downPayment) || 0) / 100);
    const mRate = (parseFloat(inputs.interestRate) || 0) / 100 / 12;
    const nPay = (parseFloat(inputs.loanTerm) || 30) * 12;
    const monthlyMortgage = mRate > 0 ? (loanP * (mRate * Math.pow(1 + mRate, nPay))) / (Math.pow(1 + mRate, nPay) - 1) : loanP / nPay;
    const monthlyTax = (hPrice * ((parseFloat(inputs.propertyTaxRate) || 0) / 100)) / 12;
    const totalMonthlyCost = monthlyMortgage + monthlyTax;
    const cashFlow = (parseFloat(inputs.monthlyRent) || 0) - totalMonthlyCost;

    return {
      netProfit, realWage, profitPerMile, payPerOrder, deduction, taxLiability,
      safeSpendAmount, taxFund, repairFund, emergencyFund, vacationFund,
      monthlyMortgage, monthlyTax, totalMonthlyCost, cashFlow
    };
  }, [inputs]);
};

// --- [Main Page] ---
export default function Page() {
  const [activeTab, setActiveTab] = useState('profit');
  const [platform, setPlatform] = useState('uber');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [inputs, setInputs] = useState<InputState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gigCalcData');
    if (saved) { try { setInputs({ ...INITIAL_STATE, ...JSON.parse(saved) }); } catch (e) { console.error(e); } }
    setIsLoaded(true);
  }, []);

  useEffect(() => { if (isLoaded) localStorage.setItem('gigCalcData', JSON.stringify(inputs)); }, [inputs, isLoaded]);

  useEffect(() => {
    const info = TAB_SEO_INFO[activeTab] || TAB_SEO_INFO['profit'];
    document.title = info.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) { metaDescription.setAttribute('content', info.desc); } 
    else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = info.desc;
      document.head.appendChild(meta);
    }
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      window.history.replaceState({}, '', url);
    }
  }, [activeTab]);

  const r = useGigCalculations(inputs);
  const handleChange = (field: keyof InputState, value: any) => setInputs(prev => ({ ...prev, [field]: value }));
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  const scrollToGuides = () => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' });

  const PLATFORM_GUIDES: any = {
    uber: { title: "Uber/Lyft: Audit Proofing", content: "IRS Red Flag: Claiming 100% of miles. Commuting from home to first ride is NOT deductible.", tags: ["#AuditRisk", "#DeadheadMiles", "#ScheduleC"] },
    doordash: { title: "DoorDash: Tip Tax Myth", content: "Current Law: Tips are fully taxable for SE Tax (15.3%), even if exempt from Income Tax.", tags: ["#TaxOnTips", "#DasherTax", "#SE_Tax"] },
    amazon: { title: "Amazon Flex: Mileage Strategy", content: "Flex blocks involve high mileage. The Standard Rate (67¢) is usually your best tax shield.", tags: ["#FlexDriver", "#MileageRate", "#BasePay"] }
  };
  const FAQ_DATA: any = {
    profit: [{ q: 'Does the 2025 "No Tax on Tips" apply?', a: "BE CAREFUL. It only exempts tips from 'Federal Income Tax', NOT 'SE Tax' (15.3%)." }, { q: 'The $400 Rule', a: "If Net Profit > $400, you MUST file Schedule C and pay SE Tax." }],
    safe: [{ q: 'Gas AND Mileage?', a: 'NO. You must choose ONE: Standard Mileage (67¢) OR Actual Expenses. Double-dipping is illegal.' }, { q: 'Audit Proof?', a: "You need a compliant log (date, miles, purpose). 'Aimless driving' doesn't count." }],
    tax: [{ q: 'Student / Dependent?', a: 'YES. If profit > $400, you owe SE Tax.' }, { q: 'Quarterly Taxes?', a: "Required if you expect to owe > $1,000." }],
    goal: [{ q: 'Why "Real Hours"?', a: "Gross pay is misleading. After expenses, you might earn half." }],
    house: [{ q: 'Mortgage Trap', a: "High deductions lower your taxes but also lower your 'Qualifying Income' for loans." }]
  };

  // --- [GEO: Rich JSON-LD Data Injection] ---
  const geoSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        'name': 'GigCalc',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'description': 'Free Calculator for Uber, DoorDash, and Lyft drivers to calculate Net Profit, Real Hourly Wage, and Schedule C Tax Liability using 2025 IRS Standard Mileage Rates.'
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'What is the 2025 IRS Standard Mileage Rate?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'The 2025 IRS Standard Mileage Rate for business use is 67 cents per mile. This rate covers gas, insurance, repairs, and depreciation.' } },
          { '@type': 'Question', 'name': 'Do DoorDash drivers pay tax on tips?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. While new laws may exempt tips from Federal Income Tax, gig workers must still pay the 15.3% Self-Employment Tax (Social Security & Medicare) on all tip income if net profit exceeds $400.' } },
          { '@type': 'Question', 'name': 'How do I calculate net profit for Gig Work?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Net Profit = Gross Earnings - (Total Business Miles * $0.67). Do not deduct gas separately if taking the mileage deduction.' } }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center pt-0 sm:pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema) }} />
      
      {/* Semantic Structure: Main Wrapper */}
      <main className="w-full max-w-[480px] bg-white sm:min-h-[800px] sm:h-auto sm:rounded-[2rem] sm:shadow-2xl sm:border border-slate-100 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <header className="px-6 py-5 bg-white flex items-center justify-center sticky top-0 z-50 border-b border-slate-50">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">Gig<span className="text-blue-600">Calc</span>.US</h1>
        </header>

        {/* Semantic: Nav for Tabs */}
        <nav className="px-4 py-3 bg-white" aria-label="Calculator Tabs">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl overflow-x-auto scrollbar-hide">
            {[{ id: 'profit', label: 'Driver', icon: Icons.Profit }, { id: 'safe', label: 'Wallet', icon: Icons.Wallet }, { id: 'tax', label: 'Shield', icon: Icons.Shield }, { id: 'goal', label: 'Goal', icon: Icons.Target }, { id: 'house', label: 'House', icon: Icons.House }].map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                aria-selected={activeTab === tab.id}
                role="tab"
                className={`flex-1 min-w-[60px] flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-[10px] font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <span><tab.icon /></span>{tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 py-2 pb-6">
            {/* === PROFIT SECTION === */}
            {activeTab === 'profit' && (
              <section className="animate-fade-in-up" aria-labelledby="profit-heading">
                <div className="text-center mb-6 pt-2">
                  <h2 id="profit-heading" className="text-lg font-bold text-slate-900">Driver Profit Calc</h2>
                  <p className="text-xs text-slate-500 mt-1">For Uber Eats, DoorDash, Flex Drivers</p>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="income" className="text-base font-black text-slate-700 uppercase tracking-tight mb-3 block">Total App Payout (Gross)</label>
                  <div className="flex items-center bg-slate-50 rounded-2xl px-5 py-5 focus-within:ring-2 ring-blue-500/20 transition-all border border-slate-100 shadow-inner">
                    <span className="text-3xl font-bold text-blue-600 mr-2">$</span>
                    <input id="income" type="number" value={inputs.income} onChange={(e) => handleChange('income', e.target.value)} placeholder="0.00" className="w-full bg-transparent text-5xl font-black text-slate-900 outline-none placeholder-slate-200" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label htmlFor="hours" className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Hours</label>
                    <input id="hours" type="number" value={inputs.hours} onChange={(e) => handleChange('hours', e.target.value)} className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="miles" className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Miles (Active + Return)</label>
                    <input id="miles" type="number" value={inputs.miles} onChange={(e) => handleChange('miles', e.target.value)} placeholder="Check app" className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none border-2 border-blue-50/50 focus:border-blue-100" />
                  </div>
                </div>

                <details className="group mt-4"><summary className="list-none flex items-center justify-between text-xs font-bold text-slate-400 cursor-pointer py-3 px-2 hover:bg-slate-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-100" tabIndex={0}><span>Vehicle Expenses (Gas & Mileage)</span><span className="group-open:rotate-180 transition text-slate-300">▼</span></summary>
                  <div className="grid grid-cols-2 gap-4 mt-2 bg-slate-50 p-4 rounded-2xl">
                    <div><label htmlFor="gasPrice" className="text-[10px] font-bold text-slate-400 uppercase">Gas Price ($)</label><input id="gasPrice" type="number" value={inputs.gasPrice} onChange={(e) => handleChange('gasPrice', e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none" /></div>
                    <div><label htmlFor="mpg" className="text-[10px] font-bold text-slate-400 uppercase">Gas Mileage</label><input id="mpg" type="number" value={inputs.mpg} onChange={(e) => handleChange('mpg', e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none" /></div>
                  </div>
                </details>
                
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl mt-6 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Real Net Profit (Take Home)</p>
                    <ShareButton text={`My Real Hourly Wage is $${r.realWage}/hr on GigCalc!`} />
                  </div>
                  <div className="text-6xl font-black tracking-tighter mb-2 text-emerald-400">{formatCurrency(r.netProfit > 0 ? r.netProfit : 0)}</div>
                  
                  {r.netProfit > 400 && (
                    <>
                      <div className="inline-block bg-red-500/20 border border-red-500/50 rounded-lg px-3 py-1 mb-3"><p className="text-[10px] font-bold text-red-200 flex items-center gap-1">⚠️ IRS: Must File Schedule C ($400+)</p></div>
                      <div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold text-red-400">Est. SE Tax (15.3%):</span><span className="text-lg font-bold text-red-400">-{formatCurrency(r.taxLiability)}</span></div>
                    </>
                  )}

                  <div className="flex items-center gap-2 mb-4 opacity-80"><span className="text-xs font-bold text-slate-300">Hourly Wage:</span><span className="text-xl font-bold text-white">${r.realWage > 0 ? r.realWage.toFixed(2) : '0.00'}/hr</span></div>
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-4">
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Profit Per Mile</p><p className="text-xl font-extrabold text-white">${r.profitPerMile.toFixed(2)} <span className="text-xs font-medium opacity-50">/mi</span></p></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Pay Per Order</p><p className="text-xl font-extrabold text-white">${r.payPerOrder.toFixed(2)} <span className="text-xs font-medium opacity-50">/avg</span></p></div>
                  </div>
                </div>
                
                {parseFloat(inputs.income) > 0 && (
                  <button 
                    onClick={scrollToGuides} 
                    className="w-full text-left mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition animate-pulse focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Scroll to tax tips"
                  >
                    <div className="flex items-center gap-2"><span className="text-lg" aria-hidden="true">💡</span><div><p className="text-xs font-bold text-blue-800">Wait! Don't overpay taxes.</p><p className="text-[10px] text-blue-600">See the "No Tax on Tips" trap & Audit tips 👇</p></div></div><Icons.ArrowDown />
                  </button>
                )}
                <AdSlot />
              </section>
            )}

            {/* === SAFE SPEND SECTION === */}
            {activeTab === 'safe' && (
              <section className="animate-fade-in-up" aria-labelledby="safe-heading">
                <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl shadow-emerald-200 relative overflow-hidden mb-6">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest">Today's "Safe to Spend"</p>
                    <ShareButton text={`I can safely spend ${formatCurrency(r.safeSpendAmount)} today!`} />
                  </div>
                  <div className="text-6xl font-black tracking-tighter mb-2">{formatCurrency(r.safeSpendAmount > 0 ? r.safeSpendAmount : 0)}</div>
                  <p className="text-xs font-medium text-emerald-100 opacity-90">Today's Guilt-Free Money 🍺</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100"><span className="text-xs font-bold text-slate-900">Net Profit</span><span className="text-sm font-black text-slate-900">{formatCurrency(r.netProfit)}</span></div>
                  
                  {inputs.useTax && (
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span><div><p className="text-xs font-bold text-blue-800">Estimated Tax Bill</p><p className="text-[9px] text-blue-500">SE Tax (~15.3%) + Income Tax</p></div></div>
                      <div className="text-right"><span className="text-sm font-bold text-blue-600">-{formatCurrency(r.taxFund)}</span>{(r.taxFund * 260) > 1000 && <p className="text-[8px] text-red-500 font-bold mt-1">May need Quarterly Pay!</p>}</div>
                    </div>
                  )}
                  <div className="space-y-3 pt-2">
                    {inputs.useRepair && <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span><span className="text-xs font-bold text-slate-700">Car Repair Fund</span></div><span className="text-sm font-bold text-orange-500">-{formatCurrency(r.repairFund)}</span></div>}
                    {inputs.useEmergency && <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span><span className="text-xs font-bold text-slate-700">Emergency Fund</span></div><span className="text-sm font-bold text-red-500">-{formatCurrency(r.emergencyFund)}</span></div>}
                  </div>
                </div>
                <AdSlot />
              </section>
            )}

            {/* === TAX SECTION === */}
            {activeTab === 'tax' && (
              <section className="animate-fade-in-up" aria-labelledby="tax-heading">
                <div className="text-center mb-6 pt-2"><h2 id="tax-heading" className="text-lg font-bold text-slate-900">Tax Shield</h2><p className="text-xs text-slate-500 mt-1">IRS Deduction: <b>67¢ / mile</b></p></div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-4"><label htmlFor="miles-tax" className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">Miles Driven</label><div className="flex items-center border-b-2 border-blue-500 py-2"><input id="miles-tax" type="number" value={inputs.miles} onChange={(e) => handleChange('miles', e.target.value)} className="w-full text-4xl font-extrabold text-slate-900 outline-none" /><span className="text-sm font-bold text-slate-400 ml-2">mi</span></div></div>
                <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-200 text-center mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Calculated Deduction</p>
                    <ShareButton text={`I found a $${r.deduction} tax shield using GigCalc.US`} />
                  </div>
                  <div className="text-5xl font-black tracking-tighter mb-2">{formatCurrency(r.deduction)}</div>
                  <p className="text-xs font-medium text-blue-100 opacity-90">IRS Standard Deduction Amount</p>
                  {r.deduction > 0 && <div className="mt-4 pt-4 border-t border-blue-400/50"><p className="text-[10px] text-blue-200 mb-1">Estimated CASH Savings:</p><p className="text-2xl font-bold text-white">~ {formatCurrency(r.deduction * 0.22)}</p></div>}
                </div>
                <AdSlot />
              </section>
            )}

            {/* === GOAL SECTION === */}
            {activeTab === 'goal' && (
              <section className="animate-fade-in-up" aria-labelledby="goal-heading">
                 <div className="text-center mb-6 pt-2"><h2 id="goal-heading" className="text-lg font-bold text-slate-900">Shift Planner</h2></div>
                 <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 mb-6">
                    <div><label htmlFor="targetMoney" className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-2 block">Target ($)</label><div className="flex items-center bg-blue-50 px-4 py-3 rounded-2xl"><span className="text-xl font-bold text-blue-300 mr-2">$</span><input id="targetMoney" type="number" value={inputs.targetMoney} onChange={(e) => handleChange('targetMoney', e.target.value)} placeholder="200" className="w-full bg-transparent text-3xl font-extrabold text-blue-900 outline-none placeholder-blue-200" /></div></div>
                    <div><label htmlFor="myHourlyWage" className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">Hourly Wage</label><div className="flex items-center border-b border-slate-200 py-2"><span className="text-lg font-bold text-slate-300 mr-2">$</span><input id="myHourlyWage" type="number" value={inputs.myHourlyWage} onChange={(e) => handleChange('myHourlyWage', e.target.value)} className="w-full bg-transparent text-2xl font-bold text-slate-700 outline-none" /><span className="text-xs font-bold text-slate-400">/hr</span></div></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl flex flex-col justify-between aspect-square"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hours</span><div className="text-4xl font-black tracking-tighter">{inputs.targetMoney ? (parseFloat(inputs.targetMoney) / parseFloat(inputs.myHourlyWage)).toFixed(1) : '0'}<span className="text-lg font-medium text-slate-500 ml-1">h</span></div></div>
                    <div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-3xl flex flex-col justify-between aspect-square shadow-sm"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days (8h)</span><div className="text-4xl font-black text-blue-600 tracking-tighter">{inputs.targetMoney ? (parseFloat(inputs.targetMoney) / parseFloat(inputs.myHourlyWage) / 8).toFixed(1) : '0'}<span className="text-lg font-medium text-slate-400 ml-1">d</span></div></div>
                 </div>
                 <AdSlot />
              </section>
            )}

            {/* === HOUSE SECTION === */}
            {activeTab === 'house' && (
              <section className="animate-fade-in-up" aria-labelledby="house-heading">
                <div className="text-center mb-4 pt-2"><h2 id="house-heading" className="text-lg font-bold text-slate-900">Home Buying Calc 🏠</h2></div>
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 mb-6">
                    <div><label htmlFor="homePrice" className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Home Price</label><div className="flex items-center border-b border-slate-200 pb-1"><span className="text-lg font-bold text-slate-300 mr-2">$</span><input id="homePrice" type="number" value={inputs.homePrice} onChange={(e) => handleChange('homePrice', e.target.value)} className="w-full text-2xl font-black text-slate-900 outline-none" /></div></div>
                    <div className="grid grid-cols-2 gap-4"><div><label htmlFor="downPayment" className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Down Payment (%)</label><input id="downPayment" type="number" value={inputs.downPayment} onChange={(e) => handleChange('downPayment', e.target.value)} className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none" /></div><div><label htmlFor="loanTerm" className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Loan Term</label><input id="loanTerm" type="number" value={inputs.loanTerm} onChange={(e) => handleChange('loanTerm', e.target.value)} className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none" /></div></div>
                </div>
                <div className="p-6 rounded-3xl shadow-xl bg-slate-900 text-white">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Monthly Cost</p>
                    <div className="text-5xl font-black tracking-tighter mb-2">{formatCurrency(r.totalMonthlyCost)}</div>
                </div>
                <AdSlot />
              </section>
            )}

          </div>

          {/* Semantic: Guides Section with Definition Lists for GEO */}
          <section className="px-6 py-8 bg-slate-50 border-t border-slate-200" id="guides" aria-labelledby="guides-heading">
            <h3 id="guides-heading" className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><span>💡</span> Expert FAQ (Reddit Answered)</h3>
            
            {/* Semantic Definition List for Q&A */}
            <div className="space-y-6 text-slate-600 mb-10">
              {FAQ_DATA[activeTab]?.map((item: any, index: number) => (
                <dl key={index} className="animate-fade-in-up">
                  <dt className="text-xs font-bold text-slate-800 mb-1">{item.q}</dt>
                  <dd className="text-[11px] leading-relaxed opacity-90 m-0">{item.a}</dd>
                </dl>
              ))}
            </div>
            
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm animate-fade-in-up mb-8">
              <h3 className="text-sm font-bold text-slate-900 mb-3">📚 Platform Specific Tax Guide</h3>
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1" role="tablist">
                {Object.keys(PLATFORM_GUIDES).map((key) => (
                  <button 
                    key={key} 
                    onClick={() => setPlatform(key)} 
                    role="tab"
                    aria-selected={platform === key}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${platform === key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    {key === 'uber' ? 'Uber / Lyft' : key === 'doordash' ? 'DoorDash' : 'Amazon Flex'}
                  </button>
                ))}
              </div>
              <article className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold text-blue-600 mb-2">{PLATFORM_GUIDES[platform].title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{PLATFORM_GUIDES[platform].content}</p>
                <div className="flex flex-wrap gap-1">
                  {PLATFORM_GUIDES[platform].tags.map((tag: string, i: number) => (
                    <span key={i} className="text-[9px] bg-white text-slate-400 px-2 py-1 rounded border border-slate-100">{tag}</span>
                  ))}
                </div>
              </article>
            </div>

            {/* GEO Authority: Methodology Section */}
            <section id="methodology" className="mt-8 pt-6 border-t border-slate-200" aria-labelledby="method-heading">
                <h3 id="method-heading" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Icons.Shield /> Calculation Methodology</h3>
                <p className="text-[9px] text-slate-400 leading-relaxed">
                    This calculator uses the <strong>2025 IRS Standard Mileage Rate (67 cents per mile)</strong> for deduction calculations. 
                    Self-Employment Tax is calculated based on <strong>Schedule SE (Form 1040)</strong> logic: 15.3% tax on 92.35% of net earnings from self-employment. 
                    Reference: <a href="https://www.irs.gov/publications/p463" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">IRS Publication 463</a>.
                </p>
            </section>
          </section>

          {/* Semantic: Footer */}
          <footer className="px-6 pb-24 text-center border-t border-slate-200 pt-8 bg-slate-100">
            <button onClick={() => setIsFeedbackOpen(true)} className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-2 mx-auto mb-4 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm transition focus:ring-2 focus:ring-blue-300 outline-none"><Icons.Mail /> Send Feedback</button>
            <div className="text-[10px] text-slate-400 leading-relaxed mb-4 text-justify px-2">
              <strong className="block text-slate-500 mb-1 uppercase">Disclaimer & Legal Notice</strong>
              This tool is provided for <b>informational and educational purposes only</b> and does not constitute professional financial, legal, or tax advice. All calculations are estimates based on user inputs and general 2024-2025 IRS guidelines. We are not responsible for any financial losses or tax penalties. Always consult a certified CPA or tax professional before filing your taxes.
            </div>
            <p className="text-[10px] text-slate-400 mb-4"><button onClick={() => setIsPrivacyOpen(true)} className="underline hover:text-slate-600">Privacy Policy</button></p>
            <p className="text-[10px] text-slate-300">© {new Date().getFullYear()} GigCalc.US</p>
          </footer>
        </div>

        <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-slate-200 p-2 z-50 flex justify-center"><span className="text-[9px] font-bold text-slate-300 uppercase">Sponsored Ad Space</span></div>
        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <CookieBanner />
      </main>
    </div>
  );
}
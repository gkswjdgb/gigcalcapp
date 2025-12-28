'use client';

import React, { useState, useEffect } from 'react';

// --- [Icons & Components] ---

const Icons = {
  Profit: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> ),
  Shield: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> ),
  Target: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> ),
  House: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> ),
  Wallet: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z" /></svg> ),
  Mail: () => ( <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> ),
};

const AdSlot = ({ label = 'Sponsored', className = '' }) => (
  <div className={`w-full bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center py-6 px-4 my-6 ${className}`}>
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
    <div className="w-full h-16 bg-slate-200 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-xs text-slate-400 font-medium">Google AdSense Area</span>
    </div>
  </div>
);

// --- [Content Data for SEO/AdSense] ---

const FAQ_DATA: any = {
  profit: [
    { q: 'How do I calculate true profit for Uber Eats?', a: "To find your true Net Income, subtract your vehicle expenses (gas, depreciation, maintenance) from your total app payout. This calculator uses the IRS mileage rate or your actual MPG to reveal your 'Real Hourly Wage'." },
    { q: 'What is a good profit per mile?', a: "Aim for at least $1.50 to $2.00 per mile. If your 'Profit Per Mile' is below $1.00, you are likely losing money on vehicle wear and tear." }
  ],
  safe: [
    { q: 'How much should I save for taxes (1099)?', a: 'As an independent contractor, save 15-20% of your Net Profit (not gross) for taxes. Our tool calculates this Safe-to-Spend amount automatically.' },
    { q: 'Why do I need a repair fund?', a: "Gig driving puts 3x more stress on cars. Saving $0.05-$0.08 per mile ensures you can pay for tires and brakes without debt." }
  ],
  tax: [
    { q: 'What is the 2024/2025 IRS Mileage Rate?', a: 'For 2024, the rate is 67 cents/mile. This acts as a massive Tax Shield. Driving 100 miles reduces your taxable income by $67.' },
    { q: 'Can I deduct gas and mileage?', a: "Usually, you must choose one: Standard Mileage Rate (recommended for most) or Actual Expenses. You cannot deduct both." }
  ],
  goal: [ { q: 'How many hours to reach $1000?', a: "Divide your target by your 'Real Hourly Wage'. If you make $20/hr net, you need 50 hours of driving." } ],
  house: [ { q: 'Can gig workers buy a house?', a: "Yes, but lenders look at your Net Profit on tax returns (Schedule C), not the gross app earnings. Use this tool to see your qualifying income." } ]
};

// [NEW] Platform Specific Deep-Dive Content (To satisfy "High Quality Content" policy)
const PLATFORM_GUIDES: any = {
  uber: {
    title: "Uber Eats & Rideshare Strategy",
    content: "For Uber drivers, the biggest hidden cost is 'Deadhead Miles' (driving without a passenger/order). Uber's app only tracks miles while on a trip, but for tax purposes, you should track ALL business miles from the moment you leave home. This calculator helps you account for the return trip to stay profitable.",
    tags: ["#Prop22", "#SurgePricing", "#QuestBonus", "#DeadheadMiles"]
  },
  doordash: {
    title: "DoorDash Dasher Profitability",
    content: "DoorDash offers 'Earn by Time' vs 'Earn by Offer'. While 'Time' guarantees a rate, it often sends you to far, low-tip areas. Experienced Dashers use 'Earn by Offer' and aim for $2/mile to cover start-stop wear. Use this tool to verify if a $5 order for 3 miles is actually worth starting your car.",
    tags: ["#TopDasher", "#RedCard", "#EarnByTime", "#DasherDirect"]
  },
  amazon: {
    title: "Amazon Flex Block Valuation",
    content: "Amazon Flex blocks (e.g., $90 for 4 hours) look high-paying, but mileage can be brutal (often 80+ miles). Always input your estimated block mileage here BEFORE accepting a reserve block. If your Real Hourly Wage drops below $15 after gas, it might be better to wait for a Surge Block.",
    tags: ["#FlexBlocks", "#WholeFoods", "#SurgePay", "#IndependentContractor"]
  }
};

const DynamicContent = ({ activeTab }: { activeTab: string }) => {
  const [platform, setPlatform] = useState('uber');

  // Schema Markup for SEO & Trust
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'GigCalc',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GigCalc US',
      url: 'https://gigcalcapp.com',
      logo: 'https://gigcalcapp.com/favicon.ico',
      description: 'Free financial calculator and tax tools for US gig economy workers.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Calculate Real Hourly Wage for Uber & DoorDash',
      description: 'Learn how to calculate your true net profit after gas and depreciation.',
      step: [
        { '@type': 'HowToStep', name: 'Enter Total Payout', text: 'Input your total earnings from the driver app.', url: 'https://gigcalcapp.com' },
        { '@type': 'HowToStep', name: 'Input Miles & Hours', text: 'Enter the total miles driven and hours worked during the shift.', url: 'https://gigcalcapp.com' },
        { '@type': 'HowToStep', name: 'Check Real Wage', text: 'GigCalc automatically subtracts gas and wear & tear to show your actual hourly profit.', url: 'https://gigcalcapp.com' }
      ]
    }
  ];

  const faqs = FAQ_DATA[activeTab] || [];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item: any) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  };

  return (
    <div className="px-6 py-8 bg-slate-50 border-t border-slate-200">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* FAQ Section */}
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><span>💡</span> FAQ & Tips</h3>
      <div className="space-y-6 text-slate-600 mb-10">
        {faqs.map((item: any, index: number) => (
          <article key={index} className="animate-fade-in-up">
            <h4 className="text-xs font-bold text-slate-800 mb-1">{item.q}</h4>
            <p className="text-[11px] leading-relaxed opacity-90">{item.a}</p>
          </article>
        ))}
      </div>

      {/* [NEW] Platform Guides Section (Content Booster) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm animate-fade-in-up">
        <h3 className="text-sm font-bold text-slate-900 mb-3">📚 Platform Guide</h3>
        <p className="text-[10px] text-slate-400 mb-3">Select your app for specific strategies:</p>
        
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
          {Object.keys(PLATFORM_GUIDES).map((key) => (
            <button key={key} onClick={() => setPlatform(key)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors ${platform === key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              {key === 'uber' ? 'Uber / Lyft' : key === 'doordash' ? 'DoorDash' : 'Amazon Flex'}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <h4 className="text-xs font-bold text-blue-600 mb-2">{PLATFORM_GUIDES[platform].title}</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{PLATFORM_GUIDES[platform].content}</p>
          <div className="flex flex-wrap gap-1">
            {PLATFORM_GUIDES[platform].tags.map((tag: string, i: number) => (
              <span key={i} className="text-[9px] bg-white text-slate-400 px-2 py-1 rounded border border-slate-100">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- [Modals & Banners] ---

const FeedbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Send Feedback</h3>
        <form action="https://formspree.io/f/xldqqkdb" method="POST" className="space-y-3 mt-4">
          <textarea name="message" placeholder="Bug report or suggestion?" className="w-full h-32 p-4 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 ring-blue-100 resize-none" required></textarea>
          <input type="email" name="email" placeholder="Email (Optional)" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 ring-blue-100" />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">Send Message 🚀</button>
        </form>
      </div>
    </div>
  );
};

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Privacy Policy & Terms</h2>
        <div className="text-xs text-slate-600 space-y-4 leading-relaxed">
          <p><strong>1. Data Collection:</strong> GigCalc.US does not store any personal data entered into the calculator on our servers. All calculations are performed locally on your device.</p>
          <p><strong>2. Cookies:</strong> We use third-party vendors, including Google, which use cookies to serve ads based on a user's prior visits to this website. We also use Google Analytics.</p>
          <p><strong>3. User Rights:</strong> Users may opt out of personalized advertising by visiting Google Ads Settings. By using this site, you consent to our use of cookies.</p>
          <p><strong>4. Disclaimer:</strong> This tool is for informational purposes only. Estimates vary by location and vehicle type.</p>
          <p className="text-slate-400 mt-6 pt-4 border-t">Last Updated: Dec 2025</p>
        </div>
        <button onClick={onClose} className="w-full mt-6 bg-slate-100 text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-200 transition">Close</button>
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
      <p className="text-xs text-slate-600 text-center sm:text-left">🍪 We use cookies to improve experience and serve ads. By using this site, you agree to our Privacy Policy.</p>
      <button onClick={() => { localStorage.setItem('cookieConsent', 'true'); setShow(false); }} className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-blue-700 transition shadow-sm whitespace-nowrap">I Accept</button>
    </div>
  );
};

// --- [Main Page Logic] ---

export default function Page() {
  const [activeTab, setActiveTab] = useState('profit');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Calculator States
  const [income, setIncome] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [miles, setMiles] = useState<string>('');
  const [orders, setOrders] = useState<string>('');
  const [gasPrice, setGasPrice] = useState<string>('3.50');
  const [mpg, setMpg] = useState<string>('25');
  const [realWage, setRealWage] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [profitPerMile, setProfitPerMile] = useState(0);
  const [payPerOrder, setPayPerOrder] = useState(0);
  const IRS_RATE = 0.67;
  const [deduction, setDeduction] = useState(0);
  
  // Advanced States
  const [targetMoney, setTargetMoney] = useState<string>('');
  const [myHourlyWage, setMyHourlyWage] = useState<string>('20');
  const [homePrice, setHomePrice] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [propertyTaxRate, setPropertyTaxRate] = useState<string>('1.2');
  const [isRenting, setIsRenting] = useState(false);
  const [monthlyRent, setMonthlyRent] = useState<string>('2200');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [totalMonthlyCost, setTotalMonthlyCost] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [interestDeduction, setInterestDeduction] = useState(0);

  // Safe Spend & Settings
  const [saveTaxRate, setSaveTaxRate] = useState<string>('15');
  const [saveRepairRate, setSaveRepairRate] = useState<string>('0.08');
  const [saveEmergencyRate, setSaveEmergencyRate] = useState<string>('5');
  const [saveVacationRate, setSaveVacationRate] = useState<string>('3');
  const [useTax, setUseTax] = useState(true);
  const [useRepair, setUseRepair] = useState(true);
  const [useEmergency, setUseEmergency] = useState(true);
  const [useVacation, setUseVacation] = useState(true);
  const [safeSpendAmount, setSafeSpendAmount] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [repairSavings, setRepairSavings] = useState(0);
  const [emergencySavings, setEmergencySavings] = useState(0);
  const [vacationSavings, setVacationSavings] = useState(0);

  // Calculation Effect
  useEffect(() => {
    const inc = parseFloat(income) || 0;
    const hrs = parseFloat(hours) || 1;
    const mi = parseFloat(miles) || 0;
    const ord = parseFloat(orders) || 0;
    const gas = parseFloat(gasPrice) || 3.5;
    const carMpg = parseFloat(mpg) || 25;

    const fuelCost = (mi / carMpg) * gas;
    const wearCost = mi * 0.1; 
    const totalCost = fuelCost + wearCost;
    const net = inc - totalCost;
    const wage = net / hrs;

    setNetProfit(parseFloat(net.toFixed(2)));
    setRealWage(parseFloat(wage.toFixed(2)));
    setProfitPerMile(mi > 0 ? parseFloat((net / mi).toFixed(2)) : 0);
    setPayPerOrder(ord > 0 ? parseFloat((inc / ord).toFixed(2)) : 0);
    setDeduction(parseFloat((mi * IRS_RATE).toFixed(2)));
    if (wage > 0) setMyHourlyWage(wage.toFixed(2));

    // House Calc
    const price = parseFloat(homePrice) || 0;
    const downPercent = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 30;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const rent = parseFloat(monthlyRent) || 0;
    const loanPrincipal = price * (1 - downPercent / 100);
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    let mortgage = monthlyRate > 0 ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1) : loanPrincipal / numberOfPayments;
    const taxMonthly = (price * (taxRate / 100)) / 12;
    setMonthlyPayment(mortgage);
    setMonthlyTax(taxMonthly);
    setTotalMonthlyCost(mortgage + taxMonthly);
    setCashFlow(rent - (mortgage + taxMonthly));
    setInterestDeduction(loanPrincipal * (rate / 100));

    // Wallet Calc
    const repairFund = useRepair ? mi * (parseFloat(saveRepairRate) || 0) : 0;
    const taxableIncome = Math.max(0, net - (mi * IRS_RATE));
    const taxFund = useTax ? taxableIncome * ((parseFloat(saveTaxRate) || 15) / 100) : 0;
    const emergencyFund = useEmergency ? net * ((parseFloat(saveEmergencyRate) || 5) / 100) : 0;
    const vacationFund = useVacation ? net * ((parseFloat(saveVacationRate) || 3) / 100) : 0;
    
    setRepairSavings(parseFloat(repairFund.toFixed(2)));
    setTaxSavings(parseFloat(taxFund.toFixed(2)));
    setEmergencySavings(parseFloat(emergencyFund.toFixed(2)));
    setVacationSavings(parseFloat(vacationFund.toFixed(2)));
    setSafeSpendAmount(parseFloat((net - repairFund - taxFund - emergencyFund - vacationFund).toFixed(2)));

  }, [income, hours, miles, orders, gasPrice, mpg, homePrice, downPayment, interestRate, loanTerm, propertyTaxRate, isRenting, monthlyRent, saveTaxRate, saveRepairRate, saveEmergencyRate, saveVacationRate, useTax, useRepair, useEmergency, useVacation]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center pt-0 sm:pt-6">
      <div className="w-full max-w-[480px] bg-white sm:min-h-[800px] sm:h-auto sm:rounded-[2rem] sm:shadow-2xl sm:border border-slate-100 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <header className="px-6 py-5 bg-white flex items-center justify-center sticky top-0 z-50 border-b border-slate-50">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">Gig<span className="text-blue-600">Calc</span>.US</h1>
        </header>

        {/* Tab Navigation */}
        <div className="px-4 py-3 bg-white">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl overflow-x-auto scrollbar-hide">
            {[{ id: 'profit', label: 'Driver', icon: Icons.Profit }, { id: 'safe', label: 'Wallet', icon: Icons.Wallet }, { id: 'tax', label: 'Shield', icon: Icons.Shield }, { id: 'goal', label: 'Goal', icon: Icons.Target }, { id: 'house', label: 'House', icon: Icons.House }].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 min-w-[60px] flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-[10px] font-bold transition-all duration-200 ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}>
                <span><tab.icon /></span>{tab.label}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 py-2 pb-6">
            
            {/* --- TAB: PROFIT --- */}
            {activeTab === 'profit' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Driver Profit Calc</h2><p className="text-xs text-slate-500 mt-1">For Uber Eats, DoorDash, Flex Drivers</p></div>
                <div className="mb-8">
                  <label className="text-base font-black text-slate-700 uppercase tracking-tight mb-3 block">Total App Payout (Gross Income)</label>
                  <div className="flex items-center bg-slate-50 rounded-2xl px-5 py-5 focus-within:ring-2 ring-blue-500/20 transition-all border border-slate-100 shadow-inner">
                    <span className="text-3xl font-bold text-blue-600 mr-2">$</span>
                    <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="0.00" className="w-full bg-transparent text-5xl font-black text-slate-900 outline-none placeholder-slate-200" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Hours</label><input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none" /></div>
                  <div className="col-span-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Miles (Active or Total) ⓘ</label><input type="number" value={miles} onChange={(e) => setMiles(e.target.value)} placeholder="Check app" className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none border-2 border-blue-50/50 focus:border-blue-100" /></div>
                </div>
                <div className="mt-4"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Total Orders (Optional)</label><input type="number" value={orders} onChange={(e) => setOrders(e.target.value)} className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none" /></div>
                <details className="group mt-4"><summary className="list-none flex items-center justify-between text-xs font-bold text-slate-400 cursor-pointer py-3 px-2 hover:bg-slate-50 rounded-lg transition"><span>Vehicle Expenses (Gas & Mileage)</span><span className="group-open:rotate-180 transition text-slate-300">▼</span></summary><div className="grid grid-cols-2 gap-4 mt-2 bg-slate-50 p-4 rounded-2xl"><div><label className="text-[10px] font-bold text-slate-400 uppercase">Gas Price ($)</label><input type="number" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none" /></div><div><label className="text-[10px] font-bold text-slate-400 uppercase">Gas Mileage</label><input type="number" value={mpg} onChange={(e) => setMpg(e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none" /><p className="text-[9px] text-slate-400 mt-1 text-right">Miles per Gallon</p></div></div></details>
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl mt-6 relative overflow-hidden">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Real Net Profit (Take Home)</p>
                  <div className="text-6xl font-black tracking-tighter mb-2 text-emerald-400">${netProfit > 0 ? netProfit.toFixed(2) : '0.00'}</div>
                  <div className="flex items-center gap-2 mb-4 opacity-80"><span className="text-xs font-bold text-slate-300">Hourly Wage:</span><span className="text-xl font-bold text-white">${realWage > 0 ? realWage : '0.00'}/hr</span></div>
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-4"><div><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Profit Per Mile</p><p className={`text-xl font-extrabold ${profitPerMile < 1.0 ? 'text-yellow-400' : 'text-white'}`}>${profitPerMile.toFixed(2)} <span className="text-xs font-medium opacity-50">/mi</span></p></div><div><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Pay Per Order</p><p className="text-xl font-extrabold text-white">${payPerOrder.toFixed(2)} <span className="text-xs font-medium opacity-50">/avg</span></p></div></div>
                </div>
                <AdSlot />
              </div>
            )}

            {/* --- TAB: SAFE SPEND --- */}
            {activeTab === 'safe' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Your Smart Wallet</h2><p className="text-xs text-slate-500 mt-1">Customize your savings.</p></div>
                <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl shadow-emerald-200 relative overflow-hidden mb-6"><p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest mb-1">Today's "Safe to Spend"</p><div className="text-6xl font-black tracking-tighter mb-2">${safeSpendAmount > 0 ? safeSpendAmount.toFixed(2) : '0.00'}</div><p className="text-xs font-medium text-emerald-100 opacity-90">Today's Guilt-Free Money 🍺</p></div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100"><span className="text-xs font-bold text-slate-900">Net Profit</span><span className="text-sm font-black text-slate-900">${netProfit.toFixed(2)}</span></div>
                  <div className="space-y-3">
                    {useRepair && (<div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span><div><p className="text-xs font-bold text-slate-700">Car Repair Fund</p><p className="text-[10px] text-slate-400">Tires, Oil (${saveRepairRate}/mi)</p></div></div><span className="text-sm font-bold text-orange-500">-${repairSavings.toFixed(2)}</span></div>)}
                    {useTax && (<div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span><div><p className="text-xs font-bold text-slate-700">Tax Savings</p><p className="text-[10px] text-slate-400">IRS Bill ({saveTaxRate}%)</p></div></div><span className="text-sm font-bold text-blue-500">-${taxSavings.toFixed(2)}</span></div>)}
                    {useEmergency && (<div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span><div><p className="text-xs font-bold text-slate-700">Emergency Fund</p><p className="text-[10px] text-slate-400">Sick Day ({saveEmergencyRate}%)</p></div></div><span className="text-sm font-bold text-red-500">-${emergencySavings.toFixed(2)}</span></div>)}
                    {useVacation && (<div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span><div><p className="text-xs font-bold text-slate-700">Vacation Fund</p><p className="text-[10px] text-slate-400">PTO ({saveVacationRate}%)</p></div></div><span className="text-sm font-bold text-purple-500">-${vacationSavings.toFixed(2)}</span></div>)}
                  </div>
                </div>
                <details className="group mt-4 bg-slate-50 rounded-2xl border border-slate-100"><summary className="flex items-center justify-between p-4 cursor-pointer"><span className="text-xs font-bold text-slate-500">Customize Funds (On/Off)</span><span className="text-slate-400 text-xs transition group-open:rotate-180">▼</span></summary><div className="px-4 pb-4 space-y-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><input type="checkbox" checked={useRepair} onChange={(e) => setUseRepair(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /><label className="text-xs font-bold text-slate-700">Car Repair ($/mi)</label></div><input type="number" step="0.01" value={saveRepairRate} onChange={(e) => setSaveRepairRate(e.target.value)} className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs" /></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><input type="checkbox" checked={useTax} onChange={(e) => setUseTax(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /><label className="text-xs font-bold text-slate-700">Tax (%)</label></div><input type="number" value={saveTaxRate} onChange={(e) => setSaveTaxRate(e.target.value)} className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs" /></div></div></details>
                <AdSlot />
              </div>
            )}

            {/* --- TAB: TAX SHIELD --- */}
            {activeTab === 'tax' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Tax Shield</h2><p className="text-xs text-slate-500 mt-1">IRS Deduction: <b>67¢ / mile</b></p></div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-4"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">Miles Driven</label><div className="flex items-center border-b-2 border-blue-500 py-2"><input type="number" value={miles} onChange={(e) => setMiles(e.target.value)} placeholder="0" className="w-full text-4xl font-extrabold text-slate-900 outline-none" /><span className="text-sm font-bold text-slate-400 ml-2">mi</span></div></div>
                <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-200 text-center mb-4"><p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Deductible Income</p><div className="text-5xl font-black tracking-tighter mb-2">${deduction.toFixed(2)}</div><p className="text-xs font-medium text-blue-100 opacity-90">IRS Standard Deduction Amount</p></div>
                <AdSlot />
              </div>
            )}

            {/* --- TAB: GOAL --- */}
            {activeTab === 'goal' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Shift Planner</h2><p className="text-xs text-slate-500 mt-1">How long to reach your goal?</p></div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 mb-6"><div><label className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-2 block">Target ($)</label><div className="flex items-center bg-blue-50 px-4 py-3 rounded-2xl"><span className="text-xl font-bold text-blue-300 mr-2">$</span><input type="number" value={targetMoney} onChange={(e) => setTargetMoney(e.target.value)} placeholder="200" className="w-full bg-transparent text-3xl font-extrabold text-blue-900 outline-none placeholder-blue-200" /></div></div><div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">Hourly Wage</label><div className="flex items-center border-b border-slate-200 py-2"><span className="text-lg font-bold text-slate-300 mr-2">$</span><input type="number" value={myHourlyWage} onChange={(e) => setMyHourlyWage(e.target.value)} className="w-full bg-transparent text-2xl font-bold text-slate-700 outline-none" /><span className="text-xs font-bold text-slate-400">/hr</span></div></div></div>
                <div className="grid grid-cols-2 gap-4"><div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl flex flex-col justify-between aspect-square"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hours</span><div className="text-4xl font-black tracking-tighter">{targetMoney ? (parseFloat(targetMoney) / parseFloat(myHourlyWage)).toFixed(1) : '0'}<span className="text-lg font-medium text-slate-500 ml-1">h</span></div></div><div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-3xl flex flex-col justify-between aspect-square shadow-sm"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days (8h)</span><div className="text-4xl font-black text-blue-600 tracking-tighter">{targetMoney ? (parseFloat(targetMoney) / parseFloat(myHourlyWage) / 8).toFixed(1) : '0'}<span className="text-lg font-medium text-slate-400 ml-1">d</span></div></div></div>
                <AdSlot />
              </div>
            )}

            {/* --- TAB: HOUSE --- */}
            {activeTab === 'house' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-4 pt-2"><h2 className="text-lg font-bold text-slate-900">Home Buying Calc 🏠</h2><p className="text-xs text-slate-500 mt-1">Live in it? Or Rent it out?</p></div>
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6"><button onClick={() => setIsRenting(false)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isRenting ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Live (My Home)</button><button onClick={() => setIsRenting(true)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isRenting ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400'}`}>Rent (Investment)</button></div>
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Home Price</label><div className="flex items-center border-b border-slate-200 pb-1"><span className="text-lg font-bold text-slate-300 mr-2">$</span><input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full text-2xl font-black text-slate-900 outline-none" /></div></div>
                    <div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Down Payment (%)</label><input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none" /></div><div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Loan Term</label><input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none" /></div></div>
                    <div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Interest (%)</label><input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none" /></div><div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Prop. Tax (%)</label><input type="number" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(e.target.value)} className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none" /></div></div>
                    {isRenting && (<div className="bg-blue-50 p-3 rounded-xl border border-blue-100 animate-fade-in-up"><label className="text-[10px] font-bold text-blue-600 uppercase mb-1 block">Expected Monthly Rent</label><div className="flex items-center"><span className="text-lg font-bold text-blue-300 mr-2">$</span><input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full bg-transparent text-2xl font-black text-blue-900 outline-none" /></div></div>)}
                  </div>
                  <div className={`p-6 rounded-3xl shadow-xl transition-colors ${isRenting ? cashFlow >= 0 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white' : 'bg-slate-900 text-white'}`}>
                    {!isRenting && (<><p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Monthly Cost</p><div className="text-5xl font-black tracking-tighter mb-2">${totalMonthlyCost.toFixed(0)}</div><div className="text-xs text-slate-400 flex justify-between pt-4 border-t border-slate-700"><span>Mortgage: <b>${monthlyPayment.toFixed(0)}</b></span><span>Tax: <b>${monthlyTax.toFixed(0)}</b></span></div></>)}
                    {isRenting && (<><p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">Monthly Cash Flow</p><div className="text-5xl font-black tracking-tighter mb-2">{cashFlow >= 0 ? '+' : ''}${cashFlow.toFixed(0)}</div><p className="text-xs font-medium text-white/90 mb-4">{cashFlow >= 0 ? 'You make money!' : 'You lose money.'}</p></>)}
                  </div>
                </div>
                <AdSlot />
              </div>
            )}
          </div>

          {/* DYNAMIC CONTENT SECTION (SEO/GEO BOOST) */}
          <DynamicContent activeTab={activeTab} />

          {/* Footer Area with Privacy Policy Link */}
          <div className="px-6 pb-24 text-center border-t border-slate-200 pt-8 bg-slate-100">
            <button onClick={() => setIsFeedbackOpen(true)} className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-2 mx-auto mb-4 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm transition"><Icons.Mail /> Send Feedback</button>
            <p className="text-[10px] text-slate-400 leading-relaxed uppercase mb-2"><strong>DISCLAIMER:</strong> Informational only. Consult a pro.</p>
            <p className="text-[10px] text-slate-400 mb-4"><button onClick={() => setIsPrivacyOpen(true)} className="underline hover:text-slate-600">Privacy Policy</button></p>
            <p className="text-[10px] text-slate-300">© {new Date().getFullYear()} GigCalc.US</p>
          </div>
        </main>

        <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-slate-200 p-2 z-50 flex justify-center"><span className="text-[9px] font-bold text-slate-300 uppercase">Sponsored Ad Space</span></div>
        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <CookieBanner />
      </div>
    </div>
  );
}
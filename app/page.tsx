'use client';

import React, { useState, useEffect } from 'react';

// --- [Icons] ---
const Icons = {
  Profit: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> ),
  Shield: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> ),
  Target: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> ),
  House: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> ),
  Wallet: () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z" /></svg> ),
  Share: () => ( <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> ),
  Mail: () => ( <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> ),
  ArrowDown: () => ( <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> )
};

const AdSlot = ({ label = 'Sponsored', className = '' }) => (
  <div className={`w-full bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center py-6 px-4 my-6 ${className}`}>
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
    <div className="w-full h-16 bg-slate-200 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-xs text-slate-400 font-medium">Google AdSense Area</span>
    </div>
  </div>
);

// --- [Content Data] ---

const FAQ_DATA: any = {
  profit: [
    { 
      q: 'Does the 2025 "No Tax on Tips" law apply to me?', 
      a: "BE CAREFUL. The new law only exempts tips from 'Federal Income Tax'. It does NOT exempt you from 'Self-Employment Tax' (15.3%). As a driver, you still owe the 15.3% tax on your tips. This calculator includes that hidden tax to keep you safe from IRS penalties." 
    },
    { 
      q: 'The $400 Rule (Schedule C)', 
      a: "If your Net Profit (Earnings - Expenses) is over $400, you MUST file Schedule C and pay Self-Employment Tax (15.3%), even if you didn't get a 1099 form. This is the #1 mistake new drivers make." 
    }
  ],
  safe: [
    { q: 'Can I deduct Gas AND Mileage?', a: 'NO. You generally must choose ONE: Standard Mileage Rate (67¢/mile) OR Actual Expenses (gas, repairs, insurance). You cannot double-dip. For most drivers, the Mileage Rate saves more money.' },
    { q: 'How to survive an IRS Audit?', a: "The burden of proof is on YOU. 'Aimless driving' doesn't count. Use a mileage tracking app (like Stride or Gridwise) to log every trip. Uber's summary log is often insufficient for an audit." }
  ],
  tax: [
    { q: 'I am a student / dependent. Do I file?', a: 'YES. Even if your parents claim you as a dependent, if your Gig Net Profit is over $400, you MUST file your own tax return to pay the 15.3% SE Tax. Being a student does not exempt you from this.' },
    { q: 'Quarterly Taxes (1040-ES)?', a: "If you expect to owe more than $1,000 in taxes when you file, the IRS requires quarterly estimated payments to avoid underpayment penalties." }
  ],
  goal: [ { q: 'How many hours to earn $1000 net?', a: "Focus on Net Profit per Hour. If you earn $25 gross but $15 net, you need 67 hours, not 40. This tool reveals that reality." } ],
  house: [ { q: 'Mortgage for Gig Workers?', a: "Lenders look at Line 31 (Net Profit) of your Schedule C. Huge mileage deductions save you tax money but lower the income you can show to a bank for a loan." } ]
};

const PLATFORM_GUIDES: any = {
  uber: {
    title: "Uber/Lyft: Audit Proofing & Deadhead Miles",
    content: "IRS Red Flag: Claiming 100% of total miles. Commuting from home to the first ride is usually NOT deductible. Only miles between rides and to pickups count. Don't rely on Uber's year-end summary; it often misses 'deadhead' miles (driving back from a drop-off). Track it yourself.",
    tags: ["#AuditRisk", "#DeadheadMiles", "#ScheduleC", "#QuarterlyTax"]
  },
  doordash: {
    title: "DoorDash: The 'No Tax on Tips' Myth",
    content: "Current Law Alert: Tips are fully taxable for Self-Employment Tax (15.3%), even if exempt from Income Tax. DoorDash only sends a 1099-NEC if you make over $600, but you must report income if profit > $400. Don't get caught by the IRS thinking small amounts don't matter.",
    tags: ["#TaxOnTips", "#DasherTax", "#StudentTax", "#StandardDeduction"]
  },
  amazon: {
    title: "Amazon Flex: High Mileage Strategy",
    content: "Amazon Flex blocks often involve high mileage (80+ miles/block). The Standard Mileage Rate (67¢) acts as a massive tax shield here. Actual expenses (gas receipts) rarely beat the standard deduction for Flex drivers unless you drive a heavy truck.",
    tags: ["#FlexDriver", "#MileageRate", "#EstimatedTax", "#BasePay"]
  }
};

const DynamicContent = ({ activeTab }: { activeTab: string }) => {
  const [platform, setPlatform] = useState('uber');
  
  // SEO Strategy: Dynamic URL Updates
  useEffect(() => {
    // This updates the URL query param without reloading the page
    // Good for tracking which platform guide is active
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('guide', platform);
      window.history.replaceState({}, '', url);
    }
  }, [platform]);

  // SEO Schemas
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'GigCalc', applicationCategory: 'FinanceApplication', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'GigCalc US', url: 'https://gigcalcapp.com', logo: 'https://gigcalcapp.com/favicon.ico' },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'Calculate Gig Tax & Profit', step: [{ '@type': 'HowToStep', name: 'Input Earnings' }, { '@type': 'HowToStep', name: 'Input Mileage' }, { '@type': 'HowToStep', name: 'Check Tax Liability' }] }
  ];
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_DATA[activeTab]?.map((item: any) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) || [] };

  return (
    <div className="px-6 py-8 bg-slate-50 border-t border-slate-200" id="guides">
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><span>💡</span> Expert FAQ (Reddit Answered)</h3>
      <div className="space-y-6 text-slate-600 mb-10">
        {FAQ_DATA[activeTab]?.map((item: any, index: number) => (
          <article key={index} className="animate-fade-in-up">
            <h4 className="text-xs font-bold text-slate-800 mb-1">{item.q}</h4>
            <p className="text-[11px] leading-relaxed opacity-90">{item.a}</p>
          </article>
        ))}
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm animate-fade-in-up mb-8">
        <h3 className="text-sm font-bold text-slate-900 mb-3">📚 Platform Specific Tax Guide</h3>
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

      {/* [NEW] GEO-Optimized Comparison Table */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4">🏆 Standard Deduction vs. Actual Expenses</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="text-[10px] font-bold text-slate-500 uppercase p-2 border-b border-slate-100">Method</th>
                <th className="text-[10px] font-bold text-slate-500 uppercase p-2 border-b border-slate-100">Deductible Items</th>
                <th className="text-[10px] font-bold text-slate-500 uppercase p-2 border-b border-slate-100">Best For</th>
              </tr>
            </thead>
            <tbody className="text-[10px] text-slate-600">
              <tr>
                <td className="p-2 border-b border-slate-50 font-bold text-blue-600">Standard (67¢/mi)</td>
                <td className="p-2 border-b border-slate-50">Mileage only (covers gas, insurance, repairs, depreciation)</td>
                <td className="p-2 border-b border-slate-50">95% of Drivers (Prius, Civic, High Mileage)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-700">Actual Expenses</td>
                <td className="p-2">Gas receipts, Repair bills, Insurance %</td>
                <td className="p-2">Low Mileage + Gas Guzzlers / Expensive Repairs</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[9px] text-slate-400 mt-2 text-center">Note: You cannot switch back to Standard if you start with Actual (depreciation rules).</p>
      </div>
    </div>
  );
};

// --- [Modals & Components] ---

const ShareButton = ({ text, value }: { text: string, value: string }) => {
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
    <button onClick={handleShare} className="text-[10px] font-bold text-blue-500 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition">
      <Icons.Share /> {copied ? 'Copied!' : 'Share'}
    </button>
  );
};

const FeedbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
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
      <p className="text-xs text-slate-600 text-center sm:text-left">🍪 We use cookies for ads & analytics. By using this site, you agree to our Privacy Policy.</p>
      <button onClick={() => { localStorage.setItem('cookieConsent', 'true'); setShow(false); }} className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-blue-700 shadow-sm whitespace-nowrap">I Accept</button>
    </div>
  );
};

// --- [Main Page] ---

export default function Page() {
  const [activeTab, setActiveTab] = useState('profit');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // States
  const [income, setIncome] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [miles, setMiles] = useState<string>('');
  const [orders, setOrders] = useState<string>('');
  const [gasPrice, setGasPrice] = useState<string>('3.50');
  const [mpg, setMpg] = useState<string>('25');
  
  // Results
  const [realWage, setRealWage] = useState(0);
  const [netProfit, setNetProfit] = useState(0); // Real Pocket Money
  const [profitPerMile, setProfitPerMile] = useState(0);
  const [payPerOrder, setPayPerOrder] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [taxLiability, setTaxLiability] = useState(0); // SE Tax
  
  // Advanced & Settings
  const [targetMoney, setTargetMoney] = useState<string>('');
  const [myHourlyWage, setMyHourlyWage] = useState<string>('20');
  const [homePrice, setHomePrice] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [propertyTaxRate, setPropertyTaxRate] = useState<string>('1.2');
  const [isRenting, setIsRenting] = useState(false);
  const [monthlyRent, setMonthlyRent] = useState<string>('2200');
  const [saveTaxRate, setSaveTaxRate] = useState<string>('20'); 
  const [saveRepairRate, setSaveRepairRate] = useState<string>('0.08');
  const [saveEmergencyRate, setSaveEmergencyRate] = useState<string>('5');
  const [saveVacationRate, setSaveVacationRate] = useState<string>('3');
  const [useTax, setUseTax] = useState(true);
  const [useRepair, setUseRepair] = useState(true);
  const [useEmergency, setUseEmergency] = useState(true);
  const [useVacation, setUseVacation] = useState(true);
  
  // Savings Results
  const [safeSpendAmount, setSafeSpendAmount] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [repairSavings, setRepairSavings] = useState(0);
  const [emergencySavings, setEmergencySavings] = useState(0);
  const [vacationSavings, setVacationSavings] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [totalMonthlyCost, setTotalMonthlyCost] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [interestDeduction, setInterestDeduction] = useState(0);

  const IRS_RATE = 0.67;

  // SEO: Dynamic Title Update
  useEffect(() => {
    const tabTitles: any = {
      profit: "Driver Profit Calc - GigCalc.US",
      safe: "Tax & Safe Spend - GigCalc.US",
      tax: "Mileage Tax Shield - GigCalc.US",
      goal: "Shift Planner - GigCalc.US",
      house: "Mortgage Calc - GigCalc.US"
    };
    document.title = tabTitles[activeTab] || "GigCalc.US - Driver Profit & Tax Tool";
    
    // URL Parameter Update
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      window.history.replaceState({}, '', url);
    }
  }, [activeTab]);

  useEffect(() => {
    const inc = parseFloat(income) || 0;
    const hrs = parseFloat(hours) || 1;
    const mi = parseFloat(miles) || 0;
    const ord = parseFloat(orders) || 0;
    const gas = parseFloat(gasPrice) || 3.5;
    const carMpg = parseFloat(mpg) || 25;

    // 1. Real Wallet Calculation (Actual Expense)
    const fuelCost = (mi / carMpg) * gas;
    const wearCost = mi * 0.1; 
    const totalActualCost = fuelCost + wearCost;
    const net = inc - totalActualCost; // Real Net Profit
    const wage = net / hrs;

    setNetProfit(parseFloat(net.toFixed(2)));
    setRealWage(parseFloat(wage.toFixed(2)));
    setProfitPerMile(mi > 0 ? parseFloat((net / mi).toFixed(2)) : 0);
    setPayPerOrder(ord > 0 ? parseFloat((inc / ord).toFixed(2)) : 0);
    setDeduction(parseFloat((mi * IRS_RATE).toFixed(2)));
    if (wage > 0) setMyHourlyWage(wage.toFixed(2));

    // 2. Tax Calculation (IRS Method)
    const taxableIncomeForTax = Math.max(0, inc - (mi * IRS_RATE));
    const seTaxBase = taxableIncomeForTax * 0.9235;
    const estimatedSETax = seTaxBase * 0.153;
    setTaxLiability(parseFloat(estimatedSETax.toFixed(2)));

    // 3. Other Calcs
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

    const repairFund = useRepair ? mi * (parseFloat(saveRepairRate) || 0) : 0;
    const userTaxRate = (parseFloat(saveTaxRate) || 20) / 100;
    const taxFund = useTax ? Math.max(estimatedSETax, taxableIncomeForTax * userTaxRate) : 0; 
    
    const emergencyFund = useEmergency ? net * ((parseFloat(saveEmergencyRate) || 5) / 100) : 0;
    const vacationFund = useVacation ? net * ((parseFloat(saveVacationRate) || 3) / 100) : 0;
    
    setRepairSavings(parseFloat(repairFund.toFixed(2)));
    setTaxSavings(parseFloat(taxFund.toFixed(2)));
    setEmergencySavings(parseFloat(emergencyFund.toFixed(2)));
    setVacationSavings(parseFloat(vacationFund.toFixed(2)));
    setSafeSpendAmount(parseFloat((net - repairFund - taxFund - emergencyFund - vacationFund).toFixed(2)));

  }, [income, hours, miles, orders, gasPrice, mpg, homePrice, downPayment, interestRate, loanTerm, propertyTaxRate, isRenting, monthlyRent, saveTaxRate, saveRepairRate, saveEmergencyRate, saveVacationRate, useTax, useRepair, useEmergency, useVacation]);

  const scrollToGuides = () => {
    document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center pt-0 sm:pt-6">
      <div className="w-full max-w-[480px] bg-white sm:min-h-[800px] sm:h-auto sm:rounded-[2rem] sm:shadow-2xl sm:border border-slate-100 flex flex-col relative overflow-hidden">
        
        <header className="px-6 py-5 bg-white flex items-center justify-center sticky top-0 z-50 border-b border-slate-50">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">Gig<span className="text-blue-600">Calc</span>.US</h1>
        </header>

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
            
            {/* PROFIT TAB */}
            {activeTab === 'profit' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Driver Profit Calc</h2><p className="text-xs text-slate-500 mt-1">For Uber Eats, DoorDash, Flex Drivers</p></div>
                <div className="mb-8">
                  <label className="text-base font-black text-slate-700 uppercase tracking-tight mb-3 block">Total App Payout (Gross)</label>
                  <div className="flex items-center bg-slate-50 rounded-2xl px-5 py-5 focus-within:ring-2 ring-blue-500/20 transition-all border border-slate-100 shadow-inner">
                    <span className="text-3xl font-bold text-blue-600 mr-2">$</span>
                    <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="0.00" className="w-full bg-transparent text-5xl font-black text-slate-900 outline-none placeholder-slate-200" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Hours</label><input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none" /></div>
                  <div className="col-span-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Miles (Active + Return) ⓘ</label><input type="number" value={miles} onChange={(e) => setMiles(e.target.value)} placeholder="Check app" className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none border-2 border-blue-50/50 focus:border-blue-100" /></div>
                </div>
                <div className="mt-4"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block text-center">Total Orders (Optional)</label><input type="number" value={orders} onChange={(e) => setOrders(e.target.value)} className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none" /></div>
                <details className="group mt-4"><summary className="list-none flex items-center justify-between text-xs font-bold text-slate-400 cursor-pointer py-3 px-2 hover:bg-slate-50 rounded-lg transition"><span>Vehicle Expenses (Gas & Mileage)</span><span className="group-open:rotate-180 transition text-slate-300">▼</span></summary><div className="grid grid-cols-2 gap-4 mt-2 bg-slate-50 p-4 rounded-2xl"><div><label className="text-[10px] font-bold text-slate-400 uppercase">Gas Price ($)</label><input type="number" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none" /></div><div><label className="text-[10px] font-bold text-slate-400 uppercase">Gas Mileage</label><input type="number" value={mpg} onChange={(e) => setMpg(e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none" /><p className="text-[9px] text-slate-400 mt-1 text-right">Miles per Gallon</p></div></div></details>
                
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl mt-6 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Real Net Profit (Take Home)</p>
                    <ShareButton text={`My Real Hourly Wage is $${realWage}/hr on GigCalc!`} value={realWage.toString()} />
                  </div>
                  <div className="text-6xl font-black tracking-tighter mb-2 text-emerald-400">${netProfit > 0 ? netProfit.toFixed(2) : '0.00'}</div>
                  
                  {netProfit > 400 && (
                    <div className="inline-block bg-red-500/20 border border-red-500/50 rounded-lg px-3 py-1 mb-3">
                      <p className="text-[10px] font-bold text-red-200 flex items-center gap-1">⚠️ IRS: Must File Schedule C ($400+)</p>
                    </div>
                  )}
                  {netProfit > 400 && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-red-400">Est. SE Tax (15.3%):</span>
                      <span className="text-lg font-bold text-red-400">-${taxLiability.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-4 opacity-80"><span className="text-xs font-bold text-slate-300">Hourly Wage:</span><span className="text-xl font-bold text-white">${realWage > 0 ? realWage : '0.00'}/hr</span></div>
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-4"><div><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Profit Per Mile</p><p className={`text-xl font-extrabold ${profitPerMile < 1.0 ? 'text-yellow-400' : 'text-white'}`}>${profitPerMile.toFixed(2)} <span className="text-xs font-medium opacity-50">/mi</span></p></div><div><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Pay Per Order</p><p className="text-xl font-extrabold text-white">${payPerOrder.toFixed(2)} <span className="text-xs font-medium opacity-50">/avg</span></p></div></div>
                </div>
                
                {/* Engagement Booster */}
                {parseFloat(income) > 0 && (
                  <div onClick={scrollToGuides} className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition animate-pulse">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💡</span>
                      <div>
                        <p className="text-xs font-bold text-blue-800">Wait! Don't overpay taxes.</p>
                        <p className="text-[10px] text-blue-600">See the "No Tax on Tips" trap & Audit tips 👇</p>
                      </div>
                    </div>
                    <Icons.ArrowDown />
                  </div>
                )}

                <AdSlot />
              </div>
            )}

            {/* SAFE SPEND TAB */}
            {activeTab === 'safe' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Your Smart Wallet</h2><p className="text-xs text-slate-500 mt-1">Federal & SE Tax included. State tax varies.</p></div>
                <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl shadow-emerald-200 relative overflow-hidden mb-6">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest">Today's "Safe to Spend"</p>
                    <ShareButton text={`I can safely spend $${safeSpendAmount} today! Calculated by GigCalc.US`} value={safeSpendAmount.toString()} />
                  </div>
                  <div className="text-6xl font-black tracking-tighter mb-2">${safeSpendAmount > 0 ? safeSpendAmount.toFixed(2) : '0.00'}</div><p className="text-xs font-medium text-emerald-100 opacity-90">Today's Guilt-Free Money 🍺</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Net Profit</span>
                    <span className="text-sm font-black text-slate-900">${netProfit.toFixed(2)}</span>
                  </div>
                  
                  {useTax && (
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <div>
                          <p className="text-xs font-bold text-blue-800">Estimated Tax Bill</p>
                          <p className="text-[9px] text-blue-500">SE Tax (~15.3%) + Income Tax</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-blue-600">-${taxSavings.toFixed(2)}</span>
                        {(taxSavings * 260) > 1000 && (
                           <p className="text-[8px] text-red-500 font-bold mt-1">May need Quarterly Pay!</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    {useRepair && (<div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span><div><p className="text-xs font-bold text-slate-700">Car Repair Fund</p><p className="text-[10px] text-slate-400">Tires, Oil (${saveRepairRate}/mi)</p></div></div><span className="text-sm font-bold text-orange-500">-${repairSavings.toFixed(2)}</span></div>)}
                    {useEmergency && (<div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span><div><p className="text-xs font-bold text-slate-700">Emergency Fund</p><p className="text-[10px] text-slate-400">Sick Day ({saveEmergencyRate}%)</p></div></div><span className="text-sm font-bold text-red-500">-${emergencySavings.toFixed(2)}</span></div>)}
                    {useVacation && (<div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span><div><p className="text-xs font-bold text-slate-700">Vacation Fund</p><p className="text-[10px] text-slate-400">PTO ({saveVacationRate}%)</p></div></div><span className="text-sm font-bold text-purple-500">-${vacationSavings.toFixed(2)}</span></div>)}
                  </div>
                  <p className="text-[9px] text-center text-slate-400 mt-2">*State Income Tax not included (varies by location)</p>
                </div>
                <details className="group mt-4 bg-slate-50 rounded-2xl border border-slate-100"><summary className="flex items-center justify-between p-4 cursor-pointer"><span className="text-xs font-bold text-slate-500">Customize Funds (On/Off)</span><span className="text-slate-400 text-xs transition group-open:rotate-180">▼</span></summary><div className="px-4 pb-4 space-y-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><input type="checkbox" checked={useRepair} onChange={(e) => setUseRepair(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /><label className="text-xs font-bold text-slate-700">Car Repair ($/mi)</label></div><input type="number" step="0.01" value={saveRepairRate} onChange={(e) => setSaveRepairRate(e.target.value)} className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs" /></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><input type="checkbox" checked={useTax} onChange={(e) => setUseTax(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /><label className="text-xs font-bold text-slate-700">Tax (%)</label></div><input type="number" value={saveTaxRate} onChange={(e) => setSaveTaxRate(e.target.value)} className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs" /></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><input type="checkbox" checked={useEmergency} onChange={(e) => setUseEmergency(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /><label className="text-xs font-bold text-slate-700">Sick Fund (%)</label></div><input type="number" value={saveEmergencyRate} onChange={(e) => setSaveEmergencyRate(e.target.value)} className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs" /></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><input type="checkbox" checked={useVacation} onChange={(e) => setUseVacation(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /><label className="text-xs font-bold text-slate-700">Vacation (%)</label></div><input type="number" value={saveVacationRate} onChange={(e) => setSaveVacationRate(e.target.value)} className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs" /></div></div></details>
                <AdSlot />
              </div>
            )}

            {/* Other Tabs: Tax, Goal, House (Standard) */}
            {activeTab === 'tax' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Tax Shield</h2><p className="text-xs text-slate-500 mt-1">IRS Deduction: <b>67¢ / mile</b></p></div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-4"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">Miles Driven</label><div className="flex items-center border-b-2 border-blue-500 py-2"><input type="number" value={miles} onChange={(e) => setMiles(e.target.value)} placeholder="0" className="w-full text-4xl font-extrabold text-slate-900 outline-none" /><span className="text-sm font-bold text-slate-400 ml-2">mi</span></div></div>
                <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-200 text-center mb-4"><p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Deductible Income</p><div className="text-5xl font-black tracking-tighter mb-2">${deduction.toFixed(2)}</div><p className="text-xs font-medium text-blue-100 opacity-90">IRS Standard Deduction Amount</p></div>
                <AdSlot />
              </div>
            )}
            {activeTab === 'goal' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2"><h2 className="text-lg font-bold text-slate-900">Shift Planner</h2><p className="text-xs text-slate-500 mt-1">How long to reach your goal?</p></div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 mb-6"><div><label className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-2 block">Target ($)</label><div className="flex items-center bg-blue-50 px-4 py-3 rounded-2xl"><span className="text-xl font-bold text-blue-300 mr-2">$</span><input type="number" value={targetMoney} onChange={(e) => setTargetMoney(e.target.value)} placeholder="200" className="w-full bg-transparent text-3xl font-extrabold text-blue-900 outline-none placeholder-blue-200" /></div></div><div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">Hourly Wage</label><div className="flex items-center border-b border-slate-200 py-2"><span className="text-lg font-bold text-slate-300 mr-2">$</span><input type="number" value={myHourlyWage} onChange={(e) => setMyHourlyWage(e.target.value)} className="w-full bg-transparent text-2xl font-bold text-slate-700 outline-none" /><span className="text-xs font-bold text-slate-400">/hr</span></div></div></div>
                <div className="grid grid-cols-2 gap-4"><div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl flex flex-col justify-between aspect-square"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hours</span><div className="text-4xl font-black tracking-tighter">{targetMoney ? (parseFloat(targetMoney) / parseFloat(myHourlyWage)).toFixed(1) : '0'}<span className="text-lg font-medium text-slate-500 ml-1">h</span></div></div><div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-3xl flex flex-col justify-between aspect-square shadow-sm"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days (8h)</span><div className="text-4xl font-black text-blue-600 tracking-tighter">{targetMoney ? (parseFloat(targetMoney) / parseFloat(myHourlyWage) / 8).toFixed(1) : '0'}<span className="text-lg font-medium text-slate-400 ml-1">d</span></div></div></div>
                <AdSlot />
              </div>
            )}
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

          <DynamicContent activeTab={activeTab} />

          {/* Footer Area with Privacy Policy Link */}
          <div className="px-6 pb-24 text-center border-t border-slate-200 pt-8 bg-slate-100">
            <button onClick={() => setIsFeedbackOpen(true)} className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-2 mx-auto mb-4 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm transition"><Icons.Mail /> Send Feedback</button>
            <div className="text-[10px] text-slate-400 leading-relaxed mb-4 text-justify px-2">
              <strong className="block text-slate-500 mb-1 uppercase">Disclaimer & Legal Notice</strong>
              This tool is provided for <b>informational and educational purposes only</b> and does not constitute professional financial, legal, or tax advice. All calculations are estimates based on user inputs and general 2024-2025 IRS guidelines. We are not responsible for any financial losses or tax penalties. Always consult a certified CPA or tax professional before filing your taxes.
            </div>
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
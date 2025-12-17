'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head'; // SEO 메타태그용 (Next.js App Router에서는 layout.tsx에 넣는 게 정석이지만, 여기서도 일부 처리 가능)

// --- [Components] ---

const Icons = {
  Profit: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Shield: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  Target: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  House: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  Wallet: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  ),
  Plane: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  ),
  Mail: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Info: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

// 광고 (AdSense)
const AdSlot = ({ label = 'Sponsored', className = '' }) => (
  <div
    className={`w-full bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center py-6 px-4 my-6 ${className}`}
  >
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
      {label}
    </span>
    <div className="w-full h-16 bg-slate-200 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-xs text-slate-400 font-medium">
        Google AdSense Area
      </span>
    </div>
  </div>
);

// --- [SEO-Optimized FAQ Data] ---
// 구글 검색어(Keywords)를 질문과 답변에 자연스럽게 녹여냈습니다.
const FAQ_DATA: any = {
  profit: [
    {
      q: 'How do I calculate true profit for Uber Eats and DoorDash?',
      a: "To calculate true profit (Net Income), you must subtract operating costs from your total app payout. This calculator deducts gas and vehicle depreciation (wear & tear) to show your 'Real Hourly Wage', which is often 30-40% lower than the gross revenue shown in the app.",
    },
    {
      q: 'What is a good profit per mile for delivery drivers?',
      a: "Most experienced gig drivers aim for at least $1.50 to $2.00 per mile. If your 'Real $/Mile' is below $1.00, you might be losing money after vehicle expenses.",
    },
  ],
  safe: [
    {
      q: 'How much should gig workers save for taxes?',
      a: 'As an independent contractor (1099), taxes are not withheld. It is recommended to save 15-20% of your Net Profit (after mileage deduction) for quarterly taxes. This tool automatically calculates that safe amount for you.',
    },
    {
      q: 'Why do I need a sinking fund for car repairs?',
      a: "Gig work puts heavy stress on your vehicle. Saving about 5-8 cents per mile creates a 'Sinking Fund' for inevitable costs like tires, brakes, and oil changes, preventing future debt.",
    },
  ],
  tax: [
    {
      q: 'What is the 2024 IRS Standard Mileage Rate?',
      a: 'For 2024, the IRS Standard Mileage Rate is 67 cents per mile for business use. This deduction significantly lowers your taxable income. For example, driving 1,000 miles reduces your taxable income by $670.',
    },
    {
      q: 'Does the mileage deduction count as cash?',
      a: "No, it's a 'Tax Deduction', not a cash reimbursement. However, it acts as a 'Tax Shield' by lowering the amount of income you owe taxes on, effectively keeping more money in your pocket.",
    },
  ],
  goal: [
    {
      q: 'How many hours do I need to drive to earn $500?',
      a: "It depends on your 'Real Hourly Wage'. If your net profit is $20/hr, you need 25 hours. This calculator uses your actual real-time earnings to give you a precise work-hour target.",
    },
  ],
  house: [
    {
      q: 'Can I qualify for a mortgage as a Gig Worker?',
      a: "Yes, but lenders look at your 'Net Profit' on Schedule C, not your gross earnings. Use this calculator to see if your actual take-home pay can cover estimated mortgage payments and property taxes.",
    },
  ],
};

// FAQ Component with Schema Markup (Structured Data for Google)
const DynamicFAQ = ({ activeTab }: { activeTab: string }) => {
  const faqs = FAQ_DATA[activeTab] || [];

  // JSON-LD 구조화 데이터 생성 (구글이 긁어가는 데이터)
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item: any) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="px-6 py-8 bg-slate-50 border-t border-slate-200">
      {/* 구글 봇을 위한 구조화 데이터 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span>💡</span> Helpful Guide
      </h3>
      <div className="space-y-6 text-slate-600">
        {faqs.map((item: any, index: number) => (
          <article key={index} className="animate-fade-in-up">
            <h4 className="text-xs font-bold text-slate-800 mb-1">{item.q}</h4>
            <p className="text-[11px] leading-relaxed opacity-90">{item.a}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

// Feedback Modal (FORMSPREE ID 꼭 넣으세요!)
const FeedbackModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xldqqkdb';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Send Feedback</h3>
        <p className="text-xs text-slate-500 mb-4">
          Found a bug? Have a suggestion? Let us know!
        </p>
        <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-3">
          <textarea
            name="message"
            placeholder="Type your message here..."
            className="w-full h-32 p-4 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 ring-blue-100 resize-none"
            required
          ></textarea>
          <input
            type="email"
            name="email"
            placeholder="Your Email (Optional)"
            className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 ring-blue-100"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Send Message 🚀
          </button>
        </form>
        <p className="text-[10px] text-slate-400 mt-3 text-center">
          Your email is kept private.
        </p>
      </div>
    </div>
  );
};

// Disclaimer (자동 연도 업데이트 적용됨!)
const DisclaimerFooter = () => (
  <div className="px-6 py-8 bg-slate-100 text-center border-t border-slate-200">
    <p className="text-[10px] text-slate-400 leading-relaxed">
      <strong>DISCLAIMER:</strong> This tool is for informational purposes only.
      Estimates vary by location. Consult a professional.
    </p>
    <p className="text-[10px] text-slate-300 mt-4">
      © {new Date().getFullYear()} GigCalc.US
    </p>
  </div>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState('profit');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // --- States ---
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

  // Safe Spend States
  const [saveTaxRate, setSaveTaxRate] = useState<string>('15');
  const [saveRepairRate, setSaveRepairRate] = useState<string>('0.08');
  const [saveEmergencyRate, setSaveEmergencyRate] = useState<string>('5');
  const [saveVacationRate, setSaveVacationRate] = useState<string>('3');

  // Toggles
  const [useTax, setUseTax] = useState(true);
  const [useRepair, setUseRepair] = useState(true);
  const [useEmergency, setUseEmergency] = useState(true);
  const [useVacation, setUseVacation] = useState(true);

  const [safeSpendAmount, setSafeSpendAmount] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [repairSavings, setRepairSavings] = useState(0);
  const [emergencySavings, setEmergencySavings] = useState(0);
  const [vacationSavings, setVacationSavings] = useState(0);

  // --- Calculations ---
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
    if (mi > 0) setProfitPerMile(parseFloat((net / mi).toFixed(2)));
    else setProfitPerMile(0);
    if (ord > 0) setPayPerOrder(parseFloat((inc / ord).toFixed(2)));
    else setPayPerOrder(0);

    setDeduction(parseFloat((mi * IRS_RATE).toFixed(2)));
    if (wage > 0) setMyHourlyWage(wage.toFixed(2));

    const price = parseFloat(homePrice) || 0;
    const downPercent = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 30;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const rent = parseFloat(monthlyRent) || 0;
    const loanPrincipal = price * (1 - downPercent / 100);
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    let mortgage = 0;
    if (monthlyRate > 0)
      mortgage =
        (loanPrincipal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    else mortgage = loanPrincipal / numberOfPayments;
    const taxMonthly = (price * (taxRate / 100)) / 12;
    const total = mortgage + taxMonthly;
    setMonthlyPayment(mortgage);
    setMonthlyTax(taxMonthly);
    setTotalMonthlyCost(total);
    setCashFlow(rent - total);
    setInterestDeduction(loanPrincipal * (rate / 100));

    // Safe Spend
    const repairFund = useRepair ? mi * (parseFloat(saveRepairRate) || 0) : 0;
    const taxableIncome = Math.max(0, net - mi * IRS_RATE);
    const taxFund = useTax
      ? taxableIncome * ((parseFloat(saveTaxRate) || 15) / 100)
      : 0;
    const emergencyFund = useEmergency
      ? net * ((parseFloat(saveEmergencyRate) || 5) / 100)
      : 0;
    const vacationFund = useVacation
      ? net * ((parseFloat(saveVacationRate) || 3) / 100)
      : 0;

    const safeAmount =
      net - repairFund - taxFund - emergencyFund - vacationFund;

    setRepairSavings(parseFloat(repairFund.toFixed(2)));
    setTaxSavings(parseFloat(taxFund.toFixed(2)));
    setEmergencySavings(parseFloat(emergencyFund.toFixed(2)));
    setVacationSavings(parseFloat(vacationFund.toFixed(2)));
    setSafeSpendAmount(parseFloat(safeAmount.toFixed(2)));
  }, [
    income,
    hours,
    miles,
    orders,
    gasPrice,
    mpg,
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    isRenting,
    monthlyRent,
    saveTaxRate,
    saveRepairRate,
    saveEmergencyRate,
    saveVacationRate,
    useTax,
    useRepair,
    useEmergency,
    useVacation,
  ]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center pt-0 sm:pt-6">
      <div className="w-full max-w-[480px] bg-white sm:min-h-[800px] sm:h-auto sm:rounded-[2rem] sm:shadow-2xl sm:border border-slate-100 flex flex-col relative overflow-hidden">
        <header className="px-6 py-5 bg-white flex items-center justify-center sticky top-0 z-50 border-b border-slate-50">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">
            Gig<span className="text-blue-600">Calc</span>.US
          </h1>
        </header>

        <div className="px-4 py-3 bg-white">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl overflow-x-auto scrollbar-hide">
            {[
              { id: 'profit', label: 'Driver', icon: Icons.Profit },
              { id: 'safe', label: 'Wallet', icon: Icons.Wallet },
              { id: 'tax', label: 'Shield', icon: Icons.Shield },
              { id: 'goal', label: 'Goal', icon: Icons.Target },
              { id: 'house', label: 'House', icon: Icons.House },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[60px] flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-[10px] font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span>
                  <tab.icon />
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 py-2 pb-6">
            {activeTab === 'profit' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Driver Profit Calc
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    For Uber Eats, DoorDash, Flex Drivers
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">
                      Total App Payout
                    </label>
                    <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-3 focus-within:ring-2 ring-blue-100 transition">
                      <span className="text-2xl font-bold text-slate-300 mr-2">
                        $
                      </span>
                      <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="0"
                        className="w-full bg-transparent text-4xl font-extrabold text-slate-900 outline-none placeholder-slate-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">
                        Hours
                      </label>
                      <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="0"
                        className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none focus:ring-2 ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">
                        Miles
                      </label>
                      <input
                        type="number"
                        value={miles}
                        onChange={(e) => setMiles(e.target.value)}
                        placeholder="0"
                        className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none focus:ring-2 ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">
                        Orders
                      </label>
                      <input
                        type="number"
                        value={orders}
                        onChange={(e) => setOrders(e.target.value)}
                        placeholder="0"
                        className="w-full bg-slate-50 p-3 rounded-2xl text-lg font-bold text-center outline-none focus:ring-2 ring-blue-100"
                      />
                    </div>
                  </div>
                </div>
                <details className="group mt-4">
                  <summary className="list-none flex items-center justify-between text-xs font-bold text-slate-400 cursor-pointer py-3 px-2 hover:bg-slate-50 rounded-lg transition">
                    <span>Vehicle Settings (MPG / Gas)</span>
                    <span className="group-open:rotate-180 transition text-slate-300">
                      ▼
                    </span>
                  </summary>
                  <div className="grid grid-cols-2 gap-4 mt-2 bg-slate-50 p-4 rounded-2xl">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Gas Price ($)
                      </label>
                      <input
                        type="number"
                        value={gasPrice}
                        onChange={(e) => setGasPrice(e.target.value)}
                        className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        MPG
                      </label>
                      <input
                        type="number"
                        value={mpg}
                        onChange={(e) => setMpg(e.target.value)}
                        className="w-full bg-transparent border-b border-slate-200 py-1 font-bold text-slate-700 outline-none"
                      />
                    </div>
                  </div>
                </details>
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl mt-4 relative overflow-hidden">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    True Hourly Wage
                  </p>
                  <div
                    className={`text-6xl font-black tracking-tighter mb-4 ${
                      realWage < 10 ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    ${realWage > 0 ? realWage : '0.00'}
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">
                        Real $/Mile
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          profitPerMile < 1.0 ? 'text-yellow-400' : 'text-white'
                        }`}
                      >
                        ${profitPerMile.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">
                        Avg $/Order
                      </p>
                      <p className="text-xl font-bold text-white">
                        ${payPerOrder.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 mt-4 pt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Net Profit</span>
                    <span className="font-bold text-emerald-400">
                      ${netProfit.toFixed(2)}
                    </span>
                  </div>
                </div>
                <AdSlot />
              </div>
            )}

            {/* TAB 2: SAFE SPEND (Toggle Enabled) */}
            {activeTab === 'safe' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Your Smart Wallet
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Synced with Driver Tab. Customize your savings.
                  </p>
                </div>
                <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl shadow-emerald-200 relative overflow-hidden mb-6">
                  <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest mb-1">
                    Today's "Safe to Spend"
                  </p>
                  <div className="text-6xl font-black tracking-tighter mb-2">
                    ${safeSpendAmount > 0 ? safeSpendAmount.toFixed(2) : '0.00'}
                  </div>
                  <p className="text-xs font-medium text-emerald-100 opacity-90">
                    Today's Guilt-Free Money 🍺
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">
                      Net Profit
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      ${netProfit.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {useRepair && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              Car Repair Fund
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Tires, Oil (${saveRepairRate}/mi)
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-orange-500">
                          -${repairSavings.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {useTax && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              Tax Savings
                            </p>
                            <p className="text-[10px] text-slate-400">
                              IRS Bill ({saveTaxRate}%)
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-blue-500">
                          -${taxSavings.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {useEmergency && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              Emergency Fund
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Sick Day ({saveEmergencyRate}%)
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-red-500">
                          -${emergencySavings.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {useVacation && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              Vacation Fund
                            </p>
                            <p className="text-[10px] text-slate-400">
                              My PTO ({saveVacationRate}%)
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-purple-500">
                          -${vacationSavings.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <details className="group mt-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <span className="text-xs font-bold text-slate-500">
                      Customize Funds (On/Off)
                    </span>
                    <span className="text-slate-400 text-xs transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="px-4 pb-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={useRepair}
                          onChange={(e) => setUseRepair(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label className="text-xs font-bold text-slate-700">
                          Car Repair ($/mi)
                        </label>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        value={saveRepairRate}
                        onChange={(e) => setSaveRepairRate(e.target.value)}
                        className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={useTax}
                          onChange={(e) => setUseTax(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label className="text-xs font-bold text-slate-700">
                          Tax (%)
                        </label>
                      </div>
                      <input
                        type="number"
                        value={saveTaxRate}
                        onChange={(e) => setSaveTaxRate(e.target.value)}
                        className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={useEmergency}
                          onChange={(e) => setUseEmergency(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label className="text-xs font-bold text-slate-700">
                          Sick Fund (%)
                        </label>
                      </div>
                      <input
                        type="number"
                        value={saveEmergencyRate}
                        onChange={(e) => setSaveEmergencyRate(e.target.value)}
                        className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={useVacation}
                          onChange={(e) => setUseVacation(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label className="text-xs font-bold text-slate-700">
                          Vacation (%)
                        </label>
                      </div>
                      <input
                        type="number"
                        value={saveVacationRate}
                        onChange={(e) => setSaveVacationRate(e.target.value)}
                        className="w-16 p-1 bg-white rounded text-center font-bold outline-none text-xs"
                      />
                    </div>
                  </div>
                </details>
                <AdSlot />
              </div>
            )}

            {/* TAB 3: TAX SHIELD */}
            {activeTab === 'tax' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Tax Shield
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    IRS Deduction: <b>67¢ / mile</b>
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">
                    Miles Driven
                  </label>
                  <div className="flex items-center border-b-2 border-blue-500 py-2">
                    <input
                      type="number"
                      value={miles}
                      onChange={(e) => setMiles(e.target.value)}
                      placeholder="0"
                      className="w-full text-4xl font-extrabold text-slate-900 outline-none"
                    />
                    <span className="text-sm font-bold text-slate-400 ml-2">
                      mi
                    </span>
                  </div>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-200 text-center mb-4">
                  <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">
                    Deductible Income
                  </p>
                  <div className="text-5xl font-black tracking-tighter mb-2">
                    ${deduction.toFixed(2)}
                  </div>
                  <p className="text-xs font-medium text-blue-100 opacity-90">
                    IRS Standard Deduction Amount
                  </p>
                </div>
                <AdSlot />
              </div>
            )}

            {/* TAB 4: GOAL */}
            {activeTab === 'goal' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 pt-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Shift Planner
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    How long to reach your goal?
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 mb-6">
                  <div>
                    <label className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-2 block">
                      Target ($)
                    </label>
                    <div className="flex items-center bg-blue-50 px-4 py-3 rounded-2xl">
                      <span className="text-xl font-bold text-blue-300 mr-2">
                        $
                      </span>
                      <input
                        type="number"
                        value={targetMoney}
                        onChange={(e) => setTargetMoney(e.target.value)}
                        placeholder="200"
                        className="w-full bg-transparent text-3xl font-extrabold text-blue-900 outline-none placeholder-blue-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">
                      Hourly Wage
                    </label>
                    <div className="flex items-center border-b border-slate-200 py-2">
                      <span className="text-lg font-bold text-slate-300 mr-2">
                        $
                      </span>
                      <input
                        type="number"
                        value={myHourlyWage}
                        onChange={(e) => setMyHourlyWage(e.target.value)}
                        className="w-full bg-transparent text-2xl font-bold text-slate-700 outline-none"
                      />
                      <span className="text-xs font-bold text-slate-400">
                        /hr
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl flex flex-col justify-between aspect-square">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Hours
                    </span>
                    <div className="text-4xl font-black tracking-tighter">
                      {targetMoney
                        ? (
                            parseFloat(targetMoney) / parseFloat(myHourlyWage)
                          ).toFixed(1)
                        : '0'}
                      <span className="text-lg font-medium text-slate-500 ml-1">
                        h
                      </span>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-3xl flex flex-col justify-between aspect-square shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Days (8h)
                    </span>
                    <div className="text-4xl font-black text-blue-600 tracking-tighter">
                      {targetMoney
                        ? (
                            parseFloat(targetMoney) /
                            parseFloat(myHourlyWage) /
                            8
                          ).toFixed(1)
                        : '0'}
                      <span className="text-lg font-medium text-slate-400 ml-1">
                        d
                      </span>
                    </div>
                  </div>
                </div>
                <AdSlot />
              </div>
            )}

            {/* TAB 5: HOUSE */}
            {activeTab === 'house' && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-4 pt-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Home Buying Calc 🏠
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Live in it? Or Rent it out?
                  </p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => setIsRenting(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      !isRenting
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-400'
                    }`}
                  >
                    Live (My Home)
                  </button>
                  <button
                    onClick={() => setIsRenting(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      isRenting
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400'
                    }`}
                  >
                    Rent (Investment)
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                        Home Price
                      </label>
                      <div className="flex items-center border-b border-slate-200 pb-1">
                        <span className="text-lg font-bold text-slate-300 mr-2">
                          $
                        </span>
                        <input
                          type="number"
                          value={homePrice}
                          onChange={(e) => setHomePrice(e.target.value)}
                          className="w-full text-2xl font-black text-slate-900 outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                          Down Payment (%)
                        </label>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(e.target.value)}
                          className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                          Loan Term (Yrs)
                        </label>
                        <input
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(e.target.value)}
                          className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                          Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                          Prop. Tax (%)
                        </label>
                        <input
                          type="number"
                          value={propertyTaxRate}
                          onChange={(e) => setPropertyTaxRate(e.target.value)}
                          className="w-full bg-slate-50 p-2 rounded-lg font-bold text-center outline-none"
                        />
                      </div>
                    </div>
                    {isRenting && (
                      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 animate-fade-in-up">
                        <label className="text-[10px] font-bold text-blue-600 uppercase mb-1 block">
                          Expected Monthly Rent
                        </label>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-blue-300 mr-2">
                            $
                          </span>
                          <input
                            type="number"
                            value={monthlyRent}
                            onChange={(e) => setMonthlyRent(e.target.value)}
                            className="w-full bg-transparent text-2xl font-black text-blue-900 outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-6 rounded-3xl shadow-xl transition-colors ${
                      isRenting
                        ? cashFlow >= 0
                          ? 'bg-emerald-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {!isRenting && (
                      <>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                          Total Monthly Cost
                        </p>
                        <div className="text-5xl font-black tracking-tighter mb-2">
                          ${totalMonthlyCost.toFixed(0)}
                        </div>
                        <div className="text-xs text-slate-400 flex justify-between pt-4 border-t border-slate-700">
                          <span>
                            Mortgage: <b>${monthlyPayment.toFixed(0)}</b>
                          </span>
                          <span>
                            Tax: <b>${monthlyTax.toFixed(0)}</b>
                          </span>
                        </div>
                      </>
                    )}
                    {isRenting && (
                      <>
                        <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">
                          Monthly Cash Flow
                        </p>
                        <div className="text-5xl font-black tracking-tighter mb-2">
                          {cashFlow >= 0 ? '+' : ''}${cashFlow.toFixed(0)}
                        </div>
                        <p className="text-xs font-medium text-white/90 mb-4">
                          {cashFlow >= 0
                            ? 'You make money every month!'
                            : 'You lose money every month.'}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="bg-white border border-emerald-100 p-5 rounded-3xl shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600">
                          <Icons.Shield />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          Yearly Tax Benefit
                        </span>
                      </div>
                      <div className="text-3xl font-black text-slate-900">
                        ${interestDeduction.toFixed(0)}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                        Estimated Interest Deduction (Year 1).
                      </p>
                    </div>
                  </div>
                </div>
                <AdSlot />
              </div>
            )}
          </div>

          <DynamicFAQ activeTab={activeTab} />

          {/* Footer with Feedback Button */}
          <div className="px-6 pb-24 text-center border-t border-slate-200 pt-8 bg-slate-100">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-2 mx-auto mb-4 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm transition"
            >
              <Icons.Mail /> Send Feedback
            </button>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              <strong>DISCLAIMER:</strong> This tool is for informational
              purposes only. Estimates vary by location. Consult a professional.
            </p>
            <p className="text-[10px] text-slate-300 mt-4">
              © {new Date().getFullYear()} GigCalc.US
            </p>
          </div>
        </main>

        <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-slate-200 p-2 z-50 flex justify-center">
          <span className="text-[9px] font-bold text-slate-300 uppercase">
            Sponsored Ad Space
          </span>
        </div>

        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
      </div>
    </div>
  );
}

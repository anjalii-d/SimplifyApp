// lessonsData.js
const lessonsData = [
  // --- Budgeting & Spending: The Treasure Map of Spending (💰) ---
  {
    id: "budgeting-your-money-your-map",
    title: "Your Money, Your Map: The Power of Budgeting",
    category: "Budgeting & Spending",
    order: 1,
    time: "5 min read",
    description: "Discover how budgeting acts as your personal financial GPS, guiding every dollar to its purpose.",
    content: [
      { type: "text", value: "Forget boring spreadsheets. Budgeting is your personal financial GPS. It's not about telling you 'no,' it's about showing you exactly where your money goes and how to get it where you want it to be. This is how you take control." },
      { type: "image", src: "https://placehold.co/300x150/FFD700/ffffff?text=Budget+GPS" },
      { type: "text", value: "At its core, a budget is simple: know what's coming in (income) and what's going out (expenses). When you track these two things, you unlock the ability to make smart decisions instead of just guessing." },
      { type: "icon", name: "💰" },
      { type: "text", value: "The real power? Budgeting directly connects your daily spending to your biggest goals. Want that new tech? Saving for college? Planning a trip? A budget is the strategic tool that makes those aspirations a reality. No budget, no clear path." },
      { type: "image", src: "https://placehold.co/300x150/FFD700/ffffff?text=Goals+Achieved" },
      { type: "text", value: "Many think budgeting is complicated or restrictive. Wrong. A well-designed budget actually gives you *more* freedom. It ensures you have enough for your essentials, your fun, and your future, without the stress of wondering where your next dollar went." },
      { type: "icon", name: "✨" },
      { type: "text", value: "This isn't a one-time fix; it's a skill. Start now. Learning to budget is one of the most valuable habits you can build for long-term financial success. It's your foundation for everything else." }
    ],
    quiz: {
      questions: [
        {
          id: "bs1-q1",
          type: "mc",
          questionText: "What is the main idea behind budgeting, as described in the lesson?",
          options: [
            "To tell you 'no' to all spending.",
            "To give every dollar a purpose and make your money work for you.",
            "To make financial decisions more complicated.",
            "To eliminate the need to track income."
          ],
          correctAnswer: "To give every dollar a purpose and make your money work for you.",
          relatedContentIndex: 0 // Points to the first text paragraph
        },
        {
          id: "bs1-q2",
          type: "tf",
          questionText: "A well-designed budget actually limits your financial freedom.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 6 // Points to the text about freedom
        },
        {
          id: "bs1-q3",
          type: "frq",
          questionText: "What metaphor is used to describe budgeting as a tool for financial control?",
          correctAnswer: ["financial gps", "gps"],
          relatedContentIndex: 0 // Points to the first text paragraph
        }
      ]
    }
  },
  {
    id: "budgeting-know-your-flow",
    title: "Know Your Flow: Tracking Income & Expenses",
    category: "Budgeting & Spending",
    order: 2,
    time: "7 min read",
    description: "Learn how to track your money's journey – from where it comes in to where it goes out.",
    content: [
      { type: "text", value: "Ready to see your money in action? Tracking your income and expenses is like getting a real-time report on your financial life. It's the essential first step to taking control, because you can't manage what you don't measure." },
      { type: "icon", name: "📊" },
      { type: "text", value: "First, income. This is all the money coming in: allowance, part-time job paychecks, gifts, side hustles. List every source, every amount. Knowing your total income is your starting line." },
      { type: "image", src: "https://placehold.co/300x150/FFECB3/34495e?text=Income+Flow" },
      { type: "text", value: "Next, expenses. This is where your money goes. Every coffee, every game download, every bus fare. You can track manually (a simple notebook, a spreadsheet) or use digital tools. The goal here is just to record, not to judge." },
      { type: "icon", name: "📝" },
      { type: "text", value: "Digital tools are game-changers. Many banking apps have built-in trackers, or you can use dedicated personal finance apps. They often link to your accounts and auto-categorize spending, giving you instant visual breakdowns. Super efficient." },
      { type: "image", src: "https://placehold.co/300x150/FFECB3/34495e?text=Digital+Tracker" },
      { type: "text", value: "Commit to tracking for at least a month. This gives you a realistic snapshot of your habits. You'll likely discover 'money leaks' – small, forgotten expenses that add up. This awareness is gold; it's the data you need to make smarter choices later." }
    ],
    quiz: {
      questions: [
        {
          id: "bs2-q1",
          type: "mc",
          questionText: "What is the primary benefit of tracking your cash flow?",
          options: [
            "To make you feel guilty about purchases.",
            "To understand where your money goes and gain financial control.",
            "To avoid paying bills.",
            "To impress your bank."
          ],
          correctAnswer: "To understand where your money goes and gain financial control.",
          relatedContentIndex: 0
        },
        {
          id: "bs2-q2",
          type: "tf",
          questionText: "When first tracking expenses, you should immediately try to change your spending habits.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 8
        },
        {
          id: "bs2-q3",
          type: "frq",
          questionText: "Name one type of digital tool that can help automate expense tracking.",
          correctAnswer: ["personal finance app", "banking app", "budgeting app"],
          relatedContentIndex: 6
        }
      ]
    }
  },
  {
    id: "budgeting-smart-choices",
    title: "Smart Choices: Needs, Wants & Mindful Spending",
    category: "Budgeting & Spending",
    order: 3,
    time: "6 min read",
    description: "Learn to distinguish between needs and wants to make conscious spending decisions.",
    content: [
      { type: "text", value: "A crucial step in smart spending is distinguishing between your 'needs' and your 'wants'. Needs are essential for survival and basic functioning (e.g., shelter, food, transportation for school/work, basic clothing)." },
      { type: "icon", name: "🏠🍎🚌" },
      { type: "text", value: "Wants are things that improve your quality of life but aren't strictly necessary (e.g., dining out, new video games, designer clothes, subscription services). It's not about eliminating wants, but prioritizing them." },
      { type: "icon", name: "🎮🍕👗" },
      { type: "text", value: "Mindful spending means making conscious decisions about where your money goes, rather than spending on impulse. Before a purchase, ask yourself: 'Is this a need or a want? Does it align with my goals? Can I truly afford it?'" },
      { type: "image", src: "https://placehold.co/300x150/FFD700/ffffff?text=Mindful+Spending" },
      { type: "text", value: "Impulse buys are a major budget buster. They often happen when we're emotional, stressed, or influenced by advertising. Develop strategies like the '24-hour rule' (wait 24 hours before buying non-essentials) to combat this." },
      { type: "icon", name: "🛑" },
      { type: "text", value: "Small, consistent choices add up significantly over time. Cutting out a daily soda or packing your lunch a few times a week might seem minor, but these habits free up money that can be directed towards your savings or goals." }
    ],
    quiz: {
      questions: [
        {
          id: "bs3-q1",
          type: "mc",
          questionText: "Which of these is generally considered a 'need'?",
          options: [
            "A new video game console",
            "Dining out at a fancy restaurant",
            "Basic groceries",
            "A designer handbag"
          ],
          correctAnswer: "Basic groceries",
          relatedContentIndex: 0
        },
        {
          id: "bs3-q2",
          type: "tf",
          questionText: "Mindful spending means buying whatever you want, whenever you want.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 4
        },
        {
          id: "bs3-q3",
          type: "frq",
          questionText: "What is one strategy to combat impulse buys?",
          correctAnswer: ["24-hour rule", "wait 24 hours", "ask yourself if you can afford it", "ask if it aligns with goals", "ask if it's a need or want"],
          relatedContentIndex: 6
        }
      ]
    }
  },
  {
    id: "budgeting-blueprint-methods",
    title: "Building Your Budget Blueprint: Methods & Personalization",
    category: "Budgeting & Spending",
    order: 4,
    time: "8 min read",
    description: "Explore different budgeting methods like 50/30/20, Envelope System, and Zero-Based Budgeting.",
    content: [
      { type: "text", value: "Now that you understand tracking, it's time to build your budget blueprint. This is your personalized spending plan. There isn't one perfect method; the best budget is the one you'll actually stick to." },
      { type: "icon", name: "🗺️" },
      { type: "text", value: "A popular and simple starting point is the **50/30/20 Rule**. This allocates your after-tax income: 50% to Needs (housing, utilities, groceries), 30% to Wants (entertainment, dining out, hobbies), and 20% to Savings & Debt Repayment." },
      { type: "image", src: "https://placehold.co/300x150/FFECB3/34495e?text=50/30/20+Rule" },
      { type: "text", value: "Another effective method is the **Envelope System**. Traditionally, you'd put physical cash into envelopes for different categories (e.g., 'Groceries,' 'Fun'). Once an envelope is empty, you stop spending in that category until the next period. This can be adapted digitally with apps that mimic the same concept." },
      { type: "icon", name: "✉️" },
      { type: "text", value: "**Zero-Based Budgeting** is a method where you assign every dollar of your income a 'job' (spending, saving, debt repayment) until your income minus your expenses equals zero. This ensures no money is left unaccounted for and gives you maximum control." },
      { type: "image", src: "https://placehold.co/300x150/FFD700/ffffff?text=Zero+Budget" },
      { type: "text", value: "The key is personalization. Start with a method that feels manageable, then adjust it. Your budget should be a flexible tool that reflects your values and helps you achieve your unique financial goals, not a rigid set of rules." }
    ],
    quiz: {
      questions: [
        {
          id: "bs4-q1",
          type: "mc",
          questionText: "Which budgeting rule allocates 50% to Needs, 30% to Wants, and 20% to Savings & Debt Repayment?",
          options: [
            "The 70/20/10 Rule",
            "The 50/30/20 Rule",
            "The Envelope System",
            "Zero-Based Budgeting"
          ],
          correctAnswer: "The 50/30/20 Rule",
          relatedContentIndex: 2
        },
        {
          id: "bs4-q2",
          type: "tf",
          questionText: "The best budget is a rigid set of rules that never changes.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 8
        },
        {
          id: "bs4-q3",
          type: "frq",
          questionText: "What budgeting method involves assigning every dollar of your income a 'job' until income minus expenses equals zero?",
          correctAnswer: ["zero-based budgeting", "zero based budgeting"],
          relatedContentIndex: 6
        }
      ]
    }
  },
  {
    id: "budgeting-real-life-adjustments",
    title: "Budgeting for Real Life: Adjustments & Automation",
    category: "Budgeting & Spending",
    order: 5,
    time: "7 min read",
    description: "Understand that budgets are living documents and how automation can simplify your financial life.",
    content: [
      { type: "text", value: "A budget isn't a set-it-and-forget-it tool; it's a living document. Real life throws curveballs: unexpected expenses, fluctuating income from a part-time job, or even just social events that cost more than planned." },
      { type: "icon", name: "🔄" },
      { type: "text", value: "Regular review is crucial. Set aside time weekly or bi-weekly to check your spending against your budget. Did you overspend in one area? Where can you cut back next week to compensate? This flexibility is key to long-term success." },
      { type: "image", src: "https://placehold.co/300x150/FFD700/ffffff?text=Budget+Review" },
      { type: "text", value: "Don't be afraid to adjust your budget. If you consistently overspend in a 'Wants' category, perhaps you need to reallocate funds from another 'Want' or find a way to increase income. Your budget should work for you, not against you." },
      { type: "icon", name: "⚙️" },
      { type: "text", value: "Automation can be your best friend in budgeting. Set up automatic transfers from your checking account to your savings account right after you get paid. This 'pay yourself first' strategy ensures your savings goals are met before you even think about spending." },
      { type: "image", src: "https://placehold.co/300x150/FFECB3/34495e?text=Automate+Savings" },
      { type: "text", value: "Automate bill payments where possible to avoid late fees and ensure financial stability. Review your subscriptions regularly – are you still using all those streaming services or apps? Cutting unnecessary recurring expenses is a quick win for your budget." }
    ],
    quiz: {
      questions: [
        {
          id: "bs5-q1",
          type: "mc",
          questionText: "What is a budget described as in real life?",
          options: [
            "A rigid set of rules.",
            "A one-time financial task.",
            "A living document that needs regular review and adjustment.",
            "A way to avoid all expenses."
          ],
          correctAnswer: "A living document that needs regular review and adjustment.",
          relatedContentIndex: 0
        },
        {
          id: "bs5-q2",
          type: "tf",
          questionText: "Automating savings transfers is an example of 'paying yourself last'.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 6
        },
        {
          id: "bs5-q3",
          type: "frq",
          questionText: "What is one type of expense you should review regularly to optimize your budget?",
          correctAnswer: ["subscriptions", "bills", "recurring expenses"],
          relatedContentIndex: 8
        }
      ]
    }
  },

  // --- Saving & Investing: The Growth Forest of Funds (📈) ---
  {
    id: "saving-emergency-fund",
    title: "The Emergency Fund: Your Financial Shield",
    category: "Saving & Investing",
    order: 1,
    time: "6 min read",
    description: "Learn why an emergency fund is crucial and how to build your financial safety net.",
    content: [
      { type: "text", value: "Imagine a sturdy shield protecting you from unexpected financial dragons! That's your emergency fund. It's a stash of money set aside specifically for unforeseen events like a sudden car repair, a broken phone, or an unexpected medical bill." },
      { type: "image", src: "https://placehold.co/300x150/4CAF50/ffffff?text=Emergency+Shield" },
      { type: "text", value: "Why is it so important? Without an emergency fund, these surprises force you into debt, often high-interest debt like credit cards. Your shield prevents you from falling into that trap." },
      { type: "icon", name: "🚫" },
      { type: "text", value: "The golden rule is to aim for 3-6 months' worth of essential living expenses saved up. For a high schooler, this might mean saving enough for a few months of your regular spending if your income suddenly stops, or a few hundred dollars for smaller emergencies." },
      { type: "image", src: "https://placehold.co/300x150/E8F5E9/4CAF50?text=3-6+Months" },
      { type: "text", value: "Start small! Even saving $10 or $20 a week can build up surprisingly fast. Set up an automatic transfer to a separate savings account so you 'pay yourself first' before you spend on other things. Make it a habit!" },
      { type: "icon", name: "🌱" },
      { type: "text", value: "Keep your emergency fund in an easily accessible but separate account, like a high-yield savings account. It shouldn't be mixed with your everyday spending money, but you should be able to get to it quickly if a true emergency strikes." }
    ],
    quiz: {
      questions: [
        {
          id: "si1-q1",
          type: "mc",
          questionText: "What is the primary purpose of an emergency fund?",
          options: [
            "To buy new video games.",
            "To pay for daily expenses.",
            "To cover unexpected expenses without going into debt.",
            "To invest in the stock market."
          ],
          correctAnswer: "To cover unexpected expenses without going into debt.",
          relatedContentIndex: 0
        },
        {
          id: "si1-q2",
          type: "tf",
          questionText: "You should keep your emergency fund in your checking account for easy spending.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 8
        },
        {
          id: "si1-q3",
          type: "frq",
          questionText: "What is a common recommendation for how many months of expenses to save in an emergency fund?",
          correctAnswer: ["3-6 months", "3 to 6 months"],
          relatedContentIndex: 4
        }
      ]
    }
  },
  {
    id: "power-of-compound-interest",
    title: "The Power of Compound Interest",
    category: "Saving & Investing",
    order: 2,
    time: "6 min read",
    description: "Unleash the magic of compound interest and watch your money grow over time.",
    content: [
      { type: "text", value: "Compound interest is often called the 'eighth wonder of the world' for a good reason. It's the interest you earn not only on your initial principal but also on the accumulated interest from previous periods. It's interest earning interest!" },
      { type: "icon", name: "✨" },
      { type: "text", value: "To illustrate, imagine you invest $1,000 at a 10% annual interest rate. In the first year, you earn $100. In the second year, you earn 10% on $1,100 (your original $1,000 plus the $100 earned), which is $110. Your money grows faster each year." },
      { type: "image", src: "https://placehold.co/300x150/4CAF50/ffffff?text=Compound+Growth" },
      { type: "text", value: "The two main factors that supercharge compound interest are time and interest rate. The longer your money is invested, the more time it has to compound. Even small differences in interest rates can lead to significant differences over decades." },
      { type: "icon", name: "⏳" },
      { type: "text", value: "Starting early is the biggest advantage. A person who starts saving $100 a month at age 20 will likely have significantly more money by retirement than someone who starts saving $200 a month at age 30, due to the extra decade of compounding." },
      { type: "image", src: "https://placehold.co/300x150/E8F5E9/4CAF50?text=Early+Start" },
      { type: "text", value: "Compound interest applies to both savings and debt. While it works for you in investments, it works against you with high-interest debts like credit cards. Understanding this principle is key to making wise financial decisions." }
    ],
    quiz: {
      questions: [
        {
          id: "si2-q1",
          type: "mc",
          questionText: "What is compound interest?",
          options: [
            "Interest earned only on the initial principal",
            "Interest earned on principal plus accumulated interest",
            "A fee charged by banks",
            "A type of stock market investment"
          ],
          correctAnswer: "Interest earned on principal plus accumulated interest",
          relatedContentIndex: 0
        },
        {
          id: "si2-q2",
          type: "tf",
          questionText: "Time is a crucial factor in maximizing compound interest.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "si2-q3",
          type: "frq",
          questionText: "Besides time, what other main factor supercharges compound interest?",
          correctAnswer: ["interest rate", "interest rates"],
          relatedContentIndex: 4
        }
      ]
    }
  },
  {
    id: "setting-financial-goals",
    title: "Setting Financial Goals",
    category: "Saving & Investing",
    order: 3,
    time: "8 min read",
    description: "Learn to set SMART financial goals to give your money direction and purpose.",
    content: [
      { type: "text", value: "Financial goals give your money a direction and purpose. Without clear goals, it's easy to let your money slip away on impulse purchases. Goals can range from short-term (e.g., saving for a new phone) to long-term (e.g., retirement)." },
      { type: "image", src: "https://placehold.co/300x150/4CAF50/ffffff?text=Goal+Map" },
      { type: "text", value: "A popular framework for setting effective goals is SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. For example, instead of 'save money', a SMART goal is 'save $500 for a new laptop by December 31st'." },
      { type: "icon", name: "🎯" },
      { type: "text", value: "Categorize your goals into short-term (0-1 year), mid-term (1-5 years), and long-term (5+ years). This helps you prioritize and allocate funds appropriately. Emergency funds are a common short-term goal, while a down payment on a house might be mid-term." },
      { type: "image", src: "https://placehold.co/300x150/E8F5E9/4CAF50?text=Goal+Timeline" },
      { type: "text", value: "Break down large goals into smaller, manageable steps. Saving $10,000 might seem daunting, but saving $200 a week is more actionable. Celebrate these small wins to stay motivated." },
      { type: "icon", name: "🏆" },
      { type: "text", value: "Regularly review and adjust your financial goals. Life changes, and so should your plans. What was important last year might not be as critical today. Flexibility is key to long-term financial success." }
    ],
    quiz: {
      questions: [
        {
          id: "si3-q1",
          type: "mc",
          questionText: "What is the purpose of setting financial goals?",
          options: [
            "To restrict all spending",
            "To give your money a direction and purpose",
            "To avoid thinking about money",
            "To impress financial advisors"
          ],
          correctAnswer: "To give your money a direction and purpose",
          relatedContentIndex: 0
        },
        {
          id: "si3-q2",
          type: "frq",
          questionText: "What does the 'S' in SMART goals stand for?",
          correctAnswer: ["specific"],
          relatedContentIndex: 2
        },
        {
          id: "si3-q3",
          type: "tf",
          questionText: "It's best to set financial goals once and never change them.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 8
        }
      ]
    }
  },
  {
    id: "introduction-to-investing",
    title: "Planting Seeds: Introduction to Investing",
    category: "Saving & Investing",
    order: 4,
    time: "7 min read",
    description: "Explore the basics of investing and how it can help your money grow over the long term.",
    content: [
      { type: "text", value: "Once your emergency fund is strong, it's time to think about making your money work even harder for you through investing! Think of investing as planting seeds today to grow a forest of wealth for your future." },
      { type: "icon", name: "🌳" },
      { type: "text", value: "Investing means putting your money into assets like stocks, bonds, or real estate with the expectation that they will increase in value over time. It's different from saving, which is usually for short-term goals or emergencies." },
      { type: "image", src: "https://placehold.co/300x150/4CAF50/ffffff?text=Invest+Grow" },
      { type: "text", value: "Stocks represent ownership in a company. When the company does well, your stock value might increase. Bonds are like loans to a company or government; they pay you back with interest. Diversification (spreading your investments) is key to reduce risk." },
      { type: "icon", name: "📊" },
      { type: "text", value: "For beginners, index funds or ETFs (Exchange Traded Funds) are great starting points. These are collections of many stocks or bonds, offering instant diversification and often lower fees than actively managed funds. They're like a basket of different fruits instead of just one." },
      { type: "image", src: "https://placehold.co/300x150/E8F5E9/4CAF50?text=Index+Funds" },
      { type: "text", value: "Investing involves risk, meaning you could lose money. But over long periods, the stock market has historically grown. The earlier you start, the more time your investments have to recover from downturns and benefit from compounding." }
    ],
    quiz: {
      questions: [
        {
          id: "si4-q1",
          type: "mc",
          questionText: "What is the main difference between saving and investing?",
          options: [
            "Saving is for long-term goals, investing is for short-term.",
            "Saving is for emergencies, investing is for growth over time.",
            "Saving involves more risk than investing.",
            "Investing is only for rich people."
          ],
          correctAnswer: "Saving is for emergencies, investing is for growth over time.",
          relatedContentIndex: 2
        },
        {
          id: "si4-q2",
          type: "tf",
          questionText: "Diversification means putting all your money into one type of investment.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 4
        },
        {
          id: "si4-q3",
          type: "frq",
          questionText: "What are two common types of investments mentioned for beginners?",
          correctAnswer: ["index funds", "etfs", "exchange traded funds"],
          relatedContentIndex: 6
        }
      ]
    }
  },
  {
    id: "investing-for-your-future",
    title: "Future Horizons: Investing for Your Goals",
    category: "Saving & Investing",
    order: 5,
    time: "8 min read",
    description: "Explore how investing can help you achieve long-term dreams like college or retirement.",
    content: [
      { type: "text", value: "Investing isn't just for adults; it's a powerful tool for high schoolers to start building towards big future goals like college, a first car, or even early retirement! Think of it as building a rocket to reach your future horizons." },
      { type: "icon", name: "🚀" },
      { type: "text", value: "For college savings, a 529 plan is a popular option. It's an investment account designed specifically for education expenses, offering tax advantages. Money grows tax-free and withdrawals for qualified education costs are also tax-free." },
      { type: "image", src: "https://placehold.co/300x150/E8F5E9/4CAF50?text=529+Plan" },
      { type: "text", value: "If you have earned income from a job, you can contribute to a Roth IRA. This is a retirement account where you contribute after-tax money, and your withdrawals in retirement are completely tax-free. It's a fantastic way to get a head start on retirement savings, even with small amounts." },
      { type: "icon", name: "👵👴" },
      { type: "text", value: "The key to successful long-term investing is consistency and patience. Regularly contribute small amounts, even when the market is down. Market downturns can be opportunities to buy more assets at lower prices." },
      { type: "image", src: "https://placehold.co/300x150/4CAF50/ffffff?text=Consistency" },
      { type: "text", value: "Remember to align your investments with your goals and risk tolerance. If a goal is far away (like retirement), you can generally afford to take more risk. For shorter-term goals, less risky options might be better. Always do your research or talk to a trusted adult." }
    ],
    quiz: {
      questions: [
        {
          id: "si5-q1",
          type: "mc",
          questionText: "Which investment account is specifically designed for college savings with tax advantages?",
          options: [
            "Roth IRA",
            "Checking Account",
            "529 Plan",
            "Savings Bond"
          ],
          correctAnswer: "529 Plan",
          relatedContentIndex: 2
        },
        {
          id: "si5-q2",
          type: "tf",
          questionText: "A Roth IRA is a retirement account where withdrawals in retirement are tax-free.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "si5-q3",
          type: "frq",
          questionText: "What are two key principles for successful long-term investing?",
          correctAnswer: ["consistency", "patience", "regular contributions"],
          relatedContentIndex: 6
        }
      ]
    }
  },

  // --- Credit & Debt Management: Perilous Peaks of Plastic (💳) ---
  {
    id: "credit-score-your-reputation-scroll",
    title: "Credit Score: Your Financial Reputation Scroll",
    category: "Credit & Debt Management",
    order: 1,
    time: "6 min read",
    description: "Understand what a credit score is and why it's like your financial report card.",
    content: [
      { type: "text", value: "Imagine a magical scroll that tells everyone how responsible you are with money. That's kind of what a credit score is! It's a three-digit number that represents your creditworthiness, or how likely you are to pay back borrowed money." },
      { type: "image", src: "https://placehold.co/300x150/FF6347/ffffff?text=Credit+Score+Scroll" },
      { type: "text", value: "Why does it matter? Lenders (like banks for car loans or mortgages), landlords, and even some employers use your credit score to decide if they want to do business with you. A good score opens doors; a bad one can make things tough." },
      { type: "icon", name: "🔑" },
      { type: "text", value: "Your credit score is built on your credit history. This includes how much debt you have, how long you've had credit, the types of credit you use, and most importantly, your payment history (paying bills on time!)." },
      { type: "image", src: "https://placehold.co/300x150/FFEBEE/FF6347?text=Payment+History" },
      { type: "text", value: "Building good credit takes time and discipline. You might start with a secured credit card (where you put down a deposit) or by being an authorized user on a parent's card. Always use credit responsibly and pay your bills in full and on time." },
      { type: "icon", name: "⏳" },
      { type: "text", value: "Checking your credit report regularly is a good habit. You can get free copies annually from major credit bureaus. Look for any errors and dispute them. Protecting your credit is protecting your financial future!" }
    ],
    quiz: {
      questions: [
        {
          id: "cd1-q1",
          type: "mc",
          questionText: "What does a credit score primarily represent?",
          options: [
            "Your total income.",
            "How many friends you have.",
            "Your creditworthiness or likelihood to pay back borrowed money.",
            "Your favorite color."
          ],
          correctAnswer: "Your creditworthiness or likelihood to pay back borrowed money.",
          relatedContentIndex: 0
        },
        {
          id: "cd1-q2",
          type: "tf",
          questionText: "Paying your bills on time is important for building a good credit score.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "cd1-q3",
          type: "frq",
          questionText: "Name one type of entity that uses your credit score to make decisions about you.",
          correctAnswer: ["lenders", "banks", "landlords", "employers"],
          relatedContentIndex: 2
        }
      ]
    }
  },
  {
    id: "understanding-credit-cards",
    title: "Navigating Credit Cards: Tools or Traps?",
    category: "Credit & Debt Management",
    order: 2,
    time: "7 min read",
    description: "Learn the pros and cons of credit cards and how to use them wisely.",
    content: [
      { type: "text", value: "Credit cards can be powerful tools or tricky traps, depending on how you use them. Think of them as a magic key that unlocks temporary borrowing power, but with a responsibility attached." },
      { type: "icon", name: "🔑" },
      { type: "text", value: "A credit card allows you to borrow money up to a certain limit to make purchases. You then receive a monthly statement and must pay at least a minimum amount. The key is to pay your *full balance* every month to avoid interest charges." },
      { type: "image", src: "https://placehold.co/300x150/FFEBEE/FF6347?text=Pay+Full+Balance" },
      { type: "text", value: "Pros: Credit cards help build credit history (essential for future loans), offer rewards (cash back, travel points), and provide fraud protection. They're also convenient for online purchases and emergencies." },
      { type: "icon", name: "✅" },
      { type: "text", value: "Cons: If you don't pay your full balance, you'll be charged high interest (APR), making your purchases much more expensive. This can quickly lead to debt if not managed carefully. Missing payments hurts your credit score." },
      { type: "icon", name: "❌" },
      { type: "text", value: "Rule #1: Only charge what you can afford to pay back in full. Rule #2: Pay your bill on time, every time. Start with a low credit limit and use it for small, planned purchases. Credit cards are a tool for convenience and building credit, not for buying things you can't afford." }
    ],
    quiz: {
      questions: [
        {
          id: "cd2-q1",
          type: "mc",
          questionText: "What is the most important thing to do to avoid credit card interest charges?",
          options: [
            "Only pay the minimum amount due.",
            "Pay your full balance every month.",
            "Use your card for large purchases only.",
            "Never use your credit card."
          ],
          correctAnswer: "Pay your full balance every month.",
          relatedContentIndex: 2
        },
        {
          id: "cd2-q2",
          type: "tf",
          questionText: "Credit cards can help you build a positive credit history.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "cd2-q3",
          type: "frq",
          questionText: "Name one potential 'con' or downside of using credit cards.",
          correctAnswer: ["high interest", "debt", "missing payments hurts credit score"],
          relatedContentIndex: 6
        }
      ]
    }
  },
  {
    id: "managing-debt-wisely",
    title: "Taming the Debt Dragon: Managing Wisely",
    category: "Credit & Debt Management",
    order: 3,
    time: "8 min read",
    description: "Learn strategies to manage and reduce debt effectively.",
    content: [
      { type: "text", value: "Debt isn't always bad (like a mortgage for a house), but uncontrolled debt can feel like a heavy dragon chasing you! Learning to manage debt wisely is crucial for financial peace." },
      { type: "image", src: "https://placehold.co/300x150/FF6347/ffffff?text=Debt+Dragon" },
      { type: "text", value: "There are two main types of debt: 'good' debt and 'bad' debt. Good debt is often an investment that can increase your wealth or future income (e.g., student loans for education, a mortgage). Bad debt is for depreciating assets or things you can't afford (e.g., high-interest credit card debt for impulse buys)." },
      { type: "icon", name: "⚖️" },
      { type: "text", value: "If you find yourself with debt, especially high-interest debt, prioritize paying it off. Two popular strategies are the **Debt Snowball** and **Debt Avalanche** methods." },
      { type: "image", src: "https://placehold.co/300x150/FFEBEE/FF6347?text=Debt+Strategies" },
      { type: "text", value: "The Debt Snowball method focuses on psychological wins: pay off your smallest debt first, then take the money you were paying on that and add it to the next smallest debt. This builds momentum. The Debt Avalanche method focuses on saving money: pay off the debt with the highest interest rate first, then move to the next highest." },
      { type: "icon", name: "❄️" },
      { type: "text", value: "Avoid taking on unnecessary debt, especially for 'wants.' Always understand the terms of any loan or credit, including the interest rate and repayment schedule. The less you owe, the more financial freedom you have to build your future kingdom!" }
    ],
    quiz: {
      questions: [
        {
          id: "cd3-q1",
          type: "mc",
          questionText: "Which of these is typically considered 'good' debt?",
          options: [
            "High-interest credit card debt for clothes.",
            "A loan for a new video game.",
            "A student loan for education.",
            "Debt from an impulse buy."
          ],
          correctAnswer: "A student loan for education.",
          relatedContentIndex: 2
        },
        {
          id: "cd3-q2",
          type: "tf",
          questionText: "The Debt Snowball method prioritizes paying off the debt with the highest interest rate first.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 6
        },
        {
          id: "cd3-q3",
          type: "frq",
          questionText: "What is one key piece of information you should always understand before taking on debt?",
          correctAnswer: ["interest rate", "repayment schedule", "terms of loan"],
          relatedContentIndex: 8
        }
      ]
    }
  },
  {
    id: "identity-theft-protection",
    title: "Guarding Your Gold: Identity Theft & Fraud",
    category: "Credit & Debt Management",
    order: 4,
    time: "5 min read",
    description: "Learn how to protect your personal and financial information from thieves.",
    content: [
      { type: "text", value: "In the digital realm, your personal information is like precious gold, and identity thieves are always looking for ways to steal it! Identity theft happens when someone uses your personal information (like your name, address, Social Security number) without your permission." },
      { type: "icon", name: "🛡️" },
      { type: "text", value: "Fraud is when someone uses deceit to gain financial or other benefits. This often goes hand-in-hand with identity theft. Common scams include phishing emails, fake websites, or calls pretending to be from your bank." },
      { type: "image", src: "https://placehold.co/300x150/FFEBEE/FF6347?text=Scam+Alert" },
      { type: "text", value: "To guard your gold, be super careful with your personal info. Never share your passwords, PINs, or full Social Security number unless you are absolutely sure who you're talking to and why they need it (e.g., official bank website, trusted adult)." },
      { type: "icon", name: "🔒" },
      { type: "text", value: "Protect your devices: use strong, unique passwords for all accounts, enable two-factor authentication whenever possible, and be wary of clicking suspicious links or downloading attachments from unknown senders. Think before you click!" },
      { type: "image", src: "https://placehold.co/300x150/FF6347/ffffff?text=Secure+Devices" },
      { type: "text", value: "Regularly check your bank statements and credit reports for suspicious activity. If you spot anything unusual, report it immediately to your bank, credit card company, or the credit bureaus. Early detection is your best defense against these sneaky goblins!" }
    ],
    quiz: {
      questions: [
        {
          id: "cd4-q1",
          type: "mc",
          questionText: "What is identity theft?",
          options: [
            "When someone uses your personal information with your permission.",
            "When someone uses your personal information without your permission.",
            "When you forget your password.",
            "When you share your password with a friend."
          ],
          correctAnswer: "When someone uses your personal information without your permission.",
          relatedContentIndex: 0
        },
        {
          id: "cd4-q2",
          type: "tf",
          questionText: "It's safe to click on links from suspicious emails if they promise free money.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 6
        },
        {
          id: "cd4-q3",
          type: "frq",
          questionText: "Name one piece of personal information you should be very careful about sharing.",
          correctAnswer: ["password", "pin", "social security number", "ssn"],
          relatedContentIndex: 4
        }
      ]
    }
  },
  {
    id: "student-loans-future-investments",
    title: "Student Loans: Future Investments or Heavy Chains?",
    category: "Credit & Debt Management",
    order: 5,
    time: "7 min read",
    description: "Understand student loans, their types, and responsible borrowing for higher education.",
    content: [
      { type: "text", value: "Thinking about college? Student loans can be like a magical key to unlock higher education, but it's important to understand them fully. They are money you borrow to pay for college that you must pay back, usually with interest." },
      { type: "image", src: "https://placehold.co/300x150/FF6347/ffffff?text=Student+Loan+Key" },
      { type: "text", value: "There are two main types: Federal student loans (from the government) and Private student loans (from banks or private lenders). Federal loans usually offer more flexible repayment options and lower interest rates." },
      { type: "icon", name: "🏛️🏦" },
      { type: "text", value: "Subsidized federal loans are the best because the government pays the interest while you're in school. Unsubsidized federal loans accrue interest from the moment they're disbursed. Private loans often have higher interest rates and fewer protections." },
      { type: "image", src: "https://placehold.co/300x150/FFEBEE/FF6347?text=Loan+Types" },
      { type: "text", value: "Borrow only what you need! Every dollar you borrow is a dollar you'll have to pay back with interest. Maximize scholarships, grants (free money!), and work-study programs before taking out loans." },
      { type: "icon", name: "🎓" },
      { type: "text", value: "Understand your repayment options. Federal loans offer various plans, including income-driven repayment. Plan for how you'll pay back your loans *before* you take them out. Smart borrowing now leads to financial freedom later!" }
    ],
    quiz: {
      questions: [
        {
          id: "cd5-q1",
          type: "mc",
          questionText: "Which type of student loan typically offers more flexible repayment options and lower interest rates?",
          options: [
            "Private student loans",
            "Federal student loans",
            "Credit card loans",
            "Personal loans"
          ],
          correctAnswer: "Federal student loans",
          relatedContentIndex: 2
        },
        {
          id: "cd5-q2",
          type: "tf",
          questionText: "Subsidized federal loans accrue interest while you are in school.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 4
        },
        {
          id: "cd5-q3",
          type: "frq",
          questionText: "Name one type of 'free money' for college that you should maximize before taking out loans.",
          correctAnswer: ["scholarships", "grants", "work-study"],
          relatedContentIndex: 6
        }
      ]
    }
  },

  // --- Income & Taxes: The Bounty Bazaar & Tax Towers (💸) ---
  {
    id: "income-sources-your-bounty",
    title: "Income Sources: Your Bounty from the Bazaar",
    category: "Income & Taxes",
    order: 1,
    time: "5 min read",
    description: "Explore different ways high schoolers can earn money and build their financial 'bounty.'",
    content: [
      { type: "text", value: "Welcome to the Bounty Bazaar, where you learn how to gather your own gold! Income is simply the money you earn or receive. For high schoolers, there are many ways to start filling your treasure chest." },
      { type: "icon", name: "💰" },
      { type: "text", value: "The most common way is through a part-time job. This could be at a local store, restaurant, or even babysitting or dog walking. A job provides a regular paycheck and valuable work experience." },
      { type: "image", src: "https://placehold.co/300x150/8A2BE2/ffffff?text=Part-time+Job" },
      { type: "text", value: "Side hustles are another great way to earn extra cash. This could be tutoring, selling crafts online, mowing lawns, or offering tech support to neighbors. These often allow for more flexible hours." },
      { type: "icon", name: "💡" },
      { type: "text", value: "Allowance from parents or guardians is also a form of income. Sometimes this is tied to chores, teaching you about earning and responsibility. Gifts (like birthday money) also add to your bounty." },
      { type: "image", src: "https://placehold.co/300x150/EDE7F6/8A2BE2?text=Allowance+Gifts" },
      { type: "text", value: "Understanding your income sources helps you budget and plan. The more ways you have to earn, the more financially resilient you become! Every coin counts in building your financial empire." }
    ],
    quiz: {
      questions: [
        {
          id: "it1-q1",
          type: "mc",
          questionText: "What is 'income'?",
          options: [
            "Money you spend.",
            "Money you owe.",
            "Money you earn or receive.",
            "Money you save only."
          ],
          correctAnswer: "Money you earn or receive.",
          relatedContentIndex: 0
        },
        {
          id: "it1-q2",
          type: "tf",
          questionText: "A side hustle is a way to earn extra money outside of a main job.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "it1-q3",
          type: "frq",
          questionText: "Name one common income source for high schoolers.",
          correctAnswer: ["part-time job", "allowance", "gifts", "side hustle"],
          relatedContentIndex: 2
        }
      ]
    }
  },
  {
    id: "paycheck-deductions-deciphered",
    title: "Paycheck Deductions: Deciphering the Tax Towers",
    category: "Income & Taxes",
    order: 2,
    time: "7 min read",
    description: "Understand what comes out of your paycheck and why, including taxes and other deductions.",
    content: [
      { type: "text", value: "Ever looked at your paycheck and wondered why the 'gross pay' (what you earned) is different from your 'net pay' (what you actually get)? Welcome to the Tax Towers! This difference is due to deductions." },
      { type: "image", src: "https://placehold.co/300x150/8A2BE2/ffffff?text=Gross+vs+Net" },
      { type: "text", value: "**Taxes** are the biggest chunk. These are mandatory payments to the government. They fund public services like roads, schools, and parks. For most high schoolers, the main taxes are federal income tax, state income tax (if applicable), and FICA taxes." },
      { type: "icon", name: "🏛️" },
      { type: "text", value: "**FICA (Federal Insurance Contributions Act) taxes** fund Social Security and Medicare. Social Security provides benefits for retirees and disabled people, and Medicare helps with healthcare costs for seniors. You pay a percentage of your earnings into these." },
      { type: "image", src: "https://placehold.co/300x150/EDE7F6/8A2BE2?text=FICA+Taxes" },
      { type: "text", value: "Other common deductions might include contributions to a retirement plan (like a 401k or Roth IRA if your employer offers it), health insurance premiums, or union dues. These are usually optional or depend on your job." },
      { type: "icon", name: "⚙️" },
      { type: "text", value: "Understanding these deductions is important. It helps you accurately budget your take-home pay and appreciate where your money goes to support society. Your first paycheck might feel smaller than expected, but now you know why!" }
    ],
    quiz: {
      questions: [
        {
          id: "it2-q1",
          type: "mc",
          questionText: "What is the difference between 'gross pay' and 'net pay' primarily due to?",
          options: [
            "Tips.",
            "Bonuses.",
            "Deductions (like taxes).",
            "Overtime hours."
          ],
          correctAnswer: "Deductions (like taxes).",
          relatedContentIndex: 0
        },
        {
          id: "it2-q2",
          type: "tf",
          questionText: "FICA taxes fund Social Security and Medicare.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "it2-q3",
          type: "frq",
          questionText: "Name one type of tax commonly deducted from a paycheck.",
          correctAnswer: ["federal income tax", "state income tax", "fica taxes"],
          relatedContentIndex: 2
        }
      ]
    }
  },
  {
    id: "understanding-w4-and-tax-forms",
    title: "Unlocking Tax Forms: W-4 & Beyond",
    category: "Income & Taxes",
    order: 3,
    time: "6 min read",
    description: "Demystify tax forms like the W-4 and understand their role in your paycheck.",
    content: [
      { type: "text", value: "When you start your first job, you'll encounter some mysterious scrolls called tax forms! The most important one to understand early on is the W-4 form. It's how your employer knows how much tax to withhold from your paycheck." },
      { type: "icon", name: "📜" },
      { type: "text", value: "The **W-4 form** tells your employer how much federal income tax to deduct from your pay. You fill it out when you start a new job. Your goal is to have enough withheld so you don't owe a lot at tax time, but not too much so you don't get a huge refund (which means the government held your money interest-free)." },
      { type: "image", src: "https://placehold.co/300x150/8A2BE2/ffffff?text=W-4+Form" },
      { type: "text", value: "Most high schoolers with simple jobs can claim 'exempt' on their W-4 if they expect to earn below a certain threshold and had no tax liability last year. This means no federal income tax will be withheld from your pay." },
      { type: "icon", name: "✅" },
      { type: "text", value: "Another important form is the **W-2 form**. Your employer sends this to you by January 31st each year. It summarizes your total earnings and the amount of taxes withheld for the previous year. You'll need this to file your taxes." },
      { type: "image", src: "https://placehold.co/300x150/EDE7F6/8A2BE2?text=W-2+Form" },
      { type: "text", value: "Don't be intimidated by tax forms! They are designed to be filled out. If you're unsure, ask a trusted adult (parent, guardian, or even your employer's HR) for help. Understanding these forms is a key step in adulting!" }
    ],
    quiz: {
      questions: [
        {
          id: "it3-q1",
          type: "mc",
          questionText: "What is the purpose of the W-4 form?",
          options: [
            "To apply for a job.",
            "To tell your employer how much tax to withhold from your paycheck.",
            "To get a tax refund.",
            "To track your spending."
          ],
          correctAnswer: "To tell your employer how much tax to withhold from your paycheck.",
          relatedContentIndex: 2
        },
        {
          id: "it3-q2",
          type: "tf",
          questionText: "Your employer sends you a W-2 form by January 31st each year.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 6
        },
        {
          id: "it3-q3",
          type: "frq",
          questionText: "What can most high schoolers claim on their W-4 if they expect to earn below a certain threshold?",
          correctAnswer: ["exempt"],
          relatedContentIndex: 4
        }
      ]
    }
  },
  {
    id: "filing-your-first-taxes",
    title: "Your First Tax Quest: Filing Basics",
    category: "Income & Taxes",
    order: 4,
    time: "8 min read",
    description: "A beginner's guide to filing your first income tax return.",
    content: [
      { type: "text", value: "Filing taxes might sound like a daunting quest, but for most high schoolers, it's simpler than you think! If you earn income above a certain amount, you're required to file a tax return. Even if you're not required, you might want to file to get a refund of any taxes withheld." },
      { type: "image", src: "https://placehold.co/300x150/EDE7F6/8A2BE2?text=Tax+Quest" },
      { type: "text", value: "The tax year is January 1st to December 31st. You typically file your tax return between January 1st and April 15th of the following year. This is your chance to tell the government how much you earned and how much tax you already paid." },
      { type: "icon", name: "🗓️" },
      { type: "text", value: "You'll need your W-2 form (from your employer) and possibly other income statements. For many young people, filing is straightforward and can be done using free tax software (like IRS Free File if you qualify by income) or by filling out a simple form like Form 1040-SR." },
      { type: "image", src: "https://placehold.co/300x150/8A2BE2/ffffff?text=Tax+Software" },
      { type: "text", value: "If you had federal income tax withheld from your pay (check your W-2!), you might be due a refund. This happens if you paid more tax than you actually owed. Filing your return is the only way to get that money back!" },
      { type: "icon", name: "💸" },
      { type: "text", value: "Don't procrastinate! Gather your documents early. If you're confused, there are free resources like the IRS website, VITA (Volunteer Income Tax Assistance) programs, or trusted adults who can help. Conquering your first tax quest is a big step!" }
    ],
    quiz: {
      questions: [
        {
          id: "it4-q1",
          type: "mc",
          questionText: "When is the typical deadline to file your tax return for the previous year?",
          options: [
            "January 1st.",
            "December 31st.",
            "April 15th.",
            "July 4th."
          ],
          correctAnswer: "April 15th.",
          relatedContentIndex: 2
        },
        {
          id: "it4-q2",
          type: "tf",
          questionText: "You need your W-2 form to file your taxes.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "it4-q3",
          type: "frq",
          questionText: "What is one reason you might want to file a tax return even if you're not required to?",
          correctAnswer: ["to get a refund", "to get taxes withheld back"],
          relatedContentIndex: 0
        }
      ]
    }
  },
  {
    id: "gig-economy-taxes",
    title: "Gig Economy: Taxes for Side Quests",
    category: "Income & Taxes",
    order: 5,
    time: "6 min read",
    description: "Understand tax implications for income earned from freelance or 'gig' work.",
    content: [
      { type: "text", value: "The 'gig economy' is like taking on side quests for gold! If you earn money from freelancing, babysitting, mowing lawns, selling things online, or delivering food, you're part of the gig economy. But these earnings have tax implications too!" },
      { type: "icon", name: "🎮" },
      { type: "text", value: "Unlike a regular job where taxes are withheld from your paycheck, for gig work, you're usually responsible for paying your own taxes. This means setting aside money throughout the year for taxes." },
      { type: "image", src: "https://placehold.co/300x150/EDE7F6/8A2BE2?text=Gig+Taxes" },
      { type: "text", value: "This type of income is often called 'self-employment income.' If you earn more than a certain amount (e.g., $400 in net earnings from self-employment), you'll need to pay self-employment taxes (Social Security and Medicare taxes)." },
      { type: "icon", name: "💼" },
      { type: "text", value: "Keep good records! Track all your income and expenses related to your gig work. Expenses (like gas for deliveries, supplies for crafts) can often be deducted, reducing your taxable income." },
      { type: "image", src: "https://placehold.co/300x150/8A2BE2/ffffff?text=Keep+Records" },
      { type: "text", value: "You might need to pay estimated taxes quarterly if you expect to owe more than a certain amount (e.g., $1,000 in taxes for the year). This ensures you don't have a huge tax bill at the end of the year. It's a bit more complex, so definitely get help from a trusted adult or tax pro!" }
    ],
    quiz: {
      questions: [
        {
          id: "it5-q1",
          type: "mc",
          questionText: "For gig economy income, who is usually responsible for paying taxes?",
          options: [
            "Your client.",
            "The government.",
            "You, the earner.",
            "No one, it's tax-free."
          ],
          correctAnswer: "You, the earner.",
          relatedContentIndex: 2
        },
        {
          id: "it5-q2",
          type: "tf",
          questionText: "It's important to keep records of your income and expenses for gig work.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 6
        },
        {
          id: "it5-q3",
          type: "frq",
          questionText: "What is the term for income earned from freelancing or side jobs?",
          correctAnswer: ["self-employment income", "gig income"],
          relatedContentIndex: 4
        }
      ]
    }
  },

  // --- Financial Planning & Milestones: Future Frontier & Dream Destinations (🚀) ---
  {
    id: "smart-goals-dream-destinations",
    title: "SMART Goals: Your Dream Destinations",
    category: "Financial Planning & Milestones",
    order: 1,
    time: "6 min read",
    description: "Learn to set Specific, Measurable, Achievable, Relevant, and Time-bound financial goals.",
    content: [
      { type: "text", value: "Every grand adventure needs a map, and your financial journey is no different! Setting SMART goals is like plotting your course to your dream destinations. SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound." },
      { type: "image", src: "https://placehold.co/300x150/00BFFF/ffffff?text=SMART+Map" },
      { type: "text", value: "**Specific:** Instead of 'save money,' aim for 'save $500 for a new gaming console.' The clearer your target, the easier it is to hit." },
      { type: "icon", name: "🎯" },
      { type: "text", value: "**Measurable:** How will you know you've reached it? 'Save $500' is measurable. You can track your progress. 'Save some money' is not." },
      { type: "text", value: "**Achievable:** Is it realistic? Saving $500 in a month on a small allowance might be tough, but $500 in three months might be achievable. Push yourself, but don't set yourself up for failure." },
      { type: "text", value: "**Relevant:** Does this goal truly matter to you? Does it align with your values and other life plans? Saving for something you genuinely want keeps you motivated." },
      { type: "text", value: "**Time-bound:** Give yourself a deadline! 'Save $500 for a new gaming console by next summer.' A deadline creates urgency and helps you plan your steps. Using SMART goals turns vague wishes into actionable plans for your future frontier!" },
      { type: "icon", name: "⏳" }
    ],
    quiz: {
      questions: [
        {
          id: "fp1-q1",
          type: "mc",
          questionText: "What does the 'M' in SMART goals stand for?",
          options: [
            "Motivating",
            "Meaningful",
            "Measurable",
            "Money"
          ],
          correctAnswer: "Measurable",
          relatedContentIndex: 4
        },
        {
          id: "fp1-q2",
          type: "tf",
          questionText: "A SMART goal should be vague to allow for flexibility.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 0
        },
        {
          id: "fp1-q3",
          type: "frq",
          questionText: "What is the purpose of making a goal 'Time-bound'?",
          correctAnswer: ["creates urgency", "helps plan steps", "sets a deadline"],
          relatedContentIndex: 7
        }
      ]
    }
  },
  {
    id: "budgeting-for-college",
    title: "College Quest: Budgeting for Higher Learning",
    category: "Financial Planning & Milestones",
    order: 2,
    time: "7 min read",
    description: "Prepare financially for college by understanding costs and saving strategies.",
    content: [
      { type: "text", value: "The college quest is a huge milestone, and financial planning is your trusty compass! College isn't just tuition; it includes housing, food, books, transportation, and personal expenses. Understanding these costs is key." },
      { type: "image", src: "https://placehold.co/300x150/E0F7FA/00BFFF?text=College+Costs" },
      { type: "text", value: "Start by researching different types of colleges (public, private, community college) and their average costs. In-state public universities are often more affordable than out-of-state or private institutions." },
      { type: "icon", name: "🏫" },
      { type: "text", value: "Explore financial aid options: **Grants** and **scholarships** are free money you don't have to pay back – hunt for these like hidden treasures! **Work-study programs** allow you to earn money while studying." },
      { type: "image", src: "https://placehold.co/300x150/00BFFF/ffffff?text=Scholarships" },
      { type: "text", value: "If you need to borrow, federal student loans are generally better than private loans due to lower interest rates and more flexible repayment plans. Only borrow what you absolutely need, and understand the repayment terms." },
      { type: "icon", name: "📚" },
      { type: "text", value: "Create a savings plan. Even small, consistent contributions to a 529 plan or a dedicated savings account can make a big difference over time. Every dollar saved now is a dollar you won't have to borrow later, making your college journey smoother!" }
    ],
    quiz: {
      questions: [
        {
          id: "fp2-q1",
          type: "mc",
          questionText: "Which of these is considered 'free money' for college that you don't have to pay back?",
          options: [
            "Federal student loans",
            "Private student loans",
            "Grants and scholarships",
            "Credit card debt"
          ],
          correctAnswer: "Grants and scholarships",
          relatedContentIndex: 4
        },
        {
          id: "fp2-q2",
          type: "tf",
          questionText: "College costs only include tuition fees.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 0
        },
        {
          id: "fp2-q3",
          type: "frq",
          questionText: "Name one type of college that is often more affordable.",
          correctAnswer: ["in-state public university", "community college", "public university"],
          relatedContentIndex: 2
        }
      ]
    }
  },
  {
    id: "first-car-financial-pitfalls",
    title: "First Ride: Avoiding Financial Pitfalls",
    category: "Financial Planning & Milestones",
    order: 3,
    time: "6 min read",
    description: "Learn about the true costs of owning a car and how to budget for them.",
    content: [
      { type: "text", value: "Getting your first car feels like unlocking a new level of freedom, but it comes with hidden costs! Beyond the purchase price, there are many financial pitfalls to navigate." },
      { type: "image", src: "https://placehold.co/300x150/00BFFF/ffffff?text=Car+Freedom" },
      { type: "text", value: "The true cost of a car includes: the purchase price (whether cash or loan), insurance (mandatory!), gas, maintenance (oil changes, tires), and potential repairs. Don't forget registration fees and parking costs!" },
      { type: "icon", name: "⛽🛠️" },
      { type: "text", value: "Saving up for a down payment can significantly reduce the amount you need to borrow, which means less interest paid over time. The bigger the down payment, the smaller your monthly car loan payments will be." },
      { type: "image", src: "https://placehold.co/300x150/E0F7FA/00BFFF?text=Down+Payment" },
      { type: "text", value: "Car insurance is a must-have shield. Different types of coverage exist (liability, collision, comprehensive). Get quotes from several companies to find the best rate, and remember that younger drivers often pay more." },
      { type: "icon", name: "🛡️" },
      { type: "text", value: "Factor in ongoing expenses into your budget. A car isn't a one-time purchase; it's a monthly commitment. Make sure you can comfortably afford all the costs before you hit the road, or your dream ride could become a financial nightmare!" }
    ],
    quiz: {
      questions: [
        {
          id: "fp3-q1",
          type: "mc",
          questionText: "Which of these is NOT a 'hidden cost' of owning a car?",
          options: [
            "Insurance",
            "Gas",
            "The color of the car",
            "Maintenance"
          ],
          correctAnswer: "The color of the car",
          relatedContentIndex: 2
        },
        {
          id: "fp3-q2",
          type: "tf",
          questionText: "A larger down payment on a car can lead to smaller monthly loan payments.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 4
        },
        {
          id: "fp3-q3",
          type: "frq",
          questionText: "What is a mandatory ongoing cost of car ownership mentioned in the lesson?",
          correctAnswer: ["insurance"],
          relatedContentIndex: 2
        }
      ]
    }
  },
  {
    id: "first-apartment-financial-checklist",
    title: "Your Own Castle: First Apartment Checklist",
    category: "Financial Planning & Milestones",
    order: 4,
    time: "7 min read",
    description: "Prepare for the financial realities of moving into your first apartment.",
    content: [
      { type: "text", value: "Dreaming of your own space? Moving into your first apartment is a huge step, but it's a financial adventure! It's more than just rent; there's a whole checklist of costs." },
      { type: "image", src: "https://placehold.co/300x150/E0F7FA/00BFFF?text=First+Apartment" },
      { type: "text", value: "Upfront costs often include: first month's rent, last month's rent, and a security deposit. This can add up to 2-3 times the monthly rent, so start saving early!" },
      { type: "icon", name: "💸" },
      { type: "text", value: "Ongoing monthly expenses include: rent (the biggest one!), utilities (electricity, water, gas, internet), and renter's insurance (protects your belongings)." },
      { type: "image", src: "https://placehold.co/300x150/00BFFF/ffffff?text=Monthly+Bills" },
      { type: "text", value: "Don't forget furnishing and setting up your new castle! You'll need furniture, kitchen supplies, cleaning products, and more. Budget for these initial setup costs, or start collecting items slowly." },
      { type: "icon", name: "🛋️🍳" },
      { type: "text", value: "Create a realistic budget for your new independent life. Can your income comfortably cover all these new expenses? Living within your means is crucial to avoid financial stress in your new home." }
    ],
    quiz: {
      questions: [
        {
          id: "fp4-q1",
          type: "mc",
          questionText: "Which of these is typically an upfront cost when moving into an apartment?",
          options: [
            "Daily groceries.",
            "A new car.",
            "Security deposit.",
            "Monthly gym membership."
          ],
          correctAnswer: "Security deposit.",
          relatedContentIndex: 2
        },
        {
          id: "fp4-q2",
          type: "tf",
          questionText: "Renter's insurance is usually an optional expense that isn't necessary.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 4
        },
        {
          id: "fp4-q3",
          type: "frq",
          questionText: "Name one ongoing monthly expense for an apartment, besides rent.",
          correctAnswer: ["utilities", "electricity", "water", "gas", "internet", "renter's insurance"],
          relatedContentIndex: 4
        }
      ]
    }
  },
  {
    id: "retirement-planning-early",
    title: "Retirement Realm: Planning Your Golden Years Early",
    category: "Financial Planning & Milestones",
    order: 5,
    time: "8 min read",
    description: "Discover why starting retirement planning early, even in high school, is a superpower.",
    content: [
      { type: "text", value: "Retirement might seem like a faraway realm, but planning for it now is like gaining a superpower! The magic of compound interest means that money saved early grows exponentially over decades." },
      { type: "icon", name: "✨" },
      { type: "text", value: "Most high schoolers won't have access to a 401(k) (an employer-sponsored retirement plan), but if you have earned income from a job, you can open a **Roth IRA**. This is an individual retirement account." },
      { type: "image", src: "https://placehold.co/300x150/00BFFF/ffffff?text=Roth+IRA" },
      { type: "text", value: "With a Roth IRA, you contribute money that has already been taxed. The huge benefit? When you retire, all your qualified withdrawals are completely tax-free! This means all that growth from decades of compounding is yours, free from future taxes." },
      { type: "icon", name: "📈" },
      { type: "text", value: "Even small contributions make a difference. Saving just $50 a month from age 18 to 65 can add up to hundreds of thousands of dollars, thanks to compounding. The biggest mistake is waiting to start." },
      { type: "image", src: "https://placehold.co/300x150/E0F7FA/00BFFF?text=Start+Early" },
      { type: "text", value: "Retirement planning isn't just about money; it's about securing your future freedom. Imagine having the choice to work because you want to, not because you have to. Starting early gives you the best chance to build that dream!" }
    ],
    quiz: {
      questions: [
        {
          id: "fp5-q1",
          type: "mc",
          questionText: "What is the main benefit of contributing to a Roth IRA early?",
          options: [
            "You get immediate tax deductions.",
            "All qualified withdrawals in retirement are tax-free.",
            "It helps you buy a car faster.",
            "It's only for high-income earners."
          ],
          correctAnswer: "All qualified withdrawals in retirement are tax-free.",
          relatedContentIndex: 4
        },
        {
          id: "fp5-q2",
          type: "tf",
          questionText: "The biggest mistake in retirement planning is waiting to start.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 6
        },
        {
          id: "fp5-q3",
          type: "frq",
          questionText: "What financial principle makes money saved early grow significantly over decades?",
          correctAnswer: ["compound interest", "compounding"],
          relatedContentIndex: 0
        }
      ]
    }
  },

  // --- Financial Literacy & Consumer Awareness: Wisdom Woods & Clever Consumer Crossroads (💡) ---
  {
    id: "financial-literacy-basics",
    title: "Wisdom Woods: The ABCs of Financial Literacy",
    category: "Financial Literacy & Consumer Awareness",
    order: 1,
    time: "5 min read",
    description: "Get introduced to the fundamental concepts of financial literacy.",
    content: [
      { type: "text", value: "Welcome to the Wisdom Woods, where every step makes you smarter about money! Financial literacy is simply having the knowledge and skills to manage your money effectively. It's your superpower in the real world!" },
      { type: "image", src: "https://placehold.co/300x150/FF4500/ffffff?text=Financial+Superpower" },
      { type: "text", value: "It covers topics like budgeting, saving, investing, debt, and understanding taxes. The more you know, the better decisions you can make to achieve your financial goals and avoid common pitfalls." },
      { type: "icon", name: "🧠" },
      { type: "text", value: "Why is it important for high schoolers? Because financial decisions start early! From managing your allowance to your first part-time job, understanding money now sets you up for a lifetime of success." },
      { type: "image", src: "https://placehold.co/300x150/FFF3E0/FF4500?text=Early+Start" },
      { type: "text", value: "Think of it as learning the rules of a game. If you know the rules of money, you can play smarter, win more, and avoid losing your hard-earned coins." },
      { type: "icon", name: "🎮" },
      { type: "text", value: "This journey isn't about becoming a financial expert overnight, but about building a strong foundation. Every lesson you learn, every concept you grasp, adds to your financial wisdom and confidence." }
    ],
    quiz: {
      questions: [
        {
          id: "fl1-q1",
          type: "mc",
          questionText: "What is financial literacy?",
          options: [
            "Knowing how to spend all your money quickly.",
            "Having knowledge and skills to manage money effectively.",
            "Only understanding how to invest.",
            "Avoiding all financial topics."
          ],
          correctAnswer: "Having knowledge and skills to manage money effectively.",
          relatedContentIndex: 0
        },
        {
          id: "fl1-q2",
          type: "tf",
          questionText: "Financial decisions only start when you become an adult.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 4
        },
        {
          id: "fl1-q3",
          type: "frq",
          questionText: "Name one topic covered by financial literacy.",
          correctAnswer: ["budgeting", "saving", "investing", "debt", "taxes"],
          relatedContentIndex: 2
        }
      ]
    }
  },
  {
    id: "understanding-inflation",
    title: "The Inflation Imp: Why Money Changes Value",
    category: "Financial Literacy & Consumer Awareness",
    order: 2,
    time: "6 min read",
    description: "Learn about inflation and how it affects the purchasing power of your money.",
    content: [
      { type: "text", value: "Ever noticed how things seem to get more expensive over time? That's the work of the 'Inflation Imp'! Inflation is the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling." },
      { type: "icon", name: "😈" },
      { type: "text", value: "In simpler terms, your money buys less tomorrow than it does today. If a candy bar costs $1 today, with 3% inflation, it might cost $1.03 next year. Over many years, this adds up significantly." },
      { type: "image", src: "https://placehold.co/300x150/FF4500/ffffff?text=Inflation+Effect" },
      { type: "text", value: "Inflation is usually measured by the Consumer Price Index (CPI), which tracks the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services." },
      { type: "icon", name: "📈" },
      { type: "text", value: "Why does it matter for you? If you just keep your money under your mattress, inflation will slowly eat away at its value. What $100 buys today will buy less in 10 years." },
      { type: "image", src: "https://placehold.co/300x150/FFF3E0/FF4500?text=Money+Value" },
      { type: "text", value: "To combat the Inflation Imp, you need to make your money grow faster than inflation. This is where saving in high-yield accounts and especially investing comes in. Your goal is to keep your money's purchasing power strong for the future!" }
    ],
    quiz: {
      questions: [
        {
          id: "fl2-q1",
          type: "mc",
          questionText: "What is inflation?",
          options: [
            "When prices for goods and services fall.",
            "When your money earns more interest.",
            "When the purchasing power of currency falls as prices rise.",
            "When you get a raise at work."
          ],
          correctAnswer: "When the purchasing power of currency falls as prices rise.",
          relatedContentIndex: 0
        },
        {
          id: "fl2-q2",
          type: "tf",
          questionText: "Keeping money under your mattress is a good way to protect it from inflation.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 6
        },
        {
          id: "fl2-q3",
          type: "frq",
          questionText: "What is one way to combat the effects of inflation on your money?",
          correctAnswer: ["saving in high-yield accounts", "investing", "making money grow faster than inflation"],
          relatedContentIndex: 8
        }
      ]
    }
  },
  {
    id: "consumer-rights-and-scams",
    title: "Clever Consumer Crossroads: Rights & Scams",
    category: "Financial Literacy & Consumer Awareness",
    order: 3,
    time: "7 min read",
    description: "Understand your rights as a consumer and how to spot common scams.",
    content: [
      { type: "text", value: "At the Clever Consumer Crossroads, you learn to navigate the marketplace safely! As a consumer, you have rights, and it's important to know them to protect yourself from unfair practices and tricky scams." },
      { type: "icon", name: "🚦" },
      { type: "text", value: "Your basic consumer rights include: the right to safety (products should be safe), the right to be informed (accurate info about products), the right to choose (access to various products), and the right to be heard (voice complaints)." },
      { type: "image", src: "https://placehold.co/300x150/FFF3E0/FF4500?text=Consumer+Rights" },
      { type: "text", value: "Scams are deceptive tricks designed to steal your money or information. Common scams include: phishing (fake emails/texts), pyramid schemes (making money by recruiting others, not selling products), and fake prize/lottery notifications." },
      { type: "icon", name: "🚨" },
      { type: "text", value: "How to spot a scam: If it sounds too good to be true, it probably is. Pressure to act immediately, requests for personal info (passwords, SSN) over the phone/email, and demands for payment via gift cards or wire transfers are huge red flags." },
      { type: "image", src: "https://placehold.co/300x150/FF4500/ffffff?text=Red+Flags" },
      { type: "text", value: "If you suspect a scam, stop, think, and verify. Research the company or offer independently. Talk to a trusted adult. Report scams to the Federal Trade Commission (FTC) or your local consumer protection agency. Be a clever consumer, not a victim!" }
    ],
    quiz: {
      questions: [
        {
          id: "fl3-q1",
          type: "mc",
          questionText: "Which of these is a basic consumer right?",
          options: [
            "The right to get everything for free.",
            "The right to safety (products should be safe).",
            "The right to never pay taxes.",
            "The right to always win lotteries."
          ],
          correctAnswer: "The right to safety (products should be safe).",
          relatedContentIndex: 2
        },
        {
          id: "fl3-q2",
          type: "tf",
          questionText: "A request for payment via gift card is a common red flag for a scam.",
          options: ["True", "False"],
          correctAnswer: "True",
          relatedContentIndex: 6
        },
        {
          id: "fl3-q3",
          type: "frq",
          questionText: "Name one common type of scam mentioned in the lesson.",
          correctAnswer: ["phishing", "pyramid schemes", "fake prize notifications"],
          relatedContentIndex: 4
        }
      ]
    }
  },
  {
    id: "banking-basics-and-digital-money",
    title: "Digital Gold: Banking Basics & Online Money",
    category: "Financial Literacy & Consumer Awareness",
    order: 4,
    time: "6 min read",
    description: "Understand checking and savings accounts, and how to manage money digitally.",
    content: [
      { type: "text", value: "In the age of digital gold, understanding banking is essential! A **checking account** is for everyday spending and bill paying, allowing easy access to your money via debit cards, checks, or online transfers." },
      { type: "icon", name: "💳" },
      { type: "text", value: "A **savings account** is for money you want to keep separate for future goals or emergencies. It typically earns a small amount of interest, helping your money grow a little over time. It's less accessible than a checking account, which helps prevent impulse spending." },
      { type: "image", src: "https://placehold.co/300x150/FFF3E0/FF4500?text=Checking+Savings" },
      { type: "text", value: "Online banking and mobile apps make managing your money super convenient. You can check balances, transfer funds, pay bills, and even deposit checks from your phone. Always use strong passwords and two-factor authentication for security." },
      { type: "icon", name: "📱" },
      { type: "text", value: "Be aware of fees! Banks might charge fees for overdrafts (spending more than you have), ATM withdrawals from other banks, or monthly maintenance fees if you don't meet certain requirements. Read the fine print!" },
      { type: "image", src: "https://placehold.co/300x150/FF4500/ffffff?text=Bank+Fees" },
      { type: "text", value: "Digital payment apps (like Venmo, Cash App, Zelle) are great for splitting costs with friends, but remember they are linked to your bank account. Use them responsibly and only with people you trust. Keep your digital gold safe!" }
    ],
    quiz: {
      questions: [
        {
          id: "fl4-q1",
          type: "mc",
          questionText: "Which type of bank account is best for everyday spending and bill paying?",
          options: [
            "Savings account",
            "Checking account",
            "Investment account",
            "Retirement account"
          ],
          correctAnswer: "Checking account",
          relatedContentIndex: 0
        },
        {
          id: "fl4-q2",
          type: "tf",
          questionText: "Digital payment apps are always safe to use with anyone.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 8
        },
        {
          id: "fl4-q3",
          type: "frq",
          questionText: "Name one type of fee banks might charge.",
          correctAnswer: ["overdraft fees", "atm withdrawal fees", "monthly maintenance fees"],
          relatedContentIndex: 6
        }
      ]
    }
  },
  {
    id: "budgeting-for-fun-and-social-life",
    title: "Fun Funds: Budgeting for Social Life & Entertainment",
    category: "Financial Literacy & Consumer Awareness",
    order: 5,
    time: "5 min read",
    description: "Learn how to enjoy your social life without breaking your budget.",
    content: [
      { type: "text", value: "Money isn't just for bills and savings; it's also for fun! Learning to budget for your social life and entertainment is key to a balanced financial journey. This is where your 'wants' come into play." },
      { type: "icon", name: "🎉" },
      { type: "text", value: "Allocate a specific amount in your budget for entertainment, dining out, movies, games, or hanging out with friends. This is your 'fun fund.' Once it's gone, it's gone until the next budgeting period." },
      { type: "image", src: "https://placehold.co/300x150/FF4500/ffffff?text=Fun+Fund" },
      { type: "text", value: "Look for free or low-cost activities. Instead of always going to the movies, suggest a park picnic, a board game night at home, or exploring free local events. Get creative with your fun!" },
      { type: "icon", name: "�🎲" },
      { type: "text", value: "Splitting costs fairly with friends is important. Use digital payment apps (like Venmo or Cash App) to easily divide bills for group activities or meals. Make sure everyone pays their share." },
      { type: "image", src: "https://placehold.co/300x150/FFF3E0/FF4500?text=Split+Costs" },
      { type: "text", value: "Don't let FOMO (Fear Of Missing Out) bust your budget. It's okay to say 'no' to an expensive outing if it doesn't fit your financial plan. True friends will understand. Your financial well-being is more important than keeping up with every trend." }
    ],
    quiz: {
      questions: [
        {
          id: "fl5-q1",
          type: "mc",
          questionText: "What is a 'fun fund' in a budget?",
          options: [
            "Money for emergencies.",
            "Money allocated for social life and entertainment.",
            "Money for paying bills.",
            "Money for investments only."
          ],
          correctAnswer: "Money allocated for social life and entertainment.",
          relatedContentIndex: 2
        },
        {
          id: "fl5-q2",
          type: "tf",
          questionText: "It's always necessary to spend money to have fun with friends.",
          options: ["True", "False"],
          correctAnswer: "False",
          relatedContentIndex: 4
        },
        {
          id: "fl5-q3",
          type: "frq",
          questionText: "What does FOMO stand for?",
          correctAnswer: ["fear of missing out"],
          relatedContentIndex: 8
        }
      ]
    }
  }
];

export default lessonsData;
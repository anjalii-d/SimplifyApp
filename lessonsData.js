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
    xpAward: 50, // Added XP for completing the lesson
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
      xpPerCorrectAnswer: 10, // Added XP per correct quiz answer
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
    xpAward: 60, // Added XP for completing the lesson
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
      xpPerCorrectAnswer: 12, // Added XP per correct quiz answer
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
    xpAward: 55, // Added XP for completing the lesson
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
      xpPerCorrectAnswer: 11, // Added XP per correct quiz answer
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
    xpAward: 70, // Added XP for completing the lesson
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
      xpPerCorrectAnswer: 14, // Added XP per correct quiz answer
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
    xpAward: 65, // Added XP for completing the lesson
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
      xpPerCorrectAnswer: 13, // Added XP per correct quiz answer
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
    xpAward: 60, // Added XP for completing the lesson
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
      xpPerCorrectAnswer: 12, // Added XP per correct quiz answer
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
    xpAward: 75, // Added XP for completing the lesson (higher due to importance)
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
      xpPerCorrectAnswer: 15, // Added XP per correct quiz answer
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
    xpAward: 70, // Added XP for completing the lesson
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
      xpPerCorrectAnswer: 14, // Added XP per correct quiz answer
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
    xpAward: 80, // Added XP for completing the lesson (higher due to complexity/importance)
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
      xpPerCorrectAnswer: 16, // Added XP per correct quiz answer
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
    xpAward: 80, // Award 80 XP for completing this investing lesson
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
      xpPerCorrectAnswer: 15, // Award 15 XP per correct answer for this quiz
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
    xpAward: 70, // Award 70 XP for completing this lesson
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
      xpPerCorrectAnswer: 12, // Award 12 XP per correct answer for this quiz
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
    xpAward: 75, // Award 75 XP for completing this lesson
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
      xpPerCorrectAnswer: 13, // Award 13 XP per correct answer for this quiz
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
    xpAward: 85, // Award 85 XP for completing this lesson
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
      xpPerCorrectAnswer: 17, // Award 17 XP per correct answer for this quiz
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
    xpAward: 90, // Award 90 XP for completing this lesson
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
      xpPerCorrectAnswer: 18, // Award 18 XP per correct answer for this quiz
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
    xpAward: 100, // Award 100 XP for completing this lesson
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
      xpPerCorrectAnswer: 20, // Award 20 XP per correct answer for this quiz
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
    xpAward: 60, // Award 60 XP for completing this lesson
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
      xpPerCorrectAnswer: 12, // Award 12 XP per correct answer for this quiz
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
    xpAward: 75, // Award 75 XP for completing this lesson
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
      xpPerCorrectAnswer: 14, // Award 14 XP per correct answer for this quiz
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
    xpAward: 80, // Award 80 XP for completing this lesson
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
      xpPerCorrectAnswer: 15, // Award 15 XP per correct answer for this quiz
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
    xpAward: 90, // Award 90 XP for completing this lesson
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
      xpPerCorrectAnswer: 18, // Award 18 XP per correct answer for this quiz
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
    xpAward: 95, // Award 95 XP for completing this lesson
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
      xpPerCorrectAnswer: 19, // Award 19 XP per correct answer for this quiz
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
const lessonsData = [
  {
    id: "smart-goals-dream-destinations",
    title: "SMART Goals: Your Dream Destinations",
    category: "Financial Planning & Milestones",
    order: 1,
    time: "6 min read",
    description: "Learn to set Specific, Measurable, Achievable, Relevant, and Time-bound financial goals.",
    xpAward: 70,
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
      xpPerCorrectAnswer: 14,
      questions: [
        {
          id: "fp1-q1",
          type: "mc",
          questionText: "What does the 'M' in SMART goals stand for?",
          options: ["Motivating", "Meaningful", "Measurable", "Money"],
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

  // (... continue same structure for each lesson — nothing structurally wrong there ...)
  
  // Your last entry:
  {
    id: "budgeting-for-fun-and-social-life",
    title: "Fun Funds: Budgeting for Social Life & Entertainment",
    category: "Financial Literacy & Consumer Awareness",
    order: 5,
    time: "5 min read",
    description: "Learn how to enjoy your social life without breaking your budget.",
    xpAward: 65,
    content: [
      { type: "text", value: "Money isn't just for bills and savings; it's also for fun! Learning to budget for your social life and entertainment is key to a balanced financial journey. This is where your 'wants' come into play." },
      { type: "icon", name: "🎉" },
      { type: "text", value: "Allocate a specific amount in your budget for entertainment, dining out, movies, games, or hanging out with friends. This is your 'fun fund.' Once it's gone, it's gone until the next budgeting period." },
      { type: "image", src: "https://placehold.co/300x150/FF4500/ffffff?text=Fun+Fund" },
      { type: "text", value: "Look for free or low-cost activities. Instead of always going to the movies, suggest a park picnic, a board game night at home, or exploring free local events. Get creative with your fun!" },
      { type: "icon", name: "🎲" },
      { type: "text", value: "Splitting costs fairly with friends is important. Use digital payment apps (like Venmo or Cash App) to easily divide bills for group activities or meals. Make sure everyone pays their share." },
      { type: "image", src: "https://placehold.co/300x150/FFF3E0/FF4500?text=Split+Costs" },
      { type: "text", value: "Don't let FOMO (Fear Of Missing Out) bust your budget. It's okay to say 'no' to an expensive outing if it doesn't fit your financial plan. True friends will understand. Your financial well-being is more important than keeping up with every trend." }
    ],
    quiz: {
      xpPerCorrectAnswer: 13,
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

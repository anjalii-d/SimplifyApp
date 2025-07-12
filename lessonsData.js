// lessonsData.js
// This file contains all 30 hardcoded lessons, their content, and quizzes.

const lessonsData = [
  // --- Budgeting & Spending (5 Lessons) ---
  {
    id: 'budgeting-spending-lesson-1-hardcoded', // Keeping this ID consistent with previous work
    title: 'Your Money, Your Map: The Power of Budgeting',
    category: 'Budgeting & Spending',
    order: 1,
    time: '5 min read',
    content: [
      "Forget boring spreadsheets. Budgeting is your personal financial GPS. It's not about telling you 'no,' it's about showing you exactly where your money goes and how to get it where you want it to be. This is how you take control.",
      "At its core, a budget is simple: know what's coming in (income) and what's going out (expenses). When you track these two things, you unlock the ability to make smart decisions instead of just guessing.",
      "The real power? Budgeting directly connects your daily spending to your biggest goals. Want that new tech? Saving for college? Planning a trip? A budget is the strategic tool that makes those aspirations a reality. No budget, no clear path.",
      "Many think budgeting is complicated or restrictive. Wrong. A well-designed budget actually gives you *more* freedom. It ensures you have enough for your essentials, your fun, and your future, without the stress of wondering where your next dollar went.",
      "This isn't a one-time fix; it's a skill. Start now. Learning to budget is one of the most valuable habits you can build for long-term financial success. It's your foundation for everything else."
    ],
    quiz: {
      questions: [
        {
          id: 'bs1-q1',
          type: 'mc',
          questionText: 'What is the main idea behind budgeting, as described in the lesson?',
          options: [
            "To tell you 'no' to all spending.",
            "To give every dollar a purpose and make your money work for you.",
            "To make financial decisions more complicated.",
            "To eliminate the need to track income."
          ],
          correctAnswer: "To give every dollar a purpose and make your money work for you.",
          relatedContentIndex: 0
        },
        {
          id: 'bs1-q2',
          type: 'tf',
          questionText: 'A well-designed budget actually limits your financial freedom.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          relatedContentIndex: 3
        },
        {
          id: 'bs1-q3',
          type: 'frq',
          questionText: 'What metaphor is used to describe budgeting as a tool for financial control?',
          correctAnswer: ['financial gps', 'gps', 'roadmap', 'financial roadmap'],
          relatedContentIndex: 0
        },
        {
          id: 'bs1-q4',
          type: 'mc',
          questionText: 'According to the lesson, what is the core simple action of budgeting?',
          options: [
            "Investing in stocks and bonds.",
            "Knowing what's coming in (income) and what's going out (expenses).",
            "Avoiding all debt.",
            "Only spending on needs, never wants."
          ],
          correctAnswer: "Knowing what's coming in (income) and what's going out (expenses).",
          relatedContentIndex: 1
        },
        {
          id: 'bs1-q5',
          type: 'tf',
          questionText: 'Budgeting is a one-time fix for your finances.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          relatedContentIndex: 4
        }
      ]
    }
  },
  {
    id: 'budgeting-spending-lesson-2',
    title: 'Know Your Flow: Tracking Income & Expenses',
    category: 'Budgeting & Spending',
    order: 2,
    time: '7 min read',
    content: [
      "Ready to see your money in action? Tracking your income and expenses is like getting a real-time report on your financial life. It's the essential first step to taking control, because you can't manage what you don't measure.",
      "First, income. This is all the money coming in: allowances, part-time job paychecks, gifts, side hustles. List every source, every amount. Knowing your total income is your starting line.",
      "Next, expenses. This is where your money goes. Every coffee, every game download, every bus fare. You can track manually (a simple notebook, a spreadsheet) or use digital tools. The goal here is just to record, not to judge.",
      "Digital tools are game-changers. Many banking apps have built-in trackers, or you can use dedicated personal finance apps. They often link to your accounts and auto-categorize spending, giving you instant visual breakdowns. Super efficient.",
      "Commit to tracking for at least a month. This gives you a realistic snapshot of your habits. You'll likely discover 'money leaks' – small, forgotten expenses that add up. This awareness is gold; it's the data you need to make smarter choices later."
    ],
    quiz: {
      questions: [
        {
          id: 'bs2-q1',
          type: 'mc',
          questionText: 'What is the primary benefit of tracking your cash flow?',
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
          id: 'bs2-q2',
          type: 'tf',
          questionText: 'When first tracking expenses, you should immediately try to change your spending habits.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          relatedContentIndex: 4
        },
        {
          id: 'bs2-q3',
          type: 'frq',
          questionText: 'Name one type of digital tool that can help automate expense tracking.',
          correctAnswer: ['personal finance app', 'banking app', 'budgeting app'],
          relatedContentIndex: 3
        }
      ]
    }
  },
  {
    id: 'budgeting-spending-lesson-3',
    title: 'Smart Choices: Needs, Wants & Mindful Spending',
    category: 'Budgeting & Spending',
    order: 3,
    time: '6 min read',
    content: [
      "A crucial step in smart spending is distinguishing between your 'needs' and your 'wants'. Needs are essential for survival and basic functioning (e.g., shelter, food, transportation for school/work, basic clothing).",
      "Wants are things that improve your quality of life but aren't strictly necessary (e.g., dining out, new video games, designer clothes, subscription services). It's not about eliminating wants, but prioritizing them.",
      "Mindful spending means making conscious decisions about where your money goes, rather than spending on impulse. Before a purchase, ask yourself: 'Is this a need or a want? Does it align with my goals? Can I truly afford it?'",
      "Impulse buys are a major budget buster. They often happen when we're emotional, stressed, or influenced by advertising. Develop strategies like the '24-hour rule' (wait 24 hours before buying non-essentials) to combat this.",
      "Small, consistent choices add up significantly over time. Cutting out a daily soda or packing your lunch a few times a week might seem minor, but these habits free up money that can be directed towards your savings or goals."
    ],
    quiz: {
      questions: [
        {
          id: 'bs3-q1',
          type: 'mc',
          questionText: 'Which of these is generally considered a "need"?',
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
          id: 'bs3-q2',
          type: 'tf',
          questionText: 'Mindful spending means buying whatever you want, whenever you want.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          relatedContentIndex: 2
        },
        {
          id: 'bs3-q3',
          type: 'frq',
          questionText: 'What is one strategy to combat impulse buys?',
          correctAnswer: ['24-hour rule', 'wait 24 hours', 'ask yourself if you can afford it', 'ask if it aligns with goals', 'ask if it\'s a need or want'],
          relatedContentIndex: 3
        }
      ]
    }
  },
  {
    id: 'budgeting-spending-lesson-4',
    title: 'Building Your Budget Blueprint: Methods & Personalization',
    category: 'Budgeting & Spending',
    order: 4,
    time: '8 min read',
    content: [
      "Now that you understand tracking, it's time to build your budget blueprint. This is your personalized spending plan. There isn't one perfect method; the best budget is the one you'll actually stick to.",
      "A popular and simple starting point is the **50/30/20 Rule**. This allocates your after-tax income: 50% to Needs (housing, utilities, groceries), 30% to Wants (entertainment, dining out, hobbies), and 20% to Savings & Debt Repayment.",
      "Another effective method is the **Envelope System**. Traditionally, you'd put physical cash into envelopes for different categories (e.g., 'Groceries,' 'Fun'). Once an envelope is empty, you stop spending in that category until the next period. This can be adapted digitally with apps that mimic the same concept.",
      "**Zero-Based Budgeting** is a method where you assign every dollar of your income a 'job' (spending, saving, debt repayment) until your income minus your expenses equals zero. This ensures no money is left unaccounted for and gives you maximum control.",
      "The key is personalization. Start with a method that feels manageable, then adjust it. Your budget should be a flexible tool that reflects your values and helps you achieve your unique financial goals, not a rigid set of rules."
    ],
    quiz: {
      questions: [
        {
          id: 'bs4-q1',
          type: 'mc',
          questionText: 'Which budgeting rule allocates 50% to Needs, 30% to Wants, and 20% to Savings & Debt Repayment?',
          options: [
            "The 70/20/10 Rule",
            "The 50/30/20 Rule",
            "The Envelope System",
            "Zero-Based Budgeting"
          ],
          correctAnswer: "The 50/30/20 Rule",
          relatedContentIndex: 1
        },
        {
          id: 'bs4-q2',
          type: 'tf',
          questionText: 'The best budget is a rigid set of rules that never changes.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          relatedContentIndex: 4
        },
        {
          id: 'bs4-q3',
          type: 'frq',
          questionText: 'What budgeting method involves assigning every dollar of your income a "job" until income minus expenses equals zero?',
          correctAnswer: ['zero-based budgeting', 'zero based budgeting'],
          relatedContentIndex: 3
        }
      ]
    }
  },
  {
    id: 'budgeting-spending-lesson-5',
    title: 'Budgeting for Real Life: Adjustments & Automation',
    category: 'Budgeting & Spending',
    order: 5,
    time: '7 min read',
    content: [
      "A budget isn't a set-it-and-forget-it tool; it's a living document. Real life throws curveballs: unexpected expenses, fluctuating income from a part-time job, or even just social events that cost more than planned.",
      "Regular review is crucial. Set aside time weekly or bi-weekly to check your spending against your budget. Did you overspend in one area? Where can you cut back next week to compensate? This flexibility is key to long-term success.",
      "Don't be afraid to adjust your budget. If you consistently overspend in a 'Wants' category, perhaps you need to reallocate funds from another 'Want' or find a way to increase income. Your budget should work for you, not against you.",
      "Automation can be your best friend in budgeting. Set up automatic transfers from your checking account to your savings account right after you get paid. This 'pay yourself first' strategy ensures your savings goals are met before you even think about spending.",
      "Automate bill payments where possible to avoid late fees and ensure financial stability. Review your subscriptions regularly – are you still using all those streaming services or apps? Cutting unnecessary recurring expenses is a quick win for your budget."
    ],
    quiz: {
      questions: [
        {
          id: 'bs5-q1',
          type: 'mc',
          questionText: 'What is a budget described as in real life?',
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
          id: 'bs5-q2',
          type: 'tf',
          "questionText": "Automating savings transfers is an example of 'paying yourself last'.",
          options: ['True', 'False'],
          correctAnswer: 'False',
          relatedContentIndex: 3
        },
        {
          id: 'bs5-q3',
          type: 'frq',
          questionText: 'What is one type of expense you should review regularly to optimize your budget?',
          correctAnswer: ['subscriptions', 'bills', 'recurring expenses'],
          relatedContentIndex: 4
        }
      ]
    }
  },

  // --- Saving & Investing (5 Lessons) ---
  {
    id: 'saving-investing-lesson-1',
    title: 'The Magic of Saving: Why Start Now?',
    category: 'Saving & Investing',
    order: 1,
    time: '6 min read',
    content: [
      "Saving money might seem boring, but it's actually your superpower! It's the foundation for achieving all your financial goals, big or small. The earlier you start, the less you have to save overall, thanks to compound interest.",
      "An emergency fund is your financial safety net. It's money set aside for unexpected costs like a broken phone, a sudden medical bill, or losing a part-time job. Aim for 3-6 months of essential living expenses.",
      "Set clear saving goals. Do you want a new gaming console? A down payment for a car? A trip with friends? Knowing what you're saving for makes the process much more motivating.",
      "Automate your savings. Set up automatic transfers from your checking account to your savings account every time you get paid. This 'pay yourself first' strategy ensures you prioritize your future.",
      "Saving isn't about deprivation; it's about prioritization. It's about making conscious choices today that will give you more freedom and security tomorrow. Every little bit adds up!"
    ],
    quiz: {
      questions: [
        { id: 'si1-q1', type: 'mc', questionText: 'What is an emergency fund primarily for?', options: ['Buying new clothes', 'Unexpected expenses', 'Daily coffee', 'Vacations'], correctAnswer: 'Unexpected expenses', relatedContentIndex: 1 },
        { id: 'si1-q2', type: 'tf', questionText: 'Starting to save later in life is better for compound interest.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 0 },
        { id: 'si1-q3', type: 'frq', questionText: 'What strategy ensures you prioritize your savings?', correctAnswer: ['automate savings', 'pay yourself first'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'saving-investing-lesson-2',
    title: 'Compound Interest: Your Money Multiplier',
    category: 'Saving & Investing',
    order: 2,
    time: '7 min read',
    content: [
      "Compound interest is often called the 'eighth wonder of the world' because it's interest earning interest! It's the magical process where the money you earn on your savings or investments also starts earning money.",
      "Imagine you put $100 in a savings account that earns 5% interest per year. After one year, you have $105. In the second year, you earn 5% on the *new* total ($105), not just the original $100. So, you earn $5.25, making your total $110.25.",
      "The key ingredients for powerful compounding are time and interest rate. The longer your money is invested, the more time it has to grow exponentially. Even small amounts can become large fortunes over decades.",
      "Starting early is the biggest advantage. A person who starts saving $50 a month at age 15 will likely have significantly more money by retirement than someone who starts saving $100 a month at age 25, due to the extra decade of compounding.",
      "While compound interest works *for* you in savings and investments, it works *against* you with high-interest debts like credit cards. Understanding this principle is crucial for both growing your wealth and managing debt."
    ],
    quiz: {
      questions: [
        { id: 'si2-q1', type: 'mc', questionText: 'What is the main concept of compound interest?', options: ['Interest on principal only', 'Interest earning interest', 'Fees charged by banks', 'A type of loan'], correctAnswer: 'Interest earning interest', relatedContentIndex: 0 },
        { id: 'si2-q2', type: 'tf', questionText: 'Compound interest only applies to savings, not debt.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'si2-q3', type: 'frq', questionText: 'Name one of the two key ingredients for powerful compounding.', correctAnswer: ['time', 'interest rate', 'interest rates'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'saving-investing-lesson-3',
    title: 'Investing Basics: Grow Your Money',
    category: 'Saving & Investing',
    order: 3,
    time: '8 min read',
    content: [
      "Investing is putting your money to work to earn more money over time. It's different from saving, which is usually for short-term goals or emergencies. Investing is typically for long-term goals like retirement or college.",
      "Common investment options include stocks (owning a tiny piece of a company), bonds (lending money to a government or company), and mutual funds/ETFs (collections of many stocks/bonds, offering diversification).",
      "Diversification is key in investing. It means spreading your money across different types of investments to reduce risk. Don't put all your eggs in one basket!",
      "Risk and return go hand-in-hand. Generally, higher potential returns come with higher risk. Understanding your risk tolerance is important before you invest.",
      "Start small and learn as you go. You don't need a lot of money to begin investing. Many apps allow you to invest with just a few dollars. The most important thing is to start and be consistent."
    ],
    quiz: {
      questions: [
        { id: 'si3-q1', type: 'mc', questionText: 'What is diversification in investing?', options: ['Putting all money in one stock', 'Spreading money across different investments', 'Only investing in bonds', 'Avoiding all risk'], correctAnswer: 'Spreading money across different investments', relatedContentIndex: 2 },
        { id: 'si3-q2', type: 'tf', questionText: 'Investing is primarily for short-term goals.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 0 },
        { id: 'si3-q3', type: 'frq', questionText: 'Name one common investment option.', correctAnswer: ['stocks', 'bonds', 'mutual funds', 'etfs'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'saving-investing-lesson-4',
    title: 'Understanding Risk & Return',
    category: 'Saving & Investing',
    order: 4,
    time: '7 min read',
    content: [
      "Every investment carries some level of risk, and understanding this is crucial. Risk means the possibility of losing money or not achieving your expected returns. Return is the profit or loss you make on an investment.",
      "Generally, there's a trade-off: higher potential returns often come with higher risk. For example, stocks typically have higher potential returns but also higher risk than savings accounts.",
      "Your risk tolerance is how much risk you're comfortable taking with your money. Factors like your age (younger investors can often take more risk), financial goals, and personal comfort level influence this.",
      "Diversification helps manage risk. By investing in a variety of assets, you reduce the impact if one particular investment performs poorly. It's like having a balanced diet for your investments.",
      "Even 'safe' investments like savings accounts have a small risk (inflation can erode purchasing power). The key is to understand the risks involved and align them with your personal financial situation and goals."
    ],
    quiz: {
      questions: [
        { id: 'si4-q1', type: 'mc', questionText: 'What is the general relationship between risk and return?', options: ['No relationship', 'Higher risk, lower potential return', 'Higher risk, higher potential return', 'Only low risk investments have returns'], correctAnswer: 'Higher risk, higher potential return', relatedContentIndex: 1 },
        { id: 'si4-q2', type: 'tf', questionText: 'Diversification increases investment risk.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'si4-q3', type: 'frq', questionText: 'Name one factor that influences your risk tolerance.', correctAnswer: ['age', 'financial goals', 'personal comfort'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'saving-investing-lesson-5',
    title: 'Long-Term vs. Short-Term Goals',
    category: 'Saving & Investing',
    order: 5,
    time: '6 min read',
    content: [
      "Financial goals can be categorized by their timeline: short-term, mid-term, and long-term. Different timelines often require different saving and investing strategies.",
      "Short-term goals (0-1 year) might include an emergency fund, a new phone, or concert tickets. For these, prioritize safety and easy access, like a high-yield savings account.",
      "Mid-term goals (1-5 years) could be a down payment for a car or a large vacation. You might consider slightly riskier options like CDs or short-term bond funds, but still prioritize stability.",
      "Long-term goals (5+ years) are things like retirement, college tuition, or buying a house. This is where investing in growth-oriented assets like stocks or diversified mutual funds makes sense, as you have time to ride out market ups and downs.",
      "Matching your investment strategy to your goal's timeline is crucial. Don't put money you need next year into a volatile stock, and don't keep money you won't need for decades in a low-interest savings account."
    ],
    quiz: {
      questions: [
        { id: 'si5-q1', type: 'mc', questionText: 'Which type of goal is typically 5+ years away?', options: ['Short-term', 'Mid-term', 'Long-term', 'Immediate'], correctAnswer: 'Long-term', relatedContentIndex: 3 },
        { id: 'si5-q2', type: 'tf', questionText: 'A high-yield savings account is best for long-term retirement goals.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'si5-q3', type: 'frq', questionText: 'Name one example of a short-term financial goal.', correctAnswer: ['emergency fund', 'new phone', 'concert tickets'], relatedContentIndex: 1 }
      ]
    }
  },

  // --- Credit & Debt Management (5 Lessons) ---
  {
    id: 'credit-debt-lesson-1',
    title: 'Credit Scores: Your Financial Report Card',
    category: 'Credit & Debt Management',
    order: 1,
    time: '6 min read',
    content: [
      "Your credit score is a three-digit number that tells lenders how likely you are to repay borrowed money. It's like a financial report card, and it impacts many areas of your life beyond just loans.",
      "A good credit score (typically 670 and above) can help you get approved for loans, credit cards, and even apartments at better interest rates. A low score can make these things difficult or more expensive.",
      "Key factors influencing your credit score include payment history (paying bills on time is crucial), amounts owed (how much debt you have), length of credit history, new credit, and credit mix.",
      "You start building credit by using credit responsibly. This could be a secured credit card, a small loan, or being an authorized user on a parent's credit card (with their permission and responsible use).",
      "Regularly check your credit report for errors. You can get a free report annually from each of the three major credit bureaus (Equifax, Experian, TransUnion). Correcting errors can boost your score."
    ],
    quiz: {
      questions: [
        { id: 'cd1-q1', type: 'mc', questionText: 'What does a credit score tell lenders?', options: ['Your income', 'Your spending habits', 'Your likelihood to repay borrowed money', 'Your favorite color'], correctAnswer: 'Your likelihood to repay borrowed money', relatedContentIndex: 0 },
        { id: 'cd1-q2', type: 'tf', questionText: 'Paying bills on time negatively impacts your credit score.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'cd1-q3', type: 'frq', questionText: 'Name one way to start building credit responsibly.', correctAnswer: ['secured credit card', 'small loan', 'authorized user'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'credit-debt-lesson-2',
    title: 'Understanding Different Types of Debt',
    category: 'Credit & Debt Management',
    order: 2,
    time: '7 min read',
    content: [
      "Not all debt is created equal. Understanding the difference between 'good' debt and 'bad' debt is crucial for smart financial decisions.",
      "**Good Debt** is typically an investment that can increase your net worth or future income. Examples include student loans (for education that boosts earning potential) or a mortgage (for a home that can appreciate in value).",
      "**Bad Debt** is usually for depreciating assets or consumption, often with high interest rates. Credit card debt (especially if carried month-to-month), payday loans, and personal loans for non-essential items are common examples.",
      "Interest rates are key. High-interest debt grows quickly due to compounding, making it very expensive. Prioritize paying off high-interest debt first to save money.",
      "Debt management strategies include the 'debt snowball' (pay off smallest debt first for motivation) and 'debt avalanche' (pay off highest interest debt first to save money). Choose the method that works best for your personality."
    ],
    quiz: {
      questions: [
        { id: 'cd2-q1', type: 'mc', questionText: 'Which of these is generally considered "bad debt"?', options: ['Student loan', 'Mortgage', 'Credit card debt carried month-to-month', 'Business loan'], correctAnswer: 'Credit card debt carried month-to-month', relatedContentIndex: 2 },
        { id: 'cd2-q2', type: 'tf', questionText: 'All debt is inherently bad.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 0 },
        { id: 'cd2-q3', type: 'frq', questionText: 'Name one strategy for paying off debt.', correctAnswer: ['debt snowball', 'debt avalanche'], relatedContentIndex: 4 }
      ]
    }
  },
  {
    id: 'credit-debt-lesson-3',
    title: 'Credit Cards: Friend or Foe?',
    category: 'Credit & Debt Management',
    order: 3,
    time: '8 min read',
    content: [
      "Credit cards can be powerful financial tools, but they require responsible use. They offer convenience, build credit history, and often come with rewards. However, they can also lead to significant debt if misused.",
      "How they work: When you use a credit card, you're borrowing money from the bank. You get a monthly statement, and if you pay your *full* balance by the due date, you won't pay any interest.",
      "The danger lies in carrying a balance. If you don't pay in full, you'll be charged high interest on the remaining amount. This is how credit card debt can quickly spiral out of control.",
      "To use credit cards responsibly: always pay your full statement balance on time, keep your credit utilization low (use less than 30% of your available credit), and avoid getting too many cards at once.",
      "Credit cards are not free money. Treat them like a debit card – only spend what you already have in your bank account – and you can harness their benefits without falling into debt traps."
    ],
    quiz: {
      questions: [
        { id: 'cd3-q1', type: 'mc', questionText: 'How can you avoid paying interest on a credit card?', options: ['Pay only the minimum due', 'Pay the full statement balance on time', 'Use it for small purchases only', 'Never use it'], correctAnswer: 'Pay the full statement balance on time', relatedContentIndex: 1 },
        { id: 'cd3-q2', type: 'tf', questionText: 'Credit cards are free money.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'cd3-q3', type: 'frq', questionText: 'What is a good credit utilization percentage to aim for?', correctAnswer: ['30%', 'under 30%'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'credit-debt-lesson-4',
    title: 'Student Loans: Investing in Your Future',
    category: 'Credit & Debt Management',
    order: 4,
    time: '7 min read',
    content: [
      "Student loans are a common way to pay for higher education. They are considered an investment in your future earning potential, but it's crucial to understand how they work and how to manage them.",
      "There are two main types: federal student loans (from the government) and private student loans (from banks or private lenders). Federal loans often have more flexible repayment options and lower interest rates.",
      "Interest starts accumulating on most student loans immediately or after you graduate. Understanding your interest rate and how it compounds is vital for calculating your total repayment amount.",
      "Explore repayment options. Federal loans offer various plans, including income-driven repayment, which adjusts your monthly payment based on your income. Private loans typically have fewer flexible options.",
      "Only borrow what you need. While it might be tempting to borrow extra for living expenses, every dollar borrowed must be repaid with interest. Minimize your debt to reduce future financial burden."
    ],
    quiz: {
      questions: [
        { id: 'cd4-q1', type: 'mc', questionText: 'Which type of student loan generally offers more flexible repayment options?', options: ['Private student loans', 'Federal student loans', 'Personal loans', 'Credit card loans'], correctAnswer: 'Federal student loans', relatedContentIndex: 1 },
        { id: 'cd4-q2', type: 'tf', questionText: 'It\'s always a good idea to borrow the maximum amount offered for student loans.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'cd4-q3', type: 'frq', questionText: 'What is one key difference between federal and private student loans?', correctAnswer: ['interest rates', 'repayment options', 'lender'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'credit-debt-lesson-5',
    title: 'Dealing with Debt: Strategies to Pay It Off',
    category: 'Credit & Debt Management',
    order: 5,
    time: '6 min read',
    content: [
      "Having debt can feel overwhelming, but there are proven strategies to help you pay it off and regain financial freedom. The most important thing is to have a plan and stick to it.",
      "The **Debt Snowball Method** involves paying off your smallest debt first while making minimum payments on others. Once the smallest is paid, you take the money you were paying on it and add it to the next smallest debt. This builds momentum and motivation.",
      "The **Debt Avalanche Method** involves paying off the debt with the highest interest rate first, while making minimum payments on others. This method saves you the most money on interest over time, though it might take longer to see a debt completely disappear.",
      "Consider debt consolidation. This is where you take out a new loan to pay off multiple existing debts, ideally at a lower interest rate. This simplifies payments and can reduce overall interest paid.",
      "Avoid taking on new debt while you're paying off old debt. Focus your energy and extra money on eliminating what you already owe. Every step, no matter how small, moves you closer to being debt-free."
    ],
    quiz: {
      questions: [
        { id: 'cd5-q1', type: 'mc', questionText: 'Which debt repayment method focuses on paying off the smallest debt first?', options: ['Debt Avalanche', 'Debt Snowball', 'Debt Consolidation', 'Minimum Payment'], correctAnswer: 'Debt Snowball', relatedContentIndex: 1 },
        { id: 'cd5-q2', type: 'tf', questionText: 'The Debt Avalanche method saves you the most money on interest.', options: ['True', 'False'], correctAnswer: 'True', relatedContentIndex: 2 },
        { id: 'cd5-q3', type: 'frq', questionText: 'What is a common strategy to simplify multiple debt payments?', correctAnswer: ['debt consolidation', 'consolidation'], relatedContentIndex: 3 }
      ]
    }
  },

  // --- Income & Taxes (5 Lessons) ---
  {
    id: 'income-taxes-lesson-1',
    title: 'Understanding Your Paycheck',
    category: 'Income & Taxes',
    order: 1,
    time: '5 min read',
    content: [
      "Your paycheck isn't just one number; it's a breakdown of your gross pay (total earned) and various deductions. Understanding these deductions helps you know where your money is really going.",
      "**Gross Pay** is the total amount of money you earned before any deductions are taken out.",
      "**Net Pay** (or 'take-home pay') is the amount you actually receive after all deductions. This is the money you'll use for budgeting.",
      "Common deductions include federal income tax, state income tax (if applicable), Social Security (FICA), Medicare (FICA), and sometimes deductions for health insurance or retirement plans.",
      "Knowing the difference between gross and net pay is crucial for budgeting. Always budget based on your net pay, as that's the actual money available to you."
    ],
    quiz: {
      questions: [
        { id: 'it1-q1', type: 'mc', questionText: 'What is "Net Pay"?', options: ['Total earned before deductions', 'Money received after all deductions', 'Only money for taxes', 'Money spent on wants'], correctAnswer: 'Money received after all deductions', relatedContentIndex: 2 },
        { id: 'it1-q2', type: 'tf', questionText: 'You should budget based on your Gross Pay.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'it1-q3', type: 'frq', questionText: 'Name one common deduction from a paycheck.', correctAnswer: ['federal income tax', 'state income tax', 'social security', 'medicare', 'health insurance', 'retirement plan'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'income-taxes-lesson-2',
    title: 'The Basics of Income Tax',
    category: 'Income & Taxes',
    order: 2,
    time: '7 min read',
    content: [
      "Income tax is a portion of your earnings that you pay to the government. These taxes fund public services like roads, schools, and healthcare. Understanding them is part of being a responsible citizen.",
      "In the U.S., we have a progressive tax system. This means that as your income increases, the percentage of tax you pay on additional income (your marginal tax rate) also increases.",
      "Tax brackets are ranges of income that are taxed at specific rates. Not all of your income is taxed at your highest bracket; only the portion that falls into that bracket is.",
      "A W-4 form, which you fill out when you start a job, tells your employer how much tax to withhold from each paycheck. Filling it out correctly helps you avoid owing a lot of tax or getting a huge refund (which means you overpaid).",
      "Filing taxes annually is a requirement for most working individuals. You report your income and deductions to the government, and calculate if you owe more tax or are due a refund."
    ],
    quiz: {
      questions: [
        { id: 'it2-q1', type: 'mc', questionText: 'What does a progressive tax system mean?', options: ['Everyone pays the same tax rate', 'Higher income means lower tax rate', 'Higher income means higher percentage tax on additional income', 'Only rich people pay taxes'], correctAnswer: 'Higher income means higher percentage tax on additional income', relatedContentIndex: 1 },
        { id: 'it2-q2', type: 'tf', questionText: 'All of your income is taxed at your highest tax bracket.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'it2-q3', type: 'frq', questionText: 'What form tells your employer how much tax to withhold from your paycheck?', correctAnswer: ['w-4', 'w4'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'income-taxes-lesson-3',
    title: 'Saving & Investing for Tax Advantages',
    category: 'Income & Taxes',
    order: 3,
    time: '8 min read',
    content: [
      "Beyond just paying taxes, you can use certain accounts to save and invest in a way that reduces your tax burden, helping your money grow faster.",
      "A **401(k)** (employer-sponsored) and an **IRA** (individual retirement account) are common retirement accounts. Contributions to a traditional 401(k) or IRA are often tax-deductible, meaning they reduce your taxable income now.",
      "A **Roth IRA** or **Roth 401(k)** works differently: contributions are made with after-tax money, but qualified withdrawals in retirement are completely tax-free. This is great if you expect to be in a higher tax bracket later.",
      "These accounts offer **tax-deferred growth** (for traditional) or **tax-free growth** (for Roth). This means your investments grow without being taxed year-to-year, allowing compounding to work its magic more effectively.",
      "Understanding these options can save you a lot of money in taxes over your lifetime. It's wise to start contributing early, even small amounts, to take advantage of these benefits."
    ],
    quiz: {
      questions: [
        { id: 'it3-q1', type: 'mc', questionText: 'Which retirement account allows for tax-free withdrawals in retirement?', options: ['Traditional 401(k)', 'Traditional IRA', 'Roth IRA', 'Standard Savings Account'], correctAnswer: 'Roth IRA', relatedContentIndex: 2 },
        { id: 'it3-q2', type: 'tf', questionText: 'Contributions to a traditional 401(k) are typically taxed now.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 1 },
        { id: 'it3-q3', type: 'frq', questionText: 'What type of growth do these special accounts offer?', correctAnswer: ['tax-deferred', 'tax-free'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'income-taxes-lesson-4',
    title: 'Side Hustles & Extra Income',
    category: 'Income & Taxes',
    order: 4,
    time: '6 min read',
    content: [
      "A side hustle is any activity you do outside of your main job or studies to earn extra money. It's a great way to boost your income, pay down debt faster, or save for specific goals.",
      "Common side hustles include freelancing (writing, design, coding), delivery services (food, groceries), tutoring, pet sitting, or selling handmade goods online.",
      "The benefits are many: increased income, developing new skills, exploring passions, and gaining financial flexibility. It can also be a stepping stone to starting your own business.",
      "Remember that income from side hustles is usually taxable. You'll need to keep good records of your earnings and expenses, as you'll likely be responsible for paying self-employment taxes.",
      "Start small and choose something you enjoy or are good at. Don't overcommit yourself and burn out. Even a few extra dollars a week can make a big difference over time."
    ],
    quiz: {
      questions: [
        { id: 'it4-q1', type: 'mc', questionText: 'What is a side hustle?', options: ['A main full-time job', 'An activity to earn extra money outside primary work/study', 'A type of investment', 'A new hobby that costs money'], correctAnswer: 'An activity to earn extra money outside primary work/study', relatedContentIndex: 0 },
        { id: 'it4-q2', type: 'tf', questionText: 'Income from side hustles is generally not taxable.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'it4-q3', type: 'frq', questionText: 'Name one benefit of having a side hustle.', correctAnswer: ['increased income', 'new skills', 'financial flexibility', 'explore passions'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'income-taxes-lesson-5',
    title: 'Financial Protection: Insurance Basics',
    category: 'Income & Taxes',
    order: 5,
    time: '7 min read',
    content: [
      "Insurance is a way to protect yourself financially from unexpected losses. You pay a regular fee (premium) to an insurance company, and in return, they agree to pay for certain damages or losses if they occur.",
      "Common types of insurance include health insurance (covers medical costs), auto insurance (covers car accidents), renters/homeowners insurance (covers property damage/theft), and life insurance (provides money to loved ones if you pass away).",
      "The purpose of insurance is to transfer risk. Instead of bearing the full financial burden of a large unexpected event yourself, you share the risk with many other policyholders.",
      "A **deductible** is the amount of money you have to pay out-of-pocket before your insurance coverage kicks in. A higher deductible usually means a lower premium, and vice-versa.",
      "Understanding your insurance needs is crucial. Don't over-insure for things you don't need, but make sure you're adequately covered for major risks that could financially devastate you."
    ],
    quiz: {
      questions: [
        { id: 'it5-q1', type: 'mc', questionText: 'What is the purpose of insurance?', options: ['To make you rich', 'To protect yourself financially from unexpected losses', 'To avoid paying taxes', 'To guarantee profits'], correctAnswer: 'To protect yourself financially from unexpected losses', relatedContentIndex: 2 },
        { id: 'it5-q2', type: 'tf', questionText: 'A higher insurance deductible means a higher premium.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'it5-q3', type: 'frq', questionText: 'Name one common type of insurance.', correctAnswer: ['health insurance', 'auto insurance', 'renters insurance', 'homeowners insurance', 'life insurance'], relatedContentIndex: 1 }
      ]
    }
  },

  // --- Financial Planning & Milestones (5 Lessons) ---
  {
    id: 'financial-planning-lesson-1',
    title: 'Setting SMART Financial Goals',
    category: 'Financial Planning & Milestones',
    order: 1,
    time: '6 min read',
    content: [
      "Financial goals give your money a direction and purpose. Without clear goals, it's easy to let your money slip away on impulse purchases. Goals can range from short-term (e.g., saving for a new phone) to long-term (e.g., retirement).",
      "A popular framework for setting effective goals is **SMART**: Specific, Measurable, Achievable, Relevant, and Time-bound. For example, instead of 'save money', a SMART goal is 'save $500 for a new laptop by December 31st'.",
      "Categorize your goals into short-term (0-1 year), mid-term (1-5 years), and long-term (5+ years). This helps you prioritize and allocate funds appropriately. Emergency funds are a common short-term goal, while a down payment on a house might be mid-term.",
      "Break down large goals into smaller, manageable steps. Saving $10,000 might seem daunting, but saving $200 a week is more actionable. Celebrate these small wins to stay motivated.",
      "Regularly review and adjust your financial goals. Life changes, and so should your plans. What was important last year might not be as critical today. Flexibility is key to long-term financial success."
    ],
    quiz: {
      questions: [
        { id: 'fp1-q1', type: 'mc', questionText: 'What is the purpose of setting financial goals?', options: ['To restrict all spending', 'To give your money a direction and purpose', 'To avoid thinking about money', 'To impress financial advisors'], correctAnswer: 'To give your money a direction and purpose', relatedContentIndex: 0 },
        { id: 'fp1-q2', type: 'frq', questionText: 'What does the \'S\' in SMART goals stand for?', correctAnswer: ['specific'], relatedContentIndex: 1 },
        { id: 'fp1-q3', type: 'tf', questionText: 'It\'s best to set financial goals once and never change them.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 }
      ]
    }
  },
  {
    id: 'financial-planning-lesson-2',
    title: 'The Power of a Financial Plan',
    category: 'Financial Planning & Milestones',
    order: 2,
    time: '7 min read',
    content: [
      "A financial plan is a comprehensive roadmap that outlines your current financial situation, your goals, and the strategies to achieve them. It's more than just a budget; it's a holistic view of your financial life.",
      "Key components of a financial plan often include budgeting, saving strategies, debt management, investment planning, insurance needs, and retirement planning.",
      "Creating a plan helps you make intentional decisions, prioritize spending, and stay on track towards your long-term aspirations. It reduces financial stress and provides clarity.",
      "You can create a basic financial plan yourself using online resources and tools. For more complex situations, a certified financial planner (CFP) can provide personalized advice.",
      "Just like a budget, a financial plan isn't static. Review it annually or whenever major life events occur (e.g., new job, marriage, having kids) to ensure it still aligns with your goals."
    ],
    quiz: {
      questions: [
        { id: 'fp2-q1', type: 'mc', questionText: 'What is a financial plan?', options: ['Only a budget', 'A way to avoid taxes', 'A comprehensive roadmap for your financial life and goals', 'A legal document for borrowing money'], correctAnswer: 'A comprehensive roadmap for your financial life and goals', relatedContentIndex: 0 },
        { id: 'fp2-q2', type: 'tf', questionText: 'A financial plan should never be reviewed or adjusted once created.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'fp2-q3', type: 'frq', questionText: 'Name one key component of a financial plan.', correctAnswer: ['budgeting', 'saving strategies', 'debt management', 'investment planning', 'insurance needs', 'retirement planning'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'financial-planning-lesson-3',
    title: 'Major Milestones: College & Career',
    category: 'Financial Planning & Milestones',
    order: 3,
    time: '8 min read',
    content: [
      "Planning for major life milestones like college and starting a career involves significant financial considerations. Early planning can make these transitions smoother.",
      "For college, explore various funding options: scholarships (free money!), grants, federal student loans, and private student loans. Understand the cost of attendance beyond just tuition.",
      "Choosing a career path involves researching potential income, required education/training, and job market outlook. Tools like 'Path Peek' can help you explore these financial realities.",
      "When starting your career, focus on building an emergency fund, understanding your first paycheck (net vs. gross), and potentially contributing to a retirement account if offered by your employer.",
      "These milestones are interconnected. Your college choices can impact your student loan debt, which affects your financial flexibility when starting your career. Plan holistically."
    ],
    quiz: {
      questions: [
        { id: 'fp3-q1', type: 'mc', questionText: 'Which of these is considered "free money" for college?', options: ['Federal student loans', 'Private student loans', 'Scholarships', 'Credit cards'], correctAnswer: 'Scholarships', relatedContentIndex: 1 },
        { id: 'fp3-q2', type: 'tf', questionText: 'Your college choices have no impact on your future financial flexibility.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'fp3-q3', type: 'frq', questionText: 'Name one financial consideration when starting your career.', correctAnswer: ['emergency fund', 'understanding paycheck', 'retirement contributions'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'financial-planning-lesson-4',
    title: 'Major Milestones: Buying a Car & Home',
    category: 'Financial Planning & Milestones',
    order: 4,
    time: '7 min read',
    content: [
      "Buying a car or a home are significant financial milestones that require careful planning and understanding of loans and ongoing costs.",
      "For a car, consider the total cost of ownership: purchase price, insurance, gas, maintenance, and potential loan interest. New cars depreciate quickly, so buying used can be a smart move.",
      "A car loan involves borrowing money to buy the car, which you repay with interest over time. Understand the interest rate, loan term, and monthly payments before committing.",
      "Buying a home is often the largest financial decision. It typically involves a down payment (a percentage of the home's price paid upfront) and a mortgage (a long-term loan to pay for the rest).",
      "Beyond the mortgage, homeownership includes property taxes, homeowners insurance, maintenance, and utilities. It's crucial to budget for these ongoing costs."
    ],
    quiz: {
      questions: [
        { id: 'fp4-q1', type: 'mc', questionText: 'What is a mortgage?', options: ['A type of car loan', 'A loan to pay for a home', 'A monthly utility bill', 'A down payment for a house'], correctAnswer: 'A loan to pay for a home', relatedContentIndex: 3 },
        { id: 'fp4-q2', type: 'tf', questionText: 'The only cost of owning a car is the purchase price.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 1 },
        { id: 'fp4-q3', type: 'frq', questionText: 'Name one ongoing cost of homeownership besides the mortgage.', correctAnswer: ['property taxes', 'homeowners insurance', 'maintenance', 'utilities'], relatedContentIndex: 4 }
      ]
    }
  },
  {
    id: 'financial-planning-lesson-5',
    title: 'Retirement Planning: Start Early, Live Well',
    category: 'Financial Planning & Milestones',
    order: 5,
    time: '8 min read',
    content: [
      "Retirement might seem far away, but starting to plan and save early is one of the most impactful financial decisions you can make. Time is your biggest asset for compounding interest.",
      "Think about what you want your retirement to look like. Will you travel? Pursue hobbies? Live simply? Your vision helps determine how much you need to save.",
      "Utilize retirement accounts like 401(k)s (employer-sponsored) and IRAs (individual retirement accounts). These offer significant tax advantages and are designed for long-term growth.",
      "If your employer offers a 401(k) match, contribute at least enough to get the full match. It's essentially free money for your retirement!",
      "Even small, consistent contributions add up dramatically over decades due to the power of compound interest. Don't underestimate the impact of starting early, even with just a few dollars a week."
    ],
    quiz: {
      questions: [
        { id: 'fp5-q1', type: 'mc', questionText: 'What is your biggest asset when planning for retirement?', options: ['Your car', 'Your current income', 'Time', 'Your phone'], correctAnswer: 'Time', relatedContentIndex: 0 },
        { id: 'fp5-q2', type: 'tf', questionText: 'Employer 401(k) matches are not worth contributing for.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'fp5-q3', type: 'frq', questionText: 'Name one type of retirement account.', correctAnswer: ['401(k)', 'ira', 'roth ira', 'roth 401(k)'], relatedContentIndex: 2 }
      ]
    }
  },

  // --- Financial Literacy (5 Lessons) ---
  {
    id: 'financial-literacy-lesson-1',
    title: 'What is Financial Literacy?',
    category: 'Financial Literacy',
    order: 1,
    time: '5 min read',
    content: [
      "Financial literacy is the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing. It's about having the knowledge to make smart money decisions.",
      "It's crucial because it empowers you to manage your money wisely, avoid debt, save for the future, and achieve your financial goals. Without it, you're more susceptible to financial struggles.",
      "Key areas of financial literacy include understanding income and expenses, saving, debt, credit, investing, and financial planning.",
      "You don't need to be a financial expert to be financially literate. It's about learning the basics and applying them to your everyday life.",
      "This app is designed to help you build your financial literacy step-by-step, making complex topics easy to understand and apply."
    ],
    quiz: {
      questions: [
        { id: 'fl1-q1', type: 'mc', questionText: 'What is financial literacy?', options: ['Knowing how to spend money quickly', 'Understanding and effectively using financial skills', 'Only for adults', 'Avoiding all money topics'], correctAnswer: 'Understanding and effectively using financial skills', relatedContentIndex: 0 },
        { id: 'fl1-q2', type: 'tf', questionText: 'Financial literacy is only about investing.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'fl1-q3', type: 'frq', questionText: 'Why is financial literacy important?', correctAnswer: ['manage money wisely', 'avoid debt', 'save for future', 'achieve goals'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'financial-literacy-lesson-2',
    title: 'The Value of Money',
    category: 'Financial Literacy',
    order: 2,
    time: '6 min read',
    content: [
      "Money isn't just paper or numbers in a bank account; it's a tool that represents value and allows you to exchange your time and effort for goods and services.",
      "Understanding the 'value' of money means recognizing its purchasing power. What can you buy with $10? How much time did you have to work to earn that $10?",
      "Inflation is a key concept: it's the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling. Your $10 today might buy less next year.",
      "Opportunity cost is another important idea. When you spend money on one thing, you're giving up the opportunity to spend it on something else. Every financial decision has an opportunity cost.",
      "By understanding the true value of money, you can make more intentional spending decisions and appreciate the effort it takes to earn it."
    ],
    quiz: {
      questions: [
        { id: 'fl2-q1', type: 'mc', questionText: 'What does inflation describe?', options: ['Money growing in a bank', 'The purchasing power of currency falling over time', 'A type of investment', 'A new currency'], correctAnswer: 'The purchasing power of currency falling over time', relatedContentIndex: 2 },
        { id: 'fl2-q2', type: 'tf', questionText: 'Opportunity cost means you can buy everything you want.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'fl2-q3', type: 'frq', questionText: 'What is money primarily described as in this lesson?', correctAnswer: ['a tool', 'tool'], relatedContentIndex: 0 }
      ]
    }
  },
  {
    id: 'financial-literacy-lesson-3',
    title: 'Needs vs. Wants (Revisited)',
    category: 'Financial Literacy',
    order: 3,
    time: '5 min read',
    content: [
      "A core concept in financial literacy is the ability to differentiate between needs and wants. This distinction guides smart spending and budgeting decisions.",
      "**Needs** are essential for survival and basic well-being. Examples include safe housing, nutritious food, basic clothing, and transportation for work/school.",
      "**Wants** are things that enhance your life but are not strictly necessary. Examples include entertainment subscriptions, dining out, the latest gadgets, or designer clothes.",
      "It's not about eliminating all wants, but understanding them. Prioritizing needs ensures your basic security, while mindful spending on wants allows for enjoyment without derailing your financial goals.",
      "Regularly evaluating your spending against needs and wants helps you identify areas where you can save or reallocate funds to align with your financial priorities."
    ],
    quiz: {
      questions: [
        { id: 'fl3-q1', type: 'mc', questionText: 'Which of these is a "need"?', options: ['A new video game', 'Rent for your apartment', 'Concert tickets', 'A fancy meal'], correctAnswer: 'Rent for your apartment', relatedContentIndex: 1 },
        { id: 'fl3-q2', type: 'tf', questionText: 'You should always eliminate all your wants.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'fl3-q3', type: 'frq', questionText: 'What is one example of a "want"?', correctAnswer: ['entertainment subscriptions', 'dining out', 'latest gadgets', 'designer clothes'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'financial-literacy-lesson-4',
    title: 'The Importance of Saving',
    category: 'Financial Literacy',
    order: 4,
    time: '6 min read',
    content: [
      "Saving money is a cornerstone of financial literacy and security. It's setting aside funds for future goals, emergencies, or investments.",
      "An **emergency fund** is critical. It's typically 3-6 months of essential living expenses saved in an easily accessible account (like a savings account). This protects you from unexpected job loss, medical bills, or major repairs.",
      "Saving allows you to achieve your short-term goals (e.g., new tech, vacation) without going into debt. It also provides the capital for long-term investments.",
      "The earlier you start saving, the more time your money has to grow through compound interest. Even small, consistent contributions can become substantial over decades.",
      "Make saving a habit. Treat it like a bill you have to pay yourself first. Automate transfers from your checking to your savings account immediately after you get paid."
    ],
    quiz: {
      questions: [
        { id: 'fl4-q1', type: 'mc', questionText: 'What is the primary purpose of an emergency fund?', options: ['To buy luxury items', 'To cover unexpected expenses', 'To invest in stocks', 'To pay off credit card debt'], correctAnswer: 'To cover unexpected expenses', relatedContentIndex: 1 },
        { id: 'fl4-q2', type: 'tf', questionText: 'Starting to save late in life is ideal for maximizing compound interest.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'fl4-q3', type: 'frq', questionText: 'What is one benefit of saving for short-term goals?', correctAnswer: ['avoiding debt', 'achieving goals'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'financial-literacy-lesson-5',
    title: 'Understanding Debt & Credit',
    category: 'Financial Literacy',
    order: 5,
    time: '7 min read',
    content: [
      "Debt is money owed to another party. It can be a powerful tool or a heavy burden, depending on how it's used and managed.",
      "**Credit** is your ability to borrow money based on your trustworthiness and history of repayment. Your credit score is a numerical representation of this trustworthiness.",
      "Good debt (e.g., student loans for education, mortgages for a home) can be an investment in your future. Bad debt (e.g., high-interest credit card debt for depreciating assets) can be financially damaging.",
      "Building good credit is important for future financial opportunities like renting an apartment, getting a car loan, or even some jobs. You build it by using credit responsibly and paying bills on time.",
      "Managing debt effectively involves understanding interest rates, making timely payments, and having a plan to pay off high-interest debt first. Avoid accumulating more debt than you can comfortably repay."
    ],
    quiz: {
      questions: [
        { id: 'fl5-q1', type: 'mc', questionText: 'What does your credit score represent?', options: ['Your income level', 'Your trustworthiness to repay borrowed money', 'Your spending habits', 'Your favorite bank'], correctAnswer: 'Your trustworthiness to repay borrowed money', relatedContentIndex: 1 },
        { id: 'fl5-q2', type: 'tf', questionText: 'All debt is considered "bad debt".', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'fl5-q3', type: 'frq', questionText: 'Name one way to build good credit.', correctAnswer: ['using credit responsibly', 'paying bills on time'], relatedContentIndex: 3 }
      ]
    }
  },

  // --- Consumer Awareness (5 Lessons) ---
  {
    id: 'consumer-awareness-lesson-1',
    title: 'Smart Shopping Strategies',
    category: 'Consumer Awareness',
    order: 1,
    time: '5 min read',
    content: [
      "Being a smart shopper means getting the most value for your money. It's about making intentional choices, not just buying on impulse.",
      "Always compare prices. Before buying, check different stores or online retailers. Price comparison apps can be very helpful.",
      "Look for sales and discounts, but be wary of 'fake' sales. Is it truly a good deal, or just marketing? Check the original price.",
      "Read reviews! Other consumers' experiences can provide valuable insights into a product's quality and value.",
      "Consider the 'cost per use' or 'cost per serving'. Sometimes a slightly more expensive item is better value if it lasts longer or serves more purposes."
    ],
    quiz: {
      questions: [
        { id: 'ca1-q1', type: 'mc', questionText: 'What is a key strategy for smart shopping?', options: ['Buying everything on impulse', 'Never comparing prices', 'Always comparing prices and looking for sales', 'Only buying expensive brands'], correctAnswer: 'Always comparing prices and looking for sales', relatedContentIndex: 1 },
        { id: 'ca1-q2', type: 'tf', questionText: 'All sales are genuinely good deals.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'ca1-q3', type: 'frq', questionText: 'What should you check before buying a product, according to the lesson?', correctAnswer: ['reviews', 'price comparisons', 'sales'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'consumer-awareness-lesson-2',
    title: 'Understanding Warranties & Returns',
    category: 'Consumer Awareness',
    order: 2,
    time: '6 min read',
    content: [
      "When you buy products, especially electronics or appliances, understanding warranties and return policies is crucial for protecting your purchase.",
      "A **warranty** is a guarantee from the manufacturer or seller that they will repair or replace a product if it has defects within a certain period. Always know what your warranty covers and for how long.",
      "A **return policy** outlines the conditions under which you can return a product for a refund or exchange. This includes the timeframe (e.g., 30 days), whether you need a receipt, and if there are restocking fees.",
      "Always keep your receipts! They are essential for warranty claims and returns. Many stores also offer digital receipts.",
      "Don't assume all sales are final or that all products come with a warranty. Read the fine print before you buy, especially for big purchases."
    ],
    quiz: {
      questions: [
        { id: 'ca2-q1', type: 'mc', questionText: 'What is a warranty?', options: ['A type of discount', 'A guarantee to repair/replace defects', 'A return policy', 'A sales agreement'], correctAnswer: 'A guarantee to repair/replace defects', relatedContentIndex: 1 },
        { id: 'ca2-q2', type: 'tf', questionText: 'You don\'t need to keep receipts for returns or warranty claims.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'ca2-q3', type: 'frq', questionText: 'What does a return policy outline?', correctAnswer: ['conditions for returning a product', 'timeframe for returns', 'refund/exchange conditions'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'consumer-awareness-lesson-3',
    title: 'Avoiding Scams & Fraud',
    category: 'Consumer Awareness',
    order: 3,
    time: '7 min read',
    content: [
      "Scams and fraud are unfortunately common, especially online. Being aware of common tactics can protect your money and personal information.",
      "**Phishing** is a common scam where fraudsters try to trick you into giving them personal information (passwords, bank details) by pretending to be a trustworthy entity (bank, government). Look for suspicious emails or texts.",
      "Be wary of offers that seem too good to be true, like winning a lottery you didn't enter or getting a huge discount on something expensive. If it sounds suspicious, it probably is.",
      "Never share personal information (Social Security number, bank PINs, full credit card numbers) with unsolicited callers, emails, or texts. Legitimate organizations won't ask for this sensitive info this way.",
      "If you suspect a scam, do not click links, reply, or call numbers provided by the suspicious message. Instead, contact the organization directly using a verified phone number or website."
    ],
    quiz: {
      questions: [
        { id: 'ca3-q1', type: 'mc', questionText: 'What is "phishing"?', options: ['A type of fishing', 'Scam to trick you into giving personal info', 'A new online game', 'A type of investment'], correctAnswer: 'Scam to trick you into giving personal info', relatedContentIndex: 1 },
        { id: 'ca3-q2', type: 'tf', questionText: 'It\'s safe to share your bank PIN with someone who calls claiming to be from your bank.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'ca3-q3', type: 'frq', questionText: 'What should you do if an offer seems too good to be true?', correctAnswer: ['be wary', 'be suspicious', 'research it', 'don\'t click links'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'consumer-awareness-lesson-4',
    title: 'Online Safety & Privacy',
    category: 'Consumer Awareness',
    order: 4,
    time: '6 min read',
    content: [
      "Protecting your personal and financial information online is essential. Cybercrime is a real threat, but simple practices can significantly reduce your risk.",
      "Use strong, unique passwords for all your accounts. Consider using a password manager to keep track of them. Avoid using easily guessable information like birthdays.",
      "Be cautious about what you share online, especially on social media. Information like your full birthdate, address, or travel plans can be used by criminals.",
      "Be careful with public Wi-Fi. Avoid doing sensitive transactions (banking, shopping) on unsecured public networks, as your data can be intercepted.",
      "Keep your software updated. Operating systems, web browsers, and apps often release updates that include security patches to protect against new threats."
    ],
    quiz: {
      questions: [
        { id: 'ca4-q1', type: 'mc', questionText: 'What is a key practice for online safety?', options: ['Using the same password for all accounts', 'Sharing all personal info online', 'Using strong, unique passwords', 'Doing banking on public Wi-Fi'], correctAnswer: 'Using strong, unique passwords', relatedContentIndex: 1 },
        { id: 'ca4-q2', type: 'tf', questionText: 'It\'s always safe to do online banking on public Wi-Fi.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'ca4-q3', type: 'frq', questionText: 'What kind of information should you be cautious about sharing online?', correctAnswer: ['full birthdate', 'address', 'travel plans'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'consumer-awareness-lesson-5',
    title: 'Understanding Contracts & Agreements',
    category: 'Consumer Awareness',
    order: 5,
    time: '7 min read',
    content: [
      "Before you sign anything, whether it's for a phone plan, a job, or a loan, it's crucial to understand contracts and agreements. They are legally binding documents.",
      "A contract is an agreement between two or more parties that is enforceable by law. It outlines the terms and conditions of a transaction or relationship.",
      "Always read the entire contract before signing. Don't skim! Pay attention to key terms like pricing, duration, cancellation policies, and any penalties.",
      "If you don't understand something, ask questions! Don't be afraid to ask for clarification from the other party or even seek advice from a trusted adult or legal professional.",
      "Be aware of hidden fees or clauses. Some contracts might have small print that includes charges or conditions you weren't expecting. Knowledge is power!"
    ],
    quiz: {
      questions: [
        { id: 'ca5-q1', type: 'mc', questionText: 'What is a contract?', options: ['A suggestion', 'A casual conversation', 'A legally binding agreement', 'A type of advertisement'], correctAnswer: 'A legally binding agreement', relatedContentIndex: 1 },
        { id: 'ca5-q2', type: 'tf', questionText: 'You should always sign a contract without reading the fine print.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'ca5-q3', type: 'frq', questionText: 'What should you do if you don\'t understand a part of a contract?', correctAnswer: ['ask questions', 'ask for clarification', 'seek advice'], relatedContentIndex: 3 }
      ]
    }
  },

  // --- Entrepreneurship & Innovation (5 Lessons) ---
  {
    id: 'entrepreneurship-lesson-1',
    title: 'What is Entrepreneurship?',
    category: 'Entrepreneurship & Innovation',
    order: 1,
    time: '5 min read',
    content: [
      "Entrepreneurship is the process of designing, launching, and running a new business, typically a small business, as a startup company. It's about taking on financial risks in the hope of profit.",
      "Entrepreneurs are individuals who create new businesses, bearing most of the risks and enjoying most of the rewards. They are often seen as innovators, sources of new ideas, goods, services, and business processes.",
      "It's about identifying a problem or an unmet need and creating a solution for it. This could be a new product, a better service, or a more efficient way of doing things.",
      "Key traits of entrepreneurs often include creativity, resilience, problem-solving skills, and a willingness to take calculated risks.",
      "You don't need to be an adult to be an entrepreneur! Many successful businesses started as simple ideas from young people. Think about what problems you see around you and how you might solve them."
    ],
    quiz: {
      questions: [
        { id: 'ei1-q1', type: 'mc', questionText: 'What is the core idea of entrepreneurship?', options: ['Working for a big company', 'Designing and running a new business', 'Avoiding all risks', 'Only for adults'], correctAnswer: 'Designing and running a new business', relatedContentIndex: 0 },
        { id: 'ei1-q2', type: 'tf', questionText: 'Entrepreneurs are typically risk-averse.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'ei1-q3', type: 'frq', questionText: 'Name one key trait of an entrepreneur.', correctAnswer: ['creativity', 'resilience', 'problem-solving skills', 'willingness to take calculated risks'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'entrepreneurship-lesson-2',
    title: 'Idea Generation & Validation',
    category: 'Entrepreneurship & Innovation',
    order: 2,
    time: '7 min read',
    content: [
      "Every great business starts with an idea. But not all ideas are good business ideas. The first step is to generate many ideas, then validate them to see if they have potential.",
      "**Idea Generation:** Think about problems you or others face. What frustrates you? What could be done better? Brainstorm solutions. Look at trends, new technologies, or things you're passionate about.",
      "**Problem-Solution Fit:** A strong business idea solves a real problem for real people. Your solution should be something people need and are willing to pay for.",
      "**Market Research:** Who are your potential customers? How many of them are there? What are competitors doing? Understanding your market is crucial for success.",
      "**Validation:** Before investing too much time or money, test your idea. Talk to potential customers, create a simple prototype, or run a small survey. Get feedback early and often."
    ],
    quiz: {
      questions: [
        { id: 'ei2-q1', type: 'mc', questionText: 'What is the purpose of "validation" in idea generation?', options: ['To invest all your money immediately', 'To test your idea and get feedback early', 'To avoid talking to customers', 'To copy a competitor'], correctAnswer: 'To test your idea and get feedback early', relatedContentIndex: 4 },
        { id: 'ei2-q2', type: 'tf', questionText: 'A good business idea solves a real problem for real people.', options: ['True', 'False'], correctAnswer: 'True', relatedContentIndex: 2 },
        { id: 'ei2-q3', type: 'frq', questionText: 'Name one way to generate business ideas.', correctAnswer: ['think about problems', 'brainstorm solutions', 'look at trends', 'look at passions'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'entrepreneurship-lesson-3',
    title: 'Building a Business Plan',
    category: 'Entrepreneurship & Innovation',
    order: 3,
    time: '8 min read',
    content: [
      "A business plan is a formal written document that describes the nature of a business, its sales and marketing strategy, financial background, and contains a projected profit and loss statement. It's your blueprint for success.",
      "Key components often include an executive summary (overview), company description, market analysis (customers, competitors), organization and management, service or product line, marketing and sales strategy, and financial projections.",
      "It helps you clarify your vision, identify potential challenges, set realistic goals, and secure funding if needed. It forces you to think through all aspects of your business.",
      "You don't need a super complex business plan for a small startup. A lean business plan, focusing on key elements, can be very effective for getting started.",
      "The process of creating the plan is often more valuable than the plan itself. It helps you organize your thoughts and identify gaps in your strategy."
    ],
    quiz: {
      questions: [
        { id: 'ei3-q1', type: 'mc', questionText: 'What is a business plan?', options: ['A casual idea', 'A formal written document describing a business and its strategy', 'Only for large companies', 'A list of products to sell'], correctAnswer: 'A formal written document describing a business and its strategy', relatedContentIndex: 0 },
        { id: 'ei3-q2', type: 'tf', questionText: 'The process of creating a business plan is not as valuable as the final document.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'ei3-q3', type: 'frq', questionText: 'Name one key component of a business plan.', correctAnswer: ['executive summary', 'company description', 'market analysis', 'organization and management', 'service or product line', 'marketing and sales strategy', 'financial projections'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'entrepreneurship-lesson-4',
    title: 'Funding Your Startup',
    category: 'Entrepreneurship & Innovation',
    order: 4,
    time: '7 min read',
    content: [
      "Getting money to start or grow your business is called funding. There are various ways to secure capital, depending on the size and type of your venture.",
      "**Bootstrapping** means funding your business with personal savings or the initial revenue generated by the business itself. It gives you full control but can limit growth speed.",
      "**Friends and Family:** Often the first source of external funding, but be sure to treat it professionally with clear agreements to avoid personal issues.",
      "**Small Business Loans:** Banks and other financial institutions offer loans specifically for businesses. You'll need a solid business plan and often collateral.",
      "**Crowdfunding:** Raising small amounts of money from a large number of people, typically through online platforms. This can also help validate your idea and build a community.",
      "**Angel Investors/Venture Capital:** For high-growth potential startups, these investors provide significant capital in exchange for equity (ownership) in your company."
    ],
    quiz: {
      questions: [
        { id: 'ei4-q1', type: 'mc', questionText: 'What does "bootstrapping" mean in business funding?', options: ['Getting a large bank loan', 'Funding with personal savings or early revenue', 'Only getting money from friends', 'Using crowdfunding'], correctAnswer: 'Funding with personal savings or early revenue', relatedContentIndex: 1 },
        { id: 'ei4-q2', type: 'tf', questionText: 'Angel investors provide capital in exchange for a fixed interest payment.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 5 },
        { id: 'ei4-q3', type: 'frq', questionText: 'Name one source of funding for a startup.', correctAnswer: ['bootstrapping', 'friends and family', 'small business loans', 'crowdfunding', 'angel investors', 'venture capital'], relatedContentIndex: 0 }
      ]
    }
  },
  {
    id: 'entrepreneurship-lesson-5',
    title: 'Marketing & Sales for Beginners',
    category: 'Entrepreneurship & Innovation',
    order: 5,
    time: '6 min read',
    content: [
      "Once you have a product or service, you need to tell people about it and convince them to buy it. This is where marketing and sales come in.",
      "**Marketing** is about creating awareness and interest in your product or service. This can involve social media, online ads, content creation (blogs, videos), or even word-of-mouth.",
      "**Sales** is the process of directly converting that interest into a purchase. It involves interacting with customers, addressing their needs, and closing the deal.",
      "Understand your **target audience**: Who are you trying to reach? What are their needs, interests, and where do they spend their time (online or offline)?",
      "Start with a simple marketing strategy. You don't need a huge budget. Focus on where your target audience is and what messages resonate with them. Be authentic and consistent."
    ],
    quiz: {
      questions: [
        { id: 'ei5-q1', type: 'mc', questionText: 'What is the primary goal of marketing?', options: ['Directly closing a sale', 'Creating awareness and interest in a product/service', 'Managing finances', 'Hiring employees'], correctAnswer: 'Creating awareness and interest in a product/service', relatedContentIndex: 1 },
        { id: 'ei5-q2', type: 'tf', questionText: 'You need a huge budget to start marketing your product.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'ei5-q3', type: 'frq', questionText: 'What is the process of directly converting interest into a purchase?', correctAnswer: ['sales'], relatedContentIndex: 2 }
      ]
    }
  },

  // --- Global Economy & Society (5 Lessons) ---
  {
    id: 'global-economy-lesson-1',
    title: 'What is the Economy?',
    category: 'Global Economy & Society',
    order: 1,
    time: '5 min read',
    content: [
      "The economy is the system by which goods and services are produced, distributed, and consumed within a region or country. It affects everything from the price of your favorite snack to job availability.",
      "Key players in an economy include consumers (people who buy goods/services), producers (businesses that make goods/services), and governments (who set rules and provide public services).",
      "**Supply and Demand** is a fundamental concept: Supply is how much of a product is available, and demand is how much people want it. These two forces determine prices.",
      "When demand is high and supply is low, prices tend to rise. When demand is low and supply is high, prices tend to fall.",
      "Understanding basic economic principles helps you make smarter decisions as a consumer, a worker, and a future investor."
    ],
    quiz: {
      questions: [
        { id: 'ge1-q1', type: 'mc', questionText: 'What is the economy?', options: ['A type of bank', 'A system of producing, distributing, and consuming goods/services', 'Only about money', 'A single company'], correctAnswer: 'A system of producing, distributing, and consuming goods/services', relatedContentIndex: 0 },
        { id: 'ge1-q2', type: 'tf', questionText: 'Supply and demand have no effect on prices.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'ge1-q3', type: 'frq', questionText: 'Name one key player in an economy.', correctAnswer: ['consumers', 'producers', 'governments'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'global-economy-lesson-2',
    title: 'Inflation & Deflation',
    category: 'Global Economy & Society',
    order: 2,
    time: '6 min read',
    content: [
      "**Inflation** is the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling. Your money buys less over time.",
      "Causes of inflation can include increased demand for goods, rising production costs, or too much money circulating in the economy.",
      "**Deflation** is the opposite: a decrease in the general price level of goods and services. While it might sound good, widespread deflation can signal economic problems like reduced spending and job losses.",
      "Inflation impacts your savings (they lose purchasing power) and your spending (things become more expensive). It's why investing is important to make your money grow faster than inflation.",
      "Governments and central banks try to manage inflation to keep it stable and predictable, as extreme inflation or deflation can harm the economy."
    ],
    quiz: {
      questions: [
        { id: 'ge2-q1', type: 'mc', questionText: 'What is inflation?', options: ['Prices falling', 'Money gaining value', 'Prices rising and purchasing power falling', 'A type of tax'], correctAnswer: 'Prices rising and purchasing power falling', relatedContentIndex: 0 },
        { id: 'ge2-q2', type: 'tf', questionText: 'Deflation is generally a sign of a strong economy.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'ge2-q3', type: 'frq', questionText: 'Name one way inflation impacts your personal finances.', correctAnswer: ['savings lose purchasing power', 'things become more expensive'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'global-economy-lesson-3',
    title: 'Global Trade & Currencies',
    category: 'Global Economy & Society',
    order: 3,
    time: '7 min read',
    content: [
      "**Global trade** is the exchange of goods and services between different countries. It allows countries to specialize in what they do best and access products they can't produce efficiently themselves.",
      "**Exports** are goods and services sold to other countries. **Imports** are goods and services bought from other countries.",
      "**Currencies** are the systems of money used in different countries (e.g., US Dollar, Euro, Yen). When countries trade, they often need to exchange currencies.",
      "**Exchange rates** determine how much one currency is worth in relation to another. Fluctuations in exchange rates can affect the cost of imports and exports.",
      "Global trade fosters economic growth, increases variety for consumers, and can lead to lower prices. However, it also presents challenges like competition and currency volatility."
    ],
    quiz: {
      questions: [
        { id: 'ge3-q1', type: 'mc', questionText: 'What are "exports"?', options: ['Goods bought from other countries', 'Goods sold to other countries', 'Money exchanged between countries', 'Local products only'], correctAnswer: 'Goods sold to other countries', relatedContentIndex: 1 },
        { id: 'ge3-q2', type: 'tf', questionText: 'Exchange rates have no impact on the cost of imports and exports.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'ge3-q3', type: 'frq', questionText: 'What is the primary benefit of global trade?', correctAnswer: ['economic growth', 'increased variety for consumers', 'lower prices'], relatedContentIndex: 4 }
      ]
    }
  },
  {
    id: 'global-economy-lesson-4',
    title: 'Economic Cycles: Boom & Bust',
    category: 'Global Economy & Society',
    order: 4,
    time: '8 min read',
    content: [
      "Economies don't just grow steadily; they go through cycles of expansion (boom) and contraction (bust). Understanding these cycles can help you prepare financially.",
      "**Expansion (Boom)**: A period of economic growth, with rising employment, increased production, and higher consumer spending. Businesses are doing well.",
      "**Peak**: The highest point of the expansion phase, after which the economy starts to slow down.",
      "**Contraction (Bust/Recession)**: A period of economic decline, with falling employment, reduced production, and lower consumer spending. Businesses might struggle.",
      "**Trough**: The lowest point of the contraction phase, after which the economy starts to recover.",
      "Governments and central banks use policies (like interest rate changes) to try and smooth out these cycles, preventing extreme booms or busts."
    ],
    quiz: {
      questions: [
        { id: 'ge4-q1', type: 'mc', questionText: 'What happens during an economic "expansion" (boom)?', options: ['Falling employment', 'Increased production and consumer spending', 'Businesses struggling', 'Prices always falling'], correctAnswer: 'Increased production and consumer spending', relatedContentIndex: 1 },
        { id: 'ge4-q2', type: 'tf', questionText: 'The "trough" is the highest point of an economic cycle.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 4 },
        { id: 'ge4-q3', type: 'frq', questionText: 'What is a period of economic decline called?', correctAnswer: ['contraction', 'recession'], relatedContentIndex: 3 }
      ]
    }
  },
  {
    id: 'global-economy-lesson-5',
    title: 'The Role of Government in the Economy',
    category: 'Global Economy & Society',
    order: 5,
    time: '7 min read',
    content: [
      "Governments play a significant role in influencing and managing the economy. Their actions can affect everything from job growth to the cost of goods.",
      "**Fiscal Policy** involves the government's use of spending and taxation to influence the economy. For example, increasing government spending or cutting taxes can stimulate the economy.",
      "**Monetary Policy** involves managing the supply of money and credit, typically by a central bank (like the Federal Reserve in the U.S.). This often involves adjusting interest rates.",
      "Governments also create regulations to protect consumers, workers, and the environment, ensuring fair practices in the market.",
      "These policies aim to achieve economic goals like stable prices (low inflation), full employment, and sustainable economic growth. Understanding them helps you see the bigger picture of how your money is affected."
    ],
    quiz: {
      questions: [
        { id: 'ge5-q1', type: 'mc', questionText: 'What is "Fiscal Policy"?', options: ['Managing money supply', 'Government spending and taxation to influence economy', 'Setting interest rates', 'Creating new businesses'], correctAnswer: 'Government spending and taxation to influence economy', relatedContentIndex: 1 },
        { id: 'ge5-q2', type: 'tf', questionText: 'Monetary policy is controlled by the government\'s spending.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'ge5-q3', type: 'frq', questionText: 'Name one economic goal governments aim to achieve through policy.', correctAnswer: ['stable prices', 'full employment', 'sustainable economic growth'], relatedContentIndex: 4 }
      ]
    }
  },

  // --- Financial Ethics & Responsibility (5 Lessons) ---
  {
    id: 'ethics-responsibility-lesson-1',
    title: 'Ethical Spending & Consumer Choices',
    category: 'Financial Ethics & Responsibility',
    order: 1,
    time: '5 min read',
    content: [
      "Ethical spending means making purchasing decisions that align with your values. It's about considering the impact of your money beyond just the price tag.",
      "This can involve supporting businesses that treat their workers fairly, use sustainable practices, or donate to causes you believe in.",
      "Research companies before you buy. Look into their labor practices, environmental impact, and corporate values. Many organizations provide ratings for companies based on these factors.",
      "Consider the 'fast fashion' phenomenon: cheap, trendy clothes produced quickly. While affordable, it often comes with environmental and labor concerns.",
      "Your spending choices, even small ones, can collectively make a difference in encouraging businesses to act more responsibly."
    ],
    quiz: {
      questions: [
        { id: 'er1-q1', type: 'mc', questionText: 'What is ethical spending about?', options: ['Buying the cheapest items', 'Only buying luxury goods', 'Making choices that align with your values and impact', 'Ignoring company practices'], correctAnswer: 'Making choices that align with your values and impact', relatedContentIndex: 0 },
        { id: 'er1-q2', type: 'tf', questionText: 'It is not possible to research a company\'s labor practices before buying.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'er1-q3', type: 'frq', questionText: 'What is one aspect you might consider when making ethical spending choices?', correctAnswer: ['fair labor', 'sustainable practices', 'donations to causes', 'environmental impact'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'ethics-responsibility-lesson-2',
    title: 'Financial Responsibility & Integrity',
    category: 'Financial Ethics & Responsibility',
    order: 2,
    time: '6 min read',
    content: [
      "Financial responsibility means being accountable for your financial decisions and commitments. It's about managing your money in a way that builds trust and stability.",
      "This includes paying your debts on time, being honest in financial dealings, and managing your budget effectively.",
      "Integrity in finance means acting honestly and having strong moral principles, especially regarding money. This builds your reputation and trustworthiness.",
      "Avoiding financial dishonesty like cheating on taxes, stealing, or misrepresenting income is crucial for personal integrity and legal compliance.",
      "Building a reputation for financial responsibility and integrity will open doors to better opportunities, like loans with lower interest rates or trusted financial partnerships."
    ],
    quiz: {
      questions: [
        { id: 'er2-q1', type: 'mc', questionText: 'What does financial responsibility mean?', options: ['Avoiding all financial decisions', 'Being accountable for financial decisions and commitments', 'Only spending money on yourself', 'Never paying taxes'], correctAnswer: 'Being accountable for financial decisions and commitments', relatedContentIndex: 0 },
        { id: 'er2-q2', type: 'tf', questionText: 'Acting honestly in financial dealings is called integrity.', options: ['True', 'False'], correctAnswer: 'True', relatedContentIndex: 2 },
        { id: 'er2-q3', type: 'frq', questionText: 'Name one action that demonstrates financial responsibility.', correctAnswer: ['paying debts on time', 'being honest in financial dealings', 'managing budget effectively'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'ethics-responsibility-lesson-3',
    title: 'Giving Back: Philanthropy & Community',
    category: 'Financial Ethics & Responsibility',
    order: 3,
    time: '7 min read',
    content: [
      "Financial well-being isn't just about accumulating wealth; it's also about how you can use your resources to contribute positively to your community and society.",
      "**Philanthropy** is the desire to promote the welfare of others, expressed especially by the generous donation of money to good causes. It's about giving back.",
      "You don't need to be rich to be philanthropic. Even small donations, volunteering your time, or supporting local businesses can make a big difference.",
      "Consider donating to charities you believe in. Research organizations to ensure they are reputable and use funds effectively. Websites like Charity Navigator can help.",
      "Giving back can provide a sense of purpose, strengthen communities, and even offer tax benefits. It's a way to use your financial power for good."
    ],
    quiz: {
      questions: [
        { id: 'er3-q1', type: 'mc', questionText: 'What is philanthropy?', options: ['Accumulating wealth for yourself', 'Generous donation of money to good causes', 'Avoiding all charity', 'Only for very rich people'], correctAnswer: 'Generous donation of money to good causes', relatedContentIndex: 1 },
        { id: 'er3-q2', type: 'tf', questionText: 'Only large donations make a difference in philanthropy.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'er3-q3', type: 'frq', questionText: 'Name one way you can contribute to your community financially.', correctAnswer: ['donating to charities', 'supporting local businesses'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'ethics-responsibility-lesson-4',
    title: 'Financial Literacy for All',
    category: 'Financial Ethics & Responsibility',
    order: 4,
    time: '6 min read',
    content: [
      "Financial literacy is a fundamental life skill, and ensuring everyone has access to it is a societal responsibility. It empowers individuals and strengthens communities.",
      "Lack of financial literacy can lead to poor financial decisions, debt, and limited opportunities, perpetuating cycles of poverty.",
      "Promoting financial education in schools and communities helps equip young people with the tools they need to navigate the financial world successfully.",
      "Access to financial resources and knowledge should be equitable. Initiatives that provide financial education to underserved communities are vital.",
      "By becoming financially literate yourself, you can also become an advocate and a resource for others, sharing your knowledge to help them on their financial journeys."
    ],
    quiz: {
      questions: [
        { id: 'er4-q1', type: 'mc', questionText: 'Why is financial literacy for all important?', options: ['It only benefits the rich', 'It empowers individuals and strengthens communities', 'It is not a life skill', 'It leads to more debt'], correctAnswer: 'It empowers individuals and strengthens communities', relatedContentIndex: 1 },
        { id: 'er4-q2', type: 'tf', questionText: 'Lack of financial literacy has no significant negative consequences.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 1 },
        { id: 'er4-q3', type: 'frq', questionText: 'Name one place where financial education should be promoted.', correctAnswer: ['schools', 'communities'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'ethics-responsibility-lesson-5',
    title: 'The Future of Money & Society',
    category: 'Financial Ethics & Responsibility',
    order: 5,
    time: '7 min read',
    content: [
      "The world of money is constantly evolving. From digital currencies to new payment systems, understanding future trends is part of being financially prepared.",
      "**Digital currencies** (like Bitcoin or Ethereum) are decentralized digital assets. They are a new and evolving form of money, distinct from traditional currencies.",
      "**Fintech** (Financial Technology) refers to technology that aims to improve and automate the delivery and use of financial services. This includes mobile banking, online investing apps, and payment platforms.",
      "The increasing interconnectedness of the global economy means that financial events in one part of the world can impact others. This highlights the importance of global economic awareness.",
      "As technology advances, new financial opportunities and risks emerge. Staying informed and adaptable will be key to navigating the future financial landscape responsibly."
    ],
    quiz: {
      questions: [
        { id: 'er5-q1', type: 'mc', questionText: 'What does "Fintech" refer to?', options: ['Old banking methods', 'Technology improving financial services', 'A type of currency', 'A new investment strategy'], correctAnswer: 'Technology improving financial services', relatedContentIndex: 2 },
        { id: 'er5-q2', type: 'tf', questionText: 'Digital currencies are the same as traditional currencies.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 1 },
        { id: 'er5-q3', type: 'frq', questionText: 'Name one example of a digital currency.', correctAnswer: ['bitcoin', 'ethereum'], relatedContentIndex: 1 }
      ]
    }
  },

  // --- Financial Psychology (5 Lessons) ---
  {
    id: 'financial-psychology-lesson-1',
    title: 'Emotions & Money',
    category: 'Financial Psychology',
    order: 1,
    time: '5 min read',
    content: [
      "Our emotions play a huge role in our financial decisions, often more than pure logic. Understanding this connection is key to making better choices.",
      "**Fear** can lead to hoarding money or selling investments at the wrong time. **Greed** can lead to risky investments or impulsive spending.",
      "**Impulse buying** is often driven by emotions like excitement, boredom, or stress, rather than genuine need. This can derail budgets quickly.",
      "**Keeping up with the Joneses** (social comparison) can lead to overspending to match what friends or social media influencers have, even if you can't afford it.",
      "Becoming aware of your emotional triggers related to money is the first step. When you feel a strong emotion, pause before making a financial decision."
    ],
    quiz: {
      questions: [
        { id: 'fp1-q1', type: 'mc', questionText: 'What often drives impulse buying?', options: ['Logic', 'Emotions like excitement or stress', 'Careful planning', 'Budgeting'], correctAnswer: 'Emotions like excitement or stress', relatedContentIndex: 2 },
        { id: 'fp1-q2', type: 'tf', questionText: 'Our emotions have no impact on financial decisions.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 0 },
        { id: 'fp1-q3', type: 'frq', questionText: 'Name one emotion that can influence financial decisions.', correctAnswer: ['fear', 'greed', 'excitement', 'boredom', 'stress'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'financial-psychology-lesson-2',
    title: 'The Power of Habits',
    category: 'Financial Psychology',
    order: 2,
    time: '6 min read',
    content: [
      "Most of our financial actions are driven by habits, not conscious decisions. Building good financial habits is more effective than relying on willpower.",
      "A habit consists of a cue (trigger), a routine (the action), and a reward. Identify these for your financial habits.",
      "**Good habits** include automating savings, reviewing your budget regularly, paying bills on time, and tracking spending.",
      "**Bad habits** might be impulse buying, ignoring bills, or constantly checking social media for new things to buy.",
      "To change a bad habit, identify the cue and the reward, then try to replace the routine with a healthier financial action. Consistency is key to forming new habits."
    ],
    quiz: {
      questions: [
        { id: 'fp2-q1', type: 'mc', questionText: 'What is more effective for financial actions than willpower?', options: ['Luck', 'Ignoring money', 'Building good financial habits', 'Spending all your money'], correctAnswer: 'Building good financial habits', relatedContentIndex: 0 },
        { id: 'fp2-q2', type: 'tf', questionText: 'A habit consists of only a routine.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 1 },
        { id: 'fp2-q3', type: 'frq', questionText: 'Name one example of a good financial habit.', correctAnswer: ['automating savings', 'reviewing budget', 'paying bills on time', 'tracking spending'], relatedContentIndex: 2 }
      ]
    }
  },
  {
    id: 'financial-psychology-lesson-3',
    title: 'Delayed Gratification',
    category: 'Financial Psychology',
    order: 3,
    time: '7 min read',
    content: [
      "Delayed gratification is the ability to resist the temptation for an immediate reward and wait for a later, more valuable reward. It's a cornerstone of financial success.",
      "The famous 'marshmallow test' showed that children who could delay eating a marshmallow for a larger reward later often had better life outcomes, including financial ones.",
      "In finance, this means choosing to save or invest now instead of spending on immediate wants. Forgoing a new gadget today for a down payment on a car later is an example.",
      "Practicing delayed gratification builds discipline and helps you achieve bigger, more meaningful goals. It shifts your focus from instant pleasure to long-term satisfaction.",
      "Start small: delay a small purchase for a week, or save a portion of your allowance before spending it. Each small victory builds your 'delayed gratification muscle'."
    ],
    quiz: {
      questions: [
        { id: 'fp3-q1', type: 'mc', questionText: 'What is delayed gratification?', options: ['Buying everything immediately', 'Resisting immediate reward for a later, more valuable one', 'Never buying anything', 'Only for very rich people'], correctAnswer: 'Resisting immediate reward for a later, more valuable one', relatedContentIndex: 0 },
        { id: 'fp3-q2', type: 'tf', questionText: 'Practicing delayed gratification only leads to deprivation.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 3 },
        { id: 'fp3-q3', type: 'frq', questionText: 'What famous test is used to illustrate delayed gratification?', correctAnswer: ['marshmallow test'], relatedContentIndex: 1 }
      ]
    }
  },
  {
    id: 'financial-psychology-lesson-4',
    title: 'Scarcity Mindset vs. Abundance Mindset',
    category: 'Financial Psychology',
    order: 4,
    time: '6 min read',
    content: [
      "Your mindset about money significantly impacts your financial behavior. Two common mindsets are scarcity and abundance.",
      "A **scarcity mindset** focuses on what's lacking or limited. It can lead to fear, hoarding, or feeling like there's never enough money, even when there is.",
      "An **abundance mindset** focuses on possibilities and opportunities. It promotes generosity, smart investing, and believing there are always ways to create more value.",
      "A scarcity mindset might lead to avoiding spending even on needs, or making impulsive decisions out of fear of missing out. An abundance mindset encourages calculated risks and strategic growth.",
      "You can shift your mindset by practicing gratitude for what you have, focusing on learning and growth, and celebrating small financial wins. This helps you see opportunities instead of limitations."
    ],
    quiz: {
      questions: [
        { id: 'fp4-q1', type: 'mc', questionText: 'What does a scarcity mindset focus on?', options: ['Opportunities', 'What is lacking or limited', 'Generosity', 'Strategic growth'], correctAnswer: 'What is lacking or limited', relatedContentIndex: 1 },
        { id: 'fp4-q2', type: 'tf', questionText: 'An abundance mindset promotes hoarding money.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'fp4-q3', type: 'frq', questionText: 'Name one way to shift towards an abundance mindset.', correctAnswer: ['practicing gratitude', 'focusing on learning', 'celebrating small wins'], relatedContentIndex: 4 }
      ]
    }
  },
  {
    id: 'financial-psychology-lesson-5',
    title: 'Financial Stress & Well-being',
    category: 'Financial Psychology',
    order: 5,
    time: '7 min read',
    content: [
      "Financial stress is a common issue, especially for young people. It's the worry and anxiety related to money matters, and it can impact your overall well-being.",
      "Common causes include debt, unexpected expenses, job insecurity, or simply not having a clear financial plan.",
      "Financial stress can affect your sleep, mental health, relationships, and even physical health. It's important to address it.",
      "Strategies to reduce financial stress include creating a budget, building an emergency fund, setting realistic goals, and seeking financial education or advice.",
      "Remember that you're not alone. Talking about money with trusted adults or friends, and taking small steps to improve your financial situation, can significantly reduce stress and improve your well-being."
    ],
    quiz: {
      questions: [
        { id: 'fp5-q1', type: 'mc', questionText: 'What is financial stress?', options: ['Excitement about money', 'Worry and anxiety related to money matters', 'A type of investment', 'A new financial skill'], correctAnswer: 'Worry and anxiety related to money matters', relatedContentIndex: 0 },
        { id: 'fp5-q2', type: 'tf', questionText: 'Financial stress has no impact on your overall well-being.', options: ['True', 'False'], correctAnswer: 'False', relatedContentIndex: 2 },
        { id: 'fp5-q3', type: 'frq', questionText: 'Name one strategy to reduce financial stress.', correctAnswer: ['creating a budget', 'building emergency fund', 'setting realistic goals', 'seeking financial education'], relatedContentIndex: 3 }
      ]
    }
  }
];

export default lessonsData;

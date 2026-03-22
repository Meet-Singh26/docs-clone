export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "<p></p>",
  },
  {
    id: "software-proposal",
    label: "Software development proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>Project Overview</h2>
      <p>We propose the development of a <strong>cloud-based project management platform</strong> designed to streamline team collaboration, task tracking, and real-time communication for distributed engineering teams. The solution will integrate with existing CI/CD pipelines, version control systems, and communication tools.</p>

      <h2>Objectives</h2>
      <ul>
        <li>Reduce project delivery timelines by <strong>30%</strong> through automated workflow management</li>
        <li>Provide real-time dashboards for stakeholder visibility and sprint tracking</li>
        <li>Integrate seamlessly with GitHub, Slack, and Jira for unified developer experience</li>
        <li>Ensure enterprise-grade security with SOC 2 Type II compliance</li>
      </ul>

      <h2>Proposed Solution</h2>
      <p>The platform will be built using a <strong>microservices architecture</strong> deployed on AWS, featuring a React-based dashboard, a Node.js API layer, and a PostgreSQL database. Key modules include:</p>
      <ul>
        <li><strong>Task Engine</strong> — Kanban boards, Gantt charts, and automated sprint planning</li>
        <li><strong>Analytics Hub</strong> — Velocity tracking, burndown charts, and custom reporting</li>
        <li><strong>Integration Layer</strong> — Pre-built connectors for 20+ developer tools</li>
      </ul>

      <h2>Timeline</h2>
      <table>
        <tr>
          <th>Phase</th>
          <th>Duration</th>
          <th>Deliverables</th>
        </tr>
        <tr>
          <td>Discovery &amp; Planning</td>
          <td>2 weeks</td>
          <td>Requirements doc, architecture diagram, wireframes</td>
        </tr>
        <tr>
          <td>Core Development</td>
          <td>8 weeks</td>
          <td>MVP with task engine, auth, and dashboard</td>
        </tr>
        <tr>
          <td>Integration &amp; Testing</td>
          <td>3 weeks</td>
          <td>Third-party integrations, QA, performance testing</td>
        </tr>
        <tr>
          <td>Launch &amp; Handoff</td>
          <td>1 week</td>
          <td>Deployment, documentation, team training</td>
        </tr>
      </table>

      <h2>Budget</h2>
      <p>The estimated project investment is <strong>$85,000 – $110,000</strong>, covering design, development, QA, infrastructure setup, and 3 months of post-launch support.</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>This proposal outlines a comprehensive plan to redesign and modernize our <strong>customer onboarding experience</strong>, reducing time-to-value from 14 days to under 3 days. The project addresses key drop-off points in the current funnel and introduces guided workflows, interactive tutorials, and personalized setup paths.</p>

      <h2>Project Description</h2>
      <p>The current onboarding process suffers from a <strong>62% drop-off rate</strong> between signup and first meaningful action. Through user research and analytics, we've identified three critical friction points that this project will address through UX redesign, automation, and personalization.</p>

      <h2>Methodology</h2>
      <ol>
        <li><strong>Research Phase</strong> — Conduct user interviews, analyze funnel data, and benchmark competitors</li>
        <li><strong>Design Sprint</strong> — Create prototypes for 3 onboarding paths based on user personas</li>
        <li><strong>Development</strong> — Build the new flows with A/B testing framework built-in</li>
        <li><strong>Rollout</strong> — Gradual release to 10% → 50% → 100% of new signups</li>
      </ol>

      <h2>Resources Required</h2>
      <ul>
        <li><strong>Team:</strong> 1 Product Designer, 2 Frontend Engineers, 1 Backend Engineer, 1 Data Analyst</li>
        <li><strong>Tools:</strong> Figma, Amplitude, LaunchDarkly (feature flags)</li>
        <li><strong>Budget:</strong> $45,000 for development + $5,000/mo for analytics tooling</li>
      </ul>

      <h2>Expected Outcomes</h2>
      <ul>
        <li>Increase onboarding completion rate from 38% to 75%</li>
        <li>Reduce support tickets related to setup by 50%</li>
        <li>Improve 30-day retention by 20 percentage points</li>
      </ul>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <p>Sarah Chen</p>
      <p>Director of Operations</p>
      <p>Meridian Technologies, Inc.</p>
      <p>450 Innovation Drive, Suite 200</p>
      <p>San Francisco, CA 94105</p>
      <p>&nbsp;</p>
      <p>March 15, 2025</p>
      <p>&nbsp;</p>
      <p>James Whitfield</p>
      <p>Chief Executive Officer</p>
      <p>Vertex Solutions Group</p>
      <p>1200 Market Street, Floor 8</p>
      <p>San Francisco, CA 94103</p>
      <p>&nbsp;</p>
      <p>Dear Mr. Whitfield,</p>
      <p>&nbsp;</p>
      <p>I am writing to formally propose a <strong>strategic partnership</strong> between Meridian Technologies and Vertex Solutions Group. After reviewing your company's impressive work in enterprise data analytics, I believe a collaboration would create significant value for both organizations and our respective clients.</p>
      <p>Over the past two years, Meridian has developed a suite of AI-powered automation tools that complement your analytics platform. By integrating our solutions, we could offer clients a seamless experience from <strong>data ingestion through actionable insights</strong>, reducing implementation time by an estimated 40%.</p>
      <p>I would welcome the opportunity to discuss this further at your convenience. Please feel free to reach me at <strong>sarah.chen@meridiantech.com</strong> or (415) 555-0142 to arrange a meeting.</p>
      <p>&nbsp;</p>
      <p>Warm regards,</p>
      <p><strong>Sarah Chen</strong></p>
      <p>Director of Operations</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>Alex Rivera</h1>
      <p>alex.rivera@email.com · (555) 987-6543 · San Francisco, CA · linkedin.com/in/alexrivera</p>

      <h2>Professional Summary</h2>
      <p>Results-driven <strong>Full-Stack Software Engineer</strong> with 6+ years of experience building scalable web applications and microservices. Passionate about clean architecture, developer experience, and shipping products that delight users. Led teams of 3–8 engineers across multiple product launches generating $12M+ in annual revenue.</p>

      <h2>Work Experience</h2>
      <h3>Senior Software Engineer — Acme Cloud, Inc.</h3>
      <p><em>Jan 2022 – Present · San Francisco, CA</em></p>
      <ul>
        <li>Architected and shipped a real-time collaboration engine serving <strong>50,000+ daily active users</strong></li>
        <li>Reduced API response times by 65% through query optimization and Redis caching layer</li>
        <li>Mentored 4 junior engineers and established team code review standards</li>
      </ul>

      <h3>Software Engineer — DataFlow Systems</h3>
      <p><em>Jun 2019 – Dec 2021 · Austin, TX</em></p>
      <ul>
        <li>Built a data pipeline processing <strong>2M+ events/day</strong> using Kafka, Python, and PostgreSQL</li>
        <li>Developed a customer-facing analytics dashboard with React and D3.js</li>
        <li>Implemented CI/CD pipelines reducing deployment time from 45 min to 8 min</li>
      </ul>

      <h2>Education</h2>
      <h3>B.S. Computer Science</h3>
      <p>University of Texas at Austin — Graduated May 2019, GPA: 3.8/4.0</p>

      <h2>Skills</h2>
      <ul>
        <li><strong>Languages:</strong> TypeScript, Python, Go, SQL</li>
        <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS, GraphQL</li>
        <li><strong>Backend:</strong> Node.js, Express, PostgreSQL, Redis, Kafka</li>
        <li><strong>DevOps:</strong> Docker, Kubernetes, AWS, GitHub Actions, Terraform</li>
      </ul>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>Alex Rivera</p>
      <p>1234 Oak Avenue, Apt 5B</p>
      <p>San Francisco, CA 94110</p>
      <p>alex.rivera@email.com</p>
      <p>(555) 987-6543</p>
      <p>&nbsp;</p>
      <p>March 15, 2025</p>
      <p>&nbsp;</p>
      <p>Emily Nakamura</p>
      <p>VP of Engineering</p>
      <p>Horizon Labs</p>
      <p>800 Tech Boulevard</p>
      <p>San Francisco, CA 94107</p>
      <p>&nbsp;</p>
      <p>Dear Ms. Nakamura,</p>
      <p>&nbsp;</p>
      <p>I am writing to express my strong interest in the <strong>Staff Software Engineer</strong> position at Horizon Labs, as advertised on your careers page. With over six years of experience building high-scale web applications and a deep passion for developer tooling, I'm excited about the opportunity to contribute to your mission of making software development more accessible.</p>
      <p>In my current role at Acme Cloud, I led the development of a real-time collaboration engine now used by <strong>50,000+ daily active users</strong>. I also spearheaded a performance initiative that reduced API latencies by 65%, directly improving customer satisfaction scores by 22 points. These experiences have sharpened my ability to balance technical excellence with product impact.</p>
      <p>What draws me to Horizon Labs is your commitment to <strong>open-source innovation</strong> and your collaborative engineering culture. I've been a contributor to several of your open-source projects and have seen firsthand the quality and thoughtfulness your team brings to developer tools.</p>
      <p>I would love the opportunity to discuss how my experience in distributed systems, team leadership, and product-minded engineering can contribute to Horizon Labs' continued growth. Thank you for your time and consideration.</p>
      <p>&nbsp;</p>
      <p>Sincerely,</p>
      <p><strong>Alex Rivera</strong></p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>Maria Santos</p>
      <p>742 Elm Street</p>
      <p>Portland, OR 97205</p>
      <p>&nbsp;</p>
      <p>March 15, 2025</p>
      <p>&nbsp;</p>
      <p>David Kim</p>
      <p>28 Birchwood Lane</p>
      <p>Seattle, WA 98101</p>
      <p>&nbsp;</p>
      <p>Dear David,</p>
      <p>&nbsp;</p>
      <p>I hope this letter finds you well. It's been far too long since we last caught up, and I wanted to reach out to share some exciting news — I've recently accepted a new position as <strong>Head of Design</strong> at a growing startup here in Portland, and we're officially launching our product next month!</p>
      <p>I've been thinking a lot about our conversation at the conference last year, where you mentioned your team's work on accessibility standards. Your insights on inclusive design genuinely influenced the direction we took with our product, and I wanted to thank you for that. The impact of that conversation has been more meaningful than you might realize.</p>
      <p>I'd love to reconnect over coffee next time you're in Portland, or perhaps at this year's Design Systems Summit. It would be wonderful to hear about what you've been working on and explore potential ways our teams might collaborate.</p>
      <p>Wishing you and your family all the best this spring. Looking forward to hearing from you!</p>
      <p>&nbsp;</p>
      <p>Warmly,</p>
      <p><strong>Maria Santos</strong></p>
    `,
  },
];

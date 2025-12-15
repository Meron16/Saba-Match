// Translations for English and Amharic

export type Language = "en" | "am";

export interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
    signup: string;
    signin: string;
    dashboard: string;
    profile: string;
    logout: string;
  };
  
  // Common
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    update: string;
    close: string;
    search: string;
    filter: string;
    submit: string;
    back: string;
    next: string;
    previous: string;
    view: string;
    select: string;
    upload: string;
    download: string;
    confirm: string;
    yes: string;
    no: string;
    all: string;
    and: string;
    manage: string;
    available: string;
    notAvailable: string;
  };

  // Auth
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    role: string;
    forgotPassword: string;
    rememberMe: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
      createAccount: string;
      loginSuccess: string;
      loginFailed: string;
      registerSuccess: string;
      registerFailed: string;
      welcomeBack: string;
      signInToContinue: string;
      joiningUs: string;
      passwordsDoNotMatch: string;
      passwordTooShort: string;
      accountExists: string;
      invalidCredentials: string;
      somethingWentWrong: string;
      creatingAccount: string;
      signingIn: string;
      accountType: string;
      individualUser: string;
      governmentUser: string;
    };

  // Roles
  roles: {
    user: string;
    company: string;
    government: string;
    jobSeeker: string;
  };

  // Dashboard
  dashboard: {
    welcome: string;
    overview: string;
    statistics: string;
    recentActivity: string;
    postedJobs: string;
    applications: string;
    aiScreening: string;
    myApplications: string;
    availableJobs: string;
    jobPostings: string;
    recruiters: string;
    candidates: string;
  };

  // Jobs
  jobs: {
    title: string;
    description: string;
    location: string;
    city: string;
    region: string;
    country: string;
    salary: string;
    salaryType: string;
    type: string;
    requirements: string;
    education: string;
    experience: string;
    vacancies: string;
    category: string;
    deadline: string;
    status: string;
    postedDate: string;
    postNewJob: string;
    editJob: string;
    deleteJob: string;
    closeJob: string;
    activateJob: string;
    draft: string;
    active: string;
    closed: string;
    fullTime: string;
    partTime: string;
    contract: string;
    internship: string;
    monthly: string;
    annual: string;
    hourly: string;
  };

  // Applications
  applications: {
    title: string;
    applicant: string;
    applicantName: string;
    applicantEmail: string;
    appliedDate: string;
    status: string;
    pending: string;
    reviewing: string;
    accepted: string;
    rejected: string;
    viewCV: string;
    review: string;
    noApplications: string;
  };

  // AI Screening
  screening: {
    title: string;
    screenAll: string;
    ranking: string;
    score: string;
    matchPercentage: string;
    strengths: string;
    weaknesses: string;
    justification: string;
    selectJob: string;
    noCandidates: string;
    screeningCandidates: string;
    refreshRankings: string;
    totalCandidates: string;
    averageScore: string;
    topScore: string;
    lowestScore: string;
    highlyRecommended: string;
    strongMatch: string;
    goodMatch: string;
    moderateMatch: string;
    limitedMatch: string;
  };

  // Profile
  profile: {
    personalInfo: string;
    professionalInfo: string;
    documents: string;
    kycVerification: string;
    companyInfo: string;
    businessLicense: string;
    editProfile: string;
    updateProfile: string;
    saveChanges: string;
  };

  // Home Page
  home: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      getStarted: string;
      learnMore: string;
      findDreamJob: string;
      activeJobs: string;
      companies: string;
      jobSeekers: string;
    };
    services: {
      title: string;
      subtitle: string;
      description: string;
      aiRecruitment: string;
      aiRecruitmentDesc: string;
      candidateIntelligence: string;
      candidateIntelligenceDesc: string;
      engagementHub: string;
      engagementHubDesc: string;
      keyFeatures: string;
      resumeScreening: string;
      resumeScreeningDesc: string;
      candidateMatching: string;
      candidateMatchingDesc: string;
      interviewScheduling: string;
      interviewSchedulingDesc: string;
    };
    about: {
      title: string;
      description: string;
      mission: string;
      missionDesc1: string;
      missionDesc2: string;
      values: string;
      innovation: string;
      innovationDesc: string;
      fairness: string;
      fairnessDesc: string;
      transparency: string;
      transparencyDesc: string;
      poweredBy: string;
      machineLearning: string;
      machineLearningDesc: string;
      nlp: string;
      nlpDesc: string;
      biasDetection: string;
      biasDetectionDesc: string;
      predictiveAnalytics: string;
      predictiveAnalyticsDesc: string;
    };
    contact: {
      title: string;
      description: string;
      name: string;
      email: string;
      phone: string;
      phoneNumber: string;
      howDidYouFindUs: string;
      send: string;
      google: string;
      socialMedia: string;
      friend: string;
      other: string;
      phoneLabel: string;
      faxLabel: string;
      emailLabel: string;
    };
  };

  // Messages
  messages: {
    success: string;
    error: string;
    warning: string;
    info: string;
    jobCreated: string;
    jobUpdated: string;
    jobDeleted: string;
    profileUpdated: string;
    applicationSubmitted: string;
  };
  
  // Dashboard Strings
  dashboardStrings: {
    welcomeBack: string;
    recruitmentJourney: string;
    completeProfile: string;
    completeProfileDesc: string;
    searchForJob: string;
    viewDetails: string;
    applyNow: string;
    allJobs: string;
    savedJobs: string;
    vacancy: string;
    vacancies: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      signup: "Signup",
      signin: "Signin",
      dashboard: "Dashboard",
      profile: "Profile",
      logout: "Logout",
    },
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      update: "Update",
      close: "Close",
      search: "Search",
      filter: "Filter",
      submit: "Submit",
      back: "Back",
      next: "Next",
      previous: "Previous",
      view: "View",
      select: "Select",
      upload: "Upload",
      download: "Download",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      all: "All",
      and: "and",
      manage: "manage",
      available: "available",
      notAvailable: "not available",
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      role: "Role",
      forgotPassword: "Forgot Password?",
      rememberMe: "Remember Me",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      createAccount: "Create Account",
      loginSuccess: "Login successful!",
      loginFailed: "Login failed. Please check your credentials.",
      registerSuccess: "Registration successful!",
      registerFailed: "Registration failed. Please try again.",
      welcomeBack: "Welcome Back",
      signInToContinue: "Sign in to your account to continue",
      joiningUs: "Join us today and get started in minutes",
      passwordsDoNotMatch: "Passwords do not match!",
      passwordTooShort: "Password must be at least 6 characters long!",
      accountExists: "An account with this email already exists. Please sign in instead.",
      invalidCredentials: "Invalid email or password. Please try again.",
      somethingWentWrong: "Something went wrong. Please try again.",
      creatingAccount: "Creating Account...",
      signingIn: "Signing in...",
      accountType: "Account Type",
      individualUser: "Girl/Woman Job Seeker",
      governmentUser: "Government User",
    },
    roles: {
      user: "User",
      company: "Company",
      government: "Government",
      jobSeeker: "Job Seeker",
    },
    dashboard: {
      welcome: "Welcome",
      overview: "Overview",
      statistics: "Statistics",
      recentActivity: "Recent Activity",
      postedJobs: "Posted Jobs",
      applications: "Applications",
      aiScreening: "AI Screening",
      myApplications: "My Applications",
      availableJobs: "Available Jobs",
      jobPostings: "Job Postings",
      recruiters: "Recruiters",
      candidates: "Candidates",
    },
    jobs: {
      title: "Job Title",
      description: "Description",
      location: "Location",
      city: "City",
      region: "Region",
      country: "Country",
      salary: "Salary",
      salaryType: "Salary Type",
      type: "Job Type",
      requirements: "Requirements",
      education: "Education",
      experience: "Experience",
      vacancies: "Vacancies",
      category: "Category",
      deadline: "Deadline",
      status: "Status",
      postedDate: "Posted Date",
      postNewJob: "Post New Job",
      editJob: "Edit Job",
      deleteJob: "Delete Job",
      closeJob: "Close Job",
      activateJob: "Activate Job",
      draft: "Draft",
      active: "Active",
      closed: "Closed",
      fullTime: "Full Time",
      partTime: "Part Time",
      contract: "Contract",
      internship: "Internship",
      monthly: "Monthly",
      annual: "Annual",
      hourly: "Hourly",
    },
    applications: {
      title: "Applications",
      applicant: "Applicant",
      applicantName: "Applicant Name",
      applicantEmail: "Applicant Email",
      appliedDate: "Applied Date",
      status: "Status",
      pending: "Pending",
      reviewing: "Reviewing",
      accepted: "Accepted",
      rejected: "Rejected",
      viewCV: "View CV",
      review: "Review",
      noApplications: "No applications yet",
    },
    screening: {
      title: "AI Screening",
      screenAll: "Screen All Applications",
      ranking: "Ranking",
      score: "Score",
      matchPercentage: "Match Percentage",
      strengths: "Strengths",
      weaknesses: "Weaknesses",
      justification: "Justification",
      selectJob: "Select Job to Screen Candidates",
      noCandidates: "No candidates screened yet",
      screeningCandidates: "Screening candidates with AI...",
      refreshRankings: "Refresh Rankings",
      totalCandidates: "Total Candidates",
      averageScore: "Average Score",
      topScore: "Top Score",
      lowestScore: "Lowest Score",
      highlyRecommended: "Highly Recommended",
      strongMatch: "Strong Match",
      goodMatch: "Good Match",
      moderateMatch: "Moderate Match",
      limitedMatch: "Limited Match",
    },
    profile: {
      personalInfo: "Personal Information",
      professionalInfo: "Professional Information",
      documents: "Documents",
      kycVerification: "KYC Verification",
      companyInfo: "Company Information",
      businessLicense: "Business License",
      editProfile: "Edit Profile",
      updateProfile: "Update Profile",
      saveChanges: "Save Changes",
    },
    home: {
      hero: {
        title: "Safe Digital Job Matching for Girls",
        subtitle: "Empowering Women Through Remote Work",
        description: "Connect with remote work opportunities from the safety of your home. Saba Match provides secure, verified job matching designed specifically for girls and women.",
        getStarted: "Get Started",
        learnMore: "Learn More",
        findDreamJob: "Find Your Dream Remote Job with",
        activeJobs: "Remote Jobs",
        companies: "Verified Companies",
        jobSeekers: "Girls & Women",
      },
      services: {
        title: "Our Services",
        subtitle: "Safe & Secure Job Matching for Girls",
        description: "Saba Match empowers girls and women with safe, verified remote work opportunities. Our platform prioritizes digital safety, privacy protection, and work-from-home flexibility to create a secure environment for professional growth.",
        aiRecruitment: "Digital Safety First",
        aiRecruitmentDesc: "Our platform is built with digital safety at its core. We verify all companies, protect your personal information, and ensure secure communication channels so you can apply with confidence from home.",
        candidateIntelligence: "Remote Work Focus",
        candidateIntelligenceDesc: "All opportunities are remote-friendly, allowing you to work from the safety and comfort of your home. No need to travel or meet in person until you're ready and comfortable.",
        engagementHub: "Safe Communication",
        engagementHubDesc: "Secure messaging and verified company profiles ensure your interactions remain safe and professional. We monitor and protect against harassment and inappropriate behavior.",
        keyFeatures: "Key Features",
        resumeScreening: "Safe Profile Building",
        resumeScreeningDesc: "Create your professional profile with privacy controls. Share only what you're comfortable with, and we protect your personal information.",
        candidateMatching: "Smart Job Matching",
        candidateMatchingDesc: "AI-powered matching connects you with opportunities that fit your skills, preferences, and remote work needs.",
        interviewScheduling: "Virtual Interviews",
        interviewSchedulingDesc: "Schedule and conduct interviews safely from home through our secure video platform with built-in safety features.",
      },
      about: {
        title: "About Saba Match",
        description: "Saba Match is a safe, secure platform designed specifically for girls and women to find remote work opportunities. We prioritize digital safety, privacy protection, and empowering women to build their careers from home.",
        mission: "Our Mission",
        missionDesc1: "To create a safe digital space where girls and women can confidently apply for remote jobs without fear of harassment, discrimination, or safety concerns. We believe every girl deserves equal opportunities to build her career from the safety of her home.",
        missionDesc2: "Through our secure platform, we're addressing Technology-Facilitated Gender-Based Violence (TFGBV) by providing verified companies, safe communication channels, and digital safety features that protect our users throughout their job search journey.",
        values: "Our Values",
        innovation: "Digital Safety Innovation",
        innovationDesc: "We use cutting-edge technology to create innovative safety features including company verification, secure messaging, harassment detection, and privacy protection.",
        fairness: "Gender Equality",
        fairnessDesc: "Committed to eliminating gender bias and ensuring equal opportunities for girls and women. We actively work to create a bias-free matching system that values skills over gender.",
        transparency: "Transparency & Trust",
        transparencyDesc: "Building trust through transparent processes, verified company profiles, clear safety policies, and honest communication about how we protect your data and privacy.",
        poweredBy: "Powered by Safety-First Technology",
        machineLearning: "Safe Matching AI",
        machineLearningDesc: "Our AI algorithms prioritize safety and match quality, learning from successful placements while filtering out potentially unsafe opportunities.",
        nlp: "Privacy-Preserving Analysis",
        nlpDesc: "Advanced technology analyzes your skills and preferences while protecting your personal information. Your data stays private and secure.",
        biasDetection: "Harassment & Bias Detection",
        biasDetectionDesc: "Built-in systems detect and prevent harassment, inappropriate behavior, and gender bias to ensure a safe environment for all users.",
        predictiveAnalytics: "Safety Analytics",
        predictiveAnalyticsDesc: "Data-driven insights help identify safe opportunities and protect users from potentially harmful situations while matching them with the best remote work options.",
      },
      contact: {
        title: "Get in Touch",
        description: "Email will be used to give you news and great deals",
        name: "Name",
        email: "Email",
        phone: "Phone",
        phoneNumber: "Phone number",
        howDidYouFindUs: "How did you find us?",
        send: "SEND",
        google: "Google",
        socialMedia: "Social Media",
        friend: "Friend",
        other: "Other",
        phoneLabel: "PHONE",
        faxLabel: "FAX",
        emailLabel: "EMAIL",
      },
    },
    messages: {
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Info",
      jobCreated: "Job created successfully!",
      jobUpdated: "Job updated successfully!",
      jobDeleted: "Job deleted successfully!",
      profileUpdated: "Profile updated successfully!",
      applicationSubmitted: "Application submitted successfully!",
    },
    dashboardStrings: {
      welcomeBack: "Welcome back!",
      recruitmentJourney: "Here's your recruitment journey.",
      completeProfile: "Complete Your Profile",
      completeProfileDesc: "Add your skills, experience, and documents to get better job matches",
      searchForJob: "Search for job",
      viewDetails: "View Details",
      applyNow: "Apply Now",
      allJobs: "All Jobs",
      savedJobs: "Saved Jobs",
      vacancy: "Vacancy",
      vacancies: "Vacancies",
    },
  },
  am: {
    nav: {
      home: "መነሻ",
      about: "ስለእኛ",
      services: "አገልግሎቶች",
      contact: "እውቂያ",
      signup: "ተመዝግብ",
      signin: "ግባ",
      dashboard: "ዳሽቦርድ",
      profile: "መገለጫ",
      logout: "ውጣ",
    },
    common: {
      loading: "በመጫን ላይ...",
      save: "አስቀምጥ",
      cancel: "ይቅር",
      delete: "ሰርዝ",
      edit: "አርም",
      create: "ፍጠር",
      update: "አዘምን",
      close: "ዝጋ",
      search: "ፈልግ",
      filter: "አጣራ",
      submit: "ይላክ",
      back: "ተመለስ",
      next: "ቀጣይ",
      previous: "ያለፈ",
      view: "አየ",
      select: "ምረጥ",
      upload: "ስቀል",
      download: "አውርድ",
      confirm: "አረጋግጥ",
      yes: "አዎ",
      no: "አይ",
      all: "ሁሉም",
      and: "እና",
      manage: "አስተዳድር",
      available: "ይገኛል",
      notAvailable: "አይገኝም",
    },
    auth: {
      signIn: "ግባ",
      signUp: "ተመዝግብ",
      signOut: "ውጣ",
      email: "ኢሜይል",
      password: "የይለፍ ቃል",
      confirmPassword: "የይለፍ ቃል አረጋግጥ",
      fullName: "ሙሉ ስም",
      role: "ተውኔት",
      forgotPassword: "የይለፍ ቃልህን ረስተዋል?",
      rememberMe: "አስታውሰኝ",
      alreadyHaveAccount: "አስቀድሜ አካውንት አለህ?",
      dontHaveAccount: "አካውንት የሎትህም?",
      createAccount: "አካውንት ፍጠር",
      loginSuccess: "በተሳካ ሁኔታ ገብተዋል!",
      loginFailed: "መግቢያ አልተሳካም። ምስክር ሰነድህን አረጋግጥ።",
      registerSuccess: "ምዝገባ በተሳካ ሁኔታ ተጠናቋል!",
      registerFailed: "ምዝገባ አልተሳካም። እባክህ ዳግም ሞክር።",
      welcomeBack: "እንኳን ደህና መጣህ",
      signInToContinue: "ለመቀጠል ወደ አካውንትህ ግባ",
      joiningUs: "ዛሬ ይቀላቀሉን እና በደቂቃዎች ውስጥ ይጀምሩ",
      passwordsDoNotMatch: "የይለፍ ቃላት አይዛመዱም!",
      passwordTooShort: "የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት!",
      accountExists: "በዚህ ኢሜይል አካውንት አስቀድሞ አለ። እባክህ ይልቅ ግባ።",
      invalidCredentials: "የማያሻማ ኢሜይል ወይም የይለፍ ቃል። እባክህ ዳግም ሞክር።",
      somethingWentWrong: "ስህተት ተፈጥሯል። እባክህ ዳግም ሞክር።",
      creatingAccount: "አካውንት በመፍጠር ላይ...",
      signingIn: "በመግባት ላይ...",
      accountType: "የአካውንት አይነት",
      individualUser: "ሴት/ሴት ስራ ፈላጊ",
      governmentUser: "መንግስት ተጠቃሚ",
    },
    roles: {
      user: "ተጠቃሚ",
      company: "ኩባንያ",
      government: "መንግስት",
      jobSeeker: "ስራ ፈላጊ",
    },
    dashboard: {
      welcome: "እንኳን ደህና መጣህ",
      overview: "አጠቃላይ እይታ",
      statistics: "ስታትስቲክስ",
      recentActivity: "የቅርብ ጊዜ እንቅስቃሴ",
      postedJobs: "የተለጠፉ ስራዎች",
      applications: "ምዝገባዎች",
      aiScreening: "አንግበር ማስረጃ AI",
      myApplications: "የእኔ ምዝገባዎች",
      availableJobs: "የሚገኙ ስራዎች",
      jobPostings: "የስራ ማስታወሻዎች",
      recruiters: "ሰራተኞች",
      candidates: "መመየጫዎች",
    },
    jobs: {
      title: "የስራ መለያ",
      description: "መግለጫ",
      location: "አካባቢ",
      city: "ከተማ",
      region: "ክልል",
      country: "አገር",
      salary: "ደመወዝ",
      salaryType: "የደመወዝ አይነት",
      type: "የስራ አይነት",
      requirements: "ምግብሮች",
      education: "ትምህርት",
      experience: "እውቀት",
      vacancies: "የሚያገለግሉ ቦታዎች",
      category: "መስመር",
      deadline: "መጨረሻ ቀን",
      status: "ሁኔታ",
      postedDate: "የተለጠፈበት ቀን",
      postNewJob: "አዲስ ስራ ለጥፍ",
      editJob: "ስራን አርም",
      deleteJob: "ስራን ሰርዝ",
      closeJob: "ስራን ዝጋ",
      activateJob: "ስራን አግብር",
      draft: "አስተናጋጅ",
      active: "ንቁ",
      closed: "ዝጋታ",
      fullTime: "ሙሉ ጊዜ",
      partTime: "ከፊል ጊዜ",
      contract: "ውል",
      internship: "መልሚያ",
      monthly: "ወራማዊ",
      annual: "ዓመታዊ",
      hourly: "በሰዓት",
    },
    applications: {
      title: "ምዝገባዎች",
      applicant: "መመየጫ",
      applicantName: "የመመየጫ ስም",
      applicantEmail: "የመመየጫ ኢሜይል",
      appliedDate: "የተመዘገበበት ቀን",
      status: "ሁኔታ",
      pending: "በመጠባበቅ ላይ",
      reviewing: "በመገምገም ላይ",
      accepted: "ተቀባይነት አግኝቷል",
      rejected: "ተቀባይነት አላገኘም",
      viewCV: "CV አየ",
      review: "ገምግም",
      noApplications: "እስካሁን ምዝገባዎች የሉም",
    },
    screening: {
      title: "አንግበር ማስረጃ AI",
      screenAll: "ሁሉንም ምዝገባዎች ደረጃ አድርግ",
      ranking: "ደረጃ",
      score: "ውጤት",
      matchPercentage: "የሚመሳሰል መቶኛ",
      strengths: "ጥንካሬዎች",
      weaknesses: "ድክመቶች",
      justification: "መግለጫ",
      selectJob: "መመየጫዎችን ለመመልከት ስራ ይምረጡ",
      noCandidates: "እስካሁን መመየጫዎች አልተመረመሩም",
      screeningCandidates: "መመየጫዎችን በAI መመልከት...",
      refreshRankings: "ደረጃዎችን አድስ",
      totalCandidates: "አጠቃላይ መመየጫዎች",
      averageScore: "አማካይ ውጤት",
      topScore: "ከፍተኛ ውጤት",
      lowestScore: "ዝቅተኛ ውጤት",
      highlyRecommended: "በብዛት ይመከራል",
      strongMatch: "ጠንካራ መዛመጃ",
      goodMatch: "ጥሩ መዛመጃ",
      moderateMatch: "መጠነኛ መዛመጃ",
      limitedMatch: "የተገደበ መዛመጃ",
    },
    profile: {
      personalInfo: "የግል መረጃ",
      professionalInfo: "የሙያ መረጃ",
      documents: "ሰነዶች",
      kycVerification: "KYC ማረጋገጥ",
      companyInfo: "የኩባንያ መረጃ",
      businessLicense: "የንግድ ፈቃድ",
      editProfile: "መገለጫ አርም",
      updateProfile: "መገለጫ አዘምን",
      saveChanges: "ለውጦችን አስቀምጥ",
    },
    home: {
      hero: {
        title: "ለሴቶች ደህንነት ያለው ዲጂታል የስራ መዛመጃ",
        subtitle: "ሴቶችን በሩቁ ስራ በማበረታታት",
        description: "ከቤትዎ ደህንነት ጋር ሩቅ የስራ እድሎችን ያገናኙ። ሳባ ማች ለሴቶች እና ሴቶች የተዘጋጀ ደህንነት ያለው፣ የተረጋገጠ የስራ መዛመጃ መድረክ ያቀርባል።",
        getStarted: "ጀምር",
        learnMore: "ተጨማሪ ይመልከቱ",
        findDreamJob: "የእርስዎን ሕልም ሩቅ ስራ ያግኙ",
        activeJobs: "ሩቅ ስራዎች",
        companies: "የተረጋገጡ ኩባንያዎች",
        jobSeekers: "ሴቶች እና ሴቶች",
      },
      services: {
        title: "አገልግሎቶቻችን",
        subtitle: "ለሴቶች ደህንነት ያለው እና ደህንነት ያለው የስራ መዛመጃ",
        description: "ሳባ ማች ሴቶችን እና ሴቶችን ደህንነት ያለው፣ የተረጋገጠ ሩቅ የስራ እድሎች ያቀርባል። መድረካችን ዲጂታል ደህንነት፣ የግላዊነት ጥበቃ እና ከቤት ስራ ተለዋዋጭነትን ያስቀድማል ለሴቶች ደህንነት ያለው ሁኔታ ለሙያዊ እድገት ለመፍጠር።",
        aiRecruitment: "ዲጂታል ደህንነት በመጀመሪያ",
        aiRecruitmentDesc: "መድረካችን ዲጂታል ደህንነትን በመሠረቱ ተገንብቷል። ሁሉንም ኩባንያዎች እናረጋግጣለን፣ የግላዊ መረጃዎን እንጠብቃለን እና ደህንነት ያለው የግንኙነት ሰርጦችን እናረጋግጣለን ከቤትዎ በአስተማማኝነት ለመመዘግብ ይችላሉ።",
        candidateIntelligence: "ሩቅ ስራ ትኩረት",
        candidateIntelligenceDesc: "ሁሉም እድሎች ሩቅ-ጓደኛ ናቸው፣ ከቤትዎ ደህንነት እና አመቺነት ለመሥራት ያስችልዎታል። መጓዝ ወይም በአካል መገናኘት አያስፈልግም እስከሚደርሱ እና ምቹ እስከሚሆኑ ድረስ።",
        engagementHub: "ደህንነት ያለው ግንኙነት",
        engagementHubDesc: "ደህንነት ያለው መልዕክት ማስተላለፍ እና የተረጋገጡ የኩባንያ መገለጫዎች ግንኙነቶችዎ ደህንነት ያለው እና ሙያዊ እንዲሆኑ ያረጋግጣሉ። አስጸያፊ እና ተገቢ ያልሆነ ባህሪን እንከታተላለን እና እንጠብቃለን።",
        keyFeatures: "ዋና ባህሪያት",
        resumeScreening: "ደህንነት ያለው መገለጫ ግንባታ",
        resumeScreeningDesc: "የግላዊነት መቆጣጠሪያዎች ጋር ሙያዊ መገለጫዎን ይፍጠሩ። በአስተማማኝነት ምን ማጋራት እንደሚፈልጉ ይምረጡ፣ እና የግላዊ መረጃዎን እንጠብቃለን።",
        candidateMatching: "አስተዋይ የስራ መዛመጃ",
        candidateMatchingDesc: "ችሎታዎችዎን፣ ምርጫዎችዎን እና ሩቅ የስራ ፍላጎቶችዎን የሚያሟሉ እድሎችን የሚያገናኝ በAI የተመሰረተ መዛመጃ።",
        interviewScheduling: "ምናባዊ ቃለ-መጠይቆች",
        interviewSchedulingDesc: "ከቤትዎ በአስተማማኝነት በአስተማማኝ የቪዲዮ መድረካችን በተገነቡ ደህንነት ባህሪያት ቃለ-መጠይቆችን ያስተካክሉ እና ያካሂዱ።",
      },
      about: {
        title: "ስለ ሳባ ማች",
        description: "ሳባ ማች ሴቶች እና ሴቶች ሩቅ የስራ እድሎችን ለማግኘት የተዘጋጀ ደህንነት ያለው፣ ደህንነት ያለው መድረክ ነው። ዲጂታል ደህንነት፣ የግላዊነት ጥበቃ እና ሴቶችን ከቤት ሙያዊ ሥራ ለመገንባት እናስቀድማለን።",
        mission: "የእኛ ተልእኮ",
        missionDesc1: "ሴቶች እና ሴቶች አስጸያፊ ባህሪ፣ አድሎዎ ወይም ደህንነት ስጋቶች ሳይጨነቁ በአስተማማኝነት ሩቅ ስራዎችን ለመመዘግብ የሚችሉበት ደህንነት ያለው ዲጂታል ቦታ ለመፍጠር። እያንዳንዱ ሴት ከቤትዋ ደህንነት ጋር ሙያዊ ሥራዋን ለመገንባት እኩል እድል ሊያገኝ ይገባል እናም እናምናለን።",
        missionDesc2: "በአስተማማኝ መድረካችን በኩል፣ የቴክኖሎጂ-ተጎሳቆለ የጾታ ላይ የተመሰረተ ጥቃት (TFGBV) እያነጋገርን እንደሆነ በማረጋገጥ ኩባንያዎች፣ ደህንነት ያለው የግንኙነት ሰርጦች እና በሙሉ የስራ ፍለጋ ጉዞዎ ወቅት አጠቃቀሞችን የሚጠብቁ ዲጂታል ደህንነት ባህሪያት እናቀርባለን።",
        values: "የእኛ እሴቶች",
        innovation: "ዲጂታል ደህንነት ፈጠራ",
        innovationDesc: "ኩባንያ ማረጋገጥ፣ ደህንነት ያለው መልዕክት ማስተላለፍ፣ አስጸያፊ ባህሪ ማግኘት እና የግላዊነት ጥበቃን ጨምሮ የፈጠራ ደህንነት ባህሪያትን ለመፍጠር የላቀ ቴክኖሎጂን እንጠቀማለን።",
        fairness: "የጾታ እኩልነት",
        fairnessDesc: "የጾታ አድሎዎን ለማስወገድ እና ሴቶች እና ሴቶች እኩል እድሎችን ለማረጋገጥ ቁርጠኛ ነን። ችሎታዎችን ከጾታ በላይ የሚያስቀድም የመዛመጃ ስርዓት ለመፍጠር በንቃት እንሠራለን።",
        transparency: "ግልጽነት እና እምነት",
        transparencyDesc: "ግልጽ ሂደቶች፣ የተረጋገጡ የኩባንያ መገለጫዎች፣ ግልጽ የደህንነት ፖሊሲዎች እና ውሂብዎን እና የግላዊነትዎን እንዴት እንጠብቃለን በተመለከተ ሚጋራ ግንኙነት በመገንባት እምነትን እንገነባለን።",
        poweredBy: "በደህንነት-መጀመሪያ ቴክኖሎጂ የተመራ",
        machineLearning: "ደህንነት ያለው የመዛመጃ AI",
        machineLearningDesc: "የእኛ AI ስልተ-ቀመሮች ደህንነትን እና የመዛመጃ ጥራትን ያስቀድማሉ፣ ከተሳኩ አቀማመጦች በመማር በተመሳሳይ ጊዜ በአቅም አልባ አደጋ ውስጥ የሚገቡ እድሎችን ያጣራሉ።",
        nlp: "የግላዊነት ጥበቃ ትንተና",
        nlpDesc: "የላቀ ቴክኖሎጂ ችሎታዎችዎን እና ምርጫዎችዎን ይገምግማል በተመሳሳይ ጊዜ የግላዊ መረጃዎን ይጠብቃል። ውሂብዎ የግላዊ እና ደህንነት ያለው ይቆያል።",
        biasDetection: "አስጸያፊ ባህሪ እና አድሎዎ ማግኘት",
        biasDetectionDesc: "የተገነቡ ስርዓቶች አስጸያፊ ባህሪ፣ ተገቢ ያልሆነ ባህሪ እና የጾታ አድሎዎን ይለያሉ እና ይከለክላሉ ለሁሉም ተጠቃሚዎች ደህንነት ያለው ሁኔታ ለማረጋገጥ።",
        predictiveAnalytics: "ደህንነት ትንታኔ",
        predictiveAnalyticsDesc: "በውሂብ የተመሰረቱ ግንዛቤዎች ደህንነት ያላቸውን እድሎችን ለመለየት እና በአቅም አልባ አደጋ ውስጥ የሚገቡ ሁኔታዎችን ለመከላከል ረዳት ሲሆኑ በተመሳሳይ ጊዜ ከፍተኛውን ሩቅ የስራ አማራጮችን ያዛምዳሉ።",
      },
      contact: {
        title: "እውቂያ",
        description: "ኢሜይል ወሬዎችን እና ጥሩ ጥቅሞችን ለመስጠት ይጠቀማል",
        name: "ስም",
        email: "ኢሜይል",
        phone: "ስልክ",
        phoneNumber: "የስልክ ቁጥር",
        howDidYouFindUs: "እኛን እንዴት አገኙን?",
        send: "ላክ",
        google: "ጉግል",
        socialMedia: "ማህበራዊ ሚዲያ",
        friend: "ጓደኛ",
        other: "ሌላ",
        phoneLabel: "ስልክ",
        faxLabel: "ፋክስ",
        emailLabel: "ኢሜይል",
      },
    },
    messages: {
      success: "ተሳክቷል",
      error: "ስህተት",
      warning: "ማስጠንቀቂያ",
      info: "መረጃ",
      jobCreated: "ስራ በተሳካ ሁኔታ ተፈጥሯል!",
      jobUpdated: "ስራ በተሳካ ሁኔታ ተዘመነ!",
      jobDeleted: "ስራ በተሳካ ሁኔታ ተሰርዟል!",
      profileUpdated: "መገለጫ በተሳካ ሁኔታ ተዘመነ!",
      applicationSubmitted: "ምዝገባ በተሳካ ሁኔታ ቀርቧል!",
    },
    dashboardStrings: {
      welcomeBack: "እንኳን ደህና መጣህ!",
      recruitmentJourney: "የእርስዎ የስራ መመየጥ ጉዞ።",
      completeProfile: "መገለጫዎን ያጠናቅቁ",
      completeProfileDesc: "ችሎታዎችዎን፣ እውቀትዎን እና ሰነዶችዎን ያክሉ የተሻለ የስራ መዛመጃ ለማግኘት",
      searchForJob: "ስራ ፈልግ",
      viewDetails: "ዝርዝሮችን ይመልከቱ",
      applyNow: "አሁን ይመዘግቡ",
      allJobs: "ሁሉም ስራዎች",
      savedJobs: "የተቀመጡ ስራዎች",
      vacancy: "የሚያገለግል ቦታ",
      vacancies: "የሚያገለግሉ ቦታዎች",
    },
  },
};


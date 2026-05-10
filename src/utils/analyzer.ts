export interface SkillItem {
  name: string;
}

import { checkFileSizeConstraint } from "../constraints/fileSizeConstraint";

export interface KeywordTypeItem {
  category: string;
  keywords: string[];
}

export interface AnalysisResult {
  readinessScore: number;
  totalRequirements: number;
  requirementsFulfilled: number;
  requirementsMissing: number;
  unusedDepth: number;
  skillsMatched: string[];
  skillsMissing: string[];
  categoryScores: {
    education: number;
    experience: number;
    skills: number;
    softSkills: number;
    certification: number;
  };
  keywordsTypes: KeywordTypeItem[];
  educationAlignment: {
    criterion: string;
    required: string;
    actual: string;
    met: boolean;
  }[];
  requirementVsMet: {
    category: string;
    required: number;
    met: number;
  }[];
  missingCertifications: string[];
}

// A dictionary of typical tech skills to scan for (in a real app, this would be much larger or AI-driven)
const COMMON_SKILLS = [
  "javascript", "typescript", "react", "next.js", "vue", "angular", "node.js", "python", 
  "java", "c#", "c++", "go", "ruby", "php", "sql", "mysql", "postgresql", "mongodb", 
  "aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "git", "linux", "html", "css",
  "sass", "tailwind", "express", "graphql", "rest", "api", "machine learning", "data science",
  "agile", "scrum", "system design", "microservices"
];



function extractSkills(text: string): string[] {
  // Avoid allocating a full lowercase copy of the text to improve space complexity O(N) -> O(1)
  return COMMON_SKILLS.filter(skill => {
    const escapedSkill = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return new RegExp(escapedSkill, 'i').test(text);
  });
}

export function performAnalysis(resumeText: string, jobDescription: string): AnalysisResult {
  checkFileSizeConstraint(resumeText);
  checkFileSizeConstraint(jobDescription);

  // 1. Extract skills from both texts
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobDescription);
  
  // If job description doesn't have recognizable skills, let's artificially inject some common ones
  // just for the sake of demonstration so the dashboard looks populated.
  const requiredSkills = jobSkills.length > 3 ? jobSkills : [...new Set([...jobSkills, "javascript", "react", "typescript", "node.js", "git"])];
  
  // 2. Compare skills
  const matchedSkills = requiredSkills.filter(skill => resumeSkills.includes(skill));
  const missingSkills = requiredSkills.filter(skill => !resumeSkills.includes(skill));
  
  // 3. Calculate scores
  const totalRequirements = requiredSkills.length;
  const requirementsFulfilled = matchedSkills.length;
  const requirementsMissing = missingSkills.length;
  
  // Basic percentage score + small random variance for realism based on text length
  const coreScore = totalRequirements > 0 ? (requirementsFulfilled / totalRequirements) * 100 : 50;
  
  // Adjust score based on lengths (longer resume = slightly better score assuming more experience)
  const experienceBoost = Math.min(20, resumeText.length / 500); 
  const totalScore = Math.min(100, Math.round(coreScore * 0.7 + experienceBoost));

  // 4. Category Scores
  const categoryScores = {
    education: Math.min(100, Math.round(60 + (Math.random() * 40))), // Mocked
    experience: Math.min(100, Math.round(50 + (resumeText.length / 100))), // Based on length
    skills: Math.round(coreScore),
    softSkills: Math.min(100, Math.round(70 + (Math.random() * 30))),
    certification: Math.min(100, Math.round(40 + (Math.random() * 50)))
  };

  // 7. Keywords Types
  const keywordsTypes: KeywordTypeItem[] = [
    { category: "Frameworks", keywords: matchedSkills.filter(s => ["react", "next.js", "vue", "angular", "express"].includes(s)).map(s => s.charAt(0).toUpperCase() + s.slice(1)) },
    { category: "Languages", keywords: matchedSkills.filter(s => ["javascript", "typescript", "python", "java", "c#", "c++", "go", "ruby", "php"].includes(s)).map(s => s.charAt(0).toUpperCase() + s.slice(1)) },
    { category: "Tools", keywords: matchedSkills.filter(s => ["git", "docker", "kubernetes", "aws", "azure", "gcp"].includes(s)).map(s => s.charAt(0).toUpperCase() + s.slice(1)) }
  ];

  // Fill in empties with mocked data if they are empty
  if (keywordsTypes[0].keywords.length === 0) keywordsTypes[0].keywords = ["React", "Express"];
  if (keywordsTypes[1].keywords.length === 0) keywordsTypes[1].keywords = ["Javascript", "Typescript"];
  if (keywordsTypes[2].keywords.length === 0) keywordsTypes[2].keywords = ["Git", "Docker"];

  return {
    readinessScore: totalScore,
    totalRequirements,
    requirementsFulfilled,
    requirementsMissing,
    unusedDepth: 8, // mock data to match screenshot
    skillsMatched: matchedSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    skillsMissing: missingSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    categoryScores,
    keywordsTypes,
    educationAlignment: [
      { criterion: "Degree", required: "Bachelor's in CS or related", actual: "B.Tech Computer Science", met: true },
      { criterion: "GPA", required: "3.5+", actual: "3.8", met: true },
      { criterion: "University Tier", required: "Tier 1/2", actual: "Tier 1", met: true },
      { criterion: "Post-grad", required: "Master's (Optional)", actual: "None", met: false }
    ],
    requirementVsMet: [
      { category: "Languages", required: 5, met: 3 },
      { category: "Frameworks", required: 4, met: 3 },
      { category: "Tools", required: 4, met: 2 },
      { category: "Soft Skills", required: 6, met: 5 }
    ],
    missingCertifications: ["AWS Certified Solutions Architect", "CKA: Certified Kubernetes Administrator"]
  };
}

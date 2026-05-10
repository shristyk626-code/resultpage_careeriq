import { AnalysisResult } from "@/utils/analyzer";
import ReadinessScore from "./ReadinessScore";
import StatCards from "./StatCards";
import SkillMatch from "./SkillMatch";
import RadarChartReport from "./RadarChartReport";
import SkillCategoryCoverage from "./SkillCategoryCoverage";
import SkillsDonutChart from "./SkillsDonutChart";
import EducationAlignment from "./EducationAlignment";
import RequirementVsMetChart from "./RequirementVsMetChart";
import TopRecommendations from "./TopRecommendations";

export default function Dashboard({ result }: { result: AnalysisResult }) {
  // Calculate mock values for experience gap and education fit
  const experienceGap = Math.max(0, Math.round((100 - result.categoryScores.experience) / 20 * 10) / 10);
  const educationFitStr = `${result.categoryScores.education}%`;

  return (
    <div className="flex flex-col gap-5">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 480px) 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
        <ReadinessScore score={result.readinessScore} total={result.totalRequirements} success={result.requirementsFulfilled} gaps={result.requirementsMissing} />
        <div className="flex flex-col gap-5">
          <StatCards
            overallMatch={result.readinessScore}
            skillsMatched={result.requirementsFulfilled}
            experienceGap={experienceGap}
            educationFit={educationFitStr}
            missingKeywords={result.requirementsMissing}
          />
          <div style={{ flex: 1, minHeight: '350px' }}>
            <RadarChartReport scores={result.categoryScores} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
        <SkillMatch matchedSkills={result.skillsMatched} missingSkills={result.skillsMissing} />
        <SkillsDonutChart matched={result.requirementsFulfilled} missing={result.requirementsMissing} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <SkillCategoryCoverage scores={result.categoryScores} />
        <RequirementVsMetChart data={result.requirementVsMet} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <EducationAlignment alignment={result.educationAlignment} />
        <TopRecommendations missingSkills={result.skillsMissing} missingCertifications={result.missingCertifications} />
      </div>
    </div>
  );
}

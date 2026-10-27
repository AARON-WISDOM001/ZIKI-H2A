import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Users, 
  Target, 
  Code, 
  Layers, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { GoalId } from '../../../types/onboarding';

interface StepBContextFormProps {
  selectedGoal: GoalId;
  formData: Record<string, any>;
  onUpdateFormData: (data: Record<string, any>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export const StepBContextForm: React.FC<StepBContextFormProps> = ({
  selectedGoal,
  formData,
  onUpdateFormData,
  onBack,
  onSubmit,
  isGenerating
}) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (key: string, value: any) => {
    onUpdateFormData({
      ...formData,
      [key]: value
    });
    if (formErrors[key]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const loadExampleData = () => {
    switch (selectedGoal) {
      case 'security':
        onUpdateFormData({
          assetUrl: 'https://staging.acmecorp-saas.com',
          authorizationConfirmed: true,
          assessmentScope: 'Full Surface & OWASP Top 10',
          emergencyContact: 'devsecops@acmecorp.com'
        });
        break;
      case 'marketing':
        onUpdateFormData({
          websiteUrl: 'https://pulseanalytics.io',
          targetAudience: 'Engineering managers and technical founders',
          primaryGoal: 'Drive 500+ signups from organic search queries in Q4',
          brandVoice: 'Concise, authoritative, developer-first'
        });
        break;
      case 'build':
        onUpdateFormData({
          productIdea: 'Automated AI Documentation & Pull Request Review Copilot',
          targetUsers: 'Full-stack software engineers and open-source maintainers',
          essentialFeatures: 'GitHub Webhook listener, AST code parser, automated Markdown changelog generator',
          techStackPreference: 'TypeScript / React / Next.js'
        });
        break;
      case 'improve':
        onUpdateFormData({
          repoOrSiteUrl: 'https://github.com/acme/client-web-dashboard',
          issueDescription: 'Bundle size bloated by 4.2MB, causing slow mobile LCP and 3s render delay',
          desiredOutcome: 'Sub-1.2s LCP on mobile 4G and tree-shaken modern bundle imports',
          priorityLevel: 'High'
        });
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (selectedGoal === 'security') {
      if (!formData.assetUrl) errors.assetUrl = 'Target URL or asset hostname is required.';
      if (!formData.authorizationConfirmed) errors.authorizationConfirmed = 'You must confirm you are authorized to test this asset.';
    } else if (selectedGoal === 'marketing') {
      if (!formData.websiteUrl) errors.websiteUrl = 'Website URL is required.';
      if (!formData.targetAudience) errors.targetAudience = 'Target audience is required.';
      if (!formData.primaryGoal) errors.primaryGoal = 'Primary goal is required.';
    } else if (selectedGoal === 'build') {
      if (!formData.productIdea) errors.productIdea = 'Product idea summary is required.';
      if (!formData.targetUsers) errors.targetUsers = 'Target user definition is required.';
    } else if (selectedGoal === 'improve') {
      if (!formData.repoOrSiteUrl) errors.repoOrSiteUrl = 'Repository or site URL is required.';
      if (!formData.issueDescription) errors.issueDescription = 'Issue description is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSubmit();
  };

  return (
    <form data-testid="context-form" onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-1.5">
            <span>Step 2 of 5</span>
            <span>·</span>
            <span>Provide Relevant Context</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {selectedGoal === 'security' && 'Define Your Security Scope'}
            {selectedGoal === 'marketing' && 'Define Your Marketing & SEO Objectives'}
            {selectedGoal === 'build' && 'Specify Your Product Concept'}
            {selectedGoal === 'improve' && 'Describe Your Optimization Target'}
          </h2>
        </div>

        <button
          type="button"
          onClick={loadExampleData}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Pre-fill Example Data</span>
        </button>
      </div>

      {/* Goal-Specific Short Forms */}
      <div className="space-y-5">
        
        {/* ================= WEBSITE SECURITY FORM ================= */}
        {selectedGoal === 'security' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Target Asset URL or Hostname <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="https://app.yourdomain.com or api.yourdomain.com"
                  value={formData.assetUrl || ''}
                  onChange={(e) => handleFieldChange('assetUrl', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                />
              </div>
              {formErrors.assetUrl && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.assetUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Assessment Scope & Methodology
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Full Surface & OWASP Top 10',
                  'API & Auth Flow Focus',
                  'Compliance & Dependency Scan',
                  'Cloud Infra & Network'
                ].map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => handleFieldChange('assessmentScope', scope)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      (formData.assessmentScope || 'Full Surface & OWASP Top 10') === scope
                        ? 'bg-blue-600/20 border-blue-400/60 text-white shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                        : 'bg-[#0b1329] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Emergency Alert / Contact Email
              </label>
              <input
                type="email"
                placeholder="security-oncall@yourdomain.com"
                value={formData.emergencyContact || ''}
                onChange={(e) => handleFieldChange('emergencyContact', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex items-start gap-3">
              <input
                id="auth-check"
                type="checkbox"
                checked={!!formData.authorizationConfirmed}
                onChange={(e) => handleFieldChange('authorizationConfirmed', e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="auth-check" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                <span className="font-semibold text-white block">Authorization Confirmation</span>
                I attest that our organization owns or holds explicit authorization to execute non-destructive diagnostic assessments against this target.
              </label>
            </div>
            {formErrors.authorizationConfirmed && (
              <p className="text-rose-400 text-xs mt-1">{formErrors.authorizationConfirmed}</p>
            )}
          </>
        )}

        {/* ================= MARKETING & SEO FORM ================= */}
        {selectedGoal === 'marketing' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Website or Landing Page URL <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="https://yourproduct.com"
                  value={formData.websiteUrl || ''}
                  onChange={(e) => handleFieldChange('websiteUrl', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
              {formErrors.websiteUrl && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.websiteUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Target Audience & Ideal Customer Persona <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Series-A CTOs, DevOps engineers, SMB founders"
                  value={formData.targetAudience || ''}
                  onChange={(e) => handleFieldChange('targetAudience', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              {formErrors.targetAudience && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.targetAudience}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Primary Business Goal & Metric <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. 40% growth in organic qualified leads; rank Top 3 for key terms"
                  value={formData.primaryGoal || ''}
                  onChange={(e) => handleFieldChange('primaryGoal', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              {formErrors.primaryGoal && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.primaryGoal}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Brand Tone & Voice Guidelines (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Pragmatic, approachable, engineering-focused"
                value={formData.brandVoice || ''}
                onChange={(e) => handleFieldChange('brandVoice', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </>
        )}

        {/* ================= BUILD A PRODUCT FORM ================= */}
        {selectedGoal === 'build' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Product Idea Summary <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="What is your product vision, and what primary problem does it solve?"
                value={formData.productIdea || ''}
                onChange={(e) => handleFieldChange('productIdea', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
              {formErrors.productIdea && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.productIdea}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Target Users & Customers <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Remote design agencies and cross-functional product squads"
                value={formData.targetUsers || ''}
                onChange={(e) => handleFieldChange('targetUsers', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
              {formErrors.targetUsers && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.targetUsers}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Essential MVP Features
              </label>
              <input
                type="text"
                placeholder="e.g. Real-time collaboration, canvas zoom, PDF export, SSO"
                value={formData.essentialFeatures || ''}
                onChange={(e) => handleFieldChange('essentialFeatures', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </>
        )}

        {/* ================= IMPROVE EXISTING PRODUCT FORM ================= */}
        {selectedGoal === 'improve' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Repository or Web Application URL <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="https://github.com/your-org/repo or https://staging.app.com"
                value={formData.repoOrSiteUrl || ''}
                onChange={(e) => handleFieldChange('repoOrSiteUrl', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 font-mono"
              />
              {formErrors.repoOrSiteUrl && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.repoOrSiteUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                Issue Description / Current Bottleneck <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe the bug, slow endpoint, or usability friction you want resolved..."
                value={formData.issueDescription || ''}
                onChange={(e) => handleFieldChange('issueDescription', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
              {formErrors.issueDescription && (
                <p className="text-rose-400 text-xs mt-1">{formErrors.issueDescription}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                  Desired Measurable Outcome
                </label>
                <input
                  type="text"
                  placeholder="e.g. Under 1.5s mobile LCP, 0 crash rate"
                  value={formData.desiredOutcome || ''}
                  onChange={(e) => handleFieldChange('desiredOutcome', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                  Resolution Priority
                </label>
                <select
                  value={formData.priorityLevel || 'High'}
                  onChange={(e) => handleFieldChange('priorityLevel', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1329] border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="High">High (Immediate sprint action)</option>
                  <option value="Medium">Medium (Scheduled milestone)</option>
                  <option value="Low">Low (Backlog refinement)</option>
                </select>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Goal</span>
        </button>

        <button
          type="submit"
          disabled={isGenerating}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-102 active:scale-98 disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Generating Project Brief...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Generate AI Project Brief</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </form>
  );
};


import React, { useState, useEffect } from 'react';
import { X, Sparkles, Shield, Bot, Layers, ArrowLeft } from 'lucide-react';
import { GoalId, OnboardingStep, ProjectBrief } from '../../types/onboarding';
import { generateInitialBrief } from '../../data/mockData';
import { StepAGoalSelection } from './steps/StepAGoalSelection';
import { StepBContextForm } from './steps/StepBContextForm';
import { StepCProjectBrief } from './steps/StepCProjectBrief';
import { StepDApprovalConfirmation } from './steps/StepDApprovalConfirmation';
import { StepEAgentSimulation } from './steps/StepEAgentSimulation';

interface GoalFirstModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGoal?: GoalId;
  onInitiativeCompleted?: (pointsAwarded: number) => void;
}

export const GoalFirstModal: React.FC<GoalFirstModalProps> = ({
  isOpen,
  onClose,
  initialGoal = 'security',
  onInitiativeCompleted
}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('step-a-goals');
  const [selectedGoal, setSelectedGoal] = useState<GoalId>(initialGoal);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [brief, setBrief] = useState<ProjectBrief | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  // Synchronize when initialGoal prop changes
  useEffect(() => {
    if (initialGoal) {
      setSelectedGoal(initialGoal);
    }
  }, [initialGoal]);

  // Handle keyboard ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Step transitions
  const handleProceedFromGoals = () => {
    setCurrentStep('step-b-context');
  };

  const handleContextSubmit = () => {
    setIsGeneratingBrief(true);
    // Subtle realistic generation delay
    setTimeout(() => {
      const generated = generateInitialBrief(selectedGoal, formData);
      setBrief(generated);
      setIsGeneratingBrief(false);
      setCurrentStep('step-c-brief');
    }, 600);
  };

  const handleApprovePlan = () => {
    setIsApproved(true);
    setCurrentStep('step-d-approval');
  };

  const handleProceedToCollaboration = () => {
    setCurrentStep('step-e-collaboration');
  };

  const handleSimulationDone = () => {
    if (onInitiativeCompleted) {
      onInitiativeCompleted(500);
    }
    onClose();
  };

  const handleRestartOnboarding = () => {
    setCurrentStep('step-a-goals');
    setFormData({});
    setBrief(null);
    setIsApproved(false);
  };

  const stepNumbers: { id: OnboardingStep; label: string }[] = [
    { id: 'step-a-goals', label: '1. Goal' },
    { id: 'step-b-context', label: '2. Context' },
    { id: 'step-c-brief', label: '3. Brief' },
    { id: 'step-d-approval', label: '4. Approval' },
    { id: 'step-e-collaboration', label: '5. Simulation' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#070c18] border border-blue-500/30 shadow-[0_0_60px_rgba(37,99,235,0.2)] overflow-hidden flex flex-col max-h-[92vh]"
      >
        
        {/* Top Header & Step Progress Bar */}
        <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span id="onboarding-title" className="text-xs font-bold font-mono tracking-wider text-cyan-300 uppercase block">
                Ziki Human-Agent Onboarding
              </span>
              <span className="text-[11px] text-slate-400">
                Goal-First Collaborative Project Planner
              </span>
            </div>
          </div>

          {/* Stepper Navigation Indicator */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono">
            {stepNumbers.map((s, idx) => {
              const isActive = currentStep === s.id;
              const isPast = stepNumbers.findIndex((x) => x.id === currentStep) > idx;
              return (
                <div key={s.id} className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : isPast
                        ? 'bg-slate-800 text-slate-300 font-medium'
                        : 'text-slate-600'
                    }`}
                  >
                    {s.label}
                  </span>
                  {idx < stepNumbers.length - 1 && (
                    <span className="text-slate-700 text-xs">→</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {currentStep === 'step-a-goals' && (
            <StepAGoalSelection
              selectedGoal={selectedGoal}
              onSelectGoal={(g) => setSelectedGoal(g)}
              onNext={handleProceedFromGoals}
            />
          )}

          {currentStep === 'step-b-context' && (
            <StepBContextForm
              selectedGoal={selectedGoal}
              formData={formData}
              onUpdateFormData={(d) => setFormData(d)}
              onBack={() => setCurrentStep('step-a-goals')}
              onSubmit={handleContextSubmit}
              isGenerating={isGeneratingBrief}
            />
          )}

          {currentStep === 'step-c-brief' && brief && (
            <StepCProjectBrief
              brief={brief}
              onUpdateBrief={(b) => setBrief(b)}
              onBackToContext={() => setCurrentStep('step-b-context')}
              onApprovePlan={handleApprovePlan}
              isApproved={isApproved}
            />
          )}

          {currentStep === 'step-d-approval' && brief && (
            <StepDApprovalConfirmation
              brief={brief}
              onProceedToCollaboration={handleProceedToCollaboration}
              onBackToBrief={() => setCurrentStep('step-c-brief')}
            />
          )}

          {currentStep === 'step-e-collaboration' && brief && (
            <StepEAgentSimulation
              brief={brief}
              onCompleteSimulation={handleSimulationDone}
              onRestartOnboarding={handleRestartOnboarding}
            />
          )}

        </div>

      </div>
    </div>
  );
};


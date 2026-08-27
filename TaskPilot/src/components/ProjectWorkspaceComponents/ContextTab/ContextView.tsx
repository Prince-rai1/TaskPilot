import ContextSection from './ContextSection';
import GoalList from './GoalList';
import type { ContextData } from './ProjectContextMain';

interface ContextViewProps {
  data: ContextData;
}

function ContextView({ data }: ContextViewProps) {
  return (
    <>
      <ContextSection title="What are we building?">
        {data.what || <span className="tf-context-empty">No description provided.</span>}
      </ContextSection>

      <ContextSection title="Why are we building it?">
        {data.why || <span className="tf-context-empty">No description provided.</span>}
      </ContextSection>

      <ContextSection title="How are we going to build it?">
        {data.how || <span className="tf-context-empty">No description provided.</span>}
      </ContextSection>

      <ContextSection title="Project Goals">
        <GoalList goals={data.goals} />
      </ContextSection>

      <ContextSection title="Expected Outcome">
        {data.expectedOutcome || <span className="tf-context-empty">No outcome provided.</span>}
      </ContextSection>
    </>
  );
}

export default ContextView;

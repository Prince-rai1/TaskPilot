export interface WorkflowStatus {
  id: string;
  name: string;
  color: string;
  category: 'To Do' | 'In Progress' | 'Done';
  isInitial: boolean;
  isCompletion: boolean;
}

export interface WorkflowTransition {
  id: string;
  fromId: string;
  toId: string;
  name: string;
}

export interface ProjectConfig {
  name: string;
  key: string;
  icon: string;
  description: string;
  category: string;

  // Context fields
  contextWhat: string;
  contextWhy: string;
  contextHow: string;
  goals: string[];
  expectedOutcome: string;

  projectType: string;

  projectLeadId: string;
  teamMemberIds: string[];
  memberRoles: Record<string, string>; // Maps userId to Role name
  accessLevel: 'Private' | 'Team' | 'Organization';
  defaultRole: string;

  workflow: WorkflowStatus[];
  transitions: WorkflowTransition[];

  issueTypes: string[];
  priorities: string[];
  components: string[];
  defaultLabels: string[];
}

export const initialProjectConfig: ProjectConfig = {
  name: '',
  key: '',
  icon: 'layout',
  description: '',
  category: '',

  contextWhat: '',
  contextWhy: '',
  contextHow: '',
  goals: [],
  expectedOutcome: '',

  projectType: 'Software',

  projectLeadId: '',
  teamMemberIds: [],
  memberRoles: {},
  accessLevel: 'Team',
  defaultRole: 'Developer',

  workflow: [
    { id: 'status-1', name: 'To Do', color: 'slate', category: 'To Do', isInitial: true, isCompletion: false },
    { id: 'status-2', name: 'In Progress', color: 'blue', category: 'In Progress', isInitial: false, isCompletion: false },
    { id: 'status-3', name: 'Done', color: 'green', category: 'Done', isInitial: false, isCompletion: true }
  ],
  transitions: [
    { id: 'trans-1', fromId: 'status-1', toId: 'status-2', name: 'Start Progress' },
    { id: 'trans-2', fromId: 'status-2', toId: 'status-3', name: 'Done' }
  ],

  issueTypes: ['Task', 'Story', 'Bug'],
  priorities: ['Medium'],
  components: [],
  defaultLabels: []
};

export interface WizardStepProps {
  config: ProjectConfig;
  updateConfig: (updates: Partial<ProjectConfig>) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}

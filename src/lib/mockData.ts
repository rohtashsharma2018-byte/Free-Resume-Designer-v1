import { ResumeData } from '../types';

export function getDemoResume(): ResumeData {
  return {
    id: 'sample-john-doe',
    title: 'Senior Cloud Architect Resume',
    templateId: 'modern-minimal',
    primaryColor: '#6366f1', // Indigo-500
    fontSize: 'base',
    fontFamily: 'sans',
    personalInfo: {
      fullName: 'Eleanor Vance',
      jobTitle: 'Senior Infrastructure Architect',
      email: 'eleanor@vance.io',
      phone: '+1 (415) 555-0199',
      location: 'San Francisco, CA (Remote)',
      nationality: 'US Citizen',
      gender: 'Female',
      website: 'vance-eleanor.com',
      linkedin: 'linkedin.com/in/eleanorv',
      github: 'github.com/eleanor-git',
      bio: 'Staff Level Infrastructure Engineer with 8+ years designing scalable cloud-native architectures, distributed storage systems, and self-healing CI/CD networks. Proven expert at diagnosing complex container orchestration overhead to drive 40% compute optimizations.',
      photoUrl: '' // Empty by default so they can upload theirs, or can remain blank stably
    },
    education: [
      {
        id: 'edu-1',
        institution: 'Stanford University',
        degree: 'Master of Science (M.S.)',
        fieldOfStudy: 'Computer Science & Distributed Systems',
        location: 'Stanford, CA',
        startDate: 'Sep 2017',
        endDate: 'Jun 2019',
        currentlyStudying: false,
        description: 'Completed thesis focused on high-throughput gossip consensus nodes. Grade average: 3.9 GPA.'
      },
      {
        id: 'edu-2',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science (B.S.)',
        fieldOfStudy: 'Software Engineering',
        location: 'Berkeley, CA',
        startDate: 'Sep 2013',
        endDate: 'May 2017',
        currentlyStudying: false,
        description: 'Summa Cum Laude Honors. Regulated peer mentoring workspace leads.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Stripe, Inc.',
        position: 'Staff Platform Architect',
        location: 'San Francisco, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        currentlyWorking: true,
        description: '• Architected next-generation global multi-region telemetry pipeline processing 40B+ daily transactional payloads.\n• Directed engineering migration from state-heavy networks to unified, immutable Terraform models, reducing provisioning drift incidents by 90%.\n• Pioneered container-density auto-scalers matching regional CPU load waves, saving $4.2M in annual public cloud compute expenditures.'
      },
      {
        id: 'exp-2',
        company: 'HashiCorp',
        position: 'Senior Systems Developer',
        location: 'Seattle, WA',
        startDate: 'Aug 2019',
        endDate: 'Dec 2021',
        currentlyWorking: false,
        description: '• Delivered core scheduler features inside HashiCorp Nomad, enhancing cluster stability overhead by 35%.\n• Managed cross-functional development across Vault secure transit key rings in GoLang and Rust.\n• Spearheaded high-fidelity performance metrics dashboards utilizing custom Grafana queries and PromQL stacks.'
      }
    ],
    skills: [
      {
        id: 'skill-1',
        name: 'Systems & Platforms',
        skills: ['Kubernetes', 'Docker', 'Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'HashiCorp Terraform', 'Linux Systems']
      },
      {
        id: 'skill-2',
        name: 'Languages & Engines',
        skills: ['TypeScript', 'GoLang', 'Python', 'Rust', 'SQL / PostgreSQL', 'Bash Scripting', 'GraphQL']
      },
      {
        id: 'skill-3',
        name: 'Operations & Monitoring',
        skills: ['Gossip Consensus Protocols', 'Prometheus & Grafana', 'CI/CD Pipelines (GitHub Actions)', 'GitOps (ArgoCD)', 'IAM Access Policies']
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Custom Paxos Consensus Module',
        role: 'Independent Creator',
        link: 'github.com/vance/consensus-paxos',
        startDate: 'Mar 2023',
        endDate: 'Oct 2023',
        isCurrent: false,
        description: 'Engineered a highly stable, non-blocking Paxos distributed consensus framework in pure Rust. Capable of processing 12k raft proposals per second with precise partition recovery modules.'
      },
      {
        id: 'proj-2',
        title: 'Valkyrie Telemetry Agent',
        role: 'Solo Project',
        link: 'valkyrie-metrics.io',
        startDate: 'Jan 2021',
        endDate: 'May 2021',
        isCurrent: false,
        description: 'Wrote a low-overhead daemon to aggregate container OS kernel page faults and trigger lazy CPU affinity pinning, optimizing edge microservices latency.'
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Professional',
        issuer: 'Amazon Web Services (AWS)',
        date: 'Nov 2024',
        link: 'aws.amazon.com/verify/s9d-20d82dks'
      },
      {
        id: 'cert-2',
        name: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'The Linux Foundation',
        date: 'Jan 2025',
        link: 'linuxfoundation.org/verify/cka-10293'
      }
    ],
    awards: [
      {
        id: 'award-1',
        name: 'HashiCorp Excellence in Open Source Contribution',
        issuer: 'HashiCorp',
        date: 'Oct 2021',
        link: ''
      },
      {
        id: 'award-2',
        name: 'Stanford Outstanding MS Thesis Award',
        issuer: 'Stanford University',
        date: 'Jun 2019',
        link: ''
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        name: 'Optimized Stripe core telemetry pipelines across 40B+ daily payloads',
        date: 'Mar 2023',
        link: ''
      },
      {
        id: 'ach-2',
        name: 'Secured first place in AWS Global Cluster Scaling Hackathon',
        date: 'Nov 2022',
        link: ''
      }
    ],
    languages: [
      {
        id: 'lang-1',
        name: 'English',
        proficiency: 'Native'
      },
      {
        id: 'lang-2',
        name: 'German',
        proficiency: 'Fluent'
      }
    ],
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now()
  };
}

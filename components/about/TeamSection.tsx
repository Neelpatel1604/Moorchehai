export function TeamSection() {
  return (
    <div className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Our Team</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Meet the Experts Behind Moorcheh
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <TeamMember
            name="Dr. Sarah Chen"
            role="CEO & Co-founder"
            bio="Former AI Research Lead at Stanford with 15+ years of experience in distributed computing and edge AI."
          />
          
          <TeamMember
            name="Dr. Michael Patel"
            role="CTO & Co-founder"
            bio="Previously led edge computing initiatives at Google, with a focus on model compression and optimization."
          />
          
          <TeamMember
            name="Emma Rodriguez"
            role="VP of Engineering"
            bio="Expert in embedded systems with a decade of experience bringing AI to resource-constrained devices."
          />
        </div>
      </div>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

function TeamMember({ name, role, bio }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-40 w-40 rounded-full bg-gray-200 mb-4"></div>
      <h3 className="text-xl font-medium text-gray-900">{name}</h3>
      <p className="text-[#1e40af] font-medium">{role}</p>
      <p className="mt-2 text-base text-gray-500 text-center">
        {bio}
      </p>
    </div>
  );
} 
import { Users, Lightbulb, Target } from "lucide-react";

export function MissionSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Our Mission</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Democratizing Edge AI Technology
          </p>
        </div>
        
        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <MissionItem
              icon={<Lightbulb className="h-6 w-6" />}
              title="Innovation"
              description="We're committed to pushing the boundaries of what's possible with edge AI, bringing the latest research to practical applications."
            />
            
            <MissionItem
              icon={<Target className="h-6 w-6" />}
              title="Accessibility"
              description="Our goal is to make advanced AI accessible to businesses of all sizes, not just tech giants with unlimited resources."
            />
            
            <MissionItem
              icon={<Users className="h-6 w-6" />}
              title="Community"
              description="We believe in building a community of users and developers who share knowledge and push the ecosystem forward."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MissionItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function MissionItem({ icon, title, description }: MissionItemProps) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#1e40af] text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500 text-center md:text-left">
        {description}
      </p>
    </div>
  );
} 
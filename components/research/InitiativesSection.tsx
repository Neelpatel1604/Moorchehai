export function InitiativesSection() {
  return (
    <div className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Research Initiatives</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Current Focus Areas
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Explore the cutting-edge research directions that drive our innovations.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <InitiativeCard
            number={1}
            title="Multimodal AI on Edge"
            description="Developing techniques to enable multimodal (vision, text, audio) AI capabilities on edge devices with limited resources, focusing on efficient model architectures and inference optimizations."
          />
          
          <InitiativeCard
            number={2}
            title="Hardware-Aware AI"
            description="Creating AI models that automatically adapt to different hardware capabilities, enabling optimal performance across a wide range of devices from IoT sensors to edge servers."
          />
          
          <InitiativeCard
            number={3}
            title="Privacy-Preserving Analytics"
            description="Developing techniques that enable advanced analytics and insights from edge data without compromising user privacy, using differential privacy and secure multi-party computation."
          />
          
          <InitiativeCard
            number={4}
            title="Edge-Native Architectures"
            description="Reimagining AI architectures specifically for edge deployment, moving beyond adapting cloud models to creating new paradigms designed from the ground up for distributed, resource-constrained environments."
          />
        </div>
      </div>
    </div>
  );
}

interface InitiativeCardProps {
  number: number;
  title: string;
  description: string;
}

function InitiativeCard({ number, title, description }: InitiativeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-md bg-[#1e40af] text-white flex items-center justify-center">{number}</div>
        </div>
        <h3 className="ml-4 text-xl font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-500">
        {description}
      </p>
    </div>
  );
} 